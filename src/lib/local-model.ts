import type { MLCEngineInterface } from "@mlc-ai/web-llm";
import { buildMessages } from "./prompt";
import type { Hit } from "./relevance";

export const MODEL_ID = "Qwen2.5-0.5B-Instruct-q4f16_1-MLC";
export const MODEL_DOWNLOAD_LABEL = "~350MB";
/** Short name for the UI — the full MLC id is noise to a reader. */
export const MODEL_LABEL = "Qwen2.5-0.5B";

/** Model needs ~945MB of VRAM; require some headroom above that. */
const REQUIRED_BUFFER_BYTES = 1_000_000_000;
/** 350MB over a phone connection is not a feature. Desktop-first. */
const MIN_VIEWPORT_WIDTH = 768;

export type Support =
  | { ok: true }
  | { ok: false; reason: "no-webgpu" | "small-viewport" | "low-memory" };

type NavigatorWithGPU = Navigator & {
  gpu?: { requestAdapter(): Promise<{ limits: { maxBufferSize: number } } | null> };
};

/**
 * Decides whether to render the opt-in button at all. A capability we can't
 * honour should produce no affordance, never a broken one.
 */
export const detectSupport = async (): Promise<Support> => {
  if (typeof window === "undefined") return { ok: false, reason: "no-webgpu" };

  const gpu = (navigator as NavigatorWithGPU).gpu;
  if (!gpu) return { ok: false, reason: "no-webgpu" };

  if (window.innerWidth < MIN_VIEWPORT_WIDTH) {
    return { ok: false, reason: "small-viewport" };
  }

  try {
    const adapter = await gpu.requestAdapter();
    if (!adapter) return { ok: false, reason: "no-webgpu" };
    if (adapter.limits.maxBufferSize < REQUIRED_BUFFER_BYTES) {
      return { ok: false, reason: "low-memory" };
    }
  } catch {
    return { ok: false, reason: "no-webgpu" };
  }

  return { ok: true };
};

/**
 * Whether the weights are already in Cache Storage, so a return visit can go
 * straight to "ready" instead of implying another download.
 */
export const isModelCached = async (): Promise<boolean> => {
  if (typeof caches === "undefined") return false;
  try {
    const keys = (await caches.keys()).filter((key) => /webllm|mlc/i.test(key));
    // Concurrently: on a return visit each of these enumerates a full shard
    // list, and doing them one at a time delays first paint of the toggle.
    const hits = await Promise.all(
      keys.map(async (key) => {
        const entries = await (await caches.open(key)).keys();
        return entries.some((entry) => entry.url.includes(MODEL_LABEL));
      }),
    );
    return hits.some(Boolean);
  } catch {
    return false;
  }
};

/** Remove partial weights left behind by a cancelled or failed download. */
export const purgeModelCache = async (): Promise<void> => {
  if (typeof caches === "undefined") return;
  try {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((key) => /webllm|mlc/i.test(key)).map((key) => caches.delete(key)),
    );
  } catch {
    // Best effort — a stale cache entry is recoverable, a thrown error here
    // would strand the UI in an error state for no reason.
  }
};

export type LoadProgress = { progress: number; text: string };

/**
 * Construct the worker and load the model. The `@mlc-ai/web-llm` import is
 * dynamic so none of it lands in the initial bundle.
 */
export const createEngine = async (
  onProgress: (progress: LoadProgress) => void,
): Promise<{ engine: MLCEngineInterface; worker: Worker }> => {
  const { CreateWebWorkerMLCEngine } = await import("@mlc-ai/web-llm");

  // Returned to the caller so a cancelled download can terminate the worker
  // outright — WebLLM exposes no abort signal for model loading.
  const worker = new Worker(
    new URL("../workers/llm.worker.ts", import.meta.url),
    { type: "module" },
  );

  const engine = await CreateWebWorkerMLCEngine(worker, MODEL_ID, {
    initProgressCallback: (report) =>
      onProgress({ progress: report.progress, text: report.text }),
  });

  return { engine, worker };
};

/** Stream a grounded answer. Yields incremental text deltas. */
export async function* streamAnswer(
  engine: MLCEngineInterface,
  question: string,
  hits: Hit[],
): AsyncGenerator<string> {
  const stream = await engine.chat.completions.create({
    messages: buildMessages(question, hits),
    stream: true,
    temperature: 0.2,
    max_tokens: 256,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}
