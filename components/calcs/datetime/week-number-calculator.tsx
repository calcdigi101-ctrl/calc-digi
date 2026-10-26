"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const weekNumberCalculatorConfig: CalcConfig = {
  id: "week-number-calculator",
  title: "ISO 8601 Week Number & Fiscal Schedule Calculator",
  fields: [
    { kind: "date", key: "targetDate", label: "Calendar Date", default: "2026-10-26" },
  ],
  presets: [
    { label: "Late October Fiscal Q4 (2026-10-26)", values: { targetDate: "2026-10-26" } },
    { label: "Early January New Year (2026-01-02)", values: { targetDate: "2026-01-02" } },
    { label: "Mid-Year Peak Week (2026-07-01)", values: { targetDate: "2026-07-01" } },
    { label: "Year-End Closing Week (2026-12-28)", values: { targetDate: "2026-12-28" } },
  ],
  compute: (vals) => {
    const tStr = String(vals.targetDate || "2026-10-26");
    const d = new Date(tStr + "T00:00:00Z");

    // ISO 8601 week algorithm
    const date = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const isoYear = date.getUTCFullYear();

    const totalWeeksInYear = 52;
    const remWeeks = Math.max(0, totalWeeksInYear - weekNo);

    return {
      hero: {
        value: `Week ${weekNo}`,
        label: `ISO 8601 Week Number for ${tStr}`,
        sub: `ISO Year: ${isoYear}-W${String(weekNo).padStart(2, "0")} (${remWeeks} weeks remaining in year)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "52-Week Annual Progress",
        data: [
          { name: "Completed Weeks", value: Math.max(1, weekNo), color: "#10b981" },
          { name: "Remaining Operating Weeks", value: Math.max(1, remWeeks), color: "#3b82f6" },
        ],
      },
      metrics: [
        { label: "ISO Week Number", value: `Week ${weekNo}` },
        { label: "ISO Year Tag", value: `${isoYear}` },
        { label: "Fiscal Quarter", value: `Q${Math.ceil(weekNo / 13)}` },
        { label: "Annual Progress", value: `${Math.round((weekNo / 52) * 100)}%` },
      ],
      breakdown: [
        { label: "Input Calendar Date", value: tStr },
        { label: "ISO 8601 Week Identifier", value: `${isoYear}-W${String(weekNo).padStart(2, "0")}` },
        { label: "First Day of Week", value: "Monday (per ISO 8601)" },
        { label: "Fiscal Retail Quarter", value: `Quarter ${Math.ceil(weekNo / 13)}` },
        { label: "Weeks Remaining in Calendar", value: `${remWeeks} weeks` },
      ],
      steps: [
        `Locate Thursday of the current week (ISO 8601 anchor): ${date.toISOString().split("T")[0]}.`,
        `Determine ISO year corresponding to the Thursday anchor: ${isoYear}.`,
        `Compute day-of-year ordinal delta from January 1 of ISO year.`,
        `Divide by 7 and round up: Yields exact ISO Week ${weekNo}.`,
      ],
    };
  },
};

export default function WeekNumberCalculatorComponent() {
  return <CalcEngine config={weekNumberCalculatorConfig} />;
}
