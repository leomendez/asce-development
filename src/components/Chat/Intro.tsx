'use client';
import React from "react";
import { roles } from "@/_data";

const [current] = roles;

/**
 * The home page's opening statement. It collapses away on the first question —
 * the conversation takes the space from there.
 */
export const Intro = () => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-2">
      <h1
        className="animate-text bg-linear-to-r from-teal-500 via-purple-500
          to-orange-500 bg-clip-text text-transparent text-5xl md:text-6xl
          font-black leading-[1.05] tracking-tight"
      >
        Leo Mendez
      </h1>
      <p className="text-slate-400 text-base md:text-lg">
        {current.title} · AI for industry at {current.company}.
      </p>
    </div>

    <div className="flex flex-col gap-1.5">
      <p className="text-slate-300 text-lg">Ask me about my work.</p>
      <p className="text-slate-600 text-sm leading-6 max-w-[58ch]">
        Searched right here in your browser — you get the passages it actually
        matched, and nothing is sent anywhere.
      </p>
    </div>
  </div>
);
