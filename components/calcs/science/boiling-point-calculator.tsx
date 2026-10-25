"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "boiling-point-calculator",
  title: "Boiling Point Elevation & Colligative Properties Calculator",
  fields: [
    {
      kind: "choice",
      key: "solvent",
      label: "Solvent System",
      default: "water",
      options: [
        { label: "Water (Kb = 0.512 °C·kg/mol, Kf = 1.86 °C·kg/mol)", value: "water" },
        { label: "Benzene (Kb = 2.53 °C·kg/mol, Kf = 5.12 °C·kg/mol)", value: "benzene" },
        { label: "Ethanol (Kb = 1.22 °C·kg/mol, Kf = 1.99 °C·kg/mol)", value: "ethanol" },
        { label: "Acetic Acid (Kb = 3.07 °C·kg/mol, Kf = 3.90 °C·kg/mol)", value: "acetic_acid" },
        { label: "Chloroform (Kb = 3.63 °C·kg/mol, Kf = 4.68 °C·kg/mol)", value: "chloroform" }
      ]
    },
    {
      kind: "number",
      key: "molality",
      label: "Solute Molality (mol/kg solvent)",
      default: 1.5,
      min: 0.001,
      max: 20
    },
    {
      kind: "number",
      key: "vanthoff",
      label: "van 't Hoff Factor (i)",
      default: 2,
      min: 1,
      max: 6
    },
    {
      kind: "number",
      key: "pressure",
      label: "Ambient Pressure (kPa)",
      default: 101.325,
      min: 10,
      max: 500
    }
  ],
  presets: [
    {
      label: "Seawater (~0.6 m NaCl in Water)",
      values: { solvent: "water", molality: 0.6, vanthoff: 1.9, pressure: 101.325 }
    },
    {
      label: "Automotive Antifreeze (Water + Glycol)",
      values: { solvent: "water", molality: 4.5, vanthoff: 1.0, pressure: 101.325 }
    },
    {
      label: "High Altitude Boiling (Denver 84 kPa)",
      values: { solvent: "water", molality: 0.0, vanthoff: 1.0, pressure: 84.0 }
    },
    {
      label: "Concentrated Brine (3.0 m NaCl)",
      values: { solvent: "water", molality: 3.0, vanthoff: 2.0, pressure: 101.325 }
    }
  ],
  compute: (vals) => {
    const solvent = String(vals.solvent || "water");
    const m = Math.max(0, Number(vals.molality) || 0);
    const i = Math.max(1, Number(vals.vanthoff) || 1);
    const P = Math.max(10, Number(vals.pressure) || 101.325);

    const solventData: Record<string, { name: string; Tb0: number; Tf0: number; Kb: number; Kf: number; Hvap: number }> = {
      water: { name: "Water", Tb0: 100.0, Tf0: 0.0, Kb: 0.512, Kf: 1.86, Hvap: 40660 },
      benzene: { name: "Benzene", Tb0: 80.1, Tf0: 5.5, Kb: 2.53, Kf: 5.12, Hvap: 30720 },
      ethanol: { name: "Ethanol", Tb0: 78.37, Tf0: -114.1, Kb: 1.22, Kf: 1.99, Hvap: 38560 },
      acetic_acid: { name: "Acetic Acid", Tb0: 117.9, Tf0: 16.6, Kb: 3.07, Kf: 3.90, Hvap: 23700 },
      chloroform: { name: "Chloroform", Tb0: 61.2, Tf0: -63.5, Kb: 3.63, Kf: 4.68, Hvap: 29240 }
    };

    const s = solventData[solvent] || solventData.water;

    const R_GAS = 8.314462618;
    const T1_K = s.Tb0 + 273.15;
    const invT2 = (1 / T1_K) - (R_GAS / s.Hvap) * Math.log(P / 101.325);
    const Tb_pressure_C = (1 / invT2) - 273.15;

    const dTb = i * s.Kb * m;
    const final_Tb = Tb_pressure_C + dTb;

    const dTf = i * s.Kf * m;
    const final_Tf = s.Tf0 - dTf;

    const osmotic_atm = i * m * 0.082057 * 298.15;

    return {
      hero: {
        value: `${final_Tb.toFixed(2)} °C`,
        label: "Elevated Boiling Point (at Current Pressure)"
      },
      badge: {
        text: `ΔTb = +${dTb.toFixed(3)} °C | ΔTf = -${dTf.toFixed(3)} °C`,
        tone: "good"
      },
      rows: [
        { label: "Pure Boiling Point at 1 atm", value: `${s.Tb0.toFixed(2)} °C` },
        { label: "Pressure Corrected Pure BP", value: `${Tb_pressure_C.toFixed(2)} °C` },
        { label: "Colligative Elevation (ΔTb)", value: `+${dTb.toFixed(3)} °C` },
        { label: "Freezing Point Depression (ΔTf)", value: `-${dTf.toFixed(3)} °C` },
        { label: "Depressed Freezing Point", value: `${final_Tf.toFixed(2)} °C` },
        { label: "Estimated Osmotic Pressure (25°C)", value: `${osmotic_atm.toFixed(1)} atm` },
        { label: "Molal Elevation Constant (Kb)", value: `${s.Kb} °C·kg/mol` },
        { label: "Molal Freezing Constant (Kf)", value: `${s.Kf} °C·kg/mol` }
      ],
      steps: [
        `1. Pressure-adjusted pure boiling point via Clausius-Clapeyron: Tb(P) = ${Tb_pressure_C.toFixed(2)} °C at ${P.toFixed(1)} kPa.`,
        `2. Colligative boiling point elevation: ΔTb = i · Kb · m = ${i.toFixed(1)} × ${s.Kb} × ${m.toFixed(2)} = +${dTb.toFixed(3)} °C.`,
        `3. Elevated boiling point: Tb = ${Tb_pressure_C.toFixed(2)} + ${dTb.toFixed(3)} = ${final_Tb.toFixed(2)} °C.`,
        `4. Freezing depression: ΔTf = i · Kf · m = ${i.toFixed(1)} × ${s.Kf} × ${m.toFixed(2)} = -${dTf.toFixed(3)} °C (Tf = ${final_Tf.toFixed(2)} °C).`
      ],
      chart: {
        type: "donut",
        title: "Thermal Phase Transition Temperature Distribution (°C)",
        data: [
          { name: "Pure Solvent BP", value: Math.max(1, Math.round(Tb_pressure_C)), color: "#2563eb" },
          { name: "Elevation Shift (ΔTb)", value: Math.max(1, Math.round(dTb * 10)), color: "#dc2626" },
          { name: "Depression Span (ΔTf)", value: Math.max(1, Math.round(dTf * 10)), color: "#0891b2" },
          { name: "Freezing Point Delta", value: Math.max(1, Math.round(Math.abs(final_Tf) + 1)), color: "#4f46e5" }
        ],
        format: "plain"
      }
    };
  }
};

export default function BoilingPointCalculatorComponent() {
  return <CalcEngine config={config} />;
}
