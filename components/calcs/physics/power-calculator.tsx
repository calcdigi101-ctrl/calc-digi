'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "power-calculator",
  title: "Mechanical & Electrical Power Calculator",
  fields: [
    {
      kind: "number",
      key: "energy",
      label: "Energy Converted / Work Done (Joules)",
      default: 750000,
      min: 0,
      max: 10000000000,
      hint: "Total energy transformed or work delivered (750,000 J = 750 kJ = 0.208 kWh)",
    },
    {
      kind: "number",
      key: "time",
      label: "Elapsed Time Interval t (Seconds)",
      default: 60,
      min: 0.01,
      max: 86400,
      hint: "Duration over which energy is expended (60s = 1 minute; 3,600s = 1 hour)",
    },
    {
      kind: "number",
      key: "voltage",
      label: "Operating Voltage V (Volts)",
      default: 240,
      min: 1,
      max: 100000,
      hint: "Supply potential for electrical current calculation (12V, 120V, 240V, 400V)",
    },
    {
      kind: "number",
      key: "efficiency",
      label: "System Efficiency η (%)",
      default: 90,
      min: 1,
      max: 100,
      hint: "Mechanical/electrical efficiency (e.g. 90% motor, 35% thermal engine)",
    },
  ],
  presets: [
    {
      label: "Residential EV Level 2 Charger (7.2 kW)",
      values: { energy: 432000, time: 60, voltage: 240, efficiency: 95 },
    },
    {
      label: "Industrial Induction Motor (15 kW)",
      values: { energy: 900000, time: 60, voltage: 400, efficiency: 92 },
    },
    {
      label: "Formula 1 Thermal + MGU-K Hybrid Sprint",
      values: { energy: 7500000, time: 10, voltage: 800, efficiency: 88 },
    },
  ],
  compute: (vals) => {
    const e = Math.max(0, Number(vals.energy) || 0);
    const t = Math.max(0.001, Number(vals.time) || 1);
    const v = Math.max(1, Number(vals.voltage) || 240);
    const effPct = Math.min(100, Math.max(1, Number(vals.efficiency) || 100));

    const pOutWatts = e / t;
    const pOutKW = pOutWatts / 1000;
    const pOutHP = pOutWatts / 745.7;

    const pInWatts = pOutWatts / (effPct / 100);
    const pInKW = pInWatts / 1000;
    const pLossKW = pInKW - pOutKW;

    const currentAmps = pInWatts / v;
    const kwhPerHour = pInKW;

    return {
      hero: {
        value: pOutKW >= 1 ? `${pOutKW.toFixed(2)} kW` : `${pOutWatts.toFixed(0)} Watts`,
        label: `${pOutHP.toFixed(1)} Mechanical HP | ${(pInKW).toFixed(2)} kW Electrical In | ${currentAmps.toFixed(1)} Amps @ ${v}V`,
      },
      badge: {
        text: `${pOutHP.toFixed(1)} Brake Horsepower`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Power Flow: Useful Work vs Thermal Loss (kW)",
        data: [
          { name: `Useful Power (${pOutKW.toFixed(2)} kW)`, value: Math.max(0.01, Number(pOutKW.toFixed(2))), color: "#10b981" },
          { name: `Thermal Dissipation (${pLossKW.toFixed(2)} kW)`, value: Math.max(0.01, Number(pLossKW.toFixed(2))), color: "#ef4444" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Useful Output Power (P_out = E/t)", value: `${pOutKW.toFixed(3)} kW (${pOutWatts.toLocaleString(undefined, { maximumFractionDigits: 1 })} Watts)` },
        { label: "Imperial Mechanical Horsepower", value: `${pOutHP.toFixed(2)} HP (1 HP = 745.7 Watts)` },
        { label: "Total Input Power Demand (P_in)", value: `${pInKW.toFixed(3)} kW (${effPct}% efficiency)` },
        { label: "Thermal Dissipation Loss (P_loss)", value: `${pLossKW.toFixed(3)} kW wasted heat` },
        { label: "Operating Electrical Current Draw (I = P/V)", value: `${currentAmps.toFixed(2)} Amperes @ ${v} Volts` },
        { label: "Continuous Energy Consumption Rate", value: `${kwhPerHour.toFixed(2)} kWh per running hour` },
      ],
      steps: [
        `Divide energy by time for output power: P_out = ${e.toLocaleString()} J ÷ ${t.toFixed(2)} s = ${pOutWatts.toFixed(1)} Watts (${pOutKW.toFixed(2)} kW).`,
        `Convert to mechanical horsepower: ${pOutWatts.toFixed(1)} W ÷ 745.7 W/HP = ${pOutHP.toFixed(2)} HP.`,
        `Apply efficiency factor: P_in = ${pOutKW.toFixed(2)} kW ÷ (${effPct}% / 100) = ${pInKW.toFixed(2)} kW.`,
        `Calculate electrical line current: I = ${pInWatts.toFixed(1)} W ÷ ${v} V = ${currentAmps.toFixed(2)} Amperes.`,
      ],
      note: { text: "Power is the rate of doing work. A 100 HP engine does not perform more total work than a 1 HP engine; it simply delivers that work 100 times faster." },
    };
  },
};

export default function PowerCalculator() {
  return <CalcEngine config={config} />;
}
