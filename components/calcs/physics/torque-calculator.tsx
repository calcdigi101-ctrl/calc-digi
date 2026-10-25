'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "torque-calculator",
  title: "Torque & Rotational Moment Calculator",
  fields: [
    {
      kind: "number",
      key: "force",
      label: "Applied Force F (Newtons)",
      default: 250,
      min: 0,
      max: 10000000,
      hint: "Force applied to lever arm (250 N ≈ 56.2 lbf)",
    },
    {
      kind: "number",
      key: "radius",
      label: "Lever Arm Distance r (Meters)",
      default: 0.60,
      min: 0.001,
      max: 10000,
      hint: "Distance from rotational axis to force application point (0.60m = 23.6 inches)",
    },
    {
      kind: "number",
      key: "angle",
      label: "Angle Between Lever & Force θ (Degrees)",
      default: 90,
      min: 0,
      max: 180,
      hint: "90° = perpendicular (maximum torque); 0° = pulling along lever (zero torque)",
    },
    {
      kind: "number",
      key: "rpm",
      label: "Shaft Rotational Speed (RPM)",
      default: 1800,
      min: 0,
      max: 50000,
      hint: "Revolutions per minute for mechanical horsepower calculation",
    },
  ],
  presets: [
    {
      label: "Automotive Wheel Lug Wrench (90°)",
      values: { force: 240, radius: 0.50, angle: 90, rpm: 0 },
    },
    {
      label: "Turbo V8 Engine Dyno Peak Torque",
      values: { force: 2800, radius: 0.25, angle: 90, rpm: 4200 },
    },
    {
      label: "Heavy Industrial Pipeline Valve",
      values: { force: 450, radius: 1.20, angle: 75, rpm: 5 },
    },
  ],
  compute: (vals) => {
    const f = Math.max(0, Number(vals.force) || 0);
    const r = Math.max(0.0001, Number(vals.radius) || 1);
    const angleDeg = Math.min(180, Math.max(0, Number(vals.angle) || 90));
    const rpm = Math.max(0, Number(vals.rpm) || 0);

    const rad = (angleDeg * Math.PI) / 180;
    const sinTheta = Math.sin(rad);
    const cosTheta = Math.cos(rad);

    const tauNm = f * r * sinTheta;
    const tauLbFt = tauNm * 0.737562;
    const tauInLb = tauLbFt * 12;

    const rPerp = r * sinTheta;
    const fTangential = f * sinTheta;
    const fRadial = Math.abs(f * cosTheta);

    const omegaRadS = (rpm * 2 * Math.PI) / 60;
    const powerWatts = tauNm * omegaRadS;
    const powerHP = powerWatts / 745.7;

    return {
      hero: {
        value: `${tauNm.toFixed(1)} N·m`,
        label: `${tauLbFt.toFixed(1)} lb-ft | ${tauInLb.toFixed(0)} in-lb | ${powerHP.toFixed(1)} HP @ ${rpm} RPM`,
      },
      badge: {
        text: `${tauLbFt.toFixed(0)} Pound-Feet Torque`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Torque Vector Decomposition (N·m)",
        data: [
          { name: `Effective Torque (${tauNm.toFixed(1)} N·m)`, value: Math.max(0.1, Number(tauNm.toFixed(1))), color: "#10b981" },
          { name: `Radial Lost Effort (${(f * r * Math.abs(cosTheta)).toFixed(1)} N·m)`, value: Math.max(0.1, Number((f * r * Math.abs(cosTheta)).toFixed(1))), color: "#94a3b8" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Generated Torque Moment (τ = F·r·sinθ)", value: `${tauNm.toFixed(2)} N·m (${tauLbFt.toFixed(2)} lb-ft)` },
        { label: "Imperial Torque (Inch-Pounds)", value: `${tauInLb.toFixed(1)} in-lb` },
        { label: "Rotational Power at Operating RPM", value: rpm > 0 ? `${(powerWatts / 1000).toFixed(2)} kW (${powerHP.toFixed(1)} HP)` : "Static Wrench (0 RPM)" },
        { label: "Effective Perpendicular Lever Arm (r·sinθ)", value: `${rPerp.toFixed(3)} meters (${(rPerp * 39.3701).toFixed(1)} inches)` },
        { label: "Tangential Working Force Component", value: `${fTangential.toFixed(1)} N (${(fTangential * 0.2248).toFixed(1)} lbf)` },
        { label: "Radial Non-Working Tension Component", value: `${fRadial.toFixed(1)} N (Performs 0 torque)` },
      ],
      steps: [
        `Evaluate vector sine component: sin(${angleDeg}°) = ${sinTheta.toFixed(4)}.`,
        `Determine effective moment arm: r_perp = ${r.toFixed(3)} m × ${sinTheta.toFixed(4)} = ${rPerp.toFixed(3)} m.`,
        `Multiply applied force by moment arm: τ = ${f.toLocaleString()} N × ${rPerp.toFixed(3)} m = ${tauNm.toFixed(2)} N·m (${tauLbFt.toFixed(2)} lb-ft).`,
        `Calculate mechanical power at ${rpm} RPM: P = τ × (2π × ${rpm} ÷ 60) = ${tauNm.toFixed(1)} × ${omegaRadS.toFixed(2)} = ${(powerWatts / 1000).toFixed(2)} kW (${powerHP.toFixed(1)} HP).`,
      ],
      note: { text: "Torque is a rotational cross-product (τ = r × F). Pushing directly along the lever arm (θ = 0° or 180°) produces zero rotational torque." },
    };
  },
};

export default function TorqueCalculator() {
  return <CalcEngine config={config} />;
}
