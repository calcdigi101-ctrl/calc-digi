"use client";

import React, { useState, useMemo } from "react";

type TheoryMode = "factors" | "gcd_lcm" | "combinatorics";

function getGcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function factorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export function NumberTheoryFactorVisualizerChart({
  initialMode = "factors",
}: {
  initialMode?: TheoryMode;
} = {}) {
  const [mode, setMode] = useState<TheoryMode>(initialMode);

  // Factors state
  const [targetN, setTargetN] = useState<number>(36);

  // GCD/LCM state
  const [numA, setNumA] = useState<number>(24);
  const [numB, setNumB] = useState<number>(36);

  // Combinatorics state
  const [combN, setCombN] = useState<number>(8);
  const [combR, setCombR] = useState<number>(3);

  // Factor calculations
  const factorData = useMemo(() => {
    const n = Math.max(2, targetN);
    const factors: number[] = [];
    const primeFactors: { [key: number]: number } = {};

    let temp = n;
    let d = 2;
    while (d * d <= temp) {
      if (temp % d === 0) {
        primeFactors[d] = (primeFactors[d] || 0) + 1;
        temp /= d;
      } else {
        d++;
      }
    }
    if (temp > 1) {
      primeFactors[temp] = (primeFactors[temp] || 0) + 1;
    }

    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }

    const isPrime = factors.length === 2;
    const divisorSum = factors.reduce((a, b) => a + b, 0);
    const properSum = divisorSum - n;
    const classification = properSum === n ? "Perfect Number" : properSum > n ? "Abundant" : "Deficient";

    const primeString = Object.entries(primeFactors)
      .map(([p, exp]) => (exp > 1 ? `${p}^${exp}` : `${p}`))
      .join(" × ");

    return { n, isPrime, factors, primeString, count: factors.length, divisorSum, properSum, classification };
  }, [targetN]);

  // GCD/LCM calculations
  const gcdLcmData = useMemo(() => {
    const a = Math.max(1, numA);
    const b = Math.max(1, numB);
    const g = getGcd(a, b);
    const l = (a * b) / g;
    const isCoprime = g === 1;
    return { a, b, gcd: g, lcm: l, isCoprime };
  }, [numA, numB]);

  // Combinatorics calculations
  const combData = useMemo(() => {
    const n = Math.max(1, combN);
    const r = Math.min(n, Math.max(0, combR));
    const nFact = factorial(n);
    const rFact = factorial(r);
    const nMinusRFact = factorial(n - r);
    const nPr = nFact / nMinusRFact;
    const nCr = nPr / rFact;
    return { n, r, nPr, nCr, symmetryR: n - r };
  }, [combN, combR]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Interactive Number Theory Engine
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            Number Theory, Factorization &amp; Combinatorics Visualizer
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Euclidean Primes &amp; ISO 80000-2 Discrete Mathematics
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("factors")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            mode === "factors"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          🔢 Primes &amp; Factorization (n)
        </button>
        <button
          type="button"
          onClick={() => setMode("gcd_lcm")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            mode === "gcd_lcm"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          ⚖️ GCD &amp; LCM Venn Relation (a, b)
        </button>
        <button
          type="button"
          onClick={() => setMode("combinatorics")}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
            mode === "combinatorics"
              ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          🎲 Permutations &amp; Combinations (nPr / nCr)
        </button>
      </div>

      {/* Sliders & Controls */}
      <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
        {mode === "factors" && (
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Select Integer to Factor: {targetN}</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {factorData.isPrime ? "Prime Number" : "Composite Number"}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={100}
              step={1}
              value={targetN}
              onChange={(e) => setTargetN(Number(e.target.value))}
              className="mt-2 w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>2</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100</span>
            </div>
          </div>
        )}

        {mode === "gcd_lcm" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>First Number (a): {numA}</span>
                <span className="text-emerald-600 dark:text-emerald-400">a = {numA}</span>
              </div>
              <input
                type="range"
                min={2}
                max={72}
                value={numA}
                onChange={(e) => setNumA(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Second Number (b): {numB}</span>
                <span className="text-emerald-600 dark:text-emerald-400">b = {numB}</span>
              </div>
              <input
                type="range"
                min={2}
                max={72}
                value={numB}
                onChange={(e) => setNumB(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {mode === "combinatorics" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Total Set Items (n): {combN}</span>
                <span className="text-emerald-600 dark:text-emerald-400">n! = {factorial(combN).toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                value={combN}
                onChange={(e) => {
                  const newN = Number(e.target.value);
                  setCombN(newN);
                  if (combR > newN) setCombR(newN);
                }}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Subset Selected (r): {combR}</span>
                <span className="text-emerald-600 dark:text-emerald-400">r ≤ n</span>
              </div>
              <input
                type="range"
                min={0}
                max={combN}
                value={combR}
                onChange={(e) => setCombR(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* SVG Visualization Canvas */}
      <div className="mt-5 flex justify-center rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <svg viewBox="0 0 360 180" className="w-full max-w-md h-44 select-none">
          {mode === "factors" && (
            <g transform="translate(180, 20)">
              {/* Central Number Circle */}
              <circle cx="0" cy="25" r="24" className="fill-emerald-600 text-white shadow-sm" />
              <text x="0" y="30" className="text-[13px] font-bold fill-white" textAnchor="middle">
                {factorData.n}
              </text>

              {/* Prime Factorization Display */}
              <text x="0" y="70" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100" textAnchor="middle">
                Prime Canonical Form: {factorData.primeString}
              </text>
              <text x="0" y="90" className="text-[11px] fill-emerald-600 dark:fill-emerald-400 font-semibold" textAnchor="middle">
                {factorData.classification} (Sum of proper divisors: {factorData.properSum})
              </text>

              {/* Visual factor grid chips */}
              <g transform="translate(-160, 105)">
                {factorData.factors.slice(0, 14).map((fac, idx) => (
                  <g key={fac} transform={`translate(${idx * 23}, 0)`}>
                    <rect width="20" height="20" rx="4" className="fill-white stroke-slate-300 dark:fill-slate-900 dark:stroke-slate-700" />
                    <text x="10" y="14" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-300" textAnchor="middle">
                      {fac}
                    </text>
                  </g>
                ))}
              </g>
              <text x="0" y="150" className="text-[10px] fill-slate-400" textAnchor="middle">
                All {factorData.count} Divisors of {factorData.n}
              </text>
            </g>
          )}

          {mode === "gcd_lcm" && (
            <g transform="translate(180, 90)">
              {/* Venn Diagram Circles */}
              <circle cx="-40" cy="0" r="55" className="fill-emerald-500/20 stroke-emerald-600 dark:fill-emerald-950/40 dark:stroke-emerald-400" strokeWidth="2" />
              <circle cx="40" cy="0" r="55" className="fill-teal-500/20 stroke-teal-600 dark:fill-teal-950/40 dark:stroke-teal-400" strokeWidth="2" />

              {/* Left Only */}
              <text x="-65" y="-5" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100" textAnchor="middle">
                a = {gcdLcmData.a}
              </text>
              <text x="-65" y="15" className="text-[10px] fill-slate-500 dark:text-slate-400" textAnchor="middle">
                a ÷ gcd = {gcdLcmData.a / gcdLcmData.gcd}
              </text>

              {/* Overlap: GCD */}
              <text x="0" y="-8" className="text-[11px] font-bold fill-emerald-700 dark:fill-emerald-300" textAnchor="middle">
                GCD
              </text>
              <text x="0" y="15" className="text-[16px] font-black fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">
                {gcdLcmData.gcd}
              </text>

              {/* Right Only */}
              <text x="65" y="-5" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100" textAnchor="middle">
                b = {gcdLcmData.b}
              </text>
              <text x="65" y="15" className="text-[10px] fill-slate-500 dark:text-slate-400" textAnchor="middle">
                b ÷ gcd = {gcdLcmData.b / gcdLcmData.gcd}
              </text>

              <text x="0" y="75" className="text-[11px] font-semibold fill-slate-700 dark:fill-slate-300" textAnchor="middle">
                LCM(a, b) = {gcdLcmData.lcm} (Product: a × b = {gcdLcmData.a * gcdLcmData.b} = GCD × LCM)
              </text>
            </g>
          )}

          {mode === "combinatorics" && (
            <g transform="translate(180, 25)">
              <text x="0" y="15" className="text-[12px] font-bold fill-slate-800 dark:fill-slate-100" textAnchor="middle">
                Choosing {combData.r} from {combData.n} Total Elements
              </text>

              {/* Visual Element Balls */}
              <g transform="translate(-140, 35)">
                {Array.from({ length: Math.min(combData.n, 12) }).map((_, idx) => {
                  const isSelected = idx < combData.r;
                  return (
                    <g key={idx} transform={`translate(${idx * 24}, 0)`}>
                      <circle
                        cx="10"
                        cy="10"
                        r="10"
                        className={isSelected ? "fill-emerald-600" : "fill-slate-200 dark:fill-slate-700"}
                      />
                      <text x="10" y="14" className={`text-[10px] font-bold ${isSelected ? "fill-white" : "fill-slate-500"}`} textAnchor="middle">
                        {idx + 1}
                      </text>
                    </g>
                  );
                })}
              </g>

              <text x="0" y="90" className="text-[13px] font-bold fill-emerald-600 dark:fill-emerald-400" textAnchor="middle">
                Combinations C({combData.n}, {combData.r}) = {combData.nCr.toLocaleString()}
              </text>
              <text x="0" y="112" className="text-[11px] fill-slate-600 dark:fill-slate-300" textAnchor="middle">
                Permutations P({combData.n}, {combData.r}) = {combData.nPr.toLocaleString()} (Order Matters)
              </text>
              <text x="0" y="132" className="text-[10px] fill-slate-400" textAnchor="middle">
                Symmetric Identity: C({combData.n}, {combData.r}) = C({combData.n}, {combData.symmetryR})
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* 4 Dynamic Output Metric Cards */}
      <div className="mt-5 grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {mode === "factors" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Prime Status
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {factorData.isPrime ? "Prime" : "Composite"}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {factorData.isPrime ? "Divisible only by 1 & self" : `${factorData.count} Divisors`}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Prime Factors
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {factorData.primeString || factorData.n}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Fundamental Theorem
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Divisors τ(n)
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {factorData.count}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Divisor Function τ
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Aliquot Sum s(n)
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {factorData.properSum}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                {factorData.classification}
              </div>
            </div>
          </>
        )}

        {mode === "gcd_lcm" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                GCD (HCF)
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {gcdLcmData.gcd}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Euclidean Algorithm
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                LCM
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {gcdLcmData.lcm}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                lcm(a,b) = (ab)/gcd
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Coprime Check
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {gcdLcmData.isCoprime ? "Yes (Coprime)" : "No (Shared)"}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                gcd(a, b) = 1
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Product Product
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {gcdLcmData.a * gcdLcmData.b}
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                GCD × LCM = a × b
              </div>
            </div>
          </>
        )}

        {mode === "combinatorics" && (
          <>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Combinations (nCr)
              </div>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {combData.nCr.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Order Does NOT Matter
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Permutations (nPr)
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {combData.nPr.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Order DOES Matter
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Perm / Comb Ratio
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {factorial(combData.r).toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                r! = {combData.r}! permutations
              </div>
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Symmetric nCr
              </div>
              <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                C({combData.n}, {combData.symmetryR})
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                Pascal&apos;s Symmetry
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
