"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const snowfallConfig: CalcConfig = {
  id: "snowfall-calculator",
  title: "Winter Snowfall Accumulation, Snow-to-Liquid Ratio & Snowpack Weight Calculator",
  fields: [
    {
      kind: "number",
      key: "liquidPrecipInches",
      label: "Liquid Water Equivalent Precipitation (Inches)",
      default: 0.85,
      min: 0.05,
      max: 10.0,
    },
    {
      kind: "number",
      key: "surfaceTempF",
      label: "Surface Air Temperature (°F)",
      default: 27.0,
      min: -30.0,
      max: 38.0,
    },
    {
      kind: "number",
      key: "snowRatioInput",
      label: "Snow-to-Liquid Ratio (SLR) - Enter 0 for Auto",
      default: 0.0,
      min: 0.0,
      max: 40.0,
    },
  ],
  compute: (vals) => {
    const liquidIn = Math.max(0.01, Number(vals.liquidPrecipInches) || 0.85);
    const tempF = Number(vals.surfaceTempF) || 27.0;
    let slr = Number(vals.snowRatioInput) || 0.0;

    // Automatic climatological temperature-dependent SLR model (Roebber et al.)
    if (slr <= 0.0) {
      if (tempF >= 34.0) slr = 5.0; // melting sleet/slush
      else if (tempF >= 32.0) slr = 8.0; // heavy wet snow
      else if (tempF >= 28.0) slr = 10.0; // standard wet snow
      else if (tempF >= 23.0) slr = 13.0; // climatological mean
      else if (tempF >= 18.0) slr = 16.0; // dry powdery snow
      else if (tempF >= 10.0) slr = 20.0; // dendritic growth sweet spot
      else if (tempF >= 0.0) slr = 24.0; // champagne powder
      else slr = 15.0; // crystal fracturing at extreme cold
    }

    const snowAccumInches = liquidIn * slr;
    const snowAccumCm = snowAccumInches * 2.54;
    // Water weighs 5.2 lbs per inch depth per sq ft
    const snowWeightPerSqFt = liquidIn * 5.2;
    // For a standard 2-car driveway (600 sq ft)
    const drivewayWeightLbs = snowWeightPerSqFt * 600.0;

    let snowType = "Dry Powder";
    let tone: "good" | "warn" | "bad" = "good";
    if (slr <= 8.0) {
      snowType = "Heart-Attack Heavy Wet Slush (Severe Weight)";
      tone = "bad";
    } else if (slr <= 12.0) {
      snowType = "Standard Average Pack Snow";
      tone = "warn";
    } else if (slr <= 18.0) {
      snowType = "Light Fluffy Powder (Easy Shoveling)";
      tone = "good";
    } else {
      snowType = "Champagne Ultra-Dry Powder (High Loft)";
      tone = "good";
    }

    return {
      hero: {
        label: "Estimated Snow Accumulation",
        value: `${snowAccumInches.toFixed(1)}" (${snowAccumCm.toFixed(1)} cm)`,
      },
      badge: {
        text: `${slr.toFixed(0)}:1 Snow-to-Liquid Ratio (${snowType})`,
        tone: tone,
      },
      secondary: [
        {
          label: "Snowpack Roof / Ground Weight",
          value: `${snowWeightPerSqFt.toFixed(1)} lbs / sq ft`,
        },
        {
          label: "2-Car Driveway Total Snow Mass",
          value: `${Math.round(drivewayWeightLbs).toLocaleString()} lbs (${(drivewayWeightLbs / 2000).toFixed(2)} tons)`,
        },
        {
          label: "Snow Structure Density",
          value: `${((1.0 / slr) * 100).toFixed(1)}% water, ${(100 - (1.0 / slr) * 100).toFixed(1)}% trapped air`,
        },
        {
          label: "Roof Collapse Structural Hazard",
          value: snowWeightPerSqFt >= 20.0 ? "CRITICAL (Exceeds design load)" : snowWeightPerSqFt >= 12.0 ? "Moderate Caution" : "Low Risk",
        },
      ],
      steps: [
        `Liquid Precipitation Equivalent = ${liquidIn.toFixed(2)} inches water`,
        `Surface Temperature ${tempF}°F Yields Snow-to-Liquid Ratio = ${slr.toFixed(0)}:1`,
        `Snow Depth = ${liquidIn.toFixed(2)}" liquid * ${slr.toFixed(0)} = ${snowAccumInches.toFixed(1)} inches (${snowAccumCm.toFixed(1)} cm)`,
        `Snowpack Structural Weight = ${liquidIn.toFixed(2)}" * 5.2 lbs/(sqft*in) = ${snowWeightPerSqFt.toFixed(1)} lbs/sq ft`,
      ],
      chart: {
        type: "donut",
        title: "Fresh Snowpack Structural Volume Partition",
        format: "pct",
        data: [
          { name: "Entrained Atmospheric Air", value: Math.round(100 - (1.0 / slr) * 100), color: "#38bdf8" },
          { name: "Frozen Water Ice Crystals", value: Math.round((1.0 / slr) * 100), color: "#0284c7" },
        ],
      },
    };
  },
};

export default function SnowfallCalculatorComponent() {
  return <CalcEngine config={snowfallConfig} />;
}
