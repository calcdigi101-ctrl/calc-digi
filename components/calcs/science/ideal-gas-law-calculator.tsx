"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "ideal-gas-law-calculator",
  title: "Ideal Gas Law PV=nRT & Molar Volume Solver",
  fields: [
    {
      kind: "choice",
      key: "solveFor",
      label: "Solve For Variable",
      default: "pressure",
      options: [
        { label: "Pressure P (kPa)", value: "pressure" },
        { label: "Volume V (Liters)", value: "volume" },
        { label: "Moles n (mol)", value: "moles" },
        { label: "Temperature T (°C)", value: "temperature" }
      ]
    },
    {
      kind: "number",
      key: "pressure",
      label: "Pressure P (kPa)",
      default: 101.325,
      min: 0.001,
      max: 100000
    },
    {
      kind: "number",
      key: "volume",
      label: "Volume V (Liters)",
      default: 22.414,
      min: 0.001,
      max: 1000000
    },
    {
      kind: "number",
      key: "moles",
      label: "Amount of Gas n (Moles)",
      default: 1.0,
      min: 0.0001,
      max: 100000
    },
    {
      kind: "number",
      key: "temperature",
      label: "Temperature T (°C)",
      default: 0.0,
      min: -273.15,
      max: 5000
    },
    {
      kind: "number",
      key: "molarMass",
      label: "Gas Molar Mass (g/mol, for density & mass)",
      default: 28.97,
      min: 1.0,
      max: 500
    }
  ],
  presets: [
    {
      label: "Standard Temperature & Pressure (STP: 0°C, 101.325 kPa, 1 mol)",
      values: { solveFor: "volume", pressure: 101.325, volume: 22.414, moles: 1.0, temperature: 0.0, molarMass: 28.97 }
    },
    {
      label: "Ambient Room Temperature (NTP: 20°C, 101.325 kPa, 1 mol)",
      values: { solveFor: "volume", pressure: 101.325, volume: 24.055, moles: 1.0, temperature: 20.0, molarMass: 28.97 }
    },
    {
      label: "Scuba Diving Cylinder (200 bar, 12 Liters, 20°C)",
      values: { solveFor: "moles", pressure: 20000.0, volume: 12.0, moles: 98.4, temperature: 20.0, molarMass: 28.97 }
    },
    {
      label: "High Altitude Weather Balloon (30 km, -45°C, 1.2 kPa)",
      values: { solveFor: "volume", pressure: 1.2, volume: 1560.0, moles: 10.0, temperature: -45.0, molarMass: 4.003 }
    }
  ],
  compute: (vals) => {
    const solve = String(vals.solveFor || "pressure");
    const R_GAS = 8.314462618; // J / (mol·K) = kPa·L / (mol·K)

    let P = Number(vals.pressure) || 101.325;
    let V = Number(vals.volume) || 22.414;
    let n = Number(vals.moles) || 1.0;
    let T_C = Number(vals.temperature) || 0.0;
    const MW = Math.max(1.0, Number(vals.molarMass) || 28.97);

    let T_K = T_C + 273.15;
    if (T_K < 0.01) T_K = 0.01;

    let solvedLabel = "";
    let solvedValStr = "";

    if (solve === "pressure") {
      P = (n * R_GAS * T_K) / Math.max(0.0001, V);
      solvedLabel = "Calculated Gas Pressure";
      solvedValStr = `${P.toFixed(2)} kPa (${(P / 101.325).toFixed(3)} atm)`;
    } else if (solve === "volume") {
      V = (n * R_GAS * T_K) / Math.max(0.0001, P);
      solvedLabel = "Calculated Gas Volume";
      solvedValStr = `${V.toFixed(3)} Liters (${(V / 1000).toFixed(4)} m³)`;
    } else if (solve === "moles") {
      n = (P * V) / (R_GAS * T_K);
      solvedLabel = "Calculated Gas Substance Amount";
      solvedValStr = `${n.toFixed(4)} Moles`;
    } else {
      T_K = (P * V) / (Math.max(0.0001, n) * R_GAS);
      T_C = T_K - 273.15;
      solvedLabel = "Calculated Gas Temperature";
      solvedValStr = `${T_C.toFixed(2)} °C (${T_K.toFixed(2)} K)`;
    }

    // Secondary thermodynamic properties
    const massGrams = n * MW;
    const density_g_L = V > 0 ? massGrams / V : 0;
    const molarVolume = n > 0 ? V / n : 22.414;
    const internalEnergyJoules = 1.5 * n * R_GAS * T_K; // Monatomic ideal gas U = 3/2 nRT
    const rmsSpeed_m_s = Math.sqrt((3 * R_GAS * T_K) / (MW / 1000));

    return {
      hero: {
        value: solvedValStr,
        label: solvedLabel
      },
      badge: {
        text: `Molar Volume: ${molarVolume.toFixed(2)} L/mol | Density: ${density_g_L.toFixed(3)} g/L`,
        tone: "good"
      },
      rows: [
        { label: "Equilibrium Pressure P", value: `${P.toFixed(2)} kPa (${(P / 101.325).toFixed(3)} atm)` },
        { label: "Equilibrium Volume V", value: `${V.toFixed(3)} Liters (${(V * 1000).toFixed(0)} mL)` },
        { label: "Gas Amount n", value: `${n.toFixed(4)} Moles (${(n * 6.022e23).toExponential(3)} molecules)` },
        { label: "Absolute Temperature T", value: `${T_K.toFixed(2)} K (${T_C.toFixed(2)} °C)` },
        { label: "Gas Mass", value: `${massGrams.toFixed(2)} grams (${(massGrams / 1000).toFixed(3)} kg)` },
        { label: "Volumetric Mass Density", value: `${density_g_L.toFixed(3)} g/L (${density_g_L.toFixed(3)} kg/m³)` },
        { label: "Root-Mean-Square Velocity (v_rms)", value: `${rmsSpeed_m_s.toFixed(1)} m/s (${(rmsSpeed_m_s * 3.6).toFixed(0)} km/h)` },
        { label: "Translational Kinetic Energy (U)", value: `${(internalEnergyJoules / 1000).toFixed(2)} kJ` }
      ],
      steps: [
        `1. Ideal Gas Law equation: P · V = n · R · T (Universal Gas Constant R = 8.3145 kPa·L/(mol·K)).`,
        `2. Absolute temperature conversion: T = ${T_C.toFixed(2)} °C + 273.15 = ${T_K.toFixed(2)} K.`,
        `3. Evaluated variable: ${solve.toUpperCase()} = ${solvedValStr}.`,
        `4. Gas density: ρ = (P · MW) / (R · T) = (${P.toFixed(1)} × ${MW.toFixed(1)}) / (8.3145 × ${T_K.toFixed(1)}) = ${density_g_L.toFixed(3)} g/L.`
      ],
      chart: {
        type: "donut",
        title: "Gas Kinetic & State Variable Partition",
        data: [
          { name: "Pressure (kPa / 10)", value: Math.max(1, Math.round(P / 10)), color: "#2563eb" },
          { name: "Volume (L)", value: Math.max(1, Math.round(V)), color: "#06b6d4" },
          { name: "Temperature (K / 10)", value: Math.max(1, Math.round(T_K / 10)), color: "#f59e0b" },
          { name: "Mass (g)", value: Math.max(1, Math.round(massGrams)), color: "#10b981" }
        ],
        format: "plain"
      }
    };
  }
};

export default function IdealGasLawCalculatorComponent() {
  return <CalcEngine config={config} />;
}
