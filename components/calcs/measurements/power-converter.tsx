"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const powerConverterConfig: CalcConfig = {
  id: "power-converter",
  title: "Power & Energy Rate Converter",
  fields: [
    { kind: "number", key: "value", label: "Power Value", default: 100, min: 0.000001, max: 10000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "hp",
      options: [
        { label: "Mechanical Horsepower (hp)", value: "hp" },
        { label: "Kilowatts (kW)", value: "kw" },
        { label: "Watts (W)", value: "w" },
        { label: "Megawatts (MW)", value: "mw" },
        { label: "Metric Horsepower (PS / cv)", value: "ps" },
        { label: "BTU per hour (BTU/h)", value: "btuh" },
        { label: "Foot-pounds per second (ft·lb/s)", value: "ftlbs" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "kw",
      options: [
        { label: "Mechanical Horsepower (hp)", value: "hp" },
        { label: "Kilowatts (kW)", value: "kw" },
        { label: "Watts (W)", value: "w" },
        { label: "Megawatts (MW)", value: "mw" },
        { label: "Metric Horsepower (PS / cv)", value: "ps" },
        { label: "BTU per hour (BTU/h)", value: "btuh" },
        { label: "Foot-pounds per second (ft·lb/s)", value: "ftlbs" },
      ],
    },
  ],
  presets: [
    { label: "150 hp to Kilowatts (Automotive Engine)", values: { value: 150, fromUnit: "hp", toUnit: "kw" } },
    { label: "10 kW to Horsepower (Industrial Motor)", values: { value: 10, fromUnit: "kw", toUnit: "hp" } },
    { label: "36,000 BTU/h to kW (Central AC 3 Tons)", values: { value: 36000, fromUnit: "btuh", toUnit: "kw" } },
    { label: "1 Megawatt to Horsepower (Locomotive)", values: { value: 1, fromUnit: "mw", toUnit: "hp" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 100);
    const from = String(vals.fromUnit || "hp");
    const to = String(vals.toUnit || "kw");

    const TO_WATTS: Record<string, number> = {
      w: 1,
      kw: 1000,
      mw: 1000000,
      hp: 745.69987158227022,
      ps: 735.49875,
      btuh: 0.29307107,
      ftlbs: 1.3558179483314,
    };

    const watts = val * (TO_WATTS[from] || 1);
    const converted = watts / (TO_WATTS[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${to}`,
        label: `Converted Power (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Power", value: `${val} ${from}` },
        { label: "SI Watts (J/s)", value: `${watts.toLocaleString("en-US", { maximumFractionDigits: 1 })} W` },
        { label: "Converted Target Power", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${to}` },
        { label: "Equivalent in Kilowatts", value: `${(watts / 1000).toFixed(2)} kW` },
        { label: "Equivalent in Mechanical hp", value: `${(watts / 745.7).toFixed(2)} hp` },
        { label: "Equivalent in BTU/hour", value: `${(watts / 0.293071).toLocaleString("en-US", { maximumFractionDigits: 0 })} BTU/h` },
      ],
      steps: [
        `Convert to SI standard Watts: ${val} × ${TO_WATTS[from].toFixed(3)} = ${watts.toFixed(1)} W.`,
        `Divide by target rate multiplier: ${watts.toFixed(1)} ÷ ${TO_WATTS[to].toFixed(3)} = ${converted.toFixed(3)} ${to}.`,
        `One hour energy consumption: ${(watts / 1000).toFixed(2)} kWh.`,
      ],
      chart: {
        type: "donut",
        title: "Power Delivery Efficiency",
        format: "pct",
        data: [
          { name: "Active Mechanical Work", value: 82, color: "#10b981" },
          { name: "Thermal Losses", value: 18, color: "#ef4444" },
        ],
      },
    };
  },
};

export default function PowerConverterComponent() {
  return <CalcEngine config={powerConverterConfig} />;
}
