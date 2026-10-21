"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "smoking-cost",
  title: "Smoking Cost & Wealth Calculator",
  fields: [
    {
      kind: "number",
      key: "cigsPerDay",
      label: "Cigarettes smoked per day",
      suffix: "cigs",
      default: 20,
      min: 1,
      max: 100,
      integer: true,
      hint: "Standard pack contains 20 cigarettes.",
    },
    {
      kind: "number",
      key: "pricePerPack",
      label: "Price per pack",
      prefix: "$",
      default: 9.0,
      min: 2,
      max: 40,
      hint: "National US average is $8–$11; high-tax states exceed $14/pack.",
    },
    {
      kind: "number",
      key: "yearsSmoked",
      label: "Years you have smoked",
      suffix: "years",
      default: 5,
      min: 0,
      max: 60,
      integer: true,
    },
    {
      kind: "number",
      key: "returnRate",
      label: "Investment compounding rate",
      suffix: "%",
      default: 7.0,
      min: 0,
      max: 15,
      hint: "Historical inflation-adjusted real return of the S&P 500 index.",
    },
  ],
  compute: (v) => {
    const cigs = Math.max(1, Number(v.cigsPerDay || 20));
    const packPrice = Math.max(1, Number(v.pricePerPack || 9.0));
    const yearsPast = Math.max(0, Number(v.yearsSmoked || 5));
    const r = Math.max(0.001, Number(v.returnRate || 7.0) / 100);

    const packsPerDay = cigs / 20;
    const dailyCost = packsPerDay * packPrice;
    const monthlyCost = dailyCost * 30.4375;
    const annualCost = dailyCost * 365;

    const totalPastSpent = annualCost * yearsPast;

    // Future compound value of an annuity paid at the beginning of each year:
    // FV = P * ((1 + r)^n - 1) / r * (1 + r)
    const calcFv = (n: number) => {
      return annualCost * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    };

    const fv10 = Math.round(calcFv(10));
    const fv20 = Math.round(calcFv(20));
    const fv30 = Math.round(calcFv(30));

    const direct10 = Math.round(annualCost * 10);
    const direct20 = Math.round(annualCost * 20);
    const direct30 = Math.round(annualCost * 30);

    const fmtUSD = (amt: number) => `$${Math.round(amt).toLocaleString()}`;

    return {
      hero: {
        label: "Annual Smoking Expenditure",
        value: fmtUSD(annualCost),
        unit: "/ yr",
        sub: `Total Historical Outflow: ${fmtUSD(totalPastSpent)} (${yearsPast} yrs) | 10-Yr Compounded Wealth: ${fmtUSD(fv10)}`,
      },
      badge: { text: `${packsPerDay.toFixed(1)} Pack/Day Habit (${fmtUSD(dailyCost)}/day)`, tone: "warn" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Direct Cigarette Cash (10 Yrs)", value: direct10, color: "#ef4444" },
          { name: "Compounded Compound Growth", value: Math.max(0, fv10 - direct10), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Annual Cash Burn", value: fmtUSD(annualCost), strong: true },
        { label: "Monthly Cash Burn", value: fmtUSD(monthlyCost), strong: true },
        { label: "Daily Cost of Cigarettes", value: fmtUSD(dailyCost) },
        { label: `Total Historical Spend (${yearsPast} yrs)`, value: fmtUSD(totalPastSpent), strong: true },
        { label: "10-Year Invested Opportunity (7% S&P 500)", value: `${fmtUSD(fv10)} (Direct: ${fmtUSD(direct10)})`, strong: true },
        { label: "20-Year Invested Opportunity", value: `${fmtUSD(fv20)} (Direct: ${fmtUSD(direct20)})`, strong: true },
        { label: "30-Year Retirement Portfolio Value", value: `${fmtUSD(fv30)} (Direct: ${fmtUSD(direct30)})`, strong: true },
        { label: "Cigarettes Smoked Annually", value: `${Math.round(cigs * 365).toLocaleString()} cigarettes` },
      ],
      note: {
        text: (
          <span>
            💵 <strong>The Power of Compounding:</strong> Quitting smoking and redirecting a $9/day habit into a broad-market index fund generates over <strong>${Math.round(fv20).toLocaleString()}</strong> in 20 years, turning a toxic expenditure into financial independence.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function SmokingCostCalculator() {
  return <CalcEngine config={config} />;
}
