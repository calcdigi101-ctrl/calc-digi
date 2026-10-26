"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const satConfig: CalcConfig = {
  id: "sat-score-calculator",
  title: "SAT Total Score, Percentile & College Selectivity Calculator",
  fields: [
    { kind: "number", key: "ebrwScore", label: "Reading & Writing (EBRW) Score (200 - 800)", default: 680, min: 200, max: 800 },
    { kind: "number", key: "mathScore", label: "Mathematics Section Score (200 - 800)", default: 720, min: 200, max: 800 },
  ],
  presets: [
    { label: "Ivy League / Elite Tier (1540)", values: { ebrwScore: 760, mathScore: 780 } },
    { label: "Top Public Flagship (1380)", values: { ebrwScore: 680, mathScore: 700 } },
    { label: "National Average Profile (1050)", values: { ebrwScore: 520, mathScore: 530 } },
    { label: "STEM Heavy Specialist (1420)", values: { ebrwScore: 620, mathScore: 800 } },
  ],
  compute: (vals) => {
    const ebrw = Math.min(800, Math.max(200, Math.round((Number(vals.ebrwScore) || 680) / 10) * 10));
    const math = Math.min(800, Math.max(200, Math.round((Number(vals.mathScore) || 720) / 10) * 10));
    const totalSat = ebrw + math;

    // College Board Nationally Representative Percentile approximation
    let percentile = 50;
    if (totalSat >= 1550) percentile = 99;
    else if (totalSat >= 1500) percentile = 98;
    else if (totalSat >= 1450) percentile = 96;
    else if (totalSat >= 1400) percentile = 93;
    else if (totalSat >= 1350) percentile = 89;
    else if (totalSat >= 1300) percentile = 84;
    else if (totalSat >= 1250) percentile = 79;
    else if (totalSat >= 1200) percentile = 73;
    else if (totalSat >= 1150) percentile = 66;
    else if (totalSat >= 1100) percentile = 58;
    else if (totalSat >= 1050) percentile = 50;
    else if (totalSat >= 1000) percentile = 42;
    else if (totalSat >= 950) percentile = 33;
    else if (totalSat >= 900) percentile = 25;
    else percentile = 15;

    // ACT Concordance equivalent
    let actEquiv = 21;
    if (totalSat >= 1570) actEquiv = 36;
    else if (totalSat >= 1530) actEquiv = 35;
    else if (totalSat >= 1490) actEquiv = 34;
    else if (totalSat >= 1450) actEquiv = 33;
    else if (totalSat >= 1420) actEquiv = 32;
    else if (totalSat >= 1390) actEquiv = 31;
    else if (totalSat >= 1350) actEquiv = 30;
    else if (totalSat >= 1310) actEquiv = 29;
    else if (totalSat >= 1260) actEquiv = 28;
    else if (totalSat >= 1200) actEquiv = 25;
    else if (totalSat >= 1100) actEquiv = 22;
    else if (totalSat >= 1000) actEquiv = 19;
    else actEquiv = 16;

    let selectivity = "Selective Public Flagship Tier";
    let tone: "good" | "warn" | "bad" = "good";
    if (totalSat >= 1500) { selectivity = "Top Tier / Ivy League Competitive"; tone = "good"; }
    else if (totalSat >= 1350) { selectivity = "Highly Selective National Universities"; tone = "good"; }
    else if (totalSat >= 1200) { selectivity = "Selective Regional Flagships"; tone = "good"; }
    else if (totalSat >= 1050) { selectivity = "National Median / Standard Admissions"; tone = "good"; }
    else { selectivity = "Academic Support / Test-Optional Recommendation"; tone = "warn"; }

    return {
      hero: {
        label: "Official SAT Total Composite Score",
        value: `${totalSat} / 1600`,
      },
      badge: {
        text: selectivity,
        tone: tone,
      },
      rows: [
        { label: "College Board National Percentile", value: `${percentile}th Percentile (Higher than ${percentile}% of testers)` },
        { label: "Official ACT Concordance Equivalent", value: `ACT Composite ${actEquiv}` },
        { label: "Reading & Writing (EBRW) Share", value: `${ebrw} pts (${((ebrw / totalSat) * 100).toFixed(1)}%)` },
        { label: "Math Section Share", value: `${math} pts (${((math / totalSat) * 100).toFixed(1)}%)` },
      ],
      steps: [
        `Evidence-Based Reading & Writing (EBRW) = ${ebrw} points`,
        `Mathematics Section Score = ${math} points`,
        `Total SAT Score = ${ebrw} + ${math} = ${totalSat} / 1600`,
        `Official Concordance Table: SAT ${totalSat} correlates with ACT ${actEquiv}`,
      ],
      chart: {
        type: "donut",
        title: "SAT Section Score Balance",
        format: "num",
        data: [
          { name: "Reading & Writing (EBRW)", value: ebrw, color: "#3b82f6" },
          { name: "Mathematics", value: math, color: "#10b981" },
        ],
      },
    };
  },
};

export default function SatScoreCalculatorComponent() {
  return <CalcEngine config={satConfig} />;
}
