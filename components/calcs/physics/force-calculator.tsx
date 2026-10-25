'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "force-calculator",
  title: "Force & Dynamics Calculator (Newton's 2nd Law)",
  fields: [
    {
      kind: "number",
      key: "mass",
      label: "Object Mass m (kg)",
      default: 80,
      min: 0.01,
      max: 1000000,
      hint: "Mass of accelerating body (e.g. 80 kg runner/athlete; 1,400 kg automobile; 500 kg industrial cart)",
    },
    {
      kind: "number",
      key: "accel",
      label: "Desired Acceleration a (m/s²)",
      default: 3.5,
      min: 0,
      max: 1000,
      hint: "Rate of velocity change (3.5 m/s² = 0.36g; 9.81 m/s² = 1.0g)",
    },
    {
      kind: "number",
      key: "frictionCoeff",
      label: "Surface Friction Coefficient μ",
      default: 0.2,
      min: 0,
      max: 2,
      hint: "Teflon/Ice ~0.04; Wood/Steel ~0.20; Dry Rubber/Asphalt ~0.80; Drag slicks ~1.5",
    },
    {
      kind: "number",
      key: "gravity",
      label: "Local Gravitational Constant g (m/s²)",
      default: 9.81,
      min: 0.1,
      max: 30,
      hint: "Standard Earth surface gravity = 9.80665 m/s²",
    },
  ],
  presets: [
    {
      label: "Sprinter Starting Blocks",
      values: { mass: 78, accel: 5.2, frictionCoeff: 0.65, gravity: 9.81 },
    },
    {
      label: "Heavy Factory Machine Sled",
      values: { mass: 1200, accel: 0.75, frictionCoeff: 0.28, gravity: 9.81 },
    },
    {
      label: "Space Probe Reaction Wheel Launch",
      values: { mass: 450, accel: 0.12, frictionCoeff: 0, gravity: 9.81 },
    },
  ],
  compute: (vals) => {
    const m = Math.max(0.001, Number(vals.mass) || 1);
    const a = Math.max(0, Number(vals.accel) || 0);
    const mu = Math.max(0, Number(vals.frictionCoeff) || 0);
    const g = Math.max(0.1, Number(vals.gravity) || 9.80665);

    const fInertial = m * a; // F = ma
    const fNormal = m * g; // F_N = mg
    const fFriction = mu * fNormal; // F_f = mu * F_N
    const fTotal = fInertial + fFriction;

    const fTotalLbf = fTotal * 0.224809;
    const fTotalDynes = fTotal * 100000;

    return {
      hero: {
        value: `${fTotal.toLocaleString(undefined, { maximumFractionDigits: 1 })} N`,
        label: `${fTotalLbf.toFixed(1)} lbf | ${fInertial.toFixed(0)} N Inertial + ${fFriction.toFixed(0)} N Friction`,
      },
      badge: {
        text: `${fTotalLbf.toFixed(0)} Pounds-Force`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Force Budget Allocation (Newtons)",
        data: [
          { name: `Inertial Acceleration (${fInertial.toFixed(0)} N)`, value: Math.max(0.1, Number(fInertial.toFixed(1))), color: "#3b82f6" },
          { name: `Friction Resistance (${fFriction.toFixed(0)} N)`, value: Math.max(0.1, Number(fFriction.toFixed(1))), color: "#ef4444" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Required Motive Force (F_total)", value: `${fTotal.toLocaleString(undefined, { maximumFractionDigits: 1 })} N (${fTotalLbf.toFixed(1)} lbf)` },
        { label: "Inertial Accelerating Force (F = ma)", value: `${fInertial.toLocaleString(undefined, { maximumFractionDigits: 1 })} N` },
        { label: "Kinetic Friction Drag (F_f = μ·N)", value: `${fFriction.toLocaleString(undefined, { maximumFractionDigits: 1 })} N` },
        { label: "Gravitational Weight / Normal Force (W = mg)", value: `${fNormal.toLocaleString(undefined, { maximumFractionDigits: 1 })} N (${(fNormal * 0.224809).toFixed(1)} lbf)` },
        { label: "Acceleration Produced (a)", value: `${a.toFixed(2)} m/s² (${(a / 9.80665).toFixed(2)} g)` },
        { label: "Force in CGS Units", value: `${fTotalDynes.toExponential(3)} Dynes` },
      ],
      steps: [
        `Compute inertial force required for acceleration: F_ma = m × a = ${m.toLocaleString()} kg × ${a.toFixed(2)} m/s² = ${fInertial.toFixed(1)} N.`,
        `Determine perpendicular surface normal reaction: F_N = m × g = ${m.toLocaleString()} kg × ${g.toFixed(2)} m/s² = ${fNormal.toFixed(1)} N.`,
        `Calculate surface kinetic friction to overcome: F_f = μ × F_N = ${mu.toFixed(2)} × ${fNormal.toFixed(1)} N = ${fFriction.toFixed(1)} N.`,
        `Sum horizontal forces for total required motive thrust: F_total = F_ma + F_f = ${fInertial.toFixed(1)} N + ${fFriction.toFixed(1)} N = ${fTotal.toFixed(1)} Newtons.`,
      ],
      note: { text: "Incline planes introduce an additional gravity component (m·g·sinθ). On a level horizontal surface, normal force equals gravitational weight exactly." },
    };
  },
};

export default function ForceCalculator() {
  return <CalcEngine config={config} />;
}
