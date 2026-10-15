"use client";

import { useState } from "react";
import { Check, ShieldCheck, Zap, Sparkles, Home, Scale, Calculator as CalcIcon } from "lucide-react";
import { CategoryDirectory } from "./CategoryDirectory";

/**
 * 100% Cloned Flagship HomeHero:
 * - Headline & Subtitle matching serif typography
 * - Search bar with green (?) icon & trending tags
 * - Interactive Floating Calculator Card with 1, 2, 3, ., Basic & Scientific modes
 * - Real-time Mortgage & BMI interactive preview tabs
 * - Credibility Trust Strip
 * - CategoryDirectory with integrated Ask CalcDigi AI card
 */
export function HomeHero() {
  // Tabs: 'calc' | 'mortgage' | 'bmi'
  const [activeTab, setActiveTab] = useState<"calc" | "mortgage" | "bmi">("calc");

  // Calculator State
  const [currentVal, setCurrentVal] = useState("2026.42");
  const [previousVal, setPreviousVal] = useState("");
  const [currentOp, setCurrentOp] = useState<string | null>(null);
  const [historyText, setHistoryText] = useState("BASIC MODE");
  const [isSciMode, setIsSciMode] = useState(false);

  // Mortgage Tab State
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(90000);

  // BMI Tab State
  const [bmiHeight, setBmiHeight] = useState(175);
  const [bmiWeight, setBmiWeight] = useState(70);

  // Calculator Methods
  function appendNum(num: string) {
    if (currentVal === "2026.42" || currentVal === "0") {
      setCurrentVal(num);
    } else {
      setCurrentVal((prev) => prev + num);
    }
  }

  function appendDot() {
    if (currentVal === "2026.42") {
      setCurrentVal("0.");
      return;
    }
    if (!currentVal.includes(".")) {
      setCurrentVal((prev) => prev + ".");
    }
  }

  function setOp(op: string) {
    setCurrentOp(op);
    setPreviousVal(currentVal);
    setCurrentVal("0");
    setHistoryText(`${currentVal} ${op}`);
  }

  function clearCalc() {
    setCurrentVal("0");
    setPreviousVal("");
    setCurrentOp(null);
    setHistoryText(isSciMode ? "SCIENTIFIC MODE" : "BASIC MODE");
  }

  function toggleSign() {
    if (currentVal !== "0") {
      setCurrentVal((prev) => (parseFloat(prev) * -1).toString());
    }
  }

  function calcPercent() {
    setCurrentVal((prev) => (parseFloat(prev) / 100).toString());
  }

  function compute() {
    if (!currentOp || previousVal === "") return;
    const p = parseFloat(previousVal);
    const c = parseFloat(currentVal);
    let res: number | string = 0;
    switch (currentOp) {
      case "+": res = p + c; break;
      case "-": res = p - c; break;
      case "*": res = p * c; break;
      case "/": res = c !== 0 ? p / c : "Error"; break;
    }
    setHistoryText(`${previousVal} ${currentOp} ${currentVal} =`);
    setCurrentVal(typeof res === "number" ? (Math.round(res * 100000) / 100000).toString() : res);
    setCurrentOp(null);
    setPreviousVal("");
  }

  function calcSci(fn: "sin" | "cos" | "tan" | "sqrt") {
    const v = parseFloat(currentVal);
    let r = 0;
    if (fn === "sin") r = Math.sin((v * Math.PI) / 180);
    if (fn === "cos") r = Math.cos((v * Math.PI) / 180);
    if (fn === "tan") r = Math.tan((v * Math.PI) / 180);
    if (fn === "sqrt") r = Math.sqrt(v);
    setCurrentVal((Math.round(r * 100000) / 100000).toString());
  }

  // Mortgage calculations
  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyRate = 0.065 / 12;
  const numPayments = 360;
  const monthlyPayment =
    loanAmount > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;

  // BMI calculation
  const bmiScore = bmiWeight / Math.pow(bmiHeight / 100, 2);
  const bmiCategory =
    bmiScore < 18.5
      ? "Underweight"
      : bmiScore < 25
      ? "Healthy Weight"
      : bmiScore < 30
      ? "Overweight"
      : "Obesity";

  return (
    <section className="relative pt-10 pb-16 lg:pt-14 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f4fbf7]/60 via-[#FCFDFD] to-white dark:from-[#08101e] dark:via-[#090e1a] dark:to-[#070b12] border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Copy, Badge, Search & Trending Tags */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#e6f7ed] dark:bg-emerald-950/60 border border-[#a7f3d0] dark:border-emerald-800/80 text-[#059669] dark:text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="tracking-wider uppercase font-bold text-[11px]">100% AD-FREE • 341+ TOOLS</span>
            </div>

            {/* Serif Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] leading-[1.08] text-[#111827] dark:text-white tracking-tight">
              The smarter,<br />
              cleaner way to<br />
              calculate anything
            </h1>

            {/* Subtitle */}
            <p className="text-[#6b7280] dark:text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              Professional-grade tools for finance, health, math, and everyday life. No ads, no tracking, just precision.
            </p>

            {/* Search Bar with Green (?) icon */}
            <div className="max-w-xl">
              <a 
                href="/calculators"
                className="relative flex items-center bg-white dark:bg-slate-900 rounded-full border border-slate-200/90 dark:border-slate-800 p-2 sm:p-2.5 shadow-sm hover:border-emerald-400 focus-within:border-emerald-500 transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <div className="pl-3.5 pr-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#10b981] flex items-center justify-center font-bold text-xs border border-emerald-200/60 dark:border-emerald-800">
                    ?
                  </div>
                </div>
                <span className="text-sm sm:text-[15px] font-medium pr-3 truncate">
                  Try &quot;Mortgage with 20% down&quot; or &quot;BMI for 6ft male&quot;
                </span>
              </a>
            </div>

            {/* Trending Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#9ca3af] dark:text-slate-500 font-bold uppercase tracking-wider text-[11px] mr-1">
                TRENDING:
              </span>
              <button 
                onClick={() => setActiveTab("mortgage")} 
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-xs"
              >
                Mortgage
              </button>
              <button 
                onClick={() => {
                  setActiveTab("calc");
                  setCurrentVal("37.50");
                  setHistoryText("15% of 250 =");
                }} 
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-xs"
              >
                Percentage
              </button>
              <button 
                onClick={() => setActiveTab("bmi")} 
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-xs"
              >
                BMI
              </button>
              <button 
                onClick={() => {
                  setActiveTab("calc");
                  setIsSciMode(true);
                  setHistoryText("SCIENTIFIC MODE");
                }} 
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-xs"
              >
                Scientific
              </button>
            </div>

          </div>

          {/* Right Column: The Hero Floating Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl p-6 sm:p-7 relative transition-colors">
              
              {/* Internal Tab Bar: [⚡ Calculator] [🏠 Mortgage] [⚖️ BMI] */}
              <div className="flex items-center justify-around pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold">
                <button 
                  onClick={() => setActiveTab("calc")} 
                  className={`flex items-center gap-1.5 py-1 px-3 rounded-lg transition-all ${
                    activeTab === "calc" 
                      ? "text-[#059669] dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/40" 
                      : "text-[#6b7280] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Calculator</span>
                </button>
                <button 
                  onClick={() => setActiveTab("mortgage")} 
                  className={`flex items-center gap-1.5 py-1 px-3 rounded-lg transition-all ${
                    activeTab === "mortgage" 
                      ? "text-[#059669] dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/40" 
                      : "text-[#6b7280] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Mortgage</span>
                </button>
                <button 
                  onClick={() => setActiveTab("bmi")} 
                  className={`flex items-center gap-1.5 py-1 px-3 rounded-lg transition-all ${
                    activeTab === "bmi" 
                      ? "text-[#059669] dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/40" 
                      : "text-[#6b7280] hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>BMI</span>
                </button>
              </div>

              {/* VIEW 1: HERO CALCULATOR */}
              {activeTab === "calc" && (
                <div>
                  {/* Screen */}
                  <div className="bg-[#0d1527] rounded-2xl p-4 sm:p-5 mb-3.5 text-right shadow-inner">
                    <div className="text-[10px] font-mono text-[#475569] min-h-[16px] truncate tracking-wider">
                      {historyText}
                    </div>
                    <div className="text-4xl sm:text-5xl font-mono font-bold tracking-tight text-[#10b981] tabular-nums truncate mt-1">
                      {currentVal}
                    </div>
                  </div>

                  {/* Mode Switcher */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <button 
                      onClick={() => {
                        setIsSciMode(false);
                        setHistoryText("BASIC MODE");
                      }} 
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        !isSciMode 
                          ? "bg-[#046a38] text-white shadow-xs" 
                          : "bg-[#f1f5f9] dark:bg-slate-800 text-[#64748b] dark:text-slate-300"
                      }`}
                    >
                      BASIC
                    </button>
                    <button 
                      onClick={() => {
                        setIsSciMode(true);
                        setHistoryText("SCIENTIFIC MODE");
                      }} 
                      className={`py-2 text-xs font-bold rounded-lg transition-all ${
                        isSciMode 
                          ? "bg-[#046a38] text-white shadow-xs" 
                          : "bg-[#f1f5f9] dark:bg-slate-800 text-[#64748b] dark:text-slate-300"
                      }`}
                    >
                      SCIENTIFIC
                    </button>
                  </div>

                  {/* Scientific Drawer */}
                  {isSciMode && (
                    <div className="grid grid-cols-4 gap-1.5 mb-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <button onClick={() => calcSci("sin")} className="py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300">sin</button>
                      <button onClick={() => calcSci("cos")} className="py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300">cos</button>
                      <button onClick={() => calcSci("tan")} className="py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300">tan</button>
                      <button onClick={() => calcSci("sqrt")} className="py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300">√x</button>
                    </div>
                  )}

                  {/* 5-Row Keypad Grid (With 1, 2, 3, 0, ., and operations) */}
                  <div className="grid grid-cols-4 gap-2">
                    {/* Row 1 */}
                    <button onClick={clearCalc} className="py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base bg-[#f8fafc] dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80">AC</button>
                    <button onClick={toggleSign} className="py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base bg-[#f8fafc] dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80">+/-</button>
                    <button onClick={calcPercent} className="py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base bg-[#f8fafc] dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80">%</button>
                    <button onClick={() => setOp("/")} className="py-2.5 sm:py-3 rounded-xl font-bold text-lg bg-[#d4f5e4] dark:bg-emerald-950/70 text-[#046a38] dark:text-emerald-300 hover:bg-[#bbf0d4]">/</button>

                    {/* Row 2 */}
                    <button onClick={() => appendNum("7")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">7</button>
                    <button onClick={() => appendNum("8")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">8</button>
                    <button onClick={() => appendNum("9")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">9</button>
                    <button onClick={() => setOp("*")} className="py-2.5 sm:py-3 rounded-xl font-bold text-lg bg-[#d4f5e4] dark:bg-emerald-950/70 text-[#046a38] dark:text-emerald-300 hover:bg-[#bbf0d4]">×</button>

                    {/* Row 3 */}
                    <button onClick={() => appendNum("4")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">4</button>
                    <button onClick={() => appendNum("5")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">5</button>
                    <button onClick={() => appendNum("6")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">6</button>
                    <button onClick={() => setOp("-")} className="py-2.5 sm:py-3 rounded-xl font-bold text-lg bg-[#d4f5e4] dark:bg-emerald-950/70 text-[#046a38] dark:text-emerald-300 hover:bg-[#bbf0d4]">−</button>

                    {/* Row 4: 1, 2, 3, + */}
                    <button onClick={() => appendNum("1")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">1</button>
                    <button onClick={() => appendNum("2")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">2</button>
                    <button onClick={() => appendNum("3")} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">3</button>
                    <button onClick={() => setOp("+")} className="py-2.5 sm:py-3 rounded-xl font-bold text-lg bg-[#d4f5e4] dark:bg-emerald-950/70 text-[#046a38] dark:text-emerald-300 hover:bg-[#bbf0d4]">+</button>

                    {/* Row 5: 0, ., = */}
                    <button onClick={() => appendNum("0")} className="col-span-2 py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">0</button>
                    <button onClick={appendDot} className="py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg bg-white dark:bg-slate-800/90 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-white hover:bg-slate-50 shadow-xs">.</button>
                    <button onClick={compute} className="py-2.5 sm:py-3 rounded-xl font-bold text-2xl bg-[#10b981] hover:bg-[#059669] text-white shadow-md shadow-emerald-500/25">=</button>
                  </div>
                </div>
              )}

              {/* VIEW 2: MORTGAGE TAB */}
              {activeTab === "mortgage" && (
                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Home Price</span>
                      <span className="font-mono text-emerald-600 font-bold">${homePrice.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100000" 
                      max="1500000" 
                      step="10000" 
                      value={homePrice} 
                      onChange={(e) => setHomePrice(Number(e.target.value))} 
                      className="w-full accent-emerald-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Down Payment</span>
                      <span className="font-mono text-emerald-600 font-bold">
                        ${downPayment.toLocaleString()} ({Math.round((downPayment / homePrice) * 100)}%)
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="10000" 
                      max={homePrice} 
                      step="5000" 
                      value={downPayment} 
                      onChange={(e) => setDownPayment(Number(e.target.value))} 
                      className="w-full accent-emerald-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Estimated Monthly Payment
                    </span>
                    <span className="text-3xl font-mono font-bold text-slate-900 dark:text-white">
                      ${monthlyPayment.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Based on 30-yr fixed @ 6.5% interest
                    </span>
                  </div>

                  <a 
                    href="/calculators/finance/mortgage-calculator" 
                    className="block text-center py-2.5 rounded-xl bg-[#046a38] text-white text-xs font-semibold hover:bg-[#03542c] transition-colors"
                  >
                    Open Full Mortgage Calculator →
                  </a>
                </div>
              )}

              {/* VIEW 3: BMI TAB */}
              {activeTab === "bmi" && (
                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Height</span>
                      <span className="font-mono text-emerald-600 font-bold">{bmiHeight} cm</span>
                    </div>
                    <input 
                      type="range" 
                      min="120" 
                      max="220" 
                      step="1" 
                      value={bmiHeight} 
                      onChange={(e) => setBmiHeight(Number(e.target.value))} 
                      className="w-full accent-emerald-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Weight</span>
                      <span className="font-mono text-emerald-600 font-bold">{bmiWeight} kg</span>
                    </div>
                    <input 
                      type="range" 
                      min="40" 
                      max="160" 
                      step="1" 
                      value={bmiWeight} 
                      onChange={(e) => setBmiWeight(Number(e.target.value))} 
                      className="w-full accent-emerald-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Calculated BMI
                    </span>
                    <span className="text-3xl font-mono font-bold text-slate-900 dark:text-white">
                      {bmiScore.toFixed(1)}
                    </span>
                    <div className="mt-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {bmiCategory}
                      </span>
                    </div>
                  </div>

                  <a 
                    href="/calculators/health/bmi-calculator" 
                    className="block text-center py-2.5 rounded-xl bg-[#046a38] text-white text-xs font-semibold hover:bg-[#03542c] transition-colors"
                  >
                    Open Full BMI Calculator →
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Credibility Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">100% Free • Always</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Zero subscriptions, paywalls, or fees.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Zero Tracking • Local Compute</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Your numbers never leave your browser.</div>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">IRS &amp; WHO Standards</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Audited against authoritative reference formulas.</div>
            </div>
          </div>
        </div>

        {/* Most Popular Calculators Directory */}
        <div className="mt-14">
          <CategoryDirectory />
        </div>

      </div>
    </section>
  );
}
