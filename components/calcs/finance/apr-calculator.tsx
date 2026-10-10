"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd, usd0 } from "@/components/flagship/engine/format";
import { amortize, pmt, pv } from "@/lib/finance";

/** Solve for the annual rate at which the payments' present value equals the cash actually received. */
function solveApr(payment: number, months: number, netReceived: number) {
  let lo = 0;
  let hi = 2; // 200% APR upper bound
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (pv(payment, mid / 12, months) > netReceived) lo = mid;
    else hi = mid;
  }
  return ((lo + hi) / 2) * 100;
}

export const config: CalcConfig = {
  id: "apr",
  title: "APR Calculator",
  fields: [
    { kind: "number", key: "loan", label: "Loan amount", prefix: "$", default: 20000, min: 1, max: 1e9 },
    { kind: "number", key: "rate", label: "Interest rate", suffix: "%", default: 6.5, min: 0, max: 100 },
    { kind: "number", key: "years", label: "Loan term", suffix: "years", default: 5, min: 0.5, max: 50 },
    { kind: "number", key: "fees", label: "Upfront fees & points", hint: "paid at closing", prefix: "$", default: 500, min: 0, max: 1e8, optional: true },
  ],
  validate: (v) => {
    if ((v.fees as number) >= (v.loan as number)) return { fees: "Fees must be less than the loan amount" };
  },
  compute: (v) => {
    const loan = v.loan as number;
    const fees = v.fees as number;
    const months = Math.round((v.years as number) * 12);
    const payment = pmt(loan, (v.rate as number) / 1200, months);
    const apr = solveApr(payment, months, loan - fees);
    const interest = payment * months - loan;
    const rows = amortize(loan, (v.rate as number) / 1200, payment);
    return {
      hero: { label: "Real APR", value: `${fixed(apr, 3)}%`, sub: `vs. ${fixed(v.rate as number, 3)}% stated interest rate` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Principal", value: loan, color: "#2563eb" },
          { name: "Interest", value: interest, color: "#f59e0b" },
          { name: "Fees", value: fees, color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Monthly payment", value: usd(payment) },
        { label: "Fees add to the rate", value: `+${fixed(apr - (v.rate as number), 3)} pts` },
        { label: "Amount you actually receive", value: usd0(loan - fees) },
        { label: "Total interest", value: usd0(interest) },
        { label: "Total cost of credit", value: usd0(interest + fees), strong: true },
      ],
      details: [{ title: "Amortization schedule", amortization: { principal: loan, rows } }],
    };
  },
};

export default function AprCalculator() {
  return <CalcEngine config={config} />;
}
