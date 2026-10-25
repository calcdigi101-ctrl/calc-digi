"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const parkingCostConfig: CalcConfig = {
  id: "parking-cost-calculator",
  title: "Commercial Parking Garage, Monthly Pass and Meter Cost Calculator",
  fields: [
    {
      kind: "number",
      key: "dailyParkingRate",
      label: "Daily Transient Parking Garage Rate ($)",
      default: 24.0,
      min: 1.0,
      max: 200.0,
    },
    {
      kind: "number",
      key: "monthlyPassRate",
      label: "Monthly Reserved Parking Permit Rate ($)",
      default: 280.0,
      min: 20.0,
      max: 2000.0,
    },
    {
      kind: "number",
      key: "daysParkedPerMonth",
      label: "In-Office Days Parked Per Month",
      default: 18,
      min: 1,
      max: 31,
    },
    {
      kind: "number",
      key: "hourlyMeterRate",
      label: "Hourly Street Meter / Short-Term Rate ($)",
      default: 5.50,
      min: 0.50,
      max: 40.0,
    },
    {
      kind: "number",
      key: "hoursPerVisit",
      label: "Average Hours Parked Per Day",
      default: 4,
      min: 1,
      max: 24,
    },
  ],
  compute: (vals) => {
    const dailyRate = Math.max(1, Number(vals.dailyParkingRate) || 24.0);
    const passRate = Math.max(1, Number(vals.monthlyPassRate) || 280.0);
    const daysMonth = Math.min(31, Math.max(1, Number(vals.daysParkedPerMonth) || 18));
    const hourly = Number(vals.hourlyMeterRate) || 5.50;
    const hrsVisit = Number(vals.hoursPerVisit) || 4;

    const monthlyDailyPay = dailyRate * daysMonth;
    const netPassSavings = monthlyDailyPay - passRate;
    const breakEvenDays = Math.ceil(passRate / dailyRate);

    const hourlyDailyPay = hourly * hrsVisit;
    const annualParkingBudget = (netPassSavings > 0 ? passRate : monthlyDailyPay) * 12;

    // Standard metropolitan parking tax (18% in NYC, 20% in Chicago, 25% in SF)
    const taxShare = monthlyDailyPay * 0.18;
    const baseFacilityCost = monthlyDailyPay - taxShare;

    return {
      hero: {
        label: netPassSavings > 0 ? "Monthly Permit Recommendation" : "Daily Pay Recommendation",
        value: netPassSavings > 0 ? `Buy Pass: Save $${netPassSavings.toFixed(2)}/mo` : `Pay Daily: Save $${Math.abs(netPassSavings).toFixed(2)}/mo`,
      },
      badge: {
        text: `Break-Even Threshold: ${breakEvenDays} days/month (You park ${daysMonth} days)`,
        tone: netPassSavings >= 0 ? "good" : "warn",
      },
      secondary: [
        {
          label: "Monthly Transient Garage Outlay",
          value: `$${monthlyDailyPay.toFixed(2)} (${daysMonth} days @ $${dailyRate.toFixed(2)})`,
        },
        {
          label: "Monthly Fixed Pass Rate",
          value: `$${passRate.toFixed(2)} / month`,
        },
        {
          label: "Hourly Meter Short-Term Alternative",
          value: `$${(hourlyDailyPay * daysMonth).toFixed(2)}/mo ($${hourlyDailyPay.toFixed(2)}/day)`,
        },
        {
          label: "Projected Annual Parking Expense",
          value: `$${annualParkingBudget.toLocaleString(undefined, { maximumFractionDigits: 0 })} / year`,
        },
      ],
      steps: [
        `Monthly Daily-Pay Outlay = ${daysMonth} days * $${dailyRate.toFixed(2)}/day = $${monthlyDailyPay.toFixed(2)}`,
        `Monthly Pass Cost = $${passRate.toFixed(2)}/month flat fee`,
        `Net Monthly Differential = $${monthlyDailyPay.toFixed(2)} - $${passRate.toFixed(2)} = $${netPassSavings.toFixed(2)}`,
        `Permit Break-Even Point = $${passRate.toFixed(2)} / $${dailyRate.toFixed(2)} = ${breakEvenDays} parking days per month`,
      ],
      chart: {
        type: "donut",
        title: "Metropolitan Parking Cost Composition",
        format: "usd0",
        data: [
          { name: "Base Facility Space Rental ($)", value: Math.round(baseFacilityCost), color: "#0ea5e9" },
          { name: "Municipal Commercial Parking Tax ($)", value: Math.round(taxShare), color: "#f59e0b" },
          { name: "Digital Reservation Processing ($)", value: Math.max(10, Math.round(monthlyDailyPay * 0.08)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function ParkingCostCalculatorComponent() {
  return <CalcEngine config={parkingCostConfig} />;
}
