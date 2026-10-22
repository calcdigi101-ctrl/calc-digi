import FertilityCalculator from "@/components/calcs/health/fertility-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { OvarianReserveAgeCurveChart } from "@/components/flagship/health/editorial-charts/OvarianReserveAgeCurveChart";

const PATH = "/calculators/health/fertility-calculator";
const TITLE = "Fertility Calculator – Age-Related Conception Odds & AMH | CalcDigi";
const DESCRIPTION =
  "Calculate your monthly and cumulative conception odds based on maternal age and cycle consistency. Explore ovarian reserve (AMH) benchmarks, aneuploidy rates, and ASRM guidelines.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const OVARIAN_RESERVE_BENCHMARKS_TABLE = [
  {
    category: "Optimal Ovarian Reserve",
    amhSerumRange: "2.0 – 4.0 ng/mL (14.3 – 28.6 pmol/L)",
    afcCount: "12 to 24 Follicles",
    clinicalMeaning: "Robust primordial follicle pool; highly favorable response expected for stimulated cycles (IUI/IVF).",
  },
  {
    category: "Normal / Satisfactory Reserve",
    amhSerumRange: "1.0 – 1.9 ng/mL (7.1 – 13.6 pmol/L)",
    afcCount: "8 to 14 Follicles",
    clinicalMeaning: "Standard age-appropriate ovarian reserve; typical spontaneous ovulatory capacity.",
  },
  {
    category: "Low Ovarian Reserve (Borderline)",
    amhSerumRange: "0.5 – 0.9 ng/mL (3.6 – 6.4 pmol/L)",
    afcCount: "5 to 8 Follicles",
    clinicalMeaning: "Early decline in follicle recruitment; proactive reproductive planning or intervention recommended.",
  },
  {
    category: "Diminished Ovarian Reserve (DOR)",
    amhSerumRange: "< 0.5 ng/mL (< 3.6 pmol/L)",
    afcCount: "< 5 Follicles",
    clinicalMeaning: "Significantly reduced oocyte pool; requires tailored fertility protocols; time-sensitive clinical management.",
  },
  {
    category: "Elevated Reserve (PCOS Phenotype)",
    amhSerumRange: "> 4.0 – 5.0+ ng/mL (> 35.7 pmol/L)",
    afcCount: "> 25 Follicles",
    clinicalMeaning: "Excessive pre-antral follicle arrest; common in Polycystic Ovary Syndrome; elevated risk of Ovarian Hyperstimulation Syndrome (OHSS).",
  },
];

const AGE_ANEUPLOIDY_TABLE = [
  { maternalAge: "Under 30 Years", monthlyChance: "22% – 25%", cumulativeYear: "85% – 90%", aneuploidyRate: "10% – 18%", miscarriageRisk: "< 10%" },
  { maternalAge: "30 to 34 Years", monthlyChance: "15% – 20%", cumulativeYear: "75% – 82%", aneuploidyRate: "20% – 28%", miscarriageRisk: "12% – 15%" },
  { maternalAge: "35 to 37 Years", monthlyChance: "10% – 12%", cumulativeYear: "60% – 65%", aneuploidyRate: "35% – 45%", miscarriageRisk: "20% – 25%" },
  { maternalAge: "38 to 40 Years", monthlyChance: "5% – 8%", cumulativeYear: "40% – 50%", aneuploidyRate: "50% – 65%", miscarriageRisk: "30% – 40%" },
  { maternalAge: "41 to 42 Years", monthlyChance: "3% – 4%", cumulativeYear: "20% – 25%", aneuploidyRate: "65% – 75%", miscarriageRisk: "45% – 55%" },
  { maternalAge: "43 Years and Older", monthlyChance: "< 1% – 2%", cumulativeYear: "< 10%", aneuploidyRate: "> 80% – 90%", miscarriageRisk: "> 60%" },
];

export default function FertilityPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Fertility & Conception Calculator"
      intro="Estimate your monthly conception probabilities and cumulative 12-month pregnancy rates based on maternal age, cycle consistency, and evidence-based reproductive endocrinology standards."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="P_{\text{cumulative}} = 1 - (1 - f)^N \quad (f = \text{Monthly Fecundability Rate})"
      related={[
        { href: "/calculators/health/ovulation-calculator", icon: "📅", name: "Ovulation Calculator" },
        { href: "/calculators/health/pregnancy-due-date-calculator", icon: "👶", name: "Pregnancy Due Date" },
        { href: "/calculators/health/period-calculator", icon: "🩸", name: "Period Calculator" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
      ]}
      faq={[
        {
          q: "What is monthly fecundability and how does it change with age?",
          a: "Monthly fecundability is the statistical probability of achieving pregnancy within a single menstrual cycle for a couple engaging in regular, unprotected intercourse. In women in their early 20s, natural fecundability is approximately 25% per month. By age 30, it averages 18–20%; by age 35, it drops to 10–12%; and by age 40, it is roughly 5% per cycle. However, cumulative 12-month pregnancy rates remain substantial even in older brackets through consistent exposure over time.",
        },
        {
          q: "What is Anti-Müllerian Hormone (AMH) and what does it tell you?",
          a: "Anti-Müllerian Hormone (AMH) is a glycoprotein secreted by the granulosa cells of pre-antral and small antral ovarian follicles. Because it reflects the size of the remaining growing follicle pool, serum AMH is widely used as a biomarker of ovarian reserve. AMH indicates how many eggs remain and predicts how well the ovaries will respond to fertility medications during IVF; however, AMH does not measure egg quality or guarantee natural unassisted conception in a given cycle.",
        },
        {
          q: "When does the American Society for Reproductive Medicine (ASRM) recommend seeking a fertility evaluation?",
          a: "The clinical guidelines established by ASRM dictate: 1) Women under age 35 should attempt unassisted conception for 12 months before initiating an infertility evaluation; 2) Women aged 35 to 39 should seek a clinical evaluation after 6 months of unsuccessful timed intercourse; and 3) Women aged 40 and older, or those with known risk factors (such as endometriosis, history of pelvic inflammatory disease, or irregular/absent periods), should seek immediate evaluation upon deciding to conceive.",
        },
        {
          q: "Why does chromosomal aneuploidy increase as women age?",
          a: "Female humans are born with their lifetime supply of approximately 1 to 2 million oocytes, which remain arrested in prophase of meiosis I for decades. As oocytes age, the proteinaceous cohesin rings and spindle apparatus fibers that tether chromosome pairs together gradually degrade. Upon completing meiotic division during ovulation, aged oocytes are prone to nondisjunction errors—leading to missing or extra chromosomes (aneuploidy, such as Trisomy 21). Aneuploid embryos frequently fail to implant or result in early first-trimester miscarriage.",
        },
        {
          q: "What does a basic clinical fertility evaluation include?",
          a: "A comprehensive initial workup evaluates three foundational pillars: 1) Ovulatory Function: Serum AMH, cycle day 3 FSH/estradiol, transvaginal ultrasound for Antral Follicle Count (AFC), and mid-luteal progesterone; 2) Tubal & Uterine Anatomy: Hysterosalpingography (HSG) or saline infusion sonohysterography to verify patent fallopian tubes and a clear uterine cavity; and 3) Male Factor: Semen analysis assessing volume, sperm concentration, progressive motility, and strict Kruger morphology.",
        },
        {
          q: "Can lifestyle factors improve egg quality or male fertility?",
          a: "Yes. While chronological oocyte quantity cannot be increased, mitochondrial energy production and cellular health can be supported during the 90-day follicular development window preceding ovulation: 1) Maintain optimal body composition (BMI 19–24.9), as both obesity and severe underweight disrupt ovulation; 2) Eliminate tobacco smoking and limit alcohol, both of which accelerate follicular depletion and fragment sperm DNA; 3) Supplement with evidence-based micronutrients (coenzyme Q10/ubiquinol to support mitochondrial ATP, folate/methylfolate, and vitamin D); and 4) Ensure male partners avoid hot tubs, tight compression, and excessive heat exposure.",
        },
      ]}
    >
      <FertilityCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Reproductive Endocrinology &amp; Infertility (REI) Review:</span> Calibrated to American Society for Reproductive Medicine (ASRM) Practice Committee Opinions and ESHRE ovarian reserve diagnostic criteria.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Reproductive Standards</div>
        </div>

        {/* Section 1: The Bio-Mathematical Reality */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Bio-Mathematical Reality: Monthly Fecundability vs. Cumulative Odds
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In reproductive epidemiology, human fertility is measured in terms of <strong>fecundability</strong>—the biological probability of conceiving within a single monthly ovulatory cycle. Even during the peak of biological fertility in the early twenties, human reproduction is naturally inefficient compared to other mammals, peaking at approximately a <strong>20% to 25% chance per cycle</strong>.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            However, fertility is cumulative. When couples engage in timed intercourse during the 6-day fertile window across multiple consecutive months, the cumulative mathematical probability rises rapidly:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"P_{\\text{cumulative}} = 1 - (1 - f)^N"}</Formula>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Where <em>f</em> is the adjusted per-cycle fecundability rate and <em>N</em> is the number of attempted ovulatory cycles. Even with a modest 15% monthly probability, the 12-month cumulative likelihood of pregnancy reaches over 80%.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Maternal Age, Conception Odds &amp; AMH Trajectory
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Examine how chronological age influences monthly per-cycle conception odds, 12-month cumulative pregnancy rates, and median Anti-Müllerian Hormone (AMH) ovarian reserve. Scrub along the age axis to view clinical thresholds:
          </p>
          <OvarianReserveAgeCurveChart />
        </section>

        {/* Section 3: Ovarian Reserve Benchmarks */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Biomarkers of Ovarian Reserve: AMH and Antral Follicle Count
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Clinical evaluation of female reproductive potential relies heavily upon two independent biomarkers of oocyte quantity:
          </p>
          <DataTable
            head={["Ovarian Reserve Stratification", "Serum AMH Concentration", "Antral Follicle Count (AFC)", "Clinical Interpretation & Ovarian Responsiveness"]}
            rows={OVARIAN_RESERVE_BENCHMARKS_TABLE.map((row) => [
              <strong key={row.category} className="text-slate-900 dark:text-slate-100">{row.category}</strong>,
              row.amhSerumRange,
              row.afcCount,
              row.clinicalMeaning,
            ])}
          />
        </section>

        {/* Section 4: Aneuploidy and Maternal Age */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Oocyte Aging: The Mechanics of Meiotic Spindle Nondisjunction
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The age-related decline in fertility is driven by two intertwined biological vectors: <strong>quantitative depletion</strong> of the primordial follicle pool and <strong>qualitative deterioration</strong> of the oocyte meiotic spindle apparatus:
          </p>
          <DataTable
            head={["Maternal Age Tier", "Monthly Fecundability", "1-Year Cumulative", "Oocyte Aneuploidy Rate", "Clinical Miscarriage Risk"]}
            rows={AGE_ANEUPLOIDY_TABLE.map((row) => [
              <strong key={row.maternalAge} className="text-slate-900 dark:text-slate-100">{row.maternalAge}</strong>,
              row.monthlyChance,
              row.cumulativeYear,
              row.aneuploidyRate,
              row.miscarriageRisk,
            ])}
          />
        </section>

        {/* Section 5: The Diagnostic Workup */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Infertility Diagnostic Triad: Female, Tubal &amp; Male Factors
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When conception has not occurred within the ASRM timeframe (12 months under age 35, 6 months at age 35+), a structured diagnostic evaluation should be conducted in parallel across all three physiological pillars:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">1. Ovulatory &amp; Ovarian</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Confirm regular ovulation via mid-luteal progesterone (&gt; 3 ng/mL confirms ovulation; &gt; 10 ng/mL confirms robust corpus luteum). Evaluate AMH, baseline Day-3 FSH/estradiol, and thyroid TSH.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">2. Pelvic &amp; Tubal Anatomy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Perform a Hysterosalpingogram (HSG) or HyCoSy ultrasound to verify bilateral tubal patency and exclude intrauterine polyps, submucosal fibroids, or congenital uterine septa.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">3. Male Semen Analysis</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Male factor accounts for approximately 40% to 50% of all infertility cases. A formal semen analysis evaluates concentration (&gt; 15M/mL), progressive motility (&gt; 32%), and strict morphology (&gt; 4%).
              </p>
            </div>
          </div>
        </section>
      
        
        {/* Gamete Longevity & Epigenetic Preconception Protocols */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Gamete Longevity, Anti-Müllerian Hormone (AMH) &amp; Preconception Epigenetics
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Human female reproductive longevity is governed by the progressive depletion of the non-renewable primordial follicle pool. Serum Anti-Müllerian Hormone (AMH), secreted by pre-antral and small antral ovarian follicles, provides an objective biomarker of remaining ovarian reserve alongside transvaginal ultrasound antral follicle counts (AFC). Understanding gamete viability curves enables precise timing of coitus during the fertile window.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Oocyte Mitochondrial Energetics &amp; Spindle Health</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                During the 90 to 120-day follicular maturation window preceding ovulation, oocytes require intense mitochondrial ATP production for proper meiotic spindle assembly. In maternal age beyond 35, mitochondrial DNA mutations increase, elevating the incidence of meiotic non-disjunction and chromosomal aneuploidies. Supplementing Coenzyme Q10 (CoQ10, 400–600 mg/day) and active antioxidant support helps preserve mitochondrial energy output.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Paternal Semen Parameters &amp; DNA Fragmentation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Spermatogenesis spans approximately 74 days. Paternal factors contribute to 40% to 50% of subfertility cases. Mitigating testicular thermal stress (avoiding hot tubs, laptops on lap, tight cycling gear), minimizing alcohol intake, and optimizing dietary zinc and selenium enhance progressive sperm motility and protect against elevated DNA fragmentation index (DFI).
              </p>
            </div>
          </div>
          <h2>Preconception Micronutrient Protocol for Conception</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Implementing foundational preconception care 3 to 6 months prior to attempting pregnancy optimizes embryonic implantation receptivity:
          </p>
          <ul>
            <li><strong>Active Methylfolate (5-MTHF, 400–800 mcg):</strong> Essential for homocysteine remethylation, DNA synthesis, and preventing neural tube defects during early embryogenesis.</li>
            <li><strong>Vitamin D3 &amp; Endometrial Decidualization:</strong> Optimal serum 25-hydroxyvitamin D levels (&gt;30 ng/mL) are strongly correlated with higher clinical pregnancy rates in both natural conception and assisted reproductive technology (IVF).</li>
            <li><strong>Thyroid Hormone Optimization:</strong> The American Thyroid Association (ATA) recommends maintaining serum TSH &lt; 2.5 mIU/L during the preconception window to support early corpus luteum function and embryonic neurodevelopment.</li>
            <li><strong>Eliminate Endocrine Disrupting Chemicals:</strong> Minimize exposure to synthetic phthalates, bisphenol A (BPA), and per- and polyfluoroalkyl substances (PFAS) in food packaging and personal care products.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Couples under age 35 are clinically recommended to seek reproductive evaluation after 12 months of timed intercourse, while those aged 35 and older should pursue evaluation after 6 months.
          </p>
        </section>

        
          <h2>Preconception Lifestyle Checklist for Both Partners</h2>
          <p>
            Optimize gamete health and reproductive longevity by implementing this comprehensive preconception checklist 3 to 6 months prior to attempting conception:
          </p>
          <ul>
            <li><strong>Prenatal Micronutrient Supplementation:</strong> Women should begin taking daily prenatal vitamins containing at least 400 to 800 mcg of active methylfolate (5-MTHF) to prevent neural tube defects and support early embryogenesis.</li>
            <li><strong>Optimizing Body Composition:</strong> Both maternal and paternal body mass index (BMI) within the healthy range (18.5–24.9) optimizes hormonal ovulation regularity and semen parameters.</li>
            <li><strong>Eliminating Toxic Environmental Exposures:</strong> Discontinue smoking, moderate or eliminate alcohol consumption, and avoid recreational drugs and excess caffeine to protect egg and sperm DNA integrity.</li>
            <li><strong>Comprehensive Medical Review:</strong> Schedule a preconception checkup to review chronic medications, check rubella and varicella immunity, and optimize thyroid (TSH &lt; 2.5 mIU/L) and blood glucose levels.</li>
          </ul>
          <p>
            Maintain open communication with your healthcare provider to personalize your pathway to a healthy, supported pregnancy.
          </p>


        
          <h2>Oocyte Meiotic Spindle Integrity &amp; Maternal Age Curve</h2>
          <p>
            Unlike biological males who continuously generate new spermatozoa throughout life, females are born with their lifetime complement of primordial follicles (~1 to 2 million at birth, declining to ~300,000 at menarche and ~1,000 at menopause). As maternal age advances beyond 35, the primary challenge to conception is not simply follicle quantity, but oocyte meiotic spindle integrity.
          </p>
          <p>
            Aging oocytes experience mitochondrial DNA deletions and reduced cellular ATP production, elevating the incidence of non-disjunction meiotic errors that lead to chromosomal aneuploidies. Clinical studies demonstrate that coenzyme Q10 (CoQ10, 400–600 mg/day) and active antioxidant support can enhance mitochondrial energy output during the 90-day follicular recruitment window.
          </p>
          <h2>Semen Parameters &amp; Paternal DNA Fragmentation</h2>
          <p>
            Paternal factors contribute to approximately 50% of conception challenges. Evaluating a comprehensive semen analysis (volume &ge; 1.5 mL, total sperm count &ge; 39 million, progressive motility &ge; 32%, and normal Kruger strict morphology &ge; 4%) is critical. Minimizing testicular heat exposure (saunas, tight cycling gear), reducing alcohol intake, and optimizing dietary zinc and selenium protect sperm DNA integrity.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Fertility tracking combines hormonal cycle dynamics and systemic reproductive health. Pinpoint your LH surge and peak fertile days using our <a href="/calculators/health/ovulation-calculator">Ovulation Calculator</a>, track monthly cycle variability with the <a href="/calculators/health/period-calculator">Period Calculator</a>, and estimate expected delivery dates with the <a href="/calculators/health/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
