'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "pressure-calculator",
  title: "Mechanical & Hydrostatic Pressure Calculator",
  fields: [
    {
      kind: "number",
      key: "force",
      label: "Applied Force F (Newtons)",
      default: 4500,
      min: 0,
      max: 100000000,
      hint: "Perpendicular contact force (4,500 N ≈ 1,012 lbf)",
    },
    {
      kind: "number",
      key: "area",
      label: "Surface Contact Area A (m²)",
      default: 0.05,
      min: 0.0000001,
      max: 100000,
      hint: "Area over which force is distributed (0.05 m² = 500 cm² = 77.5 sq in)",
    },
    {
      kind: "number",
      key: "depth",
      label: "Fluid Submersion Depth h (Meters)",
      default: 10,
      min: 0,
      max: 11000,
      hint: "Depth below water surface (10m seawater ≈ 1 additional atmosphere of pressure)",
    },
    {
      kind: "number",
      key: "density",
      label: "Fluid Density ρ (kg/m³)",
      default: 1000,
      min: 1,
      max: 20000,
      hint: "Pure water = 1,000 kg/m³; Seawater = 1,025 kg/m³; Mercury = 13,546 kg/m³",
    },
  ],
  presets: [
    {
      label: "High-Pressure Hydraulic Cylinder (25 kN on 50 cm²)",
      values: { force: 25000, area: 0.005, depth: 0, density: 1000 },
    },
    {
      label: "Scuba Diver at 30m Ocean Depth",
      values: { force: 0, area: 1, depth: 30, density: 1025 },
    },
    {
      label: "Stiletto High-Heel Shoe on Floor (60 kg)",
      values: { force: 588, area: 0.00008, depth: 0, density: 1000 },
    },
  ],
  compute: (vals) => {
    const f = Math.max(0, Number(vals.force) || 0);
    const a = Math.max(0.0000001, Number(vals.area) || 0.01);
    const h = Math.max(0, Number(vals.depth) || 0);
    const rho = Math.max(1, Number(vals.density) || 1000);

    const pMechanicalPa = f / a;
    const pHydrostaticPa = rho * 9.80665 * h;
    const pAtmospherePa = 101325; // standard 1 atm
    const pTotalSubseaPa = pAtmospherePa + pHydrostaticPa;

    const pPa = pMechanicalPa > 0 ? pMechanicalPa : pTotalSubseaPa;
    const pKPa = pPa / 1000;
    const pBar = pPa / 100000;
    const pPsi = pPa * 0.000145038;
    const pAtm = pPa / 101325;
    const pTorr = pPa * 0.00750062;

    const baseAtmKPa = 101.325;
    const hydroKPa = Math.max(0.1, pHydrostaticPa / 1000);

    return {
      hero: {
        value: pKPa >= 1000 ? `${(pKPa / 1000).toFixed(2)} MPa` : `${pKPa.toFixed(1)} kPa`,
        label: `${pBar.toFixed(2)} bar | ${pPsi.toFixed(1)} psi | ${pAtm.toFixed(2)} atm | ${pTorr.toFixed(0)} mmHg/Torr`,
      },
      badge: {
        text: `${pPsi.toFixed(1)} psi Pressure`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Subsea Pressure Breakdown (kPa)",
        data: [
          { name: `Atmospheric Baseline (${baseAtmKPa.toFixed(1)} kPa)`, value: baseAtmKPa, color: "#3b82f6" },
          { name: `Hydrostatic Gauge (${hydroKPa.toFixed(1)} kPa)`, value: Number(hydroKPa.toFixed(1)), color: "#10b981" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Calculated Pressure (P = F/A)", value: `${pKPa.toFixed(2)} kPa (${pBar.toFixed(3)} bar)` },
        { label: "Imperial Pressure (Pounds per Square Inch)", value: `${pPsi.toFixed(2)} psi (lbf/in²)` },
        { label: "Standard Atmospheres (atm)", value: `${pAtm.toFixed(3)} atm (1 atm = 101,325 Pa)` },
        { label: "Barometric Mercury Column", value: `${pTorr.toFixed(1)} mmHg / Torr` },
        { label: "Hydrostatic Gauge Pressure (ρ·g·h)", value: `${(pHydrostaticPa / 1000).toFixed(2)} kPa (${(pHydrostaticPa / 100000).toFixed(3)} bar at ${h}m depth)` },
        { label: "Total Absolute Underwater Pressure", value: `${(pTotalSubseaPa / 1000).toFixed(2)} kPa (${(pTotalSubseaPa / 101325).toFixed(2)} atm)` },
      ],
      steps: [
        `Divide perpendicular force by contact area: P = F ÷ A = ${f.toLocaleString()} N ÷ ${a.toFixed(5)} m² = ${pMechanicalPa.toLocaleString(undefined, { maximumFractionDigits: 1 })} Pascals.`,
        `Calculate hydrostatic fluid pressure: P_hydro = ρ × g × h = ${rho} kg/m³ × 9.807 m/s² × ${h.toFixed(1)} m = ${pHydrostaticPa.toFixed(1)} Pa.`,
        `Convert to standard engineering bar: ${pPa.toFixed(0)} Pa ÷ 100,000 = ${pBar.toFixed(3)} bar.`,
        `Convert to imperial psi: ${pPa.toFixed(0)} Pa × 0.000145038 = ${pPsi.toFixed(2)} psi.`,
      ],
      note: { text: "Pressure is compressive scalar force distributed over area (P = F/A). Sharp cutting edges and stiletto heels generate colossal pressures by drastically reducing contact area A." },
    };
  },
};

export default function PressureCalculator() {
  return <CalcEngine config={config} />;
}
