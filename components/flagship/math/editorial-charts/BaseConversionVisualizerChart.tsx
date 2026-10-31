"use client";

import React, { useState, useMemo } from "react";

type VisualizerMode = "bases" | "scientific" | "sigfigs";

interface BaseConversionVisualizerChartProps {
  initialMode?: VisualizerMode;
}

export function BaseConversionVisualizerChart({
  initialMode = "bases",
}: BaseConversionVisualizerChartProps = {}) {
  const [mode, setMode] = useState<VisualizerMode>(initialMode);

  // Bases State
  const [decVal, setDecVal] = useState<number>(42);

  // Scientific State
  const [mantissa, setMantissa] = useState<number>(2.997);
  const [exponent, setExponent] = useState<number>(8);

  // SigFigs State
  const [sigInput, setSigInput] = useState<string>("0.004520");

  // Bases computations
  const baseData = useMemo(() => {
    const val = Math.max(0, Math.min(255, Math.floor(decVal || 0)));
    const binStr = val.toString(2).padStart(8, "0");
    const hexStr = val.toString(16).toUpperCase().padStart(2, "0");
    const octStr = val.toString(8).padStart(3, "0");
    const bits = binStr.split("").map((b) => b === "1");
    return { val, binStr, hexStr, octStr, bits };
  }, [decVal]);

  // Scientific computations
  const sciData = useMemo(() => {
    const m = Math.round(mantissa * 1000) / 1000;
    const e = exponent;
    const standardVal = m * Math.pow(10, e);
    let scaleLabel = "Everyday Macro Scale";
    if (e <= -15) scaleLabel = "Subatomic Particle Scale (Femto / Atto)";
    else if (e <= -9) scaleLabel = "Nanotechnology / Atomic Dimensions";
    else if (e <= -6) scaleLabel = "Microscopic Biological Cell Scale";
    else if (e <= -3) scaleLabel = "Millimeter Precision Engineering";
    else if (e >= 12) scaleLabel = "Cosmological / Astronomical Distances";
    else if (e >= 9) scaleLabel = "Gigascale Data / Planetary Mass";
    else if (e >= 6) scaleLabel = "Megascale Demographic & Financial Bounds";

    return { m, e, standardVal, scaleLabel };
  }, [mantissa, exponent]);

  // SigFigs computations
  const sigData = useMemo(() => {
    const s = sigInput.trim();
    if (!s) return { count: 0, breakdown: [] };

    // Breakdown digits
    let started = false;
    let hasDec = s.includes(".");
    const breakdown: { char: string; type: string; isSig: boolean }[] = [];
    let sigCount = 0;

    // Standard sig fig counting
    const cleanNum = s.replace(/^[+-]/, "");
    const parts = cleanNum.split(".");

    for (let i = 0; i < cleanNum.length; i++) {
      const c = cleanNum[i];
      if (c === ".") {
        breakdown.push({ char: ".", type: "Decimal Point", isSig: false });
        continue;
      }
      if (c >= "1" && c <= "9") {
        started = true;
        sigCount++;
        breakdown.push({ char: c, type: "Non-Zero Significant", isSig: true });
      } else if (c === "0") {
        if (!started) {
          // Leading zero
          breakdown.push({ char: "0", type: "Leading Zero (Placeholder)", isSig: false });
        } else {
          // Captive or trailing
          const remainingNonZero = cleanNum.slice(i).match(/[1-9]/);
          if (remainingNonZero) {
            sigCount++;
            breakdown.push({ char: "0", type: "Captive Zero (Between Non-Zeros)", isSig: true });
          } else {
            // Trailing zero
            if (hasDec) {
              sigCount++;
              breakdown.push({ char: "0", type: "Trailing Zero after Decimal", isSig: true });
            } else {
              breakdown.push({ char: "0", type: "Trailing Zero without Decimal (Ambiguous)", isSig: false });
            }
          }
        }
      }
    }

    return { count: sigCount, breakdown };
  }, [sigInput]);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Interactive Number System Visualizer
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Radix Bases, Exponential Notation & Precision Anatomy
          </h3>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setMode("bases")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              mode === "bases"
                ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Radix Bases (2, 8, 10, 16)
          </button>
          <button
            type="button"
            onClick={() => setMode("scientific")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              mode === "scientific"
                ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Scientific Mantissa (10ᵉ)
          </button>
          <button
            type="button"
            onClick={() => setMode("sigfigs")}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              mode === "sigfigs"
                ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Sig Fig Anatomy
          </button>
        </div>
      </div>

      {/* MODE 1: BASES */}
      {mode === "bases" && (
        <div className="mt-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                Decimal Integer Value (0 to 255):
              </label>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {baseData.val}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="255"
              value={baseData.val}
              onChange={(e) => setDecVal(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* 8-Bit Register Display */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              8-Bit Hardware Register (Base 2 Binary):
            </span>
            <div className="grid grid-cols-8 gap-2">
              {[128, 64, 32, 16, 8, 4, 2, 1].map((weight, idx) => {
                const bit = baseData.bits[idx];
                return (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => {
                      const newVal = bit ? baseData.val - weight : baseData.val + weight;
                      setDecVal(newVal);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition ${
                      bit
                        ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-500 dark:text-emerald-300 shadow-sm font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700"
                    }`}
                  >
                    <span className="text-lg font-mono">{bit ? "1" : "0"}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">2^{7 - idx}</span>
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{weight}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Radix Output Cards */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
              <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Binary (Base 2)</span>
              <p className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white">
                0b{baseData.binStr}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
              <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Octal (Base 8)</span>
              <p className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white">
                0o{baseData.octStr}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
              <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Decimal (Base 10)</span>
              <p className="mt-1 font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                {baseData.val}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center dark:border-slate-800 dark:bg-slate-800/60">
              <span className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Hexadecimal (Base 16)</span>
              <p className="mt-1 font-mono text-base font-bold text-purple-600 dark:text-purple-400">
                0x{baseData.hexStr}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SCIENTIFIC NOTATION */}
      {mode === "scientific" && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  Mantissa (1.000 to 9.999):
                </label>
                <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {sciData.m.toFixed(3)}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="9.999"
                step="0.001"
                value={mantissa}
                onChange={(e) => setMantissa(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  Exponent Power of 10 (e):
                </label>
                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {sciData.e >= 0 ? `+${sciData.e}` : sciData.e}
                </span>
              </div>
              <input
                type="range"
                min="-20"
                max="24"
                step="1"
                value={exponent}
                onChange={(e) => setExponent(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Scientific Output Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Scientific Notation Expression
                </span>
                <p className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
                  <span className="text-emerald-600 dark:text-emerald-400">{sciData.m.toFixed(3)}</span>
                  {" × "}
                  <span className="text-indigo-600 dark:text-indigo-400">10^{sciData.e}</span>
                </p>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1 block">
                  Engineering / E-Notation: {sciData.m.toFixed(3)}e{sciData.e >= 0 ? `+${sciData.e}` : sciData.e}
                </span>
              </div>
              <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 dark:sm:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Physical Scale Domain
                </span>
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {sciData.scaleLabel}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SIGNIFICANT FIGURES */}
      {mode === "sigfigs" && (
        <div className="mt-6 space-y-6">
          <div>
            <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 block mb-2">
              Enter any real decimal measurement number:
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={sigInput}
                onChange={(e) => setSigInput(e.target.value)}
                placeholder="e.g. 0.004520, 10200, 3.14159"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-mono text-slate-900 shadow-sm focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-emerald-50 px-4 py-2.5 font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                <span className="text-xl">{sigData.count}</span>
                <span className="text-xs font-semibold uppercase">Sig Figs</span>
              </div>
            </div>
          </div>

          {/* Digit-by-digit visual breakdown */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
              Digit-by-Digit Rule Inspection:
            </span>
            <div className="flex flex-wrap gap-2">
              {sigData.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center transition ${
                    item.isSig
                      ? "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40"
                      : "border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800/40"
                  }`}
                >
                  <span className={`text-xl font-mono font-bold ${item.isSig ? "text-emerald-700 dark:text-emerald-300" : "text-slate-400"}`}>
                    {item.char}
                  </span>
                  <span className="text-[9px] font-semibold mt-1 max-w-[85px] leading-tight">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>ISO 80000-2 & IEEE 754 Floating-Point Standard Compliance</span>
        <span>Deterministic Radix Transformations</span>
      </div>
    </div>
  );
}
