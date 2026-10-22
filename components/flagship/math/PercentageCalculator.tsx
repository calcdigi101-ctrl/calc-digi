"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, Share2, ArrowRight, Percent, TrendingUp, DollarSign, Calculator } from "lucide-react";

type CalcMode = "part_of_whole" | "what_percent" | "change" | "add_sub";

export function PercentageCalculator() {
  const [mode, setMode] = useState<CalcMode>("part_of_whole");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);

  // Mode 1: What is X% of Y?
  const [m1Pct, setM1Pct] = useState<string>("15");
  const [m1Val, setM1Val] = useState<string>("200");

  // Mode 2: X is what % of Y?
  const [m2Part, setM2Part] = useState<string>("30");
  const [m2Whole, setM2Whole] = useState<string>("150");

  // Mode 3: Percentage change from X to Y
  const [m3From, setM3From] = useState<string>("100");
  const [m3To, setM3To] = useState<string>("125");

  // Mode 4: Add / Subtract Percentage (e.g. Tax / Discount)
  const [m4Val, setM4Val] = useState<string>("120");
  const [m4Pct, setM4Pct] = useState<string>("20");
  const [m4Op, setM4Op] = useState<"add" | "sub">("add");

  // Read URL params on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const m = params.get("mode");
    if (m === "part_of_whole" || m === "what_percent" || m === "change" || m === "add_sub") {
      setMode(m);
    }
    if (params.get("x")) setM1Pct(params.get("x")!);
    if (params.get("y")) setM1Val(params.get("y")!);
    if (params.get("from")) setM3From(params.get("from")!);
    if (params.get("to")) setM3To(params.get("to")!);
  }, []);

  // Sync URL state
  const syncUrl = (newMode: CalcMode) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("mode", newMode);
    if (newMode === "part_of_whole") {
      url.searchParams.set("x", m1Pct);
      url.searchParams.set("y", m1Val);
    } else if (newMode === "change") {
      url.searchParams.set("from", m3From);
      url.searchParams.set("to", m3To);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleCalculate = () => {
    setIsCalculated(true);
    syncUrl(mode);
    setTimeout(() => setIsCalculated(false), 1500);
  };

  // Computations
  // Mode 1: What is X% of Y?
  const p1 = parseFloat(m1Pct) || 0;
  const v1 = parseFloat(m1Val) || 0;
  const r1 = (p1 / 100) * v1;
  const r1Remainder = v1 - r1;

  // Mode 2: X is what % of Y?
  const p2 = parseFloat(m2Part) || 0;
  const w2 = parseFloat(m2Whole) || 0;
  const r2 = w2 !== 0 ? (p2 / w2) * 100 : 0;

  // Mode 3: % Change
  const f3 = parseFloat(m3From) || 0;
  const t3 = parseFloat(m3To) || 0;
  const diff3 = t3 - f3;
  const r3 = f3 !== 0 ? (diff3 / f3) * 100 : 0;
  const isIncrease = diff3 >= 0;

  // Mode 4: Add / Subtract
  const v4 = parseFloat(m4Val) || 0;
  const p4 = parseFloat(m4Pct) || 0;
  const delta4 = (p4 / 100) * v4;
  const r4 = m4Op === "add" ? v4 + delta4 : v4 - delta4;

  const formatNum = (num: number, decimals: number = 2) => {
    if (isNaN(num)) return "0";
    if (Number.isInteger(num)) return num.toLocaleString("en-US");
    return Number(num.toFixed(decimals)).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-start">
      {/* LEFT COLUMN: Controls & Input Cards (7 Cols) */}
      <div className="md:col-span-7 space-y-5">
        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => { setMode("part_of_whole"); syncUrl("part_of_whole"); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "part_of_whole"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Percent className="w-4 h-4 shrink-0" />
            <span>% of Number</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode("what_percent"); syncUrl("what_percent"); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "what_percent"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span>Proportion</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode("change"); syncUrl("change"); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "change"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>% Change</span>
          </button>

          <button
            type="button"
            onClick={() => { setMode("add_sub"); syncUrl("add_sub"); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "add_sub"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4 shrink-0" />
            <span>Tax / Discount</span>
          </button>
        </div>

        {/* INPUT CARD */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
          {mode === "part_of_whole" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  What is X% of Y?
                </h3>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                  Standard Percentage
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="m1-pct" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Percentage (X)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="m1-pct"
                      type="number"
                      step="any"
                      value={m1Pct}
                      onChange={(e) => setM1Pct(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                      placeholder="e.g. 15"
                    />
                    <span className="absolute right-3.5 text-slate-400 font-bold text-sm">%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="m1-val" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Total Value (Y)
                  </label>
                  <input
                    id="m1-val"
                    type="number"
                    step="any"
                    value={m1Val}
                    onChange={(e) => setM1Val(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    placeholder="e.g. 200"
                  />
                </div>
              </div>

              {/* Quick Preset Pills */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Quick Presets
                </span>
                <div className="flex flex-wrap gap-2">
                  {["5", "10", "15", "20", "25", "50", "75"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setM1Pct(preset)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        m1Pct === preset
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mode === "what_percent" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  X is what % of Y?
                </h3>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                  Proportion & Ratio
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="m2-part" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Part (X)
                  </label>
                  <input
                    id="m2-part"
                    type="number"
                    step="any"
                    value={m2Part}
                    onChange={(e) => setM2Part(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    placeholder="e.g. 30"
                  />
                </div>

                <div>
                  <label htmlFor="m2-whole" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Whole (Y)
                  </label>
                  <input
                    id="m2-whole"
                    type="number"
                    step="any"
                    value={m2Whole}
                    onChange={(e) => setM2Whole(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    placeholder="e.g. 150"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "change" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Percentage Increase or Decrease
                </h3>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/80">
                  Growth & Delta
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="m3-from" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Original / Starting Value (From)
                  </label>
                  <input
                    id="m3-from"
                    type="number"
                    step="any"
                    value={m3From}
                    onChange={(e) => setM3From(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    placeholder="e.g. 100"
                  />
                </div>

                <div>
                  <label htmlFor="m3-to" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Final / New Value (To)
                  </label>
                  <input
                    id="m3-to"
                    type="number"
                    step="any"
                    value={m3To}
                    onChange={(e) => setM3To(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    placeholder="e.g. 125"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "add_sub" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Add or Subtract Percentage
                </h3>
                <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setM4Op("add")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      m4Op === "add" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    + Add (Tax/Tip)
                  </button>
                  <button
                    type="button"
                    onClick={() => setM4Op("sub")}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                      m4Op === "sub" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    − Subtract (Discount)
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="m4-val" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Base Value
                  </label>
                  <input
                    id="m4-val"
                    type="number"
                    step="any"
                    value={m4Val}
                    onChange={(e) => setM4Val(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    placeholder="e.g. 120"
                  />
                </div>

                <div>
                  <label htmlFor="m4-pct" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Percentage
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="m4-pct"
                      type="number"
                      step="any"
                      value={m4Pct}
                      onChange={(e) => setM4Pct(e.target.value)}
                      className="w-full h-12 px-3.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                      placeholder="e.g. 20"
                    />
                    <span className="absolute right-3.5 text-slate-400 font-bold text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Primary Calculate Action */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base shadow-sm hover:shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-emerald-500/20 active:scale-[0.99]"
            >
              <Calculator className="w-5 h-5 shrink-0" />
              <span>Calculate Percentage</span>
              <ArrowRight className="w-4 h-4 shrink-0 ml-0.5" />
            </button>
          </div>

          {/* Reset Action */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={() => {
                setM1Pct("15"); setM1Val("200");
                setM2Part("30"); setM2Whole("150");
                setM3From("100"); setM3To("125");
                setM4Val("120"); setM4Pct("20"); setM4Op("add");
              }}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
            <span className="text-slate-400">Live Auto-calculated</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sticky Result Card (5 Cols) */}
      <div className="md:sticky md:top-24 md:col-span-5 space-y-4">
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span>Result</span>
              {isCalculated && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full animate-pulse">
                  Calculated!
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy(
                  mode === "part_of_whole" ? formatNum(r1) :
                  mode === "what_percent" ? `${formatNum(r2)}%` :
                  mode === "change" ? `${isIncrease ? "+" : ""}${formatNum(r3)}%` :
                  formatNum(r4)
                )}
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                title="Copy result"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                title="Share link"
              >
                {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Answer Display */}
          <div className="mb-4">
            {mode === "part_of_whole" && (
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {p1}% of {v1} is:
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {formatNum(r1)}
                </div>
              </div>
            )}

            {mode === "what_percent" && (
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {p2} is what percent of {w2}?
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {formatNum(r2)}%
                </div>
              </div>
            )}

            {mode === "change" && (
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Change from {f3} to {t3}:
                </div>
                <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${isIncrease ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  {isIncrease ? "+" : ""}{formatNum(r3)}%
                </div>
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-1">
                  {isIncrease ? "Percentage Increase" : "Percentage Decrease"} ({isIncrease ? "+" : ""}{formatNum(diff3)} absolute)
                </div>
              </div>
            )}

            {mode === "add_sub" && (
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  {v4} {m4Op === "add" ? "+" : "−"} {p4}% ({m4Op === "add" ? "Added" : "Discounted"}):
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {formatNum(r4)}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Adjustment: {m4Op === "add" ? "+" : "−"}{formatNum(delta4)}
                </div>
              </div>
            )}
          </div>

          {/* Visual Interactive Donut Chart (Mortgage Flagship Style) */}
          <div className="my-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <span>Visual Proportion Chart</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                {mode === "part_of_whole" ? `${formatNum(p1)}% Share` :
                 mode === "what_percent" ? `${formatNum(r2)}% Share` :
                 mode === "change" ? `${isIncrease ? "+" : ""}${formatNum(r3)}% Delta` :
                 `${formatNum(p4)}% Adjustment`}
              </span>
            </div>

            {/* SVG Donut Chart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50/60 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  {/* Track Circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    className="stroke-slate-200 dark:stroke-slate-700"
                    strokeWidth="16"
                    fill="none"
                  />
                  {/* Active Segment Circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    stroke={mode === "change" && !isIncrease ? "#f43f5e" : "#10b981"}
                    strokeWidth="16"
                    strokeDasharray="389.56"
                    strokeDashoffset={389.56 - (389.56 * Math.min(Math.max(
                      mode === "part_of_whole" ? (p1 / 100) :
                      mode === "what_percent" ? (r2 / 100) :
                      mode === "change" ? Math.min(Math.abs(r3) / 100, 1) :
                      (p4 / 100), 0), 1))}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {mode === "part_of_whole" ? `${formatNum(p1)}%` :
                     mode === "what_percent" ? `${formatNum(r2)}%` :
                     mode === "change" ? `${isIncrease ? "+" : ""}${formatNum(r3)}%` :
                     `${formatNum(p4)}%`}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">
                    {mode === "change" ? (isIncrease ? "Increase" : "Decrease") : "Ratio"}
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex-1 w-full space-y-2 text-xs">
                {mode === "part_of_whole" && (
                  <>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Calculated ({p1}%)</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(r1)}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>
                        <span className="font-medium text-slate-500">Remaining</span>
                      </div>
                      <span className="font-bold text-slate-600 dark:text-slate-400 tabular-nums">{formatNum(r1Remainder)}</span>
                    </div>
                  </>
                )}

                {mode === "what_percent" && (
                  <>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Part Share</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(r2)}%</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0"></span>
                        <span className="font-medium text-slate-500">Whole Total</span>
                      </div>
                      <span className="font-bold text-slate-600 dark:text-slate-400 tabular-nums">{formatNum(w2)}</span>
                    </div>
                  </>
                )}

                {mode === "change" && (
                  <>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Original (From)</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(f3)}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isIncrease ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Final (To)</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(t3)}</span>
                    </div>
                  </>
                )}

                {mode === "add_sub" && (
                  <>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">Base Price</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(v4)}</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${m4Op === "add" ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                        <span className="font-medium text-slate-700 dark:text-slate-300">{m4Op === "add" ? "Tax/Tip" : "Discount"}</span>
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                        {m4Op === "add" ? "+" : "−"}{formatNum(delta4)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Step-by-Step Breakdown (GEO & AI Snippet Friendly) */}
          <div className="mt-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
            <div className="font-sans font-bold text-slate-900 dark:text-white mb-1">
              Step-by-step Solution:
            </div>
            {mode === "part_of_whole" && (
              <>
                <div>1. Convert percent to decimal: {p1} ÷ 100 = {(p1 / 100).toFixed(4)}</div>
                <div>2. Multiply by whole: {(p1 / 100).toFixed(4)} × {v1} = <strong>{formatNum(r1)}</strong></div>
                <div className="text-slate-400 font-sans text-[11px] pt-1">Remainder: {formatNum(r1Remainder)}</div>
              </>
            )}

            {mode === "what_percent" && (
              <>
                <div>1. Divide part by whole: {p2} ÷ {w2} = {(w2 !== 0 ? p2 / w2 : 0).toFixed(4)}</div>
                <div>2. Convert to %: {(w2 !== 0 ? p2 / w2 : 0).toFixed(4)} × 100 = <strong>{formatNum(r2)}%</strong></div>
              </>
            )}

            {mode === "change" && (
              <>
                <div>1. Calculate difference: {t3} − {f3} = {diff3}</div>
                <div>2. Divide by original: {diff3} ÷ {f3} = {(f3 !== 0 ? diff3 / f3 : 0).toFixed(4)}</div>
                <div>3. Multiply by 100: = <strong>{isIncrease ? "+" : ""}{formatNum(r3)}%</strong></div>
              </>
            )}

            {mode === "add_sub" && (
              <>
                <div>1. Delta: {p4}% of {v4} = {formatNum(delta4)}</div>
                <div>2. Calculation: {v4} {m4Op === "add" ? "+" : "−"} {formatNum(delta4)} = <strong>{formatNum(r4)}</strong></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
