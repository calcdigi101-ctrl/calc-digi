"use client";

import { useState, useEffect, useRef } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Share2,
  Trash2,
  Download,
  Info,
  Layers,
  Cpu,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { evaluate, formatResult, AngleMode, CalcError, canAppendDecimal } from "@/lib/expr";

// Fraction converter for Casio S<=>D
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
  if (k1 > 1000) return null; // Not cleanly rational
  return `${sign * h1}/${k1}`;
}

// Scientific Constants
const CONSTANTS = [
  { symbol: "π", name: "Pi (Archimedes)", val: "π", numeric: Math.PI, desc: "Ratio of circle circumference to diameter" },
  { symbol: "e", name: "Euler's Number", val: "e", numeric: Math.E, desc: "Base of natural logarithm" },
  { symbol: "c", name: "Speed of Light", val: "299792458", numeric: 299792458, unit: "m/s", desc: "Speed of light in vacuum" },
  { symbol: "h", name: "Planck Constant", val: "6.62607e-34", numeric: 6.62607015e-34, unit: "J·s", desc: "Quantum of electromagnetic action" },
  { symbol: "g", name: "Standard Gravity", val: "9.80665", numeric: 9.80665, unit: "m/s²", desc: "Nominal gravitational acceleration on Earth" },
  { symbol: "NA", name: "Avogadro Constant", val: "6.02214e23", numeric: 6.02214076e23, unit: "mol⁻¹", desc: "Constituent particles per mole" },
  { symbol: "k", name: "Boltzmann Constant", val: "1.38065e-23", numeric: 1.380649e-23, unit: "J/K", desc: "Particle kinetic energy to temperature" },
  { symbol: "R", name: "Molar Gas Constant", val: "8.31446", numeric: 8.314462618, unit: "J/(mol·K)", desc: "Molar ideal gas constant" },
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
  
  // Format state: 'dec' | 'frac' | 'sci' | 'eng'
  const [displayFormat, setDisplayFormat] = useState<"dec" | "frac" | "sci" | "eng">("dec");

  // History Tape
  const [history, setHistory] = useState<Array<{ expr: string; result: string; val: number; time: string }>>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  // UI feedback states
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [activeTab, setActiveTab] = useState<"history" | "constants" | "memory">("history");

  // Key sound effect toggle
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play subtle click sound if enabled
  const playClick = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
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
      // AudioContext not supported
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

  // Function buttons
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

  // Evaluate calculation
  const handleEquals = () => {
    playClick();
    if (!expr.trim()) return;

    try {
      // Auto-balance missing parentheses
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

  // Toggle Shift mode
  const toggleShift = () => {
    playClick();
    setIsShift((prev) => !prev);
    setIsAlpha(false);
  };

  // Toggle Alpha mode
  const toggleAlpha = () => {
    playClick();
    setIsAlpha((prev) => !prev);
    setIsShift(false);
  };

  // Toggle Angle Mode (DEG / RAD / GRA)
  const cycleAngleMode = () => {
    playClick();
    setAngleMode((prev) => (prev === "deg" ? "rad" : "deg"));
  };

  // Casio S<=>D button (Standard to Decimal / Fraction toggle)
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
      // Engineering: exponent multiple of 3
      const exp = Math.floor(Math.log10(Math.abs(evaluatedVal) || 1) / 3) * 3;
      const mantissa = evaluatedVal / Math.pow(10, exp);
      setDisplay(`${mantissa.toFixed(4)} × 10^${exp}`);
    } else {
      setDisplayFormat("dec");
      setDisplay(formatResult(evaluatedVal));
    }
  };

  // Memory Operations
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

  const handleMemoryClear = () => {
    playClick();
    setMemory(0);
  };

  const handleMemoryRecall = () => {
    playClick();
    insertToken(String(memory));
  };

  // Recall previous history expression
  const handleRecallHistory = (item: { expr: string; result: string; val: number }) => {
    playClick();
    setExpr(item.expr);
    setDisplay(item.result);
    setEvaluatedVal(item.val);
  };

  // History Navigation via D-Pad (Up / Down)
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

  // Copy Result
  const handleCopy = (textToCopy?: string) => {
    const text = textToCopy || display;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share URL
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  // Export history to text file
  const handleExportHistory = () => {
    if (history.length === 0) return;
    const content = history
      .map((h, i) => `[${h.time}] #${history.length - i}: ${h.expr} = ${h.result}`)
      .join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calcdigi-scientific-history-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Keyboard navigation support
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
      {/* LEFT COLUMN: Authentic Casio fx-991EX Hardware Chassis  */}
      {/* ======================================================== */}
      <div className="lg:col-span-7">
        <div className="rounded-[32px] border-2 border-slate-700/80 dark:border-slate-800 bg-gradient-to-b from-[#242b35] via-[#1a2028] to-[#12161c] p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none">
          {/* Subtle Casio Case Texture Accent Lines */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

          {/* Top Brand & Solar Bar */}
          <div className="flex items-center justify-between mb-3 px-1">
            {/* Casio Brand Title */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-sans font-black tracking-widest text-white text-base sm:text-lg">
                  CASIO
                </span>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                  fx-991EX
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-amber-400/90 font-serif italic tracking-wide">
                <span>CLASSWIZ</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 not-italic font-sans font-semibold">NATURAL-V.P.A.M.</span>
              </div>
            </div>

            {/* Solar Cell Panel (Casio Dual Power) */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end text-[8px] font-bold text-slate-400 tracking-tighter uppercase leading-none">
                <span>TWO WAY</span>
                <span>POWER</span>
              </div>
              <div className="w-20 sm:w-24 h-6 rounded-md bg-gradient-to-b from-[#2d1b0c] to-[#1a0e05] border border-amber-900/80 flex items-center justify-evenly p-0.5 shadow-inner">
                <div className="w-1/4 h-full border-r border-amber-700/40"></div>
                <div className="w-1/4 h-full border-r border-amber-700/40"></div>
                <div className="w-1/4 h-full border-r border-amber-700/40"></div>
                <div className="w-1/4 h-full"></div>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Casio High-Resolution Dot-Matrix LCD Screen          */}
          {/* ==================================================== */}
          <div className="mb-4 rounded-2xl bg-[#98aa96] dark:bg-[#1a2b22] border-4 border-[#697a67] dark:border-[#0f1f17] p-3 sm:p-4 text-slate-900 dark:text-emerald-300 shadow-inner relative font-mono">
            {/* LCD Status Flags Bar */}
            <div className="flex items-center justify-between text-[10px] font-bold tracking-tight pb-1 mb-1 border-b border-black/10 dark:border-emerald-500/20 text-slate-800 dark:text-emerald-400/80">
              <div className="flex items-center gap-2">
                <span className={`px-1 rounded ${isShift ? "bg-amber-500 text-black font-extrabold" : "opacity-30"}`}>
                  S
                </span>
                <span className={`px-1 rounded ${isAlpha ? "bg-rose-500 text-white font-extrabold" : "opacity-30"}`}>
                  A
                </span>
                <span className={`px-1 rounded ${memory !== 0 ? "bg-emerald-800 text-white font-extrabold dark:bg-emerald-400 dark:text-black" : "opacity-30"}`}>
                  M
                </span>
                <span className="opacity-40">STO</span>
              </div>

              {/* Angle Mode Badge */}
              <button
                type="button"
                onClick={cycleAngleMode}
                className="px-1.5 py-0.5 rounded bg-black/15 dark:bg-emerald-950/80 font-bold hover:bg-black/25 transition-colors cursor-pointer"
                title="Click to toggle Degree / Radian"
              >
                {angleMode.toUpperCase()}
              </button>

              <div className="flex items-center gap-2">
                <span className="opacity-90 font-bold">Math▲▼</span>
                <span className="opacity-40">STAT</span>
              </div>
            </div>

            {/* Line 1: Natural Expression Input with Blinking Cursor */}
            <div className="min-h-[28px] text-sm sm:text-base font-semibold text-slate-900 dark:text-emerald-200 tracking-wider truncate flex items-center justify-start overflow-x-auto no-scrollbar">
              <span>{expr || "\u00A0"}</span>
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-slate-800 dark:bg-emerald-300 animate-pulse"></span>
            </div>

            {/* Line 2: Big Bold Right-Aligned Result */}
            <div className="text-right text-3xl sm:text-4xl font-black text-slate-950 dark:text-emerald-300 tracking-tight overflow-x-auto no-scrollbar py-0.5">
              {display}
            </div>
          </div>

          {/* ==================================================== */}
          {/* Top Control Section: SHIFT, ALPHA, D-PAD, MODE, ON   */}
          {/* ==================================================== */}
          <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-center mb-3">
            {/* Shift Key */}
            <div className="col-span-2">
              <button
                type="button"
                onClick={toggleShift}
                className={`w-full h-9 sm:h-10 rounded-lg text-xs font-black uppercase transition-all shadow-md active:scale-95 cursor-pointer flex flex-col items-center justify-center ${
                  isShift
                    ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300"
                    : "bg-[#4a3b1a] hover:bg-[#5c4a22] text-amber-300 border border-amber-600/40"
                }`}
              >
                <span className="text-[9px] text-amber-200 leading-none">S</span>
                <span>SHIFT</span>
              </button>
            </div>

            {/* Alpha Key */}
            <div className="col-span-2">
              <button
                type="button"
                onClick={toggleAlpha}
                className={`w-full h-9 sm:h-10 rounded-lg text-xs font-black uppercase transition-all shadow-md active:scale-95 cursor-pointer flex flex-col items-center justify-center ${
                  isAlpha
                    ? "bg-rose-500 text-white ring-2 ring-rose-400"
                    : "bg-[#4a1f28] hover:bg-[#5e2733] text-rose-300 border border-rose-600/40"
                }`}
              >
                <span className="text-[9px] text-rose-200 leading-none">A</span>
                <span>ALPHA</span>
              </button>
            </div>

            {/* Casio Iconic Circular REPLAY D-Pad (4-Way Wheel) */}
            <div className="col-span-4 flex justify-center">
              <div className="w-20 sm:w-24 h-11 sm:h-12 rounded-full bg-gradient-to-tr from-[#2a323d] to-[#3a4452] border-2 border-slate-600/80 p-0.5 flex items-center justify-between shadow-md relative">
                <button
                  type="button"
                  onClick={() => insertToken("(")}
                  className="w-5 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-l-full text-[10px] active:scale-90"
                  title="Cursor Left"
                >
                  ◀
                </button>
                <div className="flex flex-col items-center justify-between h-full py-0.5">
                  <button
                    type="button"
                    onClick={() => navigateHistory("up")}
                    className="w-8 h-4 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-t-full text-[9px] active:scale-90"
                    title="Previous Calculation"
                  >
                    ▲
                  </button>
                  <span className="text-[7px] font-black tracking-widest text-slate-400 uppercase">REPLAY</span>
                  <button
                    type="button"
                    onClick={() => navigateHistory("down")}
                    className="w-8 h-4 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-b-full text-[9px] active:scale-90"
                    title="Next Calculation"
                  >
                    ▼
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => insertToken(")")}
                  className="w-5 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-r-full text-[10px] active:scale-90"
                  title="Cursor Right"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Mode / Setup Key */}
            <div className="col-span-2">
              <button
                type="button"
                onClick={cycleAngleMode}
                className="w-full h-9 sm:h-10 rounded-lg bg-[#2d3748] hover:bg-[#3b4759] text-slate-200 border border-slate-600/40 text-[11px] font-bold transition-all shadow-md active:scale-95 flex flex-col items-center justify-center cursor-pointer"
              >
                <span className="text-[8px] text-amber-400 leading-none">SETUP</span>
                <span>MODE</span>
              </button>
            </div>

            {/* ON Key */}
            <div className="col-span-2">
              <button
                type="button"
                onClick={handleAllClear}
                className="w-full h-9 sm:h-10 rounded-lg bg-[#2d3748] hover:bg-[#3b4759] text-emerald-400 border border-slate-600/40 text-[11px] font-black transition-all shadow-md active:scale-95 flex items-center justify-center cursor-pointer"
              >
                ON
              </button>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Middle Scientific Functions Grid (6 Columns)         */}
          {/* ==================================================== */}
          <div className="space-y-1.5 mb-3">
            {/* Row 1: x⁻¹ / x!, √ / ∛, x² / x³, ^ / x√y, log / 10ˣ, ln / eˣ */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {/* x⁻¹ / x! */}
              <button
                type="button"
                onClick={() => (isShift ? insertToken("!") : insertToken("^(−1)"))}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">{isShift ? "x!" : "x!"}</span>
                <span>{isShift ? "x!" : "x⁻¹"}</span>
              </button>

              {/* √ / ∛ */}
              <button
                type="button"
                onClick={() => (isShift ? insertFunc("cbrt") : insertFunc("√"))}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">∛</span>
                <span>{isShift ? "∛" : "√"}</span>
              </button>

              {/* x² / x³ */}
              <button
                type="button"
                onClick={() => (isShift ? insertToken("^3") : insertToken("²"))}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">x³</span>
                <span>{isShift ? "x³" : "x²"}</span>
              </button>

              {/* ^ (power) */}
              <button
                type="button"
                onClick={() => insertToken("^")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">x√</span>
                <span>xʸ</span>
              </button>

              {/* log / 10ˣ */}
              <button
                type="button"
                onClick={() => (isShift ? insertToken("10^(") : insertFunc("log"))}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">10ˣ</span>
                <span>{isShift ? "10ˣ" : "log"}</span>
              </button>

              {/* ln / eˣ */}
              <button
                type="button"
                onClick={() => (isShift ? insertToken("e^(") : insertFunc("ln"))}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">eˣ</span>
                <span>{isShift ? "eˣ" : "ln"}</span>
              </button>
            </div>

            {/* Row 2: (-), °'", hyp, sin / sin⁻¹, cos / cos⁻¹, tan / tan⁻¹ */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {/* (-) Negate */}
              <button
                type="button"
                onClick={() => insertToken("−")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">A</span>
                <span>(−)</span>
              </button>

              {/* ° ' " Degrees */}
              <button
                type="button"
                onClick={() => insertToken("°")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">←</span>
                <span>° ′ ″</span>
              </button>

              {/* hyp / Abs */}
              <button
                type="button"
                onClick={() => insertFunc("abs")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">Abs</span>
                <span>hyp</span>
              </button>

              {/* sin / sin⁻¹ */}
              <button
                type="button"
                onClick={() => insertFunc(isShift ? "asin" : "sin")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">sin⁻¹</span>
                <span>{isShift ? "sin⁻¹" : "sin"}</span>
              </button>

              {/* cos / cos⁻¹ */}
              <button
                type="button"
                onClick={() => insertFunc(isShift ? "acos" : "cos")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">cos⁻¹</span>
                <span>{isShift ? "cos⁻¹" : "cos"}</span>
              </button>

              {/* tan / tan⁻¹ */}
              <button
                type="button"
                onClick={() => insertFunc(isShift ? "atan" : "tan")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">tan⁻¹</span>
                <span>{isShift ? "tan⁻¹" : "tan"}</span>
              </button>
            </div>

            {/* Row 3: STO / RCL, ENG, (, ), S<=>D, M+ / M- */}
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {/* STO / RCL */}
              <button
                type="button"
                onClick={handleMemoryRecall}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">STO</span>
                <span>RCL</span>
              </button>

              {/* ENG */}
              <button
                type="button"
                onClick={() => insertToken("e")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">←</span>
                <span>ENG</span>
              </button>

              {/* ( */}
              <button
                type="button"
                onClick={() => insertToken("(")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">%</span>
                <span>(</span>
              </button>

              {/* ) */}
              <button
                type="button"
                onClick={() => insertToken(")")}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">,</span>
                <span>)</span>
              </button>

              {/* S <=> D Casio Signature Fraction/Decimal toggle */}
              <button
                type="button"
                onClick={toggleStandardDecimal}
                className="h-9 sm:h-10 rounded-lg bg-[#1e4a38] hover:bg-[#255c46] text-emerald-300 border border-emerald-600/50 text-xs font-black flex flex-col items-center justify-center active:scale-95 transition-all cursor-pointer shadow-xs"
                title="Toggle Standard Fraction / Decimal representation (S<=>D)"
              >
                <span className="text-[8px] text-emerald-200 font-bold leading-none">a b/c</span>
                <span>S ⇔ D</span>
              </button>

              {/* M+ / M- */}
              <button
                type="button"
                onClick={isShift ? handleMemorySub : handleMemoryAdd}
                className="h-9 sm:h-10 rounded-lg bg-[#27303c] hover:bg-[#333e4d] text-slate-200 border border-slate-600/30 text-xs font-semibold flex flex-col items-center justify-center active:scale-95 transition-all"
              >
                <span className="text-[8px] text-amber-400 font-bold leading-none">{isShift ? "M−" : "M−"}</span>
                <span>{isShift ? "M−" : "M+"}</span>
              </button>
            </div>
          </div>

          {/* ==================================================== */}
          {/* Main Numeric & Arithmetic Block (5 Columns)          */}
          {/* ==================================================== */}
          <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
            {/* Row 1: 7, 8, 9, DEL, AC */}
            <button
              type="button"
              onClick={() => insertToken("7")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              7
            </button>
            <button
              type="button"
              onClick={() => insertToken("8")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              8
            </button>
            <button
              type="button"
              onClick={() => insertToken("9")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              9
            </button>
            {/* DEL Key */}
            <button
              type="button"
              onClick={handleDelete}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-slate-100 font-black text-sm uppercase tracking-wider shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              DEL
            </button>
            {/* AC Key (Signature Casio Red/Orange) */}
            <button
              type="button"
              onClick={handleAllClear}
              className="h-12 sm:h-13 rounded-xl bg-[#dc2626] hover:bg-[#ef4444] text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer"
            >
              AC
            </button>

            {/* Row 2: 4, 5, 6, ×, ÷ */}
            <button
              type="button"
              onClick={() => insertToken("4")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              4
            </button>
            <button
              type="button"
              onClick={() => insertToken("5")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              5
            </button>
            <button
              type="button"
              onClick={() => insertToken("6")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              6
            </button>
            <button
              type="button"
              onClick={() => insertToken("×")}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              ×
            </button>
            <button
              type="button"
              onClick={() => insertToken("÷")}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              ÷
            </button>

            {/* Row 3: 1, 2, 3, +, − */}
            <button
              type="button"
              onClick={() => insertToken("1")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              1
            </button>
            <button
              type="button"
              onClick={() => insertToken("2")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              2
            </button>
            <button
              type="button"
              onClick={() => insertToken("3")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              3
            </button>
            <button
              type="button"
              onClick={() => insertToken("+")}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => insertToken("−")}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-slate-100 font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              −
            </button>

            {/* Row 4: 0, ., ×10ˣ, Ans, = */}
            <button
              type="button"
              onClick={() => insertToken("0")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-lg sm:text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => insertToken(".")}
              className="h-12 sm:h-13 rounded-xl bg-slate-100 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-extrabold text-xl shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              .
            </button>
            {/* ×10ˣ EXP Key */}
            <button
              type="button"
              onClick={() => insertToken("×10^")}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-slate-100 font-bold text-xs sm:text-sm shadow-sm active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center"
            >
              <span className="text-[8px] text-amber-400 leading-none">π</span>
              <span>×10ˣ</span>
            </button>
            {/* Ans Key */}
            <button
              type="button"
              onClick={() => insertToken("Ans")}
              className="h-12 sm:h-13 rounded-xl bg-[#2e3b4e] hover:bg-[#3b4c64] text-amber-300 font-extrabold text-sm sm:text-base shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              Ans
            </button>
            {/* Equals Key */}
            <button
              type="button"
              onClick={handleEquals}
              className="h-12 sm:h-13 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-2xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center ring-2 ring-emerald-400/30"
            >
              =
            </button>
          </div>

          {/* Calculator Bottom Info Footer */}
          <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
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
              MODE: {angleMode.toUpperCase()} | SHIFT: {isShift ? "ACTIVE" : "OFF"}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: Calculation Studio & Workspace Panel       */}
      {/* ======================================================== */}
      <div className="lg:col-span-5 space-y-4">
        {/* Primary Result & Multi-Format Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Calculation Result
              </span>
            </div>

            {/* Copy / Share Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy()}
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

          {/* Current Active Expression */}
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-1 truncate">
            {expr ? `${expr} =` : "Waiting for input..."}
          </div>

          {/* Large Main Result */}
          <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight break-all font-mono py-1">
            {display}
          </div>

          {/* Multi-Representation Breakdown Pill Tags */}
          {evaluatedVal !== null && Number.isFinite(evaluatedVal) && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Alternative Representations
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Standard Decimal */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Decimal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                    {formatResult(evaluatedVal)}
                  </span>
                </div>

                {/* Fraction Form */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Fraction (a/b)</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 truncate block">
                    {toFraction(evaluatedVal) || "Irrational"}
                  </span>
                </div>

                {/* Scientific Notation */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Scientific</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                    {evaluatedVal.toExponential(4)}
                  </span>
                </div>

                {/* Angle Representation */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Angle Equivalent</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                    {angleMode === "deg"
                      ? `${formatResult(evaluatedVal)}° = ${formatResult((evaluatedVal * Math.PI) / 180)} rad`
                      : `${formatResult(evaluatedVal)} rad = ${formatResult((evaluatedVal * 180) / Math.PI)}°`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => insertToken("Ans")}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-100 transition-colors"
            >
              + Use in Next Calculation
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

        {/* Workspace Multi-Tab Panel: History / Constants / Memory */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          {/* Tab Navigation */}
          <div className="flex items-center gap-1 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "history"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>History ({history.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("constants")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "constants"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Constants</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("memory")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === "memory"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Memory ({memory !== 0 ? "M" : "0"})</span>
            </button>
          </div>

          {/* TAB 1: HISTORY TAPE */}
          {activeTab === "history" && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Calculation Tape
                </span>
                {history.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportHistory}
                      className="text-[11px] text-slate-500 hover:text-emerald-600 flex items-center gap-1"
                      title="Download history log"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHistory([])}
                      className="text-[11px] text-rose-500 hover:text-rose-600 flex items-center gap-1"
                      title="Clear history"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                )}
              </div>

              {history.length === 0 ? (
                <div className="py-8 text-center text-slate-400 dark:text-slate-500">
                  <p className="text-xs italic">No previous operations recorded yet.</p>
                  <p className="text-[11px] mt-1 text-slate-400">
                    Calculations evaluated with <span className="font-bold text-emerald-600">=</span> will be logged here.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar pr-1">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 border border-slate-200/60 dark:border-slate-800 transition-all flex items-center justify-between font-mono text-xs"
                    >
                      <div className="space-y-0.5 truncate pr-2">
                        <div className="text-[10px] text-slate-400 flex items-center gap-2">
                          <span>#{history.length - idx}</span>
                          <span>{item.time}</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-400 truncate">
                          {item.expr}
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-emerald-300">
                          = {item.result}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRecallHistory(item)}
                          className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-slate-200 dark:border-slate-600 hover:border-emerald-500 transition-colors shadow-2xs cursor-pointer"
                          title="Load into calculator"
                        >
                          Recall
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(item.result)}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          title="Copy answer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CONSTANTS LIBRARY */}
          {activeTab === "constants" && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Click any constant to insert into calculator:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto no-scrollbar">
                {CONSTANTS.map((c) => (
                  <button
                    key={c.symbol}
                    type="button"
                    onClick={() => insertToken(c.val)}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 border border-slate-200/60 dark:border-slate-800 text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif font-black text-sm text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        {c.symbol}
                      </span>
                      {c.unit && (
                        <span className="text-[9px] text-slate-400 font-mono">{c.unit}</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {c.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {c.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MEMORY & REGISTERS INSPECTOR */}
          {activeTab === "memory" && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Independent Memory Register [M]
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-3">
                  {memory}
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={handleMemoryRecall}
                    className="py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                  >
                    MR (Recall)
                  </button>
                  <button
                    type="button"
                    onClick={handleMemoryAdd}
                    className="py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition-colors"
                  >
                    M+ (Add)
                  </button>
                  <button
                    type="button"
                    onClick={handleMemorySub}
                    className="py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 transition-colors"
                  >
                    M− (Sub)
                  </button>
                  <button
                    type="button"
                    onClick={handleMemoryClear}
                    className="py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 hover:bg-rose-200 transition-colors"
                  >
                    MC (Clear)
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Last Answer Variable [Ans]
                </div>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mb-2">
                  {lastAns}
                </div>
                <button
                  type="button"
                  onClick={() => insertToken("Ans")}
                  className="w-full py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-slate-300 transition-colors"
                >
                  Insert Ans into Expression
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
