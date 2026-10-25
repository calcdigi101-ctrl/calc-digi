"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "distance-between-cities-calc",
  title: "Distance Between Cities (Great-Circle Distance) Calculator",
  presets: [
    {
      label: "New York to London (Transatlantic)",
      values: { lat1: 40.7128, lon1: -74.006, lat2: 51.5074, lon2: -0.1278 },
    },
    {
      label: "London to Tokyo (Polar Great-Circle)",
      values: { lat1: 51.5074, lon1: -0.1278, lat2: 35.6762, lon2: 139.6503 },
    },
    {
      label: "Los Angeles to Sydney (Transpacific)",
      values: { lat1: 34.0522, lon1: -118.2437, lat2: -33.8688, lon2: 151.2093 },
    },
    {
      label: "Paris to Dubai (Euro-Middle East)",
      values: { lat1: 48.8566, lon1: 2.3522, lat2: 25.2048, lon2: 55.2708 },
    },
    {
      label: "Singapore to New York (Ultra Long-Haul)",
      values: { lat1: 1.3521, lon1: 103.8198, lat2: 40.7128, lon2: -74.006 },
    },
  ],
  fields: [
    {
      kind: "number",
      key: "lat1",
      label: "City 1 / Origin Latitude (°)",
      default: 40.7128,
      min: -90,
      max: 90,
      hint: "Degrees North (+) or South (-), e.g. 40.7128 for New York",
    },
    {
      kind: "number",
      key: "lon1",
      label: "City 1 / Origin Longitude (°)",
      default: -74.006,
      min: -180,
      max: 180,
      hint: "Degrees East (+) or West (-), e.g. -74.0060 for New York",
    },
    {
      kind: "number",
      key: "lat2",
      label: "City 2 / Destination Latitude (°)",
      default: 51.5074,
      min: -90,
      max: 90,
      hint: "Degrees North (+) or South (-), e.g. 51.5074 for London",
    },
    {
      kind: "number",
      key: "lon2",
      label: "City 2 / Destination Longitude (°)",
      default: -0.1278,
      min: -180,
      max: 180,
      hint: "Degrees East (+) or West (-), e.g. -0.1278 for London",
    },
  ],
  compute(values) {
    const lat1 = Number(values.lat1);
    const lon1 = Number(values.lon1);
    const lat2 = Number(values.lat2);
    const lon2 = Number(values.lon2);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
      return { error: "Please provide valid coordinate numbers for both geographical points." };
    }
    if (lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90) {
      return { error: "Latitude must range between -90° (South Pole) and +90° (North Pole)." };
    }
    if (lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
      return { error: "Longitude must range between -180° and +180°." };
    }

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    const R = 6371.0088; // IUGG Mean volumetric Earth radius in kilometers
    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);
    const deltaPhi = toRad(lat2 - lat1);
    const deltaLambda = toRad(lon2 - lon1);

    // Haversine formula
    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));

    const distKm = R * c;
    const distMiles = distKm * 0.621371;
    const distNauticalMiles = distKm * 0.539957;

    // Initial forward bearing (azimuth)
    const y = Math.sin(deltaLambda) * Math.cos(phi2);
    const x =
      Math.cos(phi1) * Math.sin(phi2) -
      Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);
    let initialBearing = (toDeg(Math.atan2(y, x)) + 360) % 360;

    // Commercial jet flight time approximation (cruise 900 km/h + 30 min takeoff/landing)
    const flightHours = distKm > 0 ? distKm / 900 + 0.5 : 0;
    const flHoursInt = Math.floor(flightHours);
    const flMins = Math.round((flightHours - flHoursInt) * 60);

    // Compass cardinal point
    const cardinals = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const compassIdx = Math.round(initialBearing / 22.5) % 16;
    const cardinalDir = cardinals[compassIdx];

    // Earth circumference percentage (Antipodal benchmark is 20,015 km)
    const antipodalPct = (distKm / 20015.08) * 100;

    const steps = [
      `1. Angular Separation (Haversine): a = sin²(Δφ/2) + cos(φ₁)cos(φ₂)sin²(Δλ/2) = ${a.toFixed(6)}`,
      `2. Great-Circle Arc: c = 2 · atan2(√a, √(1-a)) = ${c.toFixed(6)} radians (${toDeg(c).toFixed(3)}°)`,
      `3. Surface Distance: d = R · c = 6,371 km × ${c.toFixed(6)} = ${Math.round(distKm).toLocaleString()} km (${Math.round(distMiles).toLocaleString()} miles)`,
      `4. Initial Azimuth Bearing: θ = atan2(sin(Δλ)cos(φ₂), ...) = ${initialBearing.toFixed(1)}° (${cardinalDir})`,
      `5. Nonstop Flight Estimate: ${distKm > 0 ? `${flHoursInt} hours ${flMins} minutes at 900 km/h cruise` : "0h 0m"}`,
    ];

    return {
      hero: {
        label: "Great-Circle Orthodromic Distance",
        value: `${Math.round(distKm).toLocaleString()} km`,
        unit: `${Math.round(distMiles).toLocaleString()} miles`,
      },
      badge: {
        text: `Bearing ${initialBearing.toFixed(1)}° (${cardinalDir})`,
        tone: "info",
      },
      rows: [
        { label: "Great-Circle Distance (Metric)", value: `${Math.round(distKm).toLocaleString()} km`, strong: true },
        { label: "Statute Miles (Imperial)", value: `${Math.round(distMiles).toLocaleString()} miles`, strong: true },
        { label: "Nautical Miles (Marine/Aviation)", value: `${Math.round(distNauticalMiles).toLocaleString()} NM` },
        { label: "Initial True Forward Bearing", value: `${initialBearing.toFixed(1)}° (${cardinalDir})` },
        { label: "Estimated Nonstop Flight Duration", value: `${flHoursInt}h ${flMins}m (at 900 km/h)` },
        { label: "Antipodal Proximity Scale", value: `${antipodalPct.toFixed(1)}% of maximum Earth distance` },
        { label: "Central Angular Distance", value: `${toDeg(c).toFixed(3)}° (${c.toFixed(4)} rad)` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Global Great-Circle Route Scale (km)",
        data: [
          { name: "City Route Distance", value: Math.max(1, Math.round(distKm)), color: "#3b82f6" },
          { name: "Remaining to Antipodal Max (20,015 km)", value: Math.max(1, Math.round(20015 - distKm)), color: "#94a3b8" },
        ],
      },
      note: {
        text: "Calculated using the Haversine great-circle formula assuming an internationally standardized IUGG Earth mean radius of 6,371.0088 km. For sub-meter geodetic boundary surveys, Vincenty's ellipsoidal inverse solution is recommended.",
        tone: "neutral",
      },
    };
  },
};

export default function DistanceBetweenCitiesCalculator() {
  return <CalcEngine config={config} />;
}
