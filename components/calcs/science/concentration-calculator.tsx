"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "concentration-calculator",
  title: "Solution Concentration, Molarity & PPM Converter",
  fields: [
    {
      kind: "number",
      key: "soluteMass",
      label: "Solute Mass (grams)",
      default: 58.44,
      min: 0.0001,
      max: 10000
    },
    {
      kind: "number",
      key: "molarMass",
      label: "Solute Molar Mass (g/mol)",
      default: 58.44,
      min: 1.0,
      max: 10000
    },
    {
      kind: "number",
      key: "volumeLiters",
      label: "Solution Volume (Liters)",
      default: 1.0,
      min: 0.001,
      max: 1000
    },
    {
      kind: "number",
      key: "solutionDensity",
      label: "Solution Density (g/mL or kg/L)",
      default: 1.00,
      min: 0.5,
      max: 3.0
    }
  ],
  presets: [
    {
      label: "1.0 M Sodium Chloride (NaCl, 58.44 g/mol)",
      values: { soluteMass: 58.44, molarMass: 58.44, volumeLiters: 1.0, solutionDensity: 1.04 }
    },
    {
      label: "Physiological Normal Saline (0.9% w/v NaCl)",
      values: { soluteMass: 9.0, molarMass: 58.44, volumeLiters: 1.0, solutionDensity: 1.005 }
    },
    {
      label: "5% Glucose / Dextrose IV Bag (180.16 g/mol)",
      values: { soluteMass: 50.0, molarMass: 180.16, volumeLiters: 1.0, solutionDensity: 1.02 }
    },
    {
      label: "Dilute Trace Contaminant (10 mg/L Lead)",
      values: { soluteMass: 0.010, molarMass: 207.2, volumeLiters: 1.0, solutionDensity: 1.0 }
    }
  ],
  compute: (vals) => {
    const massG = Math.max(0.00001, Number(vals.soluteMass) || 1.0);
    const mw = Math.max(0.1, Number(vals.molarMass) || 58.44);
    const volL = Math.max(0.001, Number(vals.volumeLiters) || 1.0);
    const rho = Math.max(0.1, Number(vals.solutionDensity) || 1.0);

    const moles = massG / mw;
    const molarity = moles / volL;
    const massConc_g_L = massG / volL;

    const solutionMassG = volL * 1000 * rho;
    const solventMassG = Math.max(0.001, solutionMassG - massG);

    const massPercent = (massG / solutionMassG) * 100;
    const w_v_percent = (massG / (volL * 1000)) * 100;

    const ppm = (massG / solutionMassG) * 1000000;
    const ppb = ppm * 1000;
    const molality = moles / (solventMassG / 1000);

    return {
      hero: {
        value: `${molarity.toFixed(4)} M`,
        label: "Molar Concentration (Moles per Liter)"
      },
      badge: {
        text: `${massPercent.toFixed(2)}% w/w | ${ppm.toFixed(1)} PPM`,
        tone: "good"
      },
      rows: [
        { label: "Mass Concentration", value: `${massConc_g_L.toFixed(3)} g/L (${(massConc_g_L * 1000).toFixed(1)} mg/L)` },
        { label: "Mass Fraction (% w/w)", value: `${massPercent.toFixed(3)} %` },
        { label: "Weight/Volume Ratio (% w/v)", value: `${w_v_percent.toFixed(3)} %` },
        { label: "Parts Per Million (PPM)", value: `${ppm.toFixed(2)} ppm` },
        { label: "Parts Per Billion (PPB)", value: `${ppb.toFixed(0)} ppb` },
        { label: "Solution Molality (m)", value: `${molality.toFixed(4)} mol/kg` },
        { label: "Total Solute Moles", value: `${moles.toFixed(4)} mol` },
        { label: "Calculated Solution Mass", value: `${(solutionMassG / 1000).toFixed(3)} kg` }
      ],
      steps: [
        `1. Moles of solute: n = mass / MW = ${massG.toFixed(3)} g / ${mw.toFixed(2)} g/mol = ${moles.toFixed(4)} mol.`,
        `2. Molarity: M = n / V = ${moles.toFixed(4)} mol / ${volL.toFixed(3)} L = ${molarity.toFixed(4)} M.`,
        `3. Total solution mass: m_sol = V · ρ = ${volL.toFixed(3)} L × ${rho.toFixed(3)} kg/L = ${(solutionMassG / 1000).toFixed(3)} kg.`,
        `4. Mass percentage (% w/w): [${massG.toFixed(3)} g / ${solutionMassG.toFixed(1)} g] × 100 = ${massPercent.toFixed(3)}%.`,
        `5. PPM concentration: (${massG.toFixed(3)} g / ${solutionMassG.toFixed(1)} g) × 10⁶ = ${ppm.toFixed(2)} ppm.`
      ],
      chart: {
        type: "donut",
        title: "Solution Gravimetric Mass Breakdown (Grams)",
        data: [
          { name: "Solvent Mass", value: Math.max(1, Math.round(solventMassG)), color: "#0284c7" },
          { name: "Solute Mass", value: Math.max(1, Math.round(massG)), color: "#f59e0b" }
        ],
        format: "num"
      }
    };
  }
};

export default function ConcentrationCalculatorComponent() {
  return <CalcEngine config={config} />;
}
