"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "water-intake",
  title: "Water Intake Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (lbs / fl oz)" },
        { value: "metric", label: "Metric (kg / liters)" },
      ],
    },
    {
      kind: "choice",
      key: "sex",
      label: "Biological sex",
      default: "male",
      segmented: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 165, min: 60, max: 500, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 75, min: 30, max: 250, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "workoutMin", label: "Daily workout / exercise duration", suffix: "min", default: 45, min: 0, max: 240, integer: true },
    {
      kind: "choice",
      key: "climate",
      label: "Climate & environmental temperature",
      default: "temperate",
      options: [
        { value: "temperate", label: "Temperate / Air-Conditioned (Standard baseline)" },
        { value: "warm", label: "Warm / Humid (+15% sweat rate)" },
        { value: "hot", label: "Hot Summer / Dry Desert (+25% evaporative loss)" },
      ],
    },
    {
      kind: "choice",
      key: "special",
      label: "Maternal state (Women)",
      default: "none",
      showIf: (v) => v.sex === "female",
      options: [
        { value: "none", label: "Not Pregnant / Lactating" },
        { value: "pregnant", label: "Pregnant (+10 fl oz / +300 ml)" },
        { value: "lactating", label: "Breastfeeding / Nursing (+28 fl oz / +800 ml)" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";
    const workoutMin = Number(v.workoutMin || 0);

    let weightKg = isMetric ? Number(v.weightKg || 75) : Number(v.weightLbs || 165) * 0.45359237;
    let weightLbs = isMetric ? weightKg * 2.20462 : Number(v.weightLbs || 165);

    if (weightKg <= 0) {
      return { error: "Please enter a valid body weight." };
    }

    // Baseline hydration: ~0.55 fl oz per pound (35 ml per kg)
    const baseFluidOz = weightLbs * 0.55;

    // Workout sweat replenishment: ~12 fl oz per 30 minutes of vigorous training (ACSM)
    const workoutFluidOz = (workoutMin / 30) * 12;

    // Climate multiplier
    const CLIMATE_FACTORS: Record<string, number> = {
      temperate: 1.0,
      warm: 1.15,
      hot: 1.25,
    };
    const climateFactor = CLIMATE_FACTORS[v.climate as string] || 1.0;

    let subtotalOz = (baseFluidOz + workoutFluidOz) * climateFactor;

    // Maternal state adjustment
    if (sex === "female") {
      if (v.special === "pregnant") subtotalOz += 10;
      if (v.special === "lactating") subtotalOz += 28;
    }

    const totalOz = Math.round(subtotalOz);
    const totalLiters = (totalOz * 0.0295735).toFixed(2);
    const plainWaterOz = Math.round(totalOz * 0.80); // 80% from water/beverages, 20% from food moisture
    const foodMoistureOz = totalOz - plainWaterOz;

    const eightOzGlasses = (totalOz / 8).toFixed(1);
    const bottles500ml = (Number(totalLiters) / 0.50).toFixed(1);
    const hourlyPaceOz = Math.round(totalOz / 16); // Over 16 waking hours

    return {
      hero: {
        label: "Recommended Daily Water & Fluid Intake",
        value: isMetric ? `${totalLiters}` : `${totalOz}`,
        unit: isMetric ? "liters / day" : "fl oz / day",
        sub: `Includes direct drinking fluids and dietary moisture to maintain optimal cellular hydration and renal filtration.`,
      },
      badge: {
        text: `Equivalent to ~${eightOzGlasses} Glasses (8 oz) or ~${bottles500ml} Standard Bottles (500ml)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Drinking Water & Beverages (80%)", value: plainWaterOz, color: "#0ea5e9" },
          { name: "Moisture from Whole Foods (20%)", value: foodMoistureOz, color: "#10b981" },
        ],
      },
      rows: [
        { label: "Total Daily Fluid Requirement", value: isMetric ? `${totalLiters} L (${totalOz} fl oz)` : `${totalOz} fl oz (${totalLiters} L)`, strong: true },
        { label: "Direct Water & Beverages Target (80%)", value: isMetric ? `${(plainWaterOz * 0.0295735).toFixed(2)} L` : `${plainWaterOz} fl oz`, strong: true },
        { label: "Estimated Moisture from Fruits/Foods (20%)", value: isMetric ? `${(foodMoistureOz * 0.0295735).toFixed(2)} L` : `${foodMoistureOz} fl oz` },
        { label: "Standard 8-oz Cups Pacing", value: `${eightOzGlasses} cups throughout day` },
        { label: "Standard 500ml (16.9 oz) Bottles", value: `${bottles500ml} bottles` },
        { label: "Hourly Hydration Pacing (16 Waking Hours)", value: `${hourlyPaceOz} fl oz / hour` },
        { label: "Exercise Sweat Replacement Added", value: `+${Math.round(workoutFluidOz)} fl oz for ${workoutMin} min training` },
        { label: "Climate & Environment Adjustment", value: v.climate === "hot" ? "+25% (Extreme Heat/Desert)" : v.climate === "warm" ? "+15% (Warm/Humid)" : "Standard Baseline" },
      ],
      note: {
        text: (
          <span>
            💧 <strong>Clinical Hydration Benchmark:</strong> Monitor your urine color as your primary biofeedback indicator. Pale straw or light lemonade color indicates optimal cellular hydration. Dark amber signifies acute dehydration, whereas crystal-clear water-like urine may indicate electrolyte dilution (hyponatremia).
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function WaterIntakeCalculator() {
  return <CalcEngine config={config} />;
}
