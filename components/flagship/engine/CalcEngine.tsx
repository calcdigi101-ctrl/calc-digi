"use client";

import { useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseAsFloat, parseAsString, useQueryStates, type ParserBuilder } from "nuqs";
import { Button } from "@/components/ui/button";
import { Label, NumberField as NumberInput, FieldError, fieldBox } from "@/components/ui/field";
import { Segmented } from "@/components/ui/segmented";
import { Disclosure } from "@/components/ui/disclosure";
import { ResultActions } from "@/components/flagship/ResultActions";
import { ToolGrid, card, revealResult } from "@/components/flagship/shell";
import { SpectrumGauge } from "./SpectrumGauge";
import { AmortizationSchedule } from "./AmortizationSchedule";
import { PALETTE, type CalcConfig, type Chart, type Field, type Output, type Tone, type Values } from "./types";
import { formatBy } from "./format";
import { cn } from "@/lib/cn";

const DonutChart = dynamic(() => import("./Charts").then((m) => m.DonutChart), {
  ssr: false,
  loading: () => <div className="mx-auto size-[180px] rounded-full border-[22px] border-slate-100 dark:border-slate-800" />,
});
const SeriesChart = dynamic(() => import("./Charts").then((m) => m.SeriesChart), {
  ssr: false,
  loading: () => <div className="h-[300px] rounded-lg bg-slate-50 dark:bg-slate-800/40" />,
});

const TONES: Record<Tone, string> = {
  good: "bg-emerald-600 text-white",
  warn: "bg-amber-500 text-white",
  bad: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  neutral: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100",
};
const NOTE_TONES: Record<Tone, string> = {
  good: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
  warn: "bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200",
  bad: "bg-red-50 text-red-900 dark:bg-red-950/40 dark:text-red-200",
  info: "bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200",
  neutral: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
};

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Turn a form/URL value into the typed value compute() expects, or undefined if invalid. */
function coerce(f: Field, raw: unknown, todayStr: string): number | string | undefined {
  if (f.kind === "number") {
    const s = typeof raw === "number" ? String(raw) : String(raw ?? "").trim();
    if (s === "") return f.optional ? 0 : undefined;
    const n = Number(s);
    if (!Number.isFinite(n)) return undefined;
    if ((f.min !== undefined && n < f.min) || (f.max !== undefined && n > f.max)) return undefined;
    if (f.integer && !Number.isInteger(n)) return undefined;
    return n;
  }
  if (f.kind === "choice") return f.options.some((o) => o.value === raw) ? String(raw) : undefined;
  if (f.kind === "date") {
    const s = String(raw ?? "");
    return DATE_RE.test(s) ? s : undefined;
  }
  return String(raw ?? "");
}

const defaultOf = (f: Field, todayStr: string) => (f.kind === "date" && f.default === "today" ? todayStr : f.default);

function ChartLegend({ chart }: { chart: Extract<Chart, { type: "donut" }> }) {
  return (
    <ul className="grid w-full gap-2 text-sm">
      {chart.data.map((d, i) => (
        <li key={d.name} className={cn("flex items-center justify-between gap-2 min-w-0", d.value <= 0 && "opacity-50")}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color ?? PALETTE[i % PALETTE.length] }} />
            <span className="truncate text-slate-600 dark:text-slate-400" title={d.name}>{d.name}</span>
          </div>
          <span className="shrink-0 font-semibold tabular-nums text-slate-900 dark:text-slate-100">{formatBy(chart.format, d.value)}</span>
        </li>
      ))}
    </ul>
  );
}

export function CalcEngine({ config }: { config: CalcConfig }) {
  const { id, fields } = config;
  const [todayStr] = useState(today);

  const parsers = useMemo(() => {
    const p: Record<string, ParserBuilder<number> | ParserBuilder<string>> = {};
    for (const f of fields) p[f.key] = f.kind === "number" ? parseAsFloat : parseAsString;
    return p;
  }, [fields]);
  const [q, setQ] = useQueryStates(parsers, { history: "replace", scroll: false });

  // Committed values come from the URL (shareable); anything invalid falls back to the default.
  const committed: Values = useMemo(() => {
    const res: Values = {};
    for (const f of fields) {
      const v = q[f.key] === null ? undefined : coerce(f, q[f.key], todayStr);
      res[f.key] = v ?? (coerce(f, defaultOf(f, todayStr), todayStr) as number | string);
    }
    return res;
  }, [fields, q, todayStr]);

  const schema = useMemo(
    () =>
      z.record(z.string(), z.string()).superRefine((v, ctx) => {
        const typed: Values = {};
        const loose = Object.fromEntries(fields.map((g) => [g.key, coerce(g, v[g.key], todayStr) ?? ""])) as Values;
        for (const f of fields) {
          if (f.showIf && !f.showIf(loose)) {
            // Hidden fields aren't validated, but compute() still needs a value.
            typed[f.key] = coerce(f, v[f.key], todayStr) ?? (coerce(f, defaultOf(f, todayStr), todayStr) as number | string);
            continue;
          }
          const raw = (v[f.key] ?? "").trim();
          if (f.kind === "number") {
            if (raw === "" && !f.optional) {
              ctx.addIssue({ code: "custom", path: [f.key], message: `${f.label} is required` });
              continue;
            }
            if (raw === "") continue;
            const n = Number(raw);
            if (!Number.isFinite(n)) ctx.addIssue({ code: "custom", path: [f.key], message: "Enter a valid number" });
            else if (f.integer && !Number.isInteger(n)) ctx.addIssue({ code: "custom", path: [f.key], message: "Enter a whole number" });
            else if ((f.min !== undefined && n < f.min) || (f.max !== undefined && n > f.max)) {
              const range =
                f.min !== undefined && f.max !== undefined
                  ? `between ${f.min.toLocaleString()} and ${f.max.toLocaleString()}`
                  : f.min !== undefined
                    ? `at least ${f.min.toLocaleString()}`
                    : `at most ${f.max!.toLocaleString()}`;
              ctx.addIssue({ code: "custom", path: [f.key], message: `${f.label} must be ${range}` });
            }
          } else if (f.kind === "date" && !DATE_RE.test(raw)) {
            ctx.addIssue({ code: "custom", path: [f.key], message: "Enter a valid date" });
          }
          const c = coerce(f, raw, todayStr);
          if (c !== undefined) typed[f.key] = c;
        }
        if (config.validate && Object.keys(typed).length === fields.length) {
          for (const [k, m] of Object.entries(config.validate(typed) ?? {})) if (m) ctx.addIssue({ code: "custom", path: [k], message: m });
        }
      }),
    [fields, config, todayStr],
  );

  const toForm = (vals: Values) => Object.fromEntries(fields.map((f) => [f.key, String(vals[f.key])]));
  const { register, handleSubmit, formState, watch, setValue, reset } = useForm<Record<string, string>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: toForm(committed),
  });
  const errors = formState.errors;
  const live = watch();

  const activeValues: Values = useMemo(() => {
    const vals: Values = {};
    for (const f of fields) {
      const raw = live?.[f.key];
      const coerced = raw !== undefined && raw !== "" ? coerce(f, raw, todayStr) : undefined;
      vals[f.key] = coerced !== undefined ? coerced : committed[f.key];
    }
    return vals;
  }, [live, fields, committed, todayStr]);

  const output: Output | { error: string } = useMemo(() => {
    const crossErrors = config.validate?.(activeValues);
    if (crossErrors && Object.values(crossErrors).some(Boolean)) {
      try {
        return config.compute(committed);
      } catch {
        return { error: "These inputs can't be calculated. Please check the values." };
      }
    }
    try {
      return config.compute(activeValues);
    } catch {
      try {
        return config.compute(committed);
      } catch {
        return { error: "These inputs can't be calculated. Please check the values." };
      }
    }
  }, [config, activeValues, committed]);

  const liveTyped = Object.fromEntries(fields.map((f) => [f.key, coerce(f, live[f.key], todayStr) ?? ""])) as Values;

  function commit(v: Record<string, string>) {
    const next: Record<string, number | string | null> = {};
    for (const f of fields) {
      const c = coerce(f, v[f.key], todayStr);
      const d = defaultOf(f, todayStr);
      // Keep URLs short: omit values equal to their default.
      next[f.key] = c === undefined || String(c) === String(d) ? null : c;
    }
    void setQ(next);
  }

  function onReset() {
    reset(toForm(Object.fromEntries(fields.map((f) => [f.key, defaultOf(f, todayStr)]))));
    void setQ(null);
  }

  function renderField(f: Field): ReactNode {
    if (f.showIf && !f.showIf(liveTyped)) return null;
    const fid = `${id}-${f.key}`;
    const err = errors[f.key]?.message as string | undefined;
    const span = f.full ? "sm:col-span-2" : undefined;
    if (f.kind === "number") {
      return (
        <NumberInput
          key={f.key}
          id={fid}
          label={f.label}
          hint={f.hint}
          prefix={f.prefix}
          suffix={f.suffix}
          error={err}
          className={span}
          step={f.integer ? 1 : "any"}
          {...register(f.key)}
        />
      );
    }
    if (f.kind === "choice" && f.segmented) {
      return (
        <div key={f.key} className={cn("sm:col-span-2", span)}>
          <Label hint={f.hint}>{f.label}</Label>
          <Segmented label={f.label} value={live[f.key]} onChange={(val) => setValue(f.key, val, { shouldValidate: true, shouldDirty: true })} options={f.options} />
        </div>
      );
    }
    const control =
      f.kind === "choice" ? (
        <select id={fid} {...register(f.key)} className="w-full min-w-0 appearance-none border-0 bg-transparent pl-3 pr-8 text-base text-slate-900 outline-none dark:text-slate-100 dark:bg-slate-950">
          {f.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fid}
          type={f.kind === "date" ? "date" : "text"}
          placeholder={f.kind === "text" ? f.placeholder : undefined}
          aria-invalid={err ? true : undefined}
          {...register(f.key)}
          className="w-full min-w-0 border-0 bg-transparent px-3 text-base text-slate-900 outline-none dark:text-slate-100 dark:[color-scheme:dark]"
        />
      );
    return (
      <div key={f.key} className={span}>
        <Label htmlFor={fid} hint={f.hint}>
          {f.label}
        </Label>
        <div className={cn(fieldBox(!!err), f.kind === "choice" && "relative")}>
          {control}
          {f.kind === "choice" ? (
            <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▾
            </span>
          ) : null}
        </div>
        <FieldError id={`${fid}-error`} message={err} />
      </div>
    );
  }

  const ungrouped = fields.filter((f) => !f.group);
  const groups = [...new Set(fields.filter((f) => f.group).map((f) => f.group!))];

  const formPanel = (
    <form onSubmit={handleSubmit((v) => (commit(v), revealResult(`${id}-result`)))} noValidate className={cn(card, "grid gap-5 p-5 sm:p-6")}>
      <div className="grid gap-5 sm:grid-cols-2">{ungrouped.map(renderField)}</div>
      {groups.map((g) => {
        const gf = fields.filter((f) => f.group === g);
        const touched = gf.some((f) => String(committed[f.key]) !== String(defaultOf(f, todayStr)));
        return (
          <Disclosure key={g} title={g} defaultOpen={touched}>
            <div className="grid gap-4 sm:grid-cols-2">{gf.map(renderField)}</div>
          </Disclosure>
        );
      })}

      {config.presets && config.presets.length > 0 ? (
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Quick Presets / Examples
            </span>
            <span className="text-[11px] text-slate-400">Click to autofill</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.presets.map((pr) => (
              <button
                key={pr.label}
                type="button"
                onClick={() => {
                  for (const [k, v] of Object.entries(pr.values)) {
                    setValue(k, String(v), { shouldValidate: true, shouldDirty: true });
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer active:scale-95"
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <Button type="submit" className="w-full text-base">
        Calculate
      </Button>
    </form>
  );

  const resultPanel = (
    <section
      id={`${id}-result`}
      aria-labelledby={`${id}-result-h`}
      className={cn(
        card,
        "scroll-mt-20 p-5 sm:p-6 border-emerald-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-white dark:border-emerald-900/60 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 shadow-sm"
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 id={`${id}-result-h`} className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          {"error" in output ? "Result" : output.hero.label}
        </h2>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Live Result</span>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {"error" in output ? (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-950/40 dark:text-red-200">{output.error}</p>
        ) : (
          <>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <p className="break-normal text-3xl font-extrabold tabular-nums tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
                {output.hero.value}
                {output.hero.unit ? <span className="ml-1.5 text-base sm:text-lg font-semibold text-slate-500 dark:text-slate-400">{output.hero.unit}</span> : null}
              </p>
              {output.badge ? (
                <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs sm:text-sm font-semibold max-w-full break-words", TONES[output.badge.tone])}>{output.badge.text}</span>
              ) : null}
            </div>
            {output.hero.sub ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{output.hero.sub}</p> : null}

            {output.spectrum ? (
              <div className="mt-5">
                <SpectrumGauge spectrum={output.spectrum} />
              </div>
            ) : null}

            {output.chart?.type === "donut" ? (
              <div className="mt-5 grid items-center gap-5 sm:grid-cols-[180px_1fr] lg:grid-cols-1 xl:grid-cols-[180px_1fr]">
                <DonutChart chart={output.chart} />
                <ChartLegend chart={output.chart} />
              </div>
            ) : output.chart ? (
              <div className="mt-5">
                <SeriesChart chart={output.chart} />
              </div>
            ) : null}

            {output.rows?.length ? (
              <dl className="mt-5 divide-y divide-slate-200 border-t border-slate-200 text-sm dark:divide-slate-800 dark:border-slate-800">
                {output.rows.map((r) => (
                  <div key={r.label} className="flex items-start justify-between gap-3 py-2.5 sm:items-baseline">
                    <dt className="text-slate-600 dark:text-slate-400 leading-snug">{r.label}</dt>
                    <dd className={cn("shrink-0 text-right tabular-nums text-slate-900 dark:text-slate-100 leading-snug", r.strong ? "font-bold" : "font-semibold")}>{r.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {output.steps && output.steps.length > 0 ? (
              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30 text-xs sm:text-sm">
                <div className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <span>📝</span> Step-by-Step Calculation:
                </div>
                <ol className="list-decimal pl-4 space-y-1.5 text-slate-700 dark:text-slate-300 font-mono text-xs">
                  {output.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>
            ) : null}

            {output.note ? <p className={cn("mt-3 rounded-lg p-3 text-sm", NOTE_TONES[output.note.tone ?? "info"])}>{output.note.text}</p> : null}
          </>
        )}
      </div>
      {config.disclaimer ? <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{config.disclaimer}</p> : null}
      <ResultActions onReset={onReset} title={config.title} />
    </section>
  );

  return (
    <>
      <ToolGrid form={formPanel} result={resultPanel} />
      {"error" in output
        ? null
        : output.details?.map((d) => (
            <section key={d.title} className={cn(card, "mt-6 p-5 sm:p-6")}>
              {d.amortization ? (
                <AmortizationSchedule title={d.title} principal={d.amortization.principal} rows={d.amortization.rows} />
              ) : (
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{d.title}</h2>
              )}
              {d.chart ? (
                <div className="mt-4">{d.chart.type === "donut" ? <DonutChart chart={d.chart} /> : <SeriesChart chart={d.chart} />}</div>
              ) : null}
              {d.table ? (
                <div className="mt-6 max-h-[480px] overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
                  <table className="w-full min-w-[480px] text-right text-sm tabular-nums">
                    <thead className="sticky top-0 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      <tr>
                        {d.table.head.map((h, i) => (
                          <th key={h} scope="col" className={cn("px-4 py-2.5 font-semibold", i === 0 && "text-left")}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {d.table.rows.map((r, i) => (
                        <tr key={i} className="border-t border-slate-200 dark:border-slate-800">
                          {r.map((c, j) => (
                            <td key={j} className={cn("px-4 py-2", j === 0 && "text-left font-medium")}>
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </section>
          ))}
    </>
  );
}
