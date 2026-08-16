import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  chunkDocument,
  chunkRecord,
  hashChunks,
  type Chunk,
} from "./lib/chunk";
import {
  bio,
  education,
  formatRoleDates,
  projects,
  roles,
  skills,
} from "../src/_data/experience";

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "src/_posts");
const OUTPUT = path.join(ROOT, "public/corpus.json");

type PostFrontmatter = {
  title: string;
  metaDesc: string;
  date: string;
  tags: string[];
};

const buildPostChunks = (): Chunk[] => {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort();

  return files.flatMap((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { content, data } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    return chunkDocument({
      sourcePath: `src/_posts/${file}`,
      url: `/blog/${slug}`,
      title: frontmatter.title,
      markdown: content,
      lead: frontmatter.metaDesc,
      keywords: [
        ...(frontmatter.tags ?? []),
        "blog post article wrote writing opinion",
      ].join(" "),
    });
  });
};

const buildExperienceChunks = (): Chunk[] => {
  const source = "src/_data/experience.ts";
  const chunks: Chunk[] = [];
  let ordinal = 0;

  for (const role of roles) {
    const current = role.end === "present";
    chunks.push(
      chunkRecord({
        sourcePath: source,
        url: "/about",
        title: "About",
        section: `${role.title} at ${role.company}`,
        anchor: "experience",
        ordinal: ordinal++,
        text: [
          current
            ? `Leo Mendez currently works at ${role.company} as a ${role.title}, since ${formatRoleDates(role).split(" — ")[0]}.`
            : `Leo Mendez previously worked at ${role.company} as a ${role.title}, ${formatRoleDates(role)}.`,
          role.summary,
          `Technologies used: ${role.stack.join(", ")}.`,
          role.highlights.join(" "),
        ].join(" "),
        keywords: [
          "job employer company career role position experience worked works",
          current
            ? "current currently now today present latest"
            : "previous former past history",
        ].join(" "),
      }),
    );
  }

  for (const group of skills) {
    chunks.push(
      chunkRecord({
        sourcePath: source,
        url: "/about",
        title: "About",
        section: `${group.label} skills`,
        anchor: "technical-focus",
        ordinal: ordinal++,
        text: `Leo's ${group.label} skills and tools: ${group.items.join(", ")}.`,
        keywords:
          "skills technologies tools stack languages frameworks expertise knows familiar proficient",
      }),
    );
  }

  for (const entry of education) {
    chunks.push(
      chunkRecord({
        sourcePath: source,
        url: "/about",
        title: "About",
        section: "Education",
        anchor: "education",
        ordinal: ordinal++,
        text: `Leo studied at ${entry.institution}, earning ${entry.credentials.join(" and ")}.`,
        keywords:
          "school college university degree graduate education studied major academic",
      }),
    );
  }

  for (const project of projects) {
    chunks.push(
      chunkRecord({
        sourcePath: source,
        url: "/projects",
        title: "Projects",
        section: project.title,
        anchor: "",
        ordinal: ordinal++,
        text: [
          `Project: ${project.title}.`,
          project.content,
          `Built with ${project.tags.join(", ")}.`,
          project.href
            ? `Available at ${project.href}.`
            : "Internal work, not publicly linkable.",
        ].join(" "),
        keywords: [
          "project built shipped made created work portfolio",
          project.tags.join(" "),
        ].join(" "),
      }),
    );
  }

  return chunks;
};

/** Page copy that lives in JSX rather than in data. */
const buildStaticChunks = (): Chunk[] => [
  chunkRecord({
    sourcePath: "src/app/page.tsx",
    url: "/",
    title: "Home",
    section: "Introduction",
    anchor: "",
    ordinal: 0,
    text: `Leo Mendez. ${bio}.`,
    keywords: "intro introduction summary who bio about himself",
  }),
  chunkRecord({
    sourcePath: "src/app/contact/page.tsx",
    url: "/contact",
    title: "Contact",
    section: "Get In Touch",
    anchor: "",
    ordinal: 0,
    text: "Get in touch with Leo Mendez. Contact by email at leomenbel93@gmail.com, on LinkedIn, or on GitHub at github.com/leomendez.",
    keywords: "contact email reach hire linkedin github social touch message",
  }),
];

const main = () => {
  const chunks = [
    ...buildExperienceChunks(),
    ...buildPostChunks(),
    ...buildStaticChunks(),
  ];

  const corpus = {
    // NOTE: deliberately no timestamp — the artifact must be byte-identical
    // across rebuilds so that a changed hash always means changed content.
    manifest: {
      hash: hashChunks(chunks),
      chunkCount: chunks.length,
    },
    chunks,
  };

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, `${JSON.stringify(corpus, null, 2)}\n`);

  const words = chunks.reduce(
    (total, chunk) => total + chunk.text.split(/\s+/).length,
    0,
  );
  console.log(
    `corpus.json — ${chunks.length} chunks, ~${words} words, hash ${corpus.manifest.hash}`,
  );
};

main();
