"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "exponent-calc",
  title: "Exponent Calculator (xʸ Powers)",
  presets: [
    { label: "Byte Powers: 2^8 = 256", values: { base: 2, exp: 8 } },
    { label: "Powers of Ten: 10^6 (1M)", values: { base: 10, exp: 6 } },
    { label: "Square: 15^2 = 225", values: { base: 15, exp: 2 } },
    { label: "Cube: 5^3 = 125", values: { base: 5, exp: 3 } },
    { label: "Fractional: 16^0.5 = 4", values: { base: 16, exp: 0.5 } },
  ],
  fields: [
    { kind: "number", key: "base", label: "Base (x)", default: 2 },
    { kind: "number", key: "exp", label: "Exponent (y)", default: 8 },
  ],
  compute(values) {
    const x = Number(values.base);
    const y = Number(values.exp);

    if (x === 0 && y <= 0) {
      return { error: "0 raised to a non-positive power is mathematically undefined." };
    }

    const res = Math.pow(x, y);

    return {
      hero: {
        label: `Power Result (${x}^${y})`,
        value: Math.abs(res) < 1e12 && Math.abs(res) > 1e-4 ? fixed(res, 4) : res.toExponential(4),
      },
      badge: {
        text: y > 0 ? "Positive Power" : y < 0 ? "Negative Power (Fractional)" : "Zero Power (= 1)",
        tone: "good",
      },
      rows: [
        { label: "Standard Value", value: String(res), strong: true },
        { label: "Scientific Notation", value: res.toExponential(6) },
        { label: "Reciprocal 1 / (x^y)", value: res !== 0 ? (1 / res).toExponential(4) : "Undefined" },
        { label: "Base Squared (x²)", value: num(x * x) },
        { label: "Base Cubed (x³)", value: num(x * x * x) },
      ],
      note: {
        text: `Exponentiation denotes repeated multiplication: ${x} multiplied by itself ${y} times.`,
        tone: "neutral",
      },
    };
  },
};

export default function ExponentCalculator() {
  return <CalcEngine config={config} />;
}
