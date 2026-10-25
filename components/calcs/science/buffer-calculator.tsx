"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "buffer-calculator",
  title: "Henderson-Hasselbalch Buffer & pH Equilibrium Calculator",
  fields: [
    {
      kind: "choice",
      key: "system",
      label: "Buffer Pair Selection",
      default: "acetate",
      options: [
        { label: "Acetic Acid / Sodium Acetate (pKa = 4.76)", value: "acetate" },
        { label: "Phosphate Buffer H2PO4⁻ / HPO4²⁻ (pKa = 7.20)", value: "phosphate" },
        { label: "Carbonic Acid / Bicarbonate (pKa = 6.35)", value: "bicarbonate" },
        { label: "Ammonia / Ammonium Chloride (pKa = 9.25)", value: "ammonium" },
        { label: "HEPES Biological Buffer (pKa = 7.50)", value: "hepes" },
        { label: "Tris Buffer (pKa = 8.06)", value: "tris" },
        { label: "Formic Acid / Formate (pKa = 3.75)", value: "formate" }
      ]
    },
    {
      kind: "number",
      key: "acidConc",
      label: "Weak Acid Concentration [HA] (M)",
      default: 0.10,
      min: 0.001,
      max: 5.0
    },
    {
      kind: "number",
      key: "baseConc",
      label: "Conjugate Base Concentration [A⁻] (M)",
      default: 0.10,
      min: 0.001,
      max: 5.0
    },
    {
      kind: "number",
      key: "volume",
      label: "Total Buffer Volume (L)",
      default: 1.0,
      min: 0.01,
      max: 100.0
    }
  ],
  presets: [
    {
      label: "Equimolar Standard Acetate (pH = 4.76)",
      values: { system: "acetate", acidConc: 0.1, baseConc: 0.1, volume: 1.0 }
    },
    {
      label: "Physiological Phosphate Buffer (pH ~ 7.4)",
      values: { system: "phosphate", acidConc: 0.063, baseConc: 0.10, volume: 1.0 }
    },
    {
      label: "Blood Bicarbonate System (pH ~ 7.40)",
      values: { system: "bicarbonate", acidConc: 0.0012, baseConc: 0.024, volume: 1.0 }
    },
    {
      label: "Molecular Biology Tris Buffer (1 M, pH 8.0)",
      values: { system: "tris", acidConc: 0.53, baseConc: 0.47, volume: 0.5 }
    }
  ],
  compute: (vals) => {
    const sys = String(vals.system || "acetate");
    const ha = Math.max(0.0001, Number(vals.acidConc) || 0.1);
    const a = Math.max(0.0001, Number(vals.baseConc) || 0.1);
    const vol = Math.max(0.01, Number(vals.volume) || 1.0);

    const pKaMap: Record<string, { pKa: number; acidName: string; baseName: string }> = {
      acetate: { pKa: 4.76, acidName: "Acetic Acid (CH₃COOH)", baseName: "Sodium Acetate (CH₃COONa)" },
      phosphate: { pKa: 7.20, acidName: "Dihydrogen Phosphate (H₂PO₄⁻)", baseName: "Hydrogen Phosphate (HPO₄²⁻)" },
      bicarbonate: { pKa: 6.35, acidName: "Carbonic Acid (H₂CO₃)", baseName: "Bicarbonate (HCO₃⁻)" },
      ammonium: { pKa: 9.25, acidName: "Ammonium Ion (NH₄⁺)", baseName: "Ammonia (NH₃)" },
      hepes: { pKa: 7.50, acidName: "HEPES Free Acid", baseName: "HEPES Sodium Salt" },
      tris: { pKa: 8.06, acidName: "Tris-HCl (Tris Acid)", baseName: "Tris Base" },
      formate: { pKa: 3.75, acidName: "Formic Acid (HCOOH)", baseName: "Sodium Formate (HCOONa)" }
    };

    const sel = pKaMap[sys] || pKaMap.acetate;
    const ratio = a / ha;

    const pH = sel.pKa + Math.log10(ratio);
    const pOH = 14.0 - pH;
    const hConc = Math.pow(10, -pH);
    const ohConc = Math.pow(10, -pOH);

    const C = ha + a;
    const Ka = Math.pow(10, -sel.pKa);
    const denom = Math.pow(Ka + hConc, 2);
    const beta = 2.303 * C * ((Ka * hConc) / denom);

    const molesHA = ha * vol;
    const molesA = a * vol;
    const pctA = (a / C) * 100;
    const pctHA = (ha / C) * 100;

    return {
      hero: {
        value: pH.toFixed(2),
        label: `Buffer Solution Equilibrium pH (${sel.pKa} pKa)`
      },
      badge: {
        text: `Ratio [A⁻]/[HA] = ${ratio.toFixed(3)} | β = ${beta.toFixed(3)} mol/L·pH`,
        tone: "good"
      },
      rows: [
        { label: "Selected Weak Acid [HA]", value: sel.acidName },
        { label: "Selected Conjugate Base [A⁻]", value: sel.baseName },
        { label: "Base-to-Acid Ratio ([A⁻] / [HA])", value: `${ratio.toFixed(4)} : 1` },
        { label: "Total Buffer Concentration (C)", value: `${C.toFixed(3)} M` },
        { label: "Buffer Index Capacity (β)", value: `${beta.toFixed(4)} mol/L·pH` },
        { label: "Hydronium Concentration [H⁺]", value: `${hConc.toExponential(3)} M` },
        { label: "Hydroxide Concentration [OH⁻]", value: `${ohConc.toExponential(3)} M` },
        { label: "Solute Content in Solution", value: `${molesHA.toFixed(3)} mol acid, ${molesA.toFixed(3)} mol base` }
      ],
      steps: [
        `1. Henderson-Hasselbalch formula: pH = pKa + log10([A⁻] / [HA]).`,
        `2. Concentration ratio: [A⁻]/[HA] = ${a.toFixed(3)} / ${ha.toFixed(3)} = ${ratio.toFixed(4)}.`,
        `3. Logarithmic shift: log10(${ratio.toFixed(4)}) = ${Math.log10(ratio).toFixed(3)}.`,
        `4. Equilibrium pH: ${sel.pKa.toFixed(2)} + (${Math.log10(ratio).toFixed(3)}) = ${pH.toFixed(2)}.`,
        `5. Buffer capacity: β = 2.303 · C · [Ka·[H⁺]/(Ka+[H⁺])²] = ${beta.toFixed(4)} mol/(L·pH).`
      ],
      chart: {
        type: "donut",
        title: "Acid-Base Speciation Ratio in Buffer Matrix",
        data: [
          { name: "Conjugate Base [A⁻]", value: Math.max(1, Math.round(pctA)), color: "#059669" },
          { name: "Weak Acid [HA]", value: Math.max(1, Math.round(pctHA)), color: "#dc2626" }
        ],
        format: "pct"
      }
    };
  }
};

export default function BufferCalculatorComponent() {
  return <CalcEngine config={config} />;
}
