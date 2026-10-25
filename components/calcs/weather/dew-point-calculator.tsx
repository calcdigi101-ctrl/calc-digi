"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const dewPointConfig: CalcConfig = {
  id: "dew-point-calculator",
  title: "Meteorological Dew Point, Relative Humidity & Comfort Index Calculator",
  fields: [
    {
      kind: "number",
      key: "temperatureF",
      label: "Ambient Air Temperature (°F)",
      default: 75.0,
      min: -40.0,
      max: 135.0,
    },
    {
      kind: "number",
      key: "relativeHumidity",
      label: "Relative Humidity (%)",
      default: 65.0,
      min: 1.0,
      max: 100.0,
    },
    {
      kind: "number",
      key: "barometricPressureHpa",
      label: "Barometric Station Pressure (hPa)",
      default: 1013.25,
      min: 800.0,
      max: 1100.0,
    },
  ],
  presets: [
    { label: "Pleasant Spring (68°F, 45% RH)", values: { temperatureF: 68.0, relativeHumidity: 45.0, barometricPressureHpa: 1013.25 } },
    { label: "Muggy Summer (88°F, 70% RH)", values: { temperatureF: 88.0, relativeHumidity: 70.0, barometricPressureHpa: 1013.25 } },
    { label: "Tropical Swelter (95°F, 75% RH)", values: { temperatureF: 95.0, relativeHumidity: 75.0, barometricPressureHpa: 1010.0 } },
    { label: "Arid Desert (102°F, 15% RH)", values: { temperatureF: 102.0, relativeHumidity: 15.0, barometricPressureHpa: 1012.0 } },
  ],
  compute: (vals) => {
    const tF = Number(vals.temperatureF) || 75.0;
    const rh = Math.min(100.0, Math.max(1.0, Number(vals.relativeHumidity) || 65.0));
    const p = Number(vals.barometricPressureHpa) || 1013.25;

    const tC = ((tF - 32) * 5) / 9;
    const a = 17.625;
    const b = 243.04;
    const alpha = Math.log(rh / 100.0) + (a * tC) / (b + tC);
    const dpC = (b * alpha) / (a - alpha);
    const dpF = (dpC * 9) / 5 + 32;

    const es = 6.112 * Math.exp((17.67 * tC) / (tC + 243.5));
    const e = es * (rh / 100.0);
    const absHum = (216.7 * e) / (tC + 273.15);
    const spreadF = tF - dpF;

    let comfort = "Dry & Crisp";
    let tone: "good" | "warn" | "bad" = "good";
    if (dpF < 50) {
      comfort = "Dry & Crisp (Very Comfortable)";
      tone = "good";
    } else if (dpF <= 59) {
      comfort = "Comfortable & Pleasant";
      tone = "good";
    } else if (dpF <= 64) {
      comfort = "Slightly Humid (Noticeable)";
      tone = "good";
    } else if (dpF <= 69) {
      comfort = "Humid & Sticky";
      tone = "warn";
    } else if (dpF <= 74) {
      comfort = "Oppressive & Sultry";
      tone = "bad";
    } else {
      comfort = "Extremely Oppressive (Tropical)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Calculated Dew Point",
        value: `${dpF.toFixed(1)}°F (${dpC.toFixed(1)}°C)`,
      },
      badge: {
        text: comfort,
        tone: tone,
      },
      rows: [
        {
          label: "Dew Point Spread (T - Td)",
          value: `${spreadF.toFixed(1)}°F (${(tC - dpC).toFixed(1)}°C)`,
        },
        {
          label: "Absolute Humidity",
          value: `${absHum.toFixed(2)} g/m³`,
        },
        {
          label: "Vapor Pressure",
          value: `${e.toFixed(2)} hPa (Saturation: ${es.toFixed(2)} hPa)`,
        },
        {
          label: "Condensation Risk",
          value: spreadF <= 3.0 ? "High (Fog / Dew Imminent)" : spreadF <= 8.0 ? "Moderate" : "Low Risk",
        },
      ],
      steps: [
        `Convert Temperature to Celsius: T = (${tF}°F - 32) * 5/9 = ${tC.toFixed(2)}°C`,
        `Compute Magnus-Tetens factor alpha = ln(${rh}/100) + (17.625 * ${tC.toFixed(2)}) / (243.04 + ${tC.toFixed(2)}) = ${alpha.toFixed(4)}`,
        `Dew Point (°C) = (243.04 * ${alpha.toFixed(4)}) / (17.625 - ${alpha.toFixed(4)}) = ${dpC.toFixed(2)}°C`,
        `Convert to Fahrenheit: Td = (${dpC.toFixed(2)}°C * 9/5) + 32 = ${dpF.toFixed(2)}°F`,
        `Dew Point Spread = ${tF}°F - ${dpF.toFixed(1)}°F = ${spreadF.toFixed(1)}°F`,
      ],
      chart: {
        type: "donut",
        title: "Atmospheric Vapor Pressure Saturation Partition",
        format: "pct",
        data: [
          { name: "Current Vapor Pressure (e)", value: Math.round((e / es) * 100), color: "#0ea5e9" },
          { name: "Unsaturated Vapor Deficit", value: Math.max(0, 100 - Math.round((e / es) * 100)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function DewPointCalculatorComponent() {
  return <CalcEngine config={dewPointConfig} />;
}
