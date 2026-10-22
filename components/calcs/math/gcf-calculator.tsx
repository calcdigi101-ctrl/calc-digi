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

export const config: CalcConfig = {
  id: "gcf-calc",
  title: "Greatest Common Factor (GCF / HCF) Calculator",
  presets: [
    { label: "Common 24, 36, 60 (GCF=12)", values: { numbers: "24, 36, 60" } },
    { label: "Pair 48, 180 (GCF=12)", values: { numbers: "48, 180" } },
    { label: "Coprime 15, 28 (GCF=1)", values: { numbers: "15, 28" } },
    { label: "Multi-set 12, 18, 24, 30", values: { numbers: "12, 18, 24, 30" } },
  ],
  fields: [
    {
      kind: "text",
      key: "numbers",
      label: "Enter Integers (comma or space separated)",
      default: "24, 36, 60",
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
      return { error: "Please enter at least two positive integers to compute GCF." };
    }

    let gcf = nums[0];
    for (let i = 1; i < nums.length; i++) {
      gcf = gcd2(gcf, nums[i]);
    }

    // Common divisors
    const divisors: number[] = [];
    for (let i = 1; i <= gcf; i++) {
      if (gcf % i === 0) divisors.push(i);
    }

    return {
      hero: {
        label: "Greatest Common Factor (GCF)",
        value: String(gcf),
      },
      badge: {
        text: gcf === 1 ? "Relatively Prime (Coprime)" : `Shared Factor of ${nums.length} Numbers`,
        tone: gcf === 1 ? "info" : "good",
      },
      rows: [
        { label: "GCF / HCF", value: String(gcf), strong: true },
        { label: "All Common Divisors", value: divisors.join(", ") },
        { label: "Original Input Numbers", value: nums.join(", ") },
      ],
      note: {
        text: `${gcf} is the largest positive integer that divides ${nums.join(", ")} without leaving any remainder.`,
        tone: "neutral",
      },
    };
  },
};

export default function GcfCalculator() {
  return <CalcEngine config={config} />;
}
