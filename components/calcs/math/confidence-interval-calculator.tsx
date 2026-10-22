"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

const Z_CRITICAL: Record<string, number> = {
  "80": 1.282,
  "90": 1.645,
  "95": 1.96,
  "98": 2.326,
  "99": 2.576,
  "99.9": 3.291,
};

export const config: CalcConfig = {
  id: "confidence-interval-calc",
  title: "Confidence Interval Calculator",
  fields: [
    { kind: "number", key: "mean", label: "Sample Mean (x̄)", default: 100 },
    { kind: "number", key: "sd", label: "Sample Standard Deviation (s)", default: 15, min: 0.001 },
    { kind: "number", key: "n", label: "Sample Size (n)", default: 50, integer: true, min: 2 },
    {
      kind: "choice",
      key: "confidence",
      label: "Confidence Level",
      default: "95",
      segmented: true,
      options: [
        { value: "90", label: "90%" },
        { value: "95", label: "95%" },
        { value: "99", label: "99%" },
      ],
    },
  ],
  compute(values) {
    const mean = Number(values.mean);
    const sd = Number(values.sd);
    const n = Number(values.n);
    const confLevel = String(values.confidence || "95");
    const z = Z_CRITICAL[confLevel] || 1.96;

    if (n < 2) return { error: "Sample size n must be at least 2." };
    if (sd <= 0) return { error: "Standard deviation must be greater than zero." };

    const se = sd / Math.sqrt(n);
    const me = z * se;
    const lower = mean - me;
    const upper = mean + me;

    return {
      hero: {
        label: `${confLevel}% Margin of Error (±ME)`,
        value: `±${fixed(me, 3)}`,
        unit: "units",
      },
      badge: {
        text: `Z* = ${z} (Level: ${confLevel}%)`,
        tone: "good",
      },
      rows: [
        { label: `${confLevel}% Confidence Interval`, value: `[${fixed(lower, 2)}, ${fixed(upper, 2)}]`, strong: true },
        { label: "Lower Bound", value: fixed(lower, 3) },
        { label: "Upper Bound", value: fixed(upper, 3) },
        { label: "Standard Error (SE)", value: fixed(se, 4) },
        { label: "Sample Mean (x̄)", value: fixed(mean, 2) },
        { label: "Sample Size (n)", value: String(n) },
      ],
      note: {
        text: `We can be ${confLevel}% confident that the true population mean falls between ${fixed(lower, 2)} and ${fixed(upper, 2)}.`,
        tone: "neutral",
      },
    };
  },
};

export default function ConfidenceIntervalCalculator() {
  return <CalcEngine config={config} />;
}
