"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "cycling",
  title: "Cycling Power & Speed Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement system",
      default: "us",
      segmented: true,
      options: [
        { value: "us", label: "US (mph / lbs)" },
        { value: "metric", label: "Metric (km/h / kg)" },
      ],
    },
    { kind: "number", key: "speedMph", label: "Cycling speed", suffix: "mph", default: 18, min: 3, max: 55, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "speedKmh", label: "Cycling speed", suffix: "km/h", default: 29, min: 5, max: 90, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "riderWeightLbs", label: "Rider weight", suffix: "lbs", default: 165, min: 70, max: 400, showIf: (v) => v.unit !== "metric" },
    { kind: "number", key: "riderWeightKg", label: "Rider weight", suffix: "kg", default: 75, min: 30, max: 200, showIf: (v) => v.unit === "metric" },
    { kind: "number", key: "gradient", label: "Road gradient / slope", suffix: "%", default: 0, min: -15, max: 25 },
    {
      kind: "choice",
      key: "position",
      label: "Riding position (Aerodynamic CdA)",
      default: "hoods",
      options: [
        { value: "tops", label: "Upright / On the Tops (CdA 0.40 m²)" },
        { value: "hoods", label: "Brake Hoods / Standard (CdA 0.32 m²)" },
        { value: "drops", label: "In the Drops / Aggressive (CdA 0.28 m²)" },
        { value: "aero", label: "Triathlon / TT Aerobars (CdA 0.23 m²)" },
      ],
    },
    {
      kind: "choice",
      key: "surface",
      label: "Tire & road surface",
      default: "asphalt",
      options: [
        { value: "smooth", label: "Track / Super Smooth Asphalt (Crr 0.003)" },
        { value: "asphalt", label: "Standard Sealed Asphalt (Crr 0.004)" },
        { value: "rough", label: "Rough / Chipseal Pavement (Crr 0.006)" },
        { value: "gravel", label: "Packed Gravel / Hardpack Dirt (Crr 0.008)" },
      ],
    },
  ],
  compute: (v) => {
    const isMetric = v.unit === "metric";
    const speedKmh = isMetric ? Number(v.speedKmh || 29) : Number(v.speedMph || 18) * 1.609344;
    const speedMps = speedKmh / 3.6; // meters per second
    const speedMph = (speedKmh / 1.609344).toFixed(1);

    const riderKg = isMetric ? Number(v.riderWeightKg || 75) : Number(v.riderWeightLbs || 165) / 2.20462;
    const bikeKg = 9.0; // average 9kg road bike setup
    const totalMass = riderKg + bikeKg;

    const gradPct = Number(v.gradient || 0);
    const slopeAngle = Math.atan(gradPct / 100);

    // Aerodynamic Drag:
    const cdaMap: Record<string, number> = { tops: 0.40, hoods: 0.32, drops: 0.28, aero: 0.23 };
    const cda = cdaMap[v.position as string] || 0.32;
    const airDensity = 1.225; // kg/m^3 at sea level, 15°C
    const pAero = 0.5 * airDensity * cda * Math.pow(speedMps, 3);

    // Rolling Resistance:
    const crrMap: Record<string, number> = { smooth: 0.003, asphalt: 0.004, rough: 0.006, gravel: 0.008 };
    const crr = crrMap[v.surface as string] || 0.004;
    const g = 9.80665;
    const pRoll = crr * totalMass * g * Math.cos(slopeAngle) * speedMps;

    // Gravity / Climbing:
    const pGrav = totalMass * g * Math.sin(slopeAngle) * speedMps;

    // Mechanical Drivetrain Loss (~3%):
    const driveTrainLoss = 0.97;
    const netPower = Math.max(0, pAero + pRoll + pGrav);
    const totalWatts = Math.round(netPower / driveTrainLoss);

    // Power to Weight Ratio (W/kg):
    const wPerKg = riderKg > 0 ? (totalWatts / riderKg).toFixed(2) : "0.00";

    // Caloric Expenditure (assuming human gross metabolic efficiency of ~24%):
    // 1 Joule = 1 Watt * second; 1 kcal = 4,184 Joules. Efficiency = 0.24 -> kcal/hr ≈ Watts * 3.6
    const kcalPerHour = Math.round(totalWatts * 3.6);

    // FTP Tier Category:
    const wkgNum = Number(wPerKg);
    let ftpTier = "Moderate Fitness";
    if (wkgNum >= 5.0) ftpTier = "Pro Tour / World Class";
    else if (wkgNum >= 4.2) ftpTier = "Cat 1 Elite Racer";
    else if (wkgNum >= 3.5) ftpTier = "Cat 3 Competitive Amateur";
    else if (wkgNum >= 2.8) ftpTier = "Trained Club Cyclist";
    else if (wkgNum >= 2.0) ftpTier = "Moderate Fitness";
    else ftpTier = "Untrained / Casual";

    return {
      hero: {
        label: "Required Cycling Power",
        value: `${totalWatts}`,
        unit: "Watts",
        sub: `Power-to-weight ratio: ${wPerKg} W/kg at ${speedMph} mph (${speedKmh.toFixed(1)} km/h)`,
      },
      badge: { text: `Tier: ${ftpTier}`, tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "Aerodynamic Drag", value: Math.max(0, Math.round(pAero)), color: "#3b82f6" },
          { name: "Gravity & Slope Resistance", value: Math.max(0, Math.round(pGrav)), color: "#ef4444" },
          { name: "Rolling Resistance", value: Math.max(0, Math.round(pRoll)), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Mechanical Power Required", value: `${totalWatts} Watts`, strong: true },
        { label: "Power to Weight Ratio", value: `${wPerKg} W/kg`, strong: true },
        { label: "Caloric Expenditure Rate", value: `~${kcalPerHour} kcal / hour`, strong: true },
        { label: "Aerodynamic Drag Resistance", value: `${Math.max(0, Math.round(pAero))} Watts (${totalWatts > 0 ? Math.round((pAero / totalWatts) * 100) : 0}%)` },
        { label: "Climbing / Slope Resistance", value: `${Math.round(pGrav)} Watts` },
        { label: "Tire Rolling Resistance", value: `${Math.round(pRoll)} Watts` },
        { label: "Hunter Allen / Coggan Tier", value: ftpTier },
      ],
      note: {
        text: (
          <span>
            🚴 <strong>Aero Dominance Rule:</strong> Above 15 mph (24 km/h) on flat roads, aerodynamic drag accounts for over <strong>75% to 85%</strong> of all cycling resistance. Shifting from upright brake hoods into the drops or aerobars saves 30 to 60 Watts at the same speed.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function CyclingCalculator() {
  return <CalcEngine config={config} />;
}
