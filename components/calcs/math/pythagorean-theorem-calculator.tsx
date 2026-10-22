"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "pythagorean-calc",
  title: "Pythagorean Theorem Calculator (a² + b² = c²)",
  presets: [
    { label: "Classic 3-4-5 Triangle", values: { solveFor: "c", a: 3, b: 4, c: 5 } },
    { label: "5-12-13 Triple", values: { solveFor: "c", a: 5, b: 12, c: 13 } },
    { label: "8-15-17 Triple", values: { solveFor: "c", a: 8, b: 15, c: 17 } },
    { label: "7-24-25 Triple", values: { solveFor: "c", a: 7, b: 24, c: 25 } },
  ],
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

    const steps = [
      `Pythagorean Theorem: a² + b² = c²`,
      solve === "c"
        ? `c = √(a² + b²) = √(${a}² + ${b}²) = √(${fixed(a*a, 2)} + ${fixed(b*b, 2)}) = √${fixed(c*c, 2)} = ${fixed(c, 3)}`
        : solve === "a"
        ? `a = √(c² − b²) = √(${c}² − ${b}²) = √(${fixed(c*c, 2)} − ${fixed(b*b, 2)}) = √${fixed(a*a, 2)} = ${fixed(a, 3)}`
        : `b = √(c² − a²) = √(${c}² − ${a}²) = √(${fixed(c*c, 2)} − ${fixed(a*a, 2)}) = √${fixed(b*b, 2)} = ${fixed(b, 3)}`,
      `Triangle Area = ½ × a × b = ½ × ${fixed(a, 2)} × ${fixed(b, 2)} = ${fixed(area, 3)} sq units`,
      `Perimeter = a + b + c = ${fixed(a, 2)} + ${fixed(b, 2)} + ${fixed(c, 2)} = ${fixed(perimeter, 3)} units`,
      `Acute Angles: ∠A = ${fixed(angleA, 2)}°, ∠B = ${fixed(angleB, 2)}°, Right Angle ∠C = 90°`,
    ];

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
      steps,
      chart: {
        type: "donut",
        title: "Hypotenuse Area Decomposition (a² + b² = c²)",
        data: [
          { name: `Leg a² (${fixed(a * a, 2)})`, value: Math.max(0.01, a * a), color: "#10b981" },
          { name: `Leg b² (${fixed(b * b, 2)})`, value: Math.max(0.01, b * b), color: "#06b6d4" },
        ],
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
