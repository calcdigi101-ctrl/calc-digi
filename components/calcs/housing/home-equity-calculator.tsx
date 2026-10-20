"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "equity",
  title: "Home Equity Calculator",
  fields: [
    { kind: "number", key: "homeValue", label: "Estimated current home market value", prefix: "$", default: 480000, min: 50000, max: 10000000 },
    { kind: "number", key: "mortgageBalance", label: "Remaining primary mortgage balance", prefix: "$", default: 260000, min: 0, max: 10000000 },
    { kind: "number", key: "secondMortgage", label: "Existing 2nd mortgage / HELOC balance", prefix: "$", default: 0, min: 0, max: 5000000, optional: true },
    {
      kind: "choice",
      key: "cltvCap",
      label: "Maximum lender borrowing cap (CLTV)",
      default: "85",
      segmented: true,
      options: [
        { value: "80", label: "80% (Conservative / No PMI)" },
        { value: "85", label: "85% (Industry Standard)" },
        { value: "90", label: "90% (Credit Union Max)" },
      ],
    },
    { kind: "number", key: "drawAmount", label: "Planned cash draw amount", prefix: "$", default: 50000, min: 1000, max: 2000000, optional: true },
    { kind: "number", key: "helocRate", label: "Estimated HELOC interest rate", suffix: "%", default: 8.5, min: 1, max: 20, optional: true },
  ],
  compute: (v) => {
    const val = Number(v.homeValue || 480000);
    const m1 = Number(v.mortgageBalance || 260000);
    const m2 = Number(v.secondMortgage || 0);
    const totalDebt = m1 + m2;
    const cltvLimitPct = Number(v.cltvCap || 85) / 100;
    const draw = Number(v.drawAmount || 50000);
    const helocRate = Number(v.helocRate || 8.5) / 100 / 12;

    if (val <= 0) {
      return { error: "Please enter a valid estimated home market value." };
    }

    const totalEquity = Math.max(0, val - totalDebt);
    const equityPct = (totalEquity / val) * 100;
    const currentLtv = (totalDebt / val) * 100;

    // Max loan allowable by bank at CLTV cap
    const maxTotalLoanAllowed = val * cltvLimitPct;
    const maxBorrowableEquity = Math.max(0, maxTotalLoanAllowed - totalDebt);
    const protectedEquity = val - maxTotalLoanAllowed;

    // Estimated monthly interest-only payment on planned draw
    const monthlyInterestOnly = draw * helocRate;
    // 15-year amortizing repayment
    const monthlyAmortized = (draw * helocRate * Math.pow(1 + helocRate, 180)) / (Math.pow(1 + helocRate, 180) - 1);

    return {
      hero: {
        label: "Usable borrowing equity",
        value: usd0(maxBorrowableEquity),
        unit: `(Total Equity: ${usd0(totalEquity)})`,
        sub: `Based on an ${(cltvLimitPct * 100).toFixed(0)}% maximum Combined Loan-to-Value (CLTV) limit`,
      },
      badge: {
        text: equityPct >= 20 ? `${equityPct.toFixed(1)}% Total Equity Accumulated` : `Low Equity (${equityPct.toFixed(1)}%)`,
        tone: equityPct >= 20 ? "good" : "warn",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Primary Mortgage Lien", value: Number(m1.toFixed(0)), color: "#2563eb" },
          ...(m2 > 0 ? [{ name: "2nd Mortgage / HELOC", value: Number(m2.toFixed(0)), color: "#8b5cf6" }] : []),
          { name: `Usable Borrowing Equity (${(cltvLimitPct * 100).toFixed(0)}% Cap)`, value: Number(maxBorrowableEquity.toFixed(0)), color: "#10b981" },
          { name: `Protected Equity Buffer (${((1 - cltvLimitPct) * 100).toFixed(0)}%)`, value: Number(protectedEquity.toFixed(0)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Total Accumulated Home Equity", value: `${usd0(totalEquity)} (${equityPct.toFixed(1)}% of value)`, strong: true },
        { label: `Max Usable HELOC / Loan Cash (${(cltvLimitPct * 100).toFixed(0)}% CLTV)`, value: usd0(maxBorrowableEquity), strong: true },
        { label: "Current Loan-to-Value (LTV)", value: `${currentLtv.toFixed(1)}%` },
        { label: "Total Existing Debt on Home", value: usd0(totalDebt) },
        { label: "Protected Equity Cushion (Untouchable)", value: usd0(protectedEquity) },
        { label: `Est. Interest-Only Payment on ${usd0(draw)} Draw`, value: `${usd0(monthlyInterestOnly)}/mo (at ${(helocRate * 12 * 100).toFixed(2)}%)` },
        { label: `Est. 15-Yr Principal + Interest on ${usd0(draw)} Draw`, value: `${usd0(monthlyAmortized)}/mo` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Tax Deductibility Note:</strong> Under current IRS guidelines (Tax Cuts and Jobs Act), interest paid on HELOCs or home equity loans is only tax-deductible if the proceeds are used specifically to buy, build, or substantially improve the home securing the loan.
          </span>
        ),
        tone: "good",
      },
    };
  },
};

export default function HomeEquityCalculator() {
  return <CalcEngine config={config} />;
}
