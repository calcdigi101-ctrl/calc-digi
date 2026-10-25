import type { Metadata } from "next";
import Link from "next/link";
import FuelCostCalculatorComponent from "@/components/calcs/transportation/fuel-cost-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FuelCostPerMileSensitivityChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/fuel-cost-calculator";
const TITLE = "Fuel Cost Calculator | Gas Trip Expense & Passenger Split Solver";
const DESCRIPTION =
  "Calculate road trip fuel costs, gallons consumed, gas price per mile, and fair passenger expense splits based on real-world vehicle MPG.";

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
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/mpg-calculator", icon: "📊", name: "MPG Calculator" },
  { href: "/calculators/transportation/ev-savings-calculator", icon: "⚡", name: "EV Savings Calculator" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
];

export default function FuelCostCalculatorPage() {
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
              Fuel Budgeting Summary: The Cost-Per-Mile Formula
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Calculating road trip gasoline expenditure is a straightforward function of route distance, vehicle fuel economy (MPG), and fuel retail price. Total fuel consumed equals total miles divided by vehicle MPG, which when multiplied by fuel price yields total expenditure. You can check vehicle fuel economy ratings with our{" "}
              <Link href="/calculators/transportation/mpg-calculator" className="font-medium underline hover:text-amber-900">
                mpg calculator
              </Link>{" "}
              and evaluate electric alternatives in the{" "}
              <Link href="/calculators/transportation/ev-savings-calculator" className="font-medium underline hover:text-amber-900">
                ev savings calculator
              </Link>.
            </p>
          </div>

          <h2>Fuel Consumption Thermodynamics & Marginal Mileage Sensitivity</h2>
          <FuelCostPerMileSensitivityChart />
          <p>
            In vehicular operational analysis, the fuel expense of road transit is governed by internal combustion chemical energy density. A standard gallon of commercial E10 unleaded gasoline contains approximately 114,000 to 121,000 British Thermal Units (BTU) of chemical potential energy, equivalent to roughly 33.7 kilowatt-hours (kWh) of electrical energy.
          </p>
          <p>
            Because vehicle fuel economy (measured in Miles Per Gallon in the US and Liters per 100km globally) represents an inverse metric, improvements at low MPG ratings deliver dramatically greater dollar savings than equivalent numeric improvements at high MPG levels. Commuting budgets can be modeled in our{" "}
            <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              commute cost calculator
            </Link>:
          </p>

          <Formula>
            {"\text{Total Fuel Cost (\$)} = \left(\frac{\text{Trip Distance (Miles)}}{\text{Vehicle MPG}}\right) \times P_{\text{fuel/gal}}"}
          </Formula>

          <Formula>
            {"\text{Driving Fuel Cost Per Mile} = \frac{P_{\text{fuel/gal}}}{\text{Vehicle MPG}}"}
          </Formula>

          <Formula>
            {"\text{Cost Per 100 Miles} = \left(\frac{100}{\text{MPG}}\right) \times P_{\text{fuel/gal}}"}
          </Formula>

          <Formula>
            {"\text{Passenger Equal Split (\$)} = \frac{\text{Total Trip Fuel Outlay}}{\text{Number of Travelers (N)}}"}
          </Formula>

          <h2>Vehicle Segment Fuel Cost Comparison Matrix: 500-Mile Road Trip</h2>
          <p>
            The benchmark reference table below compares fuel requirements and dollar outlays for a 500-mile highway journey across varying vehicle platforms at an average fuel price of $3.75 per gallon:
          </p>

          <DataTable
            head={[
              "Vehicle Segment / Platform",
              "Highway Fuel Economy",
              "Gallons Required (500 mi)",
              "Total Fuel Cost ($3.75/gal)",
              "Cost Per Mile",
              "Split Across 4 Diners",
            ]}
            rows={[
              ["Full-Size Heavy Duty V8 Truck", "15.0 MPG", "33.3 gal", "$125.00", "$0.250 / mi", "$31.25 / person"],
              ["Large 3-Row Family SUV", "20.0 MPG", "25.0 gal", "$93.75", "$0.188 / mi", "$23.44 / person"],
              ["Midsize Crossover (AWD)", "26.0 MPG", "19.2 gal", "$72.12", "$0.144 / mi", "$18.03 / person"],
              ["Standard Compact Sedan", "34.0 MPG", "14.7 gal", "$55.15", "$0.110 / mi", "$13.79 / person"],
              ["Subcompact Hatchback", "38.0 MPG", "13.2 gal", "$49.34", "$0.099 / mi", "$12.34 / person"],
              ["Gasoline-Electric Hybrid Sedan", "52.0 MPG", "9.6 gal", "$36.06", "$0.072 / mi", "$9.01 / person"],
              ["Plug-In Hybrid (PHEV on Gas Mode)", "42.0 MPG", "11.9 gal", "$44.64", "$0.089 / mi", "$11.16 / person"],
            ]}
          />

          <h2>Worked Analytical Scenario: Pacing a 650-Mile Vacation Road Trip</h2>
          <p>
            Consider a group of 4 university colleagues embarking on a 650-statute-mile holiday road trip to a national park in a midsize crossover SUV rated at 27.0 highway MPG. With regional gasoline averaging $3.80 per gallon, we calculate total gallons consumed, total fuel costs, and equal passenger splits alongside distance duration modeled in our{" "}
            <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              distance calculator
            </Link>{" "}
            and vehicle financing in the{" "}
            <Link href="/calculators/transportation/car-payment-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              car payment calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Total Fuel Volume Consumed:</strong>
              <Formula>
                {"\text{Gallons} = \frac{650.0\,\text{miles}}{27.0\,\text{MPG}} = 24.07\,\text{gallons} = 91.13\,\text{Liters}"}
              </Formula>
            </li>
            <li>
              <strong>Total Fuel Outlay:</strong>
              <Formula>
                {"\text{Total Fuel Cost} = 24.074\,\text{gallons} \times \$3.80/\text{gal} = \$91.48"}
              </Formula>
            </li>
            <li>
              <strong>Driving Cost Per Mile:</strong>
              <Formula>
                {"\text{Cost/Mile} = \frac{\$91.48}{650\,\text{miles}} = \$0.1407/\text{mile} \quad (\$14.07/100\,\text{miles})"}
              </Formula>
            </li>
            <li>
              <strong>Equal 4-Way Passenger Split:</strong> Dividing the $91.48 fuel bill equally among 4 passengers yields $91.48 / 4 = $22.87 per traveler.
            </li>
            <li>
              <strong>Round-Trip Extension:</strong> If returning along the same route (1,300 miles total), cumulative fuel expense equals $182.96 ($45.74 per person).
            </li>
            <li>
              <strong>Comparative Flight Alternative:</strong> Four round-trip regional airline tickets analyzed in our{" "}
              <Link href="/calculators/transportation/flight-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                flight time calculator
              </Link>{" "}
              would cost upwards of $1,200, highlighting the massive cost efficiency of shared road trip travel.
            </li>
          
            <li>
              <strong>Hydrocarbon Volumetric Density & Seasonal Fuel Blends:</strong> Commercial retail gasoline expands and contracts with ambient ground temperatures at roughly 0.069% per degree Fahrenheit. Fuel dispensed from non-temperature-compensated pumps during cold early morning hours delivers marginally higher mass density per metered gallon. Furthermore, petroleum refineries transition between high-volatility winter blends (elevated butane and Reid Vapor Pressure) and summer gasoline formulations. Summer blends deliver approximately 1.7% higher volumetric energy density (BTUs per gallon), yielding subtly improved highway fuel economy during warmer months.
            </li>
          </ul>

          <h2>The "MPG Illusion" & Non-Linear Fuel Savings Physics</h2>
          <p>
            Consumer behavioral economics frequently identifies the "MPG Illusion," first documented in science by Larrick and Soll. Because fuel economy in the US is expressed as distance per unit volume (miles per gallon) rather than volume per unit distance (gallons per 100 miles, as used in Europe and Canada), people intuitively assume that increasing fuel economy by 10 MPG delivers identical savings across all vehicles.
          </p>
          <p>
            In reality, upgrading a vehicle from 15 MPG to 20 MPG over 10,000 miles saves 166.7 gallons of fuel ($625 at $3.75/gal). In contrast, upgrading an already efficient vehicle from 35 MPG to 45 MPG over the same 10,000 miles saves only 63.5 gallons ($238). The non-linear reciprocal curve (1/MPG) proves that replacing fuel-thirsty trucks and SUVs yields far greater financial dividends than hyper-miling compact sedans.
          </p>

          <h2>Operational Pitfalls in Fuel Budgeting & Real-World Consumption</h2>
          <p>
            Drivers should account for factors that depress real-world highway fuel economy:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Excessive Interstate Speeds:</strong> Driving at 80 mph requires 35% more aerodynamic power than driving at 65 mph, decreasing vehicle fuel economy by 15% to 20% and inflating fuel costs by $0.02 to $0.04 per mile.
            </li>
            <li>
              <strong>Under-Inflated Tires:</strong> Operating with tire pressures 5 PSI below recommended door-jamb specifications increases rolling resistance, reducing fuel economy by 2% to 3%.
            </li>
            <li>
              <strong>Roof Racks & Cargo Boxes:</strong> Mounting an empty rooftop cargo carrier or bicycle rack creates severe aerodynamic drag, cutting highway fuel economy by 10% to 22% at 70 mph.
            </li>
            <li>
              <strong>Speed, Distance and Travel Pacing:</strong> Managing long driving days with proper pacing can be monitored using our{" "}
              <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                speed distance time calculator
              </Link>.
            </li>
          
            <li>
              <strong>Hydrocarbon Volumetric Density & Seasonal Fuel Blends:</strong> Commercial retail gasoline expands and contracts with ambient ground temperatures at roughly 0.069% per degree Fahrenheit. Fuel dispensed from non-temperature-compensated pumps during cold early morning hours delivers marginally higher mass density per metered gallon. Furthermore, petroleum refineries transition between high-volatility winter blends (elevated butane and Reid Vapor Pressure) and summer gasoline formulations. Summer blends deliver approximately 1.7% higher volumetric energy density (BTUs per gallon), yielding subtly improved highway fuel economy during warmer months.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do I calculate fuel cost per mile for my personal vehicle?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Divide the current local price of gasoline per gallon by your vehicle's real-world MPG. For example, if gas costs $3.60 per gallon and your car averages 30 MPG, your fuel cost per mile is $3.60 / 30 = $0.12 per mile ($12.00 per 100 miles driven).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why is highway fuel economy typically higher than city fuel economy?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                City driving involves frequent stopping, idling at red lights, and accelerating vehicle mass from rest, which requires massive low-gear engine torque. Highway driving allows the transmission to cruise in tall overdrive gears at steady engine RPM without kinetic braking losses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does running the air conditioner noticeably increase vehicle fuel consumption?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Yes. Operating the mechanical air conditioning compressor draws 3 to 5 horsepower from the engine, reducing fuel economy by 5% to 15% in low-speed city driving. At speeds above 55 mph, running the AC is more fuel-efficient than driving with open windows, which ruins vehicle aerodynamics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does road trip fuel expense compare against vehicle depreciation?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                On a 1,000-mile road trip, gasoline costs approximately $140, while vehicle depreciation modeled in our{" "}
                <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  car depreciation calculator
                </Link>{" "}
                adds roughly $100 to $150 in wear and tear, making total driving costs roughly double the fuel bill.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do passengers split road trip gas and toll costs fairly?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                The standard protocol is to begin the trip with a full tank of gas, retain all fuel and highway toll receipts during the journey, refill the tank upon return, and divide the cumulative receipt total equally among all traveling passengers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does switching to an electric vehicle compare to gas fuel costs?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                As modeled in our{" "}
                <Link href="/calculators/transportation/ev-savings-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  ev savings calculator
                </Link>, home electric charging costs approximately $0.04 to $0.05 per mile, cutting road trip energy costs by roughly 60% compared to typical 25 MPG gasoline vehicles.
              </p>
            </div>
          </div>

          <h2>Authoritative Fuel Economy Standards & Regulatory Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>US Environmental Protection Agency (EPA Office of Transportation and Air Quality):</strong> Light-Duty Automotive Fuel Economy Testing Regulations.
            </li>
            <li>
              <strong>US Department of Energy (Energy Information Administration - EIA):</strong> Weekly Petroleum Status Report and Retail Gasoline Price Index.
            </li>
            <li>
              <strong>National Highway Traffic Safety Administration (NHTSA):</strong> Corporate Average Fuel Economy (CAFE) Standards and Compliance Reports.
            </li>
            <li>
              <strong>Society of Automotive Engineers (SAE J1312):</strong> Procedure for Measuring Fuel Consumption of Motor Vehicles on Proving Grounds.
            </li>
          
            <li>
              <strong>Hydrocarbon Volumetric Density & Seasonal Fuel Blends:</strong> Commercial retail gasoline expands and contracts with ambient ground temperatures at roughly 0.069% per degree Fahrenheit. Fuel dispensed from non-temperature-compensated pumps during cold early morning hours delivers marginally higher mass density per metered gallon. Furthermore, petroleum refineries transition between high-volatility winter blends (elevated butane and Reid Vapor Pressure) and summer gasoline formulations. Summer blends deliver approximately 1.7% higher volumetric energy density (BTUs per gallon), yielding subtly improved highway fuel economy during warmer months.
            </li>
          </ul>
        </>
      }
    >
      <FuelCostCalculatorComponent />
    </CalcPage>
  );
}
