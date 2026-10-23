import type { Metadata } from "next";
import { Suspense } from "react";
import DueDateCalculator from "@/components/calcs/baby/due-date-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PregnancyMilestoneVisualizer } from "@/components/flagship/baby/editorial-charts";

const PATH = "/calculators/baby/due-date-calculator";
const TITLE = "Due Date Calculator – Clinical Pregnancy EDD & Gestation Timeline | CalcDigi";
const DESCRIPTION =
  "Calculate your estimated date of delivery (EDD) using clinical Naegele's rule, cycle length adjustments, or exact conception date. Features gestational week countdown, trimester milestones, and AAP/ACOG fetal development timelines.";

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
  { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
  { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile Calculator" },
  { href: "/calculators/baby/baby-sleep-calculator", icon: "🌙", name: "Baby Sleep & Wake Windows" },
  { href: "/calculators/baby/diaper-cost-calculator", icon: "🧷", name: "Diaper Lifetime Cost Calculator" },
  { href: "/calculators/baby/childcare-cost-calculator", icon: "🧸", name: "Childcare & Daycare Cost Calculator" },
  { href: "/calculators/health/ovulation-calculator", icon: "🌸", name: "Ovulation & Fertility Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How is an estimated date of delivery (EDD) medically calculated?",
    a: "The standard clinical obstetric method applies Naegele's Rule: add 280 days (40 completed weeks) to the first day of your last menstrual period (LMP), adjusting for cycle lengths different from the standard 28-day cycle. If an early ultrasound crown-rump length (CRL) measurement before 14 weeks differs from LMP dating by more than 5 to 7 days, American College of Obstetricians and Gynecologists (ACOG) guidelines dictate re-dating the pregnancy to the ultrasound estimate.",
  },
  {
    q: "What percentage of women give birth on their exact estimated due date?",
    a: "Only approximately 4% to 5% of women deliver on their exact estimated due date. However, roughly 80% of healthy births occur within a two-week window before or after (between gestational weeks 38 and 42). Obstetricians treat your EDD as an anchor point for vital medical screenings and fetal growth tracking rather than an absolute deadline.",
  },
  {
    q: "What defines preterm, early term, full term, and late term delivery?",
    a: "According to strict ACOG and NICHD definitions: Preterm is delivery prior to 37 completed weeks (36 weeks 6 days); Early Term is 37 weeks 0 days through 38 weeks 6 days; Full Term is 39 weeks 0 days through 40 weeks 6 days (associated with lowest neonatal morbidity); Late Term is 41 weeks 0 days through 41 weeks 6 days; Post-Term is 42 weeks 0 days and beyond.",
  },
  {
    q: "How does irregular menstrual cycle length alter due date calculations?",
    a: "Standard Naegele's rule assumes ovulation occurs on cycle day 14. If your average cycle is 35 days, ovulation occurs around day 21 (7 days later), shifting your estimated due date 7 days later. Conversely, a 24-day cycle shifts ovulation to day 10, bringing your estimated due date 4 days earlier. Our calculator integrates Parikh's mathematical formula to automatically compensate for your unique cycle length.",
  },
  {
    q: "What warning symptoms warrant immediate emergency obstetric evaluation?",
    a: "Seek emergency medical care immediately if you experience heavy vaginal bleeding (soaking a menstrual pad in an hour), severe continuous abdominal or shoulder pain, sudden severe facial/hand swelling accompanied by visual disturbances (flashing lights or scotoma), regular painful contractions before 37 weeks, persistent leakage of clear amniotic fluid, or a noticeable decrease in fetal kick movement after 28 weeks.",
  },
  {
    q: "Can IVF embryo transfer dates provide an exact due date?",
    a: "Yes. In vitro fertilization (IVF) provides the highest dating accuracy because fertilization or blastocyst transfer timing is precisely documented. For a 3-day embryo transfer, add 263 days to the transfer date; for a 5-day or 6-day blastocyst transfer, add 261 days to the transfer date.",
  },
];

export default function DueDatePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Due Date Calculator"
      intro="Determine your estimated date of delivery (EDD), current gestational age, and fetal development milestones. Powered by clinical Naegele's rule with personalized cycle length adjustments."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Clinical Authority Byline */}
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
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">ACOG Practice Bulletin No. 700 &amp; AAP Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Obstetric Clinical Reference</span>
              <span>•</span>
              <time dateTime="2026-10-24">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Clinical Summary: How Pregnancy Due Dates Are Calculated
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Your <strong>estimated date of delivery (EDD)</strong> represents the 40-week (280-day) completion mark of human gestation, measured from the first day of your last menstrual period (LMP). Because biological conception occurs around ovulation (typically cycle day 14 of a 28-day cycle, tracked via an <a href="/calculators/health/ovulation-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ovulation calculator</a>), an infant is embryologically 38 weeks old at birth. Our tool adjusts for individual cycle lengths using <strong>Parikh’s formula</strong>, ensuring irregular cycles do not produce inaccurate dating or premature labor inductions.
            </p>
          </div>

          <h2>The Clinical Science of Due Date Estimation</h2>
          <p>
            Establishing an accurate gestational age is the cornerstone of modern obstetrical care. It determines the timing of vital biochemical screenings, anatomical scans, glucose tolerance testing, and clinical management in high-risk scenarios. When clinicians track pregnancy progress, they count in completed weeks and days rather than calendar months because fetal organogenesis follows a strict daily chronological biological timeline. You can track exact remaining calendar days using our <a href="/calculators/datetime/date-difference-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">date difference calculator</a>.
          </p>
          <p>
            Dating conventions rely on three validated methodologies: menstrual dating via <strong>Naegele’s Rule</strong> (linked to regular menses tracked on a <a href="/calculators/health/period-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">period calculator</a>), biometric crown-rump length (CRL) sonography, and documented fertile window intercourse recorded with a <a href="/calculators/health/fertility-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">fertility calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Naegele's Rule with Parikh's Cycle Adjustment</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{EDD} = \\text{LMP} + 280\\text{ days} + (\\text{Cycle Length} - 28\\text{ days})"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Adds 40 completed weeks to the start of the last menstrual period, then shifts the date forward or backward based on the difference between the patient's average cycle and the biological standard 28-day cycle.</div>
          </Formula>

          <h2>ACOG Gestational Age Classification Standards</h2>
          <p>
            In clinical practice, the term &ldquo;due date&rdquo; does not denote an absolute day of spontaneous labor. According to landmark studies published by the <em>American College of Obstetricians and Gynecologists</em> (ACOG) and the <em>Society for Maternal-Fetal Medicine</em> (SMFM), neonatal outcomes vary significantly across gestational weeks 37 to 42. Deliveries at 39 to 40 completed weeks exhibit the lowest incidences of respiratory distress syndrome, neonatal intensive care unit (NICU) admissions, and thermoregulation difficulties. Post-birth infant weight can be benchmarked immediately with our <a href="/calculators/baby/baby-weight-percentile-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby weight percentile calculator</a>.
          </p>

          <DataTable
            head={["Gestational Category", "Gestational Week Range", "Clinical Neonatal Characteristics", "Intervention Considerations"]}
            rows={[
              ["Preterm", "< 37 weeks (< 259 days)", "Immature lung surfactant; elevated risk of jaundice, feeding difficulty, and NICU admission.", "Tocolysis, antenatal corticosteroids, magnesium sulfate for neuroprotection."],
              ["Early Term", "37 weeks 0 days to 38 weeks 6 days", "Physiologically mature, but subtle risks of transient tachypnea and hypoglycemia remain.", "Elective delivery discouraged without maternal or fetal clinical indications."],
              ["Full Term", "39 weeks 0 days to 40 weeks 6 days", "Optimal neonatal neurological maturation, surfactant synthesis, and subcutaneous fat deposition.", "Ideal biological window for spontaneous labor and uncomplicated vaginal delivery."],
              ["Late Term", "41 weeks 0 days to 41 weeks 6 days", "Placental calcification begins; oligohydramnios (reduced amniotic fluid) risk increases.", "Biophysical profile (BPP) ultrasound and non-stress testing (NST) twice weekly."],
              ["Post-Term", "≥ 42 weeks (≥ 294 days)", "Significant rise in meconium aspiration syndrome, fetal macrosomia, and placental insufficiency.", "Labor induction clinically mandated to prevent perinatal stillbirth complications."],
            ]}
            highlight={2}
          />

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-8">
            <PregnancyMilestoneVisualizer />
          </div>

          <h2>Trimester Breakdown and Developmental Milestones</h2>
          <p>
            Human pregnancy spans approximately 40 completed weeks, divided into three distinct trimesters that reflect fundamentally different phases of maternal adaptation and fetal anatomical organogenesis.
          </p>

          <h3>First Trimester (Conception to Week 13 + 6 Days)</h3>
          <p>
            The first trimester encompasses the conversion of a single fertilized zygote into an anatomically complete human fetus. During gestational weeks 3 through 8 (the embryonic period), major organ systems differentiate: the neural tube closes by week 6, the primitive cardiac tube initiates rhythmic contractions around day 22, and limb buds form digits. Between weeks 11 and 13, first-trimester screening (combining maternal serum PAPP-A/hCG with ultrasound nuchal translucency) provides early chromosomal risk assessment. Maternal hydration is vital during this period; monitor daily fluid goals with our <a href="/calculators/health/water-intake-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">water intake calculator</a>.
          </p>

          <h3>Second Trimester (Week 14 + 0 Days to Week 27 + 6 Days)</h3>
          <p>
            Frequently referred to as the &ldquo;golden period&rdquo; of pregnancy due to the subsiding of morning nausea, the second trimester focuses on rapid skeletal ossification and somatic growth. The pivotal milestone occurs between weeks 18 and 22 with the comprehensive <strong>Anatomy Scan (Level II Ultrasound)</strong>, examining cardiac outflow tracts, cerebral ventricles, renal architecture, and placental cord insertion. Fetal viability—the threshold at which modern neonatal intensive care can support survival outside the womb—is reached between 23 and 24 weeks gestation. Parents often begin researching names at this stage using our <a href="/calculators/baby/baby-name-popularity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby name popularity calculator</a>.
          </p>

          <h3>Third Trimester (Week 28 + 0 Days to Delivery)</h3>
          <p>
            The final stretch prioritizes exponential weight gain, pulmonary alveolar development, and brain sulcal folding. During weeks 32 through 36, the fetus deposits subcutaneous brown adipose tissue to regulate body temperature post-birth and synthesizes surfactant in the lungs to prevent alveolar collapse upon the first breath. Expectant parents should begin planning postpartum routines, including newborn feeding protocols with our <a href="/calculators/baby/baby-feeding-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby feeding calculator</a>, infant sleep schedules with our <a href="/calculators/baby/baby-sleep-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby sleep calculator</a>, and recurring nursery expenses with our <a href="/calculators/baby/diaper-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">diaper cost calculator</a>.
          </p>

          <h2>Ultrasound Dating vs. Menstrual LMP Dating: The Discrepancy Rule</h2>
          <p>
            While Naegele’s rule offers convenient initial dating, ultrasound biometric measurements provide superior chronological precision when performed during early gestation. If a dating discrepancy arises between the reported LMP and first-trimester ultrasound biometric measurements, ACOG Practice Bulletin No. 700 mandates the following clinical reconciliation protocol:
          </p>

          <DataTable
            head={["Ultrasound Timing", "Biometric Metric Used", "Discrepancy Threshold Requiring Re-Dating", "Preferred Clinical Dating"]}
            rows={[
              ["< 8 weeks 6 days", "Crown-Rump Length (CRL)", "> 5 days discrepancy from LMP", "Re-date pregnancy to Ultrasound EDD"],
              ["9 weeks 0 days to 13 weeks 6 days", "Crown-Rump Length (CRL)", "> 7 days discrepancy from LMP", "Re-date pregnancy to Ultrasound EDD"],
              ["14 weeks 0 days to 15 weeks 6 days", "Biparietal Diameter (BPD), Femur Length (FL)", "> 7 days discrepancy from LMP", "Re-date pregnancy to Ultrasound EDD"],
              ["16 weeks 0 days to 21 weeks 6 days", "Head Circumference, Abdominal Circumference", "> 10 days discrepancy from LMP", "Re-date pregnancy to Ultrasound EDD"],
              ["22 weeks 0 days to 27 weeks 6 days", "Composite Biometric Parameters", "> 14 days discrepancy from LMP", "Re-date pregnancy to Ultrasound EDD"],
              ["≥ 28 weeks 0 days", "Composite Biometry (least accurate)", "> 21 days discrepancy from LMP", "Re-date pregnancy with caution; investigate IUGR"],
            ]}
          />

          <h2>Practical Tips for Expectant Mothers and Families</h2>
          <p>
            To optimize prenatal maternal-fetal outcomes and prepare smoothly for labor, delivery, and postpartum financial transitions, obstetrical authorities recommend establishing the following health and budgetary routines early:
          </p>
          <ul>
            <li><strong>Folic Acid Supplementation:</strong> Ingest 400 to 800 mcg of folic acid daily during pre-conception and the first trimester to reduce neural tube defect risks by up to 70%.</li>
            <li><strong>Hydration and Hemoglobin Support:</strong> Maternal plasma volume expands by 45% during pregnancy. Maintain at least 2.5 to 3 liters of water daily and consume dietary iron to prevent physiological gestational anemia.</li>
            <li><strong>Nursery &amp; Household Budgeting:</strong> Early preparation prevents financial strain. Structure your family finances with our <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">household budget calculator</a> and establish a liquidity buffer with our <a href="/calculators/finance/emergency-fund-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">emergency fund calculator</a> to accommodate upcoming delivery deductibles and future <a href="/calculators/baby/childcare-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">childcare costs</a>.</li>
            <li><strong>Fetal Kick Counting:</strong> From week 28 onward, monitor fetal movements daily during a quiet rest period. Feeling at least 10 distinct movements within a 2-hour window indicates reassuring fetal well-being.</li>
          </ul>
        </>
      }
    >
      <DueDateCalculator />
    </CalcPage>
  );
}
