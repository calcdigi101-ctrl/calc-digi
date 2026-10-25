"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "carbon-footprint-calc",
  title: "Annual Carbon Footprint & Greenhouse Gas Emissions Calculator",
  presets: [
    {
      label: "Average US Citizen (16.2 MT CO2e/year)",
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
      label: "Eco-Conscious Urbanite (6.4 MT CO2e/year)",
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
      label: "Frequent Business Traveler (28.5 MT CO2e/year)",
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
      label: "Solar-Powered Suburban Household (9.8 MT CO2e/year)",
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
      label: "Global Average Citizen (4.7 MT CO2e/year)",
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
      hint: "Round trips or one-way flights under 3 hours (~0.25 MT CO2e per leg)",
    },
    {
      kind: "number",
      key: "longFlights",
      label: "Long-Haul / Transcontinental Flights per Year (> 3 hours)",
      default: 1,
      min: 0,
      max: 30,
      hint: "Cross-country or international flights (~1.65 MT CO2e per leg)",
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
        { value: "vegan", label: "Vegan (Plant-Based Only - ~1.5 MT CO2e/yr)" },
        { value: "vegetarian", label: "Vegetarian (Dairy & Eggs - ~1.7 MT CO2e/yr)" },
        { value: "pescatarian", label: "Pescatarian (Fish & Plants - ~1.9 MT CO2e/yr)" },
        { value: "average_omnivore", label: "Average Omnivore (Moderate Red & White Meat - ~2.5 MT CO2e/yr)" },
        { value: "heavy_meat", label: "Heavy Meat Consumer (Daily Beef/Lamb - ~3.3 MT CO2e/yr)" },
      ],
    },
    {
      kind: "choice",
      key: "wasteRecycling",
      label: "Household Waste & Recycling Habit",
      default: "average",
      options: [
        { value: "aggressive", label: "Zero-Waste & Aggressive Composting (~0.3 MT CO2e/yr)" },
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

    // Emission Factors (EPA / IPCC):
    // 1 gallon gasoline = 8.887 kg CO2 = 0.008887 MT CO2
    const vehicleCO2 = (annualMiles / gasMpg) * 0.008887;

    // Aviation (ICAO / DEFRA with radiative forcing multiplier ~1.9):
    // Short haul leg avg 800 miles = ~0.22 MT CO2e; Long haul leg avg 4,500 miles = ~0.95 MT CO2e
    const flightsCO2 = shortFlights * 0.22 + longFlights * 0.95;

    // Electricity: US grid average ~0.386 kg CO2e per kWh = 0.000386 MT/kWh
    const electricCO2 = elecMonthlyKwh * 12 * 0.000386;

    // Natural Gas: 1 therm = 5.3 kg CO2 = 0.0053 MT CO2
    const gasCO2 = gasMonthlyTherms * 12 * 0.0053;

    // Diet
    const dietMap: Record<string, number> = {
      vegan: 1.5,
      vegetarian: 1.7,
      pescatarian: 1.9,
      average_omnivore: 2.5,
      heavy_meat: 3.3,
    };
    const dietCO2 = dietMap[String(vals.dietType || "average_omnivore")] || 2.5;

    // Waste
    const wasteMap: Record<string, number> = {
      aggressive: 0.3,
      average: 0.6,
      low: 1.1,
    };
    const wasteCO2 = wasteMap[String(vals.wasteRecycling || "average")] || 0.6;

    const totalCO2 = vehicleCO2 + flightsCO2 + electricCO2 + gasCO2 + dietCO2 + wasteCO2;

    // Trees required to offset: Average mature tree absorbs ~22 kg (0.022 MT) CO2 per year
    const treesRequired = Math.ceil(totalCO2 / 0.022);

    // US average benchmark: ~16.0 MT CO2e
    const usAvg = 16.0;
    const percentVsUS = ((totalCO2 - usAvg) / usAvg) * 100;

    let tone: "good" | "warn" | "bad" | "info" = "info";
    let badgeText = `${Math.abs(percentVsUS).toFixed(0)}% Below US Average`;
    if (totalCO2 < 10) {
      tone = "good";
      badgeText = `${Math.abs(percentVsUS).toFixed(0)}% Below US Average (Eco Tier)`;
    } else if (totalCO2 <= 16) {
      tone = "info";
      badgeText = `${Math.abs(percentVsUS).toFixed(0)}% Near US Average`;
    } else if (totalCO2 <= 22) {
      tone = "warn";
      badgeText = `+${percentVsUS.toFixed(0)}% Above US Average`;
    } else {
      tone = "bad";
      badgeText = `+${percentVsUS.toFixed(0)}% High Carbon Footprint`;
    }

    return {
      hero: {
        value: `${totalCO2.toFixed(1)} MT CO2e`,
        label: `Annual Greenhouse Gas Emissions (${treesRequired} mature trees to offset)`,
      },
      badge: {
        text: badgeText,
        tone,
      },
      rows: [
        { label: "Total Annual Carbon Footprint", value: `${totalCO2.toFixed(2)} metric tons CO2e` },
        { label: "Vehicle Transportation Emissions", value: `${vehicleCO2.toFixed(2)} MT (${((vehicleCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Commercial Aviation Flights", value: `${flightsCO2.toFixed(2)} MT (${((flightsCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Home Grid Electricity", value: `${electricCO2.toFixed(2)} MT (${((electricCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Home Natural Gas Heating", value: `${gasCO2.toFixed(2)} MT (${((gasCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Diet & Food Production", value: `${dietCO2.toFixed(2)} MT (${((dietCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Solid Waste & Landfill", value: `${wasteCO2.toFixed(2)} MT (${((wasteCO2 / totalCO2) * 100).toFixed(0)}%)` },
        { label: "Mature Trees Required for 1-Year Offset", value: `${treesRequired.toLocaleString()} trees` },
      ],
      steps: [
        `Vehicle combustion: (${annualMiles} miles / ${gasMpg} MPG) * 0.008887 MT/gal = ${vehicleCO2.toFixed(2)} MT CO2.`,
        `Aviation emissions: (${shortFlights} short-haul * 0.22 MT) + (${longFlights} long-haul * 0.95 MT) = ${flightsCO2.toFixed(2)} MT CO2e.`,
        `Home utilities: (${elecMonthlyKwh} kWh * 12 * 0.000386) + (${gasMonthlyTherms} therms * 12 * 0.0053) = ${(electricCO2 + gasCO2).toFixed(2)} MT CO2e.`,
        `Total household footprint: ${vehicleCO2.toFixed(2)} (cars) + ${flightsCO2.toFixed(2)} (flights) + ${(electricCO2 + gasCO2).toFixed(2)} (home energy) + ${dietCO2.toFixed(2)} (diet) + ${wasteCO2.toFixed(2)} (waste) = ${totalCO2.toFixed(2)} MT CO2e.`,
      ],
      note: {
        text: "Switching from standard fossil grid electricity to residential rooftop solar or a community green-power tariff can eliminate up to 80% of your home energy footprint overnight.",
      },
    };
  },
};

export default function CarbonFootprintCalculator() {
  return <CalcEngine config={config} />;
}
