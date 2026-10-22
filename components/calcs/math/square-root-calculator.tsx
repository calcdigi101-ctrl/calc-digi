"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "square-root-calc",
  title: "Square Root & Radical Calculator",
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
