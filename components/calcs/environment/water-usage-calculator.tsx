"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "water-usage-calc",
  title: "Household Water Usage, Conservation & Utility Bill Calculator",
  presets: [
    { label: "Family of 4 (Standard)", values: { occupants: 4, showerMinutes: 8.5, showersPerDay: 4, flushesPerDay: 20, laundryLoadsWeek: 6, dishRunsWeek: 5, lawnMinutesWeek: 45, fixtureTier: "standard", waterTariff: 11.50 } },
    { label: "Eco Couple (WaterSense)", values: { occupants: 2, showerMinutes: 6.0, showersPerDay: 2, flushesPerDay: 10, laundryLoadsWeek: 2, dishRunsWeek: 3, lawnMinutesWeek: 0, fixtureTier: "watersense", waterTariff: 12.00 } },
    { label: "Single Renter / Apartment", values: { occupants: 1, showerMinutes: 7.0, showersPerDay: 1, flushesPerDay: 5, laundryLoadsWeek: 1.5, dishRunsWeek: 2, lawnMinutesWeek: 0, fixtureTier: "standard", waterTariff: 10.00 } },
    { label: "High Irrigation Property", values: { occupants: 4, showerMinutes: 10.0, showersPerDay: 4, flushesPerDay: 20, laundryLoadsWeek: 7, dishRunsWeek: 6, lawnMinutesWeek: 150, fixtureTier: "standard", waterTariff: 14.50 } },
    { label: "Large Household (6 People)", values: { occupants: 6, showerMinutes: 8.0, showersPerDay: 6, flushesPerDay: 30, laundryLoadsWeek: 10, dishRunsWeek: 8, lawnMinutesWeek: 30, fixtureTier: "watersense", waterTariff: 11.50 } },
  ],
  fields: [
    {
      kind: "number",
      key: "occupants",
      label: "Number of Household Residents",
      default: 4,
      min: 1,
      max: 20,
      hint: "Count of individuals living in the home",
    },
    {
      kind: "number",
      key: "showerMinutes",
      label: "Average Shower Duration (minutes)",
      default: 8.5,
      min: 1,
      max: 60,
      hint: "National average shower duration is 8.2 minutes",
    },
    {
      kind: "number",
      key: "showersPerDay",
      label: "Total Household Showers per Day",
      default: 4,
      min: 0,
      max: 30,
      hint: "Combined showers taken daily across all residents",
    },
    {
      kind: "number",
      key: "flushesPerDay",
      label: "Total Household Toilet Flushes per Day",
      default: 20,
      min: 1,
      max: 150,
      hint: "Average person flushes ~5 times per day (4 people = 20 flushes)",
    },
    {
      kind: "number",
      key: "laundryLoadsWeek",
      label: "Washing Machine Loads per Week",
      default: 6,
      min: 0,
      max: 50,
      hint: "Average American family does ~6 loads of laundry per week",
    },
    {
      kind: "number",
      key: "dishRunsWeek",
      label: "Dishwasher Cycles per Week",
      default: 5,
      min: 0,
      max: 35,
      hint: "Running a full modern dishwasher uses significantly less water than hand washing",
    },
    {
      kind: "number",
      key: "lawnMinutesWeek",
      label: "Lawn & Garden Sprinkler Run Time (minutes/week)",
      default: 45,
      min: 0,
      max: 600,
      hint: "Outdoor hose or automatic sprinkler zone run time per week",
    },
    {
      kind: "choice",
      key: "fixtureTier",
      label: "Plumbing Fixture Efficiency Rating",
      default: "standard",
      options: [
        { value: "standard", label: "Standard Fixtures (2.5 GPM Shower, 1.6 GPF Toilet, 32 Gal Washer)" },
        { value: "watersense", label: "EPA WaterSense (1.75 GPM Shower, 1.15 GPF Toilet, 14 Gal Washer)" },
        { value: "antiquated", label: "Antiquated Pre-1994 (3.5 GPM Shower, 3.5+ GPF Toilet, 42 Gal Washer)" },
      ],
    },
    {
      kind: "number",
      key: "waterTariff",
      label: "Water & Sewer Combined Tariff ($ / 1,000 Gallons)",
      default: 11.50,
      min: 2.0,
      max: 40.0,
      hint: "Combined water and wastewater sewer tariff (national avg is ~$10-$14/kgal)",
    },
  ],
  compute: (vals) => {
    const occupants = Math.max(1, Number(vals.occupants) || 4);
    const showerMinutes = Number(vals.showerMinutes) || 8.5;
    const showersPerDay = Number(vals.showersPerDay) || occupants;
    const flushesPerDay = Number(vals.flushesPerDay) || occupants * 5;
    const laundryLoadsWeek = Number(vals.laundryLoadsWeek) || 0;
    const dishRunsWeek = Number(vals.dishRunsWeek) || 0;
    const lawnMinutesWeek = Number(vals.lawnMinutesWeek) || 0;
    const fixtureTier = String(vals.fixtureTier || "standard");
    const waterTariff = Number(vals.waterTariff) || 11.5;

    let showerGPM = 2.5;
    let toiletGPF = 1.6;
    let washerGalPerLoad = 32.0;
    let dishGalPerRun = 6.0;
    let sprinklerGPM = 12.0;
    let faucetDailyGalPerPerson = 12.0;

    if (fixtureTier === "watersense") {
      showerGPM = 1.75;
      toiletGPF = 1.15;
      washerGalPerLoad = 14.0;
      dishGalPerRun = 3.5;
      faucetDailyGalPerPerson = 7.0;
    } else if (fixtureTier === "antiquated") {
      showerGPM = 3.5;
      toiletGPF = 3.5;
      washerGalPerLoad = 42.0;
      dishGalPerRun = 10.0;
      faucetDailyGalPerPerson = 16.0;
    }

    const dailyShowerGal = showerMinutes * showerGPM * showersPerDay;
    const dailyToiletGal = flushesPerDay * toiletGPF;
    const dailyLaundryGal = (laundryLoadsWeek * washerGalPerLoad) / 7;
    const dailyDishGal = (dishRunsWeek * dishGalPerRun) / 7;
    const dailyOutdoorGal = (lawnMinutesWeek * sprinklerGPM) / 7;
    const dailyFaucetGal = occupants * faucetDailyGalPerPerson;

    const totalDailyGallons =
      dailyShowerGal + dailyToiletGal + dailyLaundryGal + dailyDishGal + dailyOutdoorGal + dailyFaucetGal;
    const annualGallons = totalDailyGallons * 365.25;

    const perCapitaDailyGallons = totalDailyGallons / occupants;

    const annualWaterCost = (annualGallons / 1000) * waterTariff;
    const monthlyWaterCost = annualWaterCost / 12;

    let potentialAnnualGallonSavings = 0;
    if (fixtureTier !== "watersense") {
      const wsShower = showerMinutes * 1.75 * showersPerDay;
      const wsToilet = flushesPerDay * 1.15;
      const wsLaundry = (laundryLoadsWeek * 14.0) / 7;
      const wsDish = (dishRunsWeek * 3.5) / 7;
      const wsFaucet = occupants * 7.0;
      const wsDailyTotal = wsShower + wsToilet + wsLaundry + wsDish + dailyOutdoorGal + wsFaucet;
      potentialAnnualGallonSavings = Math.max(0, (totalDailyGallons - wsDailyTotal) * 365.25);
    }
    const potentialAnnualDollarSavings = (potentialAnnualGallonSavings / 1000) * waterTariff;

    const isEfficient = perCapitaDailyGallons <= 60;

    return {
      hero: {
        value: `${Math.round(totalDailyGallons).toLocaleString()} Gal / day`,
        label: "Daily Water Usage",
        sub: `${Math.round(perCapitaDailyGallons)} Gal/person/day · $${annualWaterCost.toFixed(0)}/yr Utility Spend`,
      },
      badge: {
        text: `${Math.round(perCapitaDailyGallons)} Gal/Capita`,
        tone: isEfficient ? "good" : perCapitaDailyGallons > 95 ? "warn" : "info",
      },
      chart: {
        type: "donut",
        title: "Daily Usage by Fixture (Gallons)",
        data: [
          { name: `Showers (${Math.round(dailyShowerGal)} gal)`, value: Math.max(0.1, Math.round(dailyShowerGal)), color: "#06b6d4" },
          { name: `Toilets (${Math.round(dailyToiletGal)} gal)`, value: Math.max(0.1, Math.round(dailyToiletGal)), color: "#3b82f6" },
          { name: `Laundry (${Math.round(dailyLaundryGal)} gal)`, value: Math.max(0.1, Math.round(dailyLaundryGal)), color: "#8b5cf6" },
          { name: `Outdoor (${Math.round(dailyOutdoorGal)} gal)`, value: Math.max(0.1, Math.round(dailyOutdoorGal)), color: "#10b981" },
          { name: `Faucets/Dishes (${Math.round(dailyFaucetGal + dailyDishGal)} gal)`, value: Math.max(0.1, Math.round(dailyFaucetGal + dailyDishGal)), color: "#f59e0b" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Daily Total Consumption", value: `${Math.round(totalDailyGallons).toLocaleString()} gallons / day`, strong: true },
        { label: "Annual Water Volume", value: `${Math.round(annualGallons).toLocaleString()} gal (${(annualGallons * 3.785).toLocaleString(undefined, { maximumFractionDigits: 0 })} L)` },
        { label: "Per Capita Daily Usage", value: `${Math.round(perCapitaDailyGallons)} gal/person/day (US avg: 82 gal)` },
        { label: "Daily Showers", value: `${dailyShowerGal.toFixed(1)} gal (${((dailyShowerGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Toilets", value: `${dailyToiletGal.toFixed(1)} gal (${((dailyToiletGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Clothes Washing", value: `${dailyLaundryGal.toFixed(1)} gal (${((dailyLaundryGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Lawn Irrigation", value: `${dailyOutdoorGal.toFixed(1)} gal (${((dailyOutdoorGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Annual Water & Sewer Bill", value: `$${annualWaterCost.toFixed(2)} / yr ($${monthlyWaterCost.toFixed(2)}/mo)`, strong: true },
        { label: "WaterSense Upgrade Potential", value: fixtureTier === "watersense" ? "Maximum efficiency achieved" : `${Math.round(potentialAnnualGallonSavings).toLocaleString()} gal ($${potentialAnnualDollarSavings.toFixed(0)}/yr saved)` },
      ],
      steps: [
        `Showers: ${showersPerDay} showers * ${showerMinutes} min * ${showerGPM} GPM = ${dailyShowerGal.toFixed(1)} gal/day.`,
        `Toilets: ${flushesPerDay} flushes * ${toiletGPF} GPF = ${dailyToiletGal.toFixed(1)} gal/day.`,
        `Appliances & Outdoor: Laundry (${dailyLaundryGal.toFixed(1)} gal) + Dishes (${dailyDishGal.toFixed(1)} gal) + Outdoor (${dailyOutdoorGal.toFixed(1)} gal) + Faucets (${dailyFaucetGal.toFixed(1)} gal) = ${(dailyLaundryGal + dailyDishGal + dailyOutdoorGal + dailyFaucetGal).toFixed(1)} gal/day.`,
        `Total household volume: ${dailyShowerGal.toFixed(1)} + ${dailyToiletGal.toFixed(1)} + ${(dailyLaundryGal + dailyDishGal + dailyOutdoorGal + dailyFaucetGal).toFixed(1)} = ${totalDailyGallons.toFixed(1)} gal/day * 365.25 = ${Math.round(annualGallons).toLocaleString()} gal/yr.`,
        `Utility cost projection: (${Math.round(annualGallons).toLocaleString()} gal / 1,000) * $${waterTariff.toFixed(2)}/kgal = $${annualWaterCost.toFixed(2)} per year.`,
      ],
      note: {
        text: "Fixing a single continuously running toilet flapper can waste up to 200 gallons of treated drinking water per day ($70+ per month on municipal water bills).",
      },
    };
  },
};

export default function WaterUsageCalculator() {
  return <CalcEngine config={config} />;
}
