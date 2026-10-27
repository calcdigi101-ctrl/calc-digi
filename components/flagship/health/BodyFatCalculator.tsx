"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RotateCcw, Share2, Printer, Sparkles, Activity, ShieldCheck, Heart, Info } from "lucide-react";

type Unit = "us" | "metric";
type Sex = "male" | "female";

export function BodyFatCalculator() {
  const [unit, setUnit] = useState<Unit>("us");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<string>("30");
  
  // US measurements
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  const [weightLb, setWeightLb] = useState<string>("175");
  const [neckIn, setNeckIn] = useState<string>("15.5");
  const [waistIn, setWaistIn] = useState<string>("34");
  const [hipIn, setHipIn] = useState<string>("38");

  // Metric measurements
  const [heightCm, setHeightCm] = useState<string>("178");
  const [weightKg, setWeightKg] = useState<string>("79");
  const [neckCm, setNeckCm] = useState<string>("39");
  const [waistCm, setWaistCm] = useState<string>("86");
  const [hipCm, setHipCm] = useState<string>("96");

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleReset = () => {
    setUnit("us");
    setSex("male");
    setAge("30");
    setHeightFt("5");
    setHeightIn("10");
    setWeightLb("175");
    setNeckIn("15.5");
    setWaistIn("34");
    setHipIn("38");
    setHeightCm("178");
    setWeightKg("79");
    setNeckCm("39");
    setWaistCm("86");
    setHipCm("96");
    setShowAiModal(false);
  };

  // Sync state with URL parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (p.get("u") === "metric" || p.get("u") === "us") setUnit(p.get("u") as Unit);
    if (p.get("sex") === "female" || p.get("sex") === "male") setSex(p.get("sex") as Sex);
    if (p.get("age")) setAge(p.get("age")!);
    if (p.get("hft")) setHeightFt(p.get("hft")!);
    if (p.get("hin")) setHeightIn(p.get("hin")!);
    if (p.get("wlb")) setWeightLb(p.get("wlb")!);
    if (p.get("nin")) setNeckIn(p.get("nin")!);
    if (p.get("win")) setWaistIn(p.get("win")!);
    if (p.get("hipin")) setHipIn(p.get("hipin")!);
    if (p.get("hcm")) setHeightCm(p.get("hcm")!);
    if (p.get("wkg")) setWeightKg(p.get("wkg")!);
    if (p.get("ncm")) setNeckCm(p.get("ncm")!);
    if (p.get("wcm")) setWaistCm(p.get("wcm")!);
    if (p.get("hipcm")) setHipCm(p.get("hipcm")!);
  }, []);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("u", unit);
      url.searchParams.set("sex", sex);
      url.searchParams.set("age", age);
      if (unit === "us") {
        url.searchParams.set("hft", heightFt);
        url.searchParams.set("hin", heightIn);
        url.searchParams.set("wlb", weightLb);
        url.searchParams.set("nin", neckIn);
        url.searchParams.set("win", waistIn);
        url.searchParams.set("hipin", hipIn);
      } else {
        url.searchParams.set("hcm", heightCm);
        url.searchParams.set("wkg", weightKg);
        url.searchParams.set("ncm", neckCm);
        url.searchParams.set("wcm", waistCm);
        url.searchParams.set("hipcm", hipCm);
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

  // Convert inputs to centimeters and kilograms for the US Navy formula
  let h_cm = 0;
  let w_kg = 0;
  let n_cm = 0;
  let waist_cm = 0;
  let h_hip_cm = 0;

  if (unit === "us") {
    h_cm = ((parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)) * 2.54;
    w_kg = (parseFloat(weightLb) || 0) * 0.45359237;
    n_cm = (parseFloat(neckIn) || 0) * 2.54;
    waist_cm = (parseFloat(waistIn) || 0) * 2.54;
    h_hip_cm = (parseFloat(hipIn) || 0) * 2.54;
  } else {
    h_cm = parseFloat(heightCm) || 0;
    w_kg = parseFloat(weightKg) || 0;
    n_cm = parseFloat(neckCm) || 0;
    waist_cm = parseFloat(waistCm) || 0;
    h_hip_cm = parseFloat(hipCm) || 0;
  }

  // Calculate Body Fat % using US Navy method
  let bodyFat = 0;
  if (sex === "male") {
    if (waist_cm > n_cm && h_cm > 0 && n_cm > 0) {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist_cm - n_cm) + 0.15456 * Math.log10(h_cm)) - 450;
    }
  } else {
    if (waist_cm + h_hip_cm > n_cm && h_cm > 0 && n_cm > 0) {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist_cm + h_hip_cm - n_cm) + 0.22100 * Math.log10(h_cm)) - 450;
    }
  }

  // Clamp and format
  bodyFat = Math.max(3, Math.min(65, Math.round(bodyFat * 10) / 10));
  const leanMassPct = Math.round((100 - bodyFat) * 10) / 10;

  // Mass calculations
  const fatMassKg = w_kg * (bodyFat / 100);
  const leanMassKg = w_kg * (leanMassPct / 100);
  const fatMassLb = fatMassKg / 0.45359237;
  const leanMassLb = leanMassKg / 0.45359237;

  // ACE Category Determination
  type CategoryInfo = { label: string; tone: "essential" | "athlete" | "fitness" | "average" | "obese"; color: string; desc: string };
  let category: CategoryInfo = {
    label: "Average",
    tone: "average",
    color: "#3b82f6",
    desc: "Within standard population health range.",
  };

  if (sex === "male") {
    if (bodyFat < 6) {
      category = { label: "Essential Fat", tone: "essential", color: "#f59e0b", desc: "Minimum fat required for physiological and neurological survival." };
    } else if (bodyFat < 14) {
      category = { label: "Athletes", tone: "athlete", color: "#10b981", desc: "High muscular definition typical of competitive athletes." };
    } else if (bodyFat < 18) {
      category = { label: "Fitness", tone: "fitness", color: "#059669", desc: "Healthy, active physique with visible abdominal tone." };
    } else if (bodyFat < 25) {
      category = { label: "Average", tone: "average", color: "#3b82f6", desc: "Healthy standard population range with low cardiometabolic risk." };
    } else {
      category = { label: "Obese", tone: "obese", color: "#ef4444", desc: "Elevated body fat associated with increased metabolic disease risk." };
    }
  } else {
    if (bodyFat < 14) {
      category = { label: "Essential Fat", tone: "essential", color: "#f59e0b", desc: "Minimum fat required for hormonal equilibrium and reproductive health." };
    } else if (bodyFat < 21) {
      category = { label: "Athletes", tone: "athlete", color: "#10b981", desc: "Lean athletic physique typical of competitive runners and gymnasts." };
    } else if (bodyFat < 25) {
      category = { label: "Fitness", tone: "fitness", color: "#059669", desc: "Fit, toned appearance with good functional strength." };
    } else if (bodyFat < 32) {
      category = { label: "Average", tone: "average", color: "#3b82f6", desc: "Healthy normal range recommended by clinical guidelines." };
    } else {
      category = { label: "Obese", tone: "obese", color: "#ef4444", desc: "Higher adipose tissue mass with increased cardiovascular burden." };
    }
  }

  // Circumference for r=62 is 389.56
  const circ = 389.56;
  const fatDash = (bodyFat / 100) * circ;
  const leanDash = circ - fatDash;

  const formatNum = (n: number, d = 1) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

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
                  US (inches, lbs)
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
              <label htmlFor="bf-age" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Age
              </label>
              <div className="relative flex items-center">
                <input
                  id="bf-age"
                  type="number"
                  min="15"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                      id="bf-ft"
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full h-12 px-3.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3.5 text-xs text-slate-400 font-medium">ft</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      id="bf-in"
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full h-12 px-3.5 pr-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3.5 text-xs text-slate-400 font-medium">in</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="bf-cm" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Height
                </label>
                <div className="relative flex items-center">
                  <input
                    id="bf-cm"
                    type="number"
                    min="100"
                    max="250"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3.5 text-xs text-slate-400 font-medium">cm</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight & Neck */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bf-wt" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Weight (for fat mass calculation)
              </label>
              <div className="relative flex items-center">
                <input
                  id="bf-wt"
                  type="number"
                  step="any"
                  value={unit === "us" ? weightLb : weightKg}
                  onChange={(e) => unit === "us" ? setWeightLb(e.target.value) : setWeightKg(e.target.value)}
                  className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 text-xs text-slate-400 font-medium">
                  {unit === "us" ? "lbs" : "kg"}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="bf-neck" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Neck Circumference (below larynx)
              </label>
              <div className="relative flex items-center">
                <input
                  id="bf-neck"
                  type="number"
                  step="0.1"
                  value={unit === "us" ? neckIn : neckCm}
                  onChange={(e) => unit === "us" ? setNeckIn(e.target.value) : setNeckCm(e.target.value)}
                  className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 text-xs text-slate-400 font-medium">
                  {unit === "us" ? "inches" : "cm"}
                </span>
              </div>
            </div>
          </div>

          {/* Waist & Hips */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bf-waist" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Waist Circumference ({sex === "male" ? "at navel level" : "at narrowest point"})
              </label>
              <div className="relative flex items-center">
                <input
                  id="bf-waist"
                  type="number"
                  step="0.1"
                  value={unit === "us" ? waistIn : waistCm}
                  onChange={(e) => unit === "us" ? setWaistIn(e.target.value) : setWaistCm(e.target.value)}
                  className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3.5 text-xs text-slate-400 font-medium">
                  {unit === "us" ? "inches" : "cm"}
                </span>
              </div>
            </div>

            {sex === "female" && (
              <div>
                <label htmlFor="bf-hip" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Hip Circumference (at widest point)
                </label>
                <div className="relative flex items-center">
                  <input
                    id="bf-hip"
                    type="number"
                    step="0.1"
                    value={unit === "us" ? hipIn : hipCm}
                    onChange={(e) => unit === "us" ? setHipIn(e.target.value) : setHipCm(e.target.value)}
                    className="w-full h-12 px-3.5 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium text-base focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="absolute right-3.5 text-xs text-slate-400 font-medium">
                    {unit === "us" ? "inches" : "cm"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("body-fat-result-panel");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Activity className="w-5 h-5 text-emerald-200" />
            <span>Calculate Body Fat</span>
          </button>

          {/* Reset */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={() => {
                setUnit("us"); setSex("male"); setAge("30");
                setHeightFt("5"); setHeightIn("10"); setWeightLb("175");
                setNeckIn("15.5"); setWaistIn("34"); setHipIn("38");
              }}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
            <span className="text-slate-400">US Navy Method (±3% Accuracy)</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Sticky Result Card (5 Cols) */}
      <div id="body-fat-result-panel" className="scroll-mt-20 lg:sticky lg:top-24 lg:col-span-5 space-y-4">
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Body Composition Result</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy(`${formatNum(bodyFat)}% Body Fat (${category.label})`)}
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
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span>Estimated Body Fat Percentage:</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {formatNum(bodyFat)}%
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ backgroundColor: category.color }}>
                {category.label}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1.5">
              {category.desc}
            </div>
          </div>

          {/* Visual Interactive Donut Chart */}
          <div className="my-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              <span>Fat vs Lean Mass Ratio</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                {formatNum(leanMassPct)}% Lean Mass
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
                  {/* Lean Mass Segment (Emerald) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    stroke="#10b981"
                    strokeWidth="16"
                    strokeDasharray={`${leanDash.toFixed(2)} ${circ}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                  {/* Body Fat Segment (Amber/Orange) */}
                  <circle
                    cx="80"
                    cy="80"
                    r="62"
                    stroke={category.color}
                    strokeWidth="16"
                    strokeDasharray={`${fatDash.toFixed(2)} ${circ}`}
                    strokeDashoffset={`-${leanDash.toFixed(2)}`}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                {/* Center Value */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                  <span className="text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {formatNum(bodyFat)}%
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">
                    Body Fat
                  </span>
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex-1 w-full space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: category.color }}></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Fat Mass</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatNum(bodyFat)}% ({unit === "us" ? `${formatNum(fatMassLb)} lbs` : `${formatNum(fatMassKg)} kg`})
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">Lean Mass</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatNum(leanMassPct)}% ({unit === "us" ? `${formatNum(leanMassLb)} lbs` : `${formatNum(leanMassKg)} kg`})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Rows */}
          <div className="py-3 border-y border-slate-100 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Formula Method</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">
                US Navy Circumference
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-slate-400" />
                <span>ACE Healthy Target</span>
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {sex === "male" ? "14% – 17% (Fitness)" : "21% – 24% (Fitness)"}
              </span>
            </div>
          </div>

          {/* Action Toolbar Row: Reset, Share, Print, Ask AI */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-medium">
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
              {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
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

          {showAiModal && (
            <div className="mt-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/30 text-xs space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Body Composition Insight</span>
                </span>
                <button type="button" onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Your estimated body fat percentage is {formatNum(bodyFat)}%, placing you in the <strong className="text-slate-800 dark:text-slate-200">{category.label}</strong> classification. Total fat mass is {unit === "us" ? `${formatNum(fatMassLb)} lbs` : `${formatNum(fatMassKg)} kg`} against {unit === "us" ? `${formatNum(leanMassLb)} lbs` : `${formatNum(leanMassKg)} kg`} of metabolically active lean tissue. To shift toward a lean fitness target ({sex === "male" ? "14%" : "21%"}), prioritize progressive resistance hypertrophy and a modest 300-500 kcal deficit.
              </p>
            </div>
          )}

          <div className="mt-4 text-[11px] text-slate-400 leading-relaxed text-center">
            Standard clinical guideline values based on the American Council on Exercise (ACE). For diagnostic-level body composition, consider a DEXA scan.
          </div>
        </div>
      </div>
    </div>
  );
}
