'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "circular-motion-calculator",
  title: "Circular Motion & Centripetal Acceleration Calculator",
  fields: [
    {
      kind: "number",
      key: "radius",
      label: "Radius of Circular Path r (Meters)",
      default: 45,
      min: 0.1,
      max: 100000000,
      hint: "Distance from rotational axis to moving center of mass (e.g. 45m highway curve, 0.5m centrifuge)",
    },
    {
      kind: "number",
      key: "velocity",
      label: "Tangential Velocity v (m/s)",
      default: 22.22,
      min: 0.01,
      max: 100000,
      hint: "Linear velocity along the curved path (22.22 m/s = 80 km/h = 49.7 mph)",
    },
    {
      kind: "number",
      key: "mass",
      label: "Mass of Rotating Body m (kg)",
      default: 1400,
      min: 0.001,
      max: 10000000,
      hint: "Mass of the cornering object (e.g. 1,400 kg passenger sedan, 75 kg bobsledder)",
    },
  ],
  presets: [
    {
      label: "Highway Cloverleaf Exit Ramp (80 km/h)",
      values: { radius: 50, velocity: 22.22, mass: 1450 },
    },
    {
      label: "Formula 1 High-Downforce Corner (180 km/h)",
      values: { radius: 65, velocity: 50, mass: 798 },
    },
    {
      label: "Laboratory Centrifuge Test Tube (10 cm)",
      values: { radius: 0.10, velocity: 45, mass: 0.05 },
    },
  ],
  compute: (vals) => {
    const r = Math.max(0.01, Number(vals.radius) || 1);
    const v = Math.max(0.001, Number(vals.velocity) || 1);
    const m = Math.max(0.001, Number(vals.mass) || 1);

    const aCentripetal = (v * v) / r;
    const gRatio = aCentripetal / 9.80665;
    const fCentripetal = m * aCentripetal;
    const fCentripetalKN = fCentripetal / 1000;
    const fCentripetalLbf = fCentripetal * 0.224809;

    const omegaRad = v / r;
    const rpm = (omegaRad * 60) / (2 * Math.PI);
    const periodT = (2 * Math.PI * r) / v;
    const freqHz = 1 / periodT;

    const bankAngleRad = Math.atan((v * v) / (r * 9.80665));
    const bankAngleDeg = (bankAngleRad * 180) / Math.PI;

    return {
      hero: {
        value: `${aCentripetal.toFixed(2)} m/s²`,
        label: `${gRatio.toFixed(2)} g | ${fCentripetalKN.toFixed(1)} kN Centripetal Force | Bank Angle: ${bankAngleDeg.toFixed(1)}°`,
      },
      badge: {
        text: `${gRatio.toFixed(2)} g-force`,
        tone: gRatio > 3 ? "warn" : "good",
      },
      chart: {
        type: "donut",
        title: "Rotational Motion Angular vs Linear Vector",
        data: [
          { name: `Tangential Speed (${(v * 3.6).toFixed(0)} km/h)`, value: Math.max(0.1, Number((v * 3.6).toFixed(1))), color: "#3b82f6" },
          { name: `Centripetal Radial Accel (${aCentripetal.toFixed(0)} m/s²)`, value: Math.max(0.1, Number(aCentripetal.toFixed(1))), color: "#ef4444" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Centripetal Acceleration (a_c = v²/r)", value: `${aCentripetal.toFixed(3)} m/s² (${(aCentripetal * 3.28084).toFixed(2)} ft/s²)` },
        { label: "Lateral Acceleration g-Force", value: `${gRatio.toFixed(3)} g (Standard Earth g = 9.807 m/s²)` },
        { label: "Required Inward Centripetal Force", value: `${fCentripetalKN.toFixed(2)} kN (${fCentripetalLbf.toLocaleString(undefined, { maximumFractionDigits: 1 })} lbf)` },
        { label: "Angular Rotational Velocity (ω)", value: `${omegaRad.toFixed(3)} rad/s (${rpm.toFixed(1)} RPM)` },
        { label: "Period of Full Orbital Revolution (T)", value: `${periodT.toFixed(3)} seconds (Frequency = ${freqHz.toFixed(3)} Hz)` },
        { label: "Ideal Frictionless Road Bank Angle", value: `${bankAngleDeg.toFixed(2)}° above horizontal` },
      ],
      steps: [
        `Square tangential velocity: v² = (${v.toFixed(2)} m/s)² = ${(v * v).toFixed(2)} m²/s².`,
        `Divide by turn radius: a_c = v² / r = ${(v * v).toFixed(2)} ÷ ${r.toFixed(2)} m = ${aCentripetal.toFixed(3)} m/s².`,
        `Determine lateral g-force: g-ratio = a_c ÷ 9.80665 m/s² = ${gRatio.toFixed(3)} g.`,
        `Calculate required centripetal motive force: F_c = m × a_c = ${m.toLocaleString()} kg × ${aCentripetal.toFixed(3)} m/s² = ${fCentripetal.toLocaleString(undefined, { maximumFractionDigits: 1 })} N (${fCentripetalKN.toFixed(2)} kN).`,
        `Solve frictionless bank angle: θ = arctan(v² / rg) = arctan(${((v*v)/(r*9.80665)).toFixed(4)}) = ${bankAngleDeg.toFixed(2)}°.`,
      ],
      note: { text: "Centripetal force is directed inward toward the center of curvature. Centrifugal force is the fictitious inertial reaction perceived by observers within the rotating frame." },
    };
  },
};

export default function CircularMotionCalculator() {
  return <CalcEngine config={config} />;
}
