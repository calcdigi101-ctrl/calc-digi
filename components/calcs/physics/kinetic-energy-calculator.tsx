'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "kinetic-energy-calculator",
  title: "Kinetic Energy Dynamics Calculator",
  fields: [
    {
      kind: "number",
      key: "mass",
      label: "Object Mass m (kg)",
      default: 1500,
      min: 0.001,
      max: 10000000,
      hint: "Mass of the translating body (e.g., 0.145 kg baseball, 1,500 kg automobile, 400,000 kg train)",
    },
    {
      kind: "number",
      key: "velocity",
      label: "Translational Velocity v (m/s)",
      default: 27.78,
      min: 0,
      max: 100000,
      hint: "Speed in meters/sec (27.78 m/s = 100 km/h; 44.7 m/s = 100 mph; 343 m/s = Speed of Sound)",
    },
  ],
  presets: [
    {
      label: "Highway Passenger Sedan (100 km/h)",
      values: { mass: 1550, velocity: 27.78 },
    },
    {
      label: "Major League Baseball Fastball (95 mph)",
      values: { mass: 0.145, velocity: 42.47 },
    },
    {
      label: "High-Speed Rail Trainset (300 km/h)",
      values: { mass: 420000, velocity: 83.33 },
    },
  ],
  compute: (vals) => {
    const m = Math.max(0.0001, Number(vals.mass) || 1);
    const v = Math.max(0, Number(vals.velocity) || 0);

    const keJoules = 0.5 * m * v * v;
    const keKJ = keJoules / 1000;
    const keMJ = keJoules / 1000000;
    const keKWh = keJoules / 3600000;
    const keFtLbf = keJoules * 0.737562;
    const momentumNs = m * v;
    const gramsTNT = keJoules / 4184;

    const vHalf = v * 0.5;
    const keHalf = 0.5 * m * vHalf * vHalf;
    const keGain = Math.max(0.1, keJoules - keHalf);

    return {
      hero: {
        value: keMJ >= 1 ? `${keMJ.toFixed(2)} MJ` : `${keKJ.toFixed(1)} kJ`,
        label: `${keJoules.toLocaleString(undefined, { maximumFractionDigits: 0 })} Joules | ${(v * 3.6).toFixed(1)} km/h | ${(v * 2.237).toFixed(1)} mph`,
      },
      badge: {
        text: `${keKWh.toFixed(3)} kWh Energy`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Kinetic Energy Quadratic Velocity Split",
        data: [
          { name: `Base at Half Speed (${(keHalf / 1000).toFixed(1)} kJ)`, value: Math.max(0.1, Number((keHalf / 1000).toFixed(1))), color: "#3b82f6" },
          { name: `Quadratic Speed Gain (${(keGain / 1000).toFixed(1)} kJ)`, value: Math.max(0.1, Number((keGain / 1000).toFixed(1))), color: "#ef4444" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Translational Kinetic Energy (KE = ½mv²)", value: `${keKJ.toLocaleString(undefined, { maximumFractionDigits: 2 })} kJ (${keMJ.toFixed(3)} MJ)` },
        { label: "Imperial Energy (Foot-Pounds)", value: `${keFtLbf.toLocaleString(undefined, { maximumFractionDigits: 0 })} ft-lbf` },
        { label: "Electrical Energy Equivalent", value: `${keKWh.toFixed(4)} kWh` },
        { label: "Linear Momentum Magnitude (p = mv)", value: `${momentumNs.toLocaleString(undefined, { maximumFractionDigits: 1 })} N·s (kg·m/s)` },
        { label: "TNT Explosive Energy Equivalent", value: `${gramsTNT.toFixed(2)} grams TNT (1g TNT = 4,184 J)` },
        { label: "Translational Velocity", value: `${v.toFixed(2)} m/s (${(v * 3.6).toFixed(1)} km/h | ${(v * 2.237).toFixed(1)} mph)` },
      ],
      steps: [
        `Square instantaneous velocity: v² = (${v.toFixed(2)} m/s)² = ${(v * v).toFixed(2)} m²/s².`,
        `Multiply by inertial mass: m × v² = ${m.toLocaleString()} kg × ${(v * v).toFixed(2)} = ${(m * v * v).toFixed(1)}.`,
        `Halve for Newtonian kinetic integral: KE = ½ × ${(m * v * v).toFixed(1)} = ${keJoules.toLocaleString(undefined, { maximumFractionDigits: 1 })} Joules (${keKJ.toFixed(2)} kJ).`,
        `Calculate linear momentum vector: p = m × v = ${m.toLocaleString()} kg × ${v.toFixed(2)} m/s = ${momentumNs.toFixed(1)} N·s.`,
      ],
      note: { text: "Kinetic energy scales quadratically with speed (v²). Doubling your speed quadruples your kinetic energy and braking distance." },
    };
  },
};

export default function KineticEnergyCalculator() {
  return <CalcEngine config={config} />;
}
