'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "projectile-motion-calculator",
  title: "Projectile Motion & Ballistic Trajectory Calculator",
  fields: [
    {
      kind: "number",
      key: "v0",
      label: "Launch Velocity v₀ (m/s)",
      default: 35,
      min: 1,
      max: 2000,
      hint: "Muzzle or release speed (35 m/s = 126 km/h = 78 mph; golf ball ~70 m/s; rifle ~800 m/s)",
    },
    {
      kind: "number",
      key: "angle",
      label: "Launch Angle θ (Degrees)",
      default: 45,
      min: 0,
      max: 90,
      hint: "Angle above horizontal plane (45° gives maximum horizontal range over level ground)",
    },
    {
      kind: "number",
      key: "y0",
      label: "Initial Platform Elevation y₀ (Meters)",
      default: 0,
      min: 0,
      max: 5000,
      hint: "Launch height above target landing plane (e.g. 0m level ground, 25m cliff/building)",
    },
    {
      kind: "number",
      key: "gravity",
      label: "Gravitational Acceleration g (m/s²)",
      default: 9.81,
      min: 0.5,
      max: 50,
      hint: "Standard Earth gravity is 9.80665 m/s²",
    },
  ],
  presets: [
    {
      label: "Max Range Level Launch (45°)",
      values: { v0: 42, angle: 45, y0: 0, gravity: 9.81 },
    },
    {
      label: "Golf Driver Stiff Trajectory (15°)",
      values: { v0: 72, angle: 15, y0: 0, gravity: 9.81 },
    },
    {
      label: "Clifftop Artillery Battery (35° @ 60m)",
      values: { v0: 55, angle: 35, y0: 60, gravity: 9.81 },
    },
  ],
  compute: (vals) => {
    const v0 = Math.max(0.1, Number(vals.v0) || 1);
    const angleDeg = Math.min(90, Math.max(0, Number(vals.angle) || 0));
    const y0 = Math.max(0, Number(vals.y0) || 0);
    const g = Math.max(0.1, Number(vals.gravity) || 9.80665);

    const rad = (angleDeg * Math.PI) / 180;
    const v0x = v0 * Math.cos(rad);
    const v0y = v0 * Math.sin(rad);

    // Apex height above ground: y_max = y0 + (v0y^2) / (2g)
    const timeToApex = v0y / g;
    const apexHeight = y0 + (v0y * v0y) / (2 * g);

    // Total flight time: solve y(t) = y0 + v0y*t - 0.5*g*t^2 = 0
    // Quadratic: 0.5*g*t^2 - v0y*t - y0 = 0
    const flightTime = (v0y + Math.sqrt(v0y * v0y + 2 * g * y0)) / g;

    // Range: x_max = v0x * t
    const rangeMeters = v0x * flightTime;
    const rangeYards = rangeMeters * 1.09361;

    // Impact velocities:
    const vImpactY = v0y - g * flightTime;
    const vImpactTotal = Math.sqrt(v0x * v0x + vImpactY * vImpactY);
    const impactAngleDeg = Math.abs((Math.atan2(vImpactY, v0x) * 180) / Math.PI);

    return {
      hero: {
        value: `${rangeMeters.toFixed(1)} m Range`,
        label: `${rangeYards.toFixed(1)} yd | Apex ${apexHeight.toFixed(1)} m | Flight ${flightTime.toFixed(2)} s`,
      },
      badge: {
        text: `Apex ${apexHeight.toFixed(1)}m (${(apexHeight * 3.28084).toFixed(0)} ft)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Initial Launch Velocity Vectors (m/s)",
        data: [
          { name: `Horizontal vx (${v0x.toFixed(1)} m/s)`, value: Math.max(0.1, Number(v0x.toFixed(1))), color: "#3b82f6" },
          { name: `Vertical vy (${v0y.toFixed(1)} m/s)`, value: Math.max(0.1, Number(v0y.toFixed(1))), color: "#10b981" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Horizontal Range (R)", value: `${rangeMeters.toFixed(1)} m (${rangeYards.toFixed(1)} yards | ${(rangeMeters * 3.28084).toFixed(1)} ft)` },
        { label: "Maximum Flight Apex Altitude (H_max)", value: `${apexHeight.toFixed(1)} m (${(apexHeight * 3.28084).toFixed(1)} ft above datum)` },
        { label: "Total In-Air Flight Time (t_flight)", value: `${flightTime.toFixed(2)} seconds (Apex at ${timeToApex.toFixed(2)} s)` },
        { label: "Horizontal Velocity Component (v_x)", value: `${v0x.toFixed(2)} m/s (Constant throughout trajectory)` },
        { label: "Initial Vertical Velocity (v_0y)", value: `${v0y.toFixed(2)} m/s` },
        { label: "Touchdown Impact Speed (v_final)", value: `${vImpactTotal.toFixed(2)} m/s (${(vImpactTotal * 3.6).toFixed(1)} km/h @ ${impactAngleDeg.toFixed(1)}°)` },
      ],
      steps: [
        `Decompose launch velocity into Cartesian coordinates: v₀x = v₀·cos(${angleDeg}°) = ${v0x.toFixed(2)} m/s; v₀y = v₀·sin(${angleDeg}°) = ${v0y.toFixed(2)} m/s.`,
        `Calculate ascent duration to peak apex: t_apex = v₀y / g = ${v0y.toFixed(2)} ÷ ${g.toFixed(2)} = ${timeToApex.toFixed(2)} s.`,
        `Determine peak altitude: H_max = y₀ + (v₀y²) / (2g) = ${y0.toFixed(1)} + ${(v0y*v0y).toFixed(1)} ÷ ${(2*g).toFixed(2)} = ${apexHeight.toFixed(2)} meters.`,
        `Solve quadratic flight duration: t_flight = [v₀y + √(v₀y² + 2gy₀)] / g = ${flightTime.toFixed(3)} seconds.`,
        `Compute horizontal ballistic range: R = v₀x × t_flight = ${v0x.toFixed(2)} m/s × ${flightTime.toFixed(2)} s = ${rangeMeters.toFixed(2)} meters.`,
      ],
      note: { text: "Neglects aerodynamic drag (air friction), Magnus spin lift, Coriolis force, and wind shear. For supersonic artillery or golf balls with dimple backspin, true ballistic trajectories fall 20% to 50% short of pure parabolic vacuum paths." },
    };
  },
};

export default function ProjectileMotionCalculator() {
  return <CalcEngine config={config} />;
}
