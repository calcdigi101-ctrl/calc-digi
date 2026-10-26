"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const studyHoursConfig: CalcConfig = {
  id: "study-hours-calculator",
  title: "Carnegie Credit Hour Rule & Weekly Study Time Calculator",
  fields: [
    { kind: "number", key: "enrolledCreditHours", label: "Enrolled Semester Credit Hours", default: 15, min: 1, max: 25 },
    {
      kind: "choice",
      key: "academicRigor",
      label: "Course Rigor & Discipline Difficulty",
      default: "standard",
      options: [
        { label: "Introductory / General Education (1.5 hrs/credit)", value: "intro" },
        { label: "Standard Humanities & Social Science (2.0 hrs/credit)", value: "standard" },
        { label: "Rigorous STEM, Organic Chem & Engineering (3.0 hrs/credit)", value: "stem" },
      ],
    },
    {
      kind: "choice",
      key: "targetGradeTier",
      label: "Target Grade Ambition",
      default: "a_grade",
      options: [
        { label: "Grade A Mastery (1.2x Multiplier)", value: "a_grade" },
        { label: "Grade B Solid Competency (1.0x Multiplier)", value: "b_grade" },
        { label: "Passing Grade C Threshold (0.75x Multiplier)", value: "c_grade" },
      ],
    },
  ],
  presets: [
    { label: "Full-Time Engineering (16 cr, STEM, Grade A)", values: { enrolledCreditHours: 16, academicRigor: "stem", targetGradeTier: "a_grade" } },
    { label: "Standard College Load (15 cr, Standard, Grade A)", values: { enrolledCreditHours: 15, academicRigor: "standard", targetGradeTier: "a_grade" } },
    { label: "Part-Time Working Student (9 cr, Standard, Grade B)", values: { enrolledCreditHours: 9, academicRigor: "standard", targetGradeTier: "b_grade" } },
    { label: "Heavy Pre-Med Double Major (18 cr, STEM, Grade A)", values: { enrolledCreditHours: 18, academicRigor: "stem", targetGradeTier: "a_grade" } },
  ],
  compute: (vals) => {
    const credits = Math.max(1, Number(vals.enrolledCreditHours) || 15);
    const rigor = String(vals.academicRigor || "standard");
    const target = String(vals.targetGradeTier || "a_grade");

    const rigorMult = rigor === "stem" ? 3.0 : rigor === "intro" ? 1.5 : 2.0;
    const gradeMult = target === "a_grade" ? 1.2 : target === "c_grade" ? 0.75 : 1.0;

    const baseStudyHours = credits * rigorMult;
    const adjustedWeeklyStudy = baseStudyHours * gradeMult;
    const totalWeeklyAcademicTime = credits + adjustedWeeklyStudy; // Lecture + study
    const dailyStudy5Day = adjustedWeeklyStudy / 5.0;
    const dailyStudy7Day = adjustedWeeklyStudy / 7.0;

    let workload = "Balanced Collegiate Commitment";
    let tone: "good" | "warn" | "bad" = "good";

    if (totalWeeklyAcademicTime > 55) {
      workload = "Heavy Overload (Burnout Risk Without Strict Schedule)";
      tone = "bad";
    } else if (totalWeeklyAcademicTime > 40) {
      workload = "Rigorous Full-Time Equivalent (40+ Hours/Week)";
      tone = "warn";
    } else {
      workload = "Manageable Workload (Sustainable with Part-Time Work)";
      tone = "good";
    }

    return {
      hero: {
        label: "Recommended Weekly Study Hours",
        value: `${adjustedWeeklyStudy.toFixed(1)} hrs/week`,
      },
      badge: {
        text: workload,
        tone: tone,
      },
      rows: [
        { label: "Total Weekly Academic Commitment", value: `${totalWeeklyAcademicTime.toFixed(1)} hrs (${credits} class + ${adjustedWeeklyStudy.toFixed(1)} study)` },
        { label: "Daily Study Target (5-Day Week)", value: `${dailyStudy5Day.toFixed(1)} hours/day (Mon - Fri)` },
        { label: "Daily Study Target (7-Day Week)", value: `${dailyStudy7Day.toFixed(1)} hours/day (Mon - Sun)` },
        { label: "Carnegie Baseline Standard (2:1 Rule)", value: `${(credits * 2).toFixed(1)} study hours/week` },
      ],
      steps: [
        `Carnegie Baseline Rule: ${credits} credit hours * ${rigorMult.toFixed(1)} hrs/credit = ${baseStudyHours.toFixed(1)} base study hours`,
        `Apply Grade Ambition Factor: ${baseStudyHours.toFixed(1)} * ${gradeMult.toFixed(2)}x = ${adjustedWeeklyStudy.toFixed(1)} study hours/week`,
        `Add Classroom Lecture Time: ${credits} in-class hours + ${adjustedWeeklyStudy.toFixed(1)} outside study = ${totalWeeklyAcademicTime.toFixed(1)} total hours`,
        `Daily Breakdown (5 Days): ${adjustedWeeklyStudy.toFixed(1)} / 5 = ${dailyStudy5Day.toFixed(1)} hours/day`,
      ],
      chart: {
        type: "donut",
        title: "Weekly Time Allocation (168 Total Hours)",
        format: "num",
        data: [
          { name: "Outside Study Hours", value: Math.round(adjustedWeeklyStudy), color: "#3b82f6" },
          { name: "Classroom Lecture Hours", value: credits, color: "#10b981" },
          { name: "Sleep & Health (56 hrs)", value: 56, color: "#8b5cf6" },
          { name: "Personal, Work & Leisure", value: Math.max(0, 168 - Math.round(totalWeeklyAcademicTime) - 56), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function StudyHoursCalculatorComponent() {
  return <CalcEngine config={studyHoursConfig} />;
}
