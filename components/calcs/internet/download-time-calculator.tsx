"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const downloadTimeConfig: CalcConfig = {
  id: "download-time-calculator",
  title: "Download Time, File Transfer & Network Overhead Calculator",
  fields: [
    { kind: "number", key: "fileSize", label: "File Size Quantity", default: 60, min: 0.1, max: 100000 },
    {
      kind: "choice",
      key: "sizeUnit",
      label: "File Size Measurement Unit",
      default: "GB",
      options: [
        { label: "Megabytes (MB)", value: "MB" },
        { label: "Gigabytes (GB)", value: "GB" },
        { label: "Terabytes (TB)", value: "TB" },
      ],
    },
    { kind: "number", key: "downloadSpeed", label: "Internet Download Speed (Mbps)", default: 100, min: 1, max: 10000 },
    { kind: "number", key: "overheadPct", label: "TCP/IP & Packet Overhead Buffer (%)", default: 12, min: 0, max: 40 },
  ],
  presets: [
    { label: "Modern AAA Game (80 GB at 200 Mbps)", values: { fileSize: 80, sizeUnit: "GB", downloadSpeed: 200, overheadPct: 12 } },
    { label: "4K UHD Movie (22 GB at 100 Mbps)", values: { fileSize: 22, sizeUnit: "GB", downloadSpeed: 100, overheadPct: 10 } },
    { label: "Cloud Backup Archive (1.5 TB at 500 Mbps)", values: { fileSize: 1.5, sizeUnit: "TB", downloadSpeed: 500, overheadPct: 15 } },
    { label: "Software OS Update (4.5 GB at 50 Mbps)", values: { fileSize: 4.5, sizeUnit: "GB", downloadSpeed: 50, overheadPct: 10 } },
  ],
  compute: (vals) => {
    const size = Math.max(0.01, Number(vals.fileSize) || 60);
    const unit = String(vals.sizeUnit || "GB");
    const speed = Math.max(0.5, Number(vals.downloadSpeed) || 100);
    const overhead = Math.min(50, Math.max(0, Number(vals.overheadPct) || 12));

    let sizeMB = size;
    if (unit === "GB") sizeMB = size * 1024;
    else if (unit === "TB") sizeMB = size * 1024 * 1024;

    const sizeMbits = sizeMB * 8.0;
    const theoreticalSeconds = sizeMbits / speed;
    const realisticSeconds = theoreticalSeconds * (1 + overhead / 100.0);
    const realisticMinutes = realisticSeconds / 60.0;
    const realisticHours = realisticMinutes / 60.0;
    const transferRateMBps = (speed / 8.0) * (1 - overhead / (100.0 + overhead));

    let timeFormatted = "";
    if (realisticSeconds < 60) {
      timeFormatted = `${Math.ceil(realisticSeconds)} seconds`;
    } else if (realisticMinutes < 60) {
      const mins = Math.floor(realisticMinutes);
      const secs = Math.round(realisticSeconds % 60);
      timeFormatted = `${mins} min ${secs} sec`;
    } else {
      const hrs = Math.floor(realisticHours);
      const mins = Math.round(realisticMinutes % 60);
      timeFormatted = `${hrs} hr ${mins} min`;
    }

    return {
      hero: {
        label: "Estimated Download Time",
        value: timeFormatted,
      },
      badge: {
        text: `${transferRateMBps.toFixed(2)} MB/s Effective Rate`,
        tone: "good",
      },
      rows: [
        { label: "Total File Payload", value: `${size} ${unit} (${sizeMB >= 1024 ? (sizeMB / 1024).toFixed(1) + " GB" : sizeMB.toFixed(0) + " MB"})` },
        { label: "Theoretical Ideal Time (Zero Loss)", value: fmtSecs(theoreticalSeconds) },
        { label: "Realistic Download Duration", value: timeFormatted, strong: true },
        { label: "Effective Download Throughput", value: `${transferRateMBps.toFixed(2)} MB/s` },
        { label: "Protocol & TCP Overhead Buffer", value: `+${overhead}% (${fmtSecs(realisticSeconds - theoreticalSeconds)} added)` },
        { label: "Time at Peak Congestion (Half Speed)", value: fmtSecs(realisticSeconds * 2) },
      ],
      steps: [
        `Convert File Size: ${size} ${unit} = ${sizeMB.toLocaleString()} MB = ${sizeMbits.toLocaleString()} Mbits`,
        `Theoretical Duration = ${sizeMbits.toLocaleString()} Mbits / ${speed} Mbps = ${theoreticalSeconds.toFixed(1)} seconds`,
        `Realistic Duration with ${overhead}% Overhead = ${theoreticalSeconds.toFixed(1)} s * (1 + ${(overhead / 100).toFixed(2)}) = ${timeFormatted}`,
      ],
      chart: {
        type: "donut",
        title: "Download Time: Raw File Data vs Protocol Overhead",
        format: "num",
        data: [
          { name: "Raw Data Payload Transfer", value: Math.round(theoreticalSeconds), color: "#10b981" },
          { name: "Overhead Buffer & Latency", value: Math.max(1, Math.round(realisticSeconds - theoreticalSeconds)), color: "#6366f1" },
        ],
      },
    };
  },
};

function fmtSecs(s: number) {
  if (s < 60) return `${Math.round(s)} sec`;
  if (s < 3600) return `${(s / 60).toFixed(1)} min`;
  return `${(s / 3600).toFixed(2)} hrs`;
}

export default function DownloadTimeCalculatorComponent() {
  return <CalcEngine config={downloadTimeConfig} />;
}
