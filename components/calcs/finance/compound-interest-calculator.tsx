"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd, usd0 } from "@/components/flagship/engine/format";
import { growth } from "@/lib/finance";

export const config: CalcConfig = {
  id: "ci",
  title: "Compound Interest Calculator",
  resultLabel: "Future value",
  fields: [
    { kind: "number", key: "initial", label: "Initial investment", prefix: "$", default: 10000, min: 0, max: 1e10 },
    { kind: "number", key: "monthly", label: "Monthly contribution", prefix: "$", default: 200, min: 0, max: 1e8, optional: true },
    { kind: "number", key: "rate", label: "Annual interest rate", suffix: "%", default: 7, min: 0, max: 50 },
    { kind: "number", key: "years", label: "Years to grow", suffix: "years", default: 20, min: 1, max: 100, integer: true },
    {
      kind: "choice",
      key: "freq",
      label: "Compounding",
      default: "12",
      options: [
        { value: "365", label: "Daily" },
        { value: "12", label: "Monthly" },
        { value: "4", label: "Quarterly" },
        { value: "1", label: "Annually" },
      ],
      group: "More options",
    },
    {
      kind: "choice",
      key: "timing",
      label: "Contributions made at",
      default: "end",
      segmented: true,
      options: [
        { value: "end", label: "End of month" },
        { value: "start", label: "Start of month" },
      ],
      group: "More options",
    },
    { kind: "number", key: "increase", label: "Increase contributions yearly by", suffix: "%", default: 0, min: 0, max: 50, optional: true, group: "More options" },
  ],
  compute: (v) => {
    const g = growth({
      initial: v.initial as number,
      monthly: v.monthly as number,
      annualRatePct: v.rate as number,
      years: v.years as number,
      compounding: Number(v.freq),
      atStart: v.timing === "start",
      annualIncreasePct: v.increase as number,
    });
    const deposits = g.contributed - (v.initial as number);
    return {
      hero: { label: "Future value", value: usd(g.balance), sub: `after ${v.years} years at ${v.rate}% compounded ${({ "365": "daily", "12": "monthly", "4": "quarterly", "1": "annually" } as Record<string, string>)[String(v.freq)]}` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Initial investment", value: v.initial as number, color: "#2563eb" },
          { name: "Contributions", value: deposits, color: "#10b981" },
          { name: "Interest earned", value: g.interest, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Total contributions", value: usd0(g.contributed) },
        { label: "Total interest earned", value: usd0(g.interest), strong: true },
        { label: "Interest share of balance", value: `${num(g.balance > 0 ? (g.interest / g.balance) * 100 : 0, 1)}%` },
        { label: "Growth multiple", value: g.contributed > 0 ? `${num(g.balance / g.contributed, 2)}×` : "—" },
      ],
      details: [
        {
          title: "Growth by year",
          chart: {
            type: "stacked-bar",
            x: "year",
            format: "usd0",
            series: [
              { key: "contributions", name: "Contributions", color: "#2563eb" },
              { key: "interest", name: "Interest", color: "#f59e0b" },
            ],
            data: g.yearly.map((y) => ({ year: `Yr ${y.year}`, contributions: Math.round(y.contributions), interest: Math.round(y.interest) })),
          },
          table: {
            head: ["Year", "Contributions", "Interest", "Balance"],
            rows: g.yearly.map((y) => [y.year, usd0(y.contributions), usd0(y.interest), usd0(y.balance)]),
          },
        },
      ],
    };
  },
};

export default function CompoundInterestCalculator() {
  return <CalcEngine config={config} />;
}
