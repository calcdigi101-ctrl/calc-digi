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
    <form onSubmit={handleSubmit((v) => (commit(v), revealResult("bmi-result")))} noValidate className={cn(card, "p-5 sm:p-6")}>
      <Segmented<Unit>
        label="Unit system"
        value={unit}
        onChange={switchUnit}
        options={[
          { value: "us", label: "US Customary", sublabel: "ft, in, lbs" },
          { value: "metric", label: "Metric", sublabel: "cm, kg" },
        ]}
      />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
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
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <fieldset className="min-w-0">
            <legend className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">Height</legend>
            <div className="grid grid-cols-2 gap-3">
              <NumberField id="bmi-ft" aria-label="Height, feet" suffix="ft" error={errors.ft?.message} {...register("ft")} />
              <NumberField id="bmi-in" aria-label="Height, inches" suffix="in" error={errors.inch?.message} {...register("inch")} />
            </div>
          </fieldset>
          <NumberField id="bmi-lb" label="Weight" suffix="lbs" error={errors.lb?.message} {...register("lb")} />
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <NumberField id="bmi-cm" label="Height" suffix="cm" error={errors.cm?.message} {...register("cm")} />
          <NumberField id="bmi-kg" label="Weight" suffix="kg" error={errors.kg?.message} {...register("kg")} />
        </div>
      )}

      <Button type="submit" className="mt-6 w-full text-base">
        Calculate
      </Button>
    </form>
  );

  const resultPanel = (
    <section id="bmi-result" aria-labelledby="bmi-result-h" className={cn(card, "scroll-mt-20 p-5 sm:p-6")}>
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
            {[
              ["Healthy BMI range", `${HEALTHY_MIN} – ${HEALTHY_MAX} kg/m²`],
              ["Healthy weight for your height", `${weightLabel(result.healthyKg[0])} – ${weightLabel(result.healthyKg[1])}`],
              [
                result.deltaToHealthyKg === 0
                  ? "Distance to healthy range"
                  : result.deltaToHealthyKg < 0
                    ? `Lose to reach BMI ${HEALTHY_MAX}`
                    : `Gain to reach BMI ${HEALTHY_MIN}`,
                result.deltaToHealthyKg === 0 ? "Within range" : weightLabel(Math.abs(result.deltaToHealthyKg)),
              ],
              ["BMI Prime", fmt(result.prime, 2)],
              ["Ponderal Index", `${fmt(result.ponderal)} kg/m³`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 py-2.5">
                <dt className="text-slate-600 dark:text-slate-400">{k}</dt>
                <dd className="text-right font-semibold tabular-nums text-slate-900 dark:text-slate-100">{v}</dd>
              </div>
            ))}
          </dl>
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
