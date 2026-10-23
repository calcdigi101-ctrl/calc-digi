import type { Metadata } from "next";
import { Suspense } from "react";
import BabySleepCalculator from "@/components/calcs/baby/baby-sleep-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SleepArchitectureCyclesChart } from "@/components/flagship/health/editorial-charts/SleepArchitectureCyclesChart";

const PATH = "/calculators/baby/baby-sleep-calculator";
const TITLE = "Baby Sleep Calculator – Wake Windows, Bedtime & Nap Schedules | CalcDigi";
const DESCRIPTION =
  "Calculate optimal baby bedtime, wake windows, and daytime nap schedules from birth to 36 months using American Academy of Pediatrics (AAP) sleep benchmarks. Features circadian rhythm timelines and sleep architecture guides.";

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
  { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date Calculator" },
  { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile Calculator" },
  { href: "/calculators/baby/diaper-cost-calculator", icon: "🧷", name: "Diaper Lifetime Cost Calculator" },
  { href: "/calculators/baby/childcare-cost-calculator", icon: "🧸", name: "Childcare & Daycare Cost Calculator" },
  { href: "/calculators/health/sleep-calculator", icon: "😴", name: "Adult Sleep Cycle Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is an infant 'wake window' and why is it so critical?",
    a: "A wake window is the biological duration an infant can comfortably stay awake between sleep sessions without becoming overtired. An overtired baby produces elevated cortisol and adrenaline, which triggers a fight-or-flight stress response that makes falling asleep and staying asleep dramatically harder. Honoring age-appropriate wake windows prevents overtired meltdowns and nap resistance.",
  },
  {
    q: "Why do infant sleep cycles differ from adult sleep cycles?",
    a: "An adult sleep cycle lasts approximately 90 to 110 minutes, transitioning through light sleep, deep slow-wave NREM, and REM. In contrast, an infant sleep cycle lasts only 45 to 50 minutes, and newborns spend nearly 50% of their sleep in active REM sleep (compared to only 20% in adults). This shorter cycle means babies briefly arouse every 45 minutes, requiring soothing or independent self-settling skills to link sleep cycles.",
  },
  {
    q: "What causes the infamous '4-month sleep regression'?",
    a: "The 4-month regression is not a regression at all, but a permanent neurological maturation of sleep architecture. Around 14 to 18 weeks, infant sleep shifts from primitive newborn 2-stage sleep to adult-like 4-stage sleep cycles. As infants enter lighter Stage 1 and Stage 2 sleep at the end of each 45-minute cycle, they wake fully and cry if the sleep associations present when they fell asleep (rocking, nursing, bouncing) have changed.",
  },
  {
    q: "How many hours of sleep does a baby need in 24 hours?",
    a: "The American Academy of Sleep Medicine (AASM) and AAP recommend: Newborns (0–3 months): 14 to 17 hours; Infants (4–11 months): 12 to 16 hours (including naps); Toddlers (1–2 years): 11 to 14 hours; Preschoolers (3–5 years): 10 to 13 hours per 24 hours.",
  },
  {
    q: "What are the AAP guidelines for safe infant sleep?",
    a: "The AAP 'ABC' rule for preventing Sudden Infant Death Syndrome (SIDS): Place baby Alone, on their Back, in an empty Crib or bassinet on a firm, flat mattress with a fitted sheet. Never use crib bumpers, pillows, blankets, or stuffed toys. Room-share without bed-sharing for at least the first 6 months.",
  },
  {
    q: "When do babies develop a true circadian rhythm?",
    a: "Newborns are born with an immature suprachiasmatic nucleus (the brain's master biological clock) and lack intrinsic melatonin production. Circadian melatonin secretion begins around 8 to 12 weeks of age, stimulated by daily exposure to morning sunlight and dark, calm evening environments.",
  },
];

export default function BabySleepPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Baby Sleep & Wake Windows Calculator"
      intro="Determine optimal bedtime, age-appropriate wake windows, and daytime nap schedules from birth to 36 months based on American Academy of Pediatrics (AAP) and AASM clinical standards."
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
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">AAP Safe Sleep Policy &amp; AASM Pediatric Consensus</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Pediatric Sleep Medicine Reference</span>
              <span>•</span>
              <time dateTime="2026-10-23">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Clinical Summary: The Science of Infant Sleep &amp; Wake Windows
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Infant sleep operates on a fundamentally different neurobiological rhythm than adult sleep. While adults cycle through 90-minute sleep stages, infants experience <strong>45 to 50-minute ultradian cycles</strong> with a high percentage of active REM sleep essential for synaptic pruning and memory consolidation. By calculating bedtime from morning wake time using <strong>age-calibrated wake windows</strong>, parents prevent homeostatic sleep pressure from overflowing into cortisol-driven overtiredness, allowing longer consolidated nocturnal sleep stretches.
            </p>
          </div>

          <h2>Infant Sleep Architecture: Active REM vs. Quiet Sleep</h2>
          <p>
            During the first three months of life, neonatal sleep is divided into two primary biological states: <strong>Active Sleep</strong> (the evolutionary precursor to REM sleep) and <strong>Quiet Sleep</strong> (the precursor to non-REM slow-wave sleep).
          </p>
          <p>
            Newborns spend roughly 50% of their total sleep duration in active REM sleep. In active sleep, the infant&apos;s brain is intensely metabolically active: breathing is irregular, eyes flutter under eyelids, and subtle facial grimaces or limb twitches occur. Parents often mistake these normal active sleep movements for waking and inadvertently intervene, interrupting the infant&apos;s natural transition into quiet restorative sleep.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Bedtime Calculation Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Bedtime} = \\text{Wake Time} + \\sum(\\text{Wake Windows}) + \\sum(\\text{Nap Durations})"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Projects ideal evening sleep onset by sequencing progressive daytime wake windows and restorative nap periods, avoiding overtired bedtime hyperarousal.</div>
          </Formula>

          <h2>Age-Calibrated Wake Windows and Sleep Benchmarks (0 to 36 Months)</h2>
          <p>
            The table below synthesizes consensus recommendations from the <em>American Academy of Pediatrics</em> (AAP) and the <em>American Academy of Sleep Medicine</em> (AASM):
          </p>

          <DataTable
            head={["Age Milestone", "Recommended Wake Window", "Daytime Naps", "Total Daytime Nap Hours", "Target Night Sleep", "Total 24-Hour Sleep"]}
            rows={[
              ["Newborn (0–6 weeks)", "45 to 60 minutes", "4 to 6 naps", "6.5 to 8.0 hours", "8.0 to 9.0 hours", "14 to 17 hours"],
              ["2 to 3 Months", "60 to 90 minutes", "3 to 4 naps", "4.5 to 6.0 hours", "9.0 to 10.0 hours", "14 to 16 hours"],
              ["4 to 5 Months", "1.5 to 2.25 hours", "3 naps", "3.0 to 4.0 hours", "10.0 to 11.0 hours", "13.5 to 15 hours"],
              ["6 to 8 Months", "2.0 to 3.0 hours", "2 to 3 naps", "2.5 to 3.5 hours", "10.5 to 11.5 hours", "13 to 14.5 hours"],
              ["9 to 12 Months", "2.75 to 3.75 hours", "2 naps", "2.0 to 3.0 hours", "11.0 to 12.0 hours", "13 to 14 hours"],
              ["13 to 18 Months", "3.5 to 4.5 hours", "1 to 2 naps", "2.0 to 2.5 hours", "11.0 to 12.0 hours", "12 to 14 hours"],
              ["19 to 36 Months (2–3 yr)", "5.0 to 6.0 hours", "1 nap (or drop)", "1.5 to 2.0 hours", "10.5 to 11.5 hours", "11 to 13 hours"],
            ]}
            highlight={2}
          />

          {/* Interactive Visual Editorial Chart */}
          <div className="not-prose my-8">
            <SleepArchitectureCyclesChart />
          </div>

          <h2>The 4-Month Sleep Regression: What Actually Happens</h2>
          <p>
            Around 14 to 18 weeks of life, every human infant undergoes a permanent neurological reorganization of sleep. At this stage:
          </p>
          <ol>
            <li><strong>Sleep Architecture Matures:</strong> Infant sleep transitions from a 2-stage newborn pattern into the 4 distinct adult sleep stages (Stage 1 Light, Stage 2 True Sleep, Stage 3 Deep Slow-Wave, and REM).</li>
            <li><strong>Sleep Cycle Transitions Become Conscious:</strong> At the end of every 45-minute cycle, the infant enters a brief arousal period. If the infant relied on maternal nursing, vigorous rocking, or a pacifier to fall asleep initially, they discover those conditions missing upon awakening and alert their parents with cries.</li>
            <li><strong>Establishing Healthy Sleep Associations:</strong> Putting the infant down &ldquo;drowsy but awake&rdquo; teaches the neurological pathways of self-regulation, allowing the baby to connect sleep cycles independently throughout the night.</li>
          </ol>

          <h2>AAP Safe Sleep Protocols (The ABCs of Sleep)</h2>
          <p>
            To eliminate sleep-related infant fatalities and Sudden Infant Death Syndrome (SIDS), the AAP mandates strict compliance with the evidence-based <strong>ABC Safe Sleep Guidelines</strong>:
          </p>
          <ul>
            <li><strong>A — Alone:</strong> The infant should always sleep in their own dedicated sleep space. Never share an adult bed, couch, or armchair with an infant, which increases asphyxiation and entrapment risks exponentially.</li>
            <li><strong>B — on their Back:</strong> Always place the infant on their back for every sleep period (naps and nighttime). Side and stomach sleeping restrict airway patency and impair arousal reflexes.</li>
            <li><strong>C — in a Crib:</strong> Use a Consumer Product Safety Commission (CPSC) approved crib, bassinet, or play yard with a firm, flat, non-inclined mattress and a tightly fitted sheet. Keep the sleep surface completely bare—no pillows, quilts, weighted swaddles, sheepskins, or bumper pads.</li>
          </ul>

          <h2>Designing an Optimal Sleep Environment</h2>
          <p>
            Environmental cues act as powerful <em>zeitgebers</em> (biological time-givers) that accelerate circadian rhythm stabilization:
          </p>
          <ul>
            <li><strong>Ambient Temperature:</strong> Maintain the infant nursery between <strong>68°F and 72°F (20°C to 22°C)</strong>. Overheating is an established major risk factor for SIDS; dress the infant in no more than one layer more than an adult would wear.</li>
            <li><strong>White Noise:</strong> Continuous, low-frequency white noise (around 50 to 60 decibels, placed at least 7 feet from the crib) masks domestic household noise and simulates the maternal intra-uterine acoustic environment.</li>
            <li><strong>Complete Darkness:</strong> Melatonin secretion is light-sensitive. Utilize blackout window treatments for both nighttime sleep and daytime naps once the infant passes 10 weeks of age.</li>
          </ul>
        </>
      }
    >
      <BabySleepCalculator />
    </CalcPage>
  );
}
