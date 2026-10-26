"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const dateDifferenceCalculatorConfig: CalcConfig = {
  id: "date-difference-calculator",
  title: "Date Difference & Calendar Span Calculator",
  fields: [
    { kind: "date", key: "startDate", label: "Start Date", default: "2026-01-01" },
    { kind: "date", key: "endDate", label: "End Date", default: "2026-10-26" },
    { kind: "choice", key: "countMode", label: "End Date Inclusion", default: "exclusive", options: [
      { label: "Exclusive (Do not count end day)", value: "exclusive" },
      { label: "Inclusive (Count both start and end days)", value: "inclusive" },
    ] },
  ],
  presets: [
    { label: "Q1 to Q3 Year Span (Jan 1 → Oct 26, 2026)", values: { startDate: "2026-01-01", endDate: "2026-10-26", countMode: "exclusive" } },
    { label: "Standard Business Quarter (Jan 1 → Mar 31)", values: { startDate: "2026-01-01", endDate: "2026-03-31", countMode: "inclusive" } },
    { label: "Full Gregorian Year 2026 (Jan 1 → Dec 31)", values: { startDate: "2026-01-01", endDate: "2026-12-31", countMode: "inclusive" } },
    { label: "Summer Vacation Period (Jun 15 → Aug 31)", values: { startDate: "2026-06-15", endDate: "2026-08-31", countMode: "exclusive" } },
  ],
  compute: (vals) => {
    const sStr = String(vals.startDate || "2026-01-01");
    const eStr = String(vals.endDate || "2026-10-26");
    const inc = vals.countMode === "inclusive";

    const sDate = new Date(sStr + "T00:00:00Z");
    const eDate = new Date(eStr + "T00:00:00Z");

    const rawMs = eDate.getTime() - sDate.getTime();
    let totalDays = Math.floor(rawMs / (1000 * 60 * 60 * 24));
    if (inc && totalDays >= 0) totalDays += 1;

    const weeks = Math.floor(Math.abs(totalDays) / 7);
    const remDays = Math.abs(totalDays) % 7;
    const hours = Math.abs(totalDays) * 24;

    const workdaysApprox = Math.round(totalDays * (5 / 7));
    const weekendDays = totalDays - workdaysApprox;

    return {
      hero: {
        value: `${totalDays.toLocaleString()} Days`,
        label: "Total Calendar Difference",
        sub: `${weeks} weeks and ${remDays} days (${inc ? "inclusive" : "exclusive"})`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Date Range Composition",
        data: [
          { name: "Estimated Business Workdays", value: Math.max(1, workdaysApprox), color: "#10b981" },
          { name: "Estimated Weekend Days", value: Math.max(1, weekendDays), color: "#f59e0b" },
        ],
      },
      metrics: [
        { label: "Elapsed Weeks", value: `${weeks} wks, ${remDays} d` },
        { label: "Total Hours", value: `${hours.toLocaleString()} hrs` },
        { label: "Approx. Workdays", value: `~${workdaysApprox} days` },
        { label: "Month Approximation", value: `~${(totalDays / 30.4375).toFixed(1)} mos` },
      ],
      breakdown: [
        { label: "Start Date Anchor", value: sStr },
        { label: "End Date Anchor", value: eStr },
        { label: "Day Inclusion Mode", value: inc ? "Inclusive (+1 day)" : "Exclusive (Standard)" },
        { label: "Julian Day Number Delta", value: `${totalDays} days` },
        { label: "Total Minutes Span", value: `${(hours * 60).toLocaleString()} mins` },
        { label: "Percentage of Standard Year", value: `${((totalDays / 365) * 100).toFixed(1)}%` },
      ],
      steps: [
        `Convert start date ${sStr} and end date ${eStr} to UTC millisecond timestamps.`,
        `Calculate raw elapsed milliseconds: ${eDate.getTime()} - ${sDate.getTime()} = ${rawMs} ms.`,
        `Divide by milliseconds per astronomical day (86,400,000): Raw days = ${Math.floor(rawMs / 86400000)}.`,
        `Apply ${inc ? "inclusive mode (+1 day)" : "exclusive mode"}: Net difference = ${totalDays} days.`,
      ],
    };
  },
};

export default function DateDifferenceCalculatorComponent() {
  return <CalcEngine config={dateDifferenceCalculatorConfig} />;
}
