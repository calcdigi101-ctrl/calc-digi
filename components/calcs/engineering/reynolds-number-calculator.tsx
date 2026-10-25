"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "reynolds-number-calc",
  title: "Reynolds Number & Flow Regime Calculator (Laminar vs. Turbulent)",
  presets: [
    { label: "Water in Domestic Pipe (DN25 / 1\", 1.5 m/s, 20°C)", values: { fluid: "water20", velocity: 1.5, diameterMm: 25, density: 998, viscosity: 0.001002 } },
    { label: "Hydraulic Engine Oil (15mm Pipe, 2.0 m/s, ISO 46)", values: { fluid: "oil46", velocity: 2.0, diameterMm: 15, density: 870, viscosity: 0.040 } },
    { label: "HVAC Air Duct (300mm Round Duct, 4.0 m/s Air)", values: { fluid: "air20", velocity: 4.0, diameterMm: 300, density: 1.204, viscosity: 0.0000181 } },
    { label: "Blood Circulation in Human Aorta (25mm, 0.4 m/s)", values: { fluid: "blood", velocity: 0.4, diameterMm: 25, density: 1060, viscosity: 0.0035 } },
    { label: "Microfluidic Lab Chip (100 µm Channel, 0.05 m/s)", values: { fluid: "custom", velocity: 0.05, diameterMm: 0.1, density: 1000, viscosity: 0.001 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "fluid",
      label: "Working Fluid Preset",
      default: "water20",
      options: [
        { value: "water20", label: "Water @ 20°C (ρ = 998 kg/m³, μ = 1.002 × 10⁻³ Pa·s)" },
        { value: "air20", label: "Air @ 20°C (ρ = 1.204 kg/m³, μ = 1.81 × 10⁻⁵ Pa·s)" },
        { value: "oil46", label: "Hydraulic Oil ISO 46 @ 40°C (ρ = 870 kg/m³, μ = 0.040 Pa·s)" },
        { value: "blood", label: "Whole Human Blood @ 37°C (ρ = 1,060 kg/m³, μ = 0.0035 Pa·s)" },
        { value: "custom", label: "Custom Fluid Properties (Manual Density & Viscosity)" },
      ],
    },
    {
      kind: "number",
      key: "velocity",
      label: "Mean Flow Velocity v (m/s)",
      default: 1.5,
      min: 0.0001,
      max: 1000,
      hint: "Average velocity of fluid across cross-sectional bore in meters per second",
    },
    {
      kind: "number",
      key: "diameterMm",
      label: "Internal Pipe Diameter / Characteristic Length D (mm)",
      default: 25,
      min: 0.01,
      max: 50000,
      hint: "Internal hydraulic diameter in millimeters (e.g., 25 mm = 0.025 m)",
    },
    {
      kind: "number",
      key: "density",
      label: "Fluid Density ρ (kg/m³)",
      default: 998,
      min: 0.01,
      max: 20000,
      hint: "Mass density in kilograms per cubic meter (e.g. 998 for water, 1.2 for air)",
    },
    {
      kind: "number",
      key: "viscosity",
      label: "Dynamic Viscosity μ (Pa·s or N·s/m²)",
      default: 0.001002,
      min: 0.000001,
      max: 1000,
      hint: "Dynamic fluid shear resistance (e.g., 0.001002 Pa·s for water at 20°C)",
    },
  ],
  compute(values) {
    const fluidPreset = String(values.fluid || "water20");
    const v = Number(values.velocity);
    const dMm = Number(values.diameterMm);
    let rho = Number(values.density);
    let mu = Number(values.viscosity);

    // Apply preset overrides if not custom
    if (fluidPreset === "water20") {
      rho = 998.2; mu = 0.001002;
    } else if (fluidPreset === "air20") {
      rho = 1.204; mu = 0.0000181;
    } else if (fluidPreset === "oil46") {
      rho = 870; mu = 0.040;
    } else if (fluidPreset === "blood") {
      rho = 1060; mu = 0.0035;
    }

    if (isNaN(v) || v <= 0) return { error: "Please enter a valid flow velocity greater than 0 m/s." };
    if (isNaN(dMm) || dMm <= 0) return { error: "Please enter a valid diameter greater than 0 mm." };
    if (isNaN(rho) || rho <= 0) return { error: "Please enter a valid fluid density." };
    if (isNaN(mu) || mu <= 0) return { error: "Please enter a valid dynamic viscosity." };

    const D = dMm / 1000; // meters
    // Kinematic viscosity nu = mu / rho (m²/s)
    const nu = mu / rho;

    // Reynolds Number: Re = (rho * v * D) / mu = (v * D) / nu
    const Re = (rho * v * D) / mu;

    let regimeLabel = "Laminar Flow";
    let regimeTone: "good" | "info" | "warn" = "good";
    let physicalBehavior = "Viscous forces dominate; smooth parallel streamlines without mixing.";
    let entranceLengthM = 0;

    if (Re < 2300) {
      regimeLabel = "Laminar Flow (Re < 2,300)";
      regimeTone = "info";
      physicalBehavior = "Smooth streamline laminar flow; pressure drop is directly linear with velocity (Hagen-Poiseuille law).";
      // Entrance length laminar: Le ~ 0.06 * Re * D
      entranceLengthM = 0.06 * Re * D;
    } else if (Re <= 4000) {
      regimeLabel = "Transitional Flow (2,300 ≤ Re ≤ 4,000)";
      regimeTone = "warn";
      physicalBehavior = "Critical transition zone; flow fluctuates unpredictably between laminar and turbulent bursts.";
      entranceLengthM = 0.06 * 2300 * D;
    } else {
      regimeLabel = "Fully Turbulent Flow (Re > 4,000)";
      regimeTone = "good";
      physicalBehavior = "Inertial forces dominate; chaotic swirling eddies and high radial momentum transfer (Darcy-Weisbach friction).";
      // Entrance length turbulent: Le ~ 4.4 * Re^(1/6) * D
      entranceLengthM = 4.4 * Math.pow(Re, 1 / 6) * D;
    }

    const steps = [
      `1. Kinematic Viscosity: ν = μ ÷ ρ = ${mu.toExponential(3)} Pa·s ÷ ${rho.toFixed(1)} kg/m³ = ${nu.toExponential(4)} m²/s`,
      `2. Characteristic Hydraulic Bore: D = ${dMm} mm = ${D.toFixed(4)} meters`,
      `3. Inertial to Viscous Ratio (Reynolds Formula): Re = (ρ·v·D) ÷ μ = (${rho.toFixed(1)} × ${v.toFixed(3)} × ${D.toFixed(4)}) ÷ ${mu.toExponential(3)} = ${Math.round(Re).toLocaleString()}`,
      `4. Hydrodynamic Regime Classification: ${regimeLabel} (${physicalBehavior})`,
      `5. Fully Developed Entrance Length: L_e ≈ ${entranceLengthM >= 1 ? `${entranceLengthM.toFixed(2)} meters` : `${(entranceLengthM * 100).toFixed(1)} cm`} from pipe entry`,
    ];

    return {
      hero: {
        label: "Reynolds Number (Re)",
        value: `${Math.round(Re).toLocaleString()}`,
        unit: `Dimensionless Ratio`,
      },
      badge: {
        text: regimeLabel.split("(")[0].trim(),
        tone: regimeTone,
      },
      rows: [
        { label: "Reynolds Number (Re)", value: `${Math.round(Re).toLocaleString()}`, strong: true },
        { label: "Flow Regime Classification", value: regimeLabel, strong: true },
        { label: "Kinematic Viscosity (ν)", value: `${nu.toExponential(4)} m²/s (${(nu * 10000).toFixed(4)} St)` },
        { label: "Fluid Density (ρ)", value: `${rho.toFixed(1)} kg/m³` },
        { label: "Dynamic Viscosity (μ)", value: `${mu.toExponential(3)} Pa·s (${(mu * 1000).toFixed(2)} cP)` },
        { label: "Characteristic Diameter", value: `${dMm} mm (${(dMm / 25.4).toFixed(3)} in)` },
        { label: "Hydraulic Entrance Length", value: `${entranceLengthM.toFixed(2)} m (${(entranceLengthM * 3.28084).toFixed(2)} ft)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Reynolds Ratio vs. Critical Transition Boundary (Re 2,300)",
        data: [
          { name: `Calculated Re (${Math.round(Re)})`, value: Math.max(1, Math.round(Re)), color: Re > 2300 ? "#3b82f6" : "#10b981" },
          { name: "Laminar Ceiling (2,300)", value: 2300, color: "#94a3b8" },
        ],
      },
      note: {
        text: "In round closed pipes, flow is laminar below Re 2,300 and fully turbulent above Re 4,000. In non-circular ducts (rectangular HVAC channels), substitute hydraulic diameter D_h = 4A / P.",
        tone: "neutral",
      },
    };
  },
};

export default function ReynoldsNumberCalculator() {
  return <CalcEngine config={config} />;
}
