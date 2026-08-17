import { chunkLabel, excerptText } from "./corpus";
import type { Hit } from "./relevance";

/**
 * Deliberately short. A 0.5B model loses the thread with long system prompts,
 * so every line has to earn its place. Grounding is enforced structurally —
 * only retrieved passages are ever supplied — not by argument.
 */
const SYSTEM_PROMPT = [
  "You answer questions about Leo Mendez using only the passages provided.",
  "If the passages do not answer the question, say you do not know. Never guess.",
  "Write 2-3 sentences in third person. Answer directly, with no preamble.",
].join(" ");

/** Serialize retrieved passages into the user turn. */
const buildUserPrompt = (question: string, hits: Hit[]): string => {
  const passages = hits
    .map((hit, index) => `[${index + 1}] ${chunkLabel(hit)}\n${excerptText(hit)}`)
    .join("\n\n");

  return `PASSAGES:\n${passages}\n\nQUESTION: ${question}`;
};

export const buildMessages = (question: string, hits: Hit[]) => [
  { role: "system" as const, content: SYSTEM_PROMPT },
  { role: "user" as const, content: buildUserPrompt(question, hits) },
];
