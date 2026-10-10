"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd } from "@/components/flagship/engine/format";
import { CPI_FIRST_YEAR, CPI_LATEST, cpiFor } from "@/lib/cpi";

const LAST = CPI_LATEST.year;
const label = (y: number) => (y === LAST ? `${y} (${CPI_LATEST.month.slice(0, 3)})` : String(y));

export const config: CalcConfig = {
  id: "infl",
  title: "Inflation Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Calculate with",
      default: "cpi",
      segmented: true,
      full: true,
      options: [
        { value: "cpi", label: "Historical CPI data" },
        { value: "rate", label: "An average rate" },
      ],
    },
    { kind: "number", key: "amount", label: "Amount", prefix: "$", default: 100, min: 0.01, max: 1e12, full: true },
    { kind: "number", key: "from", label: "In year", default: 2000, min: CPI_FIRST_YEAR, max: LAST, integer: true, showIf: (v) => v.mode === "cpi" },
    { kind: "number", key: "to", label: "Is worth in year", default: LAST, min: CPI_FIRST_YEAR, max: LAST, integer: true, showIf: (v) => v.mode === "cpi" },
    { kind: "number", key: "rate", label: "Average inflation", suffix: "%/yr", default: 3, min: -20, max: 100, showIf: (v) => v.mode === "rate" },
    { kind: "number", key: "years", label: "Over", suffix: "years", default: 10, min: 1, max: 200, integer: true, showIf: (v) => v.mode === "rate" },
  ],
  compute: (v) => {
    const amt = v.amount as number;
    let result: number;
    let years: number;
    let series: { year: string; value: number }[];
    let sub: string;
    if (v.mode === "cpi") {
      const from = v.from as number;
      const to = v.to as number;
      const c0 = cpiFor(from)!;
      const c1 = cpiFor(to)!;
      result = (amt * c1) / c0;
      years = Math.abs(to - from);
      const step = from <= to ? 1 : -1;
      series = [];
      for (let y = from; step > 0 ? y <= to : y >= to; y += step) series.push({ year: label(y), value: Math.round(((amt * cpiFor(y)!) / c0) * 100) / 100 });
      sub = `${usd(amt)} in ${label(from)} has the same buying power as ${usd(result)} in ${label(to)}`;
    } else {
      const r = (v.rate as number) / 100;
      years = v.years as number;
      result = amt * Math.pow(1 + r, years);
      series = Array.from({ length: years + 1 }, (_, i) => ({ year: `Yr ${i}`, value: Math.round(amt * Math.pow(1 + r, i) * 100) / 100 }));
      sub = `What costs ${usd(amt)} today would cost ${usd(result)} in ${years} years`;
    }
    // Report price change in chronological order, even when converting back in time.
    const ratio = v.mode === "cpi" && (v.to as number) < (v.from as number) ? amt / result : result / amt;
    const cumulative = (ratio - 1) * 100;
    const avg = years > 0 ? (Math.pow(ratio, 1 / years) - 1) * 100 : 0;
    return {
      hero: { label: "Equivalent value", value: usd(result), sub },
      rows: [
        { label: v.mode === "cpi" ? `Price change ${Math.min(v.from as number, v.to as number)}–${Math.max(v.from as number, v.to as number)}` : "Cumulative price change", value: `${cumulative >= 0 ? "+" : ""}${fixed(cumulative, 2)}%`, strong: true },
        { label: "Average annual inflation", value: `${fixed(avg, 2)}%` },
        { label: v.mode === "cpi" ? `$1 in ${v.to} equals` : "$1 in the future equals", value: v.mode === "cpi" ? `${usd(amt / result)} in ${v.from} dollars` : `${usd(amt / result)} today` },
      ],
      note:
        v.mode === "cpi"
          ? { tone: "info", text: `Uses the BLS CPI-U annual average for each year; ${LAST} uses the latest index (${CPI_LATEST.month} ${LAST}).` }
          : undefined,
      chart: {
        type: "area",
        x: "year",
        format: "usd",
        series: [{ key: "value", name: "Equivalent value", color: "#ef4444" }],
        data: series,
      },
      details: [
        {
          title: "Value by year",
          table: { head: ["Year", "Equivalent value"], rows: series.map((s) => [s.year, usd(s.value)]) },
        },
      ],
    };
  },
};

export default function InflationCalculator() {
  return <CalcEngine config={config} />;
}
