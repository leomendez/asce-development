'use client';
import React from "react";
import Link from "next/link";
import { chunkHref, chunkLabel, excerptText } from "@/lib/corpus";
import type { Hit } from "@/lib/relevance";
import { StreamingText } from "./StreamingText";

type Props = {
  hit: Hit;
  /** Progressively reveal the passage text. */
  reveal?: boolean;
};

/**
 * A retrieved passage, verbatim from the site. This is the ground truth: it
 * renders whether or not a model ran, so a generated answer always has the
 * real source sitting next to it.
 */
export const Excerpt = ({ hit, reveal = false }: Props) => (
  <figure className="flex flex-col gap-2 border-l-2 border-slate-700 pl-4">
    <StreamingText
      text={excerptText(hit)}
      reveal={reveal}
      className="text-slate-400"
    />
    <figcaption>
      <Link
        href={chunkHref(hit)}
        className="text-teal-600 text-sm underline-animation"
      >
        {chunkLabel(hit)}
      </Link>
    </figcaption>
  </figure>
);
