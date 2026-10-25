"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "elevation-grade-calc",
  title: "Elevation Grade & Slope Calculator",
  presets: [
    { label: "US Interstate Highway Limit (6% Grade)", values: { rise: 60, run: 1000 } },
    { label: "ADA Wheelchair Ramp (8.33% / 1:12)", values: { rise: 0.76, run: 9.14 } },
    { label: "Mountain Pass Switchback (12% Grade)", values: { rise: 120, run: 1000 } },
    { label: "Cat 1 Alpine Cycling Ascent (18% Incline)", values: { rise: 180, run: 1000 } },
    { label: "Standard Freight Railroad (2.2% Limit)", values: { rise: 22, run: 1000 } },
    { label: "Baldwin Street NZ (35% World Record)", values: { rise: 35, run: 100 } },
  ],
  fields: [
    {
      kind: "number",
      key: "rise",
      label: "Vertical Rise / Elevation Change (m or ft)",
      default: 60,
      min: 0,
      max: 100000,
      hint: "Total vertical change in elevation (same units as horizontal run)",
    },
    {
      kind: "number",
      key: "run",
      label: "Horizontal Run / Flat Distance (m or ft)",
      default: 1000,
      min: 0.001,
      max: 1000000,
      hint: "Horizontal flat-map distance between starting and ending points",
    },
  ],
  compute(values) {
    const rise = Number(values.rise);
    const run = Number(values.run);

    if (isNaN(rise) || isNaN(run) || run <= 0) {
      return { error: "Please enter a valid horizontal run distance greater than zero." };
    }
    if (rise < 0) {
      return { error: "Rise must be zero or a positive elevation change." };
    }

    const gradePct = (rise / run) * 100;
    const angleRad = Math.atan(rise / run);
    const angleDeg = (angleRad * 180) / Math.PI;

    // Actual travel distance along slope hypotenuse
    const slopeLength = Math.sqrt(rise * rise + run * run);
    const ratioRun = rise > 0 ? run / rise : 0;

    let slopeCategory = "Gentle Incline";
    let complianceTone: "good" | "info" | "warn" = "good";

    if (gradePct <= 2.2) {
      slopeCategory = "Railroad Grade Compliant (≤ 2.2%)";
      complianceTone = "good";
    } else if (gradePct <= 6.0) {
      slopeCategory = "US Interstate Highway Compliant (≤ 6%)";
      complianceTone = "good";
    } else if (gradePct <= 8.33) {
      slopeCategory = "ADA Ramp Compliant (≤ 8.33% / 1:12)";
      complianceTone = "good";
    } else if (gradePct <= 15) {
      slopeCategory = "Steep Mountain Pass (Signs Mandatory)";
      complianceTone = "warn";
    } else if (gradePct <= 25) {
      slopeCategory = "Extreme Alpine Ascent (Low Gear Required)";
      complianceTone = "warn";
    } else {
      slopeCategory = "Severe Pitch / Staircase Grade (> 25%)";
      complianceTone = "warn";
    }

    const steps = [
      `1. Slope Ratio: Rise ÷ Run = ${rise} ÷ ${run} = ${(rise / run).toFixed(4)} (or 1 : ${ratioRun > 0 ? ratioRun.toFixed(1) : "Flat"})`,
      `2. Percentage Grade: (Rise ÷ Run) × 100 = ${(rise / run).toFixed(4)} × 100 = ${gradePct.toFixed(2)}%`,
      `3. Pitch Angle (Degrees): arctan(${rise} ÷ ${run}) = arctan(${(rise / run).toFixed(4)}) = ${angleDeg.toFixed(2)}°`,
      `4. Physical Hypotenuse: √(Rise² + Run²) = √(${rise}² + ${run}²) = ${slopeLength.toFixed(2)} units of actual travel distance`,
      `5. Engineering Assessment: ${slopeCategory}`,
    ];

    return {
      hero: {
        label: "Calculated Incline Grade",
        value: `${gradePct.toFixed(2)}%`,
        unit: `${angleDeg.toFixed(2)}° slope`,
      },
      badge: {
        text: slopeCategory,
        tone: complianceTone,
      },
      rows: [
        { label: "Percentage Grade (Slope %)", value: `${gradePct.toFixed(2)}%`, strong: true },
        { label: "Angle of Incline (Pitch)", value: `${angleDeg.toFixed(2)} degrees`, strong: true },
        { label: "Standard Slope Ratio", value: ratioRun > 0 ? `1 : ${ratioRun.toFixed(2)} (or ${rise}:${run})` : "Flat (0°)" },
        { label: "Travel Hypotenuse (True Distance)", value: `${slopeLength.toFixed(2)} units` },
        { label: "Vertical Rise", value: `${rise.toLocaleString()} units` },
        { label: "Horizontal Run", value: `${run.toLocaleString()} units` },
        { label: "ADA Ramp Compliance (1:12)", value: gradePct <= 8.33 ? "Compliant (≤ 8.33%)" : "Non-compliant (Too steep)" },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Vertical vs. Horizontal Vector Components",
        data: [
          { name: "Horizontal Run", value: Math.max(0.1, run), color: "#3b82f6" },
          { name: "Vertical Rise", value: Math.max(0.1, rise), color: "#f97316" },
        ],
      },
      note: {
        text: "Grade (%) measures vertical elevation rise per 100 units of horizontal run. It differs from slope angle in degrees: a 100% grade equals a 45° angle, not 90° vertical.",
        tone: "neutral",
      },
    };
  },
};

export default function ElevationGradeCalculator() {
  return <CalcEngine config={config} />;
}
