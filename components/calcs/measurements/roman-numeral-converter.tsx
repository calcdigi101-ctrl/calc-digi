"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const romanNumeralConverterConfig: CalcConfig = {
  id: "roman-numeral-converter",
  title: "Roman Numeral & Arabic Integer Converter",
  fields: [
    {
      kind: "number",
      key: "arabicNumber",
      label: "Arabic Number (1 to 3,999)",
      default: 2026,
      min: 1,
      max: 3999,
    },
  ],
  presets: [
    { label: "Current Epoch (2026 → MMXXVI)", values: { arabicNumber: 2026 } },
    { label: "Turn of Millennium (2000 → MM)", values: { arabicNumber: 2000 } },
    { label: "Classical Rome (1776 → MDCCLXXVI)", values: { arabicNumber: 1776 } },
    { label: "Super Bowl LV (55 → LV)", values: { arabicNumber: 55 } },
  ],
  compute: (vals) => {
    const num = Math.min(3999, Math.max(1, Math.floor(Number(vals.arabicNumber) || 2026)));

    const lookup: [number, string][] = [
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

    let roman = "";
    let temp = num;
    for (const [v, str] of lookup) {
      while (temp >= v) {
        roman += str;
        temp -= v;
      }
    }

    const thousands = Math.floor(num / 1000) * 1000;
    const hundreds = Math.floor((num % 1000) / 100) * 100;
    const tens = Math.floor((num % 100) / 10) * 10;
    const ones = num % 10;

    const thousandsPct = Math.round((thousands / num) * 100) || 0;
    const hundredsPct = Math.round((hundreds / num) * 100) || 0;
    const tensPct = Math.round((tens / num) * 100) || 0;
    const onesPct = Math.max(1, 100 - thousandsPct - hundredsPct - tensPct);

    return {
      hero: {
        value: roman,
        label: `Roman Numeral Equivalent of ${num}`,
      },
      breakdown: [
        { label: "Arabic Integer", value: `${num.toLocaleString("en-US")}` },
        { label: "Roman Numeral", value: roman },
        { label: "Thousands (M)", value: `${thousands}` },
        { label: "Hundreds (C/D/M)", value: `${hundreds}` },
        { label: "Tens (X/L/C)", value: `${tens}` },
        { label: "Ones (I/V/X)", value: `${ones}` },
        { label: "Total Symbol Count", value: `${roman.length} characters` },
      ],
      steps: [
        `Decompose integer into place-value magnitudes: ${thousands} + ${hundreds} + ${tens} + ${ones}.`,
        `Map thousands (${thousands}) → ${"M".repeat(thousands / 1000)}.`,
        `Synthesize additive and subtractive tokens according to classical Roman epigraphic conventions.`,
        `Concatenated final representation: ${roman}.`,
      ],
      chart: {
        type: "donut",
        title: "Place-Value Decimal Decomposition",
        format: "pct",
        data: [
          { name: "Thousands (M)", value: Math.max(5, thousandsPct), color: "#10b981" },
          { name: "Hundreds (C/D)", value: Math.max(5, hundredsPct), color: "#3b82f6" },
          { name: "Tens (X/L)", value: Math.max(5, tensPct), color: "#8b5cf6" },
          { name: "Units (I/V)", value: Math.max(5, onesPct), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function RomanNumeralConverterComponent() {
  return <CalcEngine config={romanNumeralConverterConfig} />;
}
