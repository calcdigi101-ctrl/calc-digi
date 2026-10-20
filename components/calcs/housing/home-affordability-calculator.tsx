"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";
import { pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "home-affordability",
  title: "Home Affordability Calculator",
  fields: [
    { kind: "number", key: "income", label: "Annual gross household income", prefix: "$", default: 110000, min: 10000, max: 5000000 },
    { kind: "number", key: "debts", label: "Monthly debt obligations", prefix: "$", hint: "Auto, student loans, credit cards", default: 500, min: 0, max: 50000 },
    { kind: "number", key: "down", label: "Available down payment cash", prefix: "$", default: 60000, min: 0, max: 2000000 },
    {
      kind: "choice",
      key: "term",
      label: "Mortgage loan term",
      default: "30",
      segmented: true,
      options: [
        { value: "30", label: "30-Year Fixed" },
        { value: "15", label: "15-Year Fixed" },
      ],
    },
    { kind: "number", key: "rate", label: "Mortgage interest rate", suffix: "%", default: 6.75, min: 1, max: 20 },
    {
      kind: "choice",
      key: "dtiTier",
      label: "Debt-to-Income (DTI) rule",
      default: "standard",
      options: [
        { value: "conservative", label: "Conservative 25/33% Rule (Low stress)" },
        { value: "standard", label: "Standard 28/36% Rule (Fannie Mae / Conventional)" },
        { value: "fha", label: "Flexible 31/43% Rule (FHA / VA Guidelines)" },
      ],
    },
    { kind: "number", key: "taxRate", label: "Annual property tax rate", suffix: "%", default: 1.2, min: 0.1, max: 5, optional: true },
    { kind: "number", key: "insurance", label: "Annual homeowners insurance", prefix: "$", default: 1400, min: 100, max: 20000, optional: true },
    { kind: "number", key: "hoa", label: "Monthly HOA dues", prefix: "$", default: 0, min: 0, max: 5000, optional: true },
  ],
  compute: (v) => {
    const annualIncome = Number(v.income || 110000);
    const monthlyIncome = annualIncome / 12;
    const monthlyDebts = Number(v.debts || 0);
    const downPayment = Number(v.down || 0);
    const termYears = Number(v.term || 30);
    const months = termYears * 12;
    const rate = Number(v.rate || 6.75) / 100 / 12;
    const taxRateMonthly = (Number(v.taxRate || 1.2) / 100) / 12;
    const monthlyInsurance = Number(v.insurance || 1400) / 12;
    const monthlyHoa = Number(v.hoa || 0);

    // DTI Multipliers
    let frontEndMax = 0.28;
    let backEndMax = 0.36;
    if (v.dtiTier === "conservative") {
      frontEndMax = 0.25;
      backEndMax = 0.33;
    } else if (v.dtiTier === "fha") {
      frontEndMax = 0.31;
      backEndMax = 0.43;
    }

    // 1. Max housing payment based on front-end limit
    const maxHousingByFront = monthlyIncome * frontEndMax;
    // 2. Max housing payment based on back-end limit minus existing debts
    const maxHousingByBack = (monthlyIncome * backEndMax) - monthlyDebts;

    const maxAllowableHousingPayment = Math.min(maxHousingByFront, maxHousingByBack);

    if (maxAllowableHousingPayment <= (monthlyInsurance + monthlyHoa)) {
      return {
        error: "Your existing monthly debts exceed the allowable limit for this income level. Lower debt obligations or increase down payment to qualify.",
      };
    }

    // Solve for maximum affordable loan and home price iteratively
    // PITI = P&I + (Price * taxRateMonthly) + Insurance + HOA
    // P&I = Loan * [r(1+r)^n / ((1+r)^n - 1)]
    // Loan = Price - DownPayment
    const pmtFactor = (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const netForPIandTax = maxAllowableHousingPayment - monthlyInsurance - monthlyHoa;

    // Price * (pmtFactor + taxRateMonthly) - DownPayment * pmtFactor = netForPIandTax
    const maxHomePrice = Math.max(0, (netForPIandTax + (downPayment * pmtFactor)) / (pmtFactor + taxRateMonthly));
    const maxLoanAmount = Math.max(0, maxHomePrice - downPayment);

    const actualMonthlyPI = maxLoanAmount * pmtFactor;
    const actualMonthlyTax = maxHomePrice * taxRateMonthly;
    const totalMonthlyHousingCost = actualMonthlyPI + actualMonthlyTax + monthlyInsurance + monthlyHoa;
    const downPaymentPct = maxHomePrice > 0 ? (downPayment / maxHomePrice) * 100 : 0;

    return {
      hero: {
        label: "Maximum affordable home",
        value: usd0(maxHomePrice),
        unit: `(Loan: ${usd0(maxLoanAmount)})`,
        sub: `Max total housing payment: ${usd0(totalMonthlyHousingCost)}/mo based on ${(frontEndMax * 100).toFixed(0)}/${(backEndMax * 100).toFixed(0)} DTI rule`,
      },
      badge: {
        text: downPaymentPct >= 20 ? "20%+ Down (No PMI Required)" : `${downPaymentPct.toFixed(1)}% Down Payment`,
        tone: downPaymentPct >= 20 ? "good" : "info",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Principal & Interest (Loan)", value: Number(actualMonthlyPI.toFixed(0)), color: "#2563eb" },
          { name: "Property Taxes", value: Number(actualMonthlyTax.toFixed(0)), color: "#f59e0b" },
          { name: "Homeowners Insurance", value: Number(monthlyInsurance.toFixed(0)), color: "#10b981" },
          ...(monthlyHoa > 0 ? [{ name: "HOA Dues", value: Number(monthlyHoa.toFixed(0)), color: "#8b5cf6" }] : []),
          { name: "Existing Debt Cushion", value: Number(monthlyDebts.toFixed(0)), color: "#64748b" },
        ],
      },
      rows: [
        { label: "Maximum Affordable Purchase Price", value: usd0(maxHomePrice), strong: true },
        { label: "Maximum Mortgage Loan Amount", value: usd0(maxLoanAmount), strong: true },
        { label: "Total Monthly Payment (PITI)", value: `${usd0(totalMonthlyHousingCost)}/mo`, strong: true },
        { label: "Principal & Interest Share", value: `${usd0(actualMonthlyPI)}/mo` },
        { label: "Estimated Monthly Property Taxes", value: `${usd0(actualMonthlyTax)}/mo` },
        { label: "Down Payment Applied", value: `${usd0(downPayment)} (${downPaymentPct.toFixed(1)}%)` },
        { label: "Front-End Housing Ratio", value: `${((totalMonthlyHousingCost / monthlyIncome) * 100).toFixed(1)}% (Max ${(frontEndMax * 100).toFixed(0)}%)` },
        { label: "Back-End Total Debt Ratio", value: `${(((totalMonthlyHousingCost + monthlyDebts) / monthlyIncome) * 100).toFixed(1)}% (Max ${(backEndMax * 100).toFixed(0)}%)` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Lender Rule Tip:</strong> Most mortgage lenders evaluate both ratios: your housing payment should stay under 28% of gross income, and your housing payment PLUS car loans, student loans, and credit cards must stay under 36%.
          </span>
        ),
        tone: "good",
      },
    };
  },
};

export default function HomeAffordabilityCalculator() {
  return <CalcEngine config={config} />;
}
