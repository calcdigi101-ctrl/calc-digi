"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "snr-calculator",
  title: "Signal-to-Noise Ratio (SNR) & Shannon Channel Capacity Calculator",
  presets: [
    { label: "Wi-Fi 6 5GHz Link (30 dB SNR, 80 MHz Bandwidth)", values: { snrDb: 30, bandwidthMhz: 80 } },
    { label: "4G LTE / 5G Mid-Band (18 dB SNR, 20 MHz Channel)", values: { snrDb: 18, bandwidthMhz: 20 } },
    { label: "High-Fidelity Audio Studio (96 dB SNR, 0.02 MHz Audio)", values: { snrDb: 96, bandwidthMhz: 0.02 } },
    { label: "Deep Space Probe Telemetry (4 dB SNR, 0.5 MHz Channel)", values: { snrDb: 4, bandwidthMhz: 0.5 } },
    { label: "Satellite DVB-S2 Downlink (12 dB SNR, 36 MHz Transponder)", values: { snrDb: 12, bandwidthMhz: 36 } },
  ],
  fields: [
    {
      kind: "number",
      key: "snrDb",
      label: "Signal-to-Noise Ratio SNR (decibels / dB)",
      default: 25,
      min: -30,
      max: 160,
      hint: "SNR in decibels (e.g. 10 dB = 10x power ratio, 20 dB = 100x ratio, 30 dB = 1,000x ratio)",
    },
    {
      kind: "number",
      key: "bandwidthMhz",
      label: "RF / Signal Channel Bandwidth B (MHz)",
      default: 20,
      min: 0.001,
      max: 100000,
      hint: "Allocated frequency spectrum in Megahertz (e.g. 20 MHz for LTE, 80 MHz for Wi-Fi, 0.02 MHz for audio)",
    },
  ],
  compute(values) {
    const snrDb = Number(values.snrDb);
    const B_MHz = Number(values.bandwidthMhz);

    if (isNaN(snrDb)) return { error: "Please enter a valid numeric SNR in decibels." };
    if (isNaN(B_MHz) || B_MHz <= 0) return { error: "Please enter a valid positive channel bandwidth." };

    // Linear power ratio: SNR_linear = 10^(SNR_dB / 10)
    const snrLinear = Math.pow(10, snrDb / 10);

    // Channel Bandwidth in Hertz
    const B_Hz = B_MHz * 1e6;

    // Shannon-Hartley theorem: C = B * log2(1 + SNR_linear) (bits per second)
    const capacityBps = B_Hz * (Math.log(1 + snrLinear) / Math.LN2);
    const capacityMbps = capacityBps / 1e6;
    const capacityGbps = capacityMbps / 1000;

    // Spectral Efficiency eta = C / B = log2(1 + SNR) (bits/s/Hz)
    const spectralEff = Math.log(1 + snrLinear) / Math.LN2;

    // Modulation scheme viability mapping
    let modTier = "BPSK / Robust QPSK";
    let modTone: "good" | "info" | "warn" = "info";

    if (snrDb < 6) {
      modTier = "BPSK / Spread Spectrum (Low Throughput / High Noise)";
      modTone = "warn";
    } else if (snrDb < 12) {
      modTier = "QPSK (2 bits/symbol – Reliable Wireless Link)";
      modTone = "info";
    } else if (snrDb < 18) {
      modTier = "16-QAM (4 bits/symbol – Good Mobile Data)";
      modTone = "good";
    } else if (snrDb < 24) {
      modTier = "64-QAM (6 bits/symbol – High-Speed Wi-Fi/LTE)";
      modTone = "good";
    } else if (snrDb < 32) {
      modTier = "256-QAM (8 bits/symbol – Ultra-Dense Gigabit Wi-Fi)";
      modTone = "good";
    } else {
      modTier = "1024-QAM / 4096-QAM (Maximum High-Order Density)";
      modTone = "good";
    }

    const steps = [
      `1. Logarithmic to Linear Ratio: SNR_linear = 10^(SNR_dB ÷ 10) = 10^(${snrDb} ÷ 10) = ${snrLinear >= 1000 ? snrLinear.toExponential(3) : snrLinear.toFixed(2)} : 1`,
      `2. Spectral Efficiency (Bits/s/Hz): η = log₂(1 + SNR) = log₂(${1 + Number(snrLinear.toFixed(2))}) = ${spectralEff.toFixed(2)} bits/s/Hz`,
      `3. Shannon Channel Capacity: C = B × log₂(1 + SNR) = ${B_MHz} MHz × ${spectralEff.toFixed(2)} b/s/Hz = ${capacityMbps >= 1000 ? `${capacityGbps.toFixed(2)} Gbps` : `${capacityMbps.toFixed(1)} Mbps`}`,
      `4. Physical RF Modulation Supported: ${modTier}`,
      `5. Noise Floor Headroom: Signal is ${(Math.pow(10, Math.abs(snrDb) / 20)).toFixed(1)}x stronger than background thermal noise in voltage amplitude`,
    ];

    return {
      hero: {
        label: "Shannon Channel Capacity",
        value: `${capacityMbps >= 1000 ? `${capacityGbps.toFixed(2)} Gbps` : `${capacityMbps.toFixed(1)} Mbps`}`,
        unit: `${spectralEff.toFixed(2)} bits/s/Hz`,
      },
      badge: {
        text: `${modTier.split("(")[0].trim()}`,
        tone: modTone,
      },
      rows: [
        { label: "Maximum Shannon Capacity (C)", value: `${capacityMbps >= 1000 ? `${capacityGbps.toFixed(2)} Gbps` : `${capacityMbps.toFixed(2)} Mbps`}`, strong: true },
        { label: "Spectral Efficiency (C / B)", value: `${spectralEff.toFixed(3)} bits/sec/Hz`, strong: true },
        { label: "Linear Signal-to-Noise Ratio", value: `${snrLinear >= 10000 ? snrLinear.toExponential(3) : snrLinear.toFixed(1)} : 1`, strong: true },
        { label: "Channel Bandwidth (B)", value: `${B_MHz} MHz (${(B_Hz).toLocaleString()} Hz)` },
        { label: "Modulation Recommendation", value: modTier },
        { label: "Logarithmic Metric", value: `${snrDb.toFixed(1)} dB (Decibels)` },
        { label: "Signal Amplitude Ratio", value: `${(Math.pow(10, snrDb / 20)).toFixed(2)} : 1 (Voltage/Field)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Signal Power vs. Noise Power Proportion (Linear)",
        data: [
          { name: "Useful Signal Portion", value: Math.max(0.1, snrLinear), color: "#10b981" },
          { name: "Thermal Noise Floor", value: 1.0, color: "#64748b" },
        ],
      },
      note: {
        text: "The Shannon-Hartley theorem establishes the theoretical upper ceiling for error-free data transmission over an additive white Gaussian noise (AWGN) channel. Practical systems with Forward Error Correction (FEC) achieve 70–85% of this limit.",
        tone: "neutral",
      },
    };
  },
};

export default function SignalToNoiseCalculator() {
  return <CalcEngine config={config} />;
}
