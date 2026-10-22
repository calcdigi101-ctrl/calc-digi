"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "pct-change-calc",
  title: "Percentage Change Calculator (Increase / Decrease)",
  fields: [
    { kind: "number", key: "oldVal", label: "Initial / Starting Value (V₁)", default: 80 },
    { kind: "number", key: "newVal", label: "Final / New Value (V₂)", default: 100 },
  ],
  compute(values) {
    const v1 = Number(values.oldVal);
    const v2 = Number(values.newVal);

    if (v1 === 0) return { error: "Starting value cannot be 0 for percentage change calculations." };

    const diff = v2 - v1;
    const pctChange = (diff / Math.abs(v1)) * 100;
    const isIncrease = diff >= 0;
    const multiplier = v2 / v1;

    return {
      hero: {
        label: isIncrease ? "Percentage Increase" : "Percentage Decrease",
        value: `${isIncrease ? "+" : ""}${fixed(pctChange, 2)}%`,
      },
      badge: {
        text: isIncrease ? "Positive Growth ↑" : "Negative Decline ↓",
        tone: isIncrease ? "good" : "bad",
      },
      rows: [
        { label: "Absolute Difference (Δ)", value: `${diff >= 0 ? "+" : ""}${fixed(diff, 2)}`, strong: true },
        { label: "Growth Multiplier", value: `${fixed(multiplier, 4)}x` },
        { label: "Original Value (V₁)", value: num(v1) },
        { label: "New Value (V₂)", value: num(v2) },
      ],
      note: {
        text: `Formula: ((New − Old) / |Old|) × 100. Moving from ${v1} to ${v2} represents a ${Math.abs(pctChange).toFixed(2)}% ${isIncrease ? "increase" : "decrease"}.`,
        tone: "neutral",
      },
    };
  },
};

export default function PercentageChangeCalculator() {
  return <CalcEngine config={config} />;
}
