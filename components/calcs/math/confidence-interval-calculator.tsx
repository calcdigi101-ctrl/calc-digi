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
  presets: [
    { label: "IQ Test Study (x\u0304=100, s=15, n=50, 95%)", values: { mean: 100, sd: 15, n: 50, confidence: "95" } },
    { label: "Polling Survey (x\u0304=52, s=5, n=1000, 99%)", values: { mean: 52, sd: 5, n: 1000, confidence: "99" } },
    { label: "Clinical Trial (x\u0304=140, s=18, n=30, 90%)", values: { mean: 140, sd: 18, n: 30, confidence: "90" } },
    { label: "Product Quality (x\u0304=24.5, s=0.8, n=80, 95%)", values: { mean: 24.5, sd: 0.8, n: 80, confidence: "95" } },
  ],
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

    const steps = [
      `Standard Error (SE) = s ÷ √n = ${sd} ÷ √${n} = ${fixed(se, 4)}`,
      `Confidence Level = ${confLevel}% → Critical Value Z* = ${z}`,
      `Margin of Error (ME) = Z* × SE = ${z} × ${fixed(se, 4)} = ±${fixed(me, 3)}`,
      `Lower Bound = x̄ − ME = ${mean} − ${fixed(me, 3)} = ${fixed(lower, 3)}`,
      `Upper Bound = x̄ + ME = ${mean} + ${fixed(me, 3)} = ${fixed(upper, 3)}`,
      `Confidence Interval: [${fixed(lower, 3)}, ${fixed(upper, 3)}]`,
    ];

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
      chart: {
        type: "donut",
        title: "Confidence Level vs Risk Alpha (α)",
        data: [
          { name: `Confidence (${confLevel}%)`, value: Number(confLevel), color: "#10b981" },
          { name: `Alpha Risk (${fixed(100 - Number(confLevel), 1)}%)`, value: Math.max(0.1, 100 - Number(confLevel)), color: "#f59e0b" },
        ],
      },
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
