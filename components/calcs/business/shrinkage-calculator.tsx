"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const shrinkageConfig: CalcConfig = {
  id: "shrinkage-calculator",
  title: "Inventory Shrinkage Calculator",
  fields: [
    {
      kind: "number",
      key: "recordedInventory",
      label: "Recorded Book Inventory Value ($)",
      default: 450000,
      min: 100,
      max: 100000000,
    },
    {
      kind: "number",
      key: "actualInventory",
      label: "Physical Audit Inventory Value ($)",
      default: 434250,
      min: 0,
      max: 100000000,
    },
    {
      kind: "number",
      key: "annualSales",
      label: "Total Net Retail Sales ($)",
      default: 1200000,
      min: 1000,
      max: 1000000000,
    },
    {
      kind: "choice",
      key: "primaryDriver",
      label: "Loss Assessment Model",
      default: "standard_retail",
      options: [
        { label: "Standard Retail Benchmark (NRF 37% Shoplift, 29% Employee)", value: "standard_retail" },
        { label: "Warehouse & Logistics (Heavy Spoilage / Damage)", value: "warehouse_damage" },
        { label: "Electronic / High Theft (55% External Theft)", value: "high_theft" },
      ],
    },
  ],
  compute(vals) {
    const bookVal = Math.max(1, Number(vals.recordedInventory) || 450000);
    const auditVal = Math.max(0, Number(vals.actualInventory) || 0);
    const sales = Math.max(1, Number(vals.annualSales) || 1200000);
    const model = String(vals.primaryDriver || "standard_retail");

    const shrinkageDollars = Math.max(0, bookVal - auditVal);
    const shrinkagePctInventory = (shrinkageDollars / bookVal) * 100;
    const shrinkagePctSales = (shrinkageDollars / sales) * 100;

    let shopliftSplit = 0.37;
    let employeeSplit = 0.29;
    let adminSplit = 0.21;
    let vendorSplit = 0.13;

    if (model === "high_theft") {
      shopliftSplit = 0.55;
      employeeSplit = 0.25;
      adminSplit = 0.12;
      vendorSplit = 0.08;
    } else if (model === "warehouse_damage") {
      shopliftSplit = 0.15;
      employeeSplit = 0.20;
      adminSplit = 0.35;
      vendorSplit = 0.30;
    }

    const shopliftingDollars = shrinkageDollars * shopliftSplit;
    const employeeTheftDollars = shrinkageDollars * employeeSplit;
    const adminErrorDollars = shrinkageDollars * adminSplit;
    const vendorFraudDollars = shrinkageDollars * vendorSplit;

    const isHigh = shrinkagePctSales > 2.0;

    return {
      hero: {
        label: "Total Shrinkage Loss",
        value: `$${shrinkageDollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
      badge: {
        text: shrinkagePctSales <= 1.4 ? "Optimal Control" : isHigh ? "High Shrinkage Risk" : "Moderate Risk",
        tone: shrinkagePctSales <= 1.4 ? "good" : isHigh ? "bad" : "warn",
      },
      secondary: [
        {
          label: "Shrinkage Rate (% of Sales)",
          value: `${shrinkagePctSales.toFixed(2)}%`,
        },
        {
          label: "Shrinkage (% of Book Inventory)",
          value: `${shrinkagePctInventory.toFixed(2)}%`,
        },
        {
          label: "Estimated External Shoplifting",
          value: `$${shopliftingDollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
          label: "Internal Employee Theft",
          value: `$${employeeTheftDollars.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
      ],
      steps: [
        `Book Value Discrepancy = $${bookVal.toLocaleString()} (Book) - $${auditVal.toLocaleString()} (Physical Audit) = $${shrinkageDollars.toLocaleString()} Shrinkage`,
        `Inventory Shrinkage % = ($${shrinkageDollars.toLocaleString()} / $${bookVal.toLocaleString()}) * 100 = ${shrinkagePctInventory.toFixed(2)}%`,
        `Retail Shrinkage % of Sales = ($${shrinkageDollars.toLocaleString()} / $${sales.toLocaleString()}) * 100 = ${shrinkagePctSales.toFixed(2)}% (National Avg: ~1.4% to 1.6%)`,
        `Estimated Losses: Shoplifting ($${shopliftingDollars.toLocaleString()}), Employee Theft ($${employeeTheftDollars.toLocaleString()}), Admin Error ($${adminErrorDollars.toLocaleString()})`,
      ],
      chart: {
        type: "donut",
        title: "Shrinkage Loss Root Cause Decomposition",
        format: "usd0",
        data: [
          { name: "External Theft / Shoplifting", value: Math.round(shopliftingDollars), color: "#ef4444" },
          { name: "Internal Employee Theft", value: Math.round(employeeTheftDollars), color: "#f97316" },
          { name: "Administrative & Paperwork Errors", value: Math.round(adminErrorDollars), color: "#3b82f6" },
          { name: "Vendor Fraud & Transit Spoilage", value: Math.round(vendorFraudDollars), color: "#8b5cf6" },
        ],
      },
    };
  },
};

export default function ShrinkageCalculatorComponent() {
  return <CalcEngine config={shrinkageConfig} />;
}
