import type { Chunk } from "./corpus";

export type Hit = Chunk & { score: number };

/**
 * Minimum normalized score for a chunk to count as relevant.
 * Set from `pnpm calibrate` against tests/fixtures/questions.json — re-run it
 * after any substantial content change rather than nudging this by hand.
 */
export const RELEVANCE_THRESHOLD = 6.2;

/** Number of passages handed to the model and shown to the reader. */
export const TOP_K = 3;

/** True when the top hit clears the bar for a real answer. */
export const isRelevant = (hits: Hit[]): boolean =>
  hits.length > 0 && hits[0].score >= RELEVANCE_THRESHOLD;
