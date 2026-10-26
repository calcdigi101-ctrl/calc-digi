"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const weightConverterConfig: CalcConfig = {
  id: "weight-converter",
  title: "Weight & Mass Unit Converter",
  fields: [
    { kind: "number", key: "value", label: "Mass / Weight Value", default: 70, min: 0.000001, max: 1000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "kg",
      options: [
        { label: "Kilograms (kg)", value: "kg" },
        { label: "Pounds (lb)", value: "lb" },
        { label: "Grams (g)", value: "g" },
        { label: "Ounces (oz)", value: "oz" },
        { label: "Stone (st)", value: "st" },
        { label: "Metric Tonnes (t)", value: "t" },
        { label: "Milligrams (mg)", value: "mg" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "lb",
      options: [
        { label: "Kilograms (kg)", value: "kg" },
        { label: "Pounds (lb)", value: "lb" },
        { label: "Grams (g)", value: "g" },
        { label: "Ounces (oz)", value: "oz" },
        { label: "Stone (st)", value: "st" },
        { label: "Metric Tonnes (t)", value: "t" },
        { label: "Milligrams (mg)", value: "mg" },
      ],
    },
  ],
  presets: [
    { label: "70 Kilograms to Pounds (Adult Weight)", values: { value: 70, fromUnit: "kg", toUnit: "lb" } },
    { label: "150 Pounds to Kilograms (US Fitness)", values: { value: 150, fromUnit: "lb", toUnit: "kg" } },
    { label: "500 Grams to Ounces (Culinary)", values: { value: 500, fromUnit: "g", toUnit: "oz" } },
    { label: "2 Metric Tonnes to Pounds (Industrial)", values: { value: 2, fromUnit: "t", toUnit: "lb" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 70);
    const from = String(vals.fromUnit || "kg");
    const to = String(vals.toUnit || "lb");

    const TO_KG: Record<string, number> = {
      kg: 1,
      lb: 0.45359237,
      g: 0.001,
      oz: 0.028349523125,
      st: 6.35029318,
      t: 1000,
      mg: 0.000001,
    };

    const kg = val * (TO_KG[from] || 1);
    const converted = kg / (TO_KG[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}`,
        label: `Converted Mass (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Mass", value: `${val} ${from}` },
        { label: "SI Base Mass (Kilograms)", value: `${kg.toLocaleString("en-US", { maximumFractionDigits: 4 })} kg` },
        { label: "Target Converted Mass", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}` },
        { label: "Equivalent in Grams", value: `${(kg * 1000).toLocaleString("en-US", { maximumFractionDigits: 2 })} g` },
        { label: "Equivalent in Pounds", value: `${(kg / 0.45359237).toFixed(2)} lb` },
        { label: "Equivalent in Ounces", value: `${(kg / 0.028349523125).toFixed(2)} oz` },
      ],
      steps: [
        `Convert to SI base unit: ${val} ${from} × ${TO_KG[from]} = ${kg.toFixed(4)} kg.`,
        `Divide by target unit coefficient: ${kg.toFixed(4)} ÷ ${TO_KG[to]} = ${converted.toFixed(4)} ${to}.`,
        `Standard gravity weight force: W = m × g = ${kg.toFixed(2)} kg × 9.80665 m/s² = ${(kg * 9.80665).toFixed(1)} N.`,
      ],
      chart: {
        type: "donut",
        title: "Mass Proportion in Universal Reference Scale",
        format: "pct",
        data: [
          { name: "Active Mass Ratio", value: 72, color: "#10b981" },
          { name: "Unit Scaling Margin", value: 28, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function WeightConverterComponent() {
  return <CalcEngine config={weightConverterConfig} />;
}
