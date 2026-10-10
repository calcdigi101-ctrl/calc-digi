"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";
import { maxIra } from "@/lib/tax";

export const config: CalcConfig = {
  id: "roth",
  title: "Roth IRA Calculator",
  fields: [
    { kind: "number", key: "age", label: "Current age", default: 28, min: 15, max: 90, integer: true },
    { kind: "number", key: "retire", label: "Retirement age", default: 65, min: 30, max: 100, integer: true },
    { kind: "number", key: "balance", label: "Current Roth IRA balance", prefix: "$", default: 5000, min: 0, max: 1e9, optional: true },
    { kind: "number", key: "annual", label: "Annual contribution", prefix: "$", default: 7500, min: 0, max: 1e6 },
    { kind: "number", key: "return", label: "Expected annual return", suffix: "%", default: 7, min: 0, max: 20 },
    { kind: "number", key: "tax", label: "Your tax rate in retirement", hint: "for comparison", suffix: "%", default: 22, min: 0, max: 60, group: "Compare with a taxable account" },
  ],
  validate: (v) => {
    if ((v.retire as number) <= (v.age as number)) return { retire: "Retirement age must be after your current age" };
  },
  compute: (v) => {
    const years = (v.retire as number) - (v.age as number);
    const r = (v.return as number) / 100;
    let balance = v.balance as number;
    let contributed = balance;
    let capped = false;
    // Taxable comparison: same deposits, but growth taxed every year at the given rate.
    let taxable = balance;
    const rTaxed = r * (1 - (v.tax as number) / 100);
    const data: { age: number; roth: number; taxable: number }[] = [];
    for (let y = 0; y < years; y++) {
      const limit = maxIra((v.age as number) + y);
      let c = v.annual as number;
      if (c > limit) {
        c = limit;
        capped = true;
      }
      balance = (balance + c) * (1 + r); // contributions at the start of each year
      taxable = (taxable + c) * (1 + rTaxed);
      contributed += c;
      data.push({ age: (v.age as number) + y + 1, roth: Math.round(balance), taxable: Math.round(taxable) });
    }
    return {
      hero: { label: `Tax-free balance at ${v.retire}`, value: usd0(balance), sub: `${years} years of contributions and growth` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Contributions", value: contributed, color: "#2563eb" },
          { name: "Tax-free growth", value: Math.max(0, balance - contributed), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Total contributed", value: usd0(contributed) },
        { label: "Tax-free growth", value: usd0(balance - contributed), strong: true },
        { label: "Same savings in a taxable account", value: usd0(taxable) },
        { label: "Roth advantage", value: usd0(balance - taxable) },
        { label: "2026 limit at your age", value: usd0(maxIra(v.age as number)) },
      ],
      note: capped ? { tone: "info", text: "Contributions above the annual IRA limit were capped. The limit rises to include a catch-up from age 50." } : undefined,
      details: [
        {
          title: "Roth IRA vs. taxable account",
          chart: {
            type: "line",
            x: "age",
            format: "usd0",
            series: [
              { key: "roth", name: "Roth IRA", color: "#10b981" },
              { key: "taxable", name: "Taxable account", color: "#64748b" },
            ],
            data,
          },
        },
      ],
    };
  },
};

export default function RothIraCalculator() {
  return <CalcEngine config={config} />;
}
