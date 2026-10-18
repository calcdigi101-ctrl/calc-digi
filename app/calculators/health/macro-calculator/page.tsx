import type { Metadata } from "next";
import { Suspense } from "react";
import { MacroCalculator } from "@/components/flagship/health/MacroCalculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/health/macro-calculator";
const TITLE = "Macro Calculator – Daily Protein, Carbs & Fat Targets | CalcDigi";
const DESCRIPTION =
  "Free Macro Calculator (IIFYM). Calculate your daily macronutrient breakdown in grams for weight loss, lean muscle gain, keto, or maintenance with interactive visual charts.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const FAQ_ITEMS = [
  {
    q: "How much protein do I need per day?",
    a: "The Recommended Dietary Allowance (RDA) baseline is 0.8 grams per kilogram (0.36 g/lb) of body weight for sedentary adults. For active individuals, resistance training, or during a calorie deficit (fat loss), clinical sports nutrition guidelines recommend 1.6 to 2.2 grams per kilogram (0.8 to 1.0 g/lb) to preserve and synthesize lean muscle tissue.",
  },
  {
    q: "What is IIFYM (If It Fits Your Macros)?",
    a: "IIFYM, also known as flexible dieting, is a nutritional methodology emphasizing total daily energy balance and macronutrient targets (grams of protein, carbohydrates, and fats) rather than strictly categorizing specific foods as 'clean' or 'dirty'. As long as micronutrient and fiber needs are met, food selection can remain flexible.",
  },
  {
    q: "Why do dietary fats have more calories than proteins and carbohydrates?",
    a: "Fat molecules (triglycerides) have higher carbon-hydrogen bond density and lower oxygen content, yielding 9 calories per gram upon metabolic oxidation. In contrast, proteins and carbohydrates yield 4 calories per gram.",
  },
  {
    q: "Which macro ratio is best for fat loss (cutting)?",
    a: "A high-protein macro split—such as 35–40% protein, 30–35% carbohydrates, and 25–30% fats—is clinically optimal during a calorie deficit. Higher protein intake suppresses the hunger hormone ghrelin, increases satiety peptide PYY, and spares muscle mass during energy restriction.",
  },
  {
    q: "How many carbs are allowed on a Ketogenic (Keto) diet?",
    a: "A standard ketogenic diet restricts daily net carbohydrates (total carbs minus fiber) to 20 to 50 grams per day, representing approximately 5% of total daily calorie intake, while dietary fats supply 70% to 75% of calories to induce metabolic ketosis.",
  },
  {
    q: "Do I have to hit my macros exactly to the gram each day?",
    a: "No. Reaching within ±5 grams of your protein and carbohydrate goals and ±3 grams of your fat target is more than sufficient for exceptional body composition results. Consistency across weekly averages matters far more than daily perfection.",
  },
];

const MACRO_ENERGY_ROWS = [
  ["Protein", "4 kcal / gram", "10% – 35%", "Tissue repair, enzyme synthesis, muscle preservation & high TEF satiety."],
  ["Carbohydrates", "4 kcal / gram", "45% – 65%", "Primary glycogen fuel for brain, central nervous system, and anaerobic exercise."],
  ["Dietary Fats", "9 kcal / gram", "20% – 35%", "Steroid hormone synthesis (testosterone, estrogen), cell membrane integrity & fat-soluble vitamin absorption."],
  ["Dietary Fiber", "1.5 – 2 kcal / gram", "25 – 38 g / day", "Microbiome gut health, blood glucose regulation & LDL cholesterol clearance."],
];

const DIET_SPLITS = [
  ["Balanced (Standard)", "30% Protein", "40% Carbohydrates", "30% Fats", "Best for overall wellness, endurance sports, and general population maintenance."],
  ["High Protein (Bodybuilding)", "40% Protein", "35% Carbohydrates", "25% Fats", "Ideal for aggressive cutting, muscle hypertrophy, and powerlifting."],
  ["Low Carb (Athletic)", "35% Protein", "20% Carbohydrates", "45% Fats", "Favorable for insulin sensitivity improvement and metabolic flexibility."],
  ["Ketogenic (Keto)", "25% Protein", "5% Carbohydrates", "70% Fats", "Produces nutritional ketosis with hepatic ketone body generation."],
];

const RELATED = [
  { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
  { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat Calculator" },
  { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
  { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
  { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Health Calculators", item: `${SITE_URL}/pages/health` },
                { "@type": "ListItem", position: 3, name: "Macro Calculator", item: `${SITE_URL}${PATH}` },
              ],
            },
            {
              "@type": "WebApplication",
              name: "Macro Calculator",
              url: `${SITE_URL}${PATH}`,
              description: DESCRIPTION,
              applicationCategory: "HealthApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            },
            {
              "@type": "FAQPage",
              mainEntity: FAQ_ITEMS.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />

      <CalculatorPage
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/pages/health", label: "Health" },
          { label: "Macro Calculator" },
        ]}
        title="Macro Calculator"
        intro="Calculate your optimal daily macronutrients (protein, carbohydrates, and fats) in grams and calories based on your body metrics and fitness goals. Includes flexible diet presets, visual donut charts, and per-meal distributions."
      >
        <Suspense fallback={<div className="h-96 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
          <MacroCalculator />
        </Suspense>

        <Editorial>
          {/* AI Overview Direct Answer Box (GEO Optimized) */}
          <div className="not-prose my-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/30 dark:from-emerald-950/30 dark:via-slate-900 dark:to-emerald-950/20 p-5 sm:p-6 text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
              <span>⚡ Quick Answer · What Are Macronutrients?</span>
            </div>
            <p className="text-sm leading-relaxed mb-3">
              <strong>Macronutrients</strong> are the three primary nutritional compounds your body requires in large daily quantities to sustain life and fuel exercise: <strong>Protein</strong> (4 cal/g), <strong>Carbohydrates</strong> (4 cal/g), and <strong>Fats</strong> (9 cal/g). While total calorie intake determines whether you gain, lose, or maintain weight, your macronutrient ratio determines whether that change is lean muscle or body fat.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-emerald-100 dark:border-emerald-900/50">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Protein:</span>{" "}
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">0.8 – 1.0 g/lb</span> (Muscle repair)
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Carbs:</span>{" "}
                <span className="text-blue-700 dark:text-blue-400 font-bold">1.0 – 2.5 g/lb</span> (Glycogen fuel)
              </div>
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">Fats:</span>{" "}
                <span className="text-amber-700 dark:text-amber-400 font-bold">0.3 – 0.4 g/lb</span> (Hormones)
              </div>
            </div>
          </div>

          <h2>Macronutrient Energy Density & Clinical Guidelines</h2>
          <p>
            The US Dietary Guidelines establish Acceptable Macronutrient Distribution Ranges (AMDR) to ensure nutritional adequacy and mitigate chronic cardiometabolic conditions:
          </p>
          <DataTable
            head={["Macronutrient", "Energy Value", "Recommended Range (AMDR)", "Primary Biological Function"]}
            rows={MACRO_ENERGY_ROWS}
          />

          <h2>How Macro Grams Are Calculated</h2>
          <p>
            To convert your daily calorie intake into precise macro targets in grams, multiply your total daily calories by each nutrient's percentage split, then divide by the energy density per gram:
          </p>

          <Formula>
            Protein (g) = [Daily Calories × Protein %] ÷ 4 kcal/g
          </Formula>
          <Formula>
            Carbohydrates (g) = [Daily Calories × Carb %] ÷ 4 kcal/g
          </Formula>
          <Formula>
            Dietary Fat (g) = [Daily Calories × Fat %] ÷ 9 kcal/g
          </Formula>

          <h2>Comparing Popular Macro Ratios & Diets</h2>
          <p>
            Different macronutrient combinations cater to distinct training adaptations, metabolic preferences, and lifestyle needs:
          </p>
          <DataTable
            head={["Diet Protocol", "Protein", "Carbs", "Fats", "Best Suited For"]}
            rows={DIET_SPLITS}
          />

          <h2>Three Pillars for Successful Macro Tracking</h2>
          <ol>
            <li>
              <strong>Prioritize Protein First:</strong> Ensure you hit your protein target daily. Protein has the highest thermic effect of food (TEF), burning 20–30% of its ingested calories during digestion.
            </li>
            <li>
              <strong>Adjust Carbs and Fats Based on Activity:</strong> On intense training days, higher carbohydrates restock muscle glycogen; on rest days, dietary fats provide sustained cellular energy.
            </li>
            <li>
              <strong>Track with a Digital Food Scale:</strong> Measuring food in grams or ounces with a kitchen scale provides 30–50% greater accuracy than measuring cups or eyeball estimation.
            </li>
          </ol>

          <Faq items={FAQ_ITEMS} />
          <RelatedLinks links={RELATED} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
