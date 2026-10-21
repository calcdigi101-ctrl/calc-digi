"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "ideal-weight",
  title: "Ideal Weight Calculator",
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
    { kind: "number", key: "age", label: "Age", suffix: "yrs", default: 30, min: 18, max: 100, integer: true },
    // US Inputs
    { kind: "number", key: "heightFt", label: "Height (feet)", suffix: "ft", default: 5, min: 4, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightIn", label: "Height (inches)", suffix: "in", default: 10, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    // Metric Inputs
    { kind: "number", key: "heightCm", label: "Height", suffix: "cm", default: 178, min: 120, max: 230, showIf: (v) => v.unit === "metric" },
    {
      kind: "choice",
      key: "frame",
      label: "Skeletal frame size",
      default: "medium",
      segmented: true,
      options: [
        { value: "small", label: "Small Frame (-10%)" },
        { value: "medium", label: "Medium (Standard)" },
        { value: "large", label: "Large Frame (+10%)" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";

    let heightCm = 0;
    if (isMetric) {
      heightCm = Number(v.heightCm || 178);
    } else {
      const ft = Number(v.heightFt || 5);
      const inc = Number(v.heightIn || 10);
      heightCm = ((ft * 12) + inc) * 2.54;
    }

    const totalInches = heightCm / 2.54;
    const inchesOver5Ft = Math.max(0, totalInches - 60);

    // 1. Devine Formula (1974)
    const devineKg = sex === "male"
      ? 50.0 + (2.3 * inchesOver5Ft)
      : 45.5 + (2.3 * inchesOver5Ft);

    // 2. Robinson Formula (1983)
    const robinsonKg = sex === "male"
      ? 52.0 + (1.9 * inchesOver5Ft)
      : 49.0 + (1.7 * inchesOver5Ft);

    // 3. Miller Formula (1983)
    const millerKg = sex === "male"
      ? 56.2 + (1.41 * inchesOver5Ft)
      : 53.1 + (1.36 * inchesOver5Ft);

    // 4. Hamwi Formula (1964)
    const hamwiKg = sex === "male"
      ? 48.0 + (2.7 * inchesOver5Ft)
      : 45.5 + (2.2 * inchesOver5Ft);

    // Frame modifier
    const frameMod = v.frame === "small" ? 0.90 : v.frame === "large" ? 1.10 : 1.0;

    const devineFinal = devineKg * frameMod;
    const robinsonFinal = robinsonKg * frameMod;
    const millerFinal = millerKg * frameMod;
    const hamwiFinal = hamwiKg * frameMod;

    // WHO Healthy BMI Weight Range (18.5 - 24.9)
    const heightM = heightCm / 100;
    const whoBmiMinKg = 18.5 * heightM * heightM;
    const whoBmiMaxKg = 24.9 * heightM * heightM;

    // Output formatting based on unit
    const toUnit = (kg: number) => isMetric ? `${kg.toFixed(1)} kg` : `${(kg * 2.20462).toFixed(1)} lbs`;
    const toVal = (kg: number) => isMetric ? Number(kg.toFixed(1)) : Number((kg * 2.20462).toFixed(1));

    const avgIdealKg = (devineFinal + robinsonFinal + millerFinal + hamwiFinal) / 4;
    const minFormulaKg = Math.min(devineFinal, robinsonFinal, millerFinal, hamwiFinal);
    const maxFormulaKg = Math.max(devineFinal, robinsonFinal, millerFinal, hamwiFinal);

    return {
      hero: {
        label: "Consensus Ideal Body Weight (IBW)",
        value: `${toVal(avgIdealKg)}`,
        unit: isMetric ? "kg" : "lbs",
        sub: `Clinical consensus range across 4 peer-reviewed medical formulas: ${toUnit(minFormulaKg)} – ${toUnit(maxFormulaKg)}.`,
      },
      badge: {
        text: `WHO Normal BMI Range: ${toUnit(whoBmiMinKg)} – ${toUnit(whoBmiMaxKg)}`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Devine (1974)", value: toVal(devineFinal), color: "#10b981" },
          { name: "Robinson (1983)", value: toVal(robinsonFinal), color: "#3b82f6" },
          { name: "Miller (1983)", value: toVal(millerFinal), color: "#f59e0b" },
          { name: "Hamwi (1964)", value: toVal(hamwiFinal), color: "#8b5cf6" },
        ],
      },
      rows: [
        { label: "Consensus Average Weight", value: toUnit(avgIdealKg), strong: true },
        { label: "Devine Formula (Clinical Gold Standard)", value: toUnit(devineFinal), strong: true },
        { label: "Robinson Formula (General Population)", value: toUnit(robinsonFinal) },
        { label: "Miller Formula (Conservative Baseline)", value: toUnit(millerFinal) },
        { label: "Hamwi Formula (Nutritionist Benchmark)", value: toUnit(hamwiFinal) },
        { label: "WHO Healthy BMI Weight Floor (18.5)", value: toUnit(whoBmiMinKg) },
        { label: "WHO Healthy BMI Weight Ceiling (24.9)", value: toUnit(whoBmiMaxKg) },
        { label: "Frame Size Adjustment", value: v.frame === "small" ? "Small Frame (-10%)" : v.frame === "large" ? "Large Frame (+10%)" : "Medium / Standard (0%)" },
      ],
      note: {
        text: (
          <span>
            🩺 <strong>Clinical Context:</strong> The Devine Formula remains the most widely cited equation in clinical pharmacology for calculating therapeutic clearance and medication dosing. While these formulas provide target weights, muscle mass, bone density, and visceral fat distribution are equally crucial indicators of metabolic vitality.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function IdealWeightCalculator() {
  return <CalcEngine config={config} />;
}
