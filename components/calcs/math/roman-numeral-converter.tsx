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
  presets: [
    { label: "Current Year 2026 (MMXXVI)", values: { mode: "arabicToRoman", arabic: 2026, roman: "MMXXVI" } },
    { label: "Super Bowl 58 (LVIII)", values: { mode: "arabicToRoman", arabic: 58, roman: "LVIII" } },
    { label: "Centennial 1999 (MCMXCIX)", values: { mode: "arabicToRoman", arabic: 1999, roman: "MCMXCIX" } },
    { label: "Century 100 (C)", values: { mode: "arabicToRoman", arabic: 100, roman: "C" } },
  ],
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
      const thousands = Math.floor(n / 1000) * 1000;
      const hundreds = Math.floor((n % 1000) / 100) * 100;
      const tens = Math.floor((n % 100) / 10) * 10;
      const units = n % 10;
      const placeData = [
        { name: `Thousands (${thousands})`, value: thousands, color: "#10b981" },
        { name: `Hundreds (${hundreds})`, value: hundreds, color: "#06b6d4" },
        { name: `Tens (${tens})`, value: tens, color: "#f59e0b" },
        { name: `Units (${units})`, value: units, color: "#8b5cf6" },
      ].filter((d) => d.value > 0);

      return {
        hero: { label: "Roman Numeral", value: rom },
        chart: {
          type: "donut",
          title: "Decimal Place-Value Breakdown",
          data: placeData.length > 0 ? placeData : [{ name: "Value", value: 1, color: "#10b981" }],
        },
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
      const thousandsVal = Math.floor(numVal / 1000) * 1000;
      const hundredsVal = Math.floor((numVal % 1000) / 100) * 100;
      const tensVal = Math.floor((numVal % 100) / 10) * 10;
      const unitsVal = numVal % 10;
      const placeDataVal = [
        { name: `Thousands (${thousandsVal})`, value: thousandsVal, color: "#10b981" },
        { name: `Hundreds (${hundredsVal})`, value: hundredsVal, color: "#06b6d4" },
        { name: `Tens (${tensVal})`, value: tensVal, color: "#f59e0b" },
        { name: `Units (${unitsVal})`, value: unitsVal, color: "#8b5cf6" },
      ].filter((d) => d.value > 0);

      return {
        hero: { label: "Standard Integer", value: String(numVal) },
        chart: {
          type: "donut",
          title: "Decimal Place-Value Breakdown",
          data: placeDataVal.length > 0 ? placeDataVal : [{ name: "Value", value: 1, color: "#10b981" }],
        },
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
