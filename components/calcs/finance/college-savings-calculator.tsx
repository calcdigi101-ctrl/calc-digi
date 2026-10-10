"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "college",
  title: "College Savings Calculator",
  fields: [
    { kind: "number", key: "age", label: "Child's age", suffix: "years", default: 3, min: 0, max: 17, integer: true },
    { kind: "number", key: "start", label: "College starts at age", default: 18, min: 1, max: 30, integer: true },
    { kind: "number", key: "cost", label: "Annual cost today", hint: "tuition, room & board", prefix: "$", default: 30000, min: 0, max: 1e6 },
    { kind: "number", key: "years", label: "Years of college", default: 4, min: 1, max: 10, integer: true },
    { kind: "number", key: "saved", label: "Already saved", prefix: "$", default: 5000, min: 0, max: 1e8, optional: true },
    { kind: "number", key: "share", label: "Share you plan to cover", suffix: "%", default: 100, min: 0, max: 100 },
    { kind: "number", key: "inflation", label: "College cost inflation", suffix: "%", default: 4, min: 0, max: 15, group: "Assumptions" },
    { kind: "number", key: "return", label: "Investment return", suffix: "%", default: 6, min: 0, max: 15, group: "Assumptions" },
  ],
  validate: (v) => {
    if ((v.start as number) <= (v.age as number)) return { start: "Must be older than the child's current age" };
  },
  compute: (v) => {
    const yearsTo = (v.start as number) - (v.age as number);
    const infl = (v.inflation as number) / 100;
    const r = (v.return as number) / 100;
    const share = (v.share as number) / 100;
    const n = v.years as number;
    // Cost of each college year, inflated to when it's paid.
    const costs = Array.from({ length: n }, (_, i) => (v.cost as number) * Math.pow(1 + infl, yearsTo + i) * share);
    const total = costs.reduce((a, c) => a + c, 0);
    // Value of those costs at the start of college (money left invested keeps earning).
    const neededAtStart = costs.reduce((a, c, i) => a + c / Math.pow(1 + r, i), 0);
    const savedFv = (v.saved as number) * Math.pow(1 + r, yearsTo);
    const gap = Math.max(0, neededAtStart - savedFv);
    const i = Math.pow(1 + r, 1 / 12) - 1;
    const months = yearsTo * 12;
    const monthly = gap === 0 ? 0 : i === 0 ? gap / months : (gap * i) / (Math.pow(1 + i, months) - 1);
    return {
      hero: { label: "Save each month", value: usd(monthly), sub: `for ${yearsTo} years until college starts` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Current savings (grown)", value: Math.min(savedFv, neededAtStart), color: "#10b981" },
          { name: "Still to save", value: gap, color: "#2563eb" },
        ],
      },
      rows: [
        { label: `Projected cost of ${n} years`, value: usd0(total), strong: true },
        { label: "Needed when college starts", value: usd0(neededAtStart) },
        { label: "Current savings will grow to", value: usd0(savedFv) },
        { label: "Lump sum needed today instead", value: usd0(gap / Math.pow(1 + r, yearsTo)) },
      ],
      note: gap === 0 ? { tone: "good", text: "Your current savings are projected to cover the cost on their own." } : undefined,
      details: [
        {
          title: "Projected cost by college year",
          chart: {
            type: "bar",
            x: "year",
            format: "usd0",
            series: [{ key: "cost", name: "Cost", color: "#2563eb" }],
            data: costs.map((c, k) => ({ year: `Year ${k + 1} (age ${(v.start as number) + k})`, cost: Math.round(c) })),
          },
        },
      ],
    };
  },
};

export default function CollegeSavingsCalculator() {
  return <CalcEngine config={config} />;
}
