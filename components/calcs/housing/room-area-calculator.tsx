"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "room-area",
  title: "Room Area Calculator",
  fields: [
    { kind: "number", key: "length", label: "Room length", suffix: "ft", default: 14, min: 1, max: 200 },
    { kind: "number", key: "width", label: "Room width", suffix: "ft", default: 12, min: 1, max: 200 },
    {
      kind: "choice",
      key: "height",
      label: "Ceiling height",
      default: "8",
      options: [
        { value: "8", label: "8 ft (Standard residential)" },
        { value: "9", label: "9 ft (Modern build / high ceiling)" },
        { value: "10", label: "10 ft (Spacious / luxury)" },
        { value: "12", label: "12 ft (Cathedral / loft)" },
      ],
    },
    { kind: "number", key: "doors", label: "Number of standard doors", default: 1, min: 0, max: 10, integer: true },
    { kind: "number", key: "windows", label: "Number of standard windows", default: 2, min: 0, max: 20, integer: true },
  ],
  compute: (v) => {
    const l = Number(v.length || 0);
    const w = Number(v.width || 0);
    const h = Number(v.height || 8);
    const doors = Number(v.doors || 0);
    const windows = Number(v.windows || 0);

    if (l <= 0 || w <= 0) {
      return { error: "Please enter room length and width greater than zero." };
    }

    const floorArea = l * w;
    const perimeter = 2 * (l + w);
    const grossWallArea = perimeter * h;
    const openingsDeduction = (doors * 21) + (windows * 15);
    const netWallArea = Math.max(0, grossWallArea - openingsDeduction);
    const roomVolume = floorArea * h;
    const floorSqMeters = floorArea * 0.092903;

    return {
      hero: {
        label: "Floor surface area",
        value: `${num(floorArea, 1)} sq ft`,
        unit: `(${num(floorSqMeters, 2)} m²)`,
        sub: `Room perimeter: ${num(perimeter, 1)} ft | Ceiling height: ${h} ft`,
      },
      badge: {
        text: floorArea >= 70 ? "Complies with IRC Min Room Size" : "Below Habitable Room Code (<70 sq ft)",
        tone: floorArea >= 70 ? "good" : "warn",
      },
      chart: {
        type: "donut",
        format: "plain",
        data: [
          { name: "Net Wall Area (Paint/Drywall)", value: Number(netWallArea.toFixed(1)), color: "#2563eb" },
          { name: "Floor Surface (Tile/Hardwood)", value: Number(floorArea.toFixed(1)), color: "#10b981" },
          { name: "Ceiling Surface", value: Number(floorArea.toFixed(1)), color: "#06b6d4" },
          { name: "Doors & Windows Openings", value: Number(openingsDeduction.toFixed(1)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Floor Surface Area", value: `${num(floorArea, 1)} sq ft`, strong: true },
        { label: "Net Paintable Wall Area", value: `${num(netWallArea, 1)} sq ft (after deductions)`, strong: true },
        { label: "Gross Wall Area", value: `${num(grossWallArea, 1)} sq ft (${perimeter} ft × ${h} ft)` },
        { label: "Baseboard / Molding Perimeter", value: `${num(perimeter, 1)} linear ft` },
        { label: "Doors & Windows Deduction", value: `-${openingsDeduction} sq ft (${doors} doors, ${windows} windows)` },
        { label: "Interior Room Volume", value: `${num(roomVolume, 1)} cu ft (HVAC capacity)` },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Trim &amp; Baseboard Tip:</strong> Remember to deduct 3 feet of baseboard per standard doorway opening from your {num(perimeter, 1)} ft perimeter calculation.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function RoomAreaCalculator() {
  return <CalcEngine config={config} />;
}
