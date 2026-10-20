"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "down-payment",
  title: "Down Payment Calculator",
  fields: [
    { kind: "number", key: "price", label: "Target home purchase price", prefix: "$", default: 400000, min: 20000, max: 10000000 },
    {
      kind: "choice",
      key: "tier",
      label: "Down payment percentage tier",
      default: "20",
      segmented: true,
      options: [
        { value: "3", label: "3% (First-Time)" },
        { value: "3.5", label: "3.5% (FHA)" },
        { value: "5", label: "5% (Conv)" },
        { value: "10", label: "10% (Standard)" },
        { value: "20", label: "20% (No PMI)" },
      ],
    },
    { kind: "number", key: "currentSavings", label: "Current cash savings", prefix: "$", default: 15000, min: 0, max: 2000000 },
    { kind: "number", key: "monthlySave", label: "Monthly savings capacity", prefix: "$", default: 1200, min: 50, max: 50000 },
    { kind: "number", key: "savingsApy", label: "High-yield savings APY", suffix: "%", default: 4.5, min: 0, max: 15, optional: true },
    { kind: "number", key: "closingCostsPct", label: "Closing costs estimate", suffix: "%", default: 3.0, min: 1, max: 6, optional: true },
  ],
  compute: (v) => {
    const price = Number(v.price || 400000);
    const downPct = Number(v.tier || 20);
    const currentCash = Number(v.currentSavings || 0);
    const monthlyDeposit = Number(v.monthlySave || 1200);
    const apy = Number(v.savingsApy || 4.5) / 100;
    const closingCostsPct = Number(v.closingCostsPct || 3.0) / 100;

    if (price <= 0 || monthlyDeposit <= 0) {
      return { error: "Please enter valid price and monthly savings amounts." };
    }

    const downPaymentAmount = price * (downPct / 100);
    const closingCostsAmount = price * closingCostsPct;
    const totalCashNeeded = downPaymentAmount + closingCostsAmount;
    const remainingToSave = Math.max(0, totalCashNeeded - currentCash);

    // Calculate months to reach target with compound APY
    const monthlyRate = apy / 12;
    let monthsToGoal = 0;
    let balance = currentCash;

    if (balance < totalCashNeeded) {
      while (balance < totalCashNeeded && monthsToGoal < 360) {
        monthsToGoal++;
        balance = (balance + monthlyDeposit) * (1 + monthlyRate);
      }
    }

    const yearsToGoal = (monthsToGoal / 12).toFixed(1);

    // PMI calculation: typically 0.5% - 1.0% of loan amount per year if LTV > 80%
    const loanAmount = price - downPaymentAmount;
    const isPmiRequired = downPct < 20;
    const annualPmi = isPmiRequired ? loanAmount * 0.0075 : 0;
    const monthlyPmi = annualPmi / 12;

    return {
      hero: {
        label: "Total cash to close",
        value: usd0(totalCashNeeded),
        unit: `(Down: ${usd0(downPaymentAmount)})`,
        sub: monthsToGoal > 0 ? `Target reached in ${monthsToGoal} months (${yearsToGoal} years) at ${usd0(monthlyDeposit)}/mo` : "You have already met your cash savings target!",
      },
      badge: {
        text: isPmiRequired ? `PMI: ~${usd0(monthlyPmi)}/mo (Under 20% Down)` : "Zero PMI Required (20%+ Down)",
        tone: isPmiRequired ? "warn" : "good",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: `Down Payment (${downPct}%)`, value: Number(downPaymentAmount.toFixed(0)), color: "#2563eb" },
          { name: "Closing Costs (3% Est)", value: Number(closingCostsAmount.toFixed(0)), color: "#f59e0b" },
          ...(isPmiRequired ? [{ name: "Annual PMI Premium", value: Number(annualPmi.toFixed(0)), color: "#ef4444" }] : []),
        ],
      },
      rows: [
        { label: `Down Payment (${downPct}%)`, value: usd0(downPaymentAmount), strong: true },
        { label: "Estimated Closing Costs (Title, Lender, Escrow)", value: usd0(closingCostsAmount) },
        { label: "Total Cash Required on Closing Day", value: usd0(totalCashNeeded), strong: true },
        { label: "Current Cash Already Saved", value: usd0(currentCash) },
        { label: "Net Cash Remaining to Save", value: usd0(remainingToSave) },
        { label: "Months to Reach Goal (Compound Interest)", value: `${monthsToGoal} months (~${yearsToGoal} yrs)` },
        { label: "Private Mortgage Insurance (PMI)", value: isPmiRequired ? `${usd0(monthlyPmi)}/mo` : "$0 (Eliminated)", strong: true },
      ],
      note: {
        text: (
          <span>
            💡 <strong>PMI Rule:</strong> Putting 20% down eliminates Private Mortgage Insurance entirely. If putting 3% to 5% down, PMI automatically drops off when your loan balance reaches 78% of the original purchase price.
          </span>
        ),
        tone: isPmiRequired ? "info" : "good",
      },
    };
  },
};

export default function DownPaymentCalculator() {
  return <CalcEngine config={config} />;
}
