"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "hex-calc",
  title: "Hexadecimal Calculator (Hex Arithmetic)",
  fields: [
    { kind: "text", key: "hex1", label: "Hexadecimal A", default: "1A", hint: "0-9 and A-F digits." },
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
        { value: "and", label: "& AND" },
        { value: "or", label: "| OR" },
        { value: "xor", label: "^ XOR" },
      ],
    },
    { kind: "text", key: "hex2", label: "Hexadecimal B", default: "0F", hint: "0-9 and A-F digits." },
  ],
  compute(values) {
    const h1 = String(values.hex1 || "").trim();
    const h2 = String(values.hex2 || "").trim();
    const op = String(values.op || "add");

    if (!/^[0-9a-fA-F]+$/.test(h1) || !/^[0-9a-fA-F]+$/.test(h2)) {
      return { error: "Please enter valid hexadecimal values (digits 0-9 and A-F)." };
    }

    const d1 = parseInt(h1, 16);
    const d2 = parseInt(h2, 16);

    let resDec = 0;
    if (op === "add") resDec = d1 + d2;
    else if (op === "sub") resDec = d1 - d2;
    else if (op === "mul") resDec = d1 * d2;
    else if (op === "and") resDec = d1 & d2;
    else if (op === "or") resDec = d1 | d2;
    else if (op === "xor") resDec = d1 ^ d2;

    const sign = resDec < 0 ? "-" : "";
    const absDec = Math.abs(resDec);
    const resHex = sign + absDec.toString(16).toUpperCase();
    const resBin = sign + absDec.toString(2);

    return {
      hero: {
        label: "Hex Result (Base 16)",
        value: `0x${resHex}`,
        unit: "hex",
      },
      badge: {
        text: `Decimal: ${resDec}`,
        tone: "good",
      },
      rows: [
        { label: "Hexadecimal", value: `0x${resHex}`, strong: true },
        { label: "Decimal Equivalent", value: num(resDec), strong: true },
        { label: "Binary Equivalent", value: resBin },
        { label: "Operand A", value: `0x${h1.toUpperCase()} (${d1})` },
        { label: "Operand B", value: `0x${h2.toUpperCase()} (${d2})` },
      ],
      note: {
        text: `Hexadecimal radix 16 arithmetic.`,
        tone: "neutral",
      },
    };
  },
};

export default function HexCalculator() {
  return <CalcEngine config={config} />;
}
