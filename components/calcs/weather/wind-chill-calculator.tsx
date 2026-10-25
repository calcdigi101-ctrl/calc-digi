"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const windChillConfig: CalcConfig = {
  id: "wind-chill-calculator",
  title: "NOAA Wind Chill Index, Convective Heat Loss & Frostbite Risk Calculator",
  fields: [
    {
      kind: "number",
      key: "ambientTempF",
      label: "Ambient Air Temperature (°F <= 50°F)",
      default: 15.0,
      min: -50.0,
      max: 50.0,
    },
    {
      kind: "number",
      key: "windSpeedMph",
      label: "Sustained Wind Speed (mph >= 3 mph)",
      default: 25.0,
      min: 3.0,
      max: 80.0,
    },
  ],
  presets: [
    { label: "Brisk Breeze (30°F, 15 mph)", values: { ambientTempF: 30.0, windSpeedMph: 15.0 } },
    { label: "Advisory Level (10°F, 25 mph)", values: { ambientTempF: 10.0, windSpeedMph: 25.0 } },
    { label: "Sub-Zero Danger (-5°F, 30 mph)", values: { ambientTempF: -5.0, windSpeedMph: 30.0 } },
    { label: "Polar Vortex Extreme (-20°F, 45 mph)", values: { ambientTempF: -20.0, windSpeedMph: 45.0 } },
  ],
  compute: (vals) => {
    const t = Math.min(50.0, Number(vals.ambientTempF) || 15.0);
    const v = Math.max(3.0, Number(vals.windSpeedMph) || 25.0);

    // NOAA JAG/TI Wind Chill Formula
    const wc = 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);
    const wcC = ((wc - 32) * 5) / 9;
    const diff = t - wc;

    let frostbiteRisk = "Frostbite unlikely in under 2 hours";
    let tone: "good" | "warn" | "bad" = "good";

    if (wc > 15) {
      frostbiteRisk = "Low risk (Frostbite unlikely under 60 minutes)";
      tone = "good";
    } else if (wc >= -15) {
      frostbiteRisk = "Caution: Frostbite possible in 30 minutes on exposed skin";
      tone = "warn";
    } else if (wc >= -35) {
      frostbiteRisk = "Danger: Frostbite likely in 10 to 15 minutes";
      tone = "bad";
    } else if (wc >= -60) {
      frostbiteRisk = "Extreme Danger: Frostbite occurs in 5 minutes";
      tone = "bad";
    } else {
      frostbiteRisk = "Immediate Danger: Frostbite occurs in under 2 minutes";
      tone = "bad";
    }

    // Facial convective heat loss in Watts per square meter
    const heatLossW = (10.45 + 10 * Math.sqrt(v * 0.44704) - (v * 0.44704)) * (33.0 - ((t - 32) * 5) / 9);

    return {
      hero: {
        label: "Apparent Wind Chill Temperature",
        value: `${wc.toFixed(1)}°F (${wcC.toFixed(1)}°C)`,
      },
      badge: {
        text: frostbiteRisk,
        tone: tone,
      },
      rows: [
        {
          label: "Convective Wind Cooling Penalty",
          value: `-${diff.toFixed(1)}°F colder than calm air`,
        },
        {
          label: "Skin Surface Convective Heat Flux",
          value: `${Math.round(heatLossW)} Watts/m²`,
        },
        {
          label: "Exposed Skin Safety Threshold",
          value: frostbiteRisk,
        },
        {
          label: "Protective Layering Guideline",
          value: wc <= -15 ? "Thermal base + fleece + windproof parka + face balaclava" : "Insulated coat + gloves + winter hat",
        },
      ],
      steps: [
        `Ambient Dry Air Temperature = ${t.toFixed(1)}°F | Wind Speed = ${v.toFixed(1)} mph`,
        `Apply NOAA JAG/TI Equation: Wind Chill = 35.74 + 0.6215*T - 35.75*(V^0.16) + 0.4275*T*(V^0.16)`,
        `Wind Chill Temperature = 35.74 + ${(0.6215 * t).toFixed(2)} - ${(35.75 * Math.pow(v, 0.16)).toFixed(2)} + ${(0.4275 * t * Math.pow(v, 0.16)).toFixed(2)} = ${wc.toFixed(2)}°F (${wcC.toFixed(2)}°C)`,
        `Dynamic Wind Cooling Deficit = ${t}°F - ${wc.toFixed(1)}°F = -${diff.toFixed(1)}°F`,
        `Frostbite Exposure Risk: ${frostbiteRisk}`,
      ],
      chart: {
        type: "donut",
        title: "Apparent Cold Exposure Temperature Composition",
        format: "num",
        data: [
          { name: "Ambient Still Air Baseline", value: Math.max(1, Math.round(Math.abs(t))), color: "#0ea5e9" },
          { name: "Aerodynamic Wind Strip Deficit", value: Math.max(1, Math.round(diff)), color: "#38bdf8" },
        ],
      },
    };
  },
};

export default function WindChillCalculatorComponent() {
  return <CalcEngine config={windChillConfig} />;
}
