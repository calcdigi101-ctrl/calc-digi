"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "pregnancy-due-date",
  title: "Pregnancy Due Date Calculator",
  fields: [
    {
      kind: "choice",
      key: "method",
      label: "Calculation method",
      default: "lmp",
      segmented: true,
      options: [
        { value: "lmp", label: "Last Menstrual Period (LMP)" },
        { value: "conception", label: "Known Conception Date" },
      ],
    },
    {
      kind: "date",
      key: "startDate",
      label: "Reference date",
      default: "today",
      hint: "First day of your last period, or estimated conception date.",
    },
    {
      kind: "number",
      key: "cycleLength",
      label: "Menstrual cycle length",
      suffix: "days",
      default: 28,
      min: 20,
      max: 45,
      integer: true,
      hint: "Average cycle length (default: 28 days). Modulates Naegele's rule.",
      showIf: (v) => v.method !== "conception",
    },
  ],
  compute: (v) => {
    const method = v.method === "conception" ? "conception" : "lmp";
    const cycle = Number(v.cycleLength || 28);
    const dateStr = (v.startDate as string) || "";

    let start = new Date(dateStr);
    if (isNaN(start.getTime())) {
      start = new Date();
      start.setDate(start.getDate() - 70); // fallback ~10 weeks ago
    }

    const MS_PER_DAY = 86400000;
    const cycleAdj = method === "lmp" ? cycle - 28 : 0;
    const totalGestationDays = method === "lmp" ? 280 + cycleAdj : 266;

    const dueDate = new Date(start.getTime() + totalGestationDays * MS_PER_DAY);
    const conceptionDate = method === "conception"
      ? start
      : new Date(start.getTime() + (14 + cycleAdj) * MS_PER_DAY);

    const today = new Date();
    // Gestational age starts from LMP (or conception - 14 days)
    const lmpAnchor = method === "lmp" ? start : new Date(start.getTime() - 14 * MS_PER_DAY);
    const daysElapsed = Math.floor((today.getTime() - lmpAnchor.getTime()) / MS_PER_DAY);
    const safeDaysElapsed = Math.max(0, Math.min(300, daysElapsed));

    const weeksElapsed = Math.floor(safeDaysElapsed / 7);
    const remainingDaysInWeek = safeDaysElapsed % 7;
    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / MS_PER_DAY));
    const progressPct = Math.min(100, Math.round((safeDaysElapsed / 280) * 100));

    let trimester = "First Trimester (Weeks 1–12)";
    let badgeTone: "good" | "warn" | "neutral" = "good";
    if (weeksElapsed <= 12) {
      trimester = "First Trimester (Weeks 1–12)";
      badgeTone = "good";
    } else if (weeksElapsed <= 26) {
      trimester = "Second Trimester (Weeks 13–26)";
      badgeTone = "good";
    } else if (weeksElapsed <= 36) {
      trimester = "Third Trimester (Weeks 27–36)";
      badgeTone = "good";
    } else if (weeksElapsed <= 40) {
      trimester = "Full Term Window (Weeks 37–40)";
      badgeTone = "good";
    } else {
      trimester = "Post-Term (Week 41+)";
      badgeTone = "warn";
    }

    const fmtDate = (d: Date) => {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    const dueStr = fmtDate(dueDate);
    const conStr = fmtDate(conceptionDate);

    return {
      hero: {
        label: "Estimated Due Date (EDD)",
        value: dueStr,
        unit: "",
        sub: `Currently Week ${weeksElapsed} + ${remainingDaysInWeek} Days (${trimester.split("(")[0].trim()}) | ${daysRemaining} Days to Delivery`,
      },
      badge: { text: `Week ${weeksElapsed} (${progressPct}% Completed)`, tone: badgeTone },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Completed Gestational Weeks", value: Math.min(40, weeksElapsed), color: "#10b981" },
          { name: "Remaining Weeks to Full Term", value: Math.max(0, 40 - weeksElapsed), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Estimated Due Date (Naegele's Rule)", value: dueStr, strong: true },
        { label: "Current Gestational Age", value: `${weeksElapsed} weeks, ${remainingDaysInWeek} days`, strong: true },
        { label: "Active Trimester", value: trimester, strong: true },
        { label: "Estimated Conception Date", value: conStr },
        { label: "Days Remaining Until Due Date", value: `${daysRemaining} days` },
        { label: "Gestational Progress", value: `${progressPct}% of 40-week term` },
        { label: "ACOG Delivery Benchmark", value: "39 Weeks 0 Days to 40 Weeks 6 Days (Full Term)" },
        { label: "Viability Threshold Reached?", value: weeksElapsed >= 24 ? "Yes (Week 24 milestone achieved)" : `Approaching (in ${24 - weeksElapsed} weeks)` },
      ],
      note: {
        text: (
          <span>
            👶 <strong>Clinical Ultrasound Notice:</strong> While Naegele&apos;s Rule provides an accurate estimated due date, only approximately 4% to 5% of deliveries occur on the exact EDD. An early first-trimester crown-rump length (CRL) ultrasound represents the clinical gold standard for precision dating.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function PregnancyDueDateCalculator() {
  return <CalcEngine config={config} />;
}
