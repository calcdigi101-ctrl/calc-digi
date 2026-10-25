"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "pipe-flow-calc",
  title: "Pipe Flow, Velocity & Friction Head Loss Calculator",
  presets: [
    { label: "Commercial Water Supply (DN50 / 2\" Pipe, 1.8 m/s)", values: { diameterMm: 50, velocity: 1.8, lengthM: 60, material: "pvc" } },
    { label: "Municipal Main Distribution (DN150 / 6\" Ductile, 2.0 m/s)", values: { diameterMm: 150, velocity: 2.0, lengthM: 250, material: "cast_iron" } },
    { label: "Hydronic HVAC Chilled Water (DN80 / 3\" Steel, 1.5 m/s)", values: { diameterMm: 80, velocity: 1.5, lengthM: 80, material: "steel" } },
    { label: "Residential Domestic Water (DN20 / 3/4\" Copper, 1.2 m/s)", values: { diameterMm: 20, velocity: 1.2, lengthM: 25, material: "copper" } },
    { label: "Industrial Process Line (DN100 / 4\" Schedule 40, 2.5 m/s)", values: { diameterMm: 100, velocity: 2.5, lengthM: 120, material: "steel" } },
  ],
  fields: [
    {
      kind: "number",
      key: "diameterMm",
      label: "Internal Pipe Diameter (mm)",
      default: 50,
      min: 5,
      max: 2000,
      hint: "Inside bore diameter in millimeters (e.g., 50 mm for 2-inch pipe)",
    },
    {
      kind: "number",
      key: "velocity",
      label: "Design Fluid Velocity (m/s)",
      default: 1.8,
      min: 0.1,
      max: 15,
      hint: "Flow velocity (industry recommended range: 1.0 to 2.4 m/s to prevent water hammer and silt deposition)",
    },
    {
      kind: "number",
      key: "lengthM",
      label: "Pipe Run Length (meters)",
      default: 60,
      min: 1,
      max: 50000,
      hint: "Total linear length of pipe run including equivalent length of valves and fittings",
    },
    {
      kind: "choice",
      key: "material",
      label: "Pipe Material & Surface Roughness",
      default: "pvc",
      options: [
        { value: "pvc", label: "Smooth Plastic / PVC / PEX (Darcy f ≈ 0.015)" },
        { value: "copper", label: "Drawn Copper / Brass Tube (Darcy f ≈ 0.017)" },
        { value: "steel", label: "Commercial Carbon Steel / Sch 40 (Darcy f ≈ 0.022)" },
        { value: "cast_iron", label: "Ductile / Cast Iron Pipe (Darcy f ≈ 0.030)" },
      ],
    },
  ],
  compute(values) {
    const dMm = Number(values.diameterMm);
    const v = Number(values.velocity);
    const L = Number(values.lengthM);
    const mat = String(values.material || "pvc");

    if (isNaN(dMm) || dMm <= 0) return { error: "Please enter a valid internal diameter greater than 0 mm." };
    if (isNaN(v) || v <= 0) return { error: "Please enter a valid fluid velocity greater than 0 m/s." };
    if (isNaN(L) || L <= 0) return { error: "Please enter a valid pipe length." };

    const D = dMm / 1000; // meters
    const areaM2 = (Math.PI * D * D) / 4; // m²

    // Volumetric flow rate Q = A * v (m³/s)
    const Q_m3s = areaM2 * v;
    const Q_Lps = Q_m3s * 1000; // liters per second
    const Q_Lpm = Q_Lps * 60; // liters per minute
    const Q_m3h = Q_m3s * 3600; // cubic meters per hour
    const Q_GPM = Q_Lpm * 0.264172; // US Gallons Per Minute

    // Friction factor f
    let f = 0.018;
    let matName = "PVC";
    if (mat === "pvc") { f = 0.015; matName = "PVC / PEX"; }
    else if (mat === "copper") { f = 0.017; matName = "Copper"; }
    else if (mat === "steel") { f = 0.022; matName = "Carbon Steel"; }
    else if (mat === "cast_iron") { f = 0.030; matName = "Cast Iron"; }

    // Darcy-Weisbach head loss: h_f = f * (L / D) * (v² / 2g)
    const g = 9.80665;
    const h_f = f * (L / D) * ((v * v) / (2 * g)); // meters of water column
    const h_f_ft = h_f * 3.28084;

    // Pressure drop: ΔP = ρ * g * h_f (for water ρ = 1000 kg/m³)
    const deltaP_kPa = (1000 * g * h_f) / 1000;
    const deltaP_psi = deltaP_kPa * 0.145038;
    const deltaP_bar = deltaP_kPa / 100;

    let velocityStatus = "Optimal Flow Range";
    let velocityTone: "good" | "info" | "warn" = "good";

    if (v < 0.8) {
      velocityStatus = "Low Velocity (Sediment Settling Risk)";
      velocityTone = "info";
    } else if (v <= 2.4) {
      velocityStatus = "Ideal Operating Velocity (ASHRAE / ASPE)";
      velocityTone = "good";
    } else {
      velocityStatus = "High Velocity (Noise / Erosion Risk)";
      velocityTone = "warn";
    }

    const steps = [
      `1. Cross-Sectional Bore Area: A = π·D² / 4 = π·(${dMm} mm)² / 4 = ${(areaM2 * 10000).toFixed(2)} cm² (${areaM2.toFixed(6)} m²)`,
      `2. Volumetric Flow Rate: Q = A × v = ${areaM2.toFixed(6)} m² × ${v.toFixed(2)} m/s = ${Q_Lps.toFixed(2)} L/s (${Q_m3h.toFixed(2)} m³/hr | ${Q_GPM.toFixed(1)} GPM)`,
      `3. Darcy-Weisbach Friction Head Loss: h_f = f · (L/D) · (v²/2g) = ${f} × (${L}m / ${D.toFixed(3)}m) × (${(v * v).toFixed(2)} / 19.61) = ${h_f.toFixed(2)} meters (${h_f_ft.toFixed(2)} ft)`,
      `4. Total Pressure Drop: ΔP = ρ·g·h_f = 9.81 × ${h_f.toFixed(2)} m = ${deltaP_kPa.toFixed(1)} kPa (${deltaP_psi.toFixed(2)} psi | ${deltaP_bar.toFixed(3)} bar)`,
      `5. Hydraulic Assessment: ${velocityStatus}`,
    ];

    return {
      hero: {
        label: "Discharge Flow Rate (Q)",
        value: `${Q_Lps.toFixed(2)} L/s`,
        unit: `${Q_m3h.toFixed(1)} m³/h (${Q_GPM.toFixed(0)} GPM)`,
      },
      badge: {
        text: velocityStatus,
        tone: velocityTone,
      },
      rows: [
        { label: "Volumetric Flow Rate (Metric)", value: `${Q_Lps.toFixed(2)} L/s (${Q_m3h.toFixed(2)} m³/hr)`, strong: true },
        { label: "Discharge Volume (Imperial)", value: `${Q_GPM.toFixed(1)} GPM (${(Q_m3h * 4.40287).toFixed(1)} gpm)`, strong: true },
        { label: "Friction Head Loss (h_f)", value: `${h_f.toFixed(2)} meters head (${h_f_ft.toFixed(2)} ft)`, strong: true },
        { label: "Pressure Loss (ΔP)", value: `${deltaP_kPa.toFixed(1)} kPa (${deltaP_psi.toFixed(2)} psi | ${deltaP_bar.toFixed(3)} bar)` },
        { label: "Internal Bore Diameter", value: `${dMm} mm (${(dMm / 25.4).toFixed(2)} inches)` },
        { label: "Fluid Mean Velocity", value: `${v.toFixed(2)} m/s (${(v * 3.28084).toFixed(2)} ft/s)` },
        { label: "Friction Factor (f)", value: `${f} (${matName})` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Discharge Flow Composition (L/min vs GPM)",
        data: [
          { name: `Flow (L/min: ${Math.round(Q_Lpm)})`, value: Math.max(0.1, Q_Lpm), color: "#06b6d4" },
          { name: `Imperial Equivalent (${Math.round(Q_GPM)} GPM)`, value: Math.max(0.1, Q_GPM), color: "#3b82f6" },
        ],
      },
      note: {
        text: "Calculated via the Darcy-Weisbach equation for clean water at 20°C (density 1,000 kg/m³). In complex piping systems, add equivalent lengths for 90° elbows, tees, and check valves to L.",
        tone: "neutral",
      },
    };
  },
};

export default function PipeFlowCalculator() {
  return <CalcEngine config={config} />;
}
