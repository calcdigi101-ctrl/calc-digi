"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const ipSubnetConfig: CalcConfig = {
  id: "ip-subnet-calculator",
  title: "IPv4 CIDR Subnet, Netmask & Host Capacity Calculator",
  fields: [
    {
      kind: "choice",
      key: "cidr",
      label: "CIDR Prefix Length (/Mask)",
      default: "/24",
      options: [
        { label: "/24 (255.255.255.0 - 254 Hosts)", value: "/24" },
        { label: "/25 (255.255.255.128 - 126 Hosts)", value: "/25" },
        { label: "/26 (255.255.255.192 - 62 Hosts)", value: "/26" },
        { label: "/27 (255.255.255.224 - 30 Hosts)", value: "/27" },
        { label: "/28 (255.255.255.240 - 14 Hosts)", value: "/28" },
        { label: "/29 (255.255.255.248 - 6 Hosts)", value: "/29" },
        { label: "/30 (255.255.255.252 - 2 Hosts / P2P)", value: "/30" },
        { label: "/23 (255.255.254.0 - 510 Hosts)", value: "/23" },
        { label: "/22 (255.255.252.0 - 1,022 Hosts)", value: "/22" },
        { label: "/20 (255.255.240.0 - 4,094 Hosts)", value: "/20" },
        { label: "/16 (255.255.0.0 - 65,534 Hosts)", value: "/16" },
      ],
    },
    { kind: "number", key: "octet1", label: "IP 1st Octet", default: 192, min: 1, max: 255 },
    { kind: "number", key: "octet2", label: "IP 2nd Octet", default: 168, min: 0, max: 255 },
    { kind: "number", key: "octet3", label: "IP 3rd Octet", default: 1, min: 0, max: 255 },
  ],
  presets: [
    { label: "Class C Private Subnet (/24 - 254 Hosts)", values: { cidr: "/24", octet1: 192, octet2: 168, octet3: 1 } },
    { label: "Small Office Department (/26 - 62 Hosts)", values: { cidr: "/26", octet1: 192, octet2: 168, octet3: 10 } },
    { label: "Point-to-Point Router Link (/30 - 2 Hosts)", values: { cidr: "/30", octet1: 10, octet2: 0, octet3: 1 } },
    { label: "Campus Enterprise Segment (/22 - 1,022 Hosts)", values: { cidr: "/22", octet1: 172, octet2: 16, octet3: 0 } },
  ],
  compute: (vals) => {
    const cidrStr = String(vals.cidr || "/24").replace("/", "");
    const prefix = Math.min(30, Math.max(16, parseInt(cidrStr, 10) || 24));
    const o1 = Math.min(255, Math.max(1, Number(vals.octet1) || 192));
    const o2 = Math.min(255, Math.max(0, Number(vals.octet2) || 168));
    const o3 = Math.min(255, Math.max(0, Number(vals.octet3) || 1));

    const totalIps = Math.pow(2, 32 - prefix);
    const usableHosts = prefix <= 30 ? Math.max(0, totalIps - 2) : 0;
    const hostBits = 32 - prefix;

    let maskInt = 0;
    for (let i = 0; i < prefix; i++) {
      maskInt |= (1 << (31 - i));
    }
    const m1 = (maskInt >>> 24) & 255;
    const m2 = (maskInt >>> 16) & 255;
    const m3 = (maskInt >>> 8) & 255;
    const m4 = maskInt & 255;
    const subnetMaskStr = `${m1}.${m2}.${m3}.${m4}`;
    const wildcardStr = `${255 - m1}.${255 - m2}.${255 - m3}.${255 - m4}`;

    const networkStr = `${o1}.${o2}.${o3}.0`;
    const broadcastStr = `${o1}.${o2}.${o3}.${totalIps - 1 > 255 ? 255 : totalIps - 1}`;
    const firstHostStr = `${o1}.${o2}.${o3}.1`;
    const lastHostStr = `${o1}.${o2}.${o3}.${totalIps - 2 > 254 ? 254 : totalIps - 2}`;

    return {
      hero: {
        label: `Usable Host Capacity (/${prefix} Mask)`,
        value: `${usableHosts.toLocaleString()} Hosts`,
      },
      badge: {
        text: `Mask: ${subnetMaskStr}`,
        tone: "good",
      },
      rows: [
        { label: "CIDR Prefix Notation", value: `/${prefix}` },
        { label: "Subnet Mask (Dotted Decimal)", value: subnetMaskStr },
        { label: "Wildcard Mask", value: wildcardStr },
        { label: "Total IPv4 Addresses in Block", value: totalIps.toLocaleString() },
        { label: "Usable Host IP Range", value: `${firstHostStr} – ${lastHostStr}`, strong: true },
        { label: "Network Address (Reserved)", value: networkStr },
        { label: "Broadcast Address (Reserved)", value: broadcastStr },
      ],
      steps: [
        `Host Bits Calculation: 32 - ${prefix} (Prefix) = ${hostBits} Host Bits`,
        `Total Address Space = 2^${hostBits} = ${totalIps.toLocaleString()} IP addresses`,
        `Usable Hosts = 2^${hostBits} - 2 (Network + Broadcast) = ${usableHosts.toLocaleString()} hosts`,
      ],
      chart: {
        type: "donut",
        title: "Subnet IP Allocation: Usable Hosts vs Reserved Overhead",
        format: "num",
        data: [
          { name: "Usable Host IPs", value: usableHosts, color: "#10b981" },
          { name: "Network ID (Reserved)", value: 1, color: "#6366f1" },
          { name: "Broadcast ID (Reserved)", value: 1, color: "#ef4444" },
        ],
      },
    };
  },
};

export default function IpSubnetCalculatorComponent() {
  return <CalcEngine config={ipSubnetConfig} />;
}
