import PeriodCalculator from "@/components/calcs/health/period-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CycleLengthVariabilitySpectrumChart } from "@/components/flagship/health/editorial-charts/CycleLengthVariabilitySpectrumChart";

const PATH = "/calculators/health/period-calculator";
const TITLE = "Period Calculator – Menstrual Cycle Tracker & PMS Window | CalcDigi";
const DESCRIPTION =
  "Predict your next period dates, bleeding duration, and premenstrual (PMS) windows with clinical accuracy. Calibrated to FIGO menstrual standards and cycle variability norms.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FIGO_STANDARDS_TABLE = [
  {
    parameter: "Cycle Length (Frequency)",
    normalRange: "24 to 38 Days",
    abnormalShort: "< 24 Days (Frequent Menses / Polymenorrhea)",
    abnormalLong: "> 38 Days (Infrequent Menses / Oligomenorrhea)",
    clinicalMeaning: "Time elapsed from the first day of one menses to the first day of the subsequent menses.",
  },
  {
    parameter: "Cycle Regularity (Variation)",
    normalRange: "≤ 7 to 9 Days difference",
    abnormalShort: "—",
    abnormalLong: "≥ 10 Days variation between shortest and longest cycle",
    clinicalMeaning: "Consistency of cycle lengths across a 12-month monitoring period.",
  },
  {
    parameter: "Bleeding Duration",
    normalRange: "3 to 8 Days",
    abnormalShort: "< 3 Days (Shortened bleeding duration)",
    abnormalLong: "> 8 Days (Prolonged menstrual bleeding)",
    clinicalMeaning: "Total consecutive days of active menstrual blood flow.",
  },
  {
    parameter: "Menstrual Volume (Blood Loss)",
    normalRange: "5 to 80 mL (Normal Volume)",
    abnormalShort: "< 5 mL (Scant / Hypomenorrhea)",
    abnormalLong: "> 80 mL (Heavy Menstrual Bleeding / Menorrhagia)",
    clinicalMeaning: "Total blood and endometrial tissue shed per menstrual cycle.",
  },
];

const PALM_COEIN_TABLE = [
  { classification: "Structural Etiologies (PALM)", categories: "Polyp, Adenomyosis, Leiomyoma (Fibroids), Malignancy & Hyperplasia", diagnosticModalities: "Pelvic ultrasound, hysteroscopy, endometrial biopsy, saline-infusion sonography." },
  { classification: "Non-Structural Etiologies (COEIN)", categories: "Coagulopathy, Ovulatory Dysfunction (PCOS, thyroid), Endometrial, Iatrogenic (Mirena/Copper IUD), Not otherwise classified", diagnosticModalities: "Coagulation studies, thyroid TSH/free T4, prolactin, free testosterone, metabolic lipid panels." },
];

export default function PeriodPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Period Calculator"
      intro="Forecast your upcoming menstrual periods, bleeding duration, and premenstrual (PMS) windows with clinical precision based on the International Federation of Gynecology and Obstetrics (FIGO) standards."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Next Period Date} = \text{LMP} + \text{Cycle Length (days)} \quad (\text{Normal: } 24 \le \text{Cycle} \le 38)"
      related={[
        { href: "/calculators/health/ovulation-calculator", icon: "📅", name: "Ovulation Calculator" },
        { href: "/calculators/health/pregnancy-due-date-calculator", icon: "👶", name: "Pregnancy Due Date" },
        { href: "/calculators/health/fertility-calculator", icon: "🌱", name: "Fertility Calculator" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
        { href: "/calculators/health/sleep-calculator", icon: "💤", name: "Sleep Calculator" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
      ]}
      faq={[
        {
          q: "What is considered a clinically normal menstrual cycle length?",
          a: "According to the International Federation of Gynecology and Obstetrics (FIGO), a normal menstrual cycle length is between 24 and 38 days. While 28 days is the traditional population average, fewer than 30% of women have a precise 28-day cycle. Variations between 24 and 38 days are completely normal, provided the cycle remains reasonably consistent from month to month.",
        },
        {
          q: "Why does the American College of Obstetricians and Gynecologists call the period 'The Fifth Vital Sign'?",
          a: "ACOG recognizes the menstrual cycle as the fifth vital sign (alongside blood pressure, body temperature, pulse, and respiration) because menstrual regularity directly reflects the integrity of the hypothalamic-pituitary-ovarian (HPO) axis, metabolic health, thyroid function, and bone density. Sudden changes in cycle length or bleeding patterns frequently provide the earliest clinical warning of metabolic disorders, excessive energy deficit, or endocrine dysfunction.",
        },
        {
          q: "What causes Premenstrual Syndrome (PMS) during the week before my period?",
          a: "PMS symptoms (such as bloating, breast tenderness, mood swings, fatigue, and irritability) are triggered by the rapid physiological collapse of progesterone and estrogen levels during late luteal regression (luteolysis) if pregnancy does not occur. This abrupt steroid hormone withdrawal alters central nervous system neurotransmitters, particularly lowering serotonin availability and modulating GABA receptor sensitivity.",
        },
        {
          q: "How many days of variation between cycles is considered normal?",
          a: "Normal cycle variability is defined as a difference of 7 to 9 days or less between your shortest and longest cycle over the course of a 12-month period. For example, if your shortest cycle is 26 days and your longest is 33 days (a 7-day variation), your cycles are clinically classified as regular. A variation of 10 days or more indicates cycle irregularity that warrants investigation.",
        },
        {
          q: "What is Heavy Menstrual Bleeding (HMB) and when should I see a doctor?",
          a: "Clinically termed menorrhagia, Heavy Menstrual Bleeding (HMB) is defined as menstrual blood loss exceeding 80 mL per cycle, or bleeding that lasts longer than 8 consecutive days. Practical signs include soaking through one or more sanitary pads or tampons every hour for two consecutive hours, needing double protection, passing blood clots larger than a quarter (1 inch in diameter), or experiencing symptoms of anemia (fatigue, shortness of breath, dizziness).",
        },
        {
          q: "How does stress delay or disrupt a menstrual period?",
          a: "Physical or emotional stress activates the hypothalamic-pituitary-adrenal (HPA) axis, stimulating excessive secretion of Corticotropin-Releasing Hormone (CRH) and cortisol. Elevated cortisol directly suppresses the pulsatile release of Gonadotropin-Releasing Hormone (GnRH) from the hypothalamus, preventing the pituitary from releasing sufficient FSH and LH to mature a follicle, thereby delaying or completely inhibiting ovulation (functional hypothalamic anovulation).",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Gynecological Endocrinology Review:</span> Calibrated to the International Federation of Gynecology and Obstetrics (FIGO Menstrual Disorders Committee) and ACOG Committee Opinion No. 651.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Verified Gynecological Standards</div>
        </div>

        {/* Section 1: The Fifth Vital Sign */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Menstrual Cycle as the Fifth Vital Sign
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2015, the American College of Obstetricians and Gynecologists (ACOG) and the American Academy of Pediatrics (AAP) formally published Committee Opinion No. 651, designating the <strong>menstrual cycle as a fifth vital sign</strong> of overall systemic health. Just as blood pressure or heart rate reflects cardiovascular integrity, menstrual rhythm serves as an exquisite clinical barometer of neuroendocrine homeostasis, energy availability, and metabolic equilibrium.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            A regular menstrual cycle requires seamless, pulsatile communication between the <strong>hypothalamus</strong> (secreting GnRH), the <strong>anterior pituitary</strong> (releasing FSH and LH), and the <strong>ovaries</strong> (synthesizing estradiol and progesterone). Any disruption—whether caused by chronic emotional distress, energetic restriction, thyroid hypofunction, or insulin resistance—immediately manifests as cycle dysregulation.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Cycle Length Population Distribution
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore the epidemiological bell curve of global human menstrual cycle lengths. Scrub across the spectrum from 21 to 42 days to view population percentiles, follicular phase dynamics, and the official FIGO normal range:
          </p>
          <CycleLengthVariabilitySpectrumChart />
        </section>

        {/* Section 3: FIGO Menstrual Standards Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            FIGO Clinical Diagnostic Menstrual Parameters
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The International Federation of Gynecology and Obstetrics establishes four core clinical parameters to evaluate menstrual health:
          </p>
          <DataTable
            head={["Menstrual Parameter", "FIGO Normal Standard", "Abnormal Short Threshold", "Abnormal Long Threshold", "Physiological Definition"]}
            rows={FIGO_STANDARDS_TABLE.map((row) => [
              <strong key={row.parameter} className="text-slate-900 dark:text-slate-100">{row.parameter}</strong>,
              row.normalRange,
              row.abnormalShort,
              row.abnormalLong,
              row.clinicalMeaning,
            ])}
          />
        </section>

        {/* Section 4: The Neurobiology of the PMS Window */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Neurobiology of PMS: Progesterone Withdrawal &amp; Serotonin
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Premenstrual Syndrome (PMS) occurs during the final 5 to 7 days of the luteal phase, terminating rapidly once menstrual flow begins. This symptomatology is driven by neurosteroid dynamics:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Allopregnanolone &amp; GABA Receptors</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                During mid-luteal peak, progesterone is metabolized into <strong>allopregnanolone</strong>, a potent positive modulator of GABA-A receptors with calming effects. In the late luteal phase, the sudden drop in allopregnanolone precipitates a withdrawal-like state, triggering autonomic irritability, insomnia, and heightened anxiety.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Estrogen Collapse &amp; Serotonergic Tone</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Estradiol actively enhances the synthesis and receptor density of <strong>serotonin</strong> in the brain while downregulating monoamine oxidase (MAO) enzymes. When estrogen drops precipitously before menses, central serotonin drops in tandem, generating dysphoria, carbohydrate cravings, and emotional lability.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: The PALM-COEIN Classification */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Abnormal Uterine Bleeding: The PALM-COEIN Framework
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When cycles deviate significantly from normal parameters, clinical evaluation utilizes the standardized PALM-COEIN classification:
          </p>
          <DataTable
            head={["Classification Category", "Underlying Pathological Etiologies", "Standard Diagnostic Workup"]}
            rows={PALM_COEIN_TABLE.map((row) => [
              <strong key={row.classification} className="text-slate-900 dark:text-slate-100">{row.classification}</strong>,
              row.categories,
              row.diagnosticModalities,
            ])}
          />
        </section>
      
        
        {/* Neuroendocrine Pulsatility & Luteal Insufficiency */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Neuroendocrine Pulsatility: The HPO Axis &amp; Luteal Sufficiency
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The menstrual cycle is orchestrated by the rhythmic, pulsatile secretion of Gonadotropin-Releasing Hormone (GnRH) from the arcuate nucleus of the hypothalamus. GnRH stimulates the anterior pituitary to secrete Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH), which coordinate follicular maturation, estrogen synthesis, and subsequent ovulation. ACOG recognizes the menstrual cycle as a critical fifth vital sign reflecting endocrine, metabolic, and bone health.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Luteal Phase Defect (LPD) &amp; Progesterone Deficits</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Following ovulation, the collapsed follicle transforms into the vascular corpus luteum, which secretes progesterone to convert the proliferative endometrium into a receptive secretory lining. A post-ovulatory luteal phase shorter than 10 days indicates inadequate corpus luteum progesterone production, preventing complete endometrial secretory transformation and elevating early pregnancy loss risk.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Relative Energy Deficiency in Sport (RED-S)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When daily dietary energy intake drops below 30 kcal/kg fat-free mass per day (due to excessive exercise volume, disordered eating, or chronic calorie restriction), hypothalamic kisspeptin neurons suppress GnRH pulsatility. This downregulates ovarian estrogen production, causing functional hypothalamic amenorrhea, accelerated trabecular bone demineralization, and early osteopenia.
              </p>
            </div>
          </div>
          <h2>Diagnostic Criteria for Cycle Irregularities</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Consult an OB-GYN or reproductive endocrinologist if your cycles deviate from established clinical norms:
          </p>
          <ul>
            <li><strong>Polymenorrhea (Cycles &lt; 21 days):</strong> Abnormally frequent cycles often caused by anovulation, short luteal phase, or perimenopausal follicular acceleration.</li>
            <li><strong>Oligomenorrhea (Cycles &gt; 35 days):</strong> Infrequent menses strongly associated with Polycystic Ovary Syndrome (PCOS), thyroid dysfunction (hypothyroidism), or elevated serum prolactin (hyperprolactinemia).</li>
            <li><strong>Secondary Amenorrhea (No menses for &gt; 90 days):</strong> Requires diagnostic evaluation including serum beta-hCG, prolactin, TSH, FSH, and pelvic ultrasonography.</li>
            <li><strong>Menorrhagia (Heavy Menstrual Bleeding):</strong> Blood loss exceeding 80 mL per cycle (soaking through a pad/tampon every hour for 2+ consecutive hours) requires evaluation for uterine fibroids, adenomyosis, or von Willebrand factor coagulopathies.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Log cycle dates and symptoms in a digital tracker for at least 3 consecutive months to establish your personalized baseline patterns.
          </p>
        </section>

        
          <h2>Symptom Tracking &amp; Managing Premenstrual Symptoms (PMS)</h2>
          <p>
            Tracking subjective somatic and psychological symptoms across your menstrual cycle empowers proactive hormonal management:
          </p>
          <ul>
            <li><strong>Early Follicular Phase (Days 1–5):</strong> Estrogen and progesterone are at baseline. Prioritize rest, restorative gentle movement, and iron-rich foods (lentils, spinach, lean meats) to replace menstrual blood loss.</li>
            <li><strong>Late Follicular Phase (Days 6–13):</strong> Rising estradiol boosts energy, insulin sensitivity, and cognitive alertness. This represents an optimal window for high-intensity workouts and progressive resistance training.</li>
            <li><strong>Ovulatory Phase (Days 14–16):</strong> Peak estrogen and LH surge drive elevated confidence and physical strength. Stay attuned to unilateral pelvic mittelschmerz sensations and cervical mucus transitions.</li>
            <li><strong>Luteal Phase (Days 17–28):</strong> Progesterone elevates basal metabolic rate by 100 to 200 calories daily while increasing water retention and food cravings. Supplementing magnesium glycinate (300 mg) and Vitamin B6 (50 mg) helps alleviate premenstrual irritability, breast tenderness, and fluid retention.</li>
          </ul>
          <p>
            Record cycle dates and symptoms in a digital tracker for at least 3 consecutive months to establish your personalized baseline patterns.
          </p>


        
          <h2>Endocrine Pulsatility &amp; Luteal Phase Sufficiency</h2>
          <p>
            The menstrual cycle is regulated by the rhythmic, pulsatile secretion of Gonadotropin-Releasing Hormone (GnRH) from the arcuate nucleus of the hypothalamus. GnRH stimulates the anterior pituitary to secrete Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH), which drive ovarian follicular maturation and estrogen synthesis.
          </p>
          <p>
            Following ovulation, the collapsed follicle transforms into the vascular corpus luteum, which secretes progesterone to convert the proliferative endometrium into a receptive secretory lining. A post-ovulatory luteal phase shorter than 10 days indicates inadequate corpus luteum progesterone production, reducing implantation windows. Tracking cycle consistency provides crucial early warnings for thyroid imbalances, hyperprolactinemia, or polycystic ovary syndrome (PCOS).
          </p>


        
          <h2>Endometrial Prostaglandins &amp; Vasomotor Uterine Dynamics</h2>
          <p>
            The onset of menstrual bleeding is initiated by the rapid withdrawal of progesterone and estradiol as the corpus luteum undergoes luteolysis. In response to dropping hormonal levels, endometrial lysosomal membranes destabilize, releasing phospholipase A2 and synthesizing cyclooxygenase-mediated prostaglandins (PGF2-alpha and PGE2).
          </p>
          <p>
            Prostaglandin F2-alpha stimulates rhythmic uterine myometrial contractions and vasoconstriction of spiral arterioles, shedding the functionalis layer of the endometrium. Excessive local prostaglandin production is the primary driver of primary dysmenorrhea (menstrual cramping), which responds favorably to targeted anti-inflammatory nutrition and heat therapy.
          </p>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Menstrual cycle predictability is a primary vital sign of female endocrine health. Pinpoint your fertile window and ovulation peak using our <a href="/calculators/health/ovulation-calculator">Ovulation Calculator</a>, assess conception readiness with the <a href="/calculators/health/fertility-calculator">Fertility Calculator</a>, and estimate gestation timing with the <a href="/calculators/health/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <PeriodCalculator />
    </CalcPage>
  );
}
