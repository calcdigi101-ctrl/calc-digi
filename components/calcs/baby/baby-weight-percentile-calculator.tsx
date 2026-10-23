"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

const WT50_BOY = [
  3.35, 4.47, 5.57, 6.39, 7.0, 7.51, 7.93, 8.3, 8.62, 8.9, 9.16, 9.4, 9.62, 9.83, 10.04, 10.23, 10.41, 10.58, 10.73,
  10.88, 11.02, 11.15, 11.28, 11.4, 11.51,
];
const WT50_GIRL = [
  3.23, 4.19, 5.12, 5.82, 6.39, 6.87, 7.26, 7.6, 7.9, 8.18, 8.44, 8.68, 8.9, 9.11, 9.3, 9.48, 9.66, 9.82, 9.98,
  10.13, 10.27, 10.41, 10.54, 10.67, 10.8,
];

function normalCdf(z: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const absZ = Math.abs(z) / Math.SQRT2;
  const t = 1.0 / (1.0 + p * absZ);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ);
  return 0.5 * (1.0 + sign * y);
}

export const config: CalcConfig = {
  id: "baby-weight-percentile-calc",
  title: "Baby Weight Percentile Calculator",
  presets: [
    { label: "Newborn Boy (3.4 kg, 50th %)", values: { sex: "boy", ageMonths: 0, weightUnit: "kg", weight: 3.4 } },
    { label: "3-Month Girl (5.8 kg, 50th %)", values: { sex: "girl", ageMonths: 3, weightUnit: "kg", weight: 5.8 } },
    { label: "6-Month Boy (17.5 lbs, 50th %)", values: { sex: "boy", ageMonths: 6, weightUnit: "lbs", weight: 17.5 } },
    { label: "12-Month Toddler (21.5 lbs)", values: { sex: "boy", ageMonths: 12, weightUnit: "lbs", weight: 21.5 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "sex",
      label: "Baby's Biological Sex",
      default: "boy",
      segmented: true,
      options: [
        { value: "boy", label: "Boy (Male)" },
        { value: "girl", label: "Girl (Female)" },
      ],
    },
    {
      kind: "number",
      key: "ageMonths",
      label: "Age (Months, 0 to 24)",
      default: 4,
      min: 0,
      max: 24,
      integer: true,
      hint: "Completed calendar months from birth",
    },
    {
      kind: "choice",
      key: "weightUnit",
      label: "Weight Unit",
      default: "lbs",
      segmented: true,
      options: [
        { value: "lbs", label: "Pounds (lbs)" },
        { value: "kg", label: "Kilograms (kg)" },
      ],
    },
    {
      kind: "number",
      key: "weight",
      label: "Current Weight",
      default: 15,
      min: 2,
      max: 45,
    },
  ],
  compute(values) {
    const sex = String(values.sex || "boy");
    const age = Math.min(24, Math.max(0, Math.floor(Number(values.ageMonths || 0))));
    const unit = String(values.weightUnit || "lbs");
    const rawWt = Number(values.weight) || 10;

    const wtKg = unit === "lbs" ? rawWt * 0.453592 : rawWt;
    const wtLbs = unit === "lbs" ? rawWt : rawWt * 2.20462;

    const table = sex === "boy" ? WT50_BOY : WT50_GIRL;
    const medianKg = table[age] ?? 8.0;
    const medianLbs = medianKg * 2.20462;

    // WHO standard deviation estimation (~12% coefficient of variation)
    const sdKg = medianKg * 0.125;
    const zScore = (wtKg - medianKg) / sdKg;
    const pct = Math.min(99.9, Math.max(0.1, normalCdf(zScore) * 100));

    let category = "Healthy Average Weight (25th–75th Percentile)";
    let tone: "good" | "info" | "warn" = "good";

    if (pct < 5) {
      category = "Underweight (< 5th Percentile) – Clinical Attention Advised";
      tone = "warn";
    } else if (pct < 15) {
      category = "Mildly Lean (5th–15th Percentile)";
      tone = "info";
    } else if (pct > 95) {
      category = "High Weight for Age (> 95th Percentile)";
      tone = "info";
    } else if (pct > 85) {
      category = "Upper Normal Range (85th–95th Percentile)";
      tone = "good";
    }

    const pctNumber = Math.round(pct);
    const deltaMedianKg = wtKg - medianKg;

    const steps = [
      `Reference Standard: WHO Child Growth Standards (0–24 months for ${sex === "boy" ? "Boys" : "Girls"})`,
      `50th Percentile Benchmark for ${age} Months: ${fixed(medianKg, 2)} kg (${fixed(medianLbs, 1)} lbs)`,
      `Current Baby Weight: ${fixed(wtKg, 2)} kg (${fixed(wtLbs, 1)} lbs)`,
      `Z-Score Statistical Deviation: Z = (Weight − Median) ÷ SD = ${fixed(zScore, 2)} σ`,
      `Percentile Position: ${fixed(pct, 1)}th percentile rank on standard distribution curve`,
    ];

    return {
      hero: {
        label: "Weight Percentile",
        value: `${pctNumber}th`,
        unit: "percentile",
      },
      badge: {
        text: category,
        tone,
      },
      rows: [
        { label: "Growth Percentile Rank", value: `${fixed(pct, 1)}% of peers weigh less`, strong: true },
        { label: "50th Percentile Median Weight", value: `${fixed(medianKg, 2)} kg (${fixed(medianLbs, 1)} lbs)`, strong: true },
        { label: "Difference from Median", value: `${deltaMedianKg >= 0 ? "+" : ""}${fixed(deltaMedianKg, 2)} kg (${deltaMedianKg >= 0 ? "+" : ""}${fixed(deltaMedianKg * 2.20462, 1)} lbs)` },
        { label: "Statistical Z-Score", value: `${fixed(zScore, 2)} standard deviations` },
        { label: "Reference Standard", value: "World Health Organization (WHO) 2006 Standards" },
        { label: "Evaluation", value: category },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Peer Population Weight Distribution",
        data: [
          { name: `Peers Weighing Less (${pctNumber}%)`, value: Math.max(1, pctNumber), color: "#10b981" },
          { name: `Peers Weighing More (${100 - pctNumber}%)`, value: Math.max(1, 100 - pctNumber), color: "#06b6d4" },
        ],
      },
      note: {
        text: "The CDC and American Academy of Pediatrics emphasize that continuous tracking along a baby's personal growth curve is far more clinically meaningful than any single percentile snapshot. Consistent upward progression signifies healthy development.",
        tone: "neutral",
      },
    };
  },
};

export default function BabyWeightPercentileCalculator() {
  return <CalcEngine config={config} />;
}
