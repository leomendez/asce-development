'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "./useTypewriter";

type Props = {
  onSubmit: (question: string) => void;
  /** Phrases for the animated placeholder. Cycling stops once the user types. */
  placeholders: string[];
  /** Static fallback, and the placeholder once a conversation is underway. */
  restingPlaceholder: string;
  compact?: boolean;
};

/**
 * Owns the draft text. Keeping it here rather than in `Chat` means a keystroke
 * re-renders only this field, not the whole conversation below it — every turn
 * carries a `layout` animation, so a parent re-render forces a projection pass
 * over the entire history.
 */
export const AskInput = ({
  onSubmit,
  placeholders,
  restingPlaceholder,
  compact = false,
}: Props) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const typed = useTypewriter(placeholders, !compact && value === "");
  const ghost = typed || restingPlaceholder;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!value.trim()) return;
        onSubmit(value);
        setValue("");
      }}
      className="relative w-full"
    >
      {/* Focus glow. Sits behind the field and never intercepts pointer events. */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: focused ? 0.35 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-2xl
          bg-linear-to-r from-teal-500/40 via-purple-500/30 to-orange-500/30 blur-2xl"
      />

      <div className="relative flex items-center">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Ask a question about Leo's work"
          placeholder={compact ? restingPlaceholder : undefined}
          className={`w-full bg-transparent border-b border-slate-700 pb-3
            text-slate-100 caret-teal-500 outline-hidden
            placeholder:text-slate-600 focus:border-teal-500 transition-colors
            ${compact ? "text-base" : "text-xl md:text-2xl"}`}
        />

        {/* The animated ghost has to be an overlay: a native placeholder can't
            carry a caret, and the caret is what says "start typing here". */}
        {!compact && value === "" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center
              pb-3 text-xl md:text-2xl text-slate-600 truncate max-w-full"
          >
            {ghost}
            <span
              className="ml-[2px] inline-block w-[2px] h-[1.1em] bg-teal-500
                animate-pulse align-middle"
            />
          </span>
        )}
      </div>
    </form>
  );
};
