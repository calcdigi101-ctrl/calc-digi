'use client';

import React, { useState } from 'react';

interface SisterVolGroup {
  band: number; // Band size in inches
  euBand: number; // EU band in cm
  cupA_cc: number;
  cupB_cc: number;
  cupC_cc: number;
  cupD_cc: number;
  cupDD_cc: number;
  cupE_cc: number;
  cupF_cc: number;
  biomechanicNote: string;
}

const BAND_VOLUME_DATA: SisterVolGroup[] = [
  { band: 30, euBand: 65, cupA_cc: 190, cupB_cc: 280, cupC_cc: 390, cupD_cc: 480, cupDD_cc: 590, cupE_cc: 710, cupF_cc: 850, biomechanicNote: 'Petite ribcage; requires snug 30 band to ensure 80% of breast mass support comes from underband rather than shoulder straps.' },
  { band: 32, euBand: 70, cupA_cc: 240, cupB_cc: 340, cupC_cc: 450, cupD_cc: 560, cupDD_cc: 690, cupE_cc: 830, cupF_cc: 990, biomechanicNote: 'Slim athletic ribcage; cup volume scales 15% larger than 30 band for identical letter.' },
  { band: 34, euBand: 75, cupA_cc: 290, cupB_cc: 410, cupC_cc: 530, cupD_cc: 660, cupDD_cc: 810, cupE_cc: 970, cupF_cc: 1150, biomechanicNote: 'Median benchmark band; 34C holds ~530cc breast volume, sharing identical cup capacity with 32D and 36B.' },
  { band: 36, euBand: 80, cupA_cc: 350, cupB_cc: 490, cupC_cc: 630, cupD_cc: 780, cupDD_cc: 950, cupE_cc: 1140, cupF_cc: 1340, biomechanicNote: 'Wider ribcage; a 36B possesses equivalent cubic displacement to a 34C and 32D.' },
  { band: 38, euBand: 85, cupA_cc: 420, cupB_cc: 580, cupC_cc: 740, cupD_cc: 920, cupDD_cc: 1110, cupE_cc: 1320, cupF_cc: 1550, biomechanicNote: 'Broader frame; 38D holds ~920cc, matching 36DD and 34DDD/F in breast tissue displacement.' },
  { band: 40, euBand: 90, cupA_cc: 500, cupB_cc: 680, cupC_cc: 870, cupD_cc: 1070, cupDD_cc: 1290, cupE_cc: 1530, cupF_cc: 1790, biomechanicNote: 'Plus ribcage architecture; band tension is vital to prevent bra riding up the thoracic spine.' },
];

export function BraCupVolumeMatrixChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // 34 band default
  const [selectedCup, setSelectedCup] = useState<'B' | 'C' | 'D' | 'DD'>('C');

  const cur = BAND_VOLUME_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minBand = 30;
  const maxBand = 40;
  const minVol = 150;
  const maxVol = 1800;

  const getX = (band: number) => padLeft + ((band - minBand) / (maxBand - minBand)) * plotW;
  const getY = (cc: number) => padTop + plotH - ((cc - minVol) / (maxVol - minVol)) * plotH;

  const cups = [
    { key: 'cupB_cc' as const, label: 'Cup B', color: '#38bdf8' },
    { key: 'cupC_cc' as const, label: 'Cup C', color: '#0ea5e9' },
    { key: 'cupD_cc' as const, label: 'Cup D', color: '#6366f1' },
    { key: 'cupDD_cc' as const, label: 'Cup DD', color: '#ec4899' },
  ];

  const getVolForCup = (d: SisterVolGroup, cupKey: 'B' | 'C' | 'D' | 'DD') => {
    switch (cupKey) {
      case 'B': return d.cupB_cc;
      case 'C': return d.cupC_cc;
      case 'D': return d.cupD_cc;
      case 'DD': return d.cupDD_cc;
    }
  };

  const activeVol = getVolForCup(cur, selectedCup);
  const activeX = getX(cur.band);
  const activeY = getY(activeVol);

  const isLeft = activeX > 380;
  const tooltipX = isLeft ? activeX - 200 : activeX + 15;

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetBand = minBand + ratio * (maxBand - minBand);

    let closestIdx = 0;
    let minDiff = Infinity;
    BAND_VOLUME_DATA.forEach((d, idx) => {
      const diff = Math.abs(d.band - targetBand);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIdx(closestIdx);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header and Cup Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Bra Cup Volume & Sister-Sizing Mechanical Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Volumetric Breast Displacement (cc/mL) Across Ribcage Band Sizes (30 to 40)
          </p>
        </div>

        {/* Cup Letter Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          {(['B', 'C', 'D', 'DD'] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCup(c)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCup === c
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Cup {c}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas with Interactive Scrubbing */}
      <div className="relative select-none touch-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseMove={(e) => handlePointer(e.clientX, e.currentTarget.getBoundingClientRect())}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              handlePointer(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
            }
          }}
        >
          {/* Grid lines */}
          {[300, 600, 900, 1200, 1500].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400 dark:fill-slate-500">
                  {val} cc
                </text>
              </g>
            );
          })}

          {/* Band axis labels */}
          {BAND_VOLUME_DATA.map((d) => {
            const x = getX(d.band);
            return (
              <text key={d.band} x={x} y={svgHeight - 14} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium">
                {d.band} (EU {d.euBand})
              </text>
            );
          })}

          {/* Render All Cup Curves */}
          {cups.map((cup) => {
            const path = BAND_VOLUME_DATA.map((d, i) => {
              const x = getX(d.band);
              const y = getY(d[cup.key]);
              return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
            }).join(' ');

            const isSelected = selectedCup === cup.label.replace('Cup ', '');

            return (
              <path
                key={cup.key}
                d={path}
                fill="none"
                stroke={cup.color}
                strokeWidth={isSelected ? '3' : '1.5'}
                strokeOpacity={isSelected ? 1 : 0.4}
                strokeLinecap="round"
              />
            );
          })}

          {/* Active scrub crosshair */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={svgHeight - padBottom}
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <circle cx={activeX} cy={activeY} r="5" fill="#6366f1" stroke="#fff" strokeWidth="2" />

          {/* Dynamic Inverted Tooltip */}
          <g transform={`translate(${tooltipX}, ${Math.min(activeY, svgHeight - padBottom - 95)})`}>
            <rect width="185" height="92" rx="8" className="fill-slate-900/95 dark:fill-slate-800/95 shadow-xl" />
            <text x="12" y="20" className="text-[11px] font-bold fill-white">
              Size {cur.band}{selectedCup} (EU {cur.euBand}{selectedCup})
            </text>
            <text x="12" y="38" className="text-[10px] fill-slate-300">
              Displacement Volume: <tspan className="font-semibold fill-indigo-400">{activeVol} cc / mL</tspan>
            </text>
            <text x="12" y="54" className="text-[10px] fill-slate-300">
              Sister Sizes (Same ~{activeVol}cc Vol):
            </text>
            <text x="12" y="69" className="text-[9.5px] fill-pink-300 font-mono">
              {cur.band - 2}{selectedCup === 'B' ? 'C' : selectedCup === 'C' ? 'D' : selectedCup === 'D' ? 'DD' : 'E'} ⇄ {cur.band}{selectedCup} ⇄ {cur.band + 2}{selectedCup === 'DD' ? 'D' : selectedCup === 'D' ? 'C' : 'B'}
            </text>
            <text x="12" y="83" className="text-[8.5px] fill-amber-300">
              Underband carries 80% of support
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Band Structural Summary Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Band {cur.band} Structural Fit & Biomechanics:
          </span>
          <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {cur.biomechanicNote}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">{cur.band}{selectedCup} Volume</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {activeVol} cc (mL)
            </span>
          </div>
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">International Band</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              EU {cur.euBand} / FR 90
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
