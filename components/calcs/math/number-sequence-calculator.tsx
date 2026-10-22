"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "number-seq-calc",
  title: "Number Sequence Calculator (Arithmetic, Geometric, Fibonacci)",
  fields: [
    {
      kind: "choice",
      key: "type",
      label: "Sequence Progression",
      default: "arithmetic",
      segmented: true,
      options: [
        { value: "arithmetic", label: "Arithmetic (a + d)" },
        { value: "geometric", label: "Geometric (a × r)" },
        { value: "fibonacci", label: "Fibonacci" },
      ],
    },
    { kind: "number", key: "a1", label: "First Term (a₁)", default: 3, showIf: (v) => v.type !== "fibonacci" },
    { kind: "number", key: "step", label: "Common Diff (d) / Ratio (r)", default: 4, showIf: (v) => v.type !== "fibonacci" },
    { kind: "number", key: "n", label: "Target Term Number (n)", default: 10, integer: true, min: 1, max: 100 },
  ],
  compute(values) {
    const type = String(values.type || "arithmetic");
    const a1 = Number(values.a1);
    const step = Number(values.step);
    const n = Math.floor(Number(values.n));

    if (n < 1) return { error: "Target term n must be an integer ≥ 1." };

    let an = 0;
    let sum = 0;
    const preview: number[] = [];

    if (type === "arithmetic") {
      an = a1 + (n - 1) * step;
      sum = (n / 2) * (2 * a1 + (n - 1) * step);
      for (let i = 1; i <= Math.min(6, n); i++) preview.push(a1 + (i - 1) * step);
    } else if (type === "geometric") {
      an = a1 * Math.pow(step, n - 1);
      sum = step === 1 ? a1 * n : (a1 * (1 - Math.pow(step, n))) / (1 - step);
      for (let i = 1; i <= Math.min(6, n); i++) preview.push(a1 * Math.pow(step, i - 1));
    } else if (type === "fibonacci") {
      let a = 0;
      let b = 1;
      preview.push(1);
      sum = 1;
      if (n === 1) {
        an = 1;
      } else {
        for (let i = 2; i <= n; i++) {
          const c = a + b;
          a = b;
          b = c;
          if (i <= 6) preview.push(b);
          sum += b;
        }
        an = b;
      }
    }

    return {
      hero: {
        label: `${n}-th Term (a_${n})`,
        value: Math.abs(an) < 1e12 ? num(an) : an.toExponential(4),
        unit: "term",
      },
      badge: {
        text: type.toUpperCase(),
        tone: "good",
      },
      rows: [
        { label: `Target Term a_${n}`, value: num(an), strong: true },
        { label: `Sum of First ${n} Terms (S_${n})`, value: Math.abs(sum) < 1e12 ? num(sum) : sum.toExponential(4) },
        { label: "Initial Sequence Preview", value: preview.join(", ") + (n > 6 ? ", ..." : "") },
        { label: "Formula", value: type === "arithmetic" ? "aₙ = a₁ + (n − 1)d" : type === "geometric" ? "aₙ = a₁ × r^(n − 1)" : "Fₙ = Fₙ₋₁ + Fₙ₋₂" },
      ],
      note: {
        text: `Progression computed up to n = ${n}.`,
        tone: "neutral",
      },
    };
  },
};

export default function NumberSequenceCalculator() {
  return <CalcEngine config={config} />;
}
