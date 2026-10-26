"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const attendanceConfig: CalcConfig = {
  id: "attendance-calculator",
  title: "Class Attendance Percentage & Mandatory Compliance Calculator",
  fields: [
    { kind: "number", key: "totalClassesHeld", label: "Total Class Sessions Held to Date", default: 40, min: 1, max: 200 },
    { kind: "number", key: "classesAttended", label: "Class Sessions Successfully Attended", default: 34, min: 0, max: 200 },
    { kind: "number", key: "minRequiredRate", label: "Mandatory Minimum Attendance Rate (%)", default: 75.0, min: 50, max: 100 },
    { kind: "number", key: "futureClassesScheduled", label: "Remaining Future Class Sessions", default: 20, min: 0, max: 100 },
  ],
  presets: [
    { label: "University 75% Rule (Midterm Status)", values: { totalClassesHeld: 40, classesAttended: 34, minRequiredRate: 75.0, futureClassesScheduled: 20 } },
    { label: "Strict 85% Professional Bar", values: { totalClassesHeld: 50, classesAttended: 44, minRequiredRate: 85.0, futureClassesScheduled: 30 } },
    { label: "High School 90% Truancy Threshold", values: { totalClassesHeld: 80, classesAttended: 75, minRequiredRate: 90.0, futureClassesScheduled: 40 } },
    { label: "Attendance Recovery Mode", values: { totalClassesHeld: 30, classesAttended: 21, minRequiredRate: 75.0, futureClassesScheduled: 25 } },
  ],
  compute: (vals) => {
    const held = Math.max(1, Number(vals.totalClassesHeld) || 40);
    const attended = Math.min(held, Math.max(0, Number(vals.classesAttended) || 34));
    const reqRate = Math.min(100, Math.max(50, Number(vals.minRequiredRate) || 75.0));
    const future = Math.max(0, Number(vals.futureClassesScheduled) || 20);

    const missed = held - attended;
    const currentRate = (attended / held) * 100.0;
    const totalTermSessions = held + future;
    const maxPermittedAbsences = Math.floor(totalTermSessions * (1.0 - reqRate / 100.0));
    const remainingAbsencesAllowable = Math.max(0, maxPermittedAbsences - missed);

    // Required future classes to reach target
    // (attended + X) / (held + future) >= reqRate / 100
    const neededAttendedTotal = Math.ceil(totalTermSessions * (reqRate / 100.0));
    const futureClassesNeeded = Math.max(0, neededAttendedTotal - attended);

    let status = "Compliant (Good Standing)";
    let tone: "good" | "warn" | "bad" = "good";

    if (currentRate >= reqRate + 5) {
      status = "Fully Compliant (Safe Buffer)";
      tone = "good";
    } else if (currentRate >= reqRate) {
      status = "Borderline Compliant (Low Margin)";
      tone = "good";
    } else if (futureClassesNeeded <= future) {
      status = "At-Risk (Recovery Achievable with Perfect Attendance)";
      tone = "warn";
    } else {
      status = "Disbarment Risk (Mathematically Cannot Reach Threshold)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Current Attendance Percentage",
        value: `${currentRate.toFixed(1)}%`,
      },
      badge: {
        text: status,
        tone: tone,
      },
      rows: [
        { label: "Sessions Attended vs Missed", value: `${attended} attended / ${missed} missed (${held} total held)` },
        { label: "Maximum Allowable Future Absences", value: remainingAbsencesAllowable > 0 ? `${remainingAbsencesAllowable} more cuts allowed` : "0 (No further cuts permitted)" },
        { label: "Must-Attend Future Sessions", value: `${Math.min(future, futureClassesNeeded)} out of ${future} remaining sessions` },
        { label: "Projected Attendance if All Remaining Attended", value: `${(((attended + future) / totalTermSessions) * 100).toFixed(1)}%` },
      ],
      steps: [
        `Current Attendance Rate = (${attended} / ${held}) * 100 = ${currentRate.toFixed(2)}%`,
        `Total Term Scheduled Classes = ${held} held + ${future} future = ${totalTermSessions} sessions`,
        `Maximum Permissible Lifetime Absences = floor(${totalTermSessions} * (1 - ${reqRate}/100)) = ${maxPermittedAbsences} sessions`,
        `Remaining Absence Buffer = ${maxPermittedAbsences} - ${missed} already missed = ${remainingAbsencesAllowable} sessions`,
        `Minimum Future Attendance Required = ceil(${totalTermSessions} * ${reqRate / 100}) - ${attended} = ${futureClassesNeeded} sessions`,
      ],
      chart: {
        type: "donut",
        title: "Session Attendance & Compliance Distribution",
        format: "num",
        data: [
          { name: "Classes Attended", value: attended, color: "#10b981" },
          { name: "Allowable Future Cuts", value: remainingAbsencesAllowable, color: "#3b82f6" },
          { name: "Absences Used", value: missed, color: "#ef4444" },
        ],
      },
    };
  },
};

export default function AttendanceCalculatorComponent() {
  return <CalcEngine config={attendanceConfig} />;
}
