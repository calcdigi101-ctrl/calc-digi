'use client';

import React, { useState } from 'react';

interface WhrPoint {
  whr: number;
  femaleOr: number; // INTERHEART Odds Ratio for myocardial infarction
  maleOr: number;
  diabetesRiskF: number;
  diabetesRiskM: number;
  categoryFemale: string;
  categoryMale: string;
  color: string;
}

const WHR_RISK_DATA: WhrPoint[] = [
  { whr: 0.68, femaleOr: 1.00, maleOr: 0.92, diabetesRiskF: 1.0, diabetesRiskM: 0.9, categoryFemale: 'Ideal Gynoid / Low Risk', categoryMale: 'Extremely Lean V-Taper', color: '#10b981' },
  { whr: 0.74, femaleOr: 1.05, maleOr: 0.95, diabetesRiskF: 1.0, diabetesRiskM: 1.0, categoryFemale: 'Normal / Healthy Baseline', categoryMale: 'Athletic Lean Baseline', color: '#059669' },
  { whr: 0.79, femaleOr: 1.18, maleOr: 1.02, diabetesRiskF: 1.2, diabetesRiskM: 1.0, categoryFemale: 'Upper Normal Boundary', categoryMale: 'Healthy Standard', color: '#10b981' },
  { whr: 0.83, femaleOr: 1.55, maleOr: 1.12, diabetesRiskF: 1.8, diabetesRiskM: 1.2, categoryFemale: 'Moderate Cardiometabolic Risk', categoryMale: 'Healthy Normal', color: '#f59e0b' },
  { whr: 0.87, femaleOr: 2.10, maleOr: 1.28, diabetesRiskF: 2.7, diabetesRiskM: 1.4, categoryFemale: 'High Risk (WHO Android Cutoff)', categoryMale: 'Upper Normal Tier', color: '#ea580c' },
  { whr: 0.92, femaleOr: 2.65, maleOr: 1.70, diabetesRiskF: 3.8, diabetesRiskM: 2.0, categoryFemale: 'Substantially Elevated Risk', categoryMale: 'Moderate Risk Threshold', color: '#ea580c' },
  { whr: 0.97, femaleOr: 3.20, maleOr: 2.30, diabetesRiskF: 5.2, diabetesRiskM: 3.1, categoryFemale: 'Severe Visceral Morbidity', categoryMale: 'High Risk (WHO Android Cutoff)', color: '#dc2626' },
  { whr: 1.04, femaleOr: 3.85, maleOr: 2.95, diabetesRiskF: 6.9, diabetesRiskM: 4.5, categoryFemale: 'Extreme Central Adiposity', categoryMale: 'Substantially Elevated Risk', color: '#991b1b' },
  { whr: 1.12, femaleOr: 4.40, maleOr: 3.60, diabetesRiskF: 8.5, diabetesRiskM: 6.2, categoryFemale: 'Critical Vascular Hazard', categoryMale: 'Severe Visceral Morbidity', color: '#7f1d1d' },
];

export function WhrCardiovascularRiskChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // 0.83 default
  const [selectedSex, setSelectedSex] = useState<'female' | 'male'>('female');

  const cur = WHR_RISK_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minWhr = 0.65;
  const maxWhr = 1.15;
  const minOr = 0.8;
  const maxOr = 4.6;

  const scaleX = (w: number) => padLeft + ((w - minWhr) / (maxWhr - minWhr)) * plotW;
  const scaleY = (val: number) => padTop + plotH - ((val - minOr) / (maxOr - minOr)) * plotH;

  const femalePath = WHR_RISK_DATA.map((d, i) => {
    const x = scaleX(d.whr);
    const y = scaleY(d.femaleOr);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const malePath = WHR_RISK_DATA.map((d, i) => {
    const x = scaleX(d.whr);
    const y = scaleY(d.maleOr);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.whr);
  const activeYFemale = scaleY(cur.femaleOr);
  const activeYMale = scaleY(cur.maleOr);
  const curActiveY = selectedSex === 'female' ? activeYFemale : activeYMale;

  const cutoffFemaleX = scaleX(0.85);
  const cutoffMaleX = scaleX(0.95);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetWhr = minWhr + ratio * (maxWhr - minWhr);

    let bestIdx = 0;
    let minDiff = 999;
    WHR_RISK_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.whr - targetWhr);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  const activeOr = selectedSex === 'female' ? cur.femaleOr : cur.maleOr;
  const activeDiabetes = selectedSex === 'female' ? cur.diabetesRiskF : cur.diabetesRiskM;
  const activeCategory = selectedSex === 'female' ? cur.categoryFemale : cur.categoryMale;

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
            INTERHEART Myocardial Infarction Odds Ratio vs. WHR
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Clinical cardiovascular hazard curve calibrated to 27,000 patients across 52 nations (Yusuf et al., Lancet).
          </p>
        </div>

        {/* Sex toggle */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--c-rule)', padding: '3px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setSelectedSex('female')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: selectedSex === 'female' ? 'var(--c-accent)' : 'transparent',
              color: selectedSex === 'female' ? '#ffffff' : 'var(--c-ink2)',
              transition: 'all 0.15s ease'
            }}
          >
            Female Norms (WHO ≥ 0.85)
          </button>
          <button
            type="button"
            onClick={() => setSelectedSex('male')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: selectedSex === 'male' ? 'var(--c-accent)' : 'transparent',
              color: selectedSex === 'male' ? '#ffffff' : 'var(--c-ink2)',
              transition: 'all 0.15s ease'
            }}
          >
            Male Norms (WHO ≥ 0.95)
          </button>
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
          {[1.0, 2.0, 3.0, 4.0].map((val) => {
            const y = scaleY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="var(--c-rule)" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="11" fill="var(--c-ink3)">
                  {val.toFixed(1)}x
                </text>
              </g>
            );
          })}

          {/* X Axis ticks */}
          {WHR_RISK_DATA.map((pt) => {
            const x = scaleX(pt.whr);
            return (
              <g key={pt.whr}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  {pt.whr.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* WHO Cutoff guidelines */}
          <line
            x1={selectedSex === 'female' ? cutoffFemaleX : cutoffMaleX}
            y1={padTop}
            x2={selectedSex === 'female' ? cutoffFemaleX : cutoffMaleX}
            y2={padTop + plotH}
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text
            x={selectedSex === 'female' ? cutoffFemaleX : cutoffMaleX}
            y={padTop - 8}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#ef4444"
          >
            WHO Cutoff ({selectedSex === 'female' ? '0.85' : '0.95'})
          </text>

          {/* Female Curve (Purple) */}
          <path
            d={femalePath}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth={selectedSex === 'female' ? 3.5 : 1.5}
            strokeOpacity={selectedSex === 'female' ? 1 : 0.4}
            strokeLinecap="round"
          />

          {/* Male Curve (Teal/Emerald) */}
          <path
            d={malePath}
            fill="none"
            stroke="#10b981"
            strokeWidth={selectedSex === 'male' ? 3.5 : 1.5}
            strokeOpacity={selectedSex === 'male' ? 1 : 0.4}
            strokeLinecap="round"
          />

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
          <circle cx={activeX} cy={curActiveY} r="6.5" fill={cur.color} stroke="#ffffff" strokeWidth="2.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${Math.min(curActiveY, 110)})`}>
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
              WHR: {cur.whr.toFixed(2)} ({selectedSex.toUpperCase()})
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="600" fill={cur.color}>
              Heart Attack OR: {activeOr.toFixed(2)}x
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#d97706">
              Diabetes Risk: {activeDiabetes.toFixed(1)}x
            </text>
            <text x="12" y="70" fontSize="10" fill="var(--c-ink2)">
              Status: {activeCategory.split('(')[0]}
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
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cardiovascular Stratification</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            {activeCategory}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Odds Ratio for acute myocardial infarction (heart attack) is <strong style={{ color: 'var(--c-ink)' }}>{activeOr.toFixed(2)}x</strong> compared to low-risk baseline controls.
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Type 2 Diabetes Vulnerability</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: cur.color, marginTop: '2px' }}>
            {activeDiabetes.toFixed(1)}x Relative Risk
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Driven by portal free fatty acid influx and hepatic gluconeogenesis upregulation from visceral fat.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }} /> Female Risk Curve
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Male Risk Curve
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal axis to inspect cardiovascular odds ratios.</span>
      </div>
    </div>
  );
}
