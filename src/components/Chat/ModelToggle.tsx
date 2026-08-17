'use client';
import React from "react";
import { MODEL_DOWNLOAD_LABEL } from "@/lib/local-model";

export type ModelState =
  | { status: "unsupported" }
  | { status: "idle"; cached: boolean }
  | { status: "downloading"; progress: number; text: string }
  | { status: "warming" }
  | { status: "ready"; cached: boolean }
  | { status: "error"; message: string };

type Props = {
  state: ModelState;
  /** Starts the download, and retries it after a failure. */
  onLoad: () => void;
  onCancel: () => void;
};

export const ModelToggle = ({ state, onLoad, onCancel }: Props) => {
  // No WebGPU, too small a screen, or too little VRAM: render nothing at all
  // rather than an affordance that cannot work.
  if (state.status === "unsupported") return null;

  if (state.status === "idle") {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={onLoad}
          className="self-start text-left text-teal-600 hover:text-teal-500 transition-colors"
        >
          Run this in your browser →
        </button>
        <p className="text-slate-600 text-xs leading-5 max-w-[520px]">
          {state.cached
            ? "Already downloaded — loads straight from cache."
            : `One-time ${MODEL_DOWNLOAD_LABEL} download. It's a small model, so it's slower and less sharp than what you're used to. Nothing leaves your device.`}
        </p>
      </div>
    );
  }

  if (state.status === "downloading") {
    const percent = Math.round(state.progress * 100);
    return (
      <div className="flex flex-col gap-2 max-w-[520px]">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-slate-400 text-sm">
            Downloading model — {percent}%
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
          >
            Cancel
          </button>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-px w-full bg-slate-800 overflow-hidden"
        >
          <div
            className="h-full bg-teal-600 transition-[width] duration-300"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-slate-600 text-xs truncate">{state.text}</p>
      </div>
    );
  }

  if (state.status === "warming") {
    return (
      <p className="text-slate-400 text-sm">
        Warming up the model<span className="animate-pulse">…</span>
      </p>
    );
  }

  if (state.status === "ready") {
    return (
      <p className="text-slate-500 text-xs flex items-center gap-2">
        <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-teal-600" />
        Running in your browser
        {state.cached && <span className="text-slate-600">· cached</span>}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-w-[520px]">
      <p className="text-slate-400 text-sm">
        Couldn&apos;t load the model. Passages below still work.
      </p>
      <p className="text-slate-600 text-xs">{state.message}</p>
      <button
        type="button"
        onClick={onLoad}
        className="self-start text-teal-600 hover:text-teal-500 text-sm transition-colors"
      >
        Try again
      </button>
    </div>
  );
};
