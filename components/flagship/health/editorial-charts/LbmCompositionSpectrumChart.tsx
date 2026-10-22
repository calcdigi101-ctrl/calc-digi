'use client';

import React, { useState } from 'react';

interface LbmPoint {
  bfPct: number;
  leanMassLbs: number;
  fatMassLbs: number;
  leanMassKg: number;
  fatMassKg: number;
  ffmi: number;
  categoryMale: string;
  categoryFemale: string;
  color: string;
}

const LBM_SPECTRUM: LbmPoint[] = [
  { bfPct: 6, leanMassLbs: 164.5, fatMassLbs: 10.5, leanMassKg: 74.6, fatMassKg: 4.8, ffmi: 23.5, categoryMale: 'Stage Lean / Essential', categoryFemale: 'Critical Deficit (Amenorrhea risk)', color: '#ef4444' },
  { bfPct: 8, leanMassLbs: 161.0, fatMassLbs: 14.0, leanMassKg: 73.0, fatMassKg: 6.4, ffmi: 23.0, categoryMale: 'Elite Athlete / Competition', categoryFemale: 'Severe Deficit', color: '#f97316' },
  { bfPct: 10, leanMassLbs: 157.5, fatMassLbs: 17.5, leanMassKg: 71.4, fatMassKg: 7.9, ffmi: 22.5, categoryMale: 'Athletic / Striated', categoryFemale: 'Athletic Stage Lean', color: '#eab308' },
  { bfPct: 12, leanMassLbs: 154.0, fatMassLbs: 21.0, leanMassKg: 69.9, fatMassKg: 9.5, ffmi: 22.0, categoryMale: 'Lean Fitness / Defined Abs', categoryFemale: 'Endurance Athlete', color: '#10b981' },
  { bfPct: 14, leanMassLbs: 150.5, fatMassLbs: 24.5, leanMassKg: 68.3, fatMassKg: 11.1, ffmi: 21.5, categoryMale: 'Healthy Athletic', categoryFemale: 'Fitness / Lean Athlete', color: '#059669' },
  { bfPct: 16, leanMassLbs: 147.0, fatMassLbs: 28.0, leanMassKg: 66.7, fatMassKg: 12.7, ffmi: 21.0, categoryMale: 'Healthy Standard', categoryFemale: 'Optimal Fitness', color: '#0284c7' },
  { bfPct: 18, leanMassLbs: 143.5, fatMassLbs: 31.5, leanMassKg: 65.1, fatMassKg: 14.3, ffmi: 20.5, categoryMale: 'Moderate Fitness', categoryFemale: 'Healthy Standard', color: '#0284c7' },
  { bfPct: 21, leanMassLbs: 138.3, fatMassLbs: 36.7, leanMassKg: 62.7, fatMassKg: 16.6, ffmi: 19.8, categoryMale: 'Acceptable Baseline', categoryFemale: 'Healthy Baseline', color: '#6366f1' },
  { bfPct: 24, leanMassLbs: 133.0, fatMassLbs: 42.0, leanMassKg: 60.3, fatMassKg: 19.1, ffmi: 19.0, categoryMale: 'Borderline Overfat', categoryFemale: 'Acceptable Moderate', color: '#d97706' },
  { bfPct: 28, leanMassLbs: 126.0, fatMassLbs: 49.0, leanMassKg: 57.2, fatMassKg: 22.2, ffmi: 18.0, categoryMale: 'Elevated Adiposity', categoryFemale: 'Borderline High', color: '#ea580c' },
  { bfPct: 32, leanMassLbs: 119.0, fatMassLbs: 56.0, leanMassKg: 54.0, fatMassKg: 25.4, ffmi: 17.0, categoryMale: 'Obese / Sarcopenic Risk', categoryFemale: 'Overfat Adiposity', color: '#dc2626' },
  { bfPct: 36, leanMassLbs: 112.0, fatMassLbs: 63.0, leanMassKg: 50.8, fatMassKg: 28.6, ffmi: 16.0, categoryMale: 'Clinical Obesity Class I', categoryFemale: 'Obese / Cardiometabolic Risk', color: '#b91c1c' },
];

export function LbmCompositionSpectrumChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // 12% default
  const [sex, setSex] = useState<'male' | 'female'>('male');

  const cur = LBM_SPECTRUM[activeIdx];

  // SVG dimensions
  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minBf = 6;
  const maxBf = 36;
  const minLbs = 100;
  const maxLbs = 180;

  const scaleX = (bf: number) => padLeft + ((bf - minBf) / (maxBf - minBf)) * plotW;
  const scaleY = (lbs: number) => padTop + plotH - ((lbs - minLbs) / (maxLbs - minLbs)) * plotH;

  const lbmPath = LBM_SPECTRUM.map((d, i) => {
    const x = scaleX(d.bfPct);
    const y = scaleY(d.leanMassLbs);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const fatPath = LBM_SPECTRUM.map((d, i) => {
    const x = scaleX(d.bfPct);
    const y = scaleY(d.fatMassLbs);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.bfPct);
  const activeYLbm = scaleY(cur.leanMassLbs);
  const activeYFat = scaleY(cur.fatMassLbs);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetBf = minBf + ratio * (maxBf - minBf);
    
    // Find closest index
    let bestIdx = 0;
    let minDiff = 999;
    LBM_SPECTRUM.forEach((pt, i) => {
      const diff = Math.abs(pt.bfPct - targetBf);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'currentColor' }}>
            Lean Mass vs. Fat Mass Partitioning Curve
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'currentColor' }}>
            Interactive benchmark for a 175 lb (79.4 kg, 5&apos;10&quot; / 178 cm) adult across varying body composition tiers.
          </p>
        </div>

        {/* Sex toggle */}
        <div style={{ display: 'flex', gap: '6px', background: 'currentColor', padding: '3px', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => setSex('male')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: sex === 'male' ? '#10b981' : 'transparent',
              color: sex === 'male' ? '#ffffff' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            Male Norms
          </button>
          <button
            type="button"
            onClick={() => setSex('female')}
            style={{
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              background: sex === 'female' ? '#10b981' : 'transparent',
              color: sex === 'female' ? '#ffffff' : '#475569',
              transition: 'all 0.15s ease'
            }}
          >
            Female Norms
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
          {[100, 120, 140, 160, 180].map((lbs) => {
            const y = scaleY(lbs);
            return (
              <g key={lbs}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-400 font-mono">
                  {lbs} lb
                </text>
              </g>
            );
          })}

          {/* X Axis ticks */}
          {LBM_SPECTRUM.map((pt) => {
            const x = scaleX(pt.bfPct);
            return (
              <g key={pt.bfPct}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {pt.bfPct}%
                </text>
              </g>
            );
          })}

          {/* Curves */}
          <path d={lbmPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <path d={fatPath} fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />

          {/* Active scrubber vertical guide */}
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
          <circle cx={activeX} cy={activeYLbm} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYFat} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${Math.min(activeYLbm, 120)})`}>
            <rect
              width="170"
              height="88"
              rx="8"
              fill="currentColor" stroke="#94a3b8" className="text-white dark:text-slate-900"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-white">
              Body Fat: {cur.bfPct}%
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="600" fill="#10b981">
              Lean Mass: {cur.leanMassLbs.toFixed(1)} lbs ({cur.leanMassKg.toFixed(1)} kg)
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#d97706">
              Fat Mass: {cur.fatMassLbs.toFixed(1)} lbs ({cur.fatMassKg.toFixed(1)} kg)
            </text>
            <text x="12" y="70" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              Normalized FFMI: {cur.ffmi.toFixed(1)}
            </text>
          </g>
        </svg>
      </div>

      {/* Scrub stats card */}
      <div style={{
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '12px',
        padding: '14px',
        borderRadius: '12px',
        backgroundColor: 'currentColor',
        border: '1px solid currentColor'
      }}>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Tier</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            {sex === 'male' ? cur.categoryMale : cur.categoryFemale}
          </div>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Lean Body Mass</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
            {cur.leanMassLbs.toFixed(1)} lbs <span style={{ fontSize: '11px', fontWeight: 500, color: 'currentColor' }}>({cur.leanMassKg.toFixed(1)} kg)</span>
          </div>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Fat Mass</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#d97706', marginTop: '2px' }}>
            {cur.fatMassLbs.toFixed(1)} lbs <span style={{ fontSize: '11px', fontWeight: 500, color: 'currentColor' }}>({cur.fatMassKg.toFixed(1)} kg)</span>
          </div>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Normalized FFMI</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: 'currentColor', marginTop: '2px' }}>
            {cur.ffmi.toFixed(1)} <span style={{ fontSize: '11px', fontWeight: 500, color: 'currentColor' }}>kg/m²</span>
          </div>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'currentColor' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Lean Muscle/Bone Mass
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} /> Essential &amp; Storage Fat
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal axis to explore composition tiers.</span>
      </div>
    </div>
  );
}
