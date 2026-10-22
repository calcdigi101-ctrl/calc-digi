"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "pct-error-calc",
  title: "Percent Error Calculator",
  presets: [
    { label: "Gravity Test (9.6 vs 9.81 m/s\u00b2)", values: { exp: 9.6, theo: 9.81 } },
    { label: "Speed of Light (2.95 vs 3.00)", values: { exp: 2.95, theo: 3.0 } },
    { label: "Boiling Point (98.5 vs 100\u00b0C)", values: { exp: 98.5, theo: 100 } },
    { label: "Density Test (2.65 vs 2.70)", values: { exp: 2.65, theo: 2.7 } },
  ],
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
      chart: {
        type: "donut",
        title: "Accuracy vs Percent Error Split",
        data: [
          { name: `Accuracy (${fixed(accuracy, 2)}%)`, value: Math.max(0.01, accuracy), color: "#10b981" },
          { name: `Percent Error (${fixed(pctError, 2)}%)`, value: Math.max(0.01, pctError), color: "#f43f5e" },
        ],
      },
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
