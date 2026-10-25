"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const specificHeatConfig: CalcConfig = {
  id: "specific-heat-calculator",
  title: "Specific Heat & Thermal Calorimetry Calculator",
  fields: [
    {
      key: "mode",
      label: "Calorimetry Parameter to Solve",
      kind: "choice",
      default: "solve_q",
      options: [
        { label: "Solve Thermal Energy Absorbed / Released (Q)", value: "solve_q" },
        { label: "Solve Final Equilibrium Temperature (T_final)", value: "solve_t" },
        { label: "Solve Specific Heat Capacity (c)", value: "solve_c" },
      ],
    },
    {
      key: "materialPreset",
      label: "Material Heat Capacity Benchmark",
      kind: "choice",
      default: "4184", // Water
      options: [
        { label: "Liquid Water (4,184 J/kg·°C)", value: "4184" },
        { label: "Ice (Solid H₂O) (2,090 J/kg·°C)", value: "2090" },
        { label: "Steam (Water Vapor) (2,010 J/kg·°C)", value: "2010" },
        { label: "Ethanol (2,440 J/kg·°C)", value: "2440" },
        { label: "Aluminum (897 J/kg·°C)", value: "897" },
        { label: "Iron / Carbon Steel (450 J/kg·°C)", value: "450" },
        { label: "Copper (385 J/kg·°C)", value: "385" },
        { label: "Lead (129 J/kg·°C)", value: "129" },
      ],
    },
    {
      key: "massKg",
      label: "Substance Mass (kg)",
      kind: "number",
      default: 2.5,
      min: 0.001,
      max: 1000000,
    },
    {
      key: "initialTemp",
      label: "Initial Temperature T₁ (°C)",
      kind: "number",
      default: 20,
      min: -273.15,
      max: 3000,
    },
    {
      key: "finalTemp",
      label: "Final Temperature T₂ (°C)",
      kind: "number",
      default: 80,
      min: -273.15,
      max: 3000,
    },
    {
      key: "heatInputJ",
      label: "Heat Energy Supplied Q (Joules)",
      kind: "number",
      default: 627600,
      min: 1,
      max: 1e12,
    },
  ],
  compute(vals) {
    const mode = String(vals.mode || "solve_q");
    const c = Number(vals.materialPreset) || 4184;
    const m = Number(vals.massKg) || 2.5;
    const t1 = Number(vals.initialTemp) || 20;
    const t2 = Number(vals.finalTemp) || 80;
    const qIn = Number(vals.heatInputJ) || 627600;

    let deltaT = t2 - t1;
    let Q = m * c * deltaT;
    let tFinal = t2;
    let computedC = c;
    let steps: string[] = [];

    if (mode === "solve_q") {
      deltaT = t2 - t1;
      Q = m * c * deltaT;
      tFinal = t2;
      steps = [
        `Calorimetry Equation: Q = m · c · ΔT`,
        `ΔT = T_final - T_initial = ${t2}°C - ${t1}°C = ${deltaT.toFixed(2)} °C`,
        `Q = ${m} kg × ${c} J/(kg·°C) × ${deltaT.toFixed(2)} °C`,
        `Total Heat Energy Q = ${Q.toLocaleString(undefined, { maximumFractionDigits: 1 })} J = ${(Q / 1000).toFixed(2)} kJ`,
        `Calorie conversion: Q = ${(Q / 4.184).toFixed(0)} cal = ${(Q / 4184).toFixed(2)} kcal`,
      ];
    } else if (mode === "solve_t") {
      // Q = m * c * (T_final - T_initial) => T_final = T_initial + Q / (m * c)
      deltaT = qIn / (m * c);
      tFinal = t1 + deltaT;
      Q = qIn;
      steps = [
        `T_final = T_initial + Q / (m · c)`,
        `ΔT = ${qIn.toLocaleString()} J / (${m} kg × ${c} J/(kg·°C)) = ${deltaT.toFixed(2)} °C`,
        `T_final = ${t1}°C + ${deltaT.toFixed(2)}°C = ${tFinal.toFixed(2)} °C`,
      ];
    } else {
      // Solve specific heat
      deltaT = t2 - t1;
      computedC = deltaT !== 0 ? qIn / (m * deltaT) : 0;
      Q = qIn;
      steps = [
        `c = Q / (m · ΔT)`,
        `ΔT = ${t2}°C - ${t1}°C = ${deltaT.toFixed(2)} °C`,
        `c = ${qIn.toLocaleString()} J / (${m} kg × ${deltaT.toFixed(2)} °C) = ${computedC.toFixed(1)} J/(kg·°C)`,
      ];
    }

    const qKj = Math.abs(Q) / 1000;
    const qKcal = qKj / 4.184;
    const qBtu = qKj * 0.947817;

    return {
      hero: {
        label: mode === "solve_t" ? "Final Temperature" : "Thermal Energy Transfer (Q)",
        value: mode === "solve_t" ? `${tFinal.toFixed(2)} °C` : `${qKj.toFixed(2)} kJ`,
      },
      badge: {
        text: Q >= 0 ? "Endothermic (Heat Absorbed)" : "Exothermic (Heat Released)",
        tone: Q >= 0 ? "bad" : "info",
      },
      rows: [
        { label: "Heat Energy (Joules)", value: `${Math.round(Math.abs(Q)).toLocaleString()} J` },
        { label: "Heat Energy (Kilocalories)", value: `${qKcal.toFixed(2)} kcal` },
        { label: "Heat Energy (BTU)", value: `${qBtu.toFixed(2)} BTU` },
        { label: "Temperature Differential (ΔT)", value: `${deltaT.toFixed(2)} °C (${deltaT.toFixed(2)} K)` },
        { label: "Specific Heat Capacity (c)", value: `${mode === "solve_c" ? computedC.toFixed(1) : c} J/(kg·°C)` },
        { label: "Substance Mass (m)", value: `${m} kg (${(m * 1000).toLocaleString()} g)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Thermal Energy Scale Proportions",
        format: "num",
        data: [
          { name: "Sensible Heat Transfer", value: Number(qKj.toFixed(1)), color: "#f97316" },
          { name: "Reference Water 1kg ΔT=10°C (41.8 kJ)", value: 41.8, color: "#64748b" },
        ],
      },
    };
  },
};

export default function SpecificHeatCalculatorComponent() {
  return <CalcEngine config={specificHeatConfig} />;
}
