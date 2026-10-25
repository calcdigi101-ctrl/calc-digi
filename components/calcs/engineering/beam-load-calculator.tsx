"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "beam-load-calc",
  title: "Structural Beam Load & Deflection Calculator",
  presets: [
    { label: "Residential Floor Joist (Simply Supported UDL)", values: { beamType: "ss_udl", P: 0, w: 3.5, L: 4.5, E: 200, I: 4500, h: 250 } },
    { label: "Commercial Steel Girder (Center Point Load)", values: { beamType: "ss_point", P: 45, w: 0, L: 6.0, E: 200, I: 12000, h: 350 } },
    { label: "Balcony Cantilever (Uniform Load)", values: { beamType: "cant_udl", P: 0, w: 2.8, L: 2.2, E: 200, I: 3200, h: 200 } },
    { label: "Crane Hoist Arm (Cantilever End Load)", values: { beamType: "cant_point", P: 20, w: 0, L: 3.0, E: 200, I: 8500, h: 300 } },
    { label: "Timber Roof Rafter (Douglas Fir)", values: { beamType: "ss_udl", P: 0, w: 1.8, L: 3.8, E: 13.1, I: 2800, h: 190 } },
    { label: "Aluminum Truss Rail (6061-T6)", values: { beamType: "ss_point", P: 8, w: 0, L: 2.5, E: 69, I: 1400, h: 120 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "beamType",
      label: "Support Configuration & Loading Condition",
      default: "ss_udl",
      options: [
        { value: "ss_udl", label: "Simply Supported – Uniformly Distributed Load (w)" },
        { value: "ss_point", label: "Simply Supported – Center Point Load (P)" },
        { value: "cant_udl", label: "Cantilever (Fixed End) – Uniformly Distributed Load (w)" },
        { value: "cant_point", label: "Cantilever (Fixed End) – End Point Load (P)" },
      ],
    },
    {
      kind: "number",
      key: "P",
      label: "Concentrated Point Load P (kN)",
      default: 0,
      min: 0,
      max: 10000,
      hint: "Single concentrated downward force in kilonewtons (for point load options)",
    },
    {
      kind: "number",
      key: "w",
      label: "Uniform Distributed Load w (kN/m)",
      default: 3.5,
      min: 0,
      max: 1000,
      hint: "Linear distributed gravity load in kilonewtons per linear meter",
    },
    {
      kind: "number",
      key: "L",
      label: "Clear Span Length L (meters)",
      default: 4.5,
      min: 0.1,
      max: 100,
      hint: "Distance between column supports or cantilever projection length",
    },
    {
      kind: "number",
      key: "E",
      label: "Elastic Modulus E (GPa)",
      default: 200,
      min: 1,
      max: 1000,
      hint: "Material stiffness (200 for Structural Steel, 69 for Aluminum, 13.1 for Timber)",
    },
    {
      kind: "number",
      key: "I",
      label: "Moment of Inertia I (cm⁴)",
      default: 4500,
      min: 1,
      max: 10000000,
      hint: "Second moment of area about bending axis (e.g., from AISC W-beam table)",
    },
    {
      kind: "number",
      key: "h",
      label: "Total Section Depth / Height (mm)",
      default: 250,
      min: 10,
      max: 3000,
      hint: "Vertical beam thickness (extreme outer fiber distance c = h / 2)",
    },
  ],
  compute(values) {
    const type = String(values.beamType || "ss_udl");
    const P_kN = Number(values.P) || 0;
    const w_kNm = Number(values.w) || 0;
    const L = Number(values.L);
    const E_GPa = Number(values.E);
    const I_cm4 = Number(values.I);
    const h_mm = Number(values.h);

    if (isNaN(L) || L <= 0) return { error: "Please enter a valid span length greater than zero." };
    if (isNaN(E_GPa) || E_GPa <= 0) return { error: "Please enter a valid Elastic Modulus (GPa)." };
    if (isNaN(I_cm4) || I_cm4 <= 0) return { error: "Please enter a valid Moment of Inertia (cm⁴)." };
    if (isNaN(h_mm) || h_mm <= 0) return { error: "Please enter a valid section depth (mm)." };

    // Unit conversions to SI base units:
    // P in N, w in N/m, L in m, E in Pa (N/m²), I in m⁴, c in m
    const P = P_kN * 1000;
    const w = w_kNm * 1000;
    const E = E_GPa * 1e9;
    const I = I_cm4 * 1e-8; // 1 cm⁴ = 10^-8 m⁴
    const c = (h_mm / 2) / 1000; // meters from neutral axis to extreme fiber
    const EI = E * I; // Flexural rigidity in N·m²

    let delta_m = 0; // max deflection in meters
    let M_max_Nm = 0; // max bending moment in N·m
    let configName = "";

    if (type === "ss_point") {
      if (P <= 0) return { error: "Please specify a concentrated point load P greater than 0 kN." };
      delta_m = (P * Math.pow(L, 3)) / (48 * EI);
      M_max_Nm = (P * L) / 4;
      configName = "Simply Supported (Point Load)";
    } else if (type === "ss_udl") {
      if (w <= 0) return { error: "Please specify a distributed load w greater than 0 kN/m." };
      delta_m = (5 * w * Math.pow(L, 4)) / (384 * EI);
      M_max_Nm = (w * Math.pow(L, 2)) / 8;
      configName = "Simply Supported (UDL)";
    } else if (type === "cant_point") {
      if (P <= 0) return { error: "Please specify an end point load P greater than 0 kN." };
      delta_m = (P * Math.pow(L, 3)) / (3 * EI);
      M_max_Nm = P * L;
      configName = "Cantilever (End Point Load)";
    } else {
      // cant_udl
      if (w <= 0) return { error: "Please specify a distributed load w greater than 0 kN/m." };
      delta_m = (w * Math.pow(L, 4)) / (8 * EI);
      M_max_Nm = (w * Math.pow(L, 2)) / 2;
      configName = "Cantilever (UDL)";
    }

    const delta_mm = delta_m * 1000;
    const M_max_kNm = M_max_Nm / 1000;

    // Bending stress: sigma = M * c / I (in Pa, converted to MPa)
    const sigma_MPa = (M_max_Nm * c) / I / 1e6;

    // Code deflection limits: L/360 for live floor loads, L/240 for roof total loads
    const allow_L360_mm = (L * 1000) / 360;
    const allow_L240_mm = (L * 1000) / 240;

    const passesDeflection = delta_mm <= allow_L360_mm;
    // Allowable bending stress check for standard A36 structural steel (150 MPa ASD)
    const passesStress = sigma_MPa <= 150;

    let overallTone: "good" | "info" | "warn" = "good";
    let complianceBadge = "Code Compliant (Passes L/360 & Stress)";

    if (!passesDeflection && !passesStress) {
      overallTone = "warn";
      complianceBadge = "Critical: Deflection & Stress Exceeded";
    } else if (!passesDeflection) {
      overallTone = "warn";
      complianceBadge = "Excessive Deflection (> L/360)";
    } else if (!passesStress) {
      overallTone = "warn";
      complianceBadge = "Bending Stress Exceeds 150 MPa";
    } else {
      overallTone = "good";
      complianceBadge = "Structural Serviceability Pass (≤ L/360)";
    }

    const steps = [
      `1. Flexural Rigidity: EI = (${E_GPa} × 10⁹ Pa) × (${I_cm4} × 10⁻⁸ m⁴) = ${(EI / 1000).toFixed(0)} kN·m²`,
      `2. Maximum Bending Moment: M_max = ${M_max_kNm.toFixed(2)} kN·m (${configName})`,
      `3. Maximum Deflection: δ_max = ${delta_mm.toFixed(3)} mm (Span/Deflection Ratio: L / ${Math.round((L * 1000) / (delta_mm || 0.001))})`,
      `4. Code Limit Check: Allowable L/360 = ${allow_L360_mm.toFixed(2)} mm → ${passesDeflection ? "PASS (Serviceable)" : "FAIL (Too flexible)"}`,
      `5. Extreme Fiber Bending Stress: σ = Mc / I = (${M_max_kNm.toFixed(2)} kN·m × ${(c * 1000).toFixed(1)} mm) / I = ${sigma_MPa.toFixed(1)} MPa`,
    ];

    return {
      hero: {
        label: "Maximum Deflection (δ_max)",
        value: `${delta_mm.toFixed(2)} mm`,
        unit: `L / ${Math.round((L * 1000) / (delta_mm || 0.001))}`,
      },
      badge: {
        text: complianceBadge,
        tone: overallTone,
      },
      rows: [
        { label: "Maximum Deflection (δ)", value: `${delta_mm.toFixed(3)} mm (${(delta_mm / 25.4).toFixed(3)} in)`, strong: true },
        { label: "Floor Serviceability Limit (L/360)", value: `${allow_L360_mm.toFixed(2)} mm (${passesDeflection ? "PASSED" : "EXCEEDED"})`, strong: true },
        { label: "Roof Serviceability Limit (L/240)", value: `${allow_L240_mm.toFixed(2)} mm (${delta_mm <= allow_L240_mm ? "PASSED" : "EXCEEDED"})` },
        { label: "Maximum Bending Moment (M_max)", value: `${M_max_kNm.toFixed(2)} kN·m (${(M_max_kNm * 737.56).toFixed(0)} lb·ft)` },
        { label: "Peak Bending Stress (σ)", value: `${sigma_MPa.toFixed(1)} MPa (${(sigma_MPa * 0.145038).toFixed(1)} ksi)` },
        { label: "Flexural Rigidity (EI)", value: `${(EI / 1000).toLocaleString()} kN·m²` },
        { label: "Loading Condition", value: configName },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Calculated Deflection vs. L/360 Code Ceiling (mm)",
        data: [
          { name: "Active Deflection (mm)", value: Math.max(0.1, delta_mm), color: passesDeflection ? "#10b981" : "#ef4444" },
          { name: "Remaining L/360 Headroom", value: Math.max(0, allow_L360_mm - delta_mm), color: "#3b82f6" },
        ],
      },
      note: {
        text: "Structural beam sizing requires verifying both strength (bending stress below yield limit with safety factor) and serviceability (deflection within L/360 for floors or L/240 for roofs to prevent drywall cracking and vibration).",
        tone: "neutral",
      },
    };
  },
};

export default function BeamLoadCalculator() {
  return <CalcEngine config={config} />;
}
