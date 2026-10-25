"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const businessLoanConfig: CalcConfig = {
  id: "business-loan-calculator",
  title: "Commercial Business Loan & Amortization Calculator",
  fields: [
    {
      kind: "number",
      key: "loanPrincipal",
      label: "Commercial Loan Principal ($)",
      default: 250000,
      min: 1000,
      max: 50000000,
    },
    {
      kind: "number",
      key: "annualInterestRate",
      label: "Annual Nominal Interest Rate (%)",
      default: 7.75,
      min: 0.1,
      max: 50,
    },
    {
      kind: "number",
      key: "termYears",
      label: "Loan Term Duration (Years)",
      default: 5,
      min: 0.5,
      max: 30,
    },
    {
      kind: "number",
      key: "originationFeePct",
      label: "Origination & Closing Fees (%)",
      default: 2.0,
      min: 0,
      max: 15,
    },
  ],
  compute(vals) {
    const P = Number(vals.loanPrincipal) || 250000;
    const rYear = Number(vals.annualInterestRate) || 7.75;
    const termYears = Number(vals.termYears) || 5;
    const feePct = Number(vals.originationFeePct) || 2.0;

    const nMonths = Math.round(termYears * 12);
    const rMonthly = (rYear / 100) / 12;

    // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const factor = Math.pow(1 + rMonthly, nMonths);
    const monthlyPayment = (P * (rMonthly * factor)) / (factor - 1);
    const totalRepayment = monthlyPayment * nMonths;
    const totalInterest = totalRepayment - P;
    const originationCost = (feePct / 100) * P;
    const netDisbursed = P - originationCost;

    return {
      hero: {
        label: "Monthly Commercial Debt Service",
        value: `$${Math.round(monthlyPayment).toLocaleString()} / mo`,
      },
      badge: {
        text: `${nMonths} Monthly Installments @ ${rYear.toFixed(2)}% APR`,
        tone: "good",
      },
      rows: [
        { label: "Total Interest Paid Over Term", value: `$${Math.round(totalInterest).toLocaleString()}` },
        { label: "Total Cumulative Outflow", value: `$${Math.round(totalRepayment).toLocaleString()}` },
        { label: "Upfront Origination & Closing Fee", value: `$${Math.round(originationCost).toLocaleString()} (${feePct}%)` },
        { label: "Net Capital Disbursed to Business", value: `$${Math.round(netDisbursed).toLocaleString()}` },
        { label: "Annual Debt Service Obligation", value: `$${Math.round(monthlyPayment * 12).toLocaleString()} / year` },
        { label: "Principal to Interest Repayment Ratio", value: `${(P / totalInterest).toFixed(2)} : 1` },
      ],
      steps: [
        `Monthly Interest Rate r = ${rYear}% / 12 = ${(rMonthly * 100).toFixed(4)}% per month`,
        `Total Amortization Periods n = ${termYears} years × 12 = ${nMonths} months`,
        `Standard Amortization Formula: M = P · [r(1+r)^n] / [(1+r)^n - 1]`,
        `Monthly Payment = $${P.toLocaleString()} × [${(rMonthly * factor).toFixed(6)}] / [${(factor - 1).toFixed(6)}] = $${Math.round(monthlyPayment).toLocaleString()}`,
        `Total Repayment = ${nMonths} payments × $${monthlyPayment.toFixed(2)} = $${Math.round(totalRepayment).toLocaleString()}`,
        `Total Financing Cost = $${Math.round(totalRepayment).toLocaleString()} - $${P.toLocaleString()} principal = $${Math.round(totalInterest).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Total Commercial Debt Repayment Composition",
        format: "usd0",
        data: [
          { name: "Original Loan Principal", value: Math.round(P), color: "#0284c7" },
          { name: "Cumulative Commercial Interest", value: Math.round(totalInterest), color: "#ef4444" },
          { name: "Upfront Closing Fees", value: Math.round(originationCost), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function BusinessLoanCalculatorComponent() {
  return <CalcEngine config={businessLoanConfig} />;
}
