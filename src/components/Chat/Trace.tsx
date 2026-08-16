'use client';
import React from "react";

export type TraceStep = {
  label: string;
  /** Rendered under the label, e.g. the list of matched sources. */
  detail?: string;
  state: "active" | "done";
  /**
   * "model" steps get the gradient treatment. Whether inference actually ran is
   * the one thing a reader can't infer from the output, so it gets the emphasis.
   */
  kind?: "search" | "model";
};

type Props = {
  steps: TraceStep[];
};

const Ellipsis = () => (
  <span aria-hidden className="inline-flex items-center gap-[3px] ml-1.5">
    {[0, 160, 320].map((delay) => (
      <span
        key={delay}
        className="w-1 h-1 rounded-full bg-current animate-pulse"
        style={{ animationDelay: `${delay}ms` }}
      />
    ))}
  </span>
);

const Marker = ({ step }: { step: TraceStep }) =>
  step.kind === "model" ? (
    <span
      aria-hidden
      className={`shrink-0 w-2 h-2 rounded-full translate-y-[-1px]
        bg-linear-to-r from-teal-400 to-purple-500
        ${step.state === "active" ? "animate-pulse" : "opacity-50"}`}
    />
  ) : (
    <span
      aria-hidden
      className={`shrink-0 w-1.5 h-1.5 rounded-full translate-y-[-2px]
        ${step.state === "active" ? "bg-teal-600 animate-pulse" : "bg-slate-600"}`}
    />
  );

const labelTone = (step: TraceStep): string => {
  if (step.kind === "model") {
    return step.state === "active" ? "text-slate-200" : "text-slate-400";
  }
  return step.state === "active" ? "text-slate-300" : "text-slate-500";
};

/**
 * The pipeline's real state, not decoration — each step appears as it actually
 * resolves. Without the local model the trace legitimately ends at "Found N
 * passages", which reads as complete rather than broken.
 */
export const Trace = ({ steps }: Props) => (
  <ol aria-live="polite" className="flex flex-col gap-2 text-sm">
    {steps.map((step) => (
      <li key={step.label} className="flex gap-3 items-baseline">
        <Marker step={step} />
        <span className="flex flex-col gap-0.5">
          <span className={`flex items-center ${labelTone(step)}`}>
            {step.label}
            {step.state === "active" && step.kind === "model" && <Ellipsis />}
          </span>
          {step.detail && (
            <span className="text-slate-600 text-xs">{step.detail}</span>
          )}
        </span>
      </li>
    ))}
  </ol>
);
