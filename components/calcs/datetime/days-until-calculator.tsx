"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const daysUntilCalculatorConfig: CalcConfig = {
  id: "days-until-calculator",
  title: "Days Until Event Countdown Calculator",
  fields: [
    { kind: "date", key: "targetDate", label: "Future Event Target Date", default: "2026-12-31" },
    { kind: "text", key: "eventName", label: "Event Name (Optional)", default: "New Year's Eve 2027" },
  ],
  presets: [
    { label: "New Year's Eve 2027 (Dec 31, 2026)", values: { targetDate: "2026-12-31", eventName: "New Year's Eve" } },
    { label: "Winter Solstice 2026 (Dec 21, 2026)", values: { targetDate: "2026-12-21", eventName: "Winter Solstice" } },
    { label: "Spring Equinox 2027 (Mar 20, 2027)", values: { targetDate: "2027-03-20", eventName: "Spring Equinox" } },
    { label: "Independence Day 2027 (Jul 4, 2027)", values: { targetDate: "2027-07-04", eventName: "Independence Day" } },
  ],
  compute: (vals) => {
    const tStr = String(vals.targetDate || "2026-12-31");
    const name = String(vals.eventName || "Event");
    const now = new Date("2026-10-26T00:00:00Z");
    const target = new Date(tStr + "T00:00:00Z");

    const diffMs = target.getTime() - now.getTime();
    const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(Math.max(0, totalDays) / 7);
    const remDays = Math.max(0, totalDays) % 7;
    const hours = Math.max(0, totalDays) * 24;

    const daysInYear = 365;
    const progressPct = Math.min(100, Math.max(0, Math.round(((daysInYear - totalDays) / daysInYear) * 100)));

    return {
      hero: {
        value: totalDays >= 0 ? `${totalDays} Days Left` : `${Math.abs(totalDays)} Days Ago`,
        label: `Countdown to ${name}`,
        sub: `Target date: ${tStr} (${weeks} weeks, ${remDays} days away)`,
        tone: totalDays >= 0 ? "good" : "warn",
      },
      chart: {
        type: "donut",
        title: "Countdown Progress vs Annual Orbit",
        data: [
          { name: "Days Remaining", value: Math.max(1, totalDays), color: "#10b981" },
          { name: "Days Elapsed in Cycle", value: Math.max(1, 365 - Math.max(0, totalDays)), color: "#3b82f6" },
        ],
      },
      metrics: [
        { label: "Days Remaining", value: `${totalDays} days` },
        { label: "Weeks & Days", value: `${weeks}w ${remDays}d` },
        { label: "Total Hours Remaining", value: `${hours.toLocaleString()} hrs` },
        { label: "Working Days (~5/7)", value: `~${Math.round(totalDays * (5 / 7))} days` },
      ],
      breakdown: [
        { label: "Event Name", value: name },
        { label: "Reference Date", value: "2026-10-26" },
        { label: "Target Date", value: tStr },
        { label: "Total Elapsed Days", value: `${totalDays} days` },
        { label: "Equivalent Sleep Cycles", value: `~${totalDays} nights` },
        { label: "Total Weekends Left", value: `~${weeks} weekends` },
      ],
      steps: [
        `Establish current temporal baseline: 2026-10-26.`,
        `Set target event horizon: ${tStr} (${name}).`,
        `Calculate delta in milliseconds: ${diffMs.toLocaleString()} ms.`,
        `Convert to standard days: ${totalDays} calendar days (${weeks} full weeks, ${remDays} days).`,
      ],
    };
  },
};

export default function DaysUntilCalculatorComponent() {
  return <CalcEngine config={daysUntilCalculatorConfig} />;
}
