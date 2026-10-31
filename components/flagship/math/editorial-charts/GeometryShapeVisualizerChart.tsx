"use client";

import React, { useState, useMemo } from "react";

type ShapeMode = "triangle" | "circle" | "line" | "cylinder";

export function GeometryShapeVisualizerChart() {
  const [shape, setShape] = useState<ShapeMode>("triangle");

  // Triangle state
  const [legA, setLegA] = useState<number>(6);
  const [legB, setLegB] = useState<number>(8);

  // Circle state
  const [radius, setRadius] = useState<number>(7);
  const [sectorAngle, setSectorAngle] = useState<number>(90);

  // Line segment state
  const [x1, setX1] = useState<number>(2);
  const [y1, setY1] = useState<number>(3);
  const [x2, setX2] = useState<number>(10);
  const [y2, setY2] = useState<number>(9);

  // Cylinder state
  const [cylR, setCylR] = useState<number>(5);
  const [cylH, setCylH] = useState<number>(12);

  // Computations
  const triangleData = useMemo(() => {
    const a = legA;
    const b = legB;
    const c = Math.sqrt(a * a + b * b);
    const area = 0.5 * a * b;
    const perimeter = a + b + c;
    const angleA = Math.atan2(a, b) * (180 / Math.PI);
    const angleB = 90 - angleA;
    const sinA = a / c;
    const cosA = b / c;
    const tanA = a / b;
    return { a, b, c, area, perimeter, angleA, angleB, sinA, cosA, tanA };
  }, [legA, legB]);

  const circleData = useMemo(() => {
    const r = radius;
    const d = 2 * r;
    const c = 2 * Math.PI * r;
    const a = Math.PI * r * r;
    const arcLen = (sectorAngle / 360) * c;
    const sectorArea = (sectorAngle / 360) * a;
    return { r, d, c, a, arcLen, sectorArea };
  }, [radius, sectorAngle]);

  const lineData = useMemo(() => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const slope = dx === 0 ? Infinity : dy / dx;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
    return { dx, dy, dist, slope, midX, midY, angleDeg };
  }, [x1, y1, x2, y2]);

  const cylinderData = useMemo(() => {
    const r = cylR;
    const h = cylH;
    const baseArea = Math.PI * r * r;
    const lateralArea = 2 * Math.PI * r * h;
    const totalSurface = 2 * baseArea + lateralArea;
    const volume = baseArea * h;
    return { r, h, baseArea, lateralArea, totalSurface, volume };
  }, [cylR, cylH]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Interactive Geometric Engine
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            Geometric Dimension &amp; Trigonometric Visualizer
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Euclidean Geometry &amp; ISO 80000-2 Trigonometry
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setShape("triangle")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            shape === "triangle"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          📐 Right Triangle (Pythagorean)
        </button>
        <button
          type="button"
          onClick={() => setShape("circle")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            shape === "circle"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          ⭕ Circle &amp; Arc Sector
        </button>
        <button
          type="button"
          onClick={() => setShape("line")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            shape === "line"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          📈 Coordinate Line (Slope &amp; Distance)
        </button>
        <button
          type="button"
          onClick={() => setShape("cylinder")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            shape === "cylinder"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          🧊 3D Solid (Volume &amp; Surface Area)
        </button>
      </div>

      {/* Sliders & Controls */}
      <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
        {shape === "triangle" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Side a (Vertical Leg): {legA} units</span>
                <span className="text-emerald-600 dark:text-emerald-400">a² = {legA * legA}</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={legA}
                onChange={(e) => setLegA(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Side b (Horizontal Leg): {legB} units</span>
                <span className="text-emerald-600 dark:text-emerald-400">b² = {legB * legB}</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={legB}
                onChange={(e) => setLegB(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {shape === "circle" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Radius (r): {radius} units</span>
                <span className="text-emerald-600 dark:text-emerald-400">d = {radius * 2}</span>
              </div>
              <input
                type="range"
                min={1}
                max={20}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Sector Central Angle (θ): {sectorAngle}°</span>
                <span className="text-emerald-600 dark:text-emerald-400">{((sectorAngle / 360) * 100).toFixed(1)}% of circle</span>
              </div>
              <input
                type="range"
                min={10}
                max={360}
                step={5}
                value={sectorAngle}
                onChange={(e) => setSectorAngle(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {shape === "line" && (
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Point 1 (x₁): {x1}</label>
              <input
                type="range"
                min={-10}
                max={15}
                value={x1}
                onChange={(e) => setX1(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Point 1 (y₁): {y1}</label>
              <input
                type="range"
                min={-10}
                max={15}
                value={y1}
                onChange={(e) => setY1(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Point 2 (x₂): {x2}</label>
              <input
                type="range"
                min={-10}
                max={15}
                value={x2}
                onChange={(e) => setX2(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Point 2 (y₂): {y2}</label>
              <input
                type="range"
                min={-10}
                max={15}
                value={y2}
                onChange={(e) => setY2(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
          </div>
        )}

        {shape === "cylinder" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Cylinder Radius (r): {cylR} units</span>
                <span className="text-emerald-600 dark:text-emerald-400">Base = {(Math.PI * cylR * cylR).toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={cylR}
                onChange={(e) => setCylR(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Cylinder Height (h): {cylH} units</span>
                <span className="text-emerald-600 dark:text-emerald-400">Lateral = {(2 * Math.PI * cylR * cylH).toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={cylH}
                onChange={(e) => setCylH(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* SVG Visualization Canvas */}
      <div className="mt-5 flex justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <svg viewBox="0 0 360 200" className="w-full max-w-md h-48 select-none">
          {shape === "triangle" && (
            <g transform="translate(60, 20)">
              {/* Scaled coordinates */}
              {(() => {
                const maxDim = Math.max(triangleData.a, triangleData.b);
                const scale = 140 / maxDim;
                const svgW = triangleData.b * scale;
                const svgH = triangleData.a * scale;
                const x0 = 20;
                const y0 = 160;
                const x1 = x0 + svgW;
                const y1 = y0;
                const x2 = x0;
                const y2 = y0 - svgH;

                return (
                  <>
                    <polygon
                      points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`}
                      className="fill-emerald-100/70 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400"
                      strokeWidth="2.5"
                    />
                    {/* Right angle marker */}
                    <rect
                      x={x0}
                      y={y0 - 15}
                      width={15}
                      height={15}
                      className="fill-none stroke-slate-400"
                      strokeWidth="1.5"
                    />
                    {/* Labels */}
                    <text x={x0 - 18} y={y0 - svgH / 2} className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200" textAnchor="middle">
                      a={triangleData.a}
                    </text>
                    <text x={x0 + svgW / 2} y={y0 + 18} className="text-[12px] font-bold fill-slate-700 dark:fill-slate-200" textAnchor="middle">
                      b={triangleData.b}
                    </text>
                    <text x={x0 + svgW / 2 + 10} y={y0 - svgH / 2 - 8} className="text-[12px] font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">
                      c={triangleData.c.toFixed(2)}
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {shape === "circle" && (
            <g transform="translate(180, 100)">
              <circle cx="0" cy="0" r="75" className="fill-slate-100 stroke-slate-300 dark:fill-slate-800 dark:stroke-slate-600" strokeWidth="2" />
              {/* Sector slice */}
              {(() => {
                const rad = (sectorAngle * Math.PI) / 180;
                const endX = 75 * Math.cos(rad);
                const endY = -75 * Math.sin(rad);
                const largeArc = sectorAngle > 180 ? 1 : 0;
                const pathData = `M 0,0 L 75,0 A 75,75 0 ${largeArc},0 ${endX},${endY} Z`;

                return (
                  <>
                    <path d={pathData} className="fill-emerald-500/30 stroke-emerald-600 dark:fill-emerald-600/40 dark:stroke-emerald-400" strokeWidth="2" />
                    <line x1="0" y1="0" x2="75" y2="0" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" strokeDasharray="3 3" />
                    <text x="35" y="-6" className="text-[11px] font-bold fill-slate-700 dark:fill-slate-200">
                      r={radius}
                    </text>
                    <text x="0" y="94" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">
                      Sector Angle θ = {sectorAngle}° (Area: {circleData.sectorArea.toFixed(1)})
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {shape === "line" && (
            <g transform="translate(180, 100)">
              {/* Grid axes */}
              <line x1="-150" y1="0" x2="150" y2="0" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
              <line x1="0" y1="-85" x2="0" y2="85" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1" />
              {(() => {
                const sx = 9;
                const sy = 6;
                const px1 = x1 * sx;
                const py1 = -y1 * sy;
                const px2 = x2 * sx;
                const py2 = -y2 * sy;

                return (
                  <>
                    <line x1={px1} y1={py1} x2={px2} y2={py2} className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="3" />
                    <circle cx={px1} cy={py1} r="5" className="fill-emerald-600" />
                    <circle cx={px2} cy={py2} r="5" className="fill-emerald-600" />
                    <text x={px1} y={py1 - 8} className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" textAnchor="middle">
                      P₁({x1},{y1})
                    </text>
                    <text x={px2} y={py2 - 8} className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" textAnchor="middle">
                      P₂({x2},{y2})
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {shape === "cylinder" && (
            <g transform="translate(180, 100)">
              {/* Isometric 3D Cylinder representation */}
              <ellipse cx="0" cy="50" rx="60" ry="20" className="fill-slate-200 stroke-slate-400 dark:fill-slate-800 dark:stroke-slate-600" strokeWidth="2" />
              <rect x="-60" y="-50" width="120" height="100" className="fill-emerald-500/20 stroke-none" />
              <line x1="-60" y1="-50" x2="-60" y2="50" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
              <line x1="60" y1="-50" x2="60" y2="50" className="stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2" />
              <ellipse cx="0" cy="-50" rx="60" ry="20" className="fill-emerald-100/80 stroke-emerald-600 dark:fill-emerald-950/60 dark:stroke-emerald-400" strokeWidth="2" />
              <line x1="0" y1="-50" x2="60" y2="-50" className="stroke-emerald-700 dark:stroke-emerald-300" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="30" y="-55" className="text-[11px] font-bold fill-slate-700 dark:fill-slate-200" textAnchor="middle">
                r={cylR}
              </text>
              <text x="75" y="5" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="start">
                h={cylH}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* 4 Dynamic Output Metric Cards */}
      <div className="mt-5 grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {shape === "triangle" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Hypotenuse (c)
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {triangleData.c.toFixed(3)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                c = √(a² + b²)
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Enclosed Area
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {triangleData.area.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                A = (a × b) ÷ 2
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Perimeter (P)
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {triangleData.perimeter.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                P = a + b + c
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Acute Angles
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {triangleData.angleA.toFixed(1)}° / {triangleData.angleB.toFixed(1)}°
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                sin(A) = {triangleData.sinA.toFixed(3)}
              </div>
            </div>
          </>
        )}

        {shape === "circle" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Area
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {circleData.a.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                A = π × r²
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Circumference
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {circleData.c.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                C = 2 × π × r
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Sector Arc Length
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {circleData.arcLen.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                s = (θ/360) × C
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Sector Area
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {circleData.sectorArea.toFixed(2)}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                A_sec = (θ/360) × πr²
              </div>
            </div>
          </>
        )}

        {shape === "line" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Euclidean Distance
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {lineData.dist.toFixed(3)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                d = √(Δx² + Δy²)
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Slope (m)
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {isFinite(lineData.slope) ? lineData.slope.toFixed(3) : "Undefined"}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                m = Δy ÷ Δx
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Midpoint (M)
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                ({lineData.midX.toFixed(1)}, {lineData.midY.toFixed(1)})
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                ((x₁+x₂)/2, (y₁+y₂)/2)
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Angle of Inclination
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {lineData.angleDeg.toFixed(1)}°
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                θ = arctan(m)
              </div>
            </div>
          </>
        )}

        {shape === "cylinder" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Enclosed Volume
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {cylinderData.volume.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                V = π × r² × h
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Surface Area
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {cylinderData.totalSurface.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                A = 2πr(r + h)
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Lateral Area
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {cylinderData.lateralArea.toFixed(2)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                A_lat = 2 × π × r × h
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Base Surface Area
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {cylinderData.baseArea.toFixed(2)}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                A_base = π × r²
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
