"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const currencyConverterConfig: CalcConfig = {
  id: "currency-converter",
  title: "Multi-Currency Benchmark Exchange Converter",
  fields: [
    {
      kind: "number",
      key: "amount",
      label: "Nominal Amount",
      default: 1000,
      min: 0.01,
      max: 1000000000,
    },
    {
      kind: "choice",
      key: "fromCur",
      label: "Source Currency (From)",
      default: "USD",
      options: [
        { label: "USD - United States Dollar", value: "USD" },
        { label: "EUR - Eurozone Euro", value: "EUR" },
        { label: "GBP - British Pound Sterling", value: "GBP" },
        { label: "JPY - Japanese Yen", value: "JPY" },
        { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "AUD - Australian Dollar", value: "AUD" },
        { label: "CHF - Swiss Franc", value: "CHF" },
        { label: "CNY - Chinese Yuan", value: "CNY" },
        { label: "INR - Indian Rupee", value: "INR" },
        { label: "AED - UAE Dirham", value: "AED" },
      ],
    },
    {
      kind: "choice",
      key: "toCur",
      label: "Target Currency (To)",
      default: "EUR",
      options: [
        { label: "USD - United States Dollar", value: "USD" },
        { label: "EUR - Eurozone Euro", value: "EUR" },
        { label: "GBP - British Pound Sterling", value: "GBP" },
        { label: "JPY - Japanese Yen", value: "JPY" },
        { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "AUD - Australian Dollar", value: "AUD" },
        { label: "CHF - Swiss Franc", value: "CHF" },
        { label: "CNY - Chinese Yuan", value: "CNY" },
        { label: "INR - Indian Rupee", value: "INR" },
        { label: "AED - UAE Dirham", value: "AED" },
      ],
    },
    {
      kind: "number",
      key: "feePct",
      label: "Bank / FX Card Margin Fee (%)",
      default: 2.0,
      min: 0,
      max: 15,
    },
  ],
  presets: [
    { label: "1,000 USD to EUR (Travel FX)", values: { amount: 1000, fromCur: "USD", toCur: "EUR", feePct: 1.5 } },
    { label: "2,500 GBP to USD (Commercial Wire)", values: { amount: 2500, fromCur: "GBP", toCur: "USD", feePct: 0.5 } },
    { label: "50,000 JPY to USD (Retail Exchange)", values: { amount: 50000, fromCur: "JPY", toCur: "USD", feePct: 2.5 } },
    { label: "1,000 EUR to CHF (Cross-Border)", values: { amount: 1000, fromCur: "EUR", toCur: "CHF", feePct: 1.0 } },
  ],
  compute: (vals) => {
    const amt = Math.max(0.01, Number(vals.amount) || 1000);
    const from = String(vals.fromCur || "USD");
    const to = String(vals.toCur || "EUR");
    const fee = Math.max(0, Number(vals.feePct) || 2.0);

    // Baseline FX benchmark peg against 1 USD
    const RATES_TO_USD: Record<string, number> = {
      USD: 1.0,
      EUR: 0.92,
      GBP: 0.78,
      JPY: 155.0,
      CAD: 1.38,
      AUD: 1.52,
      CHF: 0.90,
      CNY: 7.24,
      INR: 83.5,
      AED: 3.67,
    };

    const inUsd = amt / (RATES_TO_USD[from] || 1.0);
    const nominalTarget = inUsd * (RATES_TO_USD[to] || 1.0);
    const netTarget = nominalTarget * (1 - fee / 100);
    const feeDeduction = nominalTarget * (fee / 100);
    const effectiveRate = netTarget / amt;

    const netPct = Math.round(100 - fee);
    const feePctDisplay = Math.round(fee);

    return {
      hero: {
        value: `${netTarget.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}`,
        label: `Net Converted Amount (${amt} ${from} → ${to})`,
      },
      breakdown: [
        { label: "Nominal Mid-Market Value", value: `${nominalTarget.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}` },
        { label: "Exchange Fee Spread", value: `-${feeDeduction.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to} (${fee}%)` },
        { label: "Effective Exchange Rate", value: `1 ${from} = ${effectiveRate.toFixed(4)} ${to}` },
        { label: "Inverse Benchmark Rate", value: `1 ${to} = ${(1 / effectiveRate).toFixed(4)} ${from}` },
        { label: "Equivalent USD Value", value: `$${inUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
      ],
      steps: [
        `Convert ${amt} ${from} to interbank USD reference: $${inUsd.toFixed(2)}.`,
        `Multiply by ${to} reference peg: nominal ${nominalTarget.toFixed(2)} ${to}.`,
        `Apply margin spread of ${fee}% (-${feeDeduction.toFixed(2)} ${to}) to arrive at net ${netTarget.toFixed(2)} ${to}.`,
      ],
      chart: {
        type: "donut",
        title: "Capital Delivery vs Fee Spread Breakdown",
        format: "pct",
        data: [
          { name: "Net Delivered Value", value: netPct, color: "#10b981" },
          { name: "FX Spread & Card Fee", value: feePctDisplay, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CurrencyConverterComponent() {
  return <CalcEngine config={currencyConverterConfig} />;
}
