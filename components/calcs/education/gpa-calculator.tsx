"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const gpaConfig: CalcConfig = {
  id: "gpa-calculator",
  title: "High School & College Grade Point Average (GPA) Calculator",
  fields: [
    {
      kind: "number",
      key: "currentCumulativeGpa",
      label: "Current Cumulative GPA (Prior Terms)",
      default: 3.45,
      min: 0.0,
      max: 5.0,
    },
    {
      kind: "number",
      key: "priorCompletedCredits",
      label: "Prior Completed Credit Hours",
      default: 45,
      min: 0,
      max: 180,
    },
    {
      kind: "choice",
      key: "courseWeighting",
      label: "Course Academic Level Weighting",
      default: "standard",
      options: [
        { label: "Standard / College Prep (4.0 Max Scale)", value: "standard" },
        { label: "Honors Coursework (+0.5 Weight, 4.5 Max)", value: "honors" },
        { label: "AP / IB / Dual Enrollment (+1.0 Weight, 5.0 Max)", value: "ap" },
      ],
    },
    {
      kind: "choice",
      key: "course1Grade",
      label: "Course 1 Letter Grade (3 Credits)",
      default: "4.0",
      options: [
        { label: "A (4.0 Quality Pts)", value: "4.0" },
        { label: "A- (3.7 Quality Pts)", value: "3.7" },
        { label: "B+ (3.3 Quality Pts)", value: "3.3" },
        { label: "B (3.0 Quality Pts)", value: "3.0" },
        { label: "B- (2.7 Quality Pts)", value: "2.7" },
        { label: "C+ (2.3 Quality Pts)", value: "2.3" },
        { label: "C (2.0 Quality Pts)", value: "2.0" },
      ],
    },
    {
      kind: "choice",
      key: "course2Grade",
      label: "Course 2 Letter Grade (4 Credits)",
      default: "3.7",
      options: [
        { label: "A (4.0 Quality Pts)", value: "4.0" },
        { label: "A- (3.7 Quality Pts)", value: "3.7" },
        { label: "B+ (3.3 Quality Pts)", value: "3.3" },
        { label: "B (3.0 Quality Pts)", value: "3.0" },
        { label: "B- (2.7 Quality Pts)", value: "2.7" },
        { label: "C+ (2.3 Quality Pts)", value: "2.3" },
      ],
    },
    {
      kind: "choice",
      key: "course3Grade",
      label: "Course 3 Letter Grade (3 Credits)",
      default: "3.3",
      options: [
        { label: "A (4.0 Quality Pts)", value: "4.0" },
        { label: "A- (3.7 Quality Pts)", value: "3.7" },
        { label: "B+ (3.3 Quality Pts)", value: "3.3" },
        { label: "B (3.0 Quality Pts)", value: "3.0" },
        { label: "B- (2.7 Quality Pts)", value: "2.7" },
        { label: "C (2.0 Quality Pts)", value: "2.0" },
      ],
    },
    {
      kind: "choice",
      key: "course4Grade",
      label: "Course 4 Letter Grade (4 Credits)",
      default: "4.0",
      options: [
        { label: "A (4.0 Quality Pts)", value: "4.0" },
        { label: "A- (3.7 Quality Pts)", value: "3.7" },
        { label: "B+ (3.3 Quality Pts)", value: "3.3" },
        { label: "B (3.0 Quality Pts)", value: "3.0" },
        { label: "C (2.0 Quality Pts)", value: "2.0" },
      ],
    },
  ],
  presets: [
    { label: "Dean's List Aspirant (3.75+ Target)", values: { currentCumulativeGpa: 3.65, priorCompletedCredits: 60, courseWeighting: "standard", course1Grade: "4.0", course2Grade: "4.0", course3Grade: "3.7", course4Grade: "4.0" } },
    { label: "AP Scholar Weight Boost (+1.0)", values: { currentCumulativeGpa: 3.80, priorCompletedCredits: 40, courseWeighting: "ap", course1Grade: "4.0", course2Grade: "3.7", course3Grade: "4.0", course4Grade: "3.7" } },
    { label: "Honors Track Steady (3.50 Baseline)", values: { currentCumulativeGpa: 3.40, priorCompletedCredits: 30, courseWeighting: "honors", course1Grade: "3.7", course2Grade: "3.3", course3Grade: "3.7", course4Grade: "3.3" } },
    { label: "Freshman Transition (1st Year)", values: { currentCumulativeGpa: 3.20, priorCompletedCredits: 15, courseWeighting: "standard", course1Grade: "3.3", course2Grade: "3.0", course3Grade: "3.7", course4Grade: "3.0" } },
  ],
  compute: (vals) => {
    const priorGpa = Number(vals.currentCumulativeGpa) || 3.45;
    const priorCredits = Number(vals.priorCompletedCredits) || 45;
    const weighting = String(vals.courseWeighting || "standard");
    const weightBoost = weighting === "ap" ? 1.0 : weighting === "honors" ? 0.5 : 0.0;

    const c1Pts = (Number(vals.course1Grade) || 4.0) + weightBoost;
    const c2Pts = (Number(vals.course2Grade) || 3.7) + weightBoost;
    const c3Pts = (Number(vals.course3Grade) || 3.3) + weightBoost;
    const c4Pts = (Number(vals.course4Grade) || 4.0) + weightBoost;

    const termCredits = 3 + 4 + 3 + 4; // 14 credits
    const termQualityPts = (c1Pts * 3) + (c2Pts * 4) + (c3Pts * 3) + (c4Pts * 4);
    const semesterGpa = termQualityPts / termCredits;

    const priorQualityPts = priorGpa * priorCredits;
    const totalCredits = priorCredits + termCredits;
    const newCumulativeGpa = (priorQualityPts + termQualityPts) / (totalCredits > 0 ? totalCredits : 1);

    const maxScale = 4.0 + weightBoost;
    let standing = "Good Standing";
    let tone: "good" | "warn" | "bad" = "good";

    if (newCumulativeGpa >= 3.8) {
      standing = "Summa Cum Laude / Dean's Honors List";
      tone = "good";
    } else if (newCumulativeGpa >= 3.5) {
      standing = "Magna Cum Laude / High Academic Honors";
      tone = "good";
    } else if (newCumulativeGpa >= 3.0) {
      standing = "Cum Laude / Good Academic Standing";
      tone = "good";
    } else if (newCumulativeGpa >= 2.0) {
      standing = "Satisfactory Progress (Academic Advisory)";
      tone = "warn";
    } else {
      standing = "Academic Probation Warning (< 2.0)";
      tone = "bad";
    }

    const pctGpa = Math.min(100, Math.round((newCumulativeGpa / maxScale) * 100));

    return {
      hero: {
        label: "Updated Cumulative GPA",
        value: `${newCumulativeGpa.toFixed(3)} / ${maxScale.toFixed(1)}`,
      },
      badge: {
        text: standing,
        tone: tone,
      },
      rows: [
        { label: "Current Semester Term GPA", value: `${semesterGpa.toFixed(3)}` },
        { label: "Term Quality Points Earned", value: `${termQualityPts.toFixed(1)} pts (${termCredits} credits)` },
        { label: "Cumulative Quality Points", value: `${(priorQualityPts + termQualityPts).toFixed(1)} pts` },
        { label: "Cumulative Total Credit Hours", value: `${totalCredits} credit hours` },
      ],
      steps: [
        `Semester Quality Points = (3 cr * ${c1Pts.toFixed(1)}) + (4 cr * ${c2Pts.toFixed(1)}) + (3 cr * ${c3Pts.toFixed(1)}) + (4 cr * ${c4Pts.toFixed(1)}) = ${termQualityPts.toFixed(2)} pts`,
        `Semester Term GPA = ${termQualityPts.toFixed(2)} / ${termCredits} cr = ${semesterGpa.toFixed(3)}`,
        `Prior Quality Points = ${priorGpa.toFixed(3)} * ${priorCredits} cr = ${priorQualityPts.toFixed(2)} pts`,
        `Updated Cumulative GPA = (${priorQualityPts.toFixed(2)} + ${termQualityPts.toFixed(2)}) / (${priorCredits} + ${termCredits}) = ${newCumulativeGpa.toFixed(3)}`,
      ],
      chart: {
        type: "donut",
        title: "Cumulative Quality Point Index vs Maximum Scale",
        format: "pct",
        data: [
          { name: "Achieved Quality Points", value: pctGpa, color: "#10b981" },
          { name: "Deficit to Maximum Scale", value: Math.max(0, 100 - pctGpa), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function GpaCalculatorComponent() {
  return <CalcEngine config={gpaConfig} />;
}
