"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, num, usd, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "be",
  title: "Break-Even Calculator",
  fields: [
    { kind: "number", key: "fixed", label: "Fixed costs", hint: "rent, salaries… per period", prefix: "$", default: 5000, min: 0, max: 1e12 },
    { kind: "number", key: "price", label: "Price per unit", prefix: "$", default: 25, min: 0.0001, max: 1e9 },
    { kind: "number", key: "variable", label: "Variable cost per unit", prefix: "$", default: 10, min: 0, max: 1e9 },
    { kind: "number", key: "target", label: "Target profit", hint: "optional", prefix: "$", default: 0, min: 0, max: 1e12, optional: true },
  ],
  validate: (v) => {
    if ((v.variable as number) >= (v.price as number)) return { price: "Price must be higher than the variable cost per unit" };
  },
  compute: (v) => {
    const fixed$ = v.fixed as number;
    const price = v.price as number;
    const margin = price - (v.variable as number);
    const units = fixed$ / margin;
    const unitsTarget = (fixed$ + (v.target as number)) / margin;
    const maxUnits = Math.max(10, Math.ceil(Math.max(units, unitsTarget) * 2));
    const step = Math.max(1, Math.ceil(maxUnits / 20));
    const data = [];
    for (let u = 0; u <= maxUnits; u += step) data.push({ units: u, Revenue: Math.round(u * price), "Total cost": Math.round(fixed$ + u * (v.variable as number)) });
    return {
      hero: { label: "Break-even point", value: `${num(Math.ceil(units), 0)} units`, sub: `${usd0(Math.ceil(units) * price)} in sales` },
      rows: [
        { label: "Contribution margin per unit", value: usd(margin) },
        { label: "Contribution margin ratio", value: `${fixed((margin / price) * 100, 1)}%` },
        { label: "Break-even revenue", value: usd(fixed$ / (margin / price)), strong: true },
        ...((v.target as number) > 0 ? [{ label: `Units for ${usd0(v.target as number)} profit`, value: num(Math.ceil(unitsTarget), 0) }] : []),
      ],
      chart: {
        type: "line",
        x: "units",
        format: "usd0",
        series: [
          { key: "Revenue", name: "Revenue", color: "#10b981" },
          { key: "Total cost", name: "Total cost", color: "#ef4444" },
        ],
        data,
      },
      note: { tone: "info", text: "Where the lines cross is the break-even point: below it you make a loss, above it every unit adds its contribution margin to profit." },
    };
  },
};

export default function BreakEvenCalculator() {
  return <CalcEngine config={config} />;
}
