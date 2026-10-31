"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseAsFloat, parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { Label, NumberField } from "@/components/ui/field";
import { Segmented } from "@/components/ui/segmented";
import { Disclosure } from "@/components/ui/disclosure";
import { ResultActions } from "@/components/flagship/ResultActions";
import { ToolGrid, card, revealResult } from "@/components/flagship/shell";
import { MONTHS, computeMortgage, type MortgageInput } from "@/lib/mortgage";
import { cn } from "@/lib/cn";

const BreakdownDonut = dynamic(() => import("./MortgageCharts").then((m) => m.BreakdownDonut), {
  ssr: false,
  loading: () => <div className="mx-auto size-[180px] rounded-full border-[22px] border-slate-100 dark:border-slate-800" />,
});
const BalanceChart = dynamic(() => import("./MortgageCharts").then((m) => m.BalanceChart), {
  ssr: false,
  loading: () => <div className="h-[300px] rounded-lg bg-slate-50 dark:bg-slate-800/40" />,
});

export const SEGMENT_COLORS = {
  pi: "#18533b",
  tax: "#f59e0b",
  insurance: "#10b981",
  pmi: "#8b5cf6",
  hoa: "#64748b",
} as const;

const TERMS = ["10", "15", "20", "30"] as const;
type TaxUnit = "pct" | "usd";
type Frequency = "monthly" | "biweekly";

const CURRENCIES = [
  { symbol: "$", label: "USD ($)" },
  { symbol: "£", label: "GBP (£)" },
  { symbol: "€", label: "EUR (€)" },
  { symbol: "C$", label: "CAD ($)" },
  { symbol: "A$", label: "AUD ($)" },
  { symbol: "₹", label: "INR (₹)" },
] as const;

function nextMonth() {
  const d = new Date();
  const m = d.getMonth() + 1;
  return `${d.getFullYear() + Math.floor(m / 12)}-${String((m % 12) + 1).padStart(2, "0")}`;
}

function parseYm(s: string | null | undefined, fallback: string) {
  const m = /^(\d{4})-(\d{2})$/.exec(s ?? "") ?? /^(\d{4})-(\d{2})$/.exec(fallback)!;
  const month = Math.min(Math.max(Number(m[2]) - 1, 0), 11);
  return { year: Number(m[1]), month };
}

const DEFAULTS = {
  price: 400000,
  down: 80000,
  term: 30,
  rate: 6.5,
  tax: 1.2,
  taxu: "pct" as TaxUnit,
  ins: 1500,
  pmi: 0,
  hoa: 0,
  xm: 0,
  xy: 0,
  xo: 0,
};

const urlParsers = {
  price: parseAsFloat.withDefault(DEFAULTS.price),
  down: parseAsFloat.withDefault(DEFAULTS.down),
  term: parseAsInteger.withDefault(DEFAULTS.term),
  rate: parseAsFloat.withDefault(DEFAULTS.rate),
  start: parseAsString,
  tax: parseAsFloat.withDefault(DEFAULTS.tax),
  taxu: parseAsStringLiteral(["pct", "usd"] as const).withDefault(DEFAULTS.taxu),
  ins: parseAsFloat.withDefault(DEFAULTS.ins),
  pmi: parseAsFloat.withDefault(DEFAULTS.pmi),
  hoa: parseAsFloat.withDefault(DEFAULTS.hoa),
  xm: parseAsFloat.withDefault(DEFAULTS.xm),
  xy: parseAsFloat.withDefault(DEFAULTS.xy),
  xo: parseAsFloat.withDefault(DEFAULTS.xo),
  xod: parseAsString,
};

const money = z.string();
const schema = z
  .object({
    price: money,
    down: money,
    downPct: money,
    term: z.enum(TERMS),
    rate: money,
    startMonth: z.string(),
    startYear: z.string(),
    tax: money,
    taxUnit: z.enum(["pct", "usd"]),
    ins: money,
    pmi: money,
    hoa: money,
    xm: money,
    xy: money,
    xo: money,
    xoMonth: z.string(),
    xoYear: z.string(),
  })
  .superRefine((v, ctx) => {
    const check = (key: keyof typeof v, label: string, min: number, max: number, required = true) => {
      const raw = String(v[key]).trim();
      if (raw === "") {
        if (required) ctx.addIssue({ code: "custom", path: [key], message: `${label} is required` });
        return;
      }
      const n = Number(raw);
      if (!Number.isFinite(n)) ctx.addIssue({ code: "custom", path: [key], message: "Enter a valid number" });
      else if (n < min || n > max)
        ctx.addIssue({ code: "custom", path: [key], message: `${label} must be between ${min.toLocaleString()} and ${max.toLocaleString()}` });
    };
    check("price", "Home price", 1000, 1e9);
    check("down", "Down payment", 0, 1e9);
    check("rate", "Interest rate", 0, 30);
    check("tax", "Property tax", 0, v.taxUnit === "pct" ? 10 : 1e7, false);
    check("ins", "Insurance", 0, 1e6, false);
    check("pmi", "PMI", 0, 1e6, false);
    check("hoa", "HOA fee", 0, 1e5, false);
    check("xm", "Extra monthly payment", 0, 1e8, false);
    check("xy", "Extra yearly payment", 0, 1e8, false);
    check("xo", "One-time payment", 0, 1e9, false);
    if (Number(v.down) >= Number(v.price))
      ctx.addIssue({ code: "custom", path: ["down"], message: "Down payment must be less than the home price" });
  });

type FormValues = z.infer<typeof schema>;

const num = (s: string) => (s.trim() === "" ? 0 : Number(s));
const plain = (n: number, d = 2) => String(Math.round(n * 10 ** d) / 10 ** d);

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group/tip relative ml-1.5 inline-flex cursor-help items-center text-slate-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-400">
      <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <span className="pointer-events-none invisible opacity-0 group-hover/tip:visible group-hover/tip:opacity-100 absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-normal rounded-xl bg-slate-900 px-2.5 py-1.5 text-xs font-normal text-white shadow-xl transition-all duration-150 dark:bg-slate-800 w-52 z-50 text-center leading-snug">
        {text}
      </span>
    </span>
  );
}

/** Coerce URL state into a safe input */
function inputFromUrl(q: ReturnType<typeof useQueryStates<typeof urlParsers>>[0], fallbackStart: string): MortgageInput {
  const ok = (n: number, min: number, max: number) => Number.isFinite(n) && n >= min && n <= max;
  const price = ok(q.price, 1000, 1e9) ? q.price : DEFAULTS.price;
  const down = ok(q.down, 0, price - 1) ? q.down : Math.min(DEFAULTS.down, price * 0.2);
  const term = (TERMS as readonly string[]).includes(String(q.term)) ? q.term : DEFAULTS.term;
  const start = parseYm(q.start, fallbackStart);
  const xod = parseYm(q.xod, fallbackStart);
  const pos = (n: number, max: number) => (ok(n, 0, max) ? n : 0);
  const tax = pos(q.tax, q.taxu === "pct" ? 10 : 1e7);
  const loan = Math.max(0, price - down);
  const estimatedPmi = down < price * 0.2 ? Math.round(loan * 0.0058) : 0;
  const pmi = q.pmi !== null && q.pmi !== undefined && q.pmi > 0 ? pos(q.pmi, 1e6) : estimatedPmi;
  return {
    price,
    down,
    termYears: term,
    ratePct: ok(q.rate, 0, 30) ? q.rate : DEFAULTS.rate,
    start,
    propertyTaxPerYear: q.taxu === "pct" ? (price * tax) / 100 : tax,
    insurancePerYear: pos(q.ins, 1e6),
    pmiPerYear: pmi,
    hoaPerMonth: pos(q.hoa, 1e5),
    extraMonthly: pos(q.xm, 1e8),
    extraYearly: pos(q.xy, 1e8),
    extraOnce: pos(q.xo, 1e9),
    extraOnceIndex: (xod.year - start.year) * 12 + (xod.month - start.month),
  };
}

function MonthYear({
  idPrefix,
  label,
  month,
  year,
  onMonth,
  onYear,
}: {
  idPrefix: string;
  label: string;
  month: string;
  year: string;
  onMonth: (v: string) => void;
  onYear: (v: string) => void;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => String(currentYear - 10 + i));
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</legend>
      <div className="grid grid-cols-[1fr_5.5rem] gap-2">
        <div className="flex min-h-[48px] items-center rounded-lg border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-950">
          <select
            id={`${idPrefix}-m`}
            aria-label={`${label} month`}
            value={month}
            onChange={(e) => onMonth(e.target.value)}
            className="w-full appearance-none border-0 bg-transparent text-base sm:text-sm font-medium text-slate-900 outline-none cursor-pointer dark:text-slate-100 dark:bg-slate-950"
          >
            {MONTHS.map((name, i) => (
              <option key={name} value={String(i + 1).padStart(2, "0")} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex min-h-[48px] items-center rounded-lg border border-slate-300 bg-white px-3 dark:border-slate-700 dark:bg-slate-950">
          <select
            id={`${idPrefix}-y`}
            aria-label={`${label} year`}
            value={year}
            onChange={(e) => onYear(e.target.value)}
            className="w-full appearance-none border-0 bg-transparent text-base sm:text-sm font-medium text-slate-900 outline-none cursor-pointer dark:text-slate-100 dark:bg-slate-950"
          >
            {years.map((y) => (
              <option key={y} value={y} className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </fieldset>
  );
}

export function MortgageCalculator() {
  const [q, setQ] = useQueryStates(urlParsers, { history: "replace", scroll: false });
  const [fallbackStart] = useState(nextMonth);
  const input = useMemo(() => inputFromUrl(q, fallbackStart), [q, fallbackStart]);
  const result = useMemo(() => computeMortgage(input), [input]);
  const [tableMode, setTableMode] = useState<"annual" | "monthly">("annual");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [currency, setCurrency] = useState<string>("$");

  const startStr = q.start ?? fallbackStart;
  const xodStr = q.xod ?? startStr;
  const { register, handleSubmit, formState, watch, setValue, getValues, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      price: plain(input.price),
      down: plain(input.down),
      downPct: plain((input.down / input.price) * 100, 1),
      term: String(input.termYears) as FormValues["term"],
      rate: plain(input.ratePct, 3),
      startMonth: startStr.slice(5, 7),
      startYear: startStr.slice(0, 4),
      tax: plain(q.tax, 3),
      taxUnit: q.taxu,
      ins: plain(q.ins),
      pmi: plain(input.pmiPerYear),
      hoa: plain(q.hoa),
      xm: plain(q.xm),
      xy: plain(q.xy),
      xo: plain(q.xo),
      xoMonth: xodStr.slice(5, 7),
      xoYear: xodStr.slice(0, 4),
    },
  });

  // Keep form fields synced if query params change in the URL
  useEffect(() => {
    setValue("price", plain(input.price));
    setValue("down", plain(input.down));
    setValue("downPct", plain((input.down / input.price) * 100, 1));
    setValue("term", String(input.termYears) as FormValues["term"]);
    setValue("rate", plain(input.ratePct, 3));
    setValue("startMonth", startStr.slice(5, 7));
    setValue("startYear", startStr.slice(0, 4));
    setValue("pmi", plain(input.pmiPerYear));
  }, [input, startStr, setValue]);

  const errors = formState.errors;
  const term = watch("term");
  const taxUnit = watch("taxUnit");
  const watchedPrice = Number(watch("price")) || 0;
  const watchedDownPct = Number(watch("downPct")) || 0;
  const watchedRate = Number(watch("rate")) || 0;

  const fmtCurrency = (n: number, d = 0) =>
    currency + n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  // Down payment $ and % stay in sync + auto-adjust PMI
  const downField = register("down", {
    onChange: (e) => {
      const price = num(getValues("price"));
      if (price > 0) {
        const val = num(e.target.value);
        const pct = (val / price) * 100;
        setValue("downPct", plain(pct, 1));
        if (pct >= 20) {
          setValue("pmi", "0");
        } else {
          const loan = Math.max(0, price - val);
          setValue("pmi", plain(Math.round(loan * 0.0058)));
        }
      }
    },
  });
  const downPctField = register("downPct", {
    onChange: (e) => {
      const price = num(getValues("price"));
      const pct = num(e.target.value);
      const val = (price * pct) / 100;
      setValue("down", plain(val));
      if (pct >= 20) {
        setValue("pmi", "0");
      } else {
        const loan = Math.max(0, price - val);
        setValue("pmi", plain(Math.round(loan * 0.0058)));
      }
    },
  });
  const priceField = register("price", {
    onChange: (e) => {
      const p = num(e.target.value);
      const pct = num(getValues("downPct"));
      const val = (p * pct) / 100;
      setValue("down", plain(val));
      if (pct < 20) {
        const loan = Math.max(0, p - val);
        setValue("pmi", plain(Math.round(loan * 0.0058)));
      }
    },
  });

  function commit(v: FormValues) {
    void setQ({
      price: num(v.price),
      down: num(v.down),
      term: Number(v.term),
      rate: num(v.rate),
      start: `${v.startYear}-${v.startMonth}`,
      tax: num(v.tax),
      taxu: v.taxUnit,
      ins: num(v.ins),
      pmi: num(v.pmi),
      hoa: num(v.hoa),
      xm: num(v.xm),
      xy: num(v.xy),
      xo: num(v.xo),
      xod: num(v.xo) > 0 ? `${v.xoYear}-${v.xoMonth}` : null,
    });
  }

  function onReset() {
    reset({
      price: plain(DEFAULTS.price),
      down: plain(DEFAULTS.down),
      downPct: "20",
      term: "30",
      rate: plain(DEFAULTS.rate),
      startMonth: fallbackStart.slice(5, 7),
      startYear: fallbackStart.slice(0, 4),
      tax: plain(DEFAULTS.tax),
      taxUnit: DEFAULTS.taxu,
      ins: plain(DEFAULTS.ins),
      pmi: "0",
      hoa: "0",
      xm: "0",
      xy: "0",
      xo: "0",
      xoMonth: fallbackStart.slice(5, 7),
      xoYear: fallbackStart.slice(0, 4),
    });
    void setQ(null);
  }

  function downloadCSV() {
    let csv = "Period,Date,Monthly Payment,Principal,Interest,Extra,PMI,Ending Balance\r\n";
    result.rows.forEach((r) => {
      const date = `${MONTHS[r.month]} ${r.year}`;
      const payment = (r.principal + r.interest + r.extra + r.pmi).toFixed(2);
      csv += `${r.index + 1},"${date}",${payment},${r.principal.toFixed(2)},${r.interest.toFixed(2)},${r.extra.toFixed(2)},${r.pmi.toFixed(2)},${r.balance.toFixed(2)}\r\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `calc-digi-mortgage-amortization-schedule.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const m = result.monthly;
  const breakdown = [
    { key: "pi", label: "Principal & Interest", value: frequency === "monthly" ? m.pi : result.biweekly.payment },
    { key: "tax", label: "Property Tax", value: frequency === "monthly" ? m.tax : (m.tax * 12) / 26 },
    { key: "insurance", label: "Homeowners Insurance", value: frequency === "monthly" ? m.insurance : (m.insurance * 12) / 26 },
    { key: "pmi", label: "PMI", value: frequency === "monthly" ? m.pmi : (m.pmi * 12) / 26 },
    { key: "hoa", label: "HOA Fees", value: frequency === "monthly" ? m.hoa : (m.hoa * 12) / 26 },
  ] as const;

  const currentPayment = frequency === "monthly" 
    ? m.total 
    : result.biweekly.payment + ((m.tax + m.insurance + m.pmi + m.hoa) * 12) / 26;

  const hasExtras = input.extraMonthly > 0 || input.extraYearly > 0 || (input.extraOnce > 0 && input.extraOnceIndex >= 0);
  const monthsSaved = result.baseline.months - result.rows.length;
  const interestSaved = result.baseline.totalInterest - result.totalInterest;
  const payoffLabel = `${MONTHS[result.payoff.month]} ${result.payoff.year}`;
  const pmiNeeded = result.ltv > 0.8;

  const formPanel = (
    <form onSubmit={handleSubmit((v) => (commit(v), revealResult("mc-result")))} noValidate className={cn(card, "grid gap-5 p-5 sm:p-6")}>
      
      {/* Currency Switcher Pill Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Loan Parameters
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500">Currency:</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {CURRENCIES.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Home Price Input + Live Range Slider */}
      <div>
        <NumberField 
          id="mc-price" 
          label={
            <span className="flex items-center">
              Home price
              <InfoTooltip text="Total estimated purchase price of the property before down payment." />
            </span>
          }
          prefix={currency} 
          error={errors.price?.message} 
          {...priceField} 
        />
        <input
          type="range"
          min={50000}
          max={2000000}
          step={5000}
          value={Math.min(Math.max(watchedPrice, 50000), 2000000)}
          onChange={(e) => {
            const val = e.target.value;
            setValue("price", val);
            const currentDownPct = num(getValues("downPct")) || 20;
            setValue("down", plain((num(val) * currentDownPct) / 100));
            commit(getValues());
          }}
          className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-800"
          aria-label="Home price range slider"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>{currency}50k</span>
          <span>{currency}1M</span>
          <span>{currency}2M+</span>
        </div>
      </div>

      {/* Down payment Input + Live Range Slider */}
      <fieldset className="min-w-0">
        <legend className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 flex flex-wrap items-center gap-1">
          Down payment
          <InfoTooltip text="Cash you pay upfront. 20% or more eliminates Private Mortgage Insurance (PMI)." />
        </legend>
        <div className="grid grid-cols-[1fr_8.5rem] gap-3">
          <NumberField id="mc-down" aria-label="Down payment, amount" prefix={currency} error={errors.down?.message} {...downField} />
          <NumberField id="mc-down-pct" aria-label="Down payment, percent of price" suffix="%" error={errors.downPct?.message} {...downPctField} />
        </div>
        <input
          type="range"
          min={0}
          max={50}
          step={0.5}
          value={Math.min(Math.max(watchedDownPct, 0), 50)}
          onChange={(e) => {
            const pct = Number(e.target.value);
            setValue("downPct", plain(pct, 1));
            const currentPrice = num(getValues("price")) || DEFAULTS.price;
            const downVal = (currentPrice * pct) / 100;
            setValue("down", plain(downVal));
            if (pct >= 20) {
              setValue("pmi", "0");
            } else {
              const loan = Math.max(0, currentPrice - downVal);
              setValue("pmi", plain(Math.round(loan * 0.0058)));
            }
            commit(getValues());
          }}
          className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-800"
          aria-label="Down payment percentage range slider"
        />
        <div className="mt-1.5 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">0%</span>
          {watchedDownPct < 20 ? (
            <button
              type="button"
              onClick={() => {
                const currentPrice = num(getValues("price")) || DEFAULTS.price;
                setValue("downPct", "20");
                setValue("down", plain(currentPrice * 0.2));
                setValue("pmi", "0");
                commit(getValues());
              }}
              className="group inline-flex items-center gap-1.5 rounded-md border border-amber-200 bg-amber-50/90 px-2 py-0.5 font-medium text-amber-800 hover:bg-amber-100 hover:border-amber-300 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300 transition-colors"
              title="Click to set down payment to 20% and avoid PMI"
            >
              <span>⚠️ {plain(watchedDownPct, 1)}% (PMI applies)</span>
              <span className="font-semibold underline decoration-dotted group-hover:text-amber-950 dark:group-hover:text-white">
                Set 20% ({currency}{plain((num(getValues("price")) || DEFAULTS.price) * 0.2)}) to avoid PMI
              </span>
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
              ✓ {plain(watchedDownPct, 1)}% — No PMI Required (≥20% down)
            </span>
          )}
          <span className="text-slate-400">50%</span>
        </div>
      </fieldset>

      {/* Loan Term Selector */}
      <div>
        <Label>
          <span className="flex items-center">
            Loan term
            <InfoTooltip text="Length of the mortgage. 30-year offers lower monthly payments; 15-year saves substantial interest." />
          </span>
        </Label>
        <Segmented
          label="Loan term"
          value={term}
          onChange={(v) => {
            setValue("term", v);
            commit(getValues());
          }}
          options={TERMS.map((t) => ({ value: t, label: `${t} yrs` }))}
        />
      </div>

      {/* Interest Rate & First Payment */}
      <div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <NumberField 
              id="mc-rate" 
              label={
                <span className="flex items-center">
                  Interest rate
                  <InfoTooltip text="Annual Percentage Rate (APR) charged by your lender." />
                </span>
              } 
              hint="APR" 
              suffix="%" 
              error={errors.rate?.message} 
              {...register("rate")} 
            />
            <input
              type="range"
              min={1}
              max={15}
              step={0.125}
              value={Math.min(Math.max(watchedRate, 1), 15)}
              onChange={(e) => {
                setValue("rate", e.target.value);
                commit(getValues());
              }}
              className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-600 dark:bg-slate-800"
              aria-label="Interest rate range slider"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1%</span>
              <span>6.5%</span>
              <span>15%</span>
            </div>
          </div>
          <MonthYear
            idPrefix="mc-start"
            label="First payment"
            month={watch("startMonth")}
            year={watch("startYear")}
            onMonth={(v) => {
              setValue("startMonth", v);
              commit(getValues());
            }}
            onYear={(v) => {
              setValue("startYear", v);
              commit(getValues());
            }}
          />
        </div>
      </div>

      {/* Taxes & Fees Drawer */}
      <Disclosure
        title="Include taxes & fees"
        summary={fmtCurrency(m.tax + m.insurance + m.pmi + m.hoa) + "/mo"}
        defaultOpen
      >
        <div>
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="mc-tax" className="text-sm font-medium text-slate-700 dark:text-slate-300 flex flex-wrap items-center gap-1">
              Property tax (per year)
              <InfoTooltip text="Local county/state tax on the assessed home value (typically 0.5% - 2.2% annually)." />
            </label>
            <Segmented<TaxUnit>
              label="Property tax unit"
              value={taxUnit}
              onChange={(v) => {
                if (v === taxUnit) return;
                const price = num(getValues("price"));
                const t = num(getValues("tax"));
                if (price > 0) setValue("tax", plain(v === "usd" ? (price * t) / 100 : (t / price) * 100, v === "usd" ? 0 : 3));
                setValue("taxUnit", v);
                commit(getValues());
              }}
              options={[
                { value: "pct", label: "%" },
                { value: "usd", label: currency },
              ]}
              className="w-28 [&_button]:min-h-[32px] [&_button]:py-0"
            />
          </div>
          <NumberField
            id="mc-tax"
            prefix={taxUnit === "usd" ? currency : undefined}
            suffix={taxUnit === "pct" ? "% of price" : "/yr"}
            error={errors.tax?.message}
            {...register("tax")}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField 
            id="mc-ins" 
            label={
              <span className="flex flex-wrap items-center gap-1">
                Homeowners insurance
                <InfoTooltip text="Annual insurance protecting against property loss, fire, and casualty." />
              </span>
            } 
            prefix={currency} 
            suffix="/yr" 
            error={errors.ins?.message} 
            {...register("ins")} 
          />
          <NumberField
            id="mc-pmi"
            label={
              <span className="flex items-center">
                PMI
                <InfoTooltip text="Private Mortgage Insurance. Required if down payment is under 20% on conventional loans." />
              </span>
            }
            hint={pmiNeeded ? "Required (<20% down)" : "None (≥20% down)"}
            prefix={currency}
            suffix="/yr"
            error={errors.pmi?.message}
            {...register("pmi")}
          />
        </div>
        <NumberField 
          id="mc-hoa" 
          label={
            <span className="flex items-center">
              HOA fee
              <InfoTooltip text="Homeowners Association monthly maintenance or community amenity dues." />
            </span>
          } 
          prefix={currency} 
          suffix="/mo" 
          error={errors.hoa?.message} 
          {...register("hoa")} 
        />
      </Disclosure>

      {/* Extra Payments Drawer */}
      <Disclosure title="Extra payments" summary={hasExtras ? `Saves ${fmtCurrency(interestSaved)}` : undefined}>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="mc-xm" label="Extra monthly" prefix={currency} suffix="/mo" error={errors.xm?.message} {...register("xm")} />
          <NumberField id="mc-xy" label="Extra yearly" hint="every 12th payment" prefix={currency} suffix="/yr" error={errors.xy?.message} {...register("xy")} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="mc-xo" label="One-time payment" prefix={currency} error={errors.xo?.message} {...register("xo")} />
          <MonthYear
            idPrefix="mc-xo"
            label="Paid in"
            month={watch("xoMonth")}
            year={watch("xoYear")}
            onMonth={(v) => setValue("xoMonth", v)}
            onYear={(v) => setValue("xoYear", v)}
          />
        </div>
      </Disclosure>

      <Button type="submit" className="w-full text-base bg-[#18533b] hover:bg-[#12402d] text-white">
        Calculate Payment
      </Button>
    </form>
  );

  const resultPanel = (
    <section id="mc-result" aria-labelledby="mc-result-h" className={cn(card, "scroll-mt-20 p-5 sm:p-6")}>
      
      {/* Payment Frequency Switcher: Monthly vs Accelerated Bi-Weekly */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <h2 id="mc-result-h" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {frequency === "monthly" ? "Monthly Payment" : "Bi-Weekly Payment (Accelerated)"}
        </h2>
        <Segmented<Frequency>
          label="Payment frequency"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "biweekly", label: "Bi-Weekly" },
          ]}
          className="w-44 [&_button]:min-h-[30px] [&_button]:text-xs [&_button]:py-0"
        />
      </div>

      <div aria-live="polite" aria-atomic="true">
        <p className="mt-3 text-5xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
          {fmtCurrency(currentPayment, 2)}
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {fmtCurrency(result.loan)} loan · {input.termYears}-yr fixed at {input.ratePct}%
        </p>

        {frequency === "biweekly" ? (
          <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-900 dark:text-emerald-200 border border-emerald-200/80 dark:border-emerald-800/60">
            ⚡ <strong>Accelerated Bi-Weekly Advantage:</strong> By making 26 bi-weekly payments of <strong>{fmtCurrency(result.biweekly.payment, 2)}</strong> (P&amp;I), you pay off your loan <strong>{result.biweekly.yearsSaved} years earlier</strong> and save <strong>{fmtCurrency(result.biweekly.interestSaved)}</strong> in total interest!
          </div>
        ) : null}

        {/* Visual Donut Chart & Breakdown */}
        <div className="mt-5 grid items-center gap-5 sm:grid-cols-[180px_1fr] lg:grid-cols-1 xl:grid-cols-[180px_1fr]">
          <BreakdownDonut
            data={breakdown.filter((b) => b.value > 0).map((b) => ({ name: b.label, value: b.value, color: SEGMENT_COLORS[b.key] }))}
          />
          <ul className="grid gap-2 text-sm">
            {breakdown.map((b) => (
              <li key={b.key} className={cn("flex items-center gap-2", b.value === 0 && "opacity-50")}>
                <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[b.key] }} />
                <span className="flex-1 text-slate-600 dark:text-slate-400">{b.label}</span>
                <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">{fmtCurrency(b.value, 2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Loan Metrics Table */}
        <dl className="mt-5 divide-y divide-slate-200 border-t border-slate-200 text-sm dark:divide-slate-800 dark:border-slate-800">
          {[
            ["Loan amount", fmtCurrency(result.loan)],
            ["Down payment", `${fmtCurrency(input.down)} (${plain((input.down / input.price) * 100, 1)}%)`],
            [`Total of ${result.rows.length} payments`, fmtCurrency(result.totalPrincipal + result.totalInterest + result.totalPmi)],
            ["Total interest paid", fmtCurrency(result.totalInterest)],
            ...(result.totalPmi > 0 ? [["Total PMI paid", fmtCurrency(result.totalPmi)]] : []),
            ["Projected payoff date", payoffLabel],
            ...(result.pmiMonths > 0
              ? [
                  [
                    "PMI cancellation date",
                    `After ${result.pmiMonths} payments (${MONTHS[(input.start.month + result.pmiMonths) % 12]} ${
                      input.start.year + Math.floor((input.start.month + result.pmiMonths) / 12)
                    } · 78% LTV)`,
                  ],
                ]
              : []),
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600 dark:text-slate-400 leading-snug flex-1 min-w-0 pr-2 break-words">{k}</dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100 leading-snug break-words shrink-0 max-w-[50%]">{v}</dd>
            </div>
          ))}
        </dl>

        {hasExtras && monthsSaved > 0 ? (
          <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            Extra payments save <strong>{fmtCurrency(interestSaved)}</strong> in interest and pay the loan off{" "}
            <strong>
              {Math.floor(monthsSaved / 12) > 0 ? `${Math.floor(monthsSaved / 12)} yr ` : ""}
              {monthsSaved % 12 > 0 ? `${monthsSaved % 12} mo ` : ""}
            </strong>
            early.
          </p>
        ) : null}
      </div>
      <ResultActions onReset={onReset} title="Mortgage Calculator" />
    </section>
  );

  return (
    <>
      <ToolGrid form={formPanel} result={resultPanel} />

      {/* Amortization Schedule with CSV Download Button */}
      <section aria-labelledby="mc-amort-h" className={cn(card, "mt-8 p-5 sm:p-6")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="mc-amort-h" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Amortization Schedule
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Complete year-by-year and month-by-month loan principal &amp; interest breakdown.
            </p>
          </div>
          
          <div className="flex items-center gap-2.5">
            <Segmented
              label="Schedule view"
              value={tableMode}
              onChange={setTableMode}
              options={[
                { value: "annual", label: "Yearly" },
                { value: "monthly", label: "Monthly" },
              ]}
              className="fx-no-print w-48"
            />
            <Button
              type="button"
              variant="outline"
              onClick={downloadCSV}
              className="fx-no-print flex items-center gap-1.5 text-xs font-semibold py-2 px-3 border border-slate-200 dark:border-slate-700 hover:border-emerald-500"
              title="Download full 30-year schedule to Excel/CSV"
            >
              <span>📥</span> Export CSV
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <BalanceChart years={result.years} startYear={input.start.year} loan={result.loan} />
        </div>

        <div className="mt-6 max-h-[560px] overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[560px] text-right text-sm tabular-nums">
            <thead className="sticky top-0 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-2xs">
              <tr>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">
                  {tableMode === "annual" ? "Year" : "Payment Date"}
                </th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Interest</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Principal</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Ending Balance</th>
              </tr>
            </thead>
            <tbody>
              {tableMode === "annual"
                ? result.years.map((y) => (
                    <tr key={y.year} className="border-t border-slate-200 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="px-4 py-2 text-left font-medium">{y.year}</td>
                      <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{fmtCurrency(y.interest, 2)}</td>
                      <td className="px-4 py-2 font-semibold text-emerald-700 dark:text-emerald-400">{fmtCurrency(y.principal, 2)}</td>
                      <td className="px-4 py-2 text-slate-900 dark:text-slate-100">{fmtCurrency(y.balance, 2)}</td>
                    </tr>
                  ))
                : result.rows.map((r) => (
                    <tr
                      key={r.index}
                      className={cn(
                        "border-t border-slate-200 hover:bg-slate-50/70 dark:border-slate-800 dark:hover:bg-slate-900/40 transition-colors",
                        r.month === 11 && "border-b-2 border-b-slate-300 dark:border-b-slate-700"
                      )}
                    >
                      <td className="px-4 py-2 text-left font-medium">
                        {r.index + 1}. {MONTHS[r.month]} {r.year}
                      </td>
                      <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{fmtCurrency(r.interest, 2)}</td>
                      <td className="px-4 py-2 font-semibold text-emerald-700 dark:text-emerald-400">{fmtCurrency(r.principal + r.extra, 2)}</td>
                      <td className="px-4 py-2 text-slate-900 dark:text-slate-100">{fmtCurrency(r.balance, 2)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
