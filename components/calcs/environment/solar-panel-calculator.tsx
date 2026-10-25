"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "solar-panel-calc",
  title: "Rooftop Solar Panel System Size, Cost, ITC & Payback Calculator",
  presets: [
    { label: "Sun Belt (5.8 Peak Sun Hrs)", values: { monthlyKwh: 1100, sunHours: 5.8, elecRate: 0.15, costPerWatt: 2.85, itcPercent: 30, panelWatts: 400 } },
    { label: "Midwest Suburban (4.5 Sun Hrs)", values: { monthlyKwh: 900, sunHours: 4.5, elecRate: 0.17, costPerWatt: 2.95, itcPercent: 30, panelWatts: 400 } },
    { label: "Northeast High Tariff ($0.26/kWh)", values: { monthlyKwh: 750, sunHours: 4.0, elecRate: 0.26, costPerWatt: 3.10, itcPercent: 30, panelWatts: 400 } },
    { label: "High-Consumption + EV (1,500 kWh)", values: { monthlyKwh: 1500, sunHours: 4.8, elecRate: 0.18, costPerWatt: 2.80, itcPercent: 30, panelWatts: 410 } },
    { label: "Energy-Efficient Cottage (500 kWh)", values: { monthlyKwh: 500, sunHours: 4.6, elecRate: 0.16, costPerWatt: 3.20, itcPercent: 30, panelWatts: 400 } },
  ],
  fields: [
    {
      kind: "number",
      key: "monthlyKwh",
      label: "Average Monthly Electricity Usage (kWh/month)",
      default: 900,
      min: 100,
      max: 10000,
      hint: "Check your past 12 electric bills; US national average is ~889 kWh/month",
    },
    {
      kind: "number",
      key: "sunHours",
      label: "Average Peak Sun Hours per Day (hours/day)",
      default: 4.5,
      min: 2.0,
      max: 8.0,
      hint: "NREL solar insolation equivalent (4.0-4.5 in Midwest, 5.5-6.5 in Southwest)",
    },
    {
      kind: "number",
      key: "elecRate",
      label: "Utility Electricity Rate ($ / kWh)",
      default: 0.17,
      min: 0.05,
      max: 0.6,
      hint: "Average utility tariff (blended generation + transmission per kWh)",
    },
    {
      kind: "number",
      key: "costPerWatt",
      label: "Turnkey Installation Cost ($ / Watt DC)",
      default: 2.95,
      min: 1.5,
      max: 5.0,
      hint: "National turnkey average installed cost is ~$2.80 - $3.20 per watt before incentives",
    },
    {
      kind: "number",
      key: "itcPercent",
      label: "Federal Residential Clean Energy Credit (ITC %)",
      default: 30,
      min: 0,
      max: 50,
      hint: "Federal Section 25D Investment Tax Credit (ITC) offers a 30% tax credit through 2032",
    },
    {
      kind: "number",
      key: "panelWatts",
      label: "Individual Solar Panel Rating (Watts)",
      default: 400,
      min: 300,
      max: 550,
      hint: "Standard modern monocrystalline residential panel is 390W - 420W",
    },
  ],
  compute: (vals) => {
    const monthlyKwh = Number(vals.monthlyKwh) || 0;
    const sunHours = Math.max(1, Number(vals.sunHours) || 4.5);
    const elecRate = Number(vals.elecRate) || 0;
    const costPerWatt = Number(vals.costPerWatt) || 2.95;
    const itcPercent = Number(vals.itcPercent) || 30;
    const panelWatts = Math.max(200, Number(vals.panelWatts) || 400);

    const derateFactor = 0.82;
    const dailyKWhNeeded = monthlyKwh / 30.4167;
    const systemSizeKW = dailyKWhNeeded / (sunHours * derateFactor);

    const totalWattsNeeded = systemSizeKW * 1000;
    const panelCount = Math.ceil(totalWattsNeeded / panelWatts);
    const actualSystemKW = (panelCount * panelWatts) / 1000;

    const annualGenerationKWh = actualSystemKW * sunHours * 365.25 * derateFactor;

    const annualBillSavings = annualGenerationKWh * elecRate;
    const monthlyBillSavings = annualBillSavings / 12;

    const grossSystemCost = actualSystemKW * 1000 * costPerWatt;
    const federalTaxCredit = grossSystemCost * (itcPercent / 100);
    const netSystemCost = grossSystemCost - federalTaxCredit;

    const paybackYears = annualBillSavings > 0 ? netSystemCost / annualBillSavings : 99;

    let cumulativeSavings25 = 0;
    let currentRate = elecRate;
    let currentYearGen = annualGenerationKWh;
    for (let yr = 1; yr <= 25; yr++) {
      cumulativeSavings25 += currentYearGen * currentRate;
      currentYearGen *= 0.995;
      currentRate *= 1.025;
    }
    const net25YearProfit = cumulativeSavings25 - netSystemCost;
    const roi25Percent = (net25YearProfit / netSystemCost) * 100;

    const annualCo2OffsetMT = (annualGenerationKWh * 0.386) / 1000;
    const lifetimeCo2OffsetMT = annualCo2OffsetMT * 25 * 0.94;

    const isFavorable = paybackYears <= 10;

    return {
      hero: {
        value: `${actualSystemKW.toFixed(1)} kW DC`,
        label: "Recommended Solar Array",
        sub: `${panelCount} Panels (${panelWatts}W) · $${annualBillSavings.toFixed(0)}/yr Utility Savings`,
      },
      badge: {
        text: `Payback in ${paybackYears.toFixed(1)} Yrs`,
        tone: isFavorable ? "good" : "warn",
      },
      chart: {
        type: "donut",
        title: "Capital & Incentive Allocation",
        data: [
          { name: `Net Investment ($${Math.round(netSystemCost).toLocaleString()})`, value: Math.max(1, Math.round(netSystemCost)), color: "#10b981" },
          { name: `30% Federal Credit ($${Math.round(federalTaxCredit).toLocaleString()})`, value: Math.max(1, Math.round(federalTaxCredit)), color: "#06b6d4" },
          { name: `Year 1 Savings ($${Math.round(annualBillSavings).toLocaleString()})`, value: Math.max(1, Math.round(annualBillSavings)), color: "#f59e0b" },
        ],
        format: "usd0",
      },
      rows: [
        { label: "Recommended System Size", value: `${actualSystemKW.toFixed(2)} kW DC (${(actualSystemKW * 1000).toFixed(0)} W)`, strong: true },
        { label: "Required Solar Panels", value: `${panelCount} panels (${panelWatts}W)` },
        { label: "Annual Clean Generation", value: `${Math.round(annualGenerationKWh).toLocaleString()} kWh / year` },
        { label: "Annual Utility Savings", value: `$${annualBillSavings.toFixed(2)} / yr ($${monthlyBillSavings.toFixed(2)}/mo)`, strong: true },
        { label: "Gross Turnkey Cost", value: `$${grossSystemCost.toFixed(2)}` },
        { label: "30% Federal ITC Credit", value: `-$${federalTaxCredit.toFixed(2)}` },
        { label: "Net Solar Investment", value: `$${netSystemCost.toFixed(2)}`, strong: true },
        { label: "Simple Payback Period", value: `${paybackYears.toFixed(1)} years` },
        { label: "25-Year Net Financial Gain", value: `$${net25YearProfit.toFixed(2)} (${roi25Percent.toFixed(0)}% ROI)`, strong: true },
        { label: "25-Year Carbon Offset", value: `${lifetimeCo2OffsetMT.toFixed(1)} metric tons CO2e` },
      ],
      steps: [
        `Daily requirement: ${monthlyKwh} kWh / 30.42 days = ${dailyKWhNeeded.toFixed(2)} kWh/day.`,
        `Size DC array: ${dailyKWhNeeded.toFixed(2)} kWh / (${sunHours} peak sun hrs * 0.82 derate factor) = ${systemSizeKW.toFixed(2)} kW target size.`,
        `Panel count: (${systemSizeKW.toFixed(2)} kW * 1000) / ${panelWatts}W = ${panelCount} panels (yielding ${actualSystemKW.toFixed(2)} kW).`,
        `Capital & incentives: ${actualSystemKW.toFixed(2)} kW * 1000 W * $${costPerWatt.toFixed(2)}/W = $${grossSystemCost.toFixed(2)} gross - $${federalTaxCredit.toFixed(2)} (30% ITC) = $${netSystemCost.toFixed(2)} net.`,
        `Simple payback: $${netSystemCost.toFixed(2)} net cost / $${annualBillSavings.toFixed(2)} annual savings = ${paybackYears.toFixed(1)} years.`,
      ],
      note: {
        text: "The federal Section 25D 30% tax credit directly reduces tax liability dollar-for-dollar without a maximum cap, substantially reducing the barrier to clean renewable energy.",
      },
    };
  },
};

export default function SolarPanelCalculator() {
  return <CalcEngine config={config} />;
}
