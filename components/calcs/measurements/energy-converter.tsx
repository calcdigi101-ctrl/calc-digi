"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const energyConverterConfig: CalcConfig = {
  id: "energy-converter",
  title: "Energy & Thermodynamic Work Converter",
  fields: [
    { kind: "number", key: "value", label: "Energy Value", default: 1000, min: 0.000001, max: 1000000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "j",
      options: [
        { label: "Joules (J)", value: "j" },
        { label: "Kilojoules (kJ)", value: "kj" },
        { label: "Kilowatt-hours (kWh)", value: "kwh" },
        { label: "Calories (cal)", value: "cal" },
        { label: "Food Calories (kcal / Cal)", value: "kcal" },
        { label: "British Thermal Units (BTU)", value: "btu" },
        { label: "Foot-pounds (ft·lb)", value: "ftlb" },
        { label: "Electron-volts (eV)", value: "ev" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "kwh",
      options: [
        { label: "Joules (J)", value: "j" },
        { label: "Kilojoules (kJ)", value: "kj" },
        { label: "Kilowatt-hours (kWh)", value: "kwh" },
        { label: "Calories (cal)", value: "cal" },
        { label: "Food Calories (kcal / Cal)", value: "kcal" },
        { label: "British Thermal Units (BTU)", value: "btu" },
        { label: "Foot-pounds (ft·lb)", value: "ftlb" },
        { label: "Electron-volts (eV)", value: "ev" },
      ],
    },
  ],
  presets: [
    { label: "1 Kilowatt-hour to Joules (Electrical Billing)", values: { value: 1, fromUnit: "kwh", toUnit: "j" } },
    { label: "2,000 kcal to Megajoules (Daily Diet)", values: { value: 2000, fromUnit: "kcal", toUnit: "kj" } },
    { label: "10,000 BTU to kWh (Air Conditioning)", values: { value: 10000, fromUnit: "btu", toUnit: "kwh" } },
    { label: "1,000 Joules to Foot-pounds (Physics Work)", values: { value: 1000, fromUnit: "j", toUnit: "ftlb" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 1000);
    const from = String(vals.fromUnit || "j");
    const to = String(vals.toUnit || "kwh");

    const TO_JOULES: Record<string, number> = {
      j: 1,
      kj: 1000,
      kwh: 3600000,
      cal: 4.184,
      kcal: 4184,
      btu: 1055.05585,
      ftlb: 1.3558179483314,
      ev: 1.602176634e-19,
    };

    const joules = val * (TO_JOULES[from] || 1);
    const converted = joules / (TO_JOULES[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 5 })} ${to}`,
        label: `Converted Energy (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Energy", value: `${val} ${from}` },
        { label: "SI Base Joules", value: `${joules.toLocaleString("en-US", { maximumFractionDigits: 2 })} J` },
        { label: "Converted Target Energy", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 5 })} ${to}` },
        { label: "Equivalent in kWh", value: `${(joules / 3600000).toFixed(5)} kWh` },
        { label: "Equivalent in Dietary kcal", value: `${(joules / 4184).toFixed(2)} kcal` },
        { label: "Equivalent in BTU", value: `${(joules / 1055.06).toFixed(2)} BTU` },
      ],
      steps: [
        `Convert to SI standard Joules: ${val} × ${TO_JOULES[from]} = ${joules.toFixed(2)} J.`,
        `Divide by target energy coefficient: ${joules.toFixed(2)} ÷ ${TO_JOULES[to]} = ${converted.toFixed(5)} ${to}.`,
        `Equivalent mass conversion (E = mc²): ${(joules / (299792458 ** 2)).toExponential(4)} kg of rest mass.`,
      ],
      chart: {
        type: "donut",
        title: "Thermodynamic Work Utilization Share",
        format: "pct",
        data: [
          { name: "Useful Mechanical Work", value: 42, color: "#10b981" },
          { name: "Thermal Dissipation Entropy", value: 58, color: "#f97316" },
        ],
      },
    };
  },
};

export default function EnergyConverterComponent() {
  return <CalcEngine config={energyConverterConfig} />;
}
