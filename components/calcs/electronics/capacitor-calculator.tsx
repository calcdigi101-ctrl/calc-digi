"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const capacitorConfig: CalcConfig = {
  id: "capacitor-calculator",
  title: "Capacitor Reactance, Stored Electrostatic Energy & Impedance Calculator",
  fields: [
    { kind: "number", key: "capacitance", label: "Capacitance (µF)", default: 10, min: 0.0001, max: 1000000 },
    { kind: "number", key: "frequency", label: "AC Signal Frequency (Hz)", default: 1000, min: 1, max: 10000000 },
    { kind: "number", key: "voltage", label: "Applied Peak Voltage (V)", default: 24, min: 0.1, max: 10000 },
  ],
  presets: [
    { label: "Audio High-Pass Filter (10 µF @ 1 kHz)", values: { capacitance: 10, frequency: 1000, voltage: 12 } },
    { label: "Mains DC Filter Bulk (1,000 µF @ 120 Hz)", values: { capacitance: 1000, frequency: 120, voltage: 35 } },
    { label: "RF Coupling Ceramic (0.1 µF @ 100 kHz)", values: { capacitance: 0.1, frequency: 100000, voltage: 5 } },
    { label: "Switch-Mode Snubber (2.2 µF @ 50 kHz)", values: { capacitance: 2.2, frequency: 50000, voltage: 48 } },
  ],
  compute: (vals) => {
    const cUf = Math.max(0.00001, Number(vals.capacitance) || 10);
    const fHz = Math.max(0.1, Number(vals.frequency) || 1000);
    const v = Math.max(0.1, Number(vals.voltage) || 24);

    const cFarads = cUf * 1e-6;
    const reactanceOhms = 1 / (2 * Math.PI * fHz * cFarads);
    const storedEnergyJoules = 0.5 * cFarads * (v * v);
    const peakCurrentAmps = v / reactanceOhms;
    const reactivePowerVAR = (v * v) / reactanceOhms;

    return {
      hero: {
        label: "Capacitive Reactance (Xc)",
        value: reactanceOhms >= 1000 ? `${(reactanceOhms / 1000).toFixed(2)} kΩ` : `${reactanceOhms.toFixed(2)} Ω`,
      },
      badge: {
        text: `Stored Energy: ${(storedEnergyJoules * 1000).toFixed(2)} mJ`,
        tone: "good",
      },
      rows: [
        { label: "Capacitive Reactance (Xc)", value: `${reactanceOhms.toFixed(2)} Ω`, strong: true },
        { label: "Stored Electrostatic Energy (E)", value: `${(storedEnergyJoules * 1000).toFixed(3)} mJ (${storedEnergyJoules.toFixed(6)} J)` },
        { label: "Peak AC Current Draw", value: `${(peakCurrentAmps * 1000).toFixed(2)} mA` },
        { label: "Reactive Power Generation", value: `${reactivePowerVAR.toFixed(2)} VAR` },
        { label: "Capacitance (Farads)", value: `${cFarads.toExponential(3)} F` },
      ],
      steps: [
        `Reactance (Xc) = 1 / (2 × π × f × C) = 1 / (2 × π × ${fHz} × ${cFarads.toExponential(2)}) = ${reactanceOhms.toFixed(2)} Ω`,
        `Stored Energy (E) = ½ × C × V² = 0.5 × ${cFarads.toExponential(2)} × (${v})² = ${(storedEnergyJoules * 1000).toFixed(3)} mJ`,
        `Peak AC Current (I) = V / Xc = ${v} V / ${reactanceOhms.toFixed(2)} Ω = ${(peakCurrentAmps * 1000).toFixed(2)} mA`,
      ],
      chart: {
        type: "donut",
        title: "Reactance vs System Impedance Distribution",
        format: "pct",
        data: [
          { name: "Reactive Impedance Xc", value: 80, color: "#10b981" },
          { name: "ESR / Parasitic Losses", value: 20, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CapacitorCalculatorComponent() {
  return <CalcEngine config={capacitorConfig} />;
}
