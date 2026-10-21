'use client';

import React, { useState } from 'react';

interface BacTimelinePoint {
  hour: number;
  bac: number;
  impairmentStage: string;
  drivingLegal: 'Safe / Legal' | 'Impaired / Warning' | 'Illegal (Over 0.08%)' | 'Severely Intoxicated';
  neurologicalStatus: string;
  color: string;
}

const BAC_TIMELINE: BacTimelinePoint[] = [
  { hour: 0.0, bac: 0.000, impairmentStage: 'Baseline Sober', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Unimpaired central nervous function.', color: '#10b981' },
  { hour: 0.5, bac: 0.065, impairmentStage: 'Rapid Absorption Phase', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Prefrontal inhibition lowered; reaction time begins to lag.', color: '#f59e0b' },
  { hour: 1.0, bac: 0.105, impairmentStage: 'Peak Intoxication', drivingLegal: 'Illegal (Over 0.08%)', neurologicalStatus: 'Slurred speech, impaired balance, slowed cognitive processing.', color: '#ef4444' },
  { hour: 2.0, bac: 0.090, impairmentStage: 'Active Hepatic Elimination', drivingLegal: 'Illegal (Over 0.08%)', neurologicalStatus: 'Motor coordination visibly compromised; over 0.08% statutory limit.', color: '#ef4444' },
  { hour: 3.0, bac: 0.075, impairmentStage: 'Sub-Threshold Impairment', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Reaction time slowed by 30%; driving judgment significantly compromised.', color: '#ea580c' },
  { hour: 4.0, bac: 0.060, impairmentStage: 'Moderate Elimination', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Mild euphoria fading into fatigue; visual tracking still degraded.', color: '#f59e0b' },
  { hour: 5.0, bac: 0.045, impairmentStage: 'Mild Residual Impairment', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Subtle motor ataxia remains; hangover metabolic byproducts accumulating.', color: '#eab308' },
  { hour: 6.0, bac: 0.030, impairmentStage: 'Low Residual Alcohol', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Minimal central sedation; acetaldehyde clearance underway.', color: '#0ea5e9' },
  { hour: 7.0, bac: 0.015, impairmentStage: 'Trace Concentrations', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Approaching full sobriety; subtle sleep quality disruption persists.', color: '#059669' },
  { hour: 8.0, bac: 0.000, impairmentStage: 'Complete Sobriety (0.00% BAC)', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Complete hepatic elimination of ethanol from blood.', color: '#10b981' },
  { hour: 10.0, bac: 0.000, impairmentStage: 'Post-Elimination Hangover', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Ethanol cleared; potential dehydration, electrolyte deficit, and sleep debt.', color: '#10b981' },
];

export function BacMetabolismEliminationChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // 1.0 hr peak default

  const cur = BAC_TIMELINE[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minHour = 0;
  const maxHour = 10;
  const minBac = 0.0;
  const maxBac = 0.13;

  const scaleX = (h: number) => padLeft + (h / maxHour) * plotW;
  const scaleY = (b: number) => padTop + plotH - (b / maxBac) * plotH;

  const bacCurvePath = BAC_TIMELINE.map((d, i) => {
    const x = scaleX(d.hour);
    const y = scaleY(d.bac);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.hour);
  const activeY = scaleY(cur.bac);
  const legalLimitY = scaleY(0.08);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetHour = ratio * maxHour;

    let bestIdx = 0;
    let minDiff = 999;
    BAC_TIMELINE.forEach((pt, i) => {
      const diff = Math.abs(pt.hour - targetHour);
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
      border: '1px solid var(--c-rule)',
      backgroundColor: 'var(--c-rule2)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--c-ink)' }}>
            Widmark Zero-Order Hepatic Elimination Curve
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Pharmacokinetic model for 4 standard drinks consumed over 1 hour in a 170 lb adult (metabolic clearance rate: ~0.015% BAC/hour).
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[1, 3, 5, 8].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                const idx = BAC_TIMELINE.findIndex((d) => d.hour === h);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.hour === h ? 'var(--c-accent)' : 'var(--c-surface)',
                color: cur.hour === h ? '#ffffff' : 'var(--c-ink)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              Hour {h}
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
          {/* Y Axis Grid */}
          {[0.00, 0.04, 0.08, 0.12].map((b) => {
            const y = scaleY(b);
            return (
              <g key={b}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="var(--c-rule)" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--c-ink3)">
                  {b.toFixed(2)}%
                </text>
              </g>
            );
          })}

          {/* Legal Limit 0.08% Reference Line */}
          <line
            x1={padLeft}
            y1={legalLimitY}
            x2={svgWidth - padRight}
            y2={legalLimitY}
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text x={svgWidth - padRight} y={legalLimitY - 6} textAnchor="end" fontSize="10" fontWeight="700" fill="#ef4444">
            0.08% Legal Driving Limit
          </text>

          {/* X Axis Time (Hours) */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 10].map((h) => {
            const x = scaleX(h);
            return (
              <g key={h}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  {h}h
                </text>
              </g>
            );
          })}

          {/* BAC Curve */}
          <path d={bacCurvePath} fill="none" stroke="var(--c-accent)" strokeWidth="3.5" strokeLinecap="round" />

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
              Elapsed: {cur.hour} Hours
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill={cur.color}>
              BAC: {cur.bac.toFixed(3)}%
            </text>
            <text x="12" y="54" fontSize="10" fontWeight="600" fill={cur.bac >= 0.08 ? '#ef4444' : '#10b981'}>
              Driving: {cur.drivingLegal}
            </text>
            <text x="12" y="70" fontSize="9" fill="var(--c-ink2)">
              {cur.impairmentStage}
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
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estimated Blood Alcohol (BAC)</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: cur.color, marginTop: '2px' }}>
            {cur.bac.toFixed(3)}%
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            {cur.impairmentStage}: {cur.neurologicalStatus}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Legal Driving Compliance</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: cur.bac >= 0.08 ? '#ef4444' : '#10b981', marginTop: '2px' }}>
            {cur.drivingLegal}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Zero-order liver clearance degrades ethanol at a constant rate of ~0.015% per hour. Neither coffee, cold showers, nor exercise speeds this enzymatic bottleneck.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--c-accent)' }} /> Elimination Curve (0.015%/hr)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} /> 0.08% DUI Threshold
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal axis to inspect hourly sobriety clearance.</span>
      </div>
    </div>
  );
}
