"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const monthCalculatorConfig: CalcConfig = {
  id: "month-calculator",
  title: "Month Span & Lunar Synodic Calculator",
  fields: [
    { kind: "choice", key: "startMonth", label: "Start Month", default: "1", options: [
      { label: "January", value: "1" }, { label: "February", value: "2" }, { label: "March", value: "3" },
      { label: "April", value: "4" }, { label: "May", value: "5" }, { label: "June", value: "6" },
      { label: "July", value: "7" }, { label: "August", value: "8" }, { label: "September", value: "9" },
      { label: "October", value: "10" }, { label: "November", value: "11" }, { label: "December", value: "12" },
    ] },
    { kind: "number", key: "monthOffset", label: "Months to Add / Subtract", default: 6, min: -120, max: 120 },
  ],
  presets: [
    { label: "Half-Year Horizon (+6 Months from Jan)", values: { startMonth: "1", monthOffset: 6 } },
    { label: "Nine-Month Gestation Span (+9 Months from Mar)", values: { startMonth: "3", monthOffset: 9 } },
    { label: "One Quarter Forward (+3 Months from Oct)", values: { startMonth: "10", monthOffset: 3 } },
    { label: "Prior Quarter Retrospective (-3 Months from Jul)", values: { startMonth: "7", monthOffset: -3 } },
  ],
  compute: (vals) => {
    const startM = Number(vals.startMonth) || 1;
    const offset = Number(vals.monthOffset) || 6;

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let netM = (startM - 1 + offset) % 12;
    if (netM < 0) netM += 12;

    const targetMonthName = monthNames[netM];
    const daysInTarget = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][netM];
    const synodicMonths = Math.abs(offset) * (30.4375 / 29.53059);

    return {
      hero: {
        value: targetMonthName,
        label: `Resulting Month (${offset >= 0 ? `+${offset}` : offset} months from ${monthNames[startM - 1]})`,
        sub: `Standard length: ${daysInTarget} days (Quarter ${Math.floor(netM / 3) + 1})`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Annual Gregorian Month Length Distribution",
        data: [
          { name: "31-Day Months (7)", value: 7, color: "#10b981" },
          { name: "30-Day Months (4)", value: 4, color: "#3b82f6" },
          { name: "28/29-Day February (1)", value: 1, color: "#f59e0b" },
        ],
      },
      metrics: [
        { label: "Target Month", value: targetMonthName },
        { label: "Calendar Quarter", value: `Q${Math.floor(netM / 3) + 1}` },
        { label: "Days in Month", value: `${daysInTarget} Days` },
        { label: "Approx. Synodic Moons", value: `~${synodicMonths.toFixed(1)} cycles` },
      ],
      breakdown: [
        { label: "Starting Baseline Month", value: monthNames[startM - 1] },
        { label: "Month Offset Delta", value: `${offset >= 0 ? `+${offset}` : offset} months` },
        { label: "Calculated Target Month", value: targetMonthName },
        { label: "Month Number (1-12)", value: `${netM + 1}` },
        { label: "Quarter Number (Q1-Q4)", value: `Q${Math.floor(netM / 3) + 1}` },
      ],
      steps: [
        `Base month index: ${startM} (${monthNames[startM - 1]}).`,
        `Apply offset arithmetic: (${startM} - 1 + ${offset}) mod 12.`,
        `Resolve modulo index: ${netM} → corresponds to ${targetMonthName}.`,
        `Lookup standard calendar parameters: ${daysInTarget} days, Q${Math.floor(netM / 3) + 1}.`,
      ],
    };
  },
};

export default function MonthCalculatorComponent() {
  return <CalcEngine config={monthCalculatorConfig} />;
}
