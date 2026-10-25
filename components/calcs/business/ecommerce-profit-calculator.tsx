"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const ecommerceProfitConfig: CalcConfig = {
  id: "ecommerce-profit-calculator",
  title: "E-Commerce Net Profit & Store Unit Economics Calculator",
  fields: [
    {
      kind: "number",
      key: "monthlyGmv",
      label: "Monthly Gross Merchandise Value / Sales ($)",
      default: 85000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "cogsPct",
      label: "Product Landed Cost of Goods Sold (% of Sales)",
      default: 28,
      min: 0,
      max: 100,
    },
    {
      kind: "number",
      key: "adSpend",
      label: "Monthly Paid Ad Spend (Meta, Google, TikTok) ($)",
      default: 24000,
      min: 0,
      max: 10000000,
    },
    {
      kind: "number",
      key: "fulfillmentPerOrder",
      label: "Shipping & 3PL Pick-Pack Cost ($ / Order)",
      default: 7.50,
      min: 0,
      max: 1000,
    },
    {
      kind: "number",
      key: "orderCount",
      label: "Monthly Order Volume (Total Shipments)",
      default: 1100,
      min: 0,
      max: 10000000,
    },
    {
      kind: "number",
      key: "gatewayFeePct",
      label: "Payment Processing & Platform Fee (%)",
      default: 3.2,
      min: 0,
      max: 20,
    },
  ],
  compute(vals) {
    const gmv = Number(vals.monthlyGmv) || 85000;
    const cogsPct = Number(vals.cogsPct) || 28;
    const ads = Number(vals.adSpend) || 24000;
    const pickPack = Number(vals.fulfillmentPerOrder) || 7.50;
    const orders = Number(vals.orderCount) || 1100;
    const gatewayPct = Number(vals.gatewayFeePct) || 3.2;

    const cogsDollar = gmv * (cogsPct / 100);
    const shippingTotal = orders * pickPack;
    const processingFees = gmv * (gatewayPct / 100) + (orders * 0.30); // standard 30c per tx
    const totalExpenses = cogsDollar + ads + shippingTotal + processingFees;
    const netProfit = gmv - totalExpenses;
    const netMarginPct = gmv > 0 ? (netProfit / gmv) * 100 : 0;
    const roas = ads > 0 ? gmv / ads : 0;

    let tone: "good" | "warn" | "bad" = "good";
    let statusBadge = `Healthy Profitability (${netMarginPct.toFixed(1)}% Net Margin)`;
    if (netProfit < 0) {
      statusBadge = `Operating at a Net Loss (-$${Math.round(Math.abs(netProfit)).toLocaleString()})`;
      tone = "bad";
    } else if (netMarginPct < 10) {
      statusBadge = `Slim Margins (${netMarginPct.toFixed(1)}% Net Margin)`;
      tone = "warn";
    }

    return {
      hero: {
        label: "Monthly Net E-Commerce Profit",
        value: `$${Math.round(netProfit).toLocaleString()} / mo`,
      },
      badge: {
        text: statusBadge,
        tone,
      },
      rows: [
        { label: "Net Profit Margin", value: `${netMarginPct.toFixed(2)}%` },
        { label: "Return on Ad Spend (ROAS)", value: `${roas.toFixed(2)}x ($${Math.round(gmv).toLocaleString()} GMV / $${Math.round(ads).toLocaleString()} Ads)` },
        { label: "Total Product Landed COGS", value: `$${Math.round(cogsDollar).toLocaleString()} (${cogsPct}%)` },
        { label: "Shipping & 3PL Logistics", value: `$${Math.round(shippingTotal).toLocaleString()} ($${pickPack.toFixed(2)}/order)` },
        { label: "Payment & Platform Gateway Fees", value: `$${Math.round(processingFees).toLocaleString()}` },
        { label: "Annualized Net Profit Run-Rate", value: `$${Math.round(netProfit * 12).toLocaleString()} / year` },
      ],
      steps: [
        `Gross Merchandise Value (GMV) = $${Math.round(gmv).toLocaleString()}`,
        `Product COGS = $${Math.round(gmv).toLocaleString()} × ${cogsPct}% = $${Math.round(cogsDollar).toLocaleString()}`,
        `Shipping & Fulfillment = ${orders.toLocaleString()} orders × $${pickPack.toFixed(2)} = $${Math.round(shippingTotal).toLocaleString()}`,
        `Payment Processing = ($${Math.round(gmv).toLocaleString()} × ${gatewayPct}%) + (${orders} × $0.30) = $${Math.round(processingFees).toLocaleString()}`,
        `Net Profit = $${Math.round(gmv).toLocaleString()} - [$${Math.round(cogsDollar).toLocaleString()} (COGS) + $${Math.round(ads).toLocaleString()} (Ads) + $${Math.round(shippingTotal).toLocaleString()} (Ship) + $${Math.round(processingFees).toLocaleString()} (Fees)] = $${Math.round(netProfit).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "E-Commerce Revenue Outflow Distribution",
        format: "usd0",
        data: [
          { name: "Retained Net Profit", value: Math.max(0, Math.round(netProfit)), color: "#10b981" },
          { name: "Product Landed COGS", value: Math.round(cogsDollar), color: "#0284c7" },
          { name: "Paid Advertising Media", value: Math.round(ads), color: "#f59e0b" },
          { name: "Shipping & 3PL Fulfillment", value: Math.round(shippingTotal), color: "#8b5cf6" },
          { name: "Gateway & Platform Fees", value: Math.round(processingFees), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function EcommerceProfitCalculatorComponent() {
  return <CalcEngine config={ecommerceProfitConfig} />;
}
