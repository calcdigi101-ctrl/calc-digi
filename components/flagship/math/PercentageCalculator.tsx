"use client";

import { useState, useEffect } from "react";
import { ResultActions } from "@/components/flagship/ResultActions";
import { CalculationInvoice } from "@/components/flagship/engine/CalculationInvoice";
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

    // Handle Google Math Solver ?q= parameter
    const q = params.get("q");
    if (q) {
      const decoded = decodeURIComponent(q);
      const match = decoded.match(/(\d+(?:\.\d+)?)\s*%\s*(?:of)?\s*(\d+(?:\.\d+)?)/i);
      if (match) {
        setMode("part_of_whole");
        setM1Pct(match[1]);
        setM1Val(match[2]);
      } else {
        const justNum = decoded.match(/(\d+(?:\.\d+)?)/);
        if (justNum) {
          setM1Pct(justNum[1]);
        }
      }
    }
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

  // Donut SVG circumference calculation (r = 50 -> C = 314.159265)
  const DONUT_RADIUS = 50;
  const DONUT_C = 2 * Math.PI * DONUT_RADIUS;

  interface DonutSlice {
    id: string;
    label: string;
    value: number;
    formattedValue: string;
    color: string;
    dotClass: string;
  }

  let slices: DonutSlice[] = [];

  if (mode === "part_of_whole") {
    if (v1 > 0) {
      if (p1 <= 100) {
        slices = [
          {
            id: "remaining",
            label: "Remaining Balance",
            value: r1Remainder,
            formattedValue: formatNum(r1Remainder),
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "portion",
            label: `Calculated Portion (${p1}%)`,
            value: r1,
            formattedValue: formatNum(r1),
            color: "#10b981",
            dotClass: "bg-emerald-500",
          },
        ];
      } else {
        slices = [
          {
            id: "base",
            label: "Base Whole",
            value: v1,
            formattedValue: formatNum(v1),
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "portion",
            label: `Expanded Portion (+${formatNum(p1 - 100)}%)`,
            value: Math.max(0, r1 - v1),
            formattedValue: formatNum(r1 - v1),
            color: "#f59e0b",
            dotClass: "bg-amber-500",
          },
        ];
      }
    }
  } else if (mode === "what_percent") {
    if (w2 > 0) {
      if (p2 <= w2) {
        slices = [
          {
            id: "remaining",
            label: "Remaining Balance",
            value: r2Remainder,
            formattedValue: `${formatNum(r2Remainder)} (${formatNum(100 - r2)}%)`,
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "part",
            label: `Part Value (${formatNum(r2)}%)`,
            value: p2,
            formattedValue: `${formatNum(p2)} (${formatNum(r2)}%)`,
            color: "#10b981",
            dotClass: "bg-emerald-500",
          },
        ];
      } else {
        slices = [
          {
            id: "whole",
            label: "Base Whole (Y)",
            value: w2,
            formattedValue: formatNum(w2),
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "excess",
            label: "Excess Amount",
            value: Math.max(0, p2 - w2),
            formattedValue: formatNum(p2 - w2),
            color: "#f59e0b",
            dotClass: "bg-amber-500",
          },
        ];
      }
    }
  } else if (mode === "change") {
    if (f3 > 0 || t3 > 0) {
      if (isIncrease) {
        slices = [
          {
            id: "starting",
            label: "Original Baseline (From)",
            value: f3,
            formattedValue: formatNum(f3),
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "gain",
            label: `Growth Delta (+${formatNum(r3)}%)`,
            value: Math.max(0, diff3),
            formattedValue: `+${formatNum(diff3)}`,
            color: "#10b981",
            dotClass: "bg-emerald-500",
          },
        ];
      } else {
        slices = [
          {
            id: "ending",
            label: "Retained Value (To)",
            value: Math.max(0, t3),
            formattedValue: formatNum(t3),
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "loss",
            label: `Contraction Loss (${formatNum(r3)}%)`,
            value: Math.abs(diff3),
            formattedValue: `-${formatNum(Math.abs(diff3))}`,
            color: "#f59e0b",
            dotClass: "bg-amber-500",
          },
        ];
      }
    }
  } else if (mode === "add_sub") {
    if (v4 > 0) {
      if (m4Op === "add") {
        const stateRatio = 0.75;
        const localRatio = 0.25;
        const stateTax = delta4 * stateRatio;
        const localTax = delta4 * localRatio;

        slices = [
          {
            id: "base_net",
            label: "Net Merchandise / Services",
            value: v4,
            formattedValue: `${currencySymbol}${formatNum(v4)}`,
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "state_tax",
            label: `State Sales Tax Levy (${formatNum(p4 * stateRatio, 2)}%)`,
            value: stateTax,
            formattedValue: `${currencySymbol}${formatNum(stateTax)}`,
            color: "#10b981",
            dotClass: "bg-emerald-500",
          },
          {
            id: "local_tax",
            label: `Local / Municipal Surcharge (${formatNum(p4 * localRatio, 2)}%)`,
            value: localTax,
            formattedValue: `${currencySymbol}${formatNum(localTax)}`,
            color: "#f59e0b",
            dotClass: "bg-amber-500",
          },
        ];
      } else {
        slices = [
          {
            id: "final_price",
            label: "Final Discounted Price",
            value: Math.max(0, r4),
            formattedValue: `${currencySymbol}${formatNum(r4)}`,
            color: "#0284c7",
            dotClass: "bg-sky-600",
          },
          {
            id: "savings",
            label: `Clearance Savings (${p4}%)`,
            value: delta4,
            formattedValue: `${currencySymbol}${formatNum(delta4)}`,
            color: "#f59e0b",
            dotClass: "bg-amber-500",
          },
        ];
      }
    }
  }

  const validSlices = slices.filter((s) => s.value > 0);
  const totalSliceValue = validSlices.reduce((sum, s) => sum + s.value, 0);

  let cumulativeArc = 0;
  const renderedSlices = validSlices.map((slice) => {
    const ratio = totalSliceValue > 0 ? slice.value / totalSliceValue : 0;
    const arcLength = ratio * DONUT_C;
    const gap = validSlices.length > 1 ? Math.min(3.5, arcLength * 0.25) : 0;
    const visibleLength = Math.max(0, arcLength - gap);
    const dashArray = `${visibleLength.toFixed(2)} ${(DONUT_C - visibleLength).toFixed(2)}`;
    const dashOffset = (-cumulativeArc).toFixed(2);
    cumulativeArc += arcLength;
    return {
      ...slice,
      dashArray,
      dashOffset,
      ratio,
    };
  });

  return (
    <>
      <div className="fx-web-tool">
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
            <span>Percent of Number</span>
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
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
          {/* MODE 1: % OF NUMBER */}
          {mode === "part_of_whole" && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  What is X% of Y?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Calculate portion or share of any number</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-1">
                <div>
                  <label htmlFor="pct-m1-rate" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Percentage (X)
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m1-rate"
                      aria-label="Percentage rate (X)"
                      value={m1Pct}
                      onChange={(e) => setM1Pct(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-sm font-bold text-slate-400 pl-2 select-none">%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="pct-m1-val" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Total Value (Y)
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m1-val"
                      aria-label="Base value / number (Y)"
                      value={m1Val}
                      onChange={(e) => setM1Val(e.target.value)}
                      placeholder="e.g. 200"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-bold text-slate-400 pl-2 select-none uppercase">total</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-8 pt-2">
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Quick Percentage Presets
                  </label>
                  <span className="text-[11px] text-slate-400">Click to apply percentage</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-2.5">
                  {["5", "10", "15", "20", "25", "33.33", "50", "75"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setM1Pct(preset)}
                      className={`py-2.5 px-1.5 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        m1Pct === preset
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent"
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
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  X is What Percent of Y?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Determine the percentage share of a whole amount</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-1">
                <div>
                  <label htmlFor="pct-m2-part" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Part Amount (X)
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m2-part"
                      aria-label="Part value (X)"
                      value={m2Part}
                      onChange={(e) => setM2Part(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-bold text-slate-400 pl-2 select-none uppercase">part</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="pct-m2-whole" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Whole Amount (Y)
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m2-whole"
                      aria-label="Whole / Total (Y)"
                      value={m2Whole}
                      onChange={(e) => setM2Whole(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-bold text-slate-400 pl-2 select-none uppercase">whole</span>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="mt-8 pt-2">
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Quick Sample Ratios
                  </label>
                  <span className="text-[11px] text-slate-400">Click to test ratios</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
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
                      className="py-2.5 px-3 text-center rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer border border-transparent"
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
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Percentage Increase / Decrease
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Calculate relative growth or contraction between values</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-1">
                <div>
                  <label htmlFor="pct-m3-from" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Original Baseline (From)
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m3-from"
                      aria-label="Original / From value (X)"
                      value={m3From}
                      onChange={(e) => setM3From(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-bold text-slate-400 pl-2 select-none uppercase">start</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="pct-m3-to" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    New Ending Value (To)
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m3-to"
                      aria-label="New / To value (Y)"
                      value={m3To}
                      onChange={(e) => setM3To(e.target.value)}
                      placeholder="e.g. 125"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-xs font-bold text-slate-400 pl-2 select-none uppercase">end</span>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="mt-8 pt-2">
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Typical Growth Scenarios
                  </label>
                  <span className="text-[11px] text-slate-400">Click to test change</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
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
                      className="py-2.5 px-3 text-center rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer border border-transparent"
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
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Sales Tax &amp; Discount
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Add tax or subtract clearance discounts</p>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setM4Op("add")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      m4Op === "add"
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    + Add Tax
                  </button>
                  <button
                    type="button"
                    onClick={() => setM4Op("sub")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      m4Op === "sub"
                        ? "bg-amber-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    - Discount
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-1">
                <div>
                  <label htmlFor="pct-m4-val" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Base Amount
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <span className="text-sm font-bold text-slate-400 pr-2 select-none">{currencySymbol}</span>
                    <input
                      type="number"
                      step="any"
                      id="pct-m4-val"
                      aria-label="Original value"
                      value={m4Val}
                      onChange={(e) => setM4Val(e.target.value)}
                      placeholder="e.g. 120"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pct-m4-pct" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    {m4Op === "add" ? "Tax / Tip Rate" : "Discount Rate"}
                  </label>
                  <div className="min-h-[48px] h-12 flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 shadow-2xs transition-colors focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <input
                      type="number"
                      step="any"
                      id="pct-m4-pct"
                      aria-label="Percentage to add or subtract"
                      value={m4Pct}
                      onChange={(e) => setM4Pct(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full bg-transparent border-none border-0 outline-none focus:outline-none focus:ring-0 p-0 text-base font-semibold text-slate-900 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-sm font-bold text-slate-400 pl-2 select-none">%</span>
                  </div>
                </div>
              </div>

              {/* Presets */}
              <div className="mt-8 pt-2">
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Common Rates
                  </label>
                  <span className="text-[11px] text-slate-400">Click to apply rate</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                  {[
                    { label: "5% Min", p: "5" },
                    { label: "8.25% Tax", p: "8.25" },
                    { label: "10% Off", p: "10" },
                    { label: "15% Tip", p: "15" },
                    { label: "20% Tip", p: "20" },
                    { label: "30% Sale", p: "30" },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setM4Pct(preset.p)}
                      className={`py-2.5 px-1.5 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        m4Pct === preset.p
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Collapsible "+ More options" container */}
          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
              <div className="mt-4 p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label htmlFor="percentage-decimals" className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Decimal Precision
                  </label>
                  <select
                    id="percentage-decimals"
                    aria-label="Decimal Precision"
                    value={decimals}
                    onChange={(e) => setDecimals(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 font-medium text-slate-800 dark:text-slate-200"
                  >
                    <option value={0}>0 Decimals (Whole)</option>
                    <option value={2}>2 Decimals (Standard)</option>
                    <option value={4}>4 Decimals (Scientific)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="percentage-currency" className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Currency Symbol
                  </label>
                  <select
                    id="percentage-currency"
                    aria-label="Currency Symbol"
                    value={currencySymbol}
                    onChange={(e) => setCurrencySymbol(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 font-medium text-slate-800 dark:text-slate-200"
                  >
                    <option value="$">$ (USD / AUD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="£">£ (GBP)</option>
                    <option value="₹">₹ (INR)</option>
                    <option value="">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                    Calculation Engine
                  </label>
                  <div className="py-2 font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live 64-bit IEEE</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Calculate Action */}
          <div className="pt-4 mt-1">
            <button
              type="button"
              onClick={() => syncUrl(mode)}
              className="w-full h-14 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-base shadow-sm hover:shadow-md transition-all cursor-pointer focus:ring-4 focus:ring-emerald-500/20 active:scale-[0.99]"
            >
              <span>Calculate</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: Ultra-Clean Result Card (Exact Reference)   */}
      {/* ======================================================== */}
      <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-6">
          {/* Top Hero Metric and Pill Badge (Exact Reference Style) */}
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                {mode === "part_of_whole" && formatNum(r1)}
                {mode === "what_percent" && `${formatNum(r2)}%`}
                {mode === "change" && `${isIncrease ? "+" : ""}${formatNum(r3)}%`}
                {mode === "add_sub" && `${currencySymbol}${formatNum(r4)}`}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f59e0b] text-white shadow-xs">
                {mode === "part_of_whole" && `${p1}% of ${formatNum(v1)}`}
                {mode === "what_percent" && `${formatNum(p2)} of ${formatNum(w2)} Share`}
                {mode === "change" && (isIncrease ? "Percentage Growth" : "Percentage Contraction")}
                {mode === "add_sub" && (m4Op === "add" ? `${formatNum(p4)}% Combined Sales Tax` : `${formatNum(p4)}% Clearance Discount`)}
              </span>
            </div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
              {mode === "part_of_whole" && (
                <span>{p1}% of {formatNum(v1)} calculated portion</span>
              )}
              {mode === "what_percent" && (
                <span>{formatNum(p2)} is {formatNum(r2)}% of total {formatNum(w2)}</span>
              )}
              {mode === "change" && (
                <span>
                  From {formatNum(f3)} to {formatNum(t3)} ({isIncrease ? "+" : ""}{formatNum(diff3)} absolute delta)
                </span>
              )}
              {mode === "add_sub" && (
                <span>
                  {currencySymbol}{formatNum(v4)} {m4Op === "add" ? `+ ${p4}% sales tax` : `- ${p4}% clearance discount`}
                </span>
              )}
            </div>
          </div>

          {/* Visual Donut Chart & Legend Side-by-Side (Exact Reference Style) */}
          <div className="flex items-center gap-5 sm:gap-6 pt-1">
            {/* Multi-Color Thick SVG Donut Chart */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform-gpu" viewBox="0 0 140 140">
                {renderedSlices.length === 0 ? (
                  <circle
                    cx="70"
                    cy="70"
                    r="50"
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="26"
                    fill="none"
                  />
                ) : (
                  renderedSlices.map((slice) => (
                    <circle
                      key={slice.id}
                      cx="70"
                      cy="70"
                      r="50"
                      stroke={slice.color}
                      strokeWidth="26"
                      strokeDasharray={slice.dashArray}
                      strokeDashoffset={slice.dashOffset}
                      strokeLinecap="butt"
                      fill="none"
                      className="transition-all duration-500 ease-out"
                    />
                  ))
                )}
              </svg>
            </div>

            {/* Clean Legend with Colored Dots + Label + Value */}
            <div className="flex-1 space-y-3 text-xs sm:text-sm">
              {renderedSlices.length === 0 ? (
                <div className="text-slate-400 italic">Enter values to view breakdown</div>
              ) : (
                renderedSlices.map((slice) => (
                  <div key={slice.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${slice.dotClass}`} />
                      <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
                        {slice.label}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums shrink-0">
                      {slice.formattedValue}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Detailed Metric Rows with Horizontal Dividers (Exact Reference Style) */}
          <div className="space-y-0 text-xs sm:text-sm pt-2">
            {mode === "part_of_whole" && (
              <>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Total baseline value</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(v1)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Calculated portion</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNum(r1)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Remaining balance</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(r1Remainder)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Decimal multiplier</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{(p1 / 100).toFixed(4)}x</span>
                </div>
              </>
            )}

            {mode === "what_percent" && (
              <>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Proportional share</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{formatNum(r2)}%</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Unaccounted balance</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(r2Remainder)} ({formatNum(100 - r2)}%)</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Decimal ratio</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{(w2 !== 0 ? p2 / w2 : 0).toFixed(4)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Whole base (Y)</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(w2)}</span>
                </div>
              </>
            )}

            {mode === "change" && (
              <>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Relative percentage change</span>
                  <span className={`font-bold tabular-nums ${isIncrease ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {isIncrease ? "+" : ""}{formatNum(r3)}%
                  </span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Absolute difference</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {isIncrease ? "+" : ""}{formatNum(diff3)}
                  </span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Original starting value</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(f3)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Final ending value</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(t3)}</span>
                </div>
              </>
            )}

            {mode === "add_sub" && (
              <>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{m4Op === "add" ? "Total Sales Tax Due" : "Total Discount Savings"}</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currencySymbol}{formatNum(delta4)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{m4Op === "add" ? "State Tax Portion (est.)" : "Final Price After Discount"}</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currencySymbol}{formatNum(m4Op === "add" ? delta4 * 0.75 : r4)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{m4Op === "add" ? "Local / City Tax Portion (est.)" : "Base List Price"}</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{currencySymbol}{formatNum(m4Op === "add" ? delta4 * 0.25 : v4)}</span>
                </div>
                <div className="py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">{m4Op === "add" ? "Combined Tax Rate" : "Discount Rate Applied"}</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{formatNum(p4)}%</span>
                </div>
              </>
            )}
          </div>

          {/* Step-by-Step Calculation Callout Box (Exact Reference Style) */}
          <div className="rounded-xl bg-emerald-50/60 dark:bg-emerald-950/25 border border-emerald-500/20 p-4 sm:p-5 text-xs text-slate-700 dark:text-slate-300 space-y-2 font-mono">
            <div className="font-sans font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base select-none">📝</span>
                <span className="text-sm">Step-by-Step Calculation:</span>
              </div>
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
                className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer font-sans"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {mode === "part_of_whole" && (
              <>
                <div>1. Convert percent to decimal: {p1} / 100 = {(p1 / 100).toFixed(4)}</div>
                <div>2. Multiply by total value: {(p1 / 100).toFixed(4)} * {v1} = <strong>{formatNum(r1)}</strong></div>
                <div>3. Remaining unallocated balance: {v1} - {formatNum(r1)} = <strong>{formatNum(r1Remainder)}</strong></div>
              </>
            )}

            {mode === "what_percent" && (
              <>
                <div>1. Divide part by whole: {p2} / {w2} = {(w2 !== 0 ? p2 / w2 : 0).toFixed(4)}</div>
                <div>2. Convert to percentage: {(w2 !== 0 ? p2 / w2 : 0).toFixed(4)} * 100 = <strong>{formatNum(r2)}%</strong></div>
                <div>3. Remaining proportion: 100% - {formatNum(r2)}% = <strong>{formatNum(100 - r2)}%</strong></div>
              </>
            )}

            {mode === "change" && (
              <>
                <div>1. Calculate difference: {t3} - {f3} = {diff3}</div>
                <div>2. Divide by original: {diff3} / {f3} = {(f3 !== 0 ? diff3 / f3 : 0).toFixed(4)}</div>
                <div>3. Multiply by 100: {(f3 !== 0 ? diff3 / f3 : 0).toFixed(4)} * 100 = <strong>{isIncrease ? "+" : ""}{formatNum(r3)}%</strong></div>
              </>
            )}

            {mode === "add_sub" && (
              <>
                {m4Op === "add" ? (
                  <>
                    <div>1. Combined Tax Rate = {formatNum(p4 * 0.75, 2)}% (State) + {formatNum(p4 * 0.25, 2)}% (Local) = {formatNum(p4)}%</div>
                    <div>2. Total Sales Tax = {currencySymbol}{formatNum(v4)} * {(p4 / 100).toFixed(4)} = {currencySymbol}{formatNum(delta4)}</div>
                    <div>3. State Share = {currencySymbol}{formatNum(delta4 * 0.75)} | Municipal/County Share = {currencySymbol}{formatNum(delta4 * 0.25)}</div>
                    <div>4. Final Reconciled Gross Total = {currencySymbol}{formatNum(r4)}</div>
                  </>
                ) : (
                  <>
                    <div>1. Calculate discount: {currencySymbol}{formatNum(v4)} * {(p4 / 100).toFixed(4)} = {currencySymbol}{formatNum(delta4)}</div>
                    <div>2. Subtract savings: {currencySymbol}{formatNum(v4)} - {currencySymbol}{formatNum(delta4)} = <strong>{currencySymbol}{formatNum(r4)}</strong></div>
                    <div>3. Final reconciled price: <strong>{currencySymbol}{formatNum(r4)}</strong></div>
                  </>
                )}
              </>
            )}
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

          {/* Action Toolbar Row: Reset, Share, Print, Ask AI */}
          <ResultActions onReset={handleReset} title="Percentage Calculator" />
        </div>
      </div>
    </div>
  </div>

  <CalculationInvoice
    asDiv={true}
    title="Percentage Calculation Summary"
    category="Mathematics & Financial Arithmetic"
    fields={[
      { key: "mode", label: "Calculation Function" },
      ...(mode === "part_of_whole"
        ? [
            { key: "p1", label: "Percentage Rate (%)" },
            { key: "v1", label: "Base Total Value" },
          ]
        : mode === "what_percent"
        ? [
            { key: "p2", label: "Part Value" },
            { key: "w2", label: "Whole Base Value" },
          ]
        : mode === "change"
        ? [
            { key: "f3", label: "Initial Starting Value" },
            { key: "t3", label: "Final Ending Value" },
          ]
        : [
            { key: "v4", label: "Base Amount" },
            { key: "op4", label: "Operation" },
            { key: "p4", label: "Percentage Adjustment" },
          ]),
    ]}
    values={{
      mode:
        mode === "part_of_whole"
          ? "Percentage of a Number (P% of V)"
          : mode === "what_percent"
          ? "Percentage Representation (X is what % of Y)"
          : mode === "change"
          ? "Percentage Increase / Decrease"
          : "Tax & Discount Addition / Deduction",
      ...(mode === "part_of_whole"
        ? { p1: `${p1}%`, v1: `${v1}` }
        : mode === "what_percent"
        ? { p2: `${p2}`, w2: `${w2}` }
        : mode === "change"
        ? { f3: `${f3}`, t3: `${t3}` }
        : { v4: `${currencySymbol}${v4}`, op4: m4Op === "add" ? "Add (+)" : "Deduct (-)", p4: `${p4}%` }),
    }}
    output={{
      hero: {
        value:
          mode === "part_of_whole"
            ? formatNum(r1)
            : mode === "what_percent"
            ? `${formatNum(r2)}%`
            : mode === "change"
            ? `${isIncrease ? "+" : ""}${formatNum(r3)}%`
            : `${currencySymbol}${formatNum(r4)}`,
        label:
          mode === "part_of_whole"
            ? `Calculated ${p1}% of ${v1}`
            : mode === "what_percent"
            ? `${p2} as a Percentage of ${w2}`
            : mode === "change"
            ? `Percentage ${isIncrease ? "Growth / Increase" : "Decline / Decrease"}`
            : `Net Adjusted Total (${m4Op === "add" ? "+" : "-"}${p4}%)`,
      },
      badge: {
        text: mode === "change" ? (isIncrease ? "+ Growth" : "- Decrease") : "Verified Output",
        tone: "good",
      },
      rows: [
        ...(mode === "part_of_whole"
          ? [
              { label: "Calculated Portion", value: formatNum(r1), strong: true },
              { label: "Decimal Scale Factor", value: ((Number(p1) || 0) / 100).toFixed(4) },
              { label: "Complement Portion (Remaining)", value: formatNum((Number(v1) || 0) - r1) },
            ]
          : mode === "what_percent"
          ? [
              { label: "Calculated Proportion", value: `${formatNum(r2)}%`, strong: true },
              { label: "Unit Fraction Equivalent", value: `~ ${((Number(p2) || 0) / (Number(w2) || 1)).toFixed(4)}` },
              { label: "Difference from 100%", value: `${formatNum(100 - r2)}%` },
            ]
          : mode === "change"
          ? [
              { label: "Percentage Shift", value: `${isIncrease ? "+" : ""}${formatNum(r3)}%`, strong: true },
              { label: "Absolute Numerical Difference", value: `${isIncrease ? "+" : ""}${formatNum(diff3)}` },
              { label: "Multiplicative Growth Factor", value: `${((Number(t3) || 0) / (Number(f3) || 1)).toFixed(4)}×` },
            ]
          : [
              { label: "Final Adjusted Amount", value: `${currencySymbol}${formatNum(r4)}`, strong: true },
              { label: "Net Variance (Adjustment)", value: `${currencySymbol}${formatNum(delta4)}` },
              { label: "Original Base Amount", value: `${currencySymbol}${formatNum(Number(v4) || 0)}` },
            ]),
      ],
      note: {
        text: "Calculated with exact base-100 floating point precision according to universal mathematical identities.",
      },
    }}
  />
  </>
  );
}
