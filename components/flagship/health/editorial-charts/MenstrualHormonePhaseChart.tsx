'use client';

import React, { useState } from 'react';

interface HormonePoint {
  day: number;
  estrogen: number; // relative 0-100%
  lh: number; // 0-100%
  progesterone: number; // 0-100%
  fsh: number; // 0-100%
  phase: string;
  conceptionChance: string;
  cervicalMucus: string;
  bbtShift: string;
  color: string;
}

const HORMONE_DATA: HormonePoint[] = [
  { day: 1, estrogen: 15, lh: 10, progesterone: 5, fsh: 30, phase: 'Menstrual Phase (Day 1 of bleeding)', conceptionChance: 'Virtually 0%', cervicalMucus: 'Dry or masked by menstrual flow', bbtShift: 'Baseline Low (~97.2°F / 36.2°C)', color: '#ef4444' },
  { day: 3, estrogen: 18, lh: 12, progesterone: 5, fsh: 38, phase: 'Early Follicular Recruitment', conceptionChance: 'Low (< 1%)', cervicalMucus: 'Dry / minimal moisture', bbtShift: 'Baseline Low', color: '#f59e0b' },
  { day: 6, estrogen: 25, lh: 15, progesterone: 5, fsh: 42, phase: 'Mid-Follicular Dominance', conceptionChance: 'Low (~3%)', cervicalMucus: 'Sticky, cloudy, thick', bbtShift: 'Baseline Low', color: '#0ea5e9' },
  { day: 9, estrogen: 45, lh: 18, progesterone: 5, fsh: 35, phase: 'Late Follicular / Pre-Fertile', conceptionChance: 'Rising (~10%)', cervicalMucus: 'Creamy, lotion-like texture', bbtShift: 'Baseline Low', color: '#0ea5e9' },
  { day: 11, estrogen: 70, lh: 25, progesterone: 6, fsh: 30, phase: 'Fertile Window Opens (Day -3)', conceptionChance: 'High (~18%)', cervicalMucus: 'Wet, slippery, clear', bbtShift: 'Baseline Low', color: '#10b981' },
  { day: 13, estrogen: 100, lh: 95, progesterone: 8, fsh: 65, phase: 'LH Surge / Peak Fertility (Day -1)', conceptionChance: 'Very High (~33% Peak)', cervicalMucus: 'Egg-white consistency (Spinnbarkeit)', bbtShift: 'Pre-ovulatory nadir / slight dip', color: '#10b981' },
  { day: 14, estrogen: 80, lh: 75, progesterone: 15, fsh: 50, phase: 'Ovulation Event (Follicular Rupture)', conceptionChance: 'Peak Fertility (~30%)', cervicalMucus: 'Abundant stretchy egg-white', bbtShift: 'Temperature shift begins (+0.5°F)', color: '#059669' },
  { day: 16, estrogen: 40, lh: 15, progesterone: 35, fsh: 15, phase: 'Early Luteal / Corpus Luteum', conceptionChance: 'Rapidly Drops (< 5%)', cervicalMucus: 'Quickly dries up, becomes tacky', bbtShift: 'Elevated High (~97.9°F / 36.6°C)', color: '#6366f1' },
  { day: 19, estrogen: 55, lh: 10, progesterone: 75, fsh: 10, phase: 'Mid-Luteal Implantation Window', conceptionChance: '0% (Post-ovulatory)', cervicalMucus: 'Dry or scant sticky mucus', bbtShift: 'Sustained High Progesterone Plateau', color: '#8b5cf6' },
  { day: 22, estrogen: 65, lh: 8, progesterone: 98, fsh: 8, phase: 'Peak Progesterone Secretion', conceptionChance: '0%', cervicalMucus: 'Dry / non-receptive', bbtShift: 'Peak Thermal Plateau', color: '#8b5cf6' },
  { day: 25, estrogen: 35, lh: 6, progesterone: 50, fsh: 10, phase: 'Late Luteal Luteolysis', conceptionChance: '0%', cervicalMucus: 'Dry', bbtShift: 'High, begins downward trend', color: '#d97706' },
  { day: 28, estrogen: 15, lh: 8, progesterone: 10, fsh: 20, phase: 'Premenstrual Decidual Sloughing', conceptionChance: '0%', cervicalMucus: 'Scant or spotting', bbtShift: 'Sharp drop back to baseline low', color: '#ef4444' },
];

export function MenstrualHormonePhaseChart() {
  const [activeIdx, setActiveIdx] = useState<number>(5); // Day 13 (Peak) default

  const cur = HORMONE_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minDay = 1;
  const maxDay = 28;

  const scaleX = (d: number) => padLeft + ((d - minDay) / (maxDay - minDay)) * plotW;
  const scaleY = (pct: number) => padTop + plotH - (pct / 100) * plotH;

  const makePath = (key: 'estrogen' | 'lh' | 'progesterone' | 'fsh') => {
    return HORMONE_DATA.map((d, i) => {
      const x = scaleX(d.day);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(cur.day);
  const activeYEstrogen = scaleY(cur.estrogen);
  const activeYLh = scaleY(cur.lh);
  const activeYProg = scaleY(cur.progesterone);

  const fertileStartX = scaleX(10);
  const fertileEndX = scaleX(15);
  const mensesEndX = scaleX(5);

  const handlePointer = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (clientX - (padLeft / svgWidth) * rect.width) / ((plotW / svgWidth) * rect.width)));
    const targetDay = minDay + ratio * (maxDay - minDay);

    let bestIdx = 0;
    let minDiff = 999;
    HORMONE_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.day - targetDay);
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
            Ovarian Hormone Dynamics &amp; The Fertile Window
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--c-ink2)' }}>
            Fluctuations of Estrogen, LH Surge, and Progesterone mapping the 6-day fertile window and ovulation day.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { label: 'Menses (Day 1)', day: 1 },
            { label: 'Fertile (Day 11)', day: 11 },
            { label: 'LH Surge (Day 13)', day: 13 },
            { label: 'Ovulation (Day 14)', day: 14 },
            { label: 'Luteal Peak (Day 22)', day: 22 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                const idx = HORMONE_DATA.findIndex((d) => d.day === item.day);
                if (idx !== -1) setActiveIdx(idx);
              }}
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: cur.day === item.day ? 'var(--c-accent)' : 'var(--c-surface)',
                color: cur.day === item.day ? '#ffffff' : 'var(--c-ink)',
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
          onPointerMove={(e) => { if (e.buttons > 0) handlePointer(e); }}
          onPointerEnter={handlePointer}
        >
          {/* Menses shaded zone */}
          <rect
            x={padLeft}
            y={padTop}
            width={mensesEndX - padLeft}
            height={plotH}
            fill="#ef4444"
            fillOpacity="0.08"
          />

          {/* Fertile Window shaded zone */}
          <rect
            x={fertileStartX}
            y={padTop}
            width={fertileEndX - fertileStartX}
            height={plotH}
            fill="#10b981"
            fillOpacity="0.12"
          />
          <text
            x={(fertileStartX + fertileEndX) / 2}
            y={padTop + 14}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="#059669"
          >
            Fertile Window (Days 10–15)
          </text>

          {/* Grid lines */}
          {[25, 50, 75, 100].map((pct) => {
            const y = scaleY(pct);
            return (
              <line key={pct} x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="var(--c-rule)" strokeDasharray="3 3" />
            );
          })}

          {/* X Axis days */}
          {[1, 5, 10, 14, 18, 22, 28].map((d) => {
            const x = scaleX(d);
            return (
              <g key={d}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="var(--c-rule)" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="var(--c-ink3)">
                  Day {d}
                </text>
              </g>
            );
          })}

          {/* Hormone Curves */}
          {/* Estrogen (Blue) */}
          <path d={makePath('estrogen')} fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" />
          {/* LH Surge (Purple) */}
          <path d={makePath('lh')} fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
          {/* Progesterone (Green) */}
          <path d={makePath('progesterone')} fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />

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
          <circle cx={activeX} cy={activeYLh} r="5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYEstrogen} r="5" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYProg} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

          {/* Inverting dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeYLh, 110)})`}>
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
              Cycle Day {cur.day}
            </text>
            <text x="12" y="38" fontSize="11" fontWeight="700" fill={cur.color}>
              Conception: {cur.conceptionChance}
            </text>
            <text x="12" y="54" fontSize="10" fontWeight="600" fill="#8b5cf6">
              LH Surge: {cur.lh}% of Peak
            </text>
            <text x="12" y="70" fontSize="10" fill="var(--c-ink2)">
              Progesterone: {cur.progesterone}% of Max
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
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cycle Stage &amp; Conception Odds</span>
          <div style={{ fontSize: '15px', fontWeight: 700, color: cur.color, marginTop: '2px' }}>
            Day {cur.day}: {cur.phase}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Conception probability: <strong style={{ color: cur.color }}>{cur.conceptionChance}</strong>.
          </p>
        </div>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--c-ink3)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Biological Biomarkers</span>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-ink)', marginTop: '2px' }}>
            Mucus: {cur.cervicalMucus}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--c-ink2)', lineHeight: 1.4 }}>
            Thermal Shift: <strong>{cur.bbtShift}</strong>
          </p>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginTop: '12px', fontSize: '12px', color: 'var(--c-ink2)' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#8b5cf6' }} /> Luteinizing Hormone (LH Surge)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0ea5e9' }} /> Estradiol (Estrogen)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} /> Progesterone
          </span>
        </div>
        <span style={{ fontStyle: 'italic', fontSize: '11px' }}>Drag or tap along the horizontal timeline to inspect daily hormonal shifts.</span>
      </div>
    </div>
  );
}
