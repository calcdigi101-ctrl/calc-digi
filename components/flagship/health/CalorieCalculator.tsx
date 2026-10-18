"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, Share2, Flame, Activity, Target, Utensils } from "lucide-react";

type Unit = "us" | "metric";
type Sex = "male" | "female";
type Goal = "maintain" | "loss05" | "loss1" | "loss2" | "gain05" | "gain1";

export function CalorieCalculator() {
  const [unit, setUnit] = useState<Unit>("us");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<string>("30");
  const [ft, setFt] = useState<string>("5");
  const [inch, setInch] = useState<string>("10");
  const [cm, setCm] = useState<string>("178");
  const [lb, setLb] = useState<string>("165");
  const [kg, setKg] = useState<string>("75");
  const [activity, setActivity] = useState<number>(1.55);
  const [goal, setGoal] = useState<Goal>("maintain");

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
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("u", unit);
      url.searchParams.set("sex", sex);
      url.searchParams.set("age", age);
      url.searchParams.set("act", String(activity));
      url.searchParams.set("goal", goal);
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

  // Convert inputs to metric for Mifflin-St Jeor equation
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

  const ageNum = parseFloat(age) || 30;

  // Mifflin-St Jeor formula:
  // Male: BMR = 10W + 6.25H - 5A + 5
  // Female: BMR = 10W + 6.25H - 5A - 161
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
    loss05: -250,
    loss1: -500,
    loss2: -1000,
    gain05: 250,
    gain1: 500,
  };

  const targetCalories = Math.max(800, Math.round(tdee + goalDeltas[goal]));

  // Macronutrient split for target calories (Balanced 30% Protein, 40% Carb, 30% Fat)
  const proteinGrams = Math.round((targetCalories * 0.3) / 4);
  const carbGrams = Math.round((targetCalories * 0.4) / 4);
  const fatGrams = Math.round((targetCalories * 0.3) / 9);

  const formatNum = (n: number) => Math.round(n).toLocaleString("en-US");

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
      {/* LEFT COLUMN: Inputs & Controls (7 Cols) */}
      <div className="lg:col-span-7 space-y-5">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm space-y-5">
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

          {/* Age, Height, Weight */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cal-age" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Age
              </label>
              <div className="relative flex items-center">
                <input
                  id="cal-age"
                  type="number"
                  min="15"
                  max="105"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-12 px-3.5 pr-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                />
                <span className="absolute right-3.5 text-xs text-slate-400 font-medium">yrs</span>
              </div>
            </div>

            {unit === "us" ? (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Height
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="3"
                        max="8"
                        value={ft}
                        onChange={(e) => setFt(e.target.value)}
                        className="w-full h-12 px-2.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                      />
                      <span className="absolute right-2 text-xs text-slate-400">ft</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={inch}
                        onChange={(e) => setInch(e.target.value)}
                        className="w-full h-12 px-2.5 pr-7 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                      />
                      <span className="absolute right-2 text-xs text-slate-400">in</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="cal-lb" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Weight
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="cal-lb"
                      type="number"
                      min="50"
                      max="600"
                      value={lb}
                      onChange={(e) => setLb(e.target.value)}
                      className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                    <span className="absolute right-3.5 text-xs text-slate-400 font-medium">lbs</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="cal-cm" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Height
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="cal-cm"
                      type="number"
                      min="100"
                      max="250"
                      value={cm}
                      onChange={(e) => setCm(e.target.value)}
                      className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                    <span className="absolute right-3.5 text-xs text-slate-400 font-medium">cm</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="cal-kg" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Weight
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="cal-kg"
                      type="number"
                      min="30"
                      max="300"
                      value={kg}
                      onChange={(e) => setKg(e.target.value)}
                      className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all"
                    />
                    <span className="absolute right-3.5 text-xs text-slate-400 font-medium">kg</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Activity Level */}
          <div>
            <label htmlFor="cal-act" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Activity Level
            </label>
            <select
              id="cal-act"
              value={activity}
              onChange={(e) => setActivity(parseFloat(e.target.value))}
              className="w-full h-12 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all cursor-pointer"
            >
              <option value="1.2">Sedentary (Little or no exercise, desk job) — ×1.2</option>
              <option value="1.375">Lightly Active (Light workout 1–3 days/week) — ×1.375</option>
              <option value="1.55">Moderately Active (Moderate exercise 3–5 days/week) — ×1.55</option>
              <option value="1.725">Very Active (Hard training 6–7 days/week) — ×1.725</option>
              <option value="1.9">Extra Active (Very intense training or physical job) — ×1.9</option>
            </select>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Your Goal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "loss2", label: "Lose 2 lbs/wk", sub: "−1,000 cal" },
                { id: "loss1", label: "Lose 1 lb/wk", sub: "−500 cal" },
                { id: "loss05", label: "Lose 0.5 lb/wk", sub: "−250 cal" },
                { id: "maintain", label: "Maintain Weight", sub: "TDEE match" },
                { id: "gain05", label: "Gain 0.5 lb/wk", sub: "+250 cal" },
                { id: "gain1", label: "Gain 1 lb/wk", sub: "+500 cal" },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as Goal)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    goal === g.id
                      ? "border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                  }`}
                >
                  <div className="text-xs font-bold">{g.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{g.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={() => {
                setUnit("us"); setSex("male"); setAge("30");
                setFt("5"); setInch("10"); setLb("165");
                setActivity(1.55); setGoal("maintain");
              }}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
            <span className="text-slate-400">Instant Real-time Calculation</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sticky Result Card (5 Cols) */}
      <div className="lg:sticky lg:top-24 lg:col-span-5 space-y-4">
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Daily Calorie Target</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy(`${formatNum(targetCalories)} calories/day`)}
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
              <span>To reach your goal:</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatNum(targetCalories)}
              </span>
              <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                cal / day
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Weekly budget: <strong>{formatNum(targetCalories * 7)}</strong> calories
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="py-3 border-y border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                <span>Basal Metabolic Rate (BMR)</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {formatNum(bmr)} cal/day
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-slate-400" />
                <span>Maintenance (TDEE)</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {formatNum(tdee)} cal/day
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">Activity Burn</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                +{formatNum(tdee - bmr)} cal/day
              </span>
            </div>
          </div>

          {/* Macronutrients Suggestion */}
          <div className="mt-4 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                <span>Target Macronutrients (Balanced Split)</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400">Protein (30%)</div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{proteinGrams}g</div>
                <div className="text-[10px] text-slate-400">{formatNum(proteinGrams * 4)} cal</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400">Carbs (40%)</div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{carbGrams}g</div>
                <div className="text-[10px] text-slate-400">{formatNum(carbGrams * 4)} cal</div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-medium text-slate-400">Fats (30%)</div>
                <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{fatGrams}g</div>
                <div className="text-[10px] text-slate-400">{formatNum(fatGrams * 9)} cal</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-slate-400 leading-relaxed text-center">
            Calculated via the clinically validated Mifflin-St Jeor formula. Results are for educational purposes.
          </div>
        </div>
      </div>
    </div>
  );
}
