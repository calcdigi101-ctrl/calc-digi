"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "spotify-stats-calc",
  title: "Music Streaming Stats & Cellular Data Consumption Calculator",
  presets: [
    { label: "Daily Commuter & Office Worker (2.5 hrs/day, 320 kbps)", values: { dailyHours: 2.5, quality: "very_high", cellularPct: 40 } },
    { label: "Casual Weekend Listener (45 mins/day, 160 kbps)", values: { dailyHours: 0.75, quality: "high", cellularPct: 20 } },
    { label: "Hardcore Audiophile / Student (6 hrs/day, 320 kbps)", values: { dailyHours: 6.0, quality: "very_high", cellularPct: 50 } },
    { label: "Data Saver Traveler (1.5 hrs/day, 96 kbps)", values: { dailyHours: 1.5, quality: "normal", cellularPct: 80 } },
    { label: "Background Focus / Study Beats (4 hrs/day, 160 kbps)", values: { dailyHours: 4.0, quality: "high", cellularPct: 15 } },
  ],
  fields: [
    {
      kind: "number",
      key: "dailyHours",
      label: "Average Daily Listening Time (Hours)",
      default: 2.5,
      min: 0.1,
      max: 24,
      hint: "How many hours you stream music per day (e.g., 2.5 hours)",
    },
    {
      kind: "choice",
      key: "quality",
      label: "Audio Streaming Quality Bitrate",
      default: "very_high",
      options: [
        { value: "low", label: "Low Quality (24 kbps — ~11 MB/hr, extreme data saver)" },
        { value: "normal", label: "Normal Quality (96 kbps — ~43 MB/hr, default free tier)" },
        { value: "high", label: "High Quality (160 kbps — ~72 MB/hr, balanced)" },
        { value: "very_high", label: "Very High Quality (320 kbps — ~144 MB/hr, Spotify Premium)" },
      ],
    },
    {
      kind: "number",
      key: "cellularPct",
      label: "Percentage Streamed on Mobile Cellular Data (%)",
      default: 40,
      min: 0,
      max: 100,
      hint: "Portion streamed on LTE/5G without Wi-Fi or offline downloads",
    },
  ],
  compute: (vals) => {
    const dailyHours = Number(vals.dailyHours) || 2.5;
    const quality = String(vals.quality || "very_high");
    const cellularPct = Number(vals.cellularPct) || 40;

    const bitrateMap: Record<string, { kbps: number; mbPerHour: number }> = {
      low: { kbps: 24, mbPerHour: 10.8 },
      normal: { kbps: 96, mbPerHour: 43.2 },
      high: { kbps: 160, mbPerHour: 72.0 },
      very_high: { kbps: 320, mbPerHour: 144.0 },
    };

    const { kbps, mbPerHour } = bitrateMap[quality] || bitrateMap.very_high;

    // Annual projections
    const annualHours = dailyHours * 365;
    const avgSongDurationMins = 3.3; // standard radio edit length
    const totalSongsAnnual = Math.round((annualHours * 60) / avgSongDurationMins);
    const songsPerDay = Math.round((dailyHours * 60) / avgSongDurationMins);

    // Data consumption
    const monthlyHours = dailyHours * 30.4;
    const monthlyTotalDataMB = monthlyHours * mbPerHour;
    const monthlyCellularDataMB = monthlyTotalDataMB * (cellularPct / 100);
    const monthlyCellularGB = (monthlyCellularDataMB / 1024).toFixed(2);
    const annualTotalGB = ((annualHours * mbPerHour) / 1024).toFixed(1);

    // Artist royalty pool contribution estimate ($0.0035 per stream)
    const royaltyPerStream = 0.0038;
    const estimatedRoyaltyGenerated = (totalSongsAnnual * royaltyPerStream).toFixed(2);

    return {
      hero: {
        value: `${annualHours.toLocaleString()} Hours / Year`,
        label: `~${totalSongsAnnual.toLocaleString()} Tracks Streamed Annually (${songsPerDay} songs/day)`,
      },
      badge: {
        text: `${annualHours.toFixed(0)} Hrs / Year`,
        tone: "good",
      },
      chart: {
        type: "donut",
        title: "Monthly Bandwidth Usage (MB)",
        data: [
          { name: `Cellular Data (${(monthlyCellularDataMB / 1024).toFixed(1)} GB)`, value: Math.max(1, Math.round(monthlyCellularDataMB)), color: "#ef4444" },
          { name: `Wi-Fi Streaming (${(Math.max(0, monthlyTotalDataMB - monthlyCellularDataMB) / 1024).toFixed(1)} GB)`, value: Math.max(1, Math.round(Math.max(0, monthlyTotalDataMB - monthlyCellularDataMB))), color: "#10b981" },
        ],
        format: "plain",
      },
      rows: [
        { label: "Annual Listening Time", value: `${annualHours.toLocaleString()} hours (~${(annualHours / 24).toFixed(1)} full days of music)` },
        { label: "Total Tracks Streamed", value: `~${totalSongsAnnual.toLocaleString()} songs (avg 3.3 mins/track)` },
        { label: "Streaming Audio Bitrate", value: `${kbps} kbps (${mbPerHour.toFixed(1)} MB per hour)` },
        { label: "Monthly Cellular Data Used", value: `${monthlyCellularGB} GB / month (${cellularPct}% of streaming)` },
        { label: "Total Annual Bandwidth Consumed", value: `${annualTotalGB} GB (Wi-Fi + Mobile Data combined)` },
        { label: "Estimated Artist Royalty Pool Share", value: `~$${estimatedRoyaltyGenerated} generated (@ ~$0.0038/stream)` },
      ],
      steps: [
        `Annual time: ${dailyHours} hrs/day × 365 days = ${annualHours.toLocaleString()} total hours.`,
        `Song count calculation: (${annualHours} hrs × 60 mins) ÷ 3.3 mins/song = ~${totalSongsAnnual.toLocaleString()} tracks.`,
        `Data rate for ${kbps} kbps: (${kbps} × 1000 bits/sec × 3600 sec) ÷ (8 bits/byte × 1,048,576 bytes/MB) = ${mbPerHour.toFixed(1)} MB/hr.`,
        `Monthly cellular data: (${dailyHours} hrs/day × 30.4 days) × ${mbPerHour.toFixed(1)} MB/hr × ${cellularPct}% = ${monthlyCellularGB} GB/month.`,
        `Royalty contribution: ~${totalSongsAnnual.toLocaleString()} streams × $0.0038/stream = ~$${estimatedRoyaltyGenerated} generated for creators.`,
      ],
      note: { text: "Spotify's 'Very High' setting streams at 320 kbps Ogg Vorbis or AAC, consuming roughly 1 GB of bandwidth every 7 hours of continuous playback." },
    };
  },
};

export default function SpotifyListeningStatsCalculator() {
  return <CalcEngine config={config} />;
}
