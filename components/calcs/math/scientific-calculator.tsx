"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Clock,
  Cpu,
  Trash2,
  Download
} from "lucide-react";
import { evaluate, formatResult, AngleMode, CalcError } from "@/lib/expr";
import { ResultActions } from "@/components/flagship/ResultActions";
import { Disclosure } from "@/components/ui/disclosure";
import { card } from "@/components/flagship/shell";
import { cn } from "@/lib/cn";

// Continuous fraction converter for Casio S<=>D
function toFraction(val: number, maxDenominator = 10000): string | null {
  if (!Number.isFinite(val)) return null;
  if (Number.isInteger(val)) return `${val}`;
  
  const sign = val < 0 ? -1 : 1;
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

  if (k1 === 1) return `${sign * h1}`;
  if (k1 > 1000) return null;
  return `${sign * h1}/${k1}`;
}

// 8 Fundamental Scientific Constants
const CONSTANTS = [
  { symbol: "π", name: "Pi", val: "π", numeric: Math.PI, desc: "Circumference to diameter ratio" },
  { symbol: "e", name: "Euler's Number", val: "e", numeric: Math.E, desc: "Base of natural logarithm" },
  { symbol: "c", name: "Speed of Light", val: "299792458", numeric: 299792458, unit: "m/s", desc: "Speed in vacuum" },
  { symbol: "h", name: "Planck Constant", val: "6.62607e-34", numeric: 6.62607015e-34, unit: "J·s", desc: "Quantum of action" },
  { symbol: "g", name: "Standard Gravity", val: "9.80665", numeric: 9.80665, unit: "m/s²", desc: "Earth gravitational acceleration" },
  { symbol: "NA", name: "Avogadro Number", val: "6.02214e23", numeric: 6.02214076e23, unit: "mol⁻¹", desc: "Particles per mole" },
  { symbol: "k", name: "Boltzmann Constant", val: "1.38065e-23", numeric: 1.380649e-23, unit: "J/K", desc: "Thermal energy constant" },
  { symbol: "R", name: "Molar Gas Constant", val: "8.31446", numeric: 8.314462618, unit: "J/(mol·K)", desc: "Universal gas constant" },
];

export default function ScientificCalculator() {
  // Calculator States
  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [evaluatedVal, setEvaluatedVal] = useState<number | null>(0);
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");
  const [isShift, setIsShift] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [lastAns, setLastAns] = useState<number>(0);

  // Format: 'dec' | 'frac' | 'sci' | 'eng'
  const [displayFormat, setDisplayFormat] = useState<"dec" | "frac" | "sci" | "eng">("dec");

  // History Tape
  const [history, setHistory] = useState<Array<{ expr: string; result: string; val: number; time: string }>>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  // Key sound toggle
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play subtle keypress click sound
  const playClick = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // AudioContext unavailable
    }
  };

  // Insert token into expression
  const insertToken = (token: string) => {
    playClick();
    if (display === "Math ERROR" || display === "Syntax ERROR") {
      setExpr(token);
      setDisplay(token);
      return;
    }
    setExpr((prev) => prev + token);
    setDisplay((prev) => (prev === "0" && !isNaN(Number(token)) ? token : prev + token));
    setIsShift(false);
    setIsAlpha(false);
  };

  // Insert function call
  const insertFunc = (fnName: string) => {
    playClick();
    if (display === "Math ERROR" || display === "Syntax ERROR") {
      setExpr(`${fnName}(`);
      setDisplay(`${fnName}(`);
      return;
    }
    setExpr((prev) => `${prev}${fnName}(`);
    setDisplay((prev) => (prev === "0" ? `${fnName}(` : `${prev}${fnName}(`));
    setIsShift(false);
    setIsAlpha(false);
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
      setLastAns(res);

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      setHistory((prev) => [
        { expr: sanitized, result: formatted, val: res, time: timeStr },
        ...prev.slice(0, 19)
      ]);
      setHistoryIdx(-1);
    } catch (err) {
      if (err instanceof CalcError) {
        setDisplay(err.message === "Cannot divide by 0" || err.message === "Domain error" ? "Math ERROR" : "Syntax ERROR");
      } else {
        setDisplay("Syntax ERROR");
      }
      setEvaluatedVal(null);
    }
    setIsShift(false);
    setIsAlpha(false);
  };

  // All Clear (AC)
  const handleAllClear = () => {
    playClick();
    setExpr("");
    setDisplay("0");
    setEvaluatedVal(0);
    setIsShift(false);
    setIsAlpha(false);
  };

  // Delete single character (DEL)
  const handleDelete = () => {
    playClick();
    if (display === "Math ERROR" || display === "Syntax ERROR") {
      handleAllClear();
      return;
    }
    setExpr((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  // Shift toggle
  const toggleShift = () => {
    playClick();
    setIsShift((prev) => !prev);
    setIsAlpha(false);
  };

  // Alpha toggle
  const toggleAlpha = () => {
    playClick();
    setIsAlpha((prev) => !prev);
    setIsShift(false);
  };

  // Angle mode toggle (DEG / RAD)
  const cycleAngleMode = () => {
    playClick();
    setAngleMode((prev) => (prev === "deg" ? "rad" : "deg"));
  };

  // S<=>D key (Standard fraction ⇔ Decimal toggle)
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
    } else {
      setDisplayFormat("dec");
      setDisplay(formatResult(evaluatedVal));
    }
  };

  // Memory operations
  const handleMemoryAdd = () => {
    playClick();
    const cur = evaluatedVal ?? (parseFloat(display) || 0);
    setMemory((prev) => prev + cur);
  };

  const handleMemorySub = () => {
    playClick();
    const cur = evaluatedVal ?? (parseFloat(display) || 0);
    setMemory((prev) => prev - cur);
  };

  const handleMemoryRecall = () => {
    playClick();
    insertToken(String(memory));
  };

  // D-Pad History navigation
  const navigateHistory = (direction: "up" | "down") => {
    playClick();
    if (history.length === 0) return;

    let nextIdx = historyIdx;
    if (direction === "up") {
      nextIdx = historyIdx < history.length - 1 ? historyIdx + 1 : 0;
    } else {
      nextIdx = historyIdx > 0 ? historyIdx - 1 : history.length - 1;
    }

    setHistoryIdx(nextIdx);
    const item = history[nextIdx];
    if (item) {
      setExpr(item.expr);
      setDisplay(item.result);
      setEvaluatedVal(item.val);
    }
  };

  // Recall item to calculator
  const handleRecallHistory = (item: { expr: string; result: string; val: number }) => {
    playClick();
    setExpr(item.expr);
    setDisplay(item.result);
    setEvaluatedVal(item.val);
  };

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, expr, lastAns, memory, angleMode]);

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
      {/* ======================================================== */}
      {/* LEFT COLUMN: Authentic CalcDigi. fx-82EX Hardware Chassis */}
      {/* ======================================================== */}
      <div className="lg:col-span-7">
        <div className="rounded-[32px] border-2 border-slate-700/80 dark:border-slate-800 bg-gradient-to-b from-[#222831] via-[#181d24] to-[#111419] p-4 sm:p-6 shadow-2xl relative select-none">
          
          {/* Top Brand & Model Header (CalcDigi. fx-82EX) */}
          <div className="flex items-center justify-between mb-3 px-1">
            {/* Top Left: CalcDigi. */}
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-black tracking-tight text-white text-lg sm:text-xl">
                Calc<span className="text-emerald-400">Digi</span>
              </span>
              <span className="inline-block size-2 rounded-full bg-emerald-500 mb-0.5 animate-pulse"></span>
            </div>

            {/* Top Right: fx-82EX */}
            <div className="text-right">
              <span className="font-mono font-bold text-slate-300 text-sm sm:text-base tracking-wider">
                fx-82EX
              </span>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Authentic High-Resolution Dot-Matrix Screen (192x63) */}
          {/* ==================================================== */}
          <div className="mb-2 rounded-2xl bg-[#a0b29f] dark:bg-[#1a2c22] border-4 border-[#6c7d6b] dark:border-[#102018] p-3 sm:p-4 text-slate-900 dark:text-emerald-300 shadow-inner font-mono relative">
            {/* Screen Header Indicators */}
            <div className="flex items-center justify-between text-[10px] font-bold tracking-tight pb-1 mb-1 border-b border-black/10 dark:border-emerald-500/20 text-slate-800 dark:text-emerald-400/80">
              <div className="flex items-center gap-2">
                <span className={`px-1 rounded ${isShift ? "bg-amber-500 text-black font-extrabold" : "opacity-25"}`}>
                  S
                </span>
                <span className={`px-1 rounded ${isAlpha ? "bg-pink-500 text-white font-extrabold" : "opacity-25"}`}>
                  A
                </span>
                <span className={`px-1 rounded ${memory !== 0 ? "bg-emerald-800 text-white font-extrabold dark:bg-emerald-400 dark:text-black" : "opacity-25"}`}>
                  M
                </span>
                <span className="opacity-35">STO</span>
              </div>

              {/* Angle Mode Badge (Clickable) */}
              <button
                type="button"
                onClick={cycleAngleMode}
                className="px-1.5 py-0.5 rounded bg-black/15 dark:bg-emerald-950/80 font-bold hover:bg-black/25 transition-colors cursor-pointer"
                title="Toggle Degree / Radian"
              >
                {angleMode.toUpperCase()}
              </button>

              <div className="flex items-center gap-1.5">
                <span className="opacity-80 font-bold">Math▲▼</span>
                <span className="opacity-35">Norm1</span>
              </div>
            </div>

            {/* Line 1: Expression with Cursor */}
            <div className="min-h-[28px] text-sm sm:text-base font-semibold text-slate-900 dark:text-emerald-200 tracking-wider truncate flex items-center justify-start overflow-x-auto no-scrollbar">
              <span>{expr || "\u00A0"}</span>
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-slate-800 dark:bg-emerald-300 animate-pulse"></span>
            </div>

            {/* Line 2: Large Right-Aligned Result */}
            <div className="text-right text-3xl sm:text-4xl font-black text-slate-950 dark:text-emerald-300 tracking-tight overflow-x-auto no-scrollbar py-0.5">
              {display}
            </div>
          </div>

          {/* Under-screen CLASSWIZ subtitle in pink matching photo */}
          <div className="text-center mb-3">
            <span className="font-sans font-extrabold tracking-widest text-[11px] text-pink-500 uppercase">
              CLASSWIZ
            </span>
          </div>

          {/* ==================================================== */}
          {/* Top Control Bar: Round Metallic Buttons & D-PAD      */}
          {/* ==================================================== */}
          <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-center mb-3">
            {/* SHIFT (Round Button with Golden Text) */}
            <div className="col-span-2 flex flex-col items-center">
              <span className="text-[8px] font-black text-amber-400 mb-0.5">SHIFT</span>
              <button
                type="button"
                onClick={toggleShift}
                className={`size-9 sm:size-10 rounded-full text-xs font-bold transition-all shadow-md active:scale-90 cursor-pointer flex items-center justify-center border ${
                  isShift
                    ? "bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300"
                    : "bg-[#2d3540] hover:bg-[#394352] text-amber-300 border-slate-600/50"
                }`}
              >
                S
              </button>
            </div>

            {/* ALPHA (Round Button with Pink Text) */}
            <div className="col-span-2 flex flex-col items-center">
              <span className="text-[8px] font-black text-pink-400 mb-0.5">ALPHA</span>
              <button
                type="button"
                onClick={toggleAlpha}
                className={`size-9 sm:size-10 rounded-full text-xs font-bold transition-all shadow-md active:scale-90 cursor-pointer flex items-center justify-center border ${
                  isAlpha
                    ? "bg-pink-500 text-white border-pink-400 ring-2 ring-pink-400"
                    : "bg-[#2d3540] hover:bg-[#394352] text-pink-300 border-slate-600/50"
                }`}
              >
                A
              </button>
            </div>

            {/* Sculpted 4-Way D-Pad Wheel (fx-82EX cross-style wheel) */}
            <div className="col-span-4 flex justify-center">
              <div className="size-16 sm:size-18 rounded-full bg-gradient-to-tr from-[#161a20] to-[#2b333e] border-2 border-slate-600/80 p-0.5 flex flex-col items-center justify-between shadow-xl relative">
                <button
                  type="button"
                  onClick={() => navigateHistory("up")}
                  className="w-8 h-4 flex items-center justify-center text-slate-300 hover:text-white text-[10px] active:scale-90"
                  title="Previous calculation"
                >
                  ▲
                </button>
                <div className="w-full flex items-center justify-between px-1">
                  <button
                    type="button"
                    onClick={() => insertToken("(")}
                    className="w-4 h-5 flex items-center justify-center text-slate-300 hover:text-white text-[10px] active:scale-90"
                    title="Cursor left"
                  >
                    ◀
                  </button>
                  <div className="size-4 rounded-full bg-[#1b2027] border border-slate-600/50 shadow-inner"></div>
                  <button
                    type="button"
                    onClick={() => insertToken(")")}
                    className="w-4 h-5 flex items-center justify-center text-slate-300 hover:text-white text-[10px] active:scale-90"
                    title="Cursor right"
                  >
                    ▶
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => navigateHistory("down")}
                  className="w-8 h-4 flex items-center justify-center text-slate-300 hover:text-white text-[10px] active:scale-90"
                  title="Next calculation"
                >
                  ▼
                </button>
              </div>
            </div>

            {/* MENU / SETUP (Round Button) */}
            <div className="col-span-2 flex flex-col items-center">
              <span className="text-[8px] font-black text-amber-400 mb-0.5">SETUP</span>
              <button
                type="button"
                onClick={cycleAngleMode}
                className="size-9 sm:size-10 rounded-full bg-[#2d3540] hover:bg-[#394352] text-slate-200 border border-slate-600/50 text-[10px] font-bold transition-all shadow-md active:scale-90 cursor-pointer flex items-center justify-center"
                title="Toggle DEG / RAD mode"
              >
                MENU
              </button>
            </div>

            {/* ON (Round Button) */}
            <div className="col-span-2 flex flex-col items-center">
              <span className="text-[8px] font-black text-slate-400 mb-0.5">&nbsp;</span>
              <button
                type="button"
                onClick={handleAllClear}
                className="size-9 sm:size-10 rounded-full bg-[#2d3540] hover:bg-[#394352] text-emerald-400 border border-slate-600/50 text-[11px] font-black transition-all shadow-md active:scale-90 cursor-pointer flex items-center justify-center"
              >
                ON
              </button>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Function Keys Grid (6 Columns)                       */}
          {/* ==================================================== */}
          <div className="space-y-1.5 mb-3">
            {/* Row 2: OPTN, x², [gap], Abs, log_■(□) */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => insertFunc("abs")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">QR</span>
                <span>OPTN</span>
              </button>

              <button
                type="button"
                onClick={() => (isShift ? insertToken("^3") : insertToken("²"))}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">x³</span>
                <span>x²</span>
              </button>

              <button
                type="button"
                onClick={() => (isShift ? insertFunc("cbrt") : insertFunc("√"))}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">∛</span>
                <span>{isShift ? "∛" : "√■"}</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken("^")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">x√</span>
                <span>x^■</span>
              </button>

              <button
                type="button"
                onClick={() => insertFunc("abs")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">∠</span>
                <span>Abs</span>
              </button>

              <button
                type="button"
                onClick={() => (isShift ? insertToken("10^(") : insertFunc("log"))}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">10ˣ</span>
                <span>log</span>
              </button>
            </div>

            {/* Row 3: ■/□, √, x², x^■, log, ln */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => insertToken("÷")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">d/c</span>
                <span>■/□</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken("^(−1)")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">x!</span>
                <span>x⁻¹</span>
              </button>

              <button
                type="button"
                onClick={() => insertFunc(isShift ? "asin" : "sin")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">sin⁻¹</span>
                <span>{isShift ? "sin⁻¹" : "sin"}</span>
              </button>

              <button
                type="button"
                onClick={() => insertFunc(isShift ? "acos" : "cos")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">cos⁻¹</span>
                <span>{isShift ? "cos⁻¹" : "cos"}</span>
              </button>

              <button
                type="button"
                onClick={() => insertFunc(isShift ? "atan" : "tan")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">tan⁻¹</span>
                <span>{isShift ? "tan⁻¹" : "tan"}</span>
              </button>

              <button
                type="button"
                onClick={() => (isShift ? insertToken("e^(") : insertFunc("ln"))}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">eˣ</span>
                <span>{isShift ? "eˣ" : "ln"}</span>
              </button>
            </div>

            {/* Row 4: (-), °'", x⁻¹, STO, ENG, (, ), S<=>D, M+ */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => insertToken("−")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-pink-400 font-bold leading-none">A</span>
                <span>(−)</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken("°")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-pink-400 font-bold leading-none">B</span>
                <span>° ′ ″</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken("(")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">%</span>
                <span>(</span>
              </button>

              <button
                type="button"
                onClick={() => insertToken(")")}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-pink-400 font-bold leading-none">X</span>
                <span>)</span>
              </button>

              {/* S <=> D Key */}
              <button
                type="button"
                onClick={toggleStandardDecimal}
                className="h-8 sm:h-9 rounded-lg bg-[#1e4a38] hover:bg-[#255c46] text-emerald-300 border border-emerald-600/50 text-xs font-black flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer shadow-xs"
                title="Convert Standard fraction to Decimal (S<=>D)"
              >
                <span className="text-[7px] text-emerald-200 font-bold leading-none">a b/c</span>
                <span>S ⇔ D</span>
              </button>

              {/* M+ Key */}
              <button
                type="button"
                onClick={isShift ? handleMemorySub : handleMemoryAdd}
                className="h-8 sm:h-9 rounded-lg bg-[#272f3a] hover:bg-[#323c4a] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[7px] text-amber-400 font-bold leading-none">{isShift ? "M−" : "M−"}</span>
                <span>{isShift ? "M−" : "M+"}</span>
              </button>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Main Numeric Block: DEL & AC in Authentic fx-82EX   */}
          {/* Yellow/Amber as shown in photo                       */}
          {/* ==================================================== */}
          <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
            {/* Row 6: 7, 8, 9, DEL (Yellow), AC (Yellow) */}
            <button
              type="button"
              onClick={() => insertToken("7")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => insertToken("8")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => insertToken("9")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              9
            </button>

            {/* DEL Key in fx-82EX Yellow/Amber */}
            <button
              type="button"
              onClick={handleDelete}
              className="h-11 sm:h-12 rounded-xl bg-[#eab308] hover:bg-[#facc15] text-slate-950 font-black text-sm uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center border border-amber-500"
            >
              <span className="text-[7px] text-amber-900 font-bold leading-none">INS</span>
              <span>DEL</span>
            </button>

            {/* AC Key in fx-82EX Yellow/Amber */}
            <button
              type="button"
              onClick={handleAllClear}
              className="h-11 sm:h-12 rounded-xl bg-[#eab308] hover:bg-[#facc15] text-slate-950 font-black text-base uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center border border-amber-500"
            >
              <span className="text-[7px] text-amber-900 font-bold leading-none">OFF</span>
              <span>AC</span>
            </button>

            {/* Row 7: 4, 5, 6, ×, ÷ */}
            <button
              type="button"
              onClick={() => insertToken("4")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => insertToken("5")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => insertToken("6")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => insertToken("×")}
              className="h-11 sm:h-12 rounded-xl bg-[#374151] hover:bg-[#4b5563] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              ×
            </button>
            <button
              type="button"
              onClick={() => insertToken("÷")}
              className="h-11 sm:h-12 rounded-xl bg-[#374151] hover:bg-[#4b5563] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              ÷
            </button>

            {/* Row 8: 1, 2, 3, +, − */}
            <button
              type="button"
              onClick={() => insertToken("1")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => insertToken("2")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => insertToken("3")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => insertToken("+")}
              className="h-11 sm:h-12 rounded-xl bg-[#374151] hover:bg-[#4b5563] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => insertToken("−")}
              className="h-11 sm:h-12 rounded-xl bg-[#374151] hover:bg-[#4b5563] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              −
            </button>

            {/* Row 9: 0, ., ×10ˣ, Ans, = */}
            <button
              type="button"
              onClick={() => insertToken("0")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => insertToken(".")}
              className="h-11 sm:h-12 rounded-xl bg-[#2a323d] hover:bg-[#36404d] text-white font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              .
            </button>
            <button
              type="button"
              onClick={() => insertToken("×10^")}
              className="h-11 sm:h-12 rounded-xl bg-[#374151] hover:bg-[#4b5563] text-slate-100 font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center border border-slate-600/40"
            >
              <span className="text-[7px] text-amber-400 leading-none">π</span>
              <span>×10ˣ</span>
            </button>
            <button
              type="button"
              onClick={() => insertToken("Ans")}
              className="h-11 sm:h-12 rounded-xl bg-[#374151] hover:bg-[#4b5563] text-amber-300 font-extrabold text-sm sm:text-base shadow-sm active:scale-95 transition-all cursor-pointer border border-slate-600/40"
            >
              Ans
            </button>
            <button
              type="button"
              onClick={handleEquals}
              className="h-11 sm:h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-2xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center ring-2 ring-emerald-400/40"
            >
              =
            </button>
          </div>

          {/* Calculator Bottom Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAllClear}
                className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={() => setSoundEnabled((p) => !p)}
                className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
                  soundEnabled ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
                title="Toggle key click sounds"
              >
                <span>{soundEnabled ? "🔊 Sound ON" : "🔇 Sound OFF"}</span>
              </button>
            </div>
            <span className="font-mono text-slate-500 text-[10px]">
              MODE: {angleMode.toUpperCase()} | SHIFT: {isShift ? "ON" : "OFF"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: Standard Result Card (Baki Calculators Jesa)*/}
      {/* ======================================================== */}
      <div className="lg:col-span-5 space-y-6">
        <section
          id="scientific-calculator-result"
          aria-labelledby="scientific-calculator-result-h"
          className={cn(
            card,
            "scroll-mt-20 p-3.5 sm:p-6 w-full max-w-full overflow-hidden border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:border-emerald-900/60 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-sm"
          )}
        >
          {/* Header matching all other CalcDigi calculators */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h2
              id="scientific-calculator-result-h"
              className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 break-words flex-1 min-w-0"
            >
              Calculated Answer
            </h2>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">
              Live Result
            </span>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {/* Hero Big Value with Mode Badge */}
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <p className="break-words max-w-full text-3xl sm:text-4xl md:text-5xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white break-all [overflow-wrap:anywhere]">
                {display}
              </p>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold max-w-full break-words leading-tight bg-emerald-600 text-white">
                {angleMode.toUpperCase()} Mode
              </span>
            </div>

            {/* Formula Expression Subtitle */}
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 break-words font-mono">
              {expr ? `${expr} = ${display}` : "Ready for calculation"}
            </p>

            {/* Rows Table: Identical to Flagship Result Card */}
            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
              <dl className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Decimal Value</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    {evaluatedVal !== null ? formatResult(evaluatedVal) : display}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Fraction (S ⇔ D)</dt>
                  <dd className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                    {evaluatedVal !== null ? toFraction(evaluatedVal) || "Irrational" : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Scientific Notation</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    {evaluatedVal !== null && Number.isFinite(evaluatedVal)
                      ? evaluatedVal.toExponential(4)
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Angle Equivalent</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200 font-mono text-xs">
                    {evaluatedVal !== null && Number.isFinite(evaluatedVal)
                      ? angleMode === "deg"
                        ? `${formatResult(evaluatedVal)}° (${formatResult((evaluatedVal * Math.PI) / 180)} rad)`
                        : `${formatResult(evaluatedVal)} rad (${formatResult((evaluatedVal * 180) / Math.PI)}°)`
                      : "—"}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Stored Memory [M]</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    {memory}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">Last Answer [Ans]</dt>
                  <dd className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    {lastAns}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Quick Actions Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => insertToken("Ans")}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-100 transition-colors"
              >
                + Insert Ans
              </button>
              <button
                type="button"
                onClick={handleMemoryAdd}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 transition-colors"
              >
                Store M+
              </button>
            </div>
          </div>

          {/* Standard CalcDigi Result Actions (Reset, Share, Print, Ask AI) */}
          <ResultActions onReset={handleAllClear} title="Scientific Calculator" />
        </section>

        {/* Progressive Disclosure: Recent Calculations History */}
        <Disclosure
          title={`Recent Calculations History (${history.length})`}
          summary={history.length > 0 ? "Saved session tape" : "Empty"}
        >
          {history.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No previous operations in this session.</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
              <div className="flex justify-end gap-2 pb-1">
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="size-3" /> Clear History
                </button>
              </div>
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-mono"
                >
                  <div className="truncate pr-2">
                    <span className="text-[10px] text-slate-400 block font-sans">{item.time}</span>
                    <span className="text-slate-600 dark:text-slate-300">{item.expr}</span>
                    <span className="font-bold text-slate-900 dark:text-emerald-400 ml-1.5">= {item.result}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRecallHistory(item)}
                    className="px-2 py-1 rounded bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-slate-200 dark:border-slate-600 hover:border-emerald-500 transition-colors shrink-0 cursor-pointer"
                  >
                    Recall
                  </button>
                </div>
              ))}
            </div>
          )}
        </Disclosure>

        {/* Progressive Disclosure: Scientific Constants */}
        <Disclosure title="Scientific Constants Library (π, e, c, h, g, NA, k, R)">
          <div className="grid grid-cols-2 gap-2">
            {CONSTANTS.map((c) => (
              <button
                key={c.symbol}
                type="button"
                onClick={() => insertToken(c.val)}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200/60 dark:border-slate-800 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-black text-emerald-700 dark:text-emerald-400 text-xs">
                    {c.symbol}
                  </span>
                  {c.unit && <span className="text-[9px] text-slate-400 font-mono">{c.unit}</span>}
                </div>
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                  {c.name}
                </div>
              </button>
            ))}
          </div>
        </Disclosure>
      </div>
    </div>
  );
}
