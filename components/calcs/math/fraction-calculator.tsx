"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

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
  id: "fraction-calc",
  title: "Fraction Calculator (Add, Subtract, Multiply, Divide)",
  fields: [
    { kind: "number", key: "n1", label: "Numerator 1", default: 3, integer: true },
    { kind: "number", key: "d1", label: "Denominator 1", default: 4, integer: true },
    {
      kind: "choice",
      key: "op",
      label: "Operation",
      default: "add",
      segmented: true,
      options: [
        { value: "add", label: "+ Add" },
        { value: "sub", label: "− Sub" },
        { value: "mul", label: "× Mul" },
        { value: "div", label: "÷ Div" },
      ],
    },
    { kind: "number", key: "n2", label: "Numerator 2", default: 1, integer: true },
    { kind: "number", key: "d2", label: "Denominator 2", default: 2, integer: true },
  ],
  compute(values) {
    const n1 = Number(values.n1);
    const d1 = Number(values.d1);
    const op = String(values.op || "add");
    const n2 = Number(values.n2);
    const d2 = Number(values.d2);

    if (d1 === 0 || d2 === 0) {
      return { error: "Denominator cannot be zero in fraction arithmetic." };
    }
    if (op === "div" && n2 === 0) {
      return { error: "Cannot divide by a fraction with a numerator of zero." };
    }

    let resNum = 0;
    let resDen = 1;

    if (op === "add") {
      resNum = n1 * d2 + n2 * d1;
      resDen = d1 * d2;
    } else if (op === "sub") {
      resNum = n1 * d2 - n2 * d1;
      resDen = d1 * d2;
    } else if (op === "mul") {
      resNum = n1 * n2;
      resDen = d1 * d2;
    } else if (op === "div") {
      resNum = n1 * d2;
      resDen = d1 * n2;
    }

    if (resDen < 0) {
      resNum = -resNum;
      resDen = -resDen;
    }

    const g = gcd2(resNum, resDen);
    const simNum = resNum / g;
    const simDen = resDen / g;

    const decimal = simNum / simDen;

    // Mixed number
    let mixedStr = "";
    if (Math.abs(simNum) >= simDen && simDen !== 1) {
      const whole = Math.floor(Math.abs(simNum) / simDen) * (simNum < 0 ? -1 : 1);
      const rem = Math.abs(simNum) % simDen;
      if (rem > 0) mixedStr = `${whole} ${rem}/${simDen}`;
    }

    const fractionStr = simDen === 1 ? String(simNum) : `${simNum}/${simDen}`;

    return {
      hero: {
        label: "Resulting Fraction",
        value: fractionStr,
      },
      badge: {
        text: simDen === 1 ? "Whole Integer" : Math.abs(simNum) < simDen ? "Proper Fraction" : "Improper Fraction",
        tone: "good",
      },
      rows: [
        { label: "Simplified Fraction", value: fractionStr, strong: true },
        ...(mixedStr ? [{ label: "Mixed Number Form", value: mixedStr }] : []),
        { label: "Decimal Equivalent", value: fixed(decimal, 4) },
        { label: "Percentage Equivalent", value: `${fixed(decimal * 100, 2)}%` },
        { label: "Unreduced Ratio", value: `${resNum}/${resDen}` },
      ],
      note: {
        text: `Reduced by greatest common factor (GCF = ${g}).`,
        tone: "neutral",
      },
    };
  },
};

export default function FractionCalculator() {
  return <CalcEngine config={config} />;
}
