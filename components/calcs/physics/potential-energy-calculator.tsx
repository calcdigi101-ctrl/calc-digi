'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "potential-energy-calculator",
  title: "Gravitational Potential Energy Calculator",
  fields: [
    {
      kind: "number",
      key: "mass",
      label: "Object Mass m (kg)",
      default: 85,
      min: 0.001,
      max: 10000000,
      hint: "Mass of the elevated body (e.g. 85 kg human climber, 1,000 kg water pallet)",
    },
    {
      kind: "number",
      key: "height",
      label: "Elevation Height h (Meters)",
      default: 35,
      min: 0,
      max: 100000,
      hint: "Vertical elevation above datum (e.g. 35m building, 100m dam head)",
    },
    {
      kind: "number",
      key: "gravity",
      label: "Local Gravitational Constant g (m/s²)",
      default: 9.81,
      min: 0.1,
      max: 50,
      hint: "Standard Earth surface gravity is 9.80665 m/s²",
    },
  ],
  presets: [
    {
      label: "Skyscraper Observation Roof (150m)",
      values: { mass: 80, height: 150, gravity: 9.81 },
    },
    {
      label: "Hydroelectric Dam Water Column (100m)",
      values: { mass: 1000, height: 100, gravity: 9.81 },
    },
    {
      label: "Lunar Base Crane Hoist (Moon 1.62 m/s²)",
      values: { mass: 500, height: 20, gravity: 1.62 },
    },
  ],
  compute: (vals) => {
    const m = Math.max(0.001, Number(vals.mass) || 1);
    const h = Math.max(0, Number(vals.height) || 0);
    const g = Math.max(0.1, Number(vals.gravity) || 9.80665);

    const peJoules = m * g * h;
    const peKJ = peJoules / 1000;
    const peMJ = peJoules / 1000000;
    const peKWh = peJoules / 3600000;
    const peKcal = peJoules / 4184;
    const weightN = m * g;
    const vEquiv = Math.sqrt(2 * g * h);

    const peEarth = m * 9.807 * h / 1000;
    const peMoon = m * 1.622 * h / 1000;
    const peMars = m * 3.72 * h / 1000;
    const peJupiter = m * 24.79 * h / 1000;

    return {
      hero: {
        value: peMJ >= 1 ? `${peMJ.toFixed(2)} MJ` : `${peKJ.toFixed(1)} kJ`,
        label: `${peJoules.toLocaleString(undefined, { maximumFractionDigits: 0 })} Joules | Free Fall v = ${(vEquiv * 3.6).toFixed(1)} km/h`,
      },
      badge: {
        text: `${weightN.toFixed(0)} N Weight Load`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Potential Energy by Celestial Gravity (kJ)",
        data: [
          { name: `Earth 9.81 m/s² (${peEarth.toFixed(1)} kJ)`, value: Math.max(0.1, Number(peEarth.toFixed(1))), color: "#3b82f6" },
          { name: `Moon 1.62 m/s² (${peMoon.toFixed(1)} kJ)`, value: Math.max(0.1, Number(peMoon.toFixed(1))), color: "#94a3b8" },
          { name: `Mars 3.72 m/s² (${peMars.toFixed(1)} kJ)`, value: Math.max(0.1, Number(peMars.toFixed(1))), color: "#f59e0b" },
          { name: `Jupiter 24.8 m/s² (${peJupiter.toFixed(1)} kJ)`, value: Math.max(0.1, Number(peJupiter.toFixed(1))), color: "#ef4444" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Gravitational Potential Energy (PE = mgh)", value: `${peKJ.toLocaleString(undefined, { maximumFractionDigits: 2 })} kJ (${peMJ.toFixed(3)} MJ)` },
        { label: "Electrical Storage Value", value: `${peKWh.toFixed(4)} kWh` },
        { label: "Food Calorie Equivalent", value: `${peKcal.toFixed(1)} kcal` },
        { label: "Gravitational Weight Load (W = mg)", value: `${weightN.toLocaleString(undefined, { maximumFractionDigits: 1 })} N (${(weightN * 0.224809).toFixed(1)} lbf)` },
        { label: "Equivalent Free Fall Velocity (v = √(2gh))", value: `${vEquiv.toFixed(2)} m/s (${(vEquiv * 3.6).toFixed(1)} km/h | ${(vEquiv * 2.237).toFixed(1)} mph)` },
        { label: "Vertical Elevation Head", value: `${h.toFixed(1)} meters (${(h * 3.28084).toFixed(1)} feet)` },
      ],
      steps: [
        `Compute gravitational weight force: W = m × g = ${m.toLocaleString()} kg × ${g.toFixed(2)} m/s² = ${weightN.toFixed(1)} N.`,
        `Multiply weight by elevation height: PE = W × h = ${weightN.toFixed(1)} N × ${h.toFixed(1)} m = ${peJoules.toLocaleString(undefined, { maximumFractionDigits: 1 })} Joules.`,
        `Convert to kilojoules and kilowatt-hours: ${peKJ.toFixed(2)} kJ = ${peKWh.toFixed(4)} kWh.`,
        `Solve conversion to kinetic energy: v = √(2gh) = √(2 × ${g.toFixed(2)} × ${h.toFixed(1)}) = ${vEquiv.toFixed(2)} m/s (${(vEquiv * 3.6).toFixed(1)} km/h).`,
      ],
      note: { text: "Assumes uniform gravitational field g. For orbital elevations (h > 100 km), Newton's general gravitational potential PE = -G·M·m/r must be employed." },
    };
  },
};

export default function PotentialEnergyCalculator() {
  return <CalcEngine config={config} />;
}
