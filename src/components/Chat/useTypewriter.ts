'use client';
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 55;
const DELETE_MS = 25;
const HOLD_MS = 2200;
const BETWEEN_MS = 400;
const START_MS = 600;

/**
 * Types each phrase out, holds, deletes it, then moves to the next. Returns the
 * empty string when inactive so the caller can fall back to its own copy, and
 * the first phrase in full under `prefers-reduced-motion` — the suggestion is
 * the point, the typing is decoration.
 */
export const useTypewriter = (phrases: string[], active: boolean): string => {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const animating = active && phrases.length > 0 && !reduced;

  useEffect(() => {
    if (!animating) return;

    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = phrases[phrase];
      char += deleting ? -1 : 1;
      setText(full.slice(0, char));

      let delay = deleting ? DELETE_MS : TYPE_MS;
      if (!deleting && char >= full.length) {
        deleting = true;
        delay = HOLD_MS;
      } else if (deleting && char <= 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        delay = BETWEEN_MS;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, START_MS);
    return () => clearTimeout(timer);
  }, [phrases, animating]);

  if (!active || phrases.length === 0) return "";
  if (reduced) return phrases[0];
  return text;
};
