"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const timeCalculatorConfig: CalcConfig = {
  id: "time-calculator",
  title: "Sexagesimal Time Arithmetic & Modulo Calculator",
  fields: [
    { kind: "number", key: "h1", label: "Hours 1", default: 8, min: 0, max: 999 },
    { kind: "number", key: "m1", label: "Minutes 1", default: 45, min: 0, max: 59 },
    { kind: "choice", key: "op", label: "Arithmetic Operation", default: "add", options: [
      { label: "Add Time (+)", value: "add" },
      { label: "Subtract Time (−)", value: "sub" },
    ] },
    { kind: "number", key: "h2", label: "Hours 2", default: 3, min: 0, max: 999 },
    { kind: "number", key: "m2", label: "Minutes 2", default: 30, min: 0, max: 59 },
  ],
  presets: [
    { label: "Work Shift + Overtime (8h 45m + 3h 30m)", values: { h1: 8, m1: 45, op: "add", h2: 3, m2: 30 } },
    { label: "Full Flight Transit (12h 15m + 4h 45m)", values: { h1: 12, m1: 15, op: "add", h2: 4, m2: 45 } },
    { label: "Shift Deduction (10h 00m − 1h 45m Lunch)", values: { h1: 10, m1: 0, op: "sub", h2: 1, m2: 45 } },
    { label: "Sports Match Elapsed (2h 10m + 0h 45m)", values: { h1: 2, m1: 10, op: "add", h2: 0, m2: 45 } },
  ],
  compute: (vals) => {
    const h1 = Number(vals.h1) || 0;
    const m1 = Number(vals.m1) || 0;
    const h2 = Number(vals.h2) || 0;
    const m2 = Number(vals.m2) || 0;
    const op = vals.op === "sub" ? "sub" : "add";

    const totalM1 = h1 * 60 + m1;
    const totalM2 = h2 * 60 + m2;
    const netM = op === "add" ? totalM1 + totalM2 : Math.max(0, totalM1 - totalM2);

    const resH = Math.floor(netM / 60);
    const resM = netM % 60;
    const decimalHours = netM / 60;

    return {
      hero: {
        value: `${resH} Hours, ${resM} Minutes`,
        label: `Result of Time ${op === "add" ? "Addition" : "Subtraction"}`,
        sub: `Equivalent to ${decimalHours.toFixed(2)} decimal hours (${netM.toLocaleString()} total minutes)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Sexagesimal Ratio Breakdown",
        data: [
          { name: "Full Hours", value: Math.max(1, resH), color: "#10b981" },
          { name: "Minutes Portion (out of 60)", value: Math.max(1, resM), color: "#3b82f6" },
        ],
      },
      metrics: [
        { label: "Total Hours & Mins", value: `${resH}h ${resM}m` },
        { label: "Decimal Hours", value: `${decimalHours.toFixed(2)} hrs` },
        { label: "Total Minutes", value: `${netM.toLocaleString()} mins` },
        { label: "Total Seconds", value: `${(netM * 60).toLocaleString()} secs` },
      ],
      breakdown: [
        { label: "Time Operand 1", value: `${h1}h ${m1}m (${totalM1} mins)` },
        { label: "Operation", value: op === "add" ? "Addition (+)" : "Subtraction (−)" },
        { label: "Time Operand 2", value: `${h2}h ${m2}m (${totalM2} mins)` },
        { label: "Net Total Minutes", value: `${netM} minutes` },
        { label: "Decimal Precision", value: `${decimalHours.toFixed(4)} hours` },
      ],
      steps: [
        `Convert Time 1 to base minutes: (${h1} × 60) + ${m1} = ${totalM1} minutes.`,
        `Convert Time 2 to base minutes: (${h2} × 60) + ${m2} = ${totalM2} minutes.`,
        `Perform arithmetic: ${totalM1} ${op === "add" ? "+" : "−"} ${totalM2} = ${netM} minutes.`,
        `Decompose sexagesimal quotient and remainder: ${netM} ÷ 60 = ${resH} hours with ${resM} minutes remaining.`,
      ],
    };
  },
};

export default function TimeCalculatorComponent() {
  return <CalcEngine config={timeCalculatorConfig} />;
}
