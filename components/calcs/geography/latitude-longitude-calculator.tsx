"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "latitude-longitude-calc",
  title: "Latitude and Longitude Coordinate Converter & Analysis Tool",
  presets: [
    { label: "New York City (Times Square)", values: { lat: 40.758, lon: -73.9855 } },
    { label: "London (Royal Observatory Greenwich)", values: { lat: 51.4769, lon: 0.0005 } },
    { label: "Tokyo (Shibuya Crossing)", values: { lat: 35.6595, lon: 139.7005 } },
    { label: "Sydney (Opera House)", values: { lat: -33.8568, lon: 151.2153 } },
    { label: "Null Island (Equator & Prime Meridian 0,0)", values: { lat: 0.0, lon: 0.0 } },
    { label: "Cairo (Great Pyramid of Giza)", values: { lat: 29.9792, lon: 31.1342 } },
  ],
  fields: [
    {
      kind: "number",
      key: "lat",
      label: "Latitude (Decimal Degrees °)",
      default: 40.758,
      min: -90,
      max: 90,
      hint: "Positive (+) for North, Negative (-) for South [-90° to +90°]",
    },
    {
      kind: "number",
      key: "lon",
      label: "Longitude (Decimal Degrees °)",
      default: -73.9855,
      min: -180,
      max: 180,
      hint: "Positive (+) for East, Negative (-) for West [-180° to +180°]",
    },
  ],
  compute(values) {
    const lat = Number(values.lat);
    const lon = Number(values.lon);

    if (isNaN(lat) || isNaN(lon)) {
      return { error: "Please enter valid numeric latitude and longitude coordinates." };
    }
    if (lat < -90 || lat > 90) {
      return { error: "Latitude must be between -90.0° and +90.0°." };
    }
    if (lon < -180 || lon > 180) {
      return { error: "Longitude must be between -180.0° and +180.0°." };
    }

    const toDms = (val: number, isLat: boolean) => {
      const dir = val >= 0 ? (isLat ? "N" : "E") : isLat ? "S" : "W";
      const absVal = Math.abs(val);
      const deg = Math.floor(absVal);
      const minRem = (absVal - deg) * 60;
      const min = Math.floor(minRem);
      const sec = (minRem - min) * 60;
      return `${deg}° ${min}' ${sec.toFixed(2)}" ${dir}`;
    };

    const latDms = toDms(lat, true);
    const lonDms = toDms(lon, false);

    // Meridian convergence width of 1° longitude at this latitude
    const latRad = (lat * Math.PI) / 180;
    const kmPerLonDeg = 111.32 * Math.cos(latRad);
    const milesPerLonDeg = kmPerLonDeg * 0.621371;

    // Antipodal coordinate point
    const antiLat = -lat;
    const antiLon = lon > 0 ? lon - 180 : lon + 180;

    // Approximate distance from Equator along meridian
    const distToEquatorKm = Math.abs(lat) * 111.132;

    // Universal Transverse Mercator (UTM) Zone estimation
    const utmZone = Math.floor((lon + 180) / 6) + 1;
    const utmHemisphere = lat >= 0 ? "N" : "S";

    const steps = [
      `1. Sexagesimal Degrees-Minutes-Seconds Conversion: Latitude = ${latDms} | Longitude = ${lonDms}`,
      `2. Meridian Convergence: 1° of longitude spans 111.32 km × cos(${lat.toFixed(2)}°) = ${kmPerLonDeg.toFixed(2)} km (${milesPerLonDeg.toFixed(2)} miles)`,
      `3. Geodesic Distance to Equator: |${lat.toFixed(4)}°| × 111.132 km/° = ${Math.round(distToEquatorKm).toLocaleString()} km`,
      `4. Antipodal Point: Inverting latitude and longitude gives ${antiLat.toFixed(4)}°, ${antiLon.toFixed(4)}°`,
      `5. Projected UTM Zone: Zone ${utmZone}${utmHemisphere} (Central Meridian: ${(utmZone - 1) * 6 - 180 + 3}° lon)`,
    ];

    return {
      hero: {
        label: "Sexagesimal DMS Coordinates",
        value: `${latDms}`,
        unit: `${lonDms}`,
      },
      badge: {
        text: `UTM Zone ${utmZone}${utmHemisphere}`,
        tone: "info",
      },
      rows: [
        { label: "Decimal Degrees (DD)", value: `${lat.toFixed(6)}°, ${lon.toFixed(6)}°`, strong: true },
        { label: "Degrees-Minutes-Seconds (DMS)", value: `${latDms}, ${lonDms}`, strong: true },
        { label: "1° Longitude Ground Width", value: `${kmPerLonDeg.toFixed(2)} km (${milesPerLonDeg.toFixed(2)} miles)` },
        { label: "Distance to Equator (Meridional)", value: `${Math.round(distToEquatorKm).toLocaleString()} km` },
        { label: "Antipodal Opposite Coordinates", value: `${antiLat.toFixed(4)}°, ${antiLon.toFixed(4)}°` },
        { label: "Universal Transverse Mercator", value: `Zone ${utmZone}${utmHemisphere}` },
        { label: "Hemisphere Quadrant", value: `${lat >= 0 ? "Northern" : "Southern"} / ${lon >= 0 ? "Eastern" : "Western"}` },
      ],
      steps,
      chart: {
        type: "donut",
        title: "Hemispheric Polar Coordinate Position (°)",
        data: [
          { name: "Latitude Distance from Equator", value: Math.max(0.1, Math.abs(lat)), color: "#3b82f6" },
          { name: "Remaining to Nearest Pole", value: Math.max(0.1, 90 - Math.abs(lat)), color: "#94a3b8" },
        ],
      },
      note: {
        text: "Based on the WGS84 ellipsoidal standard. One degree of latitude is nearly constant (111.13 km), whereas one degree of longitude narrows by the cosine of latitude toward the poles.",
        tone: "neutral",
      },
    };
  },
};

export default function LatitudeLongitudeCalculator() {
  return <CalcEngine config={config} />;
}
