"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cookingMeasurementConverterConfig: CalcConfig = {
  id: "cooking-measurement-converter",
  title: "Cooking & Culinary Recipe Unit Converter",
  fields: [
    { kind: "number", key: "value", label: "Ingredient Measure", default: 1, min: 0.01, max: 10000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "cup",
      options: [
        { label: "Cups US (cup)", value: "cup" },
        { label: "Tablespoons (tbsp)", value: "tbsp" },
        { label: "Teaspoons (tsp)", value: "tsp" },
        { label: "Milliliters (mL)", value: "ml" },
        { label: "Fluid Ounces US (fl oz)", value: "floz" },
        { label: "Pints US (pt)", value: "pt" },
        { label: "Quarts US (qt)", value: "qt" },
        { label: "Grams (Flour approx)", value: "g_flour" },
        { label: "Grams (Sugar approx)", value: "g_sugar" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "tbsp",
      options: [
        { label: "Cups US (cup)", value: "cup" },
        { label: "Tablespoons (tbsp)", value: "tbsp" },
        { label: "Teaspoons (tsp)", value: "tsp" },
        { label: "Milliliters (mL)", value: "ml" },
        { label: "Fluid Ounces US (fl oz)", value: "floz" },
        { label: "Pints US (pt)", value: "pt" },
        { label: "Quarts US (qt)", value: "qt" },
        { label: "Grams (Flour approx)", value: "g_flour" },
        { label: "Grams (Sugar approx)", value: "g_sugar" },
      ],
    },
  ],
  presets: [
    { label: "1 Cup to Tablespoons (Baking Ratio)", values: { value: 1, fromUnit: "cup", toUnit: "tbsp" } },
    { label: "1 Tablespoon to Teaspoons (Spice Dosing)", values: { value: 1, fromUnit: "tbsp", toUnit: "tsp" } },
    { label: "1 Cup to Milliliters (Liquid Volume)", values: { value: 1, fromUnit: "cup", toUnit: "ml" } },
    { label: "1 Cup Flour to Grams (Dry Weight)", values: { value: 1, fromUnit: "cup", toUnit: "g_flour" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.01, Number(vals.value) || 1);
    const from = String(vals.fromUnit || "cup");
    const to = String(vals.toUnit || "tbsp");

    const TO_ML: Record<string, number> = {
      tsp: 4.92892,
      tbsp: 14.7868,
      cup: 236.588,
      ml: 1,
      floz: 29.5735,
      pt: 473.176,
      qt: 946.353,
      g_flour: 236.588 / 120, // 120g per cup
      g_sugar: 236.588 / 200, // 200g per cup
    };

    const ml = val * (TO_ML[from] || 236.588);
    const converted = ml / (TO_ML[to] || 14.7868);

    return {
      hero: {
        value: `${converted.toFixed(2)} ${to}`,
        label: `Culinary Yield (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Recipe Quantity", value: `${val} ${from}` },
        { label: "Metric Volume (mL)", value: `${ml.toFixed(1)} mL` },
        { label: "Converted Target Measure", value: `${converted.toFixed(2)} ${to}` },
        { label: "Equivalent in Tablespoons", value: `${(ml / 14.7868).toFixed(1)} tbsp` },
        { label: "Equivalent in Teaspoons", value: `${(ml / 4.92892).toFixed(1)} tsp` },
        { label: "Equivalent in Fluid Ounces", value: `${(ml / 29.5735).toFixed(2)} fl oz` },
      ],
      steps: [
        `Base culinary metric normalization: ${val} ${from} = ${ml.toFixed(1)} mL.`,
        `Dividing by target measure volume: ${ml.toFixed(1)} mL ÷ ${TO_ML[to].toFixed(2)} = ${converted.toFixed(2)} ${to}.`,
        `Standard US baking cup = 16 tablespoons = 48 teaspoons.`,
      ],
      chart: {
        type: "donut",
        title: "Cup Volume Proportion Breakdown",
        format: "pct",
        data: [
          { name: "Converted Ingredient Portion", value: Math.min(100, Math.round((ml / 236.588) * 100)) || 50, color: "#f59e0b" },
          { name: "Full Cup Headroom", value: Math.max(0, 100 - (Math.min(100, Math.round((ml / 236.588) * 100)) || 50)), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function CookingMeasurementConverterComponent() {
  return <CalcEngine config={cookingMeasurementConverterConfig} />;
}
