"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const stoichiometryConfig: CalcConfig = {
  id: "stoichiometry-calculator",
  title: "Stoichiometry & Limiting Reagent Calculator",
  fields: [
    {
      key: "reactionPreset",
      label: "Balanced Chemical Equation",
      kind: "choice",
      default: "water_synth",
      options: [
        { label: "2 H₂ + O₂ → 2 H₂O (Water Synthesis)", value: "water_synth" },
        { label: "N₂ + 3 H₂ → 2 NH₃ (Haber Ammonia)", value: "haber_ammonia" },
        { label: "CH₄ + 2 O₂ → CO₂ + 2 H₂O (Methane Combustion)", value: "methane_combust" },
        { label: "2 Al + 3 Cl₂ → 2 AlCl₃ (Aluminum Chloride)", value: "alcl3_synth" },
        { label: "CaCO₃ → CaO + CO₂ (Thermal Calcination)", value: "caco3_decomp" },
      ],
    },
    {
      key: "massA",
      label: "Mass of Reactant A (g)",
      kind: "number",
      default: 20.0,
      min: 0.01,
      max: 1000000,
    },
    {
      key: "massB",
      label: "Mass of Reactant B (g)",
      kind: "number",
      default: 100.0,
      min: 0.01,
      max: 1000000,
    },
  ],
  compute(vals) {
    const rxn = String(vals.reactionPreset || "water_synth");
    const mA = Number(vals.massA) || 20.0;
    const mB = Number(vals.massB) || 100.0;

    let nameA = "H₂";
    let nameB = "O₂";
    let nameP = "H₂O";
    let mwA = 2.016;
    let mwB = 32.0;
    let mwP = 18.015;
    let coeffA = 2;
    let coeffB = 1;
    let coeffP = 2;

    if (rxn === "haber_ammonia") {
      nameA = "N₂";
      nameB = "H₂";
      nameP = "NH₃";
      mwA = 28.014;
      mwB = 2.016;
      mwP = 17.031;
      coeffA = 1;
      coeffB = 3;
      coeffP = 2;
    } else if (rxn === "methane_combust") {
      nameA = "CH₄";
      nameB = "O₂";
      nameP = "CO₂";
      mwA = 16.043;
      mwB = 32.0;
      mwP = 44.01;
      coeffA = 1;
      coeffB = 2;
      coeffP = 1;
    } else if (rxn === "alcl3_synth") {
      nameA = "Al";
      nameB = "Cl₂";
      nameP = "AlCl₃";
      mwA = 26.982;
      mwB = 70.906;
      mwP = 133.34;
      coeffA = 2;
      coeffB = 3;
      coeffP = 2;
    } else if (rxn === "caco3_decomp") {
      nameA = "CaCO₃";
      nameB = "Heat";
      nameP = "CaO";
      mwA = 100.086;
      mwB = 1.0;
      mwP = 56.077;
      coeffA = 1;
      coeffB = 0;
      coeffP = 1;
    }

    const molesA = mA / mwA;
    const molesB = coeffB > 0 ? mB / mwB : 999999;

    // Stoichiometric equivalence ratio
    const reqRatio = coeffB > 0 ? coeffA / coeffB : 1;
    const actRatio = coeffB > 0 ? molesA / molesB : 1;

    let limiting = nameA;
    let theoreticalMolesP = 0;
    let excessReagent = nameB;
    let excessRemainingG = 0;

    if (coeffB === 0) {
      // Decomposition
      theoreticalMolesP = (molesA / coeffA) * coeffP;
      limiting = nameA;
      excessReagent = "None (Single Reagent)";
      excessRemainingG = 0;
    } else if (actRatio < reqRatio) {
      // A is limiting
      limiting = nameA;
      theoreticalMolesP = (molesA / coeffA) * coeffP;
      const molesBUsed = (molesA / coeffA) * coeffB;
      const molesBLeft = molesB - molesBUsed;
      excessReagent = nameB;
      excessRemainingG = Math.max(0, molesBLeft * mwB);
    } else {
      // B is limiting
      limiting = nameB;
      theoreticalMolesP = (molesB / coeffB) * coeffP;
      const molesAUsed = (molesB / coeffB) * coeffA;
      const molesALeft = molesA - molesAUsed;
      excessReagent = nameA;
      excessRemainingG = Math.max(0, molesALeft * mwA);
    }

    const theoreticalMassP = theoreticalMolesP * mwP;

    return {
      hero: {
        label: `Theoretical Yield of ${nameP}`,
        value: `${theoreticalMassP.toFixed(2)} g`,
      },
      badge: {
        text: `Limiting Reagent: ${limiting}`,
        tone: "good",
      },
      rows: [
        { label: `Moles of ${nameA} Fed`, value: `${molesA.toFixed(4)} mol (${mA} g)` },
        { label: coeffB > 0 ? `Moles of ${nameB} Fed` : `Reagent B`, value: coeffB > 0 ? `${molesB.toFixed(4)} mol (${mB} g)` : "N/A (Decomposition)" },
        { label: `Theoretical Moles of ${nameP}`, value: `${theoreticalMolesP.toFixed(4)} mol` },
        { label: `Excess Reagent (${excessReagent}) Left`, value: `${excessRemainingG.toFixed(2)} g unreacted` },
        { label: `Stoichiometric Mole Ratio (${nameA} : ${coeffB > 0 ? nameB : "Product"})`, value: `${coeffA} : ${coeffB > 0 ? coeffB : coeffP}` },
      ],
      steps: [
        `Calculate moles fed: Moles = Mass / Molecular Weight`,
        `Moles ${nameA} = ${mA} g / ${mwA} g/mol = ${molesA.toFixed(4)} mol`,
        coeffB > 0 ? `Moles ${nameB} = ${mB} g / ${mwB} g/mol = ${molesB.toFixed(4)} mol` : `Decomposition reaction`,
        `Compare mole ratios against balanced stoichiometry (${coeffA} ${nameA} + ${coeffB} ${nameB})`,
        `Limiting reagent identified as ${limiting}, which dictates maximum product yield.`,
        `Theoretical moles of ${nameP} = ${theoreticalMolesP.toFixed(4)} mol`,
        `Theoretical mass = ${theoreticalMolesP.toFixed(4)} mol × ${mwP} g/mol = ${theoreticalMassP.toFixed(2)} g`,
      ],
      chart: {
        type: "donut",
        title: `Reagent Mass Balance: Product vs Excess ${excessReagent}`,
        format: "num",
        data: [
          { name: `Target Product (${nameP})`, value: Number(theoreticalMassP.toFixed(1)), color: "#10b981" },
          { name: `Excess ${excessReagent}`, value: Number(excessRemainingG.toFixed(1)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function StoichiometryCalculatorComponent() {
  return <CalcEngine config={stoichiometryConfig} />;
}
