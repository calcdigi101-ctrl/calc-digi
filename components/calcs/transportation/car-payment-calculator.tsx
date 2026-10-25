"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const carPaymentConfig: CalcConfig = {
  id: "car-payment-calculator",
  title: "Auto Loan Financing, Amortization, Sales Tax and Monthly Payment Calculator",
  fields: [
    {
      kind: "number",
      key: "vehiclePrice",
      label: "Agreed Vehicle Sale Price ($)",
      default: 35000,
      min: 1000,
      max: 500000,
    },
    {
      kind: "number",
      key: "downPayment",
      label: "Cash Down Payment ($)",
      default: 5000,
      min: 0,
      max: 250000,
    },
    {
      kind: "number",
      key: "tradeInValue",
      label: "Trade-In Net Equity Credit ($)",
      default: 2000,
      min: 0,
      max: 100000,
    },
    {
      kind: "number",
      key: "interestRateApr",
      label: "Loan Annual Percentage Rate (APR %)",
      default: 6.5,
      min: 0.0,
      max: 30.0,
    },
    {
      kind: "choice",
      key: "loanTermMonths",
      label: "Financing Loan Term Duration",
      default: "60",
      options: [
        { label: "36 Months (3 Years - Lowest Total Interest)", value: "36" },
        { label: "48 Months (4 Years - Balanced)", value: "48" },
        { label: "60 Months (5 Years - Standard Industry Term)", value: "60" },
        { label: "72 Months (6 Years - Lower Payment, High Interest)", value: "72" },
        { label: "84 Months (7 Years - Extended Subprime)", value: "84" },
      ],
    },
    {
      kind: "number",
      key: "salesTaxPct",
      label: "State / Local Vehicle Sales Tax Rate (%)",
      default: 7.0,
      min: 0.0,
      max: 20.0,
    },
  ],
  compute: (vals) => {
    const price = Math.max(1000, Number(vals.vehiclePrice) || 35000);
    const down = Number(vals.downPayment) || 0;
    const tradeIn = Number(vals.tradeInValue) || 0;
    const apr = Number(vals.interestRateApr) || 6.5;
    const months = Number(vals.loanTermMonths) || 60;
    const taxPct = Number(vals.salesTaxPct) || 7.0;

    // Sales tax applies to net vehicle purchase price in most jurisdictions
    const taxableAmount = Math.max(0, price - tradeIn);
    const salesTax = taxableAmount * (taxPct / 100);

    // Total financed principal
    const principal = Math.max(0, price + salesTax - down - tradeIn);

    // Monthly payment via classical amortization formula:
    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyRate = (apr / 100) / 12;
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      monthlyPayment = principal / months;
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = Math.max(0, totalPaid - principal);
    const grandVehicleCost = price + salesTax + totalInterest;

    return {
      hero: {
        label: "Estimated Monthly Auto Payment",
        value: `$${monthlyPayment.toFixed(2)}`,
      },
      badge: {
        text: `$${principal.toLocaleString(undefined, { maximumFractionDigits: 0 })} Financed @ ${apr.toFixed(2)}% for ${months} Mo`,
        tone: "good",
      },
      secondary: [
        {
          label: "Total Financing Interest Paid",
          value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        },
        {
          label: "Total Out-of-Pocket Financed Cost",
          value: `$${grandVehicleCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        },
        {
          label: "Applicable Sales Tax Liability",
          value: `$${salesTax.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${taxPct.toFixed(1)}%)`,
        },
        {
          label: "Total Upfront Capital (Down + Trade)",
          value: `$${(down + tradeIn).toLocaleString()}`,
        },
      ],
      steps: [
        `Net Taxable Price = $${price.toLocaleString()} - Trade-in ($${tradeIn.toLocaleString()}) = $${taxableAmount.toLocaleString()}`,
        `Sales Tax (${taxPct}%) = $${taxableAmount.toLocaleString()} * ${(taxPct / 100).toFixed(4)} = $${salesTax.toFixed(2)}`,
        `Net Financed Principal = ($${price.toLocaleString()} + $${salesTax.toFixed(2)}) - (Down $${down.toLocaleString()} + Trade $${tradeIn.toLocaleString()}) = $${principal.toFixed(2)}`,
        `Amortization Payment = $${principal.toFixed(2)} * [${monthlyRate.toFixed(6)}(1+${monthlyRate.toFixed(6)})^${months}] / [(1+${monthlyRate.toFixed(6)})^${months} - 1] = $${monthlyPayment.toFixed(2)}/mo`,
        `Total Loan Cost = ($${monthlyPayment.toFixed(2)} * ${months}) - $${principal.toFixed(2)} = $${totalInterest.toFixed(2)} total interest`,
      ],
      chart: {
        type: "donut",
        title: "Total Vehicle Financing Capital Breakdown",
        format: "usd0",
        data: [
          { name: "Financed Loan Principal ($)", value: Math.round(principal), color: "#0284c7" },
          { name: "Total Financing Interest ($)", value: Math.round(totalInterest), color: "#f59e0b" },
          { name: "Sales Tax Burden ($)", value: Math.round(salesTax), color: "#ef4444" },
          { name: "Upfront Cash Down Payment ($)", value: Math.round(down), color: "#10b981" },
        ],
      },
    };
  },
};

export default function CarPaymentCalculatorComponent() {
  return <CalcEngine config={carPaymentConfig} />;
}
