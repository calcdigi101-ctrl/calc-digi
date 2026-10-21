"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "child-height-predictor",
  title: "Child Height Predictor",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement System",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (ft / in)" },
        { value: "metric", label: "Metric (cm)" },
      ],
    },
    {
      kind: "choice",
      key: "sex",
      label: "Child's Biological Sex",
      default: "boy",
      segmented: true,
      options: [
        { value: "boy", label: "Boy (Male)" },
        { value: "girl", label: "Girl (Female)" },
      ],
    },
    {
      kind: "number",
      key: "childAge",
      label: "Child's Current Age (Years)",
      suffix: "yrs",
      default: 8,
      min: 1,
      max: 18,
      integer: true,
      hint: "Pediatric growth plates remain active until approximately 14–16 yrs in girls and 16–18 yrs in boys.",
    },
    // US Inputs - Father
    { kind: "number", key: "fatherFt", label: "Father's Height (Feet)", suffix: "ft", default: 5, min: 4, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "fatherIn", label: "Father's Height (Inches)", suffix: "in", default: 10, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    // US Inputs - Mother
    { kind: "number", key: "motherFt", label: "Mother's Height (Feet)", suffix: "ft", default: 5, min: 4, max: 7, integer: true, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "motherIn", label: "Mother's Height (Inches)", suffix: "in", default: 4, min: 0, max: 11, integer: true, showIf: (v) => v.unit !== "metric" },
    // Metric Inputs
    { kind: "number", key: "fatherCm", label: "Father's Height", suffix: "cm", default: 178, min: 120, max: 230, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "motherCm", label: "Mother's Height", suffix: "cm", default: 163, min: 120, max: 230, showIf: (v) => v.unit === "metric" },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = String(v.sex || "boy");
    const age = Number(v.childAge || 8);

    // Resolve Father & Mother heights in cm and inches
    let fatherCm: number;
    let motherCm: number;
    let fatherInTotal: number;
    let motherInTotal: number;

    if (isMetric) {
      fatherCm = Number(v.fatherCm || 178);
      motherCm = Number(v.motherCm || 163);
      fatherInTotal = fatherCm / 2.54;
      motherInTotal = motherCm / 2.54;
    } else {
      const fFt = Number(v.fatherFt || 5);
      const fIn = Number(v.fatherIn || 10);
      const mFt = Number(v.motherFt || 5);
      const mIn = Number(v.motherIn || 4);
      fatherInTotal = fFt * 12 + fIn;
      motherInTotal = mFt * 12 + mIn;
      fatherCm = fatherInTotal * 2.54;
      motherCm = motherInTotal * 2.54;
    }

    // Tanner-Goldstein Mid-Parental Height (MPH) Calculation
    // Boys: (Father + Mother + 13 cm) / 2
    // Girls: (Father + Mother - 13 cm) / 2
    const sexDeltaCm = sex === "boy" ? 13 : -13;
    const sexDeltaIn = sex === "boy" ? 5 : -5;

    const mphCm = (fatherCm + motherCm + sexDeltaCm) / 2;
    const mphIn = (fatherInTotal + motherInTotal + sexDeltaIn) / 2;

    // Normal ±2 in (±5 cm) target range
    const lowTargetIn = mphIn - 2.0;
    const highTargetIn = mphIn + 2.0;
    const lowTargetCm = mphCm - 5.08;
    const highTargetCm = mphCm + 5.08;

    // 95% Confidence Interval (±3.3 in / ±8.5 cm)
    const ci95LowIn = mphIn - 3.35;
    const ci95HighIn = mphIn + 3.35;
    const ci95LowCm = mphCm - 8.5;
    const ci95HighCm = mphCm + 8.5;

    const formatFtIn = (inches: number) => {
      const ft = Math.floor(inches / 12);
      const remIn = Math.round((inches % 12) * 10) / 10;
      return `${ft}'${remIn}"`;
    };

    const mainDisplay = isMetric
      ? `${mphCm.toFixed(1)} cm (${formatFtIn(mphIn)})`
      : `${formatFtIn(mphIn)} (${mphCm.toFixed(1)} cm)`;

    const rangeDisplay = isMetric
      ? `${lowTargetCm.toFixed(1)} cm – ${highTargetCm.toFixed(1)} cm`
      : `${formatFtIn(lowTargetIn)} – ${formatFtIn(highTargetIn)}`;

    const ciDisplay = isMetric
      ? `${ci95LowCm.toFixed(1)} cm – ${ci95HighCm.toFixed(1)} cm`
      : `${formatFtIn(ci95LowIn)} – ${formatFtIn(ci95HighIn)}`;

    return {
      hero: {
        label: "Predicted Adult Height",
        value: isMetric ? `${mphCm.toFixed(1)} cm` : formatFtIn(mphIn),
        unit: "",
        sub: `Target Range: ${rangeDisplay} (±2.0 inches) | 95% Statistical Bound: ${ciDisplay}`,
      },
      badge: {
        text: `Tanner Mid-Parental Model (${sex === "boy" ? "Boy" : "Girl"})`,
        tone: "good",
      },
      chart: {
        type: "bar",
        x: "tier",
        series: [{ key: "stature", name: isMetric ? "Height (cm)" : "Height (in)", color: "#0284c7" }],
        data: [
          { tier: "Lower (-2\")", stature: Math.round(isMetric ? lowTargetCm : lowTargetIn) },
          { tier: "Target (MPH)", stature: Math.round(isMetric ? mphCm : mphIn) },
          { tier: "Upper (+2\")", stature: Math.round(isMetric ? highTargetCm : highTargetIn) },
        ],
        format: "num",
      },
      rows: [
        { label: "Predicted Adult Stature (MPH)", value: mainDisplay, strong: true },
        { label: "Expected Target Range (±2 in / ±5 cm)", value: rangeDisplay, strong: true },
        { label: "95% Confidence Interval (±3.3 in / ±8.5 cm)", value: ciDisplay },
        {
          label: "Father's Stature",
          value: isMetric ? `${fatherCm.toFixed(1)} cm` : `${formatFtIn(fatherInTotal)} (${fatherCm.toFixed(1)} cm)`,
        },
        {
          label: "Mother's Stature",
          value: isMetric ? `${motherCm.toFixed(1)} cm` : `${formatFtIn(motherInTotal)} (${motherCm.toFixed(1)} cm)`,
        },
        {
          label: "Sex Adjustment Applied",
          value: sex === "boy" ? "+5.0 inches (+13 cm)" : "-5.0 inches (-13 cm)",
        },
        {
          label: "Validation Standard",
          value: "Tanner-Goldstein Mid-Parental Stature Equation (AAP & Endocrine Society)",
        },
      ],
      note: {
        text: (
          <span>
            📏 <strong>Genetic Potential vs. Environmental Expression:</strong> Parental genetics account for roughly 60% to 80% of final adult stature. The remaining 20% to 40% is governed by pediatric nutrition (adequate protein and micronutrients like zinc and vitamin D), 9–11 hours of nocturnal sleep for growth hormone surges, and physical activity stimulating osteoblast remodeling.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function ChildHeightPredictor() {
  return <CalcEngine config={config} />;
}
