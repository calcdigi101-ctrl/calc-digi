"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const commuteCostConfig: CalcConfig = {
  id: "commute-cost-calculator",
  title: "Daily Commuting Expense, Highway Tolls, Fuel and Vehicle Maintenance Calculator",
  fields: [
    {
      kind: "number",
      key: "oneWayDistance",
      label: "One-Way Commute Distance (Miles)",
      default: 22.0,
      min: 1.0,
      max: 200.0,
    },
    {
      kind: "number",
      key: "commuteDaysPerWeek",
      label: "In-Office Work Days Per Week",
      default: 5,
      min: 1,
      max: 7,
    },
    {
      kind: "number",
      key: "vehicleMpg",
      label: "Vehicle Fuel Economy (MPG)",
      default: 26.0,
      min: 5.0,
      max: 120.0,
    },
    {
      kind: "number",
      key: "fuelPricePerGallon",
      label: "Fuel Price Per Gallon ($)",
      default: 3.65,
      min: 1.0,
      max: 10.0,
    },
    {
      kind: "number",
      key: "dailyTollsParking",
      label: "Daily Highway Tolls & Parking Fees ($)",
      default: 4.50,
      min: 0.0,
      max: 100.0,
    },
    {
      kind: "choice",
      key: "includeMaintenance",
      label: "Include Wear & Tear / Maintenance Depreciation",
      default: "yes",
      options: [
        { label: "Yes - Full Cost (IRS wear/tire factor ~0.15$/mi)", value: "yes" },
        { label: "No - Direct Fuel & Tolls Only", value: "no" },
      ],
    },
  ],
  compute: (vals) => {
    const oneWay = Math.max(0.5, Number(vals.oneWayDistance) || 22.0);
    const daysPerWeek = Math.min(7, Math.max(1, Number(vals.commuteDaysPerWeek) || 5));
    const mpg = Math.max(5, Number(vals.vehicleMpg) || 26.0);
    const gasPrice = Number(vals.fuelPricePerGallon) || 3.65;
    const tolls = Number(vals.dailyTollsParking) || 4.50;
    const incWear = String(vals.includeMaintenance || "yes") === "yes";

    const dailyMiles = oneWay * 2;
    const dailyGallons = dailyMiles / mpg;
    const dailyFuelCost = dailyGallons * gasPrice;
    const dailyWearCost = incWear ? dailyMiles * 0.15 : 0;
    const dailyTotal = dailyFuelCost + tolls + dailyWearCost;

    // Monthly (approx 4.33 weeks per month) & Annual (approx 50 work weeks / 250 days)
    const annualWorkDays = daysPerWeek * 50;
    const annualMiles = dailyMiles * annualWorkDays;
    const annualFuel = dailyFuelCost * annualWorkDays;
    const annualTolls = tolls * annualWorkDays;
    const annualWear = dailyWearCost * annualWorkDays;
    const annualTotal = dailyTotal * annualWorkDays;
    const monthlyTotal = annualTotal / 12;

    return {
      hero: {
        label: "Monthly Total Commute Cost",
        value: `$${monthlyTotal.toFixed(2)}`,
      },
      badge: {
        text: `$${annualTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}/year (${annualMiles.toLocaleString()} commute miles)`,
        tone: monthlyTotal > 300 ? "warn" : "good",
      },
      secondary: [
        {
          label: "Daily Round-Trip Commute Cost",
          value: `$${dailyTotal.toFixed(2)} / day`,
        },
        {
          label: "Annual Fuel Only Expenditure",
          value: `$${annualFuel.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${Math.round(annualMiles / mpg)} gallons)`,
        },
        {
          label: "Annual Tolls & Parking Fees",
          value: `$${annualTolls.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        },
        {
          label: "Vehicle Wear & Tear Depreciation",
          value: `$${annualWear.toLocaleString(undefined, { maximumFractionDigits: 0 })} ($0.15/mile)`,
        },
      ],
      steps: [
        `Daily Round-Trip Distance = ${oneWay} miles * 2 = ${dailyMiles} miles/day`,
        `Daily Fuel Consumed = ${dailyMiles} miles / ${mpg} MPG = ${dailyGallons.toFixed(2)} gallons ($${dailyFuelCost.toFixed(2)})`,
        `Daily Total Outlay = Fuel ($${dailyFuelCost.toFixed(2)}) + Tolls/Park ($${tolls.toFixed(2)}) + Wear ($${dailyWearCost.toFixed(2)}) = $${dailyTotal.toFixed(2)}`,
        `Annual Budget (${daysPerWeek} days/wk * 50 wks = ${annualWorkDays} days) = $${dailyTotal.toFixed(2)} * ${annualWorkDays} = $${annualTotal.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Annual Commuting Expense Allocation",
        format: "usd0",
        data: [
          { name: "Direct Gasoline Fuel ($)", value: Math.round(annualFuel), color: "#0ea5e9" },
          { name: "Highway Tolls & Parking ($)", value: Math.round(annualTolls), color: "#f59e0b" },
          { name: "Vehicle Wear & Maintenance ($)", value: Math.max(1, Math.round(annualWear)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function CommuteCostCalculatorComponent() {
  return <CalcEngine config={commuteCostConfig} />;
}
