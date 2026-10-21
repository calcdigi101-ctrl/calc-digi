"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "bmr",
  title: "BMR Calculator",
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
      key: "formula",
      label: "Clinical formula",
      default: "mifflin",
      options: [
        { value: "mifflin", label: "Mifflin-St Jeor (Modern Clinical Gold Standard)" },
        { value: "harris", label: "Revised Harris-Benedict (Roza & Shizgal 1984)" },
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

    // 1. Mifflin-St Jeor Equation
    // Men: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
    // Women: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
    const mifflinBmr = sex === "male"
      ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
      : (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;

    // 2. Revised Harris-Benedict Equation
    // Men: BMR = 88.362 + (13.397 × kg) + (4.799 × cm) - (5.677 × age)
    // Women: BMR = 447.593 + (9.247 × kg) + (3.098 × cm) - (4.330 × age)
    const harrisBmr = sex === "male"
      ? 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age)
      : 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);

    const activeFormula = v.formula === "harris" ? "harris" : "mifflin";
    const baseBmr = Math.round(activeFormula === "harris" ? harrisBmr : mifflinBmr);
    const hourlyBurn = (baseBmr / 24).toFixed(1);

    // TDEE Multipliers
    const sedentary = Math.round(baseBmr * 1.2);
    const light = Math.round(baseBmr * 1.375);
    const moderate = Math.round(baseBmr * 1.55);
    const veryActive = Math.round(baseBmr * 1.725);
    const extraActive = Math.round(baseBmr * 1.9);

    return {
      hero: {
        label: "Basal Metabolic Rate (BMR)",
        value: `${baseBmr.toLocaleString()}`,
        unit: "kcal / day",
        sub: `Minimum resting energy required for basic cellular respiration, heartbeat, and organ function at rest.`,
      },
      badge: {
        text: activeFormula === "mifflin" ? "Mifflin-St Jeor Clinical Gold Standard" : "Revised Harris-Benedict (1984)",
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Basal Metabolic Rate (BMR)", value: baseBmr, color: "#10b981" },
          { name: "Sedentary Activity Buffer (+20%)", value: sedentary - baseBmr, color: "#3b82f6" },
          { name: "Exercise Energy Potential", value: moderate - sedentary, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Hourly Resting Burn Rate", value: `${hourlyBurn} kcal / hr`, strong: true },
        { label: "Mifflin-St Jeor Baseline", value: `${Math.round(mifflinBmr).toLocaleString()} kcal/day` },
        { label: "Harris-Benedict Baseline", value: `${Math.round(harrisBmr).toLocaleString()} kcal/day` },
        { label: "Sedentary Maintenance (Desk Job)", value: `${sedentary.toLocaleString()} kcal/day`, strong: true },
        { label: "Light Activity (1-3 days/wk)", value: `${light.toLocaleString()} kcal/day` },
        { label: "Moderate Activity (3-5 days/wk)", value: `${moderate.toLocaleString()} kcal/day` },
        { label: "Very Active (6-7 days/wk)", value: `${veryActive.toLocaleString()} kcal/day` },
        { label: "Extreme Physical / Athlete", value: `${extraActive.toLocaleString()} kcal/day` },
      ],
      note: {
        text: (
          <span>
            🔬 <strong>Clinical Rule:</strong> Never consume fewer calories than your resting BMR without supervised medical guidance. Dropping below your BMR forces your body into adaptive thermogenesis (metabolic slowdown) and causes accelerated loss of lean muscular tissue.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function BmrCalculator() {
  return <CalcEngine config={config} />;
}
