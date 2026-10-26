"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const areaConverterConfig: CalcConfig = {
  id: "area-converter",
  title: "Area & Land Measurement Converter",
  fields: [
    { kind: "number", key: "value", label: "Area Value", default: 1000, min: 0.000001, max: 1000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "sqft",
      options: [
        { label: "Square Feet (sq ft)", value: "sqft" },
        { label: "Square Meters (m²)", value: "sqm" },
        { label: "Acres (ac)", value: "ac" },
        { label: "Hectares (ha)", value: "ha" },
        { label: "Square Kilometers (km²)", value: "sqkm" },
        { label: "Square Miles (sq mi)", value: "sqmi" },
        { label: "Square Yards (sq yd)", value: "sqyd" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "sqm",
      options: [
        { label: "Square Feet (sq ft)", value: "sqft" },
        { label: "Square Meters (m²)", value: "sqm" },
        { label: "Acres (ac)", value: "ac" },
        { label: "Hectares (ha)", value: "ha" },
        { label: "Square Kilometers (km²)", value: "sqkm" },
        { label: "Square Miles (sq mi)", value: "sqmi" },
        { label: "Square Yards (sq yd)", value: "sqyd" },
      ],
    },
  ],
  presets: [
    { label: "2,000 sq ft to m² (Typical Family Home)", values: { value: 2000, fromUnit: "sqft", toUnit: "sqm" } },
    { label: "1 Acre to Square Feet (Real Estate)", values: { value: 1, fromUnit: "ac", toUnit: "sqft" } },
    { label: "10 Hectares to Acres (Agricultural)", values: { value: 10, fromUnit: "ha", toUnit: "ac" } },
    { label: "5 Square Miles to km² (Regional Map)", values: { value: 5, fromUnit: "sqmi", toUnit: "sqkm" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 1000);
    const from = String(vals.fromUnit || "sqft");
    const to = String(vals.toUnit || "sqm");

    const TO_SQM: Record<string, number> = {
      sqm: 1,
      sqft: 0.09290304,
      ac: 4046.8564224,
      ha: 10000,
      sqkm: 1000000,
      sqmi: 2589988.110336,
      sqyd: 0.83612736,
    };

    const sqm = val * (TO_SQM[from] || 1);
    const converted = sqm / (TO_SQM[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}`,
        label: `Converted Land Area (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Area", value: `${val} ${from}` },
        { label: "Metric Square Meters", value: `${sqm.toLocaleString("en-US", { maximumFractionDigits: 2 })} m²` },
        { label: "Converted Target Value", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}` },
        { label: "Equivalent in Acres", value: `${(sqm / 4046.856).toFixed(4)} acres` },
        { label: "Equivalent in Hectares", value: `${(sqm / 10000).toFixed(4)} ha` },
        { label: "Equivalent in Square Feet", value: `${(sqm / 0.092903).toLocaleString("en-US", { maximumFractionDigits: 1 })} sq ft` },
      ],
      steps: [
        `Convert to SI metric base: ${val} × ${TO_SQM[from]} = ${sqm.toFixed(2)} m².`,
        `Divide by target unit multiplier: ${sqm.toFixed(2)} ÷ ${TO_SQM[to]} = ${converted.toFixed(4)} ${to}.`,
        `Side length of equivalent perfect square: √(${sqm.toFixed(2)} m²) = ${Math.sqrt(sqm).toFixed(2)} meters.`,
      ],
      chart: {
        type: "donut",
        title: "Land Parcel Footprint Proportion",
        format: "pct",
        data: [
          { name: "Usable Footprint", value: 78, color: "#10b981" },
          { name: "Boundary Setback", value: 22, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function AreaConverterComponent() {
  return <CalcEngine config={areaConverterConfig} />;
}
