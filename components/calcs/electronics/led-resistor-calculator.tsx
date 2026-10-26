"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const ledResistorConfig: CalcConfig = {
  id: "led-resistor-calculator",
  title: "LED Current Limiting Series Resistor & Wattage Rating Calculator",
  fields: [
    { kind: "number", key: "supplyVoltage", label: "DC Power Supply Voltage (Vs)", default: 12, min: 1, max: 100 },
    { kind: "number", key: "forwardVoltage", label: "LED Forward Voltage Drop (Vf)", default: 3.2, min: 1, max: 50 },
    { kind: "number", key: "ledCurrent", label: "Target Forward Current (mA)", default: 20, min: 1, max: 1000 },
    { kind: "number", key: "numLeds", label: "Number of LEDs in Series", default: 1, min: 1, max: 30 },
  ],
  presets: [
    { label: "12V Supply with Single White LED (3.2V @ 20mA)", values: { supplyVoltage: 12, forwardVoltage: 3.2, ledCurrent: 20, numLeds: 1 } },
    { label: "5V USB with Red Indicator LED (2.0V @ 15mA)", values: { supplyVoltage: 5, forwardVoltage: 2.0, ledCurrent: 15, numLeds: 1 } },
    { label: "12V Strip with 3 Blue LEDs in Series (3.2V each)", values: { supplyVoltage: 12, forwardVoltage: 3.2, ledCurrent: 20, numLeds: 3 } },
    { label: "24V Industrial Panel with 6 Green LEDs in Series", values: { supplyVoltage: 24, forwardVoltage: 2.2, ledCurrent: 20, numLeds: 6 } },
  ],
  compute: (vals) => {
    const vs = Math.max(1, Number(vals.supplyVoltage) || 12);
    const vf = Math.max(0.5, Number(vals.forwardVoltage) || 3.2);
    const ifMa = Math.max(1, Number(vals.ledCurrent) || 20);
    const count = Math.max(1, Number(vals.numLeds) || 1);

    const totalVf = vf * count;
    const vResistor = vs - totalVf;

    if (vResistor <= 0) {
      return {
        hero: { label: "Circuit Error", value: "Insufficient Supply Voltage" },
        badge: { text: "Supply Voltage must exceed total LED Forward Drop", tone: "bad" },
        rows: [
          { label: "Supply Voltage", value: `${vs} V` },
          { label: "Total LED Voltage Required", value: `${totalVf.toFixed(1)} V` },
        ],
        steps: [`Total Vf (${totalVf} V) >= Supply Vs (${vs} V). LEDs will not illuminate.`],
        chart: {
          type: "donut",
          title: "Voltage Deficit",
          format: "pct",
          data: [{ name: "Deficit", value: 100, color: "#ef4444" }],
        },
      };
    }

    const currentAmps = ifMa / 1000;
    const exactResistanceOhms = vResistor / currentAmps;
    const powerWatts = vResistor * currentAmps;
    const recommendedWattage = powerWatts * 2; // 2x safety headroom

    return {
      hero: {
        label: "Required Series Resistance",
        value: `${exactResistanceOhms.toFixed(1)} Ω`,
      },
      badge: {
        text: `Recommended Resistor: >= ${recommendedWattage < 0.25 ? "1/4 W" : recommendedWattage < 0.5 ? "1/2 W" : "1 W"} Rating`,
        tone: powerWatts > 1 ? "warn" : "good",
      },
      rows: [
        { label: "Exact Calculated Resistance", value: `${exactResistanceOhms.toFixed(2)} Ω`, strong: true },
        { label: "Nearest Standard E24 Resistor", value: `${Math.round(exactResistanceOhms)} Ω` },
        { label: "Voltage Drop Across Resistor", value: `${vResistor.toFixed(2)} V` },
        { label: "Resistor Thermal Dissipation", value: `${powerWatts.toFixed(3)} W` },
        { label: "LED Array Power Consumption", value: `${(totalVf * currentAmps).toFixed(3)} W` },
        { label: "Total Circuit Power", value: `${(vs * currentAmps).toFixed(3)} W` },
      ],
      steps: [
        `Total LED Voltage Drop = ${count} LEDs × ${vf} V = ${totalVf.toFixed(2)} V`,
        `Resistor Voltage Drop (Vr) = Vs - Total Vf = ${vs} V - ${totalVf.toFixed(2)} V = ${vResistor.toFixed(2)} V`,
        `Required Resistance (R) = Vr / I = ${vResistor.toFixed(2)} V / ${currentAmps} A = ${exactResistanceOhms.toFixed(2)} Ω`,
        `Resistor Power Dissipation (P) = Vr × I = ${vResistor.toFixed(2)} V × ${currentAmps} A = ${powerWatts.toFixed(3)} W`,
      ],
      chart: {
        type: "donut",
        title: "LED Light Power vs Resistor Heat Loss",
        format: "pct",
        data: [
          { name: "LED Useful Power", value: Math.round((totalVf / vs) * 100), color: "#10b981" },
          { name: "Resistor Heat Loss", value: Math.max(1, Math.round((vResistor / vs) * 100)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function LedResistorCalculatorComponent() {
  return <CalcEngine config={ledResistorConfig} />;
}
