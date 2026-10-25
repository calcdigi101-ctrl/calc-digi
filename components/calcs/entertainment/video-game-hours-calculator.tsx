"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "video-game-hours-calc",
  title: "Video Game Backlog & Cost-Per-Hour Value Calculator",
  presets: [
    { label: "Open-World RPG (Witcher 3 / Elden Ring — Main + Extras)", values: { gameHours: 65, backlogCount: 1, playStyle: "main_extra", hoursPerWeek: 12, gamePrice: 70 } },
    { label: "Steam Sale Backlog Pile of Shame (8 Unplayed Games)", values: { gameHours: 35, backlogCount: 8, playStyle: "main_extra", hoursPerWeek: 10, gamePrice: 160 } },
    { label: "100% Completionist Platinum Hunter (120 hrs RPG)", values: { gameHours: 120, backlogCount: 1, playStyle: "completionist", hoursPerWeek: 15, gamePrice: 70 } },
    { label: "Linear Narrative Campaign (God of War / Last of Us)", values: { gameHours: 22, backlogCount: 1, playStyle: "main_story", hoursPerWeek: 8, gamePrice: 60 } },
    { label: "Indie Game Quick Hit (Hollow Knight / Hades)", values: { gameHours: 40, backlogCount: 3, playStyle: "main_extra", hoursPerWeek: 10, gamePrice: 45 } },
  ],
  fields: [
    {
      kind: "number",
      key: "gameHours",
      label: "Average Game Length (Hours)",
      default: 50,
      min: 1,
      max: 1000,
      hint: "Average hours to complete according to HowLongToBeat benchmarks",
    },
    {
      kind: "choice",
      key: "playStyle",
      label: "Play Style Preference",
      default: "main_extra",
      options: [
        { value: "main_story", label: "Main Story Only (Rushed / Critical Path — 1.0x)" },
        { value: "main_extra", label: "Main + Side Quests / Extras (Standard Playthrough — 1.4x)" },
        { value: "completionist", label: "100% Completionist / Platinum Trophy (All Collectibles — 2.2x)" },
      ],
    },
    {
      kind: "number",
      key: "backlogCount",
      label: "Number of Games in Backlog Queue",
      default: 5,
      min: 1,
      max: 500,
      hint: "Total unplayed or unfinished games in your gaming library",
    },
    {
      kind: "number",
      key: "hoursPerWeek",
      label: "Available Gaming Time (Hours / Week)",
      default: 10,
      min: 1,
      max: 100,
      hint: "Realistic hours you can play weekly (e.g., 10 hrs = ~1.4 hrs/day)",
    },
    {
      kind: "number",
      key: "gamePrice",
      label: "Total Purchase Price of These Games ($ USD)",
      default: 150,
      min: 0,
      max: 5000,
      hint: "Total money spent acquiring this backlog (e.g. 5 games @ $30 sale avg = $150)",
    },
  ],
  compute: (vals) => {
    const rawHours = Number(vals.gameHours) || 50;
    const playStyle = String(vals.playStyle || "main_extra");
    const backlogCount = Number(vals.backlogCount) || 1;
    const hoursPerWeek = Number(vals.hoursPerWeek) || 10;
    const gamePrice = Number(vals.gamePrice) || 60;

    const styleMultiplier: Record<string, number> = {
      main_story: 1.0,
      main_extra: 1.4,
      completionist: 2.2,
    };
    const mult = styleMultiplier[playStyle] || 1.4;

    const effectiveHoursPerGame = rawHours * mult;
    const totalBacklogHours = effectiveHoursPerGame * backlogCount;

    const weeksToClear = totalBacklogHours / hoursPerWeek;
    const monthsToClear = (weeksToClear / 4.33).toFixed(1);
    const costPerHour = totalBacklogHours > 0 ? (gamePrice / totalBacklogHours) : 0;

    return {
      hero: {
        value: `${Math.round(totalBacklogHours)} Gaming Hours`,
        label: `~${monthsToClear} Months to Clear ${backlogCount} Games ($${costPerHour.toFixed(2)} / Hour Entertainment Value)`,
      },
      badge: {
        text: costPerHour < 1.0 ? "Insane Value (< $1.00/hr)" : costPerHour < 3.0 ? "Great Entertainment Value" : "Premium Hourly Spend",
        tone: costPerHour < 1.5 ? "good" : "info",
      },
      rows: [
        { label: "Effective Playtime Per Title", value: `${effectiveHoursPerGame.toFixed(1)} hours (${mult}× style multiplier)` },
        { label: "Total Backlog Hours", value: `${Math.round(totalBacklogHours)} total gameplay hours` },
        { label: "Weekly Gaming Allocation", value: `${hoursPerWeek} hours / week (~${(hoursPerWeek / 7).toFixed(1)} hrs/day)` },
        { label: "Estimated Clear Timeline", value: `${Math.ceil(weeksToClear)} weeks (~${monthsToClear} months)` },
        { label: "Total Backlog Acquisition Cost", value: `$${gamePrice.toFixed(2)}` },
        { label: "Entertainment Value (Cost Per Hour)", value: `$${costPerHour.toFixed(2)} / hour of gameplay` },
      ],
      steps: [
        `Adjust for playstyle: ${rawHours} base hours × ${mult} (${playStyle}) = ${effectiveHoursPerGame.toFixed(1)} hours per game.`,
        `Total backlog volume: ${backlogCount} games × ${effectiveHoursPerGame.toFixed(1)} hrs = ${Math.round(totalBacklogHours)} total gameplay hours.`,
        `Timeline at ${hoursPerWeek} hrs/week: ${Math.round(totalBacklogHours)} hrs ÷ ${hoursPerWeek} hrs/wk = ${Math.ceil(weeksToClear)} weeks (~${monthsToClear} months).`,
        `Entertainment cost-efficiency: $${gamePrice.toFixed(2)} total spend ÷ ${Math.round(totalBacklogHours)} gameplay hours = $${costPerHour.toFixed(2)} per hour of interactive entertainment.`,
      ],
      note: { text: "At an average of $0.50 to $2.00 per hour, video games provide significantly higher entertainment-per-dollar ratios than cinema ($12+/hr) or live concerts ($40+/hr)." },
    };
  },
};

export default function VideoGameHoursCalculator() {
  return <CalcEngine config={config} />;
}
