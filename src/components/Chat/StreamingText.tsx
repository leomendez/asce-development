'use client';
import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  /**
   * `true` reveals `text` progressively (used when the full string is already
   * known). `false` renders it as-is, for text that is itself arriving a token
   * at a time. Either way the caller gets the same presentation.
   */
  reveal?: boolean;
  /** Characters revealed per second. */
  speed?: number;
  done?: boolean;
  className?: string;
};

export const StreamingText = ({
  text,
  reveal = false,
  speed = 400,
  done = false,
  className = "",
}: Props) => {
  // `reveal` is fixed for the lifetime of a given passage, so this only
  // changes when the reader toggles the OS motion preference — which is
  // exactly when it should.
  const reduced = useReducedMotion();
  const animate = reveal && !reduced;
  const [revealed, setRevealed] = useState(0);
  const frame = useRef<number>(undefined);

  useEffect(() => {
    if (!animate) return;

    let start: number | null = null;
    const step = (now: number) => {
      start ??= now;
      const next = Math.floor(((now - start) / 1000) * speed);
      setRevealed(Math.min(next, text.length));
      if (next < text.length) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);

    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [text, animate, speed]);

  const visible = animate ? text.slice(0, revealed) : text;
  const complete = animate ? revealed >= text.length : done;

  return (
    <p className={`leading-8 whitespace-pre-wrap ${className}`}>
      {visible}
      {!complete && (
        <span
          aria-hidden
          className="inline-block w-[0.5ch] h-[1em] -mb-[0.15em] ml-[1px] bg-teal-600 animate-pulse"
        />
      )}
    </p>
  );
};
