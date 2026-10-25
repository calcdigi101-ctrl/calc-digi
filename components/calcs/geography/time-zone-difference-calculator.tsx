"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "time-zone-difference-calc",
  title: "Global Time Zone Difference & International Meeting Planner",
  presets: [
    { label: "New York (UTC-5) to London (UTC+0)", values: { tz1: "-5", tz2: "0", hour: 9, min: 0 } },
    { label: "San Francisco (UTC-8) to Tokyo (UTC+9)", values: { tz1: "-8", tz2: "9", hour: 16, min: 0 } },
    { label: "London (UTC+0) to Sydney (UTC+10)", values: { tz1: "0", tz2: "10", hour: 9, min: 0 } },
    { label: "New York (UTC-5) to Dubai (UTC+4)", values: { tz1: "-5", tz2: "4", hour: 11, min: 0 } },
    { label: "London (UTC+0) to Mumbai (UTC+5.5)", values: { tz1: "0", tz2: "5.5", hour: 10, min: 30 } },
    { label: "Chicago (UTC-6) to Berlin (UTC+1)", values: { tz1: "-6", tz2: "1", hour: 14, min: 0 } },
  ],
  fields: [
    {
      kind: "choice",
      key: "tz1",
      label: "Origin Location / Time Zone",
      default: "-5",
      options: [
        { value: "-10", label: "UTC-10:00 (HST – Honolulu)" },
        { value: "-9", label: "UTC-09:00 (AKST – Anchorage)" },
        { value: "-8", label: "UTC-08:00 (PST – Los Angeles, Vancouver)" },
        { value: "-7", label: "UTC-07:00 (MST – Denver, Phoenix)" },
        { value: "-6", label: "UTC-06:00 (CST – Chicago, Mexico City)" },
        { value: "-5", label: "UTC-05:00 (EST – New York, Toronto, Miami)" },
        { value: "-4", label: "UTC-04:00 (AST – Halifax, Santiago)" },
        { value: "-3", label: "UTC-03:00 (BRT – São Paulo, Buenos Aires)" },
        { value: "0", label: "UTC+00:00 (GMT/WET – London, Dublin, Lisbon)" },
        { value: "1", label: "UTC+01:00 (CET – Paris, Berlin, Rome, Madrid)" },
        { value: "2", label: "UTC+02:00 (EET – Cairo, Athens, Johannesburg)" },
        { value: "3", label: "UTC+03:00 (MSK/AST – Riyadh, Nairobi, Istanbul)" },
        { value: "3.5", label: "UTC+03:30 (IRST – Tehran)" },
        { value: "4", label: "UTC+04:00 (GST – Dubai, Baku)" },
        { value: "5", label: "UTC+05:00 (PKT – Karachi, Tashkent)" },
        { value: "5.5", label: "UTC+05:30 (IST – Mumbai, New Delhi)" },
        { value: "5.75", label: "UTC+05:45 (NPT – Kathmandu)" },
        { value: "6", label: "UTC+06:00 (BST – Dhaka, Almaty)" },
        { value: "7", label: "UTC+07:00 (ICT – Bangkok, Jakarta, Hanoi)" },
        { value: "8", label: "UTC+08:00 (SGT/CST – Singapore, Beijing, Perth)" },
        { value: "9", label: "UTC+09:00 (JST/KST – Tokyo, Seoul)" },
        { value: "9.5", label: "UTC+09:30 (ACST – Adelaide, Darwin)" },
        { value: "10", label: "UTC+10:00 (AEST – Sydney, Melbourne, Brisbane)" },
        { value: "11", label: "UTC+11:00 (SBT – Solomon Islands)" },
        { value: "12", label: "UTC+12:00 (NZST – Auckland, Wellington)" },
      ],
    },
    {
      kind: "choice",
      key: "tz2",
      label: "Destination Location / Time Zone",
      default: "0",
      options: [
        { value: "-10", label: "UTC-10:00 (HST – Honolulu)" },
        { value: "-9", label: "UTC-09:00 (AKST – Anchorage)" },
        { value: "-8", label: "UTC-08:00 (PST – Los Angeles, Vancouver)" },
        { value: "-7", label: "UTC-07:00 (MST – Denver, Phoenix)" },
        { value: "-6", label: "UTC-06:00 (CST – Chicago, Mexico City)" },
        { value: "-5", label: "UTC-05:00 (EST – New York, Toronto, Miami)" },
        { value: "-4", label: "UTC-04:00 (AST – Halifax, Santiago)" },
        { value: "-3", label: "UTC-03:00 (BRT – São Paulo, Buenos Aires)" },
        { value: "0", label: "UTC+00:00 (GMT/WET – London, Dublin, Lisbon)" },
        { value: "1", label: "UTC+01:00 (CET – Paris, Berlin, Rome, Madrid)" },
        { value: "2", label: "UTC+02:00 (EET – Cairo, Athens, Johannesburg)" },
        { value: "3", label: "UTC+03:00 (MSK/AST – Riyadh, Nairobi, Istanbul)" },
        { value: "3.5", label: "UTC+03:30 (IRST – Tehran)" },
        { value: "4", label: "UTC+04:00 (GST – Dubai, Baku)" },
        { value: "5", label: "UTC+05:00 (PKT – Karachi, Tashkent)" },
        { value: "5.5", label: "UTC+05:30 (IST – Mumbai, New Delhi)" },
        { value: "5.75", label: "UTC+05:45 (NPT – Kathmandu)" },
        { value: "6", label: "UTC+06:00 (BST – Dhaka, Almaty)" },
        { value: "7", label: "UTC+07:00 (ICT – Bangkok, Jakarta, Hanoi)" },
        { value: "8", label: "UTC+08:00 (SGT/CST – Singapore, Beijing, Perth)" },
        { value: "9", label: "UTC+09:00 (JST/KST – Tokyo, Seoul)" },
        { value: "9.5", label: "UTC+09:30 (ACST – Adelaide, Darwin)" },
        { value: "10", label: "UTC+10:00 (AEST – Sydney, Melbourne, Brisbane)" },
        { value: "11", label: "UTC+11:00 (SBT – Solomon Islands)" },
        { value: "12", label: "UTC+12:00 (NZST – Auckland, Wellington)" },
      ],
    },
    {
      kind: "number",
      key: "hour",
      label: "Origin Time: Hour (0 – 23 in 24h format)",
      default: 9,
      min: 0,
      max: 23,
      integer: true,
      hint: "Enter 9 for 9:00 AM, 14 for 2:00 PM, 20 for 8:00 PM",
    },
    {
      kind: "number",
      key: "min",
      label: "Origin Time: Minutes (0 – 59)",
      default: 0,
      min: 0,
      max: 59,
      integer: true,
      hint: "Minutes past the hour",
    },
  ],
  compute(values) {
    const t1 = parseFloat(String(values.tz1 ?? "-5"));
    const t2 = parseFloat(String(values.tz2 ?? "0"));
    const h = parseInt(String(values.hour ?? "9"), 10);
    const m = parseInt(String(values.min ?? "0"), 10);

    if (isNaN(t1) || isNaN(t2)) {
      return { error: "Please select valid origin and destination time zones." };
    }
    if (isNaN(h) || h < 0 || h > 23 || isNaN(m) || m < 0 || m > 59) {
      return { error: "Please enter a valid time between 00:00 and 23:59." };
    }

    const diffHours = t2 - t1;
    const totalMinutes = h * 60 + m + diffHours * 60;

    let dayShift = Math.floor(totalMinutes / 1440);
    let normMinutes = ((totalMinutes % 1440) + 1440) % 1440;
    const h2 = Math.floor(normMinutes / 60);
    const m2 = Math.round(normMinutes % 60);

    const pad = (n: number) => String(n).padStart(2, "0");
    const time1Str = `${pad(h)}:${pad(m)}`;
    const time2Str = `${pad(h2)}:${pad(m2)}`;

    // Convert to 12-hour AM/PM
    const to12h = (hours: number, mins: number) => {
      const ampm = hours >= 12 ? "PM" : "AM";
      const h12 = hours % 12 || 12;
      return `${h12}:${pad(mins)} ${ampm}`;
    };

    const time112h = to12h(h, m);
    const time212h = to12h(h2, m2);

    const absDiff = Math.abs(diffHours);
    const diffWhole = Math.floor(absDiff);
    const diffRemMinutes = Math.round((absDiff - diffWhole) * 60);
    const diffFormatted = `${diffWhole}h${diffRemMinutes > 0 ? ` ${diffRemMinutes}m` : ""}`;

    let relativeLabel = "Same Time";
    if (diffHours > 0) {
      relativeLabel = `${diffFormatted} Ahead (+${diffHours} hrs)`;
    } else if (diffHours < 0) {
      relativeLabel = `${diffFormatted} Behind (${diffHours} hrs)`;
    }

    let dayLabel = "Same Day (Synchronous Calendar)";
    let dayTone: "good" | "info" | "warn" = "good";

    if (dayShift > 0) {
      dayLabel = `+${dayShift} Day Next (Tomorrow in Destination)`;
      dayTone = "info";
    } else if (dayShift < 0) {
      dayLabel = `${dayShift} Day Prev (Yesterday in Destination)`;
      dayTone = "warn";
    }

    // Mutual Business Hour Overlap (9 AM to 5 PM)
    let overlapHours = 0;
    for (let hourIdx = 9; hourIdx < 17; hourIdx++) {
      const destHour = (hourIdx + diffHours + 24) % 24;
      if (destHour >= 9 && destHour < 17) {
        overlapHours++;
      }
    }

    const steps = [
      `1. UTC Offset Differential: ΔT = UTC(${t2 >= 0 ? `+${t2}` : t2}) - UTC(${t1 >= 0 ? `+${t1}` : t1}) = ${diffHours >= 0 ? `+${diffHours}` : diffHours} hours`,
      `2. Destination Time Math: (${time1Str}) + (${diffHours >= 0 ? `+${diffHours}` : diffHours} hrs) = ${time2Str} (${time212h})`,
      `3. Calendar Day Offset: ${dayLabel}`,
      `4. Real-Time Business Window: ${overlapHours} mutual operating hours between 9:00 AM and 5:00 PM`,
    ];

    return {
      hero: {
        label: "Destination Local Time",
        value: `${time212h}`,
        unit: `(${time2Str} 24h)`,
      },
      badge: {
        text: relativeLabel,
        tone: diffHours === 0 ? "good" : Math.abs(diffHours) <= 5 ? "info" : "warn",
      },
      rows: [
        { label: "Destination Converted Time", value: `${time212h} (${time2Str} local)`, strong: true },
        { label: "Origin Starting Time", value: `${time112h} (${time1Str} local)`, strong: true },
        { label: "Net Time Difference", value: relativeLabel },
        { label: "Calendar Day Shift", value: dayLabel },
        { label: "Mutual 9–5 Working Overlap", value: `${overlapHours} Hours Shared Business Window` },
        { label: "Origin UTC Offset", value: `UTC ${t1 >= 0 ? `+${t1}` : t1}` },
        { label: "Destination UTC Offset", value: `UTC ${t2 >= 0 ? `+${t2}` : t2}` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Mutual 8-Hour Workday Overlap (Hours)",
        data: [
          { name: "Common Overlap Hours", value: Math.max(0.1, overlapHours), color: "#10b981" },
          { name: "Non-Overlapping Work Hours", value: Math.max(0.1, 8 - overlapHours), color: "#f59e0b" },
        ],
      },
      note: {
        text: "This calculator computes standard UTC offsets. Verify local daylight saving time (DST) transition dates for both jurisdictions, as differences may temporarily vary by ±1 hour during spring and autumn.",
        tone: "neutral",
      },
    };
  },
};

export default function TimeZoneDifferenceCalculator() {
  return <CalcEngine config={config} />;
}
