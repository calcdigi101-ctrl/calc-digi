"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";
import { pmt } from "@/lib/finance";

export const config: CalcConfig = {
  id: "rent-vs-buy",
  title: "Rent vs Buy Calculator",
  fields: [
    {
      kind: "choice",
      key: "statePreset",
      label: "US State Tax & Closing Cost Preset",
      default: "us",
      options: [
        { value: "us", label: "US National Average (1.02% tax · 3.0% closing)" },
        { value: "ca", label: "California (0.71% Prop 13 tax · 2.5% closing)" },
        { value: "tx", label: "Texas (1.68% property tax · 2.0% closing)" },
        { value: "ny", label: "New York (1.73% tax · 4.5% high closing)" },
        { value: "fl", label: "Florida (0.91% tax · 2.5% closing)" },
        { value: "nj", label: "New Jersey (2.23% tax · 3.5% closing)" },
        { value: "il", label: "Illinois (2.08% tax · 3.0% closing)" },
      ],
    },
    { kind: "number", key: "homePrice", label: "Home purchase price", prefix: "$", default: 420000, min: 50000, max: 10000000 },
    { kind: "number", key: "monthlyRent", label: "Monthly rent (comparable home)", prefix: "$", default: 2400, min: 200, max: 50000 },
    { kind: "number", key: "downPayment", label: "Down payment cash", prefix: "$", default: 84000, min: 0, max: 5000000 },
    { kind: "number", key: "interestRate", label: "Mortgage interest rate", suffix: "%", default: 6.75, min: 1, max: 20 },
    {
      kind: "choice",
      key: "horizon",
      label: "Planned years living in home",
      default: "7",
      options: [
        { value: "3", label: "3 Years (Short-term)" },
        { value: "5", label: "5 Years (Standard transitional)" },
        { value: "7", label: "7 Years (National median ownership)" },
        { value: "10", label: "10 Years (Long-term)" },
        { value: "15", label: "15 Years (Permanent family home)" },
      ],
    },
    { kind: "number", key: "appreciation", label: "Annual home appreciation", suffix: "%", default: 3.5, min: -5, max: 15 },
    { kind: "number", key: "rentGrowth", label: "Annual rent inflation", suffix: "%", default: 3.0, min: 0, max: 15 },
    { kind: "number", key: "investReturn", label: "Investment return on cash (S&P 500)", suffix: "%", default: 7.0, min: 0, max: 20 },
  ],
  compute: (v) => {
    const price = Number(v.homePrice || 420000);
    const rentStart = Number(v.monthlyRent || 2400);
    const down = Number(v.downPayment || 84000);
    const years = Number(v.horizon || 7);
    const rateAnnual = Number(v.interestRate || 6.75) / 100;
    const rateMonthly = rateAnnual / 12;
    const appreciationRate = Number(v.appreciation || 3.5) / 100;
    const rentGrowthRate = Number(v.rentGrowth || 3.0) / 100;
    const investReturnRate = Number(v.investReturn || 7.0) / 100;

    if (price <= 0 || rentStart <= 0) {
      return { error: "Please enter valid home price and monthly rent amounts." };
    }

    const loanAmount = Math.max(0, price - down);
    const totalMonths = 360;
    const monthlyPI = loanAmount > 0 ? pmt(loanAmount, rateMonthly, totalMonths) : 0;

    const STATE_CONFIG: Record<string, { taxPct: number; closingPct: number }> = {
      us: { taxPct: 1.02, closingPct: 3.0 },
      ca: { taxPct: 0.71, closingPct: 2.5 },
      tx: { taxPct: 1.68, closingPct: 2.0 },
      ny: { taxPct: 1.73, closingPct: 4.5 },
      fl: { taxPct: 0.91, closingPct: 2.5 },
      nj: { taxPct: 2.23, closingPct: 3.5 },
      il: { taxPct: 2.08, closingPct: 3.0 },
    };
    const stateKey = String(v.statePreset || "us");
    const { taxPct, closingPct } = STATE_CONFIG[stateKey] || STATE_CONFIG.us;

    const monthlyTaxInsuranceMaint = (price * ((taxPct / 100) + 0.005 + 0.008)) / 12;
    const initialBuyingMonthly = monthlyPI + monthlyTaxInsuranceMaint;

    // Simulation over the horizon years
    let cumulativeRentPaid = 0;
    let currentMonthlyRent = rentStart;
    let renterInvestPortfolio = down + (price * (closingPct / 100)); // Down payment + closing costs invested in index fund

    let loanBalance = loanAmount;
    let cumulativeInterestPaid = 0;
    let cumulativeTaxMaintPaid = 0;

    for (let yr = 1; yr <= years; yr++) {
      for (let m = 1; m <= 12; m++) {
        // Rent track
        cumulativeRentPaid += currentMonthlyRent;
        // Renter investment growth
        renterInvestPortfolio *= (1 + investReturnRate / 12);

        // Buy track
        if (loanBalance > 0) {
          const interestM = loanBalance * rateMonthly;
          const principalM = monthlyPI - interestM;
          loanBalance = Math.max(0, loanBalance - principalM);
          cumulativeInterestPaid += interestM;
        }
        cumulativeTaxMaintPaid += monthlyTaxInsuranceMaint;
      }
      currentMonthlyRent *= (1 + rentGrowthRate);
    }

    const futureHomeValue = price * Math.pow(1 + appreciationRate, years);
    const sellingCost = futureHomeValue * 0.06; // 6% broker commission at resale
    const buyerNetEquity = futureHomeValue - loanBalance - sellingCost;

    const netAdvantageOfBuying = buyerNetEquity - renterInvestPortfolio;
    const isBuyingBetter = netAdvantageOfBuying > 0;
    const priceToRentRatio = price / (rentStart * 12);

    // Approximate breakeven years
    const breakevenYears = priceToRentRatio < 16 ? "3 to 4 years" : priceToRentRatio < 21 ? "5 to 6 years" : "7 to 9 years";

    return {
      hero: {
        label: isBuyingBetter ? "Buying financial advantage" : "Renting financial advantage",
        value: usd0(Math.abs(netAdvantageOfBuying)),
        unit: `after ${years} years`,
        sub: isBuyingBetter
          ? `Home equity accumulated: ${usd0(buyerNetEquity)} vs Renter portfolio: ${usd0(renterInvestPortfolio)}`
          : `Renter portfolio: ${usd0(renterInvestPortfolio)} vs Home equity: ${usd0(buyerNetEquity)}`,
      },
      badge: {
        text: isBuyingBetter ? `Buying Wins by Year ${years}` : `Renting Wins over ${years}-Year Horizon`,
        tone: isBuyingBetter ? "good" : "warn",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: `Buyer Net Equity (${years} yrs)`, value: Number(Math.max(0, buyerNetEquity).toFixed(0)), color: "#10b981" },
          { name: `Renter Investment Portfolio (${years} yrs)`, value: Number(renterInvestPortfolio.toFixed(0)), color: "#2563eb" },
        ],
      },
      rows: [
        { label: "Price-to-Rent Ratio", value: `${priceToRentRatio.toFixed(1)} (${priceToRentRatio < 16 ? "Strong Buy" : priceToRentRatio < 20 ? "Neutral" : "Favors Renting"})`, strong: true },
        { label: "Estimated Breakeven Point", value: breakevenYears, strong: true },
        { label: "Future Estimated Home Value", value: usd0(futureHomeValue) },
        { label: "Remaining Mortgage Balance", value: usd0(loanBalance) },
        { label: "Buyer Net Equity (After 6% Selling Costs)", value: usd0(buyerNetEquity) },
        { label: "Renter Investment Portfolio (7% Return)", value: usd0(renterInvestPortfolio) },
        { label: "Cumulative Rent Paid Outflow", value: usd0(cumulativeRentPaid) },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Price-to-Rent Benchmark:</strong> A price-to-rent ratio under 15 indicates purchasing is mathematically superior. A ratio above 21 indicates renting and investing the down payment surplus builds wealth faster.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function RentVsBuyCalculator() {
  return <CalcEngine config={config} />;
}
