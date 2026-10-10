"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

/** Standard VAT / GST rates (%). */
const RATES: [string, string, number][] = [
  ["GB", "United Kingdom", 20], ["DE", "Germany", 19], ["FR", "France", 20], ["IT", "Italy", 22], ["ES", "Spain", 21],
  ["NL", "Netherlands", 21], ["IE", "Ireland", 23], ["SE", "Sweden", 25], ["PL", "Poland", 23], ["CH", "Switzerland", 8.1],
  ["AE", "United Arab Emirates", 5], ["SA", "Saudi Arabia", 15], ["IN", "India (GST, standard)", 18], ["PK", "Pakistan (GST)", 18],
  ["AU", "Australia (GST)", 10], ["NZ", "New Zealand (GST)", 15], ["CA", "Canada (GST)", 5], ["JP", "Japan (consumption tax)", 10],
  ["ZA", "South Africa", 15],
];

export const config: CalcConfig = {
  id: "vat",
  title: "VAT Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "I know the",
      default: "add",
      segmented: true,
      full: true,
      options: [
        { value: "add", label: "Net price (add VAT)" },
        { value: "remove", label: "Gross price (remove VAT)" },
      ],
    },
    { kind: "number", key: "amount", label: "Amount", default: 100, min: 0, max: 1e13 },
    {
      kind: "choice",
      key: "country",
      label: "VAT rate",
      default: "GB",
      options: [...RATES.map(([c, n, r]) => ({ value: c, label: `${n} – ${r}%` })), { value: "custom", label: "Custom rate…" }],
    },
    { kind: "number", key: "rate", label: "Custom VAT rate", suffix: "%", default: 20, min: 0, max: 100, showIf: (v) => v.country === "custom" },
  ],
  compute: (v) => {
    const r = (v.country === "custom" ? (v.rate as number) : RATES.find((x) => x[0] === v.country)![2]) / 100;
    const amt = v.amount as number;
    const net = v.mode === "add" ? amt : amt / (1 + r);
    const vat = net * r;
    const gross = net + vat;
    const m = (n: number) => fixed(n, 2);
    return {
      hero: v.mode === "add" ? { label: "Gross price (incl. VAT)", value: m(gross), sub: `${m(net)} + ${m(vat)} VAT at ${fixed(r * 100, 2).replace(/\.?0+$/, "")}%` } : { label: "Net price (excl. VAT)", value: m(net), sub: `${m(vat)} of ${m(gross)} is VAT` },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Net price", value: net, color: "#2563eb" },
          { name: "VAT", value: vat, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Net price", value: m(net) },
        { label: "VAT amount", value: m(vat), strong: true },
        { label: "Gross price", value: m(gross) },
        { label: "VAT as share of gross", value: `${fixed((r / (1 + r)) * 100, 2)}%` },
      ],
      details: [
        {
          title: `${v.mode === "add" ? m(net) + " net" : m(gross) + " gross"} at other VAT rates`,
          chart: {
            type: "bar",
            x: "country",
            format: "num",
            series: [{ key: "vat", name: "VAT amount", color: "#f59e0b" }],
            data: RATES.map(([c, , rr]) => ({ country: c, vat: Math.round((v.mode === "add" ? net * (rr / 100) : gross - gross / (1 + rr / 100)) * 100) / 100 })),
          },
          table: {
            head: ["Country", "Rate", "Net", "VAT", "Gross"],
            rows: RATES.map(([, name, rr]) => {
              const n2 = v.mode === "add" ? net : gross / (1 + rr / 100);
              return [name, `${rr}%`, m(n2), m(n2 * (rr / 100)), m(n2 * (1 + rr / 100))];
            }),
          },
        },
      ],
    };
  },
};

export default function VatCalculator() {
  return <CalcEngine config={config} />;
}
