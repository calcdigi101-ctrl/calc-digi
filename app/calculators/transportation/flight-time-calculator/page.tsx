import type { Metadata } from "next";
import Link from "next/link";
import FlightTimeCalculatorComponent from "@/components/calcs/transportation/flight-time-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CommercialAircraftBlockTimeProfileChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/flight-time-calculator";
const TITLE = "Flight Time Calculator | Flight Duration, Block Time & Wind Vectors";
const DESCRIPTION =
  "Calculate airborne flight duration, gate-to-gate block times, high-altitude headwind and tailwind vectors, true airspeed, and Great Circle route distances.";

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
  { href: "/calculators/transportation/speed-distance-time-calculator", icon: "⏱️", name: "Speed Distance Time" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/moving-cost-calculator", icon: "📦", name: "Moving Cost Calculator" },
  { href: "/calculators/transportation/commute-cost-calculator", icon: "🚗", name: "Commute Cost Calculator" },
  { href: "/calculators/transportation/car-depreciation-calculator", icon: "📉", name: "Car Depreciation" },
];

export default function FlightTimeCalculatorPage() {
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
              Aviation Navigational Summary: Airspeed vs Ground Speed
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              Commercial aircraft fly through dynamic atmospheric fluid layers where jet stream winds significantly modulate duration. Effective ground speed equals True Airspeed (TAS) plus or minus the atmospheric wind component vector. In airline flight operations, published schedules reflect "block time" (pushback to gate arrival) rather than airborne time alone. You can compare door-to-door transit against terrestrial driving in our{" "}
              <Link href="/calculators/transportation/distance-calculator" className="font-medium underline hover:text-amber-900">
                distance calculator
              </Link>{" "}
              and road speed in the{" "}
              <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-medium underline hover:text-amber-900">
                speed distance time calculator
              </Link>.
            </p>
          </div>

          <h2>Aerodynamic Navigation Mechanics & Jet Stream Vector Kinematics</h2>
          <CommercialAircraftBlockTimeProfileChart />
          <p>
            In aeronautical engineering and airline flight dispatch, calculating flight duration requires solving the navigational wind triangle. An aircraft flying at high altitude (typically between Flight Level 300 and 410, or 30,000 to 41,000 feet) generates True Airspeed (TAS) relative to the surrounding air mass.
          </p>
          <p>
            However, polar and subtropical jet stream winds circulate at velocities exceeding 80 to 160 knots (90 to 185 mph). Flying westbound against a 100-knot headwind reduces an airliner&apos;s ground speed from 480 knots to 380 knots, lengthening transcontinental US flights by over an hour. Ground transportation logistics can be planned in our{" "}
            <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              commute cost calculator
            </Link>:
          </p>

          <Formula>
            {"\vec{v}_{\text{ground}} = \vec{v}_{\text{air}} + \vec{w}_{\text{wind}}"}
          </Formula>

          <Formula>
            {"T_{\text{airborne}} = \frac{D_{\text{Great Circle}}}{\text{TAS} + v_{\text{wind component}}}"}
          </Formula>

          <Formula>
            {"T_{\text{block}} = T_{\text{airborne}} + \Delta t_{\text{taxi-out}} + \Delta t_{\text{taxi-in}} + \Delta t_{\text{approach buffer}}"}
          </Formula>

          <Formula>
            {"\text{Mach Number } (M) = \frac{\text{TAS}}{a(T)} = \frac{\text{TAS}}{\sqrt{\gamma \cdot R \cdot T_{\text{ambient}}}}"}
          </Formula>

          <h2>Commercial Aircraft Cruising Speed & Fuel Burn Reference Matrix</h2>
          <p>
            The aviation performance matrix below establishes standard operating cruise Mach numbers, true airspeeds, and block fuel burns across standard commercial aircraft types:
          </p>

          <DataTable
            head={[
              "Aircraft Category / Airframe",
              "Cruising Speed (Mach / Knots)",
              "Speed (mph / km/h)",
              "Typical Cruise Altitude",
              "Hourly Fuel Burn (lbs/hr)",
              "Standard Block Buffer",
            ]}
            rows={[
              ["Turboprop Commuter (ATR 72 / Q400)", "280 kts (Mach 0.45)", "322 mph / 518 km/h", "FL200 - FL240 (20k ft)", "1,600 lbs/hr", "20 minutes"],
              ["Regional Jet (CRJ-900 / Embraer E175)", "420 kts (Mach 0.74)", "483 mph / 778 km/h", "FL320 - FL360 (34k ft)", "3,400 lbs/hr", "25 minutes"],
              ["Narrowbody Mainline (Airbus A320neo)", "450 kts (Mach 0.78)", "518 mph / 833 km/h", "FL350 - FL390 (37k ft)", "4,800 lbs/hr", "30 minutes"],
              ["Narrowbody Mainline (Boeing 737 MAX 8)", "455 kts (Mach 0.79)", "523 mph / 842 km/h", "FL360 - FL410 (39k ft)", "4,900 lbs/hr", "30 minutes"],
              ["Widebody Transcontinental (Boeing 787-9)", "490 kts (Mach 0.85)", "564 mph / 907 km/h", "FL380 - FL430 (41k ft)", "11,500 lbs/hr", "35 minutes"],
              ["Widebody Intercontinental (Airbus A350-900)", "490 kts (Mach 0.85)", "564 mph / 907 km/h", "FL380 - FL430 (41k ft)", "12,200 lbs/hr", "35 minutes"],
            ]}
          />

          <h2>Worked Analytical Flight Scenario: Transcontinental New York to Los Angeles</h2>
          <p>
            Consider a scheduled non-stop commercial flight from New York (JFK) to Los Angeles (LAX) aboard an Airbus A321neo. The Great Circle navigational route covers 2,146 nautical miles (2,469 statute miles). We evaluate flight time, block time, and headwind penalties alongside vehicle fuel comparisons in our{" "}
            <Link href="/calculators/transportation/fuel-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              fuel cost calculator
            </Link>{" "}
            and relocation transport planning in the{" "}
            <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              moving cost calculator
            </Link>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Aircraft Performance Baseline:</strong> The A321neo cruises at Mach 0.78 at FL360, establishing a True Airspeed (TAS) of 450 knots (518 mph).
            </li>
            <li>
              <strong>Westbound Polar Jet Stream Headwind:</strong> Due to prevailing eastward atmospheric circulation, the flight encounters an average headwind vector of -55 knots:
              <Formula>
                {"v_{\text{ground, westbound}} = 450\,\text{kts} - 55\,\text{kts} = 395\,\text{knots (454.5 mph)}"}
              </Formula>
            </li>
            <li>
              <strong>Westbound Airborne Duration:</strong>
              <Formula>
                {"T_{\text{airborne}} = \frac{2{,}146\,\text{NM}}{395\,\text{knots}} = 5.433\,\text{hours} = 5\,\text{hours } 26\,\text{minutes}"}
              </Formula>
            </li>
            <li>
              <strong>Airport Taxiway & Gate Block Buffer:</strong> JFK departure taxi-out queue (25 min) plus LAX arrival taxi-in and runway clearance (15 min) adds 40 minutes:
              <Formula>
                {"T_{\text{block, westbound}} = 5\,\text{h } 26\,\text{m} + 40\,\text{m} = 6\,\text{hours } 06\,\text{minutes}"}
              </Formula>
            </li>
            <li>
              <strong>Eastbound Return Flight Comparison:</strong> On the return LAX-JFK leg, the aircraft captures the +55 knot tailwind:
              <Formula>
                {"v_{\text{ground, eastbound}} = 450 + 55 = 505\,\text{knots (581 mph)}"}
              </Formula>
              <Formula>
                {"T_{\text{airborne, eastbound}} = \frac{2{,}146}{505} = 4.25\,\text{hours} = 4\,\text{hours } 15\,\text{minutes}"}
              </Formula>
              Adding 35 minutes taxi buffer yields a block time of 4 hours 50 minutes—over 1 hour and 15 minutes faster than the westbound flight solely due to jet stream dynamics.
            </li>
            <li>
              <strong>Personal Driving Alternative:</strong> Driving this same 2,469-mile distance in a motor vehicle analyzed in our{" "}
              <Link href="/calculators/transportation/car-depreciation-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                car depreciation calculator
              </Link>{" "}
              requires over 38 hours of continuous wheel time.
            </li>
          
            <li>
              <strong>Air Traffic Control Metering & En-Route Holding Reserves:</strong> In high-density terminal radar approach control (TRACON) airspace, block arrival times expand due to speed metering, miles-in-trail separation spacing, and tactical vector sequencing. Airline flight dispatchers routinely incorporate mandatory 45-minute FAA domestic fuel reserves to ensure airliners can loiter safely in holding stacks or divert to designated weather alternate airports without compromising flight safety margins.
            </li>
          </ul>

          <h2>The Speed of Sound at Altitude & Mach Number Compressibility</h2>
          <p>
            Commercial jetliners do not measure high-altitude cruise speed strictly in knots or miles per hour; they navigate via Mach number (M = v / a), the ratio of aircraft airspeed to the local speed of sound. Crucially, the speed of sound is not constant; it depends exclusively on absolute atmospheric temperature:
          </p>

          <Formula>
            {"a = \sqrt{\gamma \cdot R \cdot T} = \sqrt{1.4 \times 287.05\,\text{J/kg}\cdot\text{K} \times T_{\text{Kelvin}}}"}
          </Formula>

          <p>
            At sea level standard temperature (15°C / 288.15 K), the speed of sound is 661.5 knots (761.2 mph). However, at standard cruising altitudes (36,000 feet in the isothermal tropopause where temperatures hover around -56.5°C / 216.65 K), the local speed of sound drops to 573.8 knots (660.3 mph). Consequently, cruising at Mach 0.78 corresponds to a true airspeed of 447 knots—significantly lower than Mach 0.78 measured at sea level.
          </p>

          <h2>Operational Pitfalls in Flight Duration & Airport Scheduling</h2>
          <p>
            Air passengers and travel managers must avoid common scheduling misconceptions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Confusing Airborne Time with Block Time:</strong> Passengers booking flights often assume a "2-hour flight" means 2 hours from takeoff to landing. In reality, published airline itineraries reflect block time (gate-to-gate), meaning airborne time is typically 20 to 40 minutes shorter.
            </li>
            <li>
              <strong>Seasonal Jet Stream Shifts:</strong> The polar jet stream intensifies during winter months due to steep thermal gradients between the Arctic and equator. Winter transcontinental flights experience headwind penalties 30% to 50% greater than summer schedules.
            </li>
            <li>
              <strong>Terrestrial Rail Competitiveness:</strong> For regional intercity corridors under 350 miles, high-speed rail analyzed in our{" "}
              <Link href="/calculators/transportation/distance-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                distance calculator
              </Link>{" "}
              frequently beats air travel on total door-to-door duration.
            </li>
            <li>
              <strong>Automotive Commuting to Airport Terminals:</strong> Ground parking and transit costs incurred when driving to regional hub airports can be modeled via our{" "}
              <Link href="/calculators/transportation/commute-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                commute cost calculator
              </Link>.
            </li>
          
            <li>
              <strong>Air Traffic Control Metering & En-Route Holding Reserves:</strong> In high-density terminal radar approach control (TRACON) airspace, block arrival times expand due to speed metering, miles-in-trail separation spacing, and tactical vector sequencing. Airline flight dispatchers routinely incorporate mandatory 45-minute FAA domestic fuel reserves to ensure airliners can loiter safely in holding stacks or divert to designated weather alternate airports without compromising flight safety margins.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why does flying west take significantly longer than flying east?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                The Earth rotates from west to east, which, combined with atmospheric thermal gradients, creates powerful prevailing high-altitude jet stream winds that flow from west to east. Aircraft flying westbound encounter massive resistance (headwinds), whereas eastbound flights ride these winds (tailwinds) to achieve higher ground speeds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What does "block time" mean in commercial airline operations?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Block time is the official measure of total flight duration used by airlines, pilots, and aviation regulators. It begins the exact moment the aircraft pushback tug removes the wheel blocks at the departure gate and ends when the wheel blocks are inserted at the arrival gate.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Why do commercial airliners cruise at 35,000 to 40,000 feet?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Atmospheric air density at 36,000 feet is less than one-third of sea-level density. Flying in thin air dramatically reduces aerodynamic profile drag, allowing jet transports to cruise at high speeds (450 to 500 knots) while burning significantly less jet fuel per passenger-mile.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does flight time compare with driving for a 400-mile business trip?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                On a 400-mile trip, flying requires about 1 hour airborne, but adding 2 hours of airport security, baggage claim, and ground transit yields 3.5 to 4 hours door-to-door. Driving at 65 mph takes approximately 6 hours, making flying slightly faster but significantly more expensive when factoring rental cars and flight tickets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do airlines pad their flight schedules to prevent delays?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Airlines routinely add 15 to 30 minutes of "schedule buffer" onto published block times for busy hub airports (such as Chicago O'Hare or Atlanta Hartsfield). This padding absorbs routine taxiway queues and air traffic control holding patterns, protecting published on-time arrival metrics.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do moving and long-distance relocations handle flight logistics?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                When moving long distances, families often fly to their destination while professional freight carriers transport household belongings modeled in our{" "}
                <Link href="/calculators/transportation/moving-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  moving cost calculator
                </Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative Aviation Flight Standards & Navigational Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Federal Aviation Administration (FAA Order 8900.1):</strong> Flight Operations and Air Carrier Aircraft Performance Benchmarks.
            </li>
            <li>
              <strong>International Air Transport Association (IATA Operational Standards):</strong> Airline Dispatch, Schedule Management, and Block Hour Metrics.
            </li>
            <li>
              <strong>National Oceanic and Atmospheric Administration (NOAA Aviation Weather Center):</strong> High-Altitude Winds and Temperature Aloft (Winds Aloft) forecasts.
            </li>
            <li>
              <strong>Eurocontrol (European Network Operations):</strong> Flow management and flight efficiency performance review reports.
            </li>
          
            <li>
              <strong>Air Traffic Control Metering & En-Route Holding Reserves:</strong> In high-density terminal radar approach control (TRACON) airspace, block arrival times expand due to speed metering, miles-in-trail separation spacing, and tactical vector sequencing. Airline flight dispatchers routinely incorporate mandatory 45-minute FAA domestic fuel reserves to ensure airliners can loiter safely in holding stacks or divert to designated weather alternate airports without compromising flight safety margins.
            </li>
          </ul>
        </>
      }
    >
      <FlightTimeCalculatorComponent />
    </CalcPage>
  );
}
