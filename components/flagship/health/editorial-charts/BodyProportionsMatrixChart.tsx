'use client';

import React, { useState } from 'react';

interface ShapeProfile {
  id: string;
  name: string;
  icon: string;
  bustRel: number; // normalized units
  waistRel: number;
  hipRel: number;
  whr: number;
  adiposeDepot: string;
  cardioRisk: string;
  riskTone: string;
  trainingFocus: string;
}

const SHAPES: ShapeProfile[] = [
  {
    id: 'hourglass',
    name: 'Hourglass (X-Shape)',
    icon: '⌛',
    bustRel: 94,
    waistRel: 68,
    hipRel: 96,
    whr: 0.71,
    adiposeDepot: 'Balanced subcutaneous (chest, hips, outer thighs)',
    cardioRisk: 'Low (protective adiponectin secretion from gluteal fat)',
    riskTone: '#10b981',
    trainingFocus: 'Full-body functional hypertrophy, core stability, balanced compound lifts.'
  },
  {
    id: 'pear',
    name: 'Pear / Spoon (Gynoid)',
    icon: '🍐',
    bustRel: 82,
    waistRel: 70,
    hipRel: 104,
    whr: 0.67,
    adiposeDepot: 'Gluteofemoral subcutaneous (hips, buttocks, thighs)',
    cardioRisk: 'Very Low (femoral fat acts as metabolic sink for free fatty acids)',
    riskTone: '#059669',
    trainingFocus: 'Upper body hypertrophy (deltoids, lats) to balance proportions, lower body power.'
  },
  {
    id: 'rectangle',
    name: 'Rectangle (Banana)',
    icon: '▬',
    bustRel: 86,
    waistRel: 80,
    hipRel: 88,
    whr: 0.91,
    adiposeDepot: 'Even systemic distribution; subcutaneous and mild visceral',
    cardioRisk: 'Moderate (depends primarily on overall body fat percentage)',
    riskTone: '#0284c7',
    trainingFocus: 'Hypertrophy for lats, glutes, and shoulders to create defined taper and athletic curves.'
  },
  {
    id: 'inverted-triangle',
    name: 'Inverted Triangle (V-Shape)',
    icon: '🔺',
    bustRel: 100,
    waistRel: 76,
    hipRel: 82,
    whr: 0.93,
    adiposeDepot: 'Upper body subcutaneous (shoulders, chest, upper back)',
    cardioRisk: 'Low to Moderate (favorable muscle-to-fat ratio in athletic phenotypes)',
    riskTone: '#8b5cf6',
    trainingFocus: 'Lower body volume (squats, lunges, Bulgarian splits) to add gluteal/thigh mass.'
  },
  {
    id: 'apple',
    name: 'Apple (Android / Oval)',
    icon: '🍎',
    bustRel: 92,
    waistRel: 96,
    hipRel: 90,
    whr: 1.07,
    adiposeDepot: 'Deep intra-abdominal visceral adipose tissue (omental/mesenteric)',
    cardioRisk: 'High (elevated IL-6, TNF-α, hepatic insulin resistance, NAFLD)',
    riskTone: '#ef4444',
    trainingFocus: 'High-intensity interval cardio (HIIT), Zone 2 base, compound resistance circuits.'
  }
];

export function BodyProportionsMatrixChart() {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const active = SHAPES[activeIdx];

  // SVG Layout dimensions
  const svgWidth = 640;
  const svgHeight = 280;
  const colWidth = svgWidth / SHAPES.length;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'currentColor' }}>
            Anthropometric Morphometry &amp; Cardiometabolic Risk Matrix
          </h4>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'currentColor' }}>
            Comparing Bust-Waist-Hip contours and visceral fat vulnerability across the 5 primary phenotype classifications.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {SHAPES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: '5px 10px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                background: activeIdx === idx ? '#10b981' : '#ffffff',
                color: activeIdx === idx ? '#ffffff' : '#0f172a',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ marginRight: '4px' }}>{s.icon}</span> {s.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Multi-Silhouette Visualizer */}
      <div style={{ width: '100%', position: 'relative' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', height: 'auto', display: 'block', userSelect: 'none' }}
        >
          {/* Subtle Horizontal Reference Guidelines */}
          {[60, 115, 175].map((y, i) => (
            <g key={y}>
              <line x1={20} y1={y} x2={svgWidth - 20} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" opacity="0.6" />
              <text x={24} y={y - 4} fontSize="9" fill="currentColor" className="text-slate-400 font-mono" fontWeight="600" textAnchor="start">
                {i === 0 ? 'Bust Line' : i === 1 ? 'Waist Line' : 'Hip Line'}
              </text>
            </g>
          ))}

          {/* Render Silhouettes for each shape */}
          {SHAPES.map((s, idx) => {
            const centerX = idx * colWidth + colWidth / 2;
            const isSelected = idx === activeIdx;

            // Normalized widths
            const bHalf = (s.bustRel / 100) * 36;
            const wHalf = (s.waistRel / 100) * 36;
            const hHalf = (s.hipRel / 100) * 36;

            const bustY = 60;
            const waistY = 115;
            const hipY = 175;
            const bottomY = 225;

            // Smooth torso path
            const pathD = `
              M ${centerX - bHalf} ${bustY}
              C ${centerX - bHalf * 0.9} ${bustY + 25}, ${centerX - wHalf} ${waistY - 10}, ${centerX - wHalf} ${waistY}
              C ${centerX - wHalf} ${waistY + 20}, ${centerX - hHalf} ${hipY - 15}, ${centerX - hHalf} ${hipY}
              C ${centerX - hHalf * 0.8} ${hipY + 30}, ${centerX - 18} ${bottomY}, ${centerX - 12} ${bottomY}
              L ${centerX + 12} ${bottomY}
              C ${centerX + 18} ${bottomY}, ${centerX + hHalf * 0.8} ${hipY + 30}, ${centerX + hHalf} ${hipY}
              C ${centerX + hHalf} ${hipY - 15}, ${centerX + wHalf} ${waistY + 20}, ${centerX + wHalf} ${waistY}
              C ${centerX + wHalf} ${waistY - 10}, ${centerX + bHalf * 0.9} ${bustY + 25}, ${centerX + bHalf} ${bustY}
              Z
            `;

            return (
              <g
                key={s.id}
                onClick={() => setActiveIdx(idx)}
                onTouchStart={() => setActiveIdx(idx)}
                style={{ cursor: 'pointer' }}
              >
                {/* Highlight background column */}
                {isSelected && (
                  <rect
                    x={idx * colWidth + 6}
                    y={15}
                    width={colWidth - 12}
                    height={svgHeight - 25}
                    rx={12}
                    fill="#10b981"
                    fillOpacity="0.08"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                )}

                {/* Silhouette Shape */}
                <path
                  d={pathD}
                  fill={isSelected ? s.riskTone : 'currentColor'}
                  fillOpacity={isSelected ? 0.85 : 0.45}
                  stroke={isSelected ? s.riskTone : '#94a3b8'}
                  strokeWidth={isSelected ? 2 : 1}
                  style={{ transition: 'all 0.25s ease' }}
                />

                {/* WHR Ratio Label */}
                <text
                  x={centerX}
                  y={waistY + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isSelected ? '#ffffff' : '#0f172a'}
                >
                  {s.whr.toFixed(2)}
                </text>

                {/* Shape Name and Icon */}
                <text
                  x={centerX}
                  y={bottomY + 18}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight={isSelected ? '700' : '600'}
                  fill={isSelected ? '#0f172a' : '#475569'}
                >
                  {s.icon} {s.name.split(' ')[0]}
                </text>

                <text
                  x={centerX}
                  y={bottomY + 32}
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor" className="text-slate-400 font-mono"
                >
                  WHR: {s.whr.toFixed(2)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Profile Details Card */}
      <div style={{
        marginTop: '16px',
        padding: '16px',
        borderRadius: '12px',
        backgroundColor: 'currentColor',
        border: '1px solid currentColor',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>{active.icon}</span>
            <div>
              <h5 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'currentColor' }}>{active.name}</h5>
              <span style={{ fontSize: '12px', color: 'currentColor' }}>Anthropometric Waist-to-Hip: {active.whr.toFixed(2)}</span>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Adipose Tissue Depot</span>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'currentColor', lineHeight: 1.4 }}>{active.adiposeDepot}</p>
          </div>
        </div>

        <div>
          <div>
            <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cardiovascular &amp; Metabolic Risk</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: active.riskTone }} />
              <span style={{ fontSize: '13px', fontWeight: 700, color: active.riskTone }}>{active.cardioRisk}</span>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <span style={{ fontSize: '11px', color: 'currentColor', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Optimal Training Focus</span>
            <p style={{ margin: '2px 0 0', fontSize: '13px', color: 'currentColor', lineHeight: 1.4 }}>{active.trainingFocus}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
