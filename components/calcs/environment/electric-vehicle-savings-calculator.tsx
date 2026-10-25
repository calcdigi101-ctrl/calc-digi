"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "electric-vehicle-savings-calc",
  title: "Electric Vehicle (EV) vs Gasoline Cost & Carbon Savings Calculator",
  presets: [
    {
      label: "Average Commuter (13.5k mi, $3.65 Gas)",
      values: {
        annualMiles: 13500,
        gasMpg: 28,
        gasPrice: 3.65,
        evEfficiency: 30,
        elecRate: 0.16,
        annualMaintSavings: 450,
        purchasePriceDelta: 4500,
        taxIncentive: 7500,
      },
    },
    {
      label: "Highway Commuter (22k mi, High Savings)",
      values: {
        annualMiles: 22000,
        gasMpg: 25,
        gasPrice: 3.85,
        evEfficiency: 28,
        elecRate: 0.15,
        annualMaintSavings: 650,
        purchasePriceDelta: 6000,
        taxIncentive: 7500,
      },
    },
    {
      label: "California Market ($4.95 Gas, $0.28 kWh)",
      values: {
        annualMiles: 14000,
        gasMpg: 27,
        gasPrice: 4.95,
        evEfficiency: 29,
        elecRate: 0.28,
        annualMaintSavings: 500,
        purchasePriceDelta: 5000,
        taxIncentive: 7500,
      },
    },
    {
      label: "Solar Rooftop Charging ($0.06/kWh)",
      values: {
        annualMiles: 15000,
        gasMpg: 30,
        gasPrice: 3.55,
        evEfficiency: 28,
        elecRate: 0.06,
        annualMaintSavings: 450,
        purchasePriceDelta: 5000,
        taxIncentive: 7500,
      },
    },
    {
      label: "Used EV / Budget Sedan ($0 Premium)",
      values: {
        annualMiles: 12000,
        gasMpg: 32,
        gasPrice: 3.45,
        evEfficiency: 26,
        elecRate: 0.14,
        annualMaintSavings: 400,
        purchasePriceDelta: 0,
        taxIncentive: 4000,
      },
    },
  ],
  fields: [
    {
      kind: "number",
      key: "annualMiles",
      label: "Annual Driving Distance (miles/year)",
      default: 13500,
      min: 1000,
      max: 100000,
      hint: "Average US driver drives 13,500 to 14,200 miles annually (FHWA)",
    },
    {
      kind: "number",
      key: "gasMpg",
      label: "Gasoline Vehicle Fuel Economy (MPG)",
      default: 28,
      min: 10,
      max: 65,
      hint: "Comparison vehicle miles per gallon (sedan ~28-32 MPG, SUV ~22-26 MPG)",
    },
    {
      kind: "number",
      key: "gasPrice",
      label: "Gasoline Price ($ / gallon)",
      default: 3.65,
      min: 1.0,
      max: 10.0,
      hint: "Current regular unleaded pump price in your area",
    },
    {
      kind: "number",
      key: "evEfficiency",
      label: "EV Efficiency Rating (kWh per 100 miles)",
      default: 30,
      min: 15,
      max: 55,
      hint: "Sedans average ~26-28 kWh/100mi; electric trucks average ~42-48 kWh/100mi",
    },
    {
      kind: "number",
      key: "elecRate",
      label: "Residential Electricity Rate ($ / kWh)",
      default: 0.16,
      min: 0.03,
      max: 0.6,
      hint: "Your home utility electric tariff per kilowatt-hour",
    },
    {
      kind: "number",
      key: "annualMaintSavings",
      label: "Annual Maintenance Savings ($ / year)",
      default: 450,
      min: 0,
      max: 2000,
      hint: "EVs eliminate engine oil changes, spark plugs, belts, and brake wear via regenerative braking",
    },
    {
      kind: "number",
      key: "purchasePriceDelta",
      label: "Upfront EV Purchase Price Premium ($)",
      default: 4500,
      min: -15000,
      max: 50000,
      hint: "How much more the EV costs upfront compared to the equivalent gas car",
    },
    {
      kind: "number",
      key: "taxIncentive",
      label: "Federal & State EV Tax Credits / Rebates ($)",
      default: 7500,
      min: 0,
      max: 15000,
      hint: "Federal IRA Clean Vehicle Credit (up to $7,500 new, $4,000 used) plus local state rebates",
    },
  ],
  compute: (vals) => {
    const annualMiles = Number(vals.annualMiles) || 0;
    const gasMpg = Math.max(1, Number(vals.gasMpg) || 28);
    const gasPrice = Number(vals.gasPrice) || 0;
    const evEfficiency = Number(vals.evEfficiency) || 30;
    const elecRate = Number(vals.elecRate) || 0;
    const annualMaintSavings = Number(vals.annualMaintSavings) || 0;
    const purchasePriceDelta = Number(vals.purchasePriceDelta) || 0;
    const taxIncentive = Number(vals.taxIncentive) || 0;

    const gallonsNeeded = annualMiles / gasMpg;
    const annualGasCost = gallonsNeeded * gasPrice;

    const annualKwhUsed = (annualMiles * evEfficiency) / 100;
    const annualEvFuelCost = annualKwhUsed * elecRate;

    const annualFuelSavings = annualGasCost - annualEvFuelCost;
    const totalAnnualOperatingSavings = annualFuelSavings + annualMaintSavings;

    const netUpfrontCost = purchasePriceDelta - taxIncentive;

    let paybackYears = 0;
    if (netUpfrontCost <= 0) {
      paybackYears = 0;
    } else if (totalAnnualOperatingSavings > 0) {
      paybackYears = netUpfrontCost / totalAnnualOperatingSavings;
    } else {
      paybackYears = 99;
    }

    const fiveYearSavings = totalAnnualOperatingSavings * 5 - netUpfrontCost;
    const tenYearSavings = totalAnnualOperatingSavings * 10 - netUpfrontCost;

    const gasCo2MT = (gallonsNeeded * 8.887) / 1000;
    const evCo2MT = (annualKwhUsed * 0.386) / 1000;
    const netCo2SavedMT = Math.max(0, gasCo2MT - evCo2MT);

    const isBeneficial = totalAnnualOperatingSavings > 0;

    return {
      hero: {
        value: `$${totalAnnualOperatingSavings.toFixed(0)} / yr`,
        label: "Annual Operating Savings",
        sub: `$${annualFuelSavings.toFixed(0)} fuel savings + $${annualMaintSavings.toFixed(0)} maintenance savings`,
      },
      badge: {
        text: netUpfrontCost <= 0 ? "Day-1 Savings" : `Breakeven in ${paybackYears.toFixed(1)} Yrs`,
        tone: isBeneficial ? "good" : "warn",
      },
      chart: {
        type: "donut",
        title: "Annual Operating Spend vs Savings",
        data: [
          { name: `Fuel Savings ($${annualFuelSavings.toFixed(0)})`, value: Math.max(1, Math.round(annualFuelSavings)), color: "#10b981" },
          { name: `Maint Savings ($${annualMaintSavings.toFixed(0)})`, value: Math.max(1, Math.round(annualMaintSavings)), color: "#06b6d4" },
          { name: `EV Charging ($${annualEvFuelCost.toFixed(0)})`, value: Math.max(1, Math.round(annualEvFuelCost)), color: "#3b82f6" },
        ],
        format: "usd0",
      },
      rows: [
        { label: "Gas Vehicle Fuel Cost", value: `$${annualGasCost.toFixed(2)} (${gallonsNeeded.toFixed(0)} gal)` },
        { label: "EV Electricity Cost", value: `$${annualEvFuelCost.toFixed(2)} (${annualKwhUsed.toFixed(0)} kWh)` },
        { label: "Annual Fuel Savings", value: `$${annualFuelSavings.toFixed(2)} / year`, strong: true },
        { label: "Maintenance Savings", value: `$${annualMaintSavings.toFixed(2)} / year` },
        { label: "Net Upfront Premium", value: netUpfrontCost <= 0 ? "$0 (Credits exceed premium)" : `$${netUpfrontCost.toFixed(2)}` },
        { label: "Payback Period", value: netUpfrontCost <= 0 ? "Immediate (0.0 years)" : `${paybackYears.toFixed(1)} years` },
        { label: "5-Year Net Wealth Gain", value: `$${fiveYearSavings.toFixed(2)}`, strong: true },
        { label: "10-Year Net Wealth Gain", value: `$${tenYearSavings.toFixed(2)}` },
        { label: "Annual CO2 Abatement", value: `${netCo2SavedMT.toFixed(2)} metric tons CO2 / yr` },
      ],
      steps: [
        `Gasoline consumption: (${annualMiles} miles / ${gasMpg} MPG) * $${gasPrice.toFixed(2)}/gal = $${annualGasCost.toFixed(2)} annual gas expense.`,
        `EV electricity consumption: [(${annualMiles} miles * ${evEfficiency} kWh) / 100] * $${elecRate.toFixed(2)}/kWh = $${annualEvFuelCost.toFixed(2)} charging expense.`,
        `Operating savings: ($${annualGasCost.toFixed(2)} gas - $${annualEvFuelCost.toFixed(2)} EV) + $${annualMaintSavings.toFixed(2)} maintenance = $${totalAnnualOperatingSavings.toFixed(2)} saved per year.`,
        `5-Year net total: ($${totalAnnualOperatingSavings.toFixed(2)} * 5) - ($${purchasePriceDelta} premium - $${taxIncentive} credits) = $${fiveYearSavings.toFixed(2)} net profit.`,
      ],
      note: {
        text: "Federal IRA Section 30D tax credits offer up to $7,500 at point of sale, substantially lowering initial acquisition costs for qualifying EV models.",
      },
    };
  },
};

export default function ElectricVehicleSavingsCalculator() {
  return <CalcEngine config={config} />;
}
