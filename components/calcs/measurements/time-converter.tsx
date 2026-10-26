"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const timeConverterConfig: CalcConfig = {
  id: "time-converter",
  title: "Time & Chronological Duration Converter",
  fields: [
    { kind: "number", key: "value", label: "Duration Value", default: 24, min: 0.000001, max: 100000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "hr",
      options: [
        { label: "Hours (hr)", value: "hr" },
        { label: "Days (d)", value: "d" },
        { label: "Minutes (min)", value: "min" },
        { label: "Seconds (s)", value: "s" },
        { label: "Weeks (wk)", value: "wk" },
        { label: "Months (avg 30.44 d)", value: "mo" },
        { label: "Years (365.25 d)", value: "yr" },
        { label: "Milliseconds (ms)", value: "ms" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "s",
      options: [
        { label: "Hours (hr)", value: "hr" },
        { label: "Days (d)", value: "d" },
        { label: "Minutes (min)", value: "min" },
        { label: "Seconds (s)", value: "s" },
        { label: "Weeks (wk)", value: "wk" },
        { label: "Months (avg 30.44 d)", value: "mo" },
        { label: "Years (365.25 d)", value: "yr" },
        { label: "Milliseconds (ms)", value: "ms" },
      ],
    },
  ],
  presets: [
    { label: "24 Hours to Seconds (Full Day)", values: { value: 24, fromUnit: "hr", toUnit: "s" } },
    { label: "1 Year to Hours (Annual Total)", values: { value: 1, fromUnit: "yr", toUnit: "hr" } },
    { label: "10,000 Minutes to Days (Long Duration)", values: { value: 10000, fromUnit: "min", toUnit: "d" } },
    { label: "500 Milliseconds to Seconds (Latency)", values: { value: 500, fromUnit: "ms", toUnit: "s" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 24);
    const from = String(vals.fromUnit || "hr");
    const to = String(vals.toUnit || "s");

    const TO_SECONDS: Record<string, number> = {
      s: 1,
      ms: 0.001,
      min: 60,
      hr: 3600,
      d: 86400,
      wk: 604800,
      mo: 2629800,
      yr: 31557600,
    };

    const seconds = val * (TO_SECONDS[from] || 3600);
    const converted = seconds / (TO_SECONDS[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}`,
        label: `Converted Duration (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Duration", value: `${val} ${from}` },
        { label: "SI Base Seconds", value: `${seconds.toLocaleString("en-US", { maximumFractionDigits: 2 })} s` },
        { label: "Converted Target Duration", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}` },
        { label: "Equivalent in Hours", value: `${(seconds / 3600).toFixed(2)} hr` },
        { label: "Equivalent in Days", value: `${(seconds / 86400).toFixed(3)} days` },
        { label: "Equivalent in Weeks", value: `${(seconds / 604800).toFixed(4)} weeks` },
      ],
      steps: [
        `Convert to SI standard atomic seconds: ${val} × ${TO_SECONDS[from]} = ${seconds.toLocaleString()} s.`,
        `Divide by target duration coefficient: ${seconds.toLocaleString()} ÷ ${TO_SECONDS[to]} = ${converted.toFixed(4)} ${to}.`,
      ],
      chart: {
        type: "donut",
        title: "Daily Epoch Cycle Proportion",
        format: "pct",
        data: [
          { name: "Elapsed Proportion", value: Math.min(100, Math.round((seconds % 86400) / 864)) || 50, color: "#6366f1" },
          { name: "Remaining Solar Day", value: Math.max(0, 100 - (Math.min(100, Math.round((seconds % 86400) / 864)) || 50)), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function TimeConverterComponent() {
  return <CalcEngine config={timeConverterConfig} />;
}
