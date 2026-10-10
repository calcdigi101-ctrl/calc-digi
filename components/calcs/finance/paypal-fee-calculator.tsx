"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd } from "@/components/flagship/engine/format";

/** [label, percent, fixed $] — US rates; check PayPal's fee page for changes. */
const TYPES: Record<string, [string, number, number]> = {
  gs: ["Goods & services (personal account)", 2.99, 0.49],
  checkout: ["PayPal Checkout / invoices (business)", 3.49, 0.49],
  ff_card: ["Friends & family, funded by card", 2.9, 0.3],
  ff_free: ["Friends & family, bank or balance", 0, 0],
  custom: ["Custom fee…", 0, 0],
};

export const config: CalcConfig = {
  id: "pp",
  title: "PayPal Fee Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "I want to know",
      default: "receive",
      segmented: true,
      full: true,
      options: [
        { value: "receive", label: "What I receive" },
        { value: "charge", label: "What to charge" },
      ],
    },
    { kind: "number", key: "amount", label: "Amount", hint: "payment or target", prefix: "$", default: 100, min: 0.01, max: 1e9 },
    { kind: "choice", key: "type", label: "Transaction type", default: "gs", options: Object.entries(TYPES).map(([value, [label]]) => ({ value, label })) },
    {
      kind: "choice",
      key: "intl",
      label: "Payment from another country",
      default: "no",
      segmented: true,
      options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes (+1.5%)" },
      ],
    },
    { kind: "number", key: "pct", label: "Percentage fee", suffix: "%", default: 2.99, min: 0, max: 30, showIf: (v) => v.type === "custom" },
    { kind: "number", key: "fixed", label: "Fixed fee", prefix: "$", default: 0.49, min: 0, max: 100, showIf: (v) => v.type === "custom" },
  ],
  compute: (v) => {
    const [, p0, f0] = TYPES[String(v.type)];
    const pct = (v.type === "custom" ? (v.pct as number) : p0) / 100 + (v.intl === "yes" ? 0.015 : 0);
    const fixedFee = v.type === "custom" ? (v.fixed as number) : f0;
    const amt = v.amount as number;
    let charge: number, fee: number, receive: number;
    if (v.mode === "receive") {
      charge = amt;
      fee = charge * pct + fixedFee;
      receive = charge - fee;
    } else {
      receive = amt;
      charge = (receive + fixedFee) / (1 - pct);
      fee = charge - receive;
    }
    if (receive < 0) return { error: "The fee is larger than the payment at this amount." };
    return {
      hero: v.mode === "receive" ? { label: "You receive", value: usd(receive), sub: `PayPal keeps ${usd(fee)} of ${usd(charge)}` } : { label: "Ask the buyer for", value: usd(charge), sub: `so you receive ${usd(receive)} after ${usd(fee)} in fees` },
      chart: {
        type: "donut",
        format: "usd",
        data: [
          { name: "You receive", value: receive, color: "#10b981" },
          { name: "PayPal fee", value: fee, color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Payment amount", value: usd(charge) },
        { label: "PayPal fee", value: usd(fee), strong: true },
        { label: "Fee rate", value: `${fixed(pct * 100, 2)}% + ${usd(fixedFee)}` },
        { label: "Effective fee", value: `${fixed((fee / charge) * 100, 2)}%` },
      ],
      note: { tone: "info", text: "Typical US PayPal rates. Currency conversion adds roughly 3–4% more. Check PayPal's fee page for your account type before pricing." },
      details: [
        {
          title: "Fees at different payment amounts",
          chart: {
            type: "stacked-bar",
            x: "amount",
            format: "usd",
            series: [
              { key: "receive", name: "You receive", color: "#10b981" },
              { key: "fee", name: "PayPal fee", color: "#ef4444" },
            ],
            data: [10, 25, 50, 100, 250, 500].map((a) => {
              const f = a * pct + fixedFee;
              return { amount: `$${a}`, receive: Math.round((a - f) * 100) / 100, fee: Math.round(f * 100) / 100 };
            }),
          },
          table: {
            head: ["Payment", "Fee", "You receive", "Effective rate"],
            rows: [10, 25, 50, 100, 250, 500, 1000, 5000].map((a) => {
              const f = a * pct + fixedFee;
              return [usd(a), usd(f), usd(a - f), `${fixed((f / a) * 100, 2)}%`];
            }),
          },
        },
      ],
    };
  },
};

export default function PaypalFeeCalculator() {
  return <CalcEngine config={config} />;
}
