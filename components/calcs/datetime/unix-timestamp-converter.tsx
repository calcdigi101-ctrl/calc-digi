"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const unixTimestampConverterConfig: CalcConfig = {
  id: "unix-timestamp-converter",
  title: "UNIX Epoch Timestamp Converter & Y2038 Analysis",
  fields: [
    { kind: "number", key: "timestamp", label: "UNIX Epoch Timestamp (Seconds)", default: 1793000000, min: 0, max: 2147483647000 },
  ],
  presets: [
    { label: "Current Epoch Benchmark (~1.79 Billion)", values: { timestamp: 1793000000 } },
    { label: "POSIX Epoch Baseline (Jan 1, 1970 = 0)", values: { timestamp: 0 } },
    { label: "Y2K Millennium Marker (Jan 1, 2000 = 946684800)", values: { timestamp: 946684800 } },
    { label: "32-Bit Overflow Y2038 Ceiling (2,147,483,647)", values: { timestamp: 2147483647 } },
  ],
  compute: (vals) => {
    const ts = Number(vals.timestamp) || 1793000000;
    const dateObj = new Date(ts * 1000);

    const isoStr = dateObj.toISOString();
    const utcStr = dateObj.toUTCString();

    const max32 = 2147483647; // Jan 19, 2038
    const remTo32 = Math.max(0, max32 - ts);
    const remYearsTo32 = remTo32 / (365.25 * 86400);

    return {
      hero: {
        value: isoStr.replace("T", " ").replace("Z", " UTC"),
        label: "Decoded UTC Calendar Date",
        sub: `Timestamp: ${ts.toLocaleString()} seconds since 1970-01-01T00:00:00Z`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "32-Bit UNIX Epoch Headroom to Year 2038",
        data: [
          { name: "Elapsed Epoch Seconds", value: Math.min(max32, ts), color: "#10b981" },
          { name: "Headroom Remaining to Y2038", value: Math.max(1, remTo32), color: "#f59e0b" },
        ],
      },
      metrics: [
        { label: "Decoded ISO 8601", value: isoStr.split("T")[0] },
        { label: "UTC Time", value: isoStr.split("T")[1].replace("Z", "") },
        { label: "Headroom to Y2038", value: `~${remYearsTo32.toFixed(1)} years` },
        { label: "Millisecond Timestamp", value: `${(ts * 1000).toLocaleString()}` },
      ],
      breakdown: [
        { label: "UNIX Seconds", value: `${ts}` },
        { label: "ISO 8601 Standard String", value: isoStr },
        { label: "RFC 2822 Representation", value: utcStr },
        { label: "Elapsed Days Since Epoch", value: `${Math.floor(ts / 86400).toLocaleString()} days` },
        { label: "32-Bit Overflow Limit", value: "2,147,483,647 (2038-01-19 03:14:07 UTC)" },
        { label: "64-Bit Headroom", value: "> 292 Billion Years" },
      ],
      steps: [
        `Parse integer epoch seconds: ${ts}.`,
        `Multiply by 1,000 for standard ECMAScript millisecond representation: ${ts * 1000} ms.`,
        `Reconstruct UTC date parameters: Year ${dateObj.getUTCFullYear()}, Month ${dateObj.getUTCMonth() + 1}, Day ${dateObj.getUTCDate()}.`,
        `Evaluate Y2038 integer headroom: ${(max32 - ts).toLocaleString()} seconds remaining before signed 32-bit overflow.`,
      ],
    };
  },
};

export default function UnixTimestampConverterComponent() {
  return <CalcEngine config={unixTimestampConverterConfig} />;
}
