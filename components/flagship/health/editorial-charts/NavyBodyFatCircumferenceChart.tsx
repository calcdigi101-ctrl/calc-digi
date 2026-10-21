'use client';

import React, { useState } from 'react';

interface BodyFatPoint {
  bf: number;
  maleCategory: string;
  femaleCategory: string;
  maleVisual: string;
  femaleVisual: string;
  physiologicalStatus: string;
}

const BODY_FAT_SPECTRUM: BodyFatPoint[] = [
  { bf: 4, maleCategory: 'Essential Fat (Critical)', femaleCategory: 'Underfat (Amenorrhea Risk)', maleVisual: 'Extreme vascularity; striations visible across chest and glutes; competition bodybuilder stage conditioning.', femaleVisual: 'Severely depleted essential adipose; profound risk of athletic hypothalamic amenorrhea and osteopenia.', physiologicalStatus: 'Sub-physiological; unsustainable long-term without endocrine collapse.' },
  { bf: 8, maleCategory: 'Athletic / Contest Shape', femaleCategory: 'Underfat / Extreme Fitness', maleVisual: 'Full abdominal vascularity, clear separation between muscle heads, visible serratus anterior.', femaleVisual: 'Extremely lean; vascularity visible in forearms and abdomen; competitive track or figure athlete.', physiologicalStatus: 'Peak athletic conditioning; requires strict nutrient tracking.' },
  { bf: 12, maleCategory: 'Athletic / Six-Pack', femaleCategory: 'Athletic', maleVisual: 'Chiseled six-pack abs visible without flexing; vascularity on arms; optimal testosterone production.', femaleVisual: 'Athletic abs definition; lean limbs; typical elite cross-country runner or gymnast.', physiologicalStatus: 'Optimal hormonal and metabolic balance for athletic performance.' },
  { bf: 15, maleCategory: 'Fitness / Lean', femaleCategory: 'Athletes / Fitness', maleVisual: 'Clear abdominal outline; lean waistline; vascularity in arms; sustainable year-round physique.', femaleVisual: 'Athletic silhouette; flat stomach with lateral abdominal lines visible; healthy menstrual regularity.', physiologicalStatus: 'Gold standard sustainable fitness range with low cardiovascular risk.' },
  { bf: 18, maleCategory: 'Acceptable / Average', femaleCategory: 'Fitness', maleVisual: 'Soft abdominal outline; healthy visceral fat; standard active adult male conditioning.', femaleVisual: 'Fit and toned appearance; flat stomach; optimal estrogen and progesterone production.', physiologicalStatus: 'Healthy metabolic baseline with excellent insulin sensitivity.' },
  { bf: 22, maleCategory: 'Acceptable / Upper Limit', femaleCategory: 'Acceptable / Average', maleVisual: 'Little to no muscle definition visible around abdomen; slight waist accumulation.', femaleVisual: 'Soft curves; typical active healthy adult female silhouette; zero health risk.', physiologicalStatus: 'Normal population baseline; no metabolic dysregulation detected.' },
  { bf: 26, maleCategory: 'Obese Class I (Adipose Excess)', femaleCategory: 'Acceptable / Upper Limit', maleVisual: 'Moderate abdominal protrusion; elevated visceral adipose tissue accumulation.', femaleVisual: 'Subcutaneous adipose expansion across hips, thighs, and abdomen; healthy hormonal function.', physiologicalStatus: 'For men: mild metabolic syndrome risk; for women: normal biological variance.' },
  { bf: 30, maleCategory: 'Obese Class I', femaleCategory: 'Acceptable / Overfat Border', maleVisual: 'Significant abdominal distension; elevated triglycerides and fasting glucose.', femaleVisual: 'Soft body contour; beginning of cardiometabolic risk elevation in females.', physiologicalStatus: 'Lifestyle intervention recommended (caloric deficit and resistance training).' },
  { bf: 35, maleCategory: 'Obese Class II', femaleCategory: 'Obese Class I', maleVisual: 'Severe visceral fat deposition; high risk of sleep apnea, fatty liver, and type 2 diabetes.', femaleVisual: 'Elevated visceral and hepatic adiposity; elevated inflammatory markers (hs-CRP).', physiologicalStatus: 'Clinical intervention recommended; elevated cardiovascular morbidity hazard.' },
  { bf: 40, maleCategory: 'Obese Class III', femaleCategory: 'Obese Class II', maleVisual: 'Morbid obesity; severe metabolic and orthopedic strain.', femaleVisual: 'Severe clinical obesity; high risk of metabolic syndrome and joint osteoarthrosis.', physiologicalStatus: 'Comprehensive medical and nutritional therapy strongly advised.' },
];

export function NavyBodyFatCircumferenceChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // 15% default
  const [sex, setSex] = useState<'male' | 'female'>('male');

  const cur = BODY_FAT_SPECTRUM[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 50;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minBf = 2;
  const maxBf = 45;

  const getX = (bf: number) => padLeft + ((bf - minBf) / (maxBf - minBf)) * plotW;
  const getY = (idx: number) => padTop + (plotH / (BODY_FAT_SPECTRUM.length - 1)) * idx;

  const activeX = getX(cur.bf);
  const activeY = padTop + plotH * 0.5;

  const isLeft = activeX > 380;
  const tooltipX = isLeft ? activeX - 200 : activeX + 15;

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetBf = minBf + ratio * (maxBf - minBf);

    let closestIdx = 0;
    let minDiff = Infinity;
    BODY_FAT_SPECTRUM.forEach((d, idx) => {
      const diff = Math.abs(d.bf - targetBf);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIdx(closestIdx);
  };

  const category = sex === 'male' ? cur.maleCategory : cur.femaleCategory;
  const visualDesc = sex === 'male' ? cur.maleVisual : cur.femaleVisual;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Header and Sex Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Body Composition Spectrum &amp; Visual Conditioning Matrix
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            American Council on Exercise (ACE) &amp; Jackson-Pollock Clinical Tiers
          </p>
        </div>

        {/* Sex Switcher */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 self-start sm:self-auto border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setSex('male')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sex === 'male'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            👨 Men (2–25%+)
          </button>
          <button
            type="button"
            onClick={() => setSex('female')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              sex === 'female'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            👩 Women (10–32%+)
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
            <linearGradient id="bfGradMale" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="15%" stopColor="#0ea5e9" />
              <stop offset="35%" stopColor="#10b981" />
              <stop offset="55%" stopColor="#f59e0b" />
              <stop offset="80%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="bfGradFemale" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="25%" stopColor="#ec4899" />
              <stop offset="45%" stopColor="#10b981" />
              <stop offset="65%" stopColor="#f59e0b" />
              <stop offset="85%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>

          {/* Body Fat % Axis ticks */}
          {[5, 10, 15, 20, 25, 30, 35, 40].map((val) => {
            const x = getX(val);
            return (
              <g key={val}>
                <line x1={x} y1={padTop} x2={x} y2={svgHeight - padBottom} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={x} y={svgHeight - 14} textAnchor="middle" className="text-[10px] fill-slate-500 dark:fill-slate-400 font-medium">
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Color Gradient Track */}
          <rect
            x={padLeft}
            y={padTop + plotH * 0.45}
            width={plotW}
            height="18"
            rx="9"
            fill={sex === 'male' ? 'url(#bfGradMale)' : 'url(#bfGradFemale)'}
          />

          {/* Benchmark indicators */}
          {BODY_FAT_SPECTRUM.map((d) => {
            const x = getX(d.bf);
            return (
              <circle
                key={d.bf}
                cx={x}
                cy={padTop + plotH * 0.45 + 9}
                r="3"
                fill="#ffffff"
                opacity="0.8"
              />
            );
          })}

          {/* Active scrub crosshair */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={svgHeight - padBottom}
            stroke={sex === 'male' ? '#0284c7' : '#db2777'}
            strokeWidth="2"
            strokeDasharray="2 2"
          />
          <circle
            cx={activeX}
            cy={padTop + plotH * 0.45 + 9}
            r="8"
            fill={sex === 'male' ? '#0284c7' : '#db2777'}
            stroke="#fff"
            strokeWidth="3"
            className="shadow-md"
          />

          {/* Dynamic Inverted Tooltip */}
          <g transform={`translate(${tooltipX}, ${Math.max(padTop + 10, padTop + plotH * 0.1)})`}>
            <rect width="185" height="92" rx="8" className="fill-slate-900/95 dark:fill-slate-800/95 shadow-xl" />
            <text x="12" y="20" className="text-[11px] font-bold fill-white">
              {cur.bf}% Body Fat ({sex === 'male' ? 'Male' : 'Female'})
            </text>
            <text x="12" y="38" className="text-[10px] fill-slate-300">
              Tier: <tspan className="font-semibold fill-emerald-400">{category}</tspan>
            </text>
            <text x="12" y="54" className="text-[10px] fill-slate-300">
              Health Status:
            </text>
            <text x="12" y="69" className="text-[9px] fill-amber-300 font-mono">
              {cur.physiologicalStatus.length > 30 ? cur.physiologicalStatus.slice(0, 30) + '...' : cur.physiologicalStatus}
            </text>
            <text x="12" y="83" className="text-[8.5px] fill-sky-300">
              {cur.bf <= (sex === 'male' ? 15 : 24) ? 'Optimal Athletic Lean Mass' : 'Metabolic Health Target'}
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Body Fat Visual Conditioning Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            {cur.bf}% Body Fat Visual Anatomical Profile:
          </span>
          <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {visualDesc}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">ACE Classification</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {category.split('(')[0].trim()}
            </span>
          </div>
          <div className="px-3 py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">Optimal Range</span>
            <span className="font-bold text-teal-600 dark:text-teal-400 text-sm">
              {sex === 'male' ? '10% – 17%' : '18% – 24%'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
