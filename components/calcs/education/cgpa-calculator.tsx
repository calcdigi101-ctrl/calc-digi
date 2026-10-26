"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cgpaConfig: CalcConfig = {
  id: "cgpa-calculator",
  title: "Cumulative Grade Point Average (CGPA) & Percentage Converter",
  fields: [
    {
      kind: "choice",
      key: "gradingScale",
      label: "Grading Scale System",
      default: "10.0",
      options: [
        { label: "10.0 Scale (International / CBSE / Engineering)", value: "10.0" },
        { label: "4.0 Scale (US Collegiate / Standard)", value: "4.0" },
      ],
    },
    {
      kind: "number",
      key: "priorCgpa",
      label: "Prior Cumulative CGPA",
      default: 8.42,
      min: 0.0,
      max: 10.0,
    },
    {
      kind: "number",
      key: "priorCompletedCredits",
      label: "Prior Total Credits Completed",
      default: 72,
      min: 0,
      max: 250,
    },
    {
      kind: "number",
      key: "currentSemesterSgpa",
      label: "Current Semester SGPA / GPA",
      default: 8.85,
      min: 0.0,
      max: 10.0,
    },
    {
      kind: "number",
      key: "currentSemesterCredits",
      label: "Current Semester Credit Hours",
      default: 20,
      min: 1,
      max: 40,
    },
  ],
  presets: [
    { label: "Engineering Distinction (10-Scale)", values: { gradingScale: "10.0", priorCgpa: 8.65, priorCompletedCredits: 60, currentSemesterSgpa: 9.10, currentSemesterCredits: 22 } },
    { label: "CBSE Standard Conversion", values: { gradingScale: "10.0", priorCgpa: 7.80, priorCompletedCredits: 40, currentSemesterSgpa: 8.20, currentSemesterCredits: 20 } },
    { label: "US College 4.0 Scale Transfer", values: { gradingScale: "4.0", priorCgpa: 3.52, priorCompletedCredits: 64, currentSemesterSgpa: 3.85, currentSemesterCredits: 16 } },
    { label: "Final Year Capstone Push", values: { gradingScale: "10.0", priorCgpa: 8.15, priorCompletedCredits: 100, currentSemesterSgpa: 8.90, currentSemesterCredits: 24 } },
  ],
  compute: (vals) => {
    const scale = String(vals.gradingScale || "10.0");
    const maxVal = scale === "4.0" ? 4.0 : 10.0;
    const priorCgpa = Math.min(maxVal, Math.max(0, Number(vals.priorCgpa) || (scale === "4.0" ? 3.4 : 8.42)));
    const priorCredits = Number(vals.priorCompletedCredits) || 72;
    const semSgpa = Math.min(maxVal, Math.max(0, Number(vals.currentSemesterSgpa) || (scale === "4.0" ? 3.7 : 8.85)));
    const semCredits = Number(vals.currentSemesterCredits) || 20;

    const priorPts = priorCgpa * priorCredits;
    const semPts = semSgpa * semCredits;
    const totalCredits = priorCredits + semCredits;
    const newCgpa = (priorPts + semPts) / (totalCredits > 0 ? totalCredits : 1);

    // Percentage conversion
    let pctEquivalent = 0;
    if (scale === "10.0") {
      pctEquivalent = newCgpa * 9.5; // Standard AICTE / CBSE formula
    } else {
      pctEquivalent = (newCgpa / 4.0) * 100;
    }

    let classification = "First Class with Distinction";
    let tone: "good" | "warn" | "bad" = "good";

    if (scale === "10.0") {
      if (newCgpa >= 8.5) {
        classification = "First Class with Distinction (>= 8.5)";
        tone = "good";
      } else if (newCgpa >= 7.0) {
        classification = "First Class (7.0 - 8.49)";
        tone = "good";
      } else if (newCgpa >= 5.5) {
        classification = "Second Class (5.5 - 6.99)";
        tone = "warn";
      } else {
        classification = "Pass / Academic Remediation (< 5.5)";
        tone = "bad";
      }
    } else {
      if (newCgpa >= 3.6) {
        classification = "High Honors / Dean's List (>= 3.6)";
        tone = "good";
      } else if (newCgpa >= 3.0) {
        classification = "Good Standing / Merit (3.0 - 3.59)";
        tone = "good";
      } else if (newCgpa >= 2.0) {
        classification = "Satisfactory Academic Progress (2.0 - 2.99)";
        tone = "warn";
      } else {
        classification = "Academic Probation Risk (< 2.0)";
        tone = "bad";
      }
    }

    const pctGraph = Math.min(100, Math.round((newCgpa / maxVal) * 100));

    return {
      hero: {
        label: "Calculated Cumulative CGPA",
        value: `${newCgpa.toFixed(2)} / ${maxVal.toFixed(1)}`,
      },
      badge: {
        text: classification,
        tone: tone,
      },
      rows: [
        { label: "Equivalent Percentage", value: `${pctEquivalent.toFixed(2)}% (${scale === "10.0" ? "AICTE 9.5 Multiplier" : "Direct Standard"})` },
        { label: "Total Completed Credit Hours", value: `${totalCredits} credits` },
        { label: "Cumulative Quality Credit Points", value: `${(priorPts + semPts).toFixed(1)} points` },
        { label: "Semester SGPA Contribution", value: `${semSgpa.toFixed(2)} (${semCredits} credits)` },
      ],
      steps: [
        `Prior Quality Points = ${priorCgpa.toFixed(2)} * ${priorCredits} credits = ${priorPts.toFixed(2)} pts`,
        `Current Semester Quality Points = ${semSgpa.toFixed(2)} * ${semCredits} credits = ${semPts.toFixed(2)} pts`,
        `New Cumulative CGPA = (${priorPts.toFixed(2)} + ${semPts.toFixed(2)}) / (${priorCredits} + ${semCredits}) = ${newCgpa.toFixed(2)}`,
        scale === "10.0" 
          ? `CBSE / AICTE Equivalent Percentage = ${newCgpa.toFixed(2)} * 9.5 = ${pctEquivalent.toFixed(2)}%`
          : `Equivalent Percentage = (${newCgpa.toFixed(2)} / 4.0) * 100 = ${pctEquivalent.toFixed(2)}%`,
      ],
      chart: {
        type: "donut",
        title: "Cumulative Credit Performance Ratio",
        format: "pct",
        data: [
          { name: "Achieved CGPA Rating", value: pctGraph, color: "#0ea5e9" },
          { name: "Unattained Rating Deficit", value: Math.max(0, 100 - pctGraph), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function CgpaCalculatorComponent() {
  return <CalcEngine config={cgpaConfig} />;
}
