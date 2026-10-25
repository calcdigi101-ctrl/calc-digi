"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cacConfig: CalcConfig = {
  id: "cac-calculator",
  title: "Customer Acquisition Cost (CAC) & Payback Calculator",
  fields: [
    {
      kind: "number",
      key: "adSpend",
      label: "Direct Paid Advertising Spend ($ / Period)",
      default: 45000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "teamSalaries",
      label: "Sales & Marketing Team Payroll ($ / Period)",
      default: 65000,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "softwareOverhead",
      label: "Marketing Tech Stack & Agency Fees ($ / Period)",
      default: 12000,
      min: 0,
      max: 10000000,
    },
    {
      kind: "number",
      key: "newCustomers",
      label: "Total New Customers Acquired",
      default: 320,
      min: 1,
      max: 10000000,
    },
    {
      kind: "number",
      key: "monthlyArpu",
      label: "Monthly Gross Profit per Customer ($)",
      default: 65,
      min: 0.01,
      max: 100000,
    },
  ],
  compute(vals) {
    const ads = Number(vals.adSpend) || 45000;
    const salaries = Number(vals.teamSalaries) || 65000;
    const tech = Number(vals.softwareOverhead) || 12000;
    const customers = Math.max(1, Number(vals.newCustomers) || 320);
    const arpuGross = Number(vals.monthlyArpu) || 65;

    const totalSalesMarketingSpend = ads + salaries + tech;
    const blendedCac = totalSalesMarketingSpend / customers;
    const paidOnlyCac = ads / customers;
    const paybackMonths = arpuGross > 0 ? blendedCac / arpuGross : 0;

    let tone: "good" | "warn" | "bad" = "good";
    let paybackBadge = `${paybackMonths.toFixed(1)} Months CAC Payback`;
    if (paybackMonths <= 12) {
      paybackBadge = `Elite Efficiency: ${paybackMonths.toFixed(1)} Mo Payback (≤ 12 Mo)`;
      tone = "good";
    } else if (paybackMonths <= 18) {
      paybackBadge = `Healthy Payback: ${paybackMonths.toFixed(1)} Mo (12–18 Mo)`;
      tone = "warn";
    } else {
      paybackBadge = `Capital Inefficient: ${paybackMonths.toFixed(1)} Mo (> 18 Mo)`;
      tone = "bad";
    }

    return {
      hero: {
        label: "Fully Loaded Blended CAC",
        value: `$${Math.round(blendedCac).toLocaleString()} / Customer`,
      },
      badge: {
        text: paybackBadge,
        tone,
      },
      rows: [
        { label: "Paid Media Only CAC", value: `$${Math.round(paidOnlyCac).toLocaleString()} / customer` },
        { label: "Total Sales & Marketing Outlay", value: `$${Math.round(totalSalesMarketingSpend).toLocaleString()}` },
        { label: "CAC Payback Period", value: `${paybackMonths.toFixed(1)} Months` },
        { label: "New Customers Acquired", value: `${customers.toLocaleString()}` },
        { label: "Payroll Share of Acquisition", value: `${((salaries / totalSalesMarketingSpend) * 100).toFixed(1)}%` },
        { label: "Ad Spend Share of Acquisition", value: `${((ads / totalSalesMarketingSpend) * 100).toFixed(1)}%` },
      ],
      steps: [
        `Total Sales & Marketing Spend = Paid Ads ($${ads.toLocaleString()}) + Payroll ($${salaries.toLocaleString()}) + Tech ($${tech.toLocaleString()}) = $${totalSalesMarketingSpend.toLocaleString()}`,
        `Fully Loaded Blended CAC = Total S&M Spend ($${totalSalesMarketingSpend.toLocaleString()}) / New Customers (${customers.toLocaleString()}) = $${blendedCac.toFixed(2)}`,
        `Paid-Only CAC = Paid Ads ($${ads.toLocaleString()}) / New Customers (${customers.toLocaleString()}) = $${paidOnlyCac.toFixed(2)}`,
        `CAC Payback Period = Blended CAC ($${blendedCac.toFixed(2)}) / Monthly Gross Profit per User ($${arpuGross.toFixed(2)}) = ${paybackMonths.toFixed(1)} months`,
        `Benchmark: Top-quartile SaaS and e-commerce scale-ups target a fully loaded CAC payback period under 12 months with an LTV-to-CAC ratio exceeding 3.0×.`,
      ],
      chart: {
        type: "donut",
        title: "Customer Acquisition Cost Expenditure Breakdown",
        format: "usd0",
        data: [
          { name: "Paid Advertising Media", value: Math.round(ads), color: "#0284c7" },
          { name: "Sales & Marketing Payroll", value: Math.round(salaries), color: "#10b981" },
          { name: "Software Tools & Agency Fees", value: Math.round(tech), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function CacCalculatorComponent() {
  return <CalcEngine config={cacConfig} />;
}
