"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "stddev-calc",
  title: "Standard Deviation Calculator",
  presets: [
    { label: "Homework: 10, 12, 23, 23, 16, 23, 21, 16", values: { type: "sample", dataset: "10, 12, 23, 23, 16, 23, 21, 16" } },
    { label: "Quality: 49.8, 50.1, 50.3, 49.9, 50.2", values: { type: "sample", dataset: "49.8, 50.1, 50.3, 49.9, 50.2" } },
    { label: "Scores: 72, 85, 90, 68, 94, 88, 79, 83", values: { type: "sample", dataset: "72, 85, 90, 68, 94, 88, 79, 83" } },
    { label: "High Volatility: 5, 45, 12, 88, 3, 99", values: { type: "sample", dataset: "5, 45, 12, 88, 3, 99" } },
  ],
  fields: [
    {
      kind: "choice",
      key: "type",
      label: "Calculation Type",
      default: "sample",
      segmented: true,
      options: [
        { value: "sample", label: "Sample (n − 1)" },
        { value: "population", label: "Population (N)" },
      ],
    },
    {
      kind: "text",
      key: "dataset",
      label: "Enter Dataset (comma, space, or newline separated)",
      default: "10, 12, 23, 23, 16, 23, 21, 16",
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
      return { error: "Sample standard deviation requires at least 2 data points for degrees of freedom (n − 1)." };
    }
    if (nums.length === 0) {
      return { error: "Please enter numeric data points." };
    }

    const n = nums.length;
    const isSample = values.type === "sample";
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const ss = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);
    const variance = isSample ? ss / (n - 1) : ss / n;
    const stdDev = Math.sqrt(variance);
    const standardError = stdDev / Math.sqrt(n);

    return {
      hero: {
        label: isSample ? "Sample Standard Deviation (s)" : "Population Standard Deviation (σ)",
        value: fixed(stdDev, 4),
        unit: isSample ? "s" : "σ",
      },
      badge: {
        text: isSample ? `Degrees of freedom df = ${n - 1}` : `Population N = ${n}`,
        tone: "good",
      },
      rows: [
        { label: "Variance (s² / σ²)", value: fixed(variance, 4), strong: true },
        { label: "Sample Mean (x̄)", value: fixed(mean, 4) },
        { label: "Sum of Squares (SS)", value: fixed(ss, 4) },
        { label: "Standard Error (SE)", value: fixed(standardError, 4) },
        { label: "Data Count (n)", value: String(n) },
        { label: "Sum (Σx)", value: num(sum, 4) },
      ],
      chart: {
        type: "donut",
        title: "Variance & Mean Decomposition",
        data: [
          { name: "Mean", value: Math.max(0.01, Math.abs(mean)) },
          { name: "Std Dev", value: Math.max(0.01, stdDev) },
          { name: "Std Error", value: Math.max(0.01, standardError) },
        ],
      },
      note: {
        text: isSample
          ? "Bessel's correction (n − 1) eliminates bias when estimating population dispersion from sample observations."
          : "Population formula uses denominator N because every element of the target population is measured.",
        tone: "neutral",
      },
    };
  },
};

export default function StandardDeviationCalculator() {
  return <CalcEngine config={config} />;
}
