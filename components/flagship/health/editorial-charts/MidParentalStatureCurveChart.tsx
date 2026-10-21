'use client';

import React, { useState } from 'react';

interface StatureTrajectoryPoint {
  age: number;
  boyMedianCm: number;
  boyLowCm: number;
  boyHighCm: number;
  girlMedianCm: number;
  girlLowCm: number;
  girlHighCm: number;
  stageNote: string;
}

const TRAJECTORY_DATA: StatureTrajectoryPoint[] = [
  { age: 2, boyMedianCm: 86.8, boyLowCm: 81.5, boyHighCm: 92.1, girlMedianCm: 85.5, girlLowCm: 80.0, girlHighCm: 91.0, stageNote: 'Toddler baseline: roughly 50% of adult skeletal stature reached.' },
  { age: 4, boyMedianCm: 102.4, boyLowCm: 95.8, boyHighCm: 109.0, girlMedianCm: 101.5, girlLowCm: 94.7, girlHighCm: 108.3, stageNote: 'Early childhood steady linear growth: ~6 to 7 cm/year accretion.' },
  { age: 6, boyMedianCm: 115.5, boyLowCm: 108.0, boyHighCm: 123.0, girlMedianCm: 114.3, girlLowCm: 106.8, girlHighCm: 121.8, stageNote: 'Mid-childhood growth consistency; growth plate cartilage active.' },
  { age: 8, boyMedianCm: 128.0, boyLowCm: 119.5, boyHighCm: 136.5, girlMedianCm: 126.9, girlLowCm: 118.2, girlHighCm: 135.6, stageNote: 'Adrenarche phase: mild hormonal surge, growth velocity steady at 5–6 cm/yr.' },
  { age: 10, boyMedianCm: 138.4, boyLowCm: 129.0, boyHighCm: 147.8, girlMedianCm: 138.6, girlLowCm: 128.8, girlHighCm: 148.4, stageNote: 'Girls entering Tanner Stage 2 (thelarche); girl height briefly overtakes boys.' },
  { age: 12, boyMedianCm: 149.1, boyLowCm: 138.0, boyHighCm: 160.2, girlMedianCm: 151.2, girlLowCm: 140.0, girlHighCm: 162.4, stageNote: 'Girls Peak Height Velocity (~8.5 cm/yr); boys commence testicular enlargement.' },
  { age: 14, boyMedianCm: 163.8, boyLowCm: 150.5, boyHighCm: 177.1, girlMedianCm: 159.8, girlLowCm: 148.0, girlHighCm: 171.6, stageNote: 'Boys Peak Height Velocity (~9.5 cm/yr); post-menarche deceleration in girls.' },
  { age: 16, boyMedianCm: 173.4, boyLowCm: 160.2, boyHighCm: 186.6, girlMedianCm: 162.5, girlLowCm: 150.5, girlHighCm: 174.5, stageNote: 'Girls near complete epiphyseal fusion; boys continue secondary growth spurt.' },
  { age: 18, boyMedianCm: 176.8, boyLowCm: 163.5, boyHighCm: 190.1, girlMedianCm: 163.2, girlLowCm: 151.2, girlHighCm: 175.2, stageNote: 'Final adult stature: epiphyseal growth plates ossify under estrogen/androgen regulation.' },
  { age: 20, boyMedianCm: 177.4, boyLowCm: 164.0, boyHighCm: 190.8, girlMedianCm: 163.4, girlLowCm: 151.4, girlHighCm: 175.4, stageNote: 'Adult skeletal maturity fully finalized; zero longitudinal bone elongation.' },
];

export function MidParentalStatureCurveChart() {
  const [activeIdx, setActiveIdx] = useState<number>(5); // Age 12 default
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');

  const cur = TRAJECTORY_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minAge = 2;
  const maxAge = 20;
  const minCm = 75;
  const maxCm = 195;

  const getX = (age: number) => padLeft + ((age - minAge) / (maxAge - minAge)) * plotW;
  const getY = (cm: number) => padTop + plotH - ((cm - minCm) / (maxCm - minCm)) * plotH;

  const medianCm = sex === 'boy' ? cur.boyMedianCm : cur.girlMedianCm;
  const lowCm = sex === 'boy' ? cur.boyLowCm : cur.girlLowCm;
  const highCm = sex === 'boy' ? cur.boyHighCm : cur.girlHighCm;

  const cmToFtIn = (cm: number) => {
    const totalInches = cm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inVal = Math.round((totalInches % 12) * 10) / 10;
    return `${ft}'${inVal.toFixed(1)}" (${cm.toFixed(1)} cm)`;
  };

  const highPath = TRAJECTORY_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.age).toFixed(1)} ${getY(sex === 'boy' ? d.boyHighCm : d.girlHighCm).toFixed(1)}`).join(' ');
  const lowRevPath = [...TRAJECTORY_DATA].reverse().map((d) => `L ${getX(d.age).toFixed(1)} ${getY(sex === 'boy' ? d.boyLowCm : d.girlLowCm).toFixed(1)}`).join(' ');
  const bandPath = `${highPath} ${lowRevPath} Z`;

  const medianPath = TRAJECTORY_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.age).toFixed(1)} ${getY(sex === 'boy' ? d.boyMedianCm : d.girlMedianCm).toFixed(1)}`).join(' ');

  const activeX = getX(cur.age);
  const activeY = getY(medianCm);

  const isLeft = activeX > 380;
  const tooltipX = isLeft ? activeX - 200 : activeX + 15;

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetAge = minAge + ratio * (maxAge - minAge);

    let closestIdx = 0;
    let minDiff = Infinity;
    TRAJECTORY_DATA.forEach((d, idx) => {
      const diff = Math.abs(d.age - targetAge);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIdx(closestIdx);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 shadow-sm space-y-4">
      {/* Header and Sex Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Mid-Parental Pediatric Growth Trajectory & Epiphyseal Spectrum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tanner-Goldstein Target Height (MPH ± 8.5 cm range) from Toddlerhood to Skeletal Maturity
          </p>
        </div>

        {/* Sex Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setSex('boy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sex === 'boy'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            👦 Boys Curve
          </button>
          <button
            type="button"
            onClick={() => setSex('girl')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sex === 'girl'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            👧 Girls Curve
          </button>
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
          <defs>
            <linearGradient id="bandGradBoy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="bandGradGirl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[80, 100, 120, 140, 160, 180].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400 dark:fill-slate-500">
                  {val} cm
                </text>
              </g>
            );
          })}

          {/* Age axis labels */}
          {TRAJECTORY_DATA.map((d) => {
            const x = getX(d.age);
            return (
              <text key={d.age} x={x} y={svgHeight - 14} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium">
                {d.age}y
              </text>
            );
          })}

          {/* Expected ±2 SD Genetic Target Band */}
          <path d={bandPath} fill={sex === 'boy' ? 'url(#bandGradBoy)' : 'url(#bandGradGirl)'} />

          {/* Upper (+2 SD) and Lower (-2 SD) boundaries */}
          <path
            d={TRAJECTORY_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.age).toFixed(1)} ${getY(sex === 'boy' ? d.boyHighCm : d.girlHighCm).toFixed(1)}`).join(' ')}
            fill="none"
            stroke={sex === 'boy' ? '#38bdf8' : '#f472b6'}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <path
            d={TRAJECTORY_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.age).toFixed(1)} ${getY(sex === 'boy' ? d.boyLowCm : d.girlLowCm).toFixed(1)}`).join(' ')}
            fill="none"
            stroke={sex === 'boy' ? '#38bdf8' : '#f472b6'}
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Median Stature Path */}
          <path
            d={medianPath}
            fill="none"
            stroke={sex === 'boy' ? '#0284c7' : '#db2777'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Active scrub crosshair */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={svgHeight - padBottom}
            stroke={sex === 'boy' ? '#0284c7' : '#db2777'}
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <circle cx={activeX} cy={activeY} r="5" fill={sex === 'boy' ? '#0284c7' : '#db2777'} stroke="#fff" strokeWidth="2" />

          {/* Dynamic Inverted Tooltip */}
          <g transform={`translate(${tooltipX}, ${Math.min(activeY, svgHeight - padBottom - 95)})`}>
            <rect width="185" height="92" rx="8" className="fill-slate-900/95 dark:fill-slate-800/95 shadow-xl" />
            <text x="12" y="20" className="text-[11px] font-bold fill-white">
              Age {cur.age} Years ({sex === 'boy' ? 'Boy' : 'Girl'})
            </text>
            <text x="12" y="38" className="text-[10px] fill-slate-300">
              50th Median: <tspan className="font-semibold fill-emerald-400">{cmToFtIn(medianCm)}</tspan>
            </text>
            <text x="12" y="54" className="text-[10px] fill-slate-300">
              Expected Band (±2 SD):
            </text>
            <text x="12" y="69" className="text-[9.5px] fill-sky-300 font-mono">
              {cmToFtIn(lowCm)} – {cmToFtIn(highCm)}
            </text>
            <text x="12" y="83" className="text-[8.5px] fill-amber-300">
              {cur.age === 18 || cur.age === 20 ? 'Final Adult Height Reached' : 'Active Growth Phase'}
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Age Biological Summary Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Age {cur.age} Developmental Milestone:
          </span>
          <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {cur.stageNote}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">Median Stature</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {cmToFtIn(medianCm)}
            </span>
          </div>
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">95% Confidence Range</span>
            <span className="font-bold text-sky-600 dark:text-sky-400 text-sm">
              ± 8.5 cm (± 3.3 in)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
