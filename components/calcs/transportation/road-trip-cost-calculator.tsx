"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const roadTripConfig: CalcConfig = {
  id: "road-trip-cost-calculator",
  title: "Road Trip Travel Budget, Lodging, Gas and Group Expense Calculator",
  fields: [
    {
      kind: "number",
      key: "roundTripMiles",
      label: "Total Round-Trip Route Distance (Miles)",
      default: 1250,
      min: 10,
      max: 25000,
    },
    {
      kind: "number",
      key: "vehicleMpg",
      label: "Vehicle Fuel Economy (MPG)",
      default: 26.0,
      min: 5.0,
      max: 100.0,
    },
    {
      kind: "number",
      key: "fuelPrice",
      label: "Gasoline Price Per Gallon ($)",
      default: 3.75,
      min: 1.0,
      max: 10.0,
    },
    {
      kind: "number",
      key: "nightsLodging",
      label: "Nights of Hotel / Lodging",
      default: 4,
      min: 0,
      max: 60,
    },
    {
      kind: "number",
      key: "hotelCostPerNight",
      label: "Average Hotel / Lodging Cost Per Night ($)",
      default: 145.0,
      min: 0.0,
      max: 1500.0,
    },
    {
      kind: "number",
      key: "dailyFoodBudgetPerPerson",
      label: "Daily Food & Dining Budget Per Person ($)",
      default: 55.0,
      min: 0.0,
      max: 500.0,
    },
    {
      kind: "number",
      key: "tollsAndParkFees",
      label: "Highway Tolls, Parking & Park Admissions ($)",
      default: 65.0,
      min: 0.0,
      max: 2000.0,
    },
    {
      kind: "number",
      key: "numberOfTravelers",
      label: "Number of Travelers Sharing Costs",
      default: 3,
      min: 1,
      max: 12,
    },
  ],
  compute: (vals) => {
    const miles = Math.max(10, Number(vals.roundTripMiles) || 1250);
    const mpg = Math.max(5, Number(vals.vehicleMpg) || 26.0);
    const gasPrice = Number(vals.fuelPrice) || 3.75;
    const nights = Math.max(0, Number(vals.nightsLodging) || 4);
    const roomCost = Number(vals.hotelCostPerNight) || 145.0;
    const foodDaily = Number(vals.dailyFoodBudgetPerPerson) || 55.0;
    const tolls = Number(vals.tollsAndParkFees) || 65.0;
    const people = Math.max(1, Number(vals.numberOfTravelers) || 3);

    // Trip duration days = nights + 1
    const tripDays = nights + 1;

    // Fuel cost
    const totalGallons = miles / mpg;
    const totalFuelCost = totalGallons * gasPrice;

    // Lodging cost
    const totalLodging = nights * roomCost;

    // Food cost
    const totalFood = tripDays * foodDaily * people;

    // Grand total trip budget
    const grandTotal = totalFuelCost + totalLodging + totalFood + tolls;
    const costPerPerson = grandTotal / people;

    return {
      hero: {
        label: "Total Road Trip Cost",
        value: `$${grandTotal.toFixed(2)}`,
      },
      badge: {
        text: `$${costPerPerson.toFixed(2)} per person (${people} travelers, ${tripDays} days)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Cost Per Traveler Share",
          value: `$${costPerPerson.toFixed(2)}`,
        },
        {
          label: "Total Gasoline Fuel Expense",
          value: `$${totalFuelCost.toFixed(2)} (${totalGallons.toFixed(1)} gallons)`,
        },
        {
          label: "Hotel & Lodging Accommodations",
          value: `$${totalLodging.toFixed(2)} (${nights} nights @ $${roomCost.toFixed(2)})`,
        },
        {
          label: "Group Food & Dining Budget",
          value: `$${totalFood.toFixed(2)} ($${foodDaily.toFixed(2)}/day/person)`,
        },
      ],
      steps: [
        `Gasoline Fuel Outlay = (${miles} miles / ${mpg} MPG) * $${gasPrice.toFixed(2)} = ${totalGallons.toFixed(1)} gal = $${totalFuelCost.toFixed(2)}`,
        `Lodging Expense = ${nights} nights * $${roomCost.toFixed(2)}/night = $${totalLodging.toFixed(2)}`,
        `Group Dining Outlay = ${tripDays} days * $${foodDaily.toFixed(2)}/day * ${people} travelers = $${totalFood.toFixed(2)}`,
        `Tolls & Admissions = $${tolls.toFixed(2)}`,
        `Grand Total = $${totalFuelCost.toFixed(2)} + $${totalLodging.toFixed(2)} + $${totalFood.toFixed(2)} + $${tolls.toFixed(2)} = $${grandTotal.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Road Trip Expense Budget Allocation",
        format: "usd0",
        data: [
          { name: "Gasoline Fuel ($)", value: Math.round(totalFuelCost), color: "#0ea5e9" },
          { name: "Hotel & Lodging ($)", value: Math.round(totalLodging), color: "#10b981" },
          { name: "Food & Dining ($)", value: Math.round(totalFood), color: "#f59e0b" },
          { name: "Tolls & Park Passes ($)", value: Math.round(tolls), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function RoadTripCostCalculatorComponent() {
  return <CalcEngine config={roadTripConfig} />;
}
