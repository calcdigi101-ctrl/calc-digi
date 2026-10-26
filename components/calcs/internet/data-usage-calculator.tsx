"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const dataUsageConfig: CalcConfig = {
  id: "data-usage-calculator",
  title: "Monthly Data Usage, Streaming Hours & ISP Cap Consumption Calculator",
  fields: [
    { kind: "number", key: "video4kHours", label: "Daily 4K UHD Video Streaming (Hours/Day)", default: 2, min: 0, max: 24 },
    { kind: "number", key: "videoHdHours", label: "Daily 1080p HD Video Streaming (Hours/Day)", default: 3, min: 0, max: 24 },
    { kind: "number", key: "videoCallHours", label: "Daily Video Conferencing (Zoom/Teams Hours)", default: 2, min: 0, max: 12 },
    { kind: "number", key: "gameDownloadsGb", label: "Monthly Game & Software Downloads (GB)", default: 120, min: 0, max: 2000 },
    { kind: "number", key: "ispCapGb", label: "Monthly ISP Data Cap (GB)", default: 1200, min: 50, max: 10000 },
  ],
  presets: [
    { label: "Standard Household (1.2 TB Comcast Cap)", values: { video4kHours: 2, videoHdHours: 3, videoCallHours: 2, gameDownloadsGb: 120, ispCapGb: 1200 } },
    { label: "4K Movie Enthusiast / Heavy Gamer", values: { video4kHours: 5, videoHdHours: 2, videoCallHours: 1, gameDownloadsGb: 350, ispCapGb: 1200 } },
    { label: "Remote Professional Work-From-Home", values: { video4kHours: 1, videoHdHours: 2, videoCallHours: 6, gameDownloadsGb: 50, ispCapGb: 1200 } },
    { label: "Mobile Hotspot Budget (100 GB Cap)", values: { video4kHours: 0, videoHdHours: 1, videoCallHours: 1, gameDownloadsGb: 10, ispCapGb: 100 } },
  ],
  compute: (vals) => {
    const k4Hrs = Math.max(0, Number(vals.video4kHours) || 0);
    const hdHrs = Math.max(0, Number(vals.videoHdHours) || 0);
    const callHrs = Math.max(0, Number(vals.videoCallHours) || 0);
    const downloadsGb = Math.max(0, Number(vals.gameDownloadsGb) || 0);
    const capGb = Math.max(10, Number(vals.ispCapGb) || 1200);

    const k4GbPerHr = 7.0;
    const hdGbPerHr = 2.5;
    const callGbPerHr = 1.2;

    const monthlyK4Gb = k4Hrs * k4GbPerHr * 30.0;
    const monthlyHdGb = hdHrs * hdGbPerHr * 30.0;
    const monthlyCallsGb = callHrs * callGbPerHr * 30.0;
    const webBrowseGb = 30.0;

    const totalMonthlyGb = monthlyK4Gb + monthlyHdGb + monthlyCallsGb + webBrowseGb + downloadsGb;
    const capUsedPct = (totalMonthlyGb / capGb) * 100.0;
    const remainingGb = Math.max(0, capGb - totalMonthlyGb);
    const overageGb = Math.max(0, totalMonthlyGb - capGb);

    let tone: "good" | "warn" | "bad" = "good";
    let status = "Within Plan Data Budget";
    if (totalMonthlyGb > capGb) {
      tone = "bad";
      status = `Data Cap Exceeded (+${overageGb.toFixed(0)} GB Overage)`;
    } else if (capUsedPct > 80) {
      tone = "warn";
      status = "Approaching Data Limit (> 80% Consumed)";
    }

    return {
      hero: {
        label: "Total Monthly Data Consumption",
        value: `${totalMonthlyGb.toFixed(0)} GB`,
      },
      badge: {
        text: status,
        tone: tone,
      },
      rows: [
        { label: "4K UHD Streaming Volume", value: `${monthlyK4Gb.toFixed(0)} GB (${(k4Hrs * 30).toFixed(0)} hrs/mo)` },
        { label: "1080p HD Streaming Volume", value: `${monthlyHdGb.toFixed(0)} GB (${(hdHrs * 30).toFixed(0)} hrs/mo)` },
        { label: "Video Conference Calls", value: `${monthlyCallsGb.toFixed(0)} GB (${(callHrs * 30).toFixed(0)} hrs/mo)` },
        { label: "Game & Software Downloads", value: `${downloadsGb.toFixed(0)} GB` },
        { label: "Web Browsing & Audio Sync", value: `${webBrowseGb} GB` },
        { label: "Monthly Data Cap Limit", value: `${capGb} GB` },
        { label: "Remaining Data Buffer", value: totalMonthlyGb > capGb ? "0 GB (Exceeded)" : `${remainingGb.toFixed(0)} GB`, strong: true },
      ],
      steps: [
        `4K Streaming: ${k4Hrs} hrs/day * 7.0 GB/hr * 30 days = ${monthlyK4Gb.toFixed(0)} GB`,
        `HD Streaming: ${hdHrs} hrs/day * 2.5 GB/hr * 30 days = ${monthlyHdGb.toFixed(0)} GB`,
        `Video Calls: ${callHrs} hrs/day * 1.2 GB/hr * 30 days = ${monthlyCallsGb.toFixed(0)} GB`,
        `Total Monthly Consumption = ${monthlyK4Gb.toFixed(0)} + ${monthlyHdGb.toFixed(0)} + ${monthlyCallsGb.toFixed(0)} + ${downloadsGb} + ${webBrowseGb} = ${totalMonthlyGb.toFixed(0)} GB`,
      ],
      chart: {
        type: "donut",
        title: "Monthly Data Usage Allocation by Traffic Source",
        format: "num",
        data: [
          { name: "4K UHD Video", value: Math.round(monthlyK4Gb), color: "#ef4444" },
          { name: "1080p HD Video", value: Math.round(monthlyHdGb), color: "#3b82f6" },
          { name: "Video Calls", value: Math.round(monthlyCallsGb), color: "#10b981" },
          { name: "Game Downloads", value: Math.round(downloadsGb), color: "#8b5cf6" },
          { name: "Web & Music", value: Math.round(webBrowseGb), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function DataUsageCalculatorComponent() {
  return <CalcEngine config={dataUsageConfig} />;
}
