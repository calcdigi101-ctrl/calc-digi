"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const readingSpeedConfig: CalcConfig = {
  id: "reading-speed-calculator",
  title: "Reading Speed (WPM), Retention & Textbook Completion Calculator",
  fields: [
    { kind: "number", key: "wordsRead", label: "Words Read in Assessment Passage", default: 600, min: 50, max: 5000 },
    { kind: "number", key: "readingSeconds", label: "Reading Time Duration (Seconds)", default: 145, min: 10, max: 1800 },
    { kind: "number", key: "comprehensionPct", label: "Quiz Comprehension Score (%)", default: 85, min: 10, max: 100 },
    { kind: "number", key: "bookWordCount", label: "Target Textbook Length (Words)", default: 75000, min: 1000, max: 300000 },
  ],
  presets: [
    { label: "College Academic Reader (250 WPM, 85%)", values: { wordsRead: 600, readingSeconds: 145, comprehensionPct: 85, bookWordCount: 75000 } },
    { label: "Advanced Speed Reader (480 WPM, 75%)", values: { wordsRead: 800, readingSeconds: 100, comprehensionPct: 75, bookWordCount: 75000 } },
    { label: "Technical Dense STEM Paper (160 WPM, 95%)", values: { wordsRead: 400, readingSeconds: 150, comprehensionPct: 95, bookWordCount: 50000 } },
    { label: "Standard Adult Fiction (220 WPM, 80%)", values: { wordsRead: 550, readingSeconds: 150, comprehensionPct: 80, bookWordCount: 90000 } },
  ],
  compute: (vals) => {
    const words = Math.max(10, Number(vals.wordsRead) || 600);
    const secs = Math.max(5, Number(vals.readingSeconds) || 145);
    const comp = Math.min(100, Math.max(10, Number(vals.comprehensionPct) || 85));
    const bookWords = Math.max(100, Number(vals.bookWordCount) || 75000);

    const wpm = (words / secs) * 60.0;
    const effectiveReadingRate = wpm * (comp / 100.0); // Effective WPM
    const totalReadingMinutes = bookWords / wpm;
    const totalReadingHours = totalReadingMinutes / 60.0;

    let tier = "Average College Adult Reader (200 - 300 WPM)";
    let tone: "good" | "warn" | "bad" = "good";

    if (wpm >= 450) {
      tier = "Speed Reader / High-Pace Processing (> 450 WPM)";
      tone = "good";
    } else if (wpm >= 300) {
      tier = "Above Average / Fluent Professional (300 - 450 WPM)";
      tone = "good";
    } else if (wpm >= 200) {
      tier = "Average Collegiate Pace (200 - 300 WPM)";
      tone = "good";
    } else if (wpm >= 150) {
      tier = "Deliberate / Technical Academic Reader (150 - 200 WPM)";
      tone = "warn";
    } else {
      tier = "Slow Reading Rate / Subvocalization Intensive (< 150 WPM)";
      tone = "bad";
    }

    return {
      hero: {
        label: "Measured Reading Speed",
        value: `${Math.round(wpm)} Words Per Minute (WPM)`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "Effective Comprehension Rate (Effective WPM)", value: `${Math.round(effectiveReadingRate)} eWPM (${comp}% comprehension)` },
        { label: "Time to Finish Target Book (75k words)", value: `${totalReadingHours.toFixed(1)} hours (${Math.round(totalReadingMinutes)} minutes)` },
        { label: "Time to Read Standard 30-Page Chapter", value: `${((30 * 250) / wpm).toFixed(1)} minutes (7,500 words)` },
        { label: "Pacing Efficiency Index", value: comp >= 80 ? "Optimal Retention" : "Skimming Deficit (Slow Down Recommended)" },
      ],
      steps: [
        `Reading Duration in Minutes = ${secs} seconds / 60 = ${(secs / 60).toFixed(2)} min`,
        `Calculate Words Per Minute (WPM) = ${words} words / ${(secs / 60).toFixed(2)} min = ${wpm.toFixed(1)} WPM`,
        `Effective Reading Rate = ${wpm.toFixed(1)} WPM * (${comp} / 100) = ${effectiveReadingRate.toFixed(1)} eWPM`,
        `Estimated Book Duration = ${bookWords} words / ${wpm.toFixed(1)} WPM = ${totalReadingHours.toFixed(2)} hours`,
      ],
      chart: {
        type: "donut",
        title: "Effective Comprehension vs Speed Tradeoff",
        format: "num",
        data: [
          { name: "Effective Retained WPM", value: Math.round(effectiveReadingRate), color: "#10b981" },
          { name: "Unretained / Skimmed Margin", value: Math.max(0, Math.round(wpm - effectiveReadingRate)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function ReadingSpeedCalculatorComponent() {
  return <CalcEngine config={readingSpeedConfig} />;
}
