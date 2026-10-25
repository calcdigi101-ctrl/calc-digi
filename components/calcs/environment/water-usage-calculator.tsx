"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "water-usage-calc",
  title: "Household Water Usage, Conservation & Utility Bill Calculator",
  presets: [
    { label: "Average Suburban Family of 4 (Standard Fixtures)", values: { occupants: 4, showerMinutes: 8.5, showersPerDay: 4, flushesPerDay: 20, laundryLoadsWeek: 6, dishRunsWeek: 5, lawnMinutesWeek: 45, fixtureTier: "standard", waterTariff: 11.50 } },
    { label: "Eco-Conscious Couple (EPA WaterSense Fixtures)", values: { occupants: 2, showerMinutes: 6.0, showersPerDay: 2, flushesPerDay: 10, laundryLoadsWeek: 2, dishRunsWeek: 3, lawnMinutesWeek: 0, fixtureTier: "watersense", waterTariff: 12.00 } },
    { label: "Apartment Dweller / Single Renter", values: { occupants: 1, showerMinutes: 7.0, showersPerDay: 1, flushesPerDay: 5, laundryLoadsWeek: 1.5, dishRunsWeek: 2, lawnMinutesWeek: 0, fixtureTier: "standard", waterTariff: 10.00 } },
    { label: "High Irrigation Property (Expansive Turf Lawn)", values: { occupants: 4, showerMinutes: 10.0, showersPerDay: 4, flushesPerDay: 20, laundryLoadsWeek: 7, dishRunsWeek: 6, lawnMinutesWeek: 150, fixtureTier: "standard", waterTariff: 14.50 } },
    { label: "Multi-Generational Large Household (6 People)", values: { occupants: 6, showerMinutes: 8.0, showersPerDay: 6, flushesPerDay: 30, laundryLoadsWeek: 10, dishRunsWeek: 8, lawnMinutesWeek: 30, fixtureTier: "watersense", waterTariff: 11.50 } },
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
      hint: "Average person flushes ~5 times per day (e.g., 4 people = 20 flushes)",
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
        { value: "standard", label: "Standard Legacy Fixtures (2.5 GPM Shower, 1.6 GPF Toilet, 35 Gal Washer)" },
        { value: "watersense", label: "EPA WaterSense & Energy Star (1.75 GPM Shower, 1.1 GPF Dual-Flush, 14 Gal Washer)" },
        { value: "antiquated", label: "Pre-1994 Antiquated Fixtures (3.5 GPM Shower, 3.5+ GPF Toilet, 45 Gal Washer)" },
      ],
    },
    {
      kind: "number",
      key: "waterTariff",
      label: "Water & Sewer Combined Tariff ($ / 1,000 Gallons)",
      default: 11.50,
      min: 2.0,
      max: 40.0,
      hint: "Combined municipal water supply and sewer wastewater rate (US national avg is ~$10 - $14 / kgal)",
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

    // Fixture consumption rates
    let showerGPM = 2.5;
    let toiletGPF = 1.6;
    let washerGalPerLoad = 32.0;
    let dishGalPerRun = 6.0;
    let sprinklerGPM = 12.0; // standard hose/sprinkler zone ~10-14 GPM
    let faucetDailyGalPerPerson = 12.0; // teeth brushing, hand washing, cooking

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

    // Daily calculations
    const dailyShowerGal = showerMinutes * showerGPM * showersPerDay;
    const dailyToiletGal = flushesPerDay * toiletGPF;
    const dailyLaundryGal = (laundryLoadsWeek * washerGalPerLoad) / 7;
    const dailyDishGal = (dishRunsWeek * dishGalPerRun) / 7;
    const dailyOutdoorGal = (lawnMinutesWeek * sprinklerGPM) / 7;
    const dailyFaucetGal = occupants * faucetDailyGalPerPerson;

    const totalDailyGallons =
      dailyShowerGal + dailyToiletGal + dailyLaundryGal + dailyDishGal + dailyOutdoorGal + dailyFaucetGal;
    const annualGallons = totalDailyGallons * 365.25;

    // Per capita daily
    const perCapitaDailyGallons = totalDailyGallons / occupants;

    // Financial utility costs
    const annualWaterCost = (annualGallons / 1000) * waterTariff;
    const monthlyWaterCost = annualWaterCost / 12;

    // Comparison against WaterSense potential savings if not already WaterSense:
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

    const usBenchmarkPerCapita = 82; // USGS benchmark ~82 gal/person/day
    const isEfficient = perCapitaDailyGallons <= 60;

    return {
      hero: {
        value: `${Math.round(totalDailyGallons).toLocaleString()} Gal / day`,
        label: `${Math.round(perCapitaDailyGallons)} Gal/person/day · $${annualWaterCost.toFixed(0)}/yr Utility Spend`,
      },
      badge: {
        text: `${Math.round(perCapitaDailyGallons)} Gal Per Capita (${isEfficient ? "Efficient" : perCapitaDailyGallons > 95 ? "High Usage" : "Typical"})`,
        tone: isEfficient ? "good" : perCapitaDailyGallons > 95 ? "warn" : "info",
      },
      rows: [
        { label: "Total Household Daily Consumption", value: `${Math.round(totalDailyGallons).toLocaleString()} gallons / day` },
        { label: "Total Annual Water Volume", value: `${Math.round(annualGallons).toLocaleString()} gallons / year (${(annualGallons * 3.785).toLocaleString(undefined, { maximumFractionDigits: 0 })} Liters)` },
        { label: "Per Capita Daily Usage", value: `${Math.round(perCapitaDailyGallons)} gallons/person/day (US avg: 82 gal)` },
        { label: "Daily Shower Water Volume", value: `${dailyShowerGal.toFixed(1)} gal (${((dailyShowerGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Toilet Flushing Volume", value: `${dailyToiletGal.toFixed(1)} gal (${((dailyToiletGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Clothes Washing Volume", value: `${dailyLaundryGal.toFixed(1)} gal (${((dailyLaundryGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Lawn & Outdoor Irrigation", value: `${dailyOutdoorGal.toFixed(1)} gal (${((dailyOutdoorGal / totalDailyGallons) * 100).toFixed(0)}%)` },
        { label: "Daily Faucets, Leaks & Dishes", value: `${(dailyFaucetGal + dailyDishGal).toFixed(1)} gal` },
        { label: "Annual Municipal Water & Sewer Bill", value: `$${annualWaterCost.toFixed(2)} / year ($${monthlyWaterCost.toFixed(2)}/mo)` },
        { label: "Potential Savings with WaterSense Upgrades", value: fixtureTier === "watersense" ? "Maximum efficiency already achieved" : `${Math.round(potentialAnnualGallonSavings).toLocaleString()} gal/yr ($${potentialAnnualDollarSavings.toFixed(2)}/yr)` },
      ],
      steps: [
        `Showers: ${showersPerDay} showers * ${showerMinutes} min * ${showerGPM} GPM = ${dailyShowerGal.toFixed(1)} gal/day.`,
        `Toilets: ${flushesPerDay} flushes * ${toiletGPF} GPF = ${dailyToiletGal.toFixed(1)} gal/day.`,
        `Appliances & Outdoor: Laundry (${dailyLaundryGal.toFixed(1)} gal) + Dishwasher (${dailyDishGal.toFixed(1)} gal) + Outdoor (${dailyOutdoorGal.toFixed(1)} gal) + Faucets (${dailyFaucetGal.toFixed(1)} gal) = ${(dailyLaundryGal + dailyDishGal + dailyOutdoorGal + dailyFaucetGal).toFixed(1)} gal/day.`,
        `Total household volume: ${dailyShowerGal.toFixed(1)} + ${dailyToiletGal.toFixed(1)} + ${(dailyLaundryGal + dailyDishGal + dailyOutdoorGal + dailyFaucetGal).toFixed(1)} = ${totalDailyGallons.toFixed(1)} gal/day * 365.25 days = ${Math.round(annualGallons).toLocaleString()} gal/yr.`,
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
