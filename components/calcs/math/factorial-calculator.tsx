"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "factorial-calc",
  title: "Factorial Calculator (n!)",
  fields: [
    { kind: "number", key: "n", label: "Integer n (0 to 170)", default: 10, integer: true, min: 0, max: 170 },
  ],
  compute(values) {
    const n = Math.floor(Number(values.n));
    if (n < 0 || n > 170) return { error: "Please enter an integer between 0 and 170." };

    let fact = 1;
    for (let i = 2; i <= n; i++) fact *= i;

    // Trailing zeros (Legendre formula)
    let zeros = 0;
    let k = 5;
    while (Math.floor(n / k) > 0) {
      zeros += Math.floor(n / k);
      k *= 5;
    }

    // Exact string via BigInt for n <= 50
    let bigFactStr = "";
    if (n <= 50) {
      let b = BigInt(1);
      for (let i = BigInt(2); i <= BigInt(n); i += BigInt(1)) b *= i;
      bigFactStr = b.toString();
    }

    const approxDigits = n === 0 ? 1 : Math.floor(0.5 * Math.log10(2 * Math.PI * n) + n * Math.log10(n / Math.E)) + 1;

    return {
      hero: {
        label: `${n}! (Factorial)`,
        value: n <= 20 ? num(fact) : fact.toExponential(4),
      },
      badge: {
        text: `${approxDigits} Digits, ${zeros} Trailing Zeros`,
        tone: "good",
      },
      rows: [
        { label: "Exact Value", value: bigFactStr ? (bigFactStr.length > 25 ? bigFactStr.slice(0, 25) + "..." : bigFactStr) : fact.toExponential(6), strong: true },
        { label: "Trailing Zeros", value: String(zeros) },
        { label: "Total Decimal Digits", value: String(approxDigits) },
        { label: "Calculation Formula", value: n === 0 ? "0! = 1 by convention" : `1 × 2 × ... × ${n}` },
      ],
      note: {
        text: `Factorial represents the total number of unique ways to arrange ${n} distinct items in a sequence.`,
        tone: "neutral",
      },
    };
  },
};

export default function FactorialCalculator() {
  return <CalcEngine config={config} />;
}
