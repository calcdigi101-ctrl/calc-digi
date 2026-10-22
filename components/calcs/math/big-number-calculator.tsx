"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "big-num-calc",
  title: "Big Number Calculator (Arbitrary Precision Arithmetic)",
  fields: [
    { kind: "text", key: "a", label: "Number A", default: "12345678901234567890", hint: "Arbitrary length integer digits." },
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
        { value: "mod", label: "% Mod" },
      ],
    },
    { kind: "text", key: "b", label: "Number B", default: "98765432109876543210", hint: "Arbitrary length integer digits." },
  ],
  compute(values) {
    const rawA = String(values.a || "").trim();
    const rawB = String(values.b || "").trim();
    const op = String(values.op || "add");

    if (!/^-?\d+$/.test(rawA) || !/^-?\d+$/.test(rawB)) {
      return { error: "Please enter valid integers (digits 0-9 with optional negative sign)." };
    }

    try {
      const a = BigInt(rawA);
      const b = BigInt(rawB);

      let res = BigInt(0);
      let rem: bigint | null = null;

      if (op === "add") res = a + b;
      else if (op === "sub") res = a - b;
      else if (op === "mul") res = a * b;
      else if (op === "div") {
        if (b === BigInt(0)) return { error: "Division by zero is mathematically undefined." };
        res = a / b;
        rem = a % b;
      } else if (op === "mod") {
        if (b === BigInt(0)) return { error: "Modulo by zero is undefined." };
        res = a % b;
      }

      const resStr = res.toString();
      const displayHero = resStr.length > 20 ? resStr.slice(0, 18) + "..." : resStr;

      return {
        hero: {
          label: "Exact Integer Result",
          value: displayHero,
        },
        badge: {
          text: `${resStr.length} Digits`,
          tone: "good",
        },
        rows: [
          { label: "Exact Result", value: resStr.length > 35 ? resStr.slice(0, 35) + `... (${resStr.length} digits total)` : resStr, strong: true },
          ...(rem !== null ? [{ label: "Division Remainder", value: rem.toString() }] : []),
          { label: "Operand A Length", value: `${rawA.length} digits` },
          { label: "Operand B Length", value: `${rawB.length} digits` },
          { label: "Precision Guarantee", value: "Exact 100% loss-free integer arithmetic" },
        ],
        note: {
          text: "Computed using JavaScript native BigInt for arbitrary-precision mathematical operations.",
          tone: "neutral",
        },
      };
    } catch {
      return { error: "Calculation overflow or invalid operation." };
    }
  },
};

export default function BigNumberCalculator() {
  return <CalcEngine config={config} />;
}
