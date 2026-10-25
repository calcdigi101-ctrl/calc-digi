"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "travel-entertainment-calc",
  title: "Vacation Travel & Holiday Entertainment Budget Calculator",
  presets: [
    { label: "Orlando Theme Park Family Vacation (7 Days, 4 Guests)", values: { days: 7, travelers: 4, parkPassesPerDay: 135, toursShows: 300, nightlifeDining: 120, rentalsExcursions: 250 } },
    { label: "European Cultural Capital Trip (5 Days, 2 Adults)", values: { days: 5, travelers: 2, parkPassesPerDay: 35, toursShows: 220, nightlifeDining: 90, rentalsExcursions: 150 } },
    { label: "Vegas Strip Weekend (3 Days, 2 Adults)", values: { days: 3, travelers: 2, parkPassesPerDay: 0, toursShows: 350, nightlifeDining: 180, rentalsExcursions: 100 } },
    { label: "Tropical Beach Resort & Scuba (6 Days, 2 Adults)", values: { days: 6, travelers: 2, parkPassesPerDay: 0, toursShows: 80, nightlifeDining: 75, rentalsExcursions: 480 } },
    { label: "Budget Backpacker Exploration (14 Days, 1 Solo)", values: { days: 14, travelers: 1, parkPassesPerDay: 15, toursShows: 100, nightlifeDining: 25, rentalsExcursions: 80 } },
  ],
  fields: [
    {
      kind: "number",
      key: "days",
      label: "Vacation Trip Length (Days)",
      default: 7,
      min: 1,
      max: 90,
      hint: "Number of full days at your travel destination",
    },
    {
      kind: "number",
      key: "travelers",
      label: "Number of Travelers",
      default: 4,
      min: 1,
      max: 20,
      hint: "Total adults and children participating in activities",
    },
    {
      kind: "number",
      key: "parkPassesPerDay",
      label: "Attractions / Theme Park Admission ($ / Person / Day)",
      default: 135,
      min: 0,
      max: 500,
      hint: "Disney/Universal passes ($110-$180/day), museums ($20-$35/day), city passes",
    },
    {
      kind: "number",
      key: "toursShows",
      label: "Live Shows, Concerts & Guided Walking Tours ($ Total)",
      default: 300,
      min: 0,
      max: 5000,
      hint: "Broadway/West End theater tickets, historic walking guides, arena events across trip",
    },
    {
      kind: "number",
      key: "nightlifeDining",
      label: "Dining Entertainment & Nightlife ($ / Group / Day)",
      default: 120,
      min: 0,
      max: 1000,
      hint: "Bars, cocktail lounges, pub crawls, entertainment dining, club covers",
    },
    {
      kind: "number",
      key: "rentalsExcursions",
      label: "Special Excursions & Sports Gear Rentals ($ Total)",
      default: 250,
      min: 0,
      max: 5000,
      hint: "Ski lift passes & gear, boat charters, snorkel/scuba trips, ATV/zip-line adventures",
    },
  ],
  compute: (vals) => {
    const days = Number(vals.days) || 7;
    const travelers = Number(vals.travelers) || 4;
    const parkPassesPerDay = Number(vals.parkPassesPerDay) || 0;
    const toursShows = Number(vals.toursShows) || 0;
    const nightlifeDining = Number(vals.nightlifeDining) || 0;
    const rentalsExcursions = Number(vals.rentalsExcursions) || 0;

    const totalParkPasses = parkPassesPerDay * travelers * days;
    const totalNightlife = nightlifeDining * days;
    const grandEntertainmentTotal = totalParkPasses + toursShows + totalNightlife + rentalsExcursions;

    const costPerPerson = grandEntertainmentTotal / travelers;
    const dailyGroupBurnRate = grandEntertainmentTotal / days;
    const dailyPerPersonBurnRate = dailyGroupBurnRate / travelers;

    return {
      hero: {
        value: `$${grandEntertainmentTotal.toLocaleString()}`,
        label: `Total Entertainment Spend ($${costPerPerson.toFixed(0)} / Person | $${dailyGroupBurnRate.toFixed(0)} / Day for Group)`,
      },
      badge: {
        text: `$${grandEntertainmentTotal.toLocaleString()} Total`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Vacation Entertainment Allocation",
        data: [
          { name: `Theme Parks ($${totalParkPasses.toFixed(0)})`, value: Math.max(1, Math.round(totalParkPasses)), color: "#3b82f6" },
          { name: `Shows & Tours ($${toursShows.toFixed(0)})`, value: Math.max(1, Math.round(toursShows)), color: "#8b5cf6" },
          { name: `Nightlife & Bars ($${totalNightlife.toFixed(0)})`, value: Math.max(1, Math.round(totalNightlife)), color: "#f59e0b" },
          { name: `Gear & Excursions ($${rentalsExcursions.toFixed(0)})`, value: Math.max(1, Math.round(rentalsExcursions)), color: "#10b981" },
        ].filter(d => d.value > 0),
        format: "usd0",
      },
      rows: [
        { label: "Theme Parks & Admissions Subtotal", value: `$${totalParkPasses.toLocaleString()} ($${parkPassesPerDay}/day × ${travelers} guests × ${days} days)` },
        { label: "Live Shows & Guided Tours", value: `$${toursShows.toLocaleString()}` },
        { label: "Nightlife, Lounges & Bars", value: `$${totalNightlife.toLocaleString()} ($${nightlifeDining}/day for group)` },
        { label: "Excursions, Ski & Equipment Rentals", value: `$${rentalsExcursions.toLocaleString()}` },
        { label: "Daily Group Entertainment Burn", value: `$${dailyGroupBurnRate.toFixed(2)} / day (all ${travelers} travelers)` },
        { label: "Daily Cost Per Person", value: `$${dailyPerPersonBurnRate.toFixed(2)} / person / day` },
        { label: "Total All-In Entertainment Cost", value: `$${grandEntertainmentTotal.toLocaleString()}` },
      ],
      steps: [
        `Calculate attraction ticket admissions: ${travelers} travelers × $${parkPassesPerDay}/day × ${days} days = $${totalParkPasses.toLocaleString()}.`,
        `Calculate daily group nightlife/bars: $${nightlifeDining}/day × ${days} days = $${totalNightlife.toLocaleString()}.`,
        `Sum fixed excursion and show costs: $${toursShows} (shows/tours) + $${rentalsExcursions} (sports/gear) = $${(toursShows + rentalsExcursions).toLocaleString()}.`,
        `Grand Total: $${totalParkPasses.toLocaleString()} + $${totalNightlife.toLocaleString()} + $${(toursShows + rentalsExcursions).toLocaleString()} = $${grandEntertainmentTotal.toLocaleString()}.`,
        `Per-traveler average: $${grandEntertainmentTotal.toLocaleString()} ÷ ${travelers} travelers = $${costPerPerson.toFixed(2)} per person ($${dailyPerPersonBurnRate.toFixed(2)}/day).`,
      ],
      note: { text: "According to US Travel Association data, activities and entertainment represent 24% to 32% of total vacation spending, excluding flights and lodging." },
    };
  },
};

export default function TravelEntertainmentCalculator() {
  return <CalcEngine config={config} />;
}
