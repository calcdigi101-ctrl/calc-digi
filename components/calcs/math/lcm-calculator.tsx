"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

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

function lcm2(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd2(a, b);
}

export const config: CalcConfig = {
  id: "lcm-calc",
  title: "Least Common Multiple (LCM) Calculator",
  fields: [
    {
      kind: "text",
      key: "numbers",
      label: "Enter Integers (comma or space separated)",
      default: "12, 18, 30",
      full: true,
    },
  ],
  compute(values) {
    const raw = String(values.numbers || "");
    const nums = raw
      .split(/[\s,]+/)
      .map((s) => Math.abs(Math.floor(Number(s.trim()))))
      .filter((n) => Number.isFinite(n) && n > 0);

    if (nums.length < 2) {
      return { error: "Please enter at least two positive integers to compute LCM." };
    }

    let lcm = nums[0];
    let gcf = nums[0];
    for (let i = 1; i < nums.length; i++) {
      lcm = lcm2(lcm, nums[i]);
      gcf = gcd2(gcf, nums[i]);
    }

    return {
      hero: {
        label: "Least Common Multiple (LCM)",
        value: num(lcm),
      },
      badge: {
        text: `Lowest Common Denominator for ${nums.length} values`,
        tone: "good",
      },
      rows: [
        { label: "LCM", value: num(lcm), strong: true },
        { label: "Greatest Common Factor (GCF)", value: String(gcf) },
        { label: "Original Input Numbers", value: nums.join(", ") },
      ],
      note: {
        text: `${lcm} is the smallest positive integer divisible by all numbers in the set [${nums.join(", ")}].`,
        tone: "neutral",
      },
    };
  },
};

export default function LcmCalculator() {
  return <CalcEngine config={config} />;
}
