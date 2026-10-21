"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "alcohol-unit",
  title: "Alcohol Unit & BAC Calculator",
  fields: [
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
    {
      kind: "choice",
      key: "sex",
      label: "Biological sex",
      default: "male",
      segmented: true,
      options: [
        { value: "male", label: "Male (r = 0.73)" },
        { value: "female", label: "Female (r = 0.66)" },
      ],
    },
    { kind: "number", key: "weightLbs", label: "Body weight", suffix: "lbs", default: 175, min: 80, max: 450, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "weightKg", label: "Body weight", suffix: "kg", default: 79.5, min: 35, max: 200, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "beer", label: "Regular Beers (12 oz, 5% ABV)", suffix: "beers", default: 2, min: 0, max: 30, integer: true },
    { kind: "number", key: "wine", label: "Glasses of Wine (5 oz, 12% ABV)", suffix: "glasses", default: 1, min: 0, max: 30, integer: true },
    { kind: "number", key: "shots", label: "Shots of Liquor (1.5 oz, 40% ABV)", suffix: "shots", default: 0, min: 0, max: 30, integer: true },
    { kind: "number", key: "craft", label: "Craft / Strong Beers (12 oz, 7.5% ABV)", suffix: "crafts", default: 0, min: 0, max: 30, integer: true },
    { kind: "number", key: "hours", label: "Hours since first drink", suffix: "hours", default: 2.0, min: 0, max: 24 },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const sex = v.sex === "female" ? "female" : "male";
    const wLbs = isMetric ? Number(v.weightKg || 79.5) * 2.20462 : Number(v.weightLbs || 175);

    const beer = Number(v.beer || 0);
    const wine = Number(v.wine || 0);
    const shots = Number(v.shots || 0);
    const craft = Number(v.craft || 0);
    const hours = Math.max(0, Number(v.hours || 0));

    // Pure alcohol in grams (1 US standard drink = 14 grams pure ethanol)
    const totalGrams = beer * 14 + wine * 14 + shots * 14 + craft * 21;
    const standardDrinks = (totalGrams / 14).toFixed(1);
    const calories = Math.round(Number(standardDrinks) * 140);

    // Widmark distribution constant r
    const r = sex === "female" ? 0.66 : 0.73;

    // Widmark BAC equation
    const rawBac = (totalGrams * 5.14) / (Math.max(60, wLbs) * r);
    const curBac = Math.max(0, rawBac - 0.015 * hours);
    const roundedBac = Math.round(curBac * 1000) / 1000;

    // Hours to zero
    const hoursToSober = curBac > 0 ? (curBac / 0.015).toFixed(1) : "0.0";

    let status = "Completely Sober (0.00% BAC)";
    let badgeTone: "good" | "warn" | "neutral" = "good";
    let driveLegal = "Safe / Zero Impairment";

    if (roundedBac === 0) {
      status = "Completely Sober";
      badgeTone = "good";
      driveLegal = "Yes — BAC is 0.00%";
    } else if (roundedBac < 0.04) {
      status = "Sub-Threshold Impairment";
      badgeTone = "neutral";
      driveLegal = "Subtle reaction delay; proceed with caution";
    } else if (roundedBac < 0.08) {
      status = "Impaired Judgment & Reflexes";
      badgeTone = "warn";
      driveLegal = "⚠️ Impaired — Do NOT operate a motor vehicle";
    } else if (roundedBac < 0.15) {
      status = "Legally Intoxicated (DUI Violation)";
      badgeTone = "warn";
      driveLegal = "❌ ILLEGAL — Severe motor & sensory impairment";
    } else {
      status = "Severe Intoxication / Danger Zone";
      badgeTone = "warn";
      driveLegal = "🚨 HIGH DANGER — Risk of acute alcohol poisoning";
    }

    return {
      hero: {
        label: "Estimated Blood Alcohol Concentration (BAC)",
        value: `${roundedBac.toFixed(3)}%`,
        unit: "",
        sub: `Status: ${status} | Time to 0.00% Sobriety: ~${hoursToSober} Hours | Drinks: ${standardDrinks} Standard`,
      },
      badge: { text: roundedBac >= 0.08 ? "Above 0.08% Legal DUI Limit" : status, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Blood Alcohol Content", value: Math.min(20, Math.round(roundedBac * 100)), color: roundedBac >= 0.08 ? "#ef4444" : "#10b981" },
          { name: "Legal Headroom Buffer", value: Math.max(0, Math.round((0.08 - roundedBac) * 100)), color: "#cbd5e1" },
        ],
      },
      rows: [
        { label: "Calculated BAC", value: `${roundedBac.toFixed(3)}%`, strong: true },
        { label: "Driving Safety & Legal Status", value: driveLegal, strong: true },
        { label: "Time Until Fully Sober (0.00% BAC)", value: `${hoursToSober} hours`, strong: true },
        { label: "Total Standard Drinks Consumed", value: `${standardDrinks} drinks (${totalGrams.toFixed(1)}g ethanol)` },
        { label: "Estimated Caloric Load from Alcohol", value: `~${calories.toLocaleString()} kcal` },
        { label: "Hours Elapsed Since Ingestion", value: `${hours} hours` },
        { label: "Hepatic Metabolic Clearance Rate", value: "0.015% BAC per hour (constant zero-order kinetics)" },
        { label: "Gender Volume of Distribution (r)", value: `${r} (based on total body water)` },
      ],
      note: {
        text: (
          <span>
            ⚠️ <strong>Legal & Safety Notice:</strong> Blood Alcohol Concentration depends heavily on stomach contents, enzyme genetics, and hydration. Never use an algorithmic estimate to determine fitness to drive. If you have consumed alcohol, always designate a sober driver or use rideshare.
          </span>
        ),
        tone: "warn",
      },
    };
  },
};

export default function AlcoholUnitCalculator() {
  return <CalcEngine config={config} />;
}
