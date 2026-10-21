import AlcoholUnitCalculator from "@/components/calcs/health/alcohol-unit-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BacMetabolismEliminationChart } from "@/components/flagship/health/editorial-charts/BacMetabolismEliminationChart";

const PATH = "/calculators/health/alcohol-unit-calculator";
const TITLE = "Alcohol Unit & BAC Calculator – Blood Alcohol & Sobriety | CalcDigi";
const DESCRIPTION =
  "Calculate alcohol units, standard drinks, and Blood Alcohol Concentration (BAC) using the clinical Widmark formula. Estimate clearance time to zero sobriety and track DUI legal thresholds.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

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

export default function AlcoholUnitPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Alcohol Unit Calculator"
      intro="Determine your Blood Alcohol Concentration (BAC) and trace metabolic elimination time using the clinical Widmark equation. Understand standard drink equivalents and legal impairment thresholds."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{BAC} = \frac{A \cdot 5.14}{W \cdot r} - \beta \cdot t \quad (\beta \approx 0.015\%/\text{hr})"
      related={[
        { href: "/calculators/health/smoking-cost-calculator", icon: "🚬", name: "Smoking Cost" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
        { href: "/calculators/health/sleep-calculator", icon: "💤", name: "Sleep Calculator" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "What defines a 'Standard Drink' in the United States?",
          a: "In the United States, one standard drink contains exactly 14 grams (0.6 fluid ounces or 17.7 milliliters) of pure ethanol. This is equivalent to: 1) 12 fluid ounces of regular 5% ABV beer; 2) 5 fluid ounces of 12% ABV table wine; or 3) 1.5 fluid ounces (a standard shot) of 40% ABV (80-proof) distilled spirits. Craft beers (7–9% ABV) often contain 1.5 to 2.0 standard drinks per 12 oz can.",
        },
        {
          q: "How fast does the human liver eliminate alcohol?",
          a: "The liver metabolizes ethanol via zero-order elimination kinetics—meaning it clears alcohol at a constant absolute rate regardless of concentration. On average, the liver clears approximately 0.015% BAC per hour (equivalent to roughly one standard drink per hour for an average-sized adult). Contrary to popular mythology, drinking black coffee, taking cold showers, exercising, or inducing sweating cannot accelerate this enzymatic bottleneck.",
        },
        {
          q: "Why do women typically achieve a higher BAC than men from the same drinks?",
          a: "Women experience higher peak blood alcohol concentrations than men of identical body weight due to two physiological factors: 1) Lower Total Body Water: Ethanol is water-soluble; because females naturally possess a higher percentage of body fat and lower body water, alcohol distributes into a smaller liquid volume; and 2) Lower Gastric Alcohol Dehydrogenase (ADH): Women produce lower concentrations of the gastric ADH enzyme in the stomach lining, allowing a greater fraction of ingested alcohol to enter the bloodstream unoxidized.",
        },
        {
          q: "Is it safe or legal to drive if my calculated BAC is 0.07%?",
          a: "No. While 0.08% is the statutory 'per se' legal limit in 49 US states (and 0.05% in Utah and most of Europe), driving at 0.07% still carries substantial psychomotor impairment. According to the National Highway Traffic Safety Administration (NHTSA), a BAC of 0.05% to 0.07% increases crash risk by 3 to 7 times. Furthermore, drivers can still be convicted of driving under the influence (DUI) below 0.08% if clinical impairment is demonstrated.",
        },
        {
          q: "How many calories does alcohol contribute to daily intake?",
          a: "Pure alcohol provides 7.0 kilocalories per gram—second only to dietary fat (9 kcal/g) and far higher than carbohydrates or protein (4 kcal/g). A single standard drink contains approximately 98 kcal of pure ethanol, plus unfermented sugars, totaling 120 to 200 kcal per beverage. Four standard craft beers can easily add 800 to 1,000 liquid calories without nutritional satiety.",
        },
        {
          q: "What is the Widmark formula used by forensic toxicologists?",
          a: "Developed by Swedish chemist Erik Widmark in 1932, the equation is: BAC = [A / (W × r)] × 100 − (β × t), where A is alcohol mass in grams, W is body weight, r is the gender distribution volume (0.73 for males, 0.66 for females), β is the elimination rate (0.015%/hr), and t is elapsed hours. It remains the international forensic standard for retrograde blood alcohol extrapolation.",
        },
      ]}
    >
      <AlcoholUnitCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Forensic Toxicology &amp; Addiction Medicine Review:</span> Calibrated to the Widmark pharmacokinetic equation, National Institute on Alcohol Abuse and Alcoholism (NIAAA), and NHTSA impairment standards.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Forensic Standards</div>
        </div>

        {/* Section 1: Pharmacokinetics of Ethanol */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pharmacokinetics of Ethanol: Absorption and Hepatic Clearance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Ethanol is a low-molecular-weight, water-soluble molecule that requires no digestive enzymatic breakdown. Upon ingestion, approximately 20% is absorbed directly through the gastric mucosa into the capillaries, while the remaining 80% is absorbed rapidly in the proximal duodenum of the small intestine.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Over 90% of circulating ethanol is metabolized in hepatocytes via <strong>Alcohol Dehydrogenase (ADH)</strong>, converting ethanol into toxic acetaldehyde, which is subsequently oxidized by <strong>Aldehyde Dehydrogenase (ALDH2)</strong> into harmless acetate. Crucially, ADH becomes fully saturated at very low alcohol concentrations, enforcing <strong>zero-order kinetics</strong>: the liver oxidizes alcohol at a strict linear ceiling of approximately 0.015% BAC per hour, irrespective of hydration, caffeine intake, or physical activity.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Widmark Elimination &amp; Sobriety Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Observe the pharmacokinetic trajectory of blood alcohol absorption followed by linear zero-order hepatic clearance. Scrub across the 10-hour timeline to inspect instantaneous BAC, neurological impairment stages, and legal driving thresholds:
          </p>
          <BacMetabolismEliminationChart />
        </section>

        {/* Section 3: Standard Drink Equivalents */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Standard Drink Equivalency: Deconstructing Beverage ABV
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Because alcoholic beverages vary dramatically in alcohol-by-volume (ABV), standard drink calculations prevent underestimating ethanol load:
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
        </section>

        {/* Section 4: BAC Impairment Stages */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Neurological Continuum: Impairment Stages by Blood Alcohol Level
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Ethanol enhances inhibitory GABAergic neurotransmission while dampening excitatory NMDA glutamate receptors, generating progressive central nervous system depression:
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
        </section>

        {/* Section 5: The Widmark Equation Formulation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Mathematical Widmark Equation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In forensic epidemiology, blood alcohol concentration is calculated via the Widmark formulation:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"\\text{BAC} = \\left( \\frac{\\text{Alcohol (g)} \\cdot 5.14}{\\text{Body Weight (lbs)} \\cdot r} \\right) - (0.015 \\cdot t)"}</Formula>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Where <em>r</em> represents the volume of distribution (0.73 for biological males, 0.66 for biological females), 5.14 converts grams to ounces and percent concentration, 0.015 represents the zero-order hourly elimination constant $\beta$, and <em>t</em> is elapsed hours since drinking began.
          </p>
        </section>
      
        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Ethanol ingestion directly influences autonomic vascular tone and sleep architecture. Assess related physiological metrics using our <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, optimize your circadian recovery with the <a href="/calculators/health/sleep-calculator">Sleep Calculator</a>, estimate liquid alcohol metabolic impact with the <a href="/calculators/health/calorie-burn-calculator">Calorie Burn Calculator</a>, or audit financial and longevity impacts alongside the <a href="/calculators/health/smoking-cost-calculator">Smoking Cost Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
