import type { Metadata } from "next";
import Link from "next/link";
import CarDepreciationCalculatorComponent from "@/components/calcs/transportation/car-depreciation-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VehicleDepreciationTenYearDecayChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/car-depreciation-calculator";
const TITLE = "Car Depreciation Calculator | 10-Year Residual Value & Equity Decay";
const DESCRIPTION =
  "Calculate automotive depreciation rates, 10-year residual market values, equity loss schedules, and ownership holding costs across vehicle classes.";

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
  { href: "/calculators/transportation/car-payment-calculator", icon: "💳", name: "Car Payment Calculator" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/ev-savings-calculator", icon: "⚡", name: "EV Savings Calculator" },
  { href: "/calculators/transportation/moving-cost-calculator", icon: "📦", name: "Moving Cost Calculator" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
];

export default function CarDepreciationCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/transportation", label: "Transportation & Travel" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Automotive Asset Summary: The True Cost of Vehicle Ownership
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Depreciation is universally the single largest financial expense of owning a motor vehicle, routinely surpassing fuel, insurance, and routine mechanical maintenance combined. A brand-new passenger vehicle sheds approximately 20% of its initial market value in year one alone, and over 50% to 60% of its value by year five. You can evaluate financing charges with our{" "}
              <Link href="/calculators/transportation/car-payment-calculator" className="font-medium underline hover:text-amber-900">
                car payment calculator
              </Link>{" "}
              and monitor daily operating overhead in the{" "}
              <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium underline hover:text-amber-900">
                commute cost calculator
              </Link>.
            </p>
          </div>

          <h2>Automotive Equity Decay Dynamics & Residual Valuation Modeling</h2>
          <VehicleDepreciationTenYearDecayChart />
          <p>
            In financial accounting and consumer asset management, motor vehicles are depreciating capital goods that experience rapid economic obsolescence. Unlike real estate properties that appreciate over secular horizons, vehicles suffer from mechanical wear, corrosion, technological obsolescence, and secondary market supply saturation.
          </p>
          <p>
            Automotive residual value curves are non-linear, following an initial steep exponential drop in year one (the drive-off retail-to-wholesale haircut) followed by a geometric decay trajectory over subsequent ownership years. Comparing total ownership outlays against electric alternatives is explored in our{" "}
            <Link href="/calculators/transportation/ev-savings-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              ev savings calculator
            </Link>:
          </p>

          <Formula>
            {"V(t) = P_0 \cdot (1 - d_1) \cdot \prod_{i=2}^{t} (1 - d_i)"}
          </Formula>

          <Formula>
            {"\text{Total Depreciation Loss (\$)} = P_0 - V(t)"}
          </Formula>

          <Formula>
            {"\text{Annualized Depreciation Rate } (d_{\text{effective}}) = 1 - \left(\frac{V(t)}{P_0}\right)^{\frac{1}{t}}"}
          </Formula>

          <Formula>
            {"\text{Monthly Depreciation Burden} = \frac{P_0 - V(t)}{12 \times t}"}
          </Formula>

          <h2>Vehicle Segment 10-Year Depreciation & Resale Retention Matrix</h2>
          <p>
            Historical automotive market valuation data compiled by Black Book, Kelley Blue Book, and the National Automobile Dealers Association (NADA) demonstrates significant retention variance across vehicular classes:
          </p>

          <DataTable
            head={[
              "Vehicle Classification",
              "Year 1 Loss (%)",
              "Year 3 Retention (%)",
              "Year 5 Retention (%)",
              "Year 10 Retention (%)",
              "Primary Value Driver",
            ]}
            rows={[
              ["Full-Size Body-on-Frame Trucks", "14.0%", "71.0%", "58.0%", "36.0%", "High commercial utility & robust demand"],
              ["Compact / Midsize Crossover SUVs", "18.0%", "65.0%", "51.0%", "29.0%", "Broad consumer market liquidity"],
              ["Economy Compact Sedans", "20.0%", "62.0%", "48.0%", "25.0%", "Affordable entry-level commuter demand"],
              ["Mid-Tier Family Sedans", "22.0%", "58.0%", "44.0%", "22.0%", "Declining market share vs crossovers"],
              ["European Premium Luxury Sedans", "26.0%", "53.0%", "38.0%", "17.0%", "High post-warranty maintenance fears"],
              ["Battery Electric Vehicles (EVs)", "28.0%", "51.0%", "36.0%", "15.0%", "Rapid battery chemistry advances"],
              ["Specialty Sports Cars / Limited Runs", "12.0%", "76.0%", "64.0%", "45.0%", "Collector enthusiast scarcity"],
            ]}
          />

          <h2>Worked Analytical Scenario: Cost Analysis of a $45,000 SUV vs EV</h2>
          <p>
            Consider a prospective buyer evaluating two new vehicles with identical $45,000 MSRPs: a popular Japanese midsize crossover SUV versus a contemporary battery electric vehicle (EV). Over a 5-year ownership horizon with standard 12,000 miles driven per year, we model capital depreciation alongside road trip budgeting in our{" "}
            <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              fuel cost calculator
            </Link>{" "}
            and mileage calculations in the{" "}
            <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              distance calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Option A: Midsize Crossover SUV ($45,000 Purchase):</strong>
              <br />
              Year 1: Value drops 18% &rarr; Retains $36,900 ($8,100 first-year loss).
              <br />
              Years 2-5: Compounds at 11% annual loss:
              <Formula>
                {"V_{\text{SUV}}(5) = \$36{,}900 \times (1 - 0.11)^4 = \$36{,}900 \times 0.6274 = \$23{,}150"}
              </Formula>
              Total 5-Year Equity Loss = $45,000 - $23,150 = $21,850 ($364 per month).
            </li>
            <li>
              <strong>Option B: Battery Electric Vehicle ($45,000 Purchase):</strong>
              <br />
              Year 1: Value drops 28% &rarr; Retains $32,400 ($12,600 first-year loss).
              <br />
              Years 2-5: Compounds at 16% annual loss due to battery obsolescence:
              <Formula>
                {"V_{\text{EV}}(5) = \$32{,}400 \times (1 - 0.16)^4 = \$32{,}400 \times 0.4979 = \$16{,}132"}
              </Formula>
              Total 5-Year Equity Loss = $45,000 - $16,132 = $28,868 ($481 per month).
            </li>
            <li>
              <strong>The Net Depreciation Premium:</strong> The EV experiences $7,018 more in total equity erosion over 5 years. For the EV to represent a superior financial decision, its fuel and maintenance operational savings (calculated via our{" "}
              <Link href="/calculators/transportation/ev-savings-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                ev savings calculator
              </Link>) must surpass $1,400 per year ($117/month) to offset higher capital depreciation.
            </li>
            <li>
              <strong>Financing Impact:</strong> Carrying these depreciation losses over loan terms modeled in our{" "}
              <Link href="/calculators/transportation/car-payment-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                car payment calculator
              </Link>{" "}
              illustrates why buyers often experience negative equity ("underwater" loans) during the first 36 months of 72-month financing.
            </li>
          
            <li>
              <strong>Tax Depreciative Schedules (Section 179 & Bonus Depreciation):</strong> Under United States Internal Revenue Code Section 179 and the Modified Accelerated Cost Recovery System (MACRS), passenger motor vehicles exceeding 6,000 pounds Gross Vehicle Weight Rating (GVWR) qualify for substantial first-year accelerated depreciation deductions. Commercial fleet owners and self-employed professionals can write off significant upfront capital outlays, decoupling tax book value from actual secondary market wholesale vehicle valuation curves.
            </li>
          </ul>

          <h2>The Retail-to-Wholesale Spread & Dealership Margin Haircut</h2>
          <p>
            A common consumer illusion is confusing the drive-off depreciation with physical wear. In reality, the instant a newly purchased car leaves the dealership lot, its legal classification shifts from "New" to "Pre-Owned."
          </p>
          <p>
            When selling back to a dealership or trade-in floor, the consumer receives the wholesale auction value (Black Book / Manheim auction index), which is 15% to 20% lower than retail showroom price. The dealership must factor in reconditioning costs, floorplan interest financing, salesperson commissions, and retail gross profit margin. Consequently, the buyer absorbs the entire retail-to-wholesale transactional margin instantaneously.
          </p>

          <h2>Operational Strategies to Mitigate Automotive Depreciation Loss</h2>
          <p>
            Smart asset managers utilize deliberate purchasing protocols to minimize equity decay:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>The "Sweet Spot" Purchase (3 to 4 Years Old):</strong> Acquiring a reliable off-lease vehicle at age 3 captures a car that has already absorbed 40% to 50% of its initial depreciation curve, allowing the secondary buyer to experience a much flatter 8% to 10% annual loss.
            </li>
            <li>
              <strong>Mileage Discipline & Relocation Moving:</strong> Driving within 10,000 to 12,000 annual miles maintains a vehicle in top condition tiers. Long-distance relocations calculated in our{" "}
              <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                moving cost calculator
              </Link>{" "}
              frequently benefit from professional transport rather than adding odometer wear.
            </li>
            <li>
              <strong>Color & Specification Discipline:</strong> Neutral colors (white, silver, gray, black) maintain 4% to 8% higher resale values compared to niche paints (yellow, purple, lime green) due to broader wholesale buyer liquidity.
            </li>
            <li>
              <strong>Tire Maintenance & Road Conditioning:</strong> Regular tire rotations and proper sizing verified in our{" "}
              <Link href="/calculators/transportation/bike-pace-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                bike pace calculator
              </Link>{" "}
              protect suspension linkages from premature degradation.
            </li>
          
            <li>
              <strong>Tax Depreciative Schedules (Section 179 & Bonus Depreciation):</strong> Under United States Internal Revenue Code Section 179 and the Modified Accelerated Cost Recovery System (MACRS), passenger motor vehicles exceeding 6,000 pounds Gross Vehicle Weight Rating (GVWR) qualify for substantial first-year accelerated depreciation deductions. Commercial fleet owners and self-employed professionals can write off significant upfront capital outlays, decoupling tax book value from actual secondary market wholesale vehicle valuation curves.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why do brand-new cars lose up to 20% of their value in the first year?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                The initial drop reflects the loss of new-vehicle retail markup, sales taxes, dealer documentation fees, and the immediate transition to wholesale auction trade-in value. In addition, secondary buyers expect a substantial discount over brand-new showroom models with full factory warranty tenure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Which vehicular categories maintain the highest resale value over time?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Body-on-frame full-size pickup trucks (Toyota Tacoma, Ford F-150) and rugged four-wheel-drive utility vehicles (Jeep Wrangler, Toyota 4Runner) consistently exhibit the lowest depreciation rates in the automotive industry, retaining 55% to 65% of their original MSRP after five full years.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What does it mean to have "negative equity" or be "underwater" on an auto loan?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Negative equity occurs when your outstanding loan principal balance exceeds the fair market wholesale cash value of your vehicle. Because depreciation occurs faster than loan amortization in extended terms (72+ months), financed owners often owe $25,000 on a vehicle worth only $20,000.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does annual mileage directly influence vehicle depreciation velocity?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Standard valuation models assume 12,000 to 15,000 miles per year. Exceeding 20,000 annual miles accelerates mechanical wear, reducing wholesale resale appraisal by approximately $0.08 to $0.15 per excess mile above benchmark tiers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do commercial businesses write off vehicular asset depreciation?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Under IRS Section 179 and Modified Accelerated Cost Recovery System (MACRS) rules, businesses can take accelerated first-year bonus depreciation on commercial vehicles exceeding 6,000 lbs gross vehicle weight rating (GVWR), reducing net taxable corporate income.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does vehicle depreciation compare against overall commute expense?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                For a new $40,000 vehicle, depreciation costs approximately $350 per month, which often exceeds monthly gasoline expenses modeled in our{" "}
                <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  commute cost calculator
                </Link>{" "}
                and toll fees in the{" "}
                <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  fuel cost calculator
                </Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative Automotive Valuation Standards & Financial Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>National Automobile Dealers Association (NADA Official Used Car Guide):</strong> Wholesale and retail transaction valuation benchmarks.
            </li>
            <li>
              <strong>Kelley Blue Book (KBB / Cox Automotive):</strong> Residual value award indices and 5-year Cost to Own research methodology.
            </li>
            <li>
              <strong>Internal Revenue Service (IRS Publication 463):</strong> Travel, Gift, and Car Expenses (Standard Mileage and MACRS depreciation rules).
            </li>
            <li>
              <strong>Bureau of Economic Analysis (BEA):</strong> Consumer expenditures on motor vehicles and durable equipment depreciation rates.
            </li>
          
            <li>
              <strong>Tax Depreciative Schedules (Section 179 & Bonus Depreciation):</strong> Under United States Internal Revenue Code Section 179 and the Modified Accelerated Cost Recovery System (MACRS), passenger motor vehicles exceeding 6,000 pounds Gross Vehicle Weight Rating (GVWR) qualify for substantial first-year accelerated depreciation deductions. Commercial fleet owners and self-employed professionals can write off significant upfront capital outlays, decoupling tax book value from actual secondary market wholesale vehicle valuation curves.
            </li>
          </ul>
        </>
      }
    >
      <CarDepreciationCalculatorComponent />
    </CalcPage>
  );
}
