"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "circle-calc",
  title: "Circle Calculator (Radius, Area, Circumference)",
  presets: [
    { label: "Radius r = 5 (Standard)", values: { known: "radius", val: 5 } },
    { label: "Diameter d = 12 (Clock)", values: { known: "diameter", val: 12 } },
    { label: "Circumference C = 31.42", values: { known: "circumference", val: 31.4159 } },
    { label: "Area A = 100 (Round Table)", values: { known: "area", val: 100 } },
    { label: "Unit Circle (r = 1)", values: { known: "radius", val: 1 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "known",
      label: "Known Dimension",
      default: "radius",
      segmented: true,
      options: [
        { value: "radius", label: "Radius (r)" },
        { value: "diameter", label: "Diameter (d)" },
        { value: "circumference", label: "Circumference (C)" },
        { value: "area", label: "Area (A)" },
      ],
    },
    { kind: "number", key: "val", label: "Enter Value", default: 5, min: 0.0001 },
  ],
  compute(values) {
    const known = String(values.known || "radius");
    const val = Number(values.val);

    if (val <= 0) return { error: "Measurement value must be positive." };

    let r = 0;
    if (known === "radius") r = val;
    else if (known === "diameter") r = val / 2;
    else if (known === "circumference") r = val / (2 * Math.PI);
    else if (known === "area") r = Math.sqrt(val / Math.PI);

    const d = 2 * r;
    const c = 2 * Math.PI * r;
    const a = Math.PI * r * r;

    const steps = [
      `Input Dimension: ${known} = ${val}`,
      `Calculated Radius: r = ${fixed(r, 4)}`,
      `Diameter: d = 2r = 2 × ${fixed(r, 4)} = ${fixed(d, 4)}`,
      `Circumference: C = 2πr = 2 × π × ${fixed(r, 4)} = ${fixed(c, 4)}`,
      `Circle Area: A = πr² = π × (${fixed(r, 4)})² = ${fixed(a, 4)}`,
    ];

    return {
      hero: {
        label: "Circle Area",
        value: fixed(a, 3),
        unit: "sq units",
      },
      badge: {
        text: `Radius r = ${fixed(r, 3)}`,
        tone: "good",
      },
      rows: [
        { label: "Radius (r)", value: fixed(r, 4), strong: true },
        { label: "Diameter (d)", value: fixed(d, 4) },
        { label: "Circumference (C)", value: fixed(c, 4), strong: true },
        { label: "Area (A)", value: fixed(a, 4) },
      ],
      steps,
      note: {
        text: `Formulas: d = 2r | C = 2πr = ${fixed(c, 2)} | A = πr² = ${fixed(a, 2)}.`,
        tone: "neutral",
      },
    };
  },
};

export default function CircleCalculator() {
  return <CalcEngine config={config} />;
}
