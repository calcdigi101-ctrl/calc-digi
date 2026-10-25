"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "energy-consumption-calc",
  title: "Appliance Energy Consumption & Electricity Cost Calculator",
  presets: [
    { label: "Space Heater (1500W, 8 hrs)", values: { wattage: 1500, hoursPerDay: 8, quantity: 1, elecRate: 0.16, dutyCycle: "100" } },
    { label: "Central AC (3500W, 8 hrs, 65%)", values: { wattage: 3500, hoursPerDay: 8, quantity: 1, elecRate: 0.18, dutyCycle: "65" } },
    { label: "Refrigerator (180W, 24 hrs, 40%)", values: { wattage: 180, hoursPerDay: 24, quantity: 1, elecRate: 0.16, dutyCycle: "40" } },
    { label: "Gaming PC (650W, 5 hrs)", values: { wattage: 650, hoursPerDay: 5, quantity: 1, elecRate: 0.15, dutyCycle: "85" } },
    { label: "LED Lighting (12 bulbs @ 9W = 108W)", values: { wattage: 108, hoursPerDay: 6, quantity: 1, elecRate: 0.16, dutyCycle: "100" } },
    { label: "Water Heater (4500W, 3 hrs, 80%)", values: { wattage: 4500, hoursPerDay: 3, quantity: 1, elecRate: 0.16, dutyCycle: "80" } },
  ],
  fields: [
    {
      kind: "number",
      key: "wattage",
      label: "Appliance Power Rating (Watts - W)",
      default: 1500,
      min: 1,
      max: 50000,
      hint: "Found on manufacturer spec label (e.g. 1500W heater, 1200W microwave)",
    },
    {
      kind: "number",
      key: "hoursPerDay",
      label: "Operating Hours per Day (hours)",
      default: 8,
      min: 0.1,
      max: 24,
      hint: "Average active run time each day",
    },
    {
      kind: "number",
      key: "quantity",
      label: "Number of Identical Units",
      default: 1,
      min: 1,
      max: 100,
      hint: "Count of identical appliances running concurrently",
    },
    {
      kind: "number",
      key: "elecRate",
      label: "Electricity Tariff ($ / kWh)",
      default: 0.16,
      min: 0.01,
      max: 1.0,
      hint: "Your utility bill electric rate per kilowatt-hour (US avg is ~$0.164/kWh)",
    },
    {
      kind: "choice",
      key: "dutyCycle",
      label: "Compressor / Thermostat Duty Cycle",
      default: "100",
      options: [
        { value: "100", label: "100% - Continuous Full Power (Heater, TV, PC)" },
        { value: "80", label: "80% - Heavy Duty Cycling (Water Heater, Heat Pump)" },
        { value: "65", label: "65% - Moderate Cycling (Central AC, Dehumidifier)" },
        { value: "50", label: "50% - Intermittent Standard Cycling" },
        { value: "40", label: "40% - Light Cycling (Refrigerator / Freezer)" },
        { value: "25", label: "25% - Low Standby Demand" },
      ],
    },
  ],
  compute: (vals) => {
    const wattage = Number(vals.wattage) || 0;
    const hoursPerDay = Number(vals.hoursPerDay) || 0;
    const quantity = Math.max(1, Number(vals.quantity) || 1);
    const elecRate = Number(vals.elecRate) || 0;
    const dutyPercent = Number(vals.dutyCycle || 100) / 100;

    const dailyKWh = ((wattage * hoursPerDay * dutyPercent) / 1000) * quantity;
    const monthlyKWh = dailyKWh * 30.4167;
    const annualKWh = dailyKWh * 365.25;

    const dailyCost = dailyKWh * elecRate;
    const monthlyCost = monthlyKWh * elecRate;
    const annualCost = annualKWh * elecRate;

    const annualCo2Kg = annualKWh * 0.386;
    const annualCo2MT = annualCo2Kg / 1000;

    // Monthly baseline breakdown comparison
    const estimatedStandbyMonthly = monthlyCost * 0.08;
    const activeRunningMonthly = Math.max(0.01, monthlyCost - estimatedStandbyMonthly);

    return {
      hero: {
        value: `$${monthlyCost.toFixed(2)} / mo`,
        label: "Monthly Electricity Cost",
        sub: `${monthlyKWh.toFixed(1)} kWh/mo · $${annualCost.toFixed(2)} / year`,
      },
      badge: {
        text: `${dailyKWh.toFixed(2)} kWh Daily`,
        tone: monthlyCost > 75 ? "warn" : "good",
      },
      chart: {
        type: "donut",
        title: "Monthly Cost & Standby Allocation",
        data: [
          { name: `Active Power ($${activeRunningMonthly.toFixed(2)})`, value: Math.max(0.01, activeRunningMonthly), color: "#3b82f6" },
          { name: `Standby Residual ($${estimatedStandbyMonthly.toFixed(2)})`, value: Math.max(0.01, estimatedStandbyMonthly), color: "#94a3b8" },
        ],
        format: "usd",
      },
      rows: [
        { label: "Daily Energy Consumption", value: `${dailyKWh.toFixed(3)} kWh / day` },
        { label: "Monthly Energy Consumption", value: `${monthlyKWh.toFixed(2)} kWh / month`, strong: true },
        { label: "Annual Energy Consumption", value: `${annualKWh.toFixed(1)} kWh / year` },
        { label: "Daily Electricity Expense", value: `$${dailyCost.toFixed(3)} / day` },
        { label: "Monthly Electricity Expense", value: `$${monthlyCost.toFixed(2)} / month`, strong: true },
        { label: "Annual Electricity Expense", value: `$${annualCost.toFixed(2)} / year` },
        { label: "Effective Duty Wattage", value: `${(wattage * dutyPercent).toFixed(0)} Watts` },
        { label: "Annual Grid Emissions", value: `${annualCo2Kg.toFixed(1)} kg (${annualCo2MT.toFixed(2)} MT CO2e)` },
      ],
      steps: [
        `Convert power to energy: (${wattage} W * ${dutyPercent * 100}% duty * ${hoursPerDay} hrs * ${quantity} units) / 1,000 = ${dailyKWh.toFixed(3)} kWh/day.`,
        `Calculate monthly energy: ${dailyKWh.toFixed(3)} kWh/day * 30.42 days = ${monthlyKWh.toFixed(2)} kWh/month.`,
        `Compute monthly bill cost: ${monthlyKWh.toFixed(2)} kWh * $${elecRate.toFixed(2)}/kWh = $${monthlyCost.toFixed(2)} per month.`,
        `Project annual expenditure: $${monthlyCost.toFixed(2)} * 12 = $${annualCost.toFixed(2)} per year.`,
      ],
      note: {
        text: "Appliances that generate heat or refrigeration (space heaters, AC, clothes dryers, water heaters) account for over 60% of residential electric spending.",
      },
    };
  },
};

export default function EnergyConsumptionCalculator() {
  return <CalcEngine config={config} />;
}
