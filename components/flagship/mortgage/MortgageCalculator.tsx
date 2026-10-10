"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseAsFloat, parseAsInteger, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { Label, NumberField, fieldBox } from "@/components/ui/field";
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
  pi: "#2563eb",
  tax: "#f59e0b",
  insurance: "#10b981",
  pmi: "#8b5cf6",
  hoa: "#64748b",
} as const;

const TERMS = ["10", "15", "20", "30"] as const;
type TaxUnit = "pct" | "usd";

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

const usd = (n: number, d = 0) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d });
const num = (s: string) => (s.trim() === "" ? 0 : Number(s));
const plain = (n: number, d = 2) => String(Math.round(n * 10 ** d) / 10 ** d);

/** Coerce URL state into a safe input; anything out of range falls back to defaults. */
function inputFromUrl(q: ReturnType<typeof useQueryStates<typeof urlParsers>>[0], fallbackStart: string): MortgageInput {
  const ok = (n: number, min: number, max: number) => Number.isFinite(n) && n >= min && n <= max;
  const price = ok(q.price, 1000, 1e9) ? q.price : DEFAULTS.price;
  const down = ok(q.down, 0, price - 1) ? q.down : Math.min(DEFAULTS.down, price * 0.2);
  const term = (TERMS as readonly string[]).includes(String(q.term)) ? q.term : DEFAULTS.term;
  const start = parseYm(q.start, fallbackStart);
  const xod = parseYm(q.xod, fallbackStart);
  const pos = (n: number, max: number) => (ok(n, 0, max) ? n : 0);
  const tax = pos(q.tax, q.taxu === "pct" ? 10 : 1e7);
  return {
    price,
    down,
    termYears: term,
    ratePct: ok(q.rate, 0, 30) ? q.rate : DEFAULTS.rate,
    start,
    propertyTaxPerYear: q.taxu === "pct" ? (price * tax) / 100 : tax,
    insurancePerYear: pos(q.ins, 1e6),
    pmiPerYear: pos(q.pmi, 1e6),
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
  const thisYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => String(thisYear - 10 + i));
  const select =
    "w-full min-w-0 appearance-none border-0 bg-transparent px-3 text-base text-slate-900 outline-none dark:text-slate-100";
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</legend>
      <div className="grid grid-cols-2 gap-3">
        <div className={fieldBox()}>
          <select id={`${idPrefix}-month`} aria-label={`${label} month`} value={month} onChange={(e) => onMonth(e.target.value)} className={select}>
            {MONTHS.map((m, i) => (
              <option key={m} value={String(i + 1).padStart(2, "0")}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className={fieldBox()}>
          <select id={`${idPrefix}-year`} aria-label={`${label} year`} value={year} onChange={(e) => onYear(e.target.value)} className={select}>
            {years.map((y) => (
              <option key={y}>{y}</option>
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

  const startStr = q.start ?? fallbackStart;
  const xodStr = q.xod ?? startStr;
  const { register, handleSubmit, formState, watch, setValue, getValues, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      price: plain(input.price),
      down: plain(input.down),
      downPct: plain((input.down / input.price) * 100),
      term: String(input.termYears) as FormValues["term"],
      rate: plain(input.ratePct, 3),
      startMonth: startStr.slice(5, 7),
      startYear: startStr.slice(0, 4),
      tax: plain(q.tax, 3),
      taxUnit: q.taxu,
      ins: plain(q.ins),
      pmi: plain(q.pmi),
      hoa: plain(q.hoa),
      xm: plain(q.xm),
      xy: plain(q.xy),
      xo: plain(q.xo),
      xoMonth: xodStr.slice(5, 7),
      xoYear: xodStr.slice(0, 4),
    },
  });
  const errors = formState.errors;
  const term = watch("term");
  const taxUnit = watch("taxUnit");

  // Down payment $ and % stay in sync; changing the price keeps the % fixed.
  const downField = register("down", {
    onChange: (e) => {
      const price = num(getValues("price"));
      if (price > 0) setValue("downPct", plain((num(e.target.value) / price) * 100));
    },
  });
  const downPctField = register("downPct", {
    onChange: (e) => setValue("down", plain((num(getValues("price")) * num(e.target.value)) / 100)),
  });
  const priceField = register("price", {
    onChange: (e) => setValue("down", plain((num(e.target.value) * num(getValues("downPct"))) / 100)),
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

  const m = result.monthly;
  const breakdown = [
    { key: "pi", label: "Principal & Interest", value: m.pi },
    { key: "tax", label: "Property Tax", value: m.tax },
    { key: "insurance", label: "Homeowners Insurance", value: m.insurance },
    { key: "pmi", label: "PMI", value: m.pmi },
    { key: "hoa", label: "HOA Fees", value: m.hoa },
  ] as const;
  const hasExtras = input.extraMonthly > 0 || input.extraYearly > 0 || (input.extraOnce > 0 && input.extraOnceIndex >= 0);
  const monthsSaved = result.baseline.months - result.rows.length;
  const interestSaved = result.baseline.totalInterest - result.totalInterest;
  const payoffLabel = `${MONTHS[result.payoff.month]} ${result.payoff.year}`;
  const pmiNeeded = result.ltv > 0.8;

  const formPanel = (
    <form onSubmit={handleSubmit((v) => (commit(v), revealResult("mc-result")))} noValidate className={cn(card, "grid gap-5 p-5 sm:p-6")}>
      <NumberField id="mc-price" label="Home price" prefix="$" error={errors.price?.message} {...priceField} />

      <fieldset className="min-w-0">
        <legend className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">Down payment</legend>
        <div className="grid grid-cols-[1fr_8.5rem] gap-3">
          <NumberField id="mc-down" aria-label="Down payment, dollars" prefix="$" error={errors.down?.message} {...downField} />
          <NumberField id="mc-down-pct" aria-label="Down payment, percent of price" suffix="%" error={errors.downPct?.message} {...downPctField} />
        </div>
      </fieldset>

      <div>
        <Label>Loan term</Label>
        <Segmented
          label="Loan term"
          value={term}
          onChange={(v) => setValue("term", v)}
          options={TERMS.map((t) => ({ value: t, label: `${t} yrs` }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField id="mc-rate" label="Interest rate" hint="APR" suffix="%" error={errors.rate?.message} {...register("rate")} />
        <MonthYear
          idPrefix="mc-start"
          label="First payment"
          month={watch("startMonth")}
          year={watch("startYear")}
          onMonth={(v) => setValue("startMonth", v)}
          onYear={(v) => setValue("startYear", v)}
        />
      </div>

      <Disclosure
        title="Include taxes & fees"
        summary={usd(m.tax + m.insurance + m.pmi + m.hoa) + "/mo"}
        defaultOpen
      >
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <label htmlFor="mc-tax" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Property tax (per year)
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
              }}
              options={[
                { value: "pct", label: "%" },
                { value: "usd", label: "$" },
              ]}
              className="w-28 [&_button]:min-h-[32px] [&_button]:py-0"
            />
          </div>
          <NumberField
            id="mc-tax"
            prefix={taxUnit === "usd" ? "$" : undefined}
            suffix={taxUnit === "pct" ? "% of price" : "/yr"}
            error={errors.tax?.message}
            {...register("tax")}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="mc-ins" label="Homeowners insurance" prefix="$" suffix="/yr" error={errors.ins?.message} {...register("ins")} />
          <NumberField
            id="mc-pmi"
            label="PMI"
            hint={pmiNeeded ? "Likely required (<20% down)" : undefined}
            prefix="$"
            suffix="/yr"
            error={errors.pmi?.message}
            {...register("pmi")}
          />
        </div>
        <NumberField id="mc-hoa" label="HOA fee" prefix="$" suffix="/mo" error={errors.hoa?.message} {...register("hoa")} />
      </Disclosure>

      <Disclosure title="Extra payments" summary={hasExtras ? `Saves ${usd(interestSaved)}` : undefined}>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="mc-xm" label="Extra monthly" prefix="$" suffix="/mo" error={errors.xm?.message} {...register("xm")} />
          <NumberField id="mc-xy" label="Extra yearly" hint="every 12th payment" prefix="$" suffix="/yr" error={errors.xy?.message} {...register("xy")} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="mc-xo" label="One-time payment" prefix="$" error={errors.xo?.message} {...register("xo")} />
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

      <Button type="submit" className="w-full text-base">
        Calculate
      </Button>
    </form>
  );

  const resultPanel = (
    <section id="mc-result" aria-labelledby="mc-result-h" className={cn(card, "scroll-mt-20 p-5 sm:p-6")}>
      <h2 id="mc-result-h" className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Monthly payment
      </h2>
      <div aria-live="polite" aria-atomic="true">
        <p className="mt-1 text-5xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
          {usd(m.total, 2)}
        </p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {usd(result.loan)} loan · {input.termYears}-yr fixed at {input.ratePct}%
        </p>

        <div className="mt-5 grid items-center gap-5 sm:grid-cols-[180px_1fr] lg:grid-cols-1 xl:grid-cols-[180px_1fr]">
          <BreakdownDonut
            data={breakdown.filter((b) => b.value > 0).map((b) => ({ name: b.label, value: b.value, color: SEGMENT_COLORS[b.key] }))}
          />
          <ul className="grid gap-2 text-sm">
            {breakdown.map((b) => (
              <li key={b.key} className={cn("flex items-center gap-2", b.value === 0 && "opacity-50")}>
                <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: SEGMENT_COLORS[b.key] }} />
                <span className="flex-1 text-slate-600 dark:text-slate-400">{b.label}</span>
                <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">{usd(b.value, 2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-5 divide-y divide-slate-200 border-t border-slate-200 text-sm dark:divide-slate-800 dark:border-slate-800">
          {[
            ["Loan amount", usd(result.loan)],
            ["Down payment", `${usd(input.down)} (${plain((input.down / input.price) * 100, 1)}%)`],
            [`Total of ${result.rows.length} payments`, usd(result.totalPrincipal + result.totalInterest)],
            ["Total interest", usd(result.totalInterest)],
            ["Payoff date", payoffLabel],
            ...(result.pmiMonths > 0 ? [["PMI ends", `after ${result.pmiMonths} payments`]] : []),
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600 dark:text-slate-400">{k}</dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100">{v}</dd>
            </div>
          ))}
        </dl>

        {hasExtras && monthsSaved > 0 ? (
          <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
            Extra payments save <strong>{usd(interestSaved)}</strong> in interest and pay the loan off{" "}
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

      <section aria-labelledby="mc-amort-h" className={cn(card, "mt-6 p-5 sm:p-6")}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="mc-amort-h" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Amortization schedule
          </h2>
          <Segmented
            label="Schedule view"
            value={tableMode}
            onChange={setTableMode}
            options={[
              { value: "annual", label: "Yearly" },
              { value: "monthly", label: "Monthly" },
            ]}
            className="fx-no-print w-56"
          />
        </div>

        <div className="mt-4">
          <BalanceChart years={result.years} startYear={input.start.year} loan={result.loan} />
        </div>

        <div className="mt-6 max-h-[560px] overflow-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[560px] text-right text-sm tabular-nums">
            <thead className="sticky top-0 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th scope="col" className="px-4 py-2.5 text-left font-semibold">
                  {tableMode === "annual" ? "Year" : "Date"}
                </th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Interest</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Principal</th>
                <th scope="col" className="px-4 py-2.5 font-semibold">Ending balance</th>
              </tr>
            </thead>
            <tbody>
              {tableMode === "annual"
                ? result.years.map((y) => (
                    <tr key={y.year} className="border-t border-slate-200 dark:border-slate-800">
                      <td className="px-4 py-2 text-left font-medium">{y.year}</td>
                      <td className="px-4 py-2">{usd(y.interest, 2)}</td>
                      <td className="px-4 py-2">{usd(y.principal, 2)}</td>
                      <td className="px-4 py-2">{usd(y.balance, 2)}</td>
                    </tr>
                  ))
                : result.rows.map((r) => (
                    <tr
                      key={r.index}
                      className={cn("border-t border-slate-200 dark:border-slate-800", r.month === 11 && "border-b-2 border-b-slate-300 dark:border-b-slate-700")}
                    >
                      <td className="px-4 py-2 text-left font-medium">
                        {r.index + 1}. {MONTHS[r.month]} {r.year}
                      </td>
                      <td className="px-4 py-2">{usd(r.interest, 2)}</td>
                      <td className="px-4 py-2">{usd(r.principal + r.extra, 2)}</td>
                      <td className="px-4 py-2">{usd(r.balance, 2)}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
