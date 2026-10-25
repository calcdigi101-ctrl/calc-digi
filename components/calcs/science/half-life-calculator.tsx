"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "half-life-calculator",
  title: "Radioactive Decay & Half-Life Kinetics Calculator",
  fields: [
    {
      kind: "number",
      key: "initialAmount",
      label: "Initial Quantity N₀ (Grams, Becquerels, or %)",
      default: 100.0,
      min: 0.0001,
      max: 1000000000
    },
    {
      kind: "number",
      key: "halfLife",
      label: "Half-Life Duration t½",
      default: 5730.0,
      min: 0.000001,
      max: 100000000000
    },
    {
      kind: "choice",
      key: "timeUnit",
      label: "Time Unit for Half-Life & Elapsed Time",
      default: "years",
      options: [
        { label: "Seconds (s)", value: "seconds" },
        { label: "Minutes (min)", value: "minutes" },
        { label: "Hours (hr)", value: "hours" },
        { label: "Days (d)", value: "days" },
        { label: "Years (yr)", value: "years" }
      ]
    },
    {
      kind: "number",
      key: "elapsedTime",
      label: "Elapsed Decay Duration t",
      default: 11460.0,
      min: 0,
      max: 100000000000
    }
  ],
  presets: [
    {
      label: "Carbon-14 Dating (t½ = 5,730 yrs, 2 half-lives)",
      values: { initialAmount: 100.0, halfLife: 5730.0, timeUnit: "years", elapsedTime: 11460.0 }
    },
    {
      label: "Medical Iodine-131 (t½ = 8.02 days, 24 days decay)",
      values: { initialAmount: 50.0, halfLife: 8.02, timeUnit: "days", elapsedTime: 24.06 }
    },
    {
      label: "Technetium-99m Imaging (t½ = 6.01 hrs, 18 hrs decay)",
      values: { initialAmount: 200.0, halfLife: 6.01, timeUnit: "hours", elapsedTime: 18.03 }
    },
    {
      label: "Radon-222 Gas Infiltration (t½ = 3.82 days, 15 days)",
      values: { initialAmount: 100.0, halfLife: 3.82, timeUnit: "days", elapsedTime: 15.28 }
    }
  ],
  compute: (vals) => {
    const N0 = Math.max(0.0001, Number(vals.initialAmount) || 100);
    const t12 = Math.max(0.000001, Number(vals.halfLife) || 1);
    const t = Math.max(0, Number(vals.elapsedTime) || 0);
    const unit = String(vals.timeUnit || "years");

    // Number of half-lives: n = t / t1/2
    const n = t / t12;

    // Remaining amount: N(t) = N0 * (0.5)^n
    const Nt = N0 * Math.pow(0.5, n);
    const decayedAmount = Math.max(0, N0 - Nt);
    const percentRemaining = (Nt / N0) * 100;
    const percentDecayed = 100 - percentRemaining;

    // Decay constant lambda = ln(2) / t12
    const lambda = Math.LN2 / t12;

    // Mean lifetime tau = 1 / lambda = t12 / ln(2) = 1.4427 * t12
    const tau = t12 / Math.LN2;

    return {
      hero: {
        value: `${Nt.toFixed(3)}`,
        label: `Remaining Quantity N(t) (${percentRemaining.toFixed(2)}% of initial)`
      },
      badge: {
        text: `${n.toFixed(2)} Half-Lives Elapsed (${percentDecayed.toFixed(1)}% Decayed)`,
        tone: percentRemaining > 20 ? "good" : "warn"
      },
      rows: [
        { label: "Initial Quantity (N₀)", value: `${N0.toFixed(3)}` },
        { label: "Decayed Quantity (N₀ - N)", value: `${decayedAmount.toFixed(3)}` },
        { label: "Elapsed Half-Lives (n)", value: `${n.toFixed(4)} cycles` },
        { label: "Decay Constant (λ)", value: `${lambda.toExponential(4)} ${unit}⁻¹` },
        { label: "Mean Atomic Lifetime (τ)", value: `${tau.toFixed(2)} ${unit}` },
        { label: "Residual Activity Fraction", value: `1 / ${Math.pow(2, n).toFixed(2)}` },
        { label: "Time for 90% Decay", value: `${(t12 * 3.3219).toFixed(2)} ${unit}` },
        { label: "Time for 99% Decay", value: `${(t12 * 6.6439).toFixed(2)} ${unit}` }
      ],
      steps: [
        `1. Number of half-lives: n = t / t½ = ${t.toFixed(1)} / ${t12.toFixed(1)} = ${n.toFixed(4)}.`,
        `2. Decay constant: λ = ln(2) / t½ = 0.69315 / ${t12.toFixed(1)} = ${lambda.toExponential(4)} ${unit}⁻¹.`,
        `3. Remaining quantity: N(t) = N₀ · (0.5)^n = ${N0.toFixed(2)} × (0.5)^${n.toFixed(4)} = ${Nt.toFixed(3)}.`,
        `4. Fraction decayed: [(${N0.toFixed(2)} - ${Nt.toFixed(3)}) / ${N0.toFixed(2)}] × 100 = ${percentDecayed.toFixed(2)}%.`
      ],
      chart: {
        type: "donut",
        title: "Radioisotope Decay Partition Status (%)",
        data: [
          { name: "Remaining Fraction", value: Math.max(1, Math.round(percentRemaining)), color: "#059669" },
          { name: "Decayed / Transmuted", value: Math.max(1, Math.round(percentDecayed)), color: "#dc2626" }
        ],
        format: "pct"
      }
    };
  }
};

export default function HalfLifeCalculatorComponent() {
  return <CalcEngine config={config} />;
}
