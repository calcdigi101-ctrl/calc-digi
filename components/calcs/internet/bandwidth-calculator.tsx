"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const bandwidthConfig: CalcConfig = {
  id: "bandwidth-calculator",
  title: "Household & Office Concurrent Bandwidth Planning Calculator",
  fields: [
    { kind: "number", key: "fourKStreams", label: "Concurrent 4K UHD Video Streams", default: 2, min: 0, max: 20 },
    { kind: "number", key: "hdStreams", label: "Concurrent 1080p HD Streams / Calls", default: 3, min: 0, max: 30 },
    { kind: "number", key: "gamingSessions", label: "Online Gaming / Low-Latency Sessions", default: 2, min: 0, max: 15 },
    { kind: "number", key: "cloudBackups", label: "Active Cloud Backups / File Syncs", default: 1, min: 0, max: 10 },
    { kind: "number", key: "headroomPct", label: "Quality of Service Headroom Buffer (%)", default: 30, min: 10, max: 60 },
  ],
  presets: [
    { label: "Connected Family (4 Persons, 4K & Work)", values: { fourKStreams: 2, hdStreams: 3, gamingSessions: 2, cloudBackups: 1, headroomPct: 30 } },
    { label: "Remote Work Couple (2 Persons Zoom & Cloud)", values: { fourKStreams: 1, hdStreams: 2, gamingSessions: 1, cloudBackups: 1, headroomPct: 25 } },
    { label: "Small Creative Office (10 Workers)", values: { fourKStreams: 3, hdStreams: 8, gamingSessions: 0, cloudBackups: 4, headroomPct: 35 } },
    { label: "Single Streamer / Casual User", values: { fourKStreams: 1, hdStreams: 1, gamingSessions: 1, cloudBackups: 0, headroomPct: 20 } },
  ],
  compute: (vals) => {
    const k4 = Math.max(0, Number(vals.fourKStreams) || 0);
    const hd = Math.max(0, Number(vals.hdStreams) || 0);
    const game = Math.max(0, Number(vals.gamingSessions) || 0);
    const cloud = Math.max(0, Number(vals.cloudBackups) || 0);
    const headroom = Math.max(10, Number(vals.headroomPct) || 30);

    const mbps4K = k4 * 25.0;
    const mbpsHD = hd * 6.0;
    const mbpsGame = game * 4.0;
    const mbpsCloud = cloud * 15.0;

    const activeRawMbps = mbps4K + mbpsHD + mbpsGame + mbpsCloud;
    const headroomMbps = activeRawMbps * (headroom / 100.0);
    const recommendedPlanMbps = Math.ceil(activeRawMbps + headroomMbps);

    let tier = "Standard Broadband (100 - 300 Mbps Plan)";
    let tone: "good" | "warn" | "bad" = "good";
    if (recommendedPlanMbps > 500) {
      tier = "Gigabit Fiber Required (1 Gbps Plan)";
      tone = "warn";
    } else if (recommendedPlanMbps > 300) {
      tier = "High-Performance Broadband (500 Mbps Plan)";
    } else if (recommendedPlanMbps < 50) {
      tier = "Basic Broadband Plan (50 - 100 Mbps Plan)";
    }

    return {
      hero: {
        label: "Recommended Minimum Internet Speed",
        value: `${recommendedPlanMbps} Mbps`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "Concurrent 4K Streaming Bandwidth", value: `${mbps4K} Mbps (${k4} streams)` },
        { label: "HD Video Calls & 1080p Bandwidth", value: `${mbpsHD} Mbps (${hd} sessions)` },
        { label: "Gaming Low-Latency Allocation", value: `${mbpsGame} Mbps (${game} players)` },
        { label: "Cloud Sync & Backup Allocation", value: `${mbpsCloud} Mbps (${cloud} syncs)` },
        { label: "Active Concurrent Bandwidth Sum", value: `${activeRawMbps.toFixed(0)} Mbps` },
        { label: "QoS Buffer & Headroom Margin", value: `+${headroomMbps.toFixed(0)} Mbps (${headroom}%)` },
      ],
      steps: [
        `Active Raw Bandwidth = (${k4} * 25) + (${hd} * 6) + (${game} * 4) + (${cloud} * 15) = ${activeRawMbps} Mbps`,
        `QoS Buffer Allocation = ${activeRawMbps} Mbps * (${headroom} / 100) = ${headroomMbps.toFixed(1)} Mbps`,
        `Minimum ISP Provisioning = ${activeRawMbps} + ${headroomMbps.toFixed(1)} = ${recommendedPlanMbps} Mbps`,
      ],
      chart: {
        type: "donut",
        title: "Concurrent Bandwidth Demand by Network Application",
        format: "num",
        data: [
          { name: "4K UHD Streaming", value: Math.max(1, Math.round(mbps4K)), color: "#ef4444" },
          { name: "HD Video Calls", value: Math.max(1, Math.round(mbpsHD)), color: "#3b82f6" },
          { name: "Gaming Sessions", value: Math.max(1, Math.round(mbpsGame)), color: "#10b981" },
          { name: "Cloud Backups", value: Math.max(1, Math.round(mbpsCloud)), color: "#8b5cf6" },
          { name: "Headroom Buffer", value: Math.max(1, Math.round(headroomMbps)), color: "#94a3b8" },
        ],
      },
    };
  },
};

export default function BandwidthCalculatorComponent() {
  return <CalcEngine config={bandwidthConfig} />;
}
