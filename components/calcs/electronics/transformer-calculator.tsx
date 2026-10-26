"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const transformerConfig: CalcConfig = {
  id: "transformer-calculator",
  title: "Transformer Turns Ratio, Voltage Step-Up/Down & Current Calculator",
  fields: [
    { kind: "number", key: "primaryVoltage", label: "Primary Voltage Vp (V)", default: 240, min: 1, max: 1000000 },
    { kind: "number", key: "primaryTurns", label: "Primary Turns (Np)", default: 500, min: 1, max: 100000 },
    { kind: "number", key: "secondaryTurns", label: "Secondary Turns (Ns)", default: 50, min: 1, max: 100000 },
    { kind: "number", key: "secondaryCurrent", label: "Secondary Load Current Is (A)", default: 4, min: 0.01, max: 10000 },
    { kind: "number", key: "efficiency", label: "Transformer Efficiency (%)", default: 95, min: 50, max: 100 },
  ],
  presets: [
    { label: "Mains 240V Step-Down to 24V (500:50 turns)", values: { primaryVoltage: 240, primaryTurns: 500, secondaryTurns: 50, secondaryCurrent: 4, efficiency: 95 } },
    { label: "120V to 12V Halogen Transformer (1000:100 turns)", values: { primaryVoltage: 120, primaryTurns: 1000, secondaryTurns: 100, secondaryCurrent: 5, efficiency: 92 } },
    { label: "Step-Up 120V to 480V Industrial (100:400 turns)", values: { primaryVoltage: 120, primaryTurns: 100, secondaryTurns: 400, secondaryCurrent: 2, efficiency: 96 } },
    { label: "Audio 1:1 Isolation Transformer (600:600 turns)", values: { primaryVoltage: 10, primaryTurns: 600, secondaryTurns: 600, secondaryCurrent: 0.1, efficiency: 98 } },
  ],
  compute: (vals) => {
    const vp = Math.max(1, Number(vals.primaryVoltage) || 240);
    const np = Math.max(1, Number(vals.primaryTurns) || 500);
    const ns = Math.max(1, Number(vals.secondaryTurns) || 50);
    const isCurrent = Math.max(0.001, Number(vals.secondaryCurrent) || 4);
    const eff = Math.min(100, Math.max(50, Number(vals.efficiency) || 95)) / 100;

    const turnsRatio = np / ns;
    const vs = vp * (ns / np);
    const outputPowerWatts = vs * isCurrent;
    const inputPowerWatts = outputPowerWatts / eff;
    const ipCurrent = inputPowerWatts / vp;

    const isStepDown = vs < vp;

    return {
      hero: {
        label: "Secondary Output Voltage (Vs)",
        value: `${vs.toFixed(2)} V`,
      },
      badge: {
        text: isStepDown ? `Step-Down (${turnsRatio.toFixed(2)}:1 Ratio)` : `Step-Up (1:${(1/turnsRatio).toFixed(2)} Ratio)`,
        tone: "good",
      },
      rows: [
        { label: "Turns Ratio (Np : Ns)", value: `${turnsRatio.toFixed(2)} : 1`, strong: true },
        { label: "Secondary Output Voltage (Vs)", value: `${vs.toFixed(2)} V` },
        { label: "Secondary Output Current (Is)", value: `${isCurrent.toFixed(2)} A` },
        { label: "Primary Reflected Current (Ip)", value: `${ipCurrent.toFixed(3)} A`, strong: true },
        { label: "Secondary Delivered Power", value: `${outputPowerWatts.toFixed(1)} VA (Watts)` },
        { label: "Primary Required Input Power", value: `${inputPowerWatts.toFixed(1)} VA (Watts)` },
      ],
      steps: [
        `Turns Ratio (a) = Np / Ns = ${np} / ${ns} = ${turnsRatio.toFixed(2)}`,
        `Secondary Voltage (Vs) = Vp / a = ${vp} V / ${turnsRatio.toFixed(2)} = ${vs.toFixed(2)} V`,
        `Output Apparent Power = Vs × Is = ${vs.toFixed(2)} V × ${isCurrent} A = ${outputPowerWatts.toFixed(1)} VA`,
        `Primary Current (Ip) = (Output Power / Efficiency) / Vp = (${outputPowerWatts.toFixed(1)} / ${(eff).toFixed(2)}) / ${vp} = ${ipCurrent.toFixed(3)} A`,
      ],
      chart: {
        type: "donut",
        title: "Secondary Useful Power vs Transformer Losses",
        format: "pct",
        data: [
          { name: "Secondary Power Transfer", value: Math.round(eff * 100), color: "#10b981" },
          { name: "Core & Copper Losses", value: Math.round((1 - eff) * 100), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function TransformerCalculatorComponent() {
  return <CalcEngine config={transformerConfig} />;
}
