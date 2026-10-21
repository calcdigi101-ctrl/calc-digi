"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "tdee",
  title: "TDEE Calculator",
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
    { kind: "number", key: "age", label: "Age", suffix: "yrs", default: 30, min: 15, max: 100, integer: true },
    // US Inputs
    { kind: "number", key: "heightFt", label: "Height (feet)", suffix: "ft", default: 5, min: 3, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightIn", label: "Height (inches)", suffix: "in", default: 10, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 175, min: 50, max: 600, showIf: (v) => v.unit !== "metric" },
    // Metric Inputs
    { kind: "number", key: "heightCm", label: "Height", suffix: "cm", default: 178, min: 90, max: 240, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 79, min: 25, max: 300, showIf: (v) => v.unit === "metric" },
    {
      kind: "choice",
      key: "activity",
      label: "Physical activity level",
      default: "moderate",
      options: [
        { value: "sedentary", label: "Sedentary (Desk job, minimal movement - 1.2x)" },
        { value: "light", label: "Light Activity (1-3 workouts or 6k-8k steps - 1.375x)" },
        { value: "moderate", label: "Moderate Activity (3-5 workouts or 8k-10k steps - 1.55x)" },
        { value: "very", label: "Very Active (6-7 intense training sessions - 1.725x)" },
        { value: "athlete", label: "Extreme / Athletic (2x/day training or manual labor - 1.9x)" },
      ],
    },
    {
      kind: "choice",
      key: "goal",
      label: "Body composition goal",
      default: "deficit_500",
      segmented: false,
      options: [
        { value: "maintain", label: "Maintain Current Weight (0 kcal adjustment)" },
        { value: "deficit_250", label: "Mild Fat Loss (-250 kcal/day · ~0.5 lb/wk)" },
        { value: "deficit_500", label: "Standard Fat Loss (-500 kcal/day · ~1.0 lb/wk)" },
        { value: "deficit_750", label: "Aggressive Cut (-750 kcal/day · ~1.5 lb/wk)" },
        { value: "surplus_300", label: "Lean Muscle Bulk (+300 kcal/day · ~0.6 lb/wk)" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";
    const age = Number(v.age || 30);

    let weightKg = 0;
    let heightCm = 0;

    if (isMetric) {
      weightKg = Number(v.weightKg || 79);
      heightCm = Number(v.heightCm || 178);
    } else {
      const ft = Number(v.heightFt || 5);
      const inc = Number(v.heightIn || 10);
      const totalInches = (ft * 12) + inc;
      heightCm = totalInches * 2.54;
      weightKg = Number(v.weightLbs || 175) * 0.45359237;
    }

    if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
      return { error: "Please enter valid age, height, and weight values." };
    }

    // Baseline BMR (Mifflin-St Jeor)
    const bmr = sex === "male"
      ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
      : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;

    // Physical Activity Multipliers
    const MULTIPLIERS: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
      athlete: 1.9,
    };
    const pal = MULTIPLIERS[v.activity as string] || 1.55;
    const maintenanceTdee = Math.round(bmr * pal);

    // Goal Adjustments
    const GOAL_DELTAS: Record<string, { delta: number; label: string; rateLbs: string }> = {
      maintain: { delta: 0, label: "Maintenance", rateLbs: "Stable" },
      deficit_250: { delta: -250, label: "Mild Fat Loss", rateLbs: "-0.5 lb / wk" },
      deficit_500: { delta: -500, label: "Standard Fat Loss", rateLbs: "-1.0 lb / wk" },
      deficit_750: { delta: -750, label: "Aggressive Fat Loss", rateLbs: "-1.5 lb / wk" },
      surplus_300: { delta: 300, label: "Lean Muscle Hypertrophy", rateLbs: "+0.6 lb / wk" },
    };
    const goalInfo = GOAL_DELTAS[v.goal as string] || GOAL_DELTAS.deficit_500;
    const targetCalories = Math.max(Math.round(bmr), maintenanceTdee + goalInfo.delta);

    // Energy components breakdown
    const bmrPortion = Math.round(bmr);
    const neatPortion = Math.round(maintenanceTdee * 0.15); // Non-Exercise Activity Thermogenesis
    const tefPortion = Math.round(maintenanceTdee * 0.10);  // Thermic Effect of Food (~10%)
    const eatPortion = Math.max(0, maintenanceTdee - bmrPortion - neatPortion - tefPortion); // Exercise Activity

    // Macro distribution recommendation (Moderate protein split: 30% Protein, 40% Carb, 30% Fat)
    const proteinGrams = Math.round((targetCalories * 0.30) / 4);
    const carbGrams = Math.round((targetCalories * 0.40) / 4);
    const fatGrams = Math.round((targetCalories * 0.30) / 9);

    return {
      hero: {
        label: "Total Daily Energy Expenditure (TDEE)",
        value: `${maintenanceTdee.toLocaleString()}`,
        unit: "kcal / day",
        sub: `Calories your body burns daily including resting metabolism, daily movement, and physical training.`,
      },
      badge: {
        text: `Target: ${targetCalories.toLocaleString()} kcal/day (${goalInfo.label} · ${goalInfo.rateLbs})`,
        tone: goalInfo.delta === 0 ? "info" : goalInfo.delta < 0 ? "good" : "warn",
      },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Basal Metabolism (BMR)", value: bmrPortion, color: "#10b981" },
          { name: "Non-Exercise Movement (NEAT)", value: neatPortion, color: "#3b82f6" },
          { name: "Exercise Thermogenesis (EAT)", value: eatPortion, color: "#f59e0b" },
          { name: "Digestion Thermic Effect (TEF)", value: tefPortion, color: "#8b5cf6" },
        ],
      },
      rows: [
        { label: "Daily Calorie Target for Goal", value: `${targetCalories.toLocaleString()} kcal / day`, strong: true },
        { label: "Resting Basal Metabolic Rate (BMR)", value: `${Math.round(bmr).toLocaleString()} kcal / day` },
        { label: "Physical Activity Level (PAL)", value: `${pal}x multiplier` },
        { label: "Calorie Deficit / Surplus", value: `${goalInfo.delta > 0 ? `+${goalInfo.delta}` : goalInfo.delta} kcal / day`, strong: true },
        { label: "Weekly Projected Body Change", value: goalInfo.rateLbs },
        { label: "Suggested Daily Protein (30%)", value: `${proteinGrams} g (${proteinGrams * 4} kcal)` },
        { label: "Suggested Daily Carbs (40%)", value: `${carbGrams} g (${carbGrams * 4} kcal)` },
        { label: "Suggested Daily Fats (30%)", value: `${fatGrams} g (${fatGrams * 9} kcal)` },
      ],
      note: {
        text: (
          <span>
            ⚖️ <strong>Sustainable Deficit Guidance:</strong> A 500-calorie daily deficit equates to roughly 3,500 kcal per week (~1 lb of adipose tissue). Research shows deficits exceeding 25% of TDEE accelerate metabolic adaptation, hormone disruption, and muscular catabolism.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function TdeeCalculator() {
  return <CalcEngine config={config} />;
}
