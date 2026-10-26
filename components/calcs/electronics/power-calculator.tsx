"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const powerConfig: CalcConfig = {
  id: "power-calculator",
  title: "Electrical Power, Real Watts, Apparent VA & Power Factor Calculator",
  fields: [
    { kind: "number", key: "voltage", label: "RMS Voltage (V)", default: 120, min: 1, max: 100000 },
    { kind: "number", key: "current", label: "RMS Current (A)", default: 10, min: 0.01, max: 10000 },
    { kind: "number", key: "powerFactor", label: "Power Factor (0.1 to 1.0)", default: 0.95, min: 0.1, max: 1 },
    { kind: "number", key: "dailyHours", label: "Daily Operating Hours", default: 8, min: 0.5, max: 24 },
  ],
  presets: [
    { label: "120V Pure Resistive Heater (PF 1.0)", values: { voltage: 120, current: 12.5, powerFactor: 1.0, dailyHours: 4 } },
    { label: "230V Workshop Induction Motor (PF 0.82)", values: { voltage: 230, current: 8.5, powerFactor: 0.82, dailyHours: 6 } },
    { label: "Server Rack UPS Feed (PF 0.95)", values: { voltage: 208, current: 16, powerFactor: 0.95, dailyHours: 24 } },
    { label: "LED Commercial Lighting Bank (PF 0.90)", values: { voltage: 277, current: 5, powerFactor: 0.90, dailyHours: 12 } },
  ],
  compute: (vals) => {
    const v = Math.max(1, Number(vals.voltage) || 120);
    const i = Math.max(0.01, Number(vals.current) || 10);
    const pf = Math.min(1.0, Math.max(0.1, Number(vals.powerFactor) || 0.95));
    const hrs = Math.min(24, Math.max(0.1, Number(vals.dailyHours) || 8));

    const apparentPowerVA = v * i;
    const realPowerWatts = apparentPowerVA * pf;
    const reactivePowerVAR = Math.sqrt(Math.max(0, apparentPowerVA * apparentPowerVA - realPowerWatts * realPowerWatts));
    const dailyKwh = (realPowerWatts * hrs) / 1000;
    const monthlyKwh = dailyKwh * 30;

    return {
      hero: {
        label: "Real Active Power (P)",
        value: realPowerWatts >= 1000 ? `${(realPowerWatts / 1000).toFixed(2)} kW` : `${realPowerWatts.toFixed(1)} W`,
      },
      badge: {
        text: pf >= 0.9 ? "High Efficiency (PF >= 0.90)" : "Poor Power Factor (Correction Advised)",
        tone: pf >= 0.9 ? "good" : "warn",
      },
      rows: [
        { label: "Active Real Power (P)", value: `${realPowerWatts.toFixed(1)} W (${(realPowerWatts/1000).toFixed(3)} kW)`, strong: true },
        { label: "Apparent Power (S)", value: `${apparentPowerVA.toFixed(1)} VA` },
        { label: "Reactive Power (Q)", value: `${reactivePowerVAR.toFixed(1)} VAR` },
        { label: "Power Factor (cos θ)", value: `${pf.toFixed(2)}` },
        { label: "Daily Energy Consumption", value: `${dailyKwh.toFixed(2)} kWh/day` },
        { label: "Monthly Energy Consumption", value: `${monthlyKwh.toFixed(1)} kWh/month` },
      ],
      steps: [
        `Apparent Power (S) = V × I = ${v} V × ${i} A = ${apparentPowerVA.toFixed(1)} VA`,
        `Real Power (P) = S × PF = ${apparentPowerVA.toFixed(1)} VA × ${pf} = ${realPowerWatts.toFixed(1)} W`,
        `Reactive Power (Q) = √(S² - P²) = √(${apparentPowerVA.toFixed(0)}² - ${realPowerWatts.toFixed(0)}²) = ${reactivePowerVAR.toFixed(1)} VAR`,
      ],
      chart: {
        type: "donut",
        title: "Active Real Power vs Reactive Power",
        format: "pct",
        data: [
          { name: "Active Real Power (W)", value: Math.round((realPowerWatts / apparentPowerVA) * 100), color: "#10b981" },
          { name: "Reactive Apparent Overhead", value: Math.round(((apparentPowerVA - realPowerWatts) / apparentPowerVA) * 100), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function PowerCalculatorComponent() {
  return <CalcEngine config={powerConfig} />;
}
