'use client';

import React, { useState } from 'react';

interface BmiSpectrumPoint {
  bmi: number;
  prime: number;
  whoCategory: string;
  asianCategory: string;
  hazardRatio: string;
  color: string;
  clinicalNote: string;
}

const BMI_SPECTRUM_DATA: BmiSpectrumPoint[] = [
  { bmi: 16.0, prime: 0.64, whoCategory: 'Severe Underweight', asianCategory: 'Severe Underweight', hazardRatio: '1.8x Morbidity', color: '#38bdf8', clinicalNote: 'Marked malnutrition; risks of immune compromise, cardiac arrhythmia, and osteopenia.' },
  { bmi: 17.5, prime: 0.70, whoCategory: 'Moderate Underweight', asianCategory: 'Moderate Underweight', hazardRatio: '1.4x Morbidity', color: '#38bdf8', clinicalNote: 'Inadequate somatic mass; potential micronutrient deficiency and muscular wasting.' },
  { bmi: 18.5, prime: 0.74, whoCategory: 'Normal (Threshold)', asianCategory: 'Normal (Threshold)', hazardRatio: '1.0x Baseline', color: '#10b981', clinicalNote: 'Lower limit of optimal physiological weight for adults.' },
  { bmi: 20.5, prime: 0.82, whoCategory: 'Normal (Healthy)', asianCategory: 'Normal (Healthy)', hazardRatio: '1.0x Baseline', color: '#10b981', clinicalNote: 'Optimal somatic proportion; statistically lowest all-cause mortality rate in non-smokers.' },
  { bmi: 22.5, prime: 0.90, whoCategory: 'Normal (Optimal)', asianCategory: 'Normal (Optimal)', hazardRatio: '1.0x Baseline', color: '#10b981', clinicalNote: 'Peak longevity median according to Global BMI Mortality Collaboration.' },
  { bmi: 24.5, prime: 0.98, whoCategory: 'Normal (Upper)', asianCategory: 'Overweight (Increased Risk)', hazardRatio: '1.1x Risk', color: '#10b981', clinicalNote: 'Upper boundary for general WHO; triggers metabolic public health action in Asian populations (cutoff 23.0).' },
  { bmi: 26.5, prime: 1.06, whoCategory: 'Overweight (Pre-obese)', asianCategory: 'Overweight', hazardRatio: '1.25x Risk', color: '#f59e0b', clinicalNote: 'Mild adiposity excess; early elevation in fasting insulin and systolic blood pressure.' },
  { bmi: 28.5, prime: 1.14, whoCategory: 'Overweight (Upper)', asianCategory: 'Obese (High Risk)', hazardRatio: '1.4x Risk', color: '#f59e0b', clinicalNote: 'Cardiometabolic risk elevated; Asian cut-off for Obesity is ≥27.5 kg/m².' },
  { bmi: 30.5, prime: 1.22, whoCategory: 'Obesity Class I', asianCategory: 'Obesity Class I', hazardRatio: '1.7x Risk', color: '#f97316', clinicalNote: 'Formal clinical obesity; 2-3x higher incidence of type 2 diabetes and dyslipidemia.' },
  { bmi: 33.0, prime: 1.32, whoCategory: 'Obesity Class I', asianCategory: 'Obesity Class I', hazardRatio: '2.0x Risk', color: '#f97316', clinicalNote: 'Significant adipose volume; sleep apnea and non-alcoholic fatty liver risk elevated.' },
  { bmi: 36.5, prime: 1.46, whoCategory: 'Obesity Class II (Severe)', asianCategory: 'Obesity Class II', hazardRatio: '2.5x Risk', color: '#ef4444', clinicalNote: 'Severe metabolic strain; joint degenerative arthritis and left ventricular hypertrophy.' },
  { bmi: 40.0, prime: 1.60, whoCategory: 'Obesity Class III (Morbid)', asianCategory: 'Obesity Class III', hazardRatio: '3.2x Risk', color: '#dc2626', clinicalNote: 'Morbid obesity; candidate for bariatric metabolic surgery and GLP-1 receptor agonist therapy.' },
];

export function BmiQueteletPrimeChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // BMI 22.5 default
  const cur = BMI_SPECTRUM_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 50;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minBmi = 15;
  const maxBmi = 42;
  const minRisk = 0.8;
  const maxRisk = 3.5;

  const getX = (bmi: number) => padLeft + ((bmi - minBmi) / (maxBmi - minBmi)) * plotW;
  const getY = (riskStr: string) => {
    const r = parseFloat(riskStr) || 1.0;
    return padTop + plotH - ((r - minRisk) / (maxRisk - minRisk)) * plotH;
  };

  const activeX = getX(cur.bmi);
  const activeY = getY(cur.hazardRatio);

  const isLeft = activeX > 380;
  const tooltipX = isLeft ? activeX - 200 : activeX + 15;

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetBmi = minBmi + ratio * (maxBmi - minBmi);

    let closestIdx = 0;
    let minDiff = Infinity;
    BMI_SPECTRUM_DATA.forEach((d, idx) => {
      const diff = Math.abs(d.bmi - targetBmi);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIdx(closestIdx);
  };

  const curvePath = BMI_SPECTRUM_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.bmi).toFixed(1)} ${getY(d.hazardRatio).toFixed(1)}`).join(' ');

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Quetelet BMI Continuum &amp; All-Cause Mortality Hazard Curve
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            WHO Clinical Stratification, BMI Prime Index, and Asian Population Cut-Offs
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium">
            Optimal BMI: 18.5 – 24.9
          </span>
        </div>
      </div>

      {/* Interactive SVG Canvas */}
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
            <linearGradient id="riskGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="25%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>

          {/* Background Category Bands */}
          <rect x={getX(15)} y={padTop} width={getX(18.5) - getX(15)} height={plotH} fill="#38bdf8" fillOpacity="0.08" />
          <rect x={getX(18.5)} y={padTop} width={getX(25) - getX(18.5)} height={plotH} fill="#10b981" fillOpacity="0.12" />
          <rect x={getX(25)} y={padTop} width={getX(30) - getX(25)} height={plotH} fill="#f59e0b" fillOpacity="0.08" />
          <rect x={getX(30)} y={padTop} width={getX(35) - getX(30)} height={plotH} fill="#f97316" fillOpacity="0.10" />
          <rect x={getX(35)} y={padTop} width={getX(42) - getX(35)} height={plotH} fill="#ef4444" fillOpacity="0.12" />

          {/* Grid lines */}
          {[1.0, 1.5, 2.0, 2.5, 3.0].map((val) => {
            const y = padTop + plotH - ((val - minRisk) / (maxRisk - minRisk)) * plotH;
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400 dark:fill-slate-500">
                  {val.toFixed(1)}x
                </text>
              </g>
            );
          })}

          {/* BMI axis labels */}
          {[18.5, 23.0, 25.0, 30.0, 35.0, 40.0].map((val) => {
            const x = getX(val);
            return (
              <text key={val} x={x} y={svgHeight - 14} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium">
                {val}
              </text>
            );
          })}

          {/* Hazard Ratio Path */}
          <path d={curvePath} fill="none" stroke="url(#riskGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Active scrub crosshair */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={svgHeight - padBottom}
            stroke={cur.color}
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <circle cx={activeX} cy={activeY} r="5" fill={cur.color} stroke="#fff" strokeWidth="2" />

          {/* Dynamic Inverted Tooltip */}
          <g transform={`translate(${tooltipX}, ${Math.min(activeY, svgHeight - padBottom - 95)})`}>
            <rect width="185" height="92" rx="8" className="fill-slate-900/95 dark:fill-slate-800/95 shadow-xl" />
            <text x="12" y="20" className="text-[11px] font-bold fill-white">
              BMI {cur.bmi.toFixed(1)} kg/m² (Prime {cur.prime.toFixed(2)})
            </text>
            <text x="12" y="38" className="text-[10px] fill-slate-300">
              WHO: <tspan className="font-semibold fill-emerald-400">{cur.whoCategory}</tspan>
            </text>
            <text x="12" y="54" className="text-[10px] fill-slate-300">
              Asian Standard: <tspan className="fill-amber-300">{cur.asianCategory}</tspan>
            </text>
            <text x="12" y="69" className="text-[9.5px] fill-sky-300 font-mono">
              Mortality Relative Risk: {cur.hazardRatio}
            </text>
            <text x="12" y="83" className="text-[8.5px] fill-slate-400">
              {cur.bmi >= 18.5 && cur.bmi <= 24.9 ? 'Optimal Survival Window' : 'Elevated Health Vigilance'}
            </text>
          </g>
        </svg>
      </div>

      {/* Selected BMI Summary Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            BMI {cur.bmi.toFixed(1)} Clinical Pathology:
          </span>
          <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {cur.clinicalNote}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">BMI Prime</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {cur.prime.toFixed(2)}
            </span>
          </div>
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">Mortality Hazard</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
              {cur.hazardRatio}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
