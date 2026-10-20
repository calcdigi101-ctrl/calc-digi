"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";
import { pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "refinance",
  title: "Mortgage Refinance Calculator",
  fields: [
    { kind: "number", key: "balance", label: "Current remaining mortgage balance", prefix: "$", default: 320000, min: 20000, max: 10000000 },
    { kind: "number", key: "currentRate", label: "Current mortgage interest rate", suffix: "%", default: 7.25, min: 1, max: 20 },
    { kind: "number", key: "remainingYears", label: "Remaining loan term", suffix: "years", default: 27, min: 1, max: 30 },
    { kind: "number", key: "newRate", label: "New refinance interest rate", suffix: "%", default: 5.75, min: 1, max: 20 },
    {
      kind: "choice",
      key: "newTerm",
      label: "New mortgage term",
      default: "30",
      segmented: true,
      options: [
        { value: "30", label: "30-Year" },
        { value: "20", label: "20-Year" },
        { value: "15", label: "15-Year" },
      ],
    },
    { kind: "number", key: "closingCosts", label: "Refinance closing costs", prefix: "$", default: 5500, min: 500, max: 50000 },
    {
      kind: "choice",
      key: "rollCosts",
      label: "Roll closing costs into new loan?",
      default: "yes",
      segmented: true,
      options: [
        { value: "yes", label: "Roll Into Loan" },
        { value: "no", label: "Pay Upfront Out-of-Pocket" },
      ],
    },
    { kind: "number", key: "cashOut", label: "Cash-out amount (Optional)", prefix: "$", default: 0, min: 0, max: 1000000, optional: true },
  ],
  compute: (v) => {
    const curBalance = Number(v.balance || 320000);
    const curRateAnnual = Number(v.currentRate || 7.25) / 100;
    const curRateMonthly = curRateAnnual / 12;
    const curMonths = Number(v.remainingYears || 27) * 12;

    const newRateAnnual = Number(v.newRate || 5.75) / 100;
    const newRateMonthly = newRateAnnual / 12;
    const newMonths = Number(v.newTerm || 30) * 12;

    const closingCosts = Number(v.closingCosts || 5500);
    const rollCosts = v.rollCosts === "yes";
    const cashOut = Number(v.cashOut || 0);

    if (curBalance <= 0) {
      return { error: "Please enter a valid mortgage balance greater than zero." };
    }

    // Existing monthly payment and remaining total payments
    const curMonthlyPI = pmt(curBalance, curRateMonthly, curMonths);
    const curTotalRemainingPayments = curMonthlyPI * curMonths;
    const curRemainingInterest = curTotalRemainingPayments - curBalance;

    // New loan balance
    const newLoanPrincipal = curBalance + (rollCosts ? closingCosts : 0) + cashOut;
    const newMonthlyPI = pmt(newLoanPrincipal, newRateMonthly, newMonths);
    const newTotalPayments = newMonthlyPI * newMonths;
    const newTotalInterest = newTotalPayments - newLoanPrincipal;

    const monthlySavings = curMonthlyPI - newMonthlyPI;
    const isMonthlyLower = monthlySavings > 0;

    // Total net lifetime savings = Current remaining total outflow - (New total outflow + upfront fees if paid cash)
    const upfrontOutOfPocket = rollCosts ? 0 : closingCosts;
    const lifetimeSavings = curTotalRemainingPayments - (newTotalPayments + upfrontOutOfPocket) + cashOut;

    // Breakeven period in months
    const breakevenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;
    const breakevenYears = (breakevenMonths / 12).toFixed(1);

    return {
      hero: {
        label: isMonthlyLower ? "Monthly payment savings" : "Monthly payment change",
        value: isMonthlyLower ? `Save ${usd0(monthlySavings)}/mo` : `+${usd0(Math.abs(monthlySavings))}/mo`,
        unit: isMonthlyLower ? `(Breakeven: ${breakevenMonths} mos)` : "",
        sub: isMonthlyLower
          ? `Current P&I: ${usd0(curMonthlyPI)}/mo → New P&I: ${usd0(newMonthlyPI)}/mo`
          : `Higher monthly payment due to shortening term to ${v.newTerm} years`,
      },
      badge: {
        text: breakevenMonths > 0 && breakevenMonths <= 36 ? `Fast Breakeven (${breakevenMonths} mos)` : breakevenMonths > 36 ? `Longer Breakeven (${breakevenMonths} mos)` : "Shorter Loan Term",
        tone: breakevenMonths > 0 && breakevenMonths <= 36 ? "good" : "info",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "New Monthly P&I Payment", value: Number(newMonthlyPI.toFixed(0)), color: "#10b981" },
          ...(monthlySavings > 0 ? [{ name: "Monthly Payment Savings", value: Number(monthlySavings.toFixed(0)), color: "#2563eb" }] : []),
          { name: "Closing Costs Spread (Monthly)", value: Number((closingCosts / Math.max(1, breakevenMonths)).toFixed(0)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "New Monthly P&I Payment", value: `${usd0(newMonthlyPI)}/mo`, strong: true },
        { label: "Monthly Payment Savings", value: isMonthlyLower ? `+${usd0(monthlySavings)}/mo` : `-${usd0(Math.abs(monthlySavings))}/mo`, strong: true },
        { label: "Breakeven Horizon", value: breakevenMonths > 0 ? `${breakevenMonths} months (~${breakevenYears} years)` : "Immediate / N/A" },
        { label: "Lifetime Total Interest Saved", value: usd0(lifetimeSavings), strong: true },
        { label: "New Total Loan Principal", value: usd0(newLoanPrincipal) },
        { label: "Estimated Closing Costs", value: usd0(closingCosts) },
        ...(cashOut > 0 ? [{ label: "Cash-Out Liquid Proceeds", value: usd0(cashOut) }] : []),
      ],
      note: {
        text: (
          <span>
            💡 <strong>The 36-Month Rule:</strong> A refinance makes compelling financial sense if you can recover your closing costs within 36 months (3 years) and plan to remain in your home longer than that breakeven horizon.
          </span>
        ),
        tone: "good",
      },
    };
  },
};

export default function RefinanceCalculator() {
  return <CalcEngine config={config} />;
}
