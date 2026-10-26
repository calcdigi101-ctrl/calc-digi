"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const gradeConfig: CalcConfig = {
  id: "grade-calculator",
  title: "Weighted Course Grade & Assessment Category Calculator",
  fields: [
    { kind: "number", key: "hwScore", label: "Homework / Assignments Average (%)", default: 92.0, min: 0, max: 100 },
    { kind: "number", key: "hwWeight", label: "Homework Category Weight (%)", default: 20.0, min: 0, max: 100 },
    { kind: "number", key: "quizScore", label: "Quizzes / Lab Reports Average (%)", default: 85.0, min: 0, max: 100 },
    { kind: "number", key: "quizWeight", label: "Quizzes Category Weight (%)", default: 20.0, min: 0, max: 100 },
    { kind: "number", key: "midtermScore", label: "Midterm Examinations Average (%)", default: 88.0, min: 0, max: 100 },
    { kind: "number", key: "midtermWeight", label: "Midterm Category Weight (%)", default: 30.0, min: 0, max: 100 },
    { kind: "number", key: "finalWeight", label: "Final Exam Weight (%)", default: 30.0, min: 0, max: 100 },
  ],
  presets: [
    { label: "STEM Heavy Exam Weighted", values: { hwScore: 95.0, hwWeight: 15.0, quizScore: 82.0, quizWeight: 15.0, midtermScore: 86.0, midtermWeight: 35.0, finalWeight: 35.0 } },
    { label: "Balanced Syllabus (25/25/25/25)", values: { hwScore: 90.0, hwWeight: 25.0, quizScore: 88.0, quizWeight: 25.0, midtermScore: 84.0, midtermWeight: 25.0, finalWeight: 25.0 } },
    { label: "Continuous Assessment Focus", values: { hwScore: 96.0, hwWeight: 40.0, quizScore: 90.0, quizWeight: 20.0, midtermScore: 85.0, midtermWeight: 20.0, finalWeight: 20.0 } },
    { label: "High-Stakes Final Term", values: { hwScore: 88.0, hwWeight: 10.0, quizScore: 80.0, quizWeight: 10.0, midtermScore: 82.0, midtermWeight: 40.0, finalWeight: 40.0 } },
  ],
  compute: (vals) => {
    const hwS = Math.min(100, Math.max(0, Number(vals.hwScore) || 92));
    const hwW = Math.max(0, Number(vals.hwWeight) || 20);
    const qzS = Math.min(100, Math.max(0, Number(vals.quizScore) || 85));
    const qzW = Math.max(0, Number(vals.quizWeight) || 20);
    const mtS = Math.min(100, Math.max(0, Number(vals.midtermScore) || 88));
    const mtW = Math.max(0, Number(vals.midtermWeight) || 30);
    const fnW = Math.max(0, Number(vals.finalWeight) || 30);

    const completedWeight = hwW + qzW + mtW;
    const earnedPoints = (hwS * (hwW / 100)) + (qzS * (qzW / 100)) + (mtS * (mtW / 100));
    const currentAverage = completedWeight > 0 ? (earnedPoints / (completedWeight / 100)) : 0;

    // Required on final for 90% (A), 80% (B), 70% (C)
    const reqForA = fnW > 0 ? (90 - earnedPoints) / (fnW / 100) : 0;
    const reqForB = fnW > 0 ? (80 - earnedPoints) / (fnW / 100) : 0;
    const reqForC = fnW > 0 ? (70 - earnedPoints) / (fnW / 100) : 0;
    const maxPossible = earnedPoints + (100 * (fnW / 100));

    let letter = "A-";
    let tone: "good" | "warn" | "bad" = "good";
    if (currentAverage >= 93) letter = "A (Excellent)";
    else if (currentAverage >= 90) letter = "A- (Superior)";
    else if (currentAverage >= 87) letter = "B+ (Very Good)";
    else if (currentAverage >= 83) letter = "B (Good)";
    else if (currentAverage >= 80) letter = "B- (Above Average)";
    else if (currentAverage >= 70) { letter = "C (Satisfactory)"; tone = "warn"; }
    else { letter = "D / F (Passing Risk)"; tone = "bad"; }

    return {
      hero: {
        label: "Current Weighted Course Average",
        value: `${currentAverage.toFixed(2)}%`,
      },
      badge: {
        text: letter,
        tone: tone,
      },
      rows: [
        { label: "Points Earned So Far", value: `${earnedPoints.toFixed(2)} / ${completedWeight.toFixed(1)} points` },
        { label: "Required Final Exam Score for Grade A (90%)", value: reqForA > 100 ? `${reqForA.toFixed(1)}% (Extra Credit Required)` : reqForA <= 0 ? "Already Secured (0%)" : `${reqForA.toFixed(1)}%` },
        { label: "Required Final Exam Score for Grade B (80%)", value: reqForB <= 0 ? "Already Secured" : `${reqForB.toFixed(1)}%` },
        { label: "Maximum Possible Course Grade", value: `${maxPossible.toFixed(2)}%` },
      ],
      steps: [
        `Homework Points = ${hwS}% * (${hwW} / 100) = ${(hwS * (hwW / 100)).toFixed(2)} pts`,
        `Quizzes Points = ${qzS}% * (${qzW} / 100) = ${(qzS * (qzW / 100)).toFixed(2)} pts`,
        `Midterm Points = ${mtS}% * (${mtW} / 100) = ${(mtS * (mtW / 100)).toFixed(2)} pts`,
        `Current Cumulative Earned = ${earnedPoints.toFixed(2)} out of ${completedWeight.toFixed(1)} available pts`,
        `Current Term Average = ${earnedPoints.toFixed(2)} / ${completedWeight / 100} = ${currentAverage.toFixed(2)}%`,
        `Required Final Score for A (90%) = (90 - ${earnedPoints.toFixed(2)}) / ${(fnW / 100).toFixed(2)} = ${reqForA.toFixed(1)}%`,
      ],
      chart: {
        type: "donut",
        title: "Course Syllabus Assessment Weight Partition",
        format: "pct",
        data: [
          { name: "Homework & Assignments", value: Math.round(hwW), color: "#3b82f6" },
          { name: "Quizzes & Lab Reports", value: Math.round(qzW), color: "#10b981" },
          { name: "Midterm Examinations", value: Math.round(mtW), color: "#f59e0b" },
          { name: "Final Examination Weight", value: Math.round(fnW), color: "#8b5cf6" },
        ],
      },
    };
  },
};

export default function GradeCalculatorComponent() {
  return <CalcEngine config={gradeConfig} />;
}
