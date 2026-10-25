"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "molecular-weight-calculator",
  title: "Molecular Weight & Molar Mass Elemental Composition Calculator",
  fields: [
    {
      kind: "number",
      key: "cCount",
      label: "Carbon Atoms (C, 12.011 g/mol)",
      default: 6,
      min: 0,
      max: 500
    },
    {
      kind: "number",
      key: "hCount",
      label: "Hydrogen Atoms (H, 1.008 g/mol)",
      default: 12,
      min: 0,
      max: 1000
    },
    {
      kind: "number",
      key: "oCount",
      label: "Oxygen Atoms (O, 15.999 g/mol)",
      default: 6,
      min: 0,
      max: 500
    },
    {
      kind: "number",
      key: "nCount",
      label: "Nitrogen Atoms (N, 14.007 g/mol)",
      default: 0,
      min: 0,
      max: 200
    },
    {
      kind: "number",
      key: "sCount",
      label: "Sulfur Atoms (S, 32.06 g/mol)",
      default: 0,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "pCount",
      label: "Phosphorus Atoms (P, 30.974 g/mol)",
      default: 0,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "clCount",
      label: "Chlorine Atoms (Cl, 35.45 g/mol)",
      default: 0,
      min: 0,
      max: 100
    },
    {
      kind: "number",
      key: "naCount",
      label: "Sodium Atoms (Na, 22.990 g/mol)",
      default: 0,
      min: 0,
      max: 100
    }
  ],
  presets: [
    {
      label: "Glucose (C₆H₁₂O₆)",
      values: { cCount: 6, hCount: 12, oCount: 6, nCount: 0, sCount: 0, pCount: 0, clCount: 0, naCount: 0 }
    },
    {
      label: "Ethanol (C₂H₆O)",
      values: { cCount: 2, hCount: 6, oCount: 1, nCount: 0, sCount: 0, pCount: 0, clCount: 0, naCount: 0 }
    },
    {
      label: "Caffeine (C₈H₁₀N₄O₂)",
      values: { cCount: 8, hCount: 10, oCount: 2, nCount: 4, sCount: 0, pCount: 0, clCount: 0, naCount: 0 }
    },
    {
      label: "Aspirin (C₉H₈O₄)",
      values: { cCount: 9, hCount: 8, oCount: 4, nCount: 0, sCount: 0, pCount: 0, clCount: 0, naCount: 0 }
    },
    {
      label: "Sodium Chloride (NaCl)",
      values: { cCount: 0, hCount: 0, oCount: 0, nCount: 0, sCount: 0, pCount: 0, clCount: 1, naCount: 1 }
    }
  ],
  compute: (vals) => {
    const C = Math.max(0, Number(vals.cCount) || 0);
    const H = Math.max(0, Number(vals.hCount) || 0);
    const O = Math.max(0, Number(vals.oCount) || 0);
    const N = Math.max(0, Number(vals.nCount) || 0);
    const S = Math.max(0, Number(vals.sCount) || 0);
    const P = Math.max(0, Number(vals.pCount) || 0);
    const Cl = Math.max(0, Number(vals.clCount) || 0);
    const Na = Math.max(0, Number(vals.naCount) || 0);

    const AW = { C: 12.011, H: 1.008, O: 15.999, N: 14.007, S: 32.06, P: 30.974, Cl: 35.45, Na: 22.990 };

    const massC = C * AW.C;
    const massH = H * AW.H;
    const massO = O * AW.O;
    const massN = N * AW.N;
    const massS = S * AW.S;
    const massP = P * AW.P;
    const massCl = Cl * AW.Cl;
    const massNa = Na * AW.Na;

    const totalMW = massC + massH + massO + massN + massS + massP + massCl + massNa;
    const totalAtoms = C + H + O + N + S + P + Cl + Na;

    if (totalMW <= 0) {
      return {
        hero: { value: "0.00 g/mol", label: "Select atomic constituents" },
        rows: [],
        steps: [],
        chart: { type: "donut", title: "No Atoms", data: [], format: "plain" }
      };
    }

    const pctC = (massC / totalMW) * 100;
    const pctH = (massH / totalMW) * 100;
    const pctO = (massO / totalMW) * 100;
    const pctN = (massN / totalMW) * 100;
    const pctOther = ((massS + massP + massCl + massNa) / totalMW) * 100;

    // Formula string
    const formulaParts: string[] = [];
    if (C > 0) formulaParts.push(`C${C > 1 ? C : ""}`);
    if (H > 0) formulaParts.push(`H${H > 1 ? H : ""}`);
    if (N > 0) formulaParts.push(`N${N > 1 ? N : ""}`);
    if (O > 0) formulaParts.push(`O${O > 1 ? O : ""}`);
    if (P > 0) formulaParts.push(`P${P > 1 ? P : ""}`);
    if (S > 0) formulaParts.push(`S${S > 1 ? S : ""}`);
    if (Cl > 0) formulaParts.push(`Cl${Cl > 1 ? Cl : ""}`);
    if (Na > 0) formulaParts.push(`Na${Na > 1 ? Na : ""}`);
    const formulaStr = formulaParts.join("") || "Compound";

    return {
      hero: {
        value: `${totalMW.toFixed(2)} g/mol`,
        label: `Molar Mass for ${formulaStr} (${totalAtoms} atoms per molecule)`
      },
      badge: {
        text: `Formula: ${formulaStr} | ${totalMW.toFixed(2)} Da`,
        tone: "good"
      },
      rows: [
        { label: "Formula Representation", value: formulaStr },
        { label: "Molecular Weight (MW)", value: `${totalMW.toFixed(3)} g/mol (Da)` },
        { label: "Total Atoms Count", value: `${totalAtoms} atoms` },
        { label: "Carbon Mass Fraction", value: C > 0 ? `${pctC.toFixed(2)}% (${massC.toFixed(2)} g/mol)` : "None" },
        { label: "Hydrogen Mass Fraction", value: H > 0 ? `${pctH.toFixed(2)}% (${massH.toFixed(2)} g/mol)` : "None" },
        { label: "Oxygen Mass Fraction", value: O > 0 ? `${pctO.toFixed(2)}% (${massO.toFixed(2)} g/mol)` : "None" },
        { label: "Nitrogen Mass Fraction", value: N > 0 ? `${pctN.toFixed(2)}% (${massN.toFixed(2)} g/mol)` : "None" },
        { label: "Other Heteroatoms Fraction", value: pctOther > 0 ? `${pctOther.toFixed(2)}%` : "None" }
      ],
      steps: [
        `1. Sum constituent atomic weights: MW = Σ (Atom_Count × IUPAC_Atomic_Weight).`,
        `2. Elemental contributions: C = ${C}×12.011, H = ${H}×1.008, O = ${O}×15.999, N = ${N}×14.007.`,
        `3. Total molar mass: ${totalMW.toFixed(3)} grams/mole.`,
        `4. Mass percentage composition: %C = ${pctC.toFixed(2)}%, %H = ${pctH.toFixed(2)}%, %O = ${pctO.toFixed(2)}%.`
      ],
      chart: {
        type: "donut",
        title: "Elemental Mass Contribution Breakdown (%)",
        data: [
          { name: "Carbon (%C)", value: Math.max(1, Math.round(pctC)), color: "#334155" },
          { name: "Hydrogen (%H)", value: Math.max(1, Math.round(pctH)), color: "#38bdf8" },
          { name: "Oxygen (%O)", value: Math.max(1, Math.round(pctO)), color: "#ef4444" },
          { name: "Nitrogen (%N)", value: Math.max(1, Math.round(pctN)), color: "#10b981" },
          { name: "Heteroatoms (%Other)", value: Math.max(1, Math.round(pctOther)), color: "#f59e0b" }
        ].filter((x) => x.value > 0),
        format: "pct"
      }
    };
  }
};

export default function MolecularWeightCalculatorComponent() {
  return <CalcEngine config={config} />;
}
