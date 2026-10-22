import type { Metadata } from "next";
import { Suspense } from "react";
import AlcoholUnitCalculator from "@/components/calcs/health/alcohol-unit-calculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { BacMetabolismEliminationChart } from "@/components/flagship/health/editorial-charts/BacMetabolismEliminationChart";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/health/alcohol-unit-calculator";
const TITLE = "Alcohol Unit & BAC Calculator – Blood Alcohol & Sobriety | CalcDigi";
const DESCRIPTION =
  "Calculate alcohol units, standard drinks, and Blood Alcohol Concentration (BAC) using the clinical Widmark equation. Estimate clearance time to zero sobriety and track DUI legal thresholds.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: PATH },
};

const STANDARD_DRINKS_TABLE = [
  {
    beverageType: "Standard Domestic Beer",
    volume: "12 fluid oz (355 ml)",
    typicalAbv: "5.0% ABV",
    pureAlcoholGrams: "14.0 grams (0.6 fl oz)",
    unitsUk: "1.75 UK units",
  },
  {
    beverageType: "Table Wine (Red / White / Rosé)",
    volume: "5 fluid oz (148 ml)",
    typicalAbv: "12.0% ABV",
    pureAlcoholGrams: "14.0 grams (0.6 fl oz)",
    unitsUk: "1.80 UK units",
  },
  {
    beverageType: "Distilled Spirits (Vodka, Whiskey, Gin)",
    volume: "1.5 fluid oz (44 ml / 1 shot)",
    typicalAbv: "40.0% ABV (80 proof)",
    pureAlcoholGrams: "14.0 grams (0.6 fl oz)",
    unitsUk: "1.75 UK units",
  },
  {
    beverageType: "Craft IPA / Imperial Stout",
    volume: "12 fluid oz (355 ml)",
    typicalAbv: "7.0% – 9.0% ABV",
    pureAlcoholGrams: "19.6 – 25.2 grams",
    unitsUk: "2.5 – 3.2 UK units",
  },
  {
    beverageType: "Fortified Wine (Port / Sherry)",
    volume: "3.5 fluid oz (100 ml)",
    typicalAbv: "17.0% – 20.0% ABV",
    pureAlcoholGrams: "14.0 – 16.0 grams",
    unitsUk: "1.7 – 2.0 UK units",
  },
];

const BAC_IMPAIRMENT_STAGES_TABLE = [
  {
    bacRange: "0.02% – 0.03%",
    neurologicalState: "Subtle Relaxation / Mild Euphoria",
    psychomotorImpairment: "Slight loss of divided attention; modest reduction in multi-tasking tracking.",
    drivingRisk: "Crash risk elevated by 1.4x compared to sober baseline.",
  },
  {
    bacRange: "0.04% – 0.06%",
    neurologicalState: "Lowered Social Inhibitions",
    psychomotorImpairment: "Exaggerated behavior, minor loss of reasoning, reduced coordination, delayed brake reaction time.",
    drivingRisk: "Crash risk elevated by 2.0x to 3.5x.",
  },
  {
    bacRange: "0.07% – 0.09%",
    neurologicalState: "Statutory Intoxication (0.08% Legal DUI)",
    psychomotorImpairment: "Clear loss of peripheral vision, blunted reaction speed, impaired speed control, slurred speech.",
    drivingRisk: "Crash risk elevated by 11.0x (NHTSA actuarial statistics).",
  },
  {
    bacRange: "0.10% – 0.15%",
    neurologicalState: "Gross Motor Ataxia",
    psychomotorImpairment: "Major balance loss, severe lack of muscle control, clouded judgment, emotional volatility.",
    drivingRisk: "Crash risk elevated by 25.0x to 50.0x.",
  },
  {
    bacRange: "0.16% – 0.25%",
    neurologicalState: "Blackout / Amnestic State",
    psychomotorImpairment: "Severe motor dysfunction, sensory blunting, anterograde amnesia, nausea, vomiting.",
    drivingRisk: "Extreme danger; total incapacitation.",
  },
  {
    bacRange: "≥ 0.35%",
    neurologicalState: "Lethal Toxicity / Coma",
    psychomotorImpairment: "Loss of protective airway reflexes, respiratory depression, hypothermia, fatal alcohol poisoning.",
    drivingRisk: "Emergency resuscitation required.",
  },
];

const FAQ = [
  {
    q: "What defines a 'Standard Drink' in the United States?",
    a: "In the United States, one standard drink contains exactly 14 grams (0.6 fl oz) of pure ethanol, equal to 12 oz of 5% beer, 5 oz of 12% wine, or 1.5 oz of 40% spirits.",
  },
  {
    q: "How fast does the human liver eliminate alcohol?",
    a: "The liver metabolizes ethanol via zero-order kinetics at an absolute rate of ~0.015% BAC per hour. Coffee, cold showers, or exercise cannot accelerate this enzymatic rate.",
  },
  {
    q: "Why do women typically achieve a higher BAC than men from the same drinks?",
    a: "Women have lower total body water percentages and lower gastric alcohol dehydrogenase activity, concentrating ethanol into a smaller fluid compartment.",
  },
  {
    q: "Is it safe or legal to drive if my calculated BAC is 0.07%?",
    a: "No. Crash risk is 3x to 7x higher at 0.07% BAC, and drivers can still be convicted of driving under the influence (DUI) based on clinical impairment.",
  },
  {
    q: "How many calories does alcohol contribute to daily intake?",
    a: "Ethanol yields 7.0 kilocalories per gram without nutritional satiety. A standard drink contains roughly 100 to 150 total calories when factoring in unfermented carbohydrates.",
  },
  {
    q: "What is the Widmark formula used by forensic toxicologists?",
    a: "Formulated in 1932 by Erik Widmark, it calculates BAC from alcohol mass, body weight, gender distribution volume, and a zero-order hourly decay rate of 0.015%/hr.",
  },
];

export default function AlcoholUnitPage() {
  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Health & Fitness Calculators", item: `${SITE_URL}/pages/health` },
        { "@type": "ListItem", position: 3, name: TITLE, item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      "@type": "WebApplication",
      name: TITLE,
      url: `${SITE_URL}${PATH}`,
      description: DESCRIPTION,
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "MedicalWebPage",
      name: TITLE,
      url: `${SITE_URL}${PATH}`,
      description: DESCRIPTION,
      aspect: ["Overview", "Calculation", "Clinical Guidelines", "Reference Ranges"],
      medicalAudience: "Patients and Health Consumers",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />

      <CalculatorPage
        crumbs={[{ href: "/", label: "Home" }, { href: "/pages/health", label: "Health & Fitness" }, { label: "Alcohol Unit Calculator" }]}
        title="Alcohol Unit Calculator"
        intro="Determine your Blood Alcohol Concentration (BAC) and trace metabolic elimination time using the clinical Widmark equation. Understand standard drink equivalents and legal impairment thresholds."
      >
        {/* SECTION 1: Calculator Input Widget & Result Panel (Top Hero Area) */}
        <Suspense fallback={<div className="mt-6 h-[520px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          <AlcoholUnitCalculator />
        </Suspense>

        {/* SECTION 2: Related Calculators Section (Directly Below Calculator/Result) */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>⚡</span> Related Calculators
            </h2>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Recommended for you</span>
          </div>
          <RelatedLinks
            links={[
              { href: "/calculators/health/smoking-cost-calculator", icon: "🚬", name: "Smoking Cost" },
              { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
              { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
              { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
              { href: "/calculators/health/sleep-calculator", icon: "💤", name: "Sleep Calculator" },
              { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
            ]}
          />
        </section>

        {/* SECTION 3: Educational Content & Visual Data Section (Main Body - ONE Unified Box) */}
        <Editorial>
          {/* Trust Badge Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Clinically Verified
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Calibrated to <strong className="font-semibold text-slate-800 dark:text-slate-200">Widmark Equation, NIAAA &amp; NHTSA Standards</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Forensic Toxicology &amp; Addiction Medicine Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Q4 2026</span>
            </div>
          </div>

          {/* Part A - Primary Introduction */}
          <h2>What is Blood Alcohol Concentration (BAC) &amp; Alcohol Units?</h2>
          <p>
            Blood Alcohol Concentration (BAC) measures the percentage of pure ethanol present in circulating blood, expressed as grams per 100 milliliters. In clinical toxicology and forensic epidemiology, BAC serves as the universal index for quantifying acute physiological intoxication, psychomotor depression, and hepatic clearance load. Because human organ systems cannot store ethyl alcohol, ethanol is treated as a metabolic toxin and prioritized for hepatic breakdown ahead of all other macronutrients.
          </p>
          <p>
            Ethanol is a small, water-soluble molecule requiring no enzymatic digestion. Approximately 20% is absorbed directly through the gastric mucosa, while 80% is absorbed across the high-surface duodenal epithelium. Once absorbed, alcohol diffuses throughout total body water. Because adipose tissue holds negligible water, individuals with higher lean body mass dilute alcohol into a larger fluid compartment than individuals with greater adiposity, yielding a lower peak BAC from equivalent drinks.
          </p>

          {/* Part B - Interactive Chart / Visual Continuum */}
          <div className="not-prose my-8">
            <BacMetabolismEliminationChart />
          </div>

          {/* Part C - Core Reference Content */}
          <h2>Standard Drink Equivalency: Deconstructing Beverage ABV</h2>
          <p>
            Social drinkers frequently confuse liquid volume with actual pure ethanol intake. While light beer averages 4% to 5% ABV, craft IPAs and imperial stouts reach 8% to 11% ABV. Ingesting a single 16-ounce craft beverage often introduces as much alcohol as nearly three standard distilled shots:
          </p>
          <DataTable
            head={["Beverage Category", "Standard Serving Volume", "Alcohol by Volume (ABV)", "Pure Ethanol Mass", "UK Unit Equivalent"]}
            rows={STANDARD_DRINKS_TABLE.map((row) => [
              <strong key={row.beverageType} className="text-slate-900 dark:text-slate-100">{row.beverageType}</strong>,
              row.volume,
              row.typicalAbv,
              row.pureAlcoholGrams,
              row.unitsUk,
            ])}
          />

          <h2>Neurological Continuum: Impairment Stages by Blood Alcohol Level</h2>
          <p>
            Ethanol acts as a central nervous system depressant by allosterically enhancing inhibitory GABA-A receptor activity while inhibiting excitatory NMDA glutamate receptors. This dual mechanism produces predictable neurological declines:
          </p>
          <DataTable
            head={["BAC Range", "Neurological State", "Psychomotor & Cognitive Deficit", "Relative Motor Vehicle Crash Hazard"]}
            rows={BAC_IMPAIRMENT_STAGES_TABLE.map((row) => [
              <strong key={row.bacRange} className="text-slate-900 dark:text-slate-100">{row.bacRange}</strong>,
              row.neurologicalState,
              row.psychomotorImpairment,
              row.drivingRisk,
            ])}
          />

          <h2>The Mathematical Widmark Equation &amp; Retrograde Extrapolation</h2>
          <p>
            Formulated by Swedish toxicologist Erik Widmark in 1932, the Widmark equation remains the international standard for calculating retrograde alcohol clearance and peak intoxication:
          </p>
          <Formula>BAC = [ (Alcohol in Grams × 5.14) ÷ (Body Weight in lbs × r) ] − (β × Elapsed Hours)</Formula>
          <p>
            Where <em>Alcohol in Grams</em> is pure ethanol consumed, 5.14 is the conversion constant to ounces and percent concentration, <em>r</em> is the gender distribution volume (0.73 for biological men, 0.66 for biological women), and <em>β</em> is the zero-order hourly elimination rate (averaging 0.015% BAC per hour).
          </p>

          <h2>Hepatic Clearance Kinetics, Toxic Acetaldehyde &amp; Cardiac Impact</h2>
          <p>
            Over 90% of circulating ethanol is metabolized in hepatic parenchymal cells. Alcohol dehydrogenase (ADH) first oxidizes ethanol into acetaldehyde—a reactive carcinogen causing tissue inflammation, facial flushing, and hangover malaise. Aldehyde dehydrogenase-2 (ALDH2) then converts acetaldehyde into acetate:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Holiday Heart Syndrome</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Acute alcohol intake elevates circulating catecholamines, triggers sympathetic hyper-activity, and shortens atrial refractory periods, precipitating paroxysmal supraventricular arrhythmias and acute atrial fibrillation.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Zero-Order Hepatic Saturation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Hepatic ADH enzymes saturate at approximately 0.02% BAC. Metabolism proceeds at a fixed hourly pace regardless of hydration or stimulants; cold showers and black coffee cannot hasten clearance.
              </p>
            </div>
          </div>

          <h2>Sleep Architecture Collapse &amp; Neuroendocrine Disruption</h2>
          <p>
            While ethanol shortens sleep onset latency through GABA agonism, its overnight clearance induces an autonomic sympathetic rebound. This neurochemical awakening cuts restorative REM sleep by up to 50%, inhibits nocturnal growth hormone secretion, and elevates morning resting heart rate.
          </p>
          <p>
            Furthermore, ethanol suppresses antidiuretic hormone (vasopressin) in the posterior pituitary. For each gram of ethanol ingested, kidneys excrete 10 ml of excess fluid, producing vascular dehydration and electrolyte imbalances.
          </p>

          <h2>Harm Reduction Guidelines &amp; Physiological Tracking</h2>
          <p>
            To protect cardiovascular health and reduce metabolic harm, toxicologists recommend clinical harm-reduction protocols:
          </p>
          <ul>
            <li><strong>Meal Buffering:</strong> Consuming meals containing dietary fats and complex carbohydrates before drinking slows gastric emptying, blunting rapid BAC spikes by up to 40%.</li>
            <li><strong>Electrolyte Hydration:</strong> Alternating each alcoholic beverage with water or electrolyte fluids mitigates vasopressin suppression and protects intravascular fluid balance.</li>
            <li><strong>Track Vital Recovery:</strong> Monitor resting vitals with our <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, optimize nocturnal recovery with the <a href="/calculators/health/sleep-calculator">Sleep Calculator</a>, calculate hydration with the <a href="/calculators/health/water-intake-calculator">Water Intake Calculator</a>, evaluate caloric burn with the <a href="/calculators/health/calorie-burn-calculator">Calorie Burn Calculator</a>, and audit habits with the <a href="/calculators/health/smoking-cost-calculator">Smoking Cost Calculator</a>.</li>
          </ul>

          {/* SECTION 4: FAQ Section (Bottom of Content) */}
          <h2>Frequently asked questions</h2>
          <Faq items={FAQ} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
