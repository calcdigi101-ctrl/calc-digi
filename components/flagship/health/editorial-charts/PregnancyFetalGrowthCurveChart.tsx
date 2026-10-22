'use client';

import React, { useState } from 'react';

interface FetalMilestone {
  week: number;
  weightGrams: number;
  lengthCm: number;
  lengthIn: number;
  fruitSize: string;
  trimester: string;
  milestone: string;
}

const FETAL_GROWTH_DATA: FetalMilestone[] = [
  { week: 8, weightGrams: 1, lengthCm: 1.6, lengthIn: 0.6, fruitSize: 'Raspberry', trimester: 'First Trimester', milestone: 'Webbed fingers/toes form; neural tube closed; basic cardiac rhythm active.' },
  { week: 10, weightGrams: 4, lengthCm: 3.1, lengthIn: 1.2, fruitSize: 'Prune', trimester: 'First Trimester', milestone: 'Embryo officially transitions to fetus; vital organ systems established.' },
  { week: 12, weightGrams: 14, lengthCm: 5.4, lengthIn: 2.1, fruitSize: 'Plum', trimester: 'First Trimester', milestone: 'Reflexes develop; kidneys produce amniotic fluid; nuchal translucency scan window.' },
  { week: 14, weightGrams: 43, lengthCm: 8.7, lengthIn: 3.4, fruitSize: 'Lemon', trimester: 'Second Trimester', milestone: 'Second trimester begins; thyroid gland active; lanugo hair covers body.' },
  { week: 16, weightGrams: 100, lengthCm: 11.6, lengthIn: 4.6, fruitSize: 'Avocado', trimester: 'Second Trimester', milestone: 'Eyes perceive light; circulatory system pumps ~25 quarts of blood per day.' },
  { week: 20, weightGrams: 300, lengthCm: 25.6, lengthIn: 10.1, fruitSize: 'Banana', trimester: 'Second Trimester', milestone: 'Mid-pregnancy milestone; detailed anatomical ultrasound; quickening fetal kicks felt.' },
  { week: 24, weightGrams: 600, lengthCm: 30.0, lengthIn: 11.8, fruitSize: 'Ear of Corn', trimester: 'Second Trimester', milestone: 'Viability threshold reached; inner ear formed; surfactant production initiates in lungs.' },
  { week: 28, weightGrams: 1000, lengthCm: 37.6, lengthIn: 14.8, fruitSize: 'Eggplant', trimester: 'Third Trimester', milestone: 'Third trimester entry; eyes open and blink; rapid brain sulci and gyri development.' },
  { week: 32, weightGrams: 1700, lengthCm: 42.4, lengthIn: 16.7, fruitSize: 'Butternut Squash', trimester: 'Third Trimester', milestone: 'Subcutaneous adipose layer thickens; bone mineral density rapidly accumulates.' },
  { week: 36, weightGrams: 2600, lengthCm: 47.4, lengthIn: 18.7, fruitSize: 'Papaya', trimester: 'Third Trimester', milestone: 'Pulmonary maturity achieved; fetus descends into maternal pelvis (engagement).' },
  { week: 38, weightGrams: 3100, lengthCm: 49.8, lengthIn: 19.6, fruitSize: 'Winter Melon', trimester: 'Third Trimester', milestone: 'Early term achieved; firm grasp reflex; vernix caseosa protects skin.' },
  { week: 40, weightGrams: 3450, lengthCm: 51.2, lengthIn: 20.2, fruitSize: 'Small Watermelon', trimester: 'Full Term', milestone: 'Full-term gestation; ready for extrauterine life and pulmonary respiration.' },
];

export function PregnancyFetalGrowthCurveChart() {
  const [activeIdx, setActiveIdx] = useState<number>(5); // Week 20 default

  const cur = FETAL_GROWTH_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minWeek = 8;
  const maxWeek = 40;
  const maxWeight = 3800; // grams

  const scaleX = (w: number) => padLeft + ((w - minWeek) / (maxWeek - minWeek)) * plotW;
  const scaleY = (g: number) => padTop + plotH - (g / maxWeight) * plotH;

  const weightPath = FETAL_GROWTH_DATA.map((d, i) => {
    const x = scaleX(d.week);
    const y = scaleY(d.weightGrams);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.week);
  const activeY = scaleY(cur.weightGrams);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetWk = minWeek + ratio * (maxWeek - minWeek);

    let bestIdx = 0;
    let minDiff = 999;
    FETAL_GROWTH_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.week - targetWk);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  const fmtWeight = (g: number) => {
    const lbs = (g / 453.592).toFixed(1);
    return `${g.toLocaleString()} g (${lbs} lbs)`;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'currentColor' }}>
            Fetal Growth &amp; Gestational Biometry Trajectory
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'currentColor' }}>
            Hadlock anatomical ultrasound growth curve: estimated fetal weight (EFW) and crown-to-heel length across weeks 8 to 40.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[12, 20, 28, 36, 40].map((wk) => (
            <button
              key={wk}
              type="button"
              onClick={() => {
                const idx = FETAL_GROWTH_DATA.findIndex((d) => d.week === wk);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.week === wk ? '#10b981' : '#ffffff',
                color: cur.week === wk ? '#ffffff' : '#0f172a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              Week {wk}
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
          {/* Trimester Zones Background */}
          {/* Trimester 1 (wk 8 to 13) */}
          <rect
            x={scaleX(8)}
            y={padTop}
            width={scaleX(13) - scaleX(8)}
            height={plotH}
            fill="#3b82f6"
            fillOpacity="0.05"
          />
          {/* Trimester 2 (wk 13 to 27) */}
          <rect
            x={scaleX(13)}
            y={padTop}
            width={scaleX(27) - scaleX(13)}
            height={plotH}
            fill="#10b981"
            fillOpacity="0.05"
          />
          {/* Trimester 3 (wk 27 to 40) */}
          <rect
            x={scaleX(27)}
            y={padTop}
            width={scaleX(40) - scaleX(27)}
            height={plotH}
            fill="#f59e0b"
            fillOpacity="0.05"
          />

          {/* Grid lines */}
          {[1000, 2000, 3000].map((g) => {
            const y = scaleY(g);
            return (
              <g key={g}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {g}g
                </text>
              </g>
            );
          })}

          {/* X Axis weeks */}
          {FETAL_GROWTH_DATA.map((pt) => {
            const x = scaleX(pt.week);
            return (
              <g key={pt.week}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  W{pt.week}
                </text>
              </g>
            );
          })}

          {/* Weight Growth Curve */}
          <path d={weightPath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

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
          <circle cx={activeX} cy={activeY} r="6.5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeY, 110)})`}>
            <rect
              width="180"
              height="88"
              rx="8"
              fill="currentColor" stroke="#94a3b8" className="text-white dark:text-slate-900"
              strokeWidth="1.5"
              filter="drop-shadow(0 4px 10px rgba(0,0,0,0.08))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-white">
              Week {cur.week} Gestation
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill="#10b981">
              Weight: {fmtWeight(cur.weightGrams)}
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#0ea5e9">
              Length: {cur.lengthCm} cm ({cur.lengthIn}&quot;)
            </text>
            <text x="12" y="70" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              Size: {cur.fruitSize}
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
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Gestational Milestone</span>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'currentColor', marginTop: '2px' }}>
            Week {cur.week} ({cur.trimester})
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'currentColor', lineHeight: 1.4 }}>
            {cur.milestone}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Biometric Proportions</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
            {fmtWeight(cur.weightGrams)} • {cur.lengthCm} cm
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'currentColor', lineHeight: 1.4 }}>
            Anatomical volume comparable to a <strong>{cur.fruitSize}</strong>.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'currentColor' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#3b82f6', opacity: 0.3 }} /> 1st Trimester (1–12)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981', opacity: 0.3 }} /> 2nd Trimester (13–26)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#f59e0b', opacity: 0.3 }} /> 3rd Trimester (27–40)
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the curve to explore weekly fetal development.</span>
      </div>
    </div>
  );
}
