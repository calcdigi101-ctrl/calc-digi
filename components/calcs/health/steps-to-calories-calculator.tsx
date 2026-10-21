"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "steps-to-calories",
  title: "Steps to Calories Calculator",
  fields: [
    {
      kind: "number",
      key: "steps",
      label: "Daily step count",
      suffix: "steps",
      default: 10000,
      min: 500,
      max: 60000,
      integer: true,
      hint: "Tracked via smartwatch, pedometer, or smartphone accelerometer.",
    },
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
      default: "female",
      segmented: true,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 160, min: 60, max: 450, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 72, min: 25, max: 200, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "heightFt", label: "Height (feet)", suffix: "ft", default: 5, min: 4, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightIn", label: "Height (inches)", suffix: "in", default: 6, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightCm", label: "Height", suffix: "cm", default: 168, min: 120, max: 230, showIf: (v) => v.unit === "metric" },
    {
      kind: "choice",
      key: "pace",
      label: "Walking speed / cadence",
      default: "moderate",
      options: [
        { value: "casual", label: "Casual Stroll (80–99 steps/min, 2.5 mph - 2.8 METs)" },
        { value: "moderate", label: "Moderate Brisk (100–119 steps/min, 3.2 mph - 3.5 METs)" },
        { value: "fast", label: "Power Walk (120–139 steps/min, 4.0 mph - 4.8 METs)" },
        { value: "jog", label: "Light Jogging (140+ steps/min, 5.0 mph - 7.5 METs)" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";
    const steps = Math.max(100, Number(v.steps || 10000));
    const wKg = isMetric ? Number(v.weightKg || 72) : Number(v.weightLbs || 160) / 2.20462;

    const totalHeightInches = isMetric
      ? (Number(v.heightCm || 168) / 2.54)
      : (Number(v.heightFt || 5) * 12 + Number(v.heightIn || 6));

    // Stride Length (inches and meters):
    // Standard biomechanical ratio: 0.415 for men, 0.413 for women
    const strideRatio = sex === "male" ? 0.415 : 0.413;
    const strideInches = totalHeightInches * strideRatio;
    const strideMeters = strideInches * 0.0254;

    // Total Distance:
    const totalDistanceMeters = steps * strideMeters;
    const distanceMiles = (totalDistanceMeters / 1609.344).toFixed(2);
    const distanceKm = (totalDistanceMeters / 1000).toFixed(2);

    // Cadence (steps/min) and MET values:
    const cadenceMap: Record<string, { spm: number; met: number; label: string }> = {
      casual: { spm: 90, met: 2.8, label: "Casual Walking" },
      moderate: { spm: 110, met: 3.5, label: "Moderate Brisk" },
      fast: { spm: 130, met: 4.8, label: "Power Walking" },
      jog: { spm: 155, met: 7.5, label: "Light Jogging" },
    };
    const cadence = cadenceMap[v.pace as string] || cadenceMap.moderate;

    // Duration in minutes:
    const durationMin = steps / cadence.spm;

    // Caloric Expenditure Formula:
    // kcal = Duration (min) * (MET * 3.5 * Weight_kg) / 200
    const totalCalories = Math.round((durationMin * (cadence.met * 3.5 * wKg)) / 200);

    // Tudor-Locke Activity Classification:
    let tier = "Active";
    let tierColor = "#10b981";
    if (steps < 5000) {
      tier = "Sedentary (<5,000 steps/day)";
      tierColor = "#ef4444";
    } else if (steps < 7500) {
      tier = "Low Active (5,000–7,499)";
      tierColor = "#f59e0b";
    } else if (steps < 10000) {
      tier = "Somewhat Active (7,500–9,999)";
      tierColor = "#06b6d4";
    } else if (steps < 12500) {
      tier = "Active (10,000–12,499)";
      tierColor = "#10b981";
    } else {
      tier = "Highly Active (12,500+ steps/day)";
      tierColor = "#8b5cf6";
    }

    const fmtDuration = (mins: number) => {
      const h = Math.floor(mins / 60);
      const m = Math.round(mins % 60);
      if (h > 0) return `${h} hr ${m} min`;
      return `${m} minutes`;
    };

    return {
      hero: {
        label: "Estimated Calories Expended",
        value: `${totalCalories.toLocaleString()}`,
        unit: "kcal",
        sub: `Covered ${distanceMiles} miles (${distanceKm} km) across ${fmtDuration(durationMin)} of active walking`,
      },
      badge: { text: tier, tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Active Locomotion Energy", value: totalCalories, color: tierColor },
          { name: "Daily Step Goal Balance", value: Math.max(0, 10000 - steps), color: "#cbd5e1" },
        ],
      },
      rows: [
        { label: "Estimated Calorie Burn", value: `${totalCalories} kcal`, strong: true },
        { label: "Distance Traversed", value: `${distanceMiles} miles (${distanceKm} km)`, strong: true },
        { label: "Active Walking Duration", value: fmtDuration(durationMin), strong: true },
        { label: "Calculated Stride Length", value: `${strideInches.toFixed(1)} inches (${(strideMeters * 100).toFixed(1)} cm)` },
        { label: "Average Walking Cadence", value: `${cadence.spm} steps / minute` },
        { label: "Tudor-Locke Activity Tier", value: tier },
        { label: "Calorie Burn Rate", value: `~${((totalCalories / steps) * 1000).toFixed(1)} kcal / 1,000 steps` },
      ],
      note: {
        text: (
          <span>
            🚶 <strong>NEAT Longevity Impact:</strong> Replacing 2 hours of sedentary desk sitting with 8,000 brisk steps expands daily non-exercise activity thermogenesis (NEAT) by over 300 kcal, improving insulin glucose clearance by up to 40%.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function StepsToCaloriesCalculator() {
  return <CalcEngine config={config} />;
}
