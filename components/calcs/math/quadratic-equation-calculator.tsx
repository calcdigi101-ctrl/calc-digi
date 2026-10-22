"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "quadratic-calc",
  title: "Quadratic Equation Solver (ax² + bx + c = 0)",
  fields: [
    { kind: "number", key: "a", label: "Coefficient a (x²)", default: 1 },
    { kind: "number", key: "b", label: "Coefficient b (x)", default: -5 },
    { kind: "number", key: "c", label: "Constant c", default: 6 },
  ],
  compute(values) {
    const a = Number(values.a);
    const b = Number(values.b);
    const c = Number(values.c);

    if (a === 0) {
      if (b === 0) return { error: "When a = 0 and b = 0, the equation is degenerate." };
      const root = -c / b;
      return {
        hero: { label: "Linear Root (a = 0)", value: `x = ${fixed(root, 4)}` },
        badge: { text: "Linear Equation", tone: "info" },
        rows: [{ label: "Solution", value: fixed(root, 4) }],
      };
    }

    const disc = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = c - (b * b) / (4 * a);
    const opens = a > 0 ? "Upward (Minimum Vertex)" : "Downward (Maximum Vertex)";

    if (disc > 0) {
      const root1 = (-b + Math.sqrt(disc)) / (2 * a);
      const root2 = (-b - Math.sqrt(disc)) / (2 * a);
      return {
        hero: {
          label: "Real Solutions (Two Roots)",
          value: `x₁ = ${fixed(root1, 2)},  x₂ = ${fixed(root2, 2)}`,
        },
        badge: { text: `Discriminant Δ = ${fixed(disc, 2)} > 0`, tone: "good" },
        rows: [
          { label: "Root 1 (x₁)", value: fixed(root1, 4), strong: true },
          { label: "Root 2 (x₂)", value: fixed(root2, 4), strong: true },
          { label: "Parabola Vertex (h, k)", value: `(${fixed(vertexX, 2)}, ${fixed(vertexY, 2)})` },
          { label: "Axis of Symmetry", value: `x = ${fixed(vertexX, 2)}` },
          { label: "Y-Intercept", value: `(0, ${c})` },
          { label: "Parabola Direction", value: opens },
        ],
        note: {
          text: `Because the discriminant Δ = ${fixed(disc, 2)} is strictly positive, the parabola intersects the x-axis at two distinct real coordinates.`,
          tone: "neutral",
        },
      };
    } else if (disc === 0) {
      const root = -b / (2 * a);
      return {
        hero: {
          label: "Repeated Real Solution",
          value: `x = ${fixed(root, 4)}`,
        },
        badge: { text: "Discriminant Δ = 0 (Tangent Root)", tone: "info" },
        rows: [
          { label: "Root (x₁ = x₂)", value: fixed(root, 4), strong: true },
          { label: "Vertex (h, k)", value: `(${fixed(vertexX, 2)}, ${fixed(vertexY, 2)})` },
          { label: "Axis of Symmetry", value: `x = ${fixed(vertexX, 2)}` },
          { label: "Y-Intercept", value: `(0, ${c})` },
          { label: "Parabola Direction", value: opens },
        ],
      };
    } else {
      const realPart = -b / (2 * a);
      const imagPart = Math.sqrt(-disc) / (2 * a);
      return {
        hero: {
          label: "Complex Conjugate Roots",
          value: `${fixed(realPart, 2)} ± ${fixed(Math.abs(imagPart), 2)}i`,
        },
        badge: { text: `Discriminant Δ = ${fixed(disc, 2)} < 0`, tone: "warn" },
        rows: [
          { label: "Root 1 (x₁)", value: `${fixed(realPart, 4)} + ${fixed(Math.abs(imagPart), 4)}i`, strong: true },
          { label: "Root 2 (x₂)", value: `${fixed(realPart, 4)} − ${fixed(Math.abs(imagPart), 4)}i`, strong: true },
          { label: "Real Part", value: fixed(realPart, 4) },
          { label: "Imaginary Magnitude", value: fixed(Math.abs(imagPart), 4) },
          { label: "Parabola Vertex", value: `(${fixed(vertexX, 2)}, ${fixed(vertexY, 2)})` },
          { label: "Parabola Direction", value: opens },
        ],
        note: {
          text: "Because the discriminant is negative, the parabola does not cross the real x-axis; solutions exist as complex conjugate pairs.",
          tone: "neutral",
        },
      };
    }
  },
};

export default function QuadraticEquationCalculator() {
  return <CalcEngine config={config} />;
}
