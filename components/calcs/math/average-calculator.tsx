"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "average-calc",
  title: "Average Calculator (Mean, Median, Mode)",
  presets: [
    { label: "Exam Scores (72–95)", values: { dataset: "85, 92, 78, 95, 88, 72, 90" } },
    { label: "Class Grades (60–98)", values: { dataset: "65, 78, 88, 92, 95, 84, 98, 71" } },
    { label: "Daily Temp (°F)", values: { dataset: "68, 72, 75, 71, 69, 74, 76" } },
    { label: "Weekly Hours Worked", values: { dataset: "8, 8.5, 7.5, 9, 8" } },
    { label: "Stock Returns (%)", values: { dataset: "3.2, -1.5, 4.0, 0.8, -2.1, 1.4" } },
  ],
  fields: [
    {
      kind: "text",
      key: "dataset",
      label: "Enter Dataset (comma, space, or newline separated)",
      default: "85, 92, 78, 95, 88, 72, 90",
      hint: "Accepts positive numbers, negatives, and decimals.",
      full: true,
    },
  ],
  compute(values) {
    const raw = String(values.dataset || "");
    const nums = raw
      .split(/[\s,]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n));

    if (nums.length === 0) {
      return { error: "Please enter at least one valid numeric data point." };
    }

    const n = nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // Median
    const mid = Math.floor(n / 2);
    const median = n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    // Mode
    const freq: Record<number, number> = {};
    for (const x of nums) freq[x] = (freq[x] || 0) + 1;
    let maxFreq = 0;
    for (const k in freq) {
      if (freq[k] > maxFreq) maxFreq = freq[k];
    }
    const modeList = Object.keys(freq)
      .map(Number)
      .filter((k) => freq[k] === maxFreq);
    const modeStr = maxFreq === 1 && n > 1 ? "None (All Unique)" : modeList.slice(0, 5).join(", ");

    // Dispersion
    const min = sorted[0];
    const max = sorted[n - 1];
    const range = max - min;
    const ss = nums.reduce((acc, x) => acc + Math.pow(x - mean, 2), 0);
    const popVar = ss / n;
    const popSd = Math.sqrt(popVar);
    const sampVar = n > 1 ? ss / (n - 1) : 0;
    const sampSd = Math.sqrt(sampVar);

    const steps = [
      `Sum of all values (Σx) = ${nums.join(" + ")} = ${fixed(sum, 2)}`,
      `Total sample count (n) = ${n}`,
      `Arithmetic Mean (x̄) = Σx ÷ n = ${fixed(sum, 2)} ÷ ${n} = ${fixed(mean, 2)}`,
      `Ordered dataset = [${sorted.join(", ")}]`,
      `Median (50th percentile) = ${fixed(median, 2)}`,
      `Mode (highest frequency) = ${modeStr}`,
      `Range = Max (${max}) − Min (${min}) = ${fixed(range, 2)}`,
      `Sample Standard Deviation (s) = √[Σ(x − x̄)² ÷ (n − 1)] = ${n > 1 ? fixed(sampSd, 4) : "N/A"}`,
    ];

    return {
      hero: {
        label: "Arithmetic Mean (Average)",
        value: fixed(mean, 2),
        unit: "mean",
      },
      badge: {
        text: `Sample Size n = ${n}`,
        tone: "good",
      },
      rows: [
        { label: "Median (Middle Value)", value: fixed(median, 2), strong: true },
        { label: "Mode (Most Frequent)", value: modeStr },
        { label: "Sample Std Deviation (s)", value: n > 1 ? fixed(sampSd, 4) : "N/A" },
        { label: "Population Std Dev (σ)", value: fixed(popSd, 4) },
        { label: "Range (Max − Min)", value: fixed(range, 2) },
        { label: "Sum (Σx)", value: num(sum, 4) },
        { label: "Minimum Value", value: String(min) },
        { label: "Maximum Value", value: String(max) },
      ],
      steps,
      chart: {
        type: "bar",
        title: "5-Point Summary & Central Benchmarks",
        x: "metric",
        series: [{ key: "value", name: "Value", color: "#10b981" }],
        data: [
          { metric: "Minimum", value: min },
          { metric: "Median", value: median },
          { metric: "Mean", value: Number(mean.toFixed(2)) },
          { metric: "Maximum", value: max },
        ],
      },
      note: {
        text: "The arithmetic mean balances all values, while the median provides a robust middle benchmark resistant to extreme outliers.",
        tone: "neutral",
      },
    };
  },
};

export default function AverageCalculator() {
  return <CalcEngine config={config} />;
}
