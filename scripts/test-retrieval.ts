/**
 * Asserts the retrieval gate behaves as Chat.tsx expects: on-corpus questions
 * resolve to "answered" with the right source, off-corpus questions resolve to
 * "declined". Exits non-zero on any failure. Run with `pnpm test`.
 */
import fs from "node:fs";
import path from "node:path";
import { chunkHref, chunkLabel, excerptText, type Corpus } from "../src/lib/corpus";
import { createIndex, isRelevant, runSearch, RELEVANCE_THRESHOLD } from "../src/lib/search";
import { PLACEHOLDERS, SUGGESTIONS } from "../src/_data/suggestions";

const ROOT = process.cwd();
const read = <T,>(relative: string): T =>
  JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8")) as T;

const corpus = read<Corpus>("public/corpus.json");
const fixture = read<{
  onCorpus: { q: string; expectUrl: string }[];
  offCorpus: { q: string }[];
}>("tests/fixtures/questions.json");

const index = createIndex(corpus.chunks);
const failures: string[] = [];
const check = (ok: boolean, message: string) => {
  if (!ok) failures.push(message);
};

// --- the gate Chat.tsx applies -------------------------------------------
for (const { q, expectUrl } of fixture.onCorpus) {
  const hits = runSearch(index, q);
  check(isRelevant(hits), `should ANSWER but declined: "${q}"`);
  check(
    hits.some((hit) => hit.url === expectUrl),
    `wrong source for "${q}": wanted ${expectUrl}, got ${hits.map((h) => h.url).join(", ") || "(none)"}`,
  );
}

// Every question the UI offers must answer. These are advertised to visitors,
// so a decline here is a dead end the reader was invited into.
for (const q of [...SUGGESTIONS, ...PLACEHOLDERS]) {
  const hits = runSearch(index, q);
  check(
    isRelevant(hits),
    `offered question declines: "${q}" (top score ${hits[0]?.score.toFixed(2) ?? "none"}, threshold ${RELEVANCE_THRESHOLD})`,
  );
}

for (const { q } of fixture.offCorpus) {
  const hits = runSearch(index, q);
  check(!isRelevant(hits), `should DECLINE but answered: "${q}"`);
}

// --- corpus invariants ----------------------------------------------------
const ids = new Set(corpus.chunks.map((chunk) => chunk.id));
check(ids.size === corpus.chunks.length, "duplicate chunk ids");
check(
  corpus.manifest.chunkCount === corpus.chunks.length,
  "manifest.chunkCount disagrees with chunks.length",
);

for (const chunk of corpus.chunks) {
  check(chunk.text.trim().length > 0, `empty text in chunk ${chunk.id}`);
  check(
    !excerptText(chunk).startsWith(chunkLabel(chunk)),
    `provenance prefix leaked into excerpt for ${chunk.id}`,
  );
  check(
    chunkHref(chunk).startsWith("/"),
    `non-root-relative href for ${chunk.id}`,
  );
}

// keywords are an index-only field: they must never reach the reader or model
for (const chunk of corpus.chunks) {
  if (!chunk.keywords) continue;
  check(
    !excerptText(chunk).includes(chunk.keywords),
    `keywords leaked into displayed text for ${chunk.id}`,
  );
}

// --- report ---------------------------------------------------------------
const total =
  fixture.onCorpus.length * 2 +
  fixture.offCorpus.length +
  SUGGESTIONS.length +
  PLACEHOLDERS.length +
  2 +
  corpus.chunks.length * 3;

if (failures.length > 0) {
  console.error(`\nFAIL — ${failures.length} of ${total} assertions\n`);
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}

console.log(
  `PASS — ${total} assertions over ${corpus.chunks.length} chunks ` +
    `(${fixture.onCorpus.length} answer, ${fixture.offCorpus.length} decline)`,
);
