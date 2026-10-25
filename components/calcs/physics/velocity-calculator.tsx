'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "velocity-calculator",
  title: "Velocity & Kinematic Motion Calculator",
  fields: [
    {
      kind: "number",
      key: "v0",
      label: "Initial Velocity v₀ (m/s)",
      default: 12,
      min: 0,
      max: 10000,
      hint: "Speed at start of measurement (12 m/s = 43.2 km/h = 26.8 mph)",
    },
    {
      kind: "number",
      key: "accel",
      label: "Constant Acceleration a (m/s²)",
      default: 2.4,
      min: -100,
      max: 100,
      hint: "Rate of velocity change (positive for speeding up, negative for braking)",
    },
    {
      kind: "number",
      key: "time",
      label: "Travel Time t (Seconds)",
      default: 10,
      min: 0.1,
      max: 86400,
      hint: "Elapsed duration of acceleration phase",
    },
  ],
  presets: [
    {
      label: "City Highway On-Ramp",
      values: { v0: 13.9, accel: 2.2, time: 6.5 },
    },
    {
      label: "Emergency Automotive Braking",
      values: { v0: 27.8, accel: -8.5, time: 3.27 },
    },
    {
      label: "High-Speed Rail Transit Sprint",
      values: { v0: 0, accel: 0.65, time: 110 },
    },
  ],
  compute: (vals) => {
    const v0 = Number(vals.v0) || 0;
    const a = Number(vals.accel) || 0;
    const t = Math.max(0.01, Number(vals.time) || 1);

    const vFinal = Math.max(0, v0 + a * t);
    const vAvg = (v0 + vFinal) / 2;
    const distMeters = v0 * t + 0.5 * a * t * t;
    const distKm = distMeters / 1000;
    const distMiles = distMeters / 1609.344;
    const deltaV = vFinal - v0;

    const vKmh = vFinal * 3.6;
    const vMph = vFinal * 2.23694;
    const vKnots = vFinal * 1.94384;

    const baseDist = Math.max(1, Math.round(v0 * t));
    const accelDist = Math.max(1, Math.round(Math.abs(0.5 * a * t * t)));

    return {
      hero: {
        value: `${vFinal.toFixed(2)} m/s`,
        label: `${vKmh.toFixed(1)} km/h | ${vMph.toFixed(1)} mph | ${vKnots.toFixed(1)} knots`,
      },
      badge: {
        text: a >= 0 ? `+${deltaV.toFixed(1)} m/s gained` : `${deltaV.toFixed(1)} m/s decelerated`,
        tone: a >= 0 ? "good" : "warn",
      },
      chart: {
        type: "donut",
        title: "Displacement Component Breakdown",
        data: [
          { name: `Base Inertial Distance (v₀·t = ${baseDist}m)`, value: baseDist, color: "#3b82f6" },
          { name: `Accelerative Shift (½at² = ${accelDist}m)`, value: accelDist, color: "#10b981" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Final Velocity (v = v₀ + at)", value: `${vFinal.toFixed(2)} m/s (${vKmh.toFixed(1)} km/h)` },
        { label: "Average Velocity over Interval (v_avg)", value: `${vAvg.toFixed(2)} m/s (${(vAvg * 3.6).toFixed(1)} km/h)` },
        { label: "Net Traveled Displacement (d)", value: `${distMeters.toFixed(1)} m (${distKm.toFixed(3)} km | ${distMiles.toFixed(2)} mi)` },
        { label: "Speed Shift Magnitude (Δv)", value: `${deltaV >= 0 ? "+" : ""}${deltaV.toFixed(2)} m/s (${(deltaV * 3.6).toFixed(1)} km/h)` },
        { label: "Effective Acceleration Magnitude", value: `${a.toFixed(2)} m/s² (${(a / 9.80665).toFixed(2)} g)` },
        { label: "Pace per Kilometer", value: vFinal > 0 ? `${(1000 / vFinal / 60).toFixed(2)} min/km` : "Static" },
      ],
      steps: [
        `Apply primary first kinematic formula: v = v₀ + at.`,
        `Substitute initial speed: v₀ = ${v0.toFixed(2)} m/s.`,
        `Multiply acceleration by duration: at = ${a.toFixed(2)} m/s² × ${t.toFixed(2)} s = ${(a * t).toFixed(2)} m/s.`,
        `Sum for final velocity: v = ${v0.toFixed(2)} + ${(a * t).toFixed(2)} = ${vFinal.toFixed(2)} m/s (${vKmh.toFixed(1)} km/h).`,
        `Compute total distance: d = v₀t + ½at² = (${v0.toFixed(2)} × ${t.toFixed(2)}) + (0.5 × ${a.toFixed(2)} × ${(t*t).toFixed(2)}) = ${distMeters.toFixed(1)} meters.`,
      ],
      note: { text: "Velocity is a strict vector with directional sign. If braking brings final velocity below zero, motion reverses direction unless arrested by surface friction." },
    };
  },
};

export default function VelocityCalculator() {
  return <CalcEngine config={config} />;
}
