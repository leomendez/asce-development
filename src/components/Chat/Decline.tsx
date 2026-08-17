'use client';
import React from "react";
import { BrowseLinks } from "./BrowseLinks";

/**
 * Shown when nothing in the corpus clears the relevance threshold. No model is
 * invoked — declining is the correct answer, not a degraded one.
 */
export const Decline = () => (
  <div className="flex flex-col gap-3">
    <p className="text-slate-400 leading-8">
      That&apos;s not something I&apos;ve written about on this site. I only
      answer from what&apos;s actually here — try asking about my work, the
      projects I&apos;ve shipped, or something I&apos;ve blogged about.
    </p>
    <p className="text-sm text-slate-500">
      Or just browse:{" "}
      <BrowseLinks linkClassName="text-teal-600 underline-animation" />
    </p>
  </div>
);
