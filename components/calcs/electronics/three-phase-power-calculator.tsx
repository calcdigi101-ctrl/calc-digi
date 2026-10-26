"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const threePhasePowerConfig: CalcConfig = {
  id: "three-phase-power-calculator",
  title: "Three-Phase AC Power, Real (kW), Apparent (kVA) & Reactive (kVAR) Calculator",
  fields: [
    { kind: "number", key: "voltage", label: "Line-to-Line Voltage VL-L (V)", default: 480, min: 10, max: 100000 },
    { kind: "number", key: "current", label: "Line Current IL (A)", default: 50, min: 0.1, max: 10000 },
    { kind: "number", key: "powerFactor", label: "Power Factor (0.1 to 1.0)", default: 0.85, min: 0.1, max: 1 },
  ],
  presets: [
    { label: "US Industrial 480V 50A Motor (PF 0.85)", values: { voltage: 480, current: 50, powerFactor: 0.85 } },
    { label: "European 400V 32A Commercial Feed (PF 0.90)", values: { voltage: 400, current: 32, powerFactor: 0.90 } },
    { label: "US Light Commercial 208V 100A Panel (PF 0.92)", values: { voltage: 208, current: 100, powerFactor: 0.92 } },
    { label: "Medium Voltage 4160V 20A Substation Pump", values: { voltage: 4160, current: 20, powerFactor: 0.88 } },
  ],
  compute: (vals) => {
    const vl = Math.max(1, Number(vals.voltage) || 480);
    const il = Math.max(0.1, Number(vals.current) || 50);
    const pf = Math.min(1.0, Math.max(0.1, Number(vals.powerFactor) || 0.85));

    const sqrt3 = Math.sqrt(3);
    const apparentPowerVa = sqrt3 * vl * il;
    const apparentPowerKva = apparentPowerVa / 1000;
    const realPowerWatts = apparentPowerVa * pf;
    const realPowerKw = realPowerWatts / 1000;
    const reactivePowerVar = Math.sqrt(Math.max(0, apparentPowerVa * apparentPowerVa - realPowerWatts * realPowerWatts));
    const reactivePowerKvar = reactivePowerVar / 1000;
    const phaseVoltage = vl / sqrt3;

    return {
      hero: {
        label: "Three-Phase Active Power",
        value: `${realPowerKw.toFixed(2)} kW`,
      },
      badge: {
        text: `Total Apparent Power: ${apparentPowerKva.toFixed(1)} kVA`,
        tone: pf >= 0.85 ? "good" : "warn",
      },
      rows: [
        { label: "Active Real Power (P)", value: `${realPowerKw.toFixed(2)} kW`, strong: true },
        { label: "Apparent Power (S)", value: `${apparentPowerKva.toFixed(2)} kVA` },
        { label: "Reactive Power (Q)", value: `${reactivePowerKvar.toFixed(2)} kVAR` },
        { label: "Line-to-Neutral Phase Voltage", value: `${phaseVoltage.toFixed(1)} V` },
        { label: "Power Factor (cos θ)", value: `${pf.toFixed(2)}` },
      ],
      steps: [
        `Apparent Power (S) = √3 × VL-L × IL = 1.732 × ${vl} V × ${il} A = ${apparentPowerKva.toFixed(2)} kVA`,
        `Real Power (P) = S × PF = ${apparentPowerKva.toFixed(2)} kVA × ${pf} = ${realPowerKw.toFixed(2)} kW`,
        `Reactive Power (Q) = √(S² - P²) = √(${apparentPowerKva.toFixed(1)}² - ${realPowerKw.toFixed(1)}²) = ${reactivePowerKvar.toFixed(2)} kVAR`,
      ],
      chart: {
        type: "donut",
        title: "Active kW vs Reactive kVAR Power Triangle",
        format: "pct",
        data: [
          { name: "Active Real Power (kW)", value: Math.round((realPowerKw / apparentPowerKva) * 100), color: "#10b981" },
          { name: "Reactive Overhead (kVAR)", value: Math.max(1, Math.round(((apparentPowerKva - realPowerKw) / apparentPowerKva) * 100)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function ThreePhasePowerCalculatorComponent() {
  return <CalcEngine config={threePhasePowerConfig} />;
}
