"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "property-tax",
  title: "Property Tax Calculator",
  fields: [
    {
      kind: "choice",
      key: "statePreset",
      label: "US State Benchmark Preset",
      default: "custom",
      options: [
        { value: "custom", label: "Custom / Manual County Rate" },
        { value: "nj", label: "New Jersey (2.23% · Highest)" },
        { value: "il", label: "Illinois (2.08% · High)" },
        { value: "tx", label: "Texas (1.68% · No Income Tax)" },
        { value: "us", label: "US National Average (1.02%)" },
        { value: "fl", label: "Florida (0.91% · Save Our Homes)" },
        { value: "ca", label: "California (0.71% · Prop 13)" },
        { value: "hi", label: "Hawaii (0.32% · Lowest)" },
      ],
    },
    { kind: "number", key: "homeValue", label: "Estimated home market value", prefix: "$", default: 425000, min: 10000, max: 20000000 },
    { kind: "number", key: "taxRate", label: "Property tax rate (e.g. 1.15% = 11.5 mills)", suffix: "%", default: 1.15, min: 0.05, max: 10 },
    { kind: "number", key: "assessmentRatio", label: "County assessment ratio (% of market value)", suffix: "%", default: 100, min: 10, max: 100 },
    { kind: "number", key: "exemption", label: "Homestead or senior exemption deducted", prefix: "$", default: 25000, min: 0, max: 500000, optional: true },
  ],
  compute: (v) => {
    const marketValue = Number(v.homeValue || 425000);
    const STATE_RATES: Record<string, number> = {
      nj: 2.23,
      il: 2.08,
      tx: 1.68,
      us: 1.02,
      fl: 0.91,
      ca: 0.71,
      hi: 0.32,
    };
    const presetKey = String(v.statePreset || "custom");
    const taxRate = STATE_RATES[presetKey] ?? Number(v.taxRate || 1.15);
    const assessmentRatio = Number(v.assessmentRatio || 100);
    const exemption = Number(v.exemption || 0);

    if (marketValue <= 0 || taxRate <= 0) {
      return { error: "Please enter a valid home value and property tax rate greater than zero." };
    }

    const assessedValue = marketValue * (assessmentRatio / 100);
    const taxableAssessedValue = Math.max(0, assessedValue - exemption);
    const annualTax = taxableAssessedValue * (taxRate / 100);
    const monthlyTax = annualTax / 12;
    const effectiveTaxRate = (annualTax / marketValue) * 100;
    const millRate = taxRate * 10; // 1% = 10 mills ($10 per $1,000)

    // Budget allocation breakdown
    const schoolTax = annualTax * 0.48;
    const countyTax = annualTax * 0.32;
    const municipalTax = annualTax * 0.20;

    let badgeText = "Moderate / Near US Average (1.0% - 1.8%)";
    let badgeTone: "good" | "info" | "warn" = "info";

    if (effectiveTaxRate < 1.0) {
      badgeText = "Low Tax Burden (< 1.0% Effective Rate)";
      badgeTone = "good";
    } else if (effectiveTaxRate > 1.8) {
      badgeText = "High Tax Burden (> 1.8% Effective Rate)";
      badgeTone = "warn";
    }

    return {
      hero: {
        label: "Annual property tax",
        value: `${usd0(annualTax)}/yr`,
        unit: `(${usd0(monthlyTax)}/mo in escrow)`,
        sub: `Effective rate: ${effectiveTaxRate.toFixed(2)}% on ${usd0(marketValue)} market value (${millRate.toFixed(1)} mills)`,
      },
      badge: {
        text: badgeText,
        tone: badgeTone,
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Public School District (48%)", value: Number(schoolTax.toFixed(0)), color: "#2563eb" },
          { name: "County Health & Roads (32%)", value: Number(countyTax.toFixed(0)), color: "#06b6d4" },
          { name: "City Police & Emergency (20%)", value: Number(municipalTax.toFixed(0)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Estimated Monthly Tax Escrow", value: `${usd0(monthlyTax)}/mo`, strong: true },
        { label: "Net Taxable Assessed Value", value: usd0(taxableAssessedValue), strong: true },
        { label: "Gross Assessed Value", value: usd0(assessedValue) },
        { label: "Homestead Exemption Deducted", value: usd0(exemption) },
        { label: "Equivalent Millage Rate", value: `${millRate.toFixed(1)} mills ($ per $1,000)` },
        { label: "Effective Tax Rate on Market Value", value: `${effectiveTaxRate.toFixed(2)}%` },
        { label: "Annual Public School Share", value: usd0(schoolTax) },
        { label: "Annual County & Infrastructure Share", value: usd0(countyTax) },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Homestead Exemption & Escrow Notice:</strong> Filing an official primary residence homestead exemption can shield $25,000 to $50,000+ of assessed value from taxation each year. Mortgage lenders collect 1/12th of this total monthly plus an allowed 2-month escrow cushion under federal RESPA guidelines.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function PropertyTaxCalculator() {
  return <CalcEngine config={config} />;
}
