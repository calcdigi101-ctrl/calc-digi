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
  presets: [
    { label: "16:9 HD Display (1920×1080)", values: { a: 16, b: 9, c: 1920 } },
    { label: "4:3 Standard (1024×768)", values: { a: 4, b: 3, c: 1024 } },
    { label: "1:1 Square (1080×1080)", values: { a: 1, b: 1, c: 1080 } },
    { label: "3:2 Photography (3600×2400)", values: { a: 3, b: 2, c: 3600 } },
    { label: "21:9 Ultrawide (3440×1440)", values: { a: 21, b: 9, c: 3440 } },
    { label: "Golden Ratio (1.618 : 1)", values: { a: 1.618, b: 1, c: 100 } },
  ],
  fields: [
    { kind: "number", key: "a", label: "First Term / Width (A)", default: 16, min: 0.0001, hint: "Enter antecedent or numerator" },
    { kind: "number", key: "b", label: "Second Term / Height (B)", default: 9, min: 0.0001, hint: "Enter consequent or denominator" },
    { kind: "number", key: "c", label: "Scale Target C (For Proportion A : B = C : D)", default: 1920, optional: true, hint: "Optional: calculate matching D" },
  ],
  compute(values) {
    const a = Number(values.a);
    const b = Number(values.b);
    const c = values.c !== undefined && values.c !== 0 ? Number(values.c) : null;

    if (a <= 0 || b <= 0) return { error: "Ratio terms must be strictly positive numbers." };

    let simA = a;
    let simB = b;
    let g = 1;
    if (Number.isInteger(a) && Number.isInteger(b)) {
      g = gcd2(a, b);
      simA = a / g;
      simB = b / g;
    }

    const decimalRatio = a / b;
    const invRatio = b / a;
    const scaledD = c !== null ? (b * c) / a : null;
    const totalParts = a + b;
    const pctA = (a / totalParts) * 100;
    const pctB = (b / totalParts) * 100;

    const steps = [
      g > 1
        ? `Greatest Common Divisor GCD(${a}, ${b}) = ${g} → Divide terms by ${g}: ${simA} : ${simB}`
        : `Terms ${a} and ${b} are coprime (GCD = 1) → Simplified ratio: ${simA} : ${simB}`,
      `Unit Ratio = ${fixed(decimalRatio, 4)} : 1 (or 1 : ${fixed(invRatio, 4)})`,
      `Total parts = ${a} + ${b} = ${totalParts} (Part A = ${fixed(pctA, 1)}%, Part B = ${fixed(pctB, 1)}%)`,
      ...(scaledD !== null && c !== null
        ? [
            `Proportion cross-multiplication: (${a} / ${b}) = (${c} / D)`,
            `D = (${b} × ${c}) ÷ ${a} = (${b * c}) ÷ ${a} = ${fixed(scaledD, 2)}`,
            `Equivalent proportion: ${a} : ${b} = ${c} : ${fixed(scaledD, 2)}`,
          ]
        : []),
    ];

    return {
      hero: {
        label: "Simplified Ratio (A : B)",
        value: `${num(simA)} : ${num(simB)}`,
      },
      badge: {
        text: `1 : ${fixed(invRatio, 3)}`,
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
      steps,
      chart: {
        type: "donut",
        title: "Proportional Ratio Split (%)",
        data: [
          { name: `Part A (${num(simA)})`, value: pctA },
          { name: `Part B (${num(simB)})`, value: pctB },
        ],
      },
      note: {
        text: `For every ${num(simA)} units of A, there are exactly ${num(simB)} units of B. ${scaledD !== null ? `Scaling to ${c} yields ${fixed(scaledD, 2)}.` : ""}`,
        tone: "neutral",
      },
    };
  },
};

export default function RatioCalculator() {
  return <CalcEngine config={config} />;
}
