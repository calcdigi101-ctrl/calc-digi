"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const classRankConfig: CalcConfig = {
  id: "class-rank-calculator",
  title: "High School & College Class Rank & Percentile Standing Calculator",
  fields: [
    { kind: "number", key: "studentRank", label: "Student Numerical Class Rank (#)", default: 18, min: 1, max: 2000 },
    { kind: "number", key: "graduatingClassSize", label: "Total Graduating Class Cohort Size", default: 450, min: 10, max: 3000 },
    { kind: "number", key: "gpaScore", label: "Weighted Grade Point Average (GPA)", default: 4.12, min: 0.0, max: 5.0 },
  ],
  presets: [
    { label: "Top 5% Elite Decile", values: { studentRank: 15, graduatingClassSize: 450, gpaScore: 4.25 } },
    { label: "Top 10% Honor Graduate", values: { studentRank: 35, graduatingClassSize: 400, gpaScore: 4.05 } },
    { label: "Top Quartile Competitive (25%)", values: { studentRank: 80, graduatingClassSize: 350, gpaScore: 3.75 } },
    { label: "Class Median Cohort (50%)", values: { studentRank: 175, graduatingClassSize: 350, gpaScore: 3.30 } },
  ],
  compute: (vals) => {
    const rank = Math.max(1, Math.round(Number(vals.studentRank) || 18));
    const size = Math.max(rank, Math.round(Number(vals.graduatingClassSize) || 450));
    const gpa = Number(vals.gpaScore) || 4.12;

    // Standard percentile formula: (size - rank + 0.5) / size * 100
    const percentileStanding = ((size - rank + 0.5) / size) * 100.0;
    const topPct = (rank / size) * 100.0;
    const decile = Math.min(10, Math.ceil(topPct / 10));

    let tier = "Top 10% Elite Honor Cohort";
    let tone: "good" | "warn" | "bad" = "good";

    if (topPct <= 1.0) {
      tier = "Top 1% (Valedictorian / Salutatorian Candidate)";
      tone = "good";
    } else if (topPct <= 5.0) {
      tier = "Top 5% (Highest Academic Distinction)";
      tone = "good";
    } else if (topPct <= 10.0) {
      tier = "Top 10% (Automatic State Admissions Benchmark)";
      tone = "good";
    } else if (topPct <= 25.0) {
      tier = "Top Quartile (25% Competitive College Tier)";
      tone = "good";
    } else if (topPct <= 50.0) {
      tier = "Top Half / Median Cohort Standing";
      tone = "warn";
    } else {
      tier = "Bottom Half Standing (Test-Optional Recommended)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Calculated Percentile Class Standing",
        value: `Top ${topPct.toFixed(2)}% (${percentileStanding.toFixed(1)}th Percentile)`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "Class Numerical Rank Position", value: `Rank #${rank} out of ${size} students` },
        { label: "Academic Decile Standing", value: `Decile ${decile} (1st = Top 10%, 10th = Lowest 10%)` },
        { label: "Quartile Standing", value: topPct <= 25 ? "1st Quartile (Top 25%)" : topPct <= 50 ? "2nd Quartile (25-50%)" : "3rd/4th Quartile" },
        { label: "Weighted GPA Alignment", value: `${gpa.toFixed(2)} GPA` },
      ],
      steps: [
        `Rank Fraction = ${rank} / ${size} = ${(rank / size).toFixed(4)}`,
        `Top Class Percentage = (${rank} / ${size}) * 100 = ${topPct.toFixed(2)}%`,
        `Percentile Standing Formula = ((${size} - ${rank} + 0.5) / ${size}) * 100 = ${percentileStanding.toFixed(2)}%`,
        `Decile Classification = ceil(${topPct.toFixed(2)} / 10) = Decile ${decile}`,
      ],
      chart: {
        type: "donut",
        title: "Graduating Class Cohort Distribution",
        format: "num",
        data: [
          { name: "Class Standing Ahead", value: rank, color: "#10b981" },
          { name: "Remaining Class Cohort", value: size - rank, color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function ClassRankCalculatorComponent() {
  return <CalcEngine config={classRankConfig} />;
}
