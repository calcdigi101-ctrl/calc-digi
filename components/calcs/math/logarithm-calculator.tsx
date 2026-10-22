"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "logarithm-calc",
  title: "Logarithm Calculator (log₁₀, ln, log₂ & log_b)",
  fields: [
    { kind: "number", key: "x", label: "Input Value (x)", default: 100, min: 0.0000001 },
    {
      kind: "choice",
      key: "base",
      label: "Logarithm Base",
      default: "10",
      segmented: true,
      options: [
        { value: "10", label: "Common (log₁₀)" },
        { value: "e", label: "Natural (ln)" },
        { value: "2", label: "Binary (log₂)" },
      ],
    },
  ],
  compute(values) {
    const x = Number(values.x);
    const baseChoice = String(values.base || "10");

    if (x <= 0) return { error: "Logarithms are only defined for strictly positive numbers (x > 0)." };

    let base = 10;
    let baseLabel = "log₁₀";
    if (baseChoice === "e") {
      base = Math.E;
      baseLabel = "ln";
    } else if (baseChoice === "2") {
      base = 2;
      baseLabel = "log₂";
    }

    const logVal = Math.log(x) / Math.log(base);
    const lnVal = Math.log(x);
    const log10Val = Math.log10(x);
    const log2Val = Math.log2(x);

    return {
      hero: {
        label: `${baseLabel}(${x})`,
        value: fixed(logVal, 5),
        unit: "log",
      },
      badge: {
        text: `Base ${baseChoice === "e" ? "e ≈ 2.718" : baseChoice}`,
        tone: "good",
      },
      rows: [
        { label: `Selected ${baseLabel}(${x})`, value: fixed(logVal, 5), strong: true },
        { label: "Natural Log ln(x)", value: fixed(lnVal, 5) },
        { label: "Common Log log₁₀(x)", value: fixed(log10Val, 5) },
        { label: "Binary Log log₂(x)", value: fixed(log2Val, 5) },
        { label: "Verification Check", value: `${baseChoice}^${fixed(logVal, 3)} ≈ ${x}` },
      ],
      note: {
        text: `Logarithm gives the power to which the base must be raised to produce ${x}.`,
        tone: "neutral",
      },
    };
  },
};

export default function LogarithmCalculator() {
  return <CalcEngine config={config} />;
}
