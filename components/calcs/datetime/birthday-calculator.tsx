"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const birthdayCalculatorConfig: CalcConfig = {
  id: "birthday-calculator",
  title: "Birthday Milestone & Weekday Calculator",
  fields: [
    { kind: "date", key: "birthDate", label: "Date of Birth", default: "2000-01-01" },
    { kind: "choice", key: "targetMilestone", label: "Milestone Celebration", default: "next", options: [
      { label: "Next Upcoming Birthday", value: "next" },
      { label: "30th Milestone Jubilee", value: "30" },
      { label: "50th Golden Jubilee", value: "50" },
      { label: "65th Retirement Milestone", value: "65" },
    ] },
  ],
  presets: [
    { label: "Millennium Baby (Jan 1, 2000)", values: { birthDate: "2000-01-01", targetMilestone: "next" } },
    { label: "Summer Solstice Birthday (Jun 21, 1990)", values: { birthDate: "1990-06-21", targetMilestone: "next" } },
    { label: "Leap Day Birthday (Feb 29, 2004)", values: { birthDate: "2004-02-29", targetMilestone: "next" } },
    { label: "Autumn Equinox (Sep 22, 1985)", values: { birthDate: "1985-09-22", targetMilestone: "50" } },
  ],
  compute: (vals) => {
    const bStr = String(vals.birthDate || "2000-01-01");
    const bDate = new Date(bStr + "T00:00:00Z");
    const now = new Date("2026-10-26T00:00:00Z");

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bornDayOfWeek = daysOfWeek[bDate.getUTCDay()];

    const thisYear = now.getUTCFullYear();
    let nextBday = new Date(Date.UTC(thisYear, bDate.getUTCMonth(), bDate.getUTCDate()));
    if (nextBday < now) {
      nextBday = new Date(Date.UTC(thisYear + 1, bDate.getUTCMonth(), bDate.getUTCDate()));
    }

    const msUntil = Math.max(0, nextBday.getTime() - now.getTime());
    const daysUntil = Math.ceil(msUntil / (1000 * 60 * 60 * 24));
    const nextDayOfWeek = daysOfWeek[nextBday.getUTCDay()];

    const ageNext = nextBday.getUTCFullYear() - bDate.getUTCFullYear();
    const daysSinceLast = 365 - daysUntil;

    return {
      hero: {
        value: `${daysUntil} Days Away`,
        label: `Next Birthday Countdown (Turning ${ageNext})`,
        sub: `Will fall on a ${nextDayOfWeek}, ${nextBday.toISOString().split("T")[0]}`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Annual Birthday Orbit Cycle",
        data: [
          { name: "Days Elapsed Since Last Birthday", value: Math.max(1, daysSinceLast), color: "#3b82f6" },
          { name: "Days Remaining Until Next Birthday", value: Math.max(1, daysUntil), color: "#10b981" },
        ],
      },
      metrics: [
        { label: "Day of Week Born", value: bornDayOfWeek },
        { label: "Upcoming Birthday Day", value: nextDayOfWeek },
        { label: "Upcoming Age", value: `${ageNext} Years Old` },
        { label: "Solar Orbit Progress", value: `${Math.round((daysSinceLast / 365) * 100)}%` },
      ],
      breakdown: [
        { label: "Exact Birthdate", value: bStr },
        { label: "Day of Birth", value: bornDayOfWeek },
        { label: "Next Birthday Date", value: nextBday.toISOString().split("T")[0] },
        { label: "Days Until Next Milestone", value: `${daysUntil} days` },
        { label: "Weeks Until Next Milestone", value: `${Math.floor(daysUntil / 7)} weeks, ${daysUntil % 7} days` },
      ],
      steps: [
        `Determine birth day of week using Gregorian modulo 7: ${bStr} fell on a ${bornDayOfWeek}.`,
        `Locate current solar anniversary date: ${nextBday.toISOString().split("T")[0]}.`,
        `Calculate remaining calendar delta: ${nextBday.getTime()} - ${now.getTime()} = ${daysUntil} days.`,
        `Determine upcoming anniversary day of week: ${nextDayOfWeek}.`,
      ],
    };
  },
};

export default function BirthdayCalculatorComponent() {
  return <CalcEngine config={birthdayCalculatorConfig} />;
}
