"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

// Deterministic pseudo-random PRNG for SSR consistency
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const config: CalcConfig = {
  id: "rng-calc",
  title: "Random Number Generator (PRNG)",
  presets: [
    { label: "Lottery 6 of 49", values: { min: 1, max: 49, count: 6 } },
    { label: "Dice Roll (1 to 6)", values: { min: 1, max: 6, count: 2 } },
    { label: "Percentile (1 to 100)", values: { min: 1, max: 100, count: 5 } },
    { label: "Coin Toss (0 or 1)", values: { min: 0, max: 1, count: 10 } },
  ],
  fields: [
    { kind: "number", key: "min", label: "Minimum Value", default: 1, integer: true },
    { kind: "number", key: "max", label: "Maximum Value", default: 100, integer: true },
    { kind: "number", key: "count", label: "Numbers to Generate (Count)", default: 6, integer: true, min: 1, max: 20 },
  ],
  compute(values) {
    const min = Math.floor(Number(values.min));
    const max = Math.floor(Number(values.max));
    const count = Math.min(20, Math.max(1, Math.floor(Number(values.count || 6))));

    if (max <= min) return { error: "Maximum value must be strictly greater than minimum value." };

    const range = max - min + 1;
    const nums: number[] = [];

    for (let i = 0; i < count; i++) {
      const r = seededRandom(min * 1000 + max * 10 + i * 7 + 42);
      nums.push(Math.floor(r * range) + min);
    }

    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / count;
    const genMin = Math.min(...nums);
    const genMax = Math.max(...nums);

    return {
      hero: {
        label: `Generated Sample (${count} Numbers)`,
        value: nums.slice(0, 4).join(", ") + (nums.length > 4 ? "..." : ""),
      },
      badge: {
        text: `Range: [${min}, ${max}]`,
        tone: "good",
      },
      rows: [
        { label: "Generated Numbers", value: nums.join(", "), strong: true },
        { label: "Sample Average (Mean)", value: fixed(avg, 2) },
        { label: "Sample Sum", value: num(sum) },
        { label: "Smallest Generated", value: String(genMin) },
        { label: "Largest Generated", value: String(genMax) },
      ],
      note: {
        text: "Numbers drawn uniformly across the specified integer interval.",
        tone: "neutral",
      },
    };
  },
};

export default function RandomNumberGenerator() {
  return <CalcEngine config={config} />;
}
