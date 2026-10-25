"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const alcoholUnitConfig: CalcConfig = {
  id: "alcohol-unit-calculator",
  title: "Alcohol Unit, Standard Drink & Metabolism Calculator",
  fields: [
    {
      kind: "number",
      key: "volumeMl",
      label: "Beverage Volume Per Drink (ml)",
      default: 500,
      min: 10,
      max: 5000,
    },
    {
      kind: "number",
      key: "abvPercent",
      label: "Alcohol By Volume (ABV %)",
      default: 5.0,
      min: 0.1,
      max: 95.0,
    },
    {
      kind: "number",
      key: "quantity",
      label: "Number of Drinks Consumed",
      default: 2,
      min: 1,
      max: 50,
    },
    {
      kind: "number",
      key: "bodyWeightKg",
      label: "Body Weight (kg)",
      default: 75,
      min: 35,
      max: 200,
    },
  ],
  compute(vals) {
    const vol = Math.max(1, Number(vals.volumeMl) || 500);
    const abv = Math.max(0.1, Number(vals.abvPercent) || 5.0);
    const qty = Math.max(1, Number(vals.quantity) || 1);
    const weight = Math.max(35, Number(vals.bodyWeightKg) || 75);

    // UK Units = (Volume ml * ABV %) / 1000 per drink
    const ukUnitsPerDrink = (vol * abv) / 1000;
    const totalUkUnits = ukUnitsPerDrink * qty;

    // Pure ethanol in grams (density of ethanol = 0.789 g/ml)
    const pureAlcoholGramsPerDrink = vol * (abv / 100) * 0.789;
    const totalPureAlcoholGrams = pureAlcoholGramsPerDrink * qty;

    // US Standard Drink = 14 grams of pure alcohol (0.6 fl oz)
    const usStandardDrinks = totalPureAlcoholGrams / 14;

    // Alcohol Calories: pure alcohol yields ~7.0 kcal per gram
    const alcoholCalories = totalPureAlcoholGrams * 7.0;

    // Approximate elimination time (human liver clears ~1 UK unit / ~8g alcohol per hour on average)
    const clearanceHours = totalUkUnits / 1.0;

    const isHigh = totalUkUnits > 6.0;

    return {
      hero: {
        label: "Total Alcohol Units (UK)",
        value: `${totalUkUnits.toFixed(1)} units`,
      },
      badge: {
        text: isHigh ? "High Intake (>6 units)" : "Moderate Intake",
        tone: isHigh ? "bad" : "good",
      },
      secondary: [
        {
          label: "US Standard Drinks (14g each)",
          value: `${usStandardDrinks.toFixed(1)} drinks`,
        },
        {
          label: "Pure Ethanol Consumed",
          value: `${totalPureAlcoholGrams.toFixed(1)} grams`,
        },
        {
          label: "Estimated Alcohol Calories",
          value: `${Math.round(alcoholCalories)} kcal`,
        },
        {
          label: "Estimated Liver Clearance Time",
          value: `~${clearanceHours.toFixed(1)} hours`,
        },
      ],
      steps: [
        `Per Drink UK Units = (${vol} ml * ${abv}%) / 1,000 = ${ukUnitsPerDrink.toFixed(2)} units`,
        `Total UK Units = ${ukUnitsPerDrink.toFixed(2)} units * ${qty} drinks = ${totalUkUnits.toFixed(2)} units`,
        `Pure Ethanol = ${vol} ml * (${abv} / 100) * 0.789 g/ml * ${qty} = ${totalPureAlcoholGrams.toFixed(1)} g`,
        `US Standard Drinks = ${totalPureAlcoholGrams.toFixed(1)} g / 14 g = ${usStandardDrinks.toFixed(2)} standard drinks`,
        `Alcohol Energy = ${totalPureAlcoholGrams.toFixed(1)} g * 7.0 kcal/g = ${Math.round(alcoholCalories)} kcal`,
      ],
      chart: {
        type: "donut",
        title: "Beverage Mass & Alcohol Composition",
        format: "num",
        data: [
          { name: "Non-Alcoholic Fluid (ml)", value: Math.round(vol * qty - (totalPureAlcoholGrams / 0.789)), color: "#0ea5e9" },
          { name: "Pure Ethanol Mass (g)", value: Math.round(totalPureAlcoholGrams), color: "#ef4444" },
          { name: "Metabolic Caloric Load (kcal)", value: Math.round(alcoholCalories), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function AlcoholUnitCalculatorComponent() {
  return <CalcEngine config={alcoholUnitConfig} />;
}
