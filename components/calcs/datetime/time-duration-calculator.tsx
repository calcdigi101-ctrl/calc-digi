"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const timeDurationCalculatorConfig: CalcConfig = {
  id: "time-duration-calculator",
  title: "Elapsed Time Duration & Billing Hours Calculator",
  fields: [
    { kind: "text", key: "startTime", label: "Start Time (HH:MM or AM/PM)", default: "09:00" },
    { kind: "text", key: "endTime", label: "End Time (HH:MM or AM/PM)", default: "17:30" },
    { kind: "number", key: "breakMinutes", label: "Unpaid Break Duration (Minutes)", default: 45, min: 0, max: 480 },
  ],
  presets: [
    { label: "Corporate Standard (09:00 → 17:30, 45m Lunch)", values: { startTime: "09:00", endTime: "17:30", breakMinutes: 45 } },
    { label: "Four-Day Shift (08:00 → 18:30, 60m Break)", values: { startTime: "08:00", endTime: "18:30", breakMinutes: 60 } },
    { label: "Night Graveyard Shift (22:00 → 06:30, 30m Break)", values: { startTime: "22:00", endTime: "06:30", breakMinutes: 30 } },
    { label: "Short Half-Day Shift (09:00 → 13:00, 0m Break)", values: { startTime: "09:00", endTime: "13:00", breakMinutes: 0 } },
  ],
  compute: (vals) => {
    const parseM = (t: string) => {
      const parts = t.trim().split(":");
      const h = Number(parts[0]) || 0;
      const m = Number(parts[1]) || 0;
      return h * 60 + m;
    };

    let startM = parseM(String(vals.startTime || "09:00"));
    let endM = parseM(String(vals.endTime || "17:30"));
    const brk = Number(vals.breakMinutes) || 0;

    let grossM = endM - startM;
    if (grossM < 0) grossM += 24 * 60; // Overnight shift wrapping

    const netM = Math.max(0, grossM - brk);
    const netH = Math.floor(netM / 60);
    const netRemM = netM % 60;
    const decimalHours = netM / 60;

    return {
      hero: {
        value: `${netH}h ${netRemM}m (${decimalHours.toFixed(2)} hrs)`,
        label: "Net Billable Duration",
        sub: `Gross elapsed: ${Math.floor(grossM / 60)}h ${grossM % 60}m minus ${brk}m break`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Workshift Allocation Breakdown",
        data: [
          { name: "Net Productive Hours", value: Math.max(1, netM), color: "#10b981" },
          { name: "Break Time", value: Math.max(1, brk), color: "#f59e0b" },
        ],
      },
      metrics: [
        { label: "Net Billable Hours", value: `${decimalHours.toFixed(2)} hrs` },
        { label: "Gross Duration", value: `${Math.floor(grossM / 60)}h ${grossM % 60}m` },
        { label: "Deducted Break", value: `${brk} mins` },
        { label: "Total Net Minutes", value: `${netM} mins` },
      ],
      breakdown: [
        { label: "Start Timestamp", value: String(vals.startTime || "09:00") },
        { label: "End Timestamp", value: String(vals.endTime || "17:30") },
        { label: "Gross Span", value: `${Math.floor(grossM / 60)} hours, ${grossM % 60} mins` },
        { label: "Unpaid Break", value: `${brk} minutes` },
        { label: "Net Decimal Billing Hours", value: `${decimalHours.toFixed(4)} hours` },
        { label: "Standard 8-Hour Delta", value: `${(decimalHours - 8.0).toFixed(2)} hrs` },
      ],
      steps: [
        `Convert start time to minute of day: ${startM} minutes.`,
        `Convert end time to minute of day: ${endM} minutes (with overnight modulo check: Gross = ${grossM} mins).`,
        `Deduct unpaid break period: ${grossM} − ${brk} = ${netM} net minutes.`,
        `Divide by 60 for commercial payroll: ${netM} ÷ 60 = ${decimalHours.toFixed(2)} billable decimal hours.`,
      ],
    };
  },
};

export default function TimeDurationCalculatorComponent() {
  return <CalcEngine config={timeDurationCalculatorConfig} />;
}
