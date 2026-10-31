'use client';

import React, { useState, useId } from 'react';

export function ProbabilityDistributionChart() {
  const [trials, setTrials] = useState<number>(100);
  const [probSuccess, setProbSuccess] = useState<number>(50); // in percent
  const [confidenceLevel, setConfidenceLevel] = useState<number>(95);

  const trialsId = useId();
  const probSuccessId = useId();

  const p = probSuccess / 100;
  const q = 1 - p;
  const expectedSuccesses = (trials * p).toFixed(1);
  const variance = trials * p * q;
  const stdError = Math.sqrt(variance).toFixed(2);

  // Critical z-values
  const zCrit = confidenceLevel === 99 ? 2.576 : confidenceLevel === 90 ? 1.645 : 1.96;
  const marginOfError = trials > 0 ? (zCrit * Math.sqrt((p * q) / trials) * 100).toFixed(2) : '0.00';

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Interactive Probability Spectrum &amp; Margin of Error Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamic distribution estimator calculating expected outcomes, standard error, and confidence interval bounds.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            E(X) = {expectedSuccesses}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            ±{marginOfError}% MoE
          </span>
        </div>
      </div>

      {/* Probability Visual Continuum Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Success Probability: {probSuccess}%</span>
          <span>Complementary Failure: {100 - probSuccess}%</span>
        </div>
        <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex shadow-inner">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${probSuccess}%` }}
          />
          <div
            className="h-full bg-slate-300 dark:bg-slate-600 transition-all duration-300"
            style={{ width: `${100 - probSuccess}%` }}
          />
        </div>
      </div>

      {/* Sliders Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor={trialsId} className="font-semibold text-slate-700 dark:text-slate-300">Sample Size (n)</label>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{trials}</span>
          </div>
          <input
            id={trialsId}
            type="range"
            min="10"
            max="1000"
            step="10"
            value={trials}
            onChange={(e) => setTrials(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor={probSuccessId} className="font-semibold text-slate-700 dark:text-slate-300">Baseline Rate (p)</label>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{probSuccess}%</span>
          </div>
          <input
            id={probSuccessId}
            type="range"
            min="1"
            max="99"
            step="1"
            value={probSuccess}
            onChange={(e) => setProbSuccess(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Confidence Level</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{confidenceLevel}%</span>
          </div>
          <div className="flex gap-2 pt-1">
            {[90, 95, 99].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setConfidenceLevel(lvl)}
                className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                  confidenceLevel === lvl
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {lvl}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Summary Chips */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">{expectedSuccesses}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Expected Mean n×p</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">{stdError}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Standard Error √(npq)</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">±{marginOfError}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{confidenceLevel}% Margin of Error</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">{(p * 100 - parseFloat(marginOfError)).toFixed(1)}% – {(p * 100 + parseFloat(marginOfError)).toFixed(1)}%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Interval Range</div>
        </div>
      </div>
    </div>
  );
}
