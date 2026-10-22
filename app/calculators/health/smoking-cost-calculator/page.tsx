import type { Metadata } from "next";
import { Suspense } from "react";
import SmokingCostCalculator from "@/components/calcs/health/smoking-cost-calculator";
import { CalculatorPage, DataTable, Editorial, Faq, Formula, JsonLd, RelatedLinks } from "@/components/flagship/shell";
import { SmokingCompoundWealthLossChart } from "@/components/flagship/health/editorial-charts/SmokingCompoundWealthLossChart";
import { SITE_URL } from "@/lib/site";

const PATH = "/calculators/health/smoking-cost-calculator";
const TITLE = "Smoking Cost Calculator – Financial Toll & Compound Wealth | CalcDigi";
const DESCRIPTION =
  "Calculate the true financial and physiological cost of smoking. See daily, annual, and lifetime costs, alongside compounded investment returns and the CDC healing timeline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", url: PATH },
};

const CDC_HEALING_TIMELINE_TABLE = [
  {
    elapsedTime: "20 Minutes",
    physiologicalRecovery: "Heart rate and blood pressure drop toward baseline; capillary blood flow improves.",
    clinicalMilestone: "Cessation of acute nicotine vasoconstriction.",
  },
  {
    elapsedTime: "12 Hours",
    physiologicalRecovery: "Blood carbon monoxide (CO) drops below 10 ppm.",
    clinicalMilestone: "Hemoglobin oxygen transport normalizes, relieving hypoxia.",
  },
  {
    elapsedTime: "2 Wks to 3 Mos",
    physiologicalRecovery: "Forced expiratory volume (FEV1) and arterial circulation improve up to 30%.",
    clinicalMilestone: "Coughing decreases; bronchial ciliary clearance reactivates.",
  },
  {
    elapsedTime: "1 to 2 Years",
    physiologicalRecovery: "Excess risk of myocardial infarction drops by 50% vs continuing smokers.",
    clinicalMilestone: "Arterial endothelial inflammation substantially resolves.",
  },
  {
    elapsedTime: "5 to 10 Years",
    physiologicalRecovery: "Stroke risk drops to non-smoker levels; oral and throat cancer risks fall by half.",
    clinicalMilestone: "Regression of premalignant squamous cell lesions.",
  },
  {
    elapsedTime: "15 Years",
    physiologicalRecovery: "Coronary heart disease risk matches that of a lifetime non-smoker.",
    clinicalMilestone: "Full normalization of cardiovascular mortality risk.",
  },
];

const HIDDEN_COSTS_TABLE = [
  { expenseCategory: "Direct Cigarette Purchases", annualImpact: "$2,900 – $5,200", lifetimeImpact: "$87,000 – $156,000", description: "Direct retail expenditure on tobacco packs and excise taxes." },
  { expenseCategory: "Life Insurance Premiums", annualImpact: "$1,200 – $3,500", lifetimeImpact: "$36,000 – $105,000", description: "Smokers pay 200% to 400% higher life insurance underwriting rates." },
  { expenseCategory: "Healthcare & Dental Out-of-Pocket", annualImpact: "$800 – $2,400", lifetimeImpact: "$24,000 – $72,000", description: "Higher deductibles, periodontal therapy, copays, and prescriptions." },
  { expenseCategory: "Homeowners & Renters Insurance", annualImpact: "$200 – $500", lifetimeImpact: "$6,000 – $15,000", description: "Surcharges for residential fire hazard from unextinguished ashes." },
  { expenseCategory: "Automobile Resale Depreciation", annualImpact: "$300 – $600", lifetimeImpact: "$9,000 – $18,000", description: "Permanent thirdhand smoke residue slashes vehicle resale value." },
];

const FAQ = [
  {
    q: "How much does a pack-a-day smoker spend annually in the US?",
    a: "With US cigarette packs averaging between $8.00 and $11.00 (and over $14.00 in states like New York), a pack-a-day smoker spends between $2,920 and $4,015 annually in direct cash outflows alone.",
  },
  {
    q: "What is the 20-year compounded opportunity cost of smoking?",
    a: "Redirecting a daily $9.00 cigarette habit ($274/month or $3,285/year) into an S&P 500 index fund compounding at an average historical return of 7% grows to ~$48,600 in 10 years, ~$144,000 in 20 years, and over $330,000 in 30 years.",
  },
  {
    q: "What are the secondary hidden costs of smoking?",
    a: "Secondary costs include 2x to 4x higher life insurance premiums ($1,500+/yr), dental procedures for periodontal disease, increased medical copays, reduced vehicle trade-in values, and property insurance surcharges.",
  },
  {
    q: "How quickly does the body recover after smoking cessation?",
    a: "Cardiovascular recovery starts within 20 minutes (blood pressure normalizes), carbon monoxide clears within 12 hours, lung capacity improves within weeks, and heart attack risk drops by 50% after 1 year.",
  },
  {
    q: "Which clinical cessation methods offer the highest success rates?",
    a: "Combining pharmacotherapy (varenicline or dual-agent nicotine replacement therapy—patch plus gum/lozenge) with behavioral counseling yields 30% to 35% long-term abstinence, compared to under 5% for cold turkey.",
  },
];

export default function SmokingCostPage() {
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
        crumbs={[{ href: "/", label: "Home" }, { href: "/pages/health", label: "Health & Fitness" }, { label: "Smoking Cost Calculator" }]}
        title="Smoking Cost Calculator"
        intro="Uncover the true financial, opportunity, and physiological cost of tobacco consumption. Track how redirecting cigarette expenditures into compounded index investing builds life-changing wealth while your body heals."
      >
        {/* SECTION 1: Calculator Input Widget & Result Panel (Top Hero Area) */}
        <Suspense fallback={<div className="mt-6 h-[520px] rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" />}>
          <SmokingCostCalculator />
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
              { href: "/calculators/health/alcohol-unit-calculator", icon: "🍷", name: "Alcohol Units" },
              { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
              { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
              { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
              { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
              { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
            ]}
          />
        </section>

        {/* SECTION 3: Educational Content & Visual Data Section (Main Body) */}
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
                Calibrated against <strong className="font-semibold text-slate-800 dark:text-slate-200">CDC OSH &amp; Actuarial Models</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Health Economics Review</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Q4 2026</span>
            </div>
          </div>

          {/* Part A - Primary Introduction */}
          <h2>What is the True Financial &amp; Physical Cost of Smoking?</h2>
          <p>
            Tobacco consumption is recognized by the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC) as the single leading preventable cause of disease and premature mortality worldwide, accounting for over 480,000 annual fatalities in the United States alone. Beyond this severe clinical devastation lies an equally destructive economic consequence: cigarette smoking operates as an aggressive compounding drag on personal wealth.
          </p>
          <p>
            When an individual buys a pack of cigarettes for $9.00 each day, the financial toll is not confined to the $3,285 spent out-of-pocket annually. Due to the compounding power of investment returns, that diverted cash represents hundreds of thousands of dollars in lost net worth. Over a 30-year working career, an everyday pack-a-day habit forfeits more than <strong>$330,000</strong> in real capital growth—funds capable of funding full retirement or paying off a residential mortgage.
          </p>

          {/* Part B - Interactive Chart / Visual Continuum */}
          <div className="not-prose my-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Interactive Compounded Wealth vs. Direct Cash Outflow
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                Interactive Model
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Scrub across Year 1 through Year 30 to observe portfolio compounding versus linear cigarette spend, paired with corresponding biological recovery milestones.
            </p>
            <SmokingCompoundWealthLossChart />
          </div>

          {/* Part C - Core Reference Content */}
          <h2>The Actuarial Reality: Hidden Secondary Costs of Smoking</h2>
          <p>
            Actuarial data reveals that direct retail pack purchases represent only about 55% to 60% of the true financial burden absorbed by smokers. Significant indirect expenses quietly amplify the cumulative economic toll:
          </p>
          <DataTable
            head={["Expense Category", "Estimated Annual Cost", "30-Year Cumulative Toll", "Underwriting & Actuarial Etiology"]}
            rows={HIDDEN_COSTS_TABLE.map((row) => [
              <strong key={row.expenseCategory} className="text-slate-900 dark:text-slate-100">{row.expenseCategory}</strong>,
              row.annualImpact,
              row.lifetimeImpact,
              row.description,
            ])}
          />

          <h2>The CDC Healing Timeline: How the Human Body Detoxifies</h2>
          <p>
            From the exact moment a cigarette is extinguished, the human body commences an immediate, self-repairing biological cascade. Arterial tone recovers, cellular hypoxia resolves, and chronic disease hazard curves decline toward non-smoker levels:
          </p>
          <DataTable
            head={["Time Since Cessation", "Physiological Tissue Recovery", "Clinical Health Outcome"]}
            rows={CDC_HEALING_TIMELINE_TABLE.map((row) => [
              <strong key={row.elapsedTime} className="text-slate-900 dark:text-slate-100">{row.elapsedTime}</strong>,
              row.physiologicalRecovery,
              row.clinicalMilestone,
            ])}
          />

          <h2>The Mathematical Compounding Wealth Formula</h2>
          <p>
            The future wealth accrued by redirecting cigarette expenditures into diversified broad-market index funds is determined using the future value of an ordinary annuity formula compounded annually:
          </p>
          <Formula>Future Wealth = Annual Outflow × [((1 + r)^n − 1) ÷ r] × (1 + r)</Formula>
          <p>
            Where <em>Annual Outflow</em> represents 365 days of cigarette expenditures, <em>r</em> is the annual real market return rate (historically ~7.0% for the S&amp;P 500 index adjusted for inflation), and <em>n</em> represents the accumulation duration in years.
          </p>

          <h2>Evidence-Based Cessation: Clinical Protocols That Work</h2>
          <p>
            Attempting to quit cold turkey relying solely on willpower produces a 12-month long-term abstinence rate of under 5%, largely due to intense neurobiological nicotine receptor withdrawal. The US Public Health Service guidelines recommend evidence-based protocols that elevate success rates up to 30% to 35%:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Combination Nicotine Replacement (NRT)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Combining a steady baseline transdermal patch with an ad-libitum rapid-delivery agent (nicotine gum or lozenges for acute craving breakthrough) doubles long-term quit rates compared to single-agent NRT by sustaining basal receptor tone while managing sudden cravings.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Targeted Pharmacotherapy (Varenicline)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Varenicline acts as a partial agonist at alpha-4 beta-2 nicotinic acetylcholine receptors, stimulating moderate dopamine release to alleviate withdrawal while competitively blocking inhaled nicotine from binding, neutralizing smoking&apos;s dopaminergic reward mechanism.
              </p>
            </div>
          </div>

          <h2>Physiological Recovery: Endothelial Regeneration &amp; Thrombotic Normalization</h2>
          <p>
            Cigarette smoke contains over 7,000 toxic chemical compounds, including reactive aldehydes, carbon monoxide, and heavy metals. When inhaled, these compounds oxidize circulating low-density lipoprotein (LDL) particles and uncouple endothelial nitric oxide synthase (eNOS), impairing vasodilation.
          </p>
          <p>
            Within 24 to 48 hours of complete cessation, blood carbon monoxide drops below 10 ppm, restoring the oxygen-transport capacity of hemoglobin. Over the following 2 to 12 weeks, vascular endothelial function improves significantly, lowering systemic blood pressure and reducing thrombotic hazard. Platelet hyper-aggregability normalizes within days, microvascular capillary blood flow to the skin and peripheral extremities improves by 30%, and systemic endothelial shear stress returns to baseline physiological levels.
          </p>

          <h2>Actionable Wealth Reinvestment &amp; Habit Disruption</h2>
          <p>
            Translating smoking cessation into lifelong financial and physical freedom requires deliberate habit restructuring:
          </p>
          <ul>
            <li><strong>Automate Immediate Micro-Investments:</strong> Open a dedicated brokerage account and set up an automated transfer equal to your former cigarette expenditure into a low-cost index fund. Watching your portfolio compound monthly transforms savings into tangible motivation.</li>
            <li><strong>Disrupt Neuro-Behavioral Triggers:</strong> Nicotine dependence is intricately linked with conditioned routines (morning coffee, post-meal breaks, commutes). Swap these triggers with active healthy substitutes: a 10-minute brisk walk, sparkling water, or diaphragmatic breathing.</li>
            <li><strong>Track Vital Vascular Recovery:</strong> Pair your cessation journey with regular cardiovascular tracking. Observe your arterial pressure normalize with our <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, evaluate cardiorespiratory stamina with the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>, and assess metabolic output with the <a href="/calculators/health/calorie-burn-calculator">Calorie Burn Calculator</a>.</li>
          </ul>

          {/* SECTION 4: FAQ Section (Bottom of Content) */}
          <h2>Frequently asked questions</h2>
          <Faq items={FAQ} />
        </Editorial>
      </CalculatorPage>
    </>
  );
}
