"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const ohmsLawConfig: CalcConfig = {
  id: "ohms-law-calculator",
  title: "Ohm's Law, Circuit Current, Resistance & Power Dissipation Calculator",
  fields: [
    { kind: "number", key: "voltage", label: "Voltage (V)", default: 12, min: 0.01, max: 100000 },
    { kind: "number", key: "resistance", label: "Resistance (Ω)", default: 240, min: 0.01, max: 10000000 },
  ],
  presets: [
    { label: "12V Automotive Circuit (240 Ω)", values: { voltage: 12, resistance: 240 } },
    { label: "5V Microcontroller GPIO (220 Ω)", values: { voltage: 5, resistance: 220 } },
    { label: "120V Household Appliance (15 Ω)", values: { voltage: 120, resistance: 15 } },
    { label: "230V European Mains (46 Ω)", values: { voltage: 230, resistance: 46 } },
  ],
  compute: (vals) => {
    const v = Math.max(0.001, Number(vals.voltage) || 12);
    const r = Math.max(0.001, Number(vals.resistance) || 240);

    const currentAmps = v / r;
    const currentMilliAmps = currentAmps * 1000;
    const powerWatts = v * currentAmps;
    const energyOneHourWh = powerWatts;

    return {
      hero: {
        label: "Circuit Current (I)",
        value: currentAmps < 1 ? `${currentMilliAmps.toFixed(2)} mA` : `${currentAmps.toFixed(3)} A`,
      },
      badge: {
        text: powerWatts > 100 ? "High Power Dissipation (> 100W)" : "Standard Electronic Signal Level",
        tone: powerWatts > 100 ? "warn" : "good",
      },
      rows: [
        { label: "Applied Potential Difference (Voltage)", value: `${v.toLocaleString()} V` },
        { label: "Conductor Resistance (R)", value: `${r.toLocaleString()} Ω` },
        { label: "Current (Amperes)", value: `${currentAmps.toFixed(4)} A`, strong: true },
        { label: "Current (Milliamperes)", value: `${currentMilliAmps.toFixed(2)} mA` },
        { label: "Electrical Power Dissipation (P)", value: `${powerWatts.toFixed(2)} W`, strong: true },
        { label: "Energy Consumption (1 Hour)", value: `${energyOneHourWh.toFixed(2)} Wh` },
      ],
      steps: [
        `Current (I) = V / R = ${v} V / ${r} Ω = ${currentAmps.toFixed(4)} A (${currentMilliAmps.toFixed(2)} mA)`,
        `Power (P) = V × I = ${v} V × ${currentAmps.toFixed(4)} A = ${powerWatts.toFixed(2)} W`,
        `Alternative Power: P = V² / R = (${v})² / ${r} = ${powerWatts.toFixed(2)} W`,
      ],
      chart: {
        type: "donut",
        title: "Power Dissipation & Thermal Margin",
        format: "pct",
        data: [
          { name: "Active Dissipated Power", value: 75, color: "#10b981" },
          { name: "Thermal Safety Headroom", value: 25, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function OhmsLawCalculatorComponent() {
  return <CalcEngine config={ohmsLawConfig} />;
}
