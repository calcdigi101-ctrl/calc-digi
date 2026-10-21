"use client";

import { useState, useRef, useCallback } from "react";

interface HrZone {
  id: string;
  name: string;
  shortName: string;
  pctRange: string;
  x: number;
  barH: number;
  bpmRange: string;
  fuelSource: string;
  physiologicalEffect: string;
  color: string;
}

const HR_ZONES: HrZone[] = [
  { id: "z1", name: "Zone 1: Active Recovery", shortName: "Z1 Recovery", pctRange: "50% – 60%", x: 90, barH: 80, bpmRange: "105 – 122 bpm", fuelSource: "85% Fatty Acids", physiologicalEffect: "Promotes parasympathetic recovery & cellular waste clearance", color: "#94a3b8" },
  { id: "z2", name: "Zone 2: Aerobic Base (Fat Burn)", shortName: "Z2 Aerobic", pctRange: "60% – 70%", x: 210, barH: 110, bpmRange: "123 – 140 bpm", fuelSource: "70% Fat / 30% Glucose", physiologicalEffect: "Maximizes mitochondrial biogenesis & fat oxidation capacity", color: "#10b981" },
  { id: "z3", name: "Zone 3: Aerobic Tempo", shortName: "Z3 Tempo", pctRange: "70% – 80%", x: 330, barH: 135, bpmRange: "141 – 158 bpm", fuelSource: "50% Fat / 50% Glucose", physiologicalEffect: "Increases cardiac output and capillarization in muscle fibers", color: "#3b82f6" },
  { id: "z4", name: "Zone 4: Lactate Threshold", shortName: "Z4 Threshold", pctRange: "80% – 90%", x: 450, barH: 160, bpmRange: "159 – 175 bpm", fuelSource: "80% Glycogen", physiologicalEffect: "Trains lactate buffering and expands anaerobic muscular stamina", color: "#f59e0b" },
  { id: "z5", name: "Zone 5: Anaerobic VO2 Max", shortName: "Z5 VO2 Max", pctRange: "90% – 100%", x: 570, barH: 185, bpmRange: "176 – 192 bpm", fuelSource: "100% Glycogen/ATP", physiologicalEffect: "Neuromuscular speed, sprint power, and VO2 max expansion", color: "#ef4444" },
];

export function HeartRateZoneSpectrumChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<HrZone | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(90, Math.min(570, relativeX));

    let closest = HR_ZONES[0];
    let minDiff = Infinity;
    for (const pt of HR_ZONES) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || HR_ZONES[1]; // Default to Zone 2
  const isHovering = active !== null;

  const tooltipX = display.x > 360 ? display.x - 185 : display.x + 15;
  const tooltipY = Math.max(15, 200 - display.barH - 45);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            5-Zone Cardiorespiratory Spectrum &amp; Physiological Adaptations
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting ${display.name} — ${display.pctRange} HRmax | ${display.bpmRange} | Fuel: ${display.fuelSource}`
              : "ACSM cardiorespiratory training continuum from active recovery to maximal VO2 power. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.shortName}: {display.bpmRange} ({display.pctRange})
          </span>
        </div>
      </div>

      <div className="relative w-full select-none">
        <svg
          ref={svgRef}
          className="w-full h-auto cursor-crosshair touch-none overflow-visible"
          viewBox="0 0 720 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={(e) => handlePointer(e.clientX)}
          onTouchStart={(e) => { if (e.touches.length > 0) handlePointer(e.touches[0].clientX); }}
          onTouchMove={(e) => { if (e.touches.length > 0) handlePointer(e.touches[0].clientX); }}
          onMouseLeave={() => setActive(null)}
        >
          {/* Gridlines */}
          <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="65" x2="680" y2="65" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="110" x2="680" y2="110" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="155" x2="680" y2="155" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">100% HR</text>
          <text x="45" y="69" fontSize="11" fill="#64748b" textAnchor="end">85% HR</text>
          <text x="45" y="114" fontSize="11" fill="#64748b" textAnchor="end">70% HR</text>
          <text x="45" y="159" fontSize="11" fill="#64748b" textAnchor="end">55% HR</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">40% HR</text>

          {/* Zone Bars */}
          {HR_ZONES.map((zone) => {
            const isSel = display.id === zone.id;
            const barW = 54;
            const y = 200 - zone.barH;
            return (
              <g key={zone.id} className="cursor-pointer">
                <rect
                  x={zone.x - (barW / 2)}
                  y={y}
                  width={barW}
                  height={zone.barH}
                  rx="6"
                  fill={zone.color}
                  opacity={isSel ? 0.95 : 0.75}
                  filter={isSel ? "drop-shadow(0 4px 6px rgb(0 0 0 / 0.15))" : "none"}
                />

                {/* Value on top of bar */}
                <text
                  x={zone.x}
                  y={y - 8}
                  fontSize="11"
                  fontWeight="bold"
                  fill="#0f172a"
                  className="dark:fill-slate-100"
                  textAnchor="middle"
                >
                  {zone.pctRange.split("–")[1].trim()}
                </text>

                {/* X-axis label */}
                <text
                  x={zone.x}
                  y="218"
                  fontSize="11"
                  fontWeight={isSel ? "bold" : "600"}
                  fill={isSel ? "#10b981" : "#64748b"}
                  textAnchor="middle"
                >
                  {zone.shortName}
                </text>
              </g>
            );
          })}

          {/* Dynamic Tooltip */}
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect width="185" height="74" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="16" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {display.name}
            </text>
            <text x="10" y="32" fill="#34d399" fontSize="10.5" fontWeight="bold">
              Target Range: {display.bpmRange}
            </text>
            <text x="10" y="46" fill="#fcd34d" fontSize="9.5">
              Primary Fuel: {display.fuelSource}
            </text>
            <text x="10" y="60" fill="#cbd5e1" fontSize="9" fontWeight="500">
              {display.physiologicalEffect.length > 36 ? display.physiologicalEffect.substring(0, 36) + "..." : display.physiologicalEffect}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Zone 2 Aerobic Base (Peak Mitochondrial Biogenesis &amp; Fat Oxidation)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-500" /> Zone 4 Lactate Threshold (Anaerobic Lactic Endurance)
        </span>
      </div>
    </div>
  );
}
