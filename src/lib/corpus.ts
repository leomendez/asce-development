/**
 * One indexed passage. This is the contract on both sides of
 * public/corpus.json: `scripts/lib/chunk.ts` writes it and `loadCorpus` casts
 * the fetched artifact straight to it, so both import this single declaration.
 */
export type Chunk = {
  id: string;
  url: string;
  /** Document-level title, e.g. the post title or "About". */
  title: string;
  /** Heading this chunk sits under. Empty for intro/lead content. */
  section: string;
  /** Slug of `section`, used as the `#anchor` on the source URL. */
  anchor: string;
  text: string;
  /**
   * Index-only search aliases: the vocabulary people ask questions with, which
   * often isn't the vocabulary the prose uses ("school" vs "university",
   * "job" vs "role"). Searched, but never displayed and never sent to a model.
   */
  keywords?: string;
};

export type Manifest = {
  hash: string;
  chunkCount: number;
};

export type Corpus = {
  manifest: Manifest;
  chunks: Chunk[];
};

/** Source URL for a chunk, including its section anchor when it has one. */
export const chunkHref = (chunk: Chunk): string =>
  chunk.anchor ? `${chunk.url}#${chunk.anchor}` : chunk.url;

/** Human label for where a chunk came from, e.g. "Relay State — The phrase". */
export const chunkLabel = (chunk: Chunk): string =>
  [chunk.title, chunk.section].filter(Boolean).join(" — ");

/**
 * Chunk text with its provenance prefix removed. The prefix exists so the
 * chunk is searchable by title and section, but it's redundant on screen next
 * to the source link that already says the same thing.
 */
export const excerptText = (chunk: Chunk): string => {
  const prefix = `${chunkLabel(chunk)}. `;
  return chunk.text.startsWith(prefix)
    ? chunk.text.slice(prefix.length)
    : chunk.text;
};

let cache: Promise<Corpus> | null = null;

/** Fetch and memoize the generated index. Throws if the artifact is missing. */
export const loadCorpus = (): Promise<Corpus> => {
  cache ??= fetch("/corpus.json").then((response) => {
    if (!response.ok) {
      throw new Error(`corpus.json unavailable (${response.status})`);
    }
    return response.json() as Promise<Corpus>;
  });
  return cache;
};
