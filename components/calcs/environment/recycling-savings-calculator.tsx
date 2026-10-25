"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "recycling-savings-calc",
  title: "Household Recycling Environmental Savings & Resource Conservation Calculator",
  presets: [
    { label: "Family of 4 (Standard)", values: { paperLbs: 45, plasticLbs: 22, glassLbs: 28, alumLbs: 8, steelLbs: 10 } },
    { label: "Zero-Waste Enthusiast", values: { paperLbs: 80, plasticLbs: 35, glassLbs: 50, alumLbs: 15, steelLbs: 18 } },
    { label: "Urban Apartment / Single", values: { paperLbs: 15, plasticLbs: 8, glassLbs: 12, alumLbs: 4, steelLbs: 3 } },
    { label: "Small Office / Commercial", values: { paperLbs: 180, plasticLbs: 25, glassLbs: 15, alumLbs: 25, steelLbs: 10 } },
    { label: "Party / Beverage Focus", values: { paperLbs: 20, plasticLbs: 15, glassLbs: 60, alumLbs: 30, steelLbs: 5 } },
  ],
  fields: [
    {
      kind: "number",
      key: "paperLbs",
      label: "Paper & Cardboard Recycled (lbs / month)",
      default: 45,
      min: 0,
      max: 2000,
      hint: "Mail, cardboard boxes, newspapers (1 ton paper saves 17 mature trees)",
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
      hint: "Beverage bottles, condiment jars (100% infinitely recyclable)",
    },
    {
      kind: "number",
      key: "alumLbs",
      label: "Aluminum Cans (lbs / month)",
      default: 8,
      min: 0,
      max: 500,
      hint: "Soda and seltzer beverage cans (~32 cans equal 1 lb)",
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

    const annualPaper = paperLbs * 12;
    const annualPlastic = plasticLbs * 12;
    const annualGlass = glassLbs * 12;
    const annualAlum = alumLbs * 12;
    const annualSteel = steelLbs * 12;

    const totalAnnualLbs = annualPaper + annualPlastic + annualGlass + annualAlum + annualSteel;

    const co2PaperKg = annualPaper * 0.95;
    const co2PlasticKg = annualPlastic * 1.2;
    const co2GlassKg = annualGlass * 0.15;
    const co2AlumKg = annualAlum * 4.15;
    const co2SteelKg = annualSteel * 0.7;

    const totalCo2AvoidedKg = co2PaperKg + co2PlasticKg + co2GlassKg + co2AlumKg + co2SteelKg;
    const totalCo2AvoidedMT = totalCo2AvoidedKg / 1000;

    const energySavedKWh =
      annualAlum * 6.5 + annualPlastic * 2.8 + annualPaper * 1.8 + annualSteel * 1.4 + annualGlass * 0.15;

    const gasGallonsEq = energySavedKWh / 33.7;
    const treesPreserved = annualPaper * 0.0085;
    const landfillCubicYards = (totalAnnualLbs / 100) * 0.022;
    const waterGallonsConserved = annualPaper * 3.5;

    return {
      hero: {
        value: `${totalCo2AvoidedMT.toFixed(2)} MT CO2e`,
        label: "Annual Avoided Emissions",
        sub: `${totalAnnualLbs.toLocaleString()} lbs diverted · ${treesPreserved.toFixed(1)} trees saved`,
      },
      badge: {
        text: `${energySavedKWh.toFixed(0)} kWh Conserved`,
        tone: totalAnnualLbs > 500 ? "good" : "info",
      },
      chart: {
        type: "donut",
        title: "Avoided Carbon by Material (kg CO2e)",
        data: [
          { name: `Aluminum (${Math.round(co2AlumKg)} kg)`, value: Math.max(0.1, Math.round(co2AlumKg)), color: "#10b981" },
          { name: `Plastics (${Math.round(co2PlasticKg)} kg)`, value: Math.max(0.1, Math.round(co2PlasticKg)), color: "#06b6d4" },
          { name: `Paper (${Math.round(co2PaperKg)} kg)`, value: Math.max(0.1, Math.round(co2PaperKg)), color: "#3b82f6" },
          { name: `Steel (${Math.round(co2SteelKg)} kg)`, value: Math.max(0.1, Math.round(co2SteelKg)), color: "#f59e0b" },
          { name: `Glass (${Math.round(co2GlassKg)} kg)`, value: Math.max(0.1, Math.round(co2GlassKg)), color: "#8b5cf6" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Annual Weight Diverted", value: `${totalAnnualLbs.toLocaleString()} lbs / year`, strong: true },
        { label: "Avoided Carbon Emissions", value: `${totalCo2AvoidedKg.toFixed(1)} kg (${totalCo2AvoidedMT.toFixed(2)} MT CO2e)`, strong: true },
        { label: "Total Conserved Energy", value: `${energySavedKWh.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh equivalent` },
        { label: "Gasoline Volume Equivalent", value: `${gasGallonsEq.toFixed(1)} gallons saved` },
        { label: "Mature Trees Preserved", value: `${treesPreserved.toFixed(2)} mature trees / yr` },
        { label: "Paper Water Conserved", value: `${waterGallonsConserved.toLocaleString(undefined, { maximumFractionDigits: 0 })} gallons` },
        { label: "Diverted Landfill Space", value: `${landfillCubicYards.toFixed(2)} cubic yards` },
        { label: "Aluminum Cans Recycled", value: `${Math.round(annualAlum * 32).toLocaleString()} cans` },
      ],
      steps: [
        `Sum monthly recycling: ${paperLbs} paper + ${plasticLbs} plastic + ${glassLbs} glass + ${alumLbs} alum + ${steelLbs} steel = ${(paperLbs + plasticLbs + glassLbs + alumLbs + steelLbs)} lbs/mo * 12 = ${totalAnnualLbs} lbs/year.`,
        `Apply EPA WARM factors: (${annualPaper} * 0.95 kg) + (${annualPlastic} * 1.2 kg) + (${annualGlass} * 0.15 kg) + (${annualAlum} * 4.15 kg) + (${annualSteel} * 0.70 kg) = ${totalCo2AvoidedKg.toFixed(1)} kg CO2e avoided.`,
        `Compute energy preservation: Aluminum delivers 6.5 kWh/lb savings, yielding ${energySavedKWh.toFixed(0)} kWh total conserved energy.`,
        `Forest conservation: ${annualPaper} lbs paper / 2,000 lbs per ton * 17 trees/ton = ${treesPreserved.toFixed(2)} trees protected.`,
      ],
      note: {
        text: "Recycling a single aluminum beverage can saves enough electrical energy to power a laptop for 3 hours or a 60W LED lamp for 20 hours.",
      },
    };
  },
};

export default function RecyclingSavingsCalculator() {
  return <CalcEngine config={config} />;
}
