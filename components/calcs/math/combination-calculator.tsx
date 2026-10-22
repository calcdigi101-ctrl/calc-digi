"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return Math.round(res);
}

function nPr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 0; i < r; i++) {
    res *= n - i;
  }
  return Math.round(res);
}

export const config: CalcConfig = {
  id: "combination-calc",
  title: "Combination Calculator (nCr)",
  presets: [
    { label: "Lottery 6 of 49", values: { n: 49, r: 6 } },
    { label: "Poker Hand 5 of 52", values: { n: 52, r: 5 } },
    { label: "Committee 3 of 10", values: { n: 10, r: 3 } },
    { label: "Team 4 of 12", values: { n: 12, r: 4 } },
  ],
  fields: [
    { kind: "number", key: "n", label: "Total Items (n)", default: 10, integer: true, min: 0, max: 100 },
    { kind: "number", key: "r", label: "Items Chosen (r)", default: 3, integer: true, min: 0, max: 100 },
  ],
  compute(values) {
    const n = Math.floor(Number(values.n));
    const r = Math.floor(Number(values.r));

    if (r > n) return { error: "Chosen items (r) cannot exceed total items (n)." };

    const c = nCr(n, r);
    const p = nPr(n, r);

    return {
      hero: {
        label: `Combinations C(${n}, ${r}) = nCr`,
        value: num(c),
        unit: "ways",
      },
      badge: {
        text: "Order Does Not Matter",
        tone: "good",
      },
      rows: [
        { label: "Combinations nCr", value: num(c), strong: true },
        { label: "Permutations nPr (Order Matters)", value: num(p) },
        { label: "Difference Ratio (nPr ÷ nCr = r!)", value: `${r}! = ${num(Math.round(p / (c || 1)))}` },
        { label: "Formula Applied", value: "n! / [r!(n − r)!]" },
      ],
      note: {
        text: `There are ${num(c)} unique unordered combinations of ${r} items selected from a pool of ${n}.`,
        tone: "neutral",
      },
    };
  },
};

export default function CombinationCalculator() {
  return <CalcEngine config={config} />;
}
