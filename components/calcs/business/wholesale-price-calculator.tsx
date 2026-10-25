"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const wholesalePriceConfig: CalcConfig = {
  id: "wholesale-price-calculator",
  title: "Wholesale & Retail Keystone Pricing Calculator",
  fields: [
    {
      kind: "number",
      key: "costOfGoods",
      label: "Landed Manufacturing Unit Cost ($)",
      default: 18.5,
      min: 0.1,
      max: 1000000,
    },
    {
      kind: "number",
      key: "wholesaleMarkup",
      label: "Wholesale Markup Over Cost (%)",
      default: 50.0,
      min: 0,
      max: 500,
    },
    {
      kind: "number",
      key: "retailMarkup",
      label: "Retailer Markup to MSRP (%)",
      default: 100.0,
      min: 0,
      max: 500,
    },
    {
      kind: "number",
      key: "batchVolume",
      label: "Production Batch Units",
      default: 2500,
      min: 1,
      max: 10000000,
    },
  ],
  compute(vals) {
    const cogs = Math.max(0.01, Number(vals.costOfGoods) || 18.5);
    const wsMarkup = Math.max(0, Number(vals.wholesaleMarkup) || 50.0) / 100;
    const retMarkup = Math.max(0, Number(vals.retailMarkup) || 100.0) / 100;
    const units = Math.max(1, Number(vals.batchVolume) || 2500);

    const wholesalePrice = cogs * (1 + wsMarkup);
    const wholesaleMarginDollars = wholesalePrice - cogs;
    const wholesaleMarginPct = (wholesaleMarginDollars / wholesalePrice) * 100;

    const msrpPrice = wholesalePrice * (1 + retMarkup);
    const retailMarginDollars = msrpPrice - wholesalePrice;
    const retailMarginPct = (retailMarginDollars / msrpPrice) * 100;

    const totalBatchRevenue = wholesalePrice * units;
    const totalBatchProfit = wholesaleMarginDollars * units;

    return {
      hero: {
        label: "Wholesale Selling Price",
        value: `$${wholesalePrice.toFixed(2)}`,
      },
      badge: {
        text: `${wholesaleMarginPct.toFixed(1)}% Wholesale Margin`,
        tone: wholesaleMarginPct >= 35 ? "good" : "warn",
      },
      secondary: [
        {
          label: "Recommended Retail MSRP",
          value: `$${msrpPrice.toFixed(2)}`,
        },
        {
          label: "Wholesale Gross Margin (%)",
          value: `${wholesaleMarginPct.toFixed(2)}%`,
        },
        {
          label: "Retailer Gross Margin (%)",
          value: `${retailMarginPct.toFixed(2)}%`,
        },
        {
          label: "Total Batch Wholesale Profit",
          value: `$${totalBatchProfit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      ],
      steps: [
        `Wholesale Price = $${cogs.toFixed(2)} (COGS) * (1 + ${(wsMarkup).toFixed(2)}) = $${wholesalePrice.toFixed(2)}`,
        `Wholesale Margin = ($${wholesaleMarginDollars.toFixed(2)} / $${wholesalePrice.toFixed(2)}) * 100 = ${wholesaleMarginPct.toFixed(2)}%`,
        `Retail MSRP (Keystone) = $${wholesalePrice.toFixed(2)} * (1 + ${(retMarkup).toFixed(2)}) = $${msrpPrice.toFixed(2)}`,
        `Retailer Margin = ($${retailMarginDollars.toFixed(2)} / $${msrpPrice.toFixed(2)}) * 100 = ${retailMarginPct.toFixed(2)}%`,
      ],
      chart: {
        type: "donut",
        title: "Wholesale to Retail Price Stack Breakdown",
        format: "usd0",
        data: [
          { name: "Landed Unit COGS", value: parseFloat(cogs.toFixed(2)), color: "#64748b" },
          { name: "Brand Wholesale Margin", value: parseFloat(wholesaleMarginDollars.toFixed(2)), color: "#0ea5e9" },
          { name: "Retailer Merchandising Margin", value: parseFloat(retailMarginDollars.toFixed(2)), color: "#10b981" },
        ],
      },
    };
  },
};

export default function WholesalePriceCalculatorComponent() {
  return <CalcEngine config={wholesalePriceConfig} />;
}
