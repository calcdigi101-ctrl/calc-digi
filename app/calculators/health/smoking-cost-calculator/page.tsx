import SmokingCostCalculator from "@/components/calcs/health/smoking-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SmokingCompoundWealthLossChart } from "@/components/flagship/health/editorial-charts/SmokingCompoundWealthLossChart";

const PATH = "/calculators/health/smoking-cost-calculator";
const TITLE = "Smoking Cost Calculator – Financial Toll & Compound Wealth | CalcDigi";
const DESCRIPTION =
  "Calculate the true financial and physiological cost of smoking. See daily, annual, and lifetime costs, alongside compounded investment returns and the CDC healing timeline.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const CDC_HEALING_TIMELINE_TABLE = [
  {
    elapsedTime: "20 Minutes",
    physiologicalRecovery: "Heart rate and systemic blood pressure drop toward baseline; peripheral capillary perfusion begins recovering.",
    clinicalMilestone: "Immediate cessation of acute nicotine-induced sympathetic nervous vasoconstriction.",
  },
  {
    elapsedTime: "12 Hours",
    physiologicalRecovery: "Carbon monoxide (CO) concentration in blood drops to normal physiological levels (below 10 ppm).",
    clinicalMilestone: "Hemoglobin oxygen-carrying capacity normalizes, alleviating tissue hypoxia.",
  },
  {
    elapsedTime: "2 Weeks to 3 Months",
    physiologicalRecovery: "Pulmonary forced expiratory volume (FEV1) increases by up to 30%; peripheral circulation improves significantly.",
    clinicalMilestone: "Coughing and shortness of breath decrease; bronchial ciliary clearance reactivates.",
  },
  {
    elapsedTime: "1 to 2 Years",
    physiologicalRecovery: "Excess relative risk of coronary heart disease (myocardial infarction) drops by 50% compared to continuing smokers.",
    clinicalMilestone: "Arterial endothelial inflammation resolves; thrombotic plaque stability improves.",
  },
  {
    elapsedTime: "5 to 10 Years",
    physiologicalRecovery: "Stroke risk drops to that of a lifetime non-smoker; oral, throat, and esophageal cancer risks fall by half.",
    clinicalMilestone: "Substantial regression of premalignant squamous cell dysplastic lesions.",
  },
  {
    elapsedTime: "15 Years",
    physiologicalRecovery: "Coronary heart disease risk drops to the equivalent level of a lifetime non-smoker.",
    clinicalMilestone: "Full normalization of cardiovascular mortality hazard.",
  },
];

const HIDDEN_COSTS_TABLE = [
  { expenseCategory: "Direct Cigarette Purchases", annualImpact: "$2,900 – $5,200", lifetimeImpact: "$87,000 – $156,000", description: "Direct retail expenditure on tobacco packs, excise taxes, and smoking paraphernalia." },
  { expenseCategory: "Life Insurance Premiums", annualImpact: "$1,200 – $3,500", lifetimeImpact: "$36,000 – $105,000", description: "Smokers pay 200% to 400% higher term and whole-life insurance underwriting rates." },
  { expenseCategory: "Out-of-Pocket Healthcare & Dental", annualImpact: "$800 – $2,400", lifetimeImpact: "$24,000 – $72,000", description: "Higher deductibles, periodontal disease treatment, respiratory medication copays, and doctor visits." },
  { expenseCategory: "Homeowners / Renters Insurance", annualImpact: "$200 – $500", lifetimeImpact: "$6,000 – $15,000", description: "Surcharges for residential fire hazard originating from unextinguished tobacco ashes." },
  { expenseCategory: "Automobile Resale Depreciation", annualImpact: "$300 – $600 amortized", lifetimeImpact: "$9,000 – $18,000", description: "Permanent smoke residue and upholstery odor slashes vehicle trade-in and private resale valuation." },
];

export default function SmokingCostPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Smoking Cost Calculator"
      intro="Uncover the true financial, opportunity, and health cost of tobacco consumption. Track how redirecting cigarette expenditures into compounded index investing builds life-changing wealth while your body heals."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Future Wealth} = \text{Annual Outflow} \cdot \frac{(1 + r)^n - 1}{r} \cdot (1 + r)"
      related={[
        { href: "/calculators/health/alcohol-unit-calculator", icon: "🍷", name: "Alcohol Units" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "How much money does a pack-a-day smoker spend per year in the United States?",
          a: "With the national average cost of a cigarette pack ranging between $8.00 and $11.00 (and exceeding $14.00 to $16.00 in high-tax jurisdictions like New York, Massachusetts, and Connecticut), a pack-a-day smoker spends between $2,920 and $4,015 annually in direct cash outflows alone. In major metropolitan areas, this easily surpasses $5,000 per year.",
        },
        {
          q: "What is the true 20-year compounded opportunity cost of smoking?",
          a: "If a pack-a-day smoker redirects their daily $9.00 cigarette expenditure ($274/month or $3,285/year) into a broad-market S&P 500 index fund compounding at an average historical return of 7% per year, the portfolio grows to approximately $48,600 in 10 years, $144,000 in 20 years, and over $332,000 in 30 years. Smoking is not merely a $9/day habit; it is a $330,000 drain on your retirement security.",
        },
        {
          q: "What are the hidden secondary costs of smoking beyond pack prices?",
          a: "The indirect costs of smoking often exceed direct purchase prices: 1) Life insurance premiums are 2x to 4x higher for smokers, costing an extra $1,500 to $3,500 annually; 2) Increased healthcare deductibles, dental procedures for periodontal disease, and prescription copays cost roughly $1,500/year; 3) Vehicles owned by smokers lose $1,000 to $3,000 in resale value due to thirdhand smoke residue in upholstery and air filtration systems; and 4) Homeowners insurance policies carry an active fire hazard surcharge of 10% to 20%.",
        },
        {
          q: "How soon do cardiovascular and cancer risks decrease after quitting?",
          a: "Cardiovascular recovery begins almost immediately: blood pressure drops within 20 minutes, carbon monoxide clears from hemoglobin within 12 hours, and lung function improves within 2 to 12 weeks. Most profoundly, after just 1 year of cessation, excess risk of heart attack drops by 50%. After 5 years, stroke risk matches that of a non-smoker. After 10 years, lung cancer mortality falls to half that of a continuing smoker.",
        },
        {
          q: "What are the most clinically effective smoking cessation methods?",
          a: "Clinical guidelines from the US Public Health Service indicate that combining pharmacotherapy with behavioral counseling yields the highest cessation success rates (up to 30–35% long-term abstinence compared to only 3–5% for unassisted cold-turkey attempts). FDA-approved first-line medications include varenicline (Chantix), bupropion SR (Zyban), and combination Nicotine Replacement Therapy (NRT)—pairing a long-acting transdermal nicotine patch with a rapid-acting gum, lozenge, or inhaler.",
        },
        {
          q: "Where can I find free clinical resources to help me quit smoking?",
          a: "In the United States, free evidence-based assistance is available 24/7 by calling 1-800-QUIT-NOW (1-800-784-8669) or visiting Smokefree.gov. State quitlines offer free one-on-one coaching, personalized quit plans, and frequently provide complimentary 2- to 4-week starter courses of nicotine patches and gum.",
        },
      ]}
    >
      <SmokingCostCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Health Economics &amp; Cessation Review:</span> Calibrated to CDC Office on Smoking and Health (OSH) epidemiology, US Surgeon General&apos;s Reports, and S&amp;P 500 compound wealth models.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Actuarial Standards</div>
        </div>

        {/* Section 1: The Macroeconomics of Tobacco */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Macroeconomics of Tobacco: The True Financial Drain
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Smoking is widely recognized as the leading cause of preventable morbidity and premature mortality worldwide, accounting for over 480,000 deaths annually in the United States alone. However, its economic destruction is equally devastating. Tobacco creates a silent, relentless compounding drain on personal wealth that deprives working individuals of financial security and early retirement.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When an individual purchases a pack of cigarettes for $9.00 every day, they are not merely spending $3,285 per calendar year. Due to the mathematical law of compound interest, that uninvested cash represents hundreds of thousands of dollars in foregone capital growth. Over a 30-year working career, an everyday smoking habit incinerates more than <strong>$330,000</strong> in potential investment assets.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Compounded Wealth vs. Direct Cash Outflow
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Contrast the linear erosion of cash spent on cigarettes against the exponential curve of compound investment wealth. Scrub across Year 1 through Year 30 to observe portfolio values and corresponding CDC biological recovery milestones:
          </p>
          <SmokingCompoundWealthLossChart />
        </section>

        {/* Section 3: The Complete Cost Breakdown */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Actuarial Reality: Hidden Secondary Costs of Smoking
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Actuarial tables reveal that retail cigarette purchases represent less than 60% of the true financial burden borne by tobacco users:
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
        </section>

        {/* Section 4: CDC Healing Timeline */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The CDC Healing Timeline: How the Body Rebuilds
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            From the moment the final cigarette is extinguished, the human body commences an extraordinary biological cascade of cellular detoxification and vascular repair:
          </p>
          <DataTable
            head={["Time Since Cessation", "Physiological Tissue Recovery", "Clinical Health Outcome"]}
            rows={CDC_HEALING_TIMELINE_TABLE.map((row) => [
              <strong key={row.elapsedTime} className="text-slate-900 dark:text-slate-100">{row.elapsedTime}</strong>,
              row.physiologicalRecovery,
              row.clinicalMilestone,
            ])}
          />
        </section>

        {/* Section 5: Clinical Cessation Strategies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Evidence-Based Cessation: Medical Protocols That Work
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Quitting tobacco through willpower alone has a 12-month success rate of less than 5%. Modern clinical protocols dramatically amplify long-term success:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Combination Nicotine Replacement (NRT)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Combining a steady baseline transdermal patch (21 mg, 14 mg, or 7 mg) with an ad-libitum rapid delivery agent (nicotine gum or lozenges for acute craving breakthrough) doubles long-term quit rates compared to single-agent NRT.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Targeted Pharmacotherapy (Varenicline)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Varenicline acts as a partial agonist at alpha-4 beta-2 nicotinic acetylcholine receptors, stimulating moderate dopamine release to alleviate withdrawal while competitively blocking inhaled nicotine from binding, neutralizing smoking&apos;s reward mechanism.
              </p>
            </div>
          </div>
        </section>
      
        
          <h2>Physiological Recovery &amp; Long-Term Economic Compounding</h2>
          <p>
            The health dividends of smoking cessation begin within minutes of extinguishing your final cigarette. Clinical data from the World Health Organization (WHO) and the US Surgeon General demonstrate that cardiovascular, pulmonary, and oncological risk curves reverse rapidly following cessation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Cardiovascular &amp; Pulmonary Milestones</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                At 20 minutes, heart rate and blood pressure normalize. At 12 hours, blood carbon monoxide drops to baseline. Between 2 weeks and 3 months, circulation and forced expiratory volume (FEV1) improve by up to 30%. At 1 year, excess coronary heart disease risk drops by 50%, and at 5 years, stroke hazard mirrors that of a lifelong non-smoker.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Life &amp; Health Insurance Dividend</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Term life insurance premiums for verified non-smokers are typically 50% to 70% lower than identical policies for active smokers, saving between $1,200 and $3,500 annually. Additionally, medical dental claims decrease dramatically due to reduced periodontal disease and oral tissue healing.
              </p>
            </div>
          </div>
          <h2>Actionable Strategies for Permanent Cessation</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Maximize your cessation success by combining behavioral strategies with clinical support:
          </p>
          <ul>
            <li><strong>Nicotine Replacement Therapy (NRT):</strong> Clinical trials confirm that combining a long-acting nicotine patch with a short-acting nicotine gum or lozenge doubles long-term quit rates by managing cravings.</li>
            <li><strong>Automated Reinvestment:</strong> Open a dedicated high-yield savings account or investment app and automate the exact daily amount previously spent on tobacco. Watching your balance compound provides powerful tangible reinforcement.</li>
            <li><strong>Disrupt Environmental Triggers:</strong> Identify habitual triggers (morning coffee, driving, post-meal habits) and substitute healthier physical routines (brisk walking, herbal tea, deep diaphragmatic breathing).</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Every smoke-free day improves your lung function, lowers cardiovascular risk, and builds lasting health and multi-generational financial vitality.
          </p>


        
          <h2>Behavioral Strategies for Long-Term Smoking Cessation</h2>
          <p>
            Maximize your cessation success by combining behavioral strategies with clinical support:
          </p>
          <ul>
            <li><strong>Identify &amp; Disrupt Triggers:</strong> Recognize environmental and emotional triggers (morning coffee, post-meal habits, stress) and substitute healthier routines (brisk walking, herbal tea, deep breathing).</li>
            <li><strong>Nicotine Replacement Therapy (NRT):</strong> Clinical trials confirm that combining a long-acting nicotine patch with a short-acting nicotine gum or lozenge doubles long-term quit rates by managing cravings.</li>
            <li><strong>Track Your Growing Financial Savings:</strong> Open a dedicated high-yield savings account or investment app and automate the exact daily amount previously spent on tobacco. Watching your balance grow provides powerful tangible reinforcement.</li>
            <li><strong>Seek Social &amp; Professional Support:</strong> Join a cessation support group, utilize national quitlines (e.g. 1-800-QUIT-NOW), and consult your doctor about prescription cessation medications if needed.</li>
          </ul>
          <p>
            Every smoke-free day improves your lung function, lowers cardiovascular risk, and builds lasting health and financial vitality.
          </p>


        
          <h2>Vascular Endothelial Recovery &amp; Wealth Reinvestment</h2>
          <p>
            Within 24 to 48 hours of smoking cessation, blood carbon monoxide levels normalize, restoring the oxygen-carrying capacity of hemoglobin. Over the following 2 to 12 weeks, vascular endothelial function improves significantly, lowering systemic blood pressure and reducing thrombotic hazard.
          </p>
          <p>
            Redirecting cigarette expenditures into disciplined automated investments yields a double dividend: eliminating life-shortening toxic exposures while building a substantial financial nest egg.
          </p>


        
          <h2>Platelet Activation &amp; Microvascular Perfusion Recovery</h2>
          <p>
            Cigarette combustion releases reactive oxygen species and acrolein, which oxidize circulating LDL cholesterol and cause immediate platelet hyper-aggregability. This pro-thrombotic vascular state increases the immediate likelihood of acute coronary thrombus formation.
          </p>
          <p>
            Upon quitting, platelet reactivity normalizes within days, microvascular capillary blood flow to the skin and peripheral extremities improves by 30%, and systemic endothelial shear stress returns to baseline physiological levels.
          </p>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Smoking cessation delivers immediate physiological and systemic vascular recovery. Track improvements in arterial tone using our <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, evaluate cardiorespiratory stamina with the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>, and assess toxicological clearance alongside the <a href="/calculators/health/alcohol-unit-calculator">Alcohol Unit Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
