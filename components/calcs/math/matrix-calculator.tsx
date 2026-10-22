"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "matrix-calc",
  title: "Matrix Calculator (2×2 Matrix Operations)",
  presets: [
    { label: "2\u00d72 Matrix Add", values: { op: "add", a11: 4, a12: 2, a21: 1, a22: 3, b11: 2, b12: 5, b21: 0, b22: 1 } },
    { label: "2\u00d72 Matrix Multiply", values: { op: "mul", a11: 1, a12: 2, a21: 3, a22: 4, b11: 2, b12: 0, b21: 1, b22: 2 } },
    { label: "Determinant det(A)", values: { op: "det", a11: 3, a12: 8, a21: 4, a22: 6, b11: 1, b12: 0, b21: 0, b22: 1 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "op",
      label: "Matrix Operation",
      default: "add",
      segmented: true,
      options: [
        { value: "add", label: "A + B" },
        { value: "sub", label: "A − B" },
        { value: "mul", label: "A × B" },
        { value: "det", label: "Determinants" },
      ],
    },
    // Matrix A
    { kind: "number", key: "a11", label: "Matrix A: row 1, col 1", default: 4 },
    { kind: "number", key: "a12", label: "Matrix A: row 1, col 2", default: 2 },
    { kind: "number", key: "a21", label: "Matrix A: row 2, col 1", default: 1 },
    { kind: "number", key: "a22", label: "Matrix A: row 2, col 2", default: 3 },
    // Matrix B
    { kind: "number", key: "b11", label: "Matrix B: row 1, col 1", default: 2, showIf: (v) => v.op !== "det" },
    { kind: "number", key: "b12", label: "Matrix B: row 1, col 2", default: 5, showIf: (v) => v.op !== "det" },
    { kind: "number", key: "b21", label: "Matrix B: row 2, col 1", default: 0, showIf: (v) => v.op !== "det" },
    { kind: "number", key: "b22", label: "Matrix B: row 2, col 2", default: 1, showIf: (v) => v.op !== "det" },
  ],
  compute(values) {
    const op = String(values.op || "add");
    const a11 = Number(values.a11);
    const a12 = Number(values.a12);
    const a21 = Number(values.a21);
    const a22 = Number(values.a22);

    const b11 = Number(values.b11);
    const b12 = Number(values.b12);
    const b21 = Number(values.b21);
    const b22 = Number(values.b22);

    const detA = a11 * a22 - a12 * a21;
    const detB = b11 * b22 - b12 * b21;
    const traceA = a11 + a22;

    let r11 = 0;
    let r12 = 0;
    let r21 = 0;
    let r22 = 0;

    if (op === "add") {
      r11 = a11 + b11;
      r12 = a12 + b12;
      r21 = a21 + b21;
      r22 = a22 + b22;
    } else if (op === "sub") {
      r11 = a11 - b11;
      r12 = a12 - b12;
      r21 = a21 - b21;
      r22 = a22 - b22;
    } else if (op === "mul") {
      r11 = a11 * b11 + a12 * b21;
      r12 = a11 * b12 + a12 * b22;
      r21 = a21 * b11 + a22 * b21;
      r22 = a21 * b12 + a22 * b22;
    }

    const matStr = `[[${fixed(r11, 1)}, ${fixed(r12, 1)}], [${fixed(r21, 1)}, ${fixed(r22, 1)}]]`;

    return {
      hero: {
        label: op === "det" ? "det(A)" : "Result Matrix",
        value: op === "det" ? fixed(detA, 2) : matStr,
      },
      badge: {
        text: detA !== 0 ? "A is Invertible (Non-Singular)" : "A is Singular (det = 0)",
        tone: detA !== 0 ? "good" : "warn",
      },
      rows: [
        ...(op !== "det"
          ? [
              { label: "Row 1", value: `[ ${fixed(r11, 2)} , ${fixed(r12, 2)} ]`, strong: true },
              { label: "Row 2", value: `[ ${fixed(r21, 2)} , ${fixed(r22, 2)} ]`, strong: true },
            ]
          : []),
        { label: "Determinant det(A)", value: fixed(detA, 4), strong: true },
        { label: "Determinant det(B)", value: fixed(detB, 4) },
        { label: "Trace Tr(A) = a₁₁ + a₂₂", value: fixed(traceA, 2) },
      ],
      chart: {
        type: "donut",
        title: "Matrix Norm Energy (Matrix A vs B)",
        data: [
          { name: `Matrix A L1 Norm (${fixed(Math.abs(a11) + Math.abs(a12) + Math.abs(a21) + Math.abs(a22), 1)})`, value: Math.max(0.1, Math.abs(a11) + Math.abs(a12) + Math.abs(a21) + Math.abs(a22)), color: "#10b981" },
          { name: `Matrix B L1 Norm (${fixed(Math.abs(b11) + Math.abs(b12) + Math.abs(b21) + Math.abs(b22), 1)})`, value: Math.max(0.1, Math.abs(b11) + Math.abs(b12) + Math.abs(b21) + Math.abs(b22)), color: "#06b6d4" },
        ],
      },
      note: {
        text: `Determinant of 2×2 matrix: det(A) = (a₁₁ × a₂₂) − (a₁₂ × a₂₁) = (${a11} × ${a22}) − (${a12} × ${a21}) = ${fixed(detA, 2)}.`,
        tone: "neutral",
      },
    };
  },
};

export default function MatrixCalculator() {
  return <CalcEngine config={config} />;
}
