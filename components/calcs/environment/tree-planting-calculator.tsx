"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "tree-planting-calc",
  title: "Tree Planting Carbon Offset & Forest Sequestration Calculator",
  presets: [
    { label: "Average US Citizen (16 MT CO2/yr)", values: { targetCo2: 16, treeSpecies: "mixed_hardwood", survivalRate: 80, projectHorizon: "20", seedlingCost: 2.50 } },
    { label: "Transatlantic Flight (2.5 MT CO2)", values: { targetCo2: 2.5, treeSpecies: "mixed_hardwood", survivalRate: 85, projectHorizon: "20", seedlingCost: 2.50 } },
    { label: "Corporate Scope 1 (120 MT CO2/yr)", values: { targetCo2: 120, treeSpecies: "fast_growing", survivalRate: 75, projectHorizon: "20", seedlingCost: 2.00 } },
    { label: "Passenger Car (4.6 MT CO2/yr)", values: { targetCo2: 4.6, treeSpecies: "mixed_hardwood", survivalRate: 80, projectHorizon: "20", seedlingCost: 3.00 } },
    { label: "Community Park (50 MT Target)", values: { targetCo2: 50, treeSpecies: "native_oak", survivalRate: 85, projectHorizon: "30", seedlingCost: 4.00 } },
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
        { value: "mixed_hardwood", label: "Mixed Hardwood (Oak, Maple, Beech - ~22 kg CO2/yr)" },
        { value: "fast_growing", label: "Fast Deciduous (Poplar, Willow, Birch - ~32 kg CO2/yr)" },
        { value: "native_oak", label: "Native Oak / Chestnut (High Density - ~25 kg CO2/yr)" },
        { value: "conifer_pine", label: "Coniferous Pine (Evergreen - ~18 kg CO2/yr)" },
        { value: "tropical_agro", label: "Tropical Rainforest Agroforestry (~40 kg CO2/yr)" },
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
        { value: "10", label: "10 Years (Juvenile Canopy Phase)" },
        { value: "20", label: "20 Years (Standard Industry Standard)" },
        { value: "30", label: "30 Years (Full Mature Climax Forest)" },
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

    const speciesMap: Record<string, number> = {
      mixed_hardwood: 22,
      fast_growing: 32,
      native_oak: 25,
      conifer_pine: 18,
      tropical_agro: 40,
    };
    const kgPerTreePerYear = speciesMap[species] || 22;

    const kgNeededAnnual = targetCo2 * 1000;
    const matureTreesNeeded = Math.ceil(kgNeededAnnual / kgPerTreePerYear);
    const saplingsToPlant = Math.ceil(matureTreesNeeded / (survivalRate / 100));
    const mortalityBuffer = Math.max(0, saplingsToPlant - matureTreesNeeded);

    let growthFactor = 0.6;
    if (horizon <= 10) growthFactor = 0.35;
    else if (horizon <= 20) growthFactor = 0.6;
    else if (horizon <= 30) growthFactor = 0.75;
    else growthFactor = 0.85;

    const cumulativeSequestrationKg = matureTreesNeeded * kgPerTreePerYear * horizon * growthFactor;
    const cumulativeSequestrationMT = cumulativeSequestrationKg / 1000;

    const sqFtRequired = saplingsToPlant * 87.12;
    const acresRequired = sqFtRequired / 43560;

    const totalPlantingCost = saplingsToPlant * seedlingCost;
    const costPerTonneOffset = cumulativeSequestrationMT > 0 ? totalPlantingCost / cumulativeSequestrationMT : 0;

    return {
      hero: {
        value: `${saplingsToPlant.toLocaleString()} Saplings`,
        label: "Required Reforestation Planting",
        sub: `${matureTreesNeeded.toLocaleString()} surviving mature trees (${acresRequired.toFixed(2)} acres)`,
      },
      badge: {
        text: `${targetCo2} MT CO2/yr Capacity`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Tree Population & Mortality Buffer",
        data: [
          { name: `Mature Surviving (${matureTreesNeeded.toLocaleString()})`, value: Math.max(1, matureTreesNeeded), color: "#10b981" },
          { name: `Mortality Buffer (${mortalityBuffer.toLocaleString()})`, value: Math.max(1, mortalityBuffer), color: "#94a3b8" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Saplings to Plant", value: `${saplingsToPlant.toLocaleString()} trees (${survivalRate}% survival)`, strong: true },
        { label: "Surviving Mature Trees", value: `${matureTreesNeeded.toLocaleString()} established trees`, strong: true },
        { label: "Species Sequestration Rate", value: `${kgPerTreePerYear} kg CO2 / tree / yr at maturity` },
        { label: "Forest Land Area Required", value: `${acresRequired.toFixed(2)} acres (${Math.round(sqFtRequired).toLocaleString()} sq ft)` },
        { label: `${horizon}-Year Carbon Sequestered`, value: `${cumulativeSequestrationMT.toFixed(1)} metric tons CO2e`, strong: true },
        { label: "Total Planting Investment", value: `$${totalPlantingCost.toFixed(2)} ($${seedlingCost.toFixed(2)}/tree)` },
        { label: "Carbon Abatement Cost", value: `$${costPerTonneOffset.toFixed(2)} / metric ton CO2` },
        { label: "Ecosystem Biodiversity Benefit", value: "Soil erosion control, groundwater retention, native habitat" },
      ],
      steps: [
        `Convert target emissions: ${targetCo2} metric tons * 1,000 kg/MT = ${kgNeededAnnual.toLocaleString()} kg CO2 annually.`,
        `Calculate mature trees needed: ${kgNeededAnnual.toLocaleString()} kg / ${kgPerTreePerYear} kg per tree = ${matureTreesNeeded.toLocaleString()} mature trees.`,
        `Adjust for sapling mortality: ${matureTreesNeeded.toLocaleString()} / (${survivalRate}% survival) = ${saplingsToPlant.toLocaleString()} saplings to plant.`,
        `Determine forestry footprint: ${saplingsToPlant.toLocaleString()} trees * 87.12 sq ft / 43,560 sq ft per acre = ${acresRequired.toFixed(2)} acres.`,
        `Calculate project investment: ${saplingsToPlant.toLocaleString()} saplings * $${seedlingCost.toFixed(2)}/sapling = $${totalPlantingCost.toFixed(2)}.`,
      ],
      note: {
        text: "Planting biodiverse mixed native hardwoods provides far superior carbon durability, fungal mycelium resilience, and wildfire resistance than monoculture plantations.",
      },
    };
  },
};

export default function TreePlantingCalculator() {
  return <CalcEngine config={config} />;
}
