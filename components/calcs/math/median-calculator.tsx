"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "median-calc",
  title: "Median & Quartiles Calculator",
  presets: [
    { label: "Odd Sample (7 values)", values: { dataset: "12, 3, 5, 8, 19, 21, 2" } },
    { label: "Even Sample (8 values)", values: { dataset: "10, 15, 20, 25, 30, 35, 40, 45" } },
    { label: "Skewed Income (with outlier)", values: { dataset: "35000, 42000, 48000, 52000, 58000, 2500000" } },
    { label: "Exam Scores", values: { dataset: "72, 85, 90, 68, 94, 88, 79, 83" } },
  ],
  fields: [
    {
      kind: "text",
      key: "dataset",
      label: "Enter Dataset (comma, space, or newline separated)",
      default: "12, 18, 22, 29, 34, 45, 51, 60, 72, 88",
      hint: "Values will be automatically ordered ascending for quartile rank.",
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
      return { error: "Please enter valid numeric data points." };
    }

    const n = nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // Median
    const mid = Math.floor(n / 2);
    const median = n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    // Q1 and Q3
    const lowerHalf = sorted.slice(0, mid);
    const upperHalf = n % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);

    const getMedian = (arr: number[]) => {
      if (arr.length === 0) return median;
      const m = Math.floor(arr.length / 2);
      return arr.length % 2 === 0 ? (arr[m - 1] + arr[m]) / 2 : arr[m];
    };

    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);
    const iqr = q3 - q1;

    return {
      hero: {
        label: "Median (Q2 / 50th Percentile)",
        value: fixed(median, 2),
        unit: "median",
      },
      badge: {
        text: `Sorted n = ${n} items`,
        tone: "good",
      },
      rows: [
        { label: "First Quartile (Q1 / 25th %)", value: fixed(q1, 2) },
        { label: "Third Quartile (Q3 / 75th %)", value: fixed(q3, 2) },
        { label: "Interquartile Range (IQR)", value: fixed(iqr, 2), strong: true },
        { label: "Arithmetic Mean (μ)", value: fixed(mean, 2) },
        { label: "Minimum", value: String(sorted[0]) },
        { label: "Maximum", value: String(sorted[n - 1]) },
        { label: "Full Range (Max − Min)", value: fixed(sorted[n - 1] - sorted[0], 2) },
      ],
      chart: {
        type: "donut",
        title: "50th Percentile Split Around Median",
        data: [
          { name: `Lower Half ≤ Median (${nums.filter((x) => x <= median).length})`, value: Math.max(1, nums.filter((x) => x <= median).length), color: "#10b981" },
          { name: `Upper Half > Median (${nums.filter((x) => x > median).length})`, value: Math.max(1, nums.filter((x) => x > median).length), color: "#06b6d4" },
        ],
      },
      note: {
        text: "The median divides your sorted sample in exact halves. When data contains extreme high or low outliers, the median and IQR provide a more reliable measure than the mean.",
        tone: "neutral",
      },
    };
  },
};

export default function MedianCalculator() {
  return <CalcEngine config={config} />;
}
