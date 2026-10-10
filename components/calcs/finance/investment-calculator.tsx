"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd, usd0 } from "@/components/flagship/engine/format";
import { growth } from "@/lib/finance";

export const config: CalcConfig = {
  id: "inv",
  title: "Investment Calculator",
  fields: [
    { kind: "number", key: "initial", label: "Starting amount", prefix: "$", default: 10000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "monthly", label: "Monthly contribution", prefix: "$", default: 300, min: 0, max: 1e8, optional: true },
    { kind: "number", key: "rate", label: "Expected annual return", suffix: "%", default: 7, min: -20, max: 50 },
    { kind: "number", key: "years", label: "Investment period", suffix: "years", default: 20, min: 1, max: 80, integer: true },
    { kind: "number", key: "increase", label: "Increase contributions yearly by", suffix: "%", default: 0, min: 0, max: 50, optional: true, group: "More options" },
    { kind: "number", key: "inflation", label: "Inflation rate", hint: "for today's dollars", suffix: "%", default: 3, min: 0, max: 20, optional: true, group: "More options" },
    {
      kind: "choice",
      key: "timing",
      label: "Contribute at",
      default: "end",
      segmented: true,
      options: [
        { value: "start", label: "Start of month" },
        { value: "end", label: "End of month" },
      ],
      group: "More options",
    },
  ],
  validate: (v) => {
    if ((v.initial as number) === 0 && (v.monthly as number) === 0) return { monthly: "Enter a starting amount or a monthly contribution" };
  },
  compute: (v) => {
    const years = v.years as number;
    const g = growth({
      initial: v.initial as number,
      monthly: v.monthly as number,
      annualRatePct: v.rate as number,
      years,
      compounding: 1,
      atStart: v.timing === "start",
      annualIncreasePct: v.increase as number,
    });
    const real = g.balance / Math.pow(1 + (v.inflation as number) / 100, years);
    return {
      hero: { label: "End balance", value: usd(g.balance), sub: `after ${years} years at ${v.rate}% a year` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Starting amount", value: v.initial as number, color: "#64748b" },
          { name: "Contributions", value: g.contributed - (v.initial as number), color: "#2563eb" },
          { name: "Investment growth", value: Math.max(0, g.interest), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Total contributions", value: usd0(g.contributed) },
        { label: "Investment growth", value: usd0(g.interest), strong: true },
        { label: "In today's dollars", value: usd0(real) },
        { label: "Growth multiple", value: g.contributed > 0 ? `${num(g.balance / g.contributed, 2)}×` : "—" },
      ],
      details: [
        {
          title: "Portfolio growth",
          chart: {
            type: "area",
            x: "year",
            format: "usd0",
            series: [
              { key: "contributions", name: "Contributions", color: "#2563eb" },
              { key: "growth", name: "Growth", color: "#10b981" },
            ],
            data: g.yearly.map((y) => ({ year: `Yr ${y.year}`, contributions: Math.round(y.contributions), growth: Math.round(y.interest) })),
          },
          table: { head: ["Year", "Contributions", "Growth", "Balance"], rows: g.yearly.map((y) => [y.year, usd0(y.contributions), usd0(y.interest), usd0(y.balance)]) },
        },
      ],
      note: { tone: "info", text: "Returns are assumed constant. Real markets swing year to year, so treat this as a planning estimate, not a forecast." },
    };
  },
};

export default function InvestmentCalculator() {
  return <CalcEngine config={config} />;
}
