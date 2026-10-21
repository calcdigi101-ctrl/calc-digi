"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "waist-to-hip",
  title: "Waist-to-Hip Ratio Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "in",
      segmented: true,
      options: [
        { value: "in", label: "Inches (in)" },
        { value: "cm", label: "Centimeters (cm)" },
      ],
    },
    {
      kind: "choice",
      key: "sex",
      label: "Biological sex",
      default: "female",
      segmented: true,
      options: [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
      ],
    },
    {
      kind: "number",
      key: "waist",
      label: "Waist circumference",
      suffix: "in",
      default: 29,
      min: 18,
      max: 75,
      hint: "Narrowest natural point above navel, measured at the end of normal exhalation.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "waistCm",
      label: "Waist circumference",
      suffix: "cm",
      default: 73.5,
      min: 45,
      max: 190,
      hint: "Narrowest natural point above navel, measured at the end of normal exhalation.",
      showIf: (v) => v.unit === "cm",
    },
    {
      kind: "number",
      key: "hip",
      label: "Hip circumference",
      suffix: "in",
      default: 38,
      min: 22,
      max: 85,
      hint: "Widest point around buttocks and greater trochanters.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "hipCm",
      label: "Hip circumference",
      suffix: "cm",
      default: 96.5,
      min: 55,
      max: 215,
      hint: "Widest point around buttocks and greater trochanters.",
      showIf: (v) => v.unit === "cm",
    },
  ],
  compute: (v) => {
    const isCm = v.unit === "cm";
    const sex = v.sex === "male" ? "male" : "female";

    const waist = isCm ? Number(v.waistCm || 73.5) : Number(v.waist || 29);
    const hip = isCm ? Number(v.hipCm || 96.5) : Number(v.hip || 38);
    const unitSuffix = isCm ? "cm" : "in";

    const whr = waist / Math.max(1, hip);

    let riskCat = "Low Cardiometabolic Risk";
    let badgeTone: "good" | "warn" | "neutral" = "good";
    let zoneColor = "#10b981";
    let heartAttackOr = "1.00x – 1.05x (Baseline)";
    let morphology = "Gynoid / Peripheral Subcutaneous (Protective)";
    const threshold = sex === "female" ? 0.85 : 0.95;

    if (sex === "female") {
      if (whr <= 0.80) {
        riskCat = "Low Risk (Healthy Gynoid)";
        badgeTone = "good";
        zoneColor = "#10b981";
        heartAttackOr = "1.00x – 1.10x (Optimal baseline)";
        morphology = "Gynoid / Gluteofemoral subcutaneous (Protective)";
      } else if (whr < 0.85) {
        riskCat = "Moderate Risk (Early Central Accumulation)";
        badgeTone = "neutral";
        zoneColor = "#f59e0b";
        heartAttackOr = "1.35x – 1.70x Elevated Hazard";
        morphology = "Mixed Subcutaneous / Mild Visceral";
      } else {
        riskCat = "Substantially Increased Risk (WHO Android Cutoff)";
        badgeTone = "warn";
        zoneColor = "#ef4444";
        heartAttackOr = "2.10x – 3.80x Elevated Hazard";
        morphology = "Android / Intra-Abdominal Visceral Adiposity";
      }
    } else {
      if (whr <= 0.90) {
        riskCat = "Low Risk (Healthy Athletic / Lean)";
        badgeTone = "good";
        zoneColor = "#10b981";
        heartAttackOr = "0.95x – 1.05x (Optimal baseline)";
        morphology = "Balanced Lean / Minimal Visceral Depot";
      } else if (whr < 0.95) {
        riskCat = "Moderate Risk (Borderline Visceral Infiltration)";
        badgeTone = "neutral";
        zoneColor = "#f59e0b";
        heartAttackOr = "1.30x – 1.65x Elevated Hazard";
        morphology = "Central Android Transition";
      } else {
        riskCat = "Substantially Increased Risk (WHO Android Cutoff)";
        badgeTone = "warn";
        zoneColor = "#ef4444";
        heartAttackOr = "2.00x – 3.40x Elevated Hazard";
        morphology = "Android / Intra-Abdominal Visceral Adiposity";
      }
    }

    const healthyTargetWaist = (hip * (sex === "female" ? 0.80 : 0.90)).toFixed(1);

    return {
      hero: {
        label: "Waist-to-Hip Ratio (WHR)",
        value: whr.toFixed(3),
        unit: "",
        sub: `WHO Threshold: ≤ ${threshold.toFixed(2)} (${sex === "female" ? "Women" : "Men"}) | Status: ${riskCat.split("(")[0]}`,
      },
      badge: { text: riskCat, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Current Waist-to-Hip Ratio", value: Math.min(100, Math.round(whr * 100)), color: zoneColor },
          { name: "Safety Margin to WHO Cutoff", value: Math.max(0, Math.round((threshold - whr) * 100)), color: "#cbd5e1" },
        ],
      },
      rows: [
        { label: "Waist-to-Hip Ratio (WHR)", value: whr.toFixed(3), strong: true },
        { label: "WHO Epidemiological Risk Tier", value: riskCat, strong: true },
        { label: "INTERHEART Myocardial Infarction Odds", value: heartAttackOr },
        { label: "Measured Waist Circumference", value: `${waist.toFixed(1)} ${unitSuffix}` },
        { label: "Measured Hip Circumference", value: `${hip.toFixed(1)} ${unitSuffix}` },
        { label: "Optimal Low-Risk Waist Target", value: `≤ ${healthyTargetWaist} ${unitSuffix}` },
        { label: "WHO Cardiovascular Risk Cutoff", value: `WHR ≥ ${threshold.toFixed(2)}` },
        { label: "Primary Adipose Morphology", value: morphology },
      ],
      note: {
        text: (
          <span>
            ❤️ <strong>INTERHEART Finding:</strong> In the landmark INTERHEART study of 27,000 subjects across 52 nations, waist-to-hip ratio was proven to be 3 times more predictive of heart attacks than Body Mass Index (BMI).
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function WaistToHipRatioCalculator() {
  return <CalcEngine config={config} />;
}
