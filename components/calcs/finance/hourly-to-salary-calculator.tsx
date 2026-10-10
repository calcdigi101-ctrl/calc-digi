"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "hs",
  title: "Hourly to Salary Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Convert",
      default: "h2s",
      segmented: true,
      full: true,
      options: [
        { value: "h2s", label: "Hourly → Salary" },
        { value: "s2h", label: "Salary → Hourly" },
      ],
    },
    { kind: "number", key: "hourly", label: "Hourly wage", prefix: "$", suffix: "/hr", default: 25, min: 0, max: 1e6, showIf: (v) => v.mode === "h2s" },
    { kind: "number", key: "salary", label: "Annual salary", prefix: "$", default: 52000, min: 0, max: 1e10, showIf: (v) => v.mode === "s2h" },
    { kind: "number", key: "hours", label: "Hours per week", default: 40, min: 1, max: 168 },
    { kind: "number", key: "weeks", label: "Weeks worked per year", hint: "52 if paid time off", default: 52, min: 1, max: 52 },
    { kind: "number", key: "otHours", label: "Overtime hours per week", default: 0, min: 0, max: 128, optional: true, group: "Overtime", showIf: (v) => v.mode === "h2s" },
    { kind: "number", key: "otRate", label: "Overtime multiplier", suffix: "×", default: 1.5, min: 1, max: 5, group: "Overtime", showIf: (v) => v.mode === "h2s" },
  ],
  compute: (v) => {
    const hrs = v.hours as number;
    const weeks = v.weeks as number;
    const hourly = v.mode === "h2s" ? (v.hourly as number) : (v.salary as number) / (hrs * weeks);
    const ot = v.mode === "h2s" ? (v.otHours as number) * hourly * (v.otRate as number) * weeks : 0;
    const annual = hourly * hrs * weeks + ot;
    const rows = [
      { label: "Hourly", value: usd(hourly), strong: v.mode === "s2h" },
      { label: "Daily (8 hrs)", value: usd(hourly * 8) },
      { label: "Weekly", value: usd(annual / 52) },
      { label: "Biweekly", value: usd(annual / 26) },
      { label: "Semi-monthly", value: usd(annual / 24) },
      { label: "Monthly", value: usd(annual / 12) },
      ...(ot > 0 ? [{ label: "Of which overtime (annual)", value: usd(ot, 0) }] : []),
    ];
    return {
      hero:
        v.mode === "h2s"
          ? { label: "Annual salary", value: usd(annual, 0), sub: `${usd(hourly)}/hr × ${hrs} hrs × ${weeks} weeks${ot > 0 ? " + overtime" : ""}` }
          : { label: "Hourly wage", value: usd(hourly), sub: `${usd(v.salary as number, 0)} ÷ (${hrs} hrs × ${weeks} weeks)` },
      rows,
      chart: {
        type: "bar",
        x: "period",
        format: "usd0",
        series: [{ key: "pay", name: "Gross pay", color: "#2563eb" }],
        data: [
          { period: "Weekly", pay: Math.round(annual / 52) },
          { period: "Biweekly", pay: Math.round(annual / 26) },
          { period: "Monthly", pay: Math.round(annual / 12) },
        ],
      },
    };
  },
};

export default function HourlyToSalaryCalculator() {
  return <CalcEngine config={config} />;
}
