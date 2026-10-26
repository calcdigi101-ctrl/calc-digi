"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const wireGaugeConfig: CalcConfig = {
  id: "wire-gauge-calculator",
  title: "American Wire Gauge (AWG), Voltage Drop & Resistance Calculator",
  fields: [
    {
      kind: "choice",
      key: "awg",
      label: "Conductor Size (AWG)",
      default: "12",
      options: [
        { label: "AWG 4 (Heavy Feeder / 70A)", value: "4" },
        { label: "AWG 6 (Subpanel / Range / 55A)", value: "6" },
        { label: "AWG 8 (HVAC / 40A)", value: "8" },
        { label: "AWG 10 (Dryer / Water Heater / 30A)", value: "10" },
        { label: "AWG 12 (Kitchen / Bath / 20A Branch)", value: "12" },
        { label: "AWG 14 (Standard General Lighting / 15A)", value: "14" },
        { label: "AWG 16 (Light Extension / 10A)", value: "16" },
        { label: "AWG 18 (Low Voltage / Thermostat / 7A)", value: "18" },
        { label: "AWG 22 (Signal & Telecom / 3A)", value: "22" },
      ],
    },
    { kind: "number", key: "lengthFeet", label: "One-Way Circuit Run Distance (Feet)", default: 50, min: 1, max: 2000 },
    { kind: "number", key: "currentAmps", label: "Circuit Continuous Current (A)", default: 16, min: 0.1, max: 200 },
    { kind: "number", key: "voltage", label: "System Nominal Voltage (V)", default: 120, min: 1, max: 600 },
  ],
  presets: [
    { label: "120V 20A Kitchen Outlet (AWG 12 @ 50 ft)", values: { awg: "12", lengthFeet: 50, currentAmps: 16, voltage: 120 } },
    { label: "120V 15A Bedroom Lighting (AWG 14 @ 75 ft)", values: { awg: "14", lengthFeet: 75, currentAmps: 12, voltage: 120 } },
    { label: "240V 30A Water Heater (AWG 10 @ 60 ft)", values: { awg: "10", lengthFeet: 60, currentAmps: 24, voltage: 240 } },
    { label: "12V 10A Automotive Run (AWG 10 @ 25 ft)", values: { awg: "10", lengthFeet: 25, currentAmps: 10, voltage: 12 } },
  ],
  compute: (vals) => {
    const awgVal = Number(vals.awg) || 12;
    const lengthFt = Math.max(1, Number(vals.lengthFeet) || 50);
    const amps = Math.max(0.1, Number(vals.currentAmps) || 16);
    const volts = Math.max(1, Number(vals.voltage) || 120);

    // Standard Copper Resistance per 1000 ft at 20°C (Ω/1000ft)
    const awgResistanceMap: Record<number, number> = {
      4: 0.2485,
      6: 0.3951,
      8: 0.6282,
      10: 0.9989,
      12: 1.588,
      14: 2.525,
      16: 4.016,
      18: 6.385,
      22: 16.14,
    };

    const rPer1000 = awgResistanceMap[awgVal] || 1.588;
    const totalLoopLengthFt = lengthFt * 2; // Two conductors (hot + neutral/return)
    const loopResistance = (totalLoopLengthFt / 1000) * rPer1000;
    const voltageDrop = amps * loopResistance;
    const vDropPct = (voltageDrop / volts) * 100;
    const deliveredVoltage = Math.max(0, volts - voltageDrop);
    const powerLossWatts = amps * amps * loopResistance;

    return {
      hero: {
        label: "Conductor Voltage Drop",
        value: `${voltageDrop.toFixed(2)} V (${vDropPct.toFixed(2)}%)`,
      },
      badge: {
        text: vDropPct <= 3.0 ? "NEC Compliant (<= 3% Branch Drop)" : "Exceeds NEC 3% Recommended Drop Limit",
        tone: vDropPct <= 3.0 ? "good" : "bad",
      },
      rows: [
        { label: "Delivered Terminal Voltage", value: `${deliveredVoltage.toFixed(2)} V`, strong: true },
        { label: "Percentage Voltage Drop", value: `${vDropPct.toFixed(2)}%` },
        { label: "Total Loop Resistance (2-Way)", value: `${loopResistance.toFixed(3)} Ω` },
        { label: "Conductor Thermal Power Loss", value: `${powerLossWatts.toFixed(1)} W` },
        { label: "One-Way Distance", value: `${lengthFt} ft (${(lengthFt * 0.3048).toFixed(1)} m)` },
        { label: "Copper Resistance per 1000 ft", value: `${rPer1000.toFixed(4)} Ω` },
      ],
      steps: [
        `Total Loop Conductor Length = 2 × ${lengthFt} ft = ${totalLoopLengthFt} ft`,
        `Loop Conductor Resistance (R) = (${totalLoopLengthFt} / 1000) × ${rPer1000} Ω = ${loopResistance.toFixed(3)} Ω`,
        `Voltage Drop (ΔV) = I × R = ${amps} A × ${loopResistance.toFixed(3)} Ω = ${voltageDrop.toFixed(2)} V (${vDropPct.toFixed(2)}%)`,
        `Power Dissipated in Cabling = I² × R = (${amps})² × ${loopResistance.toFixed(3)} = ${powerLossWatts.toFixed(1)} W`,
      ],
      chart: {
        type: "donut",
        title: "Delivered Voltage vs Conductor Cable Drop",
        format: "pct",
        data: [
          { name: "Delivered Voltage", value: Math.round(100 - vDropPct), color: "#10b981" },
          { name: "Cable Voltage Drop", value: Math.max(1, Math.round(vDropPct)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function WireGaugeCalculatorComponent() {
  return <CalcEngine config={wireGaugeConfig} />;
}
