"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd, usd0 } from "@/components/flagship/engine/format";
import { FILING_OPTIONS, STANDARD_DEDUCTION, TAX_YEAR, ficaTax, incomeTax, type FilingStatus } from "@/lib/tax";

const PERIODS: Record<string, [string, number]> = {
  "52": ["Weekly", 52],
  "26": ["Biweekly", 26],
  "24": ["Semi-monthly", 24],
  "12": ["Monthly", 12],
};

export const config: CalcConfig = {
  id: "thp",
  title: "Take-Home Pay Calculator",
  fields: [
    { kind: "number", key: "salary", label: "Annual gross salary", prefix: "$", default: 65000, min: 0, max: 1e9 },
    { kind: "choice", key: "period", label: "Pay frequency", default: "26", options: Object.entries(PERIODS).map(([value, [label]]) => ({ value, label })) },
    { kind: "choice", key: "status", label: "Filing status", default: "single", options: FILING_OPTIONS },
    { kind: "number", key: "state", label: "State income tax rate", hint: "0 for TX, FL…", suffix: "%", default: 5, min: 0, max: 15, optional: true },
    { kind: "number", key: "k401", label: "401(k) contribution", suffix: "% of pay", default: 6, min: 0, max: 100, optional: true, group: "Pre-tax deductions" },
    { kind: "number", key: "health", label: "Health insurance premium", prefix: "$", suffix: "/yr", default: 0, min: 0, max: 1e6, optional: true, group: "Pre-tax deductions" },
    { kind: "number", key: "hsa", label: "HSA / FSA contribution", prefix: "$", suffix: "/yr", default: 0, min: 0, max: 1e6, optional: true, group: "Pre-tax deductions" },
  ],
  compute: (v) => {
    const status = v.status as FilingStatus;
    const salary = v.salary as number;
    const k401 = salary * ((v.k401 as number) / 100);
    const cafeteria = (v.health as number) + (v.hsa as number); // Section 125: exempt from income tax and FICA
    const fedTaxable = Math.max(0, salary - k401 - cafeteria - STANDARD_DEDUCTION[status]);
    const fed = incomeTax(fedTaxable, status);
    const fica = ficaTax(Math.max(0, salary - cafeteria), status);
    const state = Math.max(0, salary - k401 - cafeteria) * ((v.state as number) / 100);
    const takeHome = salary - k401 - cafeteria - fed.tax - fica.total - state;
    const [periodName, n] = PERIODS[String(v.period)];
    const per = (x: number) => usd(x / n);
    const totalTax = fed.tax + fica.total + state;
    return {
      hero: { label: `${periodName} take-home pay`, value: per(takeHome), sub: `${usd0(takeHome)} a year · ${usd0(takeHome / 12)} a month` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Take-home pay", value: takeHome, color: "#10b981" },
          { name: "Federal income tax", value: fed.tax, color: "#ef4444" },
          { name: "Social Security", value: fica.ss, color: "#f59e0b" },
          { name: "Medicare", value: fica.medicare, color: "#fb923c" },
          { name: "State tax", value: state, color: "#8b5cf6" },
          { name: "401(k) & benefits", value: k401 + cafeteria, color: "#2563eb" },
        ],
      },
      rows: [
        { label: `Gross pay per check`, value: per(salary) },
        { label: "Federal income tax", value: per(fed.tax) },
        { label: "Social Security (6.2%)", value: per(fica.ss) },
        { label: "Medicare (1.45%)", value: per(fica.medicare) },
        { label: "State income tax", value: per(state) },
        { label: "401(k) & benefits", value: per(k401 + cafeteria) },
        { label: "Total tax rate", value: `${fixed(salary > 0 ? (totalTax / salary) * 100 : 0, 1)}%`, strong: true },
      ],
      note: { tone: "info", text: `Estimate using ${TAX_YEAR} federal brackets, the standard deduction and a flat state rate. Actual withholding depends on your W-4, local taxes and other deductions.` },
    };
  },
};

export default function TakeHomePayCalculator() {
  return <CalcEngine config={config} />;
}
