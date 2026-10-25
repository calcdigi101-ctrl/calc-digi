"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "molarity-calculator",
  title: "Molarity, Solution Preparation & Dilution Calculator (M₁V₁ = M₂V₂)",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Calculation Workflow",
      default: "prep",
      options: [
        { label: "Prepare Solution from Dry Solute (Mass -> Molarity)", value: "prep" },
        { label: "Dilute Stock Liquid (M₁V₁ = M₂V₂)", value: "dilute" }
      ]
    },
    {
      kind: "number",
      key: "targetMolarity",
      label: "Target Concentration (M or mol/L)",
      default: 0.50,
      min: 0.0001,
      max: 30.0
    },
    {
      kind: "number",
      key: "targetVolumeLiters",
      label: "Target Final Volume (Liters)",
      default: 1.0,
      min: 0.001,
      max: 10000
    },
    {
      kind: "number",
      key: "molarMass",
      label: "Solute Molecular Weight (g/mol, for dry prep)",
      default: 58.44,
      min: 1.0,
      max: 5000,
      showIf: (v) => v.mode === "prep"
    },
    {
      kind: "number",
      key: "stockMolarity",
      label: "Stock Solution Concentration M₁ (M, for dilution)",
      default: 5.0,
      min: 0.001,
      max: 30.0,
      showIf: (v) => v.mode === "dilute"
    }
  ],
  presets: [
    {
      label: "Prepare 1.0 L of 0.5 M NaCl (MW 58.44 g/mol)",
      values: { mode: "prep", targetMolarity: 0.50, targetVolumeLiters: 1.0, molarMass: 58.44, stockMolarity: 5.0 }
    },
    {
      label: "Prepare 500 mL of 0.1 M Glucose (MW 180.16 g/mol)",
      values: { mode: "prep", targetMolarity: 0.10, targetVolumeLiters: 0.5, molarMass: 180.16, stockMolarity: 5.0 }
    },
    {
      label: "Dilute 10x PBS Stock to 1x Working Buffer (1.0 L)",
      values: { mode: "dilute", targetMolarity: 1.0, targetVolumeLiters: 1.0, molarMass: 58.44, stockMolarity: 10.0 }
    },
    {
      label: "Dilute Concentrated HCl (12.1 M) to 1.0 M (2.0 L)",
      values: { mode: "dilute", targetMolarity: 1.0, targetVolumeLiters: 2.0, molarMass: 36.46, stockMolarity: 12.1 }
    }
  ],
  compute: (vals) => {
    const mode = String(vals.mode || "prep");
    const M2 = Math.max(0.0001, Number(vals.targetMolarity) || 0.5);
    const V2 = Math.max(0.0001, Number(vals.targetVolumeLiters) || 1.0);
    const mw = Math.max(1.0, Number(vals.molarMass) || 58.44);
    const M1 = Math.max(M2, Number(vals.stockMolarity) || 5.0);

    const totalMolesRequired = M2 * V2;

    if (mode === "prep") {
      const massRequiredG = totalMolesRequired * mw;
      const massConc_g_L = massRequiredG / V2;

      return {
        hero: {
          value: `${massRequiredG.toFixed(3)} g`,
          label: `Mass of Solute Required for ${V2.toFixed(2)} L of ${M2.toFixed(3)} M Solution`
        },
        badge: {
          text: `${totalMolesRequired.toFixed(4)} Moles Required (MW = ${mw.toFixed(2)} g/mol)`,
          tone: "good"
        },
        rows: [
          { label: "Target Final Volume (V₂)", value: `${V2.toFixed(3)} L (${(V2 * 1000).toFixed(0)} mL)` },
          { label: "Target Concentration (M₂)", value: `${M2.toFixed(4)} M (mol/L)` },
          { label: "Solute Molar Mass (MW)", value: `${mw.toFixed(2)} g/mol` },
          { label: "Required Solute Mass", value: `${massRequiredG.toFixed(3)} grams` },
          { label: "Mass Concentration", value: `${massConc_g_L.toFixed(3)} g/L (${(massConc_g_L * 1000).toFixed(1)} mg/L)` },
          { label: "Total Moles Dissolved", value: `${totalMolesRequired.toFixed(4)} mol` },
          { label: "Approximate Solvent Volume", value: `Add solvent up to ${V2.toFixed(3)} L mark` }
        ],
        steps: [
          `1. Moles required: n = M · V = ${M2.toFixed(3)} mol/L × ${V2.toFixed(3)} L = ${totalMolesRequired.toFixed(4)} mol.`,
          `2. Solute mass required: mass = n · MW = ${totalMolesRequired.toFixed(4)} mol × ${mw.toFixed(2)} g/mol = ${massRequiredG.toFixed(3)} grams.`,
          `3. Procedure: Dissolve ${massRequiredG.toFixed(3)} g of solute in partial solvent, then bring total volume to exactly ${V2.toFixed(3)} Liters.`
        ],
        chart: {
          type: "donut",
          title: "Solution Gravimetric Component Breakdown",
          data: [
            { name: "Estimated Solvent (g)", value: Math.max(1, Math.round(V2 * 1000)), color: "#0284c7" },
            { name: "Solute Mass (g)", value: Math.max(1, Math.round(massRequiredG)), color: "#f59e0b" }
          ],
          format: "num"
        }
      };
    } else {
      // Dilution workflow: M1 * V1 = M2 * V2 -> V1 = (M2 * V2) / M1
      const V1_liters = (M2 * V2) / M1;
      const V1_mL = V1_liters * 1000;
      const V2_mL = V2 * 1000;
      const diluentAdded_mL = Math.max(0, V2_mL - V1_mL);
      const dilutionFactor = M1 / M2;

      return {
        hero: {
          value: `${V1_mL.toFixed(2)} mL`,
          label: `Volume of Stock Solution (M₁ = ${M1.toFixed(2)} M) Required`
        },
        badge: {
          text: `Dilution Factor: 1 : ${dilutionFactor.toFixed(1)} (Add ${diluentAdded_mL.toFixed(1)} mL diluent)`,
          tone: "good"
        },
        rows: [
          { label: "Stock Solution Molarity (M₁)", value: `${M1.toFixed(3)} M` },
          { label: "Target Final Molarity (M₂)", value: `${M2.toFixed(3)} M` },
          { label: "Target Final Volume (V₂)", value: `${V2.toFixed(3)} L (${V2_mL.toFixed(0)} mL)` },
          { label: "Stock Volume Needed (V₁)", value: `${V1_mL.toFixed(2)} mL (${V1_liters.toFixed(4)} L)` },
          { label: "Diluent Solvent to Add", value: `${diluentAdded_mL.toFixed(2)} mL` },
          { label: "Dilution Ratio", value: `1 : ${dilutionFactor.toFixed(2)}` },
          { label: "Total Moles Transferred", value: `${totalMolesRequired.toFixed(4)} mol` }
        ],
        steps: [
          `1. Dilution Law: M₁ · V₁ = M₂ · V₂.`,
          `2. Solve for stock volume: V₁ = (M₂ · V₂) / M₁ = (${M2.toFixed(3)} × ${V2.toFixed(3)}) / ${M1.toFixed(3)} = ${V1_liters.toFixed(4)} L (${V1_mL.toFixed(2)} mL).`,
          `3. Diluent required: V_solvent = V₂ - V₁ = ${V2_mL.toFixed(1)} mL - ${V1_mL.toFixed(1)} mL = ${diluentAdded_mL.toFixed(1)} mL.`,
          `4. Procedure: Measure ${V1_mL.toFixed(2)} mL of stock solution into volumetric flask and dilute with solvent to ${V2_mL.toFixed(0)} mL.`
        ],
        chart: {
          type: "donut",
          title: "Dilution Liquid Volumetric Partition (mL)",
          data: [
            { name: "Diluent Solvent Volume", value: Math.max(1, Math.round(diluentAdded_mL)), color: "#06b6d4" },
            { name: "Concentrated Stock (V₁)", value: Math.max(1, Math.round(V1_mL)), color: "#e11d48" }
          ],
          format: "num"
        }
      };
    }
  }
};

export default function MolarityCalculatorComponent() {
  return <CalcEngine config={config} />;
}
