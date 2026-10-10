"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd } from "@/components/flagship/engine/format";
import { simpleTakeHome } from "@/lib/tax";

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
    const regular = hourly * hrs * weeks;
    const annual = regular + ot;
    const tax = simpleTakeHome(annual);
    const periods: [string, number][] = [
      ["Hourly", 0],
      ["Daily (8 hrs)", 0],
      ["Weekly", 52],
      ["Biweekly", 26],
      ["Semi-monthly", 24],
      ["Monthly", 12],
      ["Annual", 1],
    ];
    const gross = (label: string, n: number) => (label === "Hourly" ? hourly : label.startsWith("Daily") ? hourly * 8 : annual / n);
    return {
      hero:
        v.mode === "h2s"
          ? { label: "Annual salary", value: usd(annual, 0), sub: `${usd(hourly)}/hr × ${hrs} hrs × ${weeks} weeks${ot > 0 ? " + overtime" : ""}` }
          : { label: "Hourly wage", value: usd(hourly), sub: `${usd(v.salary as number, 0)} ÷ (${hrs} hrs × ${weeks} weeks)` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Est. take-home", value: tax.takeHome, color: "#10b981" },
          { name: "Federal income tax", value: tax.fed, color: "#ef4444" },
          { name: "Social Security + Medicare", value: tax.fica, color: "#f59e0b" },
        ],
      },
      rows: [
        ...periods.slice(0, 6).map(([label, n]) => ({ label, value: usd(gross(label, n)), strong: v.mode === "s2h" && label === "Hourly" })),
        ...(ot > 0 ? [{ label: "Of which overtime (annual)", value: usd(ot, 0) }] : []),
      ],
      note: { tone: "info", text: "Take-home is a single-filer estimate (federal tax on the standard deduction + FICA, no state tax)." },
      details: [
        {
          title: "Pay by period",
          chart: {
            type: "stacked-bar",
            x: "period",
            format: "usd0",
            series: [
              { key: "regular", name: "Regular pay", color: "#2563eb" },
              { key: "overtime", name: "Overtime", color: "#f59e0b" },
            ],
            data: (["Weekly", "Biweekly", "Monthly"] as const).map((p) => {
              const n = { Weekly: 52, Biweekly: 26, Monthly: 12 }[p];
              return { period: p, regular: Math.round(regular / n), overtime: Math.round(ot / n) };
            }),
          },
          table: {
            head: ["Period", "Gross pay", "Est. take-home"],
            rows: periods.map(([label, n]) => {
              const g = gross(label, n);
              return [label, usd(g), usd(g * (annual > 0 ? tax.takeHome / annual : 0))];
            }),
          },
        },
      ],
    };
  },
};

export default function HourlyToSalaryCalculator() {
  return <CalcEngine config={config} />;
}
