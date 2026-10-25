'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "gravitational-force-calculator",
  title: "Universal Gravitational Force Calculator",
  fields: [
    {
      kind: "number",
      key: "m1",
      label: "Mass of Primary Body M₁ (kg)",
      default: 5.972e24,
      min: 0.001,
      max: 1e35,
      hint: "Mass of first body (Earth = 5.972 × 10²⁴ kg; Sun = 1.989 × 10³⁰ kg)",
    },
    {
      kind: "number",
      key: "m2",
      label: "Mass of Secondary Body M₂ (kg)",
      default: 7.342e22,
      min: 0.001,
      max: 1e35,
      hint: "Mass of second body (Moon = 7.342 × 10²² kg; 80 kg human = 80)",
    },
    {
      kind: "number",
      key: "distance",
      label: "Center-to-Center Distance r (Meters)",
      default: 384400000,
      min: 0.01,
      max: 1e15,
      hint: "Separation distance (Earth-Moon = 3.844 × 10⁸ m; Earth-Sun = 1.496 × 10¹¹ m)",
    },
  ],
  presets: [
    {
      label: "Earth - Moon Orbital System",
      values: { m1: 5.972e24, m2: 7.342e22, distance: 384400000 },
    },
    {
      label: "Sun - Earth Gravitational Binding",
      values: { m1: 1.989e30, m2: 5.972e24, distance: 149600000000 },
    },
    {
      label: "Two 100-ton Locomotives at 5m Separation",
      values: { m1: 100000, m2: 100000, distance: 5 },
    },
  ],
  compute: (vals) => {
    const m1 = Math.max(0.0001, Number(vals.m1) || 1);
    const m2 = Math.max(0.0001, Number(vals.m2) || 1);
    const r = Math.max(0.0001, Number(vals.distance) || 1);

    const G = 6.67430e-11; // N·m²/kg²
    const fGravity = (G * m1 * m2) / (r * r);
    const a1 = fGravity / m1;
    const a2 = fGravity / m2;

    const vCirc = Math.sqrt((G * m1) / r);

    const pct1 = Math.max(0.01, (m2 / (m1 + m2)) * 100);
    const pct2 = Math.max(0.01, (m1 / (m1 + m2)) * 100);

    return {
      hero: {
        value: fGravity > 1e6 ? `${fGravity.toExponential(4)} N` : `${fGravity.toFixed(2)} N`,
        label: `M₂ Accel: ${a2.toExponential(3)} m/s² | M₁ Accel: ${a1.toExponential(3)} m/s² | Circular v: ${(vCirc / 1000).toFixed(2)} km/s`,
      },
      badge: {
        text: `F = ${fGravity.toExponential(2)} N`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Mutual Accelerative Pull Proportion (%)",
        data: [
          { name: `Pull on Body 1 (${pct1.toFixed(1)}%)`, value: Number(pct1.toFixed(1)), color: "#3b82f6" },
          { name: `Pull on Body 2 (${pct2.toFixed(1)}%)`, value: Number(pct2.toFixed(1)), color: "#10b981" },
        ],
        format: "pct",
      },
      rows: [
        { label: "Universal Gravitational Force (F_g = GMm/r²)", value: `${fGravity.toExponential(4)} Newtons (${(fGravity * 0.2248).toExponential(3)} lbf)` },
        { label: "Acceleration on Body 2 (a₂ = GM₁/r²)", value: `${a2.toExponential(4)} m/s² (${(a2 / 9.80665).toExponential(3)} g)` },
        { label: "Acceleration on Body 1 (a₁ = GM₂/r²)", value: `${a1.toExponential(4)} m/s²` },
        { label: "Standard Gravitational Constant (G)", value: "6.67430 × 10⁻¹¹ N·m²/kg² (CODATA 2026)" },
        { label: "Circular Orbital Velocity around M₁", value: `${(vCirc / 1000).toFixed(3)} km/s (${(vCirc * 3.6).toFixed(1)} km/h)` },
        { label: "Separation Distance (r)", value: `${(r / 1000).toLocaleString()} km (${r.toExponential(3)} m)` },
      ],
      steps: [
        `Square separation distance: r² = (${r.toExponential(3)} m)² = ${(r * r).toExponential(3)} m².`,
        `Multiply masses: M₁ × M₂ = ${m1.toExponential(3)} × ${m2.toExponential(3)} = ${(m1 * m2).toExponential(3)} kg².`,
        `Apply Newton's Law: F = G × (M₁M₂ / r²) = 6.67430×10⁻¹¹ × ${(m1 * m2 / (r * r)).toExponential(3)} = ${fGravity.toExponential(4)} Newtons.`,
        `Determine acceleration on secondary body: a₂ = F ÷ M₂ = ${a2.toExponential(4)} m/s².`,
      ],
      note: { text: "Newtonian gravity is strictly reciprocal: Earth pulls on the Moon with the exact same magnitude of force that the Moon pulls on the Earth." },
    };
  },
};

export default function GravitationalForceCalculator() {
  return <CalcEngine config={config} />;
}
