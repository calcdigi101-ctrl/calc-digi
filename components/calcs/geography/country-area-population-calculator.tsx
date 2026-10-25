"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "country-area-population-calc",
  title: "Country Area & Population Statistics Calculator",
  presets: [
    { label: "United States (Continental Scale)", values: { pop: 335, area: 9833517, gdp: 27360, growth: 0.5 } },
    { label: "Bangladesh (Mega-Density Benchmark)", values: { pop: 173, area: 147570, gdp: 450, growth: 1.0 } },
    { label: "Monaco (Ultra-Dense Microstate)", values: { pop: 0.039, area: 2.08, gdp: 8.5, growth: 0.2 } },
    { label: "Mongolia (Vast Nomadic Steppe)", values: { pop: 3.5, area: 1564116, gdp: 20, growth: 1.4 } },
    { label: "India (High-Density Giant)", values: { pop: 1430, area: 3287263, gdp: 3750, growth: 0.8 } },
    { label: "Australia (Low-Density Continent)", values: { pop: 27, area: 7692024, gdp: 1700, growth: 1.2 } },
  ],
  fields: [
    {
      kind: "number",
      key: "pop",
      label: "Total Population (in Millions)",
      default: 335,
      min: 0.0001,
      max: 10000,
      hint: "Enter resident population in millions (e.g., 335 for USA, 1430 for India)",
    },
    {
      kind: "number",
      key: "area",
      label: "Total Surface Land Area (km²)",
      default: 9833517,
      min: 0.1,
      max: 100000000,
      hint: "Official territorial land area in square kilometers",
    },
    {
      kind: "number",
      key: "gdp",
      label: "Gross Domestic Product (Billion USD)",
      default: 27360,
      min: 0,
      max: 200000,
      hint: "Nominal annual national economic output in billions USD",
    },
    {
      kind: "number",
      key: "growth",
      label: "Annual Population Growth Rate (%)",
      default: 0.5,
      min: -10,
      max: 15,
      hint: "Annual net demographic change percentage (births + immigration - deaths)",
    },
  ],
  compute(values) {
    const popMillions = Number(values.pop);
    const areaKm2 = Number(values.area);
    const gdpBillions = Number(values.gdp);
    const growthRate = Number(values.growth);

    if (!popMillions || popMillions <= 0) {
      return { error: "Please enter a valid population greater than zero." };
    }
    if (!areaKm2 || areaKm2 <= 0) {
      return { error: "Please enter a valid land area greater than zero." };
    }

    const totalPop = popMillions * 1_000_000;
    const densityKm2 = totalPop / areaKm2;
    const areaSqMiles = areaKm2 * 0.386102;
    const densitySqMi = totalPop / areaSqMiles;

    const gdpTotal = gdpBillions * 1_000_000_000;
    const gdpPerCapita = gdpTotal > 0 ? gdpTotal / totalPop : 0;

    // Rule of 70 doubling time
    const doublingYears = growthRate > 0 ? 70 / growthRate : 0;

    // Compound projections
    const pop10Years = popMillions * Math.pow(1 + growthRate / 100, 10);
    const pop25Years = popMillions * Math.pow(1 + growthRate / 100, 25);

    let densityTier = "Moderate Density";
    let tierTone: "good" | "info" | "warn" = "info";

    if (densityKm2 < 10) {
      densityTier = "Ultra-Sparse (Desert / Polar / Steppe)";
      tierTone = "info";
    } else if (densityKm2 < 60) {
      densityTier = "Low Density (Spacious Continental)";
      tierTone = "good";
    } else if (densityKm2 < 200) {
      densityTier = "Moderate Balanced Demographics";
      tierTone = "good";
    } else if (densityKm2 < 600) {
      densityTier = "High Urban & Agricultural Density";
      tierTone = "warn";
    } else {
      densityTier = "Hyper-Dense (Metropolitan / City-State)";
      tierTone = "warn";
    }

    const steps = [
      `Resident Population: ${popMillions.toLocaleString()} million = ${totalPop.toLocaleString()} people`,
      `Crude Density (Metric): ${totalPop.toLocaleString()} people ÷ ${areaKm2.toLocaleString()} km² = ${densityKm2.toFixed(2)} people/km²`,
      `Imperial Equivalent: ${totalPop.toLocaleString()} ÷ ${Math.round(areaSqMiles).toLocaleString()} sq mi = ${densitySqMi.toFixed(2)} people/sq mi`,
      `Economic Productivity: $${gdpBillions.toLocaleString()}B GDP ÷ ${totalPop.toLocaleString()} = $${Math.round(gdpPerCapita).toLocaleString()} per capita`,
      `Demographic Doubling Time: 70 ÷ ${growthRate.toFixed(2)}% = ${doublingYears > 0 ? `${doublingYears.toFixed(1)} years` : "Stationary"}`,
    ];

    return {
      hero: {
        label: "Crude Population Density",
        value: `${densityKm2 >= 100 ? Math.round(densityKm2).toLocaleString() : densityKm2.toFixed(1)} / km²`,
        unit: `${densitySqMi >= 100 ? Math.round(densitySqMi).toLocaleString() : densitySqMi.toFixed(1)} / sq mi`,
      },
      badge: {
        text: densityTier,
        tone: tierTone,
      },
      rows: [
        { label: "Total Population", value: `${popMillions.toLocaleString()} Million (${totalPop.toLocaleString()} people)`, strong: true },
        { label: "Territorial Land Area", value: `${areaKm2.toLocaleString()} km² (${Math.round(areaSqMiles).toLocaleString()} sq mi)`, strong: true },
        { label: "Nominal GDP per Capita", value: gdpPerCapita > 0 ? `$${Math.round(gdpPerCapita).toLocaleString()} USD` : "N/A" },
        { label: "Rule of 70 Doubling Time", value: doublingYears > 0 ? `${doublingYears.toFixed(1)} years` : "Stationary / Declining" },
        { label: "10-Year Projected Population", value: `${pop10Years.toFixed(2)} Million` },
        { label: "25-Year Projected Population", value: `${pop25Years.toFixed(2)} Million` },
        { label: "Demographic Spatial Tier", value: densityTier },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Demographic Projection Horizon (Millions)",
        data: [
          { name: "Current Population", value: Math.max(0.1, popMillions), color: "#3b82f6" },
          { name: "10-Year Growth Delta", value: Math.max(0.1, Math.abs(pop10Years - popMillions)), color: "#10b981" },
        ],
      },
      note: {
        text: "Crude population density divides national resident population by gross territorial surface land area. Physiological density (people per unit of arable farmland) may be considerably higher in mountainous or arid regions.",
        tone: "neutral",
      },
    };
  },
};

export default function CountryAreaPopulationCalculator() {
  return <CalcEngine config={config} />;
}
