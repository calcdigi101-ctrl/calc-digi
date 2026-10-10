"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";
import { pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "rb",
  title: "Rent vs. Buy Calculator",
  fields: [
    { kind: "number", key: "price", label: "Home price", prefix: "$", default: 400000, min: 1000, max: 1e10 },
    { kind: "number", key: "rent", label: "Monthly rent for a similar home", prefix: "$", default: 2200, min: 0, max: 1e7 },
    { kind: "number", key: "downPct", label: "Down payment", suffix: "%", default: 20, min: 0, max: 100 },
    { kind: "number", key: "rate", label: "Mortgage rate", suffix: "%", default: 6.5, min: 0, max: 20 },
    { kind: "number", key: "years", label: "Years you'll stay", default: 7, min: 1, max: 30, integer: true },
    { kind: "number", key: "appreciation", label: "Home price growth", suffix: "%/yr", default: 3, min: -10, max: 20, group: "Assumptions" },
    { kind: "number", key: "rentGrowth", label: "Rent increase", suffix: "%/yr", default: 3, min: -10, max: 20, group: "Assumptions" },
    { kind: "number", key: "invest", label: "Return on invested savings", suffix: "%/yr", default: 5, min: 0, max: 20, group: "Assumptions" },
    { kind: "number", key: "tax", label: "Property tax", suffix: "%/yr", default: 1.1, min: 0, max: 5, group: "Assumptions" },
    { kind: "number", key: "upkeep", label: "Maintenance & insurance", suffix: "%/yr", default: 1.5, min: 0, max: 10, group: "Assumptions" },
    { kind: "number", key: "buyCost", label: "Closing costs to buy", suffix: "%", default: 3, min: 0, max: 10, group: "Assumptions" },
    { kind: "number", key: "sellCost", label: "Selling costs", suffix: "%", default: 6, min: 0, max: 15, group: "Assumptions" },
  ],
  compute: (v) => {
    const price = v.price as number;
    const years = v.years as number;
    const down = price * ((v.downPct as number) / 100);
    const loan = price - down;
    const r = (v.rate as number) / 1200;
    const payment = pmt(loan, r, 360);
    const inv = Math.pow(1 + (v.invest as number) / 100, 1 / 12) - 1;
    // Buyer: out-of-pocket costs; renter: invests the upfront cash and any monthly difference.
    let balance = loan;
    let homeValue = price;
    let rent = v.rent as number;
    let renterPortfolio = down + price * ((v.buyCost as number) / 100);
    let buyerPortfolio = 0;
    let rentPaid = 0;
    let buyPaid = down + price * ((v.buyCost as number) / 100);
    const data: { year: string; Renting: number; Buying: number }[] = [];
    for (let m = 1; m <= years * 12; m++) {
      const interest = balance * r;
      balance -= payment - interest;
      const ownCost = payment + (homeValue * ((v.tax as number) + (v.upkeep as number))) / 100 / 12;
      buyPaid += ownCost;
      rentPaid += rent;
      // Whoever pays less this month invests the difference.
      renterPortfolio *= 1 + inv;
      buyerPortfolio *= 1 + inv;
      if (ownCost > rent) renterPortfolio += ownCost - rent;
      else buyerPortfolio += rent - ownCost;
      homeValue *= Math.pow(1 + (v.appreciation as number) / 100, 1 / 12);
      if (m % 12 === 0) {
        rent *= 1 + (v.rentGrowth as number) / 100;
        const equity = homeValue * (1 - (v.sellCost as number) / 100) - Math.max(0, balance);
        data.push({ year: `Yr ${m / 12}`, Renting: Math.round(renterPortfolio), Buying: Math.round(equity + buyerPortfolio) });
      }
    }
    const last = data[data.length - 1];
    const diff = last.Buying - last.Renting;
    const crossover = data.find((d) => d.Buying > d.Renting);
    return {
      hero: { label: diff >= 0 ? "Buying comes out ahead by" : "Renting comes out ahead by", value: usd0(Math.abs(diff)), sub: `in wealth after ${years} years` },
      badge: diff >= 0 ? { text: "Buy", tone: "good" } : { text: "Rent", tone: "info" },
      rows: [
        { label: "Buyer's wealth (home equity after selling + savings)", value: usd0(last.Buying), strong: diff >= 0 },
        { label: "Renter's wealth (invested savings)", value: usd0(last.Renting), strong: diff < 0 },
        { label: "First-month cost of owning", value: usd0(payment + (price * ((v.tax as number) + (v.upkeep as number))) / 100 / 12) },
        { label: "Monthly mortgage payment (P&I)", value: usd0(payment) },
        { label: "Total rent paid", value: usd0(rentPaid) },
        { label: "Buying breaks even", value: crossover ? `in ${crossover.year.replace("Yr ", "year ")}` : `not within ${years} years` },
      ],
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Mortgage (P&I)", value: payment, color: "#2563eb" },
          { name: "Property tax", value: (price * (v.tax as number)) / 100 / 12, color: "#f59e0b" },
          { name: "Maintenance & insurance", value: (price * (v.upkeep as number)) / 100 / 12, color: "#8b5cf6" },
        ],
      },
      details: [
        {
          title: "Wealth: buying vs. renting",
          chart: {
            type: "line",
            x: "year",
            format: "usd0",
            series: [
              { key: "Buying", name: "Buying", color: "#2563eb" },
              { key: "Renting", name: "Renting", color: "#f59e0b" },
            ],
            data,
          },
          table: {
            head: ["Year", "Buyer's wealth", "Renter's wealth", "Difference"],
            rows: data.map((d) => [d.year.replace("Yr ", ""), usd0(d.Buying), usd0(d.Renting), `${d.Buying >= d.Renting ? "Buy +" : "Rent +"}${usd0(Math.abs(d.Buying - d.Renting))}`]),
          },
        },
      ],
      note: { tone: "info", text: "Compares net wealth: the buyer's home equity after selling costs plus anything they invested, vs. the renter investing the down payment, closing costs and any monthly savings." },
    };
  },
};

export default function RentVsBuyCalculator() {
  return <CalcEngine config={config} />;
}
