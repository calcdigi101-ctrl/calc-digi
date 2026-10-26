"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const workdaysCalculatorConfig: CalcConfig = {
  id: "workdays-calculator",
  title: "Business Workdays & Project Float Calculator",
  fields: [
    { kind: "date", key: "startDate", label: "Project Start Date", default: "2026-11-01" },
    { kind: "date", key: "endDate", label: "Target Completion Date", default: "2026-12-31" },
    { kind: "number", key: "publicHolidays", label: "Statutory Public Holidays (Days)", default: 3, min: 0, max: 30 },
  ],
  presets: [
    { label: "Q4 Year-End Sprint (Nov 1 → Dec 31, 3 Holidays)", values: { startDate: "2026-11-01", endDate: "2026-12-31", publicHolidays: 3 } },
    { label: "Full Calendar Month (Nov 1 → Nov 30, 2 Holidays)", values: { startDate: "2026-11-01", endDate: "2026-11-30", publicHolidays: 2 } },
    { label: "Quarter 1 Sprint (Jan 1 → Mar 31, 2 Holidays)", values: { startDate: "2026-01-01", endDate: "2026-03-31", publicHolidays: 2 } },
    { label: "Summer Project Period (Jun 1 → Aug 31, 1 Holiday)", values: { startDate: "2026-06-01", endDate: "2026-08-31", publicHolidays: 1 } },
  ],
  compute: (vals) => {
    const sStr = String(vals.startDate || "2026-11-01");
    const eStr = String(vals.endDate || "2026-12-31");
    const hol = Number(vals.publicHolidays) || 0;

    const s = new Date(sStr + "T00:00:00Z");
    const e = new Date(eStr + "T00:00:00Z");

    let cur = new Date(s);
    let totalDays = 0;
    let weekendDays = 0;
    let workdaysRaw = 0;

    while (cur <= e) {
      totalDays += 1;
      const day = cur.getUTCDay();
      if (day === 0 || day === 6) {
        weekendDays += 1;
      } else {
        workdaysRaw += 1;
      }
      cur.setUTCDate(cur.getUTCDate() + 1);
    }

    const netWorkdays = Math.max(0, workdaysRaw - hol);
    const billableHours = netWorkdays * 8;

    return {
      hero: {
        value: `${netWorkdays} Business Days`,
        label: "Net Working Days",
        sub: `${totalDays} total calendar days (${weekendDays} weekend days, ${hol} public holidays)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Calendar Workday Allocation",
        data: [
          { name: "Net Business Workdays", value: Math.max(1, netWorkdays), color: "#10b981" },
          { name: "Weekend Days (Sat/Sun)", value: Math.max(1, weekendDays), color: "#3b82f6" },
          { name: "Statutory Holidays", value: Math.max(1, hol), color: "#f59e0b" },
        ],
      },
      metrics: [
        { label: "Net Working Days", value: `${netWorkdays} days` },
        { label: "Standard Work Hours (8h/d)", value: `${billableHours} hrs` },
        { label: "Weekend Days", value: `${weekendDays} days` },
        { label: "Deducted Holidays", value: `${hol} days` },
      ],
      breakdown: [
        { label: "Project Start Date", value: sStr },
        { label: "Target End Date", value: eStr },
        { label: "Total Calendar Span", value: `${totalDays} days` },
        { label: "Gross Monday–Friday Days", value: `${workdaysRaw} days` },
        { label: "Public Holidays Deducted", value: `${hol} days` },
        { label: "Workday Utilization Ratio", value: `${((netWorkdays / totalDays) * 100).toFixed(1)}%` },
      ],
      steps: [
        `Iterate through calendar days from ${sStr} to ${eStr}: Total = ${totalDays} days.`,
        `Identify Saturday and Sunday weekends: ${weekendDays} weekend days excluded.`,
        `Gross weekday count (Mon-Fri): ${workdaysRaw} days.`,
        `Deduct observed statutory public holidays: ${workdaysRaw} − ${hol} = ${netWorkdays} net business days.`,
      ],
    };
  },
};

export default function WorkdaysCalculatorComponent() {
  return <CalcEngine config={workdaysCalculatorConfig} />;
}
