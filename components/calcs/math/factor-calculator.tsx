"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "factor-calc",
  title: "Factor Calculator & Prime Factorization",
  presets: [
    { label: "Composite 72", values: { n: 72 } },
    { label: "Highly Composite 120", values: { n: 120 } },
    { label: "Perfect Square 144", values: { n: 144 } },
    { label: "Prime 97", values: { n: 97 } },
    { label: "Three-Digit 360", values: { n: 360 } },
  ],
  fields: [
    { kind: "number", key: "n", label: "Enter Integer (n)", default: 72, integer: true, min: 1, max: 10000000 },
  ],
  compute(values) {
    const n = Math.floor(Number(values.n));
    if (n < 1) return { error: "Please enter a positive integer greater than 0." };

    const factors: number[] = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i * i !== n) factors.push(n / i);
      }
    }
    factors.sort((a, b) => a - b);

    // Prime factorization
    let temp = n;
    const primeFactors: Record<number, number> = {};
    for (let d = 2; d * d <= temp; d++) {
      while (temp % d === 0) {
        primeFactors[d] = (primeFactors[d] || 0) + 1;
        temp = Math.floor(temp / d);
      }
    }
    if (temp > 1) primeFactors[temp] = (primeFactors[temp] || 0) + 1;

    const primeFactorStr = Object.entries(primeFactors)
      .map(([base, exp]) => (exp > 1 ? `${base}^${exp}` : base))
      .join(" × ") || String(n);

    const sumFactors = factors.reduce((a, b) => a + b, 0);
    const properSum = sumFactors - n;
    const isPerfect = properSum === n;
    const isAbundant = properSum > n;

    return {
      hero: {
        label: "Total Factors Count",
        value: `${factors.length} Factors`,
      },
      badge: {
        text: isPerfect ? "Perfect Number" : isAbundant ? "Abundant Number" : "Deficient Number",
        tone: isPerfect ? "good" : "info",
      },
      rows: [
        { label: "Prime Factorization", value: primeFactorStr, strong: true },
        { label: "Complete Factor List", value: factors.slice(0, 16).join(", ") + (factors.length > 16 ? "..." : "") },
        { label: "Sum of All Divisors", value: num(sumFactors) },
        { label: "Sum of Proper Divisors", value: num(properSum) },
        { label: "Smallest / Largest Factor", value: `1 and ${n}` },
      ],
      note: {
        text: `${n} has ${factors.length} total divisors and prime factorization ${primeFactorStr}.`,
        tone: "neutral",
      },
    };
  },
};

export default function FactorCalculator() {
  return <CalcEngine config={config} />;
}
