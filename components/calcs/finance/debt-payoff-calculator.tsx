"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, usd, usd0 } from "@/components/flagship/engine/format";
import { amortize } from "@/lib/finance";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const payoffDate = (months: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

export const config: CalcConfig = {
  id: "debt",
  title: "Debt Payoff Calculator",
  fields: [
    { kind: "number", key: "balance", label: "Total debt", prefix: "$", default: 8000, min: 1, max: 1e9 },
    { kind: "number", key: "rate", label: "Interest rate", hint: "average APR", suffix: "%", default: 19.99, min: 0, max: 80 },
    { kind: "number", key: "payment", label: "Monthly payment", prefix: "$", default: 300, min: 1, max: 1e8 },
    { kind: "number", key: "extra", label: "Extra monthly payment", hint: "to compare", prefix: "$", default: 100, min: 0, max: 1e8, optional: true },
  ],
  compute: (v) => {
    const bal = v.balance as number;
    const r = (v.rate as number) / 1200;
    const pay = v.payment as number;
    if (pay <= bal * r + 0.005) {
      return { error: `${usd(pay)} a month only covers interest (${usd(bal * r)}), so the debt would never be paid off. Pay at least ${usd(bal * r + 10)} a month.` };
    }
    const base = amortize(bal, r, pay);
    const fast = amortize(bal, r, pay + (v.extra as number));
    const baseInt = base.reduce((a, x) => a + x.interest, 0);
    const fastInt = fast.reduce((a, x) => a + x.interest, 0);
    const hasExtra = (v.extra as number) > 0;
    const len = base.length;
    return {
      hero: { label: "Debt-free date", value: payoffDate(len), sub: `${duration(len)} paying ${usd(pay)} a month` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Principal", value: bal, color: "#2563eb" },
          { name: "Interest", value: baseInt, color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Total interest", value: usd0(baseInt), strong: true },
        { label: "Total paid", value: usd0(bal + baseInt) },
        ...(hasExtra
          ? [
              { label: `With +${usd0(v.extra as number)}/mo`, value: `${payoffDate(fast.length)} (${duration(fast.length)})` },
              { label: "Interest saved", value: usd0(baseInt - fastInt) },
            ]
          : []),
      ],
      note: hasExtra ? { tone: "good", text: `An extra ${usd0(v.extra as number)} a month gets you debt-free ${duration(len - fast.length)} sooner and saves ${usd0(baseInt - fastInt)}.` } : undefined,
      details: [
        {
          title: "Payoff timeline",
          chart: {
            type: "line",
            x: "month",
            format: "usd0",
            series: [
              { key: "base", name: `${usd0(pay)}/mo`, color: "#ef4444" },
              ...(hasExtra ? [{ key: "fast", name: `${usd0(pay + (v.extra as number))}/mo`, color: "#10b981" }] : []),
            ],
            data: Array.from({ length: len + 1 }, (_, i) => ({
              month: i === 0 ? "Now" : `Mo ${i}`,
              base: i === 0 ? bal : Math.round(base[i - 1].balance),
              ...(hasExtra ? { fast: i === 0 ? bal : Math.round(fast[i - 1]?.balance ?? 0) } : {}),
            })),
          },
        },
        { title: "Payoff schedule", amortization: { principal: bal, rows: base } },
      ],
    };
  },
};

export default function DebtPayoffCalculator() {
  return <CalcEngine config={config} />;
}
