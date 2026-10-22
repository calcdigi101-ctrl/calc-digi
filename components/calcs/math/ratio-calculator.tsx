"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

function gcd2(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export const config: CalcConfig = {
  id: "ratio-calc",
  title: "Ratio Calculator & Proportional Scaler",
  fields: [
    { kind: "number", key: "a", label: "Antecedent A", default: 16, min: 0.0001 },
    { kind: "number", key: "b", label: "Consequent B", default: 9, min: 0.0001 },
    { kind: "number", key: "c", label: "Scale Reference C (Optional A : B = C : D)", default: 1920, optional: true },
  ],
  compute(values) {
    const a = Number(values.a);
    const b = Number(values.b);
    const c = values.c !== undefined && values.c !== 0 ? Number(values.c) : null;

    if (a <= 0 || b <= 0) return { error: "Ratio terms must be strictly positive numbers." };

    let simA = a;
    let simB = b;
    if (Number.isInteger(a) && Number.isInteger(b)) {
      const g = gcd2(a, b);
      simA = a / g;
      simB = b / g;
    }

    const decimalRatio = a / b;
    const invRatio = b / a;
    const scaledD = c !== null ? (b * c) / a : null;
    const totalParts = a + b;
    const pctA = (a / totalParts) * 100;
    const pctB = (b / totalParts) * 100;

    return {
      hero: {
        label: "Simplified Ratio (A : B)",
        value: `${num(simA)} : ${num(simB)}`,
      },
      badge: {
        text: `1 : ${fixed(decimalRatio, 3)}`,
        tone: "good",
      },
      rows: [
        { label: "Simplified Ratio", value: `${num(simA)} : ${num(simB)}`, strong: true },
        ...(scaledD !== null && c !== null
          ? [{ label: `Proportion D (for C = ${c})`, value: fixed(scaledD, 2), strong: true }]
          : []),
        { label: "Decimal Value (A ÷ B)", value: fixed(decimalRatio, 4) },
        { label: "Inverse Ratio (B : A)", value: `${num(simB)} : ${num(simA)} (${fixed(invRatio, 4)})` },
        { label: "Share of Part A", value: `${fixed(pctA, 1)}%` },
        { label: "Share of Part B", value: `${fixed(pctB, 1)}%` },
      ],
      chart: {
        type: "donut",
        title: "Proportional Ratio Split",
        data: [
          { name: "Part A Share", value: pctA },
          { name: "Part B Share", value: pctB },
        ],
      },
      note: {
        text: `For every ${num(simA)} units of A, there are exactly ${num(simB)} units of B.`,
        tone: "neutral",
      },
    };
  },
};

export default function RatioCalculator() {
  return <CalcEngine config={config} />;
}
