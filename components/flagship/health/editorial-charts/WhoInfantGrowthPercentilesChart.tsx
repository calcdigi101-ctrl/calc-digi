'use client';

import React, { useState } from 'react';

interface GrowthMonth {
  month: number;
  boyP3: number;
  boyP50: number;
  boyP97: number;
  girlP3: number;
  girlP50: number;
  girlP97: number;
  milestone: string;
}

const WHO_GROWTH_DATA: GrowthMonth[] = [
  { month: 0, boyP3: 2.5, boyP50: 3.3, boyP97: 4.4, girlP3: 2.4, girlP50: 3.2, girlP97: 4.2, milestone: 'Birth weight; initial 5–10% physiological fluid weight drop regained by day 10–14.' },
  { month: 1, boyP3: 3.4, boyP50: 4.5, boyP97: 5.8, girlP3: 3.2, girlP50: 4.2, girlP97: 5.5, milestone: 'Rapid newborn growth phase; typical weight gain is 20–30 grams per day.' },
  { month: 2, boyP3: 4.3, boyP50: 5.6, boyP97: 7.1, girlP3: 3.9, girlP50: 5.1, girlP97: 6.6, milestone: 'Social smiling; head lifted 45 degrees prone; visual tracking active.' },
  { month: 3, boyP3: 5.0, boyP50: 6.4, boyP97: 8.0, girlP3: 4.5, girlP50: 5.8, girlP97: 7.5, milestone: 'Rolling prone to supine begins; vocal cooing and laugh emergence.' },
  { month: 4, boyP3: 5.6, boyP50: 7.0, boyP97: 8.7, girlP3: 5.0, girlP50: 6.4, girlP97: 8.2, milestone: 'Doubling of birth weight typically achieved between month 4 and 5.' },
  { month: 6, boyP3: 6.4, boyP50: 7.9, boyP97: 9.8, girlP3: 5.7, girlP50: 7.3, girlP97: 9.3, milestone: 'Sitting without support; introduction of iron-rich complementary solid foods (AAP standard).' },
  { month: 9, boyP3: 7.1, boyP50: 8.9, boyP97: 11.0, girlP3: 6.5, girlP50: 8.2, girlP97: 10.5, milestone: 'Crawling and pull-to-stand; pincer grasp development; separation anxiety emerges.' },
  { month: 12, boyP3: 7.7, boyP50: 9.6, boyP97: 12.0, girlP3: 7.0, girlP50: 8.9, girlP97: 11.5, milestone: 'First birthday: tripling of birth weight; first steps and first intentional words.' },
  { month: 15, boyP3: 8.3, boyP50: 10.3, boyP97: 12.8, girlP3: 7.6, girlP50: 9.6, girlP97: 12.4, milestone: 'Independent walking mastered; drinking from open cup; scribbling motion.' },
  { month: 18, boyP3: 8.8, boyP50: 10.9, boyP97: 13.7, girlP3: 8.1, girlP50: 10.2, girlP97: 13.2, milestone: 'Running, climbing stairs; vocabulary expands to 10–20 single words.' },
  { month: 21, boyP3: 9.2, boyP50: 11.5, boyP97: 14.5, girlP3: 8.6, girlP50: 10.9, girlP97: 14.0, milestone: 'Two-word phrase combinations; kicking ball; stacking 4 to 6 block towers.' },
  { month: 24, boyP3: 9.7, boyP50: 12.2, boyP97: 15.3, girlP3: 9.0, girlP50: 11.5, girlP97: 14.8, milestone: 'Two-year milestone: quadrupling of birth weight; approximately half of adult adult stature.' },
];

export function WhoInfantGrowthPercentilesChart() {
  const [activeIdx, setActiveIdx] = useState<number>(5); // 6 months default
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');

  const cur = WHO_GROWTH_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minMonth = 0;
  const maxMonth = 24;
  const maxKg = 16.5;

  const scaleX = (m: number) => padLeft + (m / maxMonth) * plotW;
  const scaleY = (kg: number) => padTop + plotH - (kg / maxKg) * plotH;

  const makePath = (field: 'boyP3' | 'boyP50' | 'boyP97' | 'girlP3' | 'girlP50' | 'girlP97') => {
    return WHO_GROWTH_DATA.map((d, i) => {
      const x = scaleX(d.month);
      const y = scaleY(d[field]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const p50Key = sex === 'boy' ? 'boyP50' : 'girlP50';
  const p3Key = sex === 'boy' ? 'boyP3' : 'girlP3';
  const p97Key = sex === 'boy' ? 'boyP97' : 'girlP97';

  const activeX = scaleX(cur.month);
  const activeY50 = scaleY(cur[p50Key]);
  const activeY3 = scaleY(cur[p3Key]);
  const activeY97 = scaleY(cur[p97Key]);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetMonth = ratio * maxMonth;

    let bestIdx = 0;
    let minDiff = 999;
    WHO_GROWTH_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.month - targetMonth);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  const fmtKgLbs = (kg: number) => `${kg.toFixed(1)} kg (${(kg * 2.20462).toFixed(1)} lbs)`;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'currentColor' }}>
            WHO Child Growth Standards (0 to 24 Months)
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'currentColor' }}>
            World Health Organization Multicentre Growth Reference Study: 3rd, 50th (median), and 97th percentiles.
          </p>
        </div>

        {/* Sex toggle */}
        <div style={{ display: 'flex', gap: '6px', background: 'currentColor', padding: '3px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setSex('boy')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: sex === 'boy' ? '#10b981' : 'transparent',
              color: sex === 'boy' ? '#ffffff' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            Boys Norms
          </button>
          <button
            type="button"
            onClick={() => setSex('girl')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: sex === 'girl' ? '#10b981' : 'transparent',
              color: sex === 'girl' ? '#ffffff' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            Girls Norms
          </button>
        </div>
      </div>

      {/* SVG Interactive Chart */}
      <div style={{ width: '100%', position: 'relative', touchAction: 'none' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block', cursor: 'ew-resize', userSelect: 'none' }}
          onPointerDown={handlePointer}
          onPointerMove={(e) => { if (e.pointerType === "touch" || e.buttons > 0) handlePointer(e); }}
          onPointerEnter={handlePointer}
        >
          {/* Grid lines */}
          {[4, 8, 12, 16].map((kg) => {
            const y = scaleY(kg);
            return (
              <g key={kg}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {kg}kg
                </text>
              </g>
            );
          })}

          {/* X Axis months */}
          {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((m) => {
            const x = scaleX(m);
            return (
              <g key={m}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {m}m
                </text>
              </g>
            );
          })}

          {/* Curves */}
          {/* 97th Percentile (Upper boundary) */}
          <path d={makePath(p97Key)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" strokeLinecap="round" />
          {/* 50th Percentile (Median) */}
          <path d={makePath(p50Key)} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
          {/* 3rd Percentile (Lower boundary) */}
          <path d={makePath(p3Key)} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" strokeLinecap="round" />

          {/* Active scrubber line */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Active Points */}
          <circle cx={activeX} cy={activeY97} r="4" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx={activeX} cy={activeY50} r="6.5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx={activeX} cy={activeY3} r="4" fill="#94a3b8" stroke="#ffffff" strokeWidth="1.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeY50, 110)})`}>
            <rect
              width="180"
              height="88"
              rx="8"
              fill="currentColor" stroke="#94a3b8" className="text-white dark:text-slate-900"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-white">
              Age: {cur.month} Months ({sex === 'boy' ? 'Boy' : 'Girl'})
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill="#10b981">
              50th Median: {fmtKgLbs(cur[p50Key])}
            </text>
            <text x="12" y="54" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              97th Percentile: {fmtKgLbs(cur[p97Key])}
            </text>
            <text x="12" y="70" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              3rd Percentile: {fmtKgLbs(cur[p3Key])}
            </text>
          </g>
        </svg>
      </div>

      {/* Scrub stats card */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: 'currentColor',
        border: '1px solid currentColor',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>WHO 50th Percentile Weight Target</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
            {fmtKgLbs(cur[p50Key])}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'currentColor' }}>
            Healthy normal range (3rd to 97th percentile): <strong style={{ color: 'currentColor' }}>{cur[p3Key].toFixed(1)} – {cur[p97Key].toFixed(1)} kg</strong>.
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pediatric Milestone at Month {cur.month}</span>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'currentColor', marginTop: '2px' }}>
            Developmental Benchmark
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'currentColor', lineHeight: 1.4 }}>
            {cur.milestone}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'currentColor' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> 50th Percentile (WHO Median)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#94a3b8' }} /> 3rd &amp; 97th Clinical Boundaries
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal axis to explore monthly infant weight trajectories.</span>
      </div>
    </div>
  );
}
