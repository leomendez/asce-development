"use client";
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Stage =
  | "door"
  | "slot-opening"
  | "question"
  | "responding"
  | "opening"
  | "done";

const CORRECT_ANSWERS = ["ronaldo", "cristiano ronaldo", "cr7", "cristiano"];
const MESSI_ANSWERS = ["messi", "lionel messi", "leo messi"];

function getBouncerResponse(answer: string): string {
  const normalized = answer.trim().toLowerCase();
  if (MESSI_ANSWERS.some((m) => normalized.includes(m))) {
    return "MESSI?! In a Real Madrid speakeasy?! …fine. Get in. But don’t say that name again.";
  }
  if (CORRECT_ANSWERS.some((c) => normalized.includes(c))) {
    return "You know your stuff. Welcome in.";
  }
  return "…close enough. Welcome in.";
}

export const SpeakeasyDoor = ({ onEnter }: { onEnter: () => void }) => {
  const [stage, setStage] = useState<Stage>("door");
  const [answer, setAnswer] = useState("");
  const [bouncerLine, setBouncerLine] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stage === "door") {
      const t = setTimeout(() => setStage("slot-opening"), 800);
      return () => clearTimeout(t);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === "question" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [stage]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) return;
    const line = getBouncerResponse(answer);
    setBouncerLine(line);
    setStage("responding");
    setTimeout(() => setStage("opening"), 2200);
  }

  function handleAnimationComplete() {
    if (stage === "opening") {
      setTimeout(() => {
        setStage("done");
        onEnter();
      }, 400);
    }
  }

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          key="speakeasy-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "hsl(20 15% 8%)" } as CSSProperties}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Brick wall pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 28px,
                  hsl(20 10% 18%) 28px,
                  hsl(20 10% 18%) 30px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 58px,
                  hsl(20 10% 18%) 58px,
                  hsl(20 10% 18%) 60px
                )
              `,
            }}
          />
          {/* Offset brick rows */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 13px,
                  hsl(20 10% 22%) 13px,
                  hsl(20 10% 22%) 14px
                )
              `,
              backgroundSize: "120px 30px",
              backgroundPosition: "30px 0",
            }}
          />

          {/* Ambient light from above */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full opacity-10 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, hsl(40 80% 70%) 0%, transparent 70%)",
            }}
          />

          {/* Door container */}
          <motion.div
            className="relative"
            animate={stage === "opening" ? { rotateY: -110 } : { rotateY: 0 }}
            transition={
              stage === "opening"
                ? { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }
                : {}
            }
            style={{ transformOrigin: "left center", perspective: 1200 } as CSSProperties}
            onAnimationComplete={handleAnimationComplete}
          >
            {/* Door panel */}
            <div
              className="relative w-64 md:w-72 rounded-t-sm shadow-2xl"
              style={{
                height: "520px",
                background:
                  "linear-gradient(160deg, hsl(25 40% 18%) 0%, hsl(25 35% 13%) 50%, hsl(25 30% 10%) 100%)",
                boxShadow:
                  "inset 2px 0 6px rgba(255,220,150,0.04), inset -2px 0 6px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.8)",
                border: "3px solid hsl(30 30% 22%)",
              }}
            >
              {/* Door wood grain lines */}
              {[0.2, 0.4, 0.6, 0.75].map((pos, i) => (
                <div
                  key={i}
                  className="absolute left-3 right-3 opacity-20"
                  style={{
                    top: `${pos * 100}%`,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, hsl(30 40% 35%), transparent)",
                  }}
                />
              ))}

              {/* Door panels (decorative insets) */}
              <div
                className="absolute left-4 right-4 top-4 rounded-sm opacity-40"
                style={{
                  height: "140px",
                  border: "2px solid hsl(30 25% 28%)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)",
                }}
              />
              <div
                className="absolute left-4 right-4 bottom-4 rounded-sm opacity-40"
                style={{
                  height: "200px",
                  border: "2px solid hsl(30 25% 28%)",
                  boxShadow: "inset 0 1px 4px rgba(0,0,0,0.5)",
                }}
              />

              {/* Eye slot */}
              <div
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: "170px" }}
              >
                {/* Brass slot frame */}
                <div
                  className="relative"
                  style={{
                    width: "120px",
                    height: "36px",
                    background:
                      "linear-gradient(180deg, hsl(45 60% 42%) 0%, hsl(45 50% 30%) 50%, hsl(45 55% 38%) 100%)",
                    borderRadius: "4px",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,220,100,0.3)",
                  }}
                >
                  {/* Slot opening */}
                  <div
                    className="absolute inset-x-2 overflow-hidden"
                    style={{
                      top: "8px",
                      height: "20px",
                      background: "hsl(0 0% 3%)",
                      borderRadius: "2px",
                    }}
                  >
                    {/* Sliding panel */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, hsl(25 40% 18%) 0%, hsl(25 35% 13%) 100%)",
                      } as CSSProperties}
                      animate={
                        stage === "door"
                          ? { x: 0 }
                          : { x: "110%" }
                      }
                      transition={
                        stage !== "door"
                          ? { duration: 0.5, ease: "easeInOut", delay: 0.2 }
                          : {}
                      }
                      onAnimationComplete={() => {
                        if (stage === "slot-opening") setStage("question");
                      }}
                    />
                    {/* Eyes visible when slot open */}
                    <AnimatePresence>
                      {(stage === "question" ||
                        stage === "responding") && (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-around px-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div
                            className="rounded-full"
                            style={{
                              width: 10,
                              height: 10,
                              background: "hsl(45 80% 65%)",
                              boxShadow: "0 0 6px hsl(45 80% 65%)",
                            }}
                          />
                          <div
                            className="rounded-full"
                            style={{
                              width: 10,
                              height: 10,
                              background: "hsl(45 80% 65%)",
                              boxShadow: "0 0 6px hsl(45 80% 65%)",
                            }}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Door knob */}
              <div
                className="absolute"
                style={{ right: "16px", top: "50%" }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: "14px",
                    height: "14px",
                    background:
                      "radial-gradient(circle at 35% 35%, hsl(45 70% 60%), hsl(45 45% 30%))",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,220,100,0.3)",
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Speech bubble / question — below door, outside the rotating div */}
          <AnimatePresence mode="wait">
            {(stage === "question" || stage === "responding") && (
              <motion.div
                key={stage}
                className="absolute left-1/2 -translate-x-1/2"
                style={{ top: "calc(50% + 275px)" } as CSSProperties}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="text-center px-6 py-4 rounded-lg w-72"
                  style={{
                    background: "hsl(25 30% 12%)",
                    border: "1px solid hsl(30 25% 22%)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ color: "hsl(45 60% 45%)" }}
                  >
                    The Bouncer
                  </p>
                  {stage === "question" ? (
                    <>
                      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                        Who is Real Madrid&apos;s all-time top scorer?
                      </p>
                      <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                          placeholder="Your answer..."
                          className="flex-1 text-sm px-3 py-2 rounded outline-none text-slate-200 placeholder-slate-500"
                          style={{
                            background: "hsl(25 20% 8%)",
                            border: "1px solid hsl(30 20% 25%)",
                          }}
                        />
                        <button
                          type="submit"
                          className="text-sm px-3 py-2 rounded font-medium transition-colors"
                          style={{
                            background: "hsl(45 55% 35%)",
                            color: "hsl(45 80% 85%)",
                          }}
                        >
                          →
                        </button>
                      </form>
                    </>
                  ) : (
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {bouncerLine}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
