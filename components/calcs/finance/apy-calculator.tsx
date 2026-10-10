"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd } from "@/components/flagship/engine/format";

const FREQS: [string, string, number][] = [
  ["1", "Annually", 1],
  ["2", "Semiannually", 2],
  ["4", "Quarterly", 4],
  ["12", "Monthly", 12],
  ["52", "Weekly", 52],
  ["365", "Daily", 365],
  ["cont", "Continuously", Infinity],
];
const apyOf = (rate: number, n: number) => (n === Infinity ? Math.exp(rate) - 1 : Math.pow(1 + rate / n, n) - 1);

export const config: CalcConfig = {
  id: "apy",
  title: "APY Calculator",
  fields: [
    { kind: "number", key: "rate", label: "Interest rate", hint: "nominal / APR", suffix: "%", default: 5, min: 0, max: 100 },
    { kind: "choice", key: "freq", label: "Compounding", default: "365", options: FREQS.map(([value, label]) => ({ value, label })) },
    { kind: "number", key: "deposit", label: "Deposit", hint: "to show earnings", prefix: "$", default: 10000, min: 0, max: 1e10, optional: true },
  ],
  compute: (v) => {
    const rate = (v.rate as number) / 100;
    const n = FREQS.find((f) => f[0] === v.freq)![2];
    const apy = apyOf(rate, n);
    const p = v.deposit as number;
    return {
      hero: { label: "Annual percentage yield", value: `${fixed(apy * 100, 4)}%`, sub: `${v.rate}% compounded ${FREQS.find((f) => f[0] === v.freq)![1].toLowerCase()}` },
      rows: [
        { label: "Extra yield from compounding", value: `+${fixed((apy - rate) * 100, 4)} pts` },
        ...(p > 0
          ? [
              { label: "Interest earned in 1 year", value: usd(p * apy), strong: true },
              { label: "Balance after 1 year", value: usd(p * (1 + apy)) },
            ]
          : []),
      ],
      details: [
        {
          title: "APY by compounding frequency",
          chart: {
            type: "bar",
            x: "freq",
            format: "pct",
            series: [{ key: "apy", name: "APY", color: "#2563eb" }],
            data: FREQS.map(([, label, f]) => ({ freq: label, apy: Math.round(apyOf(rate, f) * 1e6) / 1e4 })),
          },
          table: {
            head: ["Compounding", "APY", p > 0 ? "Interest on deposit (1 yr)" : "APY − rate"],
            rows: FREQS.map(([, label, f]) => [label, `${fixed(apyOf(rate, f) * 100, 4)}%`, p > 0 ? usd(p * apyOf(rate, f)) : `${fixed((apyOf(rate, f) - rate) * 100, 4)} pts`]),
          },
        },
      ],
    };
  },
};

export default function ApyCalculator() {
  return <CalcEngine config={config} />;
}
