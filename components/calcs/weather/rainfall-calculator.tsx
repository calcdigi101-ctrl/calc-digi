"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const rainfallConfig: CalcConfig = {
  id: "rainfall-calculator",
  title: "Rainfall Precipitation, Stormwater Runoff & Rainwater Harvesting Calculator",
  fields: [
    {
      kind: "number",
      key: "rainfallInches",
      label: "Rainfall Event Precipitation Depth (Inches)",
      default: 1.5,
      min: 0.05,
      max: 25.0,
    },
    {
      kind: "number",
      key: "catchmentAreaSqFt",
      label: "Catchment / Roof Footprint Area (sq ft)",
      default: 2000.0,
      min: 50.0,
      max: 200000.0,
    },
    {
      kind: "number",
      key: "runoffCoefficient",
      label: "Surface Runoff Coefficient (0.1 to 0.95)",
      default: 0.9,
      min: 0.1,
      max: 0.98,
    },
    {
      kind: "number",
      key: "firstFlushGallons",
      label: "First Flush Diversion per 1,000 sq ft (Gallons)",
      default: 10.0,
      min: 0.0,
      max: 50.0,
    },
  ],
  compute: (vals) => {
    const rainIn = Number(vals.rainfallInches) || 1.5;
    const area = Number(vals.catchmentAreaSqFt) || 2000.0;
    const coeff = Math.min(0.98, Math.max(0.1, Number(vals.runoffCoefficient) || 0.9));
    const firstFlushRate = Number(vals.firstFlushGallons) || 10.0;

    // 1 inch of rain on 1 sq ft = 0.6233 gallons
    const grossGallons = rainIn * area * 0.6233;
    const harvestedGallons = Math.max(0, grossGallons * coeff - (firstFlushRate * area) / 1000.0);
    const harvestedLiters = harvestedGallons * 3.78541;
    const waterWeightLbs = harvestedGallons * 8.34;
    const lawnWateringDays = harvestedGallons / 60.0; // 60 gal/day standard landscape buffer

    return {
      hero: {
        label: "Net Harvested Rainwater",
        value: `${Math.round(harvestedGallons).toLocaleString()} Gallons (${Math.round(harvestedLiters).toLocaleString()} Liters)`,
      },
      badge: {
        text: `${rainIn}" rain on ${area.toLocaleString()} sq ft (${(coeff * 100).toFixed(0)}% runoff efficiency)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Total Gross Rainfall Volume",
          value: `${Math.round(grossGallons).toLocaleString()} Gallons`,
        },
        {
          label: "Harvested Water Mass Weight",
          value: `${Math.round(waterWeightLbs).toLocaleString()} lbs (${(waterWeightLbs / 2000).toFixed(2)} tons)`,
        },
        {
          label: "Standard Landscape Water Supply",
          value: `~${lawnWateringDays.toFixed(1)} days of residential irrigation`,
        },
        {
          label: "Equivalent Standard Rain Barrels (55-Gal)",
          value: `${Math.ceil(harvestedGallons / 55)} barrels required`,
        },
      ],
      steps: [
        `Gross Precipitation Volume = ${rainIn}" * ${area.toLocaleString()} sq ft * 0.6233 gal/(in*sqft) = ${Math.round(grossGallons).toLocaleString()} gallons`,
        `Surface Runoff Efficiency Allowance (${(coeff * 100).toFixed(0)}%) = ${Math.round(grossGallons * coeff).toLocaleString()} gallons`,
        `First-Flush Roof Debris Diversion = (${firstFlushRate} gal / 1,000 sq ft) * ${area} sq ft = ${Math.round((firstFlushRate * area) / 1000.0)} gallons`,
        `Net Yield Captured = ${Math.round(harvestedGallons).toLocaleString()} gallons (${Math.round(harvestedLiters).toLocaleString()} L)`,
      ],
      chart: {
        type: "donut",
        title: "Catchment Surface Precipitation Mass Partition",
        format: "pct",
        data: [
          { name: "Captured Clean Runoff", value: Math.round((harvestedGallons / grossGallons) * 100), color: "#0ea5e9" },
          { name: "Surface Absorption & Evaporation", value: Math.round(((grossGallons * (1 - coeff)) / grossGallons) * 100), color: "#f59e0b" },
          { name: "First-Flush Debris Diversion", value: Math.max(1, 100 - Math.round((harvestedGallons / grossGallons) * 100) - Math.round(((grossGallons * (1 - coeff)) / grossGallons) * 100)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function RainfallCalculatorComponent() {
  return <CalcEngine config={rainfallConfig} />;
}
