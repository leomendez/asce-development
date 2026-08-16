/**
 * Prints normalized BM25 top-scores for the on/off-corpus fixture so that
 * RELEVANCE_THRESHOLD is set from data rather than guessed.
 *
 * Imports the same index config the browser uses, so calibration and runtime
 * cannot drift apart. Run with `pnpm calibrate`.
 */
import fs from "node:fs";
import path from "node:path";
import type { Corpus } from "../src/lib/corpus";
import {
  RELEVANCE_THRESHOLD,
  TOP_K,
  createIndex,
  runSearch,
} from "../src/lib/search";
import { PLACEHOLDERS, SUGGESTIONS } from "../src/_data/suggestions";

const ROOT = process.cwd();
const read = <T,>(relative: string): T =>
  JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8")) as T;

const corpus = read<Corpus>("public/corpus.json");
const fixture = read<{
  onCorpus: { q: string; expectUrl: string }[];
  offCorpus: { q: string }[];
}>("tests/fixtures/questions.json");
const adversarial = read<{ questions: { q: string }[] }>(
  "tests/fixtures/adversarial.json",
);

const index = createIndex(corpus.chunks);
const pad = (value: number) => value.toFixed(1).padStart(6);

console.log("\n=== ON-CORPUS (want high scores, correct source) ===");
const onScores: number[] = [];
let found = 0;
for (const { q, expectUrl } of fixture.onCorpus) {
  const hits = runSearch(index, q);
  const score = hits[0]?.score ?? 0;
  onScores.push(score);
  const ok = hits.some((hit) => hit.url === expectUrl);
  if (ok) found += 1;
  console.log(`${ok ? "OK  " : "MISS"} ${pad(score)}  ${q}`);
  if (!ok) {
    console.log(
      `        want ${expectUrl}, got ${hits.map((h) => h.url).join(", ") || "(nothing)"}`,
    );
  }
}

console.log("\n=== OFF-CORPUS (want low scores) ===");
const offScores: number[] = [];
for (const { q } of fixture.offCorpus) {
  const hits = runSearch(index, q);
  const score = hits[0]?.score ?? 0;
  offScores.push(score);
  const leaks = score >= RELEVANCE_THRESHOLD;
  console.log(`${leaks ? "LEAK" : "    "} ${pad(score)}  ${q}`);
}

// The questions the UI offers must clear the gate, so they belong in the
// on-corpus floor even though they carry no expected source.
console.log("\n=== OFFERED BY THE UI (must answer) ===");
for (const q of [...new Set([...SUGGESTIONS, ...PLACEHOLDERS])]) {
  const score = runSearch(index, q)[0]?.score ?? 0;
  onScores.push(score);
  console.log(`${score >= RELEVANCE_THRESHOLD ? "OK  " : "DECL"} ${pad(score)}  ${q}`);
}

console.log("\n=== ADVERSARIAL (keyword vocabulary, off-corpus subject) ===");
const advScores: number[] = [];
for (const { q } of adversarial.questions) {
  const score = runSearch(index, q)[0]?.score ?? 0;
  advScores.push(score);
  console.log(`${score >= RELEVANCE_THRESHOLD ? "LEAK" : "    "} ${pad(score)}  ${q}`);
}

const minOn = Math.min(...onScores);
const maxOff = Math.max(...offScores);
const maxAdv = Math.max(...advScores);
const leaks = advScores.filter((score) => score >= RELEVANCE_THRESHOLD).length;

console.log("\n=== SUMMARY ===");
console.log(`expected source in top-${TOP_K}: ${found}/${fixture.onCorpus.length}`);
console.log(`lowest on-corpus:     ${minOn.toFixed(2)}`);
console.log(`highest off-corpus:   ${maxOff.toFixed(2)}`);
console.log(`highest adversarial:  ${maxAdv.toFixed(2)}  (${leaks}/${advScores.length} leak)`);
console.log(`current threshold:    ${RELEVANCE_THRESHOLD}`);

if (minOn > maxAdv) {
  console.log(
    `SEPARABLE — suggested RELEVANCE_THRESHOLD = ${((minOn + maxAdv) / 2).toFixed(1)}`,
  );
} else {
  console.log(
    `OVERLAP — adversarial questions outscore real ones (${maxAdv.toFixed(2)} > ${minOn.toFixed(2)}).`,
  );
  console.log("No threshold separates them; see the LEAK rows above.");
}
