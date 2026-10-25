"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cookingConversionConfig: CalcConfig = {
  id: "cooking-conversion-calculator",
  title: "Culinary Density & Measurement Conversion Calculator",
  fields: [
    {
      kind: "choice",
      key: "ingredient",
      label: "Culinary Ingredient (Density Factor)",
      default: "flour",
      options: [
        { label: "All-Purpose Flour (120 g / cup)", value: "flour" },
        { label: "Granulated White Sugar (200 g / cup)", value: "sugar" },
        { label: "Packed Brown Sugar (220 g / cup)", value: "brown_sugar" },
        { label: "Unsalted Butter (227 g / cup)", value: "butter" },
        { label: "Water / Milk / Broth (237 g / cup)", value: "water" },
        { label: "Olive Oil / Vegetable Oil (218 g / cup)", value: "oil" },
        { label: "Honey / Molasses (340 g / cup)", value: "honey" },
      ],
    },
    {
      kind: "number",
      key: "amount",
      label: "Quantity to Convert",
      default: 2.0,
      min: 0.01,
      max: 10000,
    },
    {
      kind: "choice",
      key: "fromUnit",
      label: "Input Unit",
      default: "cups",
      options: [
        { label: "US Cups", value: "cups" },
        { label: "Tablespoons (Tbsp)", value: "tbsp" },
        { label: "Teaspoons (tsp)", value: "tsp" },
        { label: "Fluid Ounces (fl oz)", value: "floz" },
        { label: "Grams (g)", value: "grams" },
        { label: "Ounces (oz weight)", value: "oz" },
      ],
    },
  ],
  compute(vals) {
    const ing = String(vals.ingredient || "flour");
    const amt = Math.max(0.01, Number(vals.amount) || 1.0);
    const from = String(vals.fromUnit || "cups");

    // Grams per 1 US Cup for standard culinary ingredients
    let gramsPerCup = 120;
    if (ing === "sugar") gramsPerCup = 200;
    else if (ing === "brown_sugar") gramsPerCup = 220;
    else if (ing === "butter") gramsPerCup = 227;
    else if (ing === "water") gramsPerCup = 236.59;
    else if (ing === "oil") gramsPerCup = 218;
    else if (ing === "honey") gramsPerCup = 340;

    // Convert input unit to grams first
    let totalGrams = 0;
    if (from === "cups") totalGrams = amt * gramsPerCup;
    else if (from === "tbsp") totalGrams = (amt / 16) * gramsPerCup;
    else if (from === "tsp") totalGrams = (amt / 48) * gramsPerCup;
    else if (from === "floz") totalGrams = (amt / 8) * gramsPerCup;
    else if (from === "grams") totalGrams = amt;
    else if (from === "oz") totalGrams = amt * 28.3495;

    // Derived units from totalGrams
    const resultCups = totalGrams / gramsPerCup;
    const resultTbsp = resultCups * 16;
    const resultTsp = resultCups * 48;
    const resultOzWeight = totalGrams / 28.3495;
    const resultFlOz = resultCups * 8;

    return {
      hero: {
        label: "Precision Metric Mass (Grams)",
        value: `${totalGrams.toFixed(1)} g`,
      },
      badge: {
        text: `Density: ${gramsPerCup} g / US Cup`,
        tone: "good",
      },
      secondary: [
        {
          label: "US Cups Volume",
          value: `${resultCups.toFixed(2)} cups`,
        },
        {
          label: "Imperial / Avoirdupois Weight",
          value: `${resultOzWeight.toFixed(2)} oz`,
        },
        {
          label: "Culinary Tablespoons",
          value: `${resultTbsp.toFixed(1)} tbsp`,
        },
        {
          label: "Fluid Ounces Volume",
          value: `${resultFlOz.toFixed(2)} fl oz`,
        },
      ],
      steps: [
        `Specific Gravity Baseline: 1 Cup of ${ing.replace("_", " ")} = ${gramsPerCup} g`,
        `Normalized Mass: Input ${amt} ${from} = ${totalGrams.toFixed(2)} grams`,
        `Volume Equivalent: ${totalGrams.toFixed(2)} g / ${gramsPerCup} g/cup = ${resultCups.toFixed(3)} cups`,
        `Precision Spoon Equivalents: ${resultTbsp.toFixed(2)} Tablespoons | ${resultTsp.toFixed(1)} Teaspoons`,
      ],
      chart: {
        type: "donut",
        title: "Mass vs Volume Conversion Proportion",
        format: "num",
        data: [
          { name: "Gram Weight (g)", value: Math.round(totalGrams), color: "#0ea5e9" },
          { name: "Tablespoons (tbsp)", value: Math.round(resultTbsp), color: "#10b981" },
          { name: "Fluid Ounces (fl oz)", value: Math.round(resultFlOz), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CookingConversionCalculatorComponent() {
  return <CalcEngine config={cookingConversionConfig} />;
}
