"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "weight-loss",
  title: "Weight Loss Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (lbs / ft-in)" },
        { value: "metric", label: "Metric (kg / cm)" },
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
    { kind: "number", key: "age", label: "Age", suffix: "yrs", default: 34, min: 16, max: 95, integer: true },
    // US
    { kind: "number", key: "heightFt", label: "Height (feet)", suffix: "ft", default: 5, min: 4, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightIn", label: "Height (inches)", suffix: "in", default: 10, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "currentWeightLbs", label: "Current body weight", suffix: "lbs", default: 195, min: 70, max: 500, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "targetWeightLbs", label: "Target goal weight", suffix: "lbs", default: 165, min: 60, max: 450, showIf: (v) => v.unit !== "metric" },
    // Metric
    { kind: "number", key: "heightCm", label: "Height", suffix: "cm", default: 178, min: 120, max: 230, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "currentWeightKg", label: "Current body weight", suffix: "kg", default: 88, min: 35, max: 250, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "targetWeightKg", label: "Target goal weight", suffix: "kg", default: 75, min: 30, max: 220, showIf: (v) => v.unit === "metric" },
    {
      kind: "choice",
      key: "activity",
      label: "Physical activity level",
      default: "light",
      options: [
        { value: "sedentary", label: "Sedentary (Desk job, minimal activity - 1.2x)" },
        { value: "light", label: "Lightly Active (Walking, light workouts 1-3 d/wk - 1.375x)" },
        { value: "moderate", label: "Moderately Active (Exercise 3-5 d/wk - 1.55x)" },
        { value: "very", label: "Very Active (Hard training 6-7 d/wk - 1.725x)" },
        { value: "extra", label: "Extremely Active (Athletic double sessions - 1.9x)" },
      ],
    },
    {
      kind: "choice",
      key: "pace",
      label: "Weekly weight loss rate",
      default: "1.0",
      options: [
        { value: "0.5", label: "Gentle: 0.5 lbs/wk (250 kcal/day deficit)" },
        { value: "1.0", label: "Recommended: 1.0 lb/wk (500 kcal/day deficit)" },
        { value: "1.5", label: "Aggressive: 1.5 lbs/wk (750 kcal/day deficit)" },
        { value: "2.0", label: "Maximum Safe: 2.0 lbs/wk (1,000 kcal/day deficit)" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";
    const age = Number(v.age || 34);

    let curKg = 0;
    let tgtKg = 0;
    let hCm = 0;

    if (isMetric) {
      curKg = Number(v.currentWeightKg || 88);
      tgtKg = Number(v.targetWeightKg || 75);
      hCm = Number(v.heightCm || 178);
    } else {
      curKg = Number(v.currentWeightLbs || 195) / 2.20462;
      tgtKg = Number(v.targetWeightLbs || 165) / 2.20462;
      hCm = (Number(v.heightFt || 5) * 12 + Number(v.heightIn || 10)) * 2.54;
    }

    const weightLossLbs = Math.max(0, (curKg - tgtKg) * 2.20462);
    const weightLossKg = Math.max(0, curKg - tgtKg);

    // Mifflin-St Jeor BMR:
    let bmr = 10 * curKg + 6.25 * hCm - 5 * age + (sex === "male" ? 5 : -161);
    bmr = Math.max(800, bmr);

    const actMult: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      extra: 1.9,
    };
    const mult = actMult[v.activity as string] || 1.375;
    const maintenanceTdee = Math.round(bmr * mult);

    const paceLbs = Number(v.pace || 1.0);
    const dailyDeficit = Math.round((paceLbs * 3500) / 7);
    const targetCalories = Math.max(800, maintenanceTdee - dailyDeficit);

    const weeksToGoal = paceLbs > 0 ? Math.round((weightLossLbs / paceLbs) * 10) / 10 : 0;
    const monthsToGoal = Math.round((weeksToGoal / 4.345) * 10) / 10;

    const minSafeCalories = sex === "male" ? 1500 : 1200;
    const isBelowFloor = targetCalories < minSafeCalories;

    const targetDate = new Date(Date.now() + weeksToGoal * 7 * 24 * 60 * 60 * 1000);
    const dateFormatted = targetDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    // Muscle retention protein (1.8g/kg of goal weight)
    const targetProteinGrams = Math.round(tgtKg * 1.8);

    return {
      hero: {
        label: "Prescribed Daily Caloric Intake",
        value: `${targetCalories.toLocaleString()}`,
        unit: "kcal / day",
        sub: `Target deficit: -${dailyDeficit} kcal/day below maintenance (${maintenanceTdee.toLocaleString()} kcal)`,
      },
      badge: { text: "NIH Adaptive Feedback Model", tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Daily Calorie Budget", value: targetCalories, color: "#10b981" },
          { name: "Active Caloric Deficit", value: dailyDeficit, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Target Daily Calorie Allowance", value: `${targetCalories.toLocaleString()} kcal/day`, strong: true },
        { label: "Maintenance Expenditure (TDEE)", value: `${maintenanceTdee.toLocaleString()} kcal/day` },
        { label: "Daily Energy Deficit", value: `-${dailyDeficit} kcal/day`, strong: true },
        { label: "Total Mass to Lose", value: `${isMetric ? weightLossKg.toFixed(1) + " kg" : weightLossLbs.toFixed(1) + " lbs"}` },
        { label: "Projected Completion Date", value: `${dateFormatted} (${weeksToGoal} wks / ${monthsToGoal} mos)`, strong: true },
        { label: "Target Muscle-Retention Protein", value: `${targetProteinGrams} g/day (1.8 g/kg)` },
      ],
      note: {
        text: isBelowFloor ? (
          <span>
            ⚠️ <strong>Caloric Safety Floor Warning:</strong> Your target of {targetCalories} kcal is below the clinical minimum recommendation ({minSafeCalories} kcal for {sex}s). Reduce your weekly pace or increase physical activity to protect metabolic rate and prevent muscle wasting.
          </span>
        ) : (
          <span>
            ⚖️ <strong>NIH Adaptive Feedback:</strong> As you lose body mass, your smaller frame burns fewer calories. Recalculate your maintenance calories every 10 lbs lost to sustain consistent progress.
          </span>
        ),
        tone: isBelowFloor ? "warn" : "info",
      },
    };
  },
};

export default function WeightLossCalculator() {
  return <CalcEngine config={config} />;
}
