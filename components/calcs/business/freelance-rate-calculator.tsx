"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const freelanceRateConfig: CalcConfig = {
  id: "freelance-rate-calculator",
  title: "Freelance & Consulting Hourly Rate Calculator",
  fields: [
    {
      kind: "number",
      key: "targetIncome",
      label: "Target Annual Take-Home Net Income ($)",
      default: 95000,
      min: 1000,
      max: 5000000,
    },
    {
      kind: "number",
      key: "businessExpenses",
      label: "Annual Business Operating Expenses ($)",
      default: 14000,
      min: 0,
      max: 500000,
    },
    {
      kind: "number",
      key: "taxBufferPct",
      label: "Self-Employment & Income Tax Buffer (%)",
      default: 30,
      min: 5,
      max: 60,
    },
    {
      kind: "number",
      key: "vacationWeeks",
      label: "Non-Working Weeks (Vacation, Holidays, Sick)",
      default: 4,
      min: 0,
      max: 20,
    },
    {
      kind: "number",
      key: "billableHoursPerWeek",
      label: "Billable Client Hours Per Week",
      default: 25,
      min: 1,
      max: 60,
    },
  ],
  compute(vals) {
    const netTarget = Number(vals.targetIncome) || 95000;
    const expenses = Number(vals.businessExpenses) || 14000;
    const taxRate = Number(vals.taxBufferPct) || 30;
    const timeOffWeeks = Number(vals.vacationWeeks) || 4;
    const billableHrsPerWeek = Number(vals.billableHoursPerWeek) || 25;

    // Gross revenue needed before taxes: Gross = (Net Target / (1 - TaxRate)) + Business Expenses
    const pretaxIncomeNeeded = netTarget / (1 - taxRate / 100);
    const grossRevenueNeeded = pretaxIncomeNeeded + expenses;
    const taxLiability = pretaxIncomeNeeded - netTarget;

    const workingWeeks = Math.max(1, 52 - timeOffWeeks);
    const totalBillableHoursYear = workingWeeks * billableHrsPerWeek;

    const hourlyRate = totalBillableHoursYear > 0 ? grossRevenueNeeded / totalBillableHoursYear : 0;
    const dayRate = hourlyRate * 8;
    const weeklyTarget = hourlyRate * billableHrsPerWeek;

    return {
      hero: {
        label: "Required Minimum Hourly Rate",
        value: `$${Math.ceil(hourlyRate)} / hr`,
      },
      badge: {
        text: `Day Rate: $${Math.ceil(dayRate).toLocaleString()} / day`,
        tone: "good",
      },
      rows: [
        { label: "Target Gross Annual Billings", value: `$${Math.round(grossRevenueNeeded).toLocaleString()} / year` },
        { label: "Weekly Revenue Target", value: `$${Math.round(weeklyTarget).toLocaleString()} / active week` },
        { label: "Total Annual Billable Hours", value: `${Math.round(totalBillableHoursYear).toLocaleString()} hrs (${workingWeeks} weeks @ ${billableHrsPerWeek} hrs/wk)` },
        { label: "Self-Employment & Income Taxes", value: `$${Math.round(taxLiability).toLocaleString()} (${taxRate}%)` },
        { label: "Business Expenses & Software", value: `$${Math.round(expenses).toLocaleString()}` },
        { label: "Net Take-Home Personal Pay", value: `$${Math.round(netTarget).toLocaleString()}` },
      ],
      steps: [
        `Pre-Tax Income Needed for $${netTarget.toLocaleString()} Take-Home = $${netTarget.toLocaleString()} / (1 - ${taxRate}%) = $${Math.round(pretaxIncomeNeeded).toLocaleString()}`,
        `Gross Annual Billings Required = Pre-Tax ($${Math.round(pretaxIncomeNeeded).toLocaleString()}) + Expenses ($${expenses.toLocaleString()}) = $${Math.round(grossRevenueNeeded).toLocaleString()}`,
        `Total Annual Billable Hours = (52 weeks - ${timeOffWeeks} weeks off) × ${billableHrsPerWeek} billable hrs/wk = ${totalBillableHoursYear} hours`,
        `Minimum Hourly Rate = $${Math.round(grossRevenueNeeded).toLocaleString()} / ${totalBillableHoursYear} hrs = $${hourlyRate.toFixed(2)}/hr (Round up to $${Math.ceil(hourlyRate)}/hr)`,
        `Standard 8-Hour Day Rate = $${Math.ceil(hourlyRate)} × 8 = $${Math.ceil(dayRate).toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Gross Consulting Revenue Allocation",
        format: "usd0",
        data: [
          { name: "Take-Home Personal Pay", value: Math.round(netTarget), color: "#10b981" },
          { name: "Tax Reserve Fund", value: Math.round(taxLiability), color: "#ef4444" },
          { name: "Business Operating Costs", value: Math.round(expenses), color: "#0284c7" },
        ],
      },
    };
  },
};

export default function FreelanceRateCalculatorComponent() {
  return <CalcEngine config={freelanceRateConfig} />;
}
