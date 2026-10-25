import type { Metadata } from "next";
import Link from "next/link";
import DistanceCalculatorComponent from "@/components/calcs/transportation/distance-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TransitModeSpeedDistanceMatrixChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/distance-calculator";
const TITLE = "Distance Calculator | Travel Time, Transit Speed & CO2 Emissions";
const DESCRIPTION =
  "Calculate travel distance, elapsed door-to-door transit time, average speed, terminal buffers, and greenhouse gas carbon emissions across transit modes.";

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
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/moving-cost-calculator", icon: "📦", name: "Moving Cost Calculator" },
  { href: "/calculators/transportation/bike-pace-calculator", icon: "🚲", name: "Bike Pace Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
];

export default function DistanceCalculatorPage() {
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
              Travel Kinematics Summary: Door-to-Door Transit Velocity
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Measuring long-distance journey duration requires distinguishing between nominal cruising speed and true door-to-door effective velocity. For trips under 300 miles, high-speed rail and personal driving frequently outperform commercial aviation when accounting for airport security check-in and boarding buffers. You can evaluate vehicular trip pacing in our{" "}
              <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-medium underline hover:text-amber-900">
                speed distance time calculator
              </Link>{" "}
              and fuel costs in the{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium underline hover:text-amber-900">
                fuel cost calculator
              </Link>.
            </p>
          </div>

          <h2>Transit Modality Physics & Total Door-to-Door Travel Dynamics</h2>
          <TransitModeSpeedDistanceMatrixChart />
          <p>
            In transportation engineering and regional spatial analysis, travel time is modeled through discrete phase components: access time, terminal buffer processing, active in-motion cruising transit, en-route congestion or dwell intervals, and egress time to the final destination.
          </p>
          <p>
            While commercial jetliners achieve cruising speeds of 480 to 520 mph (770 to 830 km/h), the mandatory 90- to 120-minute airport security and taxiing overhead depresses effective door-to-door velocity on short-haul corridors. Conversely, modern passenger high-speed rail (operating at 125 to 190 mph / 200 to 300 km/h) delivers city-center-to-city-center connectivity with negligible terminal dwell. Commute impacts can be modeled in our{" "}
            <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              commute cost calculator
            </Link>:
          </p>

          <Formula>
            {"T_{\text{total}} = T_{\text{in-motion}} + T_{\text{terminal buffer}} + T_{\text{congestion}} = \left(\frac{D}{v_{\text{cruise}}}\right) + \Delta t_{\text{buffer}}"}
          </Formula>

          <Formula>
            {"v_{\text{effective}} = \frac{\text{Total Geographic Distance } (D)}{T_{\text{total}}}"}
          </Formula>

          <Formula>
            {"\text{CO}_2\text{e Footprint (kg)} = D \times \frac{\text{Emissions Factor (g CO}_2\text{e / passenger-mile)}}{1{,}000}"}
          </Formula>

          <Formula>
            {"\text{Distance Conversion: } D_{\text{km}} = D_{\text{miles}} \times 1.609344, \quad D_{\text{nmi}} = D_{\text{miles}} \times 0.868976"}
          </Formula>

          <h2>Transportation Modality Velocity, Efficiency & Emissions Matrix</h2>
          <p>
            The comparative matrix below illustrates nominal operating speeds, terminal buffer overheads, and lifecycle greenhouse gas emissions across standardized travel modes:
          </p>

          <DataTable
            head={[
              "Transportation Modality",
              "Nominal Speed (mph / km/h)",
              "Typical Terminal Buffer",
              "Optimal Distance Range",
              "Energy Efficiency (BTU/p-mi)",
              "Carbon Intensity (g CO2e/mi)",
            ]}
            rows={[
              ["Interstate Passenger Car (Solo)", "65 mph / 105 km/h", "5 - 15 minutes", "20 - 400 miles", "3,100 BTU", "210 g CO2e / mi"],
              ["Carpool Vehicle (3 Occupants)", "65 mph / 105 km/h", "10 - 20 minutes", "20 - 400 miles", "1,030 BTU", "70 g CO2e / p-mi"],
              ["Intercity Motorcoach / Bus", "55 mph / 88 km/h", "20 - 30 minutes", "50 - 350 miles", "920 BTU", "85 g CO2e / p-mi"],
              ["Conventional Passenger Rail", "75 mph / 120 km/h", "20 - 30 minutes", "50 - 500 miles", "1,550 BTU", "110 g CO2e / p-mi"],
              ["High-Speed Electric Rail (HSR)", "150 mph / 240 km/h", "15 - 25 minutes", "100 - 600 miles", "780 BTU", "45 g CO2e / p-mi"],
              ["Commercial Jet Aircraft (Short-Haul)", "450 mph / 725 km/h", "90 - 120 minutes", "400 - 3,000 miles", "2,850 BTU", "220 g CO2e / p-mi"],
              ["Long-Haul Commercial Aircraft", "520 mph / 835 km/h", "120 - 150 minutes", ">1,500 miles", "2,200 BTU", "160 g CO2e / p-mi"],
            ]}
          />

          <h2>Worked Analytical Scenario: 350-Mile Regional Travel Comparison</h2>
          <p>
            Consider a business professional traveling 350.0 statute miles between two major metropolitan centers (e.g., Los Angeles to San Francisco, or Washington DC to Boston). We compare door-to-door transit velocity, total time, and carbon footprint against long-distance moving logistics in our{" "}
            <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              moving cost calculator
            </Link>{" "}
            and vehicle depreciation in the{" "}
            <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              car depreciation calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Option 1: Interstate Highway Driving (Personal Vehicle):</strong>
              <br />
              Cruising speed = 65 mph.
              <Formula>
                {"T_{\text{driving}} = \frac{350\,\text{miles}}{65\,\text{mph}} + 0.5\,\text{hr (fuel/rest stop)} = 5.38 + 0.5 = 5.88\,\text{hours (5h 53m)}"}
              </Formula>
              Effective velocity = 350 / 5.88 = 59.5 mph. Emissions = 350 * 210g = 73.5 kg CO2e.
            </li>
            <li>
              <strong>Option 2: Commercial Air Travel (Regional Flight):</strong>
              <br />
              Airborne flight duration at 450 mph = 350 / 450 = 0.78 hours (47 minutes).
              <br />
              Terminal overhead: 90 min pre-departure security + 25 min airport taxi-out/in + 30 min baggage claim/egress = 145 minutes (2.42 hours).
              <Formula>
                {"T_{\text{aviation}} = 0.78 + 2.42 = 3.20\,\text{hours (3h 12m)}"}
              </Formula>
              Effective velocity = 350 / 3.20 = 109.4 mph. Emissions = 350 * 220g = 77.0 kg CO2e.
            </li>
            <li>
              <strong>Option 3: High-Speed Electric Rail:</strong>
              <br />
              Cruising speed = 135 mph average with stops.
              <Formula>
                {"T_{\text{rail}} = \frac{350\,\text{miles}}{135\,\text{mph}} + 0.33\,\text{hr (station arrival)} = 2.59 + 0.33 = 2.92\,\text{hours (2h 55m)}"}
              </Formula>
              Effective velocity = 350 / 2.92 = 119.9 mph. Emissions = 350 * 45g = 15.8 kg CO2e.
            </li>
            <li>
              <strong>The 350-Mile Crossover Verdict:</strong> High-speed rail is the fastest door-to-door option (2h 55m) while generating 80% fewer carbon emissions than flying or driving.
            </li>
          
            <li>
              <strong>Geodesic Great-Circle vs Terrestrial Highway Circuity:</strong> The mathematical ratio between actual road distance and the theoretical spherical great-circle chord is known as the Route Circuity Factor (RCF). Across North American and European highway corridors, terrestrial circuity averages 1.18 to 1.25 due to geographic mountain topography, water barriers, and land easements. In long-haul transport logistics, intermodal rail lines operate at circuity factors near 1.22, whereas commercial jetliners fly within 1.04 of true geodesic orthodromes outside of military airspace diversions.
            </li>
          </ul>

          <h2>Great Circle Distance vs Highway Route Tortuosity</h2>
          <p>
            When calculating distances between geographic coordinates, straight-line geodesics (the Great Circle distance across the Earth&apos;s oblate spheroid, calculated via the Haversine or Vincenty equations) diverge significantly from terrestrial surface roads:
          </p>

          <Formula>
            {"d = 2r \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)"}
          </Formula>

          <p>
            In highway routing, the ratio of actual road distance to geodesic straight-line distance is called the "route tortuosity factor." In flat, grid-based Midwestern geography, highway tortuosity averages 1.15 to 1.20 (roads are 15% to 20% longer than straight lines). In mountainous terrain, terrain circumvention inflates tortuosity up to 1.35 to 1.50.
          </p>

          <h2>Operational Pitfalls in Distance Planning & Travel Scheduling</h2>
          <p>
            Preventing travel disruptions requires accounting for systemic delays:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Ignoring Metropolitan Peak-Hour Congestion:</strong> Driving schedules calculated using free-flow highway speed limits fail severely when passing through major metro centers during peak rush hours (07:00-09:30 and 16:30-19:00), adding 30% to 75% in transit duration.
            </li>
            <li>
              <strong>The Short-Haul Flight Fallacy:</strong> For journeys under 250 miles, taking a commercial flight rarely saves time over driving when accounting for airport commutes and security lines, while adding hundreds of dollars in flight costs.
            </li>
            <li>
              <strong>Physical Athletic Energy Expended:</strong> Active travel modalities such as long-distance cycling routes require energy budgeting tracked in our{" "}
              <Link href="/calculators/transportation/bike-pace-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                bike pace calculator
              </Link>.
            </li>
            <li>
              <strong>Fuel Tank Range & Refueling Buffers:</strong> Failing to plan refueling stops on long rural interstate corridors risks fuel starvation, with fuel usage modeled in our{" "}
              <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                fuel cost calculator
              </Link>.
            </li>
          
            <li>
              <strong>Geodesic Great-Circle vs Terrestrial Highway Circuity:</strong> The mathematical ratio between actual road distance and the theoretical spherical great-circle chord is known as the Route Circuity Factor (RCF). Across North American and European highway corridors, terrestrial circuity averages 1.18 to 1.25 due to geographic mountain topography, water barriers, and land easements. In long-haul transport logistics, intermodal rail lines operate at circuity factors near 1.22, whereas commercial jetliners fly within 1.04 of true geodesic orthodromes outside of military airspace diversions.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the difference between a statute mile, nautical mile, and kilometer?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                A statute mile (standard US road mile) equals exactly 5,280 feet or 1,609.344 meters. A nautical mile (used in aviation and maritime navigation) equals exactly 1,852 meters (approx 1.1508 statute miles), representing one minute of latitude arc along a meridian. A kilometer equals 1,000 meters (0.621371 statute miles).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do airlines calculate flight block time versus actual flight time?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                "Flight time" represents the duration the aircraft is airborne from wheels-up takeoff to touchdown. "Block time" (gate-to-gate) begins when the aircraft pushes back from the departure gate and concludes when it parks at the arrival gate, encompassing pushback, engine start, taxiway queues, and runway taxiing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does high-speed rail generate significantly lower CO2 emissions than flying?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Electric high-speed trains draw power from national electric grids increasingly powered by renewables, nuclear, and hydro. Furthermore, steel wheels on steel rails exhibit minimal rolling friction, and trains carry hundreds of passengers per vehicle without expending fuel to lift mass to 35,000 feet.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does vehicle speed affect highway travel fuel consumption?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Because aerodynamic air drag increases with the square of speed, cruising at 80 mph consumes roughly 25% more fuel per mile than cruising at 65 mph, substantially accelerating fuel costs calculated in our{" "}
                <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  fuel cost calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does travel distance impact household moving budgets?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In long-distance interstate moves, freight mileage dictates diesel fuel, driver line-haul rates, and lodging expenses modeled in our{" "}
                <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  moving cost calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does commute distance impact vehicle loan financing decisions?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                High-distance commuting rapidly exhausts warranty thresholds while accelerating depreciation, making short-term financing modeled in our{" "}
                <Link href="/calculators/transportation/car-payment-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  car payment calculator
                </Link>{" "}
                vital to avoid negative equity.
              </p>
            </div>
          </div>

          <h2>Authoritative Transportation Geodesy & Emissions Standards</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>US Department of Transportation (Bureau of Transportation Statistics):</strong> National Transit Database and intercity passenger rail operational benchmarks.
            </li>
            <li>
              <strong>International Civil Aviation Organization (ICAO):</strong> Carbon Emissions Calculator Methodology for Passenger Flights.
            </li>
            <li>
              <strong>Environmental Protection Agency (EPA SmartWay):</strong> Greenhouse gas emission factors for freight, commercial, and personal transportation modes.
            </li>
            <li>
              <strong>National Geodetic Survey (NOAA):</strong> Geodetic distance, ellipsoidal coordinates, and Vincenty formula standards.
            </li>
          
            <li>
              <strong>Geodesic Great-Circle vs Terrestrial Highway Circuity:</strong> The mathematical ratio between actual road distance and the theoretical spherical great-circle chord is known as the Route Circuity Factor (RCF). Across North American and European highway corridors, terrestrial circuity averages 1.18 to 1.25 due to geographic mountain topography, water barriers, and land easements. In long-haul transport logistics, intermodal rail lines operate at circuity factors near 1.22, whereas commercial jetliners fly within 1.04 of true geodesic orthodromes outside of military airspace diversions.
            </li>
          </ul>
        </>
      }
    >
      <DistanceCalculatorComponent />
    </CalcPage>
  );
}
