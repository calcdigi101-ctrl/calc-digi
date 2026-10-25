import type { Metadata } from "next";
import Link from "next/link";
import EvSavingsCalculatorComponent from "@/components/calcs/transportation/ev-savings-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EvVsGasAnnualFuelCostComparisonChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/ev-savings-calculator";
const TITLE = "EV Savings Calculator | Electric vs Gas Fuel & Payback Analysis";
const DESCRIPTION =
  "Calculate electric vehicle fuel savings, home charging electricity costs vs gasoline MPG, avoided ICE maintenance, and 5-year break-even payback.";

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
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
  { href: "/calculators/transportation/car-payment-calculator", icon: "💳", name: "Car Payment Calculator" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/mpg-calculator", icon: "📊", name: "MPG Calculator" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
];

export default function EvSavingsCalculatorPage() {
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
              Electrification Summary: Cost Per Mile & Charging Modality
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              An electric vehicle achieving 3.5 miles per kilowatt-hour (kWh) charged at the US average residential electricity rate of $0.16/kWh costs just $0.046 per mile in energy. In comparison, a 28 MPG gasoline vehicle fueled at $3.65 per gallon costs $0.130 per mile—nearly three times higher. You can track combustible gasoline spending in our{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium underline hover:text-amber-900">
                fuel cost calculator
              </Link>{" "}
              and monitor asset depreciation curves in the{" "}
              <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium underline hover:text-amber-900">
                car depreciation calculator
              </Link>.
            </p>
          </div>

          <h2>Electrodynamic Efficiency & Level 2 vs DC Fast Charging Economics</h2>
          <EvVsGasAnnualFuelCostComparisonChart />
          <p>
            The fundamental economic advantage of battery electric vehicles (BEVs) over internal combustion engine (ICE) vehicles originates in thermodynamic powertrain efficiency. An internal combustion engine converts only 20% to 30% of gasoline chemical energy into mechanical wheel work, discarding 70% to 80% as waste heat through radiators and exhaust piping.
          </p>
          <p>
            Conversely, modern electric traction motors convert 85% to 92% of electrical battery energy directly into tractive wheel torque. However, the operational savings achieved depend critically upon charging infrastructure modality. While overnight residential Level 2 charging provides the cheapest electricity, commercial DC fast chargers (charging at 150 kW to 350 kW) carry substantial utility demand charge markups. Commuting costs can be modeled in our{" "}
            <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              commute cost calculator
            </Link>:
          </p>

          <Formula>
            {"C_{\text{EV, energy}} = \frac{\text{Annual Miles}}{\eta_{\text{EV}}\,(\text{mi/kWh})} \times \left[w_{\text{home}} P_{\text{home}} + (1 - w_{\text{home}}) P_{\text{fast}}\right]"}
          </Formula>

          <Formula>
            {"C_{\text{Gas, energy}} = \frac{\text{Annual Miles}}{\text{MPG}_{\text{ICE}}} \times P_{\text{gas}}"}
          </Formula>

          <Formula>
            {"\Delta C_{\text{annual net}} = (C_{\text{Gas}} - C_{\text{EV}}) + (\text{Annual Miles} \times \Delta M_{\text{avoided maint}})"}
          </Formula>

          <Formula>
            {"\text{Payback Period (Years)} = \frac{\text{EV Acquisition Upfront Price Premium}}{\Delta C_{\text{annual net}}}"}
          </Formula>

          <h2>Vehicle Powertrain Operational Energy Cost Matrix: 15,000 Miles/Year</h2>
          <p>
            The comparative matrix below models annual energy costs, fuel cost per mile, and carbon emissions across diverse powertrain segments traveling a standard 15,000-mile annual distance:
          </p>

          <DataTable
            head={[
              "Powertrain & Platform Specification",
              "Efficiency Metric",
              "Energy Price Unit",
              "Fuel Cost Per Mile",
              "Annual Energy Cost",
              "Lifecycle GHG (g CO2e/mi)",
            ]}
            rows={[
              ["Efficient EV (Model 3 / Ioniq 6)", "4.0 mi/kWh (25 kWh/100mi)", "$0.16 / kWh (Home L2)", "$0.040 / mile", "$600 / year", "95 g CO2e / mi"],
              ["Midsize EV Crossover (Model Y / EV6)", "3.3 mi/kWh (30 kWh/100mi)", "$0.16 / kWh (Home L2)", "$0.048 / mile", "$727 / year", "115 g CO2e / mi"],
              ["EV Crossover (100% DC Fast Charge)", "3.3 mi/kWh (30 kWh/100mi)", "$0.42 / kWh (Public Fast)", "$0.127 / mile", "$1,909 / year", "115 g CO2e / mi"],
              ["Compact Hybrid (Prius / Corolla)", "52.0 MPG (US)", "$3.65 / gallon", "$0.070 / mile", "$1,053 / year", "170 g CO2e / mi"],
              ["Standard Gasoline Sedan (Civic / Camry)", "30.0 MPG (US)", "$3.65 / gallon", "$0.122 / mile", "$1,825 / year", "295 g CO2e / mi"],
              ["Midsize Gasoline SUV (Explorer / Pilot)", "22.0 MPG (US)", "$3.65 / gallon", "$0.166 / mile", "$2,489 / year", "405 g CO2e / mi"],
              ["Full-Size V8 Pickup Truck (F-150 / RAM)", "17.0 MPG (US)", "$3.65 / gallon", "$0.215 / mile", "$3,221 / year", "525 g CO2e / mi"],
            ]}
          />

          <h2>Worked Analytical Scenario: 5-Year Ownership Payback Modeling</h2>
          <p>
            Consider a prospective buyer comparing a new battery electric crossover ($46,000 purchase price) against an equivalent gasoline crossover ($39,000 purchase price), creating a $7,000 initial upfront EV price premium. Driving 14,000 miles per year with gas at $3.75/gal and home electric rates at $0.15/kWh, we evaluate the break-even payback alongside auto financing in our{" "}
            <Link href="/calculators/transportation/car-payment-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              car payment calculator
            </Link>{" "}
            and road trip fuel costs in the{" "}
            <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              fuel cost calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Gasoline Vehicle Operating Cost (24 MPG):</strong>
              <Formula>
                {"\text{Annual Gallons} = \frac{14{,}000\,\text{miles}}{24.0\,\text{MPG}} = 583.33\,\text{gallons} \times \$3.75 = \$2{,}187.50/\text{year}"}
              </Formula>
            </li>
            <li>
              <strong>Electric Vehicle Operating Cost (3.4 mi/kWh):</strong> Assuming 85% home charging ($0.15/kWh) and 15% public fast charging ($0.40/kWh):
              <Formula>
                {"P_{\text{effective}} = (0.85 \times \$0.15) + (0.15 \times \$0.40) = \$0.1275 + \$0.060 = \$0.1875/\text{kWh}"}
              </Formula>
              <Formula>
                {"\text{Annual kWh} = \frac{14{,}000}{3.4} = 4{,}117.65\,\text{kWh} \times \$0.1875 = \$772.06/\text{year}"}
              </Formula>
            </li>
            <li>
              <strong>Direct Annual Fuel Savings:</strong> $2,187.50 - $772.06 = $1,415.44 saved annually on fuel alone.
            </li>
            <li>
              <strong>Avoided Maintenance Dividend:</strong> Electric vehicles eliminate motor oil changes, transmission flushes, spark plug replacements, and engine air filters. In addition, regenerative braking extends brake pad life beyond 100,000 miles, saving roughly $0.035 per mile: 14,000 mi * $0.035 = $490.00/year.
            </li>
            <li>
              <strong>Total Annual Operating Advantage:</strong> $1,415.44 (Fuel) + $490.00 (Maintenance) = $1,905.44 per year ($158.79 per month).
            </li>
            <li>
              <strong>Break-Even Payback Period:</strong> Dividing the $7,000 price premium by $1,905.44 annual savings yields 3.67 years (44 months). After month 44, the EV delivers over $1,900 in pure annual financial profit.
            </li>
          
            <li>
              <strong>Climatic Heat Pump & Cold Weather Efficiency Variances:</strong> Ambient temperature extremes significantly alter battery pack electrochemical performance and auxiliary HVAC consumption. In sub-freezing winter conditions below 25°F (-4°C), cabin resistive heating and increased electrolyte resistance reduce nominal driving range by 20% to 32%, temporarily elevating electricity consumption per 100 miles before returning to peak efficiency during mild temperate spring conditions.
            </li>
          </ul>

          <h2>Battery Degradation Chemistry & Ambient Temperature Thermal Losses</h2>
          <p>
            While electric powertrains excel in mechanical efficiency, ambient weather conditions profoundly modulate real-world range. Lithium-ion battery chemistries (such as Nickel-Manganese-Cobalt [NMC] and Lithium-Iron-Phosphate [LFP]) suffer from elevated internal electrolyte resistance at freezing temperatures.
          </p>
          <p>
            When driving at 20°F (-7°C), cabin heating via resistive heaters or heat pumps draws 2.0 to 4.5 kW of continuous electrical power, reducing cold-weather driving efficiency by 20% to 35%. Conversely, in hot climates exceeding 100°F (38°C), battery thermal management systems actively chill cells to prevent thermal runaway. Long-distance trip efficiency can be verified in our{" "}
            <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              distance calculator
            </Link>.
          </p>

          <h2>Operational Pitfalls in EV Economics & Charging Infrastructure</h2>
          <p>
            Prospective EV adopters should navigate several critical operational factors:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>The Public Charging Cost Parity Trap:</strong> If an EV owner lacks residential home charging and relies 100% on commercial DC fast chargers ($0.40 to $0.50 per kWh), fuel cost per mile equals $0.12 to $0.15—virtually identical to a 30 MPG gasoline car.
            </li>
            <li>
              <strong>Home Electrical Panel Upgrades:</strong> Installing a 240V Level 2 charging circuit (40A to 50A breaker) costs between $500 and $2,500 depending on home breaker box capacity and wire run distances.
            </li>
            <li>
              <strong>Tire Wear Rate from Instant Torque:</strong> Electric vehicles produce maximum torque from zero RPM and carry substantial battery curb weight. This elevated traction load wears out tires 20% to 30% faster than internal combustion equivalents.
            </li>
            <li>
              <strong>Real-World Fuel Economy Verification:</strong> Comparing real-world fuel consumption across gasoline and hybrid vehicles is verified in our{" "}
              <Link href="/calculators/transportation/mpg-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                mpg calculator
              </Link>.
            </li>
          
            <li>
              <strong>Climatic Heat Pump & Cold Weather Efficiency Variances:</strong> Ambient temperature extremes significantly alter battery pack electrochemical performance and auxiliary HVAC consumption. In sub-freezing winter conditions below 25°F (-4°C), cabin resistive heating and increased electrolyte resistance reduce nominal driving range by 20% to 32%, temporarily elevating electricity consumption per 100 miles before returning to peak efficiency during mild temperate spring conditions.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How much does it cost to fully charge an electric car at home?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A standard 75 kWh EV battery (providing roughly 250 to 300 miles of range) costs approximately $12.00 to charge from empty to 100% at the national average residential rate of $0.16 per kWh. Off-peak time-of-use electric plans can lower this to $6.00 to $8.00 per full charge.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between Level 1, Level 2, and DC Fast Charging?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Level 1 charging uses a standard 120V household wall outlet (1.4 kW), adding 3 to 5 miles of range per hour. Level 2 uses a 240V dedicated circuit (7.2 to 11.5 kW), replenishing a battery overnight in 6 to 9 hours. DC Fast Charging (50 to 350 kW direct current) charges 10% to 80% in 18 to 35 minutes at highway travel plazas.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Do electric vehicle batteries really need replacement after 8 to 10 years?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Federal regulations mandate that all EVs sold in the US carry a minimum 8-year or 100,000-mile battery warranty. Real-world fleet data demonstrates modern liquid-cooled lithium batteries retain 85% to 90% of original capacity after 150,000 to 200,000 miles, far outlasting consumer fears.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does vehicle depreciation impact overall electric car ownership costs?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Because rapid advances in battery technology, range, and charging speed lower used EV demand, early EVs experience higher first-year depreciation modeled in our{" "}
                <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  car depreciation calculator
                </Link>, making long-term ownership essential to maximize operational savings.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Are electric vehicles actually cleaner than gas cars when factoring electric grid emissions?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Yes. Studies by the Union of Concerned Scientists demonstrate that even on coal-heavy regional grids, an EV produces lifecycle emissions equivalent to a gasoline vehicle achieving over 85 MPG. On cleaner solar/wind grids, EVs operate with virtually zero operational emissions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do moving and long-distance relocations handle EV transportation?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                When moving long distances, families plan cross-country charging corridors or utilize freight transport services analyzed in our{" "}
                <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  moving cost calculator
                </Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative Electric Vehicle Standards & Research Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>US Department of Energy (Alternative Fuels Data Center):</strong> Electric Vehicle Charging Infrastructure and Fuel Cost Comparisons.
            </li>
            <li>
              <strong>Environmental Protection Agency (EPA Fueleconomy.gov):</strong> MPGe ratings, annual fuel cost benchmarks, and greenhouse gas metrics.
            </li>
            <li>
              <strong>National Renewable Energy Laboratory (NREL):</strong> Electric vehicle total cost of ownership and regional charging infrastructure studies.
            </li>
            <li>
              <strong>Society of Automotive Engineers (SAE J1772 & J3400 NACS):</strong> Electric vehicle conductive charge coupler and charging communication standards.
            </li>
          
            <li>
              <strong>Climatic Heat Pump & Cold Weather Efficiency Variances:</strong> Ambient temperature extremes significantly alter battery pack electrochemical performance and auxiliary HVAC consumption. In sub-freezing winter conditions below 25°F (-4°C), cabin resistive heating and increased electrolyte resistance reduce nominal driving range by 20% to 32%, temporarily elevating electricity consumption per 100 miles before returning to peak efficiency during mild temperate spring conditions.
            </li>
          </ul>
        </>
      }
    >
      <EvSavingsCalculatorComponent />
    </CalcPage>
  );
}
