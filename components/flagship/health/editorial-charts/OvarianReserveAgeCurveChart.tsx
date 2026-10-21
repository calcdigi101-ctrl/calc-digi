'use client';

import React, { useState } from 'react';

interface FertilityAgePoint {
  age: number;
  monthlyFecundability: number; // % per cycle
  annualCumulative: number; // % after 12 cycles
  medianAmh: number; // ng/mL
  aneuploidyPct: number; // % chromosomal abnormalities
  clinicalCategory: string;
  actionGuideline: string;
  color: string;
}

const FERTILITY_DATA: FertilityAgePoint[] = [
  { age: 22, monthlyFecundability: 25, annualCumulative: 88, medianAmh: 3.8, aneuploidyPct: 15, clinicalCategory: 'Peak Biological Fertility', actionGuideline: 'Standard preconception care; evaluate if unassisted conception does not occur within 12 months.', color: '#10b981' },
  { age: 26, monthlyFecundability: 24, annualCumulative: 86, medianAmh: 3.2, aneuploidyPct: 18, clinicalCategory: 'Peak Biological Fertility', actionGuideline: 'High monthly fecundability; optimal oocyte mitochondrial competence.', color: '#10b981' },
  { age: 30, monthlyFecundability: 20, annualCumulative: 80, medianAmh: 2.6, aneuploidyPct: 22, clinicalCategory: 'High Normal Fertility', actionGuideline: 'Fertility remains robust; typical unassisted conception within 4 to 6 cycles.', color: '#059669' },
  { age: 33, monthlyFecundability: 16, annualCumulative: 72, medianAmh: 2.0, aneuploidyPct: 28, clinicalCategory: 'Mild Gradual Decline', actionGuideline: 'Fertility begins gradual downward slope; evaluate after 12 months of timed intercourse.', color: '#0ea5e9' },
  { age: 35, monthlyFecundability: 12, annualCumulative: 62, medianAmh: 1.5, aneuploidyPct: 35, clinicalCategory: 'Clinical Inflection Point (ASRM)', actionGuideline: 'ASRM guideline: Seek reproductive evaluation if conception has not occurred after 6 months.', color: '#f59e0b' },
  { age: 37, monthlyFecundability: 9, annualCumulative: 52, medianAmh: 1.1, aneuploidyPct: 45, clinicalCategory: 'Accelerated Ovarian Decline', actionGuideline: 'Rapid drop in primordial follicle pool; evaluate AMH and AFC ovarian reserve promptly.', color: '#ea580c' },
  { age: 40, monthlyFecundability: 5, annualCumulative: 36, medianAmh: 0.7, aneuploidyPct: 62, clinicalCategory: 'Diminished Ovarian Reserve', actionGuideline: 'Immediate consultation with a reproductive endocrinologist; consider IVF with PGT-A.', color: '#dc2626' },
  { age: 42, monthlyFecundability: 3, annualCumulative: 20, medianAmh: 0.4, aneuploidyPct: 75, clinicalCategory: 'Marked Reproductive Decline', actionGuideline: 'High rate of meiotic chromosomal nondisjunction; donor oocyte discussion if indicated.', color: '#991b1b' },
  { age: 45, monthlyFecundability: 1, annualCumulative: 5, medianAmh: 0.15, aneuploidyPct: 88, clinicalCategory: 'Extreme Low Fecundability', actionGuideline: 'Natural spontaneous conception is rare; donor oocytes provide highest live-birth success.', color: '#7f1d1d' },
];

export function OvarianReserveAgeCurveChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // Age 35 default

  const cur = FERTILITY_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minAge = 22;
  const maxAge = 45;
  const maxRate = 100;

  const scaleX = (a: number) => padLeft + ((a - minAge) / (maxAge - minAge)) * plotW;
  const scaleY = (val: number) => padTop + plotH - (val / maxRate) * plotH;

  const fecundabilityPath = FERTILITY_DATA.map((d, i) => {
    const x = scaleX(d.age);
    const y = scaleY(d.monthlyFecundability);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const cumulativePath = FERTILITY_DATA.map((d, i) => {
    const x = scaleX(d.age);
    const y = scaleY(d.annualCumulative);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.age);
  const activeYFecund = scaleY(cur.monthlyFecundability);
  const activeYCumulative = scaleY(cur.annualCumulative);

  const inflectionX = scaleX(35);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetAge = minAge + ratio * (maxAge - minAge);

    let bestIdx = 0;
    let minDiff = 999;
    FERTILITY_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.age - targetAge);
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
            Maternal Age vs. Conception Probabilities &amp; Ovarian Reserve
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Comparing monthly cycle fecundability and 12-month cumulative pregnancy rates calibrated to ASRM epidemiological data.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[26, 30, 35, 38, 40].map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => {
                const idx = FERTILITY_DATA.findIndex((d) => d.age === age);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.age === age ? 'var(--c-accent)' : 'var(--c-surface)',
                color: cur.age === age ? '#ffffff' : 'var(--c-ink)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              Age {age}
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
          {/* Age 35 inflection guideline */}
          <line
            x1={inflectionX}
            y1={padTop}
            x2={inflectionX}
            y2={padTop + plotH}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text x={inflectionX} y={padTop - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#f59e0b">
            Age 35 Inflection
          </text>

          {/* Grid lines */}
          {[25, 50, 75, 100].map((pct) => {
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

          {/* X Axis ages */}
          {FERTILITY_DATA.map((pt) => {
            const x = scaleX(pt.age);
            return (
              <g key={pt.age}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  {pt.age}y
                </text>
              </g>
            );
          })}

          {/* 12-Month Cumulative Pregnancy Rate (Blue) */}
          <path d={cumulativePath} fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

          {/* Monthly Fecundability Rate (Emerald Green) */}
          <path d={fecundabilityPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

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

          {/* Active Points */}
          <circle cx={activeX} cy={activeYCumulative} r="5" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYFecund} r="6.5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeYFecund, 110)})`}>
            <rect
              width="180"
              height="88"
              rx="8"
              fill="var(--c-surface)"
              stroke="var(--c-rule)"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="var(--c-ink)">
              Maternal Age: {cur.age} Years
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill="#10b981">
              Monthly Odds: {cur.monthlyFecundability}% / cycle
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#0ea5e9">
              1-Year Cumulative: {cur.annualCumulative}%
            </text>
            <text x="12" y="70" fontSize="10" fill="var(--c-ink2)">
              AMH Median: {cur.medianAmh} ng/mL
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
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Clinical Fertility Stratification</span>
          <div style={{ fontSize: '15px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            Age {cur.age}: {cur.clinicalCategory}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            {cur.actionGuideline}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Ovarian Reserve &amp; Chromosomal Risk</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--c-ink)', marginTop: '2px' }}>
            AMH: ~{cur.medianAmh} ng/mL • Aneuploidy: ~{cur.aneuploidyPct}%
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Estimated 12-month cumulative pregnancy rate: <strong style={{ color: '#0ea5e9' }}>{cur.annualCumulative}%</strong> under regular timed intercourse.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Monthly Fecundability (% per cycle)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0ea5e9' }} /> 12-Month Cumulative Pregnancy Rate (%)
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal axis to explore age-related reproductive curves.</span>
      </div>
    </div>
  );
}
