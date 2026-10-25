"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "concrete-mix-calc",
  title: "Concrete Mix & Batch Volume Calculator",
  presets: [
    { label: "Patio / Walkway Slab (4m × 3m × 100mm, M20)", values: { length: 4.0, width: 3.0, thicknessMm: 100, mixGrade: "m20", bagSize: "50", wastage: 10 } },
    { label: "Residential Driveway (8m × 4m × 150mm, M25)", values: { length: 8.0, width: 4.0, thicknessMm: 150, mixGrade: "m25", bagSize: "50", wastage: 10 } },
    { label: "Foundation Strip Footing (12m × 0.6m × 300mm)", values: { length: 12.0, width: 0.6, thicknessMm: 300, mixGrade: "m20", bagSize: "50", wastage: 12 } },
    { label: "Structural Columns / Beams (M25 1:1:2)", values: { length: 3.0, width: 1.2, thicknessMm: 400, mixGrade: "m25", bagSize: "50", wastage: 8 } },
    { label: "Lean Concrete / Sub-base (M15 1:2:4)", values: { length: 6.0, width: 5.0, thicknessMm: 75, mixGrade: "m15", bagSize: "40", wastage: 10 } },
  ],
  fields: [
    {
      kind: "number",
      key: "length",
      label: "Pour Length (meters)",
      default: 4.0,
      min: 0.1,
      max: 500,
      hint: "Length of the slab, footing, or pavement trench in meters",
    },
    {
      kind: "number",
      key: "width",
      label: "Pour Width (meters)",
      default: 3.0,
      min: 0.1,
      max: 500,
      hint: "Width of the formwork or trench in meters",
    },
    {
      kind: "number",
      key: "thicknessMm",
      label: "Thickness / Depth (millimeters)",
      default: 100,
      min: 25,
      max: 2000,
      hint: "Slab depth in millimeters (e.g. 100mm for walkways, 150mm for driveways)",
    },
    {
      kind: "choice",
      key: "mixGrade",
      label: "Concrete Strength Grade & Ratio",
      default: "m20",
      options: [
        { value: "m15", label: "M15 (1:2:4 – 15 MPa / 2,175 psi) Plain Sub-bases & Paths" },
        { value: "m20", label: "M20 (1:1.5:3 – 20 MPa / 2,900 psi) Standard Slabs & Driveways" },
        { value: "m25", label: "M25 (1:1:2 – 25 MPa / 3,625 psi) Heavy Foundations & Columns" },
      ],
    },
    {
      kind: "choice",
      key: "bagSize",
      label: "Pre-Packaged Cement Bag Size",
      default: "50",
      segmented: true,
      options: [
        { value: "50", label: "50 kg (Standard)" },
        { value: "40", label: "40 kg" },
        { value: "25", label: "25 kg (Retail)" },
      ],
    },
    {
      kind: "number",
      key: "wastage",
      label: "Safety & Spillage Allowance (%)",
      default: 10,
      min: 0,
      max: 30,
      hint: "Standard 10% allowance for sub-base irregularities and spillage",
    },
  ],
  compute(values) {
    const L = Number(values.length);
    const W = Number(values.width);
    const T_mm = Number(values.thicknessMm);
    const mixGrade = String(values.mixGrade || "m20");
    const bagKg = Number(values.bagSize) || 50;
    const wastePct = Number(values.wastage) || 0;

    if (isNaN(L) || L <= 0 || isNaN(W) || W <= 0 || isNaN(T_mm) || T_mm <= 0) {
      return { error: "Please enter positive dimensions for length, width, and thickness." };
    }

    const netVolM3 = L * W * (T_mm / 1000);
    const grossVolM3 = netVolM3 * (1 + wastePct / 100);
    const grossVolYd3 = grossVolM3 * 1.30795; // 1 m³ = 1.308 yd³

    // Dry volume conversion factor: wet concrete contracts by ~35% when water fills aggregate voids.
    // Standard civil engineering rule: Dry Volume = Wet Volume × 1.54
    const dryVolM3 = grossVolM3 * 1.54;

    // Ratios [Cement, Sand, Gravel]
    let cRatio = 1;
    let sRatio = 1.5;
    let gRatio = 3;
    let gradeLabel = "M20 (1:1.5:3)";

    if (mixGrade === "m15") {
      cRatio = 1;
      sRatio = 2;
      gRatio = 4;
      gradeLabel = "M15 (1:2:4)";
    } else if (mixGrade === "m25") {
      cRatio = 1;
      sRatio = 1;
      gRatio = 2;
      gradeLabel = "M25 (1:1:2)";
    }

    const totalParts = cRatio + sRatio + gRatio;

    // Cement volume in m³; standard density of Portland cement = 1440 kg/m³
    const cementVolM3 = (dryVolM3 * cRatio) / totalParts;
    const cementKg = cementVolM3 * 1440;
    const totalBags = Math.ceil(cementKg / bagKg);

    // Sand volume; bulk density ~ 1600 kg/m³
    const sandVolM3 = (dryVolM3 * sRatio) / totalParts;
    const sandKg = sandVolM3 * 1600;
    const sandTonnes = sandKg / 1000;

    // Coarse Aggregate (Gravel); bulk density ~ 1500 kg/m³
    const gravelVolM3 = (dryVolM3 * gRatio) / totalParts;
    const gravelKg = gravelVolM3 * 1500;
    const gravelTonnes = gravelKg / 1000;

    // Water requirement: Water-cement ratio ~ 0.50 (0.50 liters per kg of cement)
    const waterLiters = cementKg * 0.5;

    const steps = [
      `1. Net Wet Volume: ${L} m × ${W} m × ${(T_mm / 1000).toFixed(3)} m = ${netVolM3.toFixed(3)} m³`,
      `2. Factored Gross Volume (+${wastePct}% wastage): ${netVolM3.toFixed(3)} m³ × 1.${wastePct.toString().padStart(2, "0")} = ${grossVolM3.toFixed(3)} m³ (${grossVolYd3.toFixed(2)} cubic yards)`,
      `3. Dry Volume Factor (1.54×): ${grossVolM3.toFixed(3)} m³ × 1.54 = ${dryVolM3.toFixed(3)} m³ dry materials required`,
      `4. Mix Proportions (${gradeLabel}): Sum of parts = ${totalParts}. Cement = ${(cRatio / totalParts * 100).toFixed(1)}%, Sand = ${(sRatio / totalParts * 100).toFixed(1)}%, Gravel = ${(gRatio / totalParts * 100).toFixed(1)}%`,
      `5. Batch Requirements: Cement = ${Math.round(cementKg).toLocaleString()} kg (${totalBags} bags of ${bagKg}kg) | Sand = ${sandTonnes.toFixed(2)} tonnes | Gravel = ${gravelTonnes.toFixed(2)} tonnes | Water = ${Math.round(waterLiters)} L`,
    ];

    return {
      hero: {
        label: "Required Ready-Mix Volume",
        value: `${grossVolM3.toFixed(2)} m³`,
        unit: `${grossVolYd3.toFixed(2)} yd³`,
      },
      badge: {
        text: `${totalBags} Bags Cement (${bagKg}kg)`,
        tone: "good",
      },
      rows: [
        { label: "Gross Concrete Volume", value: `${grossVolM3.toFixed(3)} m³ (${grossVolYd3.toFixed(2)} cu yd)`, strong: true },
        { label: "Portland Cement Required", value: `${Math.round(cementKg).toLocaleString()} kg (${totalBags} × ${bagKg}kg bags)`, strong: true },
        { label: "Fine Aggregate (Sharp Sand)", value: `${sandTonnes.toFixed(2)} tonnes (${Math.round(sandKg).toLocaleString()} kg)` },
        { label: "Coarse Aggregate (Gravel/Stone)", value: `${gravelTonnes.toFixed(2)} tonnes (${Math.round(gravelKg).toLocaleString()} kg)` },
        { label: "Mixing Water (at 0.5 w/c)", value: `${Math.round(waterLiters)} liters (~${Math.round(waterLiters * 0.264172)} gal)` },
        { label: "Mix Formulation", value: gradeLabel },
        { label: "Surface Footprint", value: `${(L * W).toFixed(1)} m² (${(L * W * 10.7639).toFixed(1)} sq ft)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Dry Material Weight Breakdown (kg)",
        data: [
          { name: `Coarse Stone (${Math.round(gravelKg)} kg)`, value: Math.max(1, Math.round(gravelKg)), color: "#64748b" },
          { name: `Sharp Sand (${Math.round(sandKg)} kg)`, value: Math.max(1, Math.round(sandKg)), color: "#f59e0b" },
          { name: `Cement (${Math.round(cementKg)} kg)`, value: Math.max(1, Math.round(cementKg)), color: "#3b82f6" },
        ],
      },
      note: {
        text: "Dry mix ingredients contract by ~35% when wetted due to cement paste settling into granular aggregate voids. The 1.54 multiplier ensures true in-situ cured volume.",
        tone: "neutral",
      },
    };
  },
};

export default function ConcreteMixCalculator() {
  return <CalcEngine config={config} />;
}
