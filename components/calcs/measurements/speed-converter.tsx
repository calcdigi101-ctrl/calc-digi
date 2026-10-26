"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const speedConverterConfig: CalcConfig = {
  id: "speed-converter",
  title: "Speed & Velocity Unit Converter",
  fields: [
    { kind: "number", key: "value", label: "Velocity Value", default: 60, min: 0.000001, max: 1000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "mph",
      options: [
        { label: "Miles per hour (mph)", value: "mph" },
        { label: "Kilometers per hour (km/h)", value: "kmh" },
        { label: "Meters per second (m/s)", value: "ms" },
        { label: "Knots (kt)", value: "knot" },
        { label: "Feet per second (ft/s)", value: "fts" },
        { label: "Mach (sea level 15°C)", value: "mach" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "kmh",
      options: [
        { label: "Miles per hour (mph)", value: "mph" },
        { label: "Kilometers per hour (km/h)", value: "kmh" },
        { label: "Meters per second (m/s)", value: "ms" },
        { label: "Knots (kt)", value: "knot" },
        { label: "Feet per second (ft/s)", value: "fts" },
        { label: "Mach (sea level 15°C)", value: "mach" },
      ],
    },
  ],
  presets: [
    { label: "60 mph to km/h (US Highway)", values: { value: 60, fromUnit: "mph", toUnit: "kmh" } },
    { label: "100 km/h to mph (European Highway)", values: { value: 100, fromUnit: "kmh", toUnit: "mph" } },
    { label: "250 Knots to km/h (Aviation Airspeed)", values: { value: 250, fromUnit: "knot", toUnit: "kmh" } },
    { label: "343 m/s to Mach (Speed of Sound)", values: { value: 343, fromUnit: "ms", toUnit: "mach" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 60);
    const from = String(vals.fromUnit || "mph");
    const to = String(vals.toUnit || "kmh");

    const TO_MS: Record<string, number> = {
      ms: 1,
      kmh: 1 / 3.6,
      mph: 0.44704,
      knot: 0.514444444,
      fts: 0.3048,
      mach: 340.29,
    };

    const ms = val * (TO_MS[from] || 1);
    const converted = ms / (TO_MS[to] || 1);

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${to}`,
        label: `Converted Speed (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Speed", value: `${val} ${from}` },
        { label: "SI Velocity (m/s)", value: `${ms.toFixed(3)} m/s` },
        { label: "Converted Target Speed", value: `${converted.toFixed(3)} ${to}` },
        { label: "In Kilometers/Hour", value: `${(ms * 3.6).toFixed(2)} km/h` },
        { label: "In Miles/Hour", value: `${(ms / 0.44704).toFixed(2)} mph` },
        { label: "In Nautical Knots", value: `${(ms / 0.514444).toFixed(2)} kt` },
      ],
      steps: [
        `Convert to SI standard velocity: ${val} × ${TO_MS[from]} = ${ms.toFixed(3)} m/s.`,
        `Scale to target unit: ${ms.toFixed(3)} ÷ ${TO_MS[to]} = ${converted.toFixed(3)} ${to}.`,
        `Kinetic travel distance per minute: ${(ms * 60).toFixed(1)} meters/minute.`,
      ],
      chart: {
        type: "donut",
        title: "Velocity Relative to Speed of Sound (Mach 1)",
        format: "pct",
        data: [
          { name: "Active Velocity Ratio", value: Math.min(100, Math.round((ms / 340.29) * 100)) || 18, color: "#8b5cf6" },
          { name: "Transonic Headroom", value: Math.max(0, 100 - (Math.min(100, Math.round((ms / 340.29) * 100)) || 18)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function SpeedConverterComponent() {
  return <CalcEngine config={speedConverterConfig} />;
}
