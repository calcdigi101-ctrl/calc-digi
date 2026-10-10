"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num, usd, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "div",
  title: "Dividend Calculator",
  fields: [
    { kind: "number", key: "invest", label: "Amount invested", prefix: "$", default: 10000, min: 1, max: 1e10 },
    { kind: "number", key: "yield", label: "Dividend yield", suffix: "%", default: 4, min: 0, max: 50 },
    { kind: "number", key: "years", label: "Years", default: 10, min: 1, max: 60, integer: true },
    {
      kind: "choice",
      key: "drip",
      label: "Reinvest dividends (DRIP)",
      default: "yes",
      segmented: true,
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    { kind: "number", key: "divGrowth", label: "Dividend growth per year", suffix: "%", default: 5, min: -20, max: 50, optional: true, group: "Growth assumptions" },
    { kind: "number", key: "priceGrowth", label: "Share price growth per year", suffix: "%", default: 3, min: -50, max: 50, optional: true, group: "Growth assumptions" },
    { kind: "number", key: "monthly", label: "Additional monthly investment", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Growth assumptions" },
    { kind: "number", key: "tax", label: "Tax on dividends", suffix: "%", default: 15, min: 0, max: 60, optional: true, group: "Growth assumptions" },
  ],
  compute: (v) => {
    const years = v.years as number;
    const drip = v.drip === "yes";
    const g = (v.divGrowth as number) / 100;
    const pg = (v.priceGrowth as number) / 100;
    const tax = (v.tax as number) / 100;
    // Track value via an index price of $1 so yield-on-cost works for any share price.
    let price = 1;
    let shares = v.invest as number;
    let dps = (v.yield as number) / 100; // dividend per $1 share
    let invested = v.invest as number;
    let totalDiv = 0;
    const data: { year: string; dividends: number; value: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const add = (v.monthly as number) * 12;
      shares += add / price;
      invested += add;
      const div = shares * dps * (1 - tax);
      totalDiv += div;
      price *= 1 + pg;
      if (drip) shares += div / price;
      data.push({ year: `Yr ${y}`, dividends: Math.round(div), value: Math.round(shares * price) });
      dps *= 1 + g;
    }
    const value = shares * price;
    const finalIncome = shares * dps * (1 - tax);
    return {
      hero: { label: "Portfolio value", value: usd0(value), sub: `after ${years} years${drip ? " with dividends reinvested" : ""}` },
      chart: {
        type: "donut",
        format: "usd0",
        data: drip
          ? [
              { name: "Amount invested", value: invested, color: "#2563eb" },
              { name: "Reinvested dividends + growth", value: Math.max(0, value - invested), color: "#10b981" },
            ]
          : [
              { name: "Portfolio value", value, color: "#2563eb" },
              { name: "Dividends paid out", value: totalDiv, color: "#10b981" },
            ],
      },
      rows: [
        { label: "Annual dividend income now", value: usd((v.invest as number) * ((v.yield as number) / 100) * (1 - tax)) },
        { label: `Annual income in year ${years + 1}`, value: usd0(finalIncome), strong: true },
        { label: "Total dividends received", value: usd0(totalDiv) },
        { label: "Yield on original cost", value: `${fixed((finalIncome / (v.invest as number)) * 100, 2)}%` },
        { label: "Growth multiple", value: `${num((value + (drip ? 0 : totalDiv)) / invested, 2)}×` },
      ],
      details: [
        {
          title: "Dividend income by year",
          chart: { type: "bar", x: "year", format: "usd0", series: [{ key: "dividends", name: "Dividends (after tax)", color: "#10b981" }], data },
          table: { head: ["Year", "Dividends", "Portfolio value"], rows: data.map((d) => [d.year, usd0(d.dividends), usd0(d.value)]) },
        },
      ],
    };
  },
};

export default function DividendCalculator() {
  return <CalcEngine config={config} />;
}
