"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const tollCostConfig: CalcConfig = {
  id: "toll-cost-calculator",
  title: "Highway Toll Plaza, Electronic Transponder and Interstate Travel Cost Calculator",
  fields: [
    {
      kind: "number",
      key: "tollPlazasCount",
      label: "Number of Highway Toll Gantries on Route",
      default: 6,
      min: 1,
      max: 50,
    },
    {
      kind: "number",
      key: "cashTollRatePerGantry",
      label: "Average Cash / Pay-by-Plate Toll Per Gantry ($)",
      default: 3.85,
      min: 0.25,
      max: 60.0,
    },
    {
      kind: "choice",
      key: "vehicleAxles",
      label: "Vehicle Axle Classification",
      default: "two_axle_car",
      options: [
        { label: "2-Axle Passenger Car / SUV / Crossover (Base Rate 1.0x)", value: "two_axle_car" },
        { label: "2-Axle Passenger Vehicle with 1-Axle Trailer (1.5x)", value: "car_trailer" },
        { label: "3-Axle Commercial Truck / RV (2.2x)", value: "three_axle" },
        { label: "5-Axle Heavy Tractor-Trailer Semi (4.5x)", value: "five_axle" },
      ],
    },
    {
      kind: "choice",
      key: "paymentMethod",
      label: "Payment Modality & Tag Program",
      default: "transponder",
      options: [
        { label: "Electronic Transponder (E-ZPass, SunPass, FasTrak ~30% Discount)", value: "transponder" },
        { label: "Cash / Video Toll-by-Plate (Full Standard Tariff)", value: "toll_by_plate" },
        { label: "Dynamic Express HOT Lane Peak Travel (+50% Surcharge)", value: "express_hot" },
      ],
    },
    {
      kind: "number",
      key: "travelFrequencyDays",
      label: "Annual Return Trips Along Route",
      default: 12,
      min: 1,
      max: 365,
    },
  ],
  compute: (vals) => {
    const gantries = Math.max(1, Number(vals.tollPlazasCount) || 6);
    const baseRate = Number(vals.cashTollRatePerGantry) || 3.85;
    const axle = String(vals.vehicleAxles || "two_axle_car");
    const payment = String(vals.paymentMethod || "transponder");
    const trips = Math.max(1, Number(vals.travelFrequencyDays) || 12);

    const AXLE_MAP: Record<string, number> = {
      two_axle_car: 1.0,
      car_trailer: 1.5,
      three_axle: 2.2,
      five_axle: 4.5,
    };
    const axleMultiplier = AXLE_MAP[axle] || 1.0;

    let payMultiplier = 1.0;
    if (payment === "transponder") {
      payMultiplier = 0.70; // 30% discount
    } else if (payment === "express_hot") {
      payMultiplier = 1.50; // 50% dynamic express lane surcharge
    }

    const costPerGantry = baseRate * axleMultiplier * payMultiplier;
    const tripTotal = costPerGantry * gantries;
    const standardCashTotal = baseRate * axleMultiplier * gantries;
    const transponderSavings = Math.max(0, standardCashTotal - tripTotal);
    const annualTotal = tripTotal * trips;

    return {
      hero: {
        label: "Estimated Route Toll Expense",
        value: `$${tripTotal.toFixed(2)}`,
      },
      badge: {
        text: payment === "transponder" ? `Saved $${transponderSavings.toFixed(2)} vs Cash Tariff (30% Discount)` : "Standard Undiscounted Toll Tariff",
        tone: payment === "transponder" ? "good" : "warn",
      },
      secondary: [
        {
          label: "Average Toll Per Gantry",
          value: `$${costPerGantry.toFixed(2)} / plaza`,
        },
        {
          label: "Electronic Tag Savings Per Trip",
          value: `$${transponderSavings.toFixed(2)} (${(transponderSavings / standardCashTotal * 100).toFixed(0)}% saved)`,
        },
        {
          label: "Annual Cumulative Toll Expense",
          value: `$${annualTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${trips} trips/yr)`,
        },
        {
          label: "Vehicle Axle Multiplier Factor",
          value: `${axleMultiplier.toFixed(1)}x (${axle.replace(/_/g, " ")})`,
        },
      ],
      steps: [
        `Base Undiscounted Tariff = ${gantries} gantries * $${baseRate.toFixed(2)} * ${axleMultiplier.toFixed(1)}x axle = $${standardCashTotal.toFixed(2)}`,
        `Payment Modifier (${payment}) = ${payMultiplier.toFixed(2)}x factor`,
        `Effective Route Toll = $${standardCashTotal.toFixed(2)} * ${payMultiplier.toFixed(2)} = $${tripTotal.toFixed(2)}`,
        `Annual Outlay (${trips} trips/yr) = $${tripTotal.toFixed(2)} * ${trips} = $${annualTotal.toFixed(2)}`,
      ],
      chart: {
        type: "donut",
        title: "Toll Tariff Expense Allocation",
        format: "usd0",
        data: [
          { name: "Electronic Transponder Toll ($)", value: Math.round(tripTotal), color: "#0ea5e9" },
          { name: "Electronic Tag Discount Savings ($)", value: Math.max(1, Math.round(transponderSavings)), color: "#10b981" },
          { name: "Video Toll-by-Plate Admin Burden ($)", value: Math.max(0, Math.round(standardCashTotal * 0.15)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function TollCostCalculatorComponent() {
  return <CalcEngine config={tollCostConfig} />;
}
