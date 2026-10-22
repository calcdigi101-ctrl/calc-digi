'use client';

import React, { useState } from 'react';

interface SleepEpoch {
  minute: number;
  stage: 'Wake' | 'N1' | 'N2' | 'N3' | 'REM';
  depth: number; // 0 = Wake, 1 = REM, 2 = N1, 3 = N2, 4 = N3
  cycleNum: number;
  physiologicalRole: string;
  wakeSafety: 'Optimal Awakening' | 'Severe Sleep Inertia' | 'Moderate Grogginess' | 'Transition Phase';
  safetyColor: string;
}

const HYPNOGRAM_DATA: SleepEpoch[] = [
  { minute: 0, stage: 'Wake', depth: 0, cycleNum: 0, physiologicalRole: 'Sleep onset latency; alpha wave deceleration', wakeSafety: 'Transition Phase', safetyColor: '#94a3b8' },
  { minute: 15, stage: 'N1', depth: 2, cycleNum: 1, physiologicalRole: 'Light transitional sleep; hypnic myoclonia', wakeSafety: 'Transition Phase', safetyColor: '#0ea5e9' },
  { minute: 30, stage: 'N2', depth: 3, cycleNum: 1, physiologicalRole: 'Core sleep; sleep spindles & K-complexes', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 60, stage: 'N3', depth: 4, cycleNum: 1, physiologicalRole: 'Deep Slow-Wave; human growth hormone (HGH) surge & glymphatic brain clearance', wakeSafety: 'Severe Sleep Inertia', safetyColor: '#ef4444' },
  { minute: 90, stage: 'N2', depth: 3, cycleNum: 1, physiologicalRole: 'Ascending light sleep phase', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 105, stage: 'REM', depth: 1, cycleNum: 1, physiologicalRole: 'First brief REM episode; emotional memory tagging', wakeSafety: 'Optimal Awakening', safetyColor: '#10b981' },

  { minute: 120, stage: 'N2', depth: 3, cycleNum: 2, physiologicalRole: 'Consolidation of procedural motor skills', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 150, stage: 'N3', depth: 4, cycleNum: 2, physiologicalRole: 'Deep cellular restoration & cellular protein synthesis', wakeSafety: 'Severe Sleep Inertia', safetyColor: '#ef4444' },
  { minute: 180, stage: 'N2', depth: 3, cycleNum: 2, physiologicalRole: 'Ascending stage 2 transition', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 195, stage: 'REM', depth: 1, cycleNum: 2, physiologicalRole: 'REM cycle 2; synaptic pruning and emotional regulation', wakeSafety: 'Optimal Awakening', safetyColor: '#10b981' },

  { minute: 210, stage: 'N2', depth: 3, cycleNum: 3, physiologicalRole: 'Core sleep maintenance; cardiac vagal dominance', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 240, stage: 'N3', depth: 4, cycleNum: 3, physiologicalRole: 'Final deep slow-wave period; immune cytokine generation', wakeSafety: 'Severe Sleep Inertia', safetyColor: '#ef4444' },
  { minute: 270, stage: 'N2', depth: 3, cycleNum: 3, physiologicalRole: 'Lighter core sleep', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 285, stage: 'REM', depth: 1, cycleNum: 3, physiologicalRole: 'Expanded REM episode; semantic memory consolidation', wakeSafety: 'Optimal Awakening', safetyColor: '#10b981' },

  { minute: 315, stage: 'N2', depth: 3, cycleNum: 4, physiologicalRole: 'Pre-dawn core sleep; body temperature lowest', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 360, stage: 'N2', depth: 3, cycleNum: 4, physiologicalRole: 'Ascending light theta brainwaves', wakeSafety: 'Transition Phase', safetyColor: '#0ea5e9' },
  { minute: 375, stage: 'REM', depth: 1, cycleNum: 4, physiologicalRole: 'Prolonged REM stage (Cycle 4 complete: 6 hrs of sleep)', wakeSafety: 'Optimal Awakening', safetyColor: '#10b981' },

  { minute: 405, stage: 'N2', depth: 3, cycleNum: 5, physiologicalRole: 'Final sleep cycle; cortisol awakening response begins', wakeSafety: 'Moderate Grogginess', safetyColor: '#6366f1' },
  { minute: 450, stage: 'N1', depth: 2, cycleNum: 5, physiologicalRole: 'Shallow transitional sleep; spontaneous arousals', wakeSafety: 'Transition Phase', safetyColor: '#0ea5e9' },
  { minute: 465, stage: 'REM', depth: 1, cycleNum: 5, physiologicalRole: 'Peak REM duration; creative insight & associative processing (Cycle 5 complete: 7.5 hrs)', wakeSafety: 'Optimal Awakening', safetyColor: '#10b981' },
  { minute: 480, stage: 'Wake', depth: 0, cycleNum: 5, physiologicalRole: 'Natural morning awakening; complete prefrontal cortex alertness', wakeSafety: 'Optimal Awakening', safetyColor: '#10b981' },
];

export function SleepArchitectureCyclesChart() {
  const [activeIdx, setActiveIdx] = useState<number>(19); // 465 min (7.5 hrs) default

  const cur = HYPNOGRAM_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 65;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minMin = 0;
  const maxMin = 480;

  const scaleX = (m: number) => padLeft + (m / maxMin) * plotW;
  // depth: 0 (Wake top) to 4 (N3 bottom)
  const scaleY = (depth: number) => padTop + (depth / 4) * plotH;

  const hypnoPath = HYPNOGRAM_DATA.map((d, i) => {
    const x = scaleX(d.minute);
    const y = scaleY(d.depth);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.minute);
  const activeY = scaleY(cur.depth);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetMin = ratio * maxMin;

    let bestIdx = 0;
    let minDiff = 999;
    HYPNOGRAM_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.minute - targetMin);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  const stagesList = [
    { label: 'Wake', depth: 0 },
    { label: 'REM', depth: 1 },
    { label: 'N1 (Light)', depth: 2 },
    { label: 'N2 (Core)', depth: 3 },
    { label: 'N3 (Deep)', depth: 4 },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'currentColor' }}>
            8-Hour Sleep Architecture Hypnogram &amp; Ultradian Cycles
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'currentColor' }}>
            Mapping 90-minute sleep cycles from Deep Slow-Wave (N3) to REM dreaming: targeting wake-up windows that bypass sleep inertia.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { label: '4 Cycles (6.0h)', idx: 16 },
            { label: '5 Cycles (7.5h)', idx: 19 },
            { label: '6 Cycles (9.0h)', idx: 20 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveIdx(item.idx)}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activeIdx === item.idx ? '#10b981' : '#ffffff',
                color: activeIdx === item.idx ? '#ffffff' : '#0f172a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
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
          {/* Y Axis Stages */}
          {stagesList.map((st) => {
            const y = scaleY(st.depth);
            return (
              <g key={st.label}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-500 dark:text-slate-400" fontWeight="600">
                  {st.label}
                </text>
              </g>
            );
          })}

          {/* X Axis Time (Hours / Minutes) */}
          {[0, 90, 180, 270, 360, 450, 480].map((m) => {
            const x = scaleX(m);
            const hrs = (m / 60).toFixed(1);
            return (
              <g key={m}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {hrs}h
                </text>
              </g>
            );
          })}

          {/* Optimal Wake checkpoints at REM / cycle boundaries */}
          {[105, 195, 285, 375, 465].map((m) => {
            const x = scaleX(m);
            return (
              <g key={m}>
                <line x1={x} y1={padTop} x2={x} y2={padTop + plotH} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <circle cx={x} cy={scaleY(1)} r="3" fill="#10b981" />
              </g>
            );
          })}

          {/* Hypnogram Stepped Curve */}
          <path d={hypnoPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

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
          <circle cx={activeX} cy={activeY} r="6.5" fill={cur.safetyColor} stroke="#ffffff" strokeWidth="2.5" />

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
              Elapsed: {Math.floor(cur.minute / 60)}h {cur.minute % 60}m
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="600" fill={cur.safetyColor}>
              Stage: {cur.stage} ({cur.stage === 'N3' ? 'Deep Slow-Wave' : cur.stage === 'REM' ? 'Dreaming / Synaptic' : 'Core Sleep'})
            </text>
            <text x="12" y="54" fontSize="10" fontWeight="600" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              Wake Status: {cur.wakeSafety}
            </text>
            <text x="12" y="70" fontSize="9" fill="currentColor" className="text-slate-400 font-mono">
              Cycle #{cur.cycleNum || 1} of 5
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
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Brainwave &amp; Sleep Stage</span>
          <div style={{ fontSize: '15px', fontWeight: 700, color: cur.safetyColor, marginTop: '2px' }}>
            {cur.stage} — {cur.stage === 'N3' ? 'Slow-Wave Delta' : cur.stage === 'REM' ? 'Desynchronized Fast Beta/Theta' : 'Sleep Spindles & Theta'}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'currentColor', lineHeight: 1.4 }}>
            {cur.physiologicalRole}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Wake-Up Cognitive Alertness Impact</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: cur.safetyColor, marginTop: '2px' }}>
            {cur.wakeSafety}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'currentColor', lineHeight: 1.4 }}>
            {cur.stage === 'N3'
              ? 'Waking now interrupts slow delta waves, causing severe sleep inertia grogginess lasting up to 60 minutes.'
              : 'Waking now aligns with light sleep or REM, enabling immediate prefrontal cortex activation and morning alertness.'}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'currentColor' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} /> Optimal Wake Checkpoints
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} /> Deep Sleep (Inertia Risk)
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the hypnogram to inspect sleep cycle transitions.</span>
      </div>
    </div>
  );
}
