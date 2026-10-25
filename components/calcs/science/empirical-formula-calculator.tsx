"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "empirical-formula-calculator",
  title: "Empirical & Molecular Formula Stoichiometric Solver",
  fields: [
    {
      kind: "number",
      key: "pctC",
      label: "Carbon (C) Mass % or Grams",
      default: 40.0,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "pctH",
      label: "Hydrogen (H) Mass % or Grams",
      default: 6.72,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "pctO",
      label: "Oxygen (O) Mass % or Grams",
      default: 53.28,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "pctN",
      label: "Nitrogen (N) Mass % or Grams",
      default: 0.0,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "molarMassExp",
      label: "Experimental Molar Mass (g/mol, optional)",
      default: 180.16,
      min: 0,
      max: 5000
    }
  ],
  presets: [
    {
      label: "Glucose (C6H12O6, MW 180.16 g/mol)",
      values: { pctC: 40.0, pctH: 6.72, pctO: 53.28, pctN: 0.0, molarMassExp: 180.16 }
    },
    {
      label: "Ethanol (C2H6O, MW 46.07 g/mol)",
      values: { pctC: 52.14, pctH: 13.13, pctO: 34.73, pctN: 0.0, molarMassExp: 46.07 }
    },
    {
      label: "Acetic Acid (CH2O empirical, MW 60.05 g/mol)",
      values: { pctC: 40.0, pctH: 6.72, pctO: 53.28, pctN: 0.0, molarMassExp: 60.05 }
    },
    {
      label: "Urea (CH4N2O, MW 60.06 g/mol)",
      values: { pctC: 20.0, pctH: 6.71, pctO: 26.64, pctN: 46.65, molarMassExp: 60.06 }
    }
  ],
  compute: (vals) => {
    const c = Math.max(0, Number(vals.pctC) || 0);
    const h = Math.max(0, Number(vals.pctH) || 0);
    const o = Math.max(0, Number(vals.pctO) || 0);
    const n = Math.max(0, Number(vals.pctN) || 0);
    const mwExp = Number(vals.molarMassExp) || 0;

    const totalMass = c + h + o + n;
    if (totalMass <= 0) {
      return {
        hero: { value: "Enter Data", label: "Provide elemental percentages" },
        rows: [],
        steps: [],
        chart: { type: "donut", title: "No Data", data: [], format: "plain" }
      };
    }

    const AW = { C: 12.011, H: 1.008, O: 15.999, N: 14.007 };

    const molC = c / AW.C;
    const molH = h / AW.H;
    const molO = o / AW.O;
    const molN = n / AW.N;

    const activeMoles = [
      { el: "C", mol: molC, aw: AW.C, mass: c },
      { el: "H", mol: molH, aw: AW.H, mass: h },
      { el: "O", mol: molO, aw: AW.O, mass: o },
      { el: "N", mol: molN, aw: AW.N, mass: n }
    ].filter((x) => x.mol > 0.0001);

    const minMol = Math.min(...activeMoles.map((x) => x.mol));
    const prelimRatios = activeMoles.map((x) => ({ ...x, ratio: x.mol / minMol }));

    let bestMult = 1;
    let minErr = 999;
    for (let m = 1; m <= 6; m++) {
      let maxDev = 0;
      for (const item of prelimRatios) {
        const val = item.ratio * m;
        const diff = Math.abs(val - Math.round(val));
        if (diff > maxDev) maxDev = diff;
      }
      if (maxDev < 0.08 && maxDev < minErr) {
        minErr = maxDev;
        bestMult = m;
        break;
      }
    }

    const finalSubs: Record<string, number> = {};
    for (const item of prelimRatios) {
      finalSubs[item.el] = Math.max(1, Math.round(item.ratio * bestMult));
    }

    const empParts: string[] = [];
    if (finalSubs.C) empParts.push(`C${finalSubs.C > 1 ? finalSubs.C : ""}`);
    if (finalSubs.H) empParts.push(`H${finalSubs.H > 1 ? finalSubs.H : ""}`);
    if (finalSubs.N) empParts.push(`N${finalSubs.N > 1 ? finalSubs.N : ""}`);
    if (finalSubs.O) empParts.push(`O${finalSubs.O > 1 ? finalSubs.O : ""}`);
    const empiricalFormula = empParts.join("");

    const empMolarMass =
      (finalSubs.C || 0) * AW.C +
      (finalSubs.H || 0) * AW.H +
      (finalSubs.O || 0) * AW.O +
      (finalSubs.N || 0) * AW.N;

    let molecularMultiplier = 1;
    let molecularFormula = empiricalFormula;
    if (mwExp > empMolarMass * 0.7) {
      molecularMultiplier = Math.max(1, Math.round(mwExp / empMolarMass));
      const molParts: string[] = [];
      if (finalSubs.C) {
        const count = finalSubs.C * molecularMultiplier;
        molParts.push(`C${count > 1 ? count : ""}`);
      }
      if (finalSubs.H) {
        const count = finalSubs.H * molecularMultiplier;
        molParts.push(`H${count > 1 ? count : ""}`);
      }
      if (finalSubs.N) {
        const count = finalSubs.N * molecularMultiplier;
        molParts.push(`N${count > 1 ? count : ""}`);
      }
      if (finalSubs.O) {
        const count = finalSubs.O * molecularMultiplier;
        molParts.push(`O${count > 1 ? count : ""}`);
      }
      molecularFormula = molParts.join("");
    }

    return {
      hero: {
        value: empiricalFormula,
        label: `Empirical Formula (Mass: ${empMolarMass.toFixed(2)} g/mol)`
      },
      badge: {
        text: mwExp > 0 ? `Molecular: ${molecularFormula} (n = ${molecularMultiplier})` : `Empirical Mass: ${empMolarMass.toFixed(2)} g/mol`,
        tone: "good"
      },
      rows: [
        { label: "Molecular Formula", value: mwExp > 0 ? `${molecularFormula} (n = ${molecularMultiplier})` : "Enter experimental molar mass" },
        { label: "Empirical Formula Mass", value: `${empMolarMass.toFixed(2)} g/mol` },
        { label: "Carbon Subscript", value: String(finalSubs.C || 0) },
        { label: "Hydrogen Subscript", value: String(finalSubs.H || 0) },
        { label: "Oxygen Subscript", value: String(finalSubs.O || 0) },
        { label: "Nitrogen Subscript", value: String(finalSubs.N || 0) },
        { label: "Experimental MW", value: mwExp > 0 ? `${mwExp.toFixed(2)} g/mol` : "Not provided" }
      ],
      steps: [
        `1. Convert percentages to moles: C = ${c.toFixed(2)} / 12.011 = ${molC.toFixed(3)} mol, H = ${h.toFixed(2)} / 1.008 = ${molH.toFixed(3)} mol, O = ${o.toFixed(2)} / 15.999 = ${molO.toFixed(3)} mol.`,
        `2. Divide by smallest mole value (${minMol.toFixed(3)}): Ratios = ${prelimRatios.map((x) => `${x.el}: ${x.ratio.toFixed(2)}`).join(", ")}.`,
        `3. Whole number factor multiplier: × ${bestMult} -> Empirical: ${empiricalFormula}.`,
        `4. Empirical mass = ${empMolarMass.toFixed(2)} g/mol.`,
        mwExp > 0
          ? `5. Molecular multiplier n = ${mwExp.toFixed(2)} / ${empMolarMass.toFixed(2)} ≈ ${molecularMultiplier} -> Molecular Formula: ${molecularFormula}.`
          : "5. Provide experimental molar mass to determine molecular formula."
      ],
      chart: {
        type: "donut",
        title: "Elemental Mass Composition Percentages (% w/w)",
        data: [
          { name: "Carbon (%C)", value: Math.max(1, Math.round((c / totalMass) * 100)), color: "#334155" },
          { name: "Hydrogen (%H)", value: Math.max(1, Math.round((h / totalMass) * 100)), color: "#38bdf8" },
          { name: "Oxygen (%O)", value: Math.max(1, Math.round((o / totalMass) * 100)), color: "#ef4444" },
          { name: "Nitrogen (%N)", value: Math.max(1, Math.round((n / totalMass) * 100)), color: "#10b981" }
        ].filter((x) => x.value > 0),
        format: "pct"
      }
    };
  }
};

export default function EmpiricalFormulaCalculatorComponent() {
  return <CalcEngine config={config} />;
}
