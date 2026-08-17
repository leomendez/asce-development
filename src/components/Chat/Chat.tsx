'use client';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { search } from "@/lib/retrieval";
import { isRelevant, type Hit } from "@/lib/relevance";
import { MODEL_LABEL } from "@/lib/local-model";
import { PLACEHOLDERS, SUGGESTIONS } from "@/_data/suggestions";
import { AskInput } from "./AskInput";
import { BrowseLinks } from "./BrowseLinks";
import { Decline } from "./Decline";
import { Excerpt } from "./Excerpt";
import { Intro } from "./Intro";
import { ModelToggle } from "./ModelToggle";
import { StreamingText } from "./StreamingText";
import { Suggestions } from "./Suggestions";
import { Trace, type TraceStep } from "./Trace";
import { useLocalModel } from "./useLocalModel";

type Phase = "searching" | "generating" | "answered" | "declined" | "error";

type Turn = {
  id: number;
  question: string;
  phase: Phase;
  hits: Hit[];
  answer: string;
  /** Streamed deltas, used as the live progress readout during generation. */
  tokens: number;
  error?: string;
};

/**
 * `modelReady` matters even on paths where no inference happens: "the model was
 * loaded and deliberately skipped" and "there was no model" produce the same
 * output, and only the trace can tell them apart.
 */
const stepsFor = (turn: Turn, modelReady: boolean): TraceStep[] => {
  if (turn.phase === "searching") {
    return [{ label: "Searching my writing…", state: "active" }];
  }
  if (turn.phase === "error") {
    return [{ label: "Search unavailable", detail: turn.error, state: "done" }];
  }

  const searched: TraceStep = {
    label: "Searching my writing…",
    state: "done",
  };

  if (turn.phase === "declined") {
    return [
      searched,
      { label: "Nothing relevant enough", state: "done" },
      ...(modelReady
        ? [
            {
              label: `Skipped ${MODEL_LABEL}`,
              detail: "Below the relevance threshold — nothing to ground on",
              state: "done" as const,
              kind: "model" as const,
            },
          ]
        : []),
    ];
  }

  const found: TraceStep = {
    label: `Found ${turn.hits.length} passage${turn.hits.length === 1 ? "" : "s"}`,
    detail: turn.hits.map((hit) => hit.title).join(" · "),
    state: "done",
  };

  if (turn.phase === "generating") {
    return [
      searched,
      found,
      {
        label: `Reading them with ${MODEL_LABEL}`,
        detail: turn.tokens
          ? `${turn.tokens} tokens · on your GPU, nothing sent anywhere`
          : "Running on your GPU, nothing sent anywhere",
        state: "active",
        kind: "model",
      },
    ];
  }

  if (turn.answer) {
    return [
      searched,
      found,
      {
        label: `Answered with ${MODEL_LABEL}`,
        detail: `${turn.tokens} tokens · generated in your browser`,
        state: "done",
        kind: "model",
      },
    ];
  }

  return [
    searched,
    found,
    {
      label: "No model loaded — showing the passages as they are",
      detail: "Run it in your browser above for a written answer",
      state: "done",
      kind: "model",
    },
  ];
};

export const Chat = () => {
  const [turns, setTurns] = useState<Turn[]>([]);
  const nextId = useRef(0);
  const model = useLocalModel();
  const started = turns.length > 0;

  const scroller = useRef<HTMLDivElement>(null);
  // Follow new output only while the reader is already at the bottom, so
  // scrolling up to re-read a passage isn't yanked back by the next token.
  const pinned = useRef(true);

  useEffect(() => {
    const element = scroller.current;
    if (element && pinned.current) element.scrollTop = element.scrollHeight;
  }, [turns]);

  const ask = useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed) return;

      const id = nextId.current++;
      setTurns((current) => [
        ...current,
        {
          id,
          question: trimmed,
          phase: "searching",
          hits: [],
          answer: "",
          tokens: 0,
        },
      ]);

      const update = (patch: Partial<Turn>) =>
        setTurns((current) =>
          current.map((turn) => (turn.id === id ? { ...turn, ...patch } : turn)),
        );

      let hits: Hit[];
      try {
        hits = await search(trimmed);
      } catch (error) {
        update({
          phase: "error",
          error: error instanceof Error ? error.message : "unknown error",
        });
        return;
      }

      // The relevance gate runs before the model, always. Below threshold is a
      // decline, and no inference happens at all.
      if (!isRelevant(hits)) {
        update({ phase: "declined", hits: [] });
        return;
      }

      const stream = model.generate(trimmed, hits);
      if (!stream) {
        update({ phase: "answered", hits });
        return;
      }

      update({ phase: "generating", hits });
      try {
        let answer = "";
        let tokens = 0;
        for await (const delta of stream) {
          answer += delta;
          tokens += 1;
          update({ answer, tokens });
        }
        update({ phase: "answered", answer });
      } catch {
        // Keep whatever was generated; the passages below are the real answer.
        update({ phase: "answered" });
      }
    },
    [model],
  );

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        layout
        className={`mx-auto w-full max-w-[760px] flex flex-col h-full min-h-0 ${
          started ? "gap-5 py-2" : "justify-center gap-8"
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!started ? (
            <motion.div
              key="intro"
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.35, ease: "easeIn" }}
            >
              <Intro />
            </motion.div>
          ) : (
            <motion.div
              key="byline"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="flex items-baseline justify-between gap-4 shrink-0"
            >
              <p
                className="animate-text bg-linear-to-r from-teal-500 via-purple-500
                  to-orange-500 bg-clip-text text-transparent text-sm font-black"
              >
                Leo Mendez
              </p>
              <button
                type="button"
                onClick={() => setTurns([])}
                className="text-slate-600 hover:text-teal-500 text-xs transition-colors"
              >
                Start over
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {started && (
          <div
            ref={scroller}
            onScroll={(event) => {
              const { scrollHeight, scrollTop, clientHeight } =
                event.currentTarget;
              pinned.current = scrollHeight - scrollTop - clientHeight < 80;
            }}
            className="flex-1 min-h-0 max-h-[60dvh] md:max-h-none overflow-y-auto
              overscroll-contain pr-2
              [scrollbar-width:thin] [scrollbar-color:var(--color-slate-700)_transparent]"
          >
            <ol className="flex flex-col gap-12 pb-2">
            {turns.map((turn) => (
              <motion.li
                key={turn.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col gap-4"
              >
                <p className="text-slate-200 text-lg">{turn.question}</p>
                <Trace steps={stepsFor(turn, model.isReady)} />

                {turn.answer && (
                  <StreamingText
                    text={turn.answer}
                    done={turn.phase !== "generating"}
                    className="text-slate-200"
                  />
                )}

                {(turn.phase === "answered" || turn.phase === "generating") && (
                  <motion.div
                    initial="hidden"
                    animate="shown"
                    variants={{
                      hidden: {},
                      shown: { transition: { staggerChildren: 0.12 } },
                    }}
                    className="flex flex-col gap-6 mt-1"
                  >
                    {turn.answer && (
                      <p className="text-slate-600 text-xs uppercase tracking-wide">
                        From these passages
                      </p>
                    )}
                    {turn.hits.map((hit) => (
                      <motion.div
                        key={hit.id}
                        variants={{
                          hidden: { opacity: 0, y: 8 },
                          shown: { opacity: 1, y: 0 },
                        }}
                      >
                        <Excerpt hit={hit} reveal={!turn.answer} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {turn.phase === "declined" && <Decline />}

                {turn.phase === "error" && (
                  <p className="text-slate-400 leading-8">
                    The search index didn&apos;t load. The rest of the site works
                    normally — try the navigation above.
                  </p>
                )}
              </motion.li>
            ))}
            </ol>
          </div>
        )}

        <motion.div layout className="shrink-0">
          <AskInput
            onSubmit={(question) => void ask(question)}
            placeholders={PLACEHOLDERS}
            restingPlaceholder="Ask another question"
            compact={started}
          />
        </motion.div>

        <AnimatePresence initial={false}>
          {!started && (
            <motion.div
              key="suggestions"
              exit={{ opacity: 0, y: -8 }}
              className="shrink-0"
            >
              <Suggestions
                suggestions={SUGGESTIONS}
                onSelect={(suggestion) => void ask(suggestion)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meta row: everything secondary on one line, so it costs one row of
            height instead of three. */}
        <motion.div
          layout
          className="shrink-0 flex flex-wrap items-center gap-x-5 gap-y-2 min-h-[1.5rem]"
        >
          <ModelToggle
            state={model.state}
            onLoad={() => void model.load()}
            onCancel={() => void model.cancel()}
          />

          <AnimatePresence initial={false}>
            {!started && (
              <motion.p
                key="destinations"
                exit={{ opacity: 0 }}
                className="text-sm text-slate-600"
              >
                Or browse: <BrowseLinks />
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.section>
    </MotionConfig>
  );
};
