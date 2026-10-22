"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "binary-calc",
  title: "Binary Calculator (Add, Subtract, Bitwise)",
  fields: [
    { kind: "text", key: "bin1", label: "Binary A", default: "10110", hint: "Only 0 and 1 digits allowed." },
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
    { kind: "text", key: "bin2", label: "Binary B", default: "1010", hint: "Only 0 and 1 digits allowed." },
  ],
  compute(values) {
    const b1 = String(values.bin1 || "").trim();
    const b2 = String(values.bin2 || "").trim();
    const op = String(values.op || "add");

    if (!/^[01]+$/.test(b1) || !/^[01]+$/.test(b2)) {
      return { error: "Please enter valid binary numbers containing only 0 and 1 digits." };
    }

    const d1 = parseInt(b1, 2);
    const d2 = parseInt(b2, 2);

    let resDec = 0;
    if (op === "add") resDec = d1 + d2;
    else if (op === "sub") resDec = d1 - d2;
    else if (op === "mul") resDec = d1 * d2;
    else if (op === "and") resDec = d1 & d2;
    else if (op === "or") resDec = d1 | d2;
    else if (op === "xor") resDec = d1 ^ d2;

    const sign = resDec < 0 ? "-" : "";
    const absDec = Math.abs(resDec);
    const resBin = sign + absDec.toString(2);
    const resHex = sign + "0x" + absDec.toString(16).toUpperCase();
    const resOct = sign + "0o" + absDec.toString(8);

    return {
      hero: {
        label: "Binary Result (Base 2)",
        value: resBin,
        unit: "bin",
      },
      badge: {
        text: `Decimal: ${resDec}`,
        tone: "good",
      },
      rows: [
        { label: "Binary (Base 2)", value: resBin, strong: true },
        { label: "Decimal (Base 10)", value: num(resDec), strong: true },
        { label: "Hexadecimal (Base 16)", value: resHex },
        { label: "Octal (Base 8)", value: resOct },
        { label: "A (dec)", value: `${b1} = ${d1}` },
        { label: "B (dec)", value: `${b2} = ${d2}` },
      ],
      note: {
        text: `Binary arithmetic performed in radix 2. ${b1} (${d1}) ${op} ${b2} (${d2}) = ${resBin} (${resDec}).`,
        tone: "neutral",
      },
    };
  },
};

export default function BinaryCalculator() {
  return <CalcEngine config={config} />;
}
