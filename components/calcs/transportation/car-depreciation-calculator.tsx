"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const carDepreciationConfig: CalcConfig = {
  id: "car-depreciation-calculator",
  title: "Automotive Residual Value, Asset Depreciation & Equity Decay Calculator",
  fields: [
    {
      kind: "number",
      key: "purchasePrice",
      label: "Vehicle Original Purchase Price ($)",
      default: 42000,
      min: 1000,
      max: 500000,
    },
    {
      kind: "number",
      key: "vehicleAgeYears",
      label: "Vehicle Ownership Period / Age (Years)",
      default: 5,
      min: 1,
      max: 20,
    },
    {
      kind: "choice",
      key: "vehicleClass",
      label: "Automotive Segment / Vehicle Class",
      default: "compact_sedan",
      options: [
        { label: "Economy / Compact Sedan (Moderate Depreciation)", value: "compact_sedan" },
        { label: "Midsize SUV / Crossover (High Resale Retention)", value: "midsize_suv" },
        { label: "Full-Size Pickup Truck (Lowest Depreciation Rate)", value: "pickup_truck" },
        { label: "Luxury European Sedan (Steep Initial Depreciation)", value: "luxury_sedan" },
        { label: "Battery Electric Vehicle / EV (High Technology Decay)", value: "electric_vehicle" },
      ],
    },
    {
      kind: "choice",
      key: "annualMileage",
      label: "Annual Driving Mileage Intensity",
      default: "average",
      options: [
        { label: "Low Mileage (<10,000 miles/year - Value Premium)", value: "low" },
        { label: "Average Driving (12,000 to 15,000 miles/year)", value: "average" },
        { label: "High Mileage (>20,000 miles/year - Rapid Loss)", value: "high" },
      ],
    },
  ],
  compute: (vals) => {
    const price = Math.max(1000, Number(vals.purchasePrice) || 42000);
    const years = Math.min(20, Math.max(1, Number(vals.vehicleAgeYears) || 5));
    const vClass = String(vals.vehicleClass || "compact_sedan");
    const mileage = String(vals.annualMileage || "average");

    // Standard automotive depreciation retention rates:
    // Year 1 loss: 15% - 28%
    // Years 2-5 loss: 10% - 15% per annum
    // Baseline remaining value schedules by class after 1, 3, 5, 8, 10 years:
    interface DeprecRate {
      y1: number;
      annualSubsequent: number;
    }
    const RATES: Record<string, DeprecRate> = {
      compact_sedan: { y1: 0.20, annualSubsequent: 0.12 },
      midsize_suv: { y1: 0.18, annualSubsequent: 0.11 },
      pickup_truck: { y1: 0.14, annualSubsequent: 0.09 },
      luxury_sedan: { y1: 0.26, annualSubsequent: 0.15 },
      electric_vehicle: { y1: 0.28, annualSubsequent: 0.16 },
    };

    const rate = RATES[vClass] || RATES.compact_sedan;
    const mileageModifier = mileage === "low" ? 0.92 : mileage === "high" ? 1.15 : 1.0;

    // Calculate residual value year-by-year
    let residual = price * (1 - (rate.y1 * mileageModifier));
    for (let y = 2; y <= years; y++) {
      residual *= (1 - (rate.annualSubsequent * mileageModifier));
    }
    residual = Math.max(500, Math.round(residual));

    const totalDepreciation = price - residual;
    const percentDepreciated = (totalDepreciation / price) * 100;
    const annualDepreciationCost = totalDepreciation / years;

    return {
      hero: {
        label: "Estimated Residual Market Value",
        value: `$${residual.toLocaleString()}`,
      },
      badge: {
        text: `${percentDepreciated.toFixed(1)}% Lost over ${years} Years ($${Math.round(annualDepreciationCost).toLocaleString()}/yr)`,
        tone: percentDepreciated < 50 ? "good" : "warn",
      },
      secondary: [
        {
          label: "Cumulative Depreciation Lost",
          value: `$${totalDepreciation.toLocaleString()}`,
        },
        {
          label: "Average Monthly Depreciation Burden",
          value: `$${Math.round(annualDepreciationCost / 12).toLocaleString()} / month`,
        },
        {
          label: "Value Retained Percentage",
          value: `${((residual / price) * 100).toFixed(1)}% of original MSRP`,
        },
        {
          label: "First-Year Drive-Off Depreciation",
          value: `~$${Math.round(price * rate.y1 * mileageModifier).toLocaleString()} (${((rate.y1 * mileageModifier) * 100).toFixed(0)}%)`,
        },
      ],
      steps: [
        `Year 1 Depreciation (${((rate.y1 * mileageModifier) * 100).toFixed(1)}%) = $${price.toLocaleString()} * ${(rate.y1 * mileageModifier).toFixed(3)} = $${Math.round(price * rate.y1 * mileageModifier).toLocaleString()}`,
        `Years 2-${years} Compounding Loss (~${((rate.annualSubsequent * mileageModifier) * 100).toFixed(1)}%/yr) = Residual settles at $${residual.toLocaleString()}`,
        `Total Equity Lost to Depreciation = $${price.toLocaleString()} - $${residual.toLocaleString()} = $${totalDepreciation.toLocaleString()}`,
        `Annualized Depreciation Velocity = $${totalDepreciation.toLocaleString()} / ${years} years = $${Math.round(annualDepreciationCost).toLocaleString()} per year`,
      ],
      chart: {
        type: "donut",
        title: "Original Vehicle Capital Allocation & Depreciation Split",
        format: "usd0",
        data: [
          { name: "Retained Residual Equity ($)", value: residual, color: "#10b981" },
          { name: "Year 1 Immediate Depreciation ($)", value: Math.round(price * rate.y1 * mileageModifier), color: "#f59e0b" },
          { name: "Years 2+ Accumulated Loss ($)", value: Math.max(0, totalDepreciation - Math.round(price * rate.y1 * mileageModifier)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function CarDepreciationCalculatorComponent() {
  return <CalcEngine config={carDepreciationConfig} />;
}
