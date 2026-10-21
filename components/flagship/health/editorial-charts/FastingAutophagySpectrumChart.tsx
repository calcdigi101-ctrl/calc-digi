'use client';

import React, { useState } from 'react';

interface FastingStage {
  hour: number;
  phase: string;
  autophagyPct: number;
  ketosisPct: number;
  insulinPct: number; // relative insulin level
  primaryFuel: string;
  hghBoost: string;
  clinicalMilestone: string;
  color: string;
}

const FASTING_TIMELINE: FastingStage[] = [
  { hour: 0, phase: 'Fed State (Postprandial)', autophagyPct: 5, ketosisPct: 0, insulinPct: 100, primaryFuel: 'Dietary Glucose & Amino Acids', hghBoost: 'Baseline', clinicalMilestone: 'Active gastric absorption; insulin spikes to drive glucose into hepatocytes and myocytes.', color: '#3b82f6' },
  { hour: 4, phase: 'Post-Absorptive Transition', autophagyPct: 10, ketosisPct: 5, insulinPct: 65, primaryFuel: 'Circulating Blood Glucose', hghBoost: 'Baseline', clinicalMilestone: 'Digestion completes; blood glucose levels stabilize; glucagon secretion begins from pancreas.', color: '#0ea5e9' },
  { hour: 8, phase: 'Glycogen Depletion Inception', autophagyPct: 20, ketosisPct: 15, insulinPct: 40, primaryFuel: 'Hepatic Glycogen Reserves', hghBoost: '+20%', clinicalMilestone: 'Liver glycogen stores are tapped to maintain normoglycemia; gastrointestinal tract enters resting state.', color: '#06b6d4' },
  { hour: 12, phase: 'Ketosis Inception & Lipolysis', autophagyPct: 40, ketosisPct: 35, insulinPct: 25, primaryFuel: 'Hepatic Glycogen + Free Fatty Acids', hghBoost: '+60%', clinicalMilestone: 'Subcutaneous adipose lipolysis ramps up; systemic beta-hydroxybutyrate (BHB) ketones begin rising.', color: '#10b981' },
  { hour: 16, phase: 'Active Ketosis & Autophagy Ramp', autophagyPct: 65, ketosisPct: 60, insulinPct: 15, primaryFuel: 'Free Fatty Acids & Ketone Bodies', hghBoost: '+150%', clinicalMilestone: '16:8 standard window threshold. mTOR pathway downregulated; cellular cleaning and mitochondrial mitophagy accelerate.', color: '#059669' },
  { hour: 20, phase: 'Deep Cellular Autophagy', autophagyPct: 85, ketosisPct: 75, insulinPct: 10, primaryFuel: 'Ketones & Fat Oxidation', hghBoost: '+300%', clinicalMilestone: 'Warrior Diet (20:4) threshold. Intense intracellular lysosomal recycling of misfolded proteins and senescence markers.', color: '#d97706' },
  { hour: 24, phase: 'Peak Autophagy & Glycogen Zero', autophagyPct: 98, ketosisPct: 88, insulinPct: 5, primaryFuel: 'Ketone Bodies & Triglycerides', hghBoost: '+500%', clinicalMilestone: 'OMAD / 24-hr threshold. Complete hepatic glycogen depletion; profound insulin sensitivity restoration and neuroprotective BDNF surge.', color: '#ea580c' },
  { hour: 36, phase: 'Extended Ketosis & Stem Cells', autophagyPct: 100, ketosisPct: 95, insulinPct: 5, primaryFuel: 'Beta-Hydroxybutyrate & Acetoacetate', hghBoost: '+500%', clinicalMilestone: 'Autophagy reaches plateau; hematopoietic stem cell renewal initiated; profound reduction in circulating inflammation.', color: '#dc2626' },
  { hour: 48, phase: 'Profound Cellular Reset', autophagyPct: 95, ketosisPct: 100, insulinPct: 5, primaryFuel: 'Endogenous Fatty Acids & Ketones', hghBoost: '+500%', clinicalMilestone: 'Prolonged medical fast territory; immune system rejuvenation; should only be conducted under clinical supervision.', color: '#7c3aed' },
];

export function FastingAutophagySpectrumChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // 16 hrs default

  const cur = FASTING_TIMELINE[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minHour = 0;
  const maxHour = 48;
  const minPct = 0;
  const maxPct = 100;

  const scaleX = (h: number) => padLeft + ((h - minHour) / (maxHour - minHour)) * plotW;
  const scaleY = (p: number) => padTop + plotH - ((p - minPct) / (maxPct - minPct)) * plotH;

  const autophagyPath = FASTING_TIMELINE.map((d, i) => {
    const x = scaleX(d.hour);
    const y = scaleY(d.autophagyPct);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const ketosisPath = FASTING_TIMELINE.map((d, i) => {
    const x = scaleX(d.hour);
    const y = scaleY(d.ketosisPct);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const insulinPath = FASTING_TIMELINE.map((d, i) => {
    const x = scaleX(d.hour);
    const y = scaleY(d.insulinPct);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.hour);
  const activeYAuto = scaleY(cur.autophagyPct);
  const activeYKeto = scaleY(cur.ketosisPct);
  const activeYInsulin = scaleY(cur.insulinPct);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetHour = minHour + ratio * (maxHour - minHour);

    let bestIdx = 0;
    let minDiff = 999;
    FASTING_TIMELINE.forEach((pt, i) => {
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
      overflow: 'hidden',
      border: '1px solid var(--c-rule)',
      backgroundColor: 'var(--c-rule2)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--c-ink)' }}>
            Autophagy, Ketosis &amp; Insulin Inversion Timeline
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Cellular bioenergetics across 0 to 48 hours of fasting: from fed state to peak lysosomal recycling.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[12, 16, 20, 24].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                const idx = FASTING_TIMELINE.findIndex((f) => f.hour === h);
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
              {h}h Fast
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
          {/* Y Axis Grid */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const y = scaleY(pct);
            return (
              <g key={pct}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="var(--c-rule)" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="11" fill="var(--c-ink3)">
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* X Axis Hours */}
          {FASTING_TIMELINE.map((pt) => {
            const x = scaleX(pt.hour);
            return (
              <g key={pt.hour}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  {pt.hour}h
                </text>
              </g>
            );
          })}

          {/* Curves */}
          {/* Autophagy curve (Green) */}
          <path d={autophagyPath} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          {/* Ketosis curve (Amber) */}
          <path d={ketosisPath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />
          {/* Insulin curve (Blue) */}
          <path d={insulinPath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

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
          <circle cx={activeX} cy={activeYAuto} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYKeto} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYInsulin} r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${Math.min(activeYAuto, 100)})`}>
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
              Elapsed Fast: {cur.hour} Hours
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="600" fill="#10b981">
              Autophagy: {cur.autophagyPct}% of Max
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill="#d97706">
              Ketosis Depth: {cur.ketosisPct}%
            </text>
            <text x="12" y="70" fontSize="10" fill="#3b82f6">
              Insulin: {cur.insulinPct}% of baseline
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
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Metabolic Phase</span>
          <div style={{ fontSize: '14px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            {cur.phase}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            {cur.clinicalMilestone}
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Primary Metabolic Fuel</span>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-ink)', marginTop: '2px' }}>
            ⚡ {cur.primaryFuel}
          </div>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Growth Hormone (HGH) Surge</span>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
              {cur.hghBoost}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Cellular Autophagy
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} /> Ketone Production
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} /> Circulating Insulin
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal timeline to inspect hourly physiology.</span>
      </div>
    </div>
  );
}
