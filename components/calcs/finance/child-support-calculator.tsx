"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd0 } from "@/components/flagship/engine/format";

/** Share of combined parental income for child support (New York CSSA guideline percentages). */
const PCT: Record<number, number> = { 1: 0.17, 2: 0.25, 3: 0.29, 4: 0.31 };
const pctFor = (children: number) => PCT[children] ?? 0.35;

export const config: CalcConfig = {
  id: "cs",
  title: "Child Support Calculator",
  fields: [
    { kind: "number", key: "payer", label: "Paying parent's income", hint: "non-custodial", prefix: "$", suffix: "/yr", default: 60000, min: 0, max: 1e10 },
    { kind: "number", key: "other", label: "Custodial parent's income", prefix: "$", suffix: "/yr", default: 36000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "children", label: "Number of children", default: 1, min: 1, max: 15, integer: true },
    { kind: "number", key: "extras", label: "Childcare & health insurance costs", prefix: "$", suffix: "/yr", default: 0, min: 0, max: 1e8, optional: true, group: "Add-on expenses" },
  ],
  compute: (v) => {
    const payer = v.payer as number;
    const other = v.other as number;
    const combined = payer + other;
    if (combined <= 0) return { error: "Enter at least one parent's income." };
    const pct = pctFor(v.children as number);
    const share = payer / combined;
    const basic = combined * pct;
    const support = basic * share + (v.extras as number) * share;
    return {
      hero: { label: "Estimated child support", value: `${usd0(support / 12)}/mo`, sub: `${usd0(support)} a year` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Paying parent's share", value: basic * share, color: "#2563eb" },
          { name: "Custodial parent's share", value: basic * (1 - share), color: "#10b981" },
          ...((v.extras as number) > 0 ? [{ name: "Add-on expenses (payer)", value: (v.extras as number) * share, color: "#f59e0b" }] : []),
        ],
      },
      rows: [
        { label: "Combined parental income", value: usd0(combined) },
        { label: `Guideline for ${v.children} ${v.children === 1 ? "child" : "children"}`, value: `${fixed(pct * 100, 0)}% of combined` },
        { label: "Total basic obligation", value: `${usd0(basic)}/yr` },
        { label: "Paying parent's income share", value: `${fixed(share * 100, 1)}%`, strong: true },
      ],
      note: { tone: "warn", text: "Uses the income-shares percentages from New York's guidelines as an example. Every state has its own formula, deductions, income caps and parenting-time adjustments — check your state's official calculator." },
      details: [
        {
          title: "Support by number of children",
          chart: {
            type: "bar",
            x: "kids",
            format: "usd0",
            series: [{ key: "monthly", name: "Monthly support", color: "#2563eb" }],
            data: [1, 2, 3, 4, 5].map((k) => ({ kids: `${k} ${k === 1 ? "child" : "children"}`, monthly: Math.round((combined * pctFor(k) * share + (v.extras as number) * share) / 12) })),
          },
          table: {
            head: ["Children", "Guideline %", "Total obligation / yr", "Paying parent / mo"],
            rows: [1, 2, 3, 4, 5].map((k) => [k, `${Math.round(pctFor(k) * 100)}%`, usd0(combined * pctFor(k)), usd0((combined * pctFor(k) * share + (v.extras as number) * share) / 12)]),
          },
        },
      ],
    };
  },
};

export default function ChildSupportCalculator() {
  return <CalcEngine config={config} />;
}
