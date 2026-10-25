"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

// EPA 2024 Breakpoints for AQI Linear Interpolation
// [C_low, C_high, I_low, I_high]
const PM25_BREAKPOINTS = [
  [0.0, 9.0, 0, 50],
  [9.1, 35.4, 51, 100],
  [35.5, 55.4, 101, 150],
  [55.5, 125.4, 151, 200],
  [125.5, 225.4, 201, 300],
  [225.5, 325.4, 301, 400],
  [325.5, 500.4, 401, 500],
];

const PM10_BREAKPOINTS = [
  [0, 54, 0, 50],
  [55, 154, 51, 100],
  [155, 254, 101, 150],
  [255, 354, 151, 200],
  [355, 424, 201, 300],
  [425, 504, 301, 400],
  [505, 604, 401, 500],
];

const O3_BREAKPOINTS = [
  [0, 54, 0, 50],
  [55, 70, 51, 100],
  [71, 85, 101, 150],
  [86, 105, 151, 200],
  [106, 200, 201, 300],
];

const NO2_BREAKPOINTS = [
  [0, 53, 0, 50],
  [54, 100, 51, 100],
  [101, 360, 101, 150],
  [361, 649, 151, 200],
  [650, 1249, 201, 300],
  [1250, 1649, 301, 400],
  [1650, 2049, 401, 500],
];

const CO_BREAKPOINTS = [
  [0.0, 4.4, 0, 50],
  [4.5, 9.4, 51, 100],
  [9.5, 12.4, 101, 150],
  [12.5, 15.4, 151, 200],
  [15.5, 30.4, 201, 300],
  [30.5, 40.4, 301, 400],
  [40.5, 50.4, 401, 500],
];

function interpolateAQI(conc: number, table: number[][]): number {
  if (conc <= 0) return 0;
  for (const [cLow, cHigh, iLow, iHigh] of table) {
    if (conc >= cLow && conc <= cHigh) {
      return Math.round(((iHigh - iLow) / (cHigh - cLow)) * (conc - cLow) + iLow);
    }
  }
  const last = table[table.length - 1];
  if (conc > last[1]) return 500;
  return 0;
}

export const config: CalcConfig = {
  id: "air-quality-index-calc",
  title: "Air Quality Index (AQI) & Pollutant Health Impact Calculator",
  presets: [
    { label: "Clean Rural Air (AQI 24)", values: { pm25: 4.2, pm10: 12, ozone: 28, no2: 10, co: 0.8 } },
    { label: "Suburban Moderate (AQI 68)", values: { pm25: 16.5, pm10: 42, ozone: 58, no2: 32, co: 3.5 } },
    { label: "Urban Smog (AQI 122)", values: { pm25: 43.8, pm10: 88, ozone: 74, no2: 78, co: 7.2 } },
    { label: "Wildfire Smoke (AQI 174)", values: { pm25: 98.5, pm10: 165, ozone: 52, no2: 45, co: 6.8 } },
    { label: "Severe Inversion (AQI 242)", values: { pm25: 192.0, pm10: 285, ozone: 92, no2: 110, co: 14.5 } },
  ],
  fields: [
    {
      kind: "number",
      key: "pm25",
      label: "Fine Particulate Matter (PM2.5) in ug/m3",
      default: 16.5,
      min: 0,
      max: 500,
      hint: "Microscopic particles <= 2.5 micrometers (EPA Good threshold is <= 9.0 ug/m3)",
    },
    {
      kind: "number",
      key: "pm10",
      label: "Coarse Particulate Matter (PM10) in ug/m3",
      default: 42,
      min: 0,
      max: 600,
      hint: "Inhalable dust and pollen <= 10 micrometers (EPA Good threshold is <= 54 ug/m3)",
    },
    {
      kind: "number",
      key: "ozone",
      label: "Ground-Level Ozone (O3) in ppb (8-hour)",
      default: 58,
      min: 0,
      max: 300,
      hint: "Photochemical smog oxidant (EPA Good threshold is <= 54 ppb)",
    },
    {
      kind: "number",
      key: "no2",
      label: "Nitrogen Dioxide (NO2) in ppb (1-hour)",
      default: 32,
      min: 0,
      max: 2000,
      hint: "Traffic combustion emission (EPA Good threshold is <= 53 ppb)",
    },
    {
      kind: "number",
      key: "co",
      label: "Carbon Monoxide (CO) in ppm (8-hour)",
      default: 3.5,
      min: 0,
      max: 50,
      hint: "Incomplete combustion gas (EPA Good threshold is <= 4.4 ppm)",
    },
  ],
  compute: (vals) => {
    const pm25 = Number(vals.pm25) || 0;
    const pm10 = Number(vals.pm10) || 0;
    const ozone = Number(vals.ozone) || 0;
    const no2 = Number(vals.no2) || 0;
    const co = Number(vals.co) || 0;

    const aqiPM25 = interpolateAQI(pm25, PM25_BREAKPOINTS);
    const aqiPM10 = interpolateAQI(pm10, PM10_BREAKPOINTS);
    const aqiOzone = interpolateAQI(ozone, O3_BREAKPOINTS);
    const aqiNO2 = interpolateAQI(no2, NO2_BREAKPOINTS);
    const aqiCO = interpolateAQI(co, CO_BREAKPOINTS);

    const maxAQI = Math.max(aqiPM25, aqiPM10, aqiOzone, aqiNO2, aqiCO);

    let dominantPollutant = "PM2.5";
    if (maxAQI === aqiOzone) dominantPollutant = "Ozone (O3)";
    else if (maxAQI === aqiPM10) dominantPollutant = "Dust (PM10)";
    else if (maxAQI === aqiNO2) dominantPollutant = "NO2";
    else if (maxAQI === aqiCO) dominantPollutant = "CO";

    let category = "Good";
    let colorName = "Green";
    let tone: "good" | "warn" | "bad" | "info" = "good";
    let healthAdvice = "Air quality is satisfactory. Ideal for outdoor activity.";

    if (maxAQI <= 50) {
      category = "Good (0 - 50)";
      colorName = "Green";
      tone = "good";
      healthAdvice = "Clean atmospheric air. Ideal conditions for outdoor cardio.";
    } else if (maxAQI <= 100) {
      category = "Moderate (51 - 100)";
      colorName = "Yellow";
      tone = "info";
      healthAdvice = "Acceptable air quality. Sensitive people should monitor symptoms.";
    } else if (maxAQI <= 150) {
      category = "Sensitive Groups (101 - 150)";
      colorName = "Orange";
      tone = "warn";
      healthAdvice = "Children, elderly, and asthmatics should reduce outdoor exertion.";
    } else if (maxAQI <= 200) {
      category = "Unhealthy (151 - 200)";
      colorName = "Red";
      tone = "bad";
      healthAdvice = "Everyone may experience effects. Limit heavy outdoor exercise.";
    } else if (maxAQI <= 300) {
      category = "Very Unhealthy (201 - 300)";
      colorName = "Purple";
      tone = "bad";
      healthAdvice = "Health alert. Keep windows closed and run HEPA filters.";
    } else {
      category = "Hazardous (301 - 500)";
      colorName = "Maroon";
      tone = "bad";
      healthAdvice = "Emergency conditions. Remain indoors; wear N95 if outdoors.";
    }

    return {
      hero: {
        value: `AQI ${maxAQI}`,
        label: `Air Quality Index (${category})`,
        sub: `Dominant Driver: ${dominantPollutant}`,
      },
      badge: {
        text: `EPA: ${colorName} Tier`,
        tone,
      },
      chart: {
        type: "donut",
        title: "Pollutant Sub-Index Breakdown",
        data: [
          { name: `PM2.5 AQI (${aqiPM25})`, value: Math.max(1, aqiPM25), color: "#f97316" },
          { name: `Ozone AQI (${aqiOzone})`, value: Math.max(1, aqiOzone), color: "#10b981" },
          { name: `PM10 AQI (${aqiPM10})`, value: Math.max(1, aqiPM10), color: "#06b6d4" },
          { name: `NO2 AQI (${aqiNO2})`, value: Math.max(1, aqiNO2), color: "#8b5cf6" },
          { name: `CO AQI (${aqiCO})`, value: Math.max(1, aqiCO), color: "#64748b" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Overall Air Quality Index", value: `${maxAQI} (${category})`, strong: true },
        { label: "Dominant Pollutant", value: dominantPollutant },
        { label: "Fine Particulate (PM2.5)", value: `AQI ${aqiPM25} (${pm25} ug/m3)` },
        { label: "Ground Ozone (O3)", value: `AQI ${aqiOzone} (${ozone} ppb)` },
        { label: "Coarse Dust (PM10)", value: `AQI ${aqiPM10} (${pm10} ug/m3)` },
        { label: "Nitrogen Dioxide (NO2)", value: `AQI ${aqiNO2} (${no2} ppb)` },
        { label: "Carbon Monoxide (CO)", value: `AQI ${aqiCO} (${co} ppm)` },
        { label: "Health Guidance", value: healthAdvice },
      ],
      steps: [
        `Identify highest individual sub-index: max(PM2.5: ${aqiPM25}, PM10: ${aqiPM10}, O3: ${aqiOzone}, NO2: ${aqiNO2}, CO: ${aqiCO}) = AQI ${maxAQI}.`,
        `Apply EPA linear interpolation: I = [(I_hi - I_lo) / (C_hi - C_lo)] * (C - C_lo) + I_lo across concentration breakpoints.`,
        `Classify air quality risk tier: AQI ${maxAQI} falls into the "${category}" bracket, governed by ${dominantPollutant}.`,
      ],
      note: {
        text: "In 2024, the EPA tightened the annual PM2.5 standard from 12.0 to 9.0 ug/m3 to protect vulnerable respiratory populations from long-term cardiovascular damage.",
      },
    };
  },
};

export default function AirQualityIndexCalculator() {
  return <CalcEngine config={config} />;
}
