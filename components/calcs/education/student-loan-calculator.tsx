"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const studentLoanConfig: CalcConfig = {
  id: "student-loan-calculator",
  title: "Student Loan Monthly Payment, Amortization & Total Interest Calculator",
  fields: [
    { kind: "number", key: "loanBalance", label: "Total Student Loan Principal Balance ($)", default: 35000, min: 1000, max: 250000 },
    { kind: "number", key: "annualInterestRate", label: "Annual Fixed Interest Rate (%)", default: 6.5, min: 1.0, max: 15.0 },
    { kind: "number", key: "repaymentTermYears", label: "Repayment Period (Years)", default: 10, min: 5, max: 25 },
    { kind: "number", key: "projectedGrossSalary", label: "Expected Annual Post-Grad Salary ($)", default: 58000, min: 15000, max: 250000 },
  ],
  presets: [
    { label: "Federal Undergrad Standard ($27k at 5.5%, 10 yrs)", values: { loanBalance: 27000, annualInterestRate: 5.5, repaymentTermYears: 10, projectedGrossSalary: 55000 } },
    { label: "Average US Borrower ($37k at 6.8%, 10 yrs)", values: { loanBalance: 37000, annualInterestRate: 6.8, repaymentTermYears: 10, projectedGrossSalary: 60000 } },
    { label: "Graduate School Balance ($75k at 7.5%, 15 yrs)", values: { loanBalance: 75000, annualInterestRate: 7.5, repaymentTermYears: 15, projectedGrossSalary: 85000 } },
    { label: "Rapid Payoff Sprint ($20k at 4.5%, 5 yrs)", values: { loanBalance: 20000, annualInterestRate: 4.5, repaymentTermYears: 5, projectedGrossSalary: 65000 } },
  ],
  compute: (vals) => {
    const P = Math.max(100, Number(vals.loanBalance) || 35000);
    const annualRate = Math.max(0.1, Number(vals.annualInterestRate) || 6.5);
    const years = Math.max(1, Number(vals.repaymentTermYears) || 10);
    const salary = Math.max(1000, Number(vals.projectedGrossSalary) || 58000);

    const r = annualRate / 100.0 / 12.0;
    const n = years * 12;

    // Monthly payment formula: P * (r*(1+r)^n) / ((1+r)^n - 1)
    const factor = Math.pow(1 + r, n);
    const monthlyPayment = (P * (r * factor)) / (factor - 1);
    const totalRepaid = monthlyPayment * n;
    const totalInterest = totalRepaid - P;

    const monthlyIncome = salary / 12.0;
    const dtiRatio = (monthlyPayment / monthlyIncome) * 100.0;

    let affordability = "Healthy Debt-to-Income Profile";
    let tone: "good" | "warn" | "bad" = "good";

    if (dtiRatio <= 8.0) {
      affordability = "Excellent (<8% of Gross Income, Low Strain)";
      tone = "good";
    } else if (dtiRatio <= 12.0) {
      affordability = "Manageable (8-12% Financial Planning Benchmark)";
      tone = "good";
    } else if (dtiRatio <= 18.0) {
      affordability = "High Debt Burden (12-18% Constrains Savings)";
      tone = "warn";
    } else {
      affordability = "Severe Debt Strain (>18% Income-Driven Plan Advised)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Fixed Monthly Loan Payment",
        value: `$${monthlyPayment.toFixed(2)} / month`,
      },
      badge: {
        text: affordability,
        tone: tone,
      },
      rows: [
        { label: "Total Lifetime Interest Paid", value: `$${Math.round(totalInterest).toLocaleString()} (${((totalInterest / P) * 100).toFixed(1)}% of principal)` },
        { label: "Total Lifetime Repayment Amount", value: `$${Math.round(totalRepaid).toLocaleString()} over ${n} monthly installments` },
        { label: "Monthly Debt-to-Income Payment Burden", value: `${dtiRatio.toFixed(1)}% of gross monthly earnings` },
        { label: "Principal vs Interest Repayment Ratio", value: `${((P / totalRepaid) * 100).toFixed(1)}% Principal / ${((totalInterest / totalRepaid) * 100).toFixed(1)}% Interest` },
      ],
      steps: [
        `Monthly Interest Rate r = ${annualRate}% / 12 = ${(r * 100).toFixed(4)}%`,
        `Total Number of Monthly Payments n = ${years} years * 12 = ${n} payments`,
        `Amortization Formula: PMT = $${P.toLocaleString()} * [${r.toFixed(5)} * (1 + ${r.toFixed(5)})^${n}] / [(1 + ${r.toFixed(5)})^${n} - 1] = $${monthlyPayment.toFixed(2)}`,
        `Total Lifetime Repaid = $${monthlyPayment.toFixed(2)} * ${n} = $${Math.round(totalRepaid).toLocaleString()}`,
        `Total Cumulative Interest = $${Math.round(totalRepaid).toLocaleString()} - $${P.toLocaleString()} = $${Math.round(totalInterest).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Total Lifetime Loan Repayment Composition",
        format: "usd0",
        data: [
          { name: "Original Borrowed Principal", value: Math.round(P), color: "#3b82f6" },
          { name: "Total Accrued Finance Interest", value: Math.round(totalInterest), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function StudentLoanCalculatorComponent() {
  return <CalcEngine config={studentLoanConfig} />;
}
