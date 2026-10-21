"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "lean-body-mass",
  title: "Lean Body Mass Calculator",
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
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 175, min: 60, max: 500, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 79.5, min: 25, max: 250, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "heightFt", label: "Height (feet)", suffix: "ft", default: 5, min: 4, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightIn", label: "Height (inches)", suffix: "in", default: 10, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "heightCm", label: "Height", suffix: "cm", default: 178, min: 100, max: 240, showIf: (v) => v.unit === "metric" },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";

    const wKg = isMetric ? Number(v.weightKg || 79.5) : Number(v.weightLbs || 175) / 2.20462;
    const hCm = isMetric
      ? Number(v.heightCm || 178)
      : (Number(v.heightFt || 5) * 12 + Number(v.heightIn || 10)) * 2.54;
    const hM = hCm / 100;

    // 1. Boer Formula (1984)
    let boerKg: number;
    if (sex === "male") {
      boerKg = 0.407 * wKg + 0.267 * hCm - 19.2;
    } else {
      boerKg = 0.252 * wKg + 0.473 * hCm - 48.3;
    }

    // 2. James Formula (1976)
    let jamesKg: number;
    if (sex === "male") {
      jamesKg = 1.1 * wKg - 128 * Math.pow(wKg / hCm, 2);
    } else {
      jamesKg = 1.07 * wKg - 148 * Math.pow(wKg / hCm, 2);
    }

    // 3. Hume Formula (1966)
    let humeKg: number;
    if (sex === "male") {
      humeKg = 0.3281 * wKg + 0.33929 * hCm - 29.5336;
    } else {
      humeKg = 0.29569 * wKg + 0.41813 * hCm - 43.2933;
    }

    // Boundary guardrails
    const safeBoer = Math.max(15, Math.min(wKg * 0.95, boerKg));
    const safeJames = Math.max(15, Math.min(wKg * 0.95, jamesKg));
    const safeHume = Math.max(15, Math.min(wKg * 0.95, humeKg));

    const avgLbmKg = (safeBoer + safeJames + safeHume) / 3;
    const fatKg = Math.max(0, wKg - avgLbmKg);
    const bfPct = (fatKg / wKg) * 100;

    // FFMI and Normalized FFMI
    const ffmi = avgLbmKg / Math.pow(hM, 2);
    const normFfmi = ffmi + 6.1 * (1.8 - hM);

    // Katch-McArdle BMR = 370 + 21.6 * LBM(kg)
    const bmrKatch = Math.round(370 + 21.6 * avgLbmKg);

    // Protein target: 1.6 - 2.2 g per kg of LBM
    const minProt = Math.round(avgLbmKg * 1.6);
    const maxProt = Math.round(avgLbmKg * 2.2);

    // Units formatting
    const toUnit = (kg: number) => {
      if (isMetric) return `${kg.toFixed(1)} kg`;
      return `${(kg * 2.20462).toFixed(1)} lbs`;
    };

    const dispLbm = isMetric ? avgLbmKg.toFixed(1) : (avgLbmKg * 2.20462).toFixed(1);
    const dispUnit = isMetric ? "kg" : "lbs";

    // FFMI category
    let ffmiTier = "Average Muscularity";
    let badgeTone: "good" | "warn" | "neutral" = "good";
    if (sex === "male") {
      if (normFfmi < 18) { ffmiTier = "Below Average Muscularity"; badgeTone = "warn"; }
      else if (normFfmi < 20) { ffmiTier = "Average Natural Muscularity"; badgeTone = "neutral"; }
      else if (normFfmi < 22) { ffmiTier = "Above Average Muscularity"; badgeTone = "good"; }
      else if (normFfmi < 25) { ffmiTier = "Excellent Natural Muscularity"; badgeTone = "good"; }
      else { ffmiTier = "Elite / Upper Natural Limit"; badgeTone = "good"; }
    } else {
      if (normFfmi < 15) { ffmiTier = "Below Average Muscularity"; badgeTone = "warn"; }
      else if (normFfmi < 17) { ffmiTier = "Average Natural Muscularity"; badgeTone = "neutral"; }
      else if (normFfmi < 19) { ffmiTier = "Above Average Muscularity"; badgeTone = "good"; }
      else if (normFfmi < 22) { ffmiTier = "Excellent Natural Muscularity"; badgeTone = "good"; }
      else { ffmiTier = "Elite Athletic Muscularity"; badgeTone = "good"; }
    }

    return {
      hero: {
        label: "Estimated Lean Body Mass (LBM)",
        value: dispLbm,
        unit: dispUnit,
        sub: `Estimated Fat Mass: ${toUnit(fatKg)} (${bfPct.toFixed(1)}%) | Normalized FFMI: ${normFfmi.toFixed(1)} kg/m²`,
      },
      badge: { text: ffmiTier, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Lean Mass (Muscle, Bone, Organs)", value: Math.round(isMetric ? avgLbmKg : avgLbmKg * 2.20462), color: "#10b981" },
          { name: "Adipose Fat Tissue", value: Math.round(isMetric ? fatKg : fatKg * 2.20462), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Consensus Lean Body Mass", value: toUnit(avgLbmKg), strong: true },
        { label: "Boer Equation (Clinical Standard)", value: toUnit(safeBoer) },
        { label: "James Equation (Classic Nomogram)", value: toUnit(safeJames) },
        { label: "Hume Equation", value: toUnit(safeHume) },
        { label: "Calculated Body Fat Mass", value: toUnit(fatKg), strong: true },
        { label: "Estimated Body Fat Percentage", value: `${bfPct.toFixed(1)}%` },
        { label: "Normalized FFMI (Fat-Free Mass Index)", value: `${normFfmi.toFixed(1)} kg/m²` },
        { label: "Katch-McArdle Basal Metabolic Rate", value: `${bmrKatch.toLocaleString()} kcal/day` },
        { label: "Athletic Daily Protein Target (1.6–2.2g/kg LBM)", value: `${minProt}–${maxProt} g/day` },
      ],
      note: {
        text: (
          <span>
            🔬 <strong>Clinical Precision:</strong> The Boer formula is the pharmacokinetic standard utilized by hospital clinicians to calculate drug dosages (such as anesthetics and chemotherapy) that dissolve selectively in fat-free tissue.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function LeanBodyMassCalculator() {
  return <CalcEngine config={config} />;
}
