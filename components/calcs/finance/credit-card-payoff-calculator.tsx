"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, usd, usd0 } from "@/components/flagship/engine/format";
import { amortize, pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "cc",
  title: "Credit Card Payoff Calculator",
  fields: [
    { kind: "number", key: "balance", label: "Card balance", prefix: "$", default: 5000, min: 1, max: 1e8 },
    { kind: "number", key: "apr", label: "Card APR", suffix: "%", default: 22.99, min: 0, max: 80 },
    {
      kind: "choice",
      key: "mode",
      label: "I want to",
      default: "payment",
      segmented: true,
      full: true,
      options: [
        { value: "payment", label: "Pay a fixed amount" },
        { value: "months", label: "Be debt-free by" },
      ],
    },
    { kind: "number", key: "payment", label: "Monthly payment", prefix: "$", default: 200, min: 1, max: 1e8, showIf: (v) => v.mode === "payment" },
    { kind: "number", key: "months", label: "Pay off within", suffix: "months", default: 24, min: 1, max: 600, integer: true, showIf: (v) => v.mode === "months" },
  ],
  compute: (v) => {
    const bal = v.balance as number;
    const r = (v.apr as number) / 1200;
    const payment = v.mode === "payment" ? (v.payment as number) : pmt(bal, r, v.months as number);
    if (payment <= bal * r + 0.005) {
      return { error: `A ${usd(payment)} payment doesn't cover the ${usd(bal * r)} of monthly interest, so the balance would never shrink. Pay at least ${usd(bal * r + 1)} a month.` };
    }
    const rows = amortize(bal, r, payment);
    const interest = rows.reduce((a, x) => a + x.interest, 0);
    // The usual card minimum: 1% of balance + that month's interest.
    const minimumStart = Math.max(25, bal * 0.01 + bal * r);
    return {
      hero:
        v.mode === "payment"
          ? { label: "Debt-free in", value: duration(rows.length), sub: `paying ${usd(payment)} a month` }
          : { label: "Monthly payment needed", value: usd(payment), sub: `to clear the card in ${duration(v.months as number)}` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Balance", value: bal, color: "#2563eb" },
          { name: "Interest", value: interest, color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Total interest", value: usd0(interest), strong: true },
        { label: "Total paid", value: usd0(bal + interest) },
        { label: "Number of payments", value: String(rows.length) },
        { label: "Typical minimum payment now", value: usd(minimumStart) },
      ],
      note: { tone: "info", text: "New purchases on the card aren't included. Stop using the card while paying it down, or move the balance to a 0% transfer offer to cut interest." },
      details: [
        { title: "Payoff schedule", amortization: { principal: bal, rows } },
      ],
    };
  },
};

export default function CreditCardPayoffCalculator() {
  return <CalcEngine config={config} />;
}
