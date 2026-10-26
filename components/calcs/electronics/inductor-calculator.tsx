"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const inductorConfig: CalcConfig = {
  id: "inductor-calculator",
  title: "Inductor Reactance, Magnetic Energy Storage & Choke Impedance Calculator",
  fields: [
    { kind: "number", key: "inductance", label: "Inductance (mH)", default: 50, min: 0.001, max: 100000 },
    { kind: "number", key: "frequency", label: "AC Signal Frequency (Hz)", default: 1000, min: 1, max: 10000000 },
    { kind: "number", key: "current", label: "Peak Conductor Current (A)", default: 2, min: 0.01, max: 1000 },
  ],
  presets: [
    { label: "Mains Power Choke (50 mH @ 60 Hz)", values: { inductance: 50, frequency: 60, current: 5 } },
    { label: "Audio Crossover Coil (2.5 mH @ 1 kHz)", values: { inductance: 2.5, frequency: 1000, current: 3 } },
    { label: "Switch-Mode Power Buck Inductor (0.1 mH @ 100 kHz)", values: { inductance: 0.1, frequency: 100000, current: 8 } },
    { label: "Guitar Pickup Single Coil (3,000 mH @ 440 Hz)", values: { inductance: 3000, frequency: 440, current: 0.001 } },
  ],
  compute: (vals) => {
    const lMh = Math.max(0.0001, Number(vals.inductance) || 50);
    const fHz = Math.max(0.1, Number(vals.frequency) || 1000);
    const i = Math.max(0.001, Number(vals.current) || 2);

    const lHenries = lMh * 1e-3;
    const reactanceOhms = 2 * Math.PI * fHz * lHenries;
    const storedEnergyJoules = 0.5 * lHenries * (i * i);
    const inducedVoltage = i * reactanceOhms;

    return {
      hero: {
        label: "Inductive Reactance (XL)",
        value: reactanceOhms >= 1000 ? `${(reactanceOhms / 1000).toFixed(2)} kΩ` : `${reactanceOhms.toFixed(2)} Ω`,
      },
      badge: {
        text: `Magnetic Energy: ${(storedEnergyJoules * 1000).toFixed(2)} mJ`,
        tone: "good",
      },
      rows: [
        { label: "Inductive Reactance (XL)", value: `${reactanceOhms.toFixed(2)} Ω`, strong: true },
        { label: "Magnetic Stored Energy (E)", value: `${(storedEnergyJoules * 1000).toFixed(2)} mJ (${storedEnergyJoules.toFixed(5)} J)` },
        { label: "Induced Reactive Voltage", value: `${inducedVoltage.toFixed(2)} V` },
        { label: "Inductance (Henries)", value: `${lHenries.toFixed(4)} H` },
      ],
      steps: [
        `Reactance (XL) = 2 × π × f × L = 2 × π × ${fHz} × ${lHenries} = ${reactanceOhms.toFixed(2)} Ω`,
        `Stored Magnetic Energy (E) = ½ × L × I² = 0.5 × ${lHenries} × (${i})² = ${(storedEnergyJoules * 1000).toFixed(2)} mJ`,
        `Reactive Potential Drop = I × XL = ${i} A × ${reactanceOhms.toFixed(2)} Ω = ${inducedVoltage.toFixed(2)} V`,
      ],
      chart: {
        type: "donut",
        title: "Magnetic Storage vs Copper Winding Loss",
        format: "pct",
        data: [
          { name: "Magnetic Energy Storage", value: 85, color: "#10b981" },
          { name: "DCR Winding Resistance", value: 15, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function InductorCalculatorComponent() {
  return <CalcEngine config={inductorConfig} />;
}
