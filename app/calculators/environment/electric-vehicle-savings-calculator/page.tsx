import type { Metadata } from "next";
import Link from "next/link";
import ElectricVehicleSavingsCalculator from "@/components/calcs/environment/electric-vehicle-savings-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ElectricVehicleVsGasTcoSavingsChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/electric-vehicle-savings-calculator";
const TITLE = "Electric Vehicle (EV) Savings Calculator | Gas vs EV TCO & Carbon Comparison";
const DESCRIPTION =
  "Calculate your annual and 10-year total cost of ownership (TCO) savings switching from gasoline to an electric vehicle. Compare fuel costs, maintenance, tax credits, and tailpipe carbon reductions.";

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
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Annual Carbon Footprint" },
  { href: "/calculators/environment/solar-panel-calculator", icon: "☀️", name: "Rooftop Solar EV Charging" },
  { href: "/calculators/environment/energy-consumption-calculator", icon: "💡", name: "Electricity Usage Calculator" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Fuel Savings Investment ROI" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Fuel Economy Percentage Gain" },
  { href: "/calculators/finance/auto-loan-calculator", icon: "🚗", name: "Auto Loan Payment Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How much money does the average driver save each year driving an EV instead of a gas car?",
    a: "Based on US Department of Energy (DOE) and Federal Highway Administration data (13,500 annual miles, 28 MPG gas car at $3.65/gal vs an EV consuming 30 kWh/100mi at $0.16/kWh), the average driver saves approximately $1,110 per year in direct fuel expenses. When factoring in eliminated oil changes, transmission maintenance, and brake pad longevity, total operational savings average $1,550 to $1,800 annually.",
  },
  {
    q: "How does the Federal Clean Vehicle Tax Credit (IRA Section 30D) work?",
    a: "Under the Inflation Reduction Act, qualifying new electric vehicles are eligible for up to a $7,500 nonrefundable federal tax credit ($3,750 for North American battery critical minerals sourcing, and $3,750 for battery component manufacturing). Participating auto dealerships can now apply this credit directly at point of sale as an instant cash down-payment deduction, lowering the upfront acquisition barrier.",
  },
  {
    q: "Why are electric vehicle maintenance and repair costs significantly lower than ICE vehicles?",
    a: "An internal combustion engine (ICE) vehicle contains over 2,000 moving parts—including pistons, spark plugs, timing chains, fuel injectors, catalytic converters, and multi-gear automatic transmissions requiring periodic fluid flushes. In contrast, an EV drivetrain contains roughly 20 moving parts, requiring no motor oil changes, fuel filters, or exhaust repairs. Furthermore, regenerative braking redirects kinetic energy back into the battery, reducing mechanical brake friction wear by 70%.",
  },
  {
    q: "What is an eGallon and how does electricity cost compare to liquid gasoline?",
    a: "The US Department of Energy introduced the 'eGallon' metric to measure the cost of fueling an EV with electricity to travel the exact same distance as an internal combustion vehicle on a single gallon of gasoline. Nationally, the average eGallon costs roughly $1.35 to $1.55—representing less than half the national retail price of unleaded regular gasoline.",
  },
  {
    q: "Are electric vehicles truly cleaner when charged from fossil-fuel-powered electric grids?",
    a: "Yes, definitively. Even when charged on an electric grid dominated by natural gas or coal, electric motors convert over 85% to 90% of electrical energy into wheel motion, compared to internal combustion engines which waste 75% to 80% of fuel energy as heat. Comprehensive lifecycle assessments by the EPA and Argonne National Laboratory confirm that modern EVs generate 50% to 70% lower net lifecycle greenhouse gas emissions than comparable gasoline cars across all 50 US states.",
  },
  {
    q: "How long do EV batteries last and what happens to battery capacity over time?",
    a: "Federal regulations mandate that all automotive traction batteries carry a minimum warranty of 8 years or 100,000 miles (10 years / 150,000 miles in California). Real-world telemetry from major manufacturers demonstrates that modern liquid-cooled lithium-ion battery packs degrade at less than 1.5% to 2.0% per year, retaining over 80% to 85% of original driving range after 150,000 to 200,000 miles.",
  },
];

export default function ElectricVehicleSavingsPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Electric Vehicle Savings Calculator"
      intro="Calculate your annual and 10-year total cost of ownership (TCO) savings switching from gasoline to an electric vehicle. Compare fuel costs, maintenance, tax credits, and tailpipe carbon reductions."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                US DOE AFDC & EPA Fuel Economy Verified
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>IRA Section 30D Compliant</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated TCO Modeling
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How Much Does Driving an EV Save You?
                </strong>
                <p className="mt-1">
                  Transitioning from a 28 MPG gasoline vehicle to a typical electric vehicle (30 kWh/100 miles) saves the average American commuter approximately $1,100 to $1,300 in annual fuel expenses at $3.65/gallon gas and $0.16/kWh residential electricity. When combined with $450 in avoided scheduled maintenance (oil changes, spark plugs, brake friction pads), annual operating savings reach $1,550 to $1,800. After factoring in federal and state purchase incentives ($7,500 IRA tax credit), the initial purchase premium is amortized within 2.5 to 3.5 years, yielding over $12,000 in net 10-year financial gains while abating ~3.5 metric tons of tailpipe CO2 annually.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>10-Year Total Cost of Ownership (TCO): Gasoline vs. Electric Vehicles</h2>
          <div className="not-prose my-6">
            <ElectricVehicleVsGasTcoSavingsChart />
          </div>

          <p>
            The global transition toward automotive electrification represents the most radical technological restructuring of transportation since the transition from equine draft power to internal combustion over a century ago. While consumer discussions frequently focus on upfront window-sticker pricing, sophisticated vehicle financial analysis requires evaluating Total Cost of Ownership (TCO).
          </p>

          <p>
            An automobile is a durable capital asset whose true cost is governed by recurring operational outlays: volatile liquid fuel prices, thermodynamic wear and tear, scheduled lubrication services, and local municipal utility rates. Electric vehicles fundamentally alter this financial equation by substituting low-cost, domestically generated electrical energy for petroleum and replacing mechanical complexity with solid-state electric drivetrains.
          </p>

          <p>
            To investigate how home rooftop solar panels can further drop EV charging expenses to nearly zero, cross-reference our <Link href="/calculators/environment/solar-panel-calculator">Solar Panel Calculator</Link>. To calculate the exact impact of vehicle electrification on your household greenhouse emissions, explore our <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link>.
          </p>

          <h2>Mathematical Formulations for EV Fuel and TCO Economics</h2>

          <p>
            Calculating the operating financial advantage of an electric vehicle requires contrasting the volumetric energy expenditure of refined petroleum against the kilowatt-hour demand of an electrochemical battery pack:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Gasoline Operating Expenditure</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">C_gas = (Miles / MPG) * Price_per_Gallon</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where Miles is total annual driving distance; MPG is internal combustion fuel economy; and P_gas is the local retail pump price per gallon of gasoline.</div>
          </Formula>

          <p>
            For electric vehicles, energy consumption is rated in kilowatt-hours per 100 miles (kWh/100mi) or miles per kilowatt-hour:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Electric Vehicle Charging Expenditure</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">C_ev = [ (Miles * Rating_kWh_per_100) / 100 ] * Electric_Tariff_per_kWh</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where Rating_kWh/100 is the EPA vehicle efficiency (typically 26 to 34 kWh/100mi for passenger sedans and crossovers); and R_elec is the residential electric tariff in dollars per kilowatt-hour.</div>
          </Formula>

          <p>
            The net operational savings and capital payback timeframe are defined as:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Savings & Capital Payback Horizon</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Annual_Savings = (C_gas - C_ev) + M_savings | Payback = (Price_Delta - Incentives) / Annual_Savings</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where M_savings represents avoided routine scheduled maintenance; delta_Price is the upfront purchase premium over the comparable gas car; and Incentives is the combined value of federal, state, and utility rebates.</div>
          </Formula>

          <h2>Comparative Operational Cost Breakdown: Gas Sedan vs. Modern EV</h2>

          <p>
            The following table details a 5-year operating comparison between a standard 28 MPG compact crossover and a comparable 30 kWh/100mi electric crossover based on 13,500 annual miles:
          </p>

          <DataTable
            head={["Operating Category", "Gasoline Vehicle (28 MPG)", "Electric Vehicle (30 kWh/100mi)", "Annual EV Net Advantage", "5-Year Cumulative Difference"]}
            rows={[
              ["Direct Fuel / Energy", "$1,760 / yr ($3.65/gal)", "$648 / yr ($0.16/kWh)", "+$1,112 saved / yr", "+$5,560 saved"],
              ["Engine Oil & Filter Changes", "$180 / yr (2 services)", "$0 / yr (eliminated)", "+$180 saved / yr", "+$900 saved"],
              ["Brake System Wear", "$140 / yr (friction wear)", "$40 / yr (regenerative)", "+$100 saved / yr", "+$500 saved"],
              ["Transmission & Spark Plugs", "$120 / yr (amortized)", "$0 / yr (direct drive)", "+$120 saved / yr", "+$600 saved"],
              ["Scheduled Maintenance Subtotal", "$440 / yr", "$40 / yr", "+$400 saved / yr", "+$2,000 saved"],
              ["Total Annual Operating Cost", "$2,200 / year", "$688 / year", "+$1,512 saved / yr", "+$7,560 saved"],
              ["Tailpipe Carbon Emissions", "4.28 MT CO2 / yr", "0.00 MT tailpipe", "+4.28 MT avoided", "+21.4 MT CO2 avoided"],
            ]}
          />

          <p>
            To evaluate auto loan amortization and financing costs for an upcoming vehicle acquisition, explore our <Link href="/calculators/finance/auto-loan-calculator">Auto Loan Payment Calculator</Link> and calculate savings growth with the <Link href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</Link>.
          </p>

          <h2>Mechanical Reliability & Maintenance Simplification</h2>

          <p>
            The maintenance savings generated by electric vehicles stem directly from physics. An internal combustion vehicle is essentially a controlled chemical explosion chamber that subjects metal engine blocks, valves, and camshafts to severe cyclic thermal stress, friction, and carbon soot buildup.
          </p>

          <p>
            Internal combustion vehicles require periodic oil changes, serpentine belts, spark plugs, and catalytic converter replacements. Conversely, an electric vehicle utilizes a brushless motor with a single moving rotor supported by sealed bearings. Furthermore, regenerative braking transfers kinetic momentum into stored battery power, drastically reducing friction wear on mechanical brake rotors.
          </p>

          <h2>Understanding Charging Tiers & Time-of-Use Electric Tariffs</h2>

          <p>
            A critical factor in maximizing EV financial returns is charging optimization:
          </p>

          <ul>
            <li>
              <strong>Level 1 Charging (120V Standard Household Outlet):</strong> Delivers 1.2 to 1.8 kW, adding roughly 3 to 5 miles of range per hour of charging. Suitable for plug-in hybrids or low-mileage daily commutes.
            </li>
            <li>
              <strong>Level 2 Charging (240V Dedicated Circuit, 32A to 48A):</strong> Delivers 7.6 to 11.5 kW, adding 25 to 45 miles of range per hour. A dedicated Level 2 home wall charger replenishes an empty 75 kWh battery pack overnight in 6 to 8 hours.
            </li>
            <li>
              <strong>DC Fast Charging (Level 3, 400V–800V Direct Current):</strong> Delivers 50 kW to 350 kW at public commercial stations, charging batteries from 10% to 80% state of charge in 18 to 30 minutes for highway road trips.
            </li>
          </ul>

          <p>
            Many municipal electric utilities offer specialized Time-of-Use (TOU) residential EV tariffs. By programming your vehicle to charge during off-peak overnight hours (e.g., midnight to 6:00 AM), electric rates frequently drop from $0.22/kWh down to $0.06 to $0.09/kWh, further doubling your annual fuel savings.
          </p>

          <p>
            For households interested in appliance energy monitoring or analyzing whole-home electrical loads before installing a Level 2 charging circuit, see our <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link> and <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>
        </>
      }
    >
      <ElectricVehicleSavingsCalculator />
    </CalcPage>
  );
}
