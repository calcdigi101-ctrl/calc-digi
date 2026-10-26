"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const testScoreConfig: CalcConfig = {
  id: "test-score-calculator",
  title: "Test Score, Percentage, Grading Curve & Penalty Calculator",
  fields: [
    { kind: "number", key: "totalExamQuestions", label: "Total Number of Exam Questions", default: 60, min: 1, max: 300 },
    { kind: "number", key: "correctQuestions", label: "Questions Answered Correctly", default: 51, min: 0, max: 300 },
    { kind: "number", key: "incorrectQuestions", label: "Questions Answered Incorrectly", default: 7, min: 0, max: 300 },
    {
      kind: "choice",
      key: "penaltyFactor",
      label: "Negative Marking / Penalty Deductions",
      default: "none",
      options: [
        { label: "No Penalty (Standard US Testing)", value: "none" },
        { label: "Quarter Point (-0.25 pt per wrong answer)", value: "quarter" },
        { label: "Third Point (-0.33 pt per wrong answer)", value: "third" },
      ],
    },
    { kind: "number", key: "curveOffsetPoints", label: "Instructor Flat Curve (+% or Pts)", default: 0.0, min: 0, max: 25 },
  ],
  presets: [
    { label: "Standard 60-Question Midterm (85% Score)", values: { totalExamQuestions: 60, correctQuestions: 51, incorrectQuestions: 9, penaltyFactor: "none", curveOffsetPoints: 0.0 } },
    { label: "Curved Tough Final Exam (+6 pt curve)", values: { totalExamQuestions: 50, correctQuestions: 37, incorrectQuestions: 13, penaltyFactor: "none", curveOffsetPoints: 6.0 } },
    { label: "AP Multiple Choice (-0.25 Penalty)", values: { totalExamQuestions: 75, correctQuestions: 58, incorrectQuestions: 14, penaltyFactor: "quarter", curveOffsetPoints: 0.0 } },
    { label: "Certification Exam (80 Questions, 70% Pass)", values: { totalExamQuestions: 80, correctQuestions: 64, incorrectQuestions: 16, penaltyFactor: "none", curveOffsetPoints: 0.0 } },
  ],
  compute: (vals) => {
    const total = Math.max(1, Number(vals.totalExamQuestions) || 60);
    const correct = Math.min(total, Math.max(0, Number(vals.correctQuestions) || 51));
    const incorrect = Math.min(total - correct, Math.max(0, Number(vals.incorrectQuestions) || 7));
    const penaltyType = String(vals.penaltyFactor || "none");
    const curve = Math.max(0, Number(vals.curveOffsetPoints) || 0);

    const unanswered = Math.max(0, total - correct - incorrect);
    const penaltyRate = penaltyType === "quarter" ? 0.25 : penaltyType === "third" ? 0.3333 : 0.0;
    const penaltyDeduction = incorrect * penaltyRate;

    const netPoints = Math.max(0, correct - penaltyDeduction);
    const rawPct = (netPoints / total) * 100.0;
    const finalPct = Math.min(100.0, rawPct + curve);

    let letter = "B";
    let gpaEquiv = 3.0;
    let tone: "good" | "warn" | "bad" = "good";

    if (finalPct >= 93) { letter = "A (Superior)"; gpaEquiv = 4.0; tone = "good"; }
    else if (finalPct >= 90) { letter = "A- (Excellent)"; gpaEquiv = 3.7; tone = "good"; }
    else if (finalPct >= 87) { letter = "B+ (Very Good)"; gpaEquiv = 3.3; tone = "good"; }
    else if (finalPct >= 83) { letter = "B (Good)"; gpaEquiv = 3.0; tone = "good"; }
    else if (finalPct >= 80) { letter = "B- (Above Average)"; gpaEquiv = 2.7; tone = "good"; }
    else if (finalPct >= 75) { letter = "C+ (Average)"; gpaEquiv = 2.3; tone = "warn"; }
    else if (finalPct >= 70) { letter = "C (Passing)"; gpaEquiv = 2.0; tone = "warn"; }
    else if (finalPct >= 60) { letter = "D (Below Average)"; gpaEquiv = 1.0; tone = "bad"; }
    else { letter = "F (Failing)"; gpaEquiv = 0.0; tone = "bad"; }

    return {
      hero: {
        label: "Final Adjusted Test Score",
        value: `${finalPct.toFixed(1)}% (${letter})`,
      },
      badge: {
        text: `Grade ${letter} • ${gpaEquiv.toFixed(1)} GPA Equivalent`,
        tone: tone,
      },
      rows: [
        { label: "Net Points Earned", value: `${netPoints.toFixed(2)} / ${total} questions (${correct} correct, ${incorrect} wrong)` },
        { label: "Accuracy Rate (on attempted items)", value: `${((correct / (correct + incorrect > 0 ? correct + incorrect : 1)) * 100).toFixed(1)}%` },
        { label: "Unanswered / Blank Questions", value: `${unanswered} questions (${((unanswered / total) * 100).toFixed(1)}%)` },
        { label: "Penalty Deductions Applied", value: penaltyDeduction > 0 ? `-${penaltyDeduction.toFixed(2)} pts (${penaltyType} deduction)` : "0.0 pts (No penalty)" },
      ],
      steps: [
        `Questions Correct = ${correct} pts`,
        `Penalty Deduction = ${incorrect} incorrect * ${penaltyRate.toFixed(2)} = -${penaltyDeduction.toFixed(2)} pts`,
        `Net Raw Score = ${correct} - ${penaltyDeduction.toFixed(2)} = ${netPoints.toFixed(2)} / ${total}`,
        `Base Percentage = (${netPoints.toFixed(2)} / ${total}) * 100 = ${rawPct.toFixed(2)}%`,
        `Apply Curve Offset (+${curve.toFixed(1)}%) = ${finalPct.toFixed(1)}%`,
      ],
      chart: {
        type: "donut",
        title: "Exam Question Outcome Partition",
        format: "num",
        data: [
          { name: "Correct Answers", value: correct, color: "#10b981" },
          { name: "Incorrect Answers", value: incorrect, color: "#ef4444" },
          { name: "Unanswered Blank", value: unanswered, color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function TestScoreCalculatorComponent() {
  return <CalcEngine config={testScoreConfig} />;
}
