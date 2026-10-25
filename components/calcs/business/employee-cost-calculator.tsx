"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const employeeCostConfig: CalcConfig = {
  id: "employee-cost-calculator",
  title: "Employee Fully Loaded Cost & Burden Multiplier Calculator",
  fields: [
    {
      kind: "number",
      key: "baseSalary",
      label: "Annual Base Gross Salary ($)",
      default: 85000,
      min: 1000,
      max: 2000000,
    },
    {
      kind: "number",
      key: "healthInsurance",
      label: "Annual Employer Health & Dental Insurance ($)",
      default: 7200,
      min: 0,
      max: 100000,
    },
    {
      kind: "number",
      key: "retirementMatchPct",
      label: "Employer 401(k) / Pension Match (%)",
      default: 4.0,
      min: 0,
      max: 25,
    },
    {
      kind: "number",
      key: "payrollTaxPct",
      label: "Mandatory Employer Payroll Taxes (FICA, FUTA, SUTA) (%)",
      default: 8.65,
      min: 0,
      max: 25,
    },
    {
      kind: "number",
      key: "overheadToolsAnnual",
      label: "Workstation, Software & Office Overhead ($ / Year)",
      default: 6500,
      min: 0,
      max: 100000,
    },
  ],
  compute(vals) {
    const salary = Number(vals.baseSalary) || 85000;
    const health = Number(vals.healthInsurance) || 7200;
    const matchPct = Number(vals.retirementMatchPct) || 4.0;
    const taxPct = Number(vals.payrollTaxPct) || 8.65;
    const tools = Number(vals.overheadToolsAnnual) || 6500;

    const retirementDollar = salary * (matchPct / 100);
    const payrollTaxes = salary * (taxPct / 100);
    const totalBurden = health + retirementDollar + payrollTaxes + tools;
    const fullyLoadedCost = salary + totalBurden;
    const burdenMultiplier = salary > 0 ? fullyLoadedCost / salary : 1.0;

    // Working hours: 52 weeks * 40 hours = 2,080 hours; standard working ~1,920 billable hours
    const grossHourlyRate = salary / 2080;
    const loadedHourlyCost = fullyLoadedCost / 2080;

    return {
      hero: {
        label: "Total Fully Loaded Annual Cost",
        value: `$${Math.round(fullyLoadedCost).toLocaleString()} / yr`,
      },
      badge: {
        text: `${burdenMultiplier.toFixed(2)}x Overhead Burden Multiplier`,
        tone: "good",
      },
      rows: [
        { label: "Base Gross Salary", value: `$${Math.round(salary).toLocaleString()} (${((salary / fullyLoadedCost) * 100).toFixed(1)}% of Total)` },
        { label: "Total Employee Burden Surcharge", value: `+$${Math.round(totalBurden).toLocaleString()} (${((totalBurden / salary) * 100).toFixed(1)}% Burden)` },
        { label: "Employer Payroll Taxes (FICA/SUTA)", value: `$${Math.round(payrollTaxes).toLocaleString()} (${taxPct}%)` },
        { label: "Health & Benefits Package", value: `$${Math.round(health + retirementDollar).toLocaleString()}` },
        { label: "Equipment, Software & Workstation", value: `$${Math.round(tools).toLocaleString()}` },
        { label: "True Loaded Hourly Cost (2,080 hrs)", value: `$${loadedHourlyCost.toFixed(2)} / hr (Base: $${grossHourlyRate.toFixed(2)})` },
      ],
      steps: [
        `Mandatory Employer Payroll Taxes = $${salary.toLocaleString()} × ${taxPct}% = $${Math.round(payrollTaxes).toLocaleString()}`,
        `Employer 401(k) Match = $${salary.toLocaleString()} × ${matchPct}% = $${Math.round(retirementDollar).toLocaleString()}`,
        `Total Overhead Burden = Taxes ($${Math.round(payrollTaxes).toLocaleString()}) + Health ($${health.toLocaleString()}) + 401k ($${Math.round(retirementDollar).toLocaleString()}) + Tools ($${tools.toLocaleString()}) = $${Math.round(totalBurden).toLocaleString()}`,
        `Fully Loaded Cost = Base Salary ($${salary.toLocaleString()}) + Burden ($${Math.round(totalBurden).toLocaleString()}) = $${Math.round(fullyLoadedCost).toLocaleString()}`,
        `Burden Multiplier = $${Math.round(fullyLoadedCost).toLocaleString()} / $${salary.toLocaleString()} = ${burdenMultiplier.toFixed(2)}×`,
      ],
      chart: {
        type: "donut",
        title: "Fully Loaded Employment Cost Structure",
        format: "usd0",
        data: [
          { name: "Base Gross Salary", value: Math.round(salary), color: "#0284c7" },
          { name: "Health & Retirement Benefits", value: Math.round(health + retirementDollar), color: "#10b981" },
          { name: "Employer Payroll Taxes", value: Math.round(payrollTaxes), color: "#f59e0b" },
          { name: "Workstation & Tech Overhead", value: Math.round(tools), color: "#8b5cf6" },
        ],
      },
    };
  },
};

export default function EmployeeCostCalculatorComponent() {
  return <CalcEngine config={employeeCostConfig} />;
}
