"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const torqueConverterConfig: CalcConfig = {
  id: "torque-converter",
  title: "Torque & Rotational Moment Unit Converter",
  fields: [
    {
      kind: "number",
      key: "value",
      label: "Torque Value",
      default: 100,
      min: 0.0001,
      max: 1000000000,
    },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "Nm",
      options: [
        { label: "Newton-meters (N·m)", value: "Nm" },
        { label: "Foot-pounds (ft-lb / lbf·ft)", value: "ft-lb" },
        { label: "Inch-pounds (in-lb / lbf·in)", value: "in-lb" },
        { label: "Kilogram-force meters (kgf·m)", value: "kgf-m" },
        { label: "CentiNewton-meters (cN·m)", value: "cNm" },
        { label: "Dyne-centimeters (dyn·cm)", value: "dyn-cm" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "ft-lb",
      options: [
        { label: "Newton-meters (N·m)", value: "Nm" },
        { label: "Foot-pounds (ft-lb / lbf·ft)", value: "ft-lb" },
        { label: "Inch-pounds (in-lb / lbf·in)", value: "in-lb" },
        { label: "Kilogram-force meters (kgf·m)", value: "kgf-m" },
        { label: "CentiNewton-meters (cN·m)", value: "cNm" },
        { label: "Dyne-centimeters (dyn·cm)", value: "dyn-cm" },
      ],
    },
  ],
  presets: [
    { label: "Automotive Wheel Lug Nut (100 N·m → ft-lb)", values: { value: 100, fromUnit: "Nm", toUnit: "ft-lb" } },
    { label: "Engine Flywheel Torque (250 ft-lb → N·m)", values: { value: 250, fromUnit: "ft-lb", toUnit: "Nm" } },
    { label: "Bicycle Stem Bolt (6 N·m → in-lb)", values: { value: 6, fromUnit: "Nm", toUnit: "in-lb" } },
    { label: "Heavy Industrial Flange (1500 N·m → kgf·m)", values: { value: 1500, fromUnit: "Nm", toUnit: "kgf-m" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.0001, Number(vals.value) || 100);
    const from = String(vals.fromUnit || "Nm");
    const to = String(vals.toUnit || "ft-lb");

    // Standard multipliers to convert to base Newton-meters (N·m)
    const TO_NM: Record<string, number> = {
      Nm: 1.0,
      "ft-lb": 1.3558179483314,
      "in-lb": 0.1129848290276,
      "kgf-m": 9.80665,
      cNm: 0.01,
      "dyn-cm": 1e-7,
    };

    const nm = val * (TO_NM[from] || 1.0);
    const converted = nm / (TO_NM[to] || 1.0);

    // Approximate bolt clamp tension on standard metric M10 bolt (K=0.20 friction)
    // T = K * D * F => F = T / (K * D) where D = 0.010 m
    const clampForceKn = (nm / (0.20 * 0.010)) / 1000;

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${to}`,
        label: `Converted Rotational Moment (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Torque", value: `${val} ${from}` },
        { label: "SI Base Equivalent", value: `${nm.toLocaleString("en-US", { maximumFractionDigits: 3 })} N·m (Joules/radian)` },
        { label: "Target Equivalent", value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${to}` },
        { label: "Imperial Foot-Pounds", value: `${(nm / 1.3558179483314).toFixed(3)} ft-lb` },
        { label: "Imperial Inch-Pounds", value: `${(nm / 0.1129848290276).toFixed(2)} in-lb` },
        { label: "Metric kgf-meters", value: `${(nm / 9.80665).toFixed(3)} kgf·m` },
        { label: "Est. Fastener Clamping Preload (M10)", value: `${clampForceKn.toFixed(1)} kN (~${(clampForceKn * 224.8).toFixed(0)} lbf)` },
      ],
      steps: [
        `Base conversion factor: 1 ${from} = ${TO_NM[from]} N·m.`,
        `Calculate intermediate torque: ${val} × ${TO_NM[from]} = ${nm.toFixed(3)} N·m.`,
        `Divide by target unit factor: ${nm.toFixed(3)} ÷ ${TO_NM[to]} = ${converted.toFixed(3)} ${to}.`,
      ],
      chart: {
        type: "donut",
        title: "Fastener Moment Distribution (Tension vs Friction)",
        format: "pct",
        data: [
          { name: "Thread & Underhead Friction", value: 90, color: "#f59e0b" },
          { name: "Useful Fastener Preload Tension", value: 10, color: "#10b981" },
        ],
      },
    };
  },
};

export default function TorqueConverterComponent() {
  return <CalcEngine config={torqueConverterConfig} />;
}
