"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const pingLatencyConfig: CalcConfig = {
  id: "ping-latency-calculator",
  title: "Network Round-Trip Time (RTT), Fiber Propagation & Queuing Latency Calculator",
  fields: [
    { kind: "number", key: "distanceKm", label: "Physical Distance to Server (km)", default: 3500, min: 10, max: 25000 },
    { kind: "number", key: "routerHops", label: "Intermediate Router / Switch Hops", default: 12, min: 1, max: 40 },
    { kind: "number", key: "queuingBufferMs", label: "Bufferbloat & Queuing Delay (ms)", default: 6, min: 0, max: 100 },
    { kind: "number", key: "lastMileMs", label: "Last-Mile Access Medium (Wi-Fi / 5G / Fiber ms)", default: 8, min: 1, max: 60 },
  ],
  presets: [
    { label: "Transcontinental US (NY to LA - 3,900 km)", values: { distanceKm: 3900, routerHops: 12, queuingBufferMs: 6, lastMileMs: 6 } },
    { label: "Transatlantic (London to New York - 5,500 km)", values: { distanceKm: 5500, routerHops: 14, queuingBufferMs: 8, lastMileMs: 5 } },
    { label: "Regional Metro (Within State - 250 km)", values: { distanceKm: 250, routerHops: 5, queuingBufferMs: 2, lastMileMs: 4 } },
    { label: "Transpacific (Tokyo to San Francisco - 8,200 km)", values: { distanceKm: 8200, routerHops: 16, queuingBufferMs: 12, lastMileMs: 8 } },
  ],
  compute: (vals) => {
    const dist = Math.max(1, Number(vals.distanceKm) || 3500);
    const hops = Math.max(1, Number(vals.routerHops) || 12);
    const queue = Math.max(0, Number(vals.queuingBufferMs) || 6);
    const lastMile = Math.max(0.5, Number(vals.lastMileMs) || 8);

    const fiberPropagationOneWayMs = dist / 204.19;
    const fiberRttPropagationMs = fiberPropagationOneWayMs * 2.0;
    const hopProcessingRttMs = hops * 0.5 * 2.0;
    const totalRttMs = fiberRttPropagationMs + hopProcessingRttMs + queue + (lastMile * 2.0);

    let tier = "Competitive Gaming Grade (< 40 ms)";
    let tone: "good" | "warn" | "bad" = "good";
    if (totalRttMs > 120) {
      tier = "High Latency / Noticeable Lag (> 120 ms)";
      tone = "bad";
    } else if (totalRttMs > 70) {
      tier = "Moderate Latency / Acceptable for Streaming (70 - 120 ms)";
      tone = "warn";
    } else if (totalRttMs > 40) {
      tier = "Good Commercial Interactive (40 - 70 ms)";
    }

    return {
      hero: {
        label: "Estimated Round-Trip Ping (RTT)",
        value: `${totalRttMs.toFixed(1)} ms`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "Fiber Optical Propagation (RTT)", value: `${fiberRttPropagationMs.toFixed(1)} ms (Speed of Light in Glass)` },
        { label: "Router Hop Inspection & Switching", value: `${hopProcessingRttMs.toFixed(1)} ms (${hops} hops)` },
        { label: "Bufferbloat & Queuing Delay", value: `${queue.toFixed(1)} ms` },
        { label: "Last-Mile Access Latency (Local Wi-Fi)", value: `${(lastMile * 2).toFixed(1)} ms` },
        { label: "Total Network Round-Trip Time", value: `${totalRttMs.toFixed(1)} ms`, strong: true },
        { label: "Gaming Tick-Rate Feasibility (128-tick)", value: totalRttMs < 50 ? "Excellent (< 50 ms)" : "Sub-Optimal (> 50 ms)" },
      ],
      steps: [
        `Fiber Optical Propagation = (2 * ${dist} km) / 204.19 km/ms = ${fiberRttPropagationMs.toFixed(1)} ms`,
        `Router Switching Delay = ${hops} hops * 1.0 ms = ${hopProcessingRttMs.toFixed(1)} ms`,
        `Total Ping (RTT) = ${fiberRttPropagationMs.toFixed(1)} + ${hopProcessingRttMs.toFixed(1)} + ${queue} + ${(lastMile * 2).toFixed(1)} = ${totalRttMs.toFixed(1)} ms`,
      ],
      chart: {
        type: "donut",
        title: "Latency Composition: Fiber Speed vs Switching & Bufferbloat",
        format: "num",
        data: [
          { name: "Fiber Optical Speed", value: Math.max(1, Math.round(fiberRttPropagationMs)), color: "#3b82f6" },
          { name: "Router Switching Hops", value: Math.max(1, Math.round(hopProcessingRttMs)), color: "#8b5cf6" },
          { name: "Queue & Bufferbloat", value: Math.max(1, Math.round(queue)), color: "#ef4444" },
          { name: "Last-Mile Wi-Fi Access", value: Math.max(1, Math.round(lastMile * 2)), color: "#10b981" },
        ],
      },
    };
  },
};

export default function PingLatencyCalculatorComponent() {
  return <CalcEngine config={pingLatencyConfig} />;
}
