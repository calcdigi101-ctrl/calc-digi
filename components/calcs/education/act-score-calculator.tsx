"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const actConfig: CalcConfig = {
  id: "act-score-calculator",
  title: "ACT Composite Score, STEM Benchmark & Percentile Calculator",
  fields: [
    { kind: "number", key: "englishScore", label: "English Section Score (1 - 36)", default: 32, min: 1, max: 36 },
    { kind: "number", key: "mathScore", label: "Mathematics Section Score (1 - 36)", default: 30, min: 1, max: 36 },
    { kind: "number", key: "readingScore", label: "Reading Section Score (1 - 36)", default: 34, min: 1, max: 36 },
    { kind: "number", key: "scienceScore", label: "Science Reasoning Section Score (1 - 36)", default: 28, min: 1, max: 36 },
  ],
  presets: [
    { label: "Ivy League Elite (34 Composite)", values: { englishScore: 35, mathScore: 34, readingScore: 35, scienceScore: 33 } },
    { label: "STEM Heavy Applicant (31 Composite)", values: { englishScore: 26, mathScore: 35, readingScore: 28, scienceScore: 34 } },
    { label: "National Merit Benchmark (28 Composite)", values: { englishScore: 30, mathScore: 27, readingScore: 29, scienceScore: 26 } },
    { label: "National Average Profile (20 Composite)", values: { englishScore: 19, mathScore: 20, readingScore: 21, scienceScore: 20 } },
  ],
  compute: (vals) => {
    const eng = Math.min(36, Math.max(1, Math.round(Number(vals.englishScore) || 32)));
    const math = Math.min(36, Math.max(1, Math.round(Number(vals.mathScore) || 30)));
    const read = Math.min(36, Math.max(1, Math.round(Number(vals.readingScore) || 34)));
    const sci = Math.min(36, Math.max(1, Math.round(Number(vals.scienceScore) || 28)));

    const rawMean = (eng + math + read + sci) / 4.0;
    const composite = Math.round(rawMean);
    const stemScore = (math + sci) / 2.0;
    const elaScore = (eng + read) / 2.0;

    // National percentile approximation based on ACT official profile
    const percentileMap: Record<number, number> = {
      36: 100, 35: 99, 34: 99, 33: 98, 32: 97, 31: 95, 30: 93,
      29: 90, 28: 88, 27: 85, 26: 82, 25: 78, 24: 74, 23: 69,
      22: 64, 21: 59, 20: 53, 19: 47, 18: 41, 17: 35, 16: 28,
      15: 21, 14: 15, 13: 10, 12: 5, 11: 2, 10: 1
    };
    const nationalPercentile = percentileMap[composite] || (composite < 10 ? 1 : 99);

    let tier = "Competitive State Flagship Tier";
    let tone: "good" | "warn" | "bad" = "good";
    if (composite >= 34) { tier = "Top 1% National / Ivy League Competitive"; tone = "good"; }
    else if (composite >= 30) { tier = "Top 7% Highly Selective Universities"; tone = "good"; }
    else if (composite >= 25) { tier = "Top 22% Selective Flagship Universities"; tone = "good"; }
    else if (composite >= 21) { tier = "Above National Average (College Ready)"; tone = "good"; }
    else { tier = "Below National Average / Remediation Advisory"; tone = "warn"; }

    return {
      hero: {
        label: "Official ACT Composite Score",
        value: `${composite} / 36`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "National Percentile Ranking", value: `${nationalPercentile}th Percentile (Exceeds ${nationalPercentile}% of test-takers)` },
        { label: "ACT STEM Score (Math + Science)", value: `${stemScore.toFixed(1)} / 36 (Benchmark: 26)` },
        { label: "ACT ELA Score (English + Reading)", value: `${elaScore.toFixed(1)} / 36` },
        { label: "Unrounded Section Arithmetic Mean", value: `${rawMean.toFixed(2)}` },
      ],
      steps: [
        `Sum Section Scores: ${eng} (Eng) + ${math} (Math) + ${read} (Read) + ${sci} (Sci) = ${eng + math + read + sci}`,
        `Compute Arithmetic Mean: ${eng + math + read + sci} / 4 = ${rawMean.toFixed(2)}`,
        `Standard Rounding to Nearest Integer: ${rawMean.toFixed(2)} rounds to ${composite}`,
        `Compute STEM Score: (${math} + ${sci}) / 2 = ${stemScore.toFixed(1)}`,
      ],
      chart: {
        type: "donut",
        title: "ACT Section Score Share Contribution",
        format: "num",
        data: [
          { name: "English (1-36)", value: eng, color: "#3b82f6" },
          { name: "Mathematics (1-36)", value: math, color: "#10b981" },
          { name: "Reading (1-36)", value: read, color: "#f59e0b" },
          { name: "Science Reasoning (1-36)", value: sci, color: "#8b5cf6" },
        ],
      },
    };
  },
};

export default function ActScoreCalculatorComponent() {
  return <CalcEngine config={actConfig} />;
}
