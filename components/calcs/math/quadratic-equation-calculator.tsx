"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "quadratic-calc",
  title: "Quadratic Equation Solver (ax² + bx + c = 0)",
  presets: [
    { label: "Factored Roots: x\u00b2 \u2212 5x + 6 = 0", values: { a: 1, b: -5, c: 6 } },
    { label: "Double Root: x\u00b2 \u2212 4x + 4 = 0", values: { a: 1, b: -4, c: 4 } },
    { label: "Complex: x\u00b2 + 2x + 5 = 0", values: { a: 1, b: 2, c: 5 } },
    { label: "Downward: -x\u00b2 + 4x + 5 = 0", values: { a: -1, b: 4, c: 5 } },
  ],
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

    const steps = [
      `Standard Quadratic Equation: (${a})x² + (${b})x + (${c}) = 0`,
      `Discriminant Δ = b² − 4ac = (${b})² − 4(${a})(${c}) = ${b * b} − ${4 * a * c} = ${fixed(disc, 2)}`,
      disc > 0
        ? `Because Δ > 0, there are two distinct real roots: x = [−b ± √Δ] ÷ (2a)`
        : disc === 0
        ? `Because Δ = 0, there is exactly one repeated real root: x = −b ÷ (2a)`
        : `Because Δ < 0, roots are complex conjugates: x = [−b ± i√|Δ|] ÷ (2a)`,
      disc >= 0
        ? `x₁ = (${-b} + ${fixed(Math.sqrt(Math.max(0, disc)), 3)}) ÷ ${2 * a} = ${fixed((-b + Math.sqrt(Math.max(0, disc))) / (2 * a), 3)}`
        : `Real part = ${fixed(-b / (2 * a), 3)}, Imaginary part = ±${fixed(Math.sqrt(Math.abs(disc)) / (2 * a), 3)}i`,
      `Parabola Vertex: h = −b ÷ (2a) = ${fixed(vertexX, 2)}, k = f(h) = ${fixed(vertexY, 2)}`,
    ];

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
        steps,
      chart: {
        type: "donut",
        title: "Discriminant Energy Breakdown (b² vs |4ac|)",
        data: [
          { name: `b² Term (${fixed(b * b, 2)})`, value: Math.max(0.01, b * b), color: "#10b981" },
          { name: `|4ac| Term (${fixed(Math.abs(4 * a * c), 2)})`, value: Math.max(0.01, Math.abs(4 * a * c)), color: "#06b6d4" },
        ],
      },
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
        steps,
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
        steps,
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
