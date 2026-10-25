'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "momentum-calculator",
  title: "Momentum & Collision Impulse Calculator",
  fields: [
    {
      kind: "number",
      key: "mass",
      label: "Object Mass m (kg)",
      default: 1500,
      min: 0.001,
      max: 10000000,
      hint: "Mass of the translating body (e.g. 1,500 kg automobile, 0.145 kg baseball)",
    },
    {
      kind: "number",
      key: "velocity",
      label: "Initial Velocity v (m/s)",
      default: 25,
      min: 0,
      max: 100000,
      hint: "Speed before impact (25 m/s = 90 km/h = 56 mph)",
    },
    {
      kind: "number",
      key: "duration",
      label: "Collision Impact Duration Δt (Seconds)",
      default: 0.08,
      min: 0.0001,
      max: 10,
      hint: "Contact stopping time (0.08s = 80ms automotive crumple zone; 0.001s = 1ms stiff barrier)",
    },
    {
      kind: "number",
      key: "restitution",
      label: "Coefficient of Restitution e (0 to 1)",
      default: 0,
      min: 0,
      max: 1,
      hint: "0 = perfectly inelastic (crumple & stick); 1 = perfectly elastic rebound",
    },
  ],
  presets: [
    {
      label: "Automotive Barrier Crash (80ms Crumple)",
      values: { mass: 1600, velocity: 22.2, duration: 0.08, restitution: 0 },
    },
    {
      label: "Baseball Bat Impact (1.0ms)",
      values: { mass: 0.145, velocity: 40, duration: 0.001, restitution: 0.55 },
    },
    {
      label: "Billiard Ball Elastic Rebound (2ms)",
      values: { mass: 0.17, velocity: 4.5, duration: 0.002, restitution: 0.95 },
    },
  ],
  compute: (vals) => {
    const m = Math.max(0.0001, Number(vals.mass) || 1);
    const v = Math.max(0, Number(vals.velocity) || 0);
    const dt = Math.max(0.0001, Number(vals.duration) || 0.01);
    const e = Math.min(1, Math.max(0, Number(vals.restitution) || 0));

    const pInitial = m * v;
    const impulse = pInitial * (1 + e);
    const forceAvgN = impulse / dt;
    const forceAvgKN = forceAvgN / 1000;
    const forceAvgLbf = forceAvgN * 0.224809;
    const gDecel = (forceAvgN / m) / 9.80665;
    const keInitialKJ = (0.5 * m * v * v) / 1000;

    const reboundImpulse = pInitial * e;

    return {
      hero: {
        value: `${pInitial.toLocaleString(undefined, { maximumFractionDigits: 0 })} N·s`,
        label: `Avg Impact Force: ${forceAvgKN.toFixed(1)} kN (${forceAvgLbf.toLocaleString(undefined, { maximumFractionDigits: 0 })} lbf) | ${gDecel.toFixed(1)} g`,
      },
      badge: {
        text: `${forceAvgKN.toFixed(0)} kN Collision Force`,
        tone: gDecel > 30 ? "warn" : "info",
      },
      chart: {
        type: "donut",
        title: "Collision Impulse: Primary vs Rebound Transfer (N·s)",
        data: [
          { name: `Stopping Impulse (${pInitial.toFixed(0)} N·s)`, value: Math.max(1, Math.round(pInitial)), color: "#3b82f6" },
          { name: `Rebound Impulse (${reboundImpulse.toFixed(0)} N·s)`, value: Math.max(1, Math.round(Math.max(0.1, reboundImpulse))), color: "#f59e0b" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Linear Momentum (p = mv)", value: `${pInitial.toLocaleString(undefined, { maximumFractionDigits: 1 })} kg·m/s (N·s)` },
        { label: "Total Collision Impulse (J = Δp)", value: `${impulse.toLocaleString(undefined, { maximumFractionDigits: 1 })} N·s (${(impulse * 0.2248).toFixed(1)} lbf·s)` },
        { label: "Average Impact Collision Force (F = J/Δt)", value: `${forceAvgKN.toFixed(2)} kN (${forceAvgN.toLocaleString(undefined, { maximumFractionDigits: 0 })} N)` },
        { label: "Deceleration Magnitude (g-force)", value: `${gDecel.toFixed(1)} g (${(gDecel * 9.807).toFixed(1)} m/s²)` },
        { label: "Initial Kinetic Energy (KE)", value: `${keInitialKJ.toFixed(2)} kJ` },
        { label: "Collision Elasticity Profile", value: e === 0 ? "Perfect Inelastic (Plastic Crumple)" : `${(e * 100).toFixed(0)}% Elastic Rebound` },
      ],
      steps: [
        `Calculate initial momentum: p = m × v = ${m.toLocaleString()} kg × ${v.toFixed(2)} m/s = ${pInitial.toFixed(1)} N·s.`,
        `Apply restitution factor for total impulse: J = p × (1 + ${e.toFixed(2)}) = ${impulse.toFixed(1)} N·s.`,
        `Apply Impulse-Momentum theorem for impact force: F_avg = J ÷ Δt = ${impulse.toFixed(1)} N·s ÷ ${dt.toFixed(4)} s = ${forceAvgN.toLocaleString(undefined, { maximumFractionDigits: 0 })} Newtons (${forceAvgKN.toFixed(1)} kN).`,
        `Determine deceleration rate: a = F ÷ m = ${forceAvgN.toFixed(0)} N ÷ ${m.toLocaleString()} kg = ${(forceAvgN / m).toFixed(1)} m/s² (${gDecel.toFixed(1)} g).`,
      ],
      note: { text: "Extending impact duration Δt via crumple zones and airbags directly reduces collision force in inverse proportion: doubling Δt cuts peak bodily impact force in half." },
    };
  },
};

export default function MomentumCalculator() {
  return <CalcEngine config={config} />;
}
