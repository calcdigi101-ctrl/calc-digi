"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "square-root-calc",
  title: "Square Root & Radical Calculator",
  presets: [
    { label: "Square Root \u221a144 = 12", values: { x: 144, degree: 2 } },
    { label: "Cube Root \u221b125 = 5", values: { x: 125, degree: 3 } },
    { label: "Fourth Root \u221c625 = 5", values: { x: 625, degree: 4 } },
    { label: "Irrational \u221a2 = 1.414", values: { x: 2, degree: 2 } },
  ],
  fields: [
    { kind: "number", key: "x", label: "Enter Number (x)", default: 144, min: 0 },
    {
      kind: "choice",
      key: "degree",
      label: "Root Degree (n)",
      default: "2",
      segmented: true,
      options: [
        { value: "2", label: "Square Root (√)" },
        { value: "3", label: "Cube Root (∛)" },
        { value: "4", label: "4th Root (⁴√)" },
      ],
    },
  ],
  compute(values) {
    const x = Number(values.x);
    const n = Number(values.degree || 2);

    if (x < 0 && n % 2 === 0) {
      return { error: "Even roots of negative numbers yield imaginary results." };
    }

    const root = Math.pow(x, 1 / n);
    const isPerfect = Math.abs(root - Math.round(root)) < 1e-9;

    return {
      hero: {
        label: n === 2 ? `√${x}` : n === 3 ? `∛${x}` : `⁴√${x}`,
        value: fixed(root, 4),
        unit: "root",
      },
      badge: {
        text: isPerfect ? "Perfect Exact Root" : "Irrational Radical",
        tone: isPerfect ? "good" : "info",
      },
      rows: [
        { label: "Principal Root", value: fixed(root, 6), strong: true },
        { label: "Squared Value (x²)", value: num(x * x) },
        { label: "Cubed Value (x³)", value: num(x * x * x) },
        { label: "Verification Check", value: `${fixed(root, 3)}^${n} ≈ ${x}` },
      ],
      chart: {
        type: "donut",
        title: "Root vs Radicand Magnitude Ratio",
        data: [
          { name: `Principal Root (${fixed(root, 2)})`, value: Math.max(0.1, root), color: "#10b981" },
          { name: `Radicand x (${num(x)})`, value: Math.max(0.1, x), color: "#06b6d4" },
        ],
      },
      note: {
        text: `The ${n}-th root of ${x} is the number that, when multiplied by itself ${n} times, equals ${x}.`,
        tone: "neutral",
      },
    };
  },
};

export default function SquareRootCalculator() {
  return <CalcEngine config={config} />;
}
