"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const evSavingsConfig: CalcConfig = {
  id: "ev-savings-calculator",
  title: "Electric Vehicle Fuel Savings, Charging Costs and Operating Payback Calculator",
  fields: [
    {
      kind: "number",
      key: "annualMiles",
      label: "Annual Driving Mileage (Miles/Year)",
      default: 13500,
      min: 1000,
      max: 100000,
    },
    {
      kind: "number",
      key: "evEfficiency",
      label: "EV Energy Efficiency (Miles per kWh)",
      default: 3.5,
      min: 1.5,
      max: 6.0,
    },
    {
      kind: "number",
      key: "homeElectricityRate",
      label: "Residential Home Electric Rate ($/kWh)",
      default: 0.16,
      min: 0.04,
      max: 0.80,
    },
    {
      kind: "number",
      key: "gasPrice",
      label: "Comparable Gasoline Price ($/Gallon)",
      default: 3.65,
      min: 1.50,
      max: 10.0,
    },
    {
      kind: "number",
      key: "gasVehicleMpg",
      label: "Comparable Gas Vehicle Fuel Economy (MPG)",
      default: 28.0,
      min: 10.0,
      max: 65.0,
    },
    {
      kind: "choice",
      key: "chargingModality",
      label: "Charging Location Mix",
      default: "home_mostly",
      options: [
        { label: "90% Home Charging / 10% DC Fast Charging ($0.42/kWh)", value: "home_mostly" },
        { label: "100% Home Level 2 Charging (Lowest Cost)", value: "home_only" },
        { label: "70% Home Charging / 30% Commercial Public Fast Charging", value: "mixed" },
        { label: "100% Public DC Fast Charging (Apartment / Urban Dweller)", value: "public_only" },
      ],
    },
  ],
  compute: (vals) => {
    const miles = Math.max(500, Number(vals.annualMiles) || 13500);
    const evEff = Math.max(1.0, Number(vals.evEfficiency) || 3.5);
    const homeRate = Number(vals.homeElectricityRate) || 0.16;
    const gasPrice = Number(vals.gasPrice) || 3.65;
    const gasMpg = Math.max(5.0, Number(vals.gasVehicleMpg) || 28.0);
    const chargingMix = String(vals.chargingModality || "home_mostly");

    // Effective electricity cost weighted by charging modality
    const fastChargeRate = 0.42;
    let effectiveKwhCost = homeRate;
    if (chargingMix === "home_mostly") {
      effectiveKwhCost = (homeRate * 0.90) + (fastChargeRate * 0.10);
    } else if (chargingMix === "mixed") {
      effectiveKwhCost = (homeRate * 0.70) + (fastChargeRate * 0.30);
    } else if (chargingMix === "public_only") {
      effectiveKwhCost = fastChargeRate;
    }

    // EV energy math
    const annualKwh = miles / evEff;
    const annualEvEnergyCost = annualKwh * effectiveKwhCost;
    const evCostPerMile = annualEvEnergyCost / miles;

    // ICE gas math
    const annualGasGallons = miles / gasMpg;
    const annualGasCost = annualGasGallons * gasPrice;
    const gasCostPerMile = annualGasCost / miles;

    // Net fuel savings
    const annualFuelSavings = annualGasCost - annualEvEnergyCost;
    const monthlyFuelSavings = annualFuelSavings / 12;

    // Avoided ICE maintenance bonus (oil changes, spark plugs, belts ~ $0.03/mi)
    const annualMaintSavings = miles * 0.03;
    const totalAnnualOperatingSavings = annualFuelSavings + annualMaintSavings;
    const fiveYearSavings = totalAnnualOperatingSavings * 5;

    return {
      hero: {
        label: "Net Annual Operating Savings",
        value: `$${Math.round(totalAnnualOperatingSavings).toLocaleString()}`,
      },
      badge: {
        text: `Save $${Math.round(annualFuelSavings).toLocaleString()} on fuel + $${Math.round(annualMaintSavings)} on maintenance/yr`,
        tone: "good",
      },
      secondary: [
        {
          label: "Annual EV Electricity Charging Cost",
          value: `$${Math.round(annualEvEnergyCost).toLocaleString()} (${Math.round(annualKwh).toLocaleString()} kWh)`,
        },
        {
          label: "Annual Equivalent Gasoline Cost",
          value: `$${Math.round(annualGasCost).toLocaleString()} (${Math.round(annualGasGallons).toLocaleString()} gallons)`,
        },
        {
          label: "Cost Per Mile Comparison",
          value: `$${evCostPerMile.toFixed(3)}/mi (EV) vs $${gasCostPerMile.toFixed(3)}/mi (Gas)`,
        },
        {
          label: "5-Year Cumulative Operating Advantage",
          value: `$${Math.round(fiveYearSavings).toLocaleString()} saved`,
        },
      ],
      steps: [
        `EV Energy Required = ${miles.toLocaleString()} miles / ${evEff} mi/kWh = ${Math.round(annualKwh).toLocaleString()} kWh/yr`,
        `EV Charging Cost (${miles} mi @ $${effectiveKwhCost.toFixed(3)}/kWh) = ${Math.round(annualKwh)} kWh * $${effectiveKwhCost.toFixed(3)} = $${annualEvEnergyCost.toFixed(2)}`,
        `Gasoline ICE Fuel Cost = (${miles} mi / ${gasMpg} MPG) * $${gasPrice.toFixed(2)} = ${annualGasGallons.toFixed(1)} gal * $${gasPrice.toFixed(2)} = $${annualGasCost.toFixed(2)}`,
        `Direct Net Fuel Savings = $${annualGasCost.toFixed(2)} - $${annualEvEnergyCost.toFixed(2)} = $${annualFuelSavings.toFixed(2)} per year ($${monthlyFuelSavings.toFixed(2)}/mo)`,
        `Total 5-Year Ownership Dividend = ($${annualFuelSavings.toFixed(2)} fuel + $${annualMaintSavings.toFixed(2)} maint) * 5 years = $${fiveYearSavings.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Annual Fuel & Maintenance Expenditure Breakdown",
        format: "usd0",
        data: [
          { name: "EV Electricity Cost ($)", value: Math.round(annualEvEnergyCost), color: "#0ea5e9" },
          { name: "Net Fuel Dollars Saved ($)", value: Math.max(0, Math.round(annualFuelSavings)), color: "#10b981" },
          { name: "Avoided ICE Maintenance ($)", value: Math.round(annualMaintSavings), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function EvSavingsCalculatorComponent() {
  return <CalcEngine config={evSavingsConfig} />;
}
