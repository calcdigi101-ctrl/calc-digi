"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd0 } from "@/components/flagship/engine/format";
import { FILING_OPTIONS, STANDARD_DEDUCTION, TAX_YEAR, incomeTax, selfEmploymentTax, type FilingStatus } from "@/lib/tax";

export const config: CalcConfig = {
  id: "ft",
  title: "Freelancer Tax Calculator",
  fields: [
    { kind: "number", key: "revenue", label: "Self-employment income", hint: "gross receipts", prefix: "$", default: 80000, min: 0, max: 1e10 },
    { kind: "number", key: "expenses", label: "Business expenses", prefix: "$", default: 10000, min: 0, max: 1e10, optional: true },
    { kind: "choice", key: "status", label: "Filing status", default: "single", options: FILING_OPTIONS },
    { kind: "number", key: "state", label: "State income tax rate", suffix: "%", default: 5, min: 0, max: 15, optional: true },
    { kind: "number", key: "otherIncome", label: "Other income (W-2, etc.)", prefix: "$", default: 0, min: 0, max: 1e10, optional: true, group: "More income & deductions" },
    { kind: "number", key: "retirement", label: "SEP-IRA / Solo 401(k) contribution", prefix: "$", default: 0, min: 0, max: 1e7, optional: true, group: "More income & deductions" },
    { kind: "number", key: "health", label: "Self-employed health insurance", prefix: "$", default: 0, min: 0, max: 1e7, optional: true, group: "More income & deductions" },
  ],
  compute: (v) => {
    const status = v.status as FilingStatus;
    const profit = Math.max(0, (v.revenue as number) - (v.expenses as number));
    const se = selfEmploymentTax(profit);
    // Qualified business income deduction: 20% of QBI (simplified — ignores phase-outs for high earners).
    const agi = Math.max(0, profit + (v.otherIncome as number) - se.deduction - (v.retirement as number) - (v.health as number));
    const beforeQbi = Math.max(0, agi - STANDARD_DEDUCTION[status]);
    const qbi = Math.min(0.2 * Math.max(0, profit - se.deduction - (v.retirement as number) - (v.health as number)), 0.2 * beforeQbi);
    const taxable = Math.max(0, beforeQbi - qbi);
    const fed = incomeTax(taxable, status);
    const state = agi * ((v.state as number) / 100);
    const total = se.total + fed.tax + state;
    const gross = profit + (v.otherIncome as number);
    const keep = gross - total - (v.retirement as number);
    return {
      hero: { label: "Total estimated tax", value: usd0(total), sub: `Set aside ${fixed(profit > 0 ? (total / gross) * 100 : 0, 1)}% of net income` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "You keep", value: Math.max(0, keep), color: "#10b981" },
          { name: "Self-employment tax", value: se.total, color: "#f59e0b" },
          { name: "Federal income tax", value: fed.tax, color: "#ef4444" },
          { name: "State tax", value: state, color: "#8b5cf6" },
          { name: "Retirement savings", value: v.retirement as number, color: "#2563eb" },
        ],
      },
      rows: [
        { label: "Net profit (Schedule C)", value: usd0(profit) },
        { label: "Self-employment tax (15.3%)", value: usd0(se.total) },
        { label: "Federal income tax", value: usd0(fed.tax) },
        { label: "State income tax", value: usd0(state) },
        { label: "Quarterly estimated payment", value: usd0(total / 4), strong: true },
        { label: "QBI deduction applied", value: usd0(qbi) },
      ],
      note: { tone: "info", text: `${TAX_YEAR} estimate. Quarterly payments are due Apr 15, Jun 15, Sep 15 and Jan 15. Simplified: ignores QBI phase-outs, credits and local tax.` },
    };
  },
};

export default function FreelancerTaxCalculator() {
  return <CalcEngine config={config} />;
}
