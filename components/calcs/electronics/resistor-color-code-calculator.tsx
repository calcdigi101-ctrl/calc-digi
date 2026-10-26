"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const resistorColorCodeConfig: CalcConfig = {
  id: "resistor-color-code-calculator",
  title: "Resistor Color Code, Band Multiplier & Tolerance Calculator",
  fields: [
    {
      kind: "choice",
      key: "digit1",
      label: "Band 1 (1st Significant Digit)",
      default: "1",
      options: [
        { label: "Brown (1)", value: "1" },
        { label: "Red (2)", value: "2" },
        { label: "Orange (3)", value: "3" },
        { label: "Yellow (4)", value: "4" },
        { label: "Green (5)", value: "5" },
        { label: "Blue (6)", value: "6" },
        { label: "Violet (7)", value: "7" },
        { label: "Gray (8)", value: "8" },
        { label: "White (9)", value: "9" },
      ],
    },
    {
      kind: "choice",
      key: "digit2",
      label: "Band 2 (2nd Significant Digit)",
      default: "0",
      options: [
        { label: "Black (0)", value: "0" },
        { label: "Brown (1)", value: "1" },
        { label: "Red (2)", value: "2" },
        { label: "Orange (3)", value: "3" },
        { label: "Yellow (4)", value: "4" },
        { label: "Green (5)", value: "5" },
        { label: "Blue (6)", value: "6" },
        { label: "Violet (7)", value: "7" },
        { label: "Gray (8)", value: "8" },
        { label: "White (9)", value: "9" },
      ],
    },
    {
      kind: "choice",
      key: "multiplier",
      label: "Band 3 (Multiplier)",
      default: "100",
      options: [
        { label: "Black (×1 Ω)", value: "1" },
        { label: "Brown (×10 Ω)", value: "10" },
        { label: "Red (×100 Ω)", value: "100" },
        { label: "Orange (×1,000 Ω / 1k)", value: "1000" },
        { label: "Yellow (×10,000 Ω / 10k)", value: "10000" },
        { label: "Green (×100,000 Ω / 100k)", value: "100000" },
        { label: "Blue (×1,000,000 Ω / 1M)", value: "1000000" },
        { label: "Gold (×0.1 Ω)", value: "0.1" },
        { label: "Silver (×0.01 Ω)", value: "0.01" },
      ],
    },
    {
      kind: "choice",
      key: "tolerance",
      label: "Band 4 (Tolerance %)",
      default: "5",
      options: [
        { label: "Gold (±5%)", value: "5" },
        { label: "Silver (±10%)", value: "10" },
        { label: "Brown (±1%)", value: "1" },
        { label: "Red (±2%)", value: "2" },
      ],
    },
  ],
  presets: [
    { label: "1 kΩ Pull-Up (Brown-Black-Red-Gold)", values: { digit1: "1", digit2: "0", multiplier: "100", tolerance: "5" } },
    { label: "10 kΩ Standard (Brown-Black-Orange-Gold)", values: { digit1: "1", digit2: "0", multiplier: "1000", tolerance: "5" } },
    { label: "4.7 kΩ Audio (Yellow-Violet-Red-Gold)", values: { digit1: "4", digit2: "7", multiplier: "100", tolerance: "5" } },
    { label: "220 Ω LED Current Limiter (Red-Red-Brown-Gold)", values: { digit1: "2", digit2: "2", multiplier: "10", tolerance: "5" } },
  ],
  compute: (vals) => {
    const d1 = Number(vals.digit1) || 1;
    const d2 = Number(vals.digit2) || 0;
    const mult = Number(vals.multiplier) || 100;
    const tol = Number(vals.tolerance) || 5;

    const nominalOhms = (d1 * 10 + d2) * mult;
    const deltaOhms = nominalOhms * (tol / 100);
    const minOhms = Math.max(0, nominalOhms - deltaOhms);
    const maxOhms = nominalOhms + deltaOhms;

    let formattedNominal = `${nominalOhms.toLocaleString()} Ω`;
    if (nominalOhms >= 1000000) {
      formattedNominal = `${(nominalOhms / 1000000).toFixed(2)} MΩ`;
    } else if (nominalOhms >= 1000) {
      formattedNominal = `${(nominalOhms / 1000).toFixed(2)} kΩ`;
    }

    return {
      hero: {
        label: "Nominal Resistance",
        value: formattedNominal,
      },
      badge: {
        text: `Tolerance: ±${tol}% (${minOhms >= 1000 ? (minOhms/1000).toFixed(2)+'k' : minOhms.toFixed(1)} to ${maxOhms >= 1000 ? (maxOhms/1000).toFixed(2)+'k' : maxOhms.toFixed(1)} Ω)`,
        tone: tol <= 2 ? "good" : "warn",
      },
      rows: [
        { label: "Nominal Resistance (Ω)", value: `${nominalOhms.toLocaleString()} Ω`, strong: true },
        { label: "Tolerance Rating", value: `±${tol}%` },
        { label: "Minimum Boundary Value", value: `${minOhms.toLocaleString()} Ω` },
        { label: "Maximum Boundary Value", value: `${maxOhms.toLocaleString()} Ω` },
        { label: "Total Permissible Variance", value: `±${deltaOhms.toLocaleString()} Ω` },
      ],
      steps: [
        `Base Digits: (${d1} × 10) + ${d2} = ${d1 * 10 + d2}`,
        `Nominal Resistance = ${d1 * 10 + d2} × ${mult} = ${nominalOhms.toLocaleString()} Ω`,
        `Allowable Range (±${tol}%) = ${minOhms.toFixed(1)} Ω to ${maxOhms.toFixed(1)} Ω`,
      ],
      chart: {
        type: "donut",
        title: "Nominal Value vs Tolerance Margin",
        format: "pct",
        data: [
          { name: "Nominal Baseline", value: Math.round(100 - tol), color: "#10b981" },
          { name: "Tolerance Window", value: Math.round(tol), color: "#6366f1" },
        ],
      },
    };
  },
};

export default function ResistorColorCodeCalculatorComponent() {
  return <CalcEngine config={resistorColorCodeConfig} />;
}
