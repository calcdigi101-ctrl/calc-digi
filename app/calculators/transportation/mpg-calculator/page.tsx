import type { Metadata } from "next";
import Link from "next/link";
import MpgCalculatorComponent from "@/components/calcs/transportation/mpg-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InternalCombustionThermodynamicLossChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/mpg-calculator";
const TITLE = "MPG Calculator | Real-World Fuel Economy & L/100km Converter";
const DESCRIPTION =
  "Calculate vehicle fuel economy in US Miles Per Gallon, Imperial UK MPG, metric Liters per 100 km, driving cost per mile, and tank travel range.";

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
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/ev-savings-calculator", icon: "⚡", name: "EV Savings Calculator" },
  { href: "/calculators/transportation/distance-calculator", icon: "📍", name: "Distance Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
];

export default function MpgCalculatorPage() {
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
              Fuel Economy Metrology Summary: The Tank-to-Tank Method
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              The gold standard for measuring real-world automotive fuel economy is the tank-to-tank fill-up calculation. By filling the fuel tank completely, resetting the trip odometer, driving normally, refilling completely at the next stop, and dividing elapsed odometer miles by gallons pumped, drivers eliminate dashboard computer calibration biases. You can convert trip fuel expenses in our{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium underline hover:text-amber-900">
                fuel cost calculator
              </Link>{" "}
              and monitor electric charging efficiency in the{" "}
              <Link href="/calculators/transportation/ev-savings-calculator" className="font-medium underline hover:text-amber-900">
                ev savings calculator
              </Link>.
            </p>
          </div>

          <h2>Internal Combustion Thermodynamics & The Sankey Energy Flow Balance</h2>
          <InternalCombustionThermodynamicLossChart />
          <p>
            In automotive powertrain engineering and thermodynamics, an internal combustion engine operates as an open chemical combustion heat engine governed by the Otto cycle (gasoline spark ignition) or Diesel cycle (compression ignition). Only a minor fraction of the chemical enthalpy stored in hydrocarbon fuel is converted into useful mechanical work at the vehicle&apos;s driven wheels.
          </p>
          <p>
            According to thermodynamic analyses published by Oak Ridge National Laboratory and the US Department of Energy, approximately 65% to 75% of fuel energy is immediately rejected as waste heat: 35% dissipates through cylinder head water coolant into the radiator, and 35% expels as superheated exhaust gas. Commuter financial impacts can be evaluated in our{" "}
            <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              commute cost calculator
            </Link>:
          </p>

          <Formula>
            {"\text{US MPG} = \frac{\text{Miles Driven}}{\text{US Gallons Pumped}}"}
          </Formula>

          <Formula>
            {"\text{Metric Fuel Consumption (L/100km)} = \frac{235.214583}{\text{US MPG}}"}
          </Formula>

          <Formula>
            {"\text{Imperial (UK) MPG} = \text{US MPG} \times 1.20095 = \frac{\text{Miles Driven}}{\text{Imperial Gallons (4.546 L)}}"}
          </Formula>

          <Formula>
            {"\text{Driving Fuel Cost Per Mile (\$)} = \frac{P_{\text{fuel/gal}}}{\text{US MPG}} = \frac{\text{Total Refill Cost}}{\text{Miles Driven}}"}
          </Formula>

          <h2>International Fuel Economy Conversion & Metric Equivalence Table</h2>
          <p>
            The comprehensive metrology table below maps standard vehicle fuel economy benchmarks across US customary, British Imperial, and global metric systems:
          </p>

          <DataTable
            head={[
              "Vehicle Economy Tier",
              "US MPG",
              "Imperial (UK) MPG",
              "Metric (L/100km)",
              "Kilometers per Liter (km/L)",
              "Driving Cost Per Mile ($3.65/gal)",
            ]}
            rows={[
              ["Heavy Duty / V8 Full-Size Truck", "14.0 MPG", "16.8 UK MPG", "16.80 L/100km", "5.95 km/L", "$0.261 / mile"],
              ["Midsize V6 SUV / Crossover", "20.0 MPG", "24.0 UK MPG", "11.76 L/100km", "8.50 km/L", "$0.183 / mile"],
              ["Standard Compact Crossover (AWD)", "26.0 MPG", "31.2 UK MPG", "9.05 L/100km", "11.05 km/L", "$0.140 / mile"],
              ["Turbocharged Compact Sedan", "32.0 MPG", "38.4 UK MPG", "7.35 L/100km", "13.60 km/L", "$0.114 / mile"],
              ["Subcompact Commuter Hatchback", "38.0 MPG", "45.6 UK MPG", "6.19 L/100km", "16.16 km/L", "$0.096 / mile"],
              ["Advanced Hybrid Electric (HEV)", "50.0 MPG", "60.0 UK MPG", "4.70 L/100km", "21.26 km/L", "$0.073 / mile"],
              ["High-Efficiency Plug-In Hybrid", "60.0 MPG", "72.1 UK MPG", "3.92 L/100km", "25.51 km/L", "$0.061 / mile"],
            ]}
          />

          <h2>Worked Analytical Scenario: Calculating Real-World Commute MPG</h2>
          <p>
            Consider a driver tracking fuel economy across two consecutive fill-ups during a suburban workweek. At the first fill-up, the driver fills the tank until the fuel pump nozzle automatically clicks off and resets the vehicle&apos;s trip odometer. After driving for 6 days, the trip odometer reads 382.4 miles. The pump dispenses 12.65 gallons of unleaded gasoline costing $3.70 per gallon ($46.81 total). We calculate real-world MPG, metric consumption, and running costs alongside travel pacing in our{" "}
            <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              speed distance time calculator
            </Link>{" "}
            and vehicle depreciation in the{" "}
            <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              car depreciation calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>US Fuel Economy Calculation:</strong>
              <Formula>
                {"\text{US MPG} = \frac{382.4\,\text{miles}}{12.65\,\text{gallons}} = 30.23\,\text{Miles Per Gallon (MPG)}"}
              </Formula>
            </li>
            <li>
              <strong>Metric Equivalent Conversion (L/100km):</strong>
              <Formula>
                {"\text{Liters/100km} = \frac{235.215}{30.229\,\text{MPG}} = 7.78\,\text{L/100km}"}
              </Formula>
              Metric efficiency = 100 / 7.78 = 12.85 km per liter of fuel.
            </li>
            <li>
              <strong>Imperial (UK) Rating:</strong>
              <Formula>
                {"\text{Imperial MPG} = 30.229 \times 1.20095 = 36.30\,\text{Imperial MPG}"}
              </Formula>
            </li>
            <li>
              <strong>Driving Cost Per Mile:</strong>
              <Formula>
                {"\text{Cost/Mile} = \frac{\$46.81\,\text{total refill cost}}{382.4\,\text{miles}} = \$0.1224/\text{mile} \quad (\$12.24/100\,\text{miles})"}
              </Formula>
            </li>
            <li>
              <strong>Dashboard Discrepancy Check:</strong> If the vehicle&apos;s in-dash instrument cluster reported an average of 32.5 MPG, the real-world calculation (30.2 MPG) reveals a 7.1% over-optimistic dashboard calibration error, typical of factory fuel flow computer algorithms.
            </li>
            <li>
              <strong>Long-Distance Distance Projection:</strong> Applying this verified 30.2 MPG rating across a 700-mile highway journey planned in our{" "}
              <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                distance calculator
              </Link>{" "}
              yields a total required fuel volume of 23.2 gallons.
            </li>
          
            <li>
              <strong>Oxygenated Ethanol Blends & Stoichiometric Energy Penalties:</strong> Standard pump gasoline across North America contains up to 10% anhydrous ethanol (E10), which carries approximately 33% less chemical energy per gallon than pure petroleum hydrocarbons. Vehicles operating on flex-fuel E85 blends experience an immediate 25% to 30% reduction in volumetric MPG due to lower energy density, requiring motorists to calculate pump price spreads carefully to ensure lower fuel cost per gallon offsets the higher volumetric consumption rate.
            </li>
          </ul>

          <h2>Why Dashboard Trip Computers Overestimate Real-World MPG</h2>
          <p>
            Modern vehicular instrument clusters feature electronic trip computers displaying instantaneous and average fuel economy. However, empirical testing by automotive engineering societies reveals that factory dashboard displays overestimate real-world MPG by 2% to 8%.
          </p>
          <p>
            This discrepancy occurs because factory computers do not measure physical liquid volume pumped through fuel lines. Instead, the engine control unit (ECU) calculates fuel burn indirectly by multiplying fuel injector pulse-width duration (milliseconds open) by nominal fuel rail pressure. Manufacturing tolerances in fuel injector nozzles, ethanol fuel density variations (E10 vs pure gas), and evaporative canister purge flow introduce cumulative mathematical offsets that bias readings upward.
          </p>

          <h2>Operational Pitfalls, Mechanical Parasitic Losses & Hyper-Miling</h2>
          <p>
            Drivers seeking to optimize real-world MPG should eliminate critical mechanical drains:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Dragging Brake Calipers:</strong> Sticking brake caliper slide pins maintain constant pad contact with brake rotors, creating invisible rolling friction that degrades fuel economy by 1.5 to 3.0 MPG while overheating wheel bearings.
            </li>
            <li>
              <strong>Faulty Engine Thermostats:</strong> An engine thermostat stuck open prevents coolant from reaching optimal operating temperature (195°F to 215°F / 90°C to 102°C). The ECU remains trapped in "open-loop" warmup enrichment, injecting 15% to 25% excess fuel into cylinders.
            </li>
            <li>
              <strong>Fouled Spark Plugs & Oxygen Sensors:</strong> Aging upstream air-fuel ratio oxygen sensors drift lean over time, causing the ECU to over-fuel the mixture and robbing 10% to 15% of highway fuel economy.
            </li>
            <li>
              <strong>Active Transportation Alternatives:</strong> Comparing motor vehicle fuel efficiency against athletic human energy burn is analyzed in our{" "}
              <Link href="/calculators/transportation/bike-pace-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                bike pace calculator
              </Link>.
            </li>
          
            <li>
              <strong>Oxygenated Ethanol Blends & Stoichiometric Energy Penalties:</strong> Standard pump gasoline across North America contains up to 10% anhydrous ethanol (E10), which carries approximately 33% less chemical energy per gallon than pure petroleum hydrocarbons. Vehicles operating on flex-fuel E85 blends experience an immediate 25% to 30% reduction in volumetric MPG due to lower energy density, requiring motorists to calculate pump price spreads carefully to ensure lower fuel cost per gallon offsets the higher volumetric consumption rate.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does 1 UK Imperial gallon differ from 1 US customary gallon?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A United States gallon is defined as exactly 231 cubic inches or 3.78541 liters. A British Imperial gallon is defined as the volume of 10 pounds of distilled water at 62°F, equaling approximately 4.54609 liters. Because an Imperial gallon is 20.1% larger than a US gallon, an identical vehicle achieves a 20.1% higher numerical MPG rating in the UK.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why is lower Liters per 100km (L/100km) better, unlike MPG?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Liters per 100 km is a consumption metric measuring fuel consumed per fixed distance; lower numbers indicate superior fuel efficiency. Miles per gallon is an economy metric measuring distance traveled per unit of fuel; higher numbers indicate superior efficiency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does aggressive driving and rapid acceleration degrade MPG?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Rapid acceleration commands wide-open throttle (WOT) enrichment from the engine control unit, injecting rich fuel mixtures (air-fuel ratio drops from 14.7:1 to 11.5:1) to prevent cylinder detonation. Studies by Oak Ridge National Laboratory prove aggressive driving lowers real-world MPG by 15% to 33%.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Does premium high-octane gasoline increase MPG in regular vehicles?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                No. Octane rating measures fuel resistance to pre-ignition knock, not energy content. Unless your vehicle&apos;s owner manual specifically mandates premium fuel for high-compression turbocharging, burning 93-octane premium in an engine designed for 87-octane regular yields zero improvement in fuel economy or horsepower.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does winter-blend gasoline affect vehicle fuel economy?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Winter-blend gasoline contains higher concentrations of butane and light hydrocarbons to increase Reid Vapor Pressure (RVP) for easy cold engine starting. Because butane possesses lower volumetric energy density than heavier aromatics, winter-blend gas reduces vehicle fuel economy by 1.5% to 3.0%.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does vehicle fuel economy directly impact annual commute budgets?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Improving your commute vehicle from 20 MPG to 35 MPG over a 15,000-mile annual commute saves 321 gallons of fuel per year—putting over $1,150 in annual cash savings back into your household budget, as modeled in our{" "}
                <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  commute cost calculator
                </Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative Fuel Economy Testing Standards & Engineering Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Code of Federal Regulations (40 CFR Part 600):</strong> Fuel Economy and Greenhouse Gas Exhaust Emissions of Motor Vehicles.
            </li>
            <li>
              <strong>Oak Ridge National Laboratory (Transportation Energy Data Book):</strong> Energy losses in passenger cars and light trucks.
            </li>
            <li>
              <strong>International Organization for Standardization (ISO 10521):</strong> Road vehicles - Determination of road load and chassis dynamometer simulation.
            </li>
            <li>
              <strong>Society of Automotive Engineers (SAE J1082):</strong> Fuel Economy Measurement Road Test Procedure for Light-Duty Vehicles.
            </li>
          
            <li>
              <strong>Oxygenated Ethanol Blends & Stoichiometric Energy Penalties:</strong> Standard pump gasoline across North America contains up to 10% anhydrous ethanol (E10), which carries approximately 33% less chemical energy per gallon than pure petroleum hydrocarbons. Vehicles operating on flex-fuel E85 blends experience an immediate 25% to 30% reduction in volumetric MPG due to lower energy density, requiring motorists to calculate pump price spreads carefully to ensure lower fuel cost per gallon offsets the higher volumetric consumption rate.
            </li>
          </ul>
        </>
      }
    >
      <MpgCalculatorComponent />
    </CalcPage>
  );
}
