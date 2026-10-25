"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const calorieBurnConfig: CalcConfig = {
  id: "calorie-burn-calculator",
  title: "Exercise & Kitchen Activity Calorie Burn Calculator",
  fields: [
    {
      kind: "choice",
      key: "activityType",
      label: "Activity / Movement Type",
      default: "cooking",
      options: [
        { label: "Kitchen Prep & Active Cooking (MET 2.5)", value: "cooking" },
        { label: "Brisk Walking 3.5 mph (MET 3.8)", value: "walking" },
        { label: "Moderate Cycling 12-14 mph (MET 8.0)", value: "cycling" },
        { label: "Jogging / Running 6.0 mph (MET 9.8)", value: "running" },
        { label: "Vigorous Lap Swimming (MET 8.3)", value: "swimming" },
        { label: "High-Intensity Interval Training / HIIT (MET 11.0)", value: "hiit" },
      ],
    },
    {
      kind: "number",
      key: "durationMinutes",
      label: "Activity Duration (Minutes)",
      default: 45,
      min: 1,
      max: 600,
    },
    {
      kind: "number",
      key: "weightKg",
      label: "Body Weight (kg)",
      default: 72,
      min: 30,
      max: 250,
    },
  ],
  compute(vals) {
    const activity = String(vals.activityType || "cooking");
    const minutes = Math.max(1, Number(vals.durationMinutes) || 45);
    const weight = Math.max(30, Number(vals.weightKg) || 72);

    let met = 2.5;
    if (activity === "walking") met = 3.8;
    else if (activity === "cycling") met = 8.0;
    else if (activity === "running") met = 9.8;
    else if (activity === "swimming") met = 8.3;
    else if (activity === "hiit") met = 11.0;

    // Standard ACSM Calorie Burn Formula: Calories = MET * 3.5 * weightKg / 200 * durationMinutes
    const totalCalories = (met * 3.5 * weight * minutes) / 200;
    const caloriesPerMinute = totalCalories / minutes;

    // Fuel substrate split estimation: lower intensity burns higher % fat; higher intensity burns higher % carbs
    let fatPct = 0.55;
    let carbPct = 0.45;
    if (met >= 9.0) {
      fatPct = 0.20;
      carbPct = 0.80;
    } else if (met >= 6.0) {
      fatPct = 0.40;
      carbPct = 0.60;
    }

    const fatCalories = totalCalories * fatPct;
    const carbCalories = totalCalories * carbPct;
    const fatGramsBurned = fatCalories / 9.0;
    const carbGramsBurned = carbCalories / 4.0;

    return {
      hero: {
        label: "Total Energy Expended",
        value: `${Math.round(totalCalories)} kcal`,
      },
      badge: {
        text: `${caloriesPerMinute.toFixed(1)} kcal / minute (MET ${met})`,
        tone: totalCalories >= 300 ? "good" : "info",
      },
      secondary: [
        {
          label: "Estimated Fat Oxidized",
          value: `${fatGramsBurned.toFixed(1)} g (${Math.round(fatCalories)} kcal)`,
        },
        {
          label: "Carbohydrate Glycogen Burned",
          value: `${carbGramsBurned.toFixed(1)} g (${Math.round(carbCalories)} kcal)`,
        },
        {
          label: "Activity Metabolic Equivalent",
          value: `${met} METs`,
        },
        {
          label: "1-Hour Equivalent Burn",
          value: `${Math.round(caloriesPerMinute * 60)} kcal / hr`,
        },
      ],
      steps: [
        `ACSM Formula: Calories = (MET * 3.5 * Weight kg / 200) * Duration min`,
        `Calculation: (${met} * 3.5 * ${weight} kg / 200) * ${minutes} min = ${totalCalories.toFixed(1)} kcal`,
        `Expenditure Rate: ${totalCalories.toFixed(1)} kcal / ${minutes} min = ${caloriesPerMinute.toFixed(2)} kcal/min`,
        `Substrate Oxidation: Fat = ${fatCalories.toFixed(0)} kcal (${fatGramsBurned.toFixed(1)}g) | Carbs = ${carbCalories.toFixed(0)} kcal (${carbGramsBurned.toFixed(1)}g)`,
      ],
      chart: {
        type: "donut",
        title: "Metabolic Fuel Substrate Oxidation",
        format: "num",
        data: [
          { name: "Fat Oxidation (kcal)", value: Math.round(fatCalories), color: "#f59e0b" },
          { name: "Carbohydrate Glycogen (kcal)", value: Math.round(carbCalories), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function CalorieBurnCalculatorComponent() {
  return <CalcEngine config={calorieBurnConfig} />;
}
