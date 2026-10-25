"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const uvIndexConfig: CalcConfig = {
  id: "uv-index-calculator",
  title: "Solar UV Index, Erythemal Dose, Skin Type & Burn Time Calculator",
  fields: [
    {
      kind: "number",
      key: "uvIndexValue",
      label: "Current or Peak UV Index (1 to 14)",
      default: 8.0,
      min: 0.5,
      max: 16.0,
    },
    {
      kind: "choice",
      key: "fitzpatrickSkinType",
      label: "Fitzpatrick Skin Phototype",
      default: "2",
      options: [
        { label: "Type I - Pale white (Always burns, never tans)", value: "1" },
        { label: "Type II - Fair white (Burns easily, tans minimally)", value: "2" },
        { label: "Type III - Medium white (Burns moderately, tans gradually)", value: "3" },
        { label: "Type IV - Olive / Light brown (Burns minimally, tans well)", value: "4" },
        { label: "Type V - Dark brown (Rarely burns, tans profusely)", value: "5" },
        { label: "Type VI - Deeply pigmented dark (Never burns)", value: "6" },
      ],
    },
    {
      kind: "choice",
      key: "surfaceReflectivity",
      label: "Ground Surface Environment",
      default: "grass",
      options: [
        { label: "Normal Soil / Grass (3% reflection)", value: "grass" },
        { label: "Dry Beach Sand (15% reflection)", value: "sand" },
        { label: "Open Sea / Lake Water (8% reflection)", value: "water" },
        { label: "Fresh Snow / Ice (80% reflection)", value: "snow" },
      ],
    },
    {
      kind: "number",
      key: "altitudeFeet",
      label: "Elevation Above Sea Level (Feet)",
      default: 0.0,
      min: 0.0,
      max: 15000.0,
    },
  ],
  compute: (vals) => {
    const rawUv = Math.max(0.5, Number(vals.uvIndexValue) || 8.0);
    const skinType = Number(vals.fitzpatrickSkinType) || 2;
    const surf = String(vals.surfaceReflectivity || "grass");
    const alt = Number(vals.altitudeFeet) || 0.0;

    // Elevation adjustment: +4% per 1000 ft
    const altFactor = 1.0 + (alt / 1000.0) * 0.04;

    // Ground albedo reflection factor
    let albedoMult = 1.0;
    if (surf === "sand") albedoMult = 1.15;
    else if (surf === "water") albedoMult = 1.08;
    else if (surf === "snow") albedoMult = 1.8;

    const effectiveUv = rawUv * altFactor * albedoMult;

    // Minimal Erythemal Dose (MED) multiplier by Fitzpatrick skin type (minutes at UV 10)
    // Type 1: 15 min at UV 10; Type 2: 20 min; Type 3: 30 min; Type 4: 45 min; Type 5: 60 min; Type 6: 90 min
    const baseMinutesAtUv10 = [0, 15, 20, 30, 45, 60, 90][skinType] || 20;
    const timeToBurnMinutes = Math.max(3, Math.round((baseMinutesAtUv10 * 10.0) / effectiveUv));

    let tier = "Very High";
    let tone: "good" | "warn" | "bad" = "bad";
    if (effectiveUv < 3) {
      tier = "Low (Minimal Danger)";
      tone = "good";
    } else if (effectiveUv < 6) {
      tier = "Moderate (Protection Needed)";
      tone = "good";
    } else if (effectiveUv < 8) {
      tier = "High (Protection Essential)";
      tone = "warn";
    } else if (effectiveUv < 11) {
      tier = "Very High (Extra Precautions)";
      tone = "bad";
    } else {
      tier = "Extreme (Avoid Midday Sun)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Estimated Unprotected Burn Time",
        value: `${timeToBurnMinutes} Minutes`,
      },
      badge: {
        text: `Effective UV Index ${effectiveUv.toFixed(1)} (${tier})`,
        tone: tone,
      },
      secondary: [
        {
          label: "Recommended Sunscreen SPF",
          value: effectiveUv >= 8 ? "SPF 50+ Broad Spectrum" : effectiveUv >= 6 ? "SPF 30 Broad Spectrum" : "SPF 15+",
        },
        {
          label: "Optimal Vitamin D Synthesis Window",
          value: `${Math.max(5, Math.round(timeToBurnMinutes * 0.25))} to ${Math.max(8, Math.round(timeToBurnMinutes * 0.35))} minutes exposure`,
        },
        {
          label: "Albedo & Elevation UV Amplification",
          value: `+${(((altFactor * albedoMult) - 1.0) * 100).toFixed(0)}% elevated radiation`,
        },
        {
          label: "Peak UV Hours",
          value: "10:00 AM – 4:00 PM Daylight Time",
        },
      ],
      steps: [
        `Base Atmospheric UV Index = ${rawUv.toFixed(1)}`,
        `Elevation Adjustment (${alt} ft @ +4%/1k ft): Factor = ${altFactor.toFixed(3)}`,
        `Ground Surface Albedo Multiplier (${surf}): Factor = ${albedoMult.toFixed(2)}x`,
        `Effective Ground-Level UV Index = ${rawUv} * ${altFactor.toFixed(2)} * ${albedoMult.toFixed(2)} = ${effectiveUv.toFixed(1)}`,
        `Fitzpatrick Phototype ${skinType} Sunburn Threshold = (${baseMinutesAtUv10} * 10) / ${effectiveUv.toFixed(1)} = ${timeToBurnMinutes} minutes`,
      ],
      chart: {
        type: "donut",
        title: "Solar Ultraviolet Radiation Spectrum Breakdown",
        format: "pct",
        data: [
          { name: "UV-A (Aging / Deep Dermal)", value: 95, color: "#f59e0b" },
          { name: "UV-B (Erythemal Sunburn Active)", value: 5, color: "#ef4444" },
        ],
      },
    };
  },
};

export default function UvIndexCalculatorComponent() {
  return <CalcEngine config={uvIndexConfig} />;
}
