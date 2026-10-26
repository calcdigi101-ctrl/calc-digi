"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const angleConverterConfig: CalcConfig = {
  id: "angle-converter",
  title: "Angle & Trigonometric Unit Converter",
  fields: [
    { kind: "number", key: "value", label: "Angle Value", default: 180, min: -1000000, max: 1000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "deg",
      options: [
        { label: "Degrees (°)", value: "deg" },
        { label: "Radians (rad)", value: "rad" },
        { label: "Gradians (grad)", value: "grad" },
        { label: "Revolutions / Turns (rev)", value: "rev" },
        { label: "Arcminutes (arcmin)", value: "arcmin" },
        { label: "Arcseconds (arcsec)", value: "arcsec" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "rad",
      options: [
        { label: "Degrees (°)", value: "deg" },
        { label: "Radians (rad)", value: "rad" },
        { label: "Gradians (grad)", value: "grad" },
        { label: "Revolutions / Turns (rev)", value: "rev" },
        { label: "Arcminutes (arcmin)", value: "arcmin" },
        { label: "Arcseconds (arcsec)", value: "arcsec" },
      ],
    },
  ],
  presets: [
    { label: "180 Degrees to Radians (Half Circle)", values: { value: 180, fromUnit: "deg", toUnit: "rad" } },
    { label: "1 Radian to Degrees (Mathematical Unit)", values: { value: 1, fromUnit: "rad", toUnit: "deg" } },
    { label: "1 Full Turn to Gradians (Surveying)", values: { value: 1, fromUnit: "rev", toUnit: "grad" } },
    { label: "1 Degree to Arcminutes (Astronomy)", values: { value: 1, fromUnit: "deg", toUnit: "arcmin" } },
  ],
  compute: (vals) => {
    const val = Number(vals.value) ?? 180;
    const from = String(vals.fromUnit || "deg");
    const to = String(vals.toUnit || "rad");

    const TO_DEGREES: Record<string, number> = {
      deg: 1,
      rad: 180 / Math.PI,
      grad: 0.9,
      rev: 360,
      arcmin: 1 / 60,
      arcsec: 1 / 3600,
    };

    const degrees = val * (TO_DEGREES[from] || 1);
    const converted = degrees / (TO_DEGREES[to] || 1);
    const radians = degrees * (Math.PI / 180);

    return {
      hero: {
        value: `${converted.toFixed(5)} ${to}`,
        label: `Converted Angular Dimension (${val} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Input Angle", value: `${val} ${from}` },
        { label: "Normalized Degrees (°)", value: `${(degrees % 360).toFixed(3)}°` },
        { label: "Mathematical Radians", value: `${radians.toFixed(5)} rad` },
        { label: "Radians as π fraction", value: `${(degrees / 180).toFixed(4)} π rad` },
        { label: "Surveying Gradians", value: `${(degrees / 0.9).toFixed(3)} grad` },
        { label: "Complete Circle Fractions", value: `${(degrees / 360).toFixed(4)} turns` },
      ],
      steps: [
        `Convert to degrees baseline: ${val} × ${TO_DEGREES[from].toFixed(4)} = ${degrees.toFixed(4)}°.`,
        `Apply target transform: ${degrees.toFixed(4)} ÷ ${TO_DEGREES[to].toFixed(4)} = ${converted.toFixed(5)} ${to}.`,
        `Trigonometric sine/cosine: sin(θ) = ${Math.sin(radians).toFixed(4)}, cos(θ) = ${Math.cos(radians).toFixed(4)}.`,
      ],
      chart: {
        type: "donut",
        title: "Angular Arc Share of 360° Circle",
        format: "pct",
        data: [
          { name: "Active Sweep Angle", value: Math.min(100, Math.round(((degrees % 360) / 360) * 100)) || 50, color: "#10b981" },
          { name: "Complementary Arc", value: Math.max(0, 100 - (Math.min(100, Math.round(((degrees % 360) / 360) * 100)) || 50)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function AngleConverterComponent() {
  return <CalcEngine config={angleConverterConfig} />;
}
