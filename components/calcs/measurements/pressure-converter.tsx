"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const pressureConverterConfig: CalcConfig = {
  id: "pressure-converter",
  title: "Pressure & Stress Unit Converter",
  fields: [
    { kind: "number", key: "value", label: "Pressure Value", default: 32, min: 0.000001, max: 1000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "psi",
      options: [
        { label: "Pounds per square inch (psi)", value: "psi" },
        { label: "Bar (bar)", value: "bar" },
        { label: "Pascals (Pa)", value: "pa" },
        { label: "Kilopascals (kPa)", value: "kpa" },
        { label: "Standard Atmospheres (atm)", value: "atm" },
        { label: "Millimeters of Mercury (mmHg / Torr)", value: "mmhg" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "bar",
      options: [
        { label: "Pounds per square inch (psi)", value: "psi" },
        { label: "Bar (bar)", value: "bar" },
        { label: "Pascals (Pa)", value: "pa" },
        { label: "Kilopascals (kPa)", value: "kpa" },
        { label: "Standard Atmospheres (atm)", value: "atm" },
        { label: "Millimeters of Mercury (mmHg / Torr)", value: "mmhg" },
      ],
    },
  ],
  presets: [
    { label: "32 psi to Bar (Automotive Tire Pressure)", values: { value: 32, fromUnit: "psi", toUnit: "bar" } },
    { label: "1 atm to Kilopascals (Sea Level Atmospheric)", values: { value: 1, fromUnit: "atm", toUnit: "kpa" } },
    { label: "10 bar to psi (Hydraulic Machinery)", values: { value: 10, fromUnit: "bar", toUnit: "psi" } },
    { label: "760 mmHg to atm (Laboratory Barometer)", values: { value: 760, fromUnit: "mmhg", toUnit: "atm" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 32);
    const from = String(vals.fromUnit || "psi");
    const to = String(vals.toUnit || "bar");

    const TO_PA: Record<string, number> = {
      pa: 1,
      kpa: 1000,
      bar: 100000,
      psi: 6894.757293,
      atm: 101325,
      mmhg: 133.322387415,
    };

    const pa = val * (TO_PA[from] || 1);
    const converted = pa / (TO_PA[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}`,
        label: `Converted Pressure (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Pressure", value: `${val} ${from}` },
        { label: "SI Pascals (N/m²)", value: `${pa.toLocaleString("en-US", { maximumFractionDigits: 1 })} Pa` },
        { label: "Target Pressure", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${to}` },
        { label: "Equivalent in Bar", value: `${(pa / 100000).toFixed(4)} bar` },
        { label: "Equivalent in PSI", value: `${(pa / 6894.76).toFixed(2)} psi` },
        { label: "Equivalent in Atmospheres", value: `${(pa / 101325).toFixed(4)} atm` },
      ],
      steps: [
        `Convert to SI base Pascals: ${val} × ${TO_PA[from]} = ${pa.toFixed(1)} Pa.`,
        `Divide by target pressure factor: ${pa.toFixed(1)} ÷ ${TO_PA[to]} = ${converted.toFixed(4)} ${to}.`,
        `Equivalent depth underwater: h = P / (ρ × g) = ${(pa / (1000 * 9.80665)).toFixed(2)} meters of freshwater.`,
      ],
      chart: {
        type: "donut",
        title: "Atmospheric Gauge Ratio",
        format: "pct",
        data: [
          { name: "Active Gauge Pressure", value: 65, color: "#0284c7" },
          { name: "Ambient Atmospheric Base", value: 35, color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function PressureConverterComponent() {
  return <CalcEngine config={pressureConverterConfig} />;
}
