import SleepCalculator from "@/components/calcs/health/sleep-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SleepArchitectureCyclesChart } from "@/components/flagship/health/editorial-charts/SleepArchitectureCyclesChart";

const PATH = "/calculators/health/sleep-calculator";
const TITLE = "Sleep Calculator – 90-Minute Cycles, Bedtime & Wake Times | CalcDigi";
const DESCRIPTION =
  "Find the optimal bedtime and wake-up times based on natural 90-minute ultradian sleep cycles. Prevent sleep inertia grogginess and wake up alert and fully refreshed.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const SLEEP_STAGES_TABLE = [
  {
    stage: "Stage N1 (Light Transitional)",
    brainwaves: "Alpha (8–12 Hz) shifting to low-amplitude Theta (4–7 Hz)",
    duration: "1 to 7 minutes (2–5% of total night)",
    role: "The threshold between wakefulness and slumber; involuntary muscle twitches (hypnic jerks) often occur.",
  },
  {
    stage: "Stage N2 (Core Sleep)",
    brainwaves: "Theta baseline punctuated by Sleep Spindles & K-Complexes (11–16 Hz)",
    duration: "10 to 25 minutes per cycle (45–55% of total night)",
    role: "Heart rate decelerates, body temperature drops; crucial for procedural motor skill consolidation and sensory gating.",
  },
  {
    stage: "Stage N3 (Slow-Wave Deep Sleep)",
    brainwaves: "High-amplitude Delta waves (0.5–2 Hz)",
    duration: "20 to 40 minutes in early cycles (15–25% of total night)",
    role: "Most physically restorative phase; massive human growth hormone (HGH) secretion, tissue repair, and glymphatic clearance.",
  },
  {
    stage: "REM (Rapid Eye Movement)",
    brainwaves: "Desynchronized fast Beta / Theta resembling active wakefulness",
    duration: "10 to 60 minutes, lengthening across the night (20–25% total)",
    role: "Vivid dreaming, complete skeletal muscle atonia, emotional trauma processing, and creative associative memory formation.",
  },
];

const LIFESPAN_RECOMMENDATIONS_TABLE = [
  { ageGroup: "Newborns (0–3 months)", optimalHours: "14 – 17 hours", acceptableRange: "11 – 19 hours", clinicalNotes: "Polyphasic sleep distributed across day and night without established circadian melatonin rhythm." },
  { ageGroup: "Infants (4–11 months)", optimalHours: "12 – 15 hours", acceptableRange: "10 – 18 hours", clinicalNotes: "Consolidation into longer nocturnal bouts with two daytime naps." },
  { ageGroup: "Toddlers (1–2 years)", optimalHours: "11 – 14 hours", acceptableRange: "9 – 16 hours", clinicalNotes: "High requirement for synaptic remodeling and cognitive language acquisition." },
  { ageGroup: "School-Age Children (6–13 years)", optimalHours: "9 – 11 hours", acceptableRange: "7 – 12 hours", clinicalNotes: "Somatic growth, skeletal mineralization, and prefrontal emotional regulation." },
  { ageGroup: "Teenagers (14–17 years)", optimalHours: "8 – 10 hours", acceptableRange: "7 – 11 hours", clinicalNotes: "Circadian phase delay shifts natural melatonin release 2 hours later into the evening." },
  { ageGroup: "Adults (18–64 years)", optimalHours: "7 – 9 hours (5–6 cycles)", acceptableRange: "6 – 10 hours", clinicalNotes: "Optimal cognitive performance, cardiovascular resilience, and metabolic insulin sensitivity." },
  { ageGroup: "Older Adults (65+ years)", optimalHours: "7 – 8 hours", acceptableRange: "5 – 9 hours", clinicalNotes: "Decreased delta slow-wave amplitude; earlier awakening due to advanced sleep phase syndrome." },
];

export default function SleepPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Sleep Calculator"
      intro="Optimize your bedtime and wake times using the neurobiology of 90-minute ultradian sleep cycles. Align your alarm with light sleep or REM boundaries to eliminate morning sleep inertia."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Target Wake Time} = \text{Bedtime} + \text{Latency (15 min)} + N \cdot 90 \text{ min}"
      related={[
        { href: "/calculators/health/intermittent-fasting-calculator", icon: "⏳", name: "Intermittent Fasting" },
        { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
      ]}
      faq={[
        {
          q: "Why do I feel exhausted and groggy even after sleeping 8 or 9 hours?",
          a: "Feeling groggy upon waking—a clinical state termed 'sleep inertia'—is rarely caused by too little sleep, but rather by waking up at the wrong point in your sleep architecture. If your alarm sounds while you are in the middle of Stage N3 Slow-Wave Deep Sleep, your brain is flooded with slow delta waves and high adenosine. Awakening from N3 causes severe disorientation, cognitive fogginess, and slow reaction times for 30 to 60 minutes. Waking at the completion of a 90-minute cycle ensures you awaken from light Stage 1 or REM sleep with immediate mental clarity.",
        },
        {
          q: "How many sleep cycles does an adult need per night?",
          a: "Healthy adults require 5 complete sleep cycles (7.5 hours of sleep) for optimal cognitive, immune, and metabolic function. Highly active individuals, athletes undergoing intense physical training, and teenagers benefit from 6 complete cycles (9.0 hours). While 4 cycles (6.0 hours) can be tolerated temporarily, sustained restriction below 5 cycles creates cumulative sleep debt, impairs insulin sensitivity, and increases all-cause mortality risk.",
        },
        {
          q: "What is the 15-minute sleep latency buffer?",
          a: "Sleep latency is the duration required to transition from full wakefulness to Stage 1 NREM sleep. In healthy, well-regulated adults, normal sleep latency ranges between 10 and 20 minutes (with 15 minutes being the clinical median). Our calculator automatically factors this 15-minute buffer into its recommendations, ensuring your calculated sleep duration reflects true slumber rather than time lying awake.",
        },
        {
          q: "What is the Glymphatic System and why does deep sleep matter for brain health?",
          a: "Discovered by Dr. Maiken Nedergaard at the University of Rochester, the glymphatic system is a macroscopic waste clearance pathway that operates almost exclusively during Stage N3 Slow-Wave Deep Sleep. Glial cells shrink by up to 60%, allowing cerebrospinal fluid (CSF) to wash through brain tissue and flush out toxic metabolic byproducts, including beta-amyloid plaques and hyperphosphorylated tau proteins associated with Alzheimer's disease.",
        },
        {
          q: "Is a 90-minute nap better than a 20-minute power nap?",
          a: "Both serve distinct physiological purposes. A 20-minute power nap keeps you strictly within Stage 1 and light Stage 2 sleep, providing a quick alertness boost without entering deep slow-wave sleep or causing sleep inertia. Conversely, a 90-minute nap completes an entire ultradian cycle, incorporating both slow-wave physical recovery and REM emotional/creative memory consolidation.",
        },
        {
          q: "How does alcohol or late caffeine ruin sleep architecture?",
          a: "Although alcohol acts as a central nervous system depressant that may shorten sleep latency, it severely fragments sleep architecture in the second half of the night, suppressing REM sleep by up to 80% and preventing deep restorative slow-wave cycles. Caffeine has an average half-life of 5 to 7 hours, blocking adenosine receptors in the prefrontal cortex and reducing deep N3 delta sleep even if you fall asleep on time.",
        },
      ]}
    >
      <SleepCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Sleep Medicine &amp; Neurobiology Review:</span> Calibrated to the American Academy of Sleep Medicine (AASM), Sleep Research Society (SRS), and National Sleep Foundation ultradian guidelines.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Chronobiological Standards</div>
        </div>

        {/* Section 1: The Ultradian Cycle */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The 90-Minute Ultradian Rhythm: Sleep Architecture Explained
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Human sleep is not a monolithic state of unconsciousness; rather, it is a highly choreographed neurological symphony orchestrated by the hypothalamus and brainstem. Throughout the night, the brain cycles repeatedly through two fundamentally distinct physiological states: <strong>Non-Rapid Eye Movement (NREM)</strong> sleep and <strong>Rapid Eye Movement (REM)</strong> sleep.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            A single complete sleep cycle endures approximately <strong>90 to 110 minutes</strong>. In the early cycles of the night, the brain prioritizes <strong>Stage N3 Slow-Wave Deep Sleep</strong>—the phase dedicated to somatic tissue rebuilding, bone growth, and neurochemical detoxification. In the final cycles approaching dawn, N3 disappears almost entirely, and <strong>REM sleep</strong> expands dramatically, facilitating emotional memory consolidation, linguistic synthesis, and creative insight.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive 8-Hour Sleep Architecture Hypnogram
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Follow the trajectory of brainwave activity across five 90-minute ultradian cycles. Scrub across the hypnogram to inspect real-time brainwave frequencies, cellular recovery events, and the exact green checkpoints where waking produces zero sleep inertia:
          </p>
          <SleepArchitectureCyclesChart />
        </section>

        {/* Section 3: The 4 Stages of Sleep */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Electrophysiological Stages of the Human Sleep Cycle
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Polysomnography categorizes nocturnal sleep into four electroencephalographic (EEG) stages:
          </p>
          <DataTable
            head={["Sleep Stage", "Dominant EEG Brainwaves", "Proportion of Night", "Physiological Function & Systemic Benefit"]}
            rows={SLEEP_STAGES_TABLE.map((row) => [
              <strong key={row.stage} className="text-slate-900 dark:text-slate-100">{row.stage}</strong>,
              row.brainwaves,
              row.duration,
              row.role,
            ])}
          />
        </section>

        {/* Section 4: The Neurobiology of Sleep Inertia */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Neurobiology of Sleep Inertia: Why Timing Trumps Total Hours
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Have you ever slept for 8.5 hours only to wake up feeling disoriented, irritable, and physically exhausted? This debilitating phenomenon is known in neurology as <strong>sleep inertia</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
              <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-2">
                Abrupt Slow-Wave Arousal (Awakening during N3)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When an alarm forcibly halts Stage N3 delta sleep, cortical blood flow to the prefrontal cortex remains depressed. Adenosine levels are elevated, and the brain requires 30 to 60 minutes to re-establish normal synaptic firing rates, severely impairing short-term working memory and reaction time.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
              <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Ultradian Boundary Awakening (Awakening from REM / N1)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                At the completion of a 90-minute cycle, the brain naturally surfaces into light N1 or REM sleep. Cortisol Awakening Response (CAR) begins naturally, core body temperature ticks upward, and prefrontal cerebral blood flow is fully operational upon opening your eyes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Lifespan Sleep Guidelines */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            National Sleep Foundation &amp; CDC Consensus Lifespan Standards
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The consensus recommendations established by an expert panel of 18 multidisciplinary sleep researchers:
          </p>
          <DataTable
            head={["Developmental Stage", "Recommended Nocturnal Sleep", "Acceptable Range", "Clinical & Chronobiological Characteristics"]}
            rows={LIFESPAN_RECOMMENDATIONS_TABLE.map((row) => [
              <strong key={row.ageGroup} className="text-slate-900 dark:text-slate-100">{row.ageGroup}</strong>,
              row.optimalHours,
              row.acceptableRange,
              row.clinicalNotes,
            ])}
          />
        </section>
      
        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Restorative sleep is fundamental for autonomic recovery, metabolic regulation, and vascular control. Track resting cardiovascular strain with our <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, balance resting metabolic burn with the <a href="/calculators/health/bmr-calculator">BMR Calculator</a>, coordinate eating windows with the <a href="/calculators/health/intermittent-fasting-calculator">Intermittent Fasting Calculator</a>, and monitor autonomic recovery using the <a href="/calculators/health/heart-rate-zone-calculator">Heart Rate Zone Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
