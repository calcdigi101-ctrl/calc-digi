"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const vpnSpeedConfig: CalcConfig = {
  id: "vpn-speed-calculator",
  title: "VPN Encryption Overhead, Protocol Throughput & Latency Penalty Calculator",
  fields: [
    { kind: "number", key: "baseIspMbps", label: "Base Internet Speed Without VPN (Mbps)", default: 300, min: 5, max: 2000 },
    {
      kind: "choice",
      key: "protocol",
      label: "VPN Tunneling Protocol",
      default: "wireguard",
      options: [
        { label: "WireGuard (ChaCha20 - High Speed, 8-12% Loss)", value: "wireguard" },
        { label: "OpenVPN UDP (AES-256-GCM, 18-25% Loss)", value: "openvpn_udp" },
        { label: "OpenVPN TCP (High Overhead/Reliable, 30-45% Loss)", value: "openvpn_tcp" },
        { label: "IKEv2 / IPsec (Mobile Optimized, 15-20% Loss)", value: "ikev2" },
      ],
    },
    { kind: "number", key: "serverDistanceMiles", label: "Distance to VPN Server (Miles)", default: 500, min: 10, max: 12000 },
    { kind: "number", key: "serverLoadPct", label: "VPN Server Congestion / Load (%)", default: 45, min: 10, max: 95 },
  ],
  presets: [
    { label: "WireGuard Nearby Server (500 mi, 40% Load)", values: { baseIspMbps: 300, protocol: "wireguard", serverDistanceMiles: 500, serverLoadPct: 40 } },
    { label: "OpenVPN UDP Overseas (3,500 mi, 70% Load)", values: { baseIspMbps: 200, protocol: "openvpn_udp", serverDistanceMiles: 3500, serverLoadPct: 70 } },
    { label: "Gigabit Fiber on WireGuard (1 Gbps)", values: { baseIspMbps: 1000, protocol: "wireguard", serverDistanceMiles: 250, serverLoadPct: 30 } },
    { label: "OpenVPN TCP Restricted Network (50 Mbps)", values: { baseIspMbps: 50, protocol: "openvpn_tcp", serverDistanceMiles: 1200, serverLoadPct: 65 } },
  ],
  compute: (vals) => {
    const base = Math.max(1, Number(vals.baseIspMbps) || 300);
    const proto = String(vals.protocol || "wireguard");
    const dist = Math.max(10, Number(vals.serverDistanceMiles) || 500);
    const load = Math.min(95, Math.max(10, Number(vals.serverLoadPct) || 45));

    let baseLossPct = 10.0;
    if (proto === "openvpn_udp") baseLossPct = 20.0;
    else if (proto === "openvpn_tcp") baseLossPct = 35.0;
    else if (proto === "ikev2") baseLossPct = 16.0;

    const distancePenaltyPct = Math.min(25, Math.max(0, (dist - 200) / 500.0) * 1.2);
    const loadPenaltyPct = load > 60 ? (load - 60) * 0.45 : 0;
    const totalLossPct = Math.min(85, baseLossPct + distancePenaltyPct + loadPenaltyPct);
    const deliveredVpnMbps = Math.max(1, base * (1 - totalLossPct / 100.0));
    const speedLossMbps = base - deliveredVpnMbps;

    return {
      hero: {
        label: "Delivered VPN Download Speed",
        value: `${deliveredVpnMbps.toFixed(1)} Mbps`,
      },
      badge: {
        text: `${(100 - totalLossPct).toFixed(0)}% Speed Retained`,
        tone: totalLossPct > 40 ? "warn" : "good",
      },
      rows: [
        { label: "Base Internet Speed (ISP)", value: `${base.toLocaleString()} Mbps` },
        { label: "Tunnel Protocol Encryption Cost", value: `-${baseLossPct.toFixed(1)}% (${proto})` },
        { label: "Distance Routing Penalty", value: `-${distancePenaltyPct.toFixed(1)}% (${dist.toLocaleString()} miles)` },
        { label: "Server Congestion Penalty", value: `-${loadPenaltyPct.toFixed(1)}% (${load}% load)` },
        { label: "Total Throughput Degradation", value: `-${totalLossPct.toFixed(1)}% (-${speedLossMbps.toFixed(1)} Mbps)` },
        { label: "Net VPN Download Speed", value: `${deliveredVpnMbps.toFixed(1)} Mbps`, strong: true },
      ],
      steps: [
        `Base Protocol Overhead (${proto}) = ${baseLossPct}%`,
        `Distance Penalty (${dist} mi) + Congestion (${load}%) = +${(distancePenaltyPct + loadPenaltyPct).toFixed(1)}%`,
        `Delivered Speed = ${base} Mbps * (1 - ${(totalLossPct / 100).toFixed(3)}) = ${deliveredVpnMbps.toFixed(1)} Mbps`,
      ],
      chart: {
        type: "donut",
        title: "VPN Throughput: Delivered Speed vs Protocol & Distance Loss",
        format: "pct",
        data: [
          { name: "Delivered VPN Speed", value: Math.round(100 - totalLossPct), color: "#10b981" },
          { name: "Crypto & Encapsulation", value: Math.round(baseLossPct), color: "#6366f1" },
          { name: "Distance & Congestion Loss", value: Math.max(1, Math.round(distancePenaltyPct + loadPenaltyPct)), color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function VpnSpeedCalculatorComponent() {
  return <CalcEngine config={vpnSpeedConfig} />;
}
