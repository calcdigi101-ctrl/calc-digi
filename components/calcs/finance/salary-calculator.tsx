"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd } from "@/components/flagship/engine/format";
import { FILING_OPTIONS, simpleTakeHome, type FilingStatus } from "@/lib/tax";

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
    { kind: "choice", key: "status", label: "Filing status", hint: "for the tax estimate", default: "single", options: FILING_OPTIONS, group: "Unadjusted vs. adjusted pay" },
  ],
  compute: (v) => {
    const hpw = v.hours as number;
    const dpw = v.days as number;
    const toYear: Record<string, number> = { hour: hpw * 52, day: dpw * 52, week: 52, biweek: 26, semimonth: 24, month: 12, quarter: 4, year: 1 };
    const annual = (v.amount as number) * toYear[String(v.per)];
    const offDays = (v.holidays as number) + (v.vacation as number);
    const workedDays = Math.max(1, dpw * 52 - offDays);
    const adjHourly = annual / ((workedDays * hpw) / dpw);
    const tax = simpleTakeHome(annual, v.status as FilingStatus);
    const periods = Object.entries(UNITS).map(([k, label]) => ({ label, gross: annual / toYear[k], net: tax.takeHome / toYear[k] }));
    return {
      hero: { label: "Annual salary", value: usd(annual, 0), sub: `${usd(annual / (hpw * 52))} an hour at ${hpw} hrs/week` },
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
        ...periods.slice(0, 7).map((p) => ({ label: p.label, value: usd(p.gross), strong: p.label === "Hourly" })),
        ...(offDays > 0 ? [{ label: `Hourly, excluding ${offDays} paid days off`, value: usd(adjHourly) }] : []),
      ],
      note: { tone: "info", text: "The chart estimates federal tax with the standard deduction and FICA only — state and local taxes aren't included." },
      details: [
        {
          title: "Pay by period",
          chart: {
            type: "bar",
            x: "period",
            format: "usd0",
            series: [
              { key: "gross", name: "Gross", color: "#2563eb" },
              { key: "net", name: "Est. take-home", color: "#10b981" },
            ],
            data: periods.filter((p) => ["Weekly", "Biweekly", "Semi-monthly", "Monthly"].includes(p.label)).map((p) => ({ period: p.label, gross: Math.round(p.gross), net: Math.round(p.net) })),
          },
          table: { head: ["Period", "Gross pay", "Est. take-home"], rows: periods.map((p) => [p.label, usd(p.gross), usd(p.net)]) },
        },
      ],
    };
  },
};

export default function SalaryCalculator() {
  return <CalcEngine config={config} />;
}
