"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "book-reading-time-calc",
  title: "Book Reading Time & Completion Calculator",
  presets: [
    { label: "Standard Fiction Novel (320 pages)", values: { pages: 320, wordsPerPage: 275, speed: "average", minutesPerDay: 30 } },
    { label: "Epic Fantasy Tome (850 pages)", values: { pages: 850, wordsPerPage: 320, speed: "average", minutesPerDay: 45 } },
    { label: "Non-Fiction / Business (240 pages)", values: { pages: 240, wordsPerPage: 250, speed: "slow", minutesPerDay: 20 } },
    { label: "Speed Reader Challenge (400 pages)", values: { pages: 400, wordsPerPage: 300, speed: "fast", minutesPerDay: 60 } },
    { label: "Children / Young Adult (180 pages)", values: { pages: 180, wordsPerPage: 220, speed: "average", minutesPerDay: 25 } },
    { label: "Academic Textbook (600 pages)", values: { pages: 600, wordsPerPage: 400, speed: "slow", minutesPerDay: 40 } },
  ],
  fields: [
    {
      kind: "number",
      key: "pages",
      label: "Total Book Pages",
      default: 320,
      min: 1,
      max: 10000,
      hint: "Total page count of the book or reading assignment",
    },
    {
      kind: "number",
      key: "wordsPerPage",
      label: "Average Words Per Page",
      default: 275,
      min: 100,
      max: 800,
      hint: "Standard paperback ≈ 250–300 words; dense academic textbooks ≈ 400–500 words",
    },
    {
      kind: "choice",
      key: "speed",
      label: "Reading Speed Profile",
      default: "average",
      options: [
        { value: "slow", label: "Slow / Analytical Reader (150 WPM — dense material, study)" },
        { value: "average", label: "Average Adult Reader (250 WPM — typical novel pacing)" },
        { value: "fast", label: "Fast / Skimmer (350 WPM — experienced reader)" },
        { value: "speed", label: "Speed Reader (500 WPM — trained techniques)" },
      ],
    },
    {
      kind: "number",
      key: "minutesPerDay",
      label: "Daily Reading Time (Minutes)",
      default: 30,
      min: 5,
      max: 720,
      hint: "How many minutes you plan to read each day",
    },
  ],
  compute: (vals) => {
    const pages = Number(vals.pages) || 320;
    const wordsPerPage = Number(vals.wordsPerPage) || 275;
    const speedProfile = String(vals.speed || "average");
    const minutesPerDay = Number(vals.minutesPerDay) || 30;

    const wpmMap: Record<string, number> = {
      slow: 150,
      average: 250,
      fast: 350,
      speed: 500,
    };
    const wpm = wpmMap[speedProfile] || 250;

    const totalWords = pages * wordsPerPage;
    const totalReadingMinutes = totalWords / wpm;
    const totalReadingHours = totalReadingMinutes / 60;
    const daysToFinish = Math.ceil(totalReadingMinutes / minutesPerDay);
    const weeksToFinish = (daysToFinish / 7).toFixed(1);

    // Audiobook equivalent (standard audiobook narration ≈ 150 WPM)
    const audiobookHours = totalWords / (150 * 60);
    const audioAt125 = audiobookHours / 1.25;

    const pagesPerHour = (wpm * 60) / wordsPerPage;

    return {
      hero: {
        value: `${daysToFinish} Days`,
        label: `To Finish ${pages} Pages (${totalReadingHours.toFixed(1)} Total Hours)`,
      },
      badge: {
        text: `${daysToFinish} Days to Finish`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Reading Hours vs Audiobook Equivalent",
        data: [
          { name: `Reading (${totalReadingHours.toFixed(1)}h)`, value: Math.max(0.1, Number(totalReadingHours.toFixed(1))), color: "#065f46" },
          { name: `Audiobook 1x (${audiobookHours.toFixed(1)}h)`, value: Math.max(0.1, Number(audiobookHours.toFixed(1))), color: "#10b981" },
          { name: `Audiobook 1.25x (${audioAt125.toFixed(1)}h)`, value: Math.max(0.1, Number(audioAt125.toFixed(1))), color: "#34d399" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Total Estimated Words", value: `${totalWords.toLocaleString()} words` },
        { label: "Total Reading Time", value: `${totalReadingHours.toFixed(1)} hours (${Math.round(totalReadingMinutes)} mins)` },
        { label: "Pages Read Per Hour", value: `${pagesPerHour.toFixed(1)} pages/hr` },
        { label: "Daily Commitment", value: `${minutesPerDay} mins/day (${(minutesPerDay / 60 * pagesPerHour).toFixed(1)} pages/day)` },
        { label: "Estimated Completion Timeline", value: `${daysToFinish} days (~${weeksToFinish} weeks)` },
        { label: "Standard Audiobook Equivalent", value: `${audiobookHours.toFixed(1)} hrs (or ${audioAt125.toFixed(1)} hrs @ 1.25x)` },
      ],
      steps: [
        `Calculate total words: ${pages} pages × ${wordsPerPage} words/page = ${totalWords.toLocaleString()} words.`,
        `Apply reading speed (${wpm} WPM): ${totalWords.toLocaleString()} words ÷ ${wpm} WPM = ${Math.round(totalReadingMinutes)} reading minutes.`,
        `Convert to total hours: ${Math.round(totalReadingMinutes)} mins ÷ 60 = ${totalReadingHours.toFixed(2)} hours.`,
        `Determine daily duration: ${Math.round(totalReadingMinutes)} mins ÷ ${minutesPerDay} mins/day = ${daysToFinish} days (~${weeksToFinish} weeks).`,
        `Audiobook benchmark (150 WPM): ${totalWords.toLocaleString()} ÷ (150 × 60) = ${audiobookHours.toFixed(1)} hours of audio.`,
      ],
      note: { text: "Standard adult reading speed ranges between 200 and 280 WPM for leisure fiction, and drops to 120–180 WPM for technical textbooks." },
    };
  },
};

export default function BookReadingTimeCalculator() {
  return <CalcEngine config={config} />;
}
