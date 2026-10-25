'use client';

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const config: CalcConfig = {
  id: "work-energy-calculator",
  title: "Work & Mechanical Energy Calculator",
  fields: [
    {
      kind: "number",
      key: "force",
      label: "Applied Force F (Newtons)",
      default: 650,
      min: 0,
      max: 10000000,
      hint: "Magnitude of applied mechanical force (e.g. 650 N push/pull force)",
    },
    {
      kind: "number",
      key: "distance",
      label: "Displacement d (Meters)",
      default: 40,
      min: 0,
      max: 1000000,
      hint: "Linear distance object moves along the path",
    },
    {
      kind: "number",
      key: "angle",
      label: "Angle Between Force & Motion θ (Degrees)",
      default: 0,
      min: 0,
      max: 180,
      hint: "0° = force parallel to motion; 90° = perpendicular (zero work done); 180° = opposing braking force",
    },
    {
      kind: "number",
      key: "time",
      label: "Time Duration t (Seconds)",
      default: 15,
      min: 0.1,
      max: 86400,
      hint: "Time taken to complete the displacement",
    },
  ],
  presets: [
    {
      label: "Direct Horizontal Tow (0°)",
      values: { force: 500, distance: 30, angle: 0, time: 10 },
    },
    {
      label: "Tilted Cable Winch Pull (30°)",
      values: { force: 1200, distance: 25, angle: 30, time: 12 },
    },
    {
      label: "Opposing Braking Force (180°)",
      values: { force: 2000, distance: 15, angle: 180, time: 3 },
    },
  ],
  compute: (vals) => {
    const f = Math.max(0, Number(vals.force) || 0);
    const d = Math.max(0, Number(vals.distance) || 0);
    const angleDeg = Math.min(180, Math.max(0, Number(vals.angle) || 0));
    const t = Math.max(0.01, Number(vals.time) || 1);

    const rad = (angleDeg * Math.PI) / 180;
    const cosTheta = Math.cos(rad);
    const sinTheta = Math.sin(rad);

    const workJoules = f * d * cosTheta;
    const workKJ = workJoules / 1000;
    const workFtLbf = workJoules * 0.737562;
    const powerWatts = workJoules / t;
    const powerHP = powerWatts / 745.7;

    const fParallel = Math.abs(f * cosTheta);
    const fPerp = Math.abs(f * sinTheta);

    return {
      hero: {
        value: `${workKJ.toFixed(2)} kJ`,
        label: `${Math.round(workJoules).toLocaleString()} Joules | ${powerWatts.toFixed(0)} Watts (${powerHP.toFixed(1)} HP)`,
      },
      badge: {
        text: angleDeg === 90 ? "Zero Work (Perpendicular)" : `${(Math.abs(cosTheta) * 100).toFixed(0)}% Directional Efficiency`,
        tone: angleDeg === 90 ? "warn" : "good",
      },
      chart: {
        type: "donut",
        title: "Applied Force Vector Decomposition (N)",
        data: [
          { name: `Effective Motive Force (${fParallel.toFixed(0)} N)`, value: Math.max(0.1, Number(fParallel.toFixed(1))), color: "#10b981" },
          { name: `Perpendicular Force (${fPerp.toFixed(0)} N)`, value: Math.max(0.1, Number(fPerp.toFixed(1))), color: "#94a3b8" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Net Mechanical Work Done (W = F·d·cosθ)", value: `${workKJ.toFixed(2)} kJ (${workJoules.toLocaleString(undefined, { maximumFractionDigits: 1 })} J)` },
        { label: "Imperial Mechanical Work", value: `${workFtLbf.toLocaleString(undefined, { maximumFractionDigits: 1 })} ft-lbf` },
        { label: "Average Mechanical Power Rate (P = W/t)", value: `${powerWatts.toFixed(1)} Watts (${powerHP.toFixed(2)} HP)` },
        { label: "Parallel Motive Force Component (F·cosθ)", value: `${(f * cosTheta).toFixed(1)} N` },
        { label: "Perpendicular Normal Force Component (F·sinθ)", value: `${(f * sinTheta).toFixed(1)} N (Performs 0 work)` },
        { label: "Effective Vector Efficiency Factor", value: `cos(${angleDeg}°) = ${cosTheta.toFixed(3)}` },
      ],
      steps: [
        `Calculate vector cosine factor: cos(${angleDeg}°) = ${cosTheta.toFixed(4)}.`,
        `Determine effective parallel force: F_parallel = ${f.toLocaleString()} N × ${cosTheta.toFixed(4)} = ${(f * cosTheta).toFixed(1)} N.`,
        `Multiply parallel force by displacement: W = ${(f * cosTheta).toFixed(1)} N × ${d.toFixed(1)} m = ${workJoules.toLocaleString(undefined, { maximumFractionDigits: 1 })} Joules (${workKJ.toFixed(2)} kJ).`,
        `Compute power output: P = W ÷ t = ${workJoules.toFixed(1)} J ÷ ${t.toFixed(1)} s = ${powerWatts.toFixed(1)} Watts (${powerHP.toFixed(2)} HP).`,
      ],
      note: { text: "Work requires displacement along the line of force. Holding a 100 kg weight stationary at shoulder height performs zero physical work despite muscular fatigue." },
    };
  },
};

export default function WorkEnergyCalculator() {
  return <CalcEngine config={config} />;
}
