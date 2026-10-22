"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "binary-calc",
  title: "Binary Calculator (Add, Subtract, Bitwise)",
  presets: [
    { label: "Binary Add (22 + 10)", values: { bin1: "10110", op: "add", bin2: "1010" } },
    { label: "Binary Multiply (7 \u00d7 5)", values: { bin1: "111", op: "mul", bin2: "101" } },
    { label: "Binary Sub (15 \u2212 6)", values: { bin1: "1111", op: "sub", bin2: "0110" } },
    { label: "Byte Overflow (255 + 1)", values: { bin1: "11111111", op: "add", bin2: "1" } },
  ],
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
      chart: {
        type: "donut",
        title: "Operand Values (Decimal Scale)",
        data: [
          { name: `Operand 1 (${num(d1)})`, value: Math.max(1, d1), color: "#10b981" },
          { name: `Operand 2 (${num(d2)})`, value: Math.max(1, d2), color: "#06b6d4" },
        ],
      },
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
