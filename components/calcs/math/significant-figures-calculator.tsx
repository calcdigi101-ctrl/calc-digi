"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

function countSigFigs(str: string): { count: number; rules: string[] } {
  let s = str.trim().replace(/^[-+]/, "");
  const rules: string[] = [];

  if (s === "0" || s === "") return { count: 1, rules: ["Zero alone has 1 sig fig"] };

  const hasDecimal = s.includes(".");

  // Scientific notation handling
  if (s.includes("e") || s.includes("E")) {
    s = s.split(/[eE]/)[0];
    rules.push("Exponential factor (10^b) does not affect sig fig count");
  }

  if (hasDecimal) {
    // Leading zeros before first non-zero are not significant
    const match = s.match(/^0*.0*([1-9].*)$/);
    if (match) {
      rules.push("Leading zeros before the first non-zero digit are non-significant placeholders");
      const sigs = match[1].replace(".", "");
      return { count: sigs.length, rules };
    } else {
      const sigs = s.replace(".", "").replace(/^0+/, "");
      rules.push("All non-zero digits and trailing zeros after a decimal point are significant");
      return { count: sigs.length, rules };
    }
  } else {
    // Without decimal point, trailing zeros are ambiguous (usually non-significant)
    const nonZeroMatch = s.match(/^([1-9].*?)(0*)$/);
    if (nonZeroMatch) {
      const core = nonZeroMatch[1];
      const trailing = nonZeroMatch[2];
      if (trailing.length > 0) rules.push("Trailing zeros in an integer without a decimal are ambiguous (assumed non-significant)");
      rules.push("Non-zero digits and captive zeros between them are significant");
      return { count: core.length, rules };
    }
    return { count: 1, rules: ["Single digit"] };
  }
}

export const config: CalcConfig = {
  id: "sig-figs-calc",
  title: "Significant Figures (Sig Figs) Calculator",
  fields: [
    { kind: "text", key: "num", label: "Enter Number", default: "0.0045020", hint: "e.g. 0.0045020, 12000, 4.50e6" },
  ],
  compute(values) {
    const raw = String(values.num || "").trim();
    if (!raw || isNaN(Number(raw))) return { error: "Please enter a valid numeric representation." };

    const { count, rules } = countSigFigs(raw);

    return {
      hero: {
        label: "Significant Figures Count",
        value: `${count} Sig Figs`,
      },
      badge: {
        text: `${count} Significant Digits`,
        tone: "good",
      },
      rows: [
        { label: "Sig Fig Count", value: String(count), strong: true },
        { label: "Original Input", value: raw },
        { label: "Primary Rule Applied", value: rules[0] || "Standard IUPAC Sig Fig Rules" },
        ...(rules[1] ? [{ label: "Secondary Rule", value: rules[1] }] : []),
      ],
      note: {
        text: "Significant figures reflect the precision and measurement uncertainty of laboratory data.",
        tone: "neutral",
      },
    };
  },
};

export default function SignificantFiguresCalculator() {
  return <CalcEngine config={config} />;
}
