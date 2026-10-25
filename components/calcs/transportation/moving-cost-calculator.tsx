"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const movingCostConfig: CalcConfig = {
  id: "moving-cost-calculator",
  title: "Residential Relocation, Full-Service Movers and DIY Moving Truck Cost Calculator",
  fields: [
    {
      kind: "choice",
      key: "homeSize",
      label: "Home Size & Household Volume",
      default: "two_bedroom",
      options: [
        { label: "Studio Apartment (~1,800 lbs / 1 Room)", value: "studio" },
        { label: "1-Bedroom Apartment (~2,800 lbs / 350 cu ft)", value: "one_bedroom" },
        { label: "2-Bedroom Apartment / Home (~4,800 lbs / 600 cu ft)", value: "two_bedroom" },
        { label: "3-Bedroom House (~8,500 lbs / 1,000 cu ft)", value: "three_bedroom" },
        { label: "4+ Bedroom Executive House (~13,500 lbs / 1,600 cu ft)", value: "four_bedroom" },
      ],
    },
    {
      kind: "number",
      key: "moveDistanceMiles",
      label: "Relocation Move Distance (Miles)",
      default: 450,
      min: 5,
      max: 4000,
    },
    {
      kind: "choice",
      key: "movingMethod",
      label: "Moving Method / Service Tier",
      default: "full_service",
      options: [
        { label: "Full-Service Professional Movers (Crew, Truck & Loading)", value: "full_service" },
        { label: "DIY Rental Truck (You Drive & Load - e.g., U-Haul / Penske)", value: "diy_truck" },
        { label: "Moving Container Pod (You Load, Company Transports)", value: "container_pod" },
      ],
    },
    {
      kind: "number",
      key: "packingSuppliesBudget",
      label: "Boxes, Tape & Packing Materials Budget ($)",
      default: 220,
      min: 0,
      max: 2000,
    },
  ],
  compute: (vals) => {
    const home = String(vals.homeSize || "two_bedroom");
    const dist = Math.max(5, Number(vals.moveDistanceMiles) || 450);
    const method = String(vals.movingMethod || "full_service");
    const supplies = Number(vals.packingSuppliesBudget) || 220;

    const WEIGHT_MAP: Record<string, number> = {
      studio: 1800,
      one_bedroom: 2800,
      two_bedroom: 4800,
      three_bedroom: 8500,
      four_bedroom: 13500,
    };
    const weightLbs = WEIGHT_MAP[home] || 4800;

    let baseLabor = 0;
    let transportCost = 0;
    let equipmentRental = 0;

    if (method === "full_service") {
      // Local move (<50 miles): hourly rate. Long-distance (>50 miles): weight * distance line-haul rate.
      if (dist <= 50) {
        const hourlyRate = weightLbs > 6000 ? 180 : 130;
        const hours = (weightLbs / 1000) * 1.1 + 2;
        baseLabor = hourlyRate * hours;
        transportCost = 100; // travel fee
      } else {
        // Interstate tariff: approx $0.65 to $0.95 per lb per 1000 miles
        const lineHaulRate = 0.80 * (weightLbs / 1000) * (dist / 1000) * 1000;
        baseLabor = lineHaulRate * 0.65;
        transportCost = lineHaulRate * 0.35 + (dist * 0.40); // fuel surcharge
      }
    } else if (method === "diy_truck") {
      if (dist <= 50) {
        equipmentRental = 45 + (dist * 1.19); // base day rate + mileage fee
        transportCost = (dist / 10) * 3.75; // fuel at 10 MPG
        baseLabor = 0;
      } else {
        // One-way commercial rental truck
        equipmentRental = 800 + (dist * 0.75);
        transportCost = (dist / 9) * 3.75; // fuel
        baseLabor = 0;
      }
    } else if (method === "container_pod") {
      equipmentRental = 350 + (dist * 0.85); // pod monthly rental + delivery
      transportCost = dist * 0.90; // freight line haul
      baseLabor = 0;
    }

    const totalEstimate = Math.round(baseLabor + transportCost + equipmentRental + supplies);

    return {
      hero: {
        label: "Estimated Relocation Total Cost",
        value: `$${totalEstimate.toLocaleString()}`,
      },
      badge: {
        text: `Based on ${weightLbs.toLocaleString()} lbs payload over ${dist.toLocaleString()} miles`,
        tone: "good",
      },
      secondary: [
        {
          label: "Professional Moving Labor / Crew",
          value: baseLabor > 0 ? `$${Math.round(baseLabor).toLocaleString()}` : "Self-Loaded (DIY)",
        },
        {
          label: "Transportation Freight & Fuel Surcharge",
          value: `$${Math.round(transportCost).toLocaleString()}`,
        },
        {
          label: "Truck / Container Equipment Lease",
          value: equipmentRental > 0 ? `$${Math.round(equipmentRental).toLocaleString()}` : "Included in Full-Service",
        },
        {
          label: "Packing Materials & Supplies",
          value: `$${Math.round(supplies).toLocaleString()}`,
        },
      ],
      steps: [
        `Estimated Household Weight = ${weightLbs.toLocaleString()} lbs (${home.replace("_", " ")})`,
        `Transit Mode (${method.replace("_", " ")}) over ${dist} miles = Base Cost $${Math.round(baseLabor + equipmentRental).toLocaleString()}`,
        `Transportation Fuel & Linehaul = $${Math.round(transportCost).toLocaleString()}`,
        `Total Estimated Outlay = $${Math.round(baseLabor + equipmentRental)} + $${Math.round(transportCost)} + $${supplies} supplies = $${totalEstimate.toLocaleString()}`,
      ],
      chart: {
        type: "donut",
        title: "Relocation Expense Category Breakdown",
        format: "usd0",
        data: [
          { name: "Labor & Professional Handling ($)", value: Math.max(1, Math.round(baseLabor)), color: "#0ea5e9" },
          { name: "Vehicle Lease & Equipment ($)", value: Math.max(1, Math.round(equipmentRental)), color: "#10b981" },
          { name: "Transit Freight & Highway Fuel ($)", value: Math.round(transportCost), color: "#f59e0b" },
          { name: "Boxes & Packing Materials ($)", value: Math.round(supplies), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function MovingCostCalculatorComponent() {
  return <CalcEngine config={movingCostConfig} />;
}
