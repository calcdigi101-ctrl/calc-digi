import type { Metadata } from "next";
import Link from "next/link";
import CoffeeCaffeineCalculatorComponent from "@/components/calcs/food/coffee-caffeine-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CaffeinePlasmaClearanceCurveChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/coffee-caffeine-calculator";
const TITLE = "Coffee Caffeine Calculator | Pharmacokinetics, Half-Life & Daily Limits";
const DESCRIPTION =
  "Calculate caffeine intake across espresso, cold brew, drip, and energy drinks, modeling CYP1A2 plasma half-life clearance curves against FDA thresholds.";

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

const RELATED_CALCULATORS = [
  { href: "/calculators/food/alcohol-unit-calculator", icon: "🍷", name: "Alcohol Unit Calculator" },
  { href: "/calculators/food/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn Calculator" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-conversion-calculator", icon: "⚖️", name: "Cooking Conversion" },
  { href: "/calculators/food/tip-calculator", icon: "🧾", name: "Tip Calculator" },
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
];

export default function CoffeeCaffeineCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/food", label: "Food & Cooking" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Clinical Pharmacology Summary: Caffeine Half-Life & Safe Ceilings
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Caffeine (1,3,7-trimethylxanthine) is a potent central nervous system stimulant. The United States Food and Drug Administration (FDA) and European Food Safety Authority (EFSA) recommend a safe upper consumption threshold of 400 mg per day for healthy adults. Caffeine clearance follows first-order exponential decay with an average half-life of 5.0 hours. You can balance stimulant intake with exercise tracking in our{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium underline hover:text-amber-900">
                calorie burn calculator
              </Link>{" "}
              and metabolic nutrition in the{" "}
              <Link href="/calculators/food/nutrition-calculator" className="font-medium underline hover:text-amber-900">
                nutrition calculator
              </Link>.
            </p>
          </div>

          <h2>Pharmacokinetics of Caffeine Absorption & Hepatic CYP1A2 Clearance</h2>
          <CaffeinePlasmaClearanceCurveChart />
          <p>
            Upon oral ingestion, caffeine exhibits virtually 100% bioavailability, absorbing rapidly across the gastric mucosa and small intestine within 45 minutes to reach peak arterial blood plasma concentration (Cmax). Caffeine acts as a competitive antagonist against endogenous adenosine A1 and A2A receptors in the brain, inhibiting somnolence.
          </p>
          <p>
            In hepatic microsomes, approximately 95% of circulating caffeine is metabolized by cytochrome P450 1A2 (CYP1A2) enzymes into three primary dimethylxanthine metabolites: paraxanthine (84%, enhancing lipolysis), theobromine (12%, inducing mild bronchodilation), and theophylline (4%, exerting cardiac chronotropic effects). Clearance follows first-order exponential kinetics:
          </p>

          <Formula>
            {"C(t) = C_0 \times e^{-k_e \times t} = C_0 \times \left(\frac{1}{2}\right)^{\frac{t}{t_{1/2}}}"}
          </Formula>

          <Formula>
            {"k_e = \frac{\ln(2)}{t_{1/2}} = \frac{0.69315}{5.0\,\text{hours}} \approx 0.1386\,\text{hr}^{-1}"}
          </Formula>

          <Formula>
            {"\text{FDA Daily Exposure Index (\%)} = \left(\frac{\text{Total Caffeine Ingested (mg)}}{400\,\text{mg}}\right) \times 100"}
          </Formula>

          <Formula>
            {"\text{Sleep Bedtime Residual Load} = C_0 \times (0.5)^{\frac{\Delta t_{\text{bedtime}}}{5.0}}"}
          </Formula>

          <h2>Brew Method Extraction Yields & Alkaloid Density Matrix</h2>
          <p>
            Caffeine extraction efficiency depends on water temperature, grind particle surface area, contact time, and botanical coffee varietal (Coffea canephora/Robusta contains roughly twice the caffeine concentration of Coffea arabica):
          </p>

          <DataTable
            head={[
              "Beverage / Brew Modality",
              "Standard Serving",
              "Nominal Caffeine (mg)",
              "Caffeine Range (mg)",
              "Alkaloid Concentration",
              "FDA 400mg Daily Share",
            ]}
            rows={[
              ["Single Espresso Shot", "30 ml (1 fl oz)", "64 mg", "50 - 80 mg", "2.13 mg/ml", "16.0%"],
              ["Double Espresso (Doppio)", "60 ml (2 fl oz)", "128 mg", "100 - 160 mg", "2.13 mg/ml", "32.0%"],
              ["Pour-Over / Chemex Drip", "355 ml (12 fl oz)", "160 mg", "130 - 200 mg", "0.45 mg/ml", "40.0%"],
              ["Commercial Batch Brew", "473 ml (16 fl oz)", "260 mg", "200 - 340 mg", "0.55 mg/ml", "65.0%"],
              ["Cold Brew Concentrate (Steeped)", "355 ml (12 fl oz)", "205 mg", "160 - 280 mg", "0.58 mg/ml", "51.3%"],
              ["French Press (Immersion)", "355 ml (12 fl oz)", "140 mg", "110 - 180 mg", "0.39 mg/ml", "35.0%"],
              ["Matcha Green Tea (Whisked)", "240 ml (8 fl oz)", "70 mg", "55 - 90 mg", "0.29 mg/ml", "17.5%"],
              ["Standard Energy Drink", "473 ml (16 fl oz)", "160 mg", "140 - 200 mg", "0.34 mg/ml", "40.0%"],
            ]}
          />

          <h2>Worked Analytical Case Study: Multi-Dose Caffeine Pharmacokinetics</h2>
          <p>
            Consider a software engineer or hospitality manager who drinks a double espresso (128 mg) at 08:00 AM, a 16 oz batch-drip coffee (260 mg) at 11:30 AM, and an afternoon cold brew (200 mg) at 03:00 PM. We model systemic load at 11:00 PM bedtime alongside recipe scaling in our{" "}
            <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              recipe scaler
            </Link>{" "}
            and cost tracking with the{" "}
            <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              food cost calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Total Daily Consumption:</strong> 128 mg + 260 mg + 200 mg = 588 mg total caffeine. This exceeds the FDA 400 mg daily limit by 47% (147% of threshold).
            </li>
            <li>
              <strong>Dose 1 (08:00 AM - 15 hours elapsed):</strong>
              <Formula>
                {"C_1 = 128 \times (0.5)^{\frac{15}{5.0}} = 128 \times (0.5)^3 = 128 \times 0.125 = 16.0\,\text{mg}"}
              </Formula>
            </li>
            <li>
              <strong>Dose 2 (11:30 AM - 11.5 hours elapsed):</strong>
              <Formula>
                {"C_2 = 260 \times (0.5)^{\frac{11.5}{5.0}} = 260 \times (0.5)^{2.3} = 260 \times 0.203 = 52.8\,\text{mg}"}
              </Formula>
            </li>
            <li>
              <strong>Dose 3 (03:00 PM - 8.0 hours elapsed):</strong>
              <Formula>
                {"C_3 = 200 \times (0.5)^{\frac{8.0}{5.0}} = 200 \times (0.5)^{1.6} = 200 \times 0.3299 = 66.0\,\text{mg}"}
              </Formula>
            </li>
            <li>
              <strong>Cumulative Bedtime Residual Concentration:</strong> Summing residual circulating caffeine at 11:00 PM yields 16.0 + 52.8 + 66.0 = 134.8 mg. This active residual dose is equivalent to drinking a full double espresso immediately before sleeping, severely fragmenting deep slow-wave stage 3/4 sleep.
            </li>
            <li>
              <strong>Dietary Energy & Fluid Balance:</strong> The individual evaluates overall hydration and caloric balances using our{" "}
              <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking conversion calculator
              </Link>{" "}
              and beverage energy in the{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                alcohol unit calculator
              </Link>.
            </li>
          </ul>

          <h2>Genetic Polymorphisms in CYP1A2 & Individual Metabolic Variance</h2>
          <p>
            Caffeine clearance rates vary dramatically across the population due to single nucleotide polymorphisms (SNPs) in the CYP1A2 gene. Individuals possessing the homozygous AA genotype are rapid caffeine metabolizers, displaying half-lives as short as 2.5 to 3.5 hours. Conversely, carriers of the C-allele (AC or CC genotypes) are slow metabolizers, exhibiting clearance half-lives extending beyond 8.0 to 10.0 hours.
          </p>
          <p>
            Furthermore, exogenous substances modulate enzymatic velocity. Oral contraceptives double caffeine half-life to approximately 10 hours by competing for hepatic cytochrome enzymes. Conversely, cigarette smoke induces CYP1A2 expression, accelerating clearance by up to 50%.

          <h2>Enteric Signaling, Phosphodiesterase Inhibition & Adrenal Catecholamines</h2>
          <p>
            Beyond central nervous system adenosine receptor blockade, systemic caffeine molecules exert pronounced cellular regulatory actions throughout peripheral organ systems. At supra-physiological intracellular concentrations, methylxanthines act as non-selective competitive inhibitors of cyclic nucleotide phosphodiesterase (PDE) enzymes, specifically PDE3 and PDE4 isozymes. By preventing the enzymatic degradation of cyclic adenosine monophosphate (cAMP) into 5&apos;-AMP, caffeine prolongs secondary messenger cascades initiated by epinephrine and norepinephrine.
          </p>
          <p>
            In skeletal and cardiac myocytes, elevated intracellular cAMP activates protein kinase A (PKA), triggering calcium ion influx via L-type calcium channels and enhancing contractility (inotropic effect). Within the enteric gastrointestinal tract, caffeine ingestion stimulates the post-prandial release of peptide hormone gastrin from stomach G-cells and cholecystokinin (CCK) from duodenal mucosa within 15 minutes of oral intake. This neuroendocrine cascade accelerates gastric acid secretion and initiates rectosigmoid motor contractions, explaining the rapid peristaltic colonic reflex frequently experienced by coffee consumers.
          </p>
          </p>

          <h2>Operational Pitfalls, Sleep Architecture & Culinary Applications</h2>
          <p>
            Understanding caffeine pharmacokinetics prevents common operational missteps:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Cold Brew Misconception:</strong> Many consumers assume that smooth, low-acid cold brew contains less stimulant than espresso. In reality, immersion cold brewing utilizes an exceptionally high coffee-to-water brew ratio (often 1:5 or 1:8 by weight). Over 18 to 24 hours of ambient extraction, total alkaloid leaching achieves near-complete exhaustion, producing a potent concentrate containing over 200 mg of caffeine per 12-ounce cup. While cold extraction yields lower chlorogenic acid bitterness, extended steeping (16 to 24 hours) extracts massive caffeine loads, often 20% to 40% higher than standard immersion brewing.
            </li>
            <li>
              <strong>Adenosine Receptor Rebound:</strong> Abrupt cessation of caffeine induces vasodilation of cerebral vasculature, causing debilitating withdrawal headaches that peak 24 to 48 hours post-cessation.
            </li>
            <li>
              <strong>Culinary Desserts & Pastry Formulation:</strong> Coffee extracts and espresso powders in baked goods formulated with our{" "}
              <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                baking substitution calculator
              </Link>{" "}
              contribute non-trivial caffeine loads per slice.
            </li>
            <li>
              <strong>Hospitality Revenue & Check Etiquette:</strong> Specialty coffee shops monitor bean extraction yields alongside customer check gratuities calculated in our{" "}
              <Link href="/calculators/food/tip-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                tip calculator
              </Link>{" "}
              and roasting schedule in the{" "}
              <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking time calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the clinical definition of caffeine half-life?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Caffeine half-life is the biological duration required for your liver to metabolize and clear exactly 50% of the peak circulating caffeine dose from your bloodstream. For healthy non-smoking adults, this duration averages approximately 5 hours (ranging from 3 to 7 hours).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does dark roast coffee contain more caffeine than light roast coffee?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                No. Roasting temperatures (around 200°C to 230°C) do not break down caffeine molecules significantly. Because beans lose water and expand during extended roasting, dark roast beans are less dense. Measured by weight (grams), light and dark roasts contain virtually identical caffeine; measured by volume (scoops), light roast yields slightly more caffeine.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does caffeine interact with athletic training and calorie burn?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Ingesting 3 to 6 mg of caffeine per kg of body mass 60 minutes before training increases time-to-exhaustion and enhances motor unit recruitment. You can evaluate this boosted athletic workload using our{" "}
                <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  calorie burn calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What are the clinical symptoms of acute caffeine intoxication?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Ingesting in excess of 400 mg acutely or exceeding 1,000 mg in a single day can trigger tachycardia, muscle tremors, severe psychomotor agitation, cardiac arrhythmias, and gastrointestinal distress.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Can caffeine intake be offset by drinking large quantities of water?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Hydration alleviates mild diuretic electrolyte shifts but does not accelerate hepatic enzymatic breakdown by CYP1A2. You must allow biological time for metabolic clearance to occur.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do commercial coffee shops price their espresso beverages?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Specialty roasters calculate dry coffee dose costs per shot alongside dairy and cup packaging margins with our{" "}
                <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  food cost calculator
                </Link>{" "}
                to achieve commercial target profit benchmarks.
              </p>
            </div>
          </div>

          <h2>Authoritative Clinical Toxicology Standards & Scientific Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>US Food and Drug Administration (FDA):</strong> Guidance on Dietary Supplements and Caffeine Consumption Safety Ceilings.
            </li>
            <li>
              <strong>European Food Safety Authority (EFSA NDA Panel):</strong> Scientific Opinion on the Safety of Caffeine (EFSA Journal 2015).
            </li>
            <li>
              <strong>American Academy of Sleep Medicine (AASM):</strong> Clinical sleep guidelines regarding caffeine clearance timing and sleep architecture.
            </li>
            <li>
              <strong>International Society of Sports Nutrition (ISSN):</strong> Position stand on caffeine and athletic exercise performance.
            </li>
          </ul>
        </>
      }
    >
      <CoffeeCaffeineCalculatorComponent />
    </CalcPage>
  );
}
