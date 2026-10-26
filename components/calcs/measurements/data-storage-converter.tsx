"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const dataStorageConverterConfig: CalcConfig = {
  id: "data-storage-converter",
  title: "Digital Data Storage & Memory Converter",
  fields: [
    { kind: "number", key: "value", label: "Data Capacity Value", default: 1000, min: 0.000001, max: 1000000000000 },
    {
      kind: "choice",
      key: "fromUnit",
      label: "From Unit",
      default: "gb",
      options: [
        { label: "Gigabytes (GB - Decimal 10⁹)", value: "gb" },
        { label: "Gibibytes (GiB - Binary 2³⁰)", value: "gib" },
        { label: "Megabytes (MB - Decimal 10⁶)", value: "mb" },
        { label: "Mebibytes (MiB - Binary 2²⁰)", value: "mib" },
        { label: "Terabytes (TB - Decimal 10¹²)", value: "tb" },
        { label: "Tebibytes (TiB - Binary 2⁴⁰)", value: "tib" },
        { label: "Kilobytes (KB - Decimal 10³)", value: "kb" },
        { label: "Kibibytes (KiB - Binary 2¹⁰)", value: "kib" },
      ],
    },
    {
      kind: "choice",
      key: "toUnit",
      label: "To Unit",
      default: "gib",
      options: [
        { label: "Gigabytes (GB - Decimal 10⁹)", value: "gb" },
        { label: "Gibibytes (GiB - Binary 2³⁰)", value: "gib" },
        { label: "Megabytes (MB - Decimal 10⁶)", value: "mb" },
        { label: "Mebibytes (MiB - Binary 2²⁰)", value: "mib" },
        { label: "Terabytes (TB - Decimal 10¹²)", value: "tb" },
        { label: "Tebibytes (TiB - Binary 2⁴⁰)", value: "tib" },
        { label: "Kilobytes (KB - Decimal 10³)", value: "kb" },
        { label: "Kibibytes (KiB - Binary 2¹⁰)", value: "kib" },
      ],
    },
  ],
  presets: [
    { label: "1,000 GB HDD to GiB (OS Drive Usable Size)", values: { value: 1000, fromUnit: "gb", toUnit: "gib" } },
    { label: "1 TB SSD to GiB (Flash Storage)", values: { value: 1, fromUnit: "tb", toUnit: "gib" } },
    { label: "16 GiB RAM to GB (Memory Allocation)", values: { value: 16, fromUnit: "gib", toUnit: "gb" } },
    { label: "4.7 GB DVD to MiB (Optical Media)", values: { value: 4.7, fromUnit: "gb", toUnit: "mib" } },
  ],
  compute: (vals) => {
    const val = Math.max(0.000001, Number(vals.value) || 1000);
    const from = String(vals.fromUnit || "gb");
    const to = String(vals.toUnit || "gib");

    const TO_BYTES: Record<string, number> = {
      kb: 1e3,
      kib: 1024,
      mb: 1e6,
      mib: 1024 ** 2,
      gb: 1e9,
      gib: 1024 ** 3,
      tb: 1e12,
      tib: 1024 ** 4,
    };

    const bytes = val * (TO_BYTES[from] || 1e9);
    const converted = bytes / (TO_BYTES[to] || (1024 ** 3));

    return {
      hero: {
        value: `${converted.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${to.toUpperCase()}`,
        label: `Converted Capacity (${val} ${from.toUpperCase()} → ${to.toUpperCase()})`,
      },
      breakdown: [
        { label: "Input Capacity", value: `${val} ${from.toUpperCase()}` },
        { label: "Exact Byte Count", value: `${bytes.toLocaleString("en-US")} Bytes` },
        { label: "Converted Target Size", value: `${converted.toFixed(3)} ${to.toUpperCase()}` },
        { label: "Decimal Gigabytes (GB)", value: `${(bytes / 1e9).toFixed(3)} GB` },
        { label: "Binary Gibibytes (GiB)", value: `${(bytes / (1024 ** 3)).toFixed(3)} GiB` },
        { label: "Decimal vs Binary Discrepancy", value: `${(((bytes / 1e9) - (bytes / (1024 ** 3))) / (bytes / 1e9) * 100).toFixed(2)}% difference` },
      ],
      steps: [
        `Convert to raw bytes: ${val} × ${TO_BYTES[from]} = ${bytes.toLocaleString()} Bytes.`,
        `Divide by target binary/decimal radix: ${bytes.toLocaleString()} ÷ ${TO_BYTES[to]} = ${converted.toFixed(3)} ${to.toUpperCase()}.`,
      ],
      chart: {
        type: "donut",
        title: "Binary vs Decimal Storage Accounting",
        format: "pct",
        data: [
          { name: "Reported OS Binary Size", value: 93, color: "#10b981" },
          { name: "Binary Radix Overhead Discrepancy", value: 7, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function DataStorageConverterComponent() {
  return <CalcEngine config={dataStorageConverterConfig} />;
}
