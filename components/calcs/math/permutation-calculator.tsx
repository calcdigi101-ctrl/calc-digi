"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

function nPr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) {
    res *= n - i;
  }
  return Math.round(res);
}

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;
  let res = 1;
  for (let i = 1; i <= r; i++) res = (res * (n - i + 1)) / i;
  return Math.round(res);
}

export const config: CalcConfig = {
  id: "permutation-calc",
  title: "Permutation Calculator (nPr)",
  presets: [
    { label: "Race Podium Top 3 of 8", values: { n: 8, r: 3 } },
    { label: "PIN Code 4 Digits of 10", values: { n: 10, r: 4 } },
    { label: "Prize Draw Top 3 of 20", values: { n: 20, r: 3 } },
    { label: "Lineup 5 of 9 Players", values: { n: 9, r: 5 } },
  ],
  fields: [
    { kind: "number", key: "n", label: "Total Items (n)", default: 8, integer: true, min: 0, max: 100 },
    { kind: "number", key: "r", label: "Items Arranged (r)", default: 3, integer: true, min: 0, max: 100 },
  ],
  compute(values) {
    const n = Math.floor(Number(values.n));
    const r = Math.floor(Number(values.r));

    if (r > n) return { error: "Arranged items (r) cannot exceed total items (n)." };

    const p = nPr(n, r);
    const c = nCr(n, r);
    const withRep = Math.pow(n, r);

    return {
      hero: {
        label: `Permutations P(${n}, ${r}) = nPr`,
        value: num(p),
        unit: "ways",
      },
      badge: {
        text: "Order Matters (Unique Sequences)",
        tone: "good",
      },
      rows: [
        { label: "Permutations (Without Repetition)", value: num(p), strong: true },
        { label: "Permutations (With Repetition n^r)", value: num(withRep) },
        { label: "Unordered Combinations (nCr)", value: num(c) },
        { label: "Formula Applied", value: "n! / (n − r)!" },
      ],
      note: {
        text: `There are ${num(p)} ordered arrangements of ${r} items chosen from ${n}.`,
        tone: "neutral",
      },
    };
  },
};

export default function PermutationCalculator() {
  return <CalcEngine config={config} />;
}
