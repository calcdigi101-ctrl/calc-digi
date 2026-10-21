"use client";

import { useState, useRef, useCallback } from "react";

interface BmrAgePoint {
  age: number;
  x: number;
  maleY: number;
  maleBmr: number;
  femaleY: number;
  femaleBmr: number;
  declinePct: number;
}

const AGE_DATA: BmrAgePoint[] = [
  { age: 20, x: 70, maleY: 45, maleBmr: 1820, femaleY: 95, femaleBmr: 1510, declinePct: 0 },
  { age: 30, x: 155, maleY: 62, maleBmr: 1770, femaleY: 108, femaleBmr: 1460, declinePct: 3 },
  { age: 40, x: 250, maleY: 82, maleBmr: 1715, femaleY: 122, femaleBmr: 1410, declinePct: 6 },
  { age: 50, x: 350, maleY: 106, maleBmr: 1650, femaleY: 138, femaleBmr: 1350, declinePct: 10 },
  { age: 60, x: 450, maleY: 130, maleBmr: 1580, femaleY: 156, femaleBmr: 1290, declinePct: 14 },
  { age: 70, x: 540, maleY: 156, maleBmr: 1500, femaleY: 174, femaleBmr: 1220, declinePct: 18 },
  { age: 80, x: 630, maleY: 180, maleBmr: 1410, femaleY: 192, femaleBmr: 1150, declinePct: 23 },
];

export function BmrAgeDeclineChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<BmrAgePoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(70, Math.min(630, relativeX));

    let closest = AGE_DATA[0];
    let minDiff = Infinity;
    for (const pt of AGE_DATA) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || AGE_DATA[1]; // Default to Age 30
  const isHovering = active !== null;

  const tooltipX = display.x > 360 ? display.x - 175 : display.x + 15;
  const tooltipY = Math.max(15, display.maleY - 65);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Metabolic Rate vs Aging (BMR Trajectory Across Decades 20–80)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting Age ${display.age} — Men: ${display.maleBmr} kcal/day | Women: ${display.femaleBmr} kcal/day (-${display.declinePct}% from Age 20)`
              : "Clinical benchmark showing how resting metabolic rate shifts with age and lean mass decline. Move mouse/touch to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            Age {display.age}: Men {display.maleBmr} kcal · Women {display.femaleBmr} kcal (-{display.declinePct}%)
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
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">1,900 kcal</text>
          <text x="45" y="69" fontSize="11" fill="#64748b" textAnchor="end">1,700 kcal</text>
          <text x="45" y="114" fontSize="11" fill="#64748b" textAnchor="end">1,500 kcal</text>
          <text x="45" y="159" fontSize="11" fill="#64748b" textAnchor="end">1,300 kcal</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">1,100 kcal</text>

          {/* X-axis labels */}
          {AGE_DATA.map((d) => (
            <text key={d.age} x={d.x} y="218" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
              Age {d.age}
            </text>
          ))}

          {/* Men BMR Curve (Emerald Solid) */}
          <path
            d="M70 45 L155 62 L250 82 L350 106 L450 130 L540 156 L630 180"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Women BMR Curve (Blue Solid) */}
          <path
            d="M70 95 L155 108 L250 122 L350 138 L450 156 L540 174 L630 192"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Interactive Guide Line */}
          <line
            x1={display.x}
            y1="15"
            x2={display.x}
            y2="200"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity={isHovering ? 0.9 : 0.4}
          />

          <circle cx={display.x} cy={display.maleY} r="5.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          <circle cx={display.x} cy={display.femaleY} r="5.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect width="175" height="66" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Age {display.age} Metabolic Benchmark
            </text>
            <text x="10" y="34" fill="#cbd5e1" fontSize="10">
              Men (Avg): <tspan fill="#34d399" fontWeight="bold">{display.maleBmr.toLocaleString()} kcal/day</tspan>
            </text>
            <text x="10" y="48" fill="#cbd5e1" fontSize="10">
              Women (Avg): <tspan fill="#60a5fa" fontWeight="bold">{display.femaleBmr.toLocaleString()} kcal/day</tspan>
            </text>
            <text x="10" y="60" fill="#f59e0b" fontSize="9" fontWeight="bold">
              Sarcopenia Factor: -{display.declinePct}% vs Peak (Age 20)
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Male Average Resting BMR (Standard 175 lbs / 5'10")
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-500" /> Female Average Resting BMR (Standard 140 lbs / 5'5")
        </span>
      </div>
    </div>
  );
}
