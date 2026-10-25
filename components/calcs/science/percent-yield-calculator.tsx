"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const percentYieldConfig: CalcConfig = {
  id: "percent-yield-calculator",
  title: "Percent Yield & Green Chemistry Calculator",
  fields: [
    {
      key: "mode",
      label: "Yield Protocol",
      kind: "choice",
      default: "mass_yield",
      options: [
        { label: "Direct Mass Yield (Actual vs Theoretical)", value: "mass_yield" },
        { label: "Stoichiometric Yield (Limiting Reagent Mass)", value: "stoich_yield" },
      ],
    },
    {
      key: "actualYield",
      label: "Actual Product Yield Obtained (g)",
      kind: "number",
      default: 42.5,
      min: 0.001,
      max: 100000,
    },
    {
      key: "theoreticalYield",
      label: "Theoretical Product Yield (g)",
      kind: "number",
      default: 50.0,
      min: 0.001,
      max: 100000,
    },
    {
      key: "totalReagentsMass",
      label: "Total Raw Materials / Reagents Mass (g)",
      kind: "number",
      default: 78.0,
      min: 0.001,
      max: 100000,
    },
    {
      key: "productMolarMass",
      label: "Target Product Molecular Weight (g/mol)",
      kind: "number",
      default: 180.16,
      min: 1,
      max: 5000,
    },
  ],
  compute(vals) {
    const actual = Number(vals.actualYield) || 42.5;
    const theo = Number(vals.theoreticalYield) || 50.0;
    const totalReagents = Number(vals.totalReagentsMass) || 78.0;
    const mwProduct = Number(vals.productMolarMass) || 180.16;

    const percentYield = theo > 0 ? (actual / theo) * 100 : 0;
    const lostMass = Math.max(0, theo - actual);
    const wasteMass = Math.max(0, totalReagents - actual);
    const eFactor = actual > 0 ? wasteMass / actual : 0;
    const atomEconomy = totalReagents > 0 ? (theo / totalReagents) * 100 : 0;
    const molesProduced = actual / mwProduct;

    let tone: "good" | "warn" | "bad" = "good";
    let statusText = "High Synthetic Efficiency (≥ 80%)";
    if (percentYield < 50) {
      statusText = "Low Yield (< 50%) - Significant Loss";
      tone = "bad";
    } else if (percentYield < 80) {
      statusText = "Moderate Yield (50% – 80%)";
      tone = "warn";
    } else if (percentYield > 100) {
      statusText = "Super-Yield (> 100%) - Solvent / Impurity Contamination";
      tone = "bad";
    }

    return {
      hero: {
        label: "Reaction Percent Yield",
        value: `${percentYield.toFixed(2)}%`,
      },
      badge: {
        text: statusText,
        tone,
      },
      rows: [
        { label: "Actual Mass Obtained", value: `${actual.toFixed(2)} g` },
        { label: "Theoretical Maximum Mass", value: `${theo.toFixed(2)} g` },
        { label: "Lost / Unconverted Mass", value: `${lostMass.toFixed(2)} g (${((lostMass / theo) * 100).toFixed(1)}%)` },
        { label: "Molar Yield (Moles Isolated)", value: `${molesProduced.toFixed(4)} mol (${mwProduct} g/mol)` },
        { label: "Environmental E-Factor (Waste/Product)", value: `${eFactor.toFixed(2)} kg waste / kg product` },
        { label: "Atom Economy Benchmark", value: `${atomEconomy.toFixed(1)}%` },
      ],
      steps: [
        `Percent Yield = (Actual Yield / Theoretical Yield) × 100`,
        `Percent Yield = (${actual} g / ${theo} g) × 100 = ${percentYield.toFixed(2)}%`,
        `Mass lost during synthesis / isolation: ${theo} g - ${actual} g = ${lostMass.toFixed(2)} g`,
        `Green chemistry E-factor = (Total Reagents - Actual Product) / Actual Product`,
        `E-Factor = (${totalReagents} g - ${actual} g) / ${actual} g = ${eFactor.toFixed(2)} kg waste / kg product`,
        `Moles isolated = ${actual} g / ${mwProduct} g/mol = ${molesProduced.toFixed(4)} mol`,
      ],
      chart: {
        type: "donut",
        title: "Theoretical Mass Distribution: Product vs Lost Residue",
        format: "num",
        data: [
          { name: "Isolated Product", value: Number(actual.toFixed(1)), color: "#10b981" },
          { name: "Unreacted / Lost Residue", value: Number(lostMass.toFixed(1)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function PercentYieldCalculatorComponent() {
  return <CalcEngine config={percentYieldConfig} />;
}
