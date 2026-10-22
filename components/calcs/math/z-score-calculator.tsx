"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, pct } from "@/components/flagship/engine/format";

// Standard normal cumulative distribution function (Abramowitz and Stegun approx)
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1 - p : p;
}

export const config: CalcConfig = {
  id: "z-score-calc",
  title: "Z-Score (Standard Score) Calculator",
  fields: [
    { kind: "number", key: "x", label: "Raw Value (x)", default: 85 },
    { kind: "number", key: "mean", label: "Population Mean (μ)", default: 75 },
    { kind: "number", key: "sd", label: "Standard Deviation (σ)", default: 10, min: 0.0001 },
  ],
  compute(values) {
    const x = Number(values.x);
    const mean = Number(values.mean);
    const sd = Number(values.sd);

    if (sd <= 0) return { error: "Standard deviation must be strictly positive." };

    const z = (x - mean) / sd;
    const cdf = normalCdf(z);
    const pRight = 1 - cdf;
    const pTwoTail = 2 * Math.min(cdf, pRight);
    const percentile = cdf * 100;

    let tone: "good" | "info" | "warn" = "info";
    let status = "Within 1 Std Dev";
    if (Math.abs(z) > 2.58) {
      status = "Extreme Outlier (p < 0.01)";
      tone = "warn";
    } else if (Math.abs(z) > 1.96) {
      status = "Statistically Significant (p < 0.05)";
      tone = "good";
    }

    return {
      hero: {
        label: "Standard Score (Z-Score)",
        value: fixed(z, 2),
        unit: "σ",
      },
      badge: {
        text: status,
        tone,
      },
      rows: [
        { label: "Percentile Rank", value: pct(percentile, 2), strong: true },
        { label: "P(X < x) [Left-tail]", value: fixed(cdf, 4) },
        { label: "P(X > x) [Right-tail]", value: fixed(pRight, 4) },
        { label: "Two-tailed p-value", value: fixed(pTwoTail, 4) },
        { label: "Raw Deviation (x − μ)", value: fixed(x - mean, 2) },
      ],
      note: {
        text: `A Z-score of ${fixed(z, 2)} means the value ${x} is ${Math.abs(z).toFixed(2)} standard deviations ${z >= 0 ? "above" : "below"} the average.`,
        tone: "neutral",
      },
    };
  },
};

export default function ZScoreCalculator() {
  return <CalcEngine config={config} />;
}
