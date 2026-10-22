"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "abs-val-calc",
  title: "Absolute Value Calculator (|x| & Distance |A − B|)",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Calculation Mode",
      default: "single",
      segmented: true,
      options: [
        { value: "single", label: "Single Value |x|" },
        { value: "distance", label: "Distance |A − B|" },
      ],
    },
    { kind: "number", key: "x", label: "Value (x)", default: -27.5, showIf: (v) => v.mode === "single" },
    { kind: "number", key: "a", label: "Value A", default: 15, showIf: (v) => v.mode === "distance" },
    { kind: "number", key: "b", label: "Value B", default: 42, showIf: (v) => v.mode === "distance" },
  ],
  compute(values) {
    const mode = String(values.mode || "single");

    if (mode === "single") {
      const x = Number(values.x);
      const absX = Math.abs(x);
      const sign = x > 0 ? "Positive (+)" : x < 0 ? "Negative (−)" : "Zero (0)";

      return {
        hero: {
          label: `|${x}|`,
          value: fixed(absX, 3),
          unit: "abs",
        },
        badge: {
          text: "Non-Negative Magnitude",
          tone: "good",
        },
        rows: [
          { label: "Absolute Value |x|", value: fixed(absX, 4), strong: true },
          { label: "Original Input (x)", value: String(x) },
          { label: "Opposite Value (−x)", value: String(-x) },
          { label: "Signum / Direction", value: sign },
          { label: "Distance from Zero Origin", value: fixed(absX, 3) },
        ],
        note: {
          text: "The absolute value measures geometric distance from the number line origin zero, stripping away negative signs.",
          tone: "neutral",
        },
      };
    } else {
      const a = Number(values.a);
      const b = Number(values.b);
      const diff = a - b;
      const absDiff = Math.abs(diff);

      return {
        hero: {
          label: `|${a} − ${b}|`,
          value: fixed(absDiff, 3),
          unit: "distance",
        },
        badge: {
          text: "Euclidean 1D Distance",
          tone: "good",
        },
        rows: [
          { label: "Distance |A − B|", value: fixed(absDiff, 4), strong: true },
          { label: "Signed Difference (A − B)", value: fixed(diff, 4) },
          { label: "Reversed Difference (B − A)", value: fixed(-diff, 4) },
        ],
        note: {
          text: `Distance between ${a} and ${b} on the 1D real number line is exactly ${absDiff} units.`,
          tone: "neutral",
        },
      };
    }
  },
};

export default function AbsoluteValueCalculator() {
  return <CalcEngine config={config} />;
}
