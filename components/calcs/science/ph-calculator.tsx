"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const phConfig: CalcConfig = {
  id: "ph-calculator",
  title: "pH & Chemical Equilibrium Calculator",
  fields: [
    {
      key: "mode",
      label: "Equilibrium Protocol",
      kind: "choice",
      default: "direct_conc",
      options: [
        { label: "Strong Acid / Base Direct Concentration", value: "direct_conc" },
        { label: "Weak Acid Dissociation (Ka + Concentration)", value: "weak_acid" },
        { label: "Direct pH / pOH Interconversion", value: "ph_poh" },
      ],
    },
    {
      key: "speciesType",
      label: "Species Nature",
      kind: "choice",
      default: "acid",
      options: [
        { label: "Acidic (H⁺ Donating)", value: "acid" },
        { label: "Basic (OH⁻ Donating)", value: "base" },
      ],
    },
    {
      key: "concentration",
      label: "Solution Concentration (mol/L or M)",
      kind: "number",
      default: 0.05,
      min: 0.0000000001,
      max: 20,
    },
    {
      key: "pka",
      label: "Acid Dissociation Constant pKa (-log Ka)",
      kind: "number",
      default: 4.75, // Acetic acid
      min: -3,
      max: 16,
    },
    {
      key: "inputPh",
      label: "Direct Measured pH Value",
      kind: "number",
      default: 7.4,
      min: 0,
      max: 14,
    },
  ],
  compute(vals) {
    const mode = String(vals.mode || "direct_conc");
    const species = String(vals.speciesType || "acid");
    const c = Number(vals.concentration) || 0.05;
    const pka = Number(vals.pka) || 4.75;
    const directPh = Number(vals.inputPh) || 7.4;
    const Kw = 1e-14;

    let ph = 7.0;
    let poh = 7.0;
    let hConc = 1e-7;
    let ohConc = 1e-7;
    let alpha = 1.0; // degree of dissociation
    let steps: string[] = [];

    if (mode === "direct_conc") {
      if (species === "acid") {
        hConc = c;
        ph = -Math.log10(hConc);
        poh = 14.0 - ph;
        ohConc = Kw / hConc;
        steps = [
          `Strong acid completely dissociates: [H⁺] = C = ${c} M`,
          `pH = -log₁₀([H⁺]) = -log₁₀(${c}) = ${ph.toFixed(2)}`,
          `pOH = 14 - pH = 14 - ${ph.toFixed(2)} = ${poh.toFixed(2)}`,
          `[OH⁻] = 10^(-pOH) = ${ohConc.toExponential(3)} M`,
        ];
      } else {
        ohConc = c;
        poh = -Math.log10(ohConc);
        ph = 14.0 - poh;
        hConc = Kw / ohConc;
        steps = [
          `Strong base completely dissociates: [OH⁻] = C = ${c} M`,
          `pOH = -log₁₀([OH⁻]) = -log₁₀(${c}) = ${poh.toFixed(2)}`,
          `pH = 14 - pOH = 14 - ${poh.toFixed(2)} = ${ph.toFixed(2)}`,
          `[H⁺] = 10^(-pH) = ${hConc.toExponential(3)} M`,
        ];
      }
    } else if (mode === "weak_acid") {
      const Ka = Math.pow(10, -pka);
      // Quadratic: x^2 + Ka*x - Ka*C = 0 => x = (-Ka + sqrt(Ka^2 + 4*Ka*C))/2
      const x = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * c)) / 2;
      hConc = x;
      ph = -Math.log10(hConc);
      poh = 14.0 - ph;
      ohConc = Kw / hConc;
      alpha = (hConc / c) * 100;
      steps = [
        `Weak acid equilibrium: HA ⇌ H⁺ + A⁻ with Ka = 10^(-${pka}) = ${Ka.toExponential(3)}`,
        `Quadratic formula: [H⁺]² + Ka·[H⁺] - Ka·C = 0`,
        `Solving for [H⁺]: [H⁺] = ${hConc.toExponential(4)} M`,
        `pH = -log₁₀(${hConc.toExponential(4)}) = ${ph.toFixed(2)}`,
        `Degree of ionization α = ([H⁺] / C) × 100 = (${hConc.toExponential(3)} / ${c}) × 100 = ${alpha.toFixed(2)}%`,
        `pOH = 14 - pH = ${poh.toFixed(2)}`,
      ];
    } else {
      ph = directPh;
      poh = 14.0 - ph;
      hConc = Math.pow(10, -ph);
      ohConc = Math.pow(10, -poh);
      steps = [
        `Given pH = ${ph.toFixed(2)}`,
        `pOH = 14 - pH = 14 - ${ph.toFixed(2)} = ${poh.toFixed(2)}`,
        `[H⁺] = 10^(-pH) = 10^(-${ph.toFixed(2)}) = ${hConc.toExponential(3)} M`,
        `[OH⁻] = 10^(-pOH) = 10^(-${poh.toFixed(2)}) = ${ohConc.toExponential(3)} M`,
      ];
    }

    let tone: "good" | "warn" | "bad" | "info" = "good";
    let classification = "Neutral (pH ≈ 7.0)";
    if (ph < 3.0) {
      classification = "Strongly Acidic (pH < 3.0)";
      tone = "bad";
    } else if (ph < 6.5) {
      classification = "Moderately Acidic (3.0 ≤ pH < 6.5)";
      tone = "warn";
    } else if (ph > 11.0) {
      classification = "Strongly Basic / Alkaline (pH > 11.0)";
      tone = "info";
    } else if (ph > 7.5) {
      classification = "Moderately Basic (7.5 < pH ≤ 11.0)";
      tone = "good";
    }

    return {
      hero: {
        label: "Solution pH Value",
        value: `${ph.toFixed(2)}`,
      },
      badge: {
        text: classification,
        tone,
      },
      rows: [
        { label: "pOH Value", value: `${poh.toFixed(2)}` },
        { label: "Hydronium [H⁺ / H₃O⁺]", value: `${hConc.toExponential(3)} mol/L` },
        { label: "Hydroxide [OH⁻]", value: `${ohConc.toExponential(3)} mol/L` },
        { label: "Analytical Concentration (C)", value: `${c} M` },
        { label: "Ionization Extent (α)", value: mode === "weak_acid" ? `${alpha.toFixed(2)}% ionized` : "100% complete" },
        { label: "Water Ion Product (Kw)", value: "1.00 × 10⁻¹⁴ (at 25 °C)" },
      ],
      steps,
      chart: {
        type: "donut",
        title: "pH vs pOH Logarithmic Balance (Scale: 14)",
        format: "num",
        data: [
          { name: "pH Component", value: Number(ph.toFixed(2)), color: ph < 7 ? "#ef4444" : "#3b82f6" },
          { name: "pOH Component", value: Number(poh.toFixed(2)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function PhCalculatorComponent() {
  return <CalcEngine config={phConfig} />;
}
