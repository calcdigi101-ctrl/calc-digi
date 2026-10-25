import type { Metadata } from "next";
import Link from "next/link";
import MovingCostCalculatorComponent from "@/components/calcs/transportation/moving-cost-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RelocationCostDistanceHomeSizeChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/moving-cost-calculator";
const TITLE = "Moving Cost Calculator | Relocation Expense, Distance & Truck Quotes";
const DESCRIPTION =
  "Calculate residential relocation costs, professional moving labor vs DIY truck rental rates, container pod shipping, and long-distance freight tariffs.";

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
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/car-payment-calculator", icon: "💳", name: "Car Payment Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
];

export default function MovingCostCalculatorPage() {
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
              Relocation Logistics Summary: Weight & Distance Tariffs
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Residential moving expenses are governed by two distinct pricing frameworks: local moves under 50 miles are billed on an hourly crew labor rate, whereas long-distance interstate moves are regulated by federal weight tariffs based on total household payload mass (pounds) and highway mileage. You can model highway travel distances with our{" "}
              <Link href="/calculators/transportation/distance-calculator" className="font-medium underline hover:text-amber-900">
                distance calculator
              </Link>{" "}
              and calculate truck fuel in the{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium underline hover:text-amber-900">
                fuel cost calculator
              </Link>.
            </p>
          </div>

          <h2>Relocation Logistics Dynamics & The Three Moving Modalities</h2>
          <RelocationCostDistanceHomeSizeChart />
          <p>
            In supply chain logistics and consumer mobility economics, household relocation is categorized across three primary service tiers: Do-It-Yourself (DIY) rental trucks (e.g., U-Haul, Penske, Budget), portable storage container pods (e.g., PODS, Pack-Rat, U-Pack), and full-service professional van line movers (e.g., Allied, United, Mayflower).
          </p>
          <p>
            Each modality presents distinct tradeoffs between financial capital outlay, physical labor exertion, liability protection, and transit transit time. Household items scale in volume and mass predictably with home room count, where standard industry formulas equate each furnished room to approximately 1,000 to 1,500 pounds of freight payload. Daily driving impacts can be checked in our{" "}
            <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              commute cost calculator
            </Link>:
          </p>

          <Formula>
            {"C_{\text{local}} = (\text{Hourly Rate} \times \text{Job Hours}) + \text{Travel Fee} + \text{Materials}"}
          </Formula>

          <Formula>
            {"C_{\text{interstate}} = (\text{Weight in cwt} \times \text{Linehaul Tariff Rate}) + \text{Fuel Surcharge} + \text{Accessorials}"}
          </Formula>

          <Formula>
            {"\text{Payload Mass (lbs)} \approx \text{Rooms} \times 1{,}200\,\text{lbs} \approx \text{Cubic Feet} \times 7.0\,\text{lbs/cu ft}"}
          </Formula>

          <Formula>
            {"C_{\text{DIY truck}} = \text{Base Rental} + (D \times R_{\text{mileage}}) + \left(\frac{D}{\text{MPG}_{\text{truck}}} \times P_{\text{fuel}}\right) + \text{Insurance}"}
          </Formula>

          <h2>Residential Moving Cost Matrix by Home Size & Distance Tiers</h2>
          <p>
            The benchmark reference schedule below outlines standard cost ranges across residential property sizes and relocation distances for full-service professional movers:
          </p>

          <DataTable
            head={[
              "Home Size / Volume",
              "Estimated Payload (lbs)",
              "Local Move (<50 mi)",
              "Regional (250 mi)",
              "Interstate (750 mi)",
              "Cross-Country (2,000 mi)",
            ]}
            rows={[
              ["Studio Apartment (1 Room)", "1,800 lbs / 250 cu ft", "$350 - $600", "$900 - $1,400", "$1,400 - $2,200", "$2,200 - $3,400"],
              ["1-Bedroom Apartment (2-3 Rooms)", "2,800 lbs / 400 cu ft", "$500 - $850", "$1,400 - $2,100", "$2,200 - $3,200", "$3,100 - $4,600"],
              ["2-Bedroom Home (4-5 Rooms)", "4,800 lbs / 650 cu ft", "$800 - $1,300", "$2,100 - $3,100", "$3,400 - $4,800", "$4,800 - $7,200"],
              ["3-Bedroom House (6-7 Rooms)", "8,500 lbs / 1,100 cu ft", "$1,300 - $2,100", "$3,200 - $4,600", "$5,200 - $7,400", "$7,800 - $11,500"],
              ["4-Bedroom House (8+ Rooms)", "12,500 lbs / 1,600 cu ft", "$1,900 - $3,000", "$4,600 - $6,800", "$7,500 - $10,800", "$11,200 - $16,500"],
              ["5+ Bedroom Executive Home", "16,500 lbs / 2,200 cu ft", "$2,600 - $4,200", "$6,200 - $9,200", "$9,800 - $14,200", "$14,500 - $21,000"],
            ]}
          />

          <h2>Worked Analytical Scenario: 600-Mile Interstate Relocation</h2>
          <p>
            Consider a family relocating a 3-bedroom home (estimated 8,000 lbs payload) across a 600-statute-mile interstate corridor. We analyze total financial outlays comparing Full-Service Professional Movers versus a DIY Rental Truck alongside vehicle financing in our{" "}
            <Link href="/calculators/transportation/car-payment-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              car payment calculator
            </Link>{" "}
            and road trip travel times in the{" "}
            <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              speed distance time calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Option A: Full-Service Van Line Movers:</strong>
              <br />
              Linehaul Tariff: 8,000 lbs (80 cwt) at $0.62 per cwt per 100 miles = 80 * $0.62 * 6 = $2,976.
              <br />
              Fuel Surcharge (14%): $416.64. Loading/Unloading & Valuation Protection: $1,400.
              <br />
              Packing Materials: $250.
              <Formula>
                {"C_{\text{Full-Service}} = \$2{,}976 + \$416.64 + \$1{,}400 + \$250 = \$5{,}042.64"}
              </Formula>
              Crew handles all heavy lifting, disassembly, driving, and unpacking.
            </li>
            <li>
              <strong>Option B: DIY Commercial Rental Truck (26-Foot Box Truck):</strong>
              <br />
              One-Way 5-Day Rental Quote: $1,250 (includes unlimited mileage).
              <br />
              Diesel Fuel Expense (26ft truck averages 8.0 MPG):
              <Formula>
                {"\text{Diesel Fuel} = \frac{600\,\text{miles}}{8.0\,\text{MPG}} = 75.0\,\text{gallons} \times \$4.15/\text{gal} = \$311.25"}
              </Formula>
              Truck Damage Waiver Insurance: $180. Moving equipment (furniture pads, dollies): $75.
              <br />
              Boxes, Bubble Wrap & Tape: $250.
              <Formula>
                {"C_{\text{DIY Truck}} = \$1{,}250 + \$311.25 + \$180 + \$75 + \$250 = \$2{,}066.25"}
              </Formula>
            </li>
            <li>
              <strong>The Tradeoff Analysis:</strong> DIY rental saves $2,976.39 in cash outlays, but demands roughly 40 hours of severe physical labor from family members and carries risk of personal furniture damage or injury.
            </li>
            <li>
              <strong>Personal Vehicle Transport:</strong> Driving personal family vehicles behind the truck adds additional fuel costs modeled in our{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                fuel cost calculator
              </Link>{" "}
              and highway travel time via the{" "}
              <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                distance calculator
              </Link>.
            </li>
          </ul>

          <h2>Binding vs Non-Binding Moving Estimates & Federal Tariff Laws</h2>
          <p>
            When hiring interstate professional movers in the United States, contracts are legally governed by the Federal Motor Carrier Safety Administration (FMCSA) under 49 CFR Part 375. Consumers encounter three distinct estimate formats:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Non-Binding Estimate:</strong> An initial non-binding estimate is only an approximation. If the actual weighed payload exceeds the estimate, the mover can bill for the full difference, though federal rules mandate they must deliver goods upon payment of 110% of the estimate.
            </li>
            <li>
              <strong>Binding Estimate:</strong> Guarantees that the customer pays exactly the quoted price regardless of whether the final weighed shipment weighs more or less than estimated.
            </li>
            <li>
              <strong>Binding Not-to-Exceed (Guaranteed Price):</strong> The most consumer-friendly contract format. If the shipment weighs less than projected, the customer pays the lower cost; if it weighs more, the price is legally capped at the binding quote.
            </li>
          </ul>

          <h2>Operational Pitfalls, Valuation Protection & Moving Fraud Prevention</h2>
          <p>
            Relocating families must guard against rogue moving brokers and valuation gaps:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Released Value vs Full Value Protection:</strong> Standard basic moving liability coverage included for free is mandated at just $0.60 per pound per item. Under basic released value, a destroyed $2,000 50-pound flat-screen television yields an insurance reimbursement of only $30.00 (50 lbs * $0.60). Purchasing Full Value Protection is critical for valuable items.
            </li>
            <li>
              <strong>Internet Moving Broker Scams:</strong> Disreputable online brokers offer unrealistically low quotes ($1,500), collect deposits, and subcontract the move to unlicensed rogue carriers who hold furniture hostage on delivery demanding thousands of dollars in bogus extra fees. Always verify US DOT license numbers via the FMCSA Protect Your Move database.
            </li>
            <li>
              <strong>Accessorial Surcharges:</strong> Failing to disclose long walking distances from the street to an apartment door (long-carry fee) or multi-floor stairs (flight charge) triggers unexpected surcharges of $100 to $400.
            </li>
            <li>
              <strong>Automobile Asset Wear:</strong> Driving multiple personal cars over thousands of miles accelerates vehicular equity depreciation modeled in our{" "}
              <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                car depreciation calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How much should I tip professional residential movers?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Standard tipping etiquette for professional movers is approximately $20 to $30 per mover for a half-day local job, and $40 to $60 per mover for a full-day (8+ hours) heavy relocation. Alternatively, 10% to 15% of the total labor cost split among the crew is standard for exceptional handling.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the cheapest day of the week and month to schedule a move?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Mid-week (Tuesday through Thursday) and mid-month (between the 8th and 22nd) moves offer the lowest rates and highest truck availability. Peak moving demand occurs on weekends and at the beginning/end of the month when apartment leases expire, carrying 15% to 25% price premiums.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Can I deduct household moving expenses on my federal income taxes?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Under the Tax Cuts and Jobs Act (TCJA), the federal tax deduction for residential moving expenses was suspended for most taxpayers through 2025. Only active-duty military service members moving pursuant to a military order and permanent change of station (PCS) remain eligible for federal moving deductions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do moving container pods compare in price to full-service movers?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Moving container pods typically cost 30% to 45% less than full-service van lines while eliminating the stress of driving a massive commercial box truck. Pods provide flexible multi-week ground storage, making them ideal for staggered lease dates or home renovations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does relocation moving distance influence total fuel expenditures?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Large commercial moving trucks achieve poor fuel efficiency (8 to 10 MPG for diesel). On a 1,000-mile move, truck fuel costs alone exceed $400 to $500, requiring precise fuel budgeting modeled in our{" "}
                <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  fuel cost calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How many cardboard moving boxes do I need for a 3-bedroom home?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A typical 3-bedroom house requires approximately 60 to 90 total boxes: 25 to 35 small boxes (books, heavy canned goods), 25 to 35 medium boxes (kitchenware, small appliances), 15 to 25 large boxes (linens, bedding), and 4 to 8 wardrobe boxes with metal hanging bars.
              </p>
            </div>
          </div>

          <h2>Authoritative Relocation Standards & Transportation Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Federal Motor Carrier Safety Administration (FMCSA):</strong> Your Rights and Responsibilities When You Move (49 CFR Part 375).
            </li>
            <li>
              <strong>American Trucking Associations (Moving & Storage Conference - MSC):</strong> Household goods tariff rules and carrier certification standards.
            </li>
            <li>
              <strong>Bureau of Transportation Statistics (BTS):</strong> Intermodal freight transportation and household relocation mobility statistics.
            </li>
            <li>
              <strong>Internal Revenue Service (IRS Publication 521):</strong> Moving Expenses tax compliance guidelines for military personnel.
            </li>
          </ul>
        </>
      }
    >
      <MovingCostCalculatorComponent />
    </CalcPage>
  );
}
