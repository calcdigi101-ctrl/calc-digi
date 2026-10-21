"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "sleep",
  title: "Sleep Cycle Calculator",
  fields: [
    {
      kind: "choice",
      key: "mode",
      label: "Calculation objective",
      default: "wake",
      segmented: true,
      options: [
        { value: "wake", label: "I need to wake up at..." },
        { value: "bed", label: "I am going to bed at..." },
      ],
    },
    {
      kind: "choice",
      key: "time",
      label: "Anchor time",
      default: "06:30",
      options: [
        { value: "05:00", label: "5:00 AM" },
        { value: "05:30", label: "5:30 AM" },
        { value: "06:00", label: "6:00 AM" },
        { value: "06:30", label: "6:30 AM" },
        { value: "07:00", label: "7:00 AM" },
        { value: "07:30", label: "7:30 AM" },
        { value: "08:00", label: "8:00 AM" },
        { value: "08:30", label: "8:30 AM" },
        { value: "09:00", label: "9:00 AM" },
        { value: "21:30", label: "9:30 PM" },
        { value: "22:00", label: "10:00 PM" },
        { value: "22:30", label: "10:30 PM" },
        { value: "23:00", label: "11:00 PM" },
        { value: "23:30", label: "11:30 PM" },
        { value: "00:00", label: "12:00 AM (Midnight)" },
      ],
    },
    {
      kind: "choice",
      key: "latency",
      label: "Time needed to fall asleep (sleep latency)",
      default: "15",
      segmented: true,
      options: [
        { value: "10", label: "10 min (Quick)" },
        { value: "15", label: "15 min (Average)" },
        { value: "20", label: "20 min (Moderate)" },
        { value: "30", label: "30 min (Slow)" },
      ],
    },
    {
      kind: "choice",
      key: "age",
      label: "Age bracket",
      default: "adult",
      options: [
        { value: "adult", label: "Adult (18–64 years: 7–9 hours)" },
        { value: "older", label: "Older Adult (65+ years: 7–8 hours)" },
        { value: "teen", label: "Teenager (14–17 years: 8–10 hours)" },
      ],
    },
  ],
  compute: (v) => {
    const mode = v.mode === "bed" ? "bed" : "wake";
    const latencyMin = Number(v.latency || 15);
    const timeStr = (v.time as string) || (mode === "wake" ? "06:30" : "22:30");

    const [hStr, mStr] = timeStr.split(":");
    const baseH = parseInt(hStr, 10);
    const baseM = parseInt(mStr, 10);

    const fmt12 = (totalMinutes: number) => {
      let norm = totalMinutes % 1440;
      if (norm < 0) norm += 1440;
      const h24 = Math.floor(norm / 60);
      const m = norm % 60;
      const ampm = h24 >= 12 ? "PM" : "AM";
      const h12 = h24 % 12 || 12;
      const mPad = m < 10 ? `0${m}` : m;
      return `${h12}:${mPad} ${ampm}`;
    };

    const baseMin = baseH * 60 + baseM;

    // Calculate times for 3, 4, 5, 6 cycles
    // 1 cycle = 90 min
    const calcTarget = (cycles: number) => {
      const sleepDuration = cycles * 90;
      if (mode === "wake") {
        // Going to bed before wake time
        return baseMin - sleepDuration - latencyMin;
      } else {
        // Waking up after bed time
        return baseMin + latencyMin + sleepDuration;
      }
    };

    const t3 = fmt12(calcTarget(3));
    const t4 = fmt12(calcTarget(4));
    const t5 = fmt12(calcTarget(5)); // Gold standard
    const t6 = fmt12(calcTarget(6));

    const heroLabel = mode === "wake" ? "Optimal Bedtime (5 Cycles)" : "Optimal Wake Time (5 Cycles)";
    const heroSub = mode === "wake"
      ? `Go to sleep at ${t5} to wake refreshed at ${fmt12(baseMin)} without grogginess`
      : `Wake up at ${t5} after going to sleep at ${fmt12(baseMin)} for 5 full 90-min cycles`;

    return {
      hero: {
        label: heroLabel,
        value: t5,
        unit: "✓",
        sub: heroSub,
      },
      badge: { text: "Optimal 5-Cycle Architecture (7.5h)", tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Optimal Restorative Sleep", value: 7.5, color: "#10b981" },
          { name: "Alert Daytime Waking Hours", value: 16.5, color: "#0ea5e9" },
        ],
      },
      rows: [
        { label: "5 Complete Cycles (Gold Standard)", value: `${t5} (7.5 hrs sleep)`, strong: true },
        { label: "6 Complete Cycles (Peak Recovery)", value: `${t6} (9.0 hrs sleep)`, strong: true },
        { label: "4 Complete Cycles (Functional Minimum)", value: `${t4} (6.0 hrs sleep)` },
        { label: "3 Complete Cycles (Short Sleep / Emergency)", value: `${t3} (4.5 hrs sleep)` },
        { label: "Ultradian Cycle Length", value: "90 minutes per cycle" },
        { label: "Sleep Onset Latency Buffer", value: `${latencyMin} minutes` },
        { label: "Sleep Inertia Protection", value: "Awakens during Stage 1 / REM light sleep to bypass slow-wave delta grogginess" },
      ],
      note: {
        text: (
          <span>
            🧠 <strong>Neurobiological Clock:</strong> Waking in the middle of Deep Slow-Wave (N3) sleep releases high adenosine in the prefrontal cortex, causing up to 60 minutes of cognitive impairment known as <em>sleep inertia</em>. Timing awakenings to the end of 90-minute cycles guarantees full morning clarity.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function SleepCalculator() {
  return <CalcEngine config={config} />;
}
