"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd0 } from "@/components/flagship/engine/format";
import { FILING_OPTIONS, STANDARD_DEDUCTION, TAX_YEAR, ficaTax, incomeTax, type FilingStatus } from "@/lib/tax";

export const config: CalcConfig = {
  id: "tax",
  title: "Income Tax Calculator",
  fields: [
    { kind: "number", key: "income", label: "Gross income", hint: "wages + other income", prefix: "$", default: 75000, min: 0, max: 1e10 },
    { kind: "choice", key: "status", label: "Filing status", default: "single", options: FILING_OPTIONS },
    { kind: "number", key: "pretax", label: "Pre-tax contributions", hint: "401(k), HSA, etc.", prefix: "$", default: 0, min: 0, max: 1e8, optional: true },
    { kind: "number", key: "adjust", label: "Other adjustments", hint: "IRA, student loan interest", prefix: "$", default: 0, min: 0, max: 1e8, optional: true, group: "Deductions & credits" },
    { kind: "number", key: "itemized", label: "Itemized deductions", hint: "0 = take standard", prefix: "$", default: 0, min: 0, max: 1e9, optional: true, group: "Deductions & credits" },
    { kind: "number", key: "credits", label: "Tax credits", hint: "e.g. child tax credit", prefix: "$", default: 0, min: 0, max: 1e7, optional: true, group: "Deductions & credits" },
    { kind: "number", key: "withheld", label: "Federal tax already withheld", prefix: "$", default: 0, min: 0, max: 1e9, optional: true, group: "Deductions & credits" },
  ],
  compute: (v) => {
    const status = v.status as FilingStatus;
    const gross = v.income as number;
    const agi = Math.max(0, gross - (v.pretax as number) - (v.adjust as number));
    const std = STANDARD_DEDUCTION[status];
    const deduction = Math.max(std, v.itemized as number);
    const taxable = Math.max(0, agi - deduction);
    const { tax: before, marginal, byBracket } = incomeTax(taxable, status);
    const tax = Math.max(0, before - (v.credits as number));
    // 401(k) deferrals are still subject to Social Security and Medicare.
    const fica = ficaTax(gross, status);
    const withheld = v.withheld as number;
    const balance = tax - withheld;
    return {
      hero: { label: `${TAX_YEAR} federal income tax`, value: usd0(tax), sub: `Effective rate ${fixed(gross > 0 ? (tax / gross) * 100 : 0, 2)}% · marginal rate ${Math.round(marginal * 100)}%` },
      ...(withheld > 0 ? { badge: balance > 0 ? { text: `Owe ${usd0(balance)}`, tone: "warn" as const } : { text: `Refund ${usd0(-balance)}`, tone: "good" as const } } : {}),
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Take-home", value: Math.max(0, gross - tax - fica.total - (v.pretax as number)), color: "#10b981" },
          { name: "Federal income tax", value: tax, color: "#ef4444" },
          { name: "Social Security + Medicare", value: fica.total, color: "#f59e0b" },
          { name: "Pre-tax savings", value: v.pretax as number, color: "#2563eb" },
        ],
      },
      rows: [
        { label: "Adjusted gross income", value: usd0(agi) },
        { label: deduction > std ? "Itemized deduction" : "Standard deduction", value: usd0(deduction) },
        { label: "Taxable income", value: usd0(taxable), strong: true },
        { label: "Tax before credits", value: usd0(before) },
        { label: "FICA (employee share)", value: usd0(fica.total) },
      ],
      details: [
        {
          title: "Tax by bracket",
          chart: {
            type: "bar",
            x: "bracket",
            format: "usd0",
            series: [{ key: "tax", name: "Tax", color: "#ef4444" }],
            data: byBracket.map((b) => ({ bracket: `${Math.round(b.rate * 100)}%`, tax: Math.round(b.tax) })),
          },
          table: {
            head: ["Bracket", "Income taxed", "Tax"],
            rows: byBracket.map((b) => [`${Math.round(b.rate * 100)}%`, usd0(b.amount), usd0(b.tax)]),
          },
        },
      ],
      note: { tone: "info", text: `Uses ${TAX_YEAR} IRS brackets and standard deductions. Doesn't include state or local tax, the alternative minimum tax, or capital-gains rates.` },
    };
  },
};

export default function TaxCalculator() {
  return <CalcEngine config={config} />;
}
