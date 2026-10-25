"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "density-calculator",
  title: "Material Density, Specific Gravity & Volume Displacement Calculator",
  fields: [
    {
      kind: "number",
      key: "mass",
      label: "Sample Mass (grams)",
      default: 500.0,
      min: 0.001,
      max: 10000000
    },
    {
      kind: "number",
      key: "volume",
      label: "Displaced Volume (cm³ or mL)",
      default: 185.0,
      min: 0.001,
      max: 10000000
    },
    {
      kind: "choice",
      key: "referenceFluid",
      label: "Immersion Fluid Environment",
      default: "water",
      options: [
        { label: "Pure Water (4°C, 1.000 g/cm³)", value: "water" },
        { label: "Seawater (20°C, 1.025 g/cm³)", value: "seawater" },
        { label: "Ethanol (20°C, 0.789 g/cm³)", value: "ethanol" },
        { label: "Glycerol (20°C, 1.261 g/cm³)", value: "glycerol" },
        { label: "Mercury (20°C, 13.546 g/cm³)", value: "mercury" }
      ]
    }
  ],
  presets: [
    {
      label: "Aluminum Solid (ρ ≈ 2.70 g/cm³)",
      values: { mass: 270.0, volume: 100.0, referenceFluid: "water" }
    },
    {
      label: "Steel Alloy (ρ ≈ 7.85 g/cm³)",
      values: { mass: 785.0, volume: 100.0, referenceFluid: "water" }
    },
    {
      label: "Pure Gold Bar (ρ ≈ 19.32 g/cm³)",
      values: { mass: 1000.0, volume: 51.76, referenceFluid: "water" }
    },
    {
      label: "Oak Wood Floating (ρ ≈ 0.75 g/cm³)",
      values: { mass: 75.0, volume: 100.0, referenceFluid: "water" }
    }
  ],
  compute: (vals) => {
    const m = Math.max(0.0001, Number(vals.mass) || 1.0);
    const v = Math.max(0.0001, Number(vals.volume) || 1.0);
    const fluid = String(vals.referenceFluid || "water");

    const fluidRhoMap: Record<string, number> = {
      water: 1.000,
      seawater: 1.025,
      ethanol: 0.789,
      glycerol: 1.261,
      mercury: 13.546
    };
    const rho_fluid = fluidRhoMap[fluid] || 1.000;

    const rho_g_cm3 = m / v;
    const rho_kg_m3 = rho_g_cm3 * 1000;
    const rho_lb_ft3 = rho_g_cm3 * 62.42796;
    const sg = rho_g_cm3 / 1.000;

    const vol_m3 = v * 1e-6;
    const rho_fluid_kg_m3 = rho_fluid * 1000;
    const g = 9.80665;
    const buoyantForce_N = rho_fluid_kg_m3 * vol_m3 * g;
    const objectWeight_N = (m / 1000) * g;
    const netForce_N = objectWeight_N - buoyantForce_N;

    const willFloat = rho_g_cm3 < rho_fluid;
    const submergedFraction = willFloat ? (rho_g_cm3 / rho_fluid) * 100 : 100.0;

    return {
      hero: {
        value: `${rho_g_cm3.toFixed(3)} g/cm³`,
        label: `Calculated Material Density (${rho_kg_m3.toFixed(1)} kg/m³)`
      },
      badge: {
        text: willFloat ? `Floats in ${fluid} (${submergedFraction.toFixed(1)}% Submerged)` : `Sinks in ${fluid} (SG = ${sg.toFixed(2)})`,
        tone: willFloat ? "good" : "info"
      },
      rows: [
        { label: "Specific Gravity (vs Water 4°C)", value: sg.toFixed(4) },
        { label: "Density in Imperial Units", value: `${rho_lb_ft3.toFixed(2)} lb/ft³` },
        { label: "Buoyant Status in Fluid", value: willFloat ? `Floats (${submergedFraction.toFixed(1)}% submerged)` : "Sinks to bottom" },
        { label: "Buoyant Lift Force (Fb)", value: `${buoyantForce_N.toFixed(4)} Newtons` },
        { label: "Dry Gravitational Weight (Fg)", value: `${objectWeight_N.toFixed(4)} Newtons` },
        { label: "Net Submerged Force", value: `${Math.abs(netForce_N).toFixed(4)} N (${willFloat ? "upward net" : "downward net"})` },
        { label: "Displaced Fluid Mass", value: `${(v * rho_fluid).toFixed(2)} grams` }
      ],
      steps: [
        `1. Density formula: ρ = mass / volume = ${m.toFixed(2)} g / ${v.toFixed(2)} cm³ = ${rho_g_cm3.toFixed(3)} g/cm³.`,
        `2. SI density conversion: ${rho_g_cm3.toFixed(3)} g/cm³ × 1,000 = ${rho_kg_m3.toFixed(1)} kg/m³.`,
        `3. Specific gravity: SG = ρ_sample / ρ_H2O = ${rho_g_cm3.toFixed(3)} / 1.000 = ${sg.toFixed(4)}.`,
        `4. Archimedes Buoyant Force: Fb = ρ_fluid · V · g = ${rho_fluid.toFixed(3)} g/cm³ × ${v.toFixed(2)} cm³ × g = ${buoyantForce_N.toFixed(4)} N.`
      ],
      chart: {
        type: "donut",
        title: "Density Benchmark Comparison (g/cm³)",
        data: [
          { name: "Sample Density", value: Math.max(1, Math.round(rho_g_cm3 * 10)), color: "#7c3aed" },
          { name: "Fluid Medium Density", value: Math.max(1, Math.round(rho_fluid * 10)), color: "#06b6d4" },
          { name: "Water Standard (1.0)", value: 10, color: "#3b82f6" },
          { name: "Aluminum Ref (2.7)", value: 27, color: "#94a3b8" }
        ],
        format: "plain"
      }
    };
  }
};

export default function DensityCalculatorComponent() {
  return <CalcEngine config={config} />;
}
