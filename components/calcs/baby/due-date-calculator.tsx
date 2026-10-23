"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "due-date-calc",
  title: "Pregnancy Due Date Calculator",
  presets: [
    { label: "LMP 8 Weeks Ago (1st Trimester)", values: { method: "lmp", cycle: 28 } },
    { label: "LMP 20 Weeks (Halfway / Anatomy Scan)", values: { method: "lmp", cycle: 28 } },
    { label: "LMP 32 Weeks (3rd Trimester)", values: { method: "lmp", cycle: 28 } },
    { label: "Conception Date Method", values: { method: "conception", cycle: 28 } },
    { label: "Long Cycle (32 Days)", values: { method: "lmp", cycle: 32 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "method",
      label: "Calculation Method",
      default: "lmp",
      segmented: true,
      options: [
        { value: "lmp", label: "Last Menstrual Period (LMP)" },
        { value: "conception", label: "Conception Date" },
      ],
    },
    {
      kind: "date",
      key: "date",
      label: "Reference Date",
      default: "today",
      hint: "First day of last menstrual period or estimated conception day",
    },
    {
      kind: "number",
      key: "cycle",
      label: "Average Menstrual Cycle Length (Days)",
      default: 28,
      min: 20,
      max: 45,
      integer: true,
      hint: "Standard cycle is 28 days (ovulation at day 14)",
    },
  ],
  compute(values) {
    const method = String(values.method || "lmp");
    const dateStr = String(values.date || "");
    const cycle = Number(values.cycle) || 28;

    if (!dateStr) {
      return { error: "Please enter a valid start date to calculate your estimated due date." };
    }

    const inputDate = new Date(dateStr);
    if (isNaN(inputDate.getTime())) {
      return { error: "Invalid date format. Please select a valid calendar date." };
    }

    const MS_PER_DAY = 86400000;
    // If conception method, subtract 14 days to estimate LMP equivalent
    const lmpDate = method === "conception" ? new Date(inputDate.getTime() - 14 * MS_PER_DAY) : inputDate;

    // Cycle adjustment: cycles > 28 push ovulation back; < 28 pull ovulation forward
    const cycleAdj = cycle - 28;
    const eddTime = lmpDate.getTime() + (280 + cycleAdj) * MS_PER_DAY;
    const edd = new Date(eddTime);

    const now = new Date();
    const msSinceLmp = now.getTime() - lmpDate.getTime();
    const daysPregnant = Math.max(0, Math.floor(msSinceLmp / MS_PER_DAY));
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const extraDays = daysPregnant % 7;

    const daysRemaining = Math.round((eddTime - now.getTime()) / MS_PER_DAY);

    const conceptionDate = new Date(lmpDate.getTime() + 14 * MS_PER_DAY);
    const fullTermDate = new Date(lmpDate.getTime() + (273 + cycleAdj) * MS_PER_DAY); // 39 weeks

    const formatDate = (d: Date) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    // Trimester assignment
    let trimester = "First Trimester (Weeks 1–12)";
    let tone: "good" | "info" | "warn" = "info";
    if (weeksPregnant > 27) {
      trimester = "Third Trimester (Weeks 28–40+)";
      tone = "good";
    } else if (weeksPregnant > 12) {
      trimester = "Second Trimester (Weeks 13–27)";
      tone = "good";
    }

    const weeksDone = Math.min(40, Math.max(1, weeksPregnant));
    const weeksLeft = Math.max(0, 40 - weeksDone);

    const steps = [
      `Reference Start Date (${method === "conception" ? "Conception" : "LMP"}): ${formatDate(inputDate)}`,
      `Cycle Length Adjustment: ${cycle} days (${cycleAdj >= 0 ? "+" : ""}${cycleAdj} days vs standard 28)`,
      `Naegele's Formula: LMP + 280 days + (${cycleAdj} days) = Estimated Delivery Date (EDD)`,
      `Current Gestational Age: ${weeksPregnant} weeks, ${extraDays} days (${daysPregnant} total days)`,
      `Full-Term Milestone (39 weeks): ${formatDate(fullTermDate)}`,
    ];

    return {
      hero: {
        label: "Estimated Due Date (EDD)",
        value: formatDate(edd),
      },
      badge: {
        text: weeksPregnant > 40 ? "Baby is Full Term!" : `${weeksPregnant} Weeks, ${extraDays} Days Along`,
        tone,
      },
      rows: [
        { label: "Due Date (40 Weeks)", value: formatDate(edd), strong: true },
        { label: "Current Gestational Age", value: `${weeksPregnant} weeks, ${extraDays} days` },
        { label: "Countdown to Due Date", value: daysRemaining > 0 ? `${daysRemaining} days remaining` : `${Math.abs(daysRemaining)} days past EDD` },
        { label: "Current Pregnancy Trimester", value: trimester },
        { label: "Estimated Conception Date", value: formatDate(conceptionDate) },
        { label: "Official Full Term Date (39w 0d)", value: formatDate(fullTermDate) },
        { label: "Viability Milestone (24 weeks)", value: formatDate(new Date(lmpDate.getTime() + 168 * MS_PER_DAY)) },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Pregnancy Gestation Progress (40 Weeks)",
        data: [
          { name: `Weeks Completed (${weeksDone} wks)`, value: weeksDone, color: "#10b981" },
          { name: `Weeks Remaining (${weeksLeft} wks)`, value: Math.max(0.1, weeksLeft), color: "#06b6d4" },
        ],
      },
      note: {
        text: "Only about 4% of babies are born precisely on their estimated due date; 80% arrive naturally within two weeks before or after 40 weeks. Clinical ultrasound dating in the first trimester remains the medical gold standard.",
        tone: "neutral",
      },
    };
  },
};

export default function DueDateCalculator() {
  return <CalcEngine config={config} />;
}
