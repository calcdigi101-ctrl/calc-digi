"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

const Z_MAP: Record<string, number> = {
  "90": 1.645,
  "95": 1.96,
  "99": 2.576,
};

export const config: CalcConfig = {
  id: "sample-size-calc",
  title: "Sample Size Calculator (Survey & Research)",
  fields: [
    {
      kind: "choice",
      key: "conf",
      label: "Confidence Level",
      default: "95",
      segmented: true,
      options: [
        { value: "90", label: "90%" },
        { value: "95", label: "95%" },
        { value: "99", label: "99%" },
      ],
    },
    { kind: "number", key: "margin", label: "Margin of Error (±%)", default: 5, min: 0.1, max: 50 },
    { kind: "number", key: "prop", label: "Estimated Proportion (%)", default: 50, min: 1, max: 99 },
    { kind: "number", key: "pop", label: "Population Size (0 for Infinite)", default: 0, integer: true, min: 0 },
  ],
  compute(values) {
    const conf = String(values.conf || "95");
    const z = Z_MAP[conf] || 1.96;
    const e = Number(values.margin) / 100;
    const p = Number(values.prop) / 100;
    const N = Number(values.pop);

    const n0 = (z * z * p * (1 - p)) / (e * e);
    let finalN = n0;

    if (N > 0) {
      finalN = n0 / (1 + (n0 - 1) / N);
    }

    const recommended = Math.ceil(finalN);

    return {
      hero: {
        label: "Required Sample Size (n)",
        value: num(recommended),
        unit: "respondents",
      },
      badge: {
        text: `${conf}% Confidence, ±${values.margin}%`,
        tone: "good",
      },
      rows: [
        { label: "Recommended Sample Size", value: num(recommended), strong: true },
        { label: "Critical Z-Value", value: String(z) },
        { label: "Margin of Error", value: `±${values.margin}%` },
        { label: "Population Scope", value: N > 0 ? `Finite N = ${num(N)}` : "Infinite / Unknown Population" },
        { label: "Infinite Baseline n₀", value: num(Math.ceil(n0)) },
      ],
      note: {
        text: `Surveying ${num(recommended)} randomly sampled participants guarantees your findings reflect the true population within ±${values.margin}% at ${conf}% confidence.`,
        tone: "neutral",
      },
    };
  },
};

export default function SampleSizeCalculator() {
  return <CalcEngine config={config} />;
}
