'use client';

import React, { useState } from 'react';

interface CyclePoint {
  cycleDays: number;
  frequencyPct: number; // population percentage
  figoCategory: string;
  follicularDays: number;
  annualCycles: number;
  clinicalNote: string;
  color: string;
}

const CYCLE_DISTRIBUTION: CyclePoint[] = [
  { cycleDays: 21, frequencyPct: 1.5, figoCategory: 'Frequent Menses (Polymenorrhea)', follicularDays: 7, annualCycles: 17.4, clinicalNote: 'Cycle < 24 days; screen for luteal phase defect, perimenopause, or hyperthyroidism.', color: '#ef4444' },
  { cycleDays: 23, frequencyPct: 4.2, figoCategory: 'Borderline Short Cycle', follicularDays: 9, annualCycles: 15.9, clinicalNote: 'Just below typical threshold; monitor for cycle-to-cycle consistency.', color: '#f59e0b' },
  { cycleDays: 25, frequencyPct: 11.8, figoCategory: 'Normal Physiological Range (FIGO)', follicularDays: 11, annualCycles: 14.6, clinicalNote: 'Healthy ovulatory cycle with early follicular recruitment.', color: '#10b981' },
  { cycleDays: 27, frequencyPct: 22.4, figoCategory: 'Normal Physiological Range (FIGO)', follicularDays: 13, annualCycles: 13.5, clinicalNote: 'Optimal cycle length; high probability of spontaneous ovulatory regularity.', color: '#059669' },
  { cycleDays: 28, frequencyPct: 27.5, figoCategory: 'Global Population Median (FIGO)', follicularDays: 14, annualCycles: 13.0, clinicalNote: 'Textbook 28-day cycle; classic 14-day follicular and 14-day luteal split.', color: '#059669' },
  { cycleDays: 30, frequencyPct: 16.3, figoCategory: 'Normal Physiological Range (FIGO)', follicularDays: 16, annualCycles: 12.2, clinicalNote: 'Healthy ovulatory cycle; ovulation occurs on approximately Day 16.', color: '#10b981' },
  { cycleDays: 32, frequencyPct: 8.7, figoCategory: 'Normal Physiological Range (FIGO)', follicularDays: 18, annualCycles: 11.4, clinicalNote: 'Slightly extended follicular phase; fully within healthy physiological bounds.', color: '#10b981' },
  { cycleDays: 35, frequencyPct: 4.5, figoCategory: 'Normal Upper Boundary (FIGO)', follicularDays: 21, annualCycles: 10.4, clinicalNote: 'Approaching upper normal threshold; ovulation occurs around Day 21.', color: '#0ea5e9' },
  { cycleDays: 38, frequencyPct: 2.1, figoCategory: 'Upper FIGO Normal Cutoff', follicularDays: 24, annualCycles: 9.6, clinicalNote: 'The 38-day boundary; cycles extending further suggest delayed follicular selection.', color: '#f59e0b' },
  { cycleDays: 42, frequencyPct: 1.0, figoCategory: 'Infrequent Menses (Oligomenorrhea)', follicularDays: 28, annualCycles: 8.7, clinicalNote: 'Cycle > 38 days; clinical evaluation recommended for PCOS, hyperprolactinemia, or hypothalamic amenorrhea.', color: '#ef4444' },
];

export function CycleLengthVariabilitySpectrumChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // 28 days default

  const cur = CYCLE_DISTRIBUTION[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minDays = 21;
  const maxDays = 42;
  const maxFreq = 30;

  const scaleX = (d: number) => padLeft + ((d - minDays) / (maxDays - minDays)) * plotW;
  const scaleY = (pct: number) => padTop + plotH - (pct / maxFreq) * plotH;

  const bellCurvePath = CYCLE_DISTRIBUTION.map((d, i) => {
    const x = scaleX(d.cycleDays);
    const y = scaleY(d.frequencyPct);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.cycleDays);
  const activeY = scaleY(cur.frequencyPct);

  const normalStartX = scaleX(24);
  const normalEndX = scaleX(38);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetDays = minDays + ratio * (maxDays - minDays);

    let bestIdx = 0;
    let minDiff = 999;
    CYCLE_DISTRIBUTION.forEach((pt, i) => {
      const diff = Math.abs(pt.cycleDays - targetDays);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  return (
    <div style={{
      margin: '28px 0',
      padding: '24px',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '1px solid var(--c-rule)',
      backgroundColor: 'var(--c-rule2)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--c-ink)' }}>
            Menstrual Cycle Length Population Distribution
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Calibrated to FIGO menstrual parameters and Nature Digital Medicine datasets (24–38 days clinical normal range).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[21, 25, 28, 32, 42].map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => {
                const idx = CYCLE_DISTRIBUTION.findIndex((d) => d.cycleDays === days);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.cycleDays === days ? 'var(--c-accent)' : 'var(--c-surface)',
                color: cur.cycleDays === days ? '#ffffff' : 'var(--c-ink)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              {days} Days
            </button>
          ))}
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
          {/* Normal FIGO Range Highlight (24 to 38 days) */}
          <rect
            x={normalStartX}
            y={padTop}
            width={normalEndX - normalStartX}
            height={plotH}
            fill="#10b981"
            fillOpacity="0.08"
          />
          <text
            x={(normalStartX + normalEndX) / 2}
            y={padTop + 14}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#059669"
          >
            FIGO Normal Range (24–38 Days)
          </text>

          {/* Grid lines */}
          {[10, 20, 30].map((pct) => {
            const y = scaleY(pct);
            return (
              <g key={pct}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="var(--c-rule)" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--c-ink3)">
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* X Axis days */}
          {CYCLE_DISTRIBUTION.map((pt) => {
            const x = scaleX(pt.cycleDays);
            return (
              <g key={pt.cycleDays}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  {pt.cycleDays}d
                </text>
              </g>
            );
          })}

          {/* Distribution Curve */}
          <path d={bellCurvePath} fill="none" stroke="var(--c-accent)" strokeWidth="3.5" strokeLinecap="round" />

          {/* Active scrubber line */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="var(--c-ink)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Active Point */}
          <circle cx={activeX} cy={activeY} r="6.5" fill={cur.color} stroke="#ffffff" strokeWidth="2.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${Math.min(activeY, 110)})`}>
            <rect
              width="170"
              height="88"
              rx="8"
              fill="var(--c-surface)"
              stroke="var(--c-rule)"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="var(--c-ink)">
              Cycle Length: {cur.cycleDays} Days
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill={cur.color}>
              Frequency: {cur.frequencyPct}% of Women
            </text>
            <text x="12" y="54" fontSize="10" fontWeight="600" fill="#0ea5e9">
              Ovulation: ~Day {cur.follicularDays}
            </text>
            <text x="12" y="70" fontSize="10" fill="var(--c-ink2)">
              Annual Periods: {cur.annualCycles.toFixed(1)} / yr
            </text>
          </g>
        </svg>
      </div>

      {/* Scrub stats card */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: 'var(--c-surface)',
        border: '1px solid var(--c-rule)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>FIGO Menstrual Classification</span>
          <div style={{ fontSize: '15px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            {cur.figoCategory}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            {cur.clinicalNote}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Follicular &amp; Luteal Architecture</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
            {cur.follicularDays} Days Follicular • 14 Days Luteal
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Corresponds to an average of <strong>{cur.annualCycles.toFixed(1)} menstrual cycles</strong> per calendar year.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981', opacity: 0.3 }} /> Normal Range (24–38 Days)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--c-accent)' }} /> Population Frequency Curve
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal curve to explore cycle length norms.</span>
      </div>
    </div>
  );
}
