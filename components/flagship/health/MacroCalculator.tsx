"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, Share2, Flame, Utensils, Apple, Dumbbell } from "lucide-react";

type Unit = "us" | "metric";
type Sex = "male" | "female";
type Goal = "maintain" | "cut" | "aggressive_cut" | "bulk" | "lean_bulk";
type DietPlan = "balanced" | "high_protein" | "low_carb" | "keto";

export function MacroCalculator() {
  const [unit, setUnit] = useState<Unit>("us");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<string>("28");
  const [ft, setFt] = useState<string>("5");
  const [inch, setInch] = useState<string>("10");
  const [cm, setCm] = useState<string>("178");
  const [lb, setLb] = useState<string>("170");
  const [kg, setKg] = useState<string>("77");
  const [activity, setActivity] = useState<number>(1.55);
  const [goal, setGoal] = useState<Goal>("maintain");
  const [dietPlan, setDietPlan] = useState<DietPlan>("balanced");
  const [mealsPerDay, setMealsPerDay] = useState<number>(3);

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Sync from URL params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (p.get("u") === "metric" || p.get("u") === "us") setUnit(p.get("u") as Unit);
    if (p.get("sex") === "female" || p.get("sex") === "male") setSex(p.get("sex") as Sex);
    if (p.get("age")) setAge(p.get("age")!);
    if (p.get("lb")) setLb(p.get("lb")!);
    if (p.get("kg")) setKg(p.get("kg")!);
    if (p.get("ft")) setFt(p.get("ft")!);
    if (p.get("in")) setInch(p.get("in")!);
    if (p.get("cm")) setCm(p.get("cm")!);
    if (p.get("act")) setActivity(parseFloat(p.get("act")!) || 1.55);
    if (p.get("goal")) setGoal(p.get("goal") as Goal);
    if (p.get("diet")) setDietPlan(p.get("diet") as DietPlan);
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("u", unit);
      url.searchParams.set("sex", sex);
      url.searchParams.set("age", age);
      url.searchParams.set("act", String(activity));
      url.searchParams.set("goal", goal);
      url.searchParams.set("diet", dietPlan);
      if (unit === "us") {
        url.searchParams.set("ft", ft);
        url.searchParams.set("in", inch);
        url.searchParams.set("lb", lb);
      } else {
        url.searchParams.set("cm", cm);
        url.searchParams.set("kg", kg);
      }
      navigator.clipboard.writeText(url.toString());
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert inputs to metric for Mifflin-St Jeor calculation
  let weightKg = 0;
  let heightCm = 0;

  if (unit === "us") {
    const totalInches = (parseFloat(ft) || 0) * 12 + (parseFloat(inch) || 0);
    heightCm = totalInches * 2.54;
    weightKg = (parseFloat(lb) || 0) * 0.45359237;
  } else {
    heightCm = parseFloat(cm) || 0;
    weightKg = parseFloat(kg) || 0;
  }

  const ageNum = parseFloat(age) || 28;

  // Mifflin-St Jeor formula
  let bmr = 0;
  if (weightKg > 0 && heightCm > 0 && ageNum > 0) {
    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }
  }

  const tdee = bmr * activity;

  const goalDeltas: Record<Goal, number> = {
    maintain: 0,
    cut: -500,
    aggressive_cut: -750,
    lean_bulk: 300,
    bulk: 500,
  };

  const targetCalories = Math.max(900, Math.round(tdee + goalDeltas[goal]));

  // Macronutrient split ratios [protein, carb, fat]
  const dietRatios: Record<DietPlan, [number, number, number]> = {
    balanced: [0.30, 0.40, 0.30],
    high_protein: [0.40, 0.35, 0.25],
    low_carb: [0.35, 0.20, 0.45],
    keto: [0.25, 0.05, 0.70],
  };

  const [pRatio, cRatio, fRatio] = dietRatios[dietPlan];

  const proteinCalories = Math.round(targetCalories * pRatio);
  const carbCalories = Math.round(targetCalories * cRatio);
  const fatCalories = Math.round(targetCalories * fRatio);

  const proteinGrams = Math.round(proteinCalories / 4);
  const carbGrams = Math.round(carbCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  // SVG Donut circumference for r=62
  const circ = 389.56;
  const pDash = circ * pRatio;
  const cDash = circ * cRatio;
  const fDash = circ * fRatio;

  const formatNum = (n: number) => Math.round(n).toLocaleString("en-US");

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start w-full max-w-full min-w-0 overflow-hidden">
      {/* LEFT COLUMN: Inputs & Controls (7 Cols) */}
      <div className="lg:col-span-7 space-y-5 w-full max-w-full min-w-0">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 sm:p-6 shadow-sm space-y-4 sm:space-y-5 w-full max-w-full overflow-hidden">
          {/* Unit Toggle & Sex Toggle */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Unit System
              </label>
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setUnit("us")}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    unit === "us"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  US (ft, in, lbs)
                </button>
                <button
                  type="button"
                  onClick={() => setUnit("metric")}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    unit === "metric"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Metric (cm, kg)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSex("male")}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    sex === "male"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setSex("female")}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    sex === "female"
                      ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
          </div>

          {/* Age & Height */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mc-age" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Age
              </label>
              <div className="relative flex items-center">
                <input
                  id="mc-age"
                  type="number"
                  min="15"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
                <span className="absolute right-3.5 text-xs text-slate-400 font-medium">years</span>
              </div>
            </div>

            {unit === "us" ? (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Height
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative flex items-center">
                    <input
                      id="mc-ft"
                      type="number"
                      min="3"
                      max="7"
                      value={ft}
                      onChange={(e) => setFt(e.target.value)}
                      className="w-full h-11 sm:h-12 px-2.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm sm:text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-medium">ft</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      id="mc-in"
                      type="number"
                      min="0"
                      max="11"
                      value={inch}
                      onChange={(e) => setInch(e.target.value)}
                      className="w-full h-11 sm:h-12 px-2.5 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm sm:text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                    <span className="absolute right-3 text-xs text-slate-400 font-medium">in</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="mc-cm" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Height
                </label>
                <div className="relative flex items-center">
                  <input
                    id="mc-cm"
                    type="number"
                    min="100"
                    max="250"
                    value={cm}
                    onChange={(e) => setCm(e.target.value)}
                    className="w-full h-11 sm:h-12 px-3 pr-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm sm:text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                  <span className="absolute right-3 text-xs text-slate-400 font-medium">cm</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight & Activity */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mc-wt" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Weight
              </label>
              <div className="relative flex items-center">
                <input
                  id="mc-wt"
                  type="number"
                  step="any"
                  value={unit === "us" ? lb : kg}
                  onChange={(e) => unit === "us" ? setLb(e.target.value) : setKg(e.target.value)}
                  className="w-full h-11 sm:h-12 px-3 pr-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm sm:text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center">
                  <select
                    aria-label="Weight unit"
                    value={unit === "us" ? "lbs" : "kg"}
                    onChange={(e) => {
                      if (e.target.value === "kg" && unit === "us") {
                        const curLb = parseFloat(lb);
                        if (!isNaN(curLb) && curLb > 0) setKg(String(Math.round(curLb * 0.45359237 * 10) / 10));
                        setUnit("metric");
                      } else if (e.target.value === "lbs" && unit === "metric") {
                        const curKg = parseFloat(kg);
                        if (!isNaN(curKg) && curKg > 0) setLb(String(Math.round(curKg * 2.20462262 * 10) / 10));
                        setUnit("us");
                      }
                    }}
                    className="bg-transparent font-medium text-xs text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 cursor-pointer outline-none border-0 py-1 pl-1 pr-3.5 appearance-none transition-colors"
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </select>
                  <span className="pointer-events-none absolute right-0 text-[8px] text-slate-400">▼</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="mc-act" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Activity Level
              </label>
              <select
                id="mc-act"
                value={activity}
                onChange={(e) => setActivity(parseFloat(e.target.value))}
                className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-xs focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all cursor-pointer"
              >
                <option value="1.2">Sedentary (desk job, no workout)</option>
                <option value="1.375">Lightly Active (1–3 gym sessions/wk)</option>
                <option value="1.55">Moderately Active (3–5 workouts/wk)</option>
                <option value="1.725">Very Active (6–7 heavy sessions/wk)</option>
                <option value="1.9">Extra Active (2x day training / labor)</option>
              </select>
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Primary Fitness Goal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                { id: "aggressive_cut", label: "Aggressive Cut", sub: "−750 kcal" },
                { id: "cut", label: "Fat Loss / Cut", sub: "−500 kcal" },
                { id: "maintain", label: "Maintain Weight", sub: "TDEE match" },
                { id: "lean_bulk", label: "Lean Muscle", sub: "+300 kcal" },
                { id: "bulk", label: "Maximum Bulk", sub: "+500 kcal" },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as Goal)}
                  className={`p-2.5 rounded-xl border text-center sm:text-left transition-all ${
                    goal === g.id
                      ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30 font-semibold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  } ${g.id === "maintain" ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <div className="text-xs font-bold leading-tight">{g.label}</div>
                  <div className={`text-[11px] mt-0.5 ${goal === g.id ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400"}`}>{g.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Diet Preference Preset */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Diet Macro Ratio Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "balanced", label: "Balanced", sub: "30P / 40C / 30F" },
                { id: "high_protein", label: "High Protein", sub: "40P / 35C / 25F" },
                { id: "low_carb", label: "Low Carb", sub: "35P / 20C / 45F" },
                { id: "keto", label: "Ketogenic", sub: "25P / 5C / 70F" },
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDietPlan(d.id as DietPlan)}
                  className={`p-2.5 rounded-xl border text-center sm:text-left transition-all ${
                    dietPlan === d.id
                      ? "border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/30 font-semibold"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{d.label}</div>
                  <div className={`text-[11px] mt-0.5 font-medium ${dietPlan === d.id ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}`}>{d.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons: Calculate + Reset */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("macro-result-panel");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Flame className="w-5 h-5 text-emerald-200" />
              <span>Calculate Macros</span>
            </button>

            <div className="flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => {
                  setUnit("us"); setSex("male"); setAge("28");
                  setFt("5"); setInch("10"); setLb("170");
                  setActivity(1.55); setGoal("maintain"); setDietPlan("balanced");
                }}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
              <span className="text-slate-400">Clinical IIFYM Standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sticky Result Card (5 Cols) */}
      <div id="macro-result-panel" className="scroll-mt-20 lg:sticky lg:top-24 lg:col-span-5 space-y-4">
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Daily Macro Targets</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy(`${proteinGrams}g Protein, ${carbGrams}g Carbs, ${fatGrams}g Fats (${formatNum(targetCalories)} kcal)`)}
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

          {/* Primary Hero Display */}
          <div className="mb-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-emerald-500" />
              <span>Target Calorie Intake:</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatNum(targetCalories)}
              </span>
              <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                kcal / day
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Maintenance TDEE: <strong>{formatNum(tdee)}</strong> kcal
            </div>
          </div>

          {/* Visual Interactive Donut Chart */}
          <div className="my-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <span>Macronutrient Breakdown</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold capitalize">
                {dietPlan.replace("_", " ")} Split
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
                  {/* Protein Segment (Emerald) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    stroke="#10b981"
                    strokeWidth="16"
                    strokeDasharray={`${pDash.toFixed(2)} ${circ}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                  {/* Carbs Segment (Blue) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    stroke="#3b82f6"
                    strokeWidth="16"
                    strokeDasharray={`${cDash.toFixed(2)} ${circ}`}
                    strokeDashoffset={`-${pDash.toFixed(2)}`}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                  {/* Fats Segment (Amber) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    stroke="#f59e0b"
                    strokeWidth="16"
                    strokeDasharray={`${fDash.toFixed(2)} ${circ}`}
                    strokeDashoffset={`-${(pDash + cDash).toFixed(2)}`}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {formatNum(targetCalories)}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">
                    kcal
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex-1 w-full space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Protein ({Math.round(pRatio * 100)}%)</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{proteinGrams}g</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Carbs ({Math.round(cRatio * 100)}%)</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{carbGrams}g</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Fats ({Math.round(fRatio * 100)}%)</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">{fatGrams}g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Per-Meal Breakdown Selector */}
          <div className="mt-4 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                <span>Per-Meal Distribution</span>
              </span>
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
                {[3, 4, 5].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMealsPerDay(m)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      mealsPerDay === m
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {m} Meals
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400">Protein / Meal</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {Math.round(proteinGrams / mealsPerDay)}g
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400">Carbs / Meal</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {Math.round(carbGrams / mealsPerDay)}g
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400">Fat / Meal</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {Math.round(fatGrams / mealsPerDay)}g
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-400 leading-relaxed text-center">
            Macronutrients formulated using clinical IIFYM (If It Fits Your Macros) protocols and Mifflin-St Jeor metabolic equations.
          </div>
        </div>
      </div>
    </div>
  );
}
