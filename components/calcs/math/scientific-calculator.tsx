"use client";

import { useState } from "react";
import { Copy, Check, RotateCcw, Share2, Delete, Calculator } from "lucide-react";

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expr, setExpr] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleInsert = (val: string) => {
    if (display === "0" && !isNaN(Number(val))) {
      setDisplay(val);
      setExpr(val);
    } else {
      setDisplay((prev) => (prev === "0" ? val : prev + val));
      setExpr((prev) => prev + val);
    }
  };

  const handleFunc = (fn: string) => {
    try {
      const cur = parseFloat(display) || 0;
      let res = 0;
      if (fn === "sin") res = Math.sin((cur * Math.PI) / 180);
      else if (fn === "cos") res = Math.cos((cur * Math.PI) / 180);
      else if (fn === "tan") res = Math.tan((cur * Math.PI) / 180);
      else if (fn === "log") res = Math.log10(cur);
      else if (fn === "ln") res = Math.log(cur);
      else if (fn === "sqrt") res = Math.sqrt(cur);
      else if (fn === "sq") res = cur * cur;
      else if (fn === "abs") res = Math.abs(cur);

      const resStr = Number.isInteger(res) ? String(res) : res.toFixed(6).replace(/\.?0+$/, "");
      setDisplay(resStr);
      setExpr(`${fn}(${cur})`);
      setHistory((prev) => [`${fn}(${cur}) = ${resStr}`, ...prev.slice(0, 4)]);
    } catch {
      setDisplay("Error");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpr("");
  };

  const handleDelete = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    setExpr((prev) => (prev.length > 1 ? prev.slice(0, -1) : ""));
  };

  const handleCalculate = () => {
    try {
      // Safe sanitized arithmetic evaluation
      const sanitized = expr
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/\^/g, "**")
        .replace(/π/g, String(Math.PI))
        .replace(/e/g, String(Math.E));

      if (!/^[0-9+\-*/.()\s**]+$/.test(sanitized)) {
        setDisplay("Error");
        return;
      }

      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized})`)();
      const resStr = Number.isFinite(result)
        ? Number.isInteger(result)
          ? String(result)
          : Number(result.toFixed(6)).toString()
        : "Error";

      setDisplay(resStr);
      setHistory((prev) => [`${expr} = ${resStr}`, ...prev.slice(0, 4)]);
    } catch {
      setDisplay("Error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
      {/* LEFT: Scientific Keypad (7 Cols) */}
      <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        {/* LCD Display */}
        <div className="mb-4 rounded-xl bg-slate-900 dark:bg-slate-950 p-4 text-right border border-slate-800">
          <div className="h-5 text-xs font-mono text-emerald-400/80 truncate">
            {expr || "\u00A0"}
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight truncate">
            {display}
          </div>
        </div>

        {/* Function Row */}
        <div className="grid grid-cols-5 gap-2 mb-2">
          {["sin", "cos", "tan", "log", "ln"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFunc(f)}
              className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs hover:bg-emerald-100 transition-colors"
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-2 mb-3">
          <button type="button" onClick={() => handleFunc("sqrt")} className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs hover:bg-emerald-100 transition-colors">√</button>
          <button type="button" onClick={() => handleFunc("sq")} className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs hover:bg-emerald-100 transition-colors">x²</button>
          <button type="button" onClick={() => handleInsert("^")} className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs hover:bg-emerald-100 transition-colors">xʸ</button>
          <button type="button" onClick={() => handleInsert("π")} className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs hover:bg-emerald-100 transition-colors">π</button>
          <button type="button" onClick={() => handleInsert("e")} className="h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold text-xs hover:bg-emerald-100 transition-colors">e</button>
        </div>

        {/* Digits & Operators Grid */}
        <div className="grid grid-cols-5 gap-2">
          <button type="button" onClick={() => handleInsert("7")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">7</button>
          <button type="button" onClick={() => handleInsert("8")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">8</button>
          <button type="button" onClick={() => handleInsert("9")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">9</button>
          <button type="button" onClick={() => handleInsert("÷")} className="h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-lg hover:bg-amber-100 transition-colors">÷</button>
          <button type="button" onClick={handleClear} className="h-12 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-bold text-sm hover:bg-rose-100 transition-colors">AC</button>

          <button type="button" onClick={() => handleInsert("4")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">4</button>
          <button type="button" onClick={() => handleInsert("5")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">5</button>
          <button type="button" onClick={() => handleInsert("6")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">6</button>
          <button type="button" onClick={() => handleInsert("×")} className="h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-lg hover:bg-amber-100 transition-colors">×</button>
          <button type="button" onClick={handleDelete} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center"><Delete className="w-4 h-4" /></button>

          <button type="button" onClick={() => handleInsert("1")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">1</button>
          <button type="button" onClick={() => handleInsert("2")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">2</button>
          <button type="button" onClick={() => handleInsert("3")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">3</button>
          <button type="button" onClick={() => handleInsert("−")} className="h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-lg hover:bg-amber-100 transition-colors">−</button>
          <button type="button" onClick={() => handleInsert("(")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 transition-colors">(</button>

          <button type="button" onClick={() => handleInsert("0")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">0</button>
          <button type="button" onClick={() => handleInsert(".")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-base hover:bg-slate-200 transition-colors">.</button>
          <button type="button" onClick={() => handleInsert("+")} className="h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold text-lg hover:bg-amber-100 transition-colors">+</button>
          <button type="button" onClick={() => handleInsert(")")} className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-slate-200 transition-colors">)</button>
          <button type="button" onClick={handleCalculate} className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xl shadow-sm transition-all flex items-center justify-center">=</button>
        </div>

        {/* Calculate Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Display</span>
          </button>
          <span className="text-slate-400">Trig in Degrees</span>
        </div>
      </div>

      {/* RIGHT: Result & History Panel (5 Cols) */}
      <div className="lg:sticky lg:top-24 lg:col-span-5 space-y-4">
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/60 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Result</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleCopy}
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

          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            Current Calculation
          </div>
          <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight break-all">
            {display}
          </div>

          {/* Recent Calculations History */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Recent Calculations
            </h4>
            {history.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No previous operations</p>
            ) : (
              <ul className="space-y-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                {history.map((item, idx) => (
                  <li key={idx} className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 truncate">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
