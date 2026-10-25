"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const mpgConfig: CalcConfig = {
  id: "mpg-calculator",
  title: "Vehicle Fuel Economy, Real-World MPG and Metric Liters per 100km Calculator",
  fields: [
    {
      kind: "number",
      key: "distanceMiles",
      label: "Odometer Miles Driven Between Refills",
      default: 365.0,
      min: 1.0,
      max: 5000.0,
    },
    {
      kind: "number",
      key: "gallonsPumped",
      label: "Fuel Volume Pumped to Refill Tank (Gallons)",
      default: 13.2,
      min: 0.1,
      max: 200.0,
    },
    {
      kind: "number",
      key: "fuelPricePerGallon",
      label: "Fuel Price Paid Per Gallon ($)",
      default: 3.65,
      min: 1.0,
      max: 12.0,
    },
  ],
  compute: (vals) => {
    const miles = Math.max(1.0, Number(vals.distanceMiles) || 365.0);
    const gallons = Math.max(0.1, Number(vals.gallonsPumped) || 13.2);
    const price = Number(vals.fuelPricePerGallon) || 3.65;

    // US MPG
    const usMpg = miles / gallons;

    // Metric L/100km: 235.214583 / US MPG
    const l100km = 235.215 / usMpg;

    // Imperial (UK) MPG: 1 US gal = 0.832674 Imperial gal -> Imperial MPG = US MPG * 1.20095
    const imperialMpg = usMpg * 1.20095;

    // Financial running costs
    const totalTankCost = gallons * price;
    const costPerMile = totalTankCost / miles;
    const costPer100Miles = costPerMile * 100;

    return {
      hero: {
        label: "Measured Real-World Fuel Economy",
        value: `${usMpg.toFixed(1)} MPG (${l100km.toFixed(1)} L/100km)`,
      },
      badge: {
        text: `$${costPerMile.toFixed(3)}/mile ($${costPer100Miles.toFixed(2)} per 100 miles driven)`,
        tone: usMpg >= 30 ? "good" : "warn",
      },
      secondary: [
        {
          label: "Metric Fuel Consumption",
          value: `${l100km.toFixed(2)} Liters / 100 km`,
        },
        {
          label: "Imperial (UK) Fuel Economy",
          value: `${imperialMpg.toFixed(1)} Imperial MPG`,
        },
        {
          label: "Refill Tank Fuel Cost",
          value: `$${totalTankCost.toFixed(2)} for ${gallons.toFixed(1)} gallons`,
        },
        {
          label: "Driving Range on 15-Gallon Tank",
          value: `${Math.round(usMpg * 15)} miles`,
        },
      ],
      steps: [
        `US Miles Per Gallon = ${miles.toFixed(1)} miles / ${gallons.toFixed(2)} gallons = ${usMpg.toFixed(2)} MPG`,
        `Metric Consumption = 235.215 / ${usMpg.toFixed(2)} MPG = ${l100km.toFixed(2)} L/100km`,
        `Imperial UK Rating = ${usMpg.toFixed(2)} MPG * 1.20095 = ${imperialMpg.toFixed(2)} UK MPG`,
        `Driving Operating Cost = (${gallons.toFixed(2)} gal * $${price.toFixed(2)}) / ${miles.toFixed(1)} mi = $${costPerMile.toFixed(4)} per mile`,
      ],
      chart: {
        type: "donut",
        title: "Internal Combustion Engine Chemical Energy Losses",
        format: "pct",
        data: [
          { name: "Useful Mechanical Propulsion (Wheel Power)", value: 24, color: "#10b981" },
          { name: "Thermal Engine Coolant & Radiator Loss", value: 36, color: "#0ea5e9" },
          { name: "Thermodynamic Exhaust Gas Loss", value: 34, color: "#ef4444" },
          { name: "Mechanical Drivetrain & Pumping Friction", value: 6, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function MpgCalculatorComponent() {
  return <CalcEngine config={mpgConfig} />;
}
