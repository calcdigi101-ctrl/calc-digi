"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const fuelCostConfig: CalcConfig = {
  id: "fuel-cost-calculator",
  title: "Road Trip Fuel Consumption, Gas Mileage Cost and Passenger Split Calculator",
  fields: [
    {
      kind: "number",
      key: "tripDistanceMiles",
      label: "Trip Travel Distance (Miles)",
      default: 450.0,
      min: 1.0,
      max: 20000.0,
    },
    {
      kind: "number",
      key: "vehicleMpg",
      label: "Vehicle Fuel Economy (MPG)",
      default: 28.0,
      min: 5.0,
      max: 120.0,
    },
    {
      kind: "number",
      key: "fuelPricePerGallon",
      label: "Fuel Price Per Gallon ($)",
      default: 3.75,
      min: 1.0,
      max: 12.0,
    },
    {
      kind: "number",
      key: "passengerCount",
      label: "Number of Travelers Splitting Cost",
      default: 3,
      min: 1,
      max: 15,
    },
  ],
  compute: (vals) => {
    const dist = Math.max(1.0, Number(vals.tripDistanceMiles) || 450.0);
    const mpg = Math.max(5.0, Number(vals.vehicleMpg) || 28.0);
    const price = Number(vals.fuelPricePerGallon) || 3.75;
    const people = Math.max(1, Number(vals.passengerCount) || 3);

    const totalGallons = dist / mpg;
    const totalFuelCost = totalGallons * price;
    const costPerPerson = totalFuelCost / people;
    const costPerMile = totalFuelCost / dist;
    const costPer100Miles = costPerMile * 100;

    return {
      hero: {
        label: "Total Fuel Cost for Trip",
        value: `$${totalFuelCost.toFixed(2)}`,
      },
      badge: {
        text: `$${costPerPerson.toFixed(2)} per person (${people} travelers splitting)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Cost Per Passenger Share",
          value: `$${costPerPerson.toFixed(2)}`,
        },
        {
          label: "Total Fuel Consumed",
          value: `${totalGallons.toFixed(1)} gallons (${(totalGallons * 3.78541).toFixed(1)} Liters)`,
        },
        {
          label: "Driving Fuel Cost Per Mile",
          value: `$${costPerMile.toFixed(3)} / mile ($${costPer100Miles.toFixed(2)} / 100 mi)`,
        },
        {
          label: "Estimated Driving Time (@ 60 mph)",
          value: `${Math.floor(dist / 60)}h ${Math.round((dist % 60))}m`,
        },
      ],
      steps: [
        `Gallons Consumed = ${dist.toFixed(1)} miles / ${mpg} MPG = ${totalGallons.toFixed(2)} gallons`,
        `Total Trip Fuel Outlay = ${totalGallons.toFixed(2)} gallons * $${price.toFixed(2)}/gal = $${totalFuelCost.toFixed(2)}`,
        `Driving Cost Per Mile = $${totalFuelCost.toFixed(2)} / ${dist.toFixed(1)} miles = $${costPerMile.toFixed(3)} per mile`,
        `Equal Passenger Split (${people} travelers) = $${totalFuelCost.toFixed(2)} / ${people} = $${costPerPerson.toFixed(2)} per traveler`,
      ],
      chart: {
        type: "donut",
        title: "Passenger Fuel Cost Allocation Split",
        format: "usd0",
        data: Array.from({ length: Math.min(people, 5) }).map((_, i) => ({
          name: `Traveler ${i + 1} Share ($)`,
          value: Math.round(costPerPerson),
          color: ["#0284c7", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"][i % 5],
        })),
      },
    };
  },
};

export default function FuelCostCalculatorComponent() {
  return <CalcEngine config={fuelCostConfig} />;
}
