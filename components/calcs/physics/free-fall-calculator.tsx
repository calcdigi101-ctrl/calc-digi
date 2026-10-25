'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "free-fall-calculator",
  title: "Free Fall Kinematics Calculator",
  fields: [
    {
      kind: "number",
      key: "height",
      label: "Drop Height h (Meters)",
      default: 45,
      min: 0.1,
      max: 100000,
      hint: "Vertical elevation above ground (e.g., 45m = 15-story building; 10m = diving tower; 300m = Eiffel Tower)",
    },
    {
      kind: "number",
      key: "v0",
      label: "Initial Downward Velocity v₀ (m/s)",
      default: 0,
      min: 0,
      max: 500,
      hint: "0 for stationary drop, >0 if thrown downward",
    },
    {
      kind: "choice",
      key: "gravityPreset",
      label: "Gravitational Body (g)",
      default: "earth",
      options: [
        { value: "earth", label: "Earth Surface (9.81 m/s²)" },
        { value: "moon", label: "The Moon (1.62 m/s²)" },
        { value: "mars", label: "Mars Surface (3.72 m/s²)" },
        { value: "jupiter", label: "Jupiter Top Cloud (24.79 m/s²)" },
      ],
    },
    {
      kind: "number",
      key: "mass",
      label: "Falling Object Mass (kg)",
      default: 3.5,
      min: 0.001,
      max: 50000,
      hint: "Mass of the projectile (determines impact energy & momentum; velocity is mass-independent in vacuum)",
    },
  ],
  presets: [
    {
      label: "Olympic 10m High Dive (Earth)",
      values: { height: 10, v0: 0, gravityPreset: "earth", mass: 68 },
    },
    {
      label: "Skyscraper Drop 150m (Earth)",
      values: { height: 150, v0: 0, gravityPreset: "earth", mass: 2 },
    },
    {
      label: "Apollo 15 Lunar Feather Drop (Moon)",
      values: { height: 1.6, v0: 0, gravityPreset: "moon", mass: 0.05 },
    },
  ],
  compute: (vals) => {
    const h = Math.max(0.01, Number(vals.height) || 1);
    const v0 = Number(vals.v0) || 0;
    const m = Math.max(0.001, Number(vals.mass) || 1);
    const gMap: Record<string, number> = {
      earth: 9.80665,
      moon: 1.622,
      mars: 3.720,
      jupiter: 24.79,
    };
    const g = gMap[String(vals.gravityPreset || "earth")] || 9.80665;

    // t = (-v0 + sqrt(v0^2 + 2gh)) / g
    const tFall = (-v0 + Math.sqrt(v0 * v0 + 2 * g * h)) / g;
    const vImpact = Math.sqrt(v0 * v0 + 2 * g * h);
    const vKmh = vImpact * 3.6;
    const vMph = vImpact * 2.23694;

    const keImpactJoules = 0.5 * m * vImpact * vImpact;
    const keImpactKJ = keImpactJoules / 1000;
    const momentumNs = m * vImpact;

    // Comparative celestial fall times from this height h:
    const tEarth = Math.sqrt((2 * h) / 9.80665);
    const tMoon = Math.sqrt((2 * h) / 1.622);
    const tMars = Math.sqrt((2 * h) / 3.720);
    const tJupiter = Math.sqrt((2 * h) / 24.79);

    return {
      hero: {
        value: `${tFall.toFixed(2)} Seconds`,
        label: `Impact Speed: ${vImpact.toFixed(1)} m/s (${vKmh.toFixed(1)} km/h | ${vMph.toFixed(1)} mph)`,
      },
      badge: {
        text: `${vKmh.toFixed(0)} km/h Terminal Impact`,
        tone: vKmh > 100 ? "warn" : "info",
      },
      chart: {
        type: "donut",
        title: "Celestial Fall Duration Comparison (Seconds)",
        data: [
          { name: `Earth 9.81 m/s² (${tEarth.toFixed(2)}s)`, value: Number(tEarth.toFixed(2)), color: "#3b82f6" },
          { name: `Moon 1.62 m/s² (${tMoon.toFixed(2)}s)`, value: Number(tMoon.toFixed(2)), color: "#94a3b8" },
          { name: `Mars 3.72 m/s² (${tMars.toFixed(2)}s)`, value: Number(tMars.toFixed(2)), color: "#f59e0b" },
          { name: `Jupiter 24.8 m/s² (${tJupiter.toFixed(2)}s)`, value: Number(tJupiter.toFixed(2)), color: "#ef4444" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Fall Duration (t)", value: `${tFall.toFixed(3)} seconds` },
        { label: "Terminal Impact Velocity (v_final)", value: `${vImpact.toFixed(2)} m/s (${vKmh.toFixed(1)} km/h | ${vMph.toFixed(1)} mph)` },
        { label: "Local Gravity Field (g)", value: `${g.toFixed(3)} m/s²` },
        { label: "Impact Kinetic Energy (KE = ½mv²)", value: `${keImpactKJ >= 1 ? keImpactKJ.toFixed(2) + " kJ" : keImpactJoules.toFixed(1) + " Joules"}` },
        { label: "Downward Linear Momentum (p = mv)", value: `${momentumNs.toFixed(2)} N·s (kg·m/s)` },
        { label: "Average Fall Speed (h / t)", value: `${(h / tFall).toFixed(2)} m/s (${((h / tFall) * 3.6).toFixed(1)} km/h)` },
      ],
      steps: [
        `Apply Torricelli kinematic conservation: v² = v₀² + 2gh.`,
        `Substitute elevation and gravity: 2 × ${g.toFixed(2)} m/s² × ${h.toFixed(1)} m = ${(2 * g * h).toFixed(1)} (m/s)².`,
        `Solve terminal velocity: v = √(${(v0*v0).toFixed(1)} + ${(2 * g * h).toFixed(1)}) = ${vImpact.toFixed(2)} m/s (${vKmh.toFixed(1)} km/h).`,
        `Determine duration from acceleration: t = (v - v₀) / g = (${vImpact.toFixed(2)} - ${v0.toFixed(2)}) ÷ ${g.toFixed(2)} = ${tFall.toFixed(2)} s.`,
        `Calculate impact kinetic energy: KE = ½ × ${m.toFixed(2)} kg × (${vImpact.toFixed(2)} m/s)² = ${keImpactJoules.toLocaleString(undefined, { maximumFractionDigits: 1 })} Joules.`,
      ],
      note: { text: "Calculations model an ideal vacuum without air resistance. In Earth's atmosphere, a skydiver in belly-to-earth posture reaches a terminal velocity of ~54 m/s (195 km/h) after ~450 meters." },
    };
  },
};

export default function FreeFallCalculator() {
  return <CalcEngine config={config} />;
}
