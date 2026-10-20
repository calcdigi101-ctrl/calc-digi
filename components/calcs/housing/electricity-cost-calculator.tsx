"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "electricity-cost",
  title: "Electricity Cost Calculator",
  fields: [
    { kind: "number", key: "watts", label: "Appliance power rating (Watts)", suffix: "W", default: 1500, min: 1, max: 30000 },
    { kind: "number", key: "hours", label: "Average operating time per day", suffix: "hrs/day", default: 4, min: 0.1, max: 24 },
    { kind: "number", key: "rate", label: "Electricity utility rate ($ per kWh)", prefix: "$", default: 0.168, min: 0.01, max: 2.00 },
    { kind: "number", key: "quantity", label: "Number of identical units", default: 1, min: 1, max: 50, optional: true },
  ],
  compute: (v) => {
    const watts = Number(v.watts || 1500);
    const hours = Number(v.hours || 4);
    const rate = Number(v.rate || 0.168);
    const quantity = Number(v.quantity || 1);

    if (watts <= 0 || hours <= 0 || rate <= 0) {
      return { error: "Please enter valid wattage, operating hours, and electricity rate greater than zero." };
    }

    const totalWatts = watts * quantity;
    const dailyKwh = (totalWatts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30.417; // average month days
    const annualKwh = dailyKwh * 365;

    const dailyCost = dailyKwh * rate;
    const monthlyCost = monthlyKwh * rate;
    const annualCost = annualKwh * rate;
    const tenYearCost = annualCost * 10;
    const hourlyCost = (totalWatts / 1000) * rate;

    // Typical US household monthly electric bill benchmark (~$145/month)
    const avgMonthlyBill = 145;
    const applianceShare = Math.min(100, (monthlyCost / Math.max(monthlyCost, avgMonthlyBill)) * 100);
    const remainingShare = Math.max(0, avgMonthlyBill - monthlyCost);

    let badgeTone: "good" | "info" | "warn" = "info";
    let badgeText = "Moderate Consumption Appliance";

    if (monthlyCost > 75) {
      badgeTone = "warn";
      badgeText = "Heavy Power Consumer (High Electric Bill Impact)";
    } else if (monthlyCost < 15) {
      badgeTone = "good";
      badgeText = "Energy Efficient / Low Draw Appliance";
    }

    return {
      hero: {
        label: "Monthly electricity cost",
        value: `$${monthlyCost.toFixed(2)}/mo`,
        unit: `(${usd0(annualCost)}/year)`,
        sub: `Consumes ${dailyKwh.toFixed(2)} kWh/day (${monthlyKwh.toFixed(0)} kWh/month) at \$${rate.toFixed(3)}/kWh`,
      },
      badge: {
        text: badgeText,
        tone: badgeTone,
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "This Appliance", value: Number(monthlyCost.toFixed(0)), color: "#2563eb" },
          { name: "Typical Rest of Household ($145 avg)", value: Number(remainingShare.toFixed(0)), color: "#94a3b8" },
        ],
      },
      rows: [
        { label: "Estimated Monthly Electric Bill Impact", value: `$${monthlyCost.toFixed(2)}/mo`, strong: true },
        { label: "Estimated Annual Operating Cost", value: `$${annualCost.toFixed(2)}/yr`, strong: true },
        { label: "Daily Operating Cost", value: `$${dailyCost.toFixed(2)}/day` },
        { label: "Cost Per Active Operating Hour", value: `$${hourlyCost.toFixed(3)}/hr` },
        { label: "Monthly Energy Consumption", value: `${monthlyKwh.toFixed(1)} kWh` },
        { label: "Annual Energy Consumption", value: `${annualKwh.toFixed(0)} kWh` },
        { label: "10-Year Cumulative Electricity Cost", value: usd0(tenYearCost) },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Phantom Load & Peak Time Notice:</strong> Many modern appliances draw 5W to 25W in standby &ldquo;vampire&rdquo; mode 24/7. In states with Time-of-Use (TOU) utility rates (such as California and Arizona), running heavy appliances like clothes dryers and EV chargers during off-peak night hours saves 40% to 65% on electricity rates.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function ElectricityCostCalculator() {
  return <CalcEngine config={config} />;
}
