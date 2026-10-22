"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "pct-error-calc",
  title: "Percent Error Calculator",
  fields: [
    { kind: "number", key: "exp", label: "Experimental / Measured Value (E)", default: 9.6 },
    { kind: "number", key: "theo", label: "Theoretical / True Value (T)", default: 9.81 },
  ],
  compute(values) {
    const e = Number(values.exp);
    const t = Number(values.theo);

    if (t === 0) return { error: "Theoretical true value cannot be zero." };

    const absError = Math.abs(e - t);
    const relError = (e - t) / t;
    const pctError = (absError / Math.abs(t)) * 100;
    const accuracy = Math.max(0, 100 - pctError);

    let tone: "good" | "info" | "warn" = "good";
    if (pctError > 10) tone = "warn";
    else if (pctError > 5) tone = "info";

    return {
      hero: {
        label: "Percent Error",
        value: `${fixed(pctError, 2)}%`,
      },
      badge: {
        text: pctError <= 5 ? "High Experimental Precision" : "Noticeable Variance",
        tone,
      },
      rows: [
        { label: "Absolute Error (|E − T|)", value: fixed(absError, 4), strong: true },
        { label: "Experimental Value (E)", value: fixed(e, 4) },
        { label: "Theoretical Value (T)", value: fixed(t, 4) },
        { label: "Relative Error", value: fixed(relError, 4) },
        { label: "Experimental Accuracy Rate", value: `${fixed(accuracy, 2)}%` },
      ],
      note: {
        text: "Formula: (|Experimental − Theoretical| / |Theoretical|) × 100. Lower percent error indicates higher measurement accuracy.",
        tone: "neutral",
      },
    };
  },
};

export default function PercentErrorCalculator() {
  return <CalcEngine config={config} />;
}
