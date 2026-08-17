import MiniSearch from "minisearch";
import type { Chunk } from "./corpus";
import { TOP_K, type Hit } from "./relevance";

// Re-exported so Node scripts can pull the whole search surface from one place.
// Browser callers should import these from "./relevance" instead — it carries
// no MiniSearch dependency, and importing them from here would pull the engine
// into the initial bundle.
export { RELEVANCE_THRESHOLD, TOP_K, isRelevant } from "./relevance";
export type { Hit } from "./relevance";

/**
 * Question words and common English carry no signal but match nearly every
 * chunk, which is what let "Tell me a joke" outscore real questions before
 * they were filtered.
 */
const STOP_WORDS = new Set([
  "a", "about", "all", "am", "an", "and", "any", "are", "as", "at", "be",
  "been", "but", "by", "can", "did", "do", "does", "doing", "for", "from",
  "get", "give", "had", "has", "have", "he", "her", "him", "his", "how", "i",
  "if", "in", "into", "is", "it", "its", "just", "know", "like", "me", "much",
  "my", "no", "not", "now", "of", "on", "or", "our", "out", "over", "s", "she",
  "should", "so", "some", "such", "tell", "than", "that", "the", "their",
  "them", "then", "there", "these", "they", "this", "to", "up", "us", "was",
  "we", "were", "what", "when", "where", "which", "who", "whom", "why", "will",
  "with", "would", "you", "your",
]);

const processTerm = (term: string): string | null => {
  const normalized = term.toLowerCase().replace(/[^\w-]/g, "");
  if (normalized.length < 2) return null;
  if (STOP_WORDS.has(normalized)) return null;
  return normalized;
};

/** Meaningful query terms — also the divisor that normalizes the score. */
export const queryTerms = (query: string): string[] =>
  query
    .split(/\s+/)
    .map(processTerm)
    .filter((term): term is string => term !== null);

export const createIndex = (chunks: Chunk[]) => {
  const index = new MiniSearch<Chunk>({
    fields: ["text", "title", "section", "keywords"],
    storeFields: [],
    idField: "id",
    processTerm,
    searchOptions: {
      boost: { title: 2, section: 3, keywords: 1.5 },
      // Prefix matching only; fuzzy matching on a corpus this small produced
      // more noise than recall.
      prefix: (term) => term.length >= 4,
    },
  });
  index.addAll(chunks);
  return { index, byId: new Map(chunks.map((chunk) => [chunk.id, chunk])) };
};

export type SearchIndex = ReturnType<typeof createIndex>;

/**
 * Scores are divided by the number of meaningful query terms, so a long
 * off-topic question can't out-score a short precise one just by matching
 * more terms.
 */
export const runSearch = (
  { index, byId }: SearchIndex,
  query: string,
): Hit[] => {
  const terms = queryTerms(query);
  if (terms.length === 0) return [];

  return index
    .search(query)
    .slice(0, TOP_K)
    .map((result) => {
      const chunk = byId.get(String(result.id));
      return chunk ? { ...chunk, score: result.score / terms.length } : null;
    })
    .filter((hit): hit is Hit => hit !== null);
};
