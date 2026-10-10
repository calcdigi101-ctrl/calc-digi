"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, usd0 } from "@/components/flagship/engine/format";
import { pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "dp",
  title: "Down Payment Calculator",
  fields: [
    { kind: "number", key: "price", label: "Home price", prefix: "$", default: 400000, min: 1000, max: 1e10 },
    {
      kind: "choice",
      key: "pct",
      label: "Down payment",
      default: "20",
      options: [
        ["3", "3% — conventional minimum"],
        ["3.5", "3.5% — FHA minimum"],
        ["5", "5%"],
        ["10", "10%"],
        ["15", "15%"],
        ["20", "20% — no PMI"],
        ["25", "25%"],
      ].map(([value, label]) => ({ value, label })),
    },
    { kind: "number", key: "saved", label: "Saved so far", prefix: "$", default: 20000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "monthly", label: "You can save", prefix: "$", suffix: "/mo", default: 1500, min: 0, max: 1e8, optional: true },
    { kind: "number", key: "apy", label: "Savings account APY", suffix: "%", default: 4, min: 0, max: 20, optional: true, group: "Assumptions" },
    { kind: "number", key: "closing", label: "Closing costs", suffix: "% of price", default: 3, min: 0, max: 10, optional: true, group: "Assumptions" },
    { kind: "number", key: "rate", label: "Mortgage rate", suffix: "%", default: 6.5, min: 0, max: 20, group: "Assumptions" },
  ],
  compute: (v) => {
    const price = v.price as number;
    const pct = Number(v.pct) / 100;
    const down = price * pct;
    const closing = price * ((v.closing as number) / 100);
    const goal = down + closing;
    const loan = price - down;
    const r = Math.pow(1 + (v.apy as number) / 100, 1 / 12) - 1;
    let bal = v.saved as number;
    let months = 0;
    while (bal < goal && months < 1200 && (v.monthly as number) + bal * r > 0) {
      bal = bal * (1 + r) + (v.monthly as number);
      months++;
    }
    const reachable = bal >= goal;
    const pi = pmt(loan, (v.rate as number) / 1200, 360);
    const pmi = pct < 0.2 ? (loan * 0.0075) / 12 : 0; // ~0.75% a year is a typical PMI rate
    return {
      hero: { label: "Down payment", value: usd0(down), sub: `${Number(v.pct)}% of ${usd0(price)} · plus ~${usd0(closing)} closing costs` },
      badge: reachable ? (months === 0 ? { text: "Ready now", tone: "good" } : { text: `Ready in ${duration(months)}`, tone: "info" }) : { text: "Increase savings", tone: "warn" },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Saved so far", value: Math.min(v.saved as number, goal), color: "#10b981" },
          { name: "Still needed", value: Math.max(0, goal - (v.saved as number)), color: "#2563eb" },
        ],
      },
      rows: [
        { label: "Cash needed at closing", value: usd0(goal), strong: true },
        { label: "Loan amount", value: usd0(loan) },
        { label: "Monthly principal & interest (30 yr)", value: usd0(pi) },
        { label: "Estimated PMI", value: pmi > 0 ? `${usd0(pmi)}/mo` : "None (20%+ down)" },
      ],
      note: reachable ? undefined : { tone: "warn", text: "At this savings rate you won't reach the goal. Save more each month or choose a smaller down payment." },
    };
  },
};

export default function DownPaymentCalculator() {
  return <CalcEngine config={config} />;
}
