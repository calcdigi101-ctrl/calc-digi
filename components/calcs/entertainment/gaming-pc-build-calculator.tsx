"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "gaming-pc-build-calc",
  title: "Gaming PC Build Budget & Power Sizing Calculator",
  presets: [
    { label: "1440p Sweet Spot Gaming Rig ($1,450)", values: { cpuCost: 240, gpuCost: 550, ramStorage: 180, moboPsu: 280, caseCooler: 200, targetRes: "1440p" } },
    { label: "1080p Esports Budget Warrior ($850)", values: { cpuCost: 150, gpuCost: 300, ramStorage: 120, moboPsu: 170, caseCooler: 110, targetRes: "1080p" } },
    { label: "4K Ultra Ray Tracing Enthusiast ($2,600)", values: { cpuCost: 420, gpuCost: 1150, ramStorage: 320, moboPsu: 420, caseCooler: 290, targetRes: "4k" } },
    { label: "Content Creator / Hybrid Rig ($1,950)", values: { cpuCost: 380, gpuCost: 750, ramStorage: 280, moboPsu: 320, caseCooler: 220, targetRes: "1440p" } },
    { label: "Sub-$600 Entry Level Console Killer", values: { cpuCost: 110, gpuCost: 200, ramStorage: 90, moboPsu: 120, caseCooler: 80, targetRes: "1080p" } },
  ],
  fields: [
    {
      kind: "choice",
      key: "targetRes",
      label: "Target Gaming Display Resolution",
      default: "1440p",
      options: [
        { value: "1080p", label: "1080p Full HD (Competitive Esports, 144–240 Hz)" },
        { value: "1440p", label: "1440p Quad HD (Balanced Visuals & High FPS Sweet Spot)" },
        { value: "4k", label: "4K Ultra HD (Maximum Fidelity & Ray Tracing)" },
      ],
    },
    {
      kind: "number",
      key: "gpuCost",
      label: "Graphics Card (GPU) Budget ($ USD)",
      default: 550,
      min: 100,
      max: 3000,
      hint: "GPU should represent ~35%–45% of total gaming system budget",
    },
    {
      kind: "number",
      key: "cpuCost",
      label: "Processor (CPU) Budget ($ USD)",
      default: 240,
      min: 50,
      max: 1500,
      hint: "AMD Ryzen 5/7 or Intel Core i5/i7 (typically 15%–20% of budget)",
    },
    {
      kind: "number",
      key: "ramStorage",
      label: "RAM + M.2 NVMe SSD Storage ($)",
      default: 180,
      min: 50,
      max: 1000,
      hint: "32GB DDR5 / DDR4 dual-channel RAM + 1TB or 2TB Gen4 NVMe SSD",
    },
    {
      kind: "number",
      key: "moboPsu",
      label: "Motherboard + Power Supply ($)",
      default: 280,
      min: 100,
      max: 1200,
      hint: "Tier-A/B Gold-rated PSU (650W–1000W) + B650/Z790 motherboard",
    },
    {
      kind: "number",
      key: "caseCooler",
      label: "PC Case + AIO / Air CPU Cooler ($)",
      default: 200,
      min: 50,
      max: 800,
      hint: "High-airflow mesh enclosure + 240/360mm AIO liquid or dual-tower cooler",
    },
  ],
  compute: (vals) => {
    const targetRes = String(vals.targetRes || "1440p");
    const gpuCost = Number(vals.gpuCost) || 550;
    const cpuCost = Number(vals.cpuCost) || 240;
    const ramStorage = Number(vals.ramStorage) || 180;
    const moboPsu = Number(vals.moboPsu) || 280;
    const caseCooler = Number(vals.caseCooler) || 200;

    const totalCost = gpuCost + cpuCost + ramStorage + moboPsu + caseCooler;
    const gpuPct = (gpuCost / totalCost) * 100;
    const cpuPct = (cpuCost / totalCost) * 100;

    // Estimate estimated full-system peak power (Watts)
    // GPU wattage approx scales with GPU cost tier
    let estGpuWatts = 200;
    if (gpuCost >= 900) estGpuWatts = 350;
    else if (gpuCost >= 500) estGpuWatts = 240;
    else if (gpuCost >= 300) estGpuWatts = 160;
    else estGpuWatts = 115;

    let estCpuWatts = 105;
    if (cpuCost >= 350) estCpuWatts = 170;
    else if (cpuCost >= 200) estCpuWatts = 105;
    else estCpuWatts = 65;

    const systemBaselineWatts = 75; // motherboard, SSDs, fans, RAM
    const totalPeakWatts = estGpuWatts + estCpuWatts + systemBaselineWatts;
    // PSU safety margin: 1.35x headroom
    const recPsuWatts = Math.ceil((totalPeakWatts * 1.35) / 50) * 50;

    let perfTier = "1080p 120+ FPS High Settings";
    if (targetRes === "4k" || totalCost >= 2200) perfTier = "4K 60–120 FPS Ultra / Ray Tracing";
    else if (targetRes === "1440p" || totalCost >= 1200) perfTier = "1440p 100–165+ FPS Ultra Settings";

    return {
      hero: {
        value: `$${totalCost.toLocaleString()}`,
        label: `Total PC Build Estimate (${perfTier})`,
      },
      badge: {
        text: gpuPct >= 35 && gpuPct <= 45 ? "Optimal GPU Allocation (35-45%)" : gpuPct > 45 ? "GPU Heavy / High-End" : "CPU / Platform Heavy",
        tone: gpuPct >= 35 && gpuPct <= 45 ? "good" : "info",
      },
      rows: [
        { label: "Graphics Card (GPU)", value: `$${gpuCost.toLocaleString()} (${gpuPct.toFixed(1)}% of build)` },
        { label: "Processor (CPU)", value: `$${cpuCost.toLocaleString()} (${cpuPct.toFixed(1)}% of build)` },
        { label: "Memory & Storage (RAM + NVMe)", value: `$${ramStorage.toLocaleString()}` },
        { label: "Motherboard & PSU", value: `$${moboPsu.toLocaleString()}` },
        { label: "Chassis & Thermal Cooling", value: `$${caseCooler.toLocaleString()}` },
        { label: "Estimated System Peak Power", value: `~${totalPeakWatts} Watts` },
        { label: "Recommended PSU Wattage", value: `${recPsuWatts}W 80+ Gold (35% safety headroom)` },
      ],
      steps: [
        `Sum component investments: GPU ($${gpuCost}) + CPU ($${cpuCost}) + Memory/SSD ($${ramStorage}) + Mobo/PSU ($${moboPsu}) + Case/Cooler ($${caseCooler}) = $${totalCost.toLocaleString()}.`,
        `Evaluate component balance: GPU represents ${gpuPct.toFixed(1)}% and CPU represents ${cpuPct.toFixed(1)}% of system budget (industry rule of thumb is 35%–45% GPU).`,
        `Calculate power draw: GPU (~${estGpuWatts}W) + CPU (~${estCpuWatts}W) + System peripherals (75W) = ~${totalPeakWatts} Watts peak load.`,
        `Apply 1.35× headroom for transient spikes: ${totalPeakWatts}W × 1.35 = ${totalPeakWatts * 1.35}W -> recommended PSU is ${recPsuWatts}W.`,
      ],
      note: { text: "Modern high-end GPUs (RTX 4080/4090 and RX 7900 XTX) generate millisecond transient micro-spikes up to 2× continuous rating, making adequate PSU headroom essential." },
    };
  },
};

export default function GamingPcBuildCalculator() {
  return <CalcEngine config={config} />;
}
