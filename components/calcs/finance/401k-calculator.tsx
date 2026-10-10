"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd0 } from "@/components/flagship/engine/format";
import { max401k } from "@/lib/tax";

export const config: CalcConfig = {
  id: "k401",
  title: "401(k) Calculator",
  fields: [
    { kind: "number", key: "age", label: "Current age", default: 30, min: 15, max: 80, integer: true },
    { kind: "number", key: "retire", label: "Retirement age", default: 65, min: 40, max: 85, integer: true },
    { kind: "number", key: "salary", label: "Annual salary", prefix: "$", default: 65000, min: 0, max: 1e8 },
    { kind: "number", key: "balance", label: "Current 401(k) balance", prefix: "$", default: 20000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "contrib", label: "Your contribution", suffix: "% of pay", default: 6, min: 0, max: 100 },
    { kind: "number", key: "match", label: "Employer match", hint: "of your contribution", suffix: "%", default: 50, min: 0, max: 200, optional: true },
    { kind: "number", key: "matchCap", label: "Employer matches up to", suffix: "% of pay", default: 6, min: 0, max: 100, optional: true },
    { kind: "number", key: "return", label: "Expected annual return", suffix: "%", default: 7, min: 0, max: 20 },
    { kind: "number", key: "raise", label: "Annual salary increase", suffix: "%", default: 3, min: 0, max: 20, optional: true, group: "More assumptions" },
    { kind: "number", key: "inflation", label: "Inflation", hint: "for today's dollars", suffix: "%", default: 3, min: 0, max: 15, optional: true, group: "More assumptions" },
  ],
  validate: (v) => {
    if ((v.retire as number) <= (v.age as number)) return { retire: "Retirement age must be after your current age" };
  },
  compute: (v) => {
    const years = (v.retire as number) - (v.age as number);
    const r = (v.return as number) / 100;
    let salary = v.salary as number;
    let balance = v.balance as number;
    let you = 0;
    let employer = 0;
    let capped = false;
    const data: { age: number; you: number; employer: number; growth: number; balance: number }[] = [];
    for (let y = 0; y < years; y++) {
      const age = (v.age as number) + y;
      let c = salary * ((v.contrib as number) / 100);
      // IRS elective deferral limit (with catch-up) for 2026; real limits rise with inflation.
      if (c > max401k(age)) {
        c = max401k(age);
        capped = true;
      }
      const matchable = Math.min(c, salary * ((v.matchCap as number) / 100));
      const m = matchable * ((v.match as number) / 100);
      // Contributions spread through the year earn about half a year of growth.
      balance = balance * (1 + r) + (c + m) * (1 + r / 2);
      you += c;
      employer += m;
      data.push({ age: age + 1, you: Math.round(you), employer: Math.round(employer), growth: Math.round(balance - you - employer - (v.balance as number)), balance: Math.round(balance) });
      salary *= 1 + (v.raise as number) / 100;
    }
    const growthAmt = balance - you - employer - (v.balance as number);
    const real = balance / Math.pow(1 + (v.inflation as number) / 100, years);
    const firstYear = (v.salary as number) * ((v.contrib as number) / 100);
    const fullMatchPct = v.matchCap as number;
    const missingMatch = (v.contrib as number) < fullMatchPct && (v.match as number) > 0;
    return {
      hero: { label: `401(k) balance at ${v.retire}`, value: usd0(balance), sub: `${usd0(real)} in today's dollars` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Starting balance", value: v.balance as number, color: "#64748b" },
          { name: "Your contributions", value: you, color: "#2563eb" },
          { name: "Employer match", value: employer, color: "#8b5cf6" },
          { name: "Investment growth", value: Math.max(0, growthAmt), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Your contribution this year", value: usd0(Math.min(firstYear, max401k(v.age as number))) },
        { label: "2026 limit at your age", value: usd0(max401k(v.age as number)) },
        { label: "Employer match (total)", value: usd0(employer), strong: true },
        { label: "4% rule income", value: `${usd0((balance * 0.04) / 12)}/mo` },
      ],
      note: missingMatch
        ? { tone: "warn", text: `You're leaving free money on the table: contribute at least ${fullMatchPct}% of pay to get the full employer match.` }
        : capped
          ? { tone: "info", text: "Your contribution hits the IRS annual limit in some years, so it's capped at the limit (including age-based catch-up)." }
          : undefined,
      details: [
        {
          title: "401(k) growth by age",
          chart: {
            type: "stacked-bar",
            x: "age",
            format: "usd0",
            series: [
              { key: "you", name: "You", color: "#2563eb" },
              { key: "employer", name: "Employer", color: "#8b5cf6" },
              { key: "growth", name: "Growth", color: "#10b981" },
            ],
            data,
          },
          table: { head: ["Age", "Your total", "Employer total", "Balance"], rows: data.map((d) => [d.age, usd0(d.you), usd0(d.employer), usd0(d.balance)]) },
        },
      ],
    };
  },
};

export default function K401Calculator() {
  return <CalcEngine config={config} />;
}
