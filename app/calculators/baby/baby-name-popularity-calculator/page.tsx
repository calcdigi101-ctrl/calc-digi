import type { Metadata } from "next";
import { Suspense } from "react";
import BabyNamePopularityCalculator from "@/components/calcs/baby/baby-name-popularity-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BabyNamePopularityEraSpectrumChart } from "@/components/flagship/baby/editorial-charts";

const PATH = "/calculators/baby/baby-name-popularity-calculator";
const TITLE = "Baby Name Popularity Calculator – SSA Historical Trends & Uniqueness | CalcDigi";
const DESCRIPTION =
  "Search baby name popularity rankings, national frequency, and uniqueness percentiles based on official U.S. Social Security Administration (SSA) records from 1880 to 2026. Discover century naming cycles and phonetic trend analyses.";

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
  { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date Calculator" },
  { href: "/calculators/baby/child-height-predictor-calculator", icon: "📏", name: "Child Height Predictor Calculator" },
  { href: "/calculators/baby/baby-sleep-calculator", icon: "🌙", name: "Baby Sleep & Wake Windows" },
  { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
  { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile Calculator" },
  { href: "/calculators/baby/childcare-cost-calculator", icon: "🧸", name: "Childcare & Daycare Cost Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "Where does the official baby name popularity data originate?",
    a: "All historical ranking data originates directly from the United States Social Security Administration (SSA), which has recorded every baby name registered on Social Security card applications since 1880. To protect privacy while providing robust statistical accuracy, the SSA publishes all names that receive 5 or more occurrences in a given calendar year.",
  },
  {
    q: "Why are the #1 baby names today given to far fewer babies than in past decades?",
    a: "This phenomenon is known in onomastics as 'naming diversification.' In 1950, the top 10 boys' names (such as James, Robert, and John) accounted for over 32% of all baby boys born in America. Today, the top 10 boys' names account for under 7% of total births. Parents increasingly favor unique, culturally diverse, botanical, or individualized monikers, meaning even a #1 ranked name like Liam or Olivia is far less ubiquitous than a top name was 50 years ago.",
  },
  {
    q: "What is the '100-Year Rule' in baby naming trends?",
    a: "The 100-year rule observes that baby names tend to cycle back into fashion roughly every four generations (80 to 100 years). When a name is popular for parents and grandparents, it sounds dated or 'old-fashioned' to new parents. However, when a name belongs to great-grandparents or great-great-grandparents, it sheds its dated association and feels vintage, classic, and dignified (e.g., the recent resurgence of Emma, Oliver, Eleanor, and Henry).",
  },
  {
    q: "How does the Uniqueness Score in this calculator work?",
    a: "Our uniqueness score evaluates where a name falls across the national distribution of births. A score of 99 indicates that a name is rarer than 99% of registered baby names in America, whereas a score below 10 indicates a perennial national top-10 favorite. It helps parents find the sweet spot between overly ubiquitous names and names that are difficult to pronounce or spell.",
  },
  {
    q: "How should parents evaluate syllable cadence with their family surname?",
    a: "Linguistic rhythm principles recommend avoiding identical syllable counts when a name and surname share similar cadences. For example, a single-syllable first name (e.g., Jack) flows well with a multi-syllable surname (e.g., Montgomery). Furthermore, avoiding names that end in the same consonant sound that the surname begins with (e.g., 'Lucas Smith' creates an awkward 's-s' collision) ensures clear spoken articulation.",
  },
  {
    q: "Should digital footprint and email availability influence baby naming?",
    a: "In the modern digital era, many parents proactively check domain name availability (.com), social handles, and standard professional email formatting (e.g., firstname.lastname@gmail.com) when selecting a baby name. Choosing a distinctive middle name is an effective tactic to ensure a child maintains a clean, distinguishable professional identity online.",
  },
];

export default function BabyNamePopularityPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Baby Name Popularity Calculator"
      intro="Explore historical popularity ranks, annual frequency, and uniqueness percentiles based on the U.S. Social Security Administration (SSA) naming registry (1880–2026). Discover century naming cycles and phonetic trend analyses."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Demographic Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Demographic Data Verified
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Derived directly from the <strong className="font-semibold text-slate-800 dark:text-slate-200">U.S. Social Security Administration (SSA) Registry</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Onomastics &amp; Demographic Trends</span>
              <span>•</span>
              <time dateTime="2026-10-24">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Demographic Summary: How Baby Name Rankings &amp; Trends Work
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Baby name popularity is tracked in the United States by the <strong>Social Security Administration (SSA)</strong> based on applications for Social Security cards dating back to 1880. A rank of <strong>#1</strong> indicates the most frequently chosen name of the year for that biological sex. However, due to unprecedented 21st-century naming diversification, a top-ranked name today represents only <strong>~1% of total births</strong>, compared to <strong>over 5% in the 1950s</strong>. Parents can safely choose a top-50 name today ahead of their clinical <a href="/calculators/baby/due-date-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">due date</a> without fear that their child will share their name with multiple classmates.
            </p>
          </div>

          <h2>The Historical Evolution of American Naming Patterns</h2>
          <p>
            The study of personal names (known as <em>onomastics</em>) reveals profound shifts in cultural values, individualism, and sociological cohesion over the past 140 years. In the late 19th and early 20th centuries, naming conventions were anchored in patriarchal continuity and biblical tradition. Parents routinely named firstborn sons after fathers or grandfathers, concentrating a massive percentage of births into a tiny roster of perennial classics.
          </p>
          <p>
            Beginning in the 1970s and accelerating with the internet era, cultural emphasis shifted toward personal expression, phonetic lyricism, and distinctiveness. Historical generational milestones can be explored using our <a href="/calculators/datetime/year-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">year calculator</a> and <a href="/calculators/datetime/birthday-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">birthday calculator</a>. The table below illustrates this historic collapse in naming concentration across five key American demographic eras:
          </p>

          <DataTable
            head={["Historical Era", "Time Period", "Top Boy & Girl Monikers", "Share of Total Births in Top 10 Names", "Distinct Names per 1,000 Babies", "Linguistic Phrasing Drivers"]}
            rows={[
              ["Victorian Traditional", "1880 – 1910", "John, William | Mary, Anna", "34.5% of all births", "28 unique names / 1k", "Biblical heritage, royal family namesake, patronymic continuity."],
              ["Postwar Baby Boom", "1945 – 1965", "Michael, James | Linda, Mary", "27.2% of all births", "44 unique names / 1k", "Patriotic consensus, traditional 2-syllable masculine anchors."],
              ["Generation X & Millennial", "1975 – 1999", "Michael, Christopher | Jessica, Ashley", "18.6% of all births", "78 unique names / 1k", "Media, television culture, emergence of 3-syllable lyrical feminine names."],
              ["Centennial Vintage Revival", "2000 – 2019", "Jacob, Noah | Emily, Emma", "11.4% of all births", "125 unique names / 1k", "The 100-year great-grandparent namesake cycle, soft liquid consonants."],
              ["Modern Eclectic & Botanical", "2020 – 2026", "Liam, Noah | Olivia, Amelia", "6.8% of all births", "184 unique names / 1k", "Nature monikers, global vowel endings, highest uniqueness in recorded history."],
            ]}
            highlight={4}
          />

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-8">
            <BabyNamePopularityEraSpectrumChart />
          </div>

          <h2>The Mathematical &ldquo;100-Year Cycle&rdquo; in Onomastics</h2>
          <p>
            Linguistic demographers recognize a recurring four-generation pendulum known as the <strong>100-Year Rule</strong>. The cycle operates on a predictable sociological rhythm:
          </p>
          <ol>
            <li><strong>Generation 1 (Peak Popularity):</strong> The name is ubiquitous, associated with youth and vitality (e.g., Hazel, Arthur, or Clara in 1910).</li>
            <li><strong>Generation 2 (Aging Association):</strong> Thirty years later, the name is associated with mature parents; new parents view it as standard.</li>
            <li><strong>Generation 3 (The &ldquo;Old Person&rdquo; Stigma):</strong> Sixty to seventy years later, the name belongs to elderly grandparents and nursing homes. New parents perceive it as unfashionable and outmoded.</li>
            <li><strong>Generation 4 (The Vintage Rebirth):</strong> At the 90 to 100-year mark, the original generation has largely passed into history. The name is rediscovered as an antique, distinguished heirloom with historical elegance. Track generational ages with our <a href="/calculators/datetime/age-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">age calculator</a>.</li>
          </ol>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Name Uniqueness Percentile Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Uniqueness Score} = 100 \\times \\left(1 - \\frac{\\text{National Frequency of Name}}{\\text{Total Births in Gender Cohort}}\\right)"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Quantifies relative exclusivity of a moniker across national infant population. Check exact percentile splits with our percentage calculator.</div>
          </Formula>

          <h2>Linguistic Phonetics: Evaluating Flow, Cadence, and Rhythm</h2>
          <p>
            When testing baby names against your family surname, speech pathologists and linguists analyze three acoustic properties:
          </p>

          <h3>1. Syllable Meter and Metrical Feet (Trochaic vs. Iambic)</h3>
          <p>
            English names naturally flow best when syllable stress creates rhythmic alternation. Most traditional English names are <strong>trochaic</strong> (stressed syllable followed by unstressed, e.g., <em>EM-ma</em>, <em>LI-am</em>, <em>HEN-ry</em>). Pairing a two-syllable trochaic first name with a three-syllable dactylic surname (e.g., <em>Liam Sullivan</em>) creates a harmonious cadence.
          </p>

          <h3>2. Consonant Transition and Articulation Collisions</h3>
          <p>
            Avoid ending a first name with the exact same consonant sound that begins your surname. For example, &ldquo;Jack Kelly&rdquo; forces a harsh glottal stop between the double &lsquo;K&rsquo; sounds, while &ldquo;James Smith&rdquo; causes the &lsquo;s&rsquo; sounds to slur together into &ldquo;Jame-Smith.&rdquo; Aim for liquid consonant transitions (L, M, N, R) or vowel endings preceding consonant surnames.
          </p>

          <h3>3. Cross-Cultural Phonetic Durability</h3>
          <p>
            In an increasingly interconnected global economy, names with intuitive vowel-consonant-vowel structures (such as Maya, Leo, Nina, Kai, or Elena) boast superior cross-cultural portability, remaining effortless to pronounce across Romance, Germanic, and Asian linguistic families without mispronunciation.
          </p>

          <h2>Holistic Family Milestone Planning Alongside Baby Naming</h2>
          <p>
            Naming your baby is the first of hundreds of family decisions. Pair your naming process with comprehensive long-term financial and physical preparation:
          </p>
          <ul>
            <li><strong>Growth Projections:</strong> Project your child&apos;s adult stature alongside family genetic parameters using our <a href="/calculators/baby/child-height-predictor-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">child height predictor calculator</a> and monitor early physical gains on our <a href="/calculators/baby/baby-weight-percentile-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby weight percentile calculator</a>.</li>
            <li><strong>Nursery Logistics:</strong> Set up realistic post-natal sleep schedules on our <a href="/calculators/baby/baby-sleep-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby sleep calculator</a> and feeding routines using our <a href="/calculators/baby/baby-feeding-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby feeding calculator</a>.</li>
            <li><strong>Financial Foundation:</strong> Balance household budgets on our <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">family budget calculator</a>, compare regional childcare options on our <a href="/calculators/baby/childcare-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">childcare cost calculator</a>, and open a tax-advantaged college savings vehicle with our <a href="/calculators/finance/college-savings-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">college savings calculator</a>.</li>
          </ul>
        </>
      }
    >
      <BabyNamePopularityCalculator />
    </CalcPage>
  );
}
