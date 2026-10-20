"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "renovation",
  title: "Renovation Cost Calculator",
  fields: [
    {
      kind: "choice",
      key: "room",
      label: "Project renovation scope",
      default: "kitchen",
      options: [
        { value: "kitchen", label: "Kitchen Remodel" },
        { value: "bath_primary", label: "Primary / Master Bathroom" },
        { value: "bath_guest", label: "Guest Bathroom / Powder Room" },
        { value: "basement", label: "Basement Finishing" },
        { value: "whole_house", label: "Whole-Home Renovation" },
      ],
    },
    { kind: "number", key: "sqft", label: "Project square footage", suffix: "sq ft", default: 180, min: 20, max: 10000 },
    {
      kind: "choice",
      key: "tier",
      label: "Finish quality tier",
      default: "mid",
      options: [
        { value: "budget", label: "Budget / Rental Grade (Stock cabinets, laminate/vinyl)" },
        { value: "mid", label: "Mid-Range / Semi-Custom (Quartz, solid wood, tile, LVP)" },
        { value: "luxury", label: "High-End / Custom Luxury (Marble, custom millwork, pro appliances)" },
      ],
    },
    {
      kind: "choice",
      key: "contractor",
      label: "Labor & project management",
      default: "gc",
      segmented: true,
      options: [
        { value: "gc", label: "General Contractor (Turnkey)" },
        { value: "diy_sub", label: "Owner-Managed Subs (Save ~25%)" },
      ],
    },
    {
      kind: "choice",
      key: "contingency",
      label: "Unforeseen contingency buffer",
      default: "15",
      segmented: true,
      options: [
        { value: "10", label: "10% (Newer Home)" },
        { value: "15", label: "15% (Recommended)" },
        { value: "20", label: "20% (Pre-1980 Home)" },
      ],
    },
  ],
  compute: (v) => {
    const sqft = Number(v.sqft || 180);
    const room = v.room || "kitchen";
    const tier = v.tier || "mid";
    const isGC = v.contractor === "gc";
    const contingencyPct = Number(v.contingency || 15);

    if (sqft <= 0) {
      return { error: "Please enter a valid square footage greater than zero." };
    }

    // Benchmark rates ($/sq ft) based on NAHB & Cost vs Value data
    const rateMatrix: Record<string, Record<string, number>> = {
      kitchen: { budget: 110, mid: 185, luxury: 320 },
      bath_primary: { budget: 130, mid: 220, luxury: 380 },
      bath_guest: { budget: 100, mid: 175, luxury: 290 },
      basement: { budget: 45, mid: 75, luxury: 130 },
      whole_house: { budget: 60, mid: 110, luxury: 200 },
    };

    const baseRatePerSqFt = rateMatrix[room]?.[tier] || 150;
    const laborMultiplier = isGC ? 1.0 : 0.75;
    const baseCost = sqft * baseRatePerSqFt * laborMultiplier;

    const materialsShare = baseCost * 0.45;
    const laborShare = baseCost * (isGC ? 0.45 : 0.25);
    const permitsAndDesign = baseCost * 0.10;

    const contingencyFund = baseCost * (contingencyPct / 100);
    const totalEstimatedBudget = baseCost + contingencyFund;
    const effectiveCostPerSqFt = totalEstimatedBudget / sqft;

    // Timeline estimate
    const timelineWeeks =
      room === "kitchen" ? (tier === "luxury" ? "10–14 weeks" : "6–9 weeks") :
      room === "bath_primary" ? (tier === "luxury" ? "5–8 weeks" : "3–5 weeks") :
      room === "basement" ? "6–10 weeks" :
      room === "whole_house" ? "16–26 weeks" : "2–4 weeks";

    // Expected ROI at resale
    const roiPct =
      room === "kitchen" ? (tier === "budget" ? "75–85%" : "60–70%") :
      room === "bath_primary" ? "65–72%" :
      room === "basement" ? "70–75%" : "60–68%";

    return {
      hero: {
        label: "Estimated total budget",
        value: usd0(totalEstimatedBudget),
        unit: `(${usd0(effectiveCostPerSqFt)}/sq ft)`,
        sub: `Includes base construction: ${usd0(baseCost)} + ${contingencyPct}% contingency reserve (${usd0(contingencyFund)})`,
      },
      badge: {
        text: `Estimated ROI at Resale: ${roiPct}`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Materials & Fixtures", value: Number(materialsShare.toFixed(0)), color: "#2563eb" },
          { name: "Skilled Labor & Trades", value: Number(laborShare.toFixed(0)), color: "#10b981" },
          { name: "Permits, Plans & Disposal", value: Number(permitsAndDesign.toFixed(0)), color: "#06b6d4" },
          { name: `Contingency Reserve (${contingencyPct}%)`, value: Number(contingencyFund.toFixed(0)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Base Construction Estimate", value: usd0(baseCost), strong: true },
        { label: `Contingency Reserve (${contingencyPct}%)`, value: usd0(contingencyFund), strong: true },
        { label: "Materials & Fixtures Allocation", value: usd0(materialsShare) },
        { label: "Skilled Labor & Trade Subcontracts", value: usd0(laborShare) },
        { label: "City Permits & Architectural Plans", value: usd0(permitsAndDesign) },
        { label: "Estimated Project Timeline", value: timelineWeeks },
        { label: "Projected Cost Recovery at Resale", value: roiPct },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Contractor Tip:</strong> Always secure at least 3 itemized bids with detailed scopes of work before signing. Ensure your contract specifies a 10% final retention payment held until all punch-list items and final city building inspections pass.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function RenovationCostCalculator() {
  return <CalcEngine config={config} />;
}
