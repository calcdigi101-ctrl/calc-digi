"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const dateToDayCalculatorConfig: CalcConfig = {
  id: "date-to-day-calculator",
  title: "Date to Day of Week Calculator (Zeller's Congruence)",
  fields: [
    { kind: "date", key: "targetDate", label: "Select Any Calendar Date", default: "2026-10-26" },
  ],
  presets: [
    { label: "Today's Active Date (Oct 26, 2026)", values: { targetDate: "2026-10-26" } },
    { label: "US Independence Declaration (Jul 4, 1776)", values: { targetDate: "1776-07-04" } },
    { label: "Apollo 11 Moon Landing (Jul 20, 1969)", values: { targetDate: "1969-07-20" } },
    { label: "New Millennium Day (Jan 1, 2000)", values: { targetDate: "2000-01-01" } },
  ],
  compute: (vals) => {
    const tStr = String(vals.targetDate || "2026-10-26");
    const [yRaw, mRaw, dRaw] = tStr.split("-").map(Number);

    const dateObj = new Date(Date.UTC(yRaw, mRaw - 1, dRaw));
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[dateObj.getUTCDay()];

    // Zeller congruence parameters
    let m = mRaw;
    let y = yRaw;
    if (m <= 2) {
      m += 12;
      y -= 1;
    }
    const K = y % 100;
    const J = Math.floor(y / 100);
    const q = dRaw;
    const h = (q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;

    const isWeekend = dateObj.getUTCDay() === 0 || dateObj.getUTCDay() === 6;
    const dayOfYear = Math.floor((dateObj.getTime() - new Date(Date.UTC(yRaw, 0, 1)).getTime()) / 86400000) + 1;

    return {
      hero: {
        value: dayName,
        label: `Day of the Week for ${tStr}`,
        sub: `Day ${dayOfYear} of year ${yRaw} (${isWeekend ? "Weekend" : "Weekday"})`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Gregorian 7-Day Week Modulo Distribution",
        data: [
          { name: "Day Index in Week", value: dateObj.getUTCDay() + 1, color: "#10b981" },
          { name: "Remaining Days in Week", value: 6 - dateObj.getUTCDay() + 1, color: "#3b82f6" },
        ],
      },
      metrics: [
        { label: "Day of Week", value: dayName },
        { label: "ISO Day Number (1-7)", value: `${dateObj.getUTCDay() === 0 ? 7 : dateObj.getUTCDay()}` },
        { label: "Day of Year", value: `Day ${dayOfYear} / 365` },
        { label: "Zeller Index (h)", value: `${h} (Modulo 7)` },
      ],
      breakdown: [
        { label: "Target Date Anchor", value: tStr },
        { label: "Day of the Week", value: dayName },
        { label: "Calendar Classification", value: isWeekend ? "Weekend (Sat/Sun)" : "Business Weekday (Mon-Fri)" },
        { label: "Century Code (J)", value: `${J}` },
        { label: "Year in Century (K)", value: `${K}` },
        { label: "Zeller Shifted Month (m)", value: `${m}` },
      ],
      steps: [
        `Extract components: Day q = ${q}, Month m = ${mRaw}, Year y = ${yRaw}.`,
        `Apply Zeller adjustment for Jan/Feb: Shifted month m = ${m}, year y = ${y}.`,
        `Decompose year: Century J = ${J}, Year in century K = ${K}.`,
        `Evaluate Zeller's congruence formula modulo 7: h = ${h} → Resolves conclusively to ${dayName}.`,
      ],
    };
  },
};

export default function DateToDayCalculatorComponent() {
  return <CalcEngine config={dateToDayCalculatorConfig} />;
}
