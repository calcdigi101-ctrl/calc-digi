"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "long-division-calc",
  title: "Long Division Calculator (Quotient & Remainder)",
  fields: [
    { kind: "number", key: "dividend", label: "Dividend (Number to Divide)", default: 487, integer: true, min: 0 },
    { kind: "number", key: "divisor", label: "Divisor (Divide By)", default: 32, integer: true, min: 1 },
  ],
  compute(values) {
    const dividend = Math.floor(Number(values.dividend));
    const divisor = Math.floor(Number(values.divisor));

    if (divisor <= 0) return { error: "Divisor must be an integer strictly greater than zero." };

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    const decimal = dividend / divisor;

    return {
      hero: {
        label: "Quotient & Remainder",
        value: remainder === 0 ? String(quotient) : `${quotient} R ${remainder}`,
        unit: "division",
      },
      badge: {
        text: remainder === 0 ? "Divides Evenly (Zero Remainder)" : `Remainder ${remainder}`,
        tone: remainder === 0 ? "good" : "info",
      },
      rows: [
        { label: "Whole Quotient", value: num(quotient), strong: true },
        { label: "Remainder (R)", value: num(remainder), strong: true },
        { label: "Exact Decimal", value: fixed(decimal, 4) },
        { label: "Mixed Number Form", value: remainder > 0 ? `${quotient} ${remainder}/${divisor}` : String(quotient) },
        { label: "Verification Check", value: `(${divisor} × ${quotient}) + ${remainder} = ${dividend}` },
      ],
      note: {
        text: `${dividend} ÷ ${divisor} = ${quotient} with remainder ${remainder}.`,
        tone: "neutral",
      },
    };
  },
};

export default function LongDivisionCalculator() {
  return <CalcEngine config={config} />;
}
