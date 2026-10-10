"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { usd, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "ret",
  title: "Retirement Calculator",
  fields: [
    { kind: "number", key: "age", label: "Current age", default: 35, min: 15, max: 90, integer: true },
    { kind: "number", key: "retire", label: "Retirement age", default: 65, min: 30, max: 100, integer: true },
    { kind: "number", key: "savings", label: "Current retirement savings", prefix: "$", default: 50000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "monthly", label: "Monthly contribution", prefix: "$", default: 500, min: 0, max: 1e7, optional: true },
    { kind: "number", key: "return", label: "Return before retirement", suffix: "%", default: 7, min: 0, max: 20 },
    { kind: "number", key: "income", label: "Income you want in retirement", hint: "today's dollars", prefix: "$", suffix: "/mo", default: 5000, min: 0, max: 1e7, optional: true },
    { kind: "number", key: "inflation", label: "Inflation", suffix: "%", default: 3, min: 0, max: 15, group: "Assumptions" },
    { kind: "number", key: "returnAfter", label: "Return during retirement", suffix: "%", default: 5, min: 0, max: 20, group: "Assumptions" },
    { kind: "number", key: "lifespan", label: "Plan until age", default: 90, min: 50, max: 120, integer: true, group: "Assumptions" },
    { kind: "number", key: "other", label: "Social Security & pensions", hint: "today's dollars", prefix: "$", suffix: "/mo", default: 1800, min: 0, max: 1e6, optional: true, group: "Assumptions" },
  ],
  validate: (v) => {
    if ((v.retire as number) <= (v.age as number)) return { retire: "Retirement age must be after your current age" };
    if ((v.lifespan as number) <= (v.retire as number)) return { lifespan: "Must be after your retirement age" };
  },
  compute: (v) => {
    const age = v.age as number;
    const retire = v.retire as number;
    const end = v.lifespan as number;
    const infl = (v.inflation as number) / 100;
    const rPre = Math.pow(1 + (v.return as number) / 100, 1 / 12) - 1;
    const rPost = Math.pow(1 + (v.returnAfter as number) / 100, 1 / 12) - 1;
    const mInfl = Math.pow(1 + infl, 1 / 12) - 1;

    // Withdrawals needed from savings each month, growing with inflation.
    const gapToday = Math.max(0, (v.income as number) - (v.other as number));
    let balance = v.savings as number;
    let contributed = balance;
    const data: { age: number; balance: number }[] = [{ age, balance: Math.round(balance) }];
    for (let m = 1; m <= (retire - age) * 12; m++) {
      balance = balance * (1 + rPre) + (v.monthly as number);
      contributed += v.monthly as number;
      if (m % 12 === 0) data.push({ age: age + m / 12, balance: Math.round(balance) });
    }
    const atRetirement = balance;
    let draw = gapToday * Math.pow(1 + infl, retire - age);
    let runsOutAt: number | null = null;
    for (let m = 1; m <= (end - retire) * 12; m++) {
      balance = balance * (1 + rPost) - draw;
      draw *= 1 + mInfl;
      if (balance <= 0 && runsOutAt === null) {
        runsOutAt = retire + m / 12;
        balance = 0;
      }
      if (m % 12 === 0) data.push({ age: retire + m / 12, balance: Math.round(Math.max(0, balance)) });
    }

    // Nest egg needed at retirement to fund the gap until `end` (present value of a growing annuity).
    const n = (end - retire) * 12;
    const firstDraw = gapToday * Math.pow(1 + infl, retire - age);
    const g = (1 + mInfl) / (1 + rPost);
    const needed = firstDraw * (Math.abs(1 - g) < 1e-12 ? n : (1 - Math.pow(g, n)) / (1 - g)) / (1 + rPost);
    const realAtRetirement = atRetirement / Math.pow(1 + infl, retire - age);
    const onTrack = runsOutAt === null;

    return {
      hero: { label: `Savings at age ${retire}`, value: usd0(atRetirement), sub: `${usd0(realAtRetirement)} in today's dollars` },
      badge: gapToday === 0 ? undefined : onTrack ? { text: "On track", tone: "good" } : { text: `Runs out at ${Math.floor(runsOutAt!)}`, tone: "bad" },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Your contributions", value: contributed, color: "#2563eb" },
          { name: "Investment growth", value: Math.max(0, atRetirement - contributed), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Nest egg needed", value: usd0(needed), strong: true },
        { label: onTrack ? "Surplus" : "Shortfall", value: usd0(Math.abs(atRetirement - needed)) },
        { label: "4% rule income", value: `${usd0((atRetirement * 0.04) / 12)}/mo` },
        { label: "Monthly draw from savings at retirement", value: usd(firstDraw) },
      ],
      note: onTrack
        ? { tone: "good", text: `Your savings should last past age ${end} with ${usd0(v.income as number)}/mo of spending in today's dollars.` }
        : { tone: "warn", text: `At this rate your savings run out around age ${Math.floor(runsOutAt!)}. Saving more, retiring later or spending less in retirement closes the gap.` },
      details: [
        {
          title: "Savings balance by age",
          chart: { type: "area", x: "age", format: "usd0", series: [{ key: "balance", name: "Balance", color: "#2563eb" }], data },
          table: { head: ["Age", "Balance"], rows: data.map((d) => [d.age, usd0(d.balance)]) },
        },
      ],
    };
  },
};

export default function RetirementCalculator() {
  return <CalcEngine config={config} />;
}
