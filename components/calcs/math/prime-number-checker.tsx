"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

function isPrime(n: number): { prime: boolean; smallestFactor?: number } {
  if (n <= 1) return { prime: false };
  if (n <= 3) return { prime: true };
  if (n % 2 === 0) return { prime: false, smallestFactor: 2 };
  if (n % 3 === 0) return { prime: false, smallestFactor: 3 };
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0) return { prime: false, smallestFactor: i };
    if (n % (i + 2) === 0) return { prime: false, smallestFactor: i + 2 };
  }
  return { prime: true };
}

export const config: CalcConfig = {
  id: "prime-checker-calc",
  title: "Prime Number Checker & Factorizer",
  fields: [
    { kind: "number", key: "n", label: "Enter Integer to Test (n)", default: 97, integer: true, min: 0, max: 999999999999 },
  ],
  compute(values) {
    const n = Math.floor(Number(values.n));
    if (n < 0) return { error: "Primality is defined for positive non-negative integers." };

    if (n === 0 || n === 1) {
      return {
        hero: { label: "Primality Classification", value: `${n} is Neither` },
        badge: { text: "Neither Prime nor Composite", tone: "neutral" },
        rows: [
          { label: "Mathematical Rule", value: "Primes must be integers strictly greater than 1 with exactly two distinct divisors." },
          { label: "Next Prime", value: "2" },
        ],
      };
    }

    const { prime, smallestFactor } = isPrime(n);

    // Find next prime
    let nextP = n + 1;
    while (!isPrime(nextP).prime) nextP++;

    // Find prev prime
    let prevP = n - 1;
    while (prevP > 1 && !isPrime(prevP).prime) prevP--;

    if (prime) {
      return {
        hero: {
          label: "Primality Result",
          value: `${num(n)} is PRIME`,
        },
        badge: { text: "Prime Number ✓", tone: "good" },
        rows: [
          { label: "Divisors", value: `1 and ${num(n)}`, strong: true },
          { label: "Number of Factors", value: "2" },
          { label: "Next Prime", value: num(nextP) },
          { label: "Previous Prime", value: prevP > 1 ? num(prevP) : "None" },
          { label: "Prime Factorization", value: `${num(n)} = ${num(n)}^1` },
        ],
        note: {
          text: `${n} has no divisors other than 1 and itself, confirming its status as a fundamental prime building block.`,
          tone: "neutral",
        },
      };
    } else {
      return {
        hero: {
          label: "Primality Result",
          value: `${num(n)} is COMPOSITE`,
        },
        badge: { text: "Composite Number", tone: "warn" },
        rows: [
          { label: "Smallest Factor > 1", value: String(smallestFactor), strong: true },
          { label: "Divisibility Check", value: `${smallestFactor} × ${n / (smallestFactor || 1)} = ${n}` },
          { label: "Next Prime", value: num(nextP) },
          { label: "Previous Prime", value: prevP > 1 ? num(prevP) : "None" },
        ],
        note: {
          text: `${n} is divisible by ${smallestFactor}, demonstrating it can be broken into smaller integer factors.`,
          tone: "neutral",
        },
      };
    }
  },
};

export default function PrimeNumberChecker() {
  return <CalcEngine config={config} />;
}
