"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "roi",
  title: "ROI Calculator",
  fields: [
    { kind: "number", key: "invested", label: "Amount invested", prefix: "$", default: 10000, min: 0.01, max: 1e12 },
    { kind: "number", key: "returned", label: "Amount returned", hint: "final value", prefix: "$", default: 14500, min: 0, max: 1e13 },
    { kind: "number", key: "years", label: "Investment length", suffix: "years", default: 3, min: 0.01, max: 100, optional: true },
  ],
  compute: (v) => {
    const inv = v.invested as number;
    const ret = v.returned as number;
    const gain = ret - inv;
    const roi = (gain / inv) * 100;
    const years = v.years as number;
    const annual = years > 0 && ret > 0 ? (Math.pow(ret / inv, 1 / years) - 1) * 100 : null;
    return {
      hero: { label: "Return on investment", value: `${roi >= 0 ? "+" : ""}${fixed(roi, 2)}%`, sub: `${gain >= 0 ? "Gain" : "Loss"} of ${usd(Math.abs(gain))}` },
      badge: gain >= 0 ? { text: "Profit", tone: "good" } : { text: "Loss", tone: "bad" },
      chart: {
        type: "donut",
        format: "usd",
        data: [
          { name: "Amount invested", value: Math.min(inv, ret), color: "#2563eb" },
          gain >= 0 ? { name: "Gain", value: gain, color: "#10b981" } : { name: "Loss", value: -gain, color: "#ef4444" },
        ],
      },
      rows: [
        ...(annual !== null ? [{ label: "Annualized ROI", value: `${fixed(annual, 2)}% / yr`, strong: true }] : []),
        { label: "Investment gain", value: usd(gain) },
        { label: "Return multiple", value: `${fixed(ret / inv, 2)}×` },
        ...(annual !== null && annual > 0 ? [{ label: "Doubling time at this rate", value: `${fixed(Math.log(2) / Math.log(1 + annual / 100), 1)} years` }] : []),
      ],
      details:
        annual !== null
          ? [
              {
                title: "Value over time",
                chart: {
                  type: "area" as const,
                  x: "year",
                  format: "usd" as const,
                  series: [{ key: "value", name: "Investment value", color: gain >= 0 ? "#10b981" : "#ef4444" }],
                  data: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => {
                    const t = Math.min(i, years);
                    return { year: i === 0 ? "Start" : `Yr ${i}`, value: Math.round(inv * Math.pow(1 + annual / 100, t) * 100) / 100 };
                  }),
                },
                table: {
                  head: ["Year", "Value", "Gain so far"],
                  rows: Array.from({ length: Math.ceil(years) + 1 }, (_, i) => {
                    const val = inv * Math.pow(1 + annual / 100, Math.min(i, years));
                    return [i === 0 ? "Start" : i, usd(val), usd(val - inv)];
                  }),
                },
              },
            ]
          : undefined,
    };
  },
};

export default function RoiCalculator() {
  return <CalcEngine config={config} />;
}
