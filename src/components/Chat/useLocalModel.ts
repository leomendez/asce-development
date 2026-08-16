'use client';
import { useCallback, useEffect, useRef, useState } from "react";
import type { MLCEngineInterface } from "@mlc-ai/web-llm";
import {
  createEngine,
  detectSupport,
  isModelCached,
  purgeModelCache,
  streamAnswer,
} from "@/lib/local-model";
import type { Hit } from "@/lib/relevance";
import type { ModelState } from "./ModelToggle";

/**
 * Owns the browser model's lifecycle: capability gating, download, warm-up,
 * cancellation, and cleanup. Every failure path lands back somewhere the chat
 * still works from excerpts alone.
 */
export const useLocalModel = () => {
  const [state, setState] = useState<ModelState>({ status: "unsupported" });
  const engine = useRef<MLCEngineInterface | null>(null);
  const worker = useRef<Worker | null>(null);
  const cancelled = useRef(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      const support = await detectSupport();
      if (!active) return;
      if (!support.ok) {
        setState({ status: "unsupported" });
        return;
      }
      setState({ status: "idle", cached: await isModelCached() });
    })();
    return () => {
      active = false;
    };
  }, []);

  // Terminate the worker if the page goes away mid-download.
  useEffect(
    () => () => {
      worker.current?.terminate();
    },
    [],
  );

  const load = useCallback(async () => {
    cancelled.current = false;
    setState({ status: "downloading", progress: 0, text: "Starting…" });

    try {
      const created = await createEngine(({ progress, text }) => {
        if (cancelled.current) return;
        setState(
          progress >= 1
            ? { status: "warming" }
            : { status: "downloading", progress, text },
        );
      });

      if (cancelled.current) {
        created.worker.terminate();
        return;
      }

      engine.current = created.engine;
      worker.current = created.worker;
      setState({ status: "ready", cached: true });
    } catch (error) {
      if (cancelled.current) return;
      engine.current = null;
      worker.current?.terminate();
      worker.current = null;
      // A failed load can leave partial weights behind; clear them so a retry
      // starts clean rather than resuming from a corrupt cache.
      await purgeModelCache();
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "unknown error",
      });
    }
  }, []);

  const cancel = useCallback(async () => {
    cancelled.current = true;
    worker.current?.terminate();
    worker.current = null;
    engine.current = null;
    await purgeModelCache();
    setState({ status: "idle", cached: false });
  }, []);

  /**
   * Streams a grounded answer, or returns null if the model isn't ready — in
   * which case the caller just shows the retrieved passages.
   */
  const generate = useCallback(
    (question: string, hits: Hit[]): AsyncGenerator<string> | null =>
      engine.current
        ? streamAnswer(engine.current, question, hits)
        : null,
    [],
  );

  return { state, load, cancel, generate, isReady: state.status === "ready" };
};
