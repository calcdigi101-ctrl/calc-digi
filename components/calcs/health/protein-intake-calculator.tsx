"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "protein-intake",
  title: "Protein Intake Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (lbs)" },
        { value: "metric", label: "Metric (kg)" },
      ],
    },
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 175, min: 60, max: 500, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 79, min: 25, max: 250, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "age", label: "Age", suffix: "yrs", default: 30, min: 15, max: 100, integer: true },
    {
      kind: "choice",
      key: "goal",
      label: "Fitness goal & training style",
      default: "hypertrophy",
      options: [
        { value: "sedentary", label: "Sedentary Baseline (RDA Minimum - 0.8 g/kg)" },
        { value: "endurance", label: "Endurance Athlete (Running / Cycling - 1.4 g/kg)" },
        { value: "hypertrophy", label: "Muscle Building & Hypertrophy (Resistance Training - 1.8 g/kg)" },
        { value: "fatloss", label: "Cutting / Fat Loss Muscle Sparing (Deficit Diet - 2.2 g/kg)" },
        { value: "senior", label: "Healthy Aging & Sarcopenia Prevention (Age 50+ - 1.3 g/kg)" },
      ],
    },
    {
      kind: "choice",
      key: "meals",
      label: "Target meals per day",
      default: "4",
      segmented: true,
      options: [
        { value: "3", label: "3 Meals" },
        { value: "4", label: "4 Meals" },
        { value: "5", label: "5 Meals" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const weightKg = isMetric ? Number(v.weightKg || 79) : Number(v.weightLbs || 175) * 0.45359237;
    const weightLbs = isMetric ? weightKg * 2.20462 : Number(v.weightLbs || 175);
    const mealsCount = Number(v.meals || 4);

    if (weightKg <= 0) {
      return { error: "Please enter a valid body weight." };
    }

    // Ratio multipliers (g/kg)
    const RATIOS: Record<string, { gKg: number; label: string; desc: string }> = {
      sedentary: { gKg: 0.8, label: "0.8 g/kg (RDA)", desc: "Minimum threshold to avoid biological nitrogen deficit" },
      endurance: { gKg: 1.4, label: "1.4 g/kg (Endurance)", desc: "Supports mitochondrial repair and glycogen replenishment" },
      hypertrophy: { gKg: 1.8, label: "1.8 g/kg (Hypertrophy)", desc: "Optimal ceiling for myofibrillar protein synthesis (MPS)" },
      fatloss: { gKg: 2.2, label: "2.2 g/kg (Cutting)", desc: "Maximizes satiety and prevents lean mass loss during caloric deficit" },
      senior: { gKg: 1.3, label: "1.3 g/kg (Healthy Aging)", desc: "Overcomes anabolic resistance in adults 50 and older" },
    };

    const targetInfo = RATIOS[v.goal as string] || RATIOS.hypertrophy;
    const targetGrams = Math.round(weightKg * targetInfo.gKg);
    const targetCalories = targetGrams * 4;
    const perMealGrams = Math.round(targetGrams / mealsCount);

    const rdaFloorGrams = Math.round(weightKg * 0.8);
    const athleteCeilingGrams = Math.round(weightKg * 2.2);

    return {
      hero: {
        label: "Target Daily Protein Intake",
        value: `${targetGrams}`,
        unit: "grams / day",
        sub: `Provides ${targetCalories.toLocaleString()} kcal (4 kcal/g) calibrated for ${targetInfo.label} (${(targetGrams / weightLbs).toFixed(2)} g per lb of body weight).`,
      },
      badge: {
        text: `Optimal Dose: ~${perMealGrams}g Protein per Meal across ${mealsCount} Daily Meals`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "RDA Survival Baseline (0.8g/kg)", value: rdaFloorGrams, color: "#94a3b8" },
          { name: "Hypertrophy Anabolic Buffer", value: Math.max(0, targetGrams - rdaFloorGrams), color: "#10b981" },
          { name: "Advanced Athletic Ceiling", value: Math.max(0, athleteCeilingGrams - targetGrams), color: "#3b82f6" },
        ],
      },
      rows: [
        { label: "Daily Protein Target", value: `${targetGrams} grams / day`, strong: true },
        { label: "Target Protein per Meal", value: `${perMealGrams} grams / meal (${mealsCount} meals)`, strong: true },
        { label: "Ratio per Pound of Body Weight", value: `${(targetGrams / weightLbs).toFixed(2)} g / lb` },
        { label: "Ratio per Kilogram of Body Weight", value: `${targetInfo.gKg} g / kg` },
        { label: "Caloric Contribution from Protein", value: `${targetCalories} kcal (4 kcal/g)` },
        { label: "Minimum RDA Deficiency Floor (0.8 g/kg)", value: `${rdaFloorGrams} grams / day` },
        { label: "ISSN Maximum Hypertrophy Benefit (2.2 g/kg)", value: `${athleteCeilingGrams} grams / day` },
        { label: "Minimum Leucine Trigger Threshold", value: "2.7g – 3.5g Leucine per meal", strong: true },
      ],
      note: {
        text: (
          <span>
            🥩 <strong>Anabolic Trigger Benchmark:</strong> The International Society of Sports Nutrition (ISSN) confirms that muscle protein synthesis peaks when consuming 20g to 40g of high-biological-value protein containing at least 2.5g to 3.0g of the amino acid leucine per feeding. Spacing protein evenly every 3 to 4 hours is superior to consuming one giant meal.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function ProteinIntakeCalculator() {
  return <CalcEngine config={config} />;
}
