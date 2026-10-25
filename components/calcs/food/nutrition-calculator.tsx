"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const nutritionConfig: CalcConfig = {
  id: "nutrition-calculator",
  title: "Recipe Nutrition, Macronutrient Density and Caloric Distribution Calculator",
  fields: [
    {
      kind: "number",
      key: "dailyCalories",
      label: "Target Caloric Intake (kcal / day)",
      default: 2000,
      min: 800,
      max: 7500,
    },
    {
      kind: "number",
      key: "proteinPct",
      label: "Protein Target (% of Calories)",
      default: 30,
      min: 10,
      max: 60,
    },
    {
      kind: "number",
      key: "carbPct",
      label: "Carbohydrate Target (% of Calories)",
      default: 40,
      min: 5,
      max: 75,
    },
    {
      kind: "number",
      key: "fatPct",
      label: "Lipid / Fat Target (% of Calories)",
      default: 30,
      min: 15,
      max: 60,
    },
    {
      kind: "number",
      key: "mealsPerDay",
      label: "Daily Feeding Frequency (Meals per Day)",
      default: 4,
      min: 1,
      max: 8,
    },
  ],
  compute: (vals) => {
    const totalCal = Math.max(800, Number(vals.dailyCalories) || 2000);
    const pPct = Number(vals.proteinPct) || 30;
    const cPct = Number(vals.carbPct) || 40;
    const fPct = Number(vals.fatPct) || 30;
    const meals = Math.max(1, Number(vals.mealsPerDay) || 4);

    // Normalize percentages if sum != 100
    const sumPct = pPct + cPct + fPct;
    const normP = (pPct / sumPct);
    const normC = (cPct / sumPct);
    const normF = (fPct / sumPct);

    const proteinKcal = totalCal * normP;
    const carbKcal = totalCal * normC;
    const fatKcal = totalCal * normF;

    const proteinGrams = proteinKcal / 4;
    const carbGrams = carbKcal / 4;
    const fatGrams = fatKcal / 9;

    const proteinPerMeal = proteinGrams / meals;
    const carbPerMeal = carbGrams / meals;
    const fatPerMeal = fatGrams / meals;
    const kcalPerMeal = totalCal / meals;

    // USDA recommendation: 14g dietary fiber per 1000 kcal
    const fiberTargetGrams = (totalCal / 1000) * 14;

    return {
      hero: {
        label: "Daily Protein Intake Target",
        value: `${Math.round(proteinGrams)} g (${Math.round(proteinPerMeal)}g/meal)`,
      },
      badge: {
        text: `${Math.round(totalCal)} kcal Daily Budget (${Math.round(kcalPerMeal)} kcal / meal)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Daily Carbohydrates",
          value: `${Math.round(carbGrams)} g (${Math.round(carbPerMeal)}g/meal)`,
        },
        {
          label: "Daily Dietary Lipids / Fats",
          value: `${Math.round(fatGrams)} g (${Math.round(fatPerMeal)}g/meal)`,
        },
        {
          label: "Recommended Soluble/Insoluble Fiber",
          value: `${Math.round(fiberTargetGrams)} g/day (14g/1000 kcal)`,
        },
        {
          label: "Macronutrient Energy Density Split",
          value: `${(normP * 100).toFixed(0)}% P / ${(normC * 100).toFixed(0)}% C / ${(normF * 100).toFixed(0)}% F`,
        },
      ],
      steps: [
        `Protein Energy: ${Math.round(proteinKcal)} kcal / 4 kcal/g = ${proteinGrams.toFixed(1)} g pure protein`,
        `Carbohydrate Energy: ${Math.round(carbKcal)} kcal / 4 kcal/g = ${carbGrams.toFixed(1)} g available carbohydrates`,
        `Lipid Energy: ${Math.round(fatKcal)} kcal / 9 kcal/g = ${fatGrams.toFixed(1)} g essential fatty acids`,
        `Per Meal Distribution (${meals} meals): ${Math.round(kcalPerMeal)} kcal | ${proteinPerMeal.toFixed(1)}g P | ${carbPerMeal.toFixed(1)}g C | ${fatPerMeal.toFixed(1)}g F`,
      ],
      chart: {
        type: "donut",
        title: "Daily Macronutrient Caloric Allocation",
        format: "num",
        data: [
          { name: "Protein Energy (kcal)", value: Math.round(proteinKcal), color: "#0284c7" },
          { name: "Carbohydrate Energy (kcal)", value: Math.round(carbKcal), color: "#f59e0b" },
          { name: "Lipid / Fat Energy (kcal)", value: Math.round(fatKcal), color: "#10b981" },
        ],
      },
    };
  },
};

export default function NutritionCalculatorComponent() {
  return <CalcEngine config={nutritionConfig} />;
}
