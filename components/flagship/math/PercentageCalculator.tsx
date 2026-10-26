"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Share2,
  Printer,
  Sparkles,
  Percent,
  TrendingUp,
  DollarSign,
  Calculator,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type CalcMode = "part_of_whole" | "what_percent" | "change" | "add_sub";

export function PercentageCalculator() {
  const [mode, setMode] = useState<CalcMode>("part_of_whole");
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  // Settings
  const [decimals, setDecimals] = useState<number>(2);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

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
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (typeof window === "undefined") return;
    syncUrl(mode);
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  const handleReset = () => {
    setM1Pct("15");
    setM1Val("200");
    setM2Part("30");
    setM2Whole("150");
    setM3From("100");
    setM3To("125");
    setM4Val("120");
    setM4Pct("20");
    setM4Op("add");
    setShowAiModal(false);
  };

  // Computations
  // Mode 1: What is X% of Y?
  const p1 = parseFloat(m1Pct) || 0;
  const v1 = parseFloat(m1Val) || 0;
  const r1 = (p1 / 100) * v1;
  const r1Remainder = Math.max(0, v1 - r1);

  // Mode 2: X is what % of Y?
  const p2 = parseFloat(m2Part) || 0;
  const w2 = parseFloat(m2Whole) || 0;
  const r2 = w2 !== 0 ? (p2 / w2) * 100 : 0;
  const r2Remainder = Math.max(0, w2 - p2);

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

  const formatNum = (num: number, dec: number = decimals) => {
    if (isNaN(num)) return "0";
    if (Number.isInteger(num) && dec === 0) return num.toLocaleString("en-US");
    return Number(num.toFixed(dec)).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: dec,
    });
  };

  // Donut SVG circumference calculation (r = 52 -> C = 326.726)
  const CIRCLE_C = 326.726;

  // Mode 1 Donut calculations
  const m1ShareRatio = v1 > 0 ? Math.min(Math.max(r1 / v1, 0), 1) : 0;
  const m1ShareOffset = CIRCLE_C * (1 - m1ShareRatio);

  // Mode 2 Donut calculations
  const m2ShareRatio = w2 > 0 ? Math.min(Math.max(p2 / w2, 0), 1) : 0;
  const m2ShareOffset = CIRCLE_C * (1 - m2ShareRatio);

  // Mode 3 Donut calculations
  const m3Ratio = f3 > 0 ? Math.min(Math.max(Math.abs(diff3) / f3, 0), 1) : 0;
  const m3ShareOffset = CIRCLE_C * (1 - m3Ratio);

  // Mode 4 Donut calculations
  const m4Ratio = v4 > 0 ? Math.min(Math.max(delta4 / v4, 0), 1) : 0;
  const m4ShareOffset = CIRCLE_C * (1 - m4Ratio);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
      {/* ======================================================== */}
      {/* LEFT COLUMN: Controls & Input Cards (7 Cols)              */}
      {/* ======================================================== */}
      <div className="lg:col-span-7 space-y-5">
        {/* Modern Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode("part_of_whole");
              syncUrl("part_of_whole");
            }}
            className={`flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "part_of_whole"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Percent className="w-4 h-4 shrink-0" />
            <span>% of Number</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("what_percent");
              syncUrl("what_percent");
            }}
            className={`flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "what_percent"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span>Proportion</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("change");
              syncUrl("change");
            }}
            className={`flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "change"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>% Change</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("add_sub");
              syncUrl("add_sub");
            }}
            className={`flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === "add_sub"
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4 shrink-0" />
            <span>Tax / Discount</span>
          </button>
        </div>

        {/* INPUT CARD (Mode Specific) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-6">
          {/* MODE 1: % OF NUMBER */}
          {mode === "part_of_whole" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    What is X% of Y?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Calculate portion or share of any number</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  Standard Percent
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Percentage (X)
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m1Pct}
                      onChange={(e) => setM1Pct(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-sm font-bold text-slate-400 pl-2">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Total Value (Y)
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m1Val}
                      onChange={(e) => setM1Val(e.target.value)}
                      placeholder="e.g. 200"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-xs font-semibold text-slate-400 pl-2">total</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Quick Percentage Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {["5", "10", "15", "20", "25", "33.33", "50", "75"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setM1Pct(preset)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        m1Pct === preset
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {preset}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: PROPORTION */}
          {mode === "what_percent" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    X is What Percent of Y?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Determine the percentage share of a whole amount</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                  Proportion Share
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Part Amount (X)
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m2Part}
                      onChange={(e) => setM2Part(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-xs font-semibold text-slate-400 pl-2">part</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Whole Amount (Y)
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m2Whole}
                      onChange={(e) => setM2Whole(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-xs font-semibold text-slate-400 pl-2">whole</span>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Sample Ratios
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "1 in 4 (25%)", x: "25", y: "100" },
                    { label: "1 in 3 (33%)", x: "1", y: "3" },
                    { label: "3 out of 10", x: "3", y: "10" },
                    { label: "18 out of 20", x: "18", y: "20" },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setM2Part(p.x);
                        setM2Whole(p.y);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: % CHANGE */}
          {mode === "change" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Percentage Increase / Decrease
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Calculate relative growth or contraction between values</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400">
                  Growth Variance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Original Baseline (From)
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m3From}
                      onChange={(e) => setM3From(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-xs font-semibold text-slate-400 pl-2">start</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    New Ending Value (To)
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m3To}
                      onChange={(e) => setM3To(e.target.value)}
                      placeholder="e.g. 125"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-xs font-semibold text-slate-400 pl-2">end</span>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Typical Growth Scenarios
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "100 → 125 (+25%)", f: "100", t: "125" },
                    { label: "200 → 150 (-25%)", f: "200", t: "150" },
                    { label: "50 → 100 (+100%)", f: "50", t: "100" },
                    { label: "80 → 120 (+50%)", f: "80", t: "120" },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setM3From(p.f);
                        setM3To(p.t);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: TAX / DISCOUNT */}
          {mode === "add_sub" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Sales Tax &amp; Discount Calculator
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Add sales tax or subtract retail clearance discounts</p>
                </div>
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setM4Op("add")}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                      m4Op === "add"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    + Add Tax
                  </button>
                  <button
                    type="button"
                    onClick={() => setM4Op("sub")}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                      m4Op === "sub"
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    − Discount
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Base Amount
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <span className="text-sm font-bold text-slate-400 pr-2">{currencySymbol}</span>
                    <input
                      type="number"
                      step="any"
                      value={m4Val}
                      onChange={(e) => setM4Val(e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    {m4Op === "add" ? "Tax / Tip Rate" : "Discount Rate"}
                  </label>
                  <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 shadow-2xs focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      value={m4Pct}
                      onChange={(e) => setM4Pct(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full bg-transparent text-base font-semibold text-slate-900 dark:text-white outline-hidden"
                    />
                    <span className="text-sm font-bold text-slate-400 pl-2">%</span>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Common Rates
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "5% Standard", p: "5" },
                    { label: "8.25% Sales Tax", p: "8.25" },
                    { label: "15% Gratuity", p: "15" },
                    { label: "20% Tip/Clearance", p: "20" },
                    { label: "30% Markdown", p: "30" },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setM4Pct(preset.p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        m4Pct === preset.p
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Collapsible "+ More options" container (Exactly like screenshot 1) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">+</span>
                <span>More options &amp; precision settings</span>
              </span>
              {showMoreOptions ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showMoreOptions && (
              <div className="mt-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Decimal Precision
                  </label>
                  <select
                    value={decimals}
                    onChange={(e) => setDecimals(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 font-medium text-slate-800 dark:text-slate-200"
                  >
                    <option value={0}>0 Decimals (Whole)</option>
                    <option value={2}>2 Decimals (Standard)</option>
                    <option value={4}>4 Decimals (Scientific)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Currency Symbol
                  </label>
                  <select
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 font-medium text-slate-800 dark:text-slate-200"
                  >
                    <option value="$">$ (USD / AUD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="£">£ (GBP)</option>
                    <option value="₹">₹ (INR)</option>
                    <option value="">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Calculation Engine
                  </label>
                  <div className="py-1.5 font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live 64-bit IEEE</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Calculate Action (Vibrant Emerald CTA like screenshot 1) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => syncUrl(mode)}
              className="w-full h-13 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base shadow-sm hover:shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-emerald-500/20 active:scale-[0.99]"
            >
              <span>Calculate</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: Ultra-Clean Result Card (Exact match SS 1)  */}
      {/* ======================================================== */}
      <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 sm:p-7 shadow-sm space-y-6">
          {/* Header Row: Label & LIVE RESULT Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {mode === "part_of_whole" && "CALCULATED PORTION"}
              {mode === "what_percent" && "PERCENTAGE PROPORTION"}
              {mode === "change" && (isIncrease ? "GROWTH EXPANSION" : "VALUE CONTRACTION")}
              {mode === "add_sub" && (m4Op === "add" ? "TOTAL WITH TAX" : "DISCOUNTED TOTAL")}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE RESULT</span>
            </div>
          </div>

          {/* Hero Main Metric Number & Subtitle */}
          <div>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {mode === "part_of_whole" && formatNum(r1)}
              {mode === "what_percent" && `${formatNum(r2)}%`}
              {mode === "change" && `${isIncrease ? "+" : ""}${formatNum(r3)}%`}
              {mode === "add_sub" && `${currencySymbol}${formatNum(r4)}`}
            </div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
              {mode === "part_of_whole" && (
                <span>{p1}% of {v1} calculated portion</span>
              )}
              {mode === "what_percent" && (
                <span>{p2} is {formatNum(r2)}% of total {w2}</span>
              )}
              {mode === "change" && (
                <span>
                  from {f3} to {t3} ({isIncrease ? "+" : ""}{formatNum(diff3)} absolute delta)
                </span>
              )}
              {mode === "add_sub" && (
                <span>
                  {currencySymbol}{v4} {m4Op === "add" ? `+ ${p4}% sales tax` : `− ${p4}% clearance discount`}
                </span>
              )}
            </div>
          </div>

          {/* Visual Donut Chart & Legend Side-by-Side (Screenshot 1 Style) */}
          <div className="flex items-center gap-5 pt-2">
            {/* Multi-Color Thick SVG Donut Chart */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
                {/* Background base track (Blue / Slate) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className="stroke-amber-400/90 dark:stroke-amber-500/80"
                  strokeWidth="24"
                  fill="none"
                />

                {/* Primary Emerald Active Slice */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className="stroke-emerald-500 transition-all duration-500 ease-out"
                  strokeWidth="24"
                  strokeDasharray={CIRCLE_C}
                  strokeDashoffset={
                    mode === "part_of_whole"
                      ? m1ShareOffset
                      : mode === "what_percent"
                      ? m2ShareOffset
                      : mode === "change"
                      ? m3ShareOffset
                      : m4ShareOffset
                  }
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Accent Secondary Slice (Blue) */}
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className="stroke-blue-600 transition-all duration-500 ease-out"
                  strokeWidth="24"
                  strokeDasharray={`${CIRCLE_C * 0.15} ${CIRCLE_C * 0.85}`}
                  strokeDashoffset={0}
                  strokeLinecap="butt"
                  fill="none"
                />
              </svg>
            </div>

            {/* Clean Legend with Colored Dots + Label + Value */}
            <div className="flex-1 space-y-2 text-xs">
              {mode === "part_of_whole" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Whole baseline</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(v1)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Portion ({p1}%)</span>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNum(r1)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Remaining</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums">{formatNum(r1Remainder)}</span>
                  </div>
                </>
              )}

              {mode === "what_percent" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Whole amount</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(w2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Part portion</span>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNum(p2)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Remainder</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums">{formatNum(r2Remainder)}</span>
                  </div>
                </>
              )}

              {mode === "change" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Original (From)</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(f3)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isIncrease ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Final (To)</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(t3)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Absolute diff</span>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                      {isIncrease ? "+" : ""}{formatNum(diff3)}
                    </span>
                  </div>
                </>
              )}

              {mode === "add_sub" && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Base sticker</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currencySymbol}{formatNum(v4)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${m4Op === "add" ? "bg-emerald-500" : "bg-amber-400"}`}></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{m4Op === "add" ? "Tax added" : "Discount"}</span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {m4Op === "add" ? "+" : "−"}{currencySymbol}{formatNum(delta4)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">Final total</span>
                    </div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{currencySymbol}{formatNum(r4)}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Detailed Metric Rows with Horizontal Divider (Like screenshot 1) */}
          <div className="space-y-0 text-sm">
            {mode === "part_of_whole" && (
              <>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total baseline value</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(v1)}</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Calculated portion</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNum(r1)}</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Remaining share</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(r1Remainder)}</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Decimal multiplier</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{(p1 / 100).toFixed(4)}×</span>
                </div>
              </>
            )}

            {mode === "what_percent" && (
              <>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Proportional share</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNum(r2)}%</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Unaccounted balance</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(r2Remainder)} ({formatNum(100 - r2)}%)</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Decimal ratio</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{(w2 !== 0 ? p2 / w2 : 0).toFixed(4)}</span>
                </div>
              </>
            )}

            {mode === "change" && (
              <>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Relative percentage change</span>
                  <span className={`font-bold tabular-nums ${isIncrease ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {isIncrease ? "+" : ""}{formatNum(r3)}%
                  </span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Absolute difference</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {isIncrease ? "+" : ""}{formatNum(diff3)}
                  </span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Growth factor</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {(f3 !== 0 ? t3 / f3 : 0).toFixed(2)}×
                  </span>
                </div>
              </>
            )}

            {mode === "add_sub" && (
              <>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Base pre-adjustment price</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currencySymbol}{formatNum(v4)}</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{m4Op === "add" ? "Total tax added" : "Total discount savings"}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {m4Op === "add" ? "+" : "−"}{currencySymbol}{formatNum(delta4)}
                  </span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Final payable amount</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currencySymbol}{formatNum(r4)}</span>
                </div>
                <div className="py-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Price multiplier</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {(m4Op === "add" ? 1 + p4 / 100 : 1 - p4 / 100).toFixed(4)}×
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Action Toolbar Row: Reset, Share, Print, Ask AI (Screenshot 1 Style) */}
          <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{shared ? "Copied!" : "Share"}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAiModal(!showAiModal)}
              className="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>
          </div>

          {/* Interactive AI Quick Explainer Modal/Card */}
          {showAiModal && (
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/30 text-xs space-y-2 shadow-xs animate-in fade-in">
              <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Mathematical Insight</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {mode === "part_of_whole" &&
                  `Evaluating ${p1}% of ${v1} yields ${formatNum(r1)}. Because percentages operate base-100, dividing ${p1} by 100 shifts the decimal point two places left to ${(p1 / 100).toFixed(4)}. Multiplying this scale factor by ${v1} confirms the exact partition.`}
                {mode === "what_percent" &&
                  `${p2} represents ${formatNum(r2)}% of ${w2}. In fractional terms, this simplifies to approximately ${(p2 / w2).toFixed(4)} of the entire unit whole.`}
                {mode === "change" &&
                  `The transition from ${f3} to ${t3} produces a ${isIncrease ? "+" : ""}${formatNum(r3)}% ${isIncrease ? "increase" : "decrease"}. Note that recovering from a loss requires a larger reciprocal gain.`}
                {mode === "add_sub" &&
                  `Adjusting ${currencySymbol}${v4} by ${p4}% results in ${currencySymbol}${formatNum(r4)}. The net adjustment equals ${currencySymbol}${formatNum(delta4)}.`}
              </p>
            </div>
          )}

          {/* Step-by-Step Procedure Accordion (AEO Snippet Friendly) */}
          <div className="rounded-xl bg-white/70 dark:bg-slate-900/70 p-3.5 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1 font-mono">
            <div className="font-sans font-bold text-slate-900 dark:text-white mb-1.5 flex items-center justify-between">
              <span>Step-by-step Solution:</span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    mode === "part_of_whole"
                      ? `${p1}% of ${v1} = ${formatNum(r1)}`
                      : mode === "what_percent"
                      ? `${p2} / ${w2} = ${formatNum(r2)}%`
                      : mode === "change"
                      ? `${isIncrease ? "+" : ""}${formatNum(r3)}%`
                      : `${currencySymbol}${formatNum(r4)}`
                  )
                }
                className="text-[11px] font-sans font-semibold text-emerald-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {mode === "part_of_whole" && (
              <>
                <div>1. Convert percent to decimal: {p1} ÷ 100 = {(p1 / 100).toFixed(4)}</div>
                <div>2. Multiply by whole: {(p1 / 100).toFixed(4)} × {v1} = <strong>{formatNum(r1)}</strong></div>
                <div className="text-slate-400 font-sans text-[11px] pt-1">Remaining balance: {formatNum(r1Remainder)}</div>
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
                <div>1. Delta: {p4}% of {currencySymbol}{v4} = {currencySymbol}{formatNum(delta4)}</div>
                <div>2. Final: {currencySymbol}{v4} {m4Op === "add" ? "+" : "−"} {currencySymbol}{formatNum(delta4)} = <strong>{currencySymbol}{formatNum(r4)}</strong></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
