"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const numberSystemConverterConfig: CalcConfig = {
  id: "number-system-converter",
  title: "Positional Number System & Radix Converter",
  fields: [
    {
      kind: "number",
      key: "decimalValue",
      label: "Decimal (Base-10) Value",
      default: 255,
      min: 0,
      max: 1000000000,
    },
    {
      kind: "choice",
      key: "targetBase",
      label: "Primary Output Radix",
      default: "16",
      options: [
        { label: "Binary (Base-2)", value: "2" },
        { label: "Octal (Base-8)", value: "8" },
        { label: "Decimal (Base-10)", value: "10" },
        { label: "Hexadecimal (Base-16)", value: "16" },
      ],
    },
  ],
  presets: [
    { label: "Byte Max (255 → 0xFF)", values: { decimalValue: 255, targetBase: "16" } },
    { label: "Word Max (65535 → 0xFFFF)", values: { decimalValue: 65535, targetBase: "16" } },
    { label: "Unix File Perms (493 → 0o755)", values: { decimalValue: 493, targetBase: "8" } },
    { label: "Binary Pattern (42 → 101010b)", values: { decimalValue: 42, targetBase: "2" } },
  ],
  compute: (vals) => {
    const dec = Math.max(0, Math.floor(Number(vals.decimalValue) || 255));
    const targetRadix = parseInt(String(vals.targetBase || "16"), 10);

    const bin = dec.toString(2);
    const oct = dec.toString(8);
    const hex = dec.toString(16).toUpperCase();
    const primary = dec.toString(targetRadix).toUpperCase();

    // Count 1s and 0s in binary representation for donut chart
    const ones = (bin.match(/1/g) || []).length;
    const zeros = (bin.match(/0/g) || []).length || 1;
    const totalBits = bin.length;
    const onesPct = Math.round((ones / totalBits) * 100);
    const zerosPct = 100 - onesPct;

    const paddedBin = bin.padStart(Math.ceil(bin.length / 8) * 8, "0");
    const formattedBin = paddedBin.match(/.{1,4}/g)?.join(" ") || bin;

    return {
      hero: {
        value: targetRadix === 16 ? `0x${primary}` : targetRadix === 8 ? `0o${primary}` : targetRadix === 2 ? `${primary}₂` : `${primary}₁₀`,
        label: `Converted Base-${targetRadix} Representation`,
      },
      breakdown: [
        { label: "Decimal (Base 10)", value: `${dec.toLocaleString("en-US")}` },
        { label: "Hexadecimal (Base 16)", value: `0x${hex}` },
        { label: "Octal (Base 8)", value: `0o${oct}` },
        { label: "Binary (Base 2)", value: formattedBin },
        { label: "Total Bit Length", value: `${totalBits} bits (${Math.ceil(totalBits / 8)} bytes)` },
        { label: "Hamming Weight (Set Bits)", value: `${ones} active bits (${onesPct}%)` },
      ],
      steps: [
        `Divide input decimal ${dec} sequentially by target base ${targetRadix}.`,
        `Record remainders in least-significant to most-significant digit order.`,
        `Assembled result: ${primary} in Radix-${targetRadix}.`,
      ],
      chart: {
        type: "donut",
        title: "Binary Bit Pattern Density (Entropy)",
        format: "pct",
        data: [
          { name: "Set Bits (Logic 1)", value: onesPct, color: "#10b981" },
          { name: "Clear Bits (Logic 0)", value: zerosPct, color: "#3b82f6" },
        ],
      },
    };
  },
};

export default function NumberSystemConverterComponent() {
  return <CalcEngine config={numberSystemConverterConfig} />;
}
