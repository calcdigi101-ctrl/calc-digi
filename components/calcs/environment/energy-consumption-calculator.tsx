"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "energy-consumption-calc",
  title: "Appliance Energy Consumption & Electricity Cost Calculator",
  presets: [
    { label: "Portable Space Heater (1500W, 8 hrs/day)", values: { wattage: 1500, hoursPerDay: 8, quantity: 1, elecRate: 0.16, dutyCycle: "100" } },
    { label: "Central Air Conditioner (3500W, 8 hrs, 65% cycle)", values: { wattage: 3500, hoursPerDay: 8, quantity: 1, elecRate: 0.18, dutyCycle: "65" } },
    { label: "Modern Refrigerator (180W, 24 hrs, 40% cycle)", values: { wattage: 180, hoursPerDay: 24, quantity: 1, elecRate: 0.16, dutyCycle: "40" } },
    { label: "High-End Gaming PC Rig (650W, 5 hrs/day)", values: { wattage: 650, hoursPerDay: 5, quantity: 1, elecRate: 0.15, dutyCycle: "85" } },
    { label: "LED Whole-Home Lighting (12 bulbs @ 9W = 108W)", values: { wattage: 108, hoursPerDay: 6, quantity: 1, elecRate: 0.16, dutyCycle: "100" } },
    { label: "Electric Water Heater (4500W, 3 hrs/day, 80% cycle)", values: { wattage: 4500, hoursPerDay: 3, quantity: 1, elecRate: 0.16, dutyCycle: "80" } },
  ],
  fields: [
    {
      kind: "number",
      key: "wattage",
      label: "Appliance Power Rating (Watts - W)",
      default: 1500,
      min: 1,
      max: 50000,
      hint: "Found on manufacturer spec label (e.g. 1500W heater, 1200W microwave, 60W TV)",
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
      hint: "Count of identical appliances running concurrently (e.g., 8 light bulbs)",
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
        { value: "100", label: "100% - Continuous Full Power (Heater, TV, Computer, Bulb)" },
        { value: "80", label: "80% - Heavy Duty Cycling (Water Heater, Heat Pump)" },
        { value: "65", label: "65% - Moderate Cycling (Central AC, Dehumidifier)" },
        { value: "50", label: "50% - Intermittent Standard Cycling" },
        { value: "40", label: "40% - Light Cycling (Energy Star Refrigerator / Freezer)" },
        { value: "25", label: "25% - Low Standby / Minimal Thermostat Demand" },
      ],
    },
  ],
  compute: (vals) => {
    const wattage = Number(vals.wattage) || 0;
    const hoursPerDay = Number(vals.hoursPerDay) || 0;
    const quantity = Math.max(1, Number(vals.quantity) || 1);
    const elecRate = Number(vals.elecRate) || 0;
    const dutyPercent = Number(vals.dutyCycle || 100) / 100;

    // Effective daily kilowatt-hours
    const dailyKWh = ((wattage * hoursPerDay * dutyPercent) / 1000) * quantity;
    const monthlyKWh = dailyKWh * 30.4167; // Average days per month
    const annualKWh = dailyKWh * 365.25;

    // Costs
    const dailyCost = dailyKWh * elecRate;
    const monthlyCost = monthlyKWh * elecRate;
    const annualCost = annualKWh * elecRate;

    // Emissions: 1 kWh = ~0.386 kg CO2e (EPA national average grid factor)
    const annualCo2Kg = annualKWh * 0.386;
    const annualCo2MT = annualCo2Kg / 1000;

    return {
      hero: {
        value: `$${monthlyCost.toFixed(2)} / mo`,
        label: `${monthlyKWh.toFixed(1)} kWh/mo · $${annualCost.toFixed(2)} / year`,
      },
      badge: {
        text: `${dailyKWh.toFixed(2)} kWh Daily Consumption`,
        tone: monthlyCost > 75 ? "warn" : "good",
      },
      rows: [
        { label: "Daily Energy Consumption", value: `${dailyKWh.toFixed(3)} kWh / day` },
        { label: "Monthly Energy Consumption", value: `${monthlyKWh.toFixed(2)} kWh / month` },
        { label: "Annual Energy Consumption", value: `${annualKWh.toFixed(1)} kWh / year` },
        { label: "Daily Electricity Expense", value: `$${dailyCost.toFixed(3)} / day` },
        { label: "Monthly Electricity Expense", value: `$${monthlyCost.toFixed(2)} / month` },
        { label: "Annual Electricity Expense", value: `$${annualCost.toFixed(2)} / year` },
        { label: "Effective Duty-Cycle Wattage", value: `${(wattage * dutyPercent).toFixed(0)} Watts effective` },
        { label: "Annual Grid CO2e Emissions", value: `${annualCo2Kg.toFixed(1)} kg (${annualCo2MT.toFixed(2)} metric tons)` },
      ],
      steps: [
        `Convert power to energy: (${wattage} W * ${dutyPercent * 100}% duty cycle * ${hoursPerDay} hrs * ${quantity} units) / 1,000 = ${dailyKWh.toFixed(3)} kWh/day.`,
        `Calculate monthly energy: ${dailyKWh.toFixed(3)} kWh/day * 30.42 days = ${monthlyKWh.toFixed(2)} kWh/month.`,
        `Compute monthly utility bill cost: ${monthlyKWh.toFixed(2)} kWh * $${elecRate.toFixed(2)}/kWh = $${monthlyCost.toFixed(2)} per month.`,
        `Project annual expenditure: $${monthlyCost.toFixed(2)} * 12 = $${annualCost.toFixed(2)} per year.`,
      ],
      note: {
        text: "Appliances that generate heat or refrigeration (space heaters, central AC, clothes dryers, water heaters) consume over 60% of total residential electric utility spending.",
      },
    };
  },
};

export default function EnergyConsumptionCalculator() {
  return <CalcEngine config={config} />;
}
