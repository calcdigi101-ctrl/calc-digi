"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const severeWeatherConfig: CalcConfig = {
  id: "severe-weather-calculator",
  title: "Severe Weather Convective Instability (CAPE, Bulk Shear & EHI) Calculator",
  fields: [
    {
      kind: "number",
      key: "surfaceCape",
      label: "Surface-Based CAPE (J/kg)",
      default: 2200.0,
      min: 0.0,
      max: 6000.0,
    },
    {
      kind: "number",
      key: "bulkShearKnots",
      label: "0-6 km Bulk Wind Shear (Knots)",
      default: 45.0,
      min: 0.0,
      max: 100.0,
    },
    {
      kind: "number",
      key: "liftedIndex",
      label: "Lifted Index (°C)",
      default: -5.0,
      min: -15.0,
      max: 10.0,
    },
    {
      kind: "number",
      key: "stormRelativeHelicity",
      label: "0-1 km Storm-Relative Helicity (m²/s²)",
      default: 180.0,
      min: 0.0,
      max: 700.0,
    },
  ],
  compute: (vals) => {
    const cape = Math.max(0.0, Number(vals.surfaceCape) || 2200.0);
    const shear = Math.max(0.0, Number(vals.bulkShearKnots) || 45.0);
    const li = Number(vals.liftedIndex) || -5.0;
    const srh = Math.max(0.0, Number(vals.stormRelativeHelicity) || 180.0);

    // Energy Helicity Index (EHI) = (CAPE * SRH) / 160000
    const ehi = (cape * srh) / 160000.0;

    // Maximum updraft velocity = sqrt(2 * CAPE)
    const wMax = Math.sqrt(2.0 * cape);

    // Severe thunderstorm classification
    let stormType = "Supercell Potential High";
    let riskTier = "Enhanced Risk";
    let tone: "good" | "warn" | "bad" = "warn";

    if (cape < 1000 && shear < 25) {
      stormType = "Weak Pulse Single-Cell Storms";
      riskTier = "Marginal Convective Threat";
      tone = "good";
    } else if (cape >= 1000 && shear < 35) {
      stormType = "Multicell Clusters & Squall Lines";
      riskTier = "Slight Convective Risk";
      tone = "warn";
    } else if (cape >= 1500 && shear >= 35 && ehi >= 1.0 && ehi < 2.5) {
      stormType = "Organized Supercells (Hail & Wind)";
      riskTier = "Enhanced Risk (Isolated Tornadoes)";
      tone = "bad";
    } else if (cape >= 2500 && shear >= 45 && ehi >= 2.5) {
      stormType = "Violent Cyclic Supercells (Significant Tornadoes)";
      riskTier = "Moderate to High Severe Risk";
      tone = "bad";
    }

    return {
      hero: {
        label: "Energy Helicity Index (EHI)",
        value: `${ehi.toFixed(2)} (${riskTier})`,
      },
      badge: {
        text: stormType,
        tone: tone,
      },
      secondary: [
        {
          label: "Theoretical Peak Updraft Velocity (Wmax)",
          value: `${wMax.toFixed(1)} m/s (${(wMax * 2.23694).toFixed(0)} mph)`,
        },
        {
          label: "0-6 km Bulk Shear Strength",
          value: `${shear.toFixed(0)} knots (${shear >= 40 ? "Supercell Supporting" : "Sub-Supercell"})`,
        },
        {
          label: "Atmospheric Lifted Index",
          value: `${li.toFixed(1)}°C (${li <= -6 ? "Extremely Unstable" : li <= -3 ? "Unstable" : "Stable"})`,
        },
        {
          label: "Significant Tornado Potential",
          value: ehi >= 2.0 ? "High (EF2+ Possible)" : ehi >= 1.0 ? "Moderate" : "Low Threat",
        },
      ],
      steps: [
        `Surface-Based Convective Available Potential Energy = ${cape} J/kg`,
        `Theoretical Vertical Updraft Velocity = sqrt(2 * ${cape}) = ${wMax.toFixed(1)} m/s (${(wMax * 2.23694).toFixed(0)} mph)`,
        `Energy Helicity Index: EHI = (${cape} * ${srh}) / 160,000 = ${ehi.toFixed(2)}`,
        `Deep Layer Kinematic Shear = ${shear} knots | Lifted Index = ${li}°C`,
        `Severe Storm Mode: ${stormType}`,
      ],
      chart: {
        type: "donut",
        title: "Atmospheric Convective Energy vs Kinetic Shear Balance",
        format: "pct",
        data: [
          { name: "Buoyant Potential Energy (CAPE)", value: Math.min(100, Math.round((cape / 4000) * 100)), color: "#ef4444" },
          { name: "Kinematic Shear Alignment", value: Math.min(100, Math.round((shear / 60) * 100)), color: "#0ea5e9" },
          { name: "Helicity Rotational Inflow", value: Math.min(100, Math.round((srh / 400) * 100)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function SevereWeatherCalculatorComponent() {
  return <CalcEngine config={severeWeatherConfig} />;
}
