"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, fixed, usd0 } from "@/components/flagship/engine/format";

const EXPENSES: [string, string, number][] = [
  ["rent", "Rent / mortgage", 1500],
  ["utilities", "Utilities & phone", 250],
  ["food", "Groceries", 450],
  ["insurance", "Insurance", 250],
  ["transport", "Transportation", 300],
  ["debt", "Minimum debt payments", 200],
  ["other", "Other essentials", 150],
];

export const config: CalcConfig = {
  id: "ef",
  title: "Emergency Fund Calculator",
  fields: [
    ...EXPENSES.map(([key, label, d]) => ({ kind: "number" as const, key, label, prefix: "$", suffix: "/mo", default: d, min: 0, max: 1e8, optional: true })),
    {
      kind: "choice",
      key: "months",
      label: "Months of expenses to cover",
      default: "6",
      full: true,
      options: [
        ["3", "3 months — stable job, dual income"],
        ["6", "6 months — standard recommendation"],
        ["9", "9 months — single income or some job risk"],
        ["12", "12 months — self-employed or variable income"],
      ].map(([value, label]) => ({ value, label })),
    },
    { kind: "number", key: "saved", label: "Already saved", prefix: "$", default: 2000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "monthly", label: "You can add", prefix: "$", suffix: "/mo", default: 400, min: 0, max: 1e8, optional: true },
  ],
  compute: (v) => {
    const essentials = EXPENSES.reduce((a, [k]) => a + (v[k] as number), 0);
    if (essentials <= 0) return { error: "Enter at least one monthly expense." };
    const target = essentials * Number(v.months);
    const saved = v.saved as number;
    const remaining = Math.max(0, target - saved);
    const pct = Math.min(100, (saved / target) * 100);
    const months = remaining === 0 ? 0 : (v.monthly as number) > 0 ? Math.ceil(remaining / (v.monthly as number)) : Infinity;
    return {
      hero: { label: "Emergency fund target", value: usd0(target), sub: `${v.months} months × ${usd0(essentials)} of essential expenses` },
      badge: pct >= 100 ? { text: "Fully funded", tone: "good" } : { text: `${Math.floor(pct)}% funded`, tone: pct >= 50 ? "info" : "warn" },
      spectrum: {
        value: Math.round(pct),
        min: 0,
        max: 100,
        label: `Emergency fund ${Math.round(pct)}% complete`,
        segments: [
          { to: 25, color: "#ef4444", label: "Starting" },
          { to: 50, color: "#f59e0b", label: "Building" },
          { to: 100, color: "#10b981", label: "Strong" },
        ],
        ticks: [25, 50],
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: EXPENSES.map(([k, label], i) => ({ name: label, value: v[k] as number, color: ["#2563eb", "#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#64748b"][i] })),
      },
      rows: [
        { label: "Already saved", value: usd0(saved) },
        { label: "Still to save", value: usd0(remaining), strong: true },
        { label: "Months covered now", value: fixed(saved / essentials, 1) },
        { label: "Time to reach target", value: months === 0 ? "Done" : months === Infinity ? "—" : duration(months) },
      ],
      details: [
        {
          title: "Monthly essential expenses",
          chart: {
            type: "bar",
            x: "item",
            format: "usd0",
            series: [{ key: "amount", name: "Per month", color: "#2563eb" }],
            data: EXPENSES.filter(([k]) => (v[k] as number) > 0).map(([k, label]) => ({ item: label, amount: v[k] as number })),
          },
          table: {
            head: ["Expense", "Per month", `× ${v.months} months`],
            rows: [...EXPENSES.filter(([k]) => (v[k] as number) > 0).map(([k, label]) => [label, usd0(v[k] as number), usd0((v[k] as number) * Number(v.months))]), ["Total", usd0(essentials), usd0(target)]],
          },
        },
      ],
    };
  },
};

export default function EmergencyFundCalculator() {
  return <CalcEngine config={config} />;
}
