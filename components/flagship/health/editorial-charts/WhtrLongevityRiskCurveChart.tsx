'use client';

import React, { useState } from 'react';

interface WhtrRiskPoint {
  whtr: number;
  hazardRatio: number;
  diabetesRelativeRisk: number;
  hypertensionRisk: number;
  zone: string;
  clinicalAction: string;
  color: string;
}

const WHTR_CURVE_DATA: WhtrRiskPoint[] = [
  { whtr: 0.32, hazardRatio: 1.28, diabetesRelativeRisk: 0.9, hypertensionRisk: 0.9, zone: 'Take Care (Underweight Risk)', clinicalAction: 'Assess for sarcopenia, malabsorption, or inadequate caloric intake.', color: '#3b82f6' },
  { whtr: 0.36, hazardRatio: 1.05, diabetesRelativeRisk: 0.95, hypertensionRisk: 0.95, zone: 'Lean / Healthy Baseline', clinicalAction: 'Optimal visceral composition; minimal cardiometabolic stress.', color: '#10b981' },
  { whtr: 0.42, hazardRatio: 1.00, diabetesRelativeRisk: 1.0, hypertensionRisk: 1.0, zone: 'Optimal Longevity Sweet Spot', clinicalAction: 'Lowest all-cause mortality and ideal cardiovascular longevity.', color: '#059669' },
  { whtr: 0.47, hazardRatio: 1.04, diabetesRelativeRisk: 1.2, hypertensionRisk: 1.1, zone: 'Healthy Standard / Upper Normal', clinicalAction: 'Within safe margins; continue regular physical activity.', color: '#10b981' },
  { whtr: 0.50, hazardRatio: 1.16, diabetesRelativeRisk: 1.6, hypertensionRisk: 1.3, zone: 'Boundary Threshold (Half Height)', clinicalAction: 'Target for intervention; visceral fat begins escalating.', color: '#f59e0b' },
  { whtr: 0.54, hazardRatio: 1.42, diabetesRelativeRisk: 2.3, hypertensionRisk: 1.7, zone: 'Consider Action (Elevated Risk)', clinicalAction: 'Lifestyle modifications recommended: reduce simple sugars and boost Zone 2 cardio.', color: '#d97706' },
  { whtr: 0.58, hazardRatio: 1.75, diabetesRelativeRisk: 3.4, hypertensionRisk: 2.2, zone: 'Substantially Elevated Risk', clinicalAction: 'Clinically significant visceral adiposity; monitor fasting blood glucose and lipid panels.', color: '#ea580c' },
  { whtr: 0.63, hazardRatio: 2.15, diabetesRelativeRisk: 5.1, hypertensionRisk: 2.8, zone: 'Take Action (High Morbidity)', clinicalAction: 'High risk of metabolic syndrome, NAFLD, and endothelial inflammation.', color: '#dc2626' },
  { whtr: 0.70, hazardRatio: 2.85, diabetesRelativeRisk: 7.8, hypertensionRisk: 3.6, zone: 'Severe Cardiometabolic Hazard', clinicalAction: 'Immediate comprehensive medical intervention; life expectancy curtailed by ~5–8 years.', color: '#991b1b' },
];

export function WhtrLongevityRiskCurveChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // 0.42 default

  const cur = WHTR_CURVE_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minWhtr = 0.30;
  const maxWhtr = 0.72;
  const minHr = 0.8;
  const maxHr = 3.0;

  const scaleX = (w: number) => padLeft + ((w - minWhtr) / (maxWhtr - minWhtr)) * plotW;
  const scaleY = (hr: number) => padTop + plotH - ((hr - minHr) / (maxHr - minHr)) * plotH;

  const pathD = WHTR_CURVE_DATA.map((d, i) => {
    const x = scaleX(d.whtr);
    const y = scaleY(d.hazardRatio);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.whtr);
  const activeY = scaleY(cur.hazardRatio);
  const thresholdX = scaleX(0.50);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetWhtr = minWhtr + ratio * (maxWhtr - minWhtr);

    let bestIdx = 0;
    let minDiff = 999;
    WHTR_CURVE_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.whtr - targetWhtr);
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
            All-Cause Mortality Hazard Ratio vs. Waist-to-Height Ratio (WHtR)
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'currentColor' }}>
            Calibrated to Dr. Margaret Ashwell&apos;s systemic meta-analyses: the U-shaped risk curve and 0.50 clinical boundary.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[0.42, 0.50, 0.58, 0.63].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                const idx = WHTR_CURVE_DATA.findIndex((d) => d.whtr === val);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.whtr === val ? '#10b981' : '#ffffff',
                color: cur.whtr === val ? '#ffffff' : '#0f172a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              {val.toFixed(2)} WHtR
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
          {/* Shaded Risk Zones */}
          {/* Safe green zone (< 0.50) */}
          <rect
            x={padLeft}
            y={padTop}
            width={thresholdX - padLeft}
            height={plotH}
            fill="#10b981"
            fillOpacity="0.06"
          />
          {/* Elevated warning zone (> 0.50) */}
          <rect
            x={thresholdX}
            y={padTop}
            width={svgWidth - padRight - thresholdX}
            height={plotH}
            fill="#ef4444"
            fillOpacity="0.06"
          />

          {/* Grid lines */}
          {[1.0, 1.5, 2.0, 2.5, 3.0].map((hr) => {
            const y = scaleY(hr);
            return (
              <g key={hr}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-400 font-mono">
                  {hr.toFixed(1)}x
                </text>
              </g>
            );
          })}

          {/* X Axis ticks */}
          {WHTR_CURVE_DATA.map((pt) => {
            const x = scaleX(pt.whtr);
            return (
              <g key={pt.whtr}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {pt.whtr.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Threshold 0.50 Line */}
          <line
            x1={thresholdX}
            y1={padTop}
            x2={thresholdX}
            y2={padTop + plotH}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text x={thresholdX} y={padTop - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#f59e0b">
            0.50 Threshold (Half Height)
          </text>

          {/* Curve */}
          <path d={pathD} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

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

          {/* Active Point */}
          <circle cx={activeX} cy={activeY} r="6.5" fill={cur.color} stroke="#ffffff" strokeWidth="2.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${Math.min(activeY, 110)})`}>
            <rect
              width="170"
              height="88"
              rx="8"
              fill="currentColor" stroke="#94a3b8" className="text-white dark:text-slate-900"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-white">
              WHtR: {cur.whtr.toFixed(2)}
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="600" fill={cur.color}>
              Mortality HR: {cur.hazardRatio.toFixed(2)}x
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#d97706">
              Diabetes Risk: {cur.diabetesRelativeRisk.toFixed(1)}x
            </text>
            <text x="12" y="70" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              Hypertension Risk: {cur.hypertensionRisk.toFixed(1)}x
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
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Clinical Status</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            {cur.zone}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'currentColor', lineHeight: 1.4 }}>
            {cur.clinicalAction}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Relative All-Cause Mortality</span>
          <div style={{ fontSize: '16px', fontWeight: 800, color: cur.color, marginTop: '2px' }}>
            {cur.hazardRatio.toFixed(2)}x Baseline Hazard
          </div>
          <div style={{ marginTop: '8px', fontSize: '12px', color: 'currentColor' }}>
            Type 2 Diabetes Risk: <strong style={{ color: 'currentColor' }}>{cur.diabetesRelativeRisk.toFixed(1)}x</strong>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'currentColor' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981', opacity: 0.4 }} /> Safe Longevity Zone (&lt; 0.50)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ef4444', opacity: 0.4 }} /> Elevated Risk Zone (&ge; 0.50)
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal curve to explore clinical hazard ratios.</span>
      </div>
    </div>
  );
}
