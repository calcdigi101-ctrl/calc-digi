"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const websiteLoadTimeConfig: CalcConfig = {
  id: "website-load-time-calculator",
  title: "Website Page Speed, Core Web Vitals & Asset Waterfall Calculator",
  fields: [
    { kind: "number", key: "pageWeightMb", label: "Total Page Weight Payload (MB)", default: 2.4, min: 0.1, max: 50 },
    { kind: "number", key: "httpRequestCount", label: "Total HTTP Network Requests", default: 65, min: 5, max: 300 },
    { kind: "number", key: "serverTtfbMs", label: "Server Time to First Byte (TTFB ms)", default: 180, min: 20, max: 3000 },
    { kind: "number", key: "userSpeedMbps", label: "Client Download Speed (Mbps)", default: 35, min: 1, max: 1000 },
    { kind: "number", key: "cacheHitPct", label: "CDN / Browser Cache Hit Ratio (%)", default: 40, min: 0, max: 95 },
  ],
  presets: [
    { label: "Modern Optimized Next.js (1.2 MB, CDN Cached)", values: { pageWeightMb: 1.2, httpRequestCount: 35, serverTtfbMs: 90, userSpeedMbps: 50, cacheHitPct: 60 } },
    { label: "Average E-Commerce Store (3.5 MB, 90 Requests)", values: { pageWeightMb: 3.5, httpRequestCount: 90, serverTtfbMs: 320, userSpeedMbps: 25, cacheHitPct: 30 } },
    { label: "Heavy WordPress / Media Site (6.5 MB, 140 Requests)", values: { pageWeightMb: 6.5, httpRequestCount: 140, serverTtfbMs: 650, userSpeedMbps: 15, cacheHitPct: 15 } },
    { label: "High-Speed Mobile 5G (0.8 MB Minimal Web)", values: { pageWeightMb: 0.8, httpRequestCount: 20, serverTtfbMs: 60, userSpeedMbps: 80, cacheHitPct: 75 } },
  ],
  compute: (vals) => {
    const weightMb = Math.max(0.1, Number(vals.pageWeightMb) || 2.4);
    const reqs = Math.max(5, Number(vals.httpRequestCount) || 65);
    const ttfb = Math.max(20, Number(vals.serverTtfbMs) || 180);
    const speed = Math.max(1, Number(vals.userSpeedMbps) || 35);
    const cache = Math.min(95, Math.max(0, Number(vals.cacheHitPct) || 40));

    const uncachedWeightMb = weightMb * (1 - cache / 100.0);
    const uncachedWeightMbits = uncachedWeightMb * 8.0;
    const networkTransferMs = (uncachedWeightMbits / speed) * 1000.0;
    const multiplexingOverheadMs = (reqs * (1 - cache / 100.0) / 12.0) * 40.0;
    const domParseRenderMs = 120 + (weightMb * 85);

    const totalLoadTimeMs = ttfb + networkTransferMs + multiplexingOverheadMs + domParseRenderMs;
    const totalLoadTimeSeconds = totalLoadTimeMs / 1000.0;

    let tier = "Good (Core Web Vitals LCP < 2.5s)";
    let tone: "good" | "warn" | "bad" = "good";
    if (totalLoadTimeSeconds > 4.0) {
      tier = "Poor (> 4.0s - High Bounce Rate)";
      tone = "bad";
    } else if (totalLoadTimeSeconds > 2.5) {
      tier = "Needs Improvement (2.5s - 4.0s)";
      tone = "warn";
    }

    return {
      hero: {
        label: "Estimated Full Page Load Duration",
        value: `${totalLoadTimeSeconds.toFixed(2)}s`,
      },
      badge: {
        text: tier,
        tone: tone,
      },
      rows: [
        { label: "Server Time to First Byte (TTFB)", value: `${ttfb} ms` },
        { label: "Network Content Download Duration", value: `${Math.round(networkTransferMs)} ms (${uncachedWeightMb.toFixed(2)} MB over wire)` },
        { label: "HTTP/2 Multiplexing Round-Trips", value: `${Math.round(multiplexingOverheadMs)} ms (${reqs} requests)` },
        { label: "Client Browser DOM Parse & Render", value: `${Math.round(domParseRenderMs)} ms` },
        { label: "Total Page Load Time", value: `${totalLoadTimeSeconds.toFixed(2)} seconds`, strong: true },
      ],
      steps: [
        `Uncached Wire Payload = ${weightMb} MB * (1 - ${(cache / 100).toFixed(2)}) = ${uncachedWeightMb.toFixed(2)} MB`,
        `Transfer Duration = (${uncachedWeightMb.toFixed(2)} * 8 Mbits / ${speed} Mbps) * 1000 = ${Math.round(networkTransferMs)} ms`,
        `Total Load = ${ttfb} ms (TTFB) + ${Math.round(networkTransferMs)} ms (Data) + ${Math.round(multiplexingOverheadMs)} ms (RTT) + ${Math.round(domParseRenderMs)} ms (DOM) = ${totalLoadTimeSeconds.toFixed(2)}s`,
      ],
      chart: {
        type: "donut",
        title: "Page Load Latency Composition Waterfall",
        format: "num",
        data: [
          { name: "Content Download", value: Math.max(10, Math.round(networkTransferMs)), color: "#3b82f6" },
          { name: "Server TTFB", value: Math.max(10, Math.round(ttfb)), color: "#8b5cf6" },
          { name: "DOM Parse & Render", value: Math.max(10, Math.round(domParseRenderMs)), color: "#10b981" },
          { name: "HTTP Multiplexing", value: Math.max(5, Math.round(multiplexingOverheadMs)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function WebsiteLoadTimeCalculatorComponent() {
  return <CalcEngine config={websiteLoadTimeConfig} />;
}
