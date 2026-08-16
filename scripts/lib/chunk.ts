import { createHash } from "node:crypto";

// `Chunk` is the contract on both sides of public/corpus.json — the runtime
// casts the fetched artifact straight to it — so the type has exactly one
// owner and this builder imports it rather than restating it.
import type { Chunk } from "../../src/lib/corpus";

export type { Chunk };

export const MAX_CHUNK_WORDS = 120;

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/**
 * Deterministic per-chunk id. Keyed on source path + anchor + ordinal so that
 * editing one document never churns ids in any other document.
 */
export const stableId = (
  sourcePath: string,
  anchor: string,
  ordinal: number,
): string =>
  createHash("sha1")
    .update(`${sourcePath}#${anchor}:${ordinal}`)
    .digest("hex")
    .slice(0, 12);

/**
 * Reduce MDX to plain prose. The index is only ever searched, never rendered,
 * so fenced code, JSX tags, and markdown syntax are noise for BM25 scoring.
 * Identifiers that matter (useSyncExternalStore, relay-state) appear in the
 * surrounding prose as well, so stripping fences loses no real signal.
 */
export const toPlainText = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^import\s+.*$/gm, " ")
    .replace(/<\/?[A-Za-z][^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();

const wordCount = (value: string): number =>
  value.split(/\s+/).filter(Boolean).length;

type Section = { heading: string; body: string };

/** Split a markdown body on `##` headings, keeping any lead text as a section. */
export const splitSections = (markdown: string): Section[] => {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  let heading = "";
  let buffer: string[] = [];

  const flush = () => {
    const body = buffer.join("\n").trim();
    if (body) sections.push({ heading, body });
    buffer = [];
  };

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line);
    if (match) {
      flush();
      heading = match[1].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();

  return sections;
};

type DocumentInput = {
  sourcePath: string;
  url: string;
  title: string;
  markdown: string;
  /** Prepended to the first chunk so the summary is searchable. */
  lead?: string;
  /** Index-only aliases applied to every chunk of the document. */
  keywords?: string;
};

/** Chunk a markdown document into ~MAX_CHUNK_WORDS windows, split on headings. */
export const chunkDocument = ({
  sourcePath,
  url,
  title,
  markdown,
  lead,
  keywords,
}: DocumentInput): Chunk[] => {
  const chunks: Chunk[] = [];
  let ordinal = 0;

  for (const section of splitSections(markdown)) {
    const anchor = section.heading ? slugify(section.heading) : "";
    const paragraphs = toPlainText(section.body)
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
      .filter(Boolean);

    let buffer: string[] = [];

    const flush = () => {
      if (buffer.length === 0) return;
      const body = buffer.join(" ");
      // Prefix every chunk with its provenance so a query naming the post
      // title or section still scores against the chunk that contains it.
      const prefix = [title, section.heading].filter(Boolean).join(" — ");
      const preamble = ordinal === 0 && lead ? `${prefix}. ${lead}` : prefix;
      chunks.push({
        id: stableId(sourcePath, anchor, ordinal),
        url,
        title,
        section: section.heading,
        anchor,
        text: `${preamble}. ${body}`,
        ...(keywords ? { keywords } : {}),
      });
      ordinal += 1;
      buffer = [];
    };

    for (const paragraph of paragraphs) {
      const pending = [...buffer, paragraph].join(" ");
      if (buffer.length > 0 && wordCount(pending) > MAX_CHUNK_WORDS) flush();
      buffer.push(paragraph);
    }
    flush();
  }

  return chunks;
};

type RecordInput = {
  sourcePath: string;
  url: string;
  title: string;
  section: string;
  /** Slug used as the `#anchor` on the source URL; `""` for whole-page chunks. */
  anchor: string;
  text: string;
  keywords?: string;
  ordinal: number;
};

/** One chunk per structured record (a role, a project, a skill group). */
export const chunkRecord = ({
  sourcePath,
  url,
  title,
  section,
  anchor,
  text,
  keywords,
  ordinal,
}: RecordInput): Chunk => {
  return {
    id: stableId(sourcePath, anchor, ordinal),
    url,
    title,
    section,
    anchor,
    text: text.replace(/\s+/g, " ").trim(),
    ...(keywords ? { keywords } : {}),
  };
};

/** Content hash over every chunk. Changes iff indexed content changes. */
export const hashChunks = (chunks: Chunk[]): string =>
  createHash("sha1")
    .update(chunks.map((chunk) => `${chunk.id}:${chunk.text}`).join("\n"))
    .digest("hex")
    .slice(0, 16);
