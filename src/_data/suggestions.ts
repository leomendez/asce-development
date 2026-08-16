/**
 * The questions the home page puts in front of a visitor.
 *
 * These live outside the component so `pnpm test` can assert every one of them
 * actually clears the relevance gate. A suggestion that dead-ends is worse than
 * no suggestion at all — it advertises the feature and then refuses to work.
 */

/** Clickable chips. */
export const SUGGESTIONS = [
  "What is Leo working on at Cognite?",
  "What did he build with single-spa?",
  "What projects has he built?",
];

/** Longer phrasings for the animated placeholder. */
export const PLACEHOLDERS = [
  "What is he working on at Cognite?",
  "What did he build with single-spa?",
  "What projects has he built?",
  "What has he written about AI?",
];
