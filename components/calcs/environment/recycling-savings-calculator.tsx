"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "recycling-savings-calc",
  title: "Household Recycling Environmental Savings & Resource Conservation Calculator",
  presets: [
    { label: "Typical Suburban Family of 4", values: { paperLbs: 45, plasticLbs: 22, glassLbs: 28, alumLbs: 8, steelLbs: 10 } },
    { label: "Zero-Waste Enthusiast Household", values: { paperLbs: 80, plasticLbs: 35, glassLbs: 50, alumLbs: 15, steelLbs: 18 } },
    { label: "Urban Apartment / Single Professional", values: { paperLbs: 15, plasticLbs: 8, glassLbs: 12, alumLbs: 4, steelLbs: 3 } },
    { label: "Small Office / Commercial Suite", values: { paperLbs: 180, plasticLbs: 25, glassLbs: 15, alumLbs: 25, steelLbs: 10 } },
    { label: "Party / Beverage Enthusiast Focus", values: { paperLbs: 20, plasticLbs: 15, glassLbs: 60, alumLbs: 30, steelLbs: 5 } },
  ],
  fields: [
    {
      kind: "number",
      key: "paperLbs",
      label: "Paper & Cardboard Recycled (lbs / month)",
      default: 45,
      min: 0,
      max: 2000,
      hint: "Mail, cardboard boxes, newspapers, magazines (1 ton paper saves 17 mature trees)",
    },
    {
      kind: "number",
      key: "plasticLbs",
      label: "Rigid Plastics Recycled (lbs / month)",
      default: 22,
      min: 0,
      max: 1000,
      hint: "PET #1 drink bottles, HDPE #2 milk jugs, detergent containers",
    },
    {
      kind: "number",
      key: "glassLbs",
      label: "Glass Bottles & Jars (lbs / month)",
      default: 28,
      min: 0,
      max: 1500,
      hint: "Beverage bottles, condiment jars (100% infinitely recyclable without quality loss)",
    },
    {
      kind: "number",
      key: "alumLbs",
      label: "Aluminum Cans (lbs / month)",
      default: 8,
      min: 0,
      max: 500,
      hint: "Soda and seltzer beverage cans (~31-33 standard 12 oz cans equal 1 lb)",
    },
    {
      kind: "number",
      key: "steelLbs",
      label: "Steel & Tin Cans (lbs / month)",
      default: 10,
      min: 0,
      max: 500,
      hint: "Canned vegetables, soups, pet food metal cans",
    },
  ],
  compute: (vals) => {
    const paperLbs = Number(vals.paperLbs) || 0;
    const plasticLbs = Number(vals.plasticLbs) || 0;
    const glassLbs = Number(vals.glassLbs) || 0;
    const alumLbs = Number(vals.alumLbs) || 0;
    const steelLbs = Number(vals.steelLbs) || 0;

    // Monthly lbs to annual lbs
    const annualPaper = paperLbs * 12;
    const annualPlastic = plasticLbs * 12;
    const annualGlass = glassLbs * 12;
    const annualAlum = alumLbs * 12;
    const annualSteel = steelLbs * 12;

    const totalAnnualLbs = annualPaper + annualPlastic + annualGlass + annualAlum + annualSteel;

    // EPA WARM (Waste Reduction Model) Factors:
    // Avoided CO2e per lb recycled:
    // Paper: ~0.95 kg CO2e / lb = 2.09 lbs CO2e
    // Plastic: ~1.20 kg CO2e / lb = 2.64 lbs CO2e
    // Glass: ~0.15 kg CO2e / lb = 0.33 lbs CO2e
    // Aluminum: ~4.15 kg CO2e / lb = 9.15 lbs CO2e (huge smelting energy savings!)
    // Steel: ~0.70 kg CO2e / lb = 1.54 lbs CO2e
    const co2PaperKg = annualPaper * 0.95;
    const co2PlasticKg = annualPlastic * 1.2;
    const co2GlassKg = annualGlass * 0.15;
    const co2AlumKg = annualAlum * 4.15;
    const co2SteelKg = annualSteel * 0.7;

    const totalCo2AvoidedKg = co2PaperKg + co2PlasticKg + co2GlassKg + co2AlumKg + co2SteelKg;
    const totalCo2AvoidedMT = totalCo2AvoidedKg / 1000;

    // Energy Saved (kWh equivalent):
    // Aluminum: 6.5 kWh per lb (95% energy saved vs virgin bauxite)
    // Plastic: 2.8 kWh per lb
    // Paper: 1.8 kWh per lb
    // Steel: 1.4 kWh per lb
    // Glass: 0.15 kWh per lb
    const energySavedKWh =
      annualAlum * 6.5 + annualPlastic * 2.8 + annualPaper * 1.8 + annualSteel * 1.4 + annualGlass * 0.15;

    // Equivalent gasoline gallons: 1 gallon gas = ~33.7 kWh energy
    const gasGallonsEq = energySavedKWh / 33.7;

    // Trees saved from paper: 1 short ton (2,000 lbs) paper = 17 mature trees => 0.0085 trees / lb
    const treesPreserved = annualPaper * 0.0085;

    // Landfill volume diverted: avg compacted municipal density ~0.022 cubic yards per 100 lbs
    const landfillCubicYards = (totalAnnualLbs / 100) * 0.022;

    // Water conserved: paper manufacturing consumes 3.5 gallons water / lb virgin pulp
    const waterGallonsConserved = annualPaper * 3.5;

    return {
      hero: {
        value: `${totalCo2AvoidedMT.toFixed(2)} MT CO2e`,
        label: `Annual Avoided Greenhouse Emissions (${totalAnnualLbs.toLocaleString()} lbs Recycled)`,
      },
      badge: {
        text: `${energySavedKWh.toFixed(0)} kWh Energy Conserved`,
        tone: totalAnnualLbs > 500 ? "good" : "info",
      },
      rows: [
        { label: "Total Annual Weight Diverted", value: `${totalAnnualLbs.toLocaleString()} lbs / year` },
        { label: "Avoided Greenhouse Gas Emissions", value: `${totalCo2AvoidedKg.toFixed(1)} kg (${totalCo2AvoidedMT.toFixed(2)} metric tons CO2e)` },
        { label: "Total Conserved Energy", value: `${energySavedKWh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh equivalent` },
        { label: "Gasoline Volume Equivalent", value: `${gasGallonsEq.toFixed(1)} gallons of gasoline saved` },
        { label: "Mature Forest Trees Preserved", value: `${treesPreserved.toFixed(2)} mature trees / year` },
        { label: "Water Conserved (Paper Manufacturing)", value: `${waterGallonsConserved.toLocaleString(undefined, { maximumFractionDigits: 0 })} gallons` },
        { label: "Diverted Landfill Space", value: `${landfillCubicYards.toFixed(2)} cubic yards` },
        { label: "Aluminum Beverage Cans Recycled", value: `${Math.round(annualAlum * 32).toLocaleString()} individual cans` },
      ],
      steps: [
        `Sum monthly recycling weights: ${paperLbs} paper + ${plasticLbs} plastic + ${glassLbs} glass + ${alumLbs} aluminum + ${steelLbs} steel = ${(paperLbs + plasticLbs + glassLbs + alumLbs + steelLbs)} lbs/month * 12 = ${totalAnnualLbs} lbs/year.`,
        `Apply EPA WARM lifecycle emissions factors: (${annualPaper} * 0.95 kg) + (${annualPlastic} * 1.2 kg) + (${annualGlass} * 0.15 kg) + (${annualAlum} * 4.15 kg) + (${annualSteel} * 0.70 kg) = ${totalCo2AvoidedKg.toFixed(1)} kg CO2e avoided.`,
        `Compute energy preservation: Aluminum delivers 6.5 kWh/lb savings, yielding ${energySavedKWh.toFixed(0)} kWh total conserved energy.`,
        `Forest conservation: ${annualPaper} lbs paper / 2,000 lbs per ton * 17 trees/ton = ${treesPreserved.toFixed(2)} trees protected.`,
      ],
      note: {
        text: "Recycling a single aluminum beverage can saves enough electrical energy to power a laptop for 3 hours or a 60W LED equivalent lamp for 20 hours.",
      },
    };
  },
};

export default function RecyclingSavingsCalculator() {
  return <CalcEngine config={config} />;
}
