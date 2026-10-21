"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "intermittent-fasting",
  title: "Intermittent Fasting Calculator",
  fields: [
    {
      kind: "choice",
      key: "protocol",
      label: "Intermittent fasting protocol",
      default: "16",
      options: [
        { value: "16", label: "16:8 (Leangains Standard — 16h Fast / 8h Eating)" },
        { value: "18", label: "18:6 (Accelerated Autophagy — 18h Fast / 6h Eating)" },
        { value: "20", label: "20:4 (The Warrior Diet — 20h Fast / 4h Eating)" },
        { value: "23", label: "23:1 (OMAD — One Meal A Day — 23h Fast / 1h Eating)" },
        { value: "14", label: "14:10 (Beginner Circadian — 14h Fast / 10h Eating)" },
        { value: "12", label: "12:12 (Gentle Baseline — 12h Fast / 12h Eating)" },
      ],
    },
    {
      kind: "choice",
      key: "startTime",
      label: "First meal start time",
      default: "12:00",
      options: [
        { value: "08:00", label: "8:00 AM (Early Breakfast Window)" },
        { value: "10:00", label: "10:00 AM (Brunch Window)" },
        { value: "11:00", label: "11:00 AM (Mid-Morning Window)" },
        { value: "12:00", label: "12:00 PM (Traditional Noon Lunch)" },
        { value: "13:00", label: "1:00 PM (Late Lunch Window)" },
        { value: "14:00", label: "2:00 PM (Afternoon Window)" },
        { value: "17:00", label: "5:00 PM (Evening Dinner / OMAD)" },
        { value: "18:00", label: "6:00 PM (Standard Dinner / OMAD)" },
      ],
    },
    {
      kind: "choice",
      key: "goal",
      label: "Primary metabolic objective",
      default: "fatloss",
      segmented: true,
      options: [
        { value: "fatloss", label: "Fat Loss & Lipolysis" },
        { value: "autophagy", label: "Cellular Longevity & Autophagy" },
        { value: "insulin", label: "Insulin & Glycemic Reset" },
      ],
    },
  ],
  compute: (v) => {
    const fastHrs = Number(v.protocol || 16);
    const eatHrs = 24 - fastHrs;

    const timeStr = (v.startTime as string) || "12:00";
    const [hStr, mStr] = timeStr.split(":");
    const startH = parseInt(hStr, 10);
    const startM = parseInt(mStr, 10);

    const endH = (startH + eatHrs) % 24;
    const endM = startM;

    const format12 = (h: number, m: number) => {
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      const mPad = m < 10 ? `0${m}` : m;
      return `${h12}:${mPad} ${ampm}`;
    };

    const eatingWindowStr = `${format12(startH, startM)} – ${format12(endH, endM)}`;
    const fastingWindowStr = `${format12(endH, endM)} – ${format12(startH, startM)} (Next Day)`;

    // Autophagy & Ketosis projections
    const ketoOnsetH = (endH + 12) % 24;
    const ketoOnsetStr = `~${format12(ketoOnsetH, endM)} (12h into fast)`;

    let autoWindowStr = "Modest (14h+ required)";
    if (fastHrs >= 16) {
      const autoStartH = (endH + 14) % 24;
      autoWindowStr = `${format12(autoStartH, endM)} until next meal`;
    }

    const protocolLabels: Record<number, string> = {
      16: "16:8 Protocol (Gold Standard)",
      18: "18:6 Protocol (Intermediate)",
      20: "20:4 Protocol (Warrior Diet)",
      23: "OMAD (23:1 Single Meal)",
      14: "14:10 Protocol (Beginner)",
      12: "12:12 Protocol (Circadian)",
    };

    return {
      hero: {
        label: "Daily Feeding Window",
        value: eatingWindowStr,
        unit: `(${eatHrs} hrs)`,
        sub: `Fasting Window: ${fastingWindowStr} | ${fastHrs} Hours of Complete Caloric Rest`,
      },
      badge: { text: protocolLabels[fastHrs] || `${fastHrs}:${eatHrs}`, tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Fasting Window (Autophagy / Ketosis)", value: fastHrs, color: "#10b981" },
          { name: "Feeding Window (Nutrient Absorption)", value: eatHrs, color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Active Protocol", value: `${fastHrs}:${eatHrs}`, strong: true },
        { label: "Designated Eating Window", value: eatingWindowStr, strong: true },
        { label: "Unbroken Fasting Window", value: fastingWindowStr, strong: true },
        { label: "Total Fasting Duration", value: `${fastHrs} hours / day` },
        { label: "Total Feeding Duration", value: `${eatHrs} hours / day` },
        { label: "Estimated Ketosis Onset", value: ketoOnsetStr },
        { label: "Active Cellular Autophagy Window", value: autoWindowStr, strong: true },
        { label: "Compliant Fasting Fluids", value: "Water, unflavored sparkling water, black coffee, plain tea, non-caloric electrolytes" },
        { label: "Substances That Break Fast", value: "Milk, creamers, artificial sweeteners with cephalic response, fruit juices, protein powders" },
      ],
      note: {
        text: (
          <span>
            ⏳ <strong>Circadian Optimization:</strong> Satchin Panda&apos;s Salk Institute trials demonstrate that aligning your 8-hour feeding window with daylight hours (finishing dinner by 7:00 PM) improves glucose clearance by 30% compared to identical late-night feeding windows.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function IntermittentFastingCalculator() {
  return <CalcEngine config={config} />;
}
