"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

type Option<T extends string> = { value: T; label: string; sublabel?: string };

function parseOptionLabel(opt: { label: string; sublabel?: string }) {
  if (opt.sublabel) {
    return { title: opt.label, sub: opt.sublabel };
  }
  const m = opt.label.match(/^([^(]+)\s*\(([^)]+)\)$/);
  if (m) {
    return { title: m[1].trim(), sub: m[2].trim() };
  }
  return { title: opt.label, sub: null };
}

/** Segmented control (radiogroup semantics, arrow-key navigation). */
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent, index: number) {
    const delta =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  }

  const gridColsClass =
    options.length === 2
      ? "grid-cols-2"
      : options.length === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : options.length === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : options.length === 5
      ? "grid-cols-2 sm:grid-cols-5"
      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6";

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("grid w-full gap-1 sm:gap-1.5 rounded-xl bg-slate-100 p-1 sm:p-1.5 dark:bg-slate-800/80 max-w-full", gridColsClass, className)}
    >
      {options.map((opt, i) => {
        const active = opt.value === value;
        const { title, sub } = parseOptionLabel(opt);
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(opt.value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            title={sub ? `${title} (${sub})` : title}
            className={cn(
              "group flex min-h-[40px] sm:min-h-[46px] min-w-0 flex-col items-center justify-center rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 text-center transition-all",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600",
              active
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5 dark:bg-slate-950 dark:text-white dark:ring-white/10 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-900/60 font-medium",
            )}
          >
            <span className="w-full min-w-0 truncate text-xs sm:text-sm tracking-tight text-inherit">
              {title}
            </span>
            {sub ? (
              <span
                className={cn(
                  "mt-0.5 w-full min-w-0 truncate text-[11px] font-normal leading-tight",
                  active ? "text-slate-600 dark:text-slate-300" : "text-slate-500 dark:text-slate-400",
                )}
              >
                {sub}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
