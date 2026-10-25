"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "tree-planting-calc",
  title: "Tree Planting Carbon Offset & Forest Sequestration Calculator",
  presets: [
    { label: "Offset Average US Citizen (16 MT CO2/year)", values: { targetCo2: 16, treeSpecies: "mixed_hardwood", survivalRate: 80, projectHorizon: "20", seedlingCost: 2.50 } },
    { label: "Offset Transatlantic Round-Trip Flight (2.5 MT CO2)", values: { targetCo2: 2.5, treeSpecies: "mixed_hardwood", survivalRate: 85, projectHorizon: "20", seedlingCost: 2.50 } },
    { label: "Corporate Scope 1 & 2 Emissions (120 MT CO2/year)", values: { targetCo2: 120, treeSpecies: "fast_growing", survivalRate: 75, projectHorizon: "20", seedlingCost: 2.00 } },
    { label: "Personal Passenger Car Annual Driving (4.6 MT CO2)", values: { targetCo2: 4.6, treeSpecies: "mixed_hardwood", survivalRate: 80, projectHorizon: "20", seedlingCost: 3.00 } },
    { label: "Community Reforestation Park (50 MT Target)", values: { targetCo2: 50, treeSpecies: "native_oak", survivalRate: 85, projectHorizon: "30", seedlingCost: 4.00 } },
  ],
  fields: [
    {
      kind: "number",
      key: "targetCo2",
      label: "Annual Carbon Emissions to Offset (Metric Tons CO2e)",
      default: 16,
      min: 0.1,
      max: 10000,
      hint: "Average US individual is ~16 MT/yr; European citizen is ~7 MT/yr; single cross-country flight is ~0.8-1.2 MT",
    },
    {
      kind: "choice",
      key: "treeSpecies",
      label: "Tree Species & Forest Type",
      default: "mixed_hardwood",
      options: [
        { value: "mixed_hardwood", label: "Mixed Temperate Hardwood (Oak, Maple, Beech - ~22 kg CO2/yr at maturity)" },
        { value: "fast_growing", label: "Fast-Growing Deciduous (Poplar, Willow, Birch - ~32 kg CO2/yr early maturity)" },
        { value: "native_oak", label: "Long-Lived Native Oak / Chestnut (High Density Timber - ~25 kg CO2/yr long-term)" },
        { value: "conifer_pine", label: "Coniferous Pine & Douglas Fir (Year-Round Canopy - ~18 kg CO2/yr)" },
        { value: "tropical_agro", label: "Tropical Agroforestry / Rainforest Native (~40 kg CO2/yr high-growth)" },
      ],
    },
    {
      kind: "number",
      key: "survivalRate",
      label: "Seedling Field Survival Rate (%)",
      default: 80,
      min: 40,
      max: 100,
      hint: "Professional forestry projects anticipate 75% to 85% sapling survival to year 10",
    },
    {
      kind: "choice",
      key: "projectHorizon",
      label: "Carbon Sequestration Time Horizon (Years)",
      default: "20",
      options: [
        { value: "10", label: "10 Years (Juvenile Canopy Phase - Lower Initial Rate)" },
        { value: "20", label: "20 Years (Standard Industry Carbon Credit Standard)" },
        { value: "30", label: "30 Years (Full Mature Climax Forest Phase)" },
        { value: "40", label: "40 Years (Long-Term Legacy Sequestration)" },
      ],
    },
    {
      kind: "number",
      key: "seedlingCost",
      label: "Planting Cost per Seedling ($ / tree)",
      default: 2.50,
      min: 0.50,
      max: 50.0,
      hint: "Includes bare-root sapling, ground preparation, tube shelter, and planting labor",
    },
  ],
  compute: (vals) => {
    const targetCo2 = Number(vals.targetCo2) || 0;
    const species = String(vals.treeSpecies || "mixed_hardwood");
    const survivalRate = Math.min(100, Math.max(20, Number(vals.survivalRate) || 80));
    const horizon = Number(vals.projectHorizon || 20);
    const seedlingCost = Number(vals.seedlingCost) || 2.5;

    // Sequestration rates (kg CO2 absorbed per mature tree per year)
    const speciesMap: Record<string, number> = {
      mixed_hardwood: 22,
      fast_growing: 32,
      native_oak: 25,
      conifer_pine: 18,
      tropical_agro: 40,
    };
    const kgPerTreePerYear = speciesMap[species] || 22;

    // To offset targetCo2 annually when trees are mature:
    // targetCo2 (MT) * 1000 = kg CO2 per year needed
    const kgNeededAnnual = targetCo2 * 1000;
    const matureTreesNeeded = Math.ceil(kgNeededAnnual / kgPerTreePerYear);

    // Accounting for survival mortality:
    const saplingsToPlant = Math.ceil(matureTreesNeeded / (survivalRate / 100));

    // Total lifetime cumulative carbon absorbed over project horizon:
    // Trees don't absorb maximum carbon on day 1. Growth is sigmoidal (S-curve).
    // Effective average annual absorption factor over horizon:
    // 10 yrs: ~35% of mature rate; 20 yrs: ~60% of mature rate; 30 yrs: ~75%; 40 yrs: ~85%
    let growthFactor = 0.6;
    if (horizon <= 10) growthFactor = 0.35;
    else if (horizon <= 20) growthFactor = 0.6;
    else if (horizon <= 30) growthFactor = 0.75;
    else growthFactor = 0.85;

    const cumulativeSequestrationKg = matureTreesNeeded * kgPerTreePerYear * horizon * growthFactor;
    const cumulativeSequestrationMT = cumulativeSequestrationKg / 1000;

    // Land area required: standard forestry spacing 8x8 ft (680 trees/acre) or 10x10 ft (435 trees/acre)
    // At planting, saplings planted at ~500 trees/acre (approx 87 sq ft per sapling)
    const sqFtRequired = saplingsToPlant * 87.12;
    const acresRequired = sqFtRequired / 43560;

    // Financial investment
    const totalPlantingCost = saplingsToPlant * seedlingCost;
    const costPerTonneOffset = cumulativeSequestrationMT > 0 ? totalPlantingCost / cumulativeSequestrationMT : 0;

    return {
      hero: {
        value: `${saplingsToPlant.toLocaleString()} Saplings`,
        label: `${matureTreesNeeded.toLocaleString()} Mature Trees (${acresRequired.toFixed(2)} Acres of Forest)`,
      },
      badge: {
        text: `${targetCo2} MT CO2/yr Offset Capacity`,
        tone: "good",
      },
      rows: [
        { label: "Saplings Required to Plant", value: `${saplingsToPlant.toLocaleString()} trees (${survivalRate}% survival)` },
        { label: "Surviving Mature Trees", value: `${matureTreesNeeded.toLocaleString()} established trees` },
        { label: "Species Annual Sequestration Rate", value: `${kgPerTreePerYear} kg CO2 / tree / year at maturity` },
        { label: "Forest Land Area Required", value: `${acresRequired.toFixed(2)} acres (${Math.round(sqFtRequired).toLocaleString()} sq ft)` },
        { label: `${horizon}-Year Cumulative Carbon Sequestered`, value: `${cumulativeSequestrationMT.toFixed(1)} metric tons CO2e` },
        { label: "Total Seedling & Planting Investment", value: `$${totalPlantingCost.toFixed(2)} ($${seedlingCost.toFixed(2)}/tree)` },
        { label: "Effective Carbon Abatement Cost", value: `$${costPerTonneOffset.toFixed(2)} per metric ton CO2` },
        { label: "Ecosystem Biodiversity Benefit", value: "Soil erosion control, groundwater retention, native wildlife habitat" },
      ],
      steps: [
        `Convert target emissions: ${targetCo2} metric tons * 1,000 kg/MT = ${kgNeededAnnual.toLocaleString()} kg CO2 annually.`,
        `Calculate mature trees needed: ${kgNeededAnnual.toLocaleString()} kg / ${kgPerTreePerYear} kg per tree = ${matureTreesNeeded.toLocaleString()} mature trees.`,
        `Adjust for sapling field mortality: ${matureTreesNeeded.toLocaleString()} / (${survivalRate}% survival) = ${saplingsToPlant.toLocaleString()} saplings to plant.`,
        `Determine forestry land footprint: ${saplingsToPlant.toLocaleString()} trees * 87.12 sq ft / 43,560 sq ft per acre = ${acresRequired.toFixed(2)} acres.`,
        `Calculate project investment: ${saplingsToPlant.toLocaleString()} saplings * $${seedlingCost.toFixed(2)}/sapling = $${totalPlantingCost.toFixed(2)}.`,
      ],
      note: {
        text: "Planting biodiverse mixed native hardwoods provides far superior carbon durability, fungal mycelium resilience, and wildfire resistance than monoculture commercial plantations.",
      },
    };
  },
};

export default function TreePlantingCalculator() {
  return <CalcEngine config={config} />;
}
