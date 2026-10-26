import type { Metadata } from "next";
import Link from "next/link";
import FuelEconomyConverterComponent from "@/components/calcs/measurements/fuel-economy-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FuelEconomyConsumptionCurvatureChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/fuel-economy-converter";
const TITLE = "Fuel Economy Converter | MPG, L/100km & km/L Consumption";
const DESCRIPTION =
  "Convert US miles per gallon (MPG), UK Imperial MPG, Liters per 100 kilometers (L/100km), and kilometers per liter with non-linear fuel consumption curvature modeling.";

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
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/speed-converter", icon: "🚀", name: "Speed Converter" },
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "🏎️", name: "Kinetic Energy" },
  { href: "/pages/measurements", icon: "⛽", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why is UK Imperial MPG higher than US MPG for the identical vehicle?",
    a: "An Imperial gallon contains exactly 4.54609 liters, whereas a US customary gallon contains 3.78541 liters (about 20% less). Because an Imperial gallon holds more fuel, a vehicle travels 20.095% farther on one Imperial gallon than on one US gallon. A car achieving 30 US MPG achieves approximately 36.03 Imperial MPG.",
  },
  {
    q: "What is the psychological 'MPG Illusion' in automotive fuel efficiency?",
    a: "Miles per gallon (MPG) measures distance per unit fuel, creating a non-linear inverse curve. Upgrading an SUV from 14 MPG to 20 MPG saves 2.14 gallons every 100 miles. By contrast, upgrading a hybrid from 33 MPG to 50 MPG saves only 1.03 gallons every 100 miles. Because MPG is non-linear, consumers regularly undervalue massive fuel savings in lower-efficiency vehicle tiers.",
  },
  {
    q: "How do you mathematically convert US MPG to Liters per 100 km (L/100km)?",
    a: "Because L/100km is an inverse consumption metric, the formula is: L/100km = 235.214583 ÷ US MPG. Conversely, US MPG = 235.214583 ÷ (L/100km). For Imperial MPG, the constant is 282.480936 ÷ UK MPG.",
  },
  {
    q: "What is MPGe (Miles Per Gallon Equivalent) for electric vehicles?",
    a: "Established by the US Environmental Protection Agency (EPA), MPGe represents the distance an electric vehicle can travel on the electrical equivalent of one gallon of gasoline. The EPA fixes 1 gallon of gasoline at exactly 33.7 kilowatt-hours (kWh) of chemical energy (115,000 BTU). An EV consuming 30 kWh per 100 miles achieves ~112 MPGe.",
  },
];

export default function FuelEconomyConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Efficiency Guidance:</strong> Fuel economy quantifies vehicle energy efficiency across distance traveled. In automotive powertrain engineering and fleet logistics, cross-reference liquid capacity in our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link> and calculate route distance using our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Automotive Thermodynamics: Distance Efficiency vs Volume Consumption
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Automotive fuel economy metrics evaluate how effectively an internal combustion engine or electric powertrain converts stored chemical or electrochemical potential energy into translational vehicle displacement. Globally, two contrasting philosophies divide automotive engineering: distance-per-volume metrics (such as US MPG, UK MPG, and km/L) and volume-per-distance metrics (such as Liters per 100 kilometers, L/100km).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While distance-per-volume metrics appear intuitive at first glance, they suffer from mathematical non-linearity when assessing total fuel consumption. Volume-per-distance metrics like L/100km scale linearly with actual fuel consumed and greenhouse gas emissions produced, making them vastly superior for carbon tax accounting and corporate average fuel economy (CAFE) compliance.
          </p>

          <FuelEconomyConsumptionCurvatureChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation of Non-Linear Consumption Inversion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The fundamental relationship linking US miles per gallon to metric liters per 100 kilometers derives from exact statutory conversion constants: 1 mile = 1.609344 km and 1 US gallon = 3.785411784 liters:
          </p>
          <Formula>{"\\text{L/100km} = \\frac{100 \\times 3.785411784 \\text{ L}}{1.609344 \\text{ km} \\times \\text{MPG}_{\\text{US}}} = \\frac{235.214583}{\\text{MPG}_{\\text{US}}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For British Imperial miles per gallon (1 Imperial gallon = 4.54609 liters):
          </p>
          <Formula>{"\\text{L/100km} = \\frac{100 \\times 4.54609 \\text{ L}}{1.609344 \\text{ km} \\times \\text{MPG}_{\\text{UK}}} = \\frac{282.480936}{\\text{MPG}_{\\text{UK}}}"}</Formula>
          <Formula>{"\\text{km/L} = \\frac{\\text{MPG}_{\\text{US}}}{2.352146} = \\frac{100}{\\text{L/100km}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In highway driving, aerodynamic drag increases quadratically with speed, which causes fuel consumption to rise sharply; explore velocity modeling in our <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link> and calculate kinetic energy loads in the <Link href="/calculators/physics/kinetic-energy-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">kinetic energy calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Fuel Economy Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact conversion values across common consumer and commercial vehicle efficiency benchmarks:
          </p>
          <DataTable
            head={["Vehicle Class Benchmark", "Liters per 100km (L/100km)", "US Miles/Gallon (MPG)", "UK Imperial MPG", "Kilometers/Liter (km/L)"]}
            rows={[
              ["Heavy Duty Commercial Truck", "35.0 L/100km", "6.72 MPG", "8.07 MPG", "2.86 km/L"],
              ["Full-Size Gas Pickup Truck", "15.0 L/100km", "15.68 MPG", "18.83 MPG", "6.67 km/L"],
              ["Mid-Size Gas SUV", "10.0 L/100km", "23.52 MPG", "28.25 MPG", "10.00 km/L"],
              ["Compact Turbo Sedan", "7.5 L/100km", "31.36 MPG", "37.66 MPG", "13.33 km/L"],
              ["Subcompact European Hatchback", "5.5 L/100km", "42.77 MPG", "51.36 MPG", "18.18 km/L"],
              ["Full Hybrid Electric Vehicle", "4.5 L/100km", "52.27 MPG", "62.77 MPG", "22.22 km/L"],
              ["Plug-in Hybrid (CS Mode)", "3.8 L/100km", "61.90 MPG", "74.34 MPG", "26.32 km/L"],
              ["Electric Vehicle (EPA MPGe)", "2.1 L/100km eq", "112.00 MPGe", "134.51 MPGe", "47.62 km/L eq"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Commercial Fleet Fuel Cost Rationalization
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a cross-border logistics director managing a fleet of 120 delivery vans operating across the United States and Canada. The fleet averages 35,000 miles (56,327 km) per vehicle annually. The fleet director is evaluating two replacement options: Option A upgrades older vans from 15 US MPG to 20 US MPG; Option B upgrades lighter courier vans from 35 US MPG to 45 US MPG:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Analyze Option A - 15 to 20 MPG):</strong> Fuel at 15 MPG = 35,000 ÷ 15 = 2,333.33 gal. Fuel at 20 MPG = 35,000 ÷ 20 = 1,750.00 gal. Annual savings per van = 583.33 gallons (2,208.15 liters).</li>
            <li><strong>Step 2 (Analyze Option B - 35 to 45 MPG):</strong> Fuel at 35 MPG = 35,000 ÷ 35 = 1,000.00 gal. Fuel at 45 MPG = 35,000 ÷ 45 = 777.78 gal. Annual savings per van = 222.22 gallons (841.19 liters).</li>
            <li><strong>Step 3 (The MPG Illusion Revealed):</strong> Despite the smaller numerical MPG leap (+5 vs +10), Option A saves over 2.6 times more actual fuel and operating capital than Option B.</li>
            <li><strong>Step 4 (Chemical Energy Verification):</strong> Gallons of diesel fuel can be converted into megajoules of chemical energy in our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link> and gross fleet payload tonnage verified in the <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Harmonized Test Cycles: EPA vs WLTP vs NEDC
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A major source of international confusion in vehicle specifications is the difference in dynamometer laboratory test cycles used by regulatory bodies:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>EPA (United States):</strong> Employs a rigorous 5-cycle test protocol incorporating high-speed aggressive driving (US06), air conditioning electrical loads (SC03), and freezing cold ambient start temperatures (Cold FTP at 20°F / -7°C), yielding the most realistic real-world MPG ratings.</li>
            <li><strong>WLTP (Worldwide Harmonized Light Vehicles Test Procedure):</strong> Standardized by the UNECE in 2017 to replace the discredited NEDC test, WLTP features longer driving phases (30 minutes over 23.25 km) and higher speeds up to 131 km/h. WLTP fuel consumption figures are typically 10% to 15% more optimistic than US EPA ratings.</li>
            <li><strong>CLTC (China Light-Duty Vehicle Test Cycle):</strong> Employs lower average speeds and extended idle times reflective of dense metropolitan Chinese traffic congestion.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Aerodynamic Drag, Rolling Resistance & The Cubic Power Penalty
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A vehicle&apos;s highway fuel economy is primarily opposed by two resistive forces: mechanical rolling resistance of tires (F_rr = C_rr × m × g) and aerodynamic pressure drag (F_aero = 0.5 × ρ × v² × C_d × A). While tire rolling resistance remains relatively constant across normal speeds, aerodynamic drag force scales with velocity squared (v²).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Crucially, the propulsive engine power required to overcome aerodynamic drag scales with the cube of vehicle speed: P = F_aero × v = 0.5 × ρ × v³ × C_d × A. Increasing cruising highway speed from 55 mph (88.5 km/h) to 75 mph (120.7 km/h) increases aerodynamic drag power demand by: (75 / 55)³ = 1.364³ ≈ 2.53 times. This cubic power penalty dramatically degrades highway fuel economy by 20% to 30%.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Electric Vehicle Energy Consumption: kWh per 100 Miles vs Wh/km
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As the automotive industry transitions to battery electric vehicles (BEVs), energy consumption is reported in kilowatt-hours per 100 miles (kWh/100mi) in North America, or Watt-hours per kilometer (Wh/km) across Europe and Asia.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A modern aerodynamic EV consuming 160 Wh/km consumes: 160 Wh/km × 1.609344 km/mi × 100 = 25.75 kWh/100 miles. Because electrical energy is linear, doubling kWh/100mi exactly doubles charging electricity costs, restoring intuitive economic clarity for fleet managers.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Road Trip Budgeting & Carbon Emissions Accounting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In everyday household budgeting, calculating fuel economy allows travelers to estimate road trip expenses accurately before departure. Each gallon of standard motor gasoline contains approximately 8.89 kilograms of direct CO2 emissions when combusted (and diesel generates ~10.18 kg CO2/gal).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Converting fuel economy metrics into direct liters consumed enables corporate sustainability officers to audit ESG carbon footprints. For student and personal tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and track financial percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hybrid Powertrain Dynamics: Regenerative Braking Energy Inversion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern full-hybrid and plug-in hybrid electric vehicles (PHEVs), urban city fuel economy often dramatically exceeds open highway fuel economy—inverting classical internal combustion engine consumption patterns where highway driving was traditionally more efficient. In stop-and-go city traffic, conventional friction brakes dissipate 100% of vehicle kinetic energy into waste heat on brake rotors.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Hybrid regenerative braking systems reverse electric traction motors into electrical generators during deceleration, converting translational vehicle momentum back into electrochemical energy stored in high-voltage lithium battery packs with recovery efficiencies exceeding 70%. When combined with internal combustion engine Atkinson cycle valve timing (which extends expansion strokes relative to compression strokes to maximize thermal extraction), urban hybrid fuel economy regularly surpasses 55 US MPG (&lt; 4.3 L/100km).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Heavy Commercial Freight: Truck Platooning & Slipstreaming Drag Reductions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In long-haul commercial freight transportation, Class 8 semi-trucks account for over 20% of total transportation fuel consumption despite comprising less than 5% of registered vehicles. At highway cruising speeds of 65 mph (105 km/h), aerodynamic pressure drag accounts for more than 50% of total engine power demand.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Commercial logistics consortia deploy automated vehicle-to-vehicle (V2V) radar platooning, linking two to three commercial trucks in close aerodynamic formation with trailing gaps of 10 to 15 meters. Operating within the lead vehicle&apos;s aerodynamic low-pressure wake reduces trailing truck fuel consumption by 10% to 15%, while the lead truck simultaneously experiences a 4% to 5% drag reduction due to reduced base wake turbulence.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Alternative Fuels: Compressed Natural Gas & Hydrogen Fuel Cell Economy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            With the development of hydrogen fuel cell electric vehicles (FCEVs) like the Toyota Mirai, fuel economy is evaluated in kilograms of hydrogen per 100 kilometers (kg H2/100km) or miles per kilogram (mi/kg). Because 1 kilogram of hydrogen possesses virtually identical chemical lower heating value energy to 1 gallon of motor gasoline (~33.3 kWh vs 33.7 kWh), 1 mi/kg of hydrogen closely mirrors 1 MPGe.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Fuel cell vehicles achieve outstanding real-world efficiencies between 60 and 70 miles per kilogram (~1.0 to 1.1 kg H2/100km), demonstrating double the thermodynamic tank-to-wheel efficiency of comparable gasoline internal combustion automobiles while emitting pure water vapor exhaust.
          </p>
        </>
      }
    >
      <FuelEconomyConverterComponent />
    </CalcPage>
  );
}
