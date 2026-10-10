"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";
import { pmt } from "@/lib/finance";

const RULES: Record<string, [string, number, number]> = {
  conservative: ["Conservative — 28% / 36%", 0.28, 0.36],
  standard: ["Standard conventional — 31% / 43%", 0.31, 0.43],
  fha: ["FHA — 31% / 43%", 0.31, 0.43],
  stretch: ["Aggressive — 36% / 50%", 0.36, 0.5],
};

export const config: CalcConfig = {
  id: "ha",
  title: "Home Affordability Calculator",
  fields: [
    { kind: "number", key: "income", label: "Annual household income", hint: "before tax", prefix: "$", default: 100000, min: 1000, max: 1e10 },
    { kind: "number", key: "debts", label: "Monthly debt payments", hint: "car, cards, student loans", prefix: "$", default: 500, min: 0, max: 1e8, optional: true },
    { kind: "number", key: "down", label: "Down payment", prefix: "$", default: 60000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "rate", label: "Mortgage rate", suffix: "%", default: 6.5, min: 0, max: 20 },
    { kind: "choice", key: "term", label: "Loan term", default: "30", segmented: true, options: ["15", "20", "30"].map((t) => ({ value: t, label: `${t} yrs` })) },
    { kind: "choice", key: "rule", label: "Debt-to-income limits", default: "conservative", options: Object.entries(RULES).map(([value, [label]]) => ({ value, label })) },
    { kind: "number", key: "tax", label: "Property tax", suffix: "% of price/yr", default: 1.1, min: 0, max: 5, optional: true, group: "Taxes, insurance & HOA" },
    { kind: "number", key: "ins", label: "Homeowners insurance", prefix: "$", suffix: "/yr", default: 1800, min: 0, max: 1e6, optional: true, group: "Taxes, insurance & HOA" },
    { kind: "number", key: "hoa", label: "HOA dues", prefix: "$", suffix: "/mo", default: 0, min: 0, max: 1e5, optional: true, group: "Taxes, insurance & HOA" },
  ],
  compute: (v) => {
    const monthlyIncome = (v.income as number) / 12;
    const [, front, back] = RULES[String(v.rule)];
    const maxHousing = Math.min(monthlyIncome * front, monthlyIncome * back - (v.debts as number));
    const fixedCosts = (v.ins as number) / 12 + (v.hoa as number);
    const k = pmt(1, (v.rate as number) / 1200, Number(v.term) * 12); // payment per $1 borrowed
    const t = (v.tax as number) / 100 / 12; // tax per $1 of price per month
    const down = v.down as number;
    // Solve maxHousing = (P − down)·k + P·t + fixedCosts for the price P.
    const price = Math.max(0, (maxHousing - fixedCosts + down * k) / (k + t));
    if (maxHousing <= fixedCosts || price <= down) {
      return { error: "With these debts and costs, the debt-to-income limits leave no room for a mortgage payment. Try paying down debt or a less strict limit." };
    }
    const loan = price - down;
    const pi = loan * k;
    const priceAt = (rate: number) => {
      const kk = pmt(1, rate / 1200, Number(v.term) * 12);
      return Math.max(0, (maxHousing - fixedCosts + down * kk) / (kk + t));
    };
    const base = v.rate as number;
    const rates = [base - 1.5, base - 1, base - 0.5, base, base + 0.5, base + 1, base + 1.5].filter((r) => r >= 0).map((r) => Math.round(r * 100) / 100);
    const taxM = price * t;
    return {
      hero: { label: "You can afford a home up to", value: usd0(price), sub: `with ${usd0(down)} down and a ${usd0(loan)} loan` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Principal & interest", value: pi, color: "#2563eb" },
          { name: "Property tax", value: taxM, color: "#f59e0b" },
          { name: "Insurance", value: (v.ins as number) / 12, color: "#10b981" },
          { name: "HOA", value: v.hoa as number, color: "#64748b" },
        ],
      },
      rows: [
        { label: "Monthly housing payment", value: usd0(maxHousing), strong: true },
        { label: `Front-end limit (${Math.round(front * 100)}% of income)`, value: usd0(monthlyIncome * front) },
        { label: `Back-end limit (${Math.round(back * 100)}% incl. debts)`, value: usd0(monthlyIncome * back - (v.debts as number)) },
        { label: "Down payment share", value: `${((down / price) * 100).toFixed(1)}%` },
      ],
      note:
        down / price < 0.2
          ? { tone: "info", text: "With less than 20% down, conventional lenders add PMI, which reduces what you can afford slightly. FHA loans add mortgage insurance premiums." }
          : undefined,
      details: [
        {
          title: "How the mortgage rate changes what you can afford",
          chart: {
            type: "bar",
            x: "rate",
            format: "usd0",
            series: [{ key: "price", name: "Maximum home price", color: "#2563eb" }],
            data: rates.map((r) => ({ rate: `${r}%`, price: Math.round(priceAt(r)) })),
          },
          table: {
            head: ["Mortgage rate", "Max home price", "Loan amount", "Principal & interest"],
            rows: rates.map((r) => {
              const p = priceAt(r);
              return [`${r}%`, usd0(p), usd0(p - down), usd0((p - down) * pmt(1, r / 1200, Number(v.term) * 12))];
            }),
          },
        },
      ],
    };
  },
};

export default function HomeAffordabilityCalculator() {
  return <CalcEngine config={config} />;
}
