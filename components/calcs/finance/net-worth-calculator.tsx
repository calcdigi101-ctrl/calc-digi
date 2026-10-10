"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";

const ASSETS: [string, string, number][] = [
  ["cash", "Cash, checking & savings", 15000],
  ["invest", "Investments (brokerage)", 20000],
  ["retire", "Retirement accounts (401(k), IRA)", 40000],
  ["home", "Home value", 350000],
  ["vehicles", "Vehicles", 18000],
  ["other", "Other assets", 5000],
];
const DEBTS: [string, string, number][] = [
  ["mortgage", "Mortgage balance", 280000],
  ["auto", "Car loans", 12000],
  ["student", "Student loans", 20000],
  ["cards", "Credit card balances", 3000],
  ["otherDebt", "Other debts", 0],
];

/** Median household net worth by age of head of household — Federal Reserve Survey of Consumer Finances, 2022. */
const MEDIANS: [number, string, number][] = [
  [35, "Under 35", 39000],
  [45, "35–44", 135600],
  [55, "45–54", 247200],
  [65, "55–64", 364500],
  [75, "65–74", 409900],
  [Infinity, "75+", 335600],
];

export const config: CalcConfig = {
  id: "nw",
  title: "Net Worth Calculator",
  fields: [
    { kind: "number", key: "age", label: "Your age", default: 35, min: 15, max: 110, integer: true, full: true },
    ...ASSETS.map(([key, label, d]) => ({ kind: "number" as const, key, label, prefix: "$", default: d, min: 0, max: 1e12, optional: true, group: "Assets — what you own" })),
    ...DEBTS.map(([key, label, d]) => ({ kind: "number" as const, key, label, prefix: "$", default: d, min: 0, max: 1e12, optional: true, group: "Liabilities — what you owe" })),
  ],
  compute: (v) => {
    const assets = ASSETS.reduce((a, [k]) => a + (v[k] as number), 0);
    const debts = DEBTS.reduce((a, [k]) => a + (v[k] as number), 0);
    const nw = assets - debts;
    const [, bracket, median] = MEDIANS.find(([max]) => (v.age as number) < max)!;
    const liquid = (v.cash as number) + (v.invest as number);
    const colors = ["#10b981", "#2563eb", "#8b5cf6", "#f59e0b", "#06b6d4", "#64748b"];
    return {
      hero: { label: "Your net worth", value: usd0(nw), sub: `${usd0(assets)} in assets − ${usd0(debts)} in debts` },
      badge: nw >= median ? { text: "Above median for your age", tone: "good" } : { text: "Below median for your age", tone: "neutral" },
      chart: {
        type: "donut",
        format: "usd0",
        data: ASSETS.map(([k, label], i) => ({ name: label, value: v[k] as number, color: colors[i] })),
      },
      rows: [
        { label: "Total assets", value: usd0(assets) },
        { label: "Total liabilities", value: usd0(debts) },
        { label: `US median, age ${bracket}`, value: usd0(median) },
        { label: "Liquid assets", value: usd0(liquid) },
        { label: "Debt-to-asset ratio", value: assets > 0 ? `${Math.round((debts / assets) * 100)}%` : "—", strong: true },
      ],
      details: [
        {
          title: "Assets vs. liabilities",
          chart: {
            type: "stacked-bar",
            x: "side",
            format: "usd0",
            series: [...ASSETS, ...DEBTS].map(([k, label], i) => ({ key: k, name: label, color: i < ASSETS.length ? colors[i] : ["#ef4444", "#f97316", "#ec4899", "#b91c1c", "#9f1239"][i - ASSETS.length] })),
            data: [
              { side: "Assets", ...Object.fromEntries(ASSETS.map(([k]) => [k, v[k] as number])) },
              { side: "Liabilities", ...Object.fromEntries(DEBTS.map(([k]) => [k, v[k] as number])) },
            ],
          },
          table: {
            head: ["Item", "Amount"],
            rows: [
              ...ASSETS.filter(([k]) => (v[k] as number) > 0).map(([k, label]) => [label, usd0(v[k] as number)]),
              ...DEBTS.filter(([k]) => (v[k] as number) > 0).map(([k, label]) => [label, `−${usd0(v[k] as number)}`]),
              ["Net worth", usd0(nw)],
            ],
          },
        },
        {
          title: "Your net worth vs. US median by age",
          chart: {
            type: "bar",
            x: "age",
            format: "usd0",
            series: [{ key: "median", name: "US median net worth", color: "#94a3b8" }, { key: "you", name: "You", color: "#2563eb" }],
            data: MEDIANS.map(([, label, m]) => ({ age: label, median: m, you: label === bracket ? nw : 0 })),
          },
        },
      ],
    };
  },
};

export default function NetWorthCalculator() {
  return <CalcEngine config={config} />;
}
