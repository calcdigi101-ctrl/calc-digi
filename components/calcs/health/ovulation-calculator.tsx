"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "ovulation",
  title: "Ovulation & Fertility Calculator",
  fields: [
    {
      kind: "date",
      key: "lastPeriodDate",
      label: "First day of last period",
      default: "today",
      hint: "The date your last menstrual bleeding began.",
    },
    {
      kind: "number",
      key: "cycleLength",
      label: "Average cycle length",
      suffix: "days",
      default: 28,
      min: 20,
      max: 45,
      integer: true,
      hint: "Number of days from the start of one period to the start of the next.",
    },
    {
      kind: "number",
      key: "lutealLength",
      label: "Luteal phase duration",
      suffix: "days",
      default: 14,
      min: 10,
      max: 18,
      integer: true,
      hint: "Time from ovulation to next menses (population average is 14 days).",
    },
  ],
  compute: (v) => {
    const cycle = Number(v.cycleLength || 28);
    const luteal = Number(v.lutealLength || 14);
    const dateStr = (v.lastPeriodDate as string) || "";

    let start = new Date(dateStr);
    if (isNaN(start.getTime())) {
      start = new Date();
      start.setDate(start.getDate() - 14);
    }

    const MS_PER_DAY = 86400000;
    // Ovulation occurs `luteal` days before the next period:
    const ovulationOffsetDays = cycle - luteal;
    const ovulationDate = new Date(start.getTime() + ovulationOffsetDays * MS_PER_DAY);

    // Fertile window: 5 days prior to ovulation through ovulation day (6 days total)
    const fertileStartDate = new Date(ovulationDate.getTime() - 5 * MS_PER_DAY);
    const fertileEndDate = ovulationDate;

    // Peak fertility: 2 days before ovulation plus day of ovulation
    const peakStartDate = new Date(ovulationDate.getTime() - 2 * MS_PER_DAY);

    // Next period
    const nextPeriodDate = new Date(start.getTime() + cycle * MS_PER_DAY);

    // Reliable test date (12 DPO)
    const testDate = new Date(ovulationDate.getTime() + 12 * MS_PER_DAY);

    const fmtDate = (d: Date) => {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    const fmtRange = (d1: Date, d2: Date) => {
      const m1 = d1.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const m2 = d2.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return `${m1} – ${m2}`;
    };

    const ovuStr = fmtDate(ovulationDate);
    const windowStr = fmtRange(fertileStartDate, fertileEndDate);
    const peakStr = fmtRange(peakStartDate, ovulationDate);
    const nextMensesStr = fmtDate(nextPeriodDate);
    const testStr = fmtDate(testDate);

    return {
      hero: {
        label: "Estimated Ovulation Date",
        value: ovuStr,
        unit: "",
        sub: `Fertile Window: ${windowStr} | Next Expected Period: ${nextMensesStr}`,
      },
      badge: { text: `Ovulation on Day ${ovulationOffsetDays} of Cycle`, tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Fertile Window (6 Days)", value: 6, color: "#10b981" },
          { name: "Follicular Phase (Non-Fertile)", value: Math.max(0, ovulationOffsetDays - 5), color: "#0ea5e9" },
          { name: "Luteal Phase (Post-Ovulatory)", value: Math.max(0, luteal - 1), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Predicted Ovulation Day", value: `${ovuStr} (Cycle Day ${ovulationOffsetDays})`, strong: true },
        { label: "6-Day Fertile Window", value: windowStr, strong: true },
        { label: "Peak Conception Odds (Days -2 to 0)", value: peakStr, strong: true },
        { label: "Next Expected Menstrual Period", value: nextMensesStr },
        { label: "Earliest At-Home Pregnancy Test (12 DPO)", value: testStr },
        { label: "Calculated Follicular Phase", value: `${ovulationOffsetDays} days` },
        { label: "Calculated Luteal Phase", value: `${luteal} days` },
        { label: "Total Menstrual Cycle Length", value: `${cycle} days` },
      ],
      note: {
        text: (
          <span>
            🔬 <strong>Sperm &amp; Egg Longevity:</strong> Sperm can survive for up to 5 days in estrogen-rich, alkaline cervical mucus, whereas the human ovum remains viable for only 12 to 24 hours post-follicular rupture. Intercourse during the 2 to 3 days preceding ovulation delivers the highest clinical pregnancy rates.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function OvulationCalculator() {
  return <CalcEngine config={config} />;
}
