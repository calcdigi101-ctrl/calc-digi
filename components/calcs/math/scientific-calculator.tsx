"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Trash2,
  Download,
  Volume2,
  VolumeX,
  History,
  Calculator,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  ArrowRightLeft
} from "lucide-react";
import { evaluate, formatResult, AngleMode, CalcError, canAppendDecimal, CONSTANTS } from "@/lib/expr";
import { CalculationInvoice } from "@/components/flagship/engine/CalculationInvoice";
import { ResultActions } from "@/components/flagship/ResultActions";
import { cn } from "@/lib/cn";

// Continuous fraction converter for exact fraction display (S <=> D)
function toFraction(val: number, maxDenominator = 10000): string | null {
  if (!Number.isFinite(val)) return null;
  if (Number.isInteger(val)) return `${val}`;

  const sign = val < 0 ? "-" : "";
  const absVal = Math.abs(val);

  let h1 = 1, h0 = 0;
  let k1 = 0, k0 = 1;
  let b = absVal;

  for (let i = 0; i < 20; i++) {
    const a = Math.floor(b);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;

    if (k2 > maxDenominator) break;

    h0 = h1; h1 = h2;
    k0 = k1; k1 = k2;

    const diff = Math.abs(absVal - h1 / k1);
    if (diff < 1e-9) break;

    const frac = b - a;
    if (frac < 1e-9) break;
    b = 1 / frac;
  }

  if (k1 === 1) return `${sign}${h1}`;
  if (k1 > 10000) return null;
  return `${sign}${h1}/${k1}`;
}

// Engineering notation formatter (exponent multiple of 3)
function toEngineering(val: number): string {
  if (!Number.isFinite(val) || val === 0) return "0";
  const abs = Math.abs(val);
  const exp = Math.floor(Math.log10(abs));
  const engExp = Math.floor(exp / 3) * 3;
  const mantissa = val / Math.pow(10, engExp);
  const mStr = Number(mantissa.toFixed(6)).toString();
  return engExp === 0 ? mStr : `${mStr} × 10^${engExp}`;
}

// 10 Universal Physical & Mathematical Constants
const CONSTANTS_LIST = [
  { symbol: "π", name: "Archimedes' Pi", val: "π", numeric: Math.PI, desc: "Ratio of circle circumference to diameter" },
  { symbol: "e", name: "Euler's Number", val: "e", numeric: Math.E, desc: "Base of natural logarithm" },
  { symbol: "φ", name: "Golden Ratio", val: "φ", numeric: (1 + Math.sqrt(5)) / 2, desc: "Divine proportion (1.6180339...)" },
  { symbol: "c", name: "Speed of Light", val: "c", numeric: 299792458, unit: "m/s", desc: "Speed of light in vacuum" },
  { symbol: "h", name: "Planck Constant", val: "h", numeric: 6.62607015e-34, unit: "J·s", desc: "Quantum of action" },
  { symbol: "g", name: "Standard Gravity", val: "g", numeric: 9.80665, unit: "m/s²", desc: "Standard gravitational acceleration on Earth" },
  { symbol: "NA", name: "Avogadro Number", val: "NA", numeric: 6.02214076e23, unit: "mol⁻¹", desc: "Particles per mole of substance" },
  { symbol: "R", name: "Molar Gas Constant", val: "R", numeric: 8.314462618, unit: "J/(mol·K)", desc: "Universal thermodynamic gas constant" },
  { symbol: "G", name: "Gravitational Constant", val: "G", numeric: 6.6743e-11, unit: "N·m²/kg²", desc: "Newtonian constant of gravitation" },
  { symbol: "kB", name: "Boltzmann Constant", val: "kB", numeric: 1.380649e-23, unit: "J/K", desc: "Kinetic energy to temperature scale" },
];

type CategoryTab = "main" | "trig" | "advanced" | "constants";

export default function ScientificCalculator() {
  // Calculator Expression & Display States
  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [evaluatedVal, setEvaluatedVal] = useState<number | null>(0);
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [is2nd, setIs2nd] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [lastAns, setLastAns] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<CategoryTab>("main");

  // Output formatting: dec (Decimal), frac (Fraction), sci (Scientific), eng (Engineering)
  const [displayFormat, setDisplayFormat] = useState<"dec" | "frac" | "sci" | "eng">("dec");

  // History Tape
  const [history, setHistory] = useState<Array<{ expr: string; result: string; val: number; time: string }>>([
    { expr: "sin(30°)", result: "0.5", val: 0.5, time: "Example" },
    { expr: "2^10", result: "1,024", val: 1024, time: "Example" }
  ]);

  // Audio click feedback & Copied feedback
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const finalVal = evaluatedVal ?? (Number(display) || 0);

  // Sound generator
  const playClick = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext unavailable
    }
  };

  // Real-time live evaluation preview
  const livePreview = useMemo(() => {
    if (!expr.trim()) return null;
    try {
      let sanitized = expr;
      const openCount = (sanitized.match(/\(/g) || []).length;
      const closeCount = (sanitized.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        sanitized += ")".repeat(openCount - closeCount);
      }
      const val = evaluate(sanitized, { angle: angleMode, ans: lastAns, mem: memory });
      if (Number.isFinite(val)) {
        return formatResult(val);
      }
      return null;
    } catch {
      return null;
    }
  }, [expr, angleMode, lastAns, memory]);

  // Insert token into expression
  const insertToken = (token: string) => {
    playClick();
    if (display === "Math ERROR" || display === "Syntax ERROR") {
      setExpr(token);
      setDisplay(token);
      return;
    }
    if (token === "." && !canAppendDecimal(expr)) return;
    setExpr((prev) => prev + token);
    setDisplay((prev) => (prev === "0" && !isNaN(Number(token)) ? token : prev + token));
  };

  // Insert function call with open parenthesis
  const insertFunc = (fnName: string) => {
    playClick();
    if (display === "Math ERROR" || display === "Syntax ERROR") {
      setExpr(`${fnName}(`);
      setDisplay(`${fnName}(`);
      return;
    }
    setExpr((prev) => `${prev}${fnName}(`);
    setDisplay((prev) => (prev === "0" ? `${fnName}(` : `${prev}${fnName}(`));
  };

  // Execute calculation (=)
  const handleEquals = () => {
    playClick();
    if (!expr.trim()) return;

    try {
      let sanitized = expr;
      const openCount = (sanitized.match(/\(/g) || []).length;
      const closeCount = (sanitized.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        sanitized += ")".repeat(openCount - closeCount);
      }

      const res = evaluate(sanitized, {
        angle: angleMode,
        ans: lastAns,
        mem: memory
      });

      const formatted = formatResult(res);
      setEvaluatedVal(res);
      setDisplay(formatted);
      setDisplayFormat("dec");
      setLastAns(res);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      setHistory((prev) => [
        { expr: sanitized, result: formatted, val: res, time: timeStr },
        ...prev.slice(0, 24)
      ]);
    } catch (err) {
      if (err instanceof CalcError) {
        setDisplay(err.message.includes("Cannot divide") || err.message.includes("Domain") ? "Math ERROR" : "Syntax ERROR");
      } else {
        setDisplay("Syntax ERROR");
      }
      setEvaluatedVal(null);
    }
  };

  // All Clear (AC)
  const handleAllClear = () => {
    playClick();
    setExpr("");
    setDisplay("0");
    setEvaluatedVal(0);
    setDisplayFormat("dec");
  };

  // Backspace (DEL)
  const handleDelete = () => {
    playClick();
    if (display === "Math ERROR" || display === "Syntax ERROR") {
      handleAllClear();
      return;
    }
    const funcs = [
      "asin(", "acos(", "atan(", "acot(", "asec(", "acsc(",
      "sinh(", "cosh(", "tanh(", "coth(", "sech(", "csch(",
      "asinh(", "acosh(", "atanh(",
      "sin(", "cos(", "tan(", "cot(", "sec(", "csc(",
      "log10(", "log2(", "logb(", "log(", "ln(", "exp(",
      "sqrt(", "cbrt(", "root(", "sqr(", "cube(", "inv(",
      "abs(", "floor(", "ceil(", "round(", "sign(", "fact(",
      "mod(", "gcd(", "lcm(", "nPr(", "nCr(", "randInt(", "rand()",
      "Ans", "MR"
    ];

    setExpr((prev) => {
      if (!prev) return "";
      for (const fn of funcs) {
        if (prev.endsWith(fn)) return prev.slice(0, -fn.length);
      }
      return prev.length > 1 ? prev.slice(0, -1) : "";
    });

    setDisplay((prev) => {
      if (!prev || prev === "0") return "0";
      for (const fn of funcs) {
        if (prev.endsWith(fn)) {
          const res = prev.slice(0, -fn.length);
          return res.length > 0 ? res : "0";
        }
      }
      return prev.length > 1 ? prev.slice(0, -1) : "0";
    });
  };

  // Toggle angle mode: DEG -> RAD -> GRAD -> DEG
  const cycleAngleMode = () => {
    playClick();
    setAngleMode((prev) => (prev === "deg" ? "rad" : prev === "rad" ? "grad" : "deg"));
  };

  // S<=>D Toggle (Fraction <=> Decimal)
  const toggleStandardDecimal = () => {
    playClick();
    if (evaluatedVal === null || !Number.isFinite(evaluatedVal)) return;

    if (displayFormat === "dec") {
      const frac = toFraction(evaluatedVal);
      if (frac && frac !== String(evaluatedVal)) {
        setDisplayFormat("frac");
        setDisplay(frac);
      } else {
        setDisplayFormat("sci");
        setDisplay(evaluatedVal.toExponential(6));
      }
    } else if (displayFormat === "frac") {
      setDisplayFormat("sci");
      setDisplay(evaluatedVal.toExponential(6));
    } else if (displayFormat === "sci") {
      setDisplayFormat("eng");
      setDisplay(toEngineering(evaluatedVal));
    } else {
      setDisplayFormat("dec");
      setDisplay(formatResult(evaluatedVal));
    }
  };

  // Memory functions
  const handleMemory = (action: "add" | "sub" | "recall" | "clear" | "store") => {
    playClick();
    const val = evaluatedVal ?? (Number(display) || 0);
    if (!Number.isFinite(val) && action !== "clear") return;

    if (action === "clear") {
      setMemory(0);
    } else if (action === "recall") {
      insertToken(String(memory));
    } else if (action === "add") {
      setMemory((prev) => prev + val);
    } else if (action === "sub") {
      setMemory((prev) => prev - val);
    } else if (action === "store") {
      setMemory(val);
    }
  };

  // Copy current result to clipboard
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(display);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Export calculation history as TXT file
  const handleExportHistory = () => {
    if (history.length === 0) return;
    const content = history
      .map((h, i) => `[${i + 1}] ${h.time} | Expression: ${h.expr} = ${h.result}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calcdigi_scientific_history_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard support listener
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key >= "0" && e.key <= "9") {
        insertToken(e.key);
      } else if (e.key === ".") {
        insertToken(".");
      } else if (e.key === "+") {
        insertToken("+");
      } else if (e.key === "-") {
        insertToken("−");
      } else if (e.key === "*") {
        insertToken("×");
      } else if (e.key === "/") {
        e.preventDefault();
        insertToken("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleEquals();
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        handleAllClear();
      } else if (e.key === "(" || e.key === ")") {
        insertToken(e.key);
      } else if (e.key === "^") {
        insertToken("^");
      } else if (e.key === "%") {
        insertToken("%");
      } else if (e.key === "!") {
        insertToken("!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, expr, lastAns, memory, angleMode]);

  return (
    <>
      <div className="fx-web-tool mt-6 grid gap-6 lg:grid-cols-12 lg:items-start select-none">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Modern Sleek Scientific Calculator Unit     */}
        {/* ======================================================== */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 shadow-xl relative">
            
            {/* Top Branding & Quick Audio Bar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-tight text-slate-900 dark:text-white text-lg">
                  Calc<span className="text-emerald-600 dark:text-emerald-400">Digi</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Scientific Pro
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled((v) => !v)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={soundEnabled ? "Mute Keypad Sound" : "Enable Keypad Sound"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* ==================================================== */}
            {/* High-Resolution Modern OLED Display Unit            */}
            {/* ==================================================== */}
            <div className="mb-4 rounded-2xl bg-slate-950 p-4 text-white border border-slate-800/90 shadow-inner font-mono relative">
              {/* Display Status Row */}
              <div className="flex items-center justify-between text-[11px] font-bold tracking-tight pb-2 mb-2 border-b border-slate-800 text-slate-400">
                <div className="flex items-center gap-1.5">
                  {/* Angle Mode Badge (Clickable) */}
                  <button
                    type="button"
                    onClick={cycleAngleMode}
                    className="px-2 py-0.5 rounded-md font-bold bg-slate-800 text-emerald-400 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
                    title="Click to toggle DEG / RAD / GRAD"
                  >
                    {angleMode.toUpperCase()}
                  </button>

                  {/* 2nd Active Badge */}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-bold transition-all",
                      is2nd ? "bg-amber-400 text-slate-950 shadow-xs" : "opacity-20 bg-slate-800 text-slate-400"
                    )}
                  >
                    2nd
                  </span>

                  {/* Memory Active Badge */}
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-bold transition-all",
                      memory !== 0 ? "bg-emerald-500 text-slate-950 shadow-xs" : "opacity-20 bg-slate-800 text-slate-400"
                    )}
                    title={`Stored Memory: ${memory}`}
                  >
                    M
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">
                    {displayFormat.toUpperCase()}
                  </span>
                  {livePreview && livePreview !== display && (
                    <span className="text-emerald-400/80 text-[11px] font-sans">
                      ≈ {livePreview}
                    </span>
                  )}
                </div>
              </div>

              {/* Line 1: Expression Line with Smooth Scroll & Cursor */}
              <div className="min-h-[26px] text-sm text-slate-300 font-mono tracking-wide truncate flex items-center justify-start overflow-x-auto no-scrollbar">
                <span>{expr || "\u00A0"}</span>
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-emerald-400 animate-pulse"></span>
              </div>

              {/* Line 2: Large Right-Aligned Result Line */}
              <div className="text-right text-3xl sm:text-5xl font-black text-white tracking-tight overflow-x-auto no-scrollbar py-1">
                {display}
              </div>
            </div>

            {/* ==================================================== */}
            {/* Organized Category Switcher Tabs                    */}
            {/* ==================================================== */}
            <div className="grid grid-cols-4 gap-1 p-1 mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("main")}
                className={cn(
                  "py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1",
                  activeTab === "main"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                )}
              >
                <span>⚡ Main</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("trig")}
                className={cn(
                  "py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1",
                  activeTab === "trig"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                )}
              >
                <span>📐 Trig</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("advanced")}
                className={cn(
                  "py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1",
                  activeTab === "advanced"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                )}
              >
                <span>🔬 Algebra</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("constants")}
                className={cn(
                  "py-1.5 rounded-lg transition-all text-center flex items-center justify-center gap-1",
                  activeTab === "constants"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                )}
              >
                <span>⚛️ Const</span>
              </button>
            </div>

            {/* ==================================================== */}
            {/* TAB CONTENT 1: MAIN SCIENTIFIC KEYPAD                */}
            {/* Unified 5-Column Grid with Guaranteed Row & Col Gap  */}
            {/* ==================================================== */}
            {activeTab === "main" && (
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
                {/* Row 1: Primary Scientific & Dynamic Shift Keys */}
                <button
                  type="button"
                  onClick={() => setIs2nd((v) => !v)}
                  className={cn(
                    "h-11 sm:h-12 rounded-md text-xs sm:text-sm font-extrabold transition-all border active:scale-95 cursor-pointer shadow-xs",
                    is2nd
                      ? "bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300"
                      : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/60 hover:bg-amber-100 dark:hover:bg-amber-900/40"
                  )}
                  title="Toggle 2nd (Inverse/Secondary) Functions"
                >
                  2nd
                </button>
                <button
                  type="button"
                  onClick={() => insertFunc(is2nd ? "asin" : "sin")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "sin⁻¹" : "sin"}
                </button>
                <button
                  type="button"
                  onClick={() => insertFunc(is2nd ? "acos" : "cos")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "cos⁻¹" : "cos"}
                </button>
                <button
                  type="button"
                  onClick={() => insertFunc(is2nd ? "atan" : "tan")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "tan⁻¹" : "tan"}
                </button>
                <button
                  type="button"
                  onClick={() => insertFunc(is2nd ? "exp" : "ln")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "eˣ" : "ln"}
                </button>

                {/* Row 2: Powers, Roots & Reciprocals */}
                <button
                  type="button"
                  onClick={() => insertFunc(is2nd ? "log2" : "log")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "log₂" : "log"}
                </button>
                <button
                  type="button"
                  onClick={() => (is2nd ? insertFunc("cbrt") : insertToken("√"))}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "³√x" : "√x"}
                </button>
                <button
                  type="button"
                  onClick={() => insertToken(is2nd ? "³" : "²")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "x³" : "x²"}
                </button>
                <button
                  type="button"
                  onClick={() => (is2nd ? insertFunc("root") : insertToken("^"))}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "ʸ√x" : "xʸ"}
                </button>
                <button
                  type="button"
                  onClick={() => insertFunc(is2nd ? "abs" : "inv")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  {is2nd ? "|x|" : "1/x"}
                </button>

                {/* Row 3: Constants & Parentheses */}
                <button
                  type="button"
                  onClick={() => insertToken("π")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-serif font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                  title="Pi (3.14159...)"
                >
                  π
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("e")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-serif font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                  title="Euler's Constant (2.71828...)"
                >
                  e
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("(")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-mono font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  (
                </button>
                <button
                  type="button"
                  onClick={() => insertToken(")")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-mono font-bold text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  )
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("%")}
                  className="h-11 sm:h-12 rounded-md bg-slate-100/90 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                >
                  %
                </button>

                {/* Row 4: Digits (7, 8, 9) + DEL & AC */}
                <button
                  type="button"
                  onClick={() => insertToken("7")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  7
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("8")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  8
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("9")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  9
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="h-12 sm:h-13 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-sm hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/70 dark:border-rose-900/40 transition-all active:scale-95 cursor-pointer"
                  title="Backspace / Delete"
                >
                  DEL
                </button>
                <button
                  type="button"
                  onClick={handleAllClear}
                  className="h-12 sm:h-13 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
                  title="All Clear (AC)"
                >
                  AC
                </button>

                {/* Row 5: Digits (4, 5, 6) + Multiplication & Division */}
                <button
                  type="button"
                  onClick={() => insertToken("4")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("5")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  5
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("6")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  6
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("×")}
                  className="h-12 sm:h-13 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  ×
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("÷")}
                  className="h-12 sm:h-13 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  ÷
                </button>

                {/* Row 6: Digits (1, 2, 3) + Addition & Subtraction */}
                <button
                  type="button"
                  onClick={() => insertToken("1")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("2")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("3")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("+")}
                  className="h-12 sm:h-13 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("−")}
                  className="h-12 sm:h-13 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                >
                  −
                </button>

                {/* Row 7: Digits (0, .), Ans, Factorial & Equals */}
                <button
                  type="button"
                  onClick={() => insertToken("0")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={() => insertToken(".")}
                  className="h-12 sm:h-13 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs transition-all active:scale-95 cursor-pointer"
                >
                  .
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("Ans")}
                  className="h-12 sm:h-13 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                  title="Last Calculated Answer"
                >
                  Ans
                </button>
                <button
                  type="button"
                  onClick={() => insertToken("!")}
                  className="h-12 sm:h-13 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 cursor-pointer"
                  title="Factorial (n!)"
                >
                  n!
                </button>
                <button
                  type="button"
                  onClick={handleEquals}
                  className="h-12 sm:h-13 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-black text-2xl shadow-md transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                  title="Calculate Result (=)"
                >
                  =
                </button>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB CONTENT 2: COMPLETE TRIGONOMETRY & HYPERBOLIC   */}
            {/* Structured with Flex Gap & Explicit Sub-Categories   */}
            {/* ==================================================== */}
            {activeTab === "trig" && (
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Mode Selector & Status Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Trigonometric & Hyperbolic Library
                  </span>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
                    {(["deg", "rad", "grad"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setAngleMode(mode)}
                        className={cn(
                          "px-2.5 py-1 rounded-md font-bold uppercase transition-all cursor-pointer",
                          angleMode === mode
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        )}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 1: Direct Trig & Reciprocals */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Standard Trigonometry (Circular)
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                    {["sin", "cos", "tan", "cot", "sec", "csc"].map((fn) => (
                      <button
                        key={fn}
                        type="button"
                        onClick={() => insertFunc(fn)}
                        className="h-11 sm:h-12 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/70 dark:border-emerald-900/50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      >
                        {fn}(x)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 2: Inverse Trigonometric Functions */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Inverse Trigonometry (Arc Functions)
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                    {["asin", "acos", "atan", "acot", "asec", "acsc"].map((fn) => (
                      <button
                        key={fn}
                        type="button"
                        onClick={() => insertFunc(fn)}
                        className="h-11 sm:h-12 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 font-bold text-xs hover:bg-sky-100 dark:hover:bg-sky-900/60 border border-sky-200/70 dark:border-sky-900/50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      >
                        {fn.replace("a", "")}⁻¹(x)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 3: Hyperbolic Functions */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Hyperbolic Functions
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                    {["sinh", "cosh", "tanh", "coth", "sech", "csch"].map((fn) => (
                      <button
                        key={fn}
                        type="button"
                        onClick={() => insertFunc(fn)}
                        className="h-11 sm:h-12 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/70 dark:border-purple-900/50 transition-all active:scale-95 shadow-xs cursor-pointer"
                      >
                        {fn}(x)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 4: Inverse Hyperbolic Functions */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Inverse Hyperbolic (Area Functions)
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
                    {["asinh", "acosh", "atanh", "acoth", "asech", "acsch"].map((fn) => (
                      <button
                        key={fn}
                        type="button"
                        onClick={() => insertFunc(fn)}
                        className="h-11 sm:h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                      >
                        {fn.replace("a", "")}⁻¹(x)
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB CONTENT 3: ALGEBRA, COMBINATORICS & ADVANCED    */}
            {/* Structured with Flex Gap & Explicit Sub-Categories   */}
            {/* ==================================================== */}
            {activeTab === "advanced" && (
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Section 1: Combinatorics & Probability */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Combinatorics & Number Theory
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => insertFunc("nPr")}
                      className="h-12 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 border border-emerald-200/70 dark:border-emerald-900/50 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Permutations nPr(n, r)"
                    >
                      <span className="text-xs font-black">nPr(n, r)</span>
                      <span className="text-[10px] opacity-75 font-normal">Permutations</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("nCr")}
                      className="h-12 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 border border-emerald-200/70 dark:border-emerald-900/50 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Combinations nCr(n, r)"
                    >
                      <span className="text-xs font-black">nCr(n, r)</span>
                      <span className="text-[10px] opacity-75 font-normal">Combinations</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("gcd")}
                      className="h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Greatest Common Divisor gcd(a, b)"
                    >
                      <span className="text-xs font-black">gcd(a, b)</span>
                      <span className="text-[10px] opacity-75 font-normal">Greatest Divisor</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("lcm")}
                      className="h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Least Common Multiple lcm(a, b)"
                    >
                      <span className="text-xs font-black">lcm(a, b)</span>
                      <span className="text-[10px] opacity-75 font-normal">Least Multiple</span>
                    </button>
                  </div>
                </div>

                {/* Section 2: Number Theory & Radicals */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Advanced Radicals, Logs & Modulo
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => insertFunc("mod")}
                      className="h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Modulo mod(a, b)"
                    >
                      <span className="text-xs font-black">mod(a, b)</span>
                      <span className="text-[10px] opacity-75 font-normal">Remainder</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("root")}
                      className="h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Arbitrary Root root(x, degree)"
                    >
                      <span className="text-xs font-black">ʸ√x (root)</span>
                      <span className="text-[10px] opacity-75 font-normal">nth Root</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("logb")}
                      className="h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Logarithm with arbitrary base logb(x, base)"
                    >
                      <span className="text-xs font-black">logᵦ(x)</span>
                      <span className="text-[10px] opacity-75 font-normal">Base-b Log</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("cbrt")}
                      className="h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                      title="Cube Root cbrt(x)"
                    >
                      <span className="text-xs font-black">³√x</span>
                      <span className="text-[10px] opacity-75 font-normal">Cube Root</span>
                    </button>
                  </div>
                </div>

                {/* Section 3: Rounding & Integer Functions */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Rounding & Truncation
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => insertFunc("abs")}
                      className="h-11 sm:h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      |x| (abs)
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("floor")}
                      className="h-11 sm:h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      ⌊x⌋ floor
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("ceil")}
                      className="h-11 sm:h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      ⌈x⌉ ceil
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("round")}
                      className="h-11 sm:h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      round(x)
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("sign")}
                      className="h-11 sm:h-12 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      sgn(x)
                    </button>
                  </div>
                </div>

                {/* Section 4: Random Generators */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Random Number Generation
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    <button
                      type="button"
                      onClick={() => insertFunc("rand")}
                      className="h-12 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 border border-indigo-200/70 dark:border-indigo-900/50 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                    >
                      <span className="text-xs font-black">rand()</span>
                      <span className="text-[10px] opacity-75 font-normal">Uniform Float [0, 1)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFunc("randInt")}
                      className="h-12 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 border border-indigo-200/70 dark:border-indigo-900/50 transition-all active:scale-95 shadow-xs cursor-pointer flex flex-col items-center justify-center"
                    >
                      <span className="text-xs font-black">randInt(min, max)</span>
                      <span className="text-[10px] opacity-75 font-normal">Random Integer in Range</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB CONTENT 4: UNIVERSAL PHYSICAL & MATH CONSTANTS  */}
            {/* ==================================================== */}
            {activeTab === "constants" && (
              <div className="flex flex-col gap-3">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  10 Universal Physical & Mathematical Constants (Click to Insert)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
                  {CONSTANTS_LIST.map((c) => (
                    <button
                      key={c.symbol}
                      type="button"
                      onClick={() => insertToken(c.symbol)}
                      className="p-3 rounded-md bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:shadow-xs transition-all text-left cursor-pointer active:scale-95 group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-black text-emerald-700 dark:text-emerald-400 text-base">
                          {c.symbol}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {c.unit || ""}
                        </span>
                      </div>
                      <div className="font-bold text-[11px] text-slate-800 dark:text-slate-200 truncate">
                        {c.name}
                      </div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono truncate">
                        {c.numeric.toPrecision(6)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Memory Bar below Keypad */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 font-bold">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider mr-1">Memory:</span>
                <button
                  type="button"
                  onClick={() => handleMemory("clear")}
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                >
                  MC
                </button>
                <button
                  type="button"
                  onClick={() => handleMemory("recall")}
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                >
                  MR
                </button>
                <button
                  type="button"
                  onClick={() => handleMemory("add")}
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                >
                  M+
                </button>
                <button
                  type="button"
                  onClick={() => handleMemory("sub")}
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                >
                  M−
                </button>
                <button
                  type="button"
                  onClick={() => handleMemory("store")}
                  className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                >
                  MS
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowKeyboardHelp((v) => !v)}
                className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Keyboard Guide</span>
                {showKeyboardHelp ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {/* Keyboard Guide Drawer */}
            {showKeyboardHelp && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-bold text-slate-800 dark:text-white mb-1">Supported Physical Keyboard Shortcuts:</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                  <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-800 dark:text-slate-200">0 - 9</kbd> : Enter Digits</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-800 dark:text-slate-200">+ - * /</kbd> : Arithmetic</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-800 dark:text-slate-200">Enter / =</kbd> : Calculate Result</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-800 dark:text-slate-200">Backspace</kbd> : Delete Token</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-800 dark:text-slate-200">Escape</kbd> : All Clear (AC)</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-800 dark:text-slate-200">^ , % , !</kbd> : Powers & Factorial</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Results Workspace, Notation & History Tape */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Card 1: Primary Evaluated Output & Format Controls */}
          <div className="rounded-3xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Primary Output</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                  title="Copy result"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
              Active Calculation
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight break-all font-mono py-1">
              {display}
            </div>

            {/* Quick S <=> D and Notation Switcher Pills */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={toggleStandardDecimal}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-200 transition-colors"
                title="Convert Fraction <=> Decimal <=> Scientific <=> Engineering"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>S ⇔ D Mode</span>
              </button>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Format: <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">{displayFormat}</span>
              </div>
            </div>

            {/* Angle Representation Breakdown */}
            {evaluatedVal !== null && Number.isFinite(evaluatedVal) && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs space-y-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Trigonometric Angle Equivalence
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-400 block text-[9px]">DEGREES</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {angleMode === "deg" ? `${formatResult(evaluatedVal)}°` : `${formatResult(angleMode === "rad" ? (evaluatedVal * 180) / Math.PI : (evaluatedVal * 180) / 200)}°`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">RADIANS</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {angleMode === "rad" ? `${formatResult(evaluatedVal)} rad` : `${formatResult(angleMode === "deg" ? (evaluatedVal * Math.PI) / 180 : (evaluatedVal * Math.PI) / 200)} rad`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">GRADIANS</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {angleMode === "grad" ? `${formatResult(evaluatedVal)} grad` : `${formatResult(angleMode === "deg" ? (evaluatedVal * 200) / 180 : (evaluatedVal * 200) / Math.PI)} grad`}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Interactive Calculation History Tape */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <History className="w-4 h-4 text-emerald-600" />
                <span>Calculation Tape</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleExportHistory}
                  disabled={history.length === 0}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors disabled:opacity-30"
                  title="Export History (TXT)"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  disabled={history.length === 0}
                  className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors disabled:opacity-30"
                  title="Clear History"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">No previous calculations recorded</p>
            ) : (
              <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar">
                {history.map((h, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setExpr(h.expr);
                      setDisplay(h.result);
                      setEvaluatedVal(h.val);
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-transparent hover:border-emerald-300 transition-all cursor-pointer group flex items-center justify-between font-mono text-xs"
                  >
                    <div className="truncate mr-2">
                      <span className="text-slate-500 dark:text-slate-400 block text-[10px]">
                        {h.time}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {h.expr}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white text-right shrink-0">
                      = {h.result}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Toolbar Row: Reset, Print, Share, AI Explainer */}
          <ResultActions onReset={handleAllClear} title="Scientific Calculator" />
        </div>
      </div>

      {/* ======================================================== */}
      {/* PRINT-ONLY OFFICIAL CALCULATION INVOICE & STATEMENT      */}
      {/* ======================================================== */}
      <CalculationInvoice
        title="Scientific & Transcendental Mathematical Statement"
        category="Mathematics & Advanced Analytical Computing"
        fields={[
          { key: "expr", label: "Evaluated Expression / Formula" },
          { key: "angle", label: "Angular Coordinate System" },
          { key: "format", label: "Active Notation Mode" },
          { key: "memory", label: "Persistent Memory Register (M)" },
          { key: "lastAns", label: "Previous Answer Register (Ans)" },
        ]}
        values={{
          expr: expr || "0",
          angle: angleMode.toUpperCase() + (angleMode === "deg" ? " (360° Circle)" : angleMode === "rad" ? " (2π Radians)" : " (400 Gradians)"),
          format: displayFormat.toUpperCase(),
          memory: formatResult(memory),
          lastAns: formatResult(lastAns),
        }}
        output={{
          hero: {
            value: display,
            label: "Evaluated Numerical Solution",
            unit: "",
            sub: `Expression: ${expr || "0"} = ${display}`,
          },
          badge: {
            text: "Evaluated with IEEE 754 Floating-Point Precision",
            tone: "good",
          },
          rows: [
            { label: "Standard Decimal Value", value: formatResult(finalVal), strong: true },
            { label: "Exact Rational Fraction (S ⇔ D)", value: toFraction(finalVal) || "Irreducible" },
            { label: "Scientific Notation (SCI)", value: (finalVal).toExponential(8) },
            { label: "Engineering Notation (ENG)", value: toEngineering(finalVal) },
            { label: "Active Angle System", value: angleMode.toUpperCase() },
          ],
          note: {
            text: "Evaluated strictly according to mathematical operator precedence (PEMDAS/BODMAS) using recursive descent parsing. Transcendental functions calculated via IEEE 754 double precision with domain guardrails.",
          },
        }}
      />
    </>
  );
}
