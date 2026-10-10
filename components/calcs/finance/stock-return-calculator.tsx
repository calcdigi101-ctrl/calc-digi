"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "stock",
  title: "Stock Return Calculator",
  fields: [
    { kind: "number", key: "shares", label: "Number of shares", default: 50, min: 0.000001, max: 1e10 },
    { kind: "number", key: "buy", label: "Purchase price per share", prefix: "$", default: 100, min: 0.0001, max: 1e8 },
    { kind: "number", key: "sell", label: "Sell / current price per share", prefix: "$", default: 145, min: 0, max: 1e8 },
    { kind: "number", key: "years", label: "Years held", default: 3, min: 0.01, max: 100 },
    { kind: "number", key: "dividends", label: "Dividends received (total)", prefix: "$", default: 150, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "fees", label: "Commissions & fees (total)", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Costs & taxes" },
    {
      kind: "choice",
      key: "term",
      label: "Capital gains tax",
      default: "none",
      options: [
        { value: "none", label: "Ignore taxes" },
        { value: "lt15", label: "Long-term, 15%" },
        { value: "lt20", label: "Long-term, 20%" },
        { value: "st", label: "Short-term (ordinary), 24%" },
      ],
      group: "Costs & taxes",
    },
  ],
  compute: (v) => {
    const cost = (v.shares as number) * (v.buy as number);
    const proceeds = (v.shares as number) * (v.sell as number);
    const capGain = proceeds - cost - (v.fees as number);
    const rate = { none: 0, lt15: 0.15, lt20: 0.2, st: 0.24 }[v.term as "none"];
    const tax = Math.max(0, capGain) * rate;
    const total = capGain + (v.dividends as number) - tax;
    const ret = (total / cost) * 100;
    const endValue = cost + total;
    const annual = endValue > 0 ? (Math.pow(endValue / cost, 1 / (v.years as number)) - 1) * 100 : -100;
    return {
      hero: { label: "Total return", value: `${ret >= 0 ? "+" : ""}${fixed(ret, 2)}%`, sub: `${total >= 0 ? "Gain" : "Loss"} of ${usd(Math.abs(total))}` },
      badge: total >= 0 ? { text: "Profit", tone: "good" } : { text: "Loss", tone: "bad" },
      chart: {
        type: "donut",
        format: "usd",
        data: [
          { name: "Amount invested", value: cost, color: "#2563eb" },
          { name: "Capital gain", value: Math.max(0, capGain - tax), color: "#10b981" },
          { name: "Dividends", value: v.dividends as number, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Annualized return (CAGR)", value: `${fixed(annual, 2)}%`, strong: true },
        { label: "Amount invested", value: usd(cost) },
        { label: "Sale value", value: usd(proceeds) },
        { label: "Capital gain / loss", value: usd(capGain) },
        ...(tax > 0 ? [{ label: "Estimated tax", value: usd(tax) }] : []),
        { label: "Price change", value: `${fixed(((v.sell as number) / (v.buy as number) - 1) * 100, 2)}%` },
      ],
      details: [
        {
          title: "Growth at your annualized return",
          chart: {
            type: "area",
            x: "year",
            format: "usd",
            series: [{ key: "value", name: "Position value", color: total >= 0 ? "#10b981" : "#ef4444" }],
            data: Array.from({ length: Math.ceil(v.years as number) + 1 }, (_, i) => ({
              year: i === 0 ? "Buy" : `Yr ${i}`,
              value: Math.round(cost * Math.pow(1 + annual / 100, Math.min(i, v.years as number)) * 100) / 100,
            })),
          },
          table: {
            head: ["Year", "Value", "Gain"],
            rows: Array.from({ length: Math.ceil(v.years as number) + 1 }, (_, i) => {
              const val = cost * Math.pow(1 + annual / 100, Math.min(i, v.years as number));
              return [i === 0 ? "Buy" : i, usd(val), usd(val - cost)];
            }),
          },
        },
      ],
    };
  },
};

export default function StockReturnCalculator() {
  return <CalcEngine config={config} />;
}
