"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "podcast-length-calc",
  title: "Podcast Listening Time & Playback Speedup Calculator",
  presets: [
    { label: "Weekly Longform Interview Show (75 mins @ 1.25x)", values: { epDuration: 75, epPerWeek: 1, speed: "1.25", backlogCount: 15 } },
    { label: "Daily News & Tech Briefing (25 mins @ 1.5x)", values: { epDuration: 25, epPerWeek: 5, speed: "1.5", backlogCount: 0 } },
    { label: "True Crime Deep Dive Backlog (12 Episodes @ 1.0x)", values: { epDuration: 50, epPerWeek: 2, speed: "1.0", backlogCount: 12 } },
    { label: "Comedy & Banter Roundtable (90 mins @ 1.1x)", values: { epDuration: 90, epPerWeek: 1, speed: "1.1", backlogCount: 5 } },
    { label: "Hardcore History Mega Episode (240 mins @ 1.2x)", values: { epDuration: 240, epPerWeek: 0.25, speed: "1.2", backlogCount: 3 } },
  ],
  fields: [
    {
      kind: "number",
      key: "epDuration",
      label: "Average Episode Duration (Minutes)",
      default: 60,
      min: 5,
      max: 600,
      hint: "Standard episode length in minutes (e.g., 45, 60, 90 mins)",
    },
    {
      kind: "number",
      key: "epPerWeek",
      label: "Episodes Released Per Week",
      default: 2,
      min: 0.1,
      max: 14,
      hint: "How many episodes you listen to weekly (5 = daily weekday shows, 1 = weekly)",
    },
    {
      kind: "choice",
      key: "speed",
      label: "Playback Speed Multiplier",
      default: "1.25",
      options: [
        { value: "1.0", label: "1.0× Normal Natural Pitch" },
        { value: "1.1", label: "1.1× Subtle Speedup (+10% faster, natural audio)" },
        { value: "1.25", label: "1.25× Sweet Spot (+25% faster, perfect clarity)" },
        { value: "1.5", label: "1.5× Power Listener (+50% faster, high focus)" },
        { value: "1.75", label: "1.75× Information Rush (+75% faster)" },
        { value: "2.0", label: "2.0× Double Speed (+100% faster, 50% time saved)" },
      ],
    },
    {
      kind: "number",
      key: "backlogCount",
      label: "Unplayed Backlog Queue Episodes",
      default: 10,
      min: 0,
      max: 1000,
      hint: "Number of older archived episodes waiting in your playlist",
    },
  ],
  compute: (vals) => {
    const epDuration = Number(vals.epDuration) || 60;
    const epPerWeek = Number(vals.epPerWeek) || 2;
    const speed = Number(vals.speed) || 1.25;
    const backlogCount = Number(vals.backlogCount) || 0;

    // Per episode calculation
    const timeAt1xMin = epDuration;
    const timeAtSpeedMin = epDuration / speed;
    const timeSavedPerEpMin = timeAt1xMin - timeAtSpeedMin;

    // Weekly calculations
    const weeklyEpisodes = epPerWeek;
    const weeklyHoursAt1x = (weeklyEpisodes * epDuration) / 60;
    const weeklyHoursAtSpeed = (weeklyEpisodes * timeAtSpeedMin) / 60;
    const weeklyHoursSaved = weeklyHoursAt1x - weeklyHoursAtSpeed;

    // Annual calculations
    const annualHoursAt1x = weeklyHoursAt1x * 52;
    const annualHoursAtSpeed = weeklyHoursAtSpeed * 52;
    const annualHoursSaved = annualHoursAt1x - annualHoursAtSpeed;
    const annualDaysSaved = (annualHoursSaved / 24).toFixed(1);

    // Backlog clear time
    const backlogHoursAtSpeed = (backlogCount * timeAtSpeedMin) / 60;
    const backlogHoursSaved = ((backlogCount * epDuration) - (backlogCount * timeAtSpeedMin)) / 60;

    const pctSaved = Math.round((1 - (1 / speed)) * 100);

    return {
      hero: {
        value: `${Math.round(timeAtSpeedMin)} mins / ep`,
        label: `At ${speed}× Speed (${pctSaved}% Time Saved | ${annualHoursSaved.toFixed(1)} Hours Saved Annually)`,
      },
      badge: {
        text: speed > 1.0 ? `Saves ${pctSaved}% of Listening Time` : "Real-Time 1.0x Pacing",
        tone: speed >= 1.25 ? "good" : "info",
      },
      rows: [
        { label: "Original Duration (1.0x)", value: `${epDuration} minutes per episode` },
        { label: "Adjusted Duration", value: `${timeAtSpeedMin.toFixed(1)} mins @ ${speed}× speed` },
        { label: "Time Saved Per Episode", value: `${timeSavedPerEpMin.toFixed(1)} mins saved` },
        { label: "Weekly Commitment", value: `${weeklyHoursAtSpeed.toFixed(1)} hrs/wk (was ${weeklyHoursAt1x.toFixed(1)} hrs)` },
        { label: "Annual Time Saved", value: `${annualHoursSaved.toFixed(1)} hours (~${annualDaysSaved} full days saved)` },
        { label: "Backlog Queue Clear Time", value: backlogCount > 0 ? `${backlogHoursAtSpeed.toFixed(1)} hrs for ${backlogCount} eps (${backlogHoursSaved.toFixed(1)} hrs saved)` : "Zero backlog queue" },
      ],
      steps: [
        `Per episode calculation: ${epDuration} mins ÷ ${speed} speed factor = ${timeAtSpeedMin.toFixed(1)} minutes.`,
        `Time saved per episode: ${epDuration} mins - ${timeAtSpeedMin.toFixed(1)} mins = ${timeSavedPerEpMin.toFixed(1)} minutes.`,
        `Weekly listening load (${weeklyEpisodes} eps/week): (${weeklyEpisodes} × ${timeAtSpeedMin.toFixed(1)}) ÷ 60 = ${weeklyHoursAtSpeed.toFixed(1)} hours.`,
        `Annual projection (52 weeks): ${weeklyHoursSaved.toFixed(2)} hrs saved/week × 52 weeks = ${annualHoursSaved.toFixed(1)} hours saved per year (~${annualDaysSaved} full 24-hr days).`,
      ],
      note: { text: "According to audio psychology studies, speech intelligibility remains over 95% at 1.25x and 1.5x speeds with modern pitch-corrected podcast players." },
    };
  },
};

export default function PodcastLengthCalculator() {
  return <CalcEngine config={config} />;
}
