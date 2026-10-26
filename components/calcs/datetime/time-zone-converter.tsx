"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const timeZoneConverterConfig: CalcConfig = {
  id: "time-zone-converter",
  title: "Global Time Zone UTC Offset Converter",
  fields: [
    { kind: "text", key: "sourceTime", label: "Source Time (HH:MM)", default: "14:00" },
    { kind: "choice", key: "fromZone", label: "From Timezone", default: "UTC", options: [
      { label: "UTC (Coordinated Universal Time, ±0)", value: "0" },
      { label: "EST / EDT (New York, UTC−5)", value: "-5" },
      { label: "CST / CDT (Chicago, UTC−6)", value: "-6" },
      { label: "PST / PDT (Los Angeles, UTC−8)", value: "-8" },
      { label: "GMT / BST (London, UTC+0)", value: "0" },
      { label: "CET / CEST (Paris/Berlin, UTC+1)", value: "1" },
      { label: "IST (India Standard Time, UTC+5:30)", value: "5.5" },
      { label: "CST (Beijing/Singapore, UTC+8)", value: "8" },
      { label: "JST (Tokyo, UTC+9)", value: "9" },
      { label: "AEST / AEDT (Sydney, UTC+10)", value: "10" },
    ] },
    { kind: "choice", key: "toZone", label: "To Timezone", default: "9", options: [
      { label: "UTC (Coordinated Universal Time, ±0)", value: "0" },
      { label: "EST / EDT (New York, UTC−5)", value: "-5" },
      { label: "CST / CDT (Chicago, UTC−6)", value: "-6" },
      { label: "PST / PDT (Los Angeles, UTC−8)", value: "-8" },
      { label: "GMT / BST (London, UTC+0)", value: "0" },
      { label: "CET / CEST (Paris/Berlin, UTC+1)", value: "1" },
      { label: "IST (India Standard Time, UTC+5:30)", value: "5.5" },
      { label: "CST (Beijing/Singapore, UTC+8)", value: "8" },
      { label: "JST (Tokyo, UTC+9)", value: "9" },
      { label: "AEST / AEDT (Sydney, UTC+10)", value: "10" },
    ] },
  ],
  presets: [
    { label: "London to Tokyo (14:00 GMT → JST)", values: { sourceTime: "14:00", fromZone: "0", toZone: "9" } },
    { label: "New York to London (09:00 EST → GMT)", values: { sourceTime: "09:00", fromZone: "-5", toZone: "0" } },
    { label: "San Francisco to Singapore (17:00 PST → CST)", values: { sourceTime: "17:00", fromZone: "-8", toZone: "8" } },
    { label: "London to Mumbai (10:00 GMT → IST)", values: { sourceTime: "10:00", fromZone: "0", toZone: "5.5" } },
  ],
  compute: (vals) => {
    const parseM = (t: string) => {
      const parts = t.trim().split(":");
      const h = Number(parts[0]) || 0;
      const m = Number(parts[1]) || 0;
      return h * 60 + m;
    };

    const srcM = parseM(String(vals.sourceTime || "14:00"));
    const fromOff = Number(vals.fromZone) || 0;
    const toOff = Number(vals.toZone) || 9;

    const diffHours = toOff - fromOff;
    const diffMinutes = Math.round(diffHours * 60);

    let targetM = srcM + diffMinutes;
    let dayShift = 0;

    while (targetM >= 24 * 60) {
      targetM -= 24 * 60;
      dayShift += 1;
    }
    while (targetM < 0) {
      targetM += 24 * 60;
      dayShift -= 1;
    }

    const tH = Math.floor(targetM / 60);
    const tMin = targetM % 60;
    const fmtTarget = `${String(tH).padStart(2, "0")}:${String(tMin).padStart(2, "0")}`;

    const shiftLabel = dayShift > 0 ? " (+1 day next day)" : dayShift < 0 ? " (−1 day previous day)" : " (Same calendar day)";

    return {
      hero: {
        value: `${fmtTarget}${shiftLabel}`,
        label: `Converted Time (${diffHours >= 0 ? `+${diffHours}` : diffHours}h Offset)`,
        sub: `Source: ${String(vals.sourceTime || "14:00")} (UTC${fromOff >= 0 ? `+${fromOff}` : fromOff}) → Target (UTC${toOff >= 0 ? `+${toOff}` : toOff})`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Terrestrial Diurnal Timezone Span",
        data: [
          { name: "Source Diurnal Minute of Day", value: Math.max(1, srcM), color: "#3b82f6" },
          { name: "Target Diurnal Minute of Day", value: Math.max(1, targetM), color: "#10b981" },
        ],
      },
      metrics: [
        { label: "Target Time", value: fmtTarget },
        { label: "Time Difference", value: `${diffHours >= 0 ? `+${diffHours}` : diffHours} hours` },
        { label: "Calendar Day Shift", value: `${dayShift >= 0 ? `+${dayShift}` : dayShift} Days` },
        { label: "Target 12-Hour Format", value: `${tH % 12 || 12}:${String(tMin).padStart(2, "0")} ${tH >= 12 ? "PM" : "AM"}` },
      ],
      breakdown: [
        { label: "Source Time", value: String(vals.sourceTime || "14:00") },
        { label: "Source UTC Offset", value: `UTC${fromOff >= 0 ? `+${fromOff}` : fromOff}` },
        { label: "Target UTC Offset", value: `UTC${toOff >= 0 ? `+${toOff}` : toOff}` },
        { label: "Net Offset Differential", value: `${diffHours >= 0 ? `+${diffHours}` : diffHours} hours` },
        { label: "Date Shift Status", value: shiftLabel.trim() },
      ],
      steps: [
        `Convert source time ${String(vals.sourceTime || "14:00")} to UTC: ${srcM} − (${fromOff} × 60) mins.`,
        `Calculate delta between timezones: ${toOff} − ${fromOff} = ${diffHours} hours (${diffMinutes} mins).`,
        `Apply offset to source: ${srcM} + ${diffMinutes} = ${srcM + diffMinutes} mins.`,
        `Normalize across 24-hour day boundary: Resolves to ${fmtTarget}${shiftLabel}.`,
      ],
    };
  },
};

export default function TimeZoneConverterComponent() {
  return <CalcEngine config={timeZoneConverterConfig} />;
}
