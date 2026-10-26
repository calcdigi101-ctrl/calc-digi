"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const voltageDividerConfig: CalcConfig = {
  id: "voltage-divider-calculator",
  title: "Resistive Voltage Divider, Loaded Vout & Thermal Dissipation Calculator",
  fields: [
    { kind: "number", key: "vin", label: "Input Voltage (Vin)", default: 12, min: 0.1, max: 10000 },
    { kind: "number", key: "r1", label: "Top Resistor R1 (kΩ)", default: 10, min: 0.01, max: 100000 },
    { kind: "number", key: "r2", label: "Bottom Resistor R2 (kΩ)", default: 20, min: 0.01, max: 100000 },
    { kind: "number", key: "rLoad", label: "Load Resistance RL (kΩ, 0 for Open Circuit)", default: 0, min: 0, max: 1000000 },
  ],
  presets: [
    { label: "12V to 3.3V Microcontroller Level (10 kΩ / 3.8 kΩ)", values: { vin: 12, r1: 10, r2: 3.8, rLoad: 0 } },
    { label: "5V to 2.5V Half Divider (10 kΩ / 10 kΩ)", values: { vin: 5, r1: 10, r2: 10, rLoad: 0 } },
    { label: "12V into 50 kΩ ADC Load (20 kΩ / 10 kΩ with 50k Load)", values: { vin: 12, r1: 20, r2: 10, rLoad: 50 } },
    { label: "24V Industrial Sensor Stepped to 5V (38 kΩ / 10 kΩ)", values: { vin: 24, r1: 38, r2: 10, rLoad: 0 } },
  ],
  compute: (vals) => {
    const vin = Math.max(0.01, Number(vals.vin) || 12);
    const r1 = Math.max(0.001, Number(vals.r1) || 10);
    const r2 = Math.max(0.001, Number(vals.r2) || 20);
    const rLoad = Math.max(0, Number(vals.rLoad) || 0);

    const unloadedVout = vin * (r2 / (r1 + r2));
    let effectiveR2 = r2;
    if (rLoad > 0) {
      effectiveR2 = (r2 * rLoad) / (r2 + rLoad);
    }
    const loadedVout = vin * (effectiveR2 / (r1 + effectiveR2));
    const loadingDelta = unloadedVout - loadedVout;
    const dividerCurrentMa = (vin / (r1 + effectiveR2));
    const powerR1Mw = dividerCurrentMa * dividerCurrentMa * r1;
    const powerR2Mw = dividerCurrentMa * dividerCurrentMa * effectiveR2;

    return {
      hero: {
        label: rLoad > 0 ? "Loaded Output Voltage (Vout)" : "Unloaded Output Voltage (Vout)",
        value: `${(rLoad > 0 ? loadedVout : unloadedVout).toFixed(2)} V`,
      },
      badge: {
        text: rLoad > 0 ? `Loading Attenuation: -${loadingDelta.toFixed(2)} V` : "Open Circuit Ideal Output",
        tone: loadingDelta > 0.5 ? "warn" : "good",
      },
      rows: [
        { label: "Unloaded Vout (No Load)", value: `${unloadedVout.toFixed(3)} V`, strong: true },
        { label: "Loaded Vout (With RL)", value: rLoad > 0 ? `${loadedVout.toFixed(3)} V` : "N/A (Open Circuit)" },
        { label: "Total Divider Quiescent Current", value: `${dividerCurrentMa.toFixed(3)} mA` },
        { label: "R1 Power Dissipation", value: `${powerR1Mw.toFixed(2)} mW` },
        { label: "R2 Power Dissipation", value: `${powerR2Mw.toFixed(2)} mW` },
      ],
      steps: [
        `Unloaded Vout = Vin × [R2 / (R1 + R2)] = ${vin} × [${r2} / (${r1} + ${r2})] = ${unloadedVout.toFixed(3)} V`,
        rLoad > 0
          ? `Effective R2 = (R2 × RL) / (R2 + RL) = (${r2} × ${rLoad}) / (${r2} + ${rLoad}) = ${effectiveR2.toFixed(2)} kΩ`
          : "Load is Open Circuit (RL = ∞). Effective R2 = R2.",
        `Divider Current = Vin / (R1 + R2_eff) = ${vin} V / ${(r1 + effectiveR2).toFixed(2)} kΩ = ${dividerCurrentMa.toFixed(3)} mA`,
      ],
      chart: {
        type: "donut",
        title: "Divider Output Voltage vs Dropped Potential",
        format: "pct",
        data: [
          { name: "Output Voltage Vout", value: Math.round(((rLoad > 0 ? loadedVout : unloadedVout) / vin) * 100), color: "#10b981" },
          { name: "Dropped Across R1", value: Math.max(1, Math.round(((vin - (rLoad > 0 ? loadedVout : unloadedVout)) / vin) * 100)), color: "#6366f1" },
        ],
      },
    };
  },
};

export default function VoltageDividerCalculatorComponent() {
  return <CalcEngine config={voltageDividerConfig} />;
}
