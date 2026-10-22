import PregnancyDueDateCalculator from "@/components/calcs/health/pregnancy-due-date-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PregnancyFetalGrowthCurveChart } from "@/components/flagship/health/editorial-charts/PregnancyFetalGrowthCurveChart";

const PATH = "/calculators/health/pregnancy-due-date-calculator";
const TITLE = "Pregnancy Due Date Calculator – LMP, Trimesters & Growth | CalcDigi";
const DESCRIPTION =
  "Calculate your estimated due date (EDD), current gestational week, and trimester using Naegele's Rule. Includes fetal biometry curves, ACOG term benchmarks, and ultrasound dating.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const ACOG_TERM_CLASSIFICATION_TABLE = [
  {
    category: "Preterm Delivery",
    gestationalRange: "< 37 Weeks 0 Days",
    clinicalCharacteristics: "Elevated risk of neonatal respiratory distress syndrome, hypothermia, feeding difficulties, and hyperbilirubinemia.",
    recommendedManagement: "Tocolytic therapy, antenatal corticosteroids (betamethasone) for fetal lung maturation, and NICU readiness.",
  },
  {
    category: "Early Term",
    gestationalRange: "37 Weeks 0 Days – 38 Weeks 6 Days",
    clinicalCharacteristics: "Organs functionally mature, though higher rates of minor respiratory morbidities compared to 39+ weeks.",
    recommendedManagement: "Elective induction avoided unless medically indicated (e.g., preeclampsia, gestational hypertension).",
  },
  {
    category: "Full Term (Optimal Window)",
    gestationalRange: "39 Weeks 0 Days – 40 Weeks 6 Days",
    clinicalCharacteristics: "Optimal neonatal outcomes; lowest rates of respiratory failure, intracranial hemorrhage, and NICU admission.",
    recommendedManagement: "Ideal window for spontaneous or medically planned delivery.",
  },
  {
    category: "Late Term",
    gestationalRange: "41 Weeks 0 Days – 41 Weeks 6 Days",
    clinicalCharacteristics: "Gradual decline in placental perfusion; increased risk of oligohydramnios and meconium aspiration.",
    recommendedManagement: "Frequent biophysical profile (BPP) ultrasound and non-stress testing (NST).",
  },
  {
    category: "Post-Term",
    gestationalRange: "≥ 42 Weeks 0 Days",
    clinicalCharacteristics: "Placental insufficiency, macrosomia, fetal dysmaturity syndrome, and elevated stillbirth risk.",
    recommendedManagement: "Immediate induction of labor strongly advised by ACOG guidelines.",
  },
];

const TRIMESTER_DEVELOPMENT_TABLE = [
  {
    trimester: "First Trimester (Weeks 1 – 12)",
    embryonicEvents: "Fertilization, blastocyst implantation, neural tube closure (Day 28), cardiac morphogenesis, primitive hematopoiesis.",
    maternalPhysiology: "Rapid surge in beta-hCG and progesterone; morning nausea, fatigue, uterine vascular expansion.",
    keyClinicalScreening: "First-trimester nuchal translucency (NT) ultrasound and cell-free fetal DNA (cfDNA) non-invasive prenatal screening.",
  },
  {
    trimester: "Second Trimester (Weeks 13 – 26)",
    embryonicEvents: "Rapid musculoskeletal ossification, alveoli formation, quickening (maternal perception of fetal movements around wk 18–20).",
    maternalPhysiology: "Plasma volume expands by 40–50%; physiological hemodilution ('pseudoanemia'); pelvic ligamentous laxity.",
    keyClinicalScreening: "Comprehensive 18–22 week anatomical ultrasound survey (Level II scan) and maternal serum quad screen.",
  },
  {
    trimester: "Third Trimester (Weeks 27 – 40)",
    embryonicEvents: "Intense fetal adipose accretion, rapid cerebral sulcation, pulmonary surfactant secretion by Type II pneumocytes.",
    maternalPhysiology: "Diaphragmatic displacement, elevated cardiac output, Braxton Hicks contractions, pelvic symphysis softening.",
    keyClinicalScreening: "24–28 week oral glucose tolerance test (GDM screening), Group B Streptococcus (GBS) vaginal-rectal swab at 36 weeks.",
  },
];

export default function PregnancyDueDatePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Pregnancy Due Date Calculator"
      intro="Determine your Estimated Due Date (EDD), current gestational week, and trimester transitions using the obstetric gold-standard Naegele's Rule, calibrated to your individual menstrual cycle length."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{EDD} = \text{LMP} + 280 \text{ days} + (\text{Cycle Length} - 28 \text{ days})"
      related={[
        { href: "/calculators/health/ovulation-calculator", icon: "📅", name: "Ovulation Calculator" },
        { href: "/calculators/health/period-calculator", icon: "🩸", name: "Period Calculator" },
        { href: "/calculators/health/fertility-calculator", icon: "🌱", name: "Fertility Calculator" },
        { href: "/calculators/health/baby-weight-calculator", icon: "👶", name: "Baby Weight" },
        { href: "/calculators/health/child-height-predictor", icon: "📏", name: "Child Height" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
      ]}
      faq={[
        {
          q: "How does Naegele's Rule calculate an estimated due date (EDD)?",
          a: "Devised by German obstetrician Franz Karl Naegele in the 19th century, Naegele's Rule establishes human gestation at 280 days (40 completed weeks, or 10 lunar months) calculated from the first day of the last normal menstrual period (LMP). In calendar terms, you subtract 3 months from your LMP date and add 7 days (plus one year). Our calculator also corrects for menstrual cycle variation: if your cycle is 32 days rather than the textbook 28 days, ovulation occurred approximately 4 days later, shifting your EDD forward by 4 days.",
        },
        {
          q: "What percentage of women actually deliver on their exact due date?",
          a: "Only approximately 4% to 5% of babies are born on their exact mathematical due date. However, roughly 80% of spontaneous labors occur within a two-week window spanning 37 weeks to 42 weeks (the full-term range). The due date serves as a clinical anchor point to monitor fetal biometry, guide screening tests, and prevent prolonged post-term pregnancies.",
        },
        {
          q: "Why is an early ultrasound considered more accurate than LMP dating?",
          a: "Menstrual dating relies on the assumption of a regular 28-day cycle with ovulation occurring precisely on Day 14. However, follicular phase duration varies widely between individuals and across different cycles. First-trimester transvaginal ultrasound measuring Crown-Rump Length (CRL) between 7 and 13 weeks has an error margin of only ±3 to 5 days, making it the definitive clinical gold standard. According to ACOG guidelines, if ultrasound dating differs from LMP dating by more than 5 days in the first trimester, the ultrasound EDD replaces the menstrual EDD.",
        },
        {
          q: "What is the viability threshold for a developing fetus?",
          a: "In contemporary neonatal intensive care, 24 weeks of gestation is universally recognized as the clinical threshold of viability. At 24 completed weeks, fetal lungs develop primitive alveolar sacs and initiate pulmonary surfactant production, giving infants an estimated 60% to 70% survival rate under specialized tertiary neonatal intensive care (NICU).",
        },
        {
          q: "What are the exact weeks for the first, second, and third trimesters?",
          a: "According to ACOG and standard obstetric practice: 1) First Trimester spans Week 1 through Week 12 (+6 days); 2) Second Trimester spans Week 13 through Week 26 (+6 days); and 3) Third Trimester begins at Week 27 and concludes at delivery (typically Week 40).",
        },
        {
          q: "How should I calculate my due date if I underwent IVF (In Vitro Fertilization)?",
          a: "For IVF pregnancies, gestational dating is extraordinarily precise because the exact fertilization and embryo transfer dates are known. For a Day 3 embryo transfer, the due date is calculated by adding 263 days to the transfer date. For a Day 5 blastocyst transfer, add 261 days to the transfer date.",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Obstetrics &amp; Maternal-Fetal Medicine Review:</span> Calibrated to the American College of Obstetricians and Gynecologists (ACOG Committee Opinion No. 700), Naegele&apos;s Rule, and Hadlock biometry standards.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Clinical Standards</div>
        </div>

        {/* Section 1: The Chronobiology of Gestation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Chronobiology of Human Gestation: 280 Days Explained
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In human obstetrics, gestational age is conventionally measured not from the moment of conception, but from the <strong>first day of the last normal menstrual period (LMP)</strong>. Because human conception typically occurs at ovulation—approximately 14 days following menses in a classic 28-day cycle—a woman is considered two weeks pregnant at the moment fertilization actually takes place.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Total human pregnancy endures for an average of <strong>280 days (40 completed weeks)</strong> from the LMP, which corresponds to <strong>266 days (38 weeks)</strong> of true embryonic and fetal post-conception development. Naegele&apos;s classical formulation provides the mathematical backbone for global prenatal healthcare:
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"\\text{Estimated Due Date (EDD)} = \\text{LMP} + 280 \\text{ days} + (\\text{Cycle Length} - 28 \\text{ days})"}</Formula>
          </div>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Fetal Biometry &amp; Milestone Growth Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore the physiological Hadlock growth trajectory across weeks 8 to 40. Scrub along the curve to observe estimated fetal weight in grams and pounds, crown-to-heel length in centimeters, trimester divisions, and major organ development milestones:
          </p>
          <PregnancyFetalGrowthCurveChart />
        </section>

        {/* Section 3: ACOG Term Classifications */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            ACOG Gestational Term Classifications
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2013, the American College of Obstetricians and Gynecologists (ACOG) and the Society for Maternal-Fetal Medicine (SMFM) replaced the broad label &quot;term&quot; with four distinct, clinically actionable sub-classifications to protect neonatal health:
          </p>
          <DataTable
            head={["Gestational Category", "Completed Gestational Weeks", "Neonatal Pathophysiology", "Obstetric Clinical Management"]}
            rows={ACOG_TERM_CLASSIFICATION_TABLE.map((row) => [
              <strong key={row.category} className="text-slate-900 dark:text-slate-100">{row.category}</strong>,
              row.gestationalRange,
              row.clinicalCharacteristics,
              row.recommendedManagement,
            ])}
          />
        </section>

        {/* Section 4: Trimester Development Breakdown */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Trimester Physiology: Embryogenesis to Pulmonary Surfactant
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The 40-week gestational journey is organized into three distinct biological trimesters:
          </p>
          <DataTable
            head={["Trimester & Timeframe", "Fetal Developmental Events", "Maternal Adaptations", "Essential Clinical Screenings"]}
            rows={TRIMESTER_DEVELOPMENT_TABLE.map((row) => [
              <strong key={row.trimester} className="text-slate-900 dark:text-slate-100">{row.trimester}</strong>,
              row.embryonicEvents,
              row.maternalPhysiology,
              row.keyClinicalScreening,
            ])}
          />
        </section>

        {/* Section 5: Ultrasound vs Menstrual Dating */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Precision: Menstrual LMP vs. First-Trimester Ultrasound Dating
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            ACOG Committee Opinion No. 700 defines the precise protocol for reconciling menstrual due dates with sonographic measurements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Crown-Rump Length (CRL)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Before 14 weeks, biological variation in human fetal size is virtually non-existent. A high-resolution CRL measurement between 8 and 13 weeks possesses an accuracy of ±3 to 5 days. If the ultrasound date differs from LMP by more than 5 days (up to 8 6/7 weeks) or more than 7 days (between 9 and 13 6/7 weeks), the ultrasound date supersedes the menstrual date.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Second-Trimester Biometry</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Beyond 14 weeks, genetic variations, parental stature, and nutritional factors begin influencing growth. Second-trimester dating utilizes composite measurements (Biparietal Diameter BPD, Head Circumference HC, Abdominal Circumference AC, and Femur Length FL), carrying a wider margin of error of ±7 to 10 days.
              </p>
            </div>
          </div>
        </section>
      
        
        {/* Advanced Clinical Obstetric Surveillance & Perinatal Guidelines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Advanced Clinical Obstetric Surveillance: Sonography &amp; Gestational Protocols
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In modern evidence-based obstetrics, establishing an accurate Estimated Due Date (EDD) serves as the clinical foundation for timing diagnostic screenings, monitoring intrauterine growth velocity, and preventing complications of post-term gestation. While historical Naegele&apos;s Rule assumes an idealized 28-day menstrual cycle with ovulation occurring precisely on Day 14, empirical human biological variation requires continuous clinical reconciliation between menstrual dating and high-resolution sonographic biometry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">First-Trimester Crown-Rump Length (CRL) Accuracy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Prior to 14 weeks gestation, biological growth variance among human embryos is practically non-existent. A high-resolution CRL measurement performed between 8 and 13 weeks carries an exceptional clinical accuracy of ±3 to 5 days. According to American College of Obstetricians and Gynecologists (ACOG) Committee Opinion No. 700, if the sonographic CRL differs from the menstrual LMP calculation by more than 5 days (up to 8 6/7 weeks) or more than 7 days (between 9 and 13 6/7 weeks), the ultrasound dating permanently supersedes the menstrual date.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Amniotic Fluid Index (AFI) &amp; Late-Term Surveillance</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                As pregnancies progress beyond 40 completed weeks, placental syncytiotrophoblast vascular resistance rises and perfusion gradually declines. Clinicians evaluate amniotic fluid volume using the four-quadrant Amniotic Fluid Index (AFI, normal range 5 to 25 cm) or single deepest pocket (&gt;2 cm). Oligohydramnios (AFI &lt; 5 cm) reflects decreased fetal renal perfusion and signals progressive uteroplacental insufficiency, warranting planned labor induction.
              </p>
            </div>
          </div>
          <h2>Essential Antenatal Screening Milestones Across Trimesters</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Navigating a healthy pregnancy requires systematic prenatal surveillance calibrated to your calculated gestational age:
          </p>
          <ul>
            <li><strong>Weeks 10 to 13 (Cell-Free Fetal DNA Screening):</strong> Non-invasive prenatal testing (NIPT) analyzes circulating trophoblastic fragments in maternal plasma to screen for Trisomy 21 (Down syndrome), Trisomy 18, and Trisomy 13 with sensitivity exceeding 99%.</li>
            <li><strong>Weeks 18 to 22 (Comprehensive Level II Anatomy Scan):</strong> Detailed anatomical survey evaluating cerebral ventricles, facial profile, cardiac four-chamber and outflow tract views, spine, kidneys, and umbilical cord vessel count.</li>
            <li><strong>Weeks 24 to 28 (Gestational Diabetes Screening):</strong> 50-gram oral glucose tolerance challenge to assess maternal pancreatic beta-cell insulin compensation against placental human placental lactogen (hPL).</li>
            <li><strong>Weeks 35 to 37 (Group B Streptococcus Screening):</strong> Rectovaginal culture identifies maternal GBS colonization, guiding intrapartum prophylactic intravenous penicillin administration during labor.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Fewer than 5% of spontaneous deliveries occur on the exact calculated due date; spontaneous delivery between 37 weeks 0 days and 41 weeks 6 days is clinically normal and safe under regular medical supervision.
          </p>
        </section>

        
          <h2>Evidence-Based Antenatal Timeline: First to Third Trimester Milestones</h2>
          <p>
            Navigating a healthy pregnancy requires systematic prenatal surveillance calibrated to your calculated gestational age:
          </p>
          <ul>
            <li><strong>Weeks 6 to 10 (Initial Viability Scan):</strong> Transvaginal or transabdominal ultrasound confirms intrauterine gestation, visualizes the fetal pole, detects embryonic cardiac activity (&gt;110 bpm), and establishes baseline crown-rump length (CRL).</li>
            <li><strong>Weeks 11 to 14 (Aneuploidy &amp; Nuchal Translucency):</strong> Non-invasive prenatal testing (NIPT / cell-free fetal DNA screening) paired with nuchal translucency (NT) sonography screens for chromosomal trisomies (Trisomy 21, 18, 13) with over 99% clinical sensitivity.</li>
            <li><strong>Weeks 18 to 22 (Comprehensive Level II Anatomy Survey):</strong> Detailed sonographic evaluation of fetal intracranial structures, cardiac four-chamber views, spinal cord integrity, renal morphology, and placental cord insertion.</li>
            <li><strong>Weeks 24 to 28 (Gestational Diabetes Screening):</strong> 50-gram oral glucose challenge test (GCT) evaluates pancreatic beta-cell insulin compensation to prevent gestational hyperglycemia and fetal macrosomia.</li>
            <li><strong>Weeks 36 to 37 (Group B Streptococcus Screening):</strong> Routine rectovaginal culture identifies GBS colonization to guide intrapartum prophylactic intravenous antibiotic administration during labor.</li>
          </ul>
          <p>
            Coordinate closely with your obstetrician or certified nurse-midwife to personalize prenatal visits, monitor blood pressure, and maintain optimal maternal-fetal wellness.
          </p>


        
          <h2>Obstetric Dating Sonography: Crown-Rump vs Biparietal Diameter</h2>
          <p>
            In clinical obstetrics, ultrasound biometry provides the definitive benchmark for confirming or revising menstrual due dates. Before 14 weeks gestation, biological variation in embryonic growth is virtually absent, making crown-rump length (CRL) measurements accurate to within ±3 to 5 days. If a first-trimester ultrasound measurement differs from the menstrual Naegele calculation by more than 5 days (up to 8 6/7 weeks) or more than 7 days (from 9 to 13 6/7 weeks), ACOG guidelines mandate that the ultrasound date replaces the menstrual LMP date.
          </p>
          <p>
            During the second and third trimesters, sonographic dating utilizes composite anatomical metrics—including biparietal diameter (BPD), head circumference (HC), abdominal circumference (AC), and femur length (FL). Because genetic variations and maternal placental perfusion introduce natural anatomical divergence, second-trimester scans carry a wider margin of error (±7 to 10 days), and third-trimester scans carry an error margin of ±14 to 21 days.
          </p>
          <h2>Late-Term Management &amp; Labor Induction Standards</h2>
          <p>
            Between 41 weeks 0 days and 41 weeks 6 days (late term), uteroplacental vascular resistance increases, elevating risks of oligohydramnios and meconium aspiration syndrome. The landmark ARRIVE trial demonstrated that elective induction of labor at 39 weeks in low-risk nulliparous women reduced rates of cesarean delivery and neonatal respiratory morbidity compared to expectant management beyond 40 weeks.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Obstetric tracking spans from preconception timing through postpartum pediatric milestones. Verify conception cycle parameters using the <a href="/calculators/health/ovulation-calculator">Ovulation Calculator</a> and <a href="/calculators/health/fertility-calculator">Fertility Calculator</a>, monitor newborn weight velocity with the <a href="/calculators/health/baby-weight-calculator">Baby Weight Calculator</a>, and predict adult stature with our <a href="/calculators/health/child-height-predictor">Child Height Predictor</a>.
          </p>
        </section>
              </>
      }
    >
      <PregnancyDueDateCalculator />
    </CalcPage>
  );
}
