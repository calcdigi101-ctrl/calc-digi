"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd0 } from "@/components/flagship/engine/format";

/** Duration as a share of marriage length (American Academy of Matrimonial Lawyers guideline). */
function durationFactor(years: number) {
  if (years < 3) return 0.3;
  if (years < 10) return 0.4;
  if (years < 20) return 0.6;
  return null; // 20+ years: often indefinite / permanent
}

export const config: CalcConfig = {
  id: "al",
  title: "Alimony Calculator",
  fields: [
    { kind: "number", key: "payer", label: "Higher earner's gross income", prefix: "$", suffix: "/yr", default: 90000, min: 0, max: 1e10 },
    { kind: "number", key: "payee", label: "Lower earner's gross income", prefix: "$", suffix: "/yr", default: 40000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "years", label: "Length of marriage", suffix: "years", default: 12, min: 0, max: 80 },
  ],
  validate: (v) => {
    if ((v.payee as number) > (v.payer as number)) return { payee: "Enter the lower income here" };
  },
  compute: (v) => {
    const payer = v.payer as number;
    const payee = v.payee as number;
    // AAML: 30% of payer's income minus 20% of payee's, capped so the payee ends up with no more than 40% of combined income.
    const formula = 0.3 * payer - 0.2 * payee;
    const cap = 0.4 * (payer + payee) - payee;
    const annual = Math.max(0, Math.min(formula, cap));
    const f = durationFactor(v.years as number);
    const duration = f === null ? "Indefinite (20+ year marriage)" : `${fixed((v.years as number) * f, 1)} years`;
    return {
      hero: { label: "Estimated alimony", value: `${usd0(annual / 12)}/mo`, sub: `${usd0(annual)} a year` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Higher earner keeps", value: payer - annual, color: "#2563eb" },
          { name: "Lower earner income", value: payee, color: "#10b981" },
          { name: "Alimony", value: annual, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Estimated duration", value: duration, strong: true },
        { label: "30% of payer − 20% of payee", value: usd0(Math.max(0, formula)) },
        { label: "Cap (payee ≤ 40% of combined)", value: usd0(Math.max(0, cap)) },
        { label: "Payee's share after support", value: `${fixed(((payee + annual) / Math.max(1, payer + payee)) * 100, 1)}%` },
      ],
      note: { tone: "warn", text: "A guideline estimate only. Alimony (spousal support) is set by state law and judges' discretion, and many states use their own formulas. Talk to a family law attorney." },
    };
  },
};

export default function AlimonyCalculator() {
  return <CalcEngine config={config} />;
}
