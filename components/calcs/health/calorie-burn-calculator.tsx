"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const MET_LOOKUP: Record<string, { name: string; met: number }> = {
  run_6mph: { name: "Running (6.0 mph / 10 min/mi)", met: 9.8 },
  run_75mph: { name: "Running (7.5 mph / 8 min/mi)", met: 11.8 },
  run_9mph: { name: "Running (9.0 mph / 6.7 min/mi)", met: 14.5 },
  walk_3mph: { name: "Brisk Walking (3.0 mph)", met: 3.5 },
  walk_4mph: { name: "Very Brisk Walking (4.0 mph)", met: 4.8 },
  hike_hills: { name: "Hiking with Incline / Pack", met: 7.3 },
  cycle_mod: { name: "Cycling (Moderate 12-14 mph)", met: 8.0 },
  cycle_vig: { name: "Cycling (Vigorous 16-19 mph)", met: 12.0 },
  swim_freestyle: { name: "Swimming (Freestyle Laps, Moderate)", met: 8.3 },
  weight_mod: { name: "Weight Training (Standard Rest Intervals)", met: 3.5 },
  weight_vig: { name: "Weight Training (Vigorous Circuit)", met: 6.0 },
  hiit: { name: "High-Intensity Interval Training (HIIT)", met: 10.5 },
  basketball: { name: "Basketball (Full Court Game)", met: 8.0 },
  soccer: { name: "Soccer (Competitive Match)", met: 10.0 },
  rowing: { name: "Rowing Machine (Moderate-Vigorous)", met: 8.5 },
};

export const config: CalcConfig = {
  id: "calorie-burn",
  title: "Calorie Burn Calculator",
  fields: [
    {
      kind: "choice",
      key: "activity",
      label: "Exercise modality",
      default: "run_6mph",
      options: [
        { value: "run_6mph", label: "Running (6.0 mph / 10 min/mi - 9.8 METs)" },
        { value: "run_75mph", label: "Running (7.5 mph / 8 min/mi - 11.8 METs)" },
        { value: "run_9mph", label: "Running (9.0 mph / 6.7 min/mi - 14.5 METs)" },
        { value: "walk_3mph", label: "Brisk Walking (3.0 mph - 3.5 METs)" },
        { value: "walk_4mph", label: "Very Brisk Walking (4.0 mph - 4.8 METs)" },
        { value: "hike_hills", label: "Hiking with Pack (7.3 METs)" },
        { value: "cycle_mod", label: "Road Cycling (12-14 mph - 8.0 METs)" },
        { value: "cycle_vig", label: "Road Cycling (16-19 mph - 12.0 METs)" },
        { value: "swim_freestyle", label: "Swimming Laps (8.3 METs)" },
        { value: "weight_mod", label: "Weight Training (Moderate - 3.5 METs)" },
        { value: "weight_vig", label: "Weight Training (Vigorous Circuit - 6.0 METs)" },
        { value: "hiit", label: "HIIT Intervals (10.5 METs)" },
        { value: "basketball", label: "Basketball (Full Court - 8.0 METs)" },
        { value: "soccer", label: "Soccer Match (10.0 METs)" },
        { value: "rowing", label: "Rowing Ergometer (8.5 METs)" },
      ],
    },
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
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 165, min: 60, max: 450, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 75, min: 30, max: 200, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "duration", label: "Workout duration", suffix: "minutes", default: 45, min: 5, max: 360, integer: true },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const wKg = isMetric ? Number(v.weightKg || 75) : Number(v.weightLbs || 165) / 2.20462;
    const duration = Math.max(1, Number(v.duration || 45));
    const act = MET_LOOKUP[v.activity as string] || MET_LOOKUP.run_6mph;
    const met = act.met;

    // Gross energy:
    const grossCalories = Math.round((duration * (met * 3.5 * wKg)) / 200);

    // Resting baseline during same window (1.0 MET):
    const restingCalories = Math.round((duration * (1.0 * 3.5 * wKg)) / 200);

    // Net exercise burn:
    const netCalories = Math.max(0, grossCalories - restingCalories);

    const burnPerHour = Math.round((grossCalories / duration) * 60);

    let fatPct = 35;
    let carbPct = 65;
    if (met < 5.0) {
      fatPct = 60;
      carbPct = 40;
    } else if (met > 9.5) {
      fatPct = 15;
      carbPct = 85;
    }

    const fatGrams = Math.round((grossCalories * (fatPct / 100)) / 9);
    const carbGrams = Math.round((grossCalories * (carbPct / 100)) / 4);

    return {
      hero: {
        label: "Total Caloric Expenditure (Gross Burn)",
        value: `${grossCalories}`,
        unit: "kcal",
        sub: `Net workout energy: ${netCalories} kcal (${burnPerHour} kcal / hour burn rate)`,
      },
      badge: { text: "2024 Compendium MET Standard", tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Net Exercise Burn", value: netCalories, color: "#10b981" },
          { name: "Basal Resting Baseline", value: restingCalories, color: "#3b82f6" },
        ],
      },
      rows: [
        { label: "Gross Total Calories", value: `${grossCalories} kcal`, strong: true },
        { label: "Net Exercise Deficit", value: `${netCalories} kcal`, strong: true },
        { label: "Hourly Burn Rate", value: `${burnPerHour} kcal / hr` },
        { label: "Ainsworth MET Intensity", value: `${met} × Resting Rate` },
        { label: "Estimated Fat Oxidation", value: `~${fatGrams}g lipid (${fatPct}%)` },
        { label: "Estimated Glycogen Burn", value: `~${carbGrams}g carbohydrate (${carbPct}%)` },
      ],
      note: {
        text: (
          <span>
            🔥 <strong>Net vs Gross Rule:</strong> When planning fat loss, apply your <strong>Net Calorie Deficit ({netCalories} kcal)</strong> rather than gross calories, because resting baseline calories ({restingCalories} kcal) are already accounted for in your standard daily BMR.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function CalorieBurnCalculator() {
  return <CalcEngine config={config} />;
}
