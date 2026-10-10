"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { duration, usd, usd0 } from "@/components/flagship/engine/format";
import { growth } from "@/lib/finance";

/** Monthly deposit that grows `current` to `goal` in `months` at monthly rate r (end-of-month deposits). */
function monthlyNeeded(goal: number, current: number, r: number, months: number) {
  const fvCurrent = current * Math.pow(1 + r, months);
  const remaining = goal - fvCurrent;
  if (remaining <= 0) return 0;
  return r === 0 ? remaining / months : (remaining * r) / (Math.pow(1 + r, months) - 1);
}

export const config: CalcConfig = {
  id: "sav",
  title: "Savings Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Calculate",
      default: "goal",
      segmented: true,
      full: true,
      options: [
        { value: "goal", label: "Monthly savings for a goal" },
        { value: "grow", label: "What my savings grow to" },
      ],
    },
    { kind: "number", key: "goal", label: "Savings goal", prefix: "$", default: 20000, min: 1, max: 1e10, showIf: (v) => v.mode === "goal" },
    { kind: "number", key: "deposit", label: "Monthly deposit", prefix: "$", default: 500, min: 0, max: 1e8, showIf: (v) => v.mode === "grow" },
    { kind: "number", key: "current", label: "Current savings", prefix: "$", default: 2000, min: 0, max: 1e10, optional: true },
    { kind: "number", key: "years", label: "Time frame", suffix: "years", default: 3, min: 0.5, max: 60 },
    { kind: "number", key: "rate", label: "Interest rate", hint: "APY", suffix: "%", default: 4.5, min: 0, max: 30 },
  ],
  compute: (v) => {
    const months = Math.round((v.years as number) * 12);
    const r = Math.pow(1 + (v.rate as number) / 100, 1 / 12) - 1;
    const current = v.current as number;
    const deposit = v.mode === "goal" ? monthlyNeeded(v.goal as number, current, r, months) : (v.deposit as number);
    const g = growth({ initial: current, monthly: deposit, annualRatePct: v.rate as number, years: months / 12, compounding: 1 });
    const yearly = g.yearly.map((y) => ({ year: `Yr ${y.year}`, deposits: Math.round(y.contributions), interest: Math.round(y.interest) }));
    const common = {
      chart: {
        type: "donut" as const,
        format: "usd0" as const,
        data: [
          { name: "Starting balance", value: current, color: "#64748b" },
          { name: "Your deposits", value: g.contributed - current, color: "#2563eb" },
          { name: "Interest earned", value: g.interest, color: "#f59e0b" },
        ],
      },
      details: [
        {
          title: "Balance by year",
          chart: {
            type: "stacked-bar" as const,
            x: "year",
            format: "usd0" as const,
            series: [
              { key: "deposits", name: "Deposits", color: "#2563eb" },
              { key: "interest", name: "Interest", color: "#f59e0b" },
            ],
            data: yearly,
          },
          table: { head: ["Year", "Total deposited", "Interest", "Balance"], rows: g.yearly.map((y) => [y.year, usd0(y.contributions), usd0(y.interest), usd0(y.balance)]) },
        },
      ],
    };
    if (v.mode === "goal") {
      if (deposit === 0)
        return {
          hero: { label: "Monthly savings needed", value: usd(0), sub: "Your current savings will reach the goal on their own." },
          rows: [{ label: "Balance at end", value: usd0(g.balance), strong: true }],
          ...common,
        };
      return {
        hero: { label: "Monthly savings needed", value: usd(deposit), sub: `to reach ${usd0(v.goal as number)} in ${duration(months)}` },
        rows: [
          { label: "Weekly equivalent", value: usd((deposit * 12) / 52) },
          { label: "Total you deposit", value: usd0(g.contributed) },
          { label: "Interest earned", value: usd0(g.interest), strong: true },
        ],
        ...common,
      };
    }
    return {
      hero: { label: "Balance after " + duration(months), value: usd(g.balance) },
      rows: [
        { label: "Total you deposit", value: usd0(g.contributed) },
        { label: "Interest earned", value: usd0(g.interest), strong: true },
      ],
      ...common,
    };
  },
};

export default function SavingsCalculator() {
  return <CalcEngine config={config} />;
}
