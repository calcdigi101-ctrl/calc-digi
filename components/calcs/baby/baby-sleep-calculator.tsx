"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed } from "@/components/flagship/engine/format";

const SLEEP_GUIDELINES: { minAge: number; maxAge: number; total: number; naps: number; napHrs: number; nightHrs: number; wakeWindow: string }[] = [
  { minAge: 0, maxAge: 2, total: 16.0, naps: 4, napHrs: 5.0, nightHrs: 11.0, wakeWindow: "45–60 minutes" },
  { minAge: 3, maxAge: 4, total: 15.0, naps: 3, napHrs: 4.0, nightHrs: 11.0, wakeWindow: "75–120 minutes" },
  { minAge: 5, maxAge: 6, total: 14.5, naps: 3, napHrs: 3.5, nightHrs: 11.0, wakeWindow: "2–2.5 hours" },
  { minAge: 7, maxAge: 9, total: 14.0, naps: 2, napHrs: 3.0, nightHrs: 11.0, wakeWindow: "2.5–3.5 hours" },
  { minAge: 10, maxAge: 12, total: 13.5, naps: 2, napHrs: 2.5, nightHrs: 11.0, wakeWindow: "3–4 hours" },
  { minAge: 13, maxAge: 18, total: 13.0, naps: 1, napHrs: 2.0, nightHrs: 11.0, wakeWindow: "4–5 hours" },
  { minAge: 19, maxAge: 36, total: 12.5, naps: 1, napHrs: 1.5, nightHrs: 11.0, wakeWindow: "5–6 hours" },
];

export const config: CalcConfig = {
  id: "baby-sleep-calc",
  title: "Baby Sleep Schedule & Bedtime Calculator",
  presets: [
    { label: "Newborn (1 Month, 16 hrs sleep)", values: { ageMonths: 1, morningWake: "07:00" } },
    { label: "4-Month Infant (3 Naps, 75–120 min wake)", values: { ageMonths: 4, morningWake: "07:00" } },
    { label: "8-Month Baby (2 Naps, 7:00 PM Bedtime)", values: { ageMonths: 8, morningWake: "06:30" } },
    { label: "18-Month Toddler (1 Afternoon Nap)", values: { ageMonths: 18, morningWake: "07:00" } },
  ],
  fields: [
    {
      kind: "number",
      key: "ageMonths",
      label: "Baby's Age (Months, 0 to 36)",
      default: 6,
      min: 0,
      max: 36,
      integer: true,
      hint: "Completed calendar months of age",
    },
    {
      kind: "choice",
      key: "morningWake",
      label: "Target Morning Wake-Up Time",
      default: "07:00",
      segmented: false,
      options: [
        { value: "06:00", label: "6:00 AM" },
        { value: "06:30", label: "6:30 AM" },
        { value: "07:00", label: "7:00 AM (Recommended)" },
        { value: "07:30", label: "7:30 AM" },
        { value: "08:00", label: "8:00 AM" },
      ],
    },
  ],
  compute(values) {
    const age = Math.min(36, Math.max(0, Math.floor(Number(values.ageMonths || 0))));
    const morningWake = String(values.morningWake || "07:00");

    const guide =
      SLEEP_GUIDELINES.find((g) => age >= g.minAge && age <= g.maxAge) ||
      SLEEP_GUIDELINES[SLEEP_GUIDELINES.length - 1];

    const [wakeH, wakeM] = morningWake.split(":").map(Number);
    // Ideal bedtime = morning wake - night hours
    const totalWakeMinutes = wakeH * 60 + wakeM;
    const nightMinutes = Math.round(guide.nightHrs * 60);
    let bedMinutes = totalWakeMinutes - nightMinutes;
    if (bedMinutes < 0) bedMinutes += 24 * 60;

    const bedHour24 = Math.floor(bedMinutes / 60);
    const bedMin = bedMinutes % 60;
    const bedHour12 = bedHour24 % 12 || 12;
    const bedAmPm = bedHour24 >= 12 ? "PM" : "AM";
    const bedStr = `${bedHour12}:${bedMin < 10 ? "0" : ""}${bedMin} ${bedAmPm}`;

    const awakeHrs = 24 - guide.total;

    const steps = [
      `American Academy of Pediatrics (AAP) Guideline for ${age} Months: ${guide.total} hours total sleep in 24 hours`,
      `Nighttime Sleep Need: ${guide.nightHrs} hours continuous night duration`,
      `Daytime Naps Requirement: ${guide.napHrs} hours distributed across ${guide.naps} nap(s)`,
      `Optimal Bedtime Calculation: ${morningWake} wake time − ${guide.nightHrs} hours = ${bedStr}`,
      `Age-Appropriate Wake Window: Maintain ${guide.wakeWindow} awake between daytime sleep cycles`,
    ];

    return {
      hero: {
        label: "Recommended Bedtime",
        value: bedStr,
        unit: `${guide.nightHrs}h night`,
      },
      badge: {
        text: `${guide.total} Hours Total Daily Sleep`,
        tone: "good",
      },
      rows: [
        { label: "Target Bedtime Window", value: bedStr, strong: true },
        { label: "Optimal Wake Window", value: guide.wakeWindow, strong: true },
        { label: "Daytime Naps Needed", value: `${guide.naps} nap${guide.naps > 1 ? "s" : ""} (${guide.napHrs} hours total)` },
        { label: "Night Sleep Duration", value: `${guide.nightHrs} hours` },
        { label: "Total Sleep in 24 Hours", value: `${guide.total} hours` },
        { label: "Target Morning Wake", value: morningWake.startsWith("0") ? morningWake.slice(1) + " AM" : morningWake + " AM" },
      ],
      steps,
      chart: {
        type: "donut",
        title: "24-Hour Day/Night Sleep Distribution",
        data: [
          { name: `Night Sleep (${guide.nightHrs} hrs)`, value: guide.nightHrs, color: "#10b981" },
          { name: `Daytime Naps (${guide.napHrs} hrs)`, value: guide.napHrs, color: "#06b6d4" },
          { name: `Awake & Active (${fixed(awakeHrs, 1)} hrs)`, value: Math.max(0.1, awakeHrs), color: "#f59e0b" },
        ],
      },
      note: {
        text: "Overtiredness triggers cortisol spikes in infants, making falling asleep harder. Watching for early sleepy cues (gazing away, rubbing ears, red eyebrows) within the recommended wake window prevents overtired sleep battles.",
        tone: "neutral",
      },
    };
  },
};

export default function BabySleepCalculator() {
  return <CalcEngine config={config} />;
}
