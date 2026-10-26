"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const streamingQualityConfig: CalcConfig = {
  id: "streaming-quality-calculator",
  title: "Video Streaming Bitrate, Codec Compression & Bandwidth Calculator",
  fields: [
    {
      kind: "choice",
      key: "resolution",
      label: "Streaming Video Resolution",
      default: "4k",
      options: [
        { label: "4K UHD (3840 x 2160 - Ultra HD)", value: "4k" },
        { label: "1440p QHD (2560 x 1440 - 2K)", value: "1440p" },
        { label: "1080p Full HD (1920 x 1080)", value: "1080p" },
        { label: "720p HD (1280 x 720 - Standard Web)", value: "720p" },
      ],
    },
    {
      kind: "choice",
      key: "codec",
      label: "Compression Video Codec",
      default: "hevc",
      options: [
        { label: "AV1 (Next-Gen Open Royalty-Free, ~30% smaller)", value: "av1" },
        { label: "HEVC / H.265 (Modern Standard 4K/HDR)", value: "hevc" },
        { label: "H.264 / AVC (Universal Compatibility, Higher Bitrate)", value: "h264" },
      ],
    },
    {
      kind: "choice",
      key: "fps",
      label: "Frame Rate (FPS)",
      default: "60",
      options: [
        { label: "60 Frames Per Second (High Motion / Sports)", value: "60" },
        { label: "30 Frames Per Second (Standard Cinematic)", value: "30" },
      ],
    },
    { kind: "number", key: "audioKbps", label: "Audio Track Bitrate (kbps)", default: 256, min: 64, max: 768 },
  ],
  presets: [
    { label: "Netflix 4K HDR (HEVC, 60 FPS, 5.1 Audio)", values: { resolution: "4k", codec: "hevc", fps: "60", audioKbps: 384 } },
    { label: "YouTube 1080p Gaming (AV1, 60 FPS)", values: { resolution: "1080p", codec: "av1", fps: "60", audioKbps: 192 } },
    { label: "Twitch Live Broadcast (H.264, 1080p 60 FPS)", values: { resolution: "1080p", codec: "h264", fps: "60", audioKbps: 160 } },
    { label: "Casual Mobile Stream (720p 30 FPS)", values: { resolution: "720p", codec: "h264", fps: "30", audioKbps: 128 } },
  ],
  compute: (vals) => {
    const res = String(vals.resolution || "4k");
    const codec = String(vals.codec || "hevc");
    const fps = String(vals.fps || "60");
    const audio = Math.max(64, Number(vals.audioKbps) || 256);

    let baseMbps = 20.0;
    if (res === "4k") baseMbps = 25.0;
    else if (res === "1440p") baseMbps = 12.0;
    else if (res === "1080p") baseMbps = 6.0;
    else if (res === "720p") baseMbps = 3.0;

    let codecMultiplier = 1.0;
    if (codec === "hevc") codecMultiplier = 0.65;
    else if (codec === "av1") codecMultiplier = 0.50;

    const fpsMultiplier = fps === "60" ? 1.4 : 1.0;
    const videoBitrateMbps = baseMbps * codecMultiplier * fpsMultiplier;
    const audioBitrateMbps = audio / 1000.0;
    const totalStreamBitrateMbps = videoBitrateMbps + audioBitrateMbps;

    const requiredIspBandwidthMbps = Math.ceil(totalStreamBitrateMbps * 1.35);
    const hourlyDataConsumptionGb = (totalStreamBitrateMbps / 8.0) * 3.6;

    return {
      hero: {
        label: "Required Stream Bitrate",
        value: `${totalStreamBitrateMbps.toFixed(2)} Mbps`,
      },
      badge: {
        text: `Min ${requiredIspBandwidthMbps} Mbps Plan`,
        tone: "good",
      },
      rows: [
        { label: "Target Resolution & Frame Rate", value: `${res.toUpperCase()} @ ${fps} fps` },
        { label: "Encoding Video Codec", value: codec.toUpperCase() },
        { label: "Video Stream Bitrate", value: `${videoBitrateMbps.toFixed(2)} Mbps` },
        { label: "Audio Bitrate", value: `${audio} kbps (${audioBitrateMbps.toFixed(2)} Mbps)` },
        { label: "Hourly Data Consumption", value: `${hourlyDataConsumptionGb.toFixed(2)} GB / hour` },
        { label: "Recommended Minimum Connection", value: `${requiredIspBandwidthMbps} Mbps Plan`, strong: true },
      ],
      steps: [
        `Base ${res.toUpperCase()} Bitrate * ${codec.toUpperCase()} Factor (${codecMultiplier}) * ${fps} FPS (${fpsMultiplier}) = ${videoBitrateMbps.toFixed(2)} Mbps`,
        `Total Bitrate = ${videoBitrateMbps.toFixed(2)} Mbps (Video) + ${audioBitrateMbps.toFixed(2)} Mbps (Audio) = ${totalStreamBitrateMbps.toFixed(2)} Mbps`,
        `Hourly Data = (${totalStreamBitrateMbps.toFixed(2)} Mbps / 8) * 3600 s / 1024 = ${hourlyDataConsumptionGb.toFixed(2)} GB/hour`,
      ],
      chart: {
        type: "donut",
        title: "Bitrate Composition: Video Payload vs Audio & Headroom",
        format: "num",
        data: [
          { name: "Video Bitrate", value: Math.max(0.1, parseFloat(videoBitrateMbps.toFixed(2))), color: "#ef4444" },
          { name: "Buffering Headroom (35%)", value: Math.max(0.1, parseFloat((totalStreamBitrateMbps * 0.35).toFixed(2))), color: "#3b82f6" },
          { name: "Audio Stream", value: Math.max(0.05, parseFloat(audioBitrateMbps.toFixed(2))), color: "#10b981" },
        ],
      },
    };
  },
};

export default function StreamingQualityCalculatorComponent() {
  return <CalcEngine config={streamingQualityConfig} />;
}
