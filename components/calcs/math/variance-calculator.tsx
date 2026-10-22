"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "variance-calc",
  title: "Variance Calculator (Sample & Population)",
  presets: [
    { label: "Dataset: 4, 8, 6, 5, 3, 2, 8, 9, 2, 5", values: { type: "sample", dataset: "4, 8, 6, 5, 3, 2, 8, 9, 2, 5" } },
    { label: "Low Variance: 50, 51, 49, 50, 52", values: { type: "sample", dataset: "50, 51, 49, 50, 52" } },
    { label: "High Variance: 10, 90, 20, 80, 50", values: { type: "sample", dataset: "10, 90, 20, 80, 50" } },
    { label: "Small Sample: 2, 4, 6", values: { type: "sample", dataset: "2, 4, 6" } },
  ],
  fields: [
    {
      kind: "choice",
      key: "type",
      label: "Calculation Type",
      default: "sample",
      segmented: true,
      options: [
        { value: "sample", label: "Sample Variance (s²)" },
        { value: "population", label: "Population Variance (σ²)" },
      ],
    },
    {
      kind: "text",
      key: "dataset",
      label: "Enter Dataset (comma, space, or newline separated)",
      default: "4, 8, 6, 5, 3, 7",
      full: true,
    },
  ],
  compute(values) {
    const raw = String(values.dataset || "");
    const nums = raw
      .split(/[\s,]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n));

    if (nums.length < 2 && values.type === "sample") {
      return { error: "Sample variance requires at least 2 data points (n − 1 > 0)." };
    }
    if (nums.length === 0) return { error: "Please enter numeric data points." };

    const n = nums.length;
    const isSample = values.type === "sample";
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const ss = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);
    const variance = isSample ? ss / (n - 1) : ss / n;
    const stdDev = Math.sqrt(variance);

    return {
      hero: {
        label: isSample ? "Sample Variance (s²)" : "Population Variance (σ²)",
        value: fixed(variance, 4),
        unit: "units²",
      },
      badge: {
        text: isSample ? `Bessel Corrected (n − 1 = ${n - 1})` : `Population (N = ${n})`,
        tone: "good",
      },
      rows: [
        { label: "Standard Deviation (s / σ)", value: fixed(stdDev, 4), strong: true },
        { label: "Arithmetic Mean (μ)", value: fixed(mean, 4) },
        { label: "Sum of Squared Deviations (SS)", value: fixed(ss, 4) },
        { label: "Sample Count (n)", value: String(n) },
        { label: "Sum (Σx)", value: num(sum, 4) },
      ],
      note: {
        text: "Variance expresses squared dispersion from the mean. Standard deviation is the square root of variance, returning dispersion to original measurement units.",
        tone: "neutral",
      },
    };
  },
};

export default function VarianceCalculator() {
  return <CalcEngine config={config} />;
}
