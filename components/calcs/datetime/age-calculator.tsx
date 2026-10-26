"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const ageCalculatorConfig: CalcConfig = {
  id: "age-calculator",
  title: "Exact Chronological Age Calculator",
  fields: [
    { kind: "date", key: "birthDate", label: "Date of Birth", default: "1995-06-15" },
    { kind: "date", key: "asOfDate", label: "Age As Of Date", default: "2026-10-26" },
  ],
  presets: [
    { label: "Millennial Milestone (Born 1995)", values: { birthDate: "1995-06-15", asOfDate: "2026-10-26" } },
    { label: "Generation Z Adult (Born 2002)", values: { birthDate: "2002-09-20", asOfDate: "2026-10-26" } },
    { label: "Generation Alpha Youth (Born 2015)", values: { birthDate: "2015-03-10", asOfDate: "2026-10-26" } },
    { label: "Baby Boomer Golden Milestone (Born 1955)", values: { birthDate: "1955-11-04", asOfDate: "2026-10-26" } },
  ],
  compute: (vals) => {
    const bStr = String(vals.birthDate || "1995-06-15");
    const aStr = String(vals.asOfDate || "2026-10-26");
    const bDate = new Date(bStr + "T00:00:00Z");
    const aDate = new Date(aStr + "T00:00:00Z");

    const diffMs = Math.max(0, aDate.getTime() - bDate.getTime());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;

    let years = aDate.getUTCFullYear() - bDate.getUTCFullYear();
    let months = aDate.getUTCMonth() - bDate.getUTCMonth();
    let days = aDate.getUTCDate() - bDate.getUTCDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(Date.UTC(aDate.getUTCFullYear(), aDate.getUTCMonth(), 0));
      days += prevMonth.getUTCDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const approxLifeExp = 82;
    const pastYears = Math.min(approxLifeExp, Math.max(0, years));
    const remYears = Math.max(0, approxLifeExp - pastYears);

    return {
      hero: {
        value: `${years} Years, ${months} Months, ${days} Days`,
        label: "Exact Chronological Age",
        sub: `Total elapsed: ${totalDays.toLocaleString()} days (~${totalWeeks.toLocaleString()} weeks)`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Actuarial Lifespan & Current Epoch Allocation",
        data: [
          { name: "Completed Years", value: Math.max(1, years), color: "#10b981" },
          { name: "Months Elapsed in Current Year", value: Math.max(1, months), color: "#3b82f6" },
          { name: "Projected Remaining Horizon (Years)", value: Math.max(1, remYears), color: "#f59e0b" },
        ],
      },
      metrics: [
        { label: "Total Days Lived", value: `${totalDays.toLocaleString()} days` },
        { label: "Total Weeks Elapsed", value: `${totalWeeks.toLocaleString()} wks` },
        { label: "Total Hours Lived", value: `${totalHours.toLocaleString()} hrs` },
        { label: "Next Birthday Milestone", value: `In ${365 - (totalDays % 365)} days` },
      ],
      breakdown: [
        { label: "Birth Date Anchor", value: bStr },
        { label: "As-Of Date Anchor", value: aStr },
        { label: "Calendar Year Span", value: `${years} years` },
        { label: "Residual Month Span", value: `${months} months` },
        { label: "Residual Day Span", value: `${days} days` },
        { label: "Estimated Heartbeats (~72 bpm)", value: `~${((totalDays * 24 * 60 * 72) / 1000000).toFixed(1)} Million` },
      ],
      steps: [
        `Anchor birth date: ${bStr} and observation date: ${aStr}.`,
        `Calculate gross calendar year delta: ${aDate.getUTCFullYear()} - ${bDate.getUTCFullYear()} = ${aDate.getUTCFullYear() - bDate.getUTCFullYear()} years.`,
        `Adjust for month-day anniversary cutoff: Net age = ${years} years, ${months} months, ${days} days.`,
        `Compute total astronomical elapsed duration: ${totalDays.toLocaleString()} days (${totalHours.toLocaleString()} hours).`,
      ],
    };
  },
};

export default function AgeCalculatorComponent() {
  return <CalcEngine config={ageCalculatorConfig} />;
}
