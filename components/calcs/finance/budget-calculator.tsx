"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";

const RULES: Record<string, [string, number, number, number]> = {
  "50-30-20": ["50/30/20 — balanced", 50, 30, 20],
  "60-20-20": ["60/20/20 — high cost of living", 60, 20, 20],
  "70-20-10": ["70/20/10 — tight budget", 70, 20, 10],
  "50-20-30": ["50/20/30 — aggressive saver", 50, 20, 30],
};

/** Typical split inside each 50/30/20 bucket (% of income); scaled for other rules. */
const CATEGORIES: [string, "n" | "w" | "s", number][] = [
  ["Housing", "n", 25],
  ["Utilities & phone", "n", 5],
  ["Groceries", "n", 10],
  ["Transportation & insurance", "n", 10],
  ["Dining out", "w", 8],
  ["Entertainment & subscriptions", "w", 7],
  ["Shopping & personal", "w", 10],
  ["Travel & gifts", "w", 5],
  ["Retirement & investing", "s", 10],
  ["Emergency fund & goals", "s", 7],
  ["Extra debt payments", "s", 3],
];
const BASE = { n: 50, w: 30, s: 20 };

export const config: CalcConfig = {
  id: "bg",
  title: "Budget Calculator",
  fields: [
    { kind: "number", key: "income", label: "Monthly take-home income", prefix: "$", default: 4000, min: 0, max: 1e9 },
    { kind: "choice", key: "rule", label: "Budget rule", default: "50-30-20", options: Object.entries(RULES).map(([value, [label]]) => ({ value, label })) },
    { kind: "number", key: "housing", label: "Housing", hint: "rent/mortgage", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Compare with what you spend now" },
    { kind: "number", key: "bills", label: "Utilities, insurance & transport", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Compare with what you spend now" },
    { kind: "number", key: "food", label: "Groceries", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Compare with what you spend now" },
    { kind: "number", key: "debt", label: "Minimum debt payments", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Compare with what you spend now" },
    { kind: "number", key: "fun", label: "Dining, shopping & entertainment", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Compare with what you spend now" },
  ],
  compute: (v) => {
    const inc = v.income as number;
    const [, n, w, s] = RULES[String(v.rule)];
    const needs = (inc * n) / 100;
    const wants = (inc * w) / 100;
    const save = (inc * s) / 100;
    const actualNeeds = (v.housing as number) + (v.bills as number) + (v.food as number) + (v.debt as number);
    const actualWants = v.fun as number;
    const hasActual = actualNeeds + actualWants > 0;
    const actualSave = inc - actualNeeds - actualWants;
    return {
      hero: { label: "Save each month", value: usd0(save), sub: `${usd0(save * 12)} a year at ${s}% of income` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: `Needs (${n}%)`, value: needs, color: "#2563eb" },
          { name: `Wants (${w}%)`, value: wants, color: "#f59e0b" },
          { name: `Savings & debt payoff (${s}%)`, value: save, color: "#10b981" },
        ],
      },
      rows: [
        { label: "Housing guideline (≤ 30%)", value: usd0(inc * 0.3) },
        ...(hasActual
          ? [
              { label: "Your needs now", value: `${usd0(actualNeeds)} (${Math.round((actualNeeds / Math.max(inc, 1)) * 100)}%)` },
              { label: "Your wants now", value: `${usd0(actualWants)} (${Math.round((actualWants / Math.max(inc, 1)) * 100)}%)` },
              { label: "Left to save", value: `${usd0(actualSave)} (${Math.round((actualSave / Math.max(inc, 1)) * 100)}%)`, strong: true },
            ]
          : []),
      ],
      note: hasActual
        ? actualSave < 0
          ? { tone: "bad", text: `You're spending ${usd0(-actualSave)} more than you earn each month.` }
          : actualNeeds > needs
            ? { tone: "warn", text: `Needs are ${usd0(actualNeeds - needs)} over the ${n}% target. Housing is usually the biggest lever.` }
            : { tone: "good", text: "Your spending fits within this budget rule." }
        : { tone: "info", text: "Enter what you spend now under “Compare with what you spend now” to see how you measure up." },
      details: [
        {
          title: "Suggested monthly budget",
          chart: {
            type: "bar",
            x: "category",
            format: "usd0",
            series: [{ key: "amount", name: "Per month", color: "#2563eb" }],
            data: CATEGORIES.map(([c, b, pct]) => ({ category: c, amount: Math.round((inc * pct * ({ n, w, s }[b] / BASE[b])) / 100) })),
          },
          table: {
            head: ["Category", "Bucket", "Per month", "Per year"],
            rows: CATEGORIES.map(([c, b, pct]) => {
              const amt = (inc * pct * ({ n, w, s }[b] / BASE[b])) / 100;
              return [c, { n: "Needs", w: "Wants", s: "Savings" }[b], usd0(amt), usd0(amt * 12)];
            }),
          },
        },
        ...(hasActual
          ? [
              {
                title: "Target vs. actual",
                chart: {
                  type: "bar" as const,
                  x: "bucket",
                  format: "usd0" as const,
                  series: [
                    { key: "target", name: "Target", color: "#94a3b8" },
                    { key: "actual", name: "Actual", color: "#2563eb" },
                  ],
                  data: [
                    { bucket: "Needs", target: Math.round(needs), actual: actualNeeds },
                    { bucket: "Wants", target: Math.round(wants), actual: actualWants },
                    { bucket: "Savings", target: Math.round(save), actual: Math.round(actualSave) },
                  ],
                },
              },
            ]
          : []),
      ],
    };
  },
};

export default function BudgetCalculator() {
  return <CalcEngine config={config} />;
}
