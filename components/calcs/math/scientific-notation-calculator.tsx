"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "sci-not-calc",
  title: "Scientific Notation Calculator",
  fields: [
    { kind: "text", key: "num", label: "Enter Number or Decimal", default: "300000000", hint: "e.g. 300000000, 0.000045, -1.25e7" },
  ],
  compute(values) {
    const raw = String(values.num || "").trim();
    const val = Number(raw);

    if (!Number.isFinite(val)) return { error: "Please enter a valid real number." };

    if (val === 0) {
      return {
        hero: { label: "Scientific Form", value: "0 × 10⁰" },
        badge: { text: "Zero", tone: "info" },
        rows: [{ label: "Standard Form", value: "0" }],
      };
    }

    const sign = val < 0 ? "-" : "";
    const absVal = Math.abs(val);
    const exp = Math.floor(Math.log10(absVal));
    const coef = absVal / Math.pow(10, exp);

    // Engineering notation (exponent multiple of 3)
    const engExp = Math.floor(exp / 3) * 3;
    const engCoef = absVal / Math.pow(10, engExp);

    const sciStr = `${sign}${fixed(coef, 4)} × 10^${exp}`;
    const engStr = `${sign}${fixed(engCoef, 3)} × 10^${engExp}`;
    const eStr = val.toExponential(4);

    return {
      hero: {
        label: "Standard Scientific Notation",
        value: sciStr,
      },
      badge: {
        text: `Exponent 10^${exp}`,
        tone: "good",
      },
      rows: [
        { label: "Scientific Form (a × 10ᵇ)", value: sciStr, strong: true },
        { label: "Engineering Form (10^(3k))", value: engStr },
        { label: "E-Notation", value: eStr },
        { label: "Coefficient (1 ≤ a < 10)", value: `${sign}${fixed(coef, 6)}` },
        { label: "Exponent (b)", value: String(exp) },
      ],
      note: {
        text: "Scientific notation standardizes large and microscopic numbers with a normalized coefficient between 1 and 10.",
        tone: "neutral",
      },
    };
  },
};

export default function ScientificNotationCalculator() {
  return <CalcEngine config={config} />;
}
