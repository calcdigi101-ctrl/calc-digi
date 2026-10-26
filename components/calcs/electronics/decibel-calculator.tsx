"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const decibelConfig: CalcConfig = {
  id: "decibel-calculator",
  title: "Decibel (dB) Gain, Attenuation, Power & Voltage Ratio Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Calculation Metric",
      default: "power",
      options: [
        { label: "Power Ratio (10 log10 P2/P1)", value: "power" },
        { label: "Voltage / Amplitude Ratio (20 log10 V2/V1)", value: "voltage" },
      ],
    },
    { kind: "number", key: "inputVal", label: "Reference Input Level (P1 or V1)", default: 1, min: 0.000001, max: 1000000 },
    { kind: "number", key: "outputVal", label: "Measured Output Level (P2 or V2)", default: 10, min: 0.000001, max: 1000000 },
  ],
  presets: [
    { label: "RF 10x Power Amplifier (10 dB Gain)", values: { mode: "power", inputVal: 1, outputVal: 10 } },
    { label: "3 dB Half-Power Attenuator (-3 dB)", values: { mode: "power", inputVal: 10, outputVal: 5 } },
    { label: "6 dB Voltage Doubler (+6 dB)", values: { mode: "voltage", inputVal: 1, outputVal: 2 } },
    { label: "20 dB Audio Microphone Preamp (+20 dB)", values: { mode: "voltage", inputVal: 0.1, outputVal: 1 } },
  ],
  compute: (vals) => {
    const mode = vals.mode || "power";
    const val1 = Math.max(1e-9, Number(vals.inputVal) || 1);
    const val2 = Math.max(1e-9, Number(vals.outputVal) || 10);

    const ratio = val2 / val1;
    const db = mode === "power" ? 10 * Math.log10(ratio) : 20 * Math.log10(ratio);
    const isGain = db >= 0;

    return {
      hero: {
        label: isGain ? "Calculated Gain" : "Calculated Attenuation",
        value: `${db >= 0 ? "+" : ""}${db.toFixed(2)} dB`,
      },
      badge: {
        text: isGain ? `Amplification: ${ratio.toFixed(2)}× Ratio` : `Loss / Attenuation: ${ratio.toFixed(4)}× Ratio`,
        tone: isGain ? "good" : "warn",
      },
      rows: [
        { label: "Gain / Loss in Decibels (dB)", value: `${db >= 0 ? "+" : ""}${db.toFixed(2)} dB`, strong: true },
        { label: "Linear Numerical Ratio (P2/P1 or V2/V1)", value: `${ratio.toFixed(4)}×` },
        { label: "Calculation Mode", value: mode === "power" ? "Power (10 × log₁₀)" : "Voltage / Amplitude (20 × log₁₀)" },
        { label: "Input Reference (V1 or P1)", value: `${val1.toLocaleString()}` },
        { label: "Output Measurement (V2 or P2)", value: `${val2.toLocaleString()}` },
      ],
      steps: [
        `Linear Ratio = Output / Input = ${val2} / ${val1} = ${ratio.toFixed(4)}`,
        mode === "power"
          ? `dB (Power) = 10 × log₁₀(${ratio.toFixed(4)}) = ${db.toFixed(2)} dB`
          : `dB (Voltage) = 20 × log₁₀(${ratio.toFixed(4)}) = ${db.toFixed(2)} dB`,
      ],
      chart: {
        type: "donut",
        title: "Signal Transmission vs Loss Distribution",
        format: "pct",
        data: [
          { name: "Transmitted Signal Share", value: Math.min(100, Math.max(5, Math.round(Math.min(1, ratio) * 100))), color: "#10b981" },
          { name: "Attenuation / Headroom Margin", value: Math.max(5, Math.round((1 - Math.min(1, ratio)) * 100)), color: "#6366f1" },
        ],
      },
    };
  },
};

export default function DecibelCalculatorComponent() {
  return <CalcEngine config={decibelConfig} />;
}
