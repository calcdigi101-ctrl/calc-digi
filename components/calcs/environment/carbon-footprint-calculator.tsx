"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "carbon-footprint-calc",
  title: "Annual Carbon Footprint & Greenhouse Gas Emissions Calculator",
  presets: [
    {
      label: "Average US Citizen (16.2 MT CO2e/yr)",
      values: {
        annualMiles: 13500,
        gasMpg: 26,
        shortFlights: 3,
        longFlights: 1,
        elecMonthlyKwh: 890,
        gasMonthlyTherms: 50,
        dietType: "average_omnivore",
        wasteRecycling: "average",
      },
    },
    {
      label: "Eco Urbanite (6.4 MT CO2e/yr)",
      values: {
        annualMiles: 4000,
        gasMpg: 45,
        shortFlights: 1,
        longFlights: 0,
        elecMonthlyKwh: 350,
        gasMonthlyTherms: 20,
        dietType: "vegetarian",
        wasteRecycling: "aggressive",
      },
    },
    {
      label: "Frequent Flyer (28.5 MT CO2e/yr)",
      values: {
        annualMiles: 20000,
        gasMpg: 22,
        shortFlights: 12,
        longFlights: 4,
        elecMonthlyKwh: 1400,
        gasMonthlyTherms: 85,
        dietType: "heavy_meat",
        wasteRecycling: "low",
      },
    },
    {
      label: "Solar Suburban (9.8 MT CO2e/yr)",
      values: {
        annualMiles: 11000,
        gasMpg: 32,
        shortFlights: 2,
        longFlights: 1,
        elecMonthlyKwh: 200,
        gasMonthlyTherms: 35,
        dietType: "pescatarian",
        wasteRecycling: "average",
      },
    },
    {
      label: "Global Average (4.7 MT CO2e/yr)",
      values: {
        annualMiles: 3000,
        gasMpg: 35,
        shortFlights: 0,
        longFlights: 0,
        elecMonthlyKwh: 250,
        gasMonthlyTherms: 15,
        dietType: "vegetarian",
        wasteRecycling: "aggressive",
      },
    },
  ],
  fields: [
    {
      kind: "number",
      key: "annualMiles",
      label: "Personal Vehicle Mileage (miles/year)",
      default: 13500,
      min: 0,
      max: 100000,
      hint: "Average US passenger car travels ~13,500 to 14,200 miles annually",
    },
    {
      kind: "number",
      key: "gasMpg",
      label: "Vehicle Fuel Economy (Miles Per Gallon - MPG)",
      default: 26,
      min: 10,
      max: 120,
      hint: "US passenger fleet average is ~25.4 MPG; hybrids exceed 45-55 MPG",
    },
    {
      kind: "number",
      key: "shortFlights",
      label: "Short-Haul Flights per Year (< 3 hours / under 1,000 miles)",
      default: 3,
      min: 0,
      max: 60,
      hint: "Flights under 3 hours (~0.22 MT CO2e per leg)",
    },
    {
      kind: "number",
      key: "longFlights",
      label: "Long-Haul Flights per Year (> 3 hours)",
      default: 1,
      min: 0,
      max: 30,
      hint: "Cross-country or international flights (~0.95 MT CO2e per leg)",
    },
    {
      kind: "number",
      key: "elecMonthlyKwh",
      label: "Monthly Electricity Consumption (kWh/month)",
      default: 890,
      min: 0,
      max: 10000,
      hint: "Average US home consumes ~889 kWh per month (EIA benchmark)",
    },
    {
      kind: "number",
      key: "gasMonthlyTherms",
      label: "Monthly Natural Gas Consumption (Therms/month)",
      default: 50,
      min: 0,
      max: 1000,
      hint: "Winter space heating and water heating; 1 therm = 100 cubic feet gas",
    },
    {
      kind: "choice",
      key: "dietType",
      label: "Primary Dietary Profile",
      default: "average_omnivore",
      options: [
        { value: "vegan", label: "Vegan (Plant-Based - ~1.5 MT CO2e/yr)" },
        { value: "vegetarian", label: "Vegetarian (Dairy & Eggs - ~1.7 MT CO2e/yr)" },
        { value: "pescatarian", label: "Pescatarian (Fish & Plants - ~1.9 MT CO2e/yr)" },
        { value: "average_omnivore", label: "Average Omnivore (Mixed - ~2.5 MT CO2e/yr)" },
        { value: "heavy_meat", label: "Heavy Meat (Daily Beef - ~3.3 MT CO2e/yr)" },
      ],
    },
    {
      kind: "choice",
      key: "wasteRecycling",
      label: "Household Waste & Recycling Habit",
      default: "average",
      options: [
        { value: "aggressive", label: "Zero-Waste & Composting (~0.3 MT CO2e/yr)" },
        { value: "average", label: "Average Curbside Recycling (~0.6 MT CO2e/yr)" },
        { value: "low", label: "Minimal / No Recycling (~1.1 MT CO2e/yr)" },
      ],
    },
  ],
  compute: (vals) => {
    const annualMiles = Number(vals.annualMiles) || 0;
    const gasMpg = Math.max(1, Number(vals.gasMpg) || 26);
    const shortFlights = Number(vals.shortFlights) || 0;
    const longFlights = Number(vals.longFlights) || 0;
    const elecMonthlyKwh = Number(vals.elecMonthlyKwh) || 0;
    const gasMonthlyTherms = Number(vals.gasMonthlyTherms) || 0;

    const vehicleCO2 = (annualMiles / gasMpg) * 0.008887;
    const flightsCO2 = shortFlights * 0.22 + longFlights * 0.95;
    const electricCO2 = elecMonthlyKwh * 12 * 0.000386;
    const gasCO2 = gasMonthlyTherms * 12 * 0.0053;

    const dietMap: Record<string, number> = {
      vegan: 1.5,
      vegetarian: 1.7,
      pescatarian: 1.9,
      average_omnivore: 2.5,
      heavy_meat: 3.3,
    };
    const dietCO2 = dietMap[String(vals.dietType || "average_omnivore")] || 2.5;

    const wasteMap: Record<string, number> = {
      aggressive: 0.3,
      average: 0.6,
      low: 1.1,
    };
    const wasteCO2 = wasteMap[String(vals.wasteRecycling || "average")] || 0.6;

    const totalCO2 = vehicleCO2 + flightsCO2 + electricCO2 + gasCO2 + dietCO2 + wasteCO2;
    const treesRequired = Math.ceil(totalCO2 / 0.022);

    const usAvg = 16.0;
    const percentVsUS = ((totalCO2 - usAvg) / usAvg) * 100;

    let tone: "good" | "warn" | "bad" | "info" = "info";
    let badgeText = `${Math.abs(percentVsUS).toFixed(0)}% Below US Avg`;
    if (totalCO2 < 10) {
      tone = "good";
      badgeText = `${Math.abs(percentVsUS).toFixed(0)}% Below US Avg (Eco)`;
    } else if (totalCO2 <= 16) {
      tone = "info";
      badgeText = `${Math.abs(percentVsUS).toFixed(0)}% Near US Avg`;
    } else if (totalCO2 <= 22) {
      tone = "warn";
      badgeText = `+${percentVsUS.toFixed(0)}% Above US Avg`;
    } else {
      tone = "bad";
      badgeText = `+${percentVsUS.toFixed(0)}% High Footprint`;
    }

    return {
      hero: {
        value: `${totalCO2.toFixed(1)} MT CO2e`,
        label: "Annual Carbon Footprint",
        sub: `${treesRequired.toLocaleString()} mature trees required for annual offset`,
      },
      badge: {
        text: badgeText,
        tone,
      },
      chart: {
        type: "donut",
        title: "Emissions Breakdown by Sector (MT CO2e)",
        data: [
          { name: `Vehicle (${vehicleCO2.toFixed(1)} MT)`, value: Math.max(0.01, Number(vehicleCO2.toFixed(2))), color: "#ef4444" },
          { name: `Flights (${flightsCO2.toFixed(1)} MT)`, value: Math.max(0.01, Number(flightsCO2.toFixed(2))), color: "#f59e0b" },
          { name: `Electricity (${electricCO2.toFixed(1)} MT)`, value: Math.max(0.01, Number(electricCO2.toFixed(2))), color: "#3b82f6" },
          { name: `Gas Heat (${gasCO2.toFixed(1)} MT)`, value: Math.max(0.01, Number(gasCO2.toFixed(2))), color: "#8b5cf6" },
          { name: `Diet (${dietCO2.toFixed(1)} MT)`, value: Math.max(0.01, Number(dietCO2.toFixed(2))), color: "#10b981" },
          { name: `Waste (${wasteCO2.toFixed(1)} MT)`, value: Math.max(0.01, Number(wasteCO2.toFixed(2))), color: "#64748b" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Annual Emissions", value: `${totalCO2.toFixed(2)} metric tons CO2e`, strong: true },
        { label: "Vehicle Transportation", value: `${vehicleCO2.toFixed(2)} MT (${((vehicleCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Commercial Flights", value: `${flightsCO2.toFixed(2)} MT (${((flightsCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Grid Electricity", value: `${electricCO2.toFixed(2)} MT (${((electricCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Gas Home Heating", value: `${gasCO2.toFixed(2)} MT (${((gasCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Diet & Food Production", value: `${dietCO2.toFixed(2)} MT (${((dietCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Waste & Landfill", value: `${wasteCO2.toFixed(2)} MT (${((wasteCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Trees Required to Offset", value: `${treesRequired.toLocaleString()} mature trees` },
      ],
      steps: [
        `Vehicle combustion: (${annualMiles} miles / ${gasMpg} MPG) * 0.008887 MT/gal = ${vehicleCO2.toFixed(2)} MT CO2.`,
        `Aviation emissions: (${shortFlights} short * 0.22 MT) + (${longFlights} long * 0.95 MT) = ${flightsCO2.toFixed(2)} MT CO2e.`,
        `Home utilities: (${elecMonthlyKwh} kWh * 12 * 0.000386) + (${gasMonthlyTherms} therms * 12 * 0.0053) = ${(electricCO2 + gasCO2).toFixed(2)} MT CO2e.`,
        `Total household footprint: ${vehicleCO2.toFixed(2)} (cars) + ${flightsCO2.toFixed(2)} (flights) + ${(electricCO2 + gasCO2).toFixed(2)} (home) + ${dietCO2.toFixed(2)} (diet) + ${wasteCO2.toFixed(2)} (waste) = ${totalCO2.toFixed(2)} MT CO2e.`,
      ],
      note: {
        text: "Switching from standard fossil grid electricity to residential rooftop solar or a community green-power tariff can eliminate up to 80% of your home energy footprint.",
      },
    };
  },
};

export default function CarbonFootprintCalculator() {
  return <CalcEngine config={config} />;
}
