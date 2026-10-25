"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "bolt-torque-calc",
  title: "Bolt Tightening Torque & Preload Clamping Force Calculator",
  presets: [
    { label: "M12 ISO Class 8.8 Lightly Oiled (K = 0.15)", values: { boltSize: "m12", boltGrade: "8.8", lubrication: "oiled", preloadPct: 75 } },
    { label: "M16 ISO Class 10.9 Dry Zinc Plated (K = 0.20)", values: { boltSize: "m16", boltGrade: "10.9", lubrication: "dry", preloadPct: 75 } },
    { label: "1/2\"-13 UNC Grade 8 Anti-Seize Paste (K = 0.12)", values: { boltSize: "half_inch", boltGrade: "gr8", lubrication: "antiseize", preloadPct: 75 } },
    { label: "M20 ISO Class 10.9 Structural Flange (K = 0.15)", values: { boltSize: "m20", boltGrade: "10.9", lubrication: "oiled", preloadPct: 75 } },
    { label: "3/8\"-16 UNC Grade 5 Dry (K = 0.20)", values: { boltSize: "three_eighths", boltGrade: "gr5", lubrication: "dry", preloadPct: 70 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "boltSize",
      label: "Nominal Fastener Thread Size (d)",
      default: "m12",
      options: [
        { value: "m6", label: "M6 × 1.0 (Bore d = 6.0 mm, Area = 20.1 mm²)" },
        { value: "m8", label: "M8 × 1.25 (Bore d = 8.0 mm, Area = 36.6 mm²)" },
        { value: "m10", label: "M10 × 1.5 (Bore d = 10.0 mm, Area = 58.0 mm²)" },
        { value: "m12", label: "M12 × 1.75 (Bore d = 12.0 mm, Area = 84.3 mm²)" },
        { value: "m16", label: "M16 × 2.0 (Bore d = 16.0 mm, Area = 157.0 mm²)" },
        { value: "m20", label: "M20 × 2.5 (Bore d = 20.0 mm, Area = 245.0 mm²)" },
        { value: "m24", label: "M24 × 3.0 (Bore d = 24.0 mm, Area = 353.0 mm²)" },
        { value: "three_eighths", label: "3/8\"-16 UNC (d = 9.52 mm, Area = 50.0 mm² / 0.0775 in²)" },
        { value: "half_inch", label: "1/2\"-13 UNC (d = 12.70 mm, Area = 91.6 mm² / 0.1419 in²)" },
        { value: "three_quarter", label: "3/4\"-10 UNC (d = 19.05 mm, Area = 215.5 mm² / 0.3345 in²)" },
      ],
    },
    {
      kind: "choice",
      key: "boltGrade",
      label: "Material Strength Grade / Property Class",
      default: "8.8",
      options: [
        { value: "8.8", label: "ISO Class 8.8 (Proof Stress: 580 MPa / 84 ksi)" },
        { value: "10.9", label: "ISO Class 10.9 (Proof Stress: 830 MPa / 120 ksi)" },
        { value: "12.9", label: "ISO Class 12.9 (Proof Stress: 970 MPa / 140 ksi)" },
        { value: "gr5", label: "SAE J429 Grade 5 (Proof Stress: 586 MPa / 85 ksi)" },
        { value: "gr8", label: "SAE J429 Grade 8 (Proof Stress: 827 MPa / 120 ksi)" },
      ],
    },
    {
      kind: "choice",
      key: "lubrication",
      label: "Thread Surface Lubrication (Nut Factor K)",
      default: "oiled",
      options: [
        { value: "antiseize", label: "Anti-Seize / Moly Paste (K ≈ 0.12 – Low Friction)" },
        { value: "oiled", label: "Light Machine Oil / Clean Threads (K ≈ 0.15 – Standard Shop)" },
        { value: "ptfe", label: "PTFE / Fluoropolymer Coating (K ≈ 0.10 – Extreme Lubricity)" },
        { value: "dry", label: "Dry / Plain As-Received / Zinc Plated (K ≈ 0.20 – High Friction)" },
      ],
    },
    {
      kind: "number",
      key: "preloadPct",
      label: "Target Preload Yield Percentage (%)",
      default: 75,
      min: 50,
      max: 90,
      hint: "Target clamp force as % of bolt proof load (standard structural practice is 75% for reusable joints)",
    },
  ],
  compute(values) {
    const size = String(values.boltSize || "m12");
    const grade = String(values.boltGrade || "8.8");
    const lube = String(values.lubrication || "oiled");
    const preloadPct = Number(values.preloadPct) || 75;

    // Fastener geometry [d (m), Tensile Stress Area As (m²)]
    let d_m = 0.012; // 12 mm
    let As_mm2 = 84.3;
    let sizeLabel = "M12";

    if (size === "m6") { d_m = 0.006; As_mm2 = 20.1; sizeLabel = "M6"; }
    else if (size === "m8") { d_m = 0.008; As_mm2 = 36.6; sizeLabel = "M8"; }
    else if (size === "m10") { d_m = 0.010; As_mm2 = 58.0; sizeLabel = "M10"; }
    else if (size === "m12") { d_m = 0.012; As_mm2 = 84.3; sizeLabel = "M12"; }
    else if (size === "m16") { d_m = 0.016; As_mm2 = 157.0; sizeLabel = "M16"; }
    else if (size === "m20") { d_m = 0.020; As_mm2 = 245.0; sizeLabel = "M20"; }
    else if (size === "m24") { d_m = 0.024; As_mm2 = 353.0; sizeLabel = "M24"; }
    else if (size === "three_eighths") { d_m = 0.009525; As_mm2 = 50.0; sizeLabel = "3/8\"-16 UNC"; }
    else if (size === "half_inch") { d_m = 0.0127; As_mm2 = 91.6; sizeLabel = "1/2\"-13 UNC"; }
    else if (size === "three_quarter") { d_m = 0.01905; As_mm2 = 215.5; sizeLabel = "3/4\"-10 UNC"; }

    // Proof stress Sp in MPa
    let Sp_MPa = 580; // 8.8
    if (grade === "10.9") Sp_MPa = 830;
    else if (grade === "12.9") Sp_MPa = 970;
    else if (grade === "gr5") Sp_MPa = 586;
    else if (grade === "gr8") Sp_MPa = 827;

    // Torque nut factor K
    let K = 0.15;
    let lubeName = "Lightly Oiled";
    if (lube === "antiseize") { K = 0.12; lubeName = "Anti-Seize Paste"; }
    else if (lube === "ptfe") { K = 0.10; lubeName = "PTFE Coated"; }
    else if (lube === "dry") { K = 0.20; lubeName = "Dry / Plain Zinc"; }

    // Proof load Fp in Newtons: Fp = As * Sp
    const As_m2 = As_mm2 * 1e-6;
    const Sp_Pa = Sp_MPa * 1e6;
    const Fp_N = As_m2 * Sp_Pa;
    const Fp_kN = Fp_N / 1000;

    // Target preload clamping force Fi: Fi = Fp * (preloadPct / 100)
    const Fi_N = Fp_N * (preloadPct / 100);
    const Fi_kN = Fi_N / 1000;
    const Fi_lbs = Fi_N * 0.224809;

    // Short torque equation: T = K * Fi * d (in N·m)
    const torque_Nm = K * Fi_N * d_m;
    const torque_lbft = torque_Nm * 0.737562;
    const torque_lbin = torque_Nm * 8.85075;

    const steps = [
      `1. Tensile Stress Cross-Section: A_s = ${As_mm2} mm² (${sizeLabel} fastener, nominal d = ${(d_m * 1000).toFixed(1)} mm)`,
      `2. Material Proof Strength: S_p = ${Sp_MPa} MPa (Class ${grade}) → Proof Load F_p = ${Fp_kN.toFixed(2)} kN (${(Fp_kN * 224.8).toFixed(0)} lbf)`,
      `3. Target Clamp Preload (${preloadPct}% of proof): F_i = ${Fp_kN.toFixed(2)} kN × ${(preloadPct / 100).toFixed(2)} = ${Fi_kN.toFixed(2)} kN (${Math.round(Fi_lbs).toLocaleString()} lbs clamping force)`,
      `4. Torque Nut Factor: K = ${K} (${lubeName})`,
      `5. Required Tightening Torque: T = K · F_i · d = ${K} × ${Fi_N.toFixed(0)} N × ${d_m.toFixed(4)} m = ${torque_Nm.toFixed(1)} N·m (${torque_lbft.toFixed(1)} lb·ft | ${torque_lbin.toFixed(0)} lb·in)`,
    ];

    return {
      hero: {
        label: "Recommended Tightening Torque",
        value: `${torque_Nm.toFixed(1)} N·m`,
        unit: `${torque_lbft.toFixed(1)} lb·ft`,
      },
      badge: {
        text: `${Fi_kN.toFixed(1)} kN Preload (${Math.round(Fi_lbs).toLocaleString()} lbf)`,
        tone: "good",
      },
      rows: [
        { label: "Target Tightening Torque", value: `${torque_Nm.toFixed(1)} N·m (${torque_lbft.toFixed(1)} lb·ft)`, strong: true },
        { label: "Target Clamp Preload Force (Fi)", value: `${Fi_kN.toFixed(2)} kN (${Math.round(Fi_lbs).toLocaleString()} lbf)`, strong: true },
        { label: "Bolt Proof Load Limit (Fp)", value: `${Fp_kN.toFixed(2)} kN (${(Fp_kN * 224.8).toFixed(0)} lbf)` },
        { label: "Nut Friction Factor (K)", value: `${K.toFixed(2)} (${lubeName})` },
        { label: "Tensile Stress Area (As)", value: `${As_mm2} mm² (${(As_mm2 / 645.16).toFixed(4)} sq in)` },
        { label: "Proof Stress Rating (Sp)", value: `${Sp_MPa} MPa (${(Sp_MPa * 0.145038).toFixed(1)} ksi)` },
        { label: "Preload Safety Target", value: `${preloadPct}% of Yield Proof Load` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Fastener Clamping Tension vs. Proof Headroom (kN)",
        data: [
          { name: `Target Preload Clamp (${Fi_kN.toFixed(1)} kN)`, value: Math.max(0.1, Fi_kN), color: "#10b981" },
          { name: `Reserve Proof Headroom (${(Fp_kN - Fi_kN).toFixed(1)} kN)`, value: Math.max(0.1, Fp_kN - Fi_kN), color: "#3b82f6" },
        ],
      },
      note: {
        text: "Torque is highly sensitive to friction: using dry torque values on a lubricated fastener will cause severe over-tightening (up to 40% overload) and can snap the bolt threads. Always calibrate with the proper thread lubricant.",
        tone: "neutral",
      },
    };
  },
};

export default function BoltTorqueCalculator() {
  return <CalcEngine config={config} />;
}
