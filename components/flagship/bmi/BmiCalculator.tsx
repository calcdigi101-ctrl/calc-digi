"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parseAsFloat, parseAsStringLiteral, useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { NumberField, Label } from "@/components/ui/field";
import { Segmented } from "@/components/ui/segmented";
import { ResultActions } from "@/components/flagship/ResultActions";
import { ToolGrid, card, revealResult } from "@/components/flagship/shell";
import { BmiGauge } from "./BmiGauge";
import {
  BMI_LIMITS,
  HEALTHY_MAX,
  HEALTHY_MIN,
  LB_TO_KG,
  WHO_CLASSES,
  computeBmi,
  metricToUs,
  usToMetric,
} from "@/lib/bmi";
import { cn } from "@/lib/cn";

type Unit = "us" | "metric";
type Sex = "male" | "female";

const DEFAULTS = { u: "us" as Unit, age: 25, sex: "male" as Sex, ft: 5, in: 10, lb: 160, cm: 180, kg: 65 };

// The URL is the committed calculation, so any result can be bookmarked or shared.
const urlParsers = {
  u: parseAsStringLiteral(["us", "metric"] as const).withDefault(DEFAULTS.u),
  age: parseAsFloat.withDefault(DEFAULTS.age),
  sex: parseAsStringLiteral(["male", "female"] as const).withDefault(DEFAULTS.sex),
  ft: parseAsFloat.withDefault(DEFAULTS.ft),
  in: parseAsFloat.withDefault(DEFAULTS.in),
  lb: parseAsFloat.withDefault(DEFAULTS.lb),
  cm: parseAsFloat.withDefault(DEFAULTS.cm),
  kg: parseAsFloat.withDefault(DEFAULTS.kg),
};

const LABELS: Record<keyof typeof BMI_LIMITS, string> = {
  age: "Age",
  ft: "Feet",
  inch: "Inches",
  lb: "Weight",
  cm: "Height",
  kg: "Weight",
};

// Form values stay as strings (what the inputs hold); validation depends on the active unit system.
const schema = z
  .object({
    unit: z.enum(["us", "metric"]),
    sex: z.enum(["male", "female"]),
    age: z.string(),
    ft: z.string(),
    inch: z.string(),
    lb: z.string(),
    cm: z.string(),
    kg: z.string(),
  })
  .superRefine((v, ctx) => {
    const keys: (keyof typeof BMI_LIMITS)[] = v.unit === "us" ? ["age", "ft", "inch", "lb"] : ["age", "cm", "kg"];
    for (const key of keys) {
      const raw = v[key].trim();
      const [min, max] = BMI_LIMITS[key];
      const n = Number(raw);
      if (raw === "") ctx.addIssue({ code: "custom", path: [key], message: `${LABELS[key]} is required` });
      else if (!Number.isFinite(n)) ctx.addIssue({ code: "custom", path: [key], message: "Enter a valid number" });
      else if (n < min || n > max)
        ctx.addIssue({ code: "custom", path: [key], message: `${LABELS[key]} must be between ${min} and ${Math.ceil(max)}` });
    }
  });

type FormValues = z.infer<typeof schema>;

const fmt = (n: number, d = 1) => n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
const str = (n: number, d = 1) => String(Math.round(n * 10 ** d) / 10 ** d);

function within(n: number, key: keyof typeof BMI_LIMITS) {
  return Number.isFinite(n) && n >= BMI_LIMITS[key][0] && n <= BMI_LIMITS[key][1];
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group/tip relative ml-1 inline-flex cursor-help items-center text-slate-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-400">
      <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
      <span className="pointer-events-none invisible opacity-0 group-hover/tip:visible group-hover/tip:opacity-100 absolute bottom-full right-0 mb-2 whitespace-normal rounded-xl bg-slate-900 px-2.5 py-1.5 text-xs font-normal text-white shadow-xl transition-all duration-150 dark:bg-slate-800 w-52 z-50 text-center leading-snug">
        {text}
      </span>
    </span>
  );
}

export function BmiCalculator() {
  const [q, setQ] = useQueryStates(urlParsers, { history: "replace", scroll: false });

  // Never trust hand-edited URLs: out-of-range params fall back to defaults.
  const age = within(q.age, "age") ? q.age : DEFAULTS.age;
  const usOk = within(q.ft, "ft") && within(q.in, "inch") && within(q.lb, "lb");
  const metricOk = within(q.cm, "cm") && within(q.kg, "kg");
  const committed =
    q.u === "us"
      ? usToMetric(usOk ? q.ft : DEFAULTS.ft, usOk ? q.in : DEFAULTS.in, usOk ? q.lb : DEFAULTS.lb)
      : { cm: metricOk ? q.cm : DEFAULTS.cm, kg: metricOk ? q.kg : DEFAULTS.kg };
  const result = computeBmi(committed.cm, committed.kg);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      unit: q.u,
      sex: q.sex,
      age: str(age, 0),
      ft: str(q.ft, 0),
      inch: str(q.in),
      lb: str(q.lb),
      cm: str(q.cm),
      kg: str(q.kg),
    },
  });
  const { register, handleSubmit, formState, watch, setValue, getValues, reset } = form;
  const unit = watch("unit");
  const sex = watch("sex");
  const errors = formState.errors;

  function commit(v: FormValues) {
    const common = { age: Number(v.age), sex: v.sex };
    if (v.unit === "us") {
      void setQ({ ...common, u: "us", ft: Number(v.ft), in: Number(v.inch), lb: Number(v.lb), cm: null, kg: null });
    } else {
      void setQ({ ...common, u: "metric", cm: Number(v.cm), kg: Number(v.kg), ft: null, in: null, lb: null });
    }
  }

  // Switching units converts whatever is entered, so nothing typed is lost.
  function switchUnit(next: Unit) {
    if (next === unit) return;
    const v = getValues();
    if (next === "metric") {
      const ft = Number(v.ft), inch = Number(v.inch), lb = Number(v.lb);
      if (v.ft.trim() && v.inch.trim() && Number.isFinite(ft) && Number.isFinite(inch)) setValue("cm", str(usToMetric(ft, inch, 0).cm));
      if (v.lb.trim() && Number.isFinite(lb)) setValue("kg", str(lb * LB_TO_KG));
    } else {
      const cm = Number(v.cm), kg = Number(v.kg);
      if (v.cm.trim() && Number.isFinite(cm)) {
        const us = metricToUs(cm, 0);
        setValue("ft", str(us.ft, 0));
        setValue("inch", str(us.inch));
      }
      if (v.kg.trim() && Number.isFinite(kg)) setValue("lb", str(kg / LB_TO_KG));
    }
    setValue("unit", next);
    form.clearErrors();
    void handleSubmit(commit)();
  }

  function onReset() {
    reset({
      unit: DEFAULTS.u,
      sex: DEFAULTS.sex,
      age: str(DEFAULTS.age, 0),
      ft: str(DEFAULTS.ft, 0),
      inch: str(DEFAULTS.in),
      lb: str(DEFAULTS.lb),
      cm: str(DEFAULTS.cm),
      kg: str(DEFAULTS.kg),
    });
    void setQ(null);
  }

  const isUs = q.u === "us";
  const weightLabel = (kg: number) => (isUs ? `${fmt(kg / LB_TO_KG)} lbs` : `${fmt(kg)} kg`);

  const formPanel = (
    <form onSubmit={handleSubmit((v) => (commit(v), revealResult("bmi-result")))} noValidate className={cn(card, "p-3.5 sm:p-6 w-full max-w-full overflow-hidden")}>
      <Segmented<Unit>
        label="Unit system"
        value={unit}
        onChange={switchUnit}
        options={[
          { value: "us", label: "US Customary", sublabel: "ft, in, lbs" },
          { value: "metric", label: "Metric", sublabel: "cm, kg" },
        ]}
      />

      <div className="mt-5 grid gap-4 sm:gap-5 sm:grid-cols-2">
        <NumberField id="bmi-age" label="Age" hint="2 – 120" suffix="years" error={errors.age?.message} {...register("age")} />
        <div>
          <Label>Gender</Label>
          <Segmented<Sex>
            label="Gender"
            value={sex}
            onChange={(v) => setValue("sex", v)}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
        </div>
      </div>

      {unit === "us" ? (
        <div className="mt-5 grid gap-4 sm:gap-5 sm:grid-cols-2">
          <fieldset className="min-w-0">
            <legend className="mb-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Height</legend>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <NumberField
                id="bmi-ft"
                aria-label="Height, feet"
                suffix="ft"
                error={errors.ft?.message}
                {...register("ft")}
              />
              <NumberField
                id="bmi-in"
                aria-label="Height, inches"
                suffix="in"
                error={errors.inch?.message}
                {...register("inch")}
              />
            </div>
          </fieldset>
          <NumberField
            id="bmi-lb"
            label="Weight"
            unitDropdown={{
              value: "lbs",
              options: [
                { value: "lbs", label: "lbs" },
                { value: "kg", label: "kg" },
              ],
              onChange: (v) => { if (v === "kg") switchUnit("metric"); },
            }}
            error={errors.lb?.message}
            {...register("lb")}
          />
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:gap-5 sm:grid-cols-2">
          <NumberField
            id="bmi-cm"
            label="Height"
            suffix="cm"
            error={errors.cm?.message}
            {...register("cm")}
          />
          <NumberField
            id="bmi-kg"
            label="Weight"
            unitDropdown={{
              value: "kg",
              options: [
                { value: "kg", label: "kg" },
                { value: "lbs", label: "lbs" },
              ],
              onChange: (v) => { if (v === "lbs") switchUnit("us"); },
            }}
            error={errors.kg?.message}
            {...register("kg")}
          />
        </div>
      )}

      <Button type="submit" className="mt-6 w-full text-base">
        Calculate
      </Button>
    </form>
  );

  const resultPanel = (
    <section id="bmi-result" aria-labelledby="bmi-result-h" className={cn(card, "scroll-mt-20 p-3.5 sm:p-6 w-full max-w-full overflow-hidden")}>
      <h2 id="bmi-result-h" className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Your result
      </h2>
      {result ? (
        <div aria-live="polite" aria-atomic="true">
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <p className="text-5xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-white">
              {fmt(result.bmi)}
              <span className="ml-1.5 font-sans text-lg font-semibold text-slate-500 dark:text-slate-400">kg/m²</span>
            </p>
            <span
              className="rounded-full px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: result.category.color }}
            >
              {result.category.label === "Normal" ? "Normal Weight" : result.category.label}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            WHO class: <strong className="font-semibold text-slate-800 dark:text-slate-200">{WHO_CLASSES[result.whoClassIndex].label}</strong>
          </p>

          <div className="mt-5">
            <BmiGauge bmi={result.bmi} />
          </div>

          {age < 20 ? (
            <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              For ages 2–19, BMI is interpreted with sex- and age-specific growth percentiles, not the adult categories shown
              here. Ask a pediatrician to plot this BMI on a CDC growth chart.
            </p>
          ) : null}

          <dl className="mt-5 divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600 dark:text-slate-400 leading-snug flex-1 min-w-0 pr-2 break-words">Healthy BMI range</dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100 leading-snug break-words shrink-0 max-w-[50%]">{`${HEALTHY_MIN} – ${HEALTHY_MAX} kg/m²`}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600 dark:text-slate-400 leading-snug flex-1 min-w-0 pr-2 break-words">Healthy weight for your height</dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100 leading-snug break-words shrink-0 max-w-[50%]">{`${weightLabel(result.healthyKg[0])} – ${weightLabel(result.healthyKg[1])}`}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-slate-600 dark:text-slate-400 leading-snug flex-1 min-w-0 pr-2 break-words">
                {result.deltaToHealthyKg === 0
                  ? "Distance to healthy range"
                  : result.deltaToHealthyKg < 0
                    ? `Lose to reach BMI ${HEALTHY_MAX}`
                    : `Gain to reach BMI ${HEALTHY_MIN}`}
              </dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100 leading-snug break-words shrink-0 max-w-[50%]">
                {result.deltaToHealthyKg === 0 ? "Within range" : weightLabel(Math.abs(result.deltaToHealthyKg))}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="flex items-center text-slate-600 dark:text-slate-400">
                BMI Prime
                <InfoTooltip text="Ratio of your BMI to the upper healthy limit (25). Values from 0.74 to 1.00 indicate a healthy weight." />
              </dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100 leading-snug break-words shrink-0 max-w-[50%]">{fmt(result.prime, 2)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="flex items-center text-slate-600 dark:text-slate-400">
                Ponderal Index
                <InfoTooltip text="Height-cubed index (weight ÷ height³) that scales more accurately for very tall or very short people." />
              </dt>
              <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100 leading-snug break-words shrink-0 max-w-[50%]">{`${fmt(result.ponderal)} kg/m³`}</dd>
            </div>
          </dl>

          {result.deltaToHealthyKg !== 0 ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-950/50">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {result.deltaToHealthyKg < 0 ? "Targeting a healthy weight loss?" : "Targeting healthy weight gain?"}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {result.deltaToHealthyKg < 0
                      ? `Losing ${weightLabel(Math.abs(result.deltaToHealthyKg))} safely requires a balanced daily caloric deficit.`
                      : `Gaining ${weightLabel(Math.abs(result.deltaToHealthyKg))} safely requires a daily caloric surplus.`}
                  </p>
                </div>
                <a
                  href="/calculators/health/calorie-calculator"
                  className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm !no-underline"
                >
                  Calorie Plan →
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 dark:border-emerald-950/40 dark:bg-emerald-950/20">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200">
                    🎉 You are in the healthy weight range!
                  </p>
                  <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80">
                    Maintain your optimal weight by balancing daily energy expenditure.
                  </p>
                </div>
                <a
                  href="/calculators/health/tdee-calculator"
                  className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm !no-underline"
                >
                  Check TDEE →
                </a>
              </div>
            </div>
          )}
        </div>
      ) : null}
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        For informational purposes only — not medical advice.
      </p>
      <ResultActions onReset={onReset} title="BMI Calculator" />
    </section>
  );

  return <ToolGrid form={formPanel} result={resultPanel} />;
}
