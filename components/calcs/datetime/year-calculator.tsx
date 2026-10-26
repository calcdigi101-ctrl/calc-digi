"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const yearCalculatorConfig: CalcConfig = {
  id: "year-calculator",
  title: "Gregorian & Astronomical Year Span Calculator",
  fields: [
    { kind: "number", key: "startYear", label: "Start Year", default: 2026, min: 1, max: 9999 },
    { kind: "number", key: "endYear", label: "End Year", default: 2050, min: 1, max: 9999 },
  ],
  presets: [
    { label: "Mid-Century Horizon (2026 → 2050)", values: { startYear: 2026, endYear: 2050 } },
    { label: "One Decade Span (2026 → 2036)", values: { startYear: 2026, endYear: 2036 } },
    { label: "Full 21st Century Remainder (2026 → 2100)", values: { startYear: 2026, endYear: 2100 } },
    { label: "Silver Jubilee Span (2000 → 2025)", values: { startYear: 2000, endYear: 2025 } },
  ],
  compute: (vals) => {
    const y1 = Math.round(Number(vals.startYear) || 2026);
    const y2 = Math.round(Number(vals.endYear) || 2050);

    const minYear = Math.min(y1, y2);
    const maxYear = Math.max(y1, y2);
    const totalYears = maxYear - minYear;

    let leapCount = 0;
    for (let yr = minYear; yr < maxYear; yr++) {
      if ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0) {
        leapCount += 1;
      }
    }

    const commonCount = totalYears - leapCount;
    const totalDays = commonCount * 365 + leapCount * 366;
    const totalHours = totalDays * 24;

    return {
      hero: {
        value: `${totalYears} Years (${totalDays.toLocaleString()} Days)`,
        label: `Calendar Year Span (${minYear} → ${maxYear})`,
        sub: `Contains ${leapCount} leap years and ${commonCount} standard 365-day common years`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Year Classification Across Selected Horizon",
        data: [
          { name: "Common Years (365d)", value: Math.max(1, commonCount), color: "#3b82f6" },
          { name: "Leap Years (366d)", value: Math.max(1, leapCount), color: "#10b981" },
        ],
      },
      metrics: [
        { label: "Elapsed Years", value: `${totalYears} Years` },
        { label: "Total Calendar Days", value: `${totalDays.toLocaleString()} Days` },
        { label: "Leap Year Count", value: `${leapCount} Leap Years` },
        { label: "Total Solar Hours", value: `${totalHours.toLocaleString()} hrs` },
      ],
      breakdown: [
        { label: "Start Year Anchor", value: `${minYear}` },
        { label: "End Year Anchor", value: `${maxYear}` },
        { label: "Common 365-Day Years", value: `${commonCount}` },
        { label: "Leap 366-Day Years", value: `${leapCount}` },
        { label: "Total Astronomical Days", value: `${totalDays.toLocaleString()} days` },
        { label: "Decades Covered", value: `${(totalYears / 10).toFixed(1)} decades` },
      ],
      steps: [
        `Calculate gross year delta: ${maxYear} − ${minYear} = ${totalYears} calendar years.`,
        `Iterate through Gregorian range to count 366-day leap years: ${leapCount} leap years identified.`,
        `Multiply common years (${commonCount} × 365) and leap years (${leapCount} × 366).`,
        `Sum cumulative duration: Total = ${totalDays.toLocaleString()} days (${totalHours.toLocaleString()} hours).`,
      ],
    };
  },
};

export default function YearCalculatorComponent() {
  return <CalcEngine config={yearCalculatorConfig} />;
}
