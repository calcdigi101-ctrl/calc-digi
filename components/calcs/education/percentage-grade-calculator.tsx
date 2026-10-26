"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const percentageGradeConfig: CalcConfig = {
  id: "percentage-grade-calculator",
  title: "Percentage to Letter Grade & 4.0 Scale GPA Converter",
  fields: [
    { kind: "number", key: "rawPercentage", label: "Course Raw Percentage Score (%)", default: 88.5, min: 0, max: 120 },
    {
      kind: "choice",
      key: "scaleStandard",
      label: "Institutional Grading Standard",
      default: "plusMinus",
      options: [
        { label: "Standard Plus/Minus Scale (A, A-, B+, B...)", value: "plusMinus" },
        { label: "Strict Straight Scale (A=90, B=80, C=70...)", value: "straight" },
      ],
    },
    { kind: "number", key: "curveAdjustment", label: "Instructor Curve Offset (+%)", default: 0.0, min: 0, max: 25 },
  ],
  presets: [
    { label: "Solid High Honors (94.0%)", values: { rawPercentage: 94.0, scaleStandard: "plusMinus", curveAdjustment: 0.0 } },
    { label: "Competitive B+ (88.5%)", values: { rawPercentage: 88.5, scaleStandard: "plusMinus", curveAdjustment: 0.0 } },
    { label: "Passing Grade Border (72.0%)", values: { rawPercentage: 72.0, scaleStandard: "plusMinus", curveAdjustment: 0.0 } },
    { label: "Curved Exam Rescue (65% + 7% curve)", values: { rawPercentage: 65.0, scaleStandard: "plusMinus", curveAdjustment: 7.0 } },
  ],
  compute: (vals) => {
    const rawP = Math.max(0, Number(vals.rawPercentage) || 88.5);
    const curve = Math.max(0, Number(vals.curveAdjustment) || 0);
    const finalPct = rawP + curve;
    const isPlusMinus = (vals.scaleStandard || "plusMinus") === "plusMinus";

    let letter = "B+";
    let gpaVal = 3.3;
    let standing = "Above Average";
    let tone: "good" | "warn" | "bad" = "good";

    if (isPlusMinus) {
      if (finalPct >= 97.0) { letter = "A+"; gpaVal = 4.0; standing = "Exceptional Mastery"; tone = "good"; }
      else if (finalPct >= 93.0) { letter = "A"; gpaVal = 4.0; standing = "Superior Academic Performance"; tone = "good"; }
      else if (finalPct >= 90.0) { letter = "A-"; gpaVal = 3.7; standing = "Excellent"; tone = "good"; }
      else if (finalPct >= 87.0) { letter = "B+"; gpaVal = 3.3; standing = "Very Good"; tone = "good"; }
      else if (finalPct >= 83.0) { letter = "B"; gpaVal = 3.0; standing = "Good / Competent"; tone = "good"; }
      else if (finalPct >= 80.0) { letter = "B-"; gpaVal = 2.7; standing = "Above Average"; tone = "good"; }
      else if (finalPct >= 77.0) { letter = "C+"; gpaVal = 2.3; standing = "Average"; tone = "warn"; }
      else if (finalPct >= 73.0) { letter = "C"; gpaVal = 2.0; standing = "Satisfactory"; tone = "warn"; }
      else if (finalPct >= 70.0) { letter = "C-"; gpaVal = 1.7; standing = "Marginal Pass"; tone = "warn"; }
      else if (finalPct >= 65.0) { letter = "D+"; gpaVal = 1.3; standing = "Poor / Deficient"; tone = "bad"; }
      else if (finalPct >= 60.0) { letter = "D"; gpaVal = 1.0; standing = "Minimum Passing"; tone = "bad"; }
      else { letter = "F"; gpaVal = 0.0; standing = "Failing Grade"; tone = "bad"; }
    } else {
      if (finalPct >= 90.0) { letter = "A"; gpaVal = 4.0; standing = "Excellent"; tone = "good"; }
      else if (finalPct >= 80.0) { letter = "B"; gpaVal = 3.0; standing = "Good"; tone = "good"; }
      else if (finalPct >= 70.0) { letter = "C"; gpaVal = 2.0; standing = "Average"; tone = "warn"; }
      else if (finalPct >= 60.0) { letter = "D"; gpaVal = 1.0; standing = "Passing Minimum"; tone = "bad"; }
      else { letter = "F"; gpaVal = 0.0; standing = "Failing"; tone = "bad"; }
    }

    const pctAchieved = Math.min(100, Math.round(finalPct));

    return {
      hero: {
        label: "Assigned Letter Grade & Equivalent GPA",
        value: `${letter} (${gpaVal.toFixed(1)} / 4.0 GPA)`,
      },
      badge: {
        text: standing,
        tone: tone,
      },
      rows: [
        { label: "Adjusted Course Percentage", value: `${finalPct.toFixed(2)}% (Raw: ${rawP.toFixed(2)}%)` },
        { label: "4.0 Scale Quality Points", value: `${gpaVal.toFixed(2)} quality pts per credit` },
        { label: "Points to Next Letter Bracket", value: finalPct >= 97 ? "Top Bracket (Max)" : `${(Math.ceil(finalPct / 5) * 5 - finalPct).toFixed(1)}% gap` },
        { label: "Institutional Passing Status", value: finalPct >= 70.0 ? "Satisfactory Pass (Credits Count)" : finalPct >= 60.0 ? "D-Grade (Conditional Pass)" : "Credit Denied (F)" },
      ],
      steps: [
        `Raw Course Percentage = ${rawP.toFixed(2)}%`,
        `Curve Adjustment Applied = +${curve.toFixed(2)}%`,
        `Final Net Percentage = ${rawP.toFixed(2)} + ${curve.toFixed(2)} = ${finalPct.toFixed(2)}%`,
        `Standard Grade Conversion: ${finalPct.toFixed(2)}% maps to ${letter} (${gpaVal.toFixed(1)} GPA)`,
      ],
      chart: {
        type: "donut",
        title: "Percentage Score Mastery Distribution",
        format: "pct",
        data: [
          { name: "Achieved Course Score", value: pctAchieved, color: "#0ea5e9" },
          { name: "Lost Percentage Deficit", value: Math.max(0, 100 - pctAchieved), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function PercentageGradeCalculatorComponent() {
  return <CalcEngine config={percentageGradeConfig} />;
}
