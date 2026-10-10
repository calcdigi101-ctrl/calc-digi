"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, num, usd, usd0 } from "@/components/flagship/engine/format";
import { amortize, pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "loan",
  title: "Loan Calculator",
  fields: [
    { kind: "number", key: "amount", label: "Loan amount", prefix: "$", default: 15000, min: 1, max: 1e9 },
    { kind: "number", key: "rate", label: "Interest rate", hint: "APR", suffix: "%", default: 10.5, min: 0, max: 100 },
    { kind: "number", key: "term", label: "Loan term", default: 5, min: 1, max: 600, integer: true },
    {
      kind: "choice",
      key: "unit",
      label: "Term in",
      default: "years",
      segmented: true,
      options: [
        { value: "years", label: "Years" },
        { value: "months", label: "Months" },
      ],
    },
    { kind: "number", key: "extra", label: "Extra monthly payment", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Extra payments" },
  ],
  validate: (v) => {
    const months = v.unit === "years" ? (v.term as number) * 12 : (v.term as number);
    if (months > 600) return { term: "Term can be at most 50 years (600 months)" };
  },
  compute: (v) => {
    const months = v.unit === "years" ? (v.term as number) * 12 : (v.term as number);
    const r = (v.rate as number) / 1200;
    const payment = pmt(v.amount as number, r, months);
    const extra = v.extra as number;
    const rows = amortize(v.amount as number, r, payment + extra);
    const base = amortize(v.amount as number, r, payment);
    const interest = rows.reduce((a, x) => a + x.interest, 0);
    const baseInterest = base.reduce((a, x) => a + x.interest, 0);
    return {
      hero: { label: "Monthly payment", value: usd(payment), sub: `${duration(months)} at ${v.rate}% APR` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Principal", value: v.amount as number, color: "#2563eb" },
          { name: "Interest", value: interest, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: `Total of ${rows.length} payments`, value: usd0((v.amount as number) + interest) },
        { label: "Total interest", value: usd0(interest), strong: true },
        { label: "Interest as % of loan", value: `${num((interest / (v.amount as number)) * 100, 1)}%` },
        { label: "Payoff time", value: duration(rows.length) },
      ],
      note:
        extra > 0 && base.length > rows.length
          ? { tone: "good", text: `Paying ${usd0(extra)} extra each month saves ${usd0(baseInterest - interest)} in interest and clears the loan ${duration(base.length - rows.length)} early.` }
          : undefined,
      details: [
        { title: "Amortization schedule", amortization: { principal: v.amount as number, rows } },
      ],
    };
  },
};

export default function LoanCalculator() {
  return <CalcEngine config={config} />;
}
