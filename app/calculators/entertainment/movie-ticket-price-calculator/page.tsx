import type { Metadata } from "next";
import MovieTicketPriceCalculator from "@/components/calcs/entertainment/movie-ticket-price-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CinemaOutingExpenseSplitChart } from "@/components/flagship/entertainment/editorial-charts";

const PATH = "/calculators/entertainment/movie-ticket-price-calculator";
const TITLE = "Movie Ticket Price Calculator — Cinema Outing & Concession Costs | CalcDigi";
const DESCRIPTION =
  "Calculate the complete cost of a movie theater outing for individuals, couples, and families. Compare standard 2D, IMAX with Laser, Dolby Cinema, popcorn combos, snacks, and online convenience booking fees.";

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
  { href: "/calculators/entertainment/concert-ticket-calculator", icon: "🎟️", name: "Concert Ticket True Cost Calculator" },
  { href: "/calculators/entertainment/streaming-cost-calculator", icon: "📺", name: "Streaming vs Cable TV Calculator" },
  { href: "/calculators/entertainment/party-planning-calculator", icon: "🎉", name: "Party Food & Drinks Budget Planner" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Concession Markup Percentage" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Popcorn to Ticket Price Ratio" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Theater Subscription ROI Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "Why are movie theater popcorn and drink concessions so expensive?",
    a: "Movie theater business economics are dictated by film studio distributor rental splits. For major blockbuster releases during opening weeks, studios command between 55% and 65% of all box office ticket revenues. After paying theater lease, heating/cooling, and projection equipment amortizations, theater chains make virtually zero net profit on admissions alone. Consequently, exhibition chains rely on high-margin concessions (popcorn costs roughly $0.30 to produce but sells for $9.00—an 85% to 90% gross profit margin) to generate over 75% of total theater operating profits.",
  },
  {
    q: "What is the difference between IMAX with Laser and Dolby Cinema?",
    a: "Both are premium large-format (PLF) theatrical experiences, but they differ in technical specifications. IMAX with Laser features massive proprietary screen aspect ratios (1.90:1 or 1.43:1 on select screens), dual 4K laser projection delivering exceptional brightness, and powerful 12-channel spatial sound. Dolby Cinema features Christie dual 4K laser projection with Dolby Vision high dynamic range (yielding true black levels with a 1,000,000:1 contrast ratio) and immersive Dolby Atmos object-based sound with motorized reclining seats.",
  },
  {
    q: "How much cheaper are matinee movie tickets compared to evening shows?",
    a: "Standard matinee screenings (typically scheduled before 4:00 PM or 5:00 PM) are discounted by 25% to 35% compared to prime evening peak showtimes. In addition, many major theater chains (such as AMC, Regal, and Cinemark) offer dedicated 'Discount Tuesday' promotions, reducing standard ticket prices to $6.00 to $8.00 for loyalty club members.",
  },
  {
    q: "Are movie theater subscription passes (like AMC Stubs A-List or Regal Unlimited) worth it?",
    a: "Yes, for regular moviegoers. AMC Stubs A-List costs $20 to $25/month and permits seeing up to 3 movies every week in ANY format (including premium IMAX, Dolby Cinema, and 3D) with zero online booking fees. Since a single prime Dolby Cinema ticket in major metropolitan areas costs $22 to $25, seeing just ONE premium movie per month completely covers the entire monthly subscription cost.",
  },
  {
    q: "Why do third-party apps like Fandango charge convenience fees?",
    a: "Online ticketing vendors and theater mobile apps charge convenience fees ($1.50 to $2.50 per ticket) to cover digital reservation infrastructure, seat map software licensing, credit card merchant gateway fees, and software development. Joining a theater chain's free tier loyalty rewards program (such as AMC Stubs Insider or Regal Crown Club) frequently waives booking fees when purchasing 4 or more tickets.",
  },
  {
    q: "How much does the average family of four spend on a weekend cinema outing?",
    a: "Industry data reveals that a family of four (2 adults, 2 children) attending a standard 2D weekend evening movie spends approximately $52 on tickets, $45 to $50 on two popcorn/drink combos and candy boxes, and $7 on booking fees—totaling $105 to $110. Upgrading to a premium format like IMAX with Laser pushes total family spend to $135 to $150.",
  },
];

export default function MovieTicketPricePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/entertainment", label: "Entertainment" }}
      title="Movie Ticket Price Calculator"
      intro="Calculate the complete cost of a movie theater outing for individuals, couples, and families. Compare standard 2D, IMAX with Laser, Dolby Cinema, popcorn combos, snacks, and online convenience booking fees."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-500/30">
                <svg className="size-3.5 shrink-0 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Theatrical Exhibition Industry Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Aligned with <strong className="font-semibold text-slate-800 dark:text-slate-200">National Association of Theatre Owners (NATO) &amp; MPA Reports</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Cinema Exhibition Economics</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Answer: How Much Does a Movie Theater Outing Cost?
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A standard movie theater outing combines ticket admissions with food concessions and online booking fees: <strong>Total = (Adult Tickets + Child Tickets) + Popcorn/Drink Combos + Online Fees</strong>. While an adult ticket averages <strong>$14.50 for standard 2D</strong> and <strong>$21.50–$22.50 for IMAX/Dolby Cinema</strong>, concessions add another <strong>$15 to $25 per couple</strong>. A couple attending an evening movie spends an average of <strong>$57.50 for Standard 2D</strong> and <strong>$75.00 for IMAX</strong>, with concessions accounting for over <strong>40% of the total bill</strong>. Compare live music event costs with our <a href="/calculators/entertainment/concert-ticket-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concert ticket calculator</a>, calculate home streaming alternatives with our <a href="/calculators/entertainment/streaming-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">streaming cost calculator</a>, or calculate party budgets with our <a href="/calculators/entertainment/party-planning-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">party planning calculator</a>.
            </p>
          </div>

          <h2>Movie Theater Outing Cost Breakdown &amp; Concession Share</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <CinemaOutingExpenseSplitChart />
          </div>

          <p>
            The magic of the communal cinema experience—the massive silver screen, thunderous spatial sound, and buttery aroma of warm popcorn—remains a cherished cultural ritual worldwide. However, rising admission ticket prices combined with steep concession pricing have led many consumers to scrutinize the true all-in cost of a movie theater outing.
          </p>
          <p>
            Understanding cinema economics demystifies why theater lobbies charge $8.50 for a soda. Because major Hollywood studios retain the lion's share of ticket sales during initial opening weekends, theaters function financially less like entertainment venues and more like restaurants with giant projection screens. To calculate concession markups as proportional ratios, use our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>, analyze food markup percentages with our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, and forecast annual theater subscription value using our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cinema Outing Total Cost Formulation</div>
            Tickets_Subtotal = (Adult_Count * Adult_Rate) + (Child_Senior_Count * Child_Senior_Rate)
            <br />
            Concessions_Subtotal = (Combos_Count * 17.50) + Candy_Snacks_Total
            <br />
            Grand_Cinema_Total = Tickets_Subtotal + Concessions_Subtotal + Online_Booking_Fees
            <br />
            Cost_Per_Person = Grand_Cinema_Total / Total_Attendees
            <br />
            Concession_Share_Pct = (Concessions_Subtotal / Grand_Cinema_Total) * 100
          </Formula>

          <h2>Theatrical Screening Formats: Technical Comparison and Pricing</h2>
          <p>
            Modern movie theaters offer several distinct projection formats with varying price premiums:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Standard 2D Digital Cinema:</strong> Standard projection utilizing 2K or single 4K Xenon lamp projectors on conventional white screens. The most affordable option ($10.50 matinee, $14.50 evening), suitable for comedies, dramas, and indie releases.
            </li>
            <li>
              <strong>IMAX with Laser:</strong> Giant-format curved screens with specialized dual 4K laser projection systems delivering intense brightness and rich color saturation. Screens with 1.90:1 aspect ratios expand the vertical viewing area by up to 26% for movies filmed with IMAX certified digital cameras ($20–$24/ticket).
            </li>
            <li>
              <strong>Dolby Cinema at AMC:</strong> The gold standard for audio-visual fidelity. Combines dual 4K Christie laser projectors with Dolby Vision high dynamic range (HDR), producing true inky blacks and vibrant highlights, coupled with ceiling and wall mounted Dolby Atmos spatial audio speakers and transducer-equipped motorized recliners ($21–$25/ticket).
            </li>
            <li>
              <strong>RealD 3D Screenings:</strong> Circularly polarized 3D glasses delivering stereoscopic depth. Requires higher projection lamp intensity to compensate for the light attenuation of 3D polarizing filters ($17–$19/ticket).
            </li>
          </ul>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Theatrical Screening Formats, Average Pricing &amp; Technical Specifications</p>
          <DataTable
            head={["Screening Format", "Avg Adult Ticket", "Avg Child/Senior Ticket", "Contrast Ratio", "Audio Specification", "Ideal Film Genre"]}
            rows={[
              ["Standard Digital 2D", "$14.50", "$11.50", "1,500 : 1 (Standard)", "5.1 / 7.1 Surround Sound", "Comedies, dramas, romance, dialogue-heavy films"],
              ["Matinee Early Bird 2D", "$10.50", "$8.50", "1,500 : 1 (Standard)", "5.1 / 7.1 Surround Sound", "Budget family outings, solo daytime viewing"],
              ["IMAX with Laser", "$21.50", "$17.50", "2,500 : 1 (High)", "12-Channel Immersive Audio", "Sci-fi blockbusters, epic action, documentary nature"],
              ["Dolby Cinema", "$22.50", "$18.50", "1,000,000 : 1 (True HDR)", "Dolby Atmos Spatial Audio", "Visual effects spectacles, musical soundtracks, horror"],
              ["RealD 3D Format", "$18.00", "$14.50", "1,200 : 1 (Polarized)", "7.1 Surround / Atmos", "Animated features, fantasy adventures, superhero epics"],
            ]}
          />

          <h2>The Studio-Exhibitor Split: Why Concessions Keep Theaters Open</h2>
          <p>
            Under standard Hollywood exhibition contracts, film distributors negotiate tiered box office revenue splits. In the initial week of a highly anticipated superhero or franchise sequel release, the studio commands up to 60% to 65% of gross ticket revenues. As the theatrical run progresses into weeks 3 and 4, the exhibitor's share of ticket revenue increases to 50% or 60%, but overall attendance volumes typically plummet.
          </p>
          <p>
            Concession sales, in contrast, are 100% retained by the theater chain. A 170-ounce tub of popcorn that sells for $9.50 incurs a wholesale cost of raw corn kernels, coconut oil, and butter flavoring of less than $0.50. This staggering 95% gross product margin pays the wages of projectionists, ushers, cleaning crews, and theater lease payments.
          </p>

          <h2>How to Maximize Movie Theater Value</h2>
          <p>
            Film lovers can dramatically lower their theatrical outing expenses without missing the big-screen experience:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Join Theater Subscription Clubs:</strong> If you see two or more movies per month, subscription programs like AMC Stubs A-List ($20–$25/mo for up to 3 movies weekly, including IMAX and Dolby) or Regal Unlimited provide massive savings.
            </li>
            <li>
              <strong>Leverage Discount Days:</strong> Major chains host weekly discount days (typically Tuesdays) where standard tickets are slashed to $6 to $8, often accompanied by discounted small popcorn/soda combos.
            </li>
            <li>
              <strong>Bypass App Convenience Fees:</strong> Join free loyalty rewards programs or purchase tickets directly at automated lobby kiosks on arrival to save $2.00 per ticket in convenience surcharges.
            </li>
          </ol>
        </>
      }
    >
      <MovieTicketPriceCalculator />
    </CalcPage>
  );
}
