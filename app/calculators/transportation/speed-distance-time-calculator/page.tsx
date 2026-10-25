import type { Metadata } from "next";
import Link from "next/link";
import SpeedDistanceTimeCalculatorComponent from "@/components/calcs/transportation/speed-distance-time-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { KineticVelocityStoppingDistanceChart } from "@/components/flagship/transportation/editorial-charts";

const PATH = "/calculators/transportation/speed-distance-time-calculator";
const TITLE = "Speed Distance Time Calculator | Velocity, Transit & Stopping Physics";
const DESCRIPTION =
  "Solve speed, distance, and transit travel time with unit conversions across mph, km/h, knots, pace, and kinetic vehicle stopping distance physics.";

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
  { href: "/calculators/transportation/bike-pace-calculator", icon: "🚴", name: "Bike Pace Calculator" },
  { href: "/calculators/transportation/flight-time-calculator", icon: "✈️", name: "Flight Time Calculator" },
  { href: "/calculators/transportation/tire-size-calculator", icon: "🛞", name: "Tire Size Calculator" },
  { href: "/calculators/transportation/fuel-cost-calculator", icon: "⛽", name: "Fuel Cost Calculator" },
  { href: "/calculators/transportation/road-trip-cost-calculator", icon: "🗺️", name: "Road Trip Cost Calculator" },
];

export default function SpeedDistanceTimeCalculatorPage() {
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
            <strong>Kinematics Quick Answer:</strong> The classical motion triangle relates speed, distance, and elapsed duration through the fundamental relationship <Formula>{"v = d / t"}</Formula>. However, in applied transportation engineering and vehicle dynamics, doubling your speed does not merely halve transit time; it quadruples your vehicle's kinetic stopping distance and non-linearly increases fuel consumption. Cross-checking your highway velocities with our <Link href="/calculators/transportation/distance-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">distance calculator</Link> reveals that increasing cruise speed from 60 mph to 75 mph over a 50-mile commute saves only 10 minutes while elevating collision impact energy by 56%.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Kinetic Energy Dissipation & Total Vehicle Stopping Distance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When operating any motorized transit vehicle, velocity dictates both arrival schedules and safety margins. Total stopping distance consists of two distinct physical phases: perception-reaction distance (the distance traversed at constant speed while the operator identifies a hazard and depresses the brake pedal) and mechanical braking distance (governed by friction work dissipating kinetic energy <Formula>{"E_k = \frac{1}{2}mv^2"}</Formula>). When planning cycling workouts alongside our <Link href="/calculators/transportation/bike-pace-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">bike pace calculator</Link>, identical quadratic braking rules apply to bicycle tires on pavement.
          </p>

          <KineticVelocityStoppingDistanceChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The stacked area chart above reveals why high speeds present severe roadway hazards. Perception-reaction distance grows linearly with velocity (assuming standard 1.0-second driver alertness). In contrast, mechanical braking distance scales quadratically with the square of velocity (<Formula>{"v^2"}</Formula>). At 30 mph, a vehicle comes to a complete halt in 89 feet; at 60 mph, total stopping distance quadruples to 268 feet. At 75 mph, a vehicle requires nearly 400 feet—more than an entire American football field—to arrest forward momentum on dry pavement.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations of Kinematics & Kinetic Energy Dissipation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The classical uniform velocity formulas solve for any single unknown given two measured parameters across imperial, metric, and nautical navigation systems:
          </p>

          <Formula>
            {"d = v \times t, \qquad v = \frac{d}{t}, \qquad t = \frac{d}{v}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            In vehicle dynamics and accident reconstruction, total emergency stopping distance <Formula>{"d_{stop}"}</Formula> combines perception-reaction displacement and roadway frictional retardation:
          </p>

          <Formula>
            {"d_{stop} = d_{reaction} + d_{braking} = \left( v \times t_{reaction} \right) + \left( \frac{v^2}{2 \cdot g \cdot f} \right)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"v"}</Formula> is instantaneous vehicle speed in feet per second (<Formula>{"1\text{ mph} = 1.4667\text{ ft/s}"}</Formula>), <Formula>{"t_{reaction}"}</Formula> is driver perception-reaction latency (typically 1.0 to 1.5 seconds for unimpaired drivers), <Formula>{"g"}</Formula> is the acceleration of gravity (<Formula>{"32.174\text{ ft/s}^2"}</Formula>), and <Formula>{"f"}</Formula> is the tire-roadway coefficient of friction (typically 0.70 to 0.80 on dry asphalt, dropping to 0.35 on wet pavement and under 0.15 on packed ice).
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Drivers calibrating modified wheel setups can verify true rolling velocity using our <Link href="/calculators/transportation/tire-size-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">tire size calculator</Link>, while long-distance travelers can evaluate how speed impacts pump outlays via our <Link href="/calculators/transportation/fuel-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">fuel cost calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Engineering Benchmark Table: Speed, Time-Savings & Braking Energy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below quantifies transit times across a standardized 100-mile highway corridor, demonstrating diminishing time returns alongside escalating kinetic energy and emergency stopping requirements:
          </p>

          <DataTable
            head={["Vehicle Speed", "100-Mile Travel Time", "Time Saved vs 55 mph", "Total Stopping Distance", "Relative Kinetic Energy"]}
            rows={[
              ["45 mph (72 km/h)", "2 hr 13 min 20 sec", "-29.1 min (Slower)", "167 feet", "0.67x (Low impact risk)"],
              ["55 mph (89 km/h)", "1 hr 49 min 05 sec", "Baseline reference", "228 feet", "1.00x (Baseline energy)"],
              ["65 mph (105 km/h)", "1 hr 32 min 18 sec", "16.8 minutes saved", "302 feet", "1.40x (+40% crash force)"],
              ["75 mph (121 km/h)", "1 hr 20 min 00 sec", "29.1 minutes saved", "391 feet", "1.86x (+86% crash force)"],
              ["85 mph (137 km/h)", "1 hr 10 min 35 sec", "38.5 minutes saved", "493 feet", "2.39x (+139% crash force)"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The data demonstrates the principle of diminishing returns in transit velocity: increasing speed by 10 mph from 55 to 65 mph saves nearly 17 minutes over 100 miles, but advancing another 10 mph from 75 to 85 mph yields less than 9.5 additional minutes while requiring nearly 500 feet of stopping room. For long-distance vacation logistics, you can combine these arrival schedules with our <Link href="/calculators/transportation/road-trip-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">road trip cost calculator</Link> and commercial air travel calculations in our <Link href="/calculators/transportation/flight-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">flight time calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Operational Dynamics: Unit Conversions, Pace & Average Speed Realities
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate transit modeling requires understanding how real-world roadway bottlenecks disrupt theoretical cruise velocities:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Harmonic Mean of Round-Trip Travel:</strong> If you drive to work at 30 mph through morning congestion and return home on an open freeway at 60 mph along the identical distance, your average speed is <em>not</em> 45 mph. The true average speed is the harmonic mean: <Formula>{"v_{avg} = \frac{2 \times 30 \times 60}{30 + 60} = 40\text{ mph}"}</Formula>. Time spent at slower speeds disproportionately degrades overall trip velocity.
            </li>
            <li>
              <strong>Pace vs Speed Inversion:</strong> Runners and cyclists measure velocity in inverse terms (minutes per mile or minutes per kilometer). While speed is distance divided by time, pace is time divided by distance: <Formula>{"\text{Pace (min/mi)} = \frac{60}{\text{Speed (mph)}}"}</Formula>.
            </li>
            <li>
              <strong>Aviation & Nautical Knots:</strong> Maritime vessels and commercial aircraft measure velocity in nautical knots (one nautical mile per hour, or 1.15078 statute mph), which directly correlates to one minute of latitude on the Earth's geoid surface.
            </li>
            <li>
              <strong>Traffic Signal Densities:</strong> In municipal arterial driving, traffic signals spaced every quarter-mile limit average vehicle transit velocity to between 14 and 22 mph regardless of whether the driver accelerates aggressively to 45 mph between intersections.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Environmental Drag Gradients & Velocity Impact on Fuel Economy
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The physics of ground transport dictate that total aerodynamic power demand scales cubically with velocity (<Formula>{"P_{aero} = \frac{1}{2} \rho C_d A v^3"}</Formula>). Consequently, cruising at 80 mph requires approximately 70% more engine power to overcome atmospheric drag than cruising at 60 mph. Motorists evaluating fuel expenditure via our <Link href="/calculators/transportation/fuel-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">fuel cost calculator</Link> and checking vehicle fuel economy using our <Link href="/calculators/transportation/mpg-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">MPG calculator</Link> will discover that excessive highway speeds dramatically increase the frequency and cost of fuel fill-ups.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            In adverse meteorological conditions—such as driving on rain-soaked asphalt or snow-covered mountain passes—the effective roadway friction coefficient drops precipitously from 0.80 to under 0.35. At this reduced traction threshold, kinetic braking distance more than doubles. Commuters monitoring daily travel times through our <Link href="/calculators/transportation/commute-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">commute cost calculator</Link> should moderate cruise velocities during precipitation to maintain equivalent emergency deceleration buffers.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tire Grip Dynamics & Hydroplaning Critical Velocity Thresholds
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            On wet road surfaces covered by standing water, tires face the physical limitation of hydroplaning—where tread grooves can no longer evacuate water fast enough, creating a hydrodynamic water wedge that lifts the tire off the pavement. The critical hydroplaning speed follows NASA's classical formula <Formula>{"v_{hydro} \approx 10.35 \sqrt{P_{tire}}"}</Formula>, where speed is in knots and tire pressure is in PSI. For a typical passenger car with tires inflated to 32 PSI, total loss of directional steering and braking traction can occur at ground speeds as low as 55 to 58 mph during heavy downpours.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions About Speed, Distance, and Travel Time
          </h2>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                How do I calculate average speed if my velocity changes throughout a trip?
              </h3>
              <p>
                To find true average speed across varying conditions, divide total journey distance by total elapsed travel time (including all rest stops, refueling delays, and congestion). Never average intermediate speed readings directly, as slower segments consume more time and weigh more heavily on the trip's overall velocity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Why does braking distance quadruple when speed doubles?
              </h3>
              <p>
                Braking distance is governed by kinetic energy, which scales with the square of velocity (<Formula>{"E_k = \frac{1}{2}mv^2"}</Formula>). When vehicle speed increases from 30 mph to 60 mph (a 2x multiplier), kinetic energy increases by <Formula>{"2^2 = 4\text{ times}"}</Formula>. Because vehicle brakes apply a relatively constant frictional deceleration force, the vehicle must travel four times as far to dissipate that energy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                How much time do you actually save by driving 10 mph over the speed limit?
              </h3>
              <p>
                Over a typical 15-mile suburban commute, driving 75 mph instead of 65 mph saves exactly 1.8 minutes. Over a 50-mile trip, it saves approximately 6.1 minutes. Over a 300-mile highway journey, it saves 37 minutes. The time savings are modest, while fuel consumption increases by 12% to 15% and stopping distance expands by nearly 90 feet.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                What is the difference between statute miles and nautical miles?
              </h3>
              <p>
                A standard statute mile measures exactly 5,280 feet (1,609.34 meters). A nautical mile measures 6,076.12 feet (1,852 meters), representing one minute of arc along a meridian of the Earth. A speed of 1 knot equals 1 nautical mile per hour or approximately 1.151 statute mph, which is standard in both maritime navigation and aviation flight planning.
              </p>
            </div>
          </div>
        </>
      }
    >
      <SpeedDistanceTimeCalculatorComponent />
    </CalcPage>
  );
}
