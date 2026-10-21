"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "body-shape",
  title: "Body Shape Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement unit",
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
      key: "bust",
      label: "Bust / chest circumference",
      suffix: "in",
      default: 36,
      min: 20,
      max: 75,
      hint: "Across fullest point of chest or breast, parallel to floor.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "bustCm",
      label: "Bust / chest circumference",
      suffix: "cm",
      default: 91.5,
      min: 50,
      max: 190,
      hint: "Across fullest point of chest or breast, parallel to floor.",
      showIf: (v) => v.unit === "cm",
    },
    {
      kind: "number",
      key: "waist",
      label: "Waist circumference",
      suffix: "in",
      default: 27,
      min: 18,
      max: 70,
      hint: "Narrowest natural anatomical waist, roughly 1 inch above navel.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "waistCm",
      label: "Waist circumference",
      suffix: "cm",
      default: 68.5,
      min: 45,
      max: 180,
      hint: "Narrowest natural anatomical waist, roughly 1 inch above navel.",
      showIf: (v) => v.unit === "cm",
    },
    {
      kind: "number",
      key: "hip",
      label: "Hip circumference",
      suffix: "in",
      default: 37,
      min: 24,
      max: 80,
      hint: "Widest circumference across the buttocks and greater trochanters.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "hipCm",
      label: "Hip circumference",
      suffix: "cm",
      default: 94,
      min: 60,
      max: 200,
      hint: "Widest circumference across the buttocks and greater trochanters.",
      showIf: (v) => v.unit === "cm",
    },
  ],
  compute: (v) => {
    const isCm = v.unit === "cm";
    const sex = v.sex === "male" ? "male" : "female";

    const rawBust = isCm ? Number(v.bustCm || 91.5) : Number(v.bust || 36);
    const rawWaist = isCm ? Number(v.waistCm || 68.5) : Number(v.waist || 27);
    const rawHip = isCm ? Number(v.hipCm || 94) : Number(v.hip || 37);

    // Convert to inches internally for ratio calculations
    const bIn = isCm ? rawBust / 2.54 : rawBust;
    const wIn = isCm ? rawWaist / 2.54 : rawWaist;
    const hIn = isCm ? rawHip / 2.54 : rawHip;

    const whr = wIn / Math.max(1, hIn);
    const bhr = bIn / Math.max(1, hIn);
    const wbr = wIn / Math.max(1, bIn);

    let shape = "Hourglass";
    let icon = "⌛";
    let desc = "Balanced bust and hips with a distinctly defined waist.";
    let depot = "Balanced subcutaneous adipose distribution";
    let badgeTone: "good" | "warn" | "neutral" = "good";

    if (sex === "female") {
      if (wIn >= hIn * 0.88 && wIn >= bIn * 0.88) {
        shape = "Apple (Android / Oval)";
        icon = "🍎";
        desc = "Waist measurement is close to or greater than bust and hips. Concentration of central abdominal tissue.";
        depot = "Visceral / intra-abdominal adipose tissue";
        badgeTone = "warn";
      } else if (hIn - bIn >= 2.0 && hIn - wIn >= 7.0) {
        shape = "Pear / Spoon (Gynoid)";
        icon = "🍐";
        desc = "Hips and buttocks are noticeably wider than shoulders and bust, with defined waist taper.";
        depot = "Gluteofemoral subcutaneous adipose tissue";
        badgeTone = "good";
      } else if (bIn - hIn >= 2.5 && bIn - wIn >= 7.0) {
        shape = "Inverted Triangle (V-Shape)";
        icon = "🔺";
        desc = "Chest and shoulders are wider than hips, creating an athletic, top-tapered silhouette.";
        depot = "Upper thoracic and back subcutaneous depots";
        badgeTone = "good";
      } else if (Math.abs(bIn - hIn) <= 2.0 && bIn - wIn >= 8.0 && hIn - wIn >= 8.0) {
        shape = "Classic Hourglass (X-Shape)";
        icon = "⌛";
        desc = "Proportionate bust and hips with an indented, well-defined natural waist.";
        depot = "Balanced subcutaneous distribution";
        badgeTone = "good";
      } else if (hIn - bIn >= 1.5 && hIn - wIn >= 6.0) {
        shape = "Bottom Hourglass";
        icon = "⌛";
        desc = "Hourglass curves with slightly more predominant hip and gluteal fullness.";
        depot = "Subcutaneous hips and thighs";
        badgeTone = "good";
      } else if (bIn - hIn >= 1.5 && bIn - wIn >= 6.0) {
        shape = "Top Hourglass";
        icon = "⌛";
        desc = "Hourglass curves with slightly fuller bust and chest relative to hip breadth.";
        depot = "Subcutaneous chest and hips";
        badgeTone = "good";
      } else {
        shape = "Rectangle (Athletic Banana)";
        icon = "▬";
        desc = "Bust, waist, and hips align in similar widths with a straight, linear athletic silhouette.";
        depot = "Even subcutaneous and mild systemic distribution";
        badgeTone = "neutral";
      }
    } else {
      // Male anthropometry
      if (whr >= 0.95 || wIn >= bIn * 0.95) {
        shape = "Apple (Android / Oval)";
        icon = "🍎";
        desc = "Midsection waist circumference exceeds or closely matches chest and hips. High visceral fat indicator.";
        depot = "Visceral omental / mesenteric adipose tissue";
        badgeTone = "warn";
      } else if (bIn / hIn >= 1.15 && whr <= 0.88) {
        shape = "Inverted Triangle (V-Taper)";
        icon = "🔺";
        desc = "Broad chest, wide clavicles, and narrow waist and hips characteristic of athletic strength.";
        depot = "Minimal subcutaneous fat, high upper muscularity";
        badgeTone = "good";
      } else if (bIn / hIn >= 1.05 && whr <= 0.90) {
        shape = "Trapezoid (Athletic Standard)";
        icon = "📐";
        desc = "Broad chest and shoulders tapering to a moderately trim waist and hip structure.";
        depot = "Balanced lean composition";
        badgeTone = "good";
      } else if (hIn > bIn * 1.04) {
        shape = "Triangle / Pear";
        icon = "🍐";
        desc = "Lower torso and hips are broader than chest and shoulders.";
        depot = "Gluteofemoral subcutaneous distribution";
        badgeTone = "neutral";
      } else {
        shape = "Rectangle (Straight Frame)";
        icon = "▬";
        desc = "Uniform breadth across shoulders, chest, waist, and hips with minimal taper.";
        depot = "Even generalized fat distribution";
        badgeTone = "neutral";
      }
    }

    // WHO Cardiometabolic Risk via WHR:
    let whoRisk = "Low Cardiovascular Risk";
    let whoRiskTone = "#10b981";
    if (sex === "female") {
      if (whr >= 0.85) {
        whoRisk = "Substantially Increased (WHR ≥ 0.85)";
        whoRiskTone = "#ef4444";
      } else if (whr >= 0.80) {
        whoRisk = "Moderate Risk (WHR 0.80–0.84)";
        whoRiskTone = "#f59e0b";
      }
    } else {
      if (whr >= 0.95) {
        whoRisk = "Substantially Increased (WHR ≥ 0.95)";
        whoRiskTone = "#ef4444";
      } else if (whr >= 0.90) {
        whoRisk = "Moderate Risk (WHR 0.90–0.94)";
        whoRiskTone = "#f59e0b";
      }
    }

    const unitSuffix = isCm ? "cm" : "in";

    return {
      hero: {
        label: "Morphological Body Shape",
        value: shape,
        unit: icon,
        sub: `Waist-to-Hip Ratio: ${whr.toFixed(2)} (${whoRisk}) | Bust-to-Hip: ${bhr.toFixed(2)}`,
      },
      badge: { text: shape, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Bust / Chest", value: Math.round(rawBust), color: "#0ea5e9" },
          { name: "Waist", value: Math.round(rawWaist), color: "#10b981" },
          { name: "Hips", value: Math.round(rawHip), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Phenotypic Classification", value: `${icon} ${shape}`, strong: true },
        { label: "Waist-to-Hip Ratio (WHR)", value: whr.toFixed(2), strong: true },
        { label: "WHO Cardiometabolic Risk", value: whoRisk, strong: true },
        { label: "Bust / Chest Circumference", value: `${rawBust} ${unitSuffix}` },
        { label: "Waist Circumference", value: `${rawWaist} ${unitSuffix}` },
        { label: "Hip Circumference", value: `${rawHip} ${unitSuffix}` },
        { label: "Bust-to-Hip Ratio (BHR)", value: bhr.toFixed(2) },
        { label: "Waist-to-Bust Ratio (WBR)", value: wbr.toFixed(2) },
        { label: "Primary Adipose Depot", value: depot },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Cardiovascular Protection:</strong> Gluteofemoral fat (hips and thighs) in pear and hourglass profiles acts as a beneficial metabolic reservoir that traps free fatty acids, protecting the liver and myocardium from ectopic fat accumulation.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function BodyShapeCalculator() {
  return <CalcEngine config={config} />;
}
