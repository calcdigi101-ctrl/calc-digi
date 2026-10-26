"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const solarPanelConfig: CalcConfig = {
  id: "solar-panel-calculator",
  title: "Solar Photovoltaic Panel Array Sizing & Energy Production Calculator",
  fields: [
    { kind: "number", key: "dailyKwh", label: "Daily Energy Demand (kWh/day)", default: 30, min: 1, max: 500 },
    { kind: "number", key: "peakSunHours", label: "Average Peak Sun Hours (hrs/day)", default: 4.5, min: 1, max: 10 },
    { kind: "number", key: "panelWatts", label: "Individual Solar Panel Rating (Watts)", default: 400, min: 100, max: 700 },
    { kind: "number", key: "systemLosses", label: "Inverter & Environmental Losses (%)", default: 20, min: 5, max: 40 },
  ],
  presets: [
    { label: "Typical US Household (30 kWh/day @ 4.5 Sun Hours)", values: { dailyKwh: 30, peakSunHours: 4.5, panelWatts: 400, systemLosses: 20 } },
    { label: "Efficient Eco Home (15 kWh/day @ 5.0 Sun Hours)", values: { dailyKwh: 15, peakSunHours: 5.0, panelWatts: 420, systemLosses: 18 } },
    { label: "Commercial Small Shop (75 kWh/day @ 4.0 Sun Hours)", values: { dailyKwh: 75, peakSunHours: 4.0, panelWatts: 450, systemLosses: 20 } },
    { label: "Off-Grid Cabin (8 kWh/day @ 3.8 Sun Hours)", values: { dailyKwh: 8, peakSunHours: 3.8, panelWatts: 380, systemLosses: 22 } },
  ],
  compute: (vals) => {
    const dailyKwh = Math.max(1, Number(vals.dailyKwh) || 30);
    const sunHours = Math.max(1, Number(vals.peakSunHours) || 4.5);
    const panelW = Math.max(100, Number(vals.panelWatts) || 400);
    const lossPct = Math.min(40, Math.max(5, Number(vals.systemLosses) || 20));

    const efficiencyFactor = (100 - lossPct) / 100;
    const requiredDailyDcKwh = dailyKwh / efficiencyFactor;
    const requiredSystemSizeKw = requiredDailyDcKwh / sunHours;
    const requiredSystemWatts = requiredSystemSizeKw * 1000;
    const panelCount = Math.ceil(requiredSystemWatts / panelW);
    const actualInstalledKw = (panelCount * panelW) / 1000;
    const annualGenerationKwh = actualInstalledKw * sunHours * efficiencyFactor * 365;

    return {
      hero: {
        label: "Required Solar Panels",
        value: `${panelCount} Panels (${actualInstalledKw.toFixed(2)} kW Array)`,
      },
      badge: {
        text: `Annual Generation: ${Math.round(annualGenerationKwh).toLocaleString()} kWh/yr`,
        tone: "good",
      },
      rows: [
        { label: "Recommended Number of Panels", value: `${panelCount} Units (${panelW}W each)`, strong: true },
        { label: "Total DC System Capacity", value: `${actualInstalledKw.toFixed(2)} kW (${(actualInstalledKw * 1000).toFixed(0)} Watts)` },
        { label: "Daily Energy Target", value: `${dailyKwh} kWh/day` },
        { label: "Expected Daily Production", value: `${(actualInstalledKw * sunHours * efficiencyFactor).toFixed(1)} kWh/day` },
        { label: "Estimated Annual Production", value: `${Math.round(annualGenerationKwh).toLocaleString()} kWh/year` },
        { label: "Recommended Inverter Rating", value: `${(actualInstalledKw * 0.85).toFixed(1)} kW AC` },
      ],
      steps: [
        `Daily Energy Target with Losses (${lossPct}%) = ${dailyKwh} / ${efficiencyFactor.toFixed(2)} = ${requiredDailyDcKwh.toFixed(1)} kWh/day`,
        `Array Minimum Capacity = ${requiredDailyDcKwh.toFixed(1)} kWh / ${sunHours} Sun Hours = ${requiredSystemSizeKw.toFixed(2)} kW DC`,
        `Number of ${panelW}W Panels = (${requiredSystemSizeKw.toFixed(2)} × 1000) / ${panelW} = ${panelCount} Panels`,
        `Annual Generation = ${actualInstalledKw.toFixed(2)} kW × ${sunHours} hrs × ${efficiencyFactor.toFixed(2)} × 365 days = ${Math.round(annualGenerationKwh).toLocaleString()} kWh`,
      ],
      chart: {
        type: "donut",
        title: "Solar Generation Harvest vs Conversion Losses",
        format: "pct",
        data: [
          { name: "Usable Delivered Electricity", value: Math.round(100 - lossPct), color: "#10b981" },
          { name: "Inverter, Cable & Soiling Losses", value: Math.round(lossPct), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function SolarPanelCalculatorComponent() {
  return <CalcEngine config={solarPanelConfig} />;
}
