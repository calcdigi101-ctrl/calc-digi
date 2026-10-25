"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "map-scale-calc",
  title: "Cartographic Map Scale & Ground Distance Calculator",
  presets: [
    { label: "USGS 7.5-Min Topo Quad (1:24,000)", values: { scaleN: 24000, mapDist: 5, unit: "cm", mapArea: 10 } },
    { label: "Standard Topographic Map (1:50,000)", values: { scaleN: 50000, mapDist: 4, unit: "cm", mapArea: 6 } },
    { label: "Detailed Hiking Trail Map (1:25,000)", values: { scaleN: 25000, mapDist: 8, unit: "cm", mapArea: 12 } },
    { label: "Regional Road Atlas (1:250,000)", values: { scaleN: 250000, mapDist: 6, unit: "cm", mapArea: 15 } },
    { label: "Aeronautical VFR Sectional (1:500,000)", values: { scaleN: 500000, mapDist: 10, unit: "cm", mapArea: 25 } },
    { label: "Architectural Site Masterplan (1:500)", values: { scaleN: 500, mapDist: 15, unit: "cm", mapArea: 50 } },
  ],
  fields: [
    {
      kind: "number",
      key: "scaleN",
      label: "Scale Ratio Denominator N (1 : N)",
      default: 50000,
      min: 1,
      max: 100000000,
      hint: "The second number in representative fraction (e.g. enter 50000 for 1:50,000)",
    },
    {
      kind: "choice",
      key: "unit",
      label: "Map Measurement Unit",
      default: "cm",
      segmented: true,
      options: [
        { value: "cm", label: "Centimeters (cm / cm²)" },
        { value: "in", label: "Inches (in / in²)" },
      ],
    },
    {
      kind: "number",
      key: "mapDist",
      label: "Measured Distance on Map",
      default: 4,
      min: 0.001,
      max: 10000,
      hint: "Length measured directly on paper or digital screen",
    },
    {
      kind: "number",
      key: "mapArea",
      label: "Measured Polygon Area on Map",
      default: 6,
      min: 0,
      max: 100000,
      hint: "Measured area of parcel or reservoir on map (cm² or in²)",
    },
  ],
  compute(values) {
    const N = Number(values.scaleN);
    const unit = String(values.unit || "cm");
    const mapDist = Number(values.mapDist);
    const mapArea = Number(values.mapArea);

    if (isNaN(N) || N < 1) {
      return { error: "Please enter a valid scale denominator N greater than or equal to 1." };
    }
    if (isNaN(mapDist) || mapDist <= 0) {
      return { error: "Please enter a valid measured map distance greater than zero." };
    }

    let realDistMeters = 0;
    let realDistKm = 0;
    let realDistMiles = 0;
    let realDistFeet = 0;

    let realAreaM2 = 0;
    let realAreaKm2 = 0;
    let realAreaHectares = 0;
    let realAreaAcres = 0;

    if (unit === "cm") {
      // 1 cm = N cm = N/100 meters
      realDistMeters = (mapDist * N) / 100;
      realDistKm = realDistMeters / 1000;
      realDistMiles = realDistKm * 0.621371;
      realDistFeet = realDistMeters * 3.28084;

      // Area: 1 cm² = (N/100)² m²
      const m2PerCm2 = (N / 100) * (N / 100);
      realAreaM2 = mapArea * m2PerCm2;
      realAreaKm2 = realAreaM2 / 1_000_000;
      realAreaHectares = realAreaM2 / 10_000;
      realAreaAcres = realAreaHectares * 2.47105;
    } else {
      // unit === "in"
      // 1 in = N in = N/12 feet
      realDistFeet = (mapDist * N) / 12;
      realDistMeters = realDistFeet * 0.3048;
      realDistKm = realDistMeters / 1000;
      realDistMiles = realDistFeet / 5280;

      // Area: 1 sq in = (N/12)² sq ft
      const sqFtPerSqIn = (N / 12) * (N / 12);
      const realAreaSqFt = mapArea * sqFtPerSqIn;
      realAreaM2 = realAreaSqFt * 0.092903;
      realAreaKm2 = realAreaM2 / 1_000_000;
      realAreaAcres = realAreaSqFt / 43560;
      realAreaHectares = realAreaAcres / 2.47105;
    }

    let scaleType = "Medium-Scale Topographic";
    let scaleTone: "good" | "info" | "warn" = "info";

    if (N <= 2500) {
      scaleType = "Ultra-Large Scale (Engineering / Cadastral)";
      scaleTone = "good";
    } else if (N <= 25000) {
      scaleType = "Large-Scale Topographic (High Detail)";
      scaleTone = "good";
    } else if (N <= 100000) {
      scaleType = "Medium-Scale Regional Map";
      scaleTone = "info";
    } else if (N <= 500000) {
      scaleType = "Small-Scale (Aeronautical / Atlas)";
      scaleTone = "warn";
    } else {
      scaleType = "Ultra-Small Scale (Continental / Global)";
      scaleTone = "warn";
    }

    const steps = [
      `1. Representative Fraction: 1 : ${N.toLocaleString()} (1 unit on paper = ${N.toLocaleString()} units in reality)`,
      `2. Linear Ground Distance: ${mapDist} ${unit} × ${N.toLocaleString()} = ${(mapDist * N).toLocaleString()} ${unit} = ${realDistKm.toFixed(3)} km (${realDistMiles.toFixed(3)} miles)`,
      `3. Quadratic Ground Area: ${mapArea} ${unit}² × (${N.toLocaleString()})² = ${realAreaKm2.toFixed(4)} km² (${realAreaHectares.toFixed(2)} hectares | ${realAreaAcres.toFixed(1)} acres)`,
      `4. Cartographic Classification: ${scaleType}`,
    ];

    return {
      hero: {
        label: "Calculated Real Ground Distance",
        value: `${realDistKm >= 1 ? `${realDistKm.toFixed(2)} km` : `${realDistMeters.toFixed(1)} m`}`,
        unit: `${realDistMiles >= 1 ? `${realDistMiles.toFixed(2)} miles` : `${realDistFeet.toFixed(0)} feet`}`,
      },
      badge: {
        text: `Scale 1:${N.toLocaleString()}`,
        tone: scaleTone,
      },
      rows: [
        { label: "Ground Distance (Metric)", value: `${realDistKm.toFixed(3)} km (${realDistMeters.toFixed(1)} meters)`, strong: true },
        { label: "Ground Distance (Imperial)", value: `${realDistMiles.toFixed(3)} miles (${realDistFeet.toFixed(1)} feet)`, strong: true },
        { label: "Real Ground Surface Area", value: `${realAreaKm2.toFixed(4)} km² (${realAreaHectares.toFixed(2)} ha / ${realAreaAcres.toFixed(1)} acres)` },
        { label: "Representative Fraction (RF)", value: `1 : ${N.toLocaleString()} (Ratio: 1/${N.toLocaleString()})` },
        { label: "Unit Scale Ratio", value: unit === "cm" ? `1 cm = ${(N / 100).toFixed(1)} meters` : `1 inch = ${(N / 12).toFixed(1)} feet` },
        { label: "Cartographic Classification", value: scaleType },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Proportional Ground Metric Distribution",
        data: [
          { name: "Segment Ground Distance (km)", value: Math.max(0.1, realDistKm), color: "#3b82f6" },
          { name: "Ground Area Factor (km²)", value: Math.max(0.1, realAreaKm2), color: "#10b981" },
        ],
      },
      note: {
        text: "Linear distance scales proportionally by N, whereas two-dimensional area scales quadratically by N². Always check paper margin bar scales to verify whether humidity expansion has occurred.",
        tone: "neutral",
      },
    };
  },
};

export default function MapScaleCalculator() {
  return <CalcEngine config={config} />;
}
