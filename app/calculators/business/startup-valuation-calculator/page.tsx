import type { Metadata } from "next";
import Link from "next/link";
import StartupValuationCalculatorComponent from "@/components/calcs/business/startup-valuation-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { StartupValuationDilutionRoundsChart } from "@/components/flagship/business/editorial-charts";

const PATH = "/calculators/business/startup-valuation-calculator";
const TITLE = "Startup Valuation Calculator | Pre-Money, Post-Money & Cap Table Dilution";
const DESCRIPTION =
  "Calculate startup pre-money vs post-money valuations, investor equity ownership stakes, employee option pool (ESOP) dilution, and venture round metrics.";

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
  { href: "/calculators/business/burn-rate-calculator", icon: "🔥", name: "Burn Rate" },
  { href: "/calculators/business/business-revenue-calculator", icon: "💰", name: "Revenue Run-Rate" },
  { href: "/calculators/business/ltv-calculator", icon: "💎", name: "Customer LTV" },
  { href: "/calculators/business/cac-calculator", icon: "🎯", name: "CAC Calculator" },
  { href: "/calculators/business/roi-calculator", icon: "📊", name: "ROI Calculator" },
  { href: "/calculators/business/break-even-calculator", icon: "⚖️", name: "Break-Even Point" },
];

const FAQ_ITEMS = [
  {
    q: "What is the critical mathematical distinction between pre-money and post-money valuation?",
    a: "Pre-money valuation represents the agreed enterprise value of the startup immediately prior to receiving new capital. Post-money valuation equals pre-money valuation plus the new investment cash: Post-Money = Pre-Money + Investment Amount. An investor's ownership percentage is strictly computed as Investment / Post-Money.",
  },
  {
    q: "Why does creating an unallocated Employee Stock Option Pool (ESOP) dilute founders before investors?",
    a: "In standard venture term sheets, lead venture investors mandate that the employee option pool (typically 10% to 15%) be carved out of the pre-money valuation ('the option pool shuffle'). Consequently, existing founders absorb 100% of the initial option pool dilution, effectively lowering the true economic pre-money valuation.",
  },
  {
    q: "What are standard venture dilution targets across financing stages?",
    a: "Founders typically surrender 15% to 25% equity ownership in a priced Seed round, 20% to 25% in Series A, and 15% to 20% in Series B. Cumulative dilution across Pre-Seed through Series B commonly leaves original founding teams retaining 30% to 45% combined equity ownership at IPO or exit.",
  },
  {
    q: "What valuation methodologies are standard for pre-revenue venture startups?",
    a: "Pre-revenue early-stage startups cannot utilize discounted cash flows (DCF). Venture capitalists utilize the Berkus Method (assigning up to $500k across technology, team, prototype, and market), the Scorecard Valuation Method (adjusting median regional seed rounds by risk factors), and comparable venture transaction multiples.",
  },
  {
    q: "How do convertible notes and SAFEs differ from priced equity rounds?",
    a: "Convertible notes and Simple Agreements for Future Equity (SAFEs) are debt or contractual instruments that delay formal valuation negotiations until a future priced equity round, converting into preferred stock at a negotiated valuation cap or percentage discount (typically 15% to 20%).",
  },
  {
    q: "How does customer unit economics (LTV:CAC) directly impact venture startup valuation?",
    a: "Institutional venture investors evaluate LTV:CAC multiples as the primary proxy for capital efficiency and market scalability. Startups demonstrating superior LTV:CAC command top-quartile revenue multiples during venture financing rounds.",
  },
];

export default function StartupValuationCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/business", label: "Business & Entrepreneurship" }}
      title="Startup Valuation & Cap Table Dilution Calculator"
      intro="Compute startup pre-money and post-money valuations, investor ownership stakes, founder dilution schedules, and unallocated option pool (ESOP) allocations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Startup Valuation is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Post-money valuation is the sum of the agreed pre-money valuation and the incoming cash round: Post-Money = Pre-Money + Investment. The new investor&apos;s ownership percentage is: Investor Equity (%) = (Investment / Post-Money) &times; 100. Founders absorb option pool carveouts from the pre-money balance. Founders model venture runway using the <Link href="/calculators/business/burn-rate-calculator">startup burn rate calculator</Link>, benchmark ARR run-rates via the <Link href="/calculators/business/business-revenue-calculator">revenue calculator</Link>, and verify unit scaling economics in the <Link href="/calculators/business/ltv-calculator">LTV calculator</Link>.
            </p>
          </div>

          <h2>Visual Analysis: Founder Equity Dilution Trajectory Across Venture Rounds</h2>
          <p>
            The chart below visualizes the progressive dilution of founder common stock as an enterprise scales through Seed, Series A, and Series B venture financing rounds alongside ESOP expansions.
          </p>

          <StartupValuationDilutionRoundsChart />

          <h2>First-Principles Cap Table Mathematics & Pre-Money Mechanics</h2>
          <p>
            Under National Venture Capital Association (NVCA) model legal documents, the fundamental valuation balance equation is defined as:
          </p>
          <Formula>
            {"\\text{Post-Money Valuation} = \\text{Pre-Money Valuation} + \\text{New Cash Investment}"}
          </Formula>
          <p>
            The incoming preferred investor ownership stake is computed directly against the post-money capitalization:
          </p>
          <Formula>
            {"\\text{Investor Ownership Stake (\\%)} = \\left( \\frac{\\text{New Cash Investment}}{\\text{Post-Money Valuation}} \\right) \\times 100\\%"}
          </Formula>
          <p>
            When investors mandate an unallocated Employee Stock Option Pool (ESOP) sized as a percentage of post-money capitalization but carved out of the pre-money cap table:
          </p>
          <Formula>
            {"\\text{Retained Founder Ownership (\\%)} = \\left( \\frac{\\text{Pre-Money}}{\\text{Post-Money}} \\right) \\times (1 - \\text{ESOP %}) \\times 100\\%"}
          </Formula>
          <p>
            This mathematical shuffle forces the founders to absorb the entire option pool dilution prior to investment closing, effectively discounting the headline pre-money valuation:
          </p>
          <Formula>
            {"\\text{Effective Economic Pre-Money} = \\text{Pre-Money} \\times (1 - \\text{ESOP %})"}
          </Formula>
          <p>
            Founders evaluate acquisition efficiency via the <Link href="/calculators/business/cac-calculator">CAC calculator</Link>, model operational break-even milestones with the <Link href="/calculators/business/break-even-calculator">break-even point solver</Link>, and evaluate capital returns using the <Link href="/calculators/business/roi-calculator">ROI calculator</Link>.
          </p>

          <h2>Venture Capital Financing Benchmarks by Growth Stage</h2>
          <p>
            The table below contrasts typical pre-money valuation ranges, round investment sizes, median dilution percentages, and operational milestone expectations across venture stages.
          </p>

          <DataTable
            head={["Financing Round Stage", "Median Pre-Money Valuation", "Typical Round Size", "Median Founder Dilution", "Key Operating Milestones"]}
            rows={[
              ["Pre-Seed Round", "$2,000,000 - $5,000,000", "$250,000 - $1,000,000", "10% - 18%", "Minimum viable prototype, founding team & initial beta users"],
              ["Seed Round", "$6,000,000 - $12,000,000", "$1,500,000 - $3,500,000", "18% - 25%", "Initial commercial traction, repeatable acquisition & $10k - $50k MRR"],
              ["Series A Round", "$15,000,000 - $35,000,000", "$6,000,000 - $12,000,000", "20% - 28%", "Proven product-market fit, scalable go-to-market & $1M - $3M ARR"],
              ["Series B Round", "$40,000,000 - $100,000,000", "$15,000,000 - $35,000,000", "15% - 22%", "Market leadership, international expansion & $5M - $12M ARR"],
              ["Series C / Growth", "$120,000,000 - $300,000,000+", "$40,000,000 - $100,000,000", "10% - 15%", "Path to GAAP profitability, corporate M&A & $25M+ ARR"],
              ["Mezzanine / Pre-IPO", "$400,000,000 - $1,000,000,000+", "$50,000,000 - $200,000,000", "8% - 12%", "Public market readiness, S-1 SEC filing & mature governance"],
            ]}
          />

          <h2>Comparative Operational Business Worked Case Studies</h2>

          <h3>Case Study A: Enterprise AI SaaS Seed Round Negotiation</h3>
          <p>
            An enterprise workflow automation startup has developed an autonomous AI data pipeline generating $25,000.00 in monthly recurring revenue ($300,000 ARR). A tier-1 venture capital fund issues a term sheet proposing a $2,000,000.00 cash investment at an agreed $8,000,000.00 pre-money valuation, with a mandatory 10.0% unallocated post-closing employee option pool (ESOP) carved out of the pre-money cap table:
          </p>
          <ol>
            <li>
              <strong>Calculate post-money valuation:</strong>
              <br />
              Post-Money Valuation = $8,000,000.00 (Pre-Money) + $2,000,000.00 (Cash) = $10,000,000.00.
            </li>
            <li>
              <strong>Determine incoming venture fund equity ownership:</strong>
              <br />
              Investor Ownership = ($2,000,000.00 / $10,000,000.00) &times; 100% = 20.00%.
            </li>
            <li>
              <strong>Evaluate founder equity retention after the option pool shuffle:</strong>
              <br />
              Option Pool Allocation = 10.00% of post-money ($1,000,000 option pool value).
              <br />
              Retained Founder Equity = (100% - 20% Investor - 10% ESOP) = 70.00%.
            </li>
            <li>
              <strong>Calculate effective economic pre-money valuation:</strong>
              <br />
              Effective Pre-Money = $8,000,000.00 - $1,000,000.00 (ESOP carveout) = $7,000,000.00.
            </li>
            <li>
              <strong>Capital Planning Alignment:</strong> Founders project new hiring costs using the <Link href="/calculators/business/employee-cost-calculator">employee cost calculator</Link> and monitor monthly net cash depletion in the <Link href="/calculators/business/burn-rate-calculator">burn rate calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Series A Preferred Financing with Existing SAFE Conversion</h3>
          <p>
            A healthtech diagnostic startup previously raised $1,000,000.00 on a SAFE note with a $5,000,000.00 post-money valuation cap. The company now closes an $8,000,000.00 Series A round at a $24,000,000.00 pre-money valuation ($32,000,000 post-money). The SAFE note converts into preferred equity at its valuation cap:
          </p>
          <ol>
            <li>
              <strong>Determine SAFE investor equity ownership:</strong>
              <br />
              Because the Series A valuation exceeds the $5M cap, the SAFE converts at the cap.
              <br />
              SAFE Stake = $1,000,000.00 / $5,000,000.00 = 20.0% of pre-round equity.
            </li>
            <li>
              <strong>Compute Series A investor ownership:</strong>
              <br />
              Series A Investor Ownership = $8,000,000.00 / $32,000,000.00 = 25.00%.
            </li>
            <li>
              <strong>Reconcile post-financing cap table:</strong>
              <br />
              Series A Investors = 25.00%.
              <br />
              SAFE Investors (diluted by Series A) = 20.0% &times; (1 - 0.25) = 15.00%.
              <br />
              Founders & Common Stockholders = 100% - 25% - 15% = 60.00%.
            </li>
            <li>
              <strong>Unit Economic Verification:</strong> Management balances recurring software margins via the <Link href="/calculators/business/profit-margin-calculator">profit margin calculator</Link> and evaluates customer acquisition velocity in the <Link href="/calculators/business/cac-calculator">CAC calculator</Link>.
            </li>
          </ol>

          <h2>Valuation Governance: 409A Appraisals & Liquidation Preferences</h2>
          <p>
            While venture investors purchase preferred stock carrying downside liquidation preferences (such as 1x non-participating liquidation preference), employees and founders hold common stock. Under Internal Revenue Code Section 409A, privately held startups must obtain an independent third-party 409A appraisal to determine the Fair Market Value (FMV) of common stock before issuing stock options.
          </p>
          <p>
            Because common stock lacks the protective rights, anti-dilution provisions, and liquidation seniorities of preferred shares, the 409A common stock strike price typically reflects a substantial 65% to 80% discount relative to the preferred price per share established in the venture round.
          </p>


          <p>
            In institutional venture capital portfolio construction, general partners utilize the VC Method to calculate target pre-money valuations based on expected terminal exit multiples:
          </p>
          <Formula>
            {"\\text{Target Post-Money} = \\frac{\\text{Anticipated Terminal Exit Value}}{\\text{Target Fund Multiple on Invested Capital (MOIC)}}"}
          </Formula>
          <p>
            For example, if an early-stage venture fund requires a 10.0x cash-on-cash return and projects the startup will achieve a $200,000,000 corporate acquisition or IPO at year 6, the maximum post-money valuation today cannot exceed $20,000,000 before factoring in expected intermediate round dilution. If the startup requires a $4,000,000 investment round, the maximum allowable pre-money valuation is mathematically capped at $16,000,000.
          </p>
          <p>
            Furthermore, founders negotiating venture financing evaluate governance covenants beyond pure economic valuation. Terms such as board of directors seat control, protective voting thresholds on future financings, drag-along rights, and founder vesting acceleration triggers (single-trigger vs. double-trigger acceleration upon change of control) frequently matter more to long-term founder wealth creation than a minor variation in initial headline valuation.
          </p>

          <h2>Operational Pitfalls in Startup Valuation & Cap Table Structuring</h2>
          <ol>
            <li>
              <strong>Negotiating Inflated Early-Stage Valuations:</strong> Pushing for an artificially high Seed valuation sets an impossible growth hurdle for Series A, increasing the risk of a demoralizing &quot;down round&quot; where earlier investors trigger full-ratchet anti-dilution protections.
            </li>
            <li>
              <strong>Ignoring Option Pool Carveout Timing:</strong> Failing to negotiate the size and timing of the unallocated ESOP pool allows venture funds to demand oversized 15% to 20% pools that needlessly dilute founders before critical hires are even identified.
            </li>
            <li>
              <strong>Stacking Multiple Uncapped SAFEs:</strong> Issuing successive SAFEs with differing valuation caps creates hidden dilution cliffs that suddenly wipe out founder equity when an institutional priced round finally closes.
            </li>
            <li>
              <strong>Conflating Paper Net Worth with Liquidity:</strong> A founder holding 60% of a company valued at $20,000,000 on paper has zero liquid cash until an accredited secondary tender offer or formal liquidity event occurs.
            </li>
          </ol>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is a down round and what are its consequences?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A down round occurs when a startup raises external equity capital at a pre-money valuation lower than the post-money valuation of its previous round. Down rounds trigger preferred stock anti-dilution adjustments (broad-based weighted average or full ratchet), causing massive additional equity dilution for founders and wiping out common stock option incentives for employees.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does a 1x non-participating liquidation preference work?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A 1x non-participating preference guarantees that in a sale or liquidation, preferred investors receive either their original investment cash back (1x) or their pro-rata share of the sale proceeds as converted common shareholders, whichever is higher, protecting investor capital during modest exit outcomes.
              </p>
            </div>
          </div>


          <p>
            In cross-border venture financings, corporate attorneys establish offshore holding structures (such as Delaware C-Corps or Cayman Islands holding vehicles) to facilitate institutional venture capital co-investments. Standardizing legal corporate governance across institutional venture syndicates streamlines future priced equity rounds and eliminates complex international tax withholding friction during secondary share transfers.
          </p>


          <p>
            Venture capital investment committees also evaluate pro-rata rights in subsequent rounds. Maintaining pro-rata allocation rights allows seed investors to prevent percentage dilution in high-growth follow-on rounds, preserving portfolio fund return economics.
          </p>

          <h2>Authoritative Venture Standards & Statutory Frameworks</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>National Venture Capital Association (NVCA Model Legal Documents):</strong> Standard term sheet templates for Certificate of Incorporation, Investor Rights, and Voting Agreements.
            </li>
            <li>
              <strong>Internal Revenue Code (IRC Section 409A):</strong> Federal valuation standards governing stock option strike pricing and deferred compensation penalties.
            </li>
            <li>
              <strong>Securities and Exchange Commission (SEC Regulation D - Rule 506):</strong> Safe harbor exemptions for private venture capital placements and accredited investor criteria.
            </li>
            <li>
              <strong>American Institute of Certified Public Accountants (AICPA Valuation Guide):</strong> Standards for valuation of privately-held company equity securities issued as compensation.
            </li>
          </ul>
        </>
      }
    >
      <StartupValuationCalculatorComponent />
    </CalcPage>
  );
}
