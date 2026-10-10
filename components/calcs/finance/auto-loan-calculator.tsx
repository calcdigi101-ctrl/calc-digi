"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, usd, usd0 } from "@/components/flagship/engine/format";
import { amortize, pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "auto",
  title: "Auto Loan Calculator",
  fields: [
    { kind: "number", key: "price", label: "Vehicle price", prefix: "$", default: 35000, min: 100, max: 1e7 },
    {
      kind: "choice",
      key: "term",
      label: "Loan term",
      default: "60",
      options: ["24", "36", "48", "60", "72", "84"].map((m) => ({ value: m, label: `${m} months (${Number(m) / 12} yrs)` })),
    },
    { kind: "number", key: "rate", label: "Interest rate", hint: "APR", suffix: "%", default: 6.5, min: 0, max: 40 },
    { kind: "number", key: "down", label: "Down payment", prefix: "$", default: 5000, min: 0, max: 1e7, optional: true },
    { kind: "number", key: "trade", label: "Trade-in value", prefix: "$", default: 0, min: 0, max: 1e7, optional: true },
    { kind: "number", key: "owed", label: "Amount owed on trade-in", prefix: "$", default: 0, min: 0, max: 1e7, optional: true, group: "Taxes, fees & trade-in" },
    { kind: "number", key: "tax", label: "Sales tax", suffix: "%", default: 8, min: 0, max: 20, optional: true, group: "Taxes, fees & trade-in" },
    { kind: "number", key: "fees", label: "Title, registration & dealer fees", prefix: "$", default: 0, min: 0, max: 1e6, optional: true, group: "Taxes, fees & trade-in" },
  ],
  compute: (v) => {
    const price = v.price as number;
    const trade = v.trade as number;
    // Most states tax the price after the trade-in credit.
    const taxAmt = Math.max(0, price - trade) * ((v.tax as number) / 100);
    const financed = price + taxAmt + (v.fees as number) + (v.owed as number) - (v.down as number) - trade;
    if (financed <= 0) return { error: "Your down payment and trade-in cover the full price — there's nothing to finance." };
    const n = Number(v.term);
    const r = (v.rate as number) / 1200;
    const payment = pmt(financed, r, n);
    const rows = amortize(financed, r, payment);
    const interest = rows.reduce((a, x) => a + x.interest, 0);
    return {
      hero: { label: "Monthly payment", value: usd(payment), sub: `${duration(n)} at ${v.rate}% APR` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Loan principal", value: financed, color: "#2563eb" },
          { name: "Interest", value: interest, color: "#f59e0b" },
          { name: "Down payment + trade-in", value: (v.down as number) + trade, color: "#10b981" },
        ],
      },
      rows: [
        { label: "Amount financed", value: usd0(financed), strong: true },
        { label: "Sales tax", value: usd0(taxAmt) },
        { label: "Total interest", value: usd0(interest) },
        { label: "Total loan payments", value: usd0(payment * n) },
        { label: "Total cost of car", value: usd0(payment * n + (v.down as number) + trade - (v.owed as number)) },
      ],
      details: [
        { title: "Amortization schedule", amortization: { principal: financed, rows } },
      ],
    };
  },
};

export default function AutoLoanCalculator() {
  return <CalcEngine config={config} />;
}
