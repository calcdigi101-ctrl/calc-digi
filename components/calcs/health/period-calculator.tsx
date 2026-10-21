"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "period",
  title: "Menstrual Period & Cycle Calculator",
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
      key: "periodDuration",
      label: "Bleeding duration",
      suffix: "days",
      default: 5,
      min: 2,
      max: 10,
      integer: true,
      hint: "Typical number of days active menstrual bleeding lasts (average is 4–6 days).",
    },
  ],
  compute: (v) => {
    const cycle = Number(v.cycleLength || 28);
    const duration = Number(v.periodDuration || 5);
    const dateStr = (v.lastPeriodDate as string) || "";

    let start = new Date(dateStr);
    if (isNaN(start.getTime())) {
      start = new Date();
      start.setDate(start.getDate() - 14);
    }

    const MS_PER_DAY = 86400000;
    const next1 = new Date(start.getTime() + cycle * MS_PER_DAY);
    const next1End = new Date(next1.getTime() + (duration - 1) * MS_PER_DAY);
    const next2 = new Date(next1.getTime() + cycle * MS_PER_DAY);
    const next3 = new Date(next2.getTime() + cycle * MS_PER_DAY);

    // PMS window: 6 days prior to menses onset
    const pmsStart = new Date(next1.getTime() - 6 * MS_PER_DAY);
    const pmsEnd = new Date(next1.getTime() - 1 * MS_PER_DAY);

    const today = new Date();
    const daysUntilNext = Math.floor((next1.getTime() - today.getTime()) / MS_PER_DAY);
    const daysInCurrentCycle = Math.max(0, Math.floor((today.getTime() - start.getTime()) / MS_PER_DAY));

    const fmtDate = (d: Date) => {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    const fmtRange = (d1: Date, d2: Date) => {
      const m1 = d1.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const m2 = d2.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      return `${m1} – ${m2}`;
    };

    const next1Str = fmtDate(next1);
    const next1Range = fmtRange(next1, next1End);
    const pmsRange = fmtRange(pmsStart, pmsEnd);
    const next2Str = fmtDate(next2);
    const next3Str = fmtDate(next3);

    let figoCat = "Normal Physiological Range (FIGO)";
    let badgeTone: "good" | "warn" | "neutral" = "good";

    if (cycle < 24) {
      figoCat = "Frequent Menses (Polymenorrhea < 24 days)";
      badgeTone = "warn";
    } else if (cycle <= 38) {
      figoCat = "Normal Regular Cycle (24–38 days)";
      badgeTone = "good";
    } else {
      figoCat = "Infrequent Menses (Oligomenorrhea > 38 days)";
      badgeTone = "warn";
    }

    const annualCycles = (365 / cycle).toFixed(1);

    return {
      hero: {
        label: "Next Expected Period",
        value: next1Str,
        unit: "",
        sub: `Bleeding Window: ${next1Range} (${duration} days) | ${daysUntilNext > 0 ? `In ${daysUntilNext} days` : daysUntilNext === 0 ? "Expected Today" : "Past Expected Date"}`,
      },
      badge: { text: figoCat, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Days Elapsed in Cycle", value: Math.min(cycle, daysInCurrentCycle), color: "#10b981" },
          { name: "Days Until Next Period", value: Math.max(0, cycle - daysInCurrentCycle), color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Next Period Onset Date", value: next1Str, strong: true },
        { label: "Expected Bleeding Window", value: next1Range, strong: true },
        { label: "Premenstrual (PMS) Window", value: pmsRange },
        { label: "Subsequent Period (Cycle #2)", value: next2Str },
        { label: "Subsequent Period (Cycle #3)", value: next3Str },
        { label: "Current Cycle Day", value: `Day ${daysInCurrentCycle + 1} of ${cycle}` },
        { label: "Annual Menstrual Periods", value: `~${annualCycles} cycles / year` },
        { label: "FIGO Clinical Standard", value: "Normal range: 24 to 38 days length, 3 to 8 days bleeding" },
      ],
      note: {
        text: (
          <span>
            🩸 <strong>The Fifth Vital Sign:</strong> The American College of Obstetricians and Gynecologists (ACOG) recognizes the menstrual cycle as a primary vital sign. A sudden shift in cycle length exceeding 9 days warrants evaluation for thyroid imbalance, metabolic stress, or ovulatory shifts.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function PeriodCalculator() {
  return <CalcEngine config={config} />;
}
