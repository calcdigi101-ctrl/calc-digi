"use client";

import React, { useState, useMemo } from "react";

type AlgMode = "quadratic" | "exp_log" | "matrix";

export function AlgebraFunctionVisualizerChart() {
  const [mode, setMode] = useState<AlgMode>("quadratic");

  // Quadratic state: ax² + bx + c
  const [qa, setQa] = useState<number>(1);
  const [qb, setQb] = useState<number>(-2);
  const [qc, setQc] = useState<number>(-3);

  // Exp/Log state: base^x
  const [baseVal, setBaseVal] = useState<number>(2);
  const [expX, setExpX] = useState<number>(3);

  // 2x2 Matrix state: [a b; c d]
  const [m11, setM11] = useState<number>(2);
  const [m12, setM12] = useState<number>(1);
  const [m21, setM21] = useState<number>(1);
  const [m22, setM22] = useState<number>(3);

  // Computations
  const quadData = useMemo(() => {
    const a = qa === 0 ? 0.001 : qa;
    const b = qb;
    const c = qc;
    const disc = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;

    let rootType: "two_real" | "one_real" | "complex" = "two_real";
    let r1 = "";
    let r2 = "";

    if (disc > 0) {
      rootType = "two_real";
      const x1 = (-b + Math.sqrt(disc)) / (2 * a);
      const x2 = (-b - Math.sqrt(disc)) / (2 * a);
      r1 = x1.toFixed(3);
      r2 = x2.toFixed(3);
    } else if (Math.abs(disc) < 1e-9) {
      rootType = "one_real";
      const x = -b / (2 * a);
      r1 = x.toFixed(3);
      r2 = r1;
    } else {
      rootType = "complex";
      const realP = (-b / (2 * a)).toFixed(2);
      const imagP = (Math.sqrt(-disc) / (2 * Math.abs(a))).toFixed(2);
      r1 = `${realP} + ${imagP}i`;
      r2 = `${realP} − ${imagP}i`;
    }

    // Parabola SVG points
    const points: string[] = [];
    for (let x = -6; x <= 6; x += 0.25) {
      const y = a * x * x + b * x + c;
      const svgX = 180 + x * 20;
      const svgY = 100 - y * 6;
      if (svgY >= -20 && svgY <= 220) {
        points.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
      }
    }

    return { a, b, c, disc, vertexX, vertexY, rootType, r1, r2, pathPoints: points.join(" ") };
  }, [qa, qb, qc]);

  const expLogData = useMemo(() => {
    const b = baseVal;
    const x = expX;
    const powVal = Math.pow(b, x);
    const lnVal = Math.log(powVal);
    const log10Val = Math.log10(powVal);
    const logBVal = Math.log(powVal) / Math.log(b);
    return { b, x, powVal, lnVal, log10Val, logBVal };
  }, [baseVal, expX]);

  const matrixData = useMemo(() => {
    const det = m11 * m22 - m12 * m21;
    const trace = m11 + m22;
    const disc = trace * trace - 4 * det;
    let eig1 = "";
    let eig2 = "";
    if (disc >= 0) {
      eig1 = ((trace + Math.sqrt(disc)) / 2).toFixed(2);
      eig2 = ((trace - Math.sqrt(disc)) / 2).toFixed(2);
    } else {
      const re = (trace / 2).toFixed(2);
      const im = (Math.sqrt(-disc) / 2).toFixed(2);
      eig1 = `${re} + ${im}i`;
      eig2 = `${re} − ${im}i`;
    }
    const isInvertible = Math.abs(det) > 1e-9;
    return { det, trace, eig1, eig2, isInvertible };
  }, [m11, m12, m21, m22]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Interactive Algebraic Engine
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            Algebraic Function &amp; Polynomial Visualizer
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Algebraic Rings, Fields &amp; ISO 80000-2 Functions
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("quadratic")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            mode === "quadratic"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          📈 Quadratic Parabola (ax² + bx + c)
        </button>
        <button
          type="button"
          onClick={() => setMode("exp_log")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            mode === "exp_log"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          ⚡ Exponents &amp; Logarithms (bˣ &amp; log_b)
        </button>
        <button
          type="button"
          onClick={() => setMode("matrix")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            mode === "matrix"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          🔲 2×2 Matrix Algebra &amp; Determinant
        </button>
      </div>

      {/* Sliders & Controls */}
      <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
        {mode === "quadratic" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Leading Term (a): {qa}</span>
                <span className="text-emerald-600 dark:text-emerald-400">{qa > 0 ? "Opens Up" : "Opens Down"}</span>
              </div>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.5}
                value={qa}
                onChange={(e) => setQa(Number(e.target.value) || 0.5)}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Linear Term (b): {qb}</span>
                <span className="text-emerald-600 dark:text-emerald-400">b = {qb}</span>
              </div>
              <input
                type="range"
                min={-8}
                max={8}
                step={1}
                value={qb}
                onChange={(e) => setQb(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Constant Term (c): {qc}</span>
                <span className="text-emerald-600 dark:text-emerald-400">y-int = (0, {qc})</span>
              </div>
              <input
                type="range"
                min={-8}
                max={8}
                step={1}
                value={qc}
                onChange={(e) => setQc(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {mode === "exp_log" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Base (b): {baseVal}</span>
                <span className="text-emerald-600 dark:text-emerald-400">Growth Base</span>
              </div>
              <input
                type="range"
                min={1.5}
                max={5}
                step={0.5}
                value={baseVal}
                onChange={(e) => setBaseVal(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Exponent / Power (x): {expX}</span>
                <span className="text-emerald-600 dark:text-emerald-400">{baseVal}^{expX}</span>
              </div>
              <input
                type="range"
                min={-3}
                max={6}
                step={1}
                value={expX}
                onChange={(e) => setExpX(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {mode === "matrix" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">a₁₁: {m11}</label>
              <input
                type="range"
                min={-5}
                max={5}
                value={m11}
                onChange={(e) => setM11(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">a₁₂: {m12}</label>
              <input
                type="range"
                min={-5}
                max={5}
                value={m12}
                onChange={(e) => setM12(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">a₂₁: {m21}</label>
              <input
                type="range"
                min={-5}
                max={5}
                value={m21}
                onChange={(e) => setM21(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">a₂₂: {m22}</label>
              <input
                type="range"
                min={-5}
                max={5}
                value={m22}
                onChange={(e) => setM22(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer mt-1"
              />
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Graph Canvas */}
      <div className="mt-5 flex justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <svg viewBox="0 0 360 200" className="w-full max-w-md h-48 select-none">
          {/* Coordinate axes */}
          <line x1="20" y1="100" x2="340" y2="100" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
          <line x1="180" y1="10" x2="180" y2="190" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />

          {mode === "quadratic" && (
            <g>
              <polyline
                points={quadData.pathPoints}
                className="fill-none stroke-emerald-600 dark:stroke-emerald-400"
                strokeWidth="2.5"
              />
              {/* Vertex Point */}
              {(() => {
                const vx = 180 + quadData.vertexX * 20;
                const vy = 100 - quadData.vertexY * 6;
                if (vy >= 10 && vy <= 190 && vx >= 20 && vx <= 340) {
                  return (
                    <>
                      <circle cx={vx} cy={vy} r="4.5" className="fill-emerald-600" />
                      <text x={vx} y={vy - 8} className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200" textAnchor="middle">
                        V({quadData.vertexX.toFixed(1)}, {quadData.vertexY.toFixed(1)})
                      </text>
                    </>
                  );
                }
                return null;
              })()}
              <text x="330" y="95" className="text-[10px] fill-slate-400">x</text>
              <text x="185" y="25" className="text-[10px] fill-slate-400">y</text>
            </g>
          )}

          {mode === "exp_log" && (
            <g>
              {/* Exponential curve */}
              {(() => {
                const pts: string[] = [];
                for (let x = -3; x <= 4; x += 0.2) {
                  const y = Math.pow(expLogData.b, x);
                  const sx = 180 + x * 30;
                  const sy = 100 - y * 4;
                  if (sy >= 10 && sy <= 190 && sx >= 20 && sx <= 340) {
                    pts.push(`${sx.toFixed(1)},${sy.toFixed(1)}`);
                  }
                }
                const activeX = 180 + expLogData.x * 30;
                const activeY = 100 - expLogData.powVal * 4;

                return (
                  <>
                    <polyline points={pts.join(" ")} className="fill-none stroke-emerald-600 dark:stroke-emerald-400" strokeWidth="2.5" />
                    {activeY >= 10 && activeY <= 190 && activeX >= 20 && activeX <= 340 && (
                      <>
                        <circle cx={activeX} cy={activeY} r="5" className="fill-emerald-600" />
                        <text x={activeX} y={activeY - 8} className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">
                          ({expLogData.x}, {expLogData.powVal.toFixed(1)})
                        </text>
                      </>
                    )}
                  </>
                );
              })()}
              <text x="260" y="40" className="text-[11px] font-bold fill-emerald-600 dark:fill-emerald-400">
                y = {expLogData.b}ˣ
              </text>
            </g>
          )}

          {mode === "matrix" && (
            <g transform="translate(180, 100)">
              {/* Original unit square */}
              <polygon points="0,0 40,0 40,-40 0,-40" className="fill-slate-200/50 stroke-slate-400" strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Transformed parallelogram: [a b; c d] * [x; y] */}
              {(() => {
                const s = 15;
                const p0 = "0,0";
                const p1 = `${m11 * s},${-m21 * s}`;
                const p2 = `${(m11 + m12) * s},${-(m21 + m22) * s}`;
                const p3 = `${m12 * s},${-m22 * s}`;

                return (
                  <>
                    <polygon points={`${p0} ${p1} ${p2} ${p3}`} className="fill-emerald-500/30 stroke-emerald-600 dark:fill-emerald-600/40 dark:stroke-emerald-400" strokeWidth="2" />
                    <text x="0" y="65" className="text-[11px] font-bold fill-slate-700 dark:fill-slate-200" textAnchor="middle">
                      Unit Square Transformed Area = |det(A)| = {Math.abs(matrixData.det).toFixed(1)}
                    </text>
                  </>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* 4 Dynamic Output Metric Cards */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {mode === "quadratic" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Discriminant (Δ)
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {quadData.disc.toFixed(1)}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {quadData.disc > 0 ? "2 Distinct Real Roots" : quadData.disc === 0 ? "1 Repeated Real Root" : "2 Complex Conjugates"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Root x₁
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {quadData.r1}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                x = (−b + √Δ) ÷ 2a
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Root x₂
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {quadData.r2}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                x = (−b − √Δ) ÷ 2a
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Vertex (h, k)
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                ({quadData.vertexX.toFixed(2)}, {quadData.vertexY.toFixed(2)})
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                h = −b / 2a
              </div>
            </div>
          </>
        )}

        {mode === "exp_log" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Power Value (bˣ)
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {expLogData.powVal.toFixed(3).replace(/\.?0+$/, "")}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {expLogData.b}^{expLogData.x}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Log Base {expLogData.b}
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {expLogData.logBVal.toFixed(3)}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                log_b(y) = x
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Natural Log (ln)
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {expLogData.lnVal.toFixed(3)}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Base e (Euler constant)
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Common Log (log₁₀)
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {expLogData.log10Val.toFixed(3)}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                Orders of Magnitude
              </div>
            </div>
          </>
        )}

        {mode === "matrix" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Determinant |A|
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {matrixData.det.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {matrixData.isInvertible ? "Invertible (Regular)" : "Singular (Det = 0)"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Matrix Trace
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {matrixData.trace.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                tr(A) = a₁₁ + a₂₂
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Eigenvalue λ₁
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {matrixData.eig1}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                det(A − λI) = 0
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Eigenvalue λ₂
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {matrixData.eig2}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                Characteristic Root
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
