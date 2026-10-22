"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

const ROMAN_MAP: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(num: number): string {
  if (num <= 0 || num > 3999) return "Out of Roman range (1-3999)";
  let res = "";
  let rem = num;
  for (const [val, sym] of ROMAN_MAP) {
    while (rem >= val) {
      res += sym;
      rem -= val;
    }
  }
  return res;
}

function fromRoman(str: string): number {
  const romanValues: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 100,
  };
  // Standard values: M=1000
  romanValues["M"] = 1000;
  let total = 0;
  const s = str.toUpperCase().trim();
  for (let i = 0; i < s.length; i++) {
    const cur = romanValues[s[i]];
    const nxt = romanValues[s[i + 1]];
    if (!cur) return NaN;
    if (nxt && cur < nxt) {
      total -= cur;
    } else {
      total += cur;
    }
  }
  return total;
}

export const config: CalcConfig = {
  id: "roman-calc",
  title: "Roman Numeral Converter (1 to 3,999)",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Conversion Direction",
      default: "arabicToRoman",
      segmented: true,
      options: [
        { value: "arabicToRoman", label: "Number → Roman" },
        { value: "romanToArabic", label: "Roman → Number" },
      ],
    },
    { kind: "number", key: "arabic", label: "Enter Number (1 to 3999)", default: 2026, integer: true, min: 1, max: 3999, showIf: (v) => v.mode === "arabicToRoman" },
    { kind: "text", key: "roman", label: "Enter Roman Numeral", default: "MMXXVI", showIf: (v) => v.mode === "romanToArabic" },
  ],
  compute(values) {
    const mode = String(values.mode || "arabicToRoman");

    if (mode === "arabicToRoman") {
      const n = Math.floor(Number(values.arabic));
      if (n < 1 || n > 3999) return { error: "Roman numerals conventionally support numbers between 1 and 3,999." };
      const rom = toRoman(n);
      return {
        hero: { label: "Roman Numeral", value: rom },
        badge: { text: `Arabic Value: ${n}`, tone: "good" },
        rows: [
          { label: "Roman Numeral", value: rom, strong: true },
          { label: "Standard Integer", value: String(n) },
        ],
        note: {
          text: `Converted using standard subtractive notation: ${n} = ${rom}.`,
          tone: "neutral",
        },
      };
    } else {
      const raw = String(values.roman || "").trim().toUpperCase();
      const numVal = fromRoman(raw);
      if (isNaN(numVal) || numVal <= 0) return { error: "Please enter valid Roman numeral symbols (I, V, X, L, C, D, M)." };
      return {
        hero: { label: "Standard Integer", value: String(numVal) },
        badge: { text: `Roman: ${raw}`, tone: "good" },
        rows: [
          { label: "Decimal Integer", value: String(numVal), strong: true },
          { label: "Roman Numeral", value: raw },
        ],
        note: {
          text: `${raw} evaluates to ${numVal}.`,
          tone: "neutral",
        },
      };
    }
  },
};

export default function RomanNumeralConverter() {
  return <CalcEngine config={config} />;
}
