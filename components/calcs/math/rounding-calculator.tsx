"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "rounding-calc",
  title: "Rounding Numbers Calculator",
  fields: [
    { kind: "number", key: "num", label: "Enter Number", default: 147.658 },
    {
      kind: "choice",
      key: "precision",
      label: "Round To",
      default: "2",
      options: [
        { value: "-3", label: "Nearest Thousand (1,000)" },
        { value: "-2", label: "Nearest Hundred (100)" },
        { value: "-1", label: "Nearest Ten (10)" },
        { value: "0", label: "Nearest Whole Integer (1)" },
        { value: "1", label: "Tenths (0.1)" },
        { value: "2", label: "Hundredths (0.01)" },
        { value: "3", label: "Thousandths (0.001)" },
        { value: "4", label: "Ten-Thousandths (0.0001)" },
      ],
    },
  ],
  compute(values) {
    const val = Number(values.num);
    const p = Number(values.precision);

    const factor = Math.pow(10, p);
    const rounded = Math.round(val * factor) / factor;
    const floorVal = Math.floor(val * factor) / factor;
    const ceilVal = Math.ceil(val * factor) / factor;
    const truncVal = Math.trunc(val * factor) / factor;

    const digits = p > 0 ? p : 0;

    return {
      hero: {
        label: "Rounded Value",
        value: fixed(rounded, digits),
      },
      badge: {
        text: "Standard Half-Up Method",
        tone: "good",
      },
      rows: [
        { label: "Rounded Result", value: fixed(rounded, digits), strong: true },
        { label: "Ceiling (Round Up)", value: fixed(ceilVal, digits) },
        { label: "Floor (Round Down)", value: fixed(floorVal, digits) },
        { label: "Truncated", value: fixed(truncVal, digits) },
        { label: "Original Input", value: String(val) },
      ],
      note: {
        text: "Using standard round-half-up convention: if the succeeding digit is 5 or greater, round away from zero.",
        tone: "neutral",
      },
    };
  },
};

export default function RoundingCalculator() {
  return <CalcEngine config={config} />;
}
