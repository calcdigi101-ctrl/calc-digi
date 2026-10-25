"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const discountConfig: CalcConfig = {
  id: "discount-calculator",
  title: "Commercial Discount & Price Reduction Calculator",
  fields: [
    {
      kind: "number",
      key: "originalPrice",
      label: "Original Retail / List Price ($)",
      default: 149.99,
      min: 0.01,
      max: 10000000,
    },
    {
      kind: "number",
      key: "primaryDiscountPct",
      label: "Primary Discount Rate (%)",
      default: 25,
      min: 0,
      max: 100,
    },
    {
      kind: "number",
      key: "stackedDiscountPct",
      label: "Secondary Stacked Discount / Coupon (%)",
      default: 10,
      min: 0,
      max: 100,
    },
    {
      kind: "number",
      key: "salesTaxPct",
      label: "Sales Tax Rate (%)",
      default: 8.25,
      min: 0,
      max: 50,
    },
  ],
  compute(vals) {
    const listPrice = Number(vals.originalPrice) || 149.99;
    const d1 = Number(vals.primaryDiscountPct) || 25;
    const d2 = Number(vals.stackedDiscountPct) || 10;
    const taxRate = Number(vals.salesTaxPct) || 8.25;

    // Sequential compounding discount
    const priceAfterD1 = listPrice * (1 - d1 / 100);
    const finalPreTaxPrice = priceAfterD1 * (1 - d2 / 100);
    const totalSavingsPreTax = listPrice - finalPreTaxPrice;
    const effectiveDiscountPct = listPrice > 0 ? (totalSavingsPreTax / listPrice) * 100 : 0;

    const salesTaxAmount = finalPreTaxPrice * (taxRate / 100);
    const totalFinalWithTax = finalPreTaxPrice + salesTaxAmount;

    return {
      hero: {
        label: "Final Discounted Price",
        value: `$${finalPreTaxPrice.toFixed(2)}`,
      },
      badge: {
        text: `Total Savings: $${totalSavingsPreTax.toFixed(2)} (${effectiveDiscountPct.toFixed(1)}% Off)`,
        tone: "good",
      },
      rows: [
        { label: "Original List Price", value: `$${listPrice.toFixed(2)}` },
        { label: "Primary Discount Savings", value: `-$${(listPrice * (d1 / 100)).toFixed(2)} (${d1}%)` },
        { label: "Secondary Stacked Savings", value: `-$${(priceAfterD1 * (d2 / 100)).toFixed(2)} (${d2}%)` },
        { label: "Total Net Savings", value: `$${totalSavingsPreTax.toFixed(2)} (${effectiveDiscountPct.toFixed(2)}% Blended)` },
        { label: "Estimated Sales Tax", value: `+$${salesTaxAmount.toFixed(2)} (${taxRate}%)` },
        { label: "Total Out-of-Pocket with Tax", value: `$${totalFinalWithTax.toFixed(2)}` },
      ],
      steps: [
        `Primary Discount: $${listPrice.toFixed(2)} × (1 - ${d1}%) = $${priceAfterD1.toFixed(2)}`,
        `Secondary Stacked Discount: $${priceAfterD1.toFixed(2)} × (1 - ${d2}%) = $${finalPreTaxPrice.toFixed(2)}`,
        `Effective Compounded Discount Rate = 1 - (1 - ${d1}%)(1 - ${d2}%) = ${effectiveDiscountPct.toFixed(2)}%`,
        `Sales Tax (${taxRate}%): $${finalPreTaxPrice.toFixed(2)} × ${taxRate / 100} = $${salesTaxAmount.toFixed(2)}`,
        `Total Customer Price with Tax = $${finalPreTaxPrice.toFixed(2)} + $${salesTaxAmount.toFixed(2)} = $${totalFinalWithTax.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Price Realization vs Total Discount Savings",
        format: "usd0",
        data: [
          { name: "Final Net Paid", value: Number(finalPreTaxPrice.toFixed(2)), color: "#10b981" },
          { name: "Total Customer Savings", value: Number(totalSavingsPreTax.toFixed(2)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function DiscountCalculatorComponent() {
  return <CalcEngine config={discountConfig} />;
}
