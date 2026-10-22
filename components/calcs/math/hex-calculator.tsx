"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "hex-calc",
  title: "Hexadecimal Calculator (Hex Arithmetic)",
  presets: [
    { label: "1A + 0F (26 + 15)", values: { hex1: "1A", op: "add", hex2: "0F" } },
    { label: "FF + 01 (255 + 1)", values: { hex1: "FF", op: "add", hex2: "01" } },
    { label: "A5 \u2212 3C (165 \u2212 60)", values: { hex1: "A5", op: "sub", hex2: "3C" } },
    { label: "10 \u00d7 10 (16 \u00d7 16)", values: { hex1: "10", op: "mul", hex2: "10" } },
  ],
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
      chart: {
        type: "donut",
        title: "Operand Values (Decimal Scale)",
        data: [
          { name: `Operand A (${num(d1)})`, value: Math.max(1, d1), color: "#10b981" },
          { name: `Operand B (${num(d2)})`, value: Math.max(1, d2), color: "#06b6d4" },
        ],
      },
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
