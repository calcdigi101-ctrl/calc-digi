"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "structural-steel-calc",
  title: "Structural Steel Column Sizing & Axial Buckling Calculator (AISC)",
  presets: [
    { label: "W8×31 Intermediate Column (3.5m, Pin-Pin, A992)", values: { section: "w8x31", lengthM: 3.5, steelGrade: "a992", axialLoad: 350, endRestraint: "pin_pin" } },
    { label: "W12×50 Heavy Building Column (4.5m, Fixed-Pin, A992)", values: { section: "w12x50", lengthM: 4.5, steelGrade: "a992", axialLoad: 800, endRestraint: "fixed_pin" } },
    { label: "HSS 100×100×6 Tubular Post (3.0m, Pin-Pin, A500)", values: { section: "hss100", lengthM: 3.0, steelGrade: "a500b", axialLoad: 180, endRestraint: "pin_pin" } },
    { label: "W16×67 Industrial Column (6.0m, Fixed-Fixed, A992)", values: { section: "w16x67", lengthM: 6.0, steelGrade: "a992", axialLoad: 1200, endRestraint: "fixed_fixed" } },
    { label: "L100×100×10 Angle Bracing Strut (2.2m, Pin-Pin, A36)", values: { section: "angle100", lengthM: 2.2, steelGrade: "a36", axialLoad: 85, endRestraint: "pin_pin" } },
  ],
  fields: [
    {
      kind: "choice",
      key: "section",
      label: "Standard AISC Section Shape",
      default: "w8x31",
      options: [
        { value: "w8x31", label: "W8×31 Wide Flange (A=58.7 cm², r_min=5.13 cm, 46.1 kg/m)" },
        { value: "w12x50", label: "W12×50 Wide Flange (A=94.2 cm², r_min=4.98 cm, 74.4 kg/m)" },
        { value: "w16x67", label: "W16×67 Wide Flange (A=127.0 cm², r_min=6.25 cm, 99.7 kg/m)" },
        { value: "hss100", label: "HSS 100×100×6 Hollow Structural Tube (A=22.3 cm², r=3.86 cm, 17.5 kg/m)" },
        { value: "angle100", label: "L 100×100×10 Equal Leg Angle (A=19.2 cm², r=1.95 cm, 15.1 kg/m)" },
      ],
    },
    {
      kind: "number",
      key: "lengthM",
      label: "Unbraced Column Height L (meters)",
      default: 3.5,
      min: 0.5,
      max: 30,
      hint: "Unsupported length between lateral structural floor diaphragms",
    },
    {
      kind: "choice",
      key: "steelGrade",
      label: "Structural Steel ASTM Grade",
      default: "a992",
      segmented: true,
      options: [
        { value: "a992", label: "A992 / Gr 50 (Fy = 345 MPa / 50 ksi)" },
        { value: "a36", label: "A36 Carbon (Fy = 250 MPa / 36 ksi)" },
        { value: "a500b", label: "A500 Gr B (Fy = 317 MPa / 46 ksi)" },
      ],
    },
    {
      kind: "number",
      key: "axialLoad",
      label: "Applied Compressive Axial Force (kN)",
      default: 350,
      min: 1,
      max: 20000,
      hint: "Factored design axial gravity compressive load in kilonewtons",
    },
    {
      kind: "choice",
      key: "endRestraint",
      label: "End Restraint Boundary Condition (Effective K-Factor)",
      default: "pin_pin",
      options: [
        { value: "pin_pin", label: "Pinned–Pinned: Both ends free to rotate (K = 1.0)" },
        { value: "fixed_pin", label: "Fixed–Pinned: One fixed base, one pinned top (K = 0.70)" },
        { value: "fixed_fixed", label: "Fixed–Fixed: Both ends rigidly restrained (K = 0.50)" },
        { value: "cantilever", label: "Fixed–Free: Flagpole cantilever column (K = 2.0)" },
      ],
    },
  ],
  compute(values) {
    const secKey = String(values.section || "w8x31");
    const L = Number(values.lengthM);
    const grade = String(values.steelGrade || "a992");
    const P_applied_kN = Number(values.axialLoad);
    const endKey = String(values.endRestraint || "pin_pin");

    if (isNaN(L) || L <= 0) return { error: "Please enter a valid column length." };
    if (isNaN(P_applied_kN) || P_applied_kN <= 0) return { error: "Please enter a valid compressive load." };

    // Section geometric properties [Area (cm²), r_min (cm), wt (kg/m)]
    let A_cm2 = 58.7;
    let r_min_cm = 5.13;
    let massPerM = 46.1;
    let secName = "W8×31";

    if (secKey === "w12x50") {
      A_cm2 = 94.2; r_min_cm = 4.98; massPerM = 74.4; secName = "W12×50";
    } else if (secKey === "w16x67") {
      A_cm2 = 127.0; r_min_cm = 6.25; massPerM = 99.7; secName = "W16×67";
    } else if (secKey === "hss100") {
      A_cm2 = 22.3; r_min_cm = 3.86; massPerM = 17.5; secName = "HSS 100×100×6";
    } else if (secKey === "angle100") {
      A_cm2 = 19.2; r_min_cm = 1.95; massPerM = 15.1; secName = "L 100×100×10";
    }

    // Material properties
    let Fy_MPa = 345; // A992
    if (grade === "a36") Fy_MPa = 250;
    else if (grade === "a500b") Fy_MPa = 317;

    const E_MPa = 200000; // 200 GPa

    // K factor
    let K = 1.0;
    if (endKey === "fixed_pin") K = 0.70;
    else if (endKey === "fixed_fixed") K = 0.50;
    else if (endKey === "cantilever") K = 2.0;

    // Slenderness ratio KL/r
    const L_cm = L * 100;
    const slenderness = (K * L_cm) / r_min_cm;

    // Euler critical elastic buckling stress: Fe = (pi^2 * E) / (KL/r)^2
    const Fe_MPa = (Math.PI * Math.PI * E_MPa) / (slenderness * slenderness);

    // AISC 360-16 Column Equation:
    // If KL/r <= 4.71 * sqrt(E / Fy) -> Inelastic buckling: Fcr = [0.658^(Fy/Fe)] * Fy
    // Else -> Elastic Euler buckling: Fcr = 0.877 * Fe
    const transitionSlenderness = 4.71 * Math.sqrt(E_MPa / Fy_MPa);
    let Fcr_MPa = 0;

    if (slenderness <= transitionSlenderness) {
      Fcr_MPa = Math.pow(0.658, Fy_MPa / Fe_MPa) * Fy_MPa;
    } else {
      Fcr_MPa = 0.877 * Fe_MPa;
    }

    // Nominal axial compressive strength: Pn = Fcr * Ag (in Newtons)
    const Ag_mm2 = A_cm2 * 100; // cm² to mm²
    const Pn_N = Fcr_MPa * Ag_mm2;
    const Pn_kN = Pn_N / 1000;

    // ASD Safety Factor Omega = 1.67 -> Allowable Pa = Pn / 1.67
    const P_allow_ASD_kN = Pn_kN / 1.67;
    // LRFD Resistance Factor Phi = 0.90 -> Design Pu = 0.90 * Pn
    const P_design_LRFD_kN = Pn_kN * 0.90;

    // Capacity utilization ratio
    const utilRatio = (P_applied_kN / P_allow_ASD_kN) * 100;
    const totalMemberWeightKg = massPerM * L;

    let columnStatus = "Structurally Adequate (ASD Pass)";
    let columnTone: "good" | "info" | "warn" = "good";

    if (slenderness > 200) {
      columnStatus = "AISC Slenderness Limit Exceeded (KL/r > 200)";
      columnTone = "warn";
    } else if (utilRatio > 100) {
      columnStatus = "Overloaded (Compressive Buckling Failure)";
      columnTone = "warn";
    } else if (utilRatio > 85) {
      columnStatus = "Heavy Utilization (> 85% ASD Capacity)";
      columnTone = "info";
    } else {
      columnStatus = "Conservative Safe Design (< 85% Load)";
      columnTone = "good";
    }

    const steps = [
      `1. Slenderness Ratio: KL/r = (${K} × ${L_cm} cm) ÷ ${r_min_cm} cm = ${slenderness.toFixed(1)} (AISC maximum allowable limit is 200)`,
      `2. Euler Elastic Buckling Stress: F_e = π²·E / (KL/r)² = (π² × 200,000 MPa) ÷ (${slenderness.toFixed(1)})² = ${Fe_MPa.toFixed(1)} MPa`,
      `3. Critical Compressive Stress (AISC 360): F_cr = ${Fcr_MPa.toFixed(1)} MPa (${slenderness <= transitionSlenderness ? "Inelastic regime" : "Elastic Euler regime"})`,
      `4. Nominal Column Strength: P_n = F_cr × A_g = ${Fcr_MPa.toFixed(1)} MPa × ${Ag_mm2.toLocaleString()} mm² = ${Pn_kN.toFixed(1)} kN`,
      `5. Allowable Design Capacity (ASD Ω=1.67): P_allow = ${P_allow_ASD_kN.toFixed(1)} kN (${(P_allow_ASD_kN * 0.224809).toFixed(1)} kips) → Applied ${P_applied_kN} kN is ${utilRatio.toFixed(1)}% loaded (${columnStatus})`,
    ];

    return {
      hero: {
        label: "Allowable Axial Capacity (ASD)",
        value: `${Math.round(P_allow_ASD_kN).toLocaleString()} kN`,
        unit: `${(P_allow_ASD_kN * 0.224809).toFixed(0)} kips`,
      },
      badge: {
        text: `KL/r = ${slenderness.toFixed(1)} (${columnStatus})`,
        tone: columnTone,
      },
      rows: [
        { label: "ASD Allowable Capacity (Ω=1.67)", value: `${P_allow_ASD_kN.toFixed(1)} kN (${(P_allow_ASD_kN * 0.224809).toFixed(1)} kips)`, strong: true },
        { label: "LRFD Design Strength (φ=0.90)", value: `${P_design_LRFD_kN.toFixed(1)} kN (${(P_design_LRFD_kN * 0.224809).toFixed(1)} kips)`, strong: true },
        { label: "Stress Utilization Ratio", value: `${utilRatio.toFixed(1)}% of allowable ASD load`, strong: true },
        { label: "Effective Slenderness (KL/r)", value: `${slenderness.toFixed(1)} (AISC limit: 200)` },
        { label: "Critical Buckling Stress (Fcr)", value: `${Fcr_MPa.toFixed(1)} MPa (${(Fcr_MPa * 0.145038).toFixed(1)} ksi)` },
        { label: "Section Self-Weight", value: `${totalMemberWeightKg.toFixed(1)} kg (${(totalMemberWeightKg * 2.20462).toFixed(1)} lbs)` },
        { label: "Profile Specification", value: `${secName} (${grade.toUpperCase()})` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Applied Load vs. Allowable Capacity (kN)",
        data: [
          { name: `Applied Force (${Math.round(P_applied_kN)} kN)`, value: Math.max(1, Math.round(P_applied_kN)), color: utilRatio <= 100 ? "#3b82f6" : "#ef4444" },
          { name: `Unused Reserve Margin`, value: Math.max(0, Math.round(P_allow_ASD_kN - P_applied_kN)), color: "#10b981" },
        ],
      },
      note: {
        text: "Column sizing adheres to AISC 360-16 specifications for concentric axial compression. For combined axial plus bending moments (beam-columns), interaction equations H1-1a and H1-1b must also be evaluated.",
        tone: "neutral",
      },
    };
  },
};

export default function StructuralSteelCalculator() {
  return <CalcEngine config={config} />;
}
