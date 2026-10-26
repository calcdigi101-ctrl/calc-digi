"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const fuelEconomyConverterConfig: CalcConfig = {
  id: "fuel-economy-converter",
  title: "Fuel Economy & Consumption Converter",
  fields: [
    { kind: "number", key: "value", label: "Efficiency / Consumption Value", default: 30, min: 0.1, max: 1000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "mpg_us",
      options: [
        { label: "Miles per Gallon US (MPG US)", value: "mpg_us" },
        { label: "Liters per 100 Kilometers (L/100km)", value: "l100km" },
        { label: "Miles per Gallon Imperial (MPG UK)", value: "mpg_uk" },
        { label: "Kilometers per Liter (km/L)", value: "kml" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "l100km",
      options: [
        { label: "Miles per Gallon US (MPG US)", value: "mpg_us" },
        { label: "Liters per 100 Kilometers (L/100km)", value: "l100km" },
        { label: "Miles per Gallon Imperial (MPG UK)", value: "mpg_uk" },
        { label: "Kilometers per Liter (km/L)", value: "kml" },
      ],
    },
  ],
  presets: [
    { label: "30 MPG US to L/100km (Modern Sedan)", values: { value: 30, fromUnit: "mpg_us", toUnit: "l100km" } },
    { label: "7.84 L/100km to MPG US (European Economy)", values: { value: 7.84, fromUnit: "l100km", toUnit: "mpg_us" } },
    { label: "50 MPG US to L/100km (Hybrid Vehicle)", values: { value: 50, fromUnit: "mpg_us", toUnit: "l100km" } },
    { label: "15 km/L to MPG US (Global Metric)", values: { value: 15, fromUnit: "kml", toUnit: "mpg_us" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.1, Number(vals.value) || 30);
    const from = String(vals.fromUnit || "mpg_us");
    const to = String(vals.toUnit || "l100km");

    // Convert everything to MPG US first
    let mpgUs = 30;
    if (from === "mpg_us") mpgUs = val;
    else if (from === "l100km") mpgUs = 235.214583 / val;
    else if (from === "mpg_uk") mpgUs = val * (3.785411784 / 4.54609);
    else if (from === "kml") mpgUs = val * 2.35214583;

    // Convert MPG US to Target
    let converted = 0;
    if (to === "mpg_us") converted = mpgUs;
    else if (to === "l100km") converted = 235.214583 / mpgUs;
    else if (to === "mpg_uk") converted = mpgUs * (4.54609 / 3.785411784);
    else if (to === "kml") converted = mpgUs / 2.35214583;

    const l100 = 235.214583 / mpgUs;

    return {
      hero: {
        value: `${converted.toFixed(2)} ${to.replace("_", " ").toUpperCase()}`,
        label: `Converted Fuel Economy (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Efficiency", value: `${val} ${from}` },
        { label: "Miles per Gallon US", value: `${mpgUs.toFixed(2)} MPG US` },
        { label: "Liters per 100 km", value: `${l100.toFixed(2)} L/100km` },
        { label: "Kilometers per Liter", value: `${(mpgUs / 2.35215).toFixed(2)} km/L` },
        { label: "Miles per Gallon UK", value: `${(mpgUs * 1.20095).toFixed(2)} MPG UK` },
        { label: "Estimated Gallons per 1,000 Miles", value: `${(1000 / mpgUs).toFixed(1)} gal` },
      ],
      steps: [
        `Harmonic reciprocal inversion: L/100km = 235.215 ÷ MPG_US.`,
        `Calculated metric consumption rate: ${l100.toFixed(2)} L/100km.`,
        `Estimated fuel cost per 100 miles (at $3.50/gal): $${((100 / mpgUs) * 3.5).toFixed(2)}.`,
      ],
      chart: {
        type: "donut",
        title: "Fuel Consumption Efficiency Benchmark",
        format: "pct",
        data: [
          { name: "Useful Engine Propulsive Work", value: 30, color: "#10b981" },
          { name: "Thermodynamic Heat Exhaust Losses", value: 70, color: "#f97316" },
        ],
      },
    };
  },
};

export default function FuelEconomyConverterComponent() {
  return <CalcEngine config={fuelEconomyConverterConfig} />;
}
