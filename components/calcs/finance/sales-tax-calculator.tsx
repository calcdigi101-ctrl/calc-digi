"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd } from "@/components/flagship/engine/format";
import { STATE_RATES } from "@/lib/salesTax";


export const config: CalcConfig = {
  id: "st",
  title: "Sales Tax Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "I know the",
      default: "add",
      segmented: true,
      full: true,
      options: [
        { value: "add", label: "Price before tax" },
        { value: "remove", label: "Total with tax" },
      ],
    },
    { kind: "number", key: "amount", label: "Amount", prefix: "$", default: 100, min: 0, max: 1e12, full: true },
    {
      kind: "choice",
      key: "state",
      label: "State",
      default: "CA",
      options: [{ value: "custom", label: "Enter a rate…" }, ...STATE_RATES.map(([code, name, rate]) => ({ value: code, label: `${name} (${rate}%)` }))],
    },
    { kind: "number", key: "local", label: "Local / city rate", hint: "added to state", suffix: "%", default: 0, min: 0, max: 10, optional: true, showIf: (v) => v.state !== "custom" },
    { kind: "number", key: "rate", label: "Total tax rate", suffix: "%", default: 8.25, min: 0, max: 50, showIf: (v) => v.state === "custom" },
  ],
  compute: (v) => {
    const stateRate = STATE_RATES.find((s) => s[0] === v.state)?.[2];
    const rate = (v.state === "custom" ? (v.rate as number) : (stateRate ?? 0) + (v.local as number)) / 100;
    const amt = v.amount as number;
    const pre = v.mode === "add" ? amt : amt / (1 + rate);
    const tax = pre * rate;
    const total = pre + tax;
    return {
      hero: v.mode === "add" ? { label: "Total price", value: usd(total), sub: `${usd(tax)} tax at ${fixed(rate * 100, 3).replace(/\.?0+$/, "")}%` } : { label: "Price before tax", value: usd(pre), sub: `${usd(tax)} of the ${usd(total)} total is tax` },
      chart: {
        type: "donut",
        format: "usd",
        data: [
          { name: "Price before tax", value: pre, color: "#2563eb" },
          { name: "Sales tax", value: tax, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Price before tax", value: usd(pre) },
        { label: "Sales tax", value: usd(tax), strong: true },
        { label: "Total", value: usd(total) },
        { label: "Tax rate", value: `${fixed(rate * 100, 3).replace(/\.?0+$/, "")}%` },
      ],
      note: v.state !== "custom" && (v.local as number) === 0 && (stateRate ?? 0) > 0 ? { tone: "info", text: "This is the statewide rate only. Most cities and counties add a local sales tax — add it above for the full rate." } : undefined,
    };
  },
};

export default function SalesTaxCalculator() {
  return <CalcEngine config={config} />;
}
