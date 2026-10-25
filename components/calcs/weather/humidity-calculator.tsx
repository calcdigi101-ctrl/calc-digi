"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const humidityConfig: CalcConfig = {
  id: "humidity-calculator",
  title: "Atmospheric Humidity, Absolute Vapor Density & Mixing Ratio Calculator",
  fields: [
    {
      kind: "number",
      key: "dryBulbTempC",
      label: "Dry-Bulb Air Temperature (°C)",
      default: 24.0,
      min: -30.0,
      max: 60.0,
    },
    {
      kind: "number",
      key: "relativeHumidity",
      label: "Relative Humidity (%)",
      default: 55.0,
      min: 1.0,
      max: 100.0,
    },
    {
      kind: "number",
      key: "atmosphericPressureHpa",
      label: "Atmospheric Pressure (hPa)",
      default: 1013.25,
      min: 700.0,
      max: 1100.0,
    },
  ],
  presets: [
    { label: "Indoor Comfort (22°C, 45% RH)", values: { dryBulbTempC: 22.0, relativeHumidity: 45.0, atmosphericPressureHpa: 1013.25 } },
    { label: "Humid Greenhouse (28°C, 80% RH)", values: { dryBulbTempC: 28.0, relativeHumidity: 80.0, atmosphericPressureHpa: 1012.0 } },
    { label: "Dry Winter Heating (20°C, 20% RH)", values: { dryBulbTempC: 20.0, relativeHumidity: 20.0, atmosphericPressureHpa: 1018.0 } },
    { label: "Tropical Coast (32°C, 75% RH)", values: { dryBulbTempC: 32.0, relativeHumidity: 75.0, atmosphericPressureHpa: 1008.0 } },
  ],
  compute: (vals) => {
    const tc = Number(vals.dryBulbTempC) || 24.0;
    const rh = Math.min(100.0, Math.max(1.0, Number(vals.relativeHumidity) || 55.0));
    const p = Number(vals.atmosphericPressureHpa) || 1013.25;

    const tk = tc + 273.15;
    // Saturation vapor pressure (Sonntag 1990 / Tetens)
    const es = 6.112 * Math.exp((17.62 * tc) / (243.12 + tc));
    const e = es * (rh / 100.0);

    // Absolute humidity in g/m³
    const absHum = (216.7 * e) / tk;

    // Mixing ratio (w) in g/kg
    const w = (622.0 * e) / (p - e);

    // Specific humidity (q) in g/kg
    const q = (622.0 * e) / (p - 0.378 * e);

    // Virtual temperature in °C
    const tvC = tk * (1.0 + 0.608 * (q / 1000.0)) - 273.15;

    return {
      hero: {
        label: "Absolute Humidity (Vapor Density)",
        value: `${absHum.toFixed(2)} g/m³`,
      },
      badge: {
        text: `${rh.toFixed(1)}% Relative Humidity @ ${tc.toFixed(1)}°C`,
        tone: rh >= 30 && rh <= 60 ? "good" : rh > 65 ? "warn" : "bad",
      },
      rows: [
        {
          label: "Saturation Vapor Pressure (es)",
          value: `${es.toFixed(2)} hPa (Current e: ${e.toFixed(2)} hPa)`,
        },
        {
          label: "Water Vapor Mixing Ratio (w)",
          value: `${w.toFixed(2)} g water / kg dry air`,
        },
        {
          label: "Specific Humidity (q)",
          value: `${q.toFixed(2)} g / kg moist air`,
        },
        {
          label: "Virtual Temperature (Tv)",
          value: `${tvC.toFixed(2)}°C (${((tvC * 9) / 5 + 32).toFixed(1)}°F)`,
        },
      ],
      steps: [
        `Saturation Vapor Pressure: es = 6.112 * exp(17.62 * ${tc.toFixed(1)} / (243.12 + ${tc.toFixed(1)})) = ${es.toFixed(2)} hPa`,
        `Actual Partial Vapor Pressure: e = ${es.toFixed(2)} hPa * (${rh} / 100) = ${e.toFixed(2)} hPa`,
        `Absolute Humidity: rho_v = (216.7 * ${e.toFixed(2)}) / (${tc.toFixed(1)} + 273.15) = ${absHum.toFixed(2)} g/m³`,
        `Mixing Ratio: w = 622 * ${e.toFixed(2)} / (${p} - ${e.toFixed(2)}) = ${w.toFixed(2)} g/kg`,
      ],
      chart: {
        type: "donut",
        title: "Atmospheric Vapor Pressure Saturation Fraction",
        format: "pct",
        data: [
          { name: "Active Water Vapor Pressure", value: Math.round((e / es) * 100), color: "#0ea5e9" },
          { name: "Unsaturated Vapor Capacity Deficit", value: Math.max(0, 100 - Math.round((e / es) * 100)), color: "#cbd5e1" },
        ],
      },
    };
  },
};

export default function HumidityCalculatorComponent() {
  return <CalcEngine config={humidityConfig} />;
}
