"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "pythagorean-calc",
  title: "Pythagorean Theorem Calculator (a² + b² = c²)",
  fields: [
    {
      kind: "choice",
      key: "solveFor",
      label: "Solve For",
      default: "c",
      segmented: true,
      options: [
        { value: "c", label: "Hypotenuse (c)" },
        { value: "a", label: "Leg (a)" },
        { value: "b", label: "Leg (b)" },
      ],
    },
    { kind: "number", key: "a", label: "Leg a", default: 3, min: 0.0001, showIf: (v) => v.solveFor !== "a" },
    { kind: "number", key: "b", label: "Leg b", default: 4, min: 0.0001, showIf: (v) => v.solveFor !== "b" },
    { kind: "number", key: "c", label: "Hypotenuse c", default: 5, min: 0.0001, showIf: (v) => v.solveFor === "a" || v.solveFor === "b" },
  ],
  compute(values) {
    const solve = String(values.solveFor || "c");
    let a = Number(values.a);
    let b = Number(values.b);
    let c = Number(values.c);

    if (solve === "c") {
      if (a <= 0 || b <= 0) return { error: "Both legs must have positive lengths." };
      c = Math.sqrt(a * a + b * b);
    } else if (solve === "a") {
      if (c <= b) return { error: "Hypotenuse c must be strictly greater than leg b." };
      a = Math.sqrt(c * c - b * b);
    } else if (solve === "b") {
      if (c <= a) return { error: "Hypotenuse c must be strictly greater than leg a." };
      b = Math.sqrt(c * c - a * a);
    }

    const area = 0.5 * a * b;
    const perimeter = a + b + c;
    const angleA = Math.asin(a / c) * (180 / Math.PI);
    const angleB = 90 - angleA;

    return {
      hero: {
        label: solve === "c" ? "Hypotenuse Length (c)" : solve === "a" ? "Leg Length (a)" : "Leg Length (b)",
        value: fixed(solve === "c" ? c : solve === "a" ? a : b, 3),
        unit: "units",
      },
      badge: {
        text: "Right Triangle (90°)",
        tone: "good",
      },
      rows: [
        { label: "Leg a", value: fixed(a, 3) },
        { label: "Leg b", value: fixed(b, 3) },
        { label: "Hypotenuse c", value: fixed(c, 3), strong: true },
        { label: "Triangle Area", value: fixed(area, 3) },
        { label: "Perimeter", value: fixed(perimeter, 3) },
        { label: "Angle α (opposite a)", value: `${fixed(angleA, 2)}°` },
        { label: "Angle β (opposite b)", value: `${fixed(angleB, 2)}°` },
      ],
      note: {
        text: `Formula: a² + b² = c² => ${fixed(a, 2)}² + ${fixed(b, 2)}² = ${fixed(a * a + b * b, 2)} = ${fixed(c, 2)}².`,
        tone: "neutral",
      },
    };
  },
};

export default function PythagoreanTheoremCalculator() {
  return <CalcEngine config={config} />;
}
