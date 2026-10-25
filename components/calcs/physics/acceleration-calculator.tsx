'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "acceleration-calculator",
  title: "Acceleration & Kinematics Calculator",
  fields: [
    {
      kind: "number",
      key: "v0",
      label: "Initial Velocity v₀ (m/s)",
      default: 0,
      min: 0,
      max: 1000,
      hint: "Starting speed (0 m/s for standing start; 13.9 m/s = 50 km/h; 27.8 m/s = 100 km/h)",
    },
    {
      kind: "number",
      key: "v",
      label: "Final Velocity v (m/s)",
      default: 27.78,
      min: 0,
      max: 2000,
      hint: "Target velocity (27.78 m/s = 100 km/h; 44.7 m/s = 100 mph; 250 m/s = commercial jet)",
    },
    {
      kind: "number",
      key: "time",
      label: "Elapsed Time t (Seconds)",
      default: 8,
      min: 0.05,
      max: 3600,
      hint: "Duration of the uniform acceleration interval",
    },
    {
      kind: "number",
      key: "mass",
      label: "Object / Vehicle Mass (kg)",
      default: 1500,
      min: 0.1,
      max: 500000,
      hint: "Mass of the accelerating body (e.g., 1,500 kg passenger sedan, 75 kg human, 70,000 kg airliner)",
    },
  ],
  presets: [
    {
      label: "Family Sedan (0-100 km/h)",
      values: { v0: 0, v: 27.78, time: 8.5, mass: 1550 },
    },
    {
      label: "High-Performance EV Launch",
      values: { v0: 0, v: 26.82, time: 2.8, mass: 2150 },
    },
    {
      label: "Commercial Airliner Takeoff",
      values: { v0: 0, v: 77.2, time: 34, mass: 75000 },
    },
  ],
  compute: (vals) => {
    const v0 = Number(vals.v0) || 0;
    const v = Number(vals.v) || 0;
    const t = Math.max(0.01, Number(vals.time) || 1);
    const m = Math.max(0.01, Number(vals.mass) || 1);

    const deltaV = v - v0;
    const a = deltaV / t; // m/s^2
    const gForce = a / 9.80665;
    const forceN = m * a;
    const forceLbf = forceN * 0.224809;
    const distanceMeters = v0 * t + 0.5 * a * t * t;
    const distanceFeet = distanceMeters * 3.28084;
    const keInitial = 0.5 * m * v0 * v0;
    const keFinal = 0.5 * m * v * v;
    const workJoules = Math.abs(keFinal - keInitial);
    const workKJ = workJoules / 1000;
    const avgPowerKW = t > 0 ? (workJoules / t) / 1000 : 0;

    return {
      hero: {
        value: `${a.toFixed(2)} m/s²`,
        label: `${gForce >= 0 ? "+" : ""}${gForce.toFixed(2)} g | ${(a * 3.28084).toFixed(2)} ft/s²`,
      },
      badge: {
        text: `${Math.abs(gForce).toFixed(2)} g-force (${a >= 0 ? "Acceleration" : "Deceleration"})`,
        tone: Math.abs(gForce) > 3 ? "warn" : "good",
      },
      chart: {
        type: "donut",
        title: "Kinematic Velocity & Energy Split",
        data: [
          { name: `Initial Velocity (${(v0 * 3.6).toFixed(0)} km/h)`, value: Math.max(0.1, Number((v0 * 3.6).toFixed(1))), color: "#3b82f6" },
          { name: `Velocity Shift Δv (${Math.abs(deltaV * 3.6).toFixed(0)} km/h)`, value: Math.max(0.1, Number(Math.abs(deltaV * 3.6).toFixed(1))), color: "#10b981" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Linear Acceleration (a)", value: `${a.toFixed(3)} m/s² (${(a * 3.28084).toFixed(2)} ft/s²)` },
        { label: "Relative g-Force Magnitude", value: `${gForce.toFixed(3)} g (Earth standard g = 9.80665 m/s²)` },
        { label: "Required Net Motive Force (F = ma)", value: `${forceN.toLocaleString(undefined, { maximumFractionDigits: 1 })} N (${forceLbf.toLocaleString(undefined, { maximumFractionDigits: 1 })} lbf)` },
        { label: "Displacement During Interval (d)", value: `${distanceMeters.toLocaleString(undefined, { maximumFractionDigits: 1 })} m (${distanceFeet.toLocaleString(undefined, { maximumFractionDigits: 1 })} ft)` },
        { label: "Kinetic Work Delivered (ΔKE)", value: `${workKJ.toLocaleString(undefined, { maximumFractionDigits: 1 })} kJ (${(workKJ * 0.947817).toLocaleString(undefined, { maximumFractionDigits: 1 })} BTU)` },
        { label: "Average Mechanical Power Output", value: `${avgPowerKW.toFixed(1)} kW (${(avgPowerKW * 1.34102).toFixed(1)} HP)` },
        { label: "Speed Shift (v₀ → v)", value: `${(v0 * 3.6).toFixed(1)} → ${(v * 3.6).toFixed(1)} km/h (${(v0 * 2.23694).toFixed(1)} → ${(v * 2.23694).toFixed(1)} mph)` },
      ],
      steps: [
        `Calculate velocity change: Δv = v - v₀ = ${v.toFixed(2)} m/s - ${v0.toFixed(2)} m/s = ${deltaV.toFixed(2)} m/s.`,
        `Apply kinematic acceleration definition: a = Δv / t = ${deltaV.toFixed(2)} m/s ÷ ${t.toFixed(2)} s = ${a.toFixed(3)} m/s².`,
        `Determine g-force ratio: g-force = a ÷ 9.80665 m/s² = ${gForce.toFixed(3)} g.`,
        `Apply Newton's Second Law for net motive force: F = m × a = ${m.toLocaleString()} kg × ${a.toFixed(3)} m/s² = ${forceN.toLocaleString(undefined, { maximumFractionDigits: 1 })} N.`,
        `Compute uniform displacement: d = v₀t + ½at² = (${v0.toFixed(2)} × ${t.toFixed(2)}) + (0.5 × ${a.toFixed(3)} × ${(t*t).toFixed(2)}) = ${distanceMeters.toFixed(2)} meters.`,
        `Calculate kinetic work: W = ½m(v² - v₀²) = 0.5 × ${m.toLocaleString()} kg × (${(v*v).toFixed(1)} - ${(v0*v0).toFixed(1)}) = ${workKJ.toFixed(1)} kJ.`,
      ],
      note: { text: "Assumes constant, uniform linear acceleration across a frictionless ideal plane. In real automotive or aerospace applications, aerodynamic drag (Fd = 0.5·Cd·A·ρ·v²) causes acceleration to decay at higher speeds." },
    };
  },
};

export default function AccelerationCalculator() {
  return <CalcEngine config={config} />;
}
