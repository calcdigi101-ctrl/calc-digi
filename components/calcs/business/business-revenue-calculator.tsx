"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const businessRevenueConfig: CalcConfig = {
  id: "business-revenue-calculator",
  title: "Business Revenue & Recurring Run-Rate Calculator",
  fields: [
    {
      kind: "number",
      key: "recurringSubscribers",
      label: "Active Subscription Customers",
      default: 1250,
      min: 0,
      max: 10000000,
    },
    {
      kind: "number",
      key: "arpuMonthly",
      label: "Average Revenue Per User (ARPU / Month) ($)",
      default: 89,
      min: 0.01,
      max: 1000000,
    },
    {
      kind: "number",
      key: "transactionalVolume",
      label: "One-Off Transactional Units Sold / Month",
      default: 450,
      min: 0,
      max: 10000000,
    },
    {
      kind: "number",
      key: "aovOneOff",
      label: "Average Order Value (AOV) One-Off ($)",
      default: 150,
      min: 0,
      max: 1000000,
    },
  ],
  compute(vals) {
    const subs = Number(vals.recurringSubscribers) || 1250;
    const arpu = Number(vals.arpuMonthly) || 89;
    const txUnits = Number(vals.transactionalVolume) || 450;
    const aov = Number(vals.aovOneOff) || 150;

    const mrr = subs * arpu;
    const arr = mrr * 12;
    const oneOffMonthly = txUnits * aov;
    const totalMonthlyRevenue = mrr + oneOffMonthly;
    const totalAnnualRunRate = totalMonthlyRevenue * 12;

    const recurringSharePct = totalMonthlyRevenue > 0 ? (mrr / totalMonthlyRevenue) * 100 : 0;

    return {
      hero: {
        label: "Total Monthly Blended Revenue",
        value: `$${Math.round(totalMonthlyRevenue).toLocaleString()} / mo`,
      },
      badge: {
        text: `ARR Run-Rate: $${Math.round(totalAnnualRunRate).toLocaleString()} / yr`,
        tone: "good",
      },
      rows: [
        { label: "Monthly Recurring Revenue (MRR)", value: `$${Math.round(mrr).toLocaleString()} (${recurringSharePct.toFixed(1)}% Share)` },
        { label: "Annualized Recurring Revenue (ARR)", value: `$${Math.round(arr).toLocaleString()}` },
        { label: "One-Off Monthly Sales Revenue", value: `$${Math.round(oneOffMonthly).toLocaleString()}` },
        { label: "Annualized One-Off Run-Rate", value: `$${Math.round(oneOffMonthly * 12).toLocaleString()}` },
        { label: "Average Daily Revenue Run-Rate", value: `$${Math.round(totalMonthlyRevenue / 30.4).toLocaleString()} / day` },
        { label: "Blended Revenue per Customer", value: `$${((totalMonthlyRevenue) / (subs + txUnits)).toFixed(2)}` },
      ],
      steps: [
        `Monthly Recurring Revenue (MRR) = ${subs.toLocaleString()} subscribers × $${arpu.toFixed(2)} ARPU = $${Math.round(mrr).toLocaleString()}`,
        `Annualized Recurring Revenue (ARR) = $${Math.round(mrr).toLocaleString()} × 12 months = $${Math.round(arr).toLocaleString()}`,
        `One-Off Transactional Revenue = ${txUnits.toLocaleString()} units × $${aov.toFixed(2)} AOV = $${Math.round(oneOffMonthly).toLocaleString()}`,
        `Blended Monthly Revenue = $${Math.round(mrr).toLocaleString()} (MRR) + $${Math.round(oneOffMonthly).toLocaleString()} (One-Off) = $${Math.round(totalMonthlyRevenue).toLocaleString()}`,
        `Annualized Blended Run-Rate = $${Math.round(totalMonthlyRevenue).toLocaleString()} × 12 = $${Math.round(totalAnnualRunRate).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Monthly Revenue Composition (MRR vs Transactional)",
        format: "usd0",
        data: [
          { name: "Monthly Recurring Revenue (MRR)", value: Math.round(mrr), color: "#0284c7" },
          { name: "One-Off Direct Sales", value: Math.round(oneOffMonthly), color: "#10b981" },
        ],
      },
    };
  },
};

export default function BusinessRevenueCalculatorComponent() {
  return <CalcEngine config={businessRevenueConfig} />;
}
