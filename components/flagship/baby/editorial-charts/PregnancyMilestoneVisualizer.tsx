'use client';

import React, { useState } from 'react';

interface Milestone {
  week: number;
  weightGrams: number;
  lengthCm: number;
  fruit: string;
  fruitEmoji: string;
  trimester: string;
  trimesterColor: string;
  milestoneTitle: string;
  clinicalNote: string;
}

const MILESTONES: Milestone[] = [
  {
    week: 8,
    weightGrams: 1,
    lengthCm: 1.6,
    fruit: 'Raspberry',
    fruitEmoji: '🫐',
    trimester: 'First Trimester',
    trimesterColor: 'bg-emerald-500',
    milestoneTitle: 'Embryonic Cardiac Rhythm & Limb Buds',
    clinicalNote: 'Neural tube closure complete; cardiac tube contracts rhythmically at 140–170 bpm; webbed digits form.',
  },
  {
    week: 12,
    weightGrams: 14,
    lengthCm: 5.4,
    fruit: 'Plum',
    fruitEmoji: '🍑',
    trimester: 'First Trimester',
    trimesterColor: 'bg-emerald-500',
    milestoneTitle: 'End of 1st Trimester & Reflex Formation',
    clinicalNote: 'Nuchal translucency scan window; primitive reflexes appear; kidneys produce amniotic fluid.',
  },
  {
    week: 16,
    weightGrams: 100,
    lengthCm: 11.6,
    fruit: 'Avocado',
    fruitEmoji: '🥑',
    trimester: 'Second Trimester',
    trimesterColor: 'bg-blue-500',
    milestoneTitle: 'Rapid Somatic Elongation & Light Perception',
    clinicalNote: 'Eyes perceive light through fused eyelids; skeleton undergoes rapid endochondral ossification.',
  },
  {
    week: 20,
    weightGrams: 300,
    lengthCm: 25.6,
    fruit: 'Banana',
    fruitEmoji: '🍌',
    trimester: 'Second Trimester',
    trimesterColor: 'bg-blue-500',
    milestoneTitle: 'Mid-Pregnancy Anatomy Scan (Level II)',
    clinicalNote: 'Detailed organ sonogram (heart 4-chamber view, spine, kidneys); maternal quickening fetal kicks felt.',
  },
  {
    week: 24,
    weightGrams: 600,
    lengthCm: 30.0,
    fruit: 'Ear of Corn',
    fruitEmoji: '🌽',
    trimester: 'Second Trimester',
    trimesterColor: 'bg-blue-500',
    milestoneTitle: 'Clinical Fetal Viability Milestone',
    clinicalNote: 'Viability threshold reached; inner ear cochlea fully formed; pulmonary surfactant synthesis begins.',
  },
  {
    week: 28,
    weightGrams: 1000,
    lengthCm: 37.6,
    fruit: 'Eggplant',
    fruitEmoji: '🍆',
    trimester: 'Third Trimester',
    trimesterColor: 'bg-purple-500',
    milestoneTitle: 'Third Trimester & REM Brain Waves',
    clinicalNote: 'Eyes open and track; rapid cerebral cortex gyri folding; daily fetal kick counts recommended.',
  },
  {
    week: 32,
    weightGrams: 1700,
    lengthCm: 42.4,
    fruit: 'Butternut Squash',
    fruitEmoji: '🎃',
    trimester: 'Third Trimester',
    trimesterColor: 'bg-purple-500',
    milestoneTitle: 'Adipose Layer & Thermal Regulation',
    clinicalNote: 'Subcutaneous white and brown adipose deposition accelerates; bone mineral density peaks.',
  },
  {
    week: 36,
    weightGrams: 2600,
    lengthCm: 47.4,
    fruit: 'Papaya',
    fruitEmoji: '🍈',
    trimester: 'Third Trimester',
    trimesterColor: 'bg-purple-500',
    milestoneTitle: 'Pulmonary Maturity & Pelvic Engagement',
    clinicalNote: 'Lungs synthesize mature surfactant (L/S ratio > 2.0); fetus descends into maternal pelvic inlet.',
  },
  {
    week: 40,
    weightGrams: 3450,
    lengthCm: 51.2,
    fruit: 'Small Watermelon',
    fruitEmoji: '🍉',
    trimester: 'Full Term Delivery',
    trimesterColor: 'bg-rose-500',
    milestoneTitle: 'Full Term Gestation & Delivery Readiness',
    clinicalNote: 'Optimal neurodevelopmental maturity; maternal antibodies transferred across placenta for neonatal immunity.',
  },
];

export function PregnancyMilestoneVisualizer() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Week 20 default
  const cur = MILESTONES[activeIdx];

  const pct = Math.round((cur.week / 40) * 100);
  const weightLbs = (cur.weightGrams / 453.592).toFixed(1);
  const lengthIn = (cur.lengthCm / 2.54).toFixed(1);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Fetal Growth &amp; Gestation Timeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Interactive week-by-week fetal anatomical development, weight curves, and ultrasound milestones
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20">
          ACOG Clinical Milestones
        </span>
      </div>

      {/* Touch-Friendly Horizontally Scrollable Week Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Gestational Week:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {MILESTONES.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.week}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{m.fruitEmoji}</span>
                <span>Wk {m.week}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Gestation Progress Bar */}
      <div className="mb-5 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
          <span>Gestation Progress: <strong>Week {cur.week} of 40</strong></span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{pct}% Completed</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>Wk 1 (Conception)</span>
          <span>Wk 13 (2nd Tri)</span>
          <span>Wk 28 (3rd Tri)</span>
          <span>Wk 40 (Due Date)</span>
        </div>
      </div>

      {/* Active Week Highlights Card (Fluid Responsive Grid) */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Size Analogy</span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-xl">{cur.fruitEmoji}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{cur.fruit}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Estimated Weight</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{cur.weightGrams >= 1000 ? `${(cur.weightGrams / 1000).toFixed(2)} kg` : `${cur.weightGrams} g`}</span>
            <span className="text-xs text-slate-400 block font-normal">({weightLbs} lbs)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Crown-to-Heel Length</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cur.lengthCm} cm</span>
            <span className="text-xs text-slate-400 block font-normal">({lengthIn} in)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Trimester Stage</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block leading-tight">{cur.trimester}</span>
            <span className="text-[10px] text-slate-400 block">Weeks {cur.week <= 13 ? '1–13' : cur.week <= 27 ? '14–27' : '28–40'}</span>
          </div>
        </div>
      </div>

      {/* Clinical Milestone Summary Box */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
          <span>🔬</span>
          <span>Week {cur.week} Milestone: {cur.milestoneTitle}</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
