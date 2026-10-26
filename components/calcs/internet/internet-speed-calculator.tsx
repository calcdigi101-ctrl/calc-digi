"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const internetSpeedConfig: CalcConfig = {
  id: "internet-speed-calculator",
  title: "Internet Speed, Protocol Overhead & Throughput Efficiency Calculator",
  fields: [
    { kind: "number", key: "ispSpeed", label: "ISP Advertised Plan Speed (Mbps)", default: 300, min: 1, max: 10000 },
    { kind: "number", key: "measuredSpeed", label: "Measured Download Speed (Mbps)", default: 245, min: 1, max: 10000 },
    { kind: "number", key: "latency", label: "Ping Latency (ms)", default: 18, min: 1, max: 1000 },
    { kind: "number", key: "jitter", label: "Jitter Variance (ms)", default: 3, min: 0, max: 200 },
  ],
  presets: [
    { label: "Gigabit Fiber (1 Gbps)", values: { ispSpeed: 1000, measuredSpeed: 940, latency: 4, jitter: 1 } },
    { label: "Standard Cable Broadband (300 Mbps)", values: { ispSpeed: 300, measuredSpeed: 245, latency: 18, jitter: 3 } },
    { label: "5G Home Internet (150 Mbps)", values: { ispSpeed: 150, measuredSpeed: 105, latency: 38, jitter: 9 } },
    { label: "Legacy DSL / Rural (25 Mbps)", values: { ispSpeed: 25, measuredSpeed: 19, latency: 55, jitter: 14 } },
  ],
  compute: (vals) => {
    const isp = Math.max(1, Number(vals.ispSpeed) || 300);
    const measured = Math.max(0.1, Number(vals.measuredSpeed) || 245);
    const ping = Math.max(1, Number(vals.latency) || 18);
    const jit = Math.max(0, Number(vals.jitter) || 3);

    const efficiencyPct = Math.min(100, (measured / isp) * 100);
    const speedLossMbps = Math.max(0, isp - measured);
    const speedLossPct = Math.max(0, 100 - efficiencyPct);
    const downloadMBps = measured / 8.0;

    let tier = "Optimal Broadband Delivery (>= 85% Efficiency)";
    let tone: "good" | "warn" | "bad" = "good";
    if (efficiencyPct < 60) {
      tier = "Severe Network Throttling (< 60% Plan Speed)";
      tone = "bad";
    } else if (efficiencyPct < 80) {
      tier = "Moderate Wi-Fi / Infrastructure Loss (60% - 80%)";
      tone = "warn";
    }

    return {
      hero: {
        label: "Delivered Throughput Efficiency",
        value: `${efficiencyPct.toFixed(1)}%`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "ISP Contracted Bandwidth", value: `${isp.toLocaleString()} Mbps` },
        { label: "Measured Throughput (Effective)", value: `${measured.toLocaleString()} Mbps`, strong: true },
        { label: "Real Download Transfer Rate", value: `${downloadMBps.toFixed(2)} MB/s` },
        { label: "Bandwidth Deficit / Overhead Loss", value: `${speedLossMbps.toFixed(1)} Mbps (${speedLossPct.toFixed(1)}%)` },
        { label: "Round-Trip Latency (Ping)", value: `${ping} ms` },
        { label: "Jitter Packet Variance", value: `${jit} ms` },
      ],
      steps: [
        `Delivered Efficiency = (${measured} Mbps / ${isp} Mbps) * 100 = ${efficiencyPct.toFixed(1)}%`,
        `Effective MegaBytes per Second = ${measured} Mbps / 8 = ${downloadMBps.toFixed(2)} MB/s`,
        `Estimated Protocol & Wireless Deficit = ${isp} - ${measured} = ${speedLossMbps.toFixed(1)} Mbps`,
      ],
      chart: {
        type: "donut",
        title: "Delivered Speed vs Network Overhead & Loss",
        format: "pct",
        data: [
          { name: "Delivered Throughput", value: Math.round(efficiencyPct), color: "#10b981" },
          { name: "Protocol & Wi-Fi Loss", value: Math.max(0, Math.round(speedLossPct)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function InternetSpeedCalculatorComponent() {
  return <CalcEngine config={internetSpeedConfig} />;
}
