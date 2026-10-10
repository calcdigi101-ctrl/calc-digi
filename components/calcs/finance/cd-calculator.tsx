"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd, usd0 } from "@/components/flagship/engine/format";

const TERMS = [3, 6, 9, 12, 18, 24, 36, 48, 60];

export const config: CalcConfig = {
  id: "cd",
  title: "CD Calculator",
  fields: [
    { kind: "number", key: "deposit", label: "Deposit amount", prefix: "$", default: 10000, min: 1, max: 1e10 },
    {
      kind: "choice",
      key: "term",
      label: "CD term",
      default: "12",
      options: TERMS.map((m) => ({ value: String(m), label: m < 12 ? `${m} months` : m % 12 === 0 ? `${m / 12} year${m === 12 ? "" : "s"}` : `${m} months` })),
    },
    { kind: "number", key: "rate", label: "Rate", suffix: "%", default: 4.25, min: 0, max: 30 },
    {
      kind: "choice",
      key: "type",
      label: "Rate is quoted as",
      default: "apy",
      segmented: true,
      options: [
        { value: "apy", label: "APY" },
        { value: "apr", label: "Interest rate" },
      ],
    },
    {
      kind: "choice",
      key: "freq",
      label: "Compounding",
      default: "365",
      options: [
        { value: "365", label: "Daily" },
        { value: "12", label: "Monthly" },
        { value: "4", label: "Quarterly" },
        { value: "1", label: "Annually" },
      ],
      showIf: (v) => v.type === "apr",
    },
    { kind: "number", key: "tax", label: "Your marginal tax rate", hint: "optional", suffix: "%", default: 0, min: 0, max: 60, optional: true, group: "After-tax interest" },
  ],
  compute: (v) => {
    const months = Number(v.term);
    const rate = (v.rate as number) / 100;
    const n = Number(v.freq);
    const apy = v.type === "apy" ? rate : Math.pow(1 + rate / n, n) - 1;
    const p = v.deposit as number;
    const data: { month: string; balance: number }[] = [{ month: "Open", balance: p }];
    for (let m = 1; m <= months; m++) data.push({ month: `Mo ${m}`, balance: Math.round(p * Math.pow(1 + apy, m / 12) * 100) / 100 });
    const final = p * Math.pow(1 + apy, months / 12);
    const interest = final - p;
    const afterTax = interest * (1 - (v.tax as number) / 100);
    return {
      hero: { label: "Balance at maturity", value: usd(final), sub: `after ${v.term} months` },
      chart: {
        type: "donut",
        format: "usd",
        data: [
          { name: "Deposit", value: p, color: "#2563eb" },
          { name: "Interest", value: interest, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Interest earned", value: usd(interest), strong: true },
        { label: "APY", value: `${fixed(apy * 100, 3)}%` },
        ...((v.tax as number) > 0 ? [{ label: "Interest after tax", value: usd(afterTax) }] : []),
        { label: "Early-withdrawal penalty (typical 3 months' interest)", value: usd0(p * (Math.pow(1 + apy, 0.25) - 1)) },
      ],
      details: [
        {
          title: "CD balance by month",
          chart: { type: "area", x: "month", format: "usd", series: [{ key: "balance", name: "Balance", color: "#2563eb" }], data },
        },
      ],
    };
  },
};

export default function CdCalculator() {
  return <CalcEngine config={config} />;
}
