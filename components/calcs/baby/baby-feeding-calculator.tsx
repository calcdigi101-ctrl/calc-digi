"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "baby-feeding-calc",
  title: "Baby Feeding Calculator",
  presets: [
    { label: "Newborn Formula (8 lbs, 2 Weeks)", values: { feedType: "formula", ageMonths: 0, weightLbs: 8 } },
    { label: "Infant Breastfed (13 lbs, 3 Months)", values: { feedType: "breast", ageMonths: 3, weightLbs: 13 } },
    { label: "Combo Feeding (16 lbs, 5 Months)", values: { feedType: "combo", ageMonths: 5, weightLbs: 16 } },
    { label: "Older Baby with Solids (21 lbs, 9 Months)", values: { feedType: "formula", ageMonths: 9, weightLbs: 21 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "feedType",
      label: "Feeding Type",
      default: "formula",
      segmented: true,
      options: [
        { value: "formula", label: "Formula Fed" },
        { value: "breast", label: "Breast Milk (Pumped/Expressed)" },
        { value: "combo", label: "Combination (Breast + Formula)" },
      ],
    },
    {
      kind: "number",
      key: "ageMonths",
      label: "Baby's Age (Months)",
      default: 2,
      min: 0,
      max: 12,
      integer: true,
      hint: "From birth (0 months) up to 12 months",
    },
    {
      kind: "number",
      key: "weightLbs",
      label: "Baby's Current Weight (lbs)",
      default: 11,
      min: 4,
      max: 32,
      hint: "Current pediatric scale weight in pounds",
    },
  ],
  compute(values) {
    const feedType = String(values.feedType || "formula");
    const age = Math.min(12, Math.max(0, Math.floor(Number(values.ageMonths || 0))));
    const wt = Number(values.weightLbs) || 10;

    let dailyOz = 0;
    let feedsPerDay = 8;

    if (feedType === "formula") {
      // AAP rule: 2.5 oz per lb of body weight up to 32 oz max
      dailyOz = Math.min(32, Math.max(14, wt * 2.5));
      feedsPerDay = age < 1 ? 10 : age < 2 ? 8 : age < 4 ? 7 : age < 6 ? 6 : 5;
    } else if (feedType === "breast") {
      // Expressed breast milk intake stabilizes between 24-30 oz/day
      feedsPerDay = age < 1 ? 11 : age < 2 ? 9 : age < 4 ? 8 : age < 6 ? 7 : 6;
      dailyOz = age < 1 ? 20 : age < 2 ? 24 : age < 4 ? 28 : age < 6 ? 30 : 28;
    } else {
      // Combo feeding
      dailyOz = Math.min(30, Math.max(16, wt * 2.2));
      feedsPerDay = age < 1 ? 10 : age < 3 ? 8 : age < 6 ? 6 : 5;
    }

    const perFeed = dailyOz / feedsPerDay;
    const mlPerFeed = perFeed * 29.5735;
    const dailyMl = dailyOz * 29.5735;
    const intervalHours = 24 / feedsPerDay;

    const steps = [
      `AAP Weight-Based Guideline: 2.5 oz formula per pound of body weight (${wt} lbs × 2.5 = ${(wt * 2.5).toFixed(1)} oz)`,
      `Daily Intake Adjusted: ${Math.round(dailyOz)} oz per 24 hours (${Math.round(dailyMl)} ml total)`,
      `Pediatric Age Frequency (${age} months): ${feedsPerDay} recommended feedings per 24-hour cycle`,
      `Single Bottle Volume: ${Math.round(dailyOz)} oz ÷ ${feedsPerDay} feeds = ${fixed(perFeed, 1)} oz (${Math.round(mlPerFeed)} ml) per feed`,
      `Suggested Nursing Schedule: Offer feeds approximately every ${fixed(intervalHours, 1)} hours`,
    ];

    return {
      hero: {
        label: "Recommended Daily Intake",
        value: `${Math.round(dailyOz)} oz`,
        unit: "per day",
      },
      badge: {
        text: `${fixed(perFeed, 1)} oz (${Math.round(mlPerFeed)} ml) per feed`,
        tone: "good",
      },
      rows: [
        { label: "Target Daily Total (Fluid)", value: `${Math.round(dailyOz)} oz (${Math.round(dailyMl)} ml)`, strong: true },
        { label: "Recommended Feeds per 24h", value: `${feedsPerDay} feeds per day`, strong: true },
        { label: "Single Feed Volume", value: `${fixed(perFeed, 1)} oz (${Math.round(mlPerFeed)} ml)` },
        { label: "Feeding Interval", value: `Every ${fixed(intervalHours, 1)} hours` },
        { label: "Nutrition Stage", value: age >= 6 ? "Complementary Solids + Milk/Formula Primary" : "100% Exclusive Milk Nutrition" },
        { label: "Estimated Wet Diapers Expectation", value: "6 to 8 heavy wet diapers daily" },
      ],
      steps,
      chart: {
        type: "donut",
        title: "24-Hour Feeding Volume Breakdown",
        data: [
          { name: `Single Feed Portion (${fixed(perFeed, 1)} oz)`, value: Math.max(0.1, perFeed), color: "#10b981" },
          { name: `Remaining Daily Intake (${fixed(dailyOz - perFeed, 1)} oz)`, value: Math.max(0.1, dailyOz - perFeed), color: "#06b6d4" },
        ],
      },
      note: {
        text: "The American Academy of Pediatrics (AAP) recommends responsive, cue-based feeding rather than forcing a rigid schedule. Never dilute formula with extra water, and always consult your pediatrician if your baby produces fewer than 6 wet diapers daily.",
        tone: "neutral",
      },
    };
  },
};

export default function BabyFeedingCalculator() {
  return <CalcEngine config={config} />;
}
