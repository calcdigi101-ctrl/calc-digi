"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const tireSizeConfig: CalcConfig = {
  id: "tire-size-calculator",
  title: "Tire Size Comparison, Sidewall Height, Diameter and Speedometer Error Calculator",
  fields: [
    {
      kind: "number",
      key: "origWidthMm",
      label: "Original Tire Section Width (mm)",
      default: 225,
      min: 125,
      max: 355,
    },
    {
      kind: "number",
      key: "origAspectRatio",
      label: "Original Sidewall Aspect Ratio (%)",
      default: 45,
      min: 20,
      max: 85,
    },
    {
      kind: "number",
      key: "origRimDiameterInches",
      label: "Original Wheel Rim Diameter (Inches)",
      default: 17,
      min: 10,
      max: 30,
    },
    {
      kind: "number",
      key: "newWidthMm",
      label: "New Replacement Tire Width (mm)",
      default: 245,
      min: 125,
      max: 355,
    },
    {
      kind: "number",
      key: "newAspectRatio",
      label: "New Sidewall Aspect Ratio (%)",
      default: 40,
      min: 20,
      max: 85,
    },
    {
      kind: "number",
      key: "newRimDiameterInches",
      label: "New Wheel Rim Diameter (Inches)",
      default: 18,
      min: 10,
      max: 30,
    },
  ],
  compute: (vals) => {
    const w1 = Number(vals.origWidthMm) || 225;
    const a1 = Number(vals.origAspectRatio) || 45;
    const r1 = Number(vals.origRimDiameterInches) || 17;

    const w2 = Number(vals.newWidthMm) || 245;
    const a2 = Number(vals.newAspectRatio) || 40;
    const r2 = Number(vals.newRimDiameterInches) || 18;

    // Sidewall heights in mm and inches
    const sidewall1Mm = w1 * (a1 / 100);
    const sidewall2Mm = w2 * (a2 / 100);
    const sidewall1In = sidewall1Mm / 25.4;
    const sidewall2In = sidewall2Mm / 25.4;

    // Overall diameters
    const diam1In = r1 + (2 * sidewall1In);
    const diam2In = r2 + (2 * sidewall2In);
    const diamDiffIn = diam2In - diam1In;
    const diamDiffPct = (diamDiffIn / diam1In) * 100;

    // Circumference
    const circ1In = Math.PI * diam1In;
    const circ2In = Math.PI * diam2In;

    // Revs per mile: 63,360 inches in a mile
    const revs1 = 63360 / circ1In;
    const revs2 = 63360 / circ2In;

    // Speedometer discrepancy at 60 mph indicated:
    // actualSpeed = 60 * (diam2 / diam1)
    const actualMph = 60 * (diam2In / diam1In);
    const speedoDiffMph = actualMph - 60;

    return {
      hero: {
        label: "Speedometer Reading at 60 mph Indicated",
        value: `${actualMph.toFixed(1)} mph (${speedoDiffMph >= 0 ? "+" : ""}${speedoDiffMph.toFixed(1)} mph)`,
      },
      badge: {
        text: `Diameter Delta: ${diamDiffPct >= 0 ? "+" : ""}${diamDiffPct.toFixed(2)}% (${diamDiffIn >= 0 ? "+" : ""}${diamDiffIn.toFixed(2)} inches)`,
        tone: Math.abs(diamDiffPct) <= 3.0 ? "good" : "warn",
      },
      secondary: [
        {
          label: "Original vs New Overall Diameter",
          value: `${diam1In.toFixed(2)}" (${(diam1In * 25.4).toFixed(0)}mm) vs ${diam2In.toFixed(2)}" (${(diam2In * 25.4).toFixed(0)}mm)`,
        },
        {
          label: "Sidewall Profile Height Delta",
          value: `${sidewall1In.toFixed(2)}" vs ${sidewall2In.toFixed(2)}" (${(sidewall2In - sidewall1In).toFixed(2)}" shift)`,
        },
        {
          label: "Revolutions Per Mile Delta",
          value: `${Math.round(revs1)} vs ${Math.round(revs2)} revs/mi (${Math.round(revs2 - revs1)} revs)`,
        },
        {
          label: "Vehicle Ground Clearance Ride Height",
          value: `${(diamDiffIn / 2) >= 0 ? "+" : ""}${(diamDiffIn / 2).toFixed(2)}" (${((diamDiffIn / 2) * 25.4).toFixed(1)} mm)`,
        },
      ],
      steps: [
        `Original Sidewall = ${w1}mm * (${a1}% / 100) = ${sidewall1Mm.toFixed(1)}mm (${sidewall1In.toFixed(2)} inches)`,
        `Original Diameter = ${r1}" rim + (2 * ${sidewall1In.toFixed(2)}") = ${diam1In.toFixed(2)} inches`,
        `New Replacement Diameter = ${r2}" rim + (2 * ${sidewall2In.toFixed(2)}") = ${diam2In.toFixed(2)} inches`,
        `Diameter Difference = ${diam2In.toFixed(2)}" - ${diam1In.toFixed(2)}" = ${diamDiffIn.toFixed(2)}" (${diamDiffPct.toFixed(2)}%)`,
        `Speedometer Calibration at 60 mph = 60 * (${diam2In.toFixed(2)} / ${diam1In.toFixed(2)}) = ${actualMph.toFixed(2)} mph`,
      ],
      chart: {
        type: "donut",
        title: "Tire Radial Cross-Section Geometry Breakdown",
        format: "num",
        data: [
          { name: "Metal Wheel Rim Diameter (Inches)", value: Math.round(r2), color: "#0ea5e9" },
          { name: "Upper Sidewall Radial Profile (Inches)", value: Math.max(1, Math.round(sidewall2In * 10)), color: "#10b981" },
          { name: "Lower Sidewall Radial Profile (Inches)", value: Math.max(1, Math.round(sidewall2In * 10)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function TireSizeCalculatorComponent() {
  return <CalcEngine config={tireSizeConfig} />;
}
