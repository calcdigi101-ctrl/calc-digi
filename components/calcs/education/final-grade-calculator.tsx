"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const finalGradeConfig: CalcConfig = {
  id: "final-grade-calculator",
  title: "Target Final Exam Required Score & Feasibility Calculator",
  fields: [
    { kind: "number", key: "currentGrade", label: "Current Course Grade (%)", default: 87.5, min: 0, max: 120 },
    { kind: "number", key: "targetGrade", label: "Target Desired Course Grade (%)", default: 90.0, min: 50, max: 100 },
    { kind: "number", key: "finalWeight", label: "Final Exam Weight (%)", default: 25.0, min: 5, max: 80 },
    { kind: "number", key: "extraCredit", label: "Secured Extra Credit (Points)", default: 0.0, min: 0, max: 20 },
  ],
  presets: [
    { label: "Protect Solid A (Current 93%, Target 90%, Final 30%)", values: { currentGrade: 93.0, targetGrade: 90.0, finalWeight: 30.0, extraCredit: 0.0 } },
    { label: "Climb to Grade A (Current 88%, Target 90%, Final 25%)", values: { currentGrade: 88.0, targetGrade: 90.0, finalWeight: 25.0, extraCredit: 1.0 } },
    { label: "Maintain Grade B (Current 82%, Target 80%, Final 35%)", values: { currentGrade: 82.0, targetGrade: 80.0, finalWeight: 35.0, extraCredit: 0.0 } },
    { label: "Pass Course Minimum (Current 66%, Target 70%, Final 30%)", values: { currentGrade: 66.0, targetGrade: 70.0, finalWeight: 30.0, extraCredit: 2.0 } },
  ],
  compute: (vals) => {
    const curG = Number(vals.currentGrade) || 87.5;
    const tgtG = Number(vals.targetGrade) || 90.0;
    const fnW = Math.min(99, Math.max(1, Number(vals.finalWeight) || 25.0));
    const ec = Math.max(0, Number(vals.extraCredit) || 0.0);

    const wFrac = fnW / 100.0;
    const curWeight = 1.0 - wFrac;
    const earnedSoFar = curG * curWeight + ec;
    const requiredFinal = (tgtG - earnedSoFar) / wFrac;

    let feasibility = "Realistic & Achievable";
    let tone: "good" | "warn" | "bad" = "good";

    if (requiredFinal <= 0) {
      feasibility = "Grade Already Locked (0% Needed)";
      tone = "good";
    } else if (requiredFinal <= 75) {
      feasibility = "Easily Achievable (High Safety Margin)";
      tone = "good";
    } else if (requiredFinal <= 90) {
      feasibility = "Realistic & Attainable with Focused Study";
      tone = "good";
    } else if (requiredFinal <= 100) {
      feasibility = "Challenging (Requires High Mastery)";
      tone = "warn";
    } else {
      feasibility = "Statistically Unattainable (>100% Needed Without Curve)";
      tone = "bad";
    }

    const clampedReq = Math.min(100, Math.max(0, Math.round(requiredFinal)));

    return {
      hero: {
        label: "Required Final Exam Score",
        value: `${requiredFinal <= 0 ? "0.0%" : requiredFinal.toFixed(1) + "%"}`,
      },
      badge: {
        text: feasibility,
        tone: tone,
      },
      rows: [
        { label: "Points Already Secured in Course", value: `${earnedSoFar.toFixed(2)}% out of ${((1 - wFrac) * 100).toFixed(1)}%` },
        { label: "Net Points Needed from Final Exam", value: `${Math.max(0, tgtG - earnedSoFar).toFixed(2)} course points` },
        { label: "Final Exam Weight Contribution", value: `${fnW.toFixed(1)}% of total syllabus` },
        { label: "Score to Preserve Minimum Passing (70%)", value: `${Math.max(0, (70 - earnedSoFar) / wFrac).toFixed(1)}%` },
      ],
      steps: [
        `Calculate Weight of Coursework Prior to Final: 100% - ${fnW}% = ${(curWeight * 100).toFixed(1)}%`,
        `Calculate Points Secured: (${curG}% * ${(curWeight).toFixed(3)}) + ${ec} extra credit = ${earnedSoFar.toFixed(2)} pts`,
        `Target Course Grade = ${tgtG.toFixed(1)}%`,
        `Required Final Exam Score = (${tgtG.toFixed(1)} - ${earnedSoFar.toFixed(2)}) / ${wFrac.toFixed(3)} = ${requiredFinal.toFixed(2)}%`,
      ],
      chart: {
        type: "donut",
        title: "Course Target Points Composition",
        format: "pct",
        data: [
          { name: "Secured Pre-Final Points", value: Math.min(100, Math.round(earnedSoFar)), color: "#10b981" },
          { name: "Final Exam Points Needed", value: Math.min(100, Math.max(0, Math.round(tgtG - earnedSoFar))), color: "#f59e0b" },
          { name: "Remaining Grade Buffer", value: Math.max(0, 100 - Math.round(tgtG)), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function FinalGradeCalculatorComponent() {
  return <CalcEngine config={finalGradeConfig} />;
}
