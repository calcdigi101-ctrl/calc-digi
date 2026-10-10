"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "bp",
  title: "Business Profit Calculator",
  fields: [
    { kind: "number", key: "revenue", label: "Revenue", prefix: "$", default: 100000, min: 0, max: 1e13 },
    { kind: "number", key: "cogs", label: "Cost of goods sold", prefix: "$", default: 40000, min: 0, max: 1e13, optional: true },
    { kind: "number", key: "opex", label: "Operating expenses", prefix: "$", default: 30000, min: 0, max: 1e13, optional: true },
    { kind: "number", key: "da", label: "Depreciation & amortization", prefix: "$", default: 0, min: 0, max: 1e13, optional: true, group: "Interest, depreciation & tax" },
    { kind: "number", key: "interest", label: "Interest expense", prefix: "$", default: 0, min: 0, max: 1e13, optional: true, group: "Interest, depreciation & tax" },
    { kind: "number", key: "tax", label: "Income tax rate", hint: "21% US C-corp", suffix: "%", default: 21, min: 0, max: 60, optional: true, group: "Interest, depreciation & tax" },
  ],
  compute: (v) => {
    const rev = v.revenue as number;
    const gross = rev - (v.cogs as number);
    const ebitda = gross - (v.opex as number);
    const ebit = ebitda - (v.da as number);
    const ebt = ebit - (v.interest as number);
    const tax = Math.max(0, ebt) * ((v.tax as number) / 100);
    const net = ebt - tax;
    const m = (x: number) => (rev > 0 ? `${fixed((x / rev) * 100, 1)}%` : "—");
    return {
      hero: { label: "Net profit", value: usd0(net), sub: `Net margin ${m(net)}` },
      badge: net >= 0 ? { text: "Profitable", tone: "good" } : { text: "Loss", tone: "bad" },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Cost of goods sold", value: v.cogs as number, color: "#ef4444" },
          { name: "Operating expenses", value: v.opex as number, color: "#f59e0b" },
          { name: "Depreciation & interest", value: (v.da as number) + (v.interest as number), color: "#8b5cf6" },
          { name: "Tax", value: tax, color: "#64748b" },
          { name: "Net profit", value: Math.max(0, net), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Gross profit", value: `${usd0(gross)} · ${m(gross)}` },
        { label: "EBITDA", value: `${usd0(ebitda)} · ${m(ebitda)}` },
        { label: "Operating profit (EBIT)", value: `${usd0(ebit)} · ${m(ebit)}` },
        { label: "Pre-tax profit", value: usd0(ebt) },
        { label: "Income tax", value: usd0(tax) },
        { label: "Net profit", value: `${usd0(net)} · ${m(net)}`, strong: true },
      ],
      details: [
        {
          title: "Profit waterfall",
          chart: {
            type: "bar",
            x: "stage",
            format: "usd0",
            series: [{ key: "amount", name: "Amount", color: "#2563eb" }],
            data: [
              { stage: "Revenue", amount: rev },
              { stage: "Gross profit", amount: gross },
              { stage: "EBITDA", amount: ebitda },
              { stage: "EBIT", amount: ebit },
              { stage: "Net profit", amount: Math.round(net) },
            ],
          },
        },
      ],
    };
  },
};

export default function BusinessProfitCalculator() {
  return <CalcEngine config={config} />;
}
