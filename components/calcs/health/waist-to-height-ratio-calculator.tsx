"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "waist-to-height",
  title: "Waist-to-Height Ratio Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (Inches / Feet)" },
        { value: "metric", label: "Metric (Centimeters)" },
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
    {
      kind: "number",
      key: "waistIn",
      label: "Waist circumference",
      suffix: "in",
      default: 32,
      min: 18,
      max: 75,
      hint: "Narrowest natural point above navel, measured at the end of normal exhalation.",
      showIf: (v) => v.unit !== "metric",
    },
    {
      kind: "number",
      key: "waistCm",
      label: "Waist circumference",
      suffix: "cm",
      default: 81.3,
      min: 45,
      max: 190,
      hint: "Narrowest natural point above navel, measured at the end of normal exhalation.",
      showIf: (v) => v.unit === "metric",
    },
    {
      kind: "number",
      key: "heightFt",
      label: "Height (feet)",
      suffix: "ft",
      default: 5,
      min: 4,
      max: 7,
      integer: true,
      showIf: (v) => v.unit !== "metric",
    },
    {
      kind: "number",
      key: "heightIn",
      label: "Height (inches)",
      suffix: "in",
      default: 8,
      min: 0,
      max: 11,
      integer: true,
      showIf: (v) => v.unit !== "metric",
    },
    {
      kind: "number",
      key: "heightCm",
      label: "Height",
      suffix: "cm",
      default: 173,
      min: 100,
      max: 240,
      showIf: (v) => v.unit === "metric",
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";

    const totalHeight = isMetric
      ? Number(v.heightCm || 173)
      : Number(v.heightFt || 5) * 12 + Number(v.heightIn || 8);

    const waist = isMetric
      ? Number(v.waistCm || 81.3)
      : Number(v.waistIn || 32);

    const unitSuffix = isMetric ? "cm" : "inches";

    const whtr = waist / Math.max(1, totalHeight);
    const maxHealthyWaist = totalHeight * 0.50;
    const diff = waist - maxHealthyWaist;

    let category = "Healthy Longevity Zone";
    let badgeTone: "good" | "warn" | "neutral" = "good";
    let zoneColor = "#10b981";
    let hazardRatio = "1.00x (Baseline)";

    if (whtr < 0.35) {
      category = "Take Care / Underweight";
      badgeTone = "neutral";
      zoneColor = "#3b82f6";
      hazardRatio = "1.25x (Nutritional/Sarcopenic risk)";
    } else if (whtr < 0.50) {
      category = "Healthy Longevity Zone (Optimal)";
      badgeTone = "good";
      zoneColor = "#10b981";
      hazardRatio = "1.00x (Lowest all-cause mortality)";
    } else if (whtr < 0.60) {
      category = "Consider Action / Increased Risk";
      badgeTone = "warn";
      zoneColor = "#f59e0b";
      hazardRatio = "1.35x – 1.60x (Elevated cardiometabolic hazard)";
    } else {
      category = "Take Action / Substantially Increased Risk";
      badgeTone = "warn";
      zoneColor = "#ef4444";
      hazardRatio = "2.10x – 2.80x (Severe visceral morbidity)";
    }

    const subText = diff <= 0
      ? `Healthy Waist Ceiling: Under ${maxHealthyWaist.toFixed(1)} ${unitSuffix} (${Math.abs(diff).toFixed(1)} ${unitSuffix} safe margin)`
      : `Healthy Waist Ceiling: Under ${maxHealthyWaist.toFixed(1)} ${unitSuffix} (${diff.toFixed(1)} ${unitSuffix} above threshold)`;

    return {
      hero: {
        label: "Waist-to-Height Ratio (WHtR)",
        value: whtr.toFixed(3),
        unit: "",
        sub: subText,
      },
      badge: { text: category, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Current Waist Ratio", value: Math.min(100, Math.round(whtr * 100)), color: zoneColor },
          { name: "Health Boundary Buffer", value: Math.max(0, Math.round((0.50 - whtr) * 100)), color: "#cbd5e1" },
        ],
      },
      rows: [
        { label: "Calculated WHtR", value: whtr.toFixed(3), strong: true },
        { label: "Clinical Ashwell Category", value: category, strong: true },
        { label: "Upper Healthy Waist Boundary (0.50)", value: `${maxHealthyWaist.toFixed(1)} ${unitSuffix}`, strong: true },
        { label: "Current Waist Circumference", value: `${waist.toFixed(1)} ${unitSuffix}` },
        { label: "Standing Anatomical Height", value: `${totalHeight.toFixed(1)} ${unitSuffix}` },
        { label: "Threshold Distance", value: diff <= 0 ? `${Math.abs(diff).toFixed(1)} ${unitSuffix} within healthy zone` : `${diff.toFixed(1)} ${unitSuffix} above clinical ceiling` },
        { label: "All-Cause Mortality Hazard Ratio", value: hazardRatio },
        { label: "Clinical Screening Guideline", value: "Keep your waist circumference to less than half your height." },
      ],
      note: {
        text: (
          <span>
            📏 <strong>Universal Clinical Metric:</strong> Unlike BMI, which frequently misclassifies muscular athletes as overweight and sarcopenic seniors as healthy, the WHtR 0.50 boundary applies with equal accuracy across all genders, ethnic groups, and adult age brackets.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function WaistToHeightRatioCalculator() {
  return <CalcEngine config={config} />;
}
