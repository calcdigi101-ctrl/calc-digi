"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "ohms-law-calculator",
  title: "Ohm's Law, Electrochemical Cell & Power Dissipation Calculator",
  fields: [
    {
      kind: "choice",
      key: "solveFor",
      label: "Solve For Parameter",
      default: "voltage",
      options: [
        { label: "Voltage / Cell Potential V (Volts)", value: "voltage" },
        { label: "Current Flow I (Amperes)", value: "current" },
        { label: "Internal Resistance R (Ohms)", value: "resistance" },
        { label: "Power Dissipation P (Watts)", value: "power" }
      ]
    },
    {
      kind: "number",
      key: "voltage",
      label: "Voltage / Potential V (Volts)",
      default: 12.0,
      min: 0,
      max: 100000
    },
    {
      kind: "number",
      key: "current",
      label: "Electric Current I (Amperes)",
      default: 2.5,
      min: 0.0001,
      max: 10000
    },
    {
      kind: "number",
      key: "resistance",
      label: "Resistance / Impedance R (Ohms Ω)",
      default: 4.8,
      min: 0.0001,
      max: 10000000
    },
    {
      kind: "number",
      key: "power",
      label: "Power P (Watts)",
      default: 30.0,
      min: 0,
      max: 100000000
    }
  ],
  presets: [
    {
      label: "Automotive 12V Battery Circuit (12V, 4.8 Ω, 2.5 A)",
      values: { solveFor: "power", voltage: 12.0, current: 2.5, resistance: 4.8, power: 30.0 }
    },
    {
      label: "Gel Electrophoresis Tank (100V, 50 mA, 2000 Ω)",
      values: { solveFor: "resistance", voltage: 100.0, current: 0.05, resistance: 2000.0, power: 5.0 }
    },
    {
      label: "Lithium-Ion Cell Internal Drop (3.7V, 0.02 Ω, 10 A)",
      values: { solveFor: "voltage", voltage: 0.20, current: 10.0, resistance: 0.02, power: 2.0 }
    },
    {
      label: "USB 5V Fast Charging (5.0V, 3.0A, 15W)",
      values: { solveFor: "power", voltage: 5.0, current: 3.0, resistance: 1.67, power: 15.0 }
    }
  ],
  compute: (vals) => {
    const solve = String(vals.solveFor || "voltage");

    let V = Math.max(0, Number(vals.voltage) || 0);
    let I = Math.max(0.00001, Number(vals.current) || 0);
    let R = Math.max(0.00001, Number(vals.resistance) || 0);
    let P = Math.max(0, Number(vals.power) || 0);

    let solvedLabel = "";
    let solvedValStr = "";

    if (solve === "voltage") {
      V = I * R;
      P = V * I;
      solvedLabel = "Calculated Voltage V = I · R";
      solvedValStr = `${V.toFixed(3)} Volts`;
    } else if (solve === "current") {
      I = V / R;
      P = V * I;
      solvedLabel = "Calculated Current I = V / R";
      solvedValStr = `${I.toFixed(4)} Amperes (${(I * 1000).toFixed(1)} mA)`;
    } else if (solve === "resistance") {
      R = V / I;
      P = V * I;
      solvedLabel = "Calculated Resistance R = V / I";
      solvedValStr = `${R.toFixed(3)} Ohms (Ω)`;
    } else {
      P = V * I || (I * I * R) || (V * V / R);
      solvedLabel = "Calculated Electrical Power P = V · I";
      solvedValStr = `${P.toFixed(2)} Watts (${(P / 1000).toFixed(3)} kW)`;
    }

    const energyPerHourWh = P; // Wh in 1 hour
    const heatJoulesPerSec = P; // 1 W = 1 J/s

    return {
      hero: {
        value: solvedValStr,
        label: solvedLabel
      },
      badge: {
        text: `P = ${P.toFixed(2)} W | V = ${V.toFixed(2)} V | I = ${I.toFixed(3)} A`,
        tone: "good"
      },
      rows: [
        { label: "Potential Difference (Voltage V)", value: `${V.toFixed(3)} V` },
        { label: "Electric Current (I)", value: `${I.toFixed(4)} A (${(I * 1000).toFixed(1)} mA)` },
        { label: "Ohmic Resistance (R)", value: `${R.toFixed(4)} Ω` },
        { label: "Power Dissipated (P)", value: `${P.toFixed(2)} W (${(P * 0.001341).toFixed(3)} HP)` },
        { label: "Hourly Energy Consumption", value: `${energyPerHourWh.toFixed(2)} Watt-hours (Wh)` },
        { label: "Thermal Heat Generation Rate", value: `${heatJoulesPerSec.toFixed(2)} J/s (${(heatJoulesPerSec * 0.239).toFixed(2)} cal/s)` },
        { label: "Conductance (G = 1/R)", value: `${(1 / R).toFixed(4)} Siemens (S)` }
      ],
      steps: [
        `1. Fundamental Ohm's Law: V = I · R = ${I.toFixed(3)} A × ${R.toFixed(3)} Ω = ${V.toFixed(3)} V.`,
        `2. Joule Heating Power equation: P = V · I = ${V.toFixed(3)} V × ${I.toFixed(3)} A = ${P.toFixed(2)} W.`,
        `3. Equivalent formulations: P = I² · R = (${I.toFixed(3)})² × ${R.toFixed(3)} = ${P.toFixed(2)} W.`,
        `4. Conductance: G = 1 / R = 1 / ${R.toFixed(3)} = ${(1 / R).toFixed(4)} S.`
      ],
      chart: {
        type: "donut",
        title: "Electrochemical Power & Thermal Partition (Watts)",
        data: [
          { name: "Useful Electrochemical Power", value: Math.max(1, Math.round(P * 0.85)), color: "#2563eb" },
          { name: "Ohmic Thermal Losses (I²R)", value: Math.max(1, Math.round(P * 0.15)), color: "#ef4444" }
        ],
        format: "plain"
      }
    };
  }
};

export default function OhmsLawCalculatorComponent() {
  return <CalcEngine config={config} />;
}
