"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const rcTimeConstantConfig: CalcConfig = {
  id: "rc-time-constant-calculator",
  title: "RC Circuit Time Constant (Tau), Cutoff Frequency & Rise Time Calculator",
  fields: [
    { kind: "number", key: "resistance", label: "Series Resistance (kΩ)", default: 10, min: 0.001, max: 100000 },
    { kind: "number", key: "capacitance", label: "Capacitance (µF)", default: 100, min: 0.0001, max: 1000000 },
    { kind: "number", key: "voltage", label: "Step Supply Voltage (V)", default: 12, min: 0.1, max: 1000 },
  ],
  presets: [
    { label: "1-Second Timing Pulse (10 kΩ & 100 µF)", values: { resistance: 10, capacitance: 100, voltage: 12 } },
    { label: "Microcontroller Reset Delay (100 kΩ & 0.1 µF)", values: { resistance: 100, capacitance: 0.1, voltage: 5 } },
    { label: "Audio Low-Pass Filter (1 kΩ & 0.047 µF)", values: { resistance: 1, capacitance: 0.047, voltage: 3.3 } },
    { label: "Debounce Filter for Tactile Switch (10 kΩ & 1 µF)", values: { resistance: 10, capacitance: 1, voltage: 5 } },
  ],
  compute: (vals) => {
    const rK = Math.max(0.0001, Number(vals.resistance) || 10);
    const cUf = Math.max(0.00001, Number(vals.capacitance) || 100);
    const v = Math.max(0.1, Number(vals.voltage) || 12);

    const rOhms = rK * 1000;
    const cFarads = cUf * 1e-6;
    const tauSeconds = rOhms * cFarads;
    const tauMs = tauSeconds * 1000;
    const v63 = v * 0.63212;
    const v99 = v * 0.99326;
    const settlingTime5Tau = tauSeconds * 5;
    const cutoffFreqHz = 1 / (2 * Math.PI * tauSeconds);

    return {
      hero: {
        label: "Time Constant (τ = R × C)",
        value: tauSeconds >= 1 ? `${tauSeconds.toFixed(3)} s` : `${tauMs.toFixed(2)} ms`,
      },
      badge: {
        text: `Cutoff Frequency (-3dB): ${cutoffFreqHz >= 1000 ? (cutoffFreqHz/1000).toFixed(2)+' kHz' : cutoffFreqHz.toFixed(1)+' Hz'}`,
        tone: "good",
      },
      rows: [
        { label: "Time Constant (τ)", value: `${tauSeconds.toFixed(4)} s (${tauMs.toFixed(2)} ms)`, strong: true },
        { label: "Voltage at 1τ (63.2% Charge)", value: `${v63.toFixed(2)} V` },
        { label: "Full Settle Time (5τ to 99.3%)", value: `${settlingTime5Tau >= 1 ? settlingTime5Tau.toFixed(3)+' s' : (settlingTime5Tau*1000).toFixed(1)+' ms'}` },
        { label: "Voltage at 5τ", value: `${v99.toFixed(2)} V` },
        { label: "Cutoff Frequency (fc = 1 / 2πτ)", value: `${cutoffFreqHz.toFixed(2)} Hz` },
      ],
      steps: [
        `Time Constant (τ) = R × C = (${rK} × 10³ Ω) × (${cUf} × 10⁻⁶ F) = ${tauSeconds.toFixed(4)} s (${tauMs.toFixed(2)} ms)`,
        `Voltage at 1τ (63.2%) = ${v} V × (1 - e⁻¹) = ${v63.toFixed(2)} V`,
        `Settling Horizon (5τ) = 5 × ${tauSeconds.toFixed(4)} s = ${settlingTime5Tau.toFixed(3)} s`,
        `Low-Pass Cutoff Frequency = 1 / (2 × π × τ) = ${cutoffFreqHz.toFixed(2)} Hz`,
      ],
      chart: {
        type: "donut",
        title: "RC Charging Curve Milestones",
        format: "pct",
        data: [
          { name: "Initial Charge (1τ = 63.2%)", value: 63, color: "#10b981" },
          { name: "Secondary Rise (1τ to 3τ = 31.8%)", value: 32, color: "#6366f1" },
          { name: "Final Saturation (3τ to 5τ = 5%)", value: 5, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function RcTimeConstantCalculatorComponent() {
  return <CalcEngine config={rcTimeConstantConfig} />;
}
