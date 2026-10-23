'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface MilestoneData {
  week: number;
  weekLabel: string;
  weightGrams: number;
  weightLbs: number;
  lengthCm: number;
  lengthIn: number;
  fruit: string;
  fruitEmoji: string;
  trimester: string;
  milestoneTitle: string;
  clinicalNote: string;
}

const FETAL_DATA: MilestoneData[] = [
  {
    week: 8,
    weekLabel: 'Wk 8',
    weightGrams: 1,
    weightLbs: 0.002,
    lengthCm: 1.6,
    lengthIn: 0.6,
    fruit: 'Raspberry',
    fruitEmoji: '🫐',
    trimester: '1st Trimester',
    milestoneTitle: 'Cardiac Activity & Limb Buds',
    clinicalNote: 'Neural tube closure complete; primitive cardiac tube pulses at 140–170 bpm; webbed digits form.',
  },
  {
    week: 12,
    weekLabel: 'Wk 12',
    weightGrams: 14,
    weightLbs: 0.03,
    lengthCm: 5.4,
    lengthIn: 2.1,
    fruit: 'Plum',
    fruitEmoji: '🍑',
    trimester: '1st Trimester',
    milestoneTitle: 'End of 1st Trimester & Reflexes',
    clinicalNote: 'Nuchal translucency scan window; primitive reflexes appear; kidneys produce amniotic fluid.',
  },
  {
    week: 16,
    weekLabel: 'Wk 16',
    weightGrams: 100,
    weightLbs: 0.22,
    lengthCm: 11.6,
    lengthIn: 4.6,
    fruit: 'Avocado',
    fruitEmoji: '🥑',
    trimester: '2nd Trimester',
    milestoneTitle: 'Rapid Somatic Elongation',
    clinicalNote: 'Eyes perceive light through fused eyelids; circulatory system pumps ~25 quarts of blood daily.',
  },
  {
    week: 20,
    weekLabel: 'Wk 20',
    weightGrams: 300,
    weightLbs: 0.66,
    lengthCm: 25.6,
    lengthIn: 10.1,
    fruit: 'Banana',
    fruitEmoji: '🍌',
    trimester: '2nd Trimester',
    milestoneTitle: 'Level II Anatomy Ultrasound',
    clinicalNote: 'Detailed 4-chamber cardiac view and spinal integrity confirmed; maternal quickening kicks felt.',
  },
  {
    week: 24,
    weekLabel: 'Wk 24',
    weightGrams: 600,
    weightLbs: 1.32,
    lengthCm: 30.0,
    lengthIn: 11.8,
    fruit: 'Ear of Corn',
    fruitEmoji: '🌽',
    trimester: '2nd Trimester',
    milestoneTitle: 'Clinical Fetal Viability Threshold',
    clinicalNote: 'Viability landmark; inner ear cochlea fully formed; pulmonary alveolar surfactant begins synthesis.',
  },
  {
    week: 28,
    weekLabel: 'Wk 28',
    weightGrams: 1000,
    weightLbs: 2.2,
    lengthCm: 37.6,
    lengthIn: 14.8,
    fruit: 'Eggplant',
    fruitEmoji: '🍆',
    trimester: '3rd Trimester',
    milestoneTitle: 'Third Trimester & Eye Blinking',
    clinicalNote: 'Eyes open and blink; rapid cerebral cortex gyri folding; daily fetal kick monitoring recommended.',
  },
  {
    week: 32,
    weekLabel: 'Wk 32',
    weightGrams: 1700,
    weightLbs: 3.75,
    lengthCm: 42.4,
    lengthIn: 16.7,
    fruit: 'Butternut Squash',
    fruitEmoji: '🎃',
    trimester: '3rd Trimester',
    milestoneTitle: 'Adipose Layer & Thermoregulation',
    clinicalNote: 'Subcutaneous white and brown adipose stores accumulate; bone mineral density rapidly ossifies.',
  },
  {
    week: 36,
    weekLabel: 'Wk 36',
    weightGrams: 2600,
    weightLbs: 5.73,
    lengthCm: 47.4,
    lengthIn: 18.7,
    fruit: 'Papaya',
    fruitEmoji: '🍈',
    trimester: '3rd Trimester',
    milestoneTitle: 'Pulmonary Maturity & Engagement',
    clinicalNote: 'Mature lung surfactant synthesis; fetus descends into maternal pelvic inlet (lightening).',
  },
  {
    week: 40,
    weekLabel: 'Wk 40',
    weightGrams: 3450,
    weightLbs: 7.6,
    lengthCm: 51.2,
    lengthIn: 20.2,
    fruit: 'Small Watermelon',
    fruitEmoji: '🍉',
    trimester: 'Full Term',
    milestoneTitle: 'Full Term Gestational Maturity',
    clinicalNote: 'Complete neurodevelopmental maturation; maternal placental IgG antibodies transferred for newborn immunity.',
  },
];

const tooltipStyle = {
  contentStyle: {
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '12px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
};

export function PregnancyMilestoneVisualizer() {
  const [mounted, setMounted] = useState(false);
  const [activeWeek, setActiveWeek] = useState<number>(20);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = FETAL_DATA.find((d) => d.week === activeWeek) || FETAL_DATA[3];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Fetal Growth Trajectory &amp; Gestation Curve
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            ACOG clinical fetal biometric benchmarks: Median fetal weight gain curve (grams) from Week 8 to Week 40
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
          ACOG Clinical Standards
        </span>
      </div>

      {/* Touch-Friendly Gestation Week Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Gestational Week Milestone:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {FETAL_DATA.map((d) => {
            const isSelected = activeWeek === d.week;
            return (
              <button
                key={d.week}
                type="button"
                onClick={() => setActiveWeek(d.week)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{d.fruitEmoji}</span>
                <span>Wk {d.week}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Recharts Interactive Area Chart (Fluid Width & Responsive Height) */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={FETAL_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="fetalWeightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}kg`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val) => [`${Number(val).toLocaleString()} g (${(Number(val) / 453.592).toFixed(1)} lbs)`, 'Fetal Weight']}
                labelFormatter={(label) => `Gestational ${label}`}
              />
              <Area
                type="monotone"
                dataKey="weightGrams"
                name="Weight"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#fetalWeightGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Selected Week Metrics Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Size Comparison</span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-xl">{cur.fruitEmoji}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{cur.fruit}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Estimated Weight</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {cur.weightGrams >= 1000 ? `${(cur.weightGrams / 1000).toFixed(2)} kg` : `${cur.weightGrams} g`}
            </span>
            <span className="text-xs text-slate-400 block font-normal">({cur.weightLbs} lbs)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Crown-to-Heel Length</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cur.lengthCm} cm</span>
            <span className="text-xs text-slate-400 block font-normal">({cur.lengthIn} in)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Trimester Stage</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 leading-tight block">{cur.trimester}</span>
            <span className="text-[10px] text-slate-400 block">Week {cur.week} of 40</span>
          </div>
        </div>
      </div>

      {/* Clinical Milestone Summary Box */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
          <span>🔬</span>
          <span>Week {cur.week} Developmental Milestone: {cur.milestoneTitle}</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
