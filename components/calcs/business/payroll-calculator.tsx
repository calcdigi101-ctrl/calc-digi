"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const payrollConfig: CalcConfig = {
  id: "payroll-calculator",
  title: "Commercial Payroll & Net Paycheck Calculator",
  fields: [
    {
      kind: "number",
      key: "grossPayPeriod",
      label: "Gross Pay per Paycheck ($)",
      default: 3500,
      min: 100,
      max: 1000000,
    },
    {
      kind: "number",
      key: "payPeriodsYear",
      label: "Pay Frequency (Paychecks per Year)",
      default: 26, // Bi-weekly
      min: 12,
      max: 52,
    },
    {
      kind: "number",
      key: "federalWithholdingPct",
      label: "Federal Income Tax Withholding (%)",
      default: 14.5,
      min: 0,
      max: 50,
    },
    {
      kind: "number",
      key: "stateWithholdingPct",
      label: "State Income Tax Withholding (%)",
      default: 4.8,
      min: 0,
      max: 20,
    },
    {
      kind: "number",
      key: "pretaxDeductions",
      label: "Pre-Tax Deductions (401k, Health) per Paycheck ($)",
      default: 280,
      min: 0,
      max: 10000,
    },
  ],
  compute(vals) {
    const gross = Number(vals.grossPayPeriod) || 3500;
    const periods = Number(vals.payPeriodsYear) || 26;
    const fedPct = Number(vals.federalWithholdingPct) || 14.5;
    const statePct = Number(vals.stateWithholdingPct) || 4.8;
    const pretax = Number(vals.pretaxDeductions) || 280;

    // FICA: Social Security (6.2%) + Medicare (1.45%) = 7.65%
    const socialSecurity = gross * 0.062;
    const medicare = gross * 0.0145;
    const totalFica = socialSecurity + medicare;

    // Taxable wages for income tax after pre-tax benefits
    const taxableIncome = Math.max(0, gross - pretax);
    const federalTax = taxableIncome * (fedPct / 100);
    const stateTax = taxableIncome * (statePct / 100);

    const totalDeductions = totalFica + federalTax + stateTax + pretax;
    const netPaycheck = Math.max(0, gross - totalDeductions);
    const netTakeHomePct = gross > 0 ? (netPaycheck / gross) * 100 : 0;

    const annualizedGross = gross * periods;
    const annualizedNet = netPaycheck * periods;

    return {
      hero: {
        label: "Net Take-Home Paycheck",
        value: `$${netPaycheck.toFixed(2)}`,
      },
      badge: {
        text: `${netTakeHomePct.toFixed(1)}% Retained Net Pay`,
        tone: "good",
      },
      rows: [
        { label: "Gross Pay per Paycheck", value: `$${gross.toFixed(2)} ($${Math.round(annualizedGross).toLocaleString()} Annual)` },
        { label: "Federal Income Tax Withholding", value: `-$${federalTax.toFixed(2)} (${fedPct}%)` },
        { label: "State Income Tax Withholding", value: `-$${stateTax.toFixed(2)} (${statePct}%)` },
        { label: "Employee Social Security (6.2%)", value: `-$${socialSecurity.toFixed(2)}` },
        { label: "Employee Medicare (1.45%)", value: `-$${medicare.toFixed(2)}` },
        { label: "Pre-Tax Benefits (401k/Health)", value: `-$${pretax.toFixed(2)}` },
        { label: "Annualized Net Take-Home Pay", value: `$${Math.round(annualizedNet).toLocaleString()} / year` },
      ],
      steps: [
        `Gross Paycheck = $${gross.toFixed(2)} across ${periods} annual pay periods`,
        `Mandatory FICA: Social Security (6.2% = $${socialSecurity.toFixed(2)}) + Medicare (1.45% = $${medicare.toFixed(2)}) = $${totalFica.toFixed(2)}`,
        `Pre-Tax Deductions = $${pretax.toFixed(2)} (Taxable Base: $${taxableIncome.toFixed(2)})`,
        `Income Taxes: Federal ($${federalTax.toFixed(2)}) + State ($${stateTax.toFixed(2)}) = $${(federalTax + stateTax).toFixed(2)}`,
        `Total Deductions = $${totalFica.toFixed(2)} (FICA) + $${(federalTax + stateTax).toFixed(2)} (Income Taxes) + $${pretax.toFixed(2)} (Pre-Tax) = $${totalDeductions.toFixed(2)}`,
        `Net Paycheck = $${gross.toFixed(2)} - $${totalDeductions.toFixed(2)} = $${netPaycheck.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Paycheck Gross Distribution (Net vs Withholdings)",
        format: "usd0",
        data: [
          { name: "Net Take-Home Pay", value: Math.round(netPaycheck), color: "#10b981" },
          { name: "Federal & State Income Taxes", value: Math.round(federalTax + stateTax), color: "#ef4444" },
          { name: "FICA Taxes (SS & Medicare)", value: Math.round(totalFica), color: "#f59e0b" },
          { name: "Pre-Tax 401(k) & Benefits", value: Math.round(pretax), color: "#0284c7" },
        ],
      },
    };
  },
};

export default function PayrollCalculatorComponent() {
  return <CalcEngine config={payrollConfig} />;
}
