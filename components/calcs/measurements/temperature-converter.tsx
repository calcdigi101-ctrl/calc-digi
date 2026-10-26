"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const temperatureConverterConfig: CalcConfig = {
  id: "temperature-converter",
  title: "Temperature Scale Converter",
  fields: [
    { kind: "number", key: "value", label: "Temperature Value", default: 25, min: -1000, max: 1000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Scale",
      default: "C",
      options: [
        { label: "Celsius (°C)", value: "C" },
        { label: "Fahrenheit (°F)", value: "F" },
        { label: "Kelvin (K)", value: "K" },
        { label: "Rankine (°R)", value: "R" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Scale",
      default: "F",
      options: [
        { label: "Celsius (°C)", value: "C" },
        { label: "Fahrenheit (°F)", value: "F" },
        { label: "Kelvin (K)", value: "K" },
        { label: "Rankine (°R)", value: "R" },
      ],
    },
  ],
  presets: [
    { label: "25°C to Fahrenheit (Room Temp)", values: { value: 25, fromUnit: "C", toUnit: "F" } },
    { label: "98.6°F to Celsius (Human Body)", values: { value: 98.6, fromUnit: "F", toUnit: "C" } },
    { label: "0°C to Kelvin (Freezing Point)", values: { value: 0, fromUnit: "C", toUnit: "K" } },
    { label: "100°C to Fahrenheit (Water Boiling)", values: { value: 100, fromUnit: "C", toUnit: "F" } },
  ],
  compute: (vals) => {
    const val = Number(vals.value) ?? 25;
    const from = String(vals.fromUnit || "C");
    const to = String(vals.toUnit || "F");

    // Convert any to Celsius
    let celsius = 0;
    if (from === "C") celsius = val;
    else if (from === "F") celsius = (val - 32) * (5 / 9);
    else if (from === "K") celsius = val - 273.15;
    else if (from === "R") celsius = (val - 491.67) * (5 / 9);

    // Convert Celsius to Target
    let result = 0;
    if (to === "C") result = celsius;
    else if (to === "F") result = (celsius * (9 / 5)) + 32;
    else if (to === "K") result = celsius + 273.15;
    else if (to === "R") result = (celsius + 273.15) * (9 / 5);

    const kelvin = celsius + 273.15;

    return {
      hero: {
        value: `${result.toFixed(2)} °${to === "K" ? "K" : to}`,
        label: `Converted Temperature (${val}°${from} → °${to})`,
      },
      breakdown: [
        { label: "Input Temperature", value: `${val} °${from}` },
        { label: "Celsius (°C)", value: `${celsius.toFixed(2)} °C` },
        { label: "Fahrenheit (°F)", value: `${((celsius * (9 / 5)) + 32).toFixed(2)} °F` },
        { label: "Thermodynamic Kelvin (K)", value: `${kelvin.toFixed(2)} K` },
        { label: "Rankine (°R)", value: `${(kelvin * 1.8).toFixed(2)} °R` },
        { label: "Distance from Absolute Zero", value: `${Math.max(0, kelvin).toFixed(2)} K above 0 K` },
      ],
      steps: [
        `Normalize to thermodynamic Celsius: ${from === "C" ? `${val} °C` : `Formula conversion yields ${celsius.toFixed(2)} °C`}.`,
        `Apply target transform to °${to}: Result = ${result.toFixed(2)} °${to}.`,
        `Absolute thermodynamic state: T = ${kelvin.toFixed(2)} Kelvin.`,
      ],
      chart: {
        type: "donut",
        title: "Thermodynamic Energy Scale Share",
        format: "pct",
        data: [
          { name: "Absolute Thermal State (K)", value: Math.min(100, Math.max(5, Math.round((kelvin / 373.15) * 100))), color: "#ef4444" },
          { name: "Reference Range Headroom", value: Math.max(0, 100 - Math.min(100, Math.max(5, Math.round((kelvin / 373.15) * 100)))), color: "#3b82f6" },
        ],
      },
    };
  },
};

export default function TemperatureConverterComponent() {
  return <CalcEngine config={temperatureConverterConfig} />;
}
