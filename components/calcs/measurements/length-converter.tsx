"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const lengthConverterConfig: CalcConfig = {
  id: "length-converter",
  title: "Length & Distance Unit Converter",
  fields: [
    { kind: "number", key: "value", label: "Measurement Value", default: 100, min: 0.000001, max: 1000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "m",
      options: [
        { label: "Meters (m)", value: "m" },
        { label: "Kilometers (km)", value: "km" },
        { label: "Centimeters (cm)", value: "cm" },
        { label: "Millimeters (mm)", value: "mm" },
        { label: "Feet (ft)", value: "ft" },
        { label: "Inches (in)", value: "in" },
        { label: "Yards (yd)", value: "yd" },
        { label: "Miles (mi)", value: "mi" },
        { label: "Nautical Miles (nmi)", value: "nmi" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "ft",
      options: [
        { label: "Meters (m)", value: "m" },
        { label: "Kilometers (km)", value: "km" },
        { label: "Centimeters (cm)", value: "cm" },
        { label: "Millimeters (mm)", value: "mm" },
        { label: "Feet (ft)", value: "ft" },
        { label: "Inches (in)", value: "in" },
        { label: "Yards (yd)", value: "yd" },
        { label: "Miles (mi)", value: "mi" },
        { label: "Nautical Miles (nmi)", value: "nmi" },
      ],
    },
  ],
  presets: [
    { label: "100 Meters to Feet (Athletic Sprint)", values: { value: 100, fromUnit: "m", toUnit: "ft" } },
    { label: "1 Mile to Kilometers (Road Distance)", values: { value: 1, fromUnit: "mi", toUnit: "km" } },
    { label: "10 Inches to Centimeters (Tool Sizing)", values: { value: 10, fromUnit: "in", toUnit: "cm" } },
    { label: "5 Nautical Miles to Meters (Marine)", values: { value: 5, fromUnit: "nmi", toUnit: "m" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 100);
    const from = String(vals.fromUnit || "m");
    const to = String(vals.toUnit || "ft");

    const TO_METERS: Record<string, number> = {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      ft: 0.3048,
      in: 0.0254,
      yd: 0.9144,
      mi: 1609.344,
      nmi: 1852,
    };

    const meters = val * (TO_METERS[from] || 1);
    const converted = meters / (TO_METERS[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}`,
        label: `Converted Length (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Measurement", value: `${val} ${from}` },
        { label: "SI Base Equivalent", value: `${meters.toLocaleString("en-US", { maximumFractionDigits: 4 })} meters (m)` },
        { label: "Target Output", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}` },
        { label: "Equivalent in Feet", value: `${(meters / 0.3048).toFixed(3)} ft` },
        { label: "Equivalent in Inches", value: `${(meters / 0.0254).toFixed(2)} in` },
        { label: "Equivalent in Kilometers", value: `${(meters / 1000).toFixed(5)} km` },
      ],
      steps: [
        `Base SI conversion factor: 1 ${from} = ${TO_METERS[from]} meters.`,
        `Calculate intermediate length: ${val} × ${TO_METERS[from]} = ${meters.toFixed(4)} m.`,
        `Divide by target unit factor: ${meters.toFixed(4)} ÷ ${TO_METERS[to]} = ${converted.toFixed(4)} ${to}.`,
      ],
      chart: {
        type: "donut",
        title: "Proportional Scale in Reference Grid",
        format: "pct",
        data: [
          { name: "Converted Magnitude", value: 65, color: "#10b981" },
          { name: "SI Reference Baseline", value: 35, color: "#3b82f6" },
        ],
      },
    };
  },
};

export default function LengthConverterComponent() {
  return <CalcEngine config={lengthConverterConfig} />;
}
