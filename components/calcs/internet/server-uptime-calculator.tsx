"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const serverUptimeConfig: CalcConfig = {
  id: "server-uptime-calculator",
  title: "Server Uptime SLA & High-Availability Downtime Budget Calculator",
  fields: [
    {
      kind: "choice",
      key: "slaNines",
      label: "Target High-Availability SLA",
      default: "99.9",
      options: [
        { label: "99.0% (Two Nines - 3.65 Days Downtime/Yr)", value: "99.0" },
        { label: "99.5% (Two and a Half Nines - 1.83 Days/Yr)", value: "99.5" },
        { label: "99.9% (Three Nines - 8.76 Hours/Yr)", value: "99.9" },
        { label: "99.95% (High Tier Cloud - 4.38 Hours/Yr)", value: "99.95" },
        { label: "99.99% (Four Nines - 52.6 Minutes/Yr)", value: "99.99" },
        { label: "99.999% (Five Nines Mission-Critical - 5.26 Min/Yr)", value: "99.999" },
      ],
    },
    { kind: "number", key: "plannedMaintHoursPerMonth", label: "Planned Maintenance Window (Hours/Month)", default: 2, min: 0, max: 20 },
  ],
  presets: [
    { label: "Three Nines SaaS Standard (99.9%)", values: { slaNines: "99.9", plannedMaintHoursPerMonth: 2 } },
    { label: "Four Nines Enterprise SLA (99.99%)", values: { slaNines: "99.99", plannedMaintHoursPerMonth: 0.5 } },
    { label: "Five Nines Mission Critical (99.999%)", values: { slaNines: "99.999", plannedMaintHoursPerMonth: 0 } },
    { label: "Standard Web Hosting (99.5%)", values: { slaNines: "99.5", plannedMaintHoursPerMonth: 4 } },
  ],
  compute: (vals) => {
    const sla = Math.min(99.9999, Math.max(90.0, parseFloat(String(vals.slaNines || "99.9"))));
    const maint = Math.max(0, Number(vals.plannedMaintHoursPerMonth) || 0);

    const downtimeFraction = (100.0 - sla) / 100.0;
    const dailyDowntimeSeconds = 86400 * downtimeFraction;
    const weeklyDowntimeMinutes = (604800 * downtimeFraction) / 60.0;
    const monthlyDowntimeMinutes = (2592000 * downtimeFraction) / 60.0;
    const annualDowntimeHours = (31536000 * downtimeFraction) / 3600.0;

    const annualUptimeHours = 8760 - annualDowntimeHours;
    const annualMaintHours = maint * 12.0;

    return {
      hero: {
        label: `Permitted Annual Outage Budget (${sla}%)`,
        value: `${annualDowntimeHours < 1 ? (annualDowntimeHours * 60).toFixed(1) + " min" : annualDowntimeHours.toFixed(2) + " hrs"}/yr`,
      },
      badge: {
        text: `${monthlyDowntimeMinutes.toFixed(1)} min/mo max downtime`,
        tone: sla >= 99.99 ? "good" : sla >= 99.9 ? "good" : "warn",
      },
      rows: [
        { label: "Target Availability SLA", value: `${sla}%` },
        { label: "Daily Downtime Allowance", value: fmtUptimeSecs(dailyDowntimeSeconds) },
        { label: "Weekly Downtime Allowance", value: fmtUptimeMins(weeklyDowntimeMinutes) },
        { label: "Monthly Downtime Allowance", value: fmtUptimeMins(monthlyDowntimeMinutes), strong: true },
        { label: "Annual Downtime Allowance", value: annualDowntimeHours < 1 ? `${(annualDowntimeHours * 60).toFixed(1)} minutes` : `${annualDowntimeHours.toFixed(2)} hours` },
        { label: "Planned Maintenance Budget", value: `${annualMaintHours.toFixed(1)} hrs/yr (${maint} hrs/mo)` },
        { label: "Guaranteed Operational Uptime", value: `${annualUptimeHours.toFixed(1)} hrs/yr` },
      ],
      steps: [
        `Downtime Factor = (100 - ${sla}) / 100 = ${downtimeFraction.toFixed(6)}`,
        `Annual Downtime = 8,760 hours * ${downtimeFraction.toFixed(6)} = ${annualDowntimeHours.toFixed(2)} hours/year`,
        `Monthly Downtime = 43,200 minutes * ${downtimeFraction.toFixed(6)} = ${monthlyDowntimeMinutes.toFixed(2)} minutes/month`,
      ],
      chart: {
        type: "donut",
        title: "Annual System Operational Time: Uptime vs Permitted Downtime",
        format: "num",
        data: [
          { name: "Operational Uptime (Hours)", value: Math.round(annualUptimeHours), color: "#10b981" },
          { name: "Permitted Outage Budget (Hours)", value: Math.max(0.1, parseFloat(annualDowntimeHours.toFixed(2))), color: "#ef4444" },
        ],
      },
    };
  },
};

function fmtUptimeSecs(s: number) {
  if (s < 60) return `${s.toFixed(1)} seconds`;
  return `${(s / 60).toFixed(1)} minutes`;
}

function fmtUptimeMins(m: number) {
  if (m < 60) return `${m.toFixed(1)} minutes`;
  return `${(m / 60).toFixed(2)} hours`;
}

export default function ServerUptimeCalculatorComponent() {
  return <CalcEngine config={serverUptimeConfig} />;
}
