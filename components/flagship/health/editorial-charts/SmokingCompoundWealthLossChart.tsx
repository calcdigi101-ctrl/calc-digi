'use client';

import React, { useState } from 'react';

interface WealthLossPoint {
  year: number;
  directCash: number;
  compoundedWealth: number;
  cigsSmoked: number;
  healthMilestone: string;
}

const WEALTH_DATA: WealthLossPoint[] = [
  { year: 1, directCash: 3285, compoundedWealth: 3515, cigsSmoked: 7300, healthMilestone: 'Excess coronary heart disease risk drops to half that of a continuing smoker.' },
  { year: 2, directCash: 6570, compoundedWealth: 7276, cigsSmoked: 14600, healthMilestone: 'Arterial endothelial function restored; peripheral circulation normalized.' },
  { year: 3, directCash: 9855, compoundedWealth: 11300, cigsSmoked: 21900, healthMilestone: 'Risk of myocardial infarction drops by over 60% compared to baseline.' },
  { year: 5, directCash: 16425, compoundedWealth: 20210, cigsSmoked: 36500, healthMilestone: 'Stroke risk plummets to equal that of a lifetime non-smoker.' },
  { year: 7, directCash: 22995, compoundedWealth: 31050, cigsSmoked: 51100, healthMilestone: 'Substantial decline in oral, laryngeal, and esophageal cancer risks.' },
  { year: 10, directCash: 32850, compoundedWealth: 48600, cigsSmoked: 73000, healthMilestone: 'Lung cancer mortality rate drops to half that of a continuing smoker; pre-cancerous lesions repaired.' },
  { year: 15, directCash: 49275, compoundedWealth: 82500, cigsSmoked: 109500, healthMilestone: 'Coronary heart disease risk drops to equivalent level of an individual who never smoked.' },
  { year: 20, directCash: 65700, compoundedWealth: 134600, cigsSmoked: 146000, healthMilestone: 'Life expectancy extended by up to a full decade compared to continued smoking.' },
  { year: 25, directCash: 82125, compoundedWealth: 207700, cigsSmoked: 182500, healthMilestone: 'Total systemic recovery from tobacco toxicant exposure.' },
  { year: 30, directCash: 98550, compoundedWealth: 310300, cigsSmoked: 219000, healthMilestone: 'Over $310,000 in compounded retirement security preserved.' },
];

export function SmokingCompoundWealthLossChart() {
  const [activeIdx, setActiveIdx] = useState<number>(5); // 10 years default

  const cur = WEALTH_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 65;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minYear = 1;
  const maxYear = 30;
  const minVal = 0;
  const maxVal = 320000;

  const scaleX = (yr: number) => padLeft + ((yr - minYear) / (maxYear - minYear)) * plotW;
  const scaleY = (val: number) => padTop + plotH - (val / maxVal) * plotH;

  const directPath = WEALTH_DATA.map((d, i) => {
    const x = scaleX(d.year);
    const y = scaleY(d.directCash);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const compoundPath = WEALTH_DATA.map((d, i) => {
    const x = scaleX(d.year);
    const y = scaleY(d.compoundedWealth);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.year);
  const activeYDirect = scaleY(cur.directCash);
  const activeYCompound = scaleY(cur.compoundedWealth);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetYr = minYear + ratio * (maxYear - minYear);

    let bestIdx = 0;
    let minDiff = 999;
    WEALTH_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.year - targetYr);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  const fmtCurrency = (num: number) => `$${num.toLocaleString()}`;

  return (
    <div style={{
      margin: '28px 0',
      padding: '24px',
      borderRadius: '16px',
      border: '1px solid var(--c-rule)',
      backgroundColor: 'var(--c-rule2)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--c-ink)' }}>
            Direct Cash Spent vs. Compounded Investment Opportunity Cost
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Comparing cumulative cigarette purchases ($9/pack, 1 pack/day) against an index fund compounding at 7% annual S&amp;P 500 returns.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[5, 10, 20, 30].map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => {
                const idx = WEALTH_DATA.findIndex((d) => d.year === yr);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.year === yr ? 'var(--c-accent)' : 'var(--c-surface)',
                color: cur.year === yr ? '#ffffff' : 'var(--c-ink)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              Year {yr}
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
          onPointerMove={(e) => { if (e.buttons > 0) handlePointer(e); }}
          onPointerEnter={handlePointer}
        >
          {/* Grid lines */}
          {[50000, 100000, 200000, 300000].map((val) => {
            const y = scaleY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="var(--c-rule)" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--c-ink3)">
                  ${val / 1000}k
                </text>
              </g>
            );
          })}

          {/* X Axis years */}
          {WEALTH_DATA.map((pt) => {
            const x = scaleX(pt.year);
            return (
              <g key={pt.year}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  Yr {pt.year}
                </text>
              </g>
            );
          })}

          {/* Direct Cash Curve (Red dashed) */}
          <path d={directPath} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />

          {/* Compound Wealth Opportunity Curve (Emerald green) */}
          <path d={compoundPath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

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
          <circle cx={activeX} cy={activeYDirect} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYCompound} r="6.5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeYCompound, 110)})`}>
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
              Year {cur.year} Opportunity
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill="#10b981">
              Invested Savings: {fmtCurrency(cur.compoundedWealth)}
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#ef4444">
              Direct Cash Burned: {fmtCurrency(cur.directCash)}
            </text>
            <text x="12" y="70" fontSize="10" fill="var(--c-ink2)">
              Cigarettes: {cur.cigsSmoked.toLocaleString()} avoided
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
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>7% Compounded Opportunity Cost</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
            {fmtCurrency(cur.compoundedWealth)}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--c-ink2)' }}>
            Direct cash burned: <strong style={{ color: '#ef4444' }}>{fmtCurrency(cur.directCash)}</strong> ({cur.cigsSmoked.toLocaleString()} cigarettes).
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>CDC Health Recovery Milestone</span>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--c-ink)', marginTop: '2px' }}>
            Year {cur.year} Physiological Status
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            {cur.healthMilestone}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> S&amp;P 500 Compounded Wealth (7% return)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} /> Cumulative Direct Cash Spent
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal axis to explore 30-year wealth projection.</span>
      </div>
    </div>
  );
}
