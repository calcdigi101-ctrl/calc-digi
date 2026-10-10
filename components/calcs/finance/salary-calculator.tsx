"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd } from "@/components/flagship/engine/format";

const UNITS: Record<string, string> = {
  hour: "Hourly",
  day: "Daily",
  week: "Weekly",
  biweek: "Biweekly",
  semimonth: "Semi-monthly",
  month: "Monthly",
  quarter: "Quarterly",
  year: "Annual",
};

export const config: CalcConfig = {
  id: "sal",
  title: "Salary Calculator",
  fields: [
    { kind: "number", key: "amount", label: "Pay amount", prefix: "$", default: 75000, min: 0, max: 1e10 },
    { kind: "choice", key: "per", label: "Per", default: "year", options: Object.entries(UNITS).map(([value, label]) => ({ value, label })) },
    { kind: "number", key: "hours", label: "Hours per week", default: 40, min: 1, max: 168 },
    { kind: "number", key: "days", label: "Days per week", default: 5, min: 1, max: 7 },
    { kind: "number", key: "holidays", label: "Paid holidays per year", default: 10, min: 0, max: 100, optional: true, group: "Unadjusted vs. adjusted pay" },
    { kind: "number", key: "vacation", label: "Paid vacation days per year", default: 15, min: 0, max: 200, optional: true, group: "Unadjusted vs. adjusted pay" },
  ],
  compute: (v) => {
    const hpw = v.hours as number;
    const dpw = v.days as number;
    const hoursPerYear = hpw * 52;
    const daysPerYear = dpw * 52;
    const toYear: Record<string, number> = {
      hour: hoursPerYear,
      day: daysPerYear,
      week: 52,
      biweek: 26,
      semimonth: 24,
      month: 12,
      quarter: 4,
      year: 1,
    };
    const annual = (v.amount as number) * toYear[String(v.per)];
    const offDays = (v.holidays as number) + (v.vacation as number);
    const workedDays = Math.max(1, daysPerYear - offDays);
    // Adjusted: what each hour/day actually worked is worth when paid time off is excluded.
    const adjHourly = annual / ((workedDays * hpw) / dpw);
    const table = Object.entries(UNITS).map(([k, label]) => [label, usd(annual / toYear[k])]);
    return {
      hero: { label: "Annual salary", value: usd(annual, 0), sub: `${usd(annual / hoursPerYear)} an hour at ${hpw} hrs/week` },
      chart: {
        type: "bar",
        x: "period",
        format: "usd0",
        series: [{ key: "pay", name: "Pay", color: "#2563eb" }],
        data: [
          ["Weekly", 52],
          ["Biweekly", 26],
          ["Monthly", 12],
          ["Quarterly", 4],
        ].map(([p, d]) => ({ period: p as string, pay: Math.round(annual / (d as number)) })),
      },
      rows: [
        ...table.slice(0, 7).map(([label, value]) => ({ label, value, strong: label === "Hourly" })),
        ...(offDays > 0 ? [{ label: `Hourly, excluding ${offDays} paid days off`, value: usd(adjHourly) }] : []),
      ],
    };
  },
};

export default function SalaryCalculator() {
  return <CalcEngine config={config} />;
}
