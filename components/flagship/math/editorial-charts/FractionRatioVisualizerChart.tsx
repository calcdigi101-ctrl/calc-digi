"use client";

import React, { useState, useMemo } from "react";

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

export function FractionRatioVisualizerChart() {
  const [numerator, setNumerator] = useState<number>(3);
  const [denominator, setDenominator] = useState<number>(8);

  const presets = [
    { label: "1/8", num: 1, den: 8 },
    { label: "1/4", num: 1, den: 4 },
    { label: "1/3", num: 1, den: 3 },
    { label: "3/8", num: 3, den: 8 },
    { label: "1/2", num: 1, den: 2 },
    { label: "2/3", num: 2, den: 3 },
    { label: "3/4", num: 3, den: 4 },
    { label: "7/8", num: 7, den: 8 },
  ];

  const {
    gcd,
    simpNum,
    simpDen,
    decimalVal,
    isTerminating,
    percentageVal,
    partToPart,
    isImproper,
    mixedWhole,
    mixedRemainder,
  } = useMemo(() => {
    const d = denominator || 1;
    const n = numerator;
    const g = getGcd(n, d);
    const sn = n / g;
    const sd = d / g;

    // Check if terminating decimal: denominator factors only 2 and 5
    let tempD = sd;
    while (tempD % 2 === 0) tempD /= 2;
    while (tempD % 5 === 0) tempD /= 5;
    const terminating = tempD === 1;

    const dec = n / d;
    const pct = dec * 100;

    const remaining = Math.max(0, d - n);
    const p2p = `${n} : ${remaining}`;

    const improper = n >= d;
    const whole = Math.floor(n / d);
    const rem = n % d;

    return {
      gcd: g,
      simpNum: sn,
      simpDen: sd,
      decimalVal: dec,
      isTerminating: terminating,
      percentageVal: pct,
      partToPart: p2p,
      isImproper: improper,
      mixedWhole: whole,
      mixedRemainder: rem,
    };
  }, [numerator, denominator]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Interactive Visualizer
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            Fraction, Decimal, Percentage &amp; Ratio Continuum
          </h3>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          ISO 80000-1 / NIST Mathematical Notation
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1">
          Quick Presets:
        </span>
        {presets.map((p) => {
          const isSelected = numerator === p.num && denominator === p.den;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                setNumerator(p.num);
                setDenominator(p.den);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-sm dark:bg-emerald-500"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Sliders */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Numerator (Parts Selected): {numerator}</span>
            <span className="text-emerald-600 dark:text-emerald-400">n = {numerator}</span>
          </div>
          <input
            type="range"
            min={1}
            max={24}
            step={1}
            value={numerator}
            onChange={(e) => setNumerator(Number(e.target.value))}
            className="mt-2 w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>1</span>
            <span>12</span>
            <span>24</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Denominator (Total Equal Parts): {denominator}</span>
            <span className="text-emerald-600 dark:text-emerald-400">d = {denominator}</span>
          </div>
          <input
            type="range"
            min={1}
            max={24}
            step={1}
            value={denominator}
            onChange={(e) => setDenominator(Math.max(1, Number(e.target.value)))}
            className="mt-2 w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
            <span>1</span>
            <span>12</span>
            <span>24</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Metric Cards */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Fraction Form
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {numerator}/{denominator}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            {gcd > 1 ? `Simplified: ${simpNum}/${simpDen}` : "Already Irreducible"}
          </div>
          {isImproper && (
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Mixed: {mixedWhole} {mixedRemainder > 0 ? `${mixedRemainder}/${denominator}` : ""}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Decimal Value
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {decimalVal.toFixed(4).replace(/\.?0+$/, "") || "0"}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            {isTerminating ? "Terminating" : "Repeating (Periodic)"}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Percentage
          </div>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {percentageVal.toFixed(2)}%
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Per 100 Base Units
          </div>
        </div>

        <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Ratio Equivalence
          </div>
          <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {simpNum} : {simpDen}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Part-to-Part: {partToPart}
          </div>
        </div>
      </div>

      {/* Segmented Blocks Visualizer */}
      <div className="mt-5 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <span>Visual Segment Grid ({denominator} total segments)</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {numerator} of {denominator} selected ({Math.min(100, Math.round(percentageVal))}%)
          </span>
        </div>

        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${Math.min(denominator, 12)}, minmax(0, 1fr))` }}>
          {Array.from({ length: denominator }).map((_, idx) => {
            const isFilled = idx < numerator;
            return (
              <div
                key={idx}
                className={`h-9 rounded-md flex items-center justify-center text-[10px] font-bold transition-all ${
                  isFilled
                    ? "bg-emerald-500 text-white shadow-xs dark:bg-emerald-600"
                    : "bg-slate-200/80 text-slate-400 dark:bg-slate-700/60 dark:text-slate-500"
                }`}
                title={`Unit segment ${idx + 1} of ${denominator} (value: ${(1 / denominator).toFixed(4)})`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>

        {/* Linear Continuum Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span>0.0 (0%)</span>
            <span>0.5 (50%)</span>
            <span>1.0 (100%)</span>
            {isImproper && <span>&gt; 1.0 ({percentageVal.toFixed(0)}%)</span>}
          </div>
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${Math.min(100, percentageVal)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
