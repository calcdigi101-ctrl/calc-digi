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
            {/* ==================================================== */}
            {activeTab === "main" && (
              <div className="space-y-2">
                {/* Scientific Function Row 1 */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setIs2nd((v) => !v)}
                    className={cn(
                      "h-11 rounded-xl text-xs font-extrabold transition-all border",
                      is2nd
                        ? "bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300 shadow-xs"
                        : "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900/60 hover:bg-amber-100"
                    )}
                  >
                    2nd
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc(is2nd ? "asin" : "sin")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "sin⁻¹" : "sin"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc(is2nd ? "acos" : "cos")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "cos⁻¹" : "cos"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc(is2nd ? "atan" : "tan")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "tan⁻¹" : "tan"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc(is2nd ? "exp" : "ln")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "eˣ" : "ln"}
                  </button>
                </div>

                {/* Scientific Function Row 2 */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => insertFunc(is2nd ? "log2" : "log")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "log₂" : "log"}
                  </button>
                  <button
                    type="button"
                    onClick={() => (is2nd ? insertFunc("cbrt") : insertToken("√"))}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "³√x" : "√x"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken(is2nd ? "³" : "²")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "x³" : "x²"}
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("^")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    xʸ
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc(is2nd ? "abs" : "inv")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {is2nd ? "|x|" : "1/x"}
                  </button>
                </div>

                {/* Primary Numberpad & Operators Grid (5 Columns) */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-1">
                  {/* Row 1 */}
                  <button
                    type="button"
                    onClick={() => insertToken("(")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    (
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken(")")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    )
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("%")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    %
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-sm hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/60 dark:border-rose-900/40"
                    title="Backspace"
                  >
                    DEL
                  </button>
                  <button
                    type="button"
                    onClick={handleAllClear}
                    className="h-12 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-xs"
                    title="All Clear"
                  >
                    AC
                  </button>

                  {/* Row 2 */}
                  <button
                    type="button"
                    onClick={() => insertToken("7")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    7
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("8")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    8
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("9")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    9
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("÷")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    ÷
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("π")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200"
                  >
                    π
                  </button>

                  {/* Row 3 */}
                  <button
                    type="button"
                    onClick={() => insertToken("4")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    4
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("5")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    5
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("6")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    6
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("×")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    ×
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("e")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200"
                  >
                    e
                  </button>

                  {/* Row 4 */}
                  <button
                    type="button"
                    onClick={() => insertToken("1")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("2")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("3")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("−")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    −
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("!")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-200"
                  >
                    n!
                  </button>

                  {/* Row 5 */}
                  <button
                    type="button"
                    onClick={() => insertToken("0")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken(".")}
                    className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  >
                    .
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("Ans")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                  >
                    Ans
                  </button>
                  <button
                    type="button"
                    onClick={() => insertToken("+")}
                    className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-700 dark:text-amber-400 font-extrabold text-xl hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={handleEquals}
                    className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-2xl shadow-md transition-all flex items-center justify-center cursor-pointer"
                  >
                    =
                  </button>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB CONTENT 2: COMPLETE TRIGONOMETRY & HYPERBOLIC   */}
            {/* ==================================================== */}
            {activeTab === "trig" && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Trigonometric & Hyperbolic Library</span>
                  <span className="text-emerald-600 font-bold">Mode: {angleMode.toUpperCase()}</span>
                </div>

                {/* Direct Trig & Reciprocals */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["sin", "cos", "tan", "cot", "sec", "csc"].map((fn) => (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => insertFunc(fn)}
                      className="h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/60 dark:border-emerald-900/50 transition-colors"
                    >
                      {fn}(x)
                    </button>
                  ))}
                </div>

                {/* Inverse Trigonometric Functions */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["asin", "acos", "atan", "acot", "asec", "acsc"].map((fn) => (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => insertFunc(fn)}
                      className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {fn.replace("a", "")}⁻¹(x)
                    </button>
                  ))}
                </div>

                {/* Hyperbolic Functions */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["sinh", "cosh", "tanh", "coth", "sech", "csch"].map((fn) => (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => insertFunc(fn)}
                      className="h-11 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200/60 dark:border-purple-900/50 transition-colors"
                    >
                      {fn}(x)
                    </button>
                  ))}
                </div>

                {/* Inverse Hyperbolic Functions */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {["asinh", "acosh", "atanh", "acoth", "asech", "acsch"].map((fn) => (
                    <button
                      key={fn}
                      type="button"
                      onClick={() => insertFunc(fn)}
                      className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      {fn.replace("a", "")}⁻¹(x)
                    </button>
                  ))}
                </div>

                {/* Quick Angle Switcher Bar */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>Current Angle System:</span>
                  <div className="flex items-center gap-1">
                    {(["deg", "rad", "grad"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setAngleMode(mode)}
                        className={cn(
                          "px-2.5 py-1 rounded-md font-bold uppercase transition-all",
                          angleMode === mode
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                        )}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB CONTENT 3: ALGEBRA, COMBINATORICS & ADVANCED    */}
            {/* ==================================================== */}
            {activeTab === "advanced" && (
              <div className="space-y-3">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Combinatorics, Number Theory & Advanced Radicals
                </div>

                {/* Combinatorics & Probability */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => insertFunc("nPr")}
                    className="h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 border border-emerald-200/60 dark:border-emerald-900/50"
                    title="Permutations nPr(n, r)"
                  >
                    nPr(n, r)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("nCr")}
                    className="h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 border border-emerald-200/60 dark:border-emerald-900/50"
                    title="Combinations nCr(n, r)"
                  >
                    nCr(n, r)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("gcd")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                    title="Greatest Common Divisor gcd(a, b)"
                  >
                    gcd(a, b)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("lcm")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                    title="Least Common Multiple lcm(a, b)"
                  >
                    lcm(a, b)
                  </button>
                </div>

                {/* Number Theory & Modulo */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => insertFunc("mod")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                    title="Modulo mod(a, b)"
                  >
                    mod(a, b)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("root")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                    title="Arbitrary Root root(x, degree)"
                  >
                    ʸ√x (root)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("logb")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                    title="Logarithm with arbitrary base logb(x, base)"
                  >
                    logᵦ(x)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("cbrt")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                    title="Cube Root cbrt(x)"
                  >
                    ³√x
                  </button>
                </div>

                {/* Rounding & Integer Functions */}
                <div className="grid grid-cols-5 gap-2">
                  <button
                    type="button"
                    onClick={() => insertFunc("abs")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                  >
                    |x| (abs)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("floor")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                  >
                    ⌊x⌋ floor
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("ceil")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                  >
                    ⌈x⌉ ceil
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("round")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                  >
                    round
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("sign")}
                    className="h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-200"
                  >
                    sgn(x)
                  </button>
                </div>

                {/* Random Generators */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => insertFunc("rand")}
                    className="h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 border border-indigo-200/60 dark:border-indigo-900/50"
                  >
                    rand() (0 to 1)
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFunc("randInt")}
                    className="h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 border border-indigo-200/60 dark:border-indigo-900/50"
                  >
                    randInt(min, max)
                  </button>
                </div>
              </div>
            )}

            {/* ==================================================== */}
            {/* TAB CONTENT 4: UNIVERSAL PHYSICAL & MATH CONSTANTS  */}
            {/* ==================================================== */}
            {activeTab === "constants" && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  10 Universal Physical & Mathematical Constants (Click to Insert)
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {CONSTANTS_LIST.map((c) => (
                    <button
                      key={c.symbol}
                      type="button"
                      onClick={() => insertToken(c.symbol)}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-black text-emerald-700 dark:text-emerald-400 text-sm">
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
