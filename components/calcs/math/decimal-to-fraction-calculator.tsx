"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

function gcd2(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export const config: CalcConfig = {
  id: "dec-to-frac-calc",
  title: "Decimal to Fraction Converter",
  presets: [
    { label: "2.625 (Mixed 2 5/8)", values: { decimal: "2.625" } },
    { label: "0.75 (Three Quarters 3/4)", values: { decimal: "0.75" } },
    { label: "0.333333 (One Third 1/3)", values: { decimal: "0.333333" } },
    { label: "3.14159265 (Pi Approx)", values: { decimal: "3.14159265" } },
    { label: "0.125 (One Eighth 1/8)", values: { decimal: "0.125" } },
  ],
  fields: [
    { kind: "text", key: "decimal", label: "Enter Decimal Number", default: "2.625", hint: "e.g. 0.75, 2.625, -0.125" },
  ],
  compute(values) {
    const raw = String(values.decimal || "").trim();
    const val = Number(raw);
    if (!Number.isFinite(val)) return { error: "Please enter a valid decimal number." };

    const parts = raw.split(".");
    const sign = val < 0 ? -1 : 1;
    const absVal = Math.abs(val);

    if (parts.length < 2 || parts[1].length === 0) {
      return {
        hero: { label: "Fraction Form", value: `${val}/1` },
        badge: { text: "Integer", tone: "info" },
        rows: [{ label: "Simplified Fraction", value: String(val) }],
      };
    }

    const decimals = parts[1].length;
    const den = Math.pow(10, decimals);
    const num = Math.round(absVal * den);

    const g = gcd2(num, den);
    const simNum = (num / g) * sign;
    const simDen = den / g;

    const fractionStr = `${simNum}/${simDen}`;

    let mixedStr = "";
    if (Math.abs(simNum) >= simDen && simDen !== 1) {
      const whole = Math.floor(Math.abs(simNum) / simDen) * sign;
      const rem = Math.abs(simNum) % simDen;
      if (rem > 0) mixedStr = `${whole} ${rem}/${simDen}`;
    }

    return {
      hero: {
        label: "Simplified Fraction",
        value: fractionStr,
      },
      badge: {
        text: "Exact Rational Form",
        tone: "good",
      },
      rows: [
        { label: "Fraction", value: fractionStr, strong: true },
        ...(mixedStr ? [{ label: "Mixed Number", value: mixedStr }] : []),
        { label: "Decimal Input", value: raw },
        { label: "Percentage Equivalent", value: `${fixed(val * 100, 2)}%` },
        { label: "Reciprocal (1/x)", value: `${simDen}/${simNum}` },
      ],
      note: {
        text: `Converted with denominator 10^${decimals} = ${den} and reduced by GCF ${g}.`,
        tone: "neutral",
      },
    };
  },
};

export default function DecimalToFractionCalculator() {
  return <CalcEngine config={config} />;
}
