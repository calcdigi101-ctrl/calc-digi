import type { Metadata } from "next";
import Link from "next/link";
import ProjectileMotionCalculator from "@/components/calcs/physics/projectile-motion-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ProjectileTrajectoriesAngleChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/projectile-motion-calculator";
const TITLE = "Projectile Motion Calculator | 2D Ballistic Trajectory, Range & Apex";
const DESCRIPTION =
  "Calculate horizontal range, maximum apex height, flight time, and velocity vectors for 2D parabolic ballistic trajectories launched at arbitrary angles and elevations.";

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
  { href: "/calculators/physics/velocity-calculator", icon: "⚡", name: "Velocity Kinematics" },
  { href: "/calculators/physics/free-fall-calculator", icon: "🪂", name: "Free Fall Gravity" },
  { href: "/calculators/physics/acceleration-calculator", icon: "🚀", name: "Acceleration & Kinematics" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "💥", name: "Kinetic Energy" },
  { href: "/calculators/physics/force-calculator", icon: "⚖️", name: "Newton's Force F=ma" },
  { href: "/calculators/math/trigonometry-calculator", icon: "📐", name: "Trigonometric Sine/Cosine" },
];

const FAQ_ITEMS = [
  {
    q: "What is projectile motion and how is 2D trajectory decomposed?",
    a: "Projectile motion is the 2D parabolic trajectory followed by an object projected into a uniform gravitational field. Because perpendicular coordinate dimensions are physically independent in Newtonian mechanics, the motion decomposes into two separate one-dimensional equations: 1) A constant-velocity horizontal motion along the x-axis (a_x = 0; v_x = v₀ · cosθ), and 2) A uniformly accelerated vertical motion along the y-axis (a_y = -g; v_y(t) = v₀ · sinθ - g · t).",
  },
  {
    q: "Why does a 45-degree launch angle maximize horizontal range over level ground?",
    a: "Over level ground (where launch and impact elevations are equal: y₀ = 0), horizontal range is governed by: R = (v₀² · sin(2θ)) / g. The trigonometric term sin(2θ) reaches its theoretical maximum of 1.0 when its argument equals 90°, which occurs when 2θ = 90° ⟹ θ = 45°. Angles above 45° maximize flight duration and apex altitude at the expense of horizontal speed; angles below 45° maximize forward velocity at the expense of early ground collision.",
  },
  {
    q: "What is the optimal launch angle when firing from an elevated clifftop or platform?",
    a: "When launching from an elevated cliff or tower (y₀ > 0), the optimal launch angle for maximum range drops below 45°. Because the projectile spends extra time descending past the baseline elevation, horizontal velocity becomes more valuable than vertical flight time. The exact optimal angle is given by: θ_opt = arcsin [ 1 / √(2 + (2 · g · y₀ / v₀²)) ]. As launch elevation y₀ increases relative to launch speed, the optimal angle decreases toward 30° to 35°.",
  },
  {
    q: "What are complementary launch angles and why do they yield identical range?",
    a: "In a vacuum over level ground, any pair of launch angles that sum to 90° (such as 30° and 60°, or 15° and 75°) produce the exact same horizontal range. This occurs because sin(2θ) = sin(2(90° - θ)) = sin(180° - 2θ) = sin(2θ). The lower angle produces a flat, low-flying trajectory with short flight time, whereas the higher complementary angle produces a towering lofted arc with extended flight duration.",
  },
  {
    q: "How does aerodynamic drag distort true real-world ballistic trajectories?",
    a: "Air resistance creates an opposing drag force proportional to velocity squared: F_drag = ½ · ρ · v² · Cd · A. This drag continuously bleeds kinetic energy, asymmetricizing the trajectory. Instead of a symmetric parabola, real artillery shells and golf balls experience a steepening terminal descent, falling 20% to 50% short of pure vacuum range while landing at a significantly steeper angle than launch.",
  },
  {
    q: "What is the Magnus effect and how does backspin increase projectile range?",
    a: "When a spinning projectile travels through air, friction between the fluid and the spinning surface generates an asymmetric pressure differential: low pressure on top and high pressure underneath. In sports such as golf, baseball, and tennis, backspin creates an upward aerodynamic lift force (the Magnus effect) that counteracts gravity, keeping the ball airborne far longer and extending horizontal flight distance.",
  },
];

export default function ProjectileMotionCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Projectile Motion & Ballistic Trajectory Calculator"
      intro="Calculate 2D ballistic trajectories, maximum horizontal range, flight apex altitude, flight duration, and velocity vectors across level and elevated launch surfaces."
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
                Classical Ballistics & Vector Kinematics
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>2D Parabolic Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Independent Orthogonal Axes
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What are the primary formulas for 2D projectile motion?
                </strong>
                <p className="mt-1">
                  Launch velocity v₀ is decomposed into horizontal (v₀x = v₀·cosθ) and vertical (v₀y = v₀·sinθ) components. Over level terrain without air resistance, maximum horizontal range is R = (v₀²·sin(2θ)) / g, reaching its peak at θ = 45°. The maximum apex altitude is H_max = y₀ + (v₀y²) / (2g), and total flight duration is solved via quadratic kinematic integration: t = [v₀y + √(v₀y² + 2gy₀)] / g.
                 Evaluate horizontal and vertical launch components with our <Link href="/calculators/physics/velocity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">velocity calculator</Link>, calculate gravitational descent with the <Link href="/calculators/physics/free-fall-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">free fall calculator</Link>, or analyze muzzle kinetic energy via our <Link href="/calculators/physics/kinetic-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">kinetic energy calculator</Link>.</p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Ballistic Range & Apex Trajectory Comparisons by Launch Angle</h2>
          <div className="not-prose my-6">
            <ProjectileTrajectoriesAngleChart />
          </div>

          <p>
            Projectile motion is the quintessential paradigm of two-dimensional classical mechanics, providing the mathematical framework for ballistics, athletic sports engineering, aerospace rocketry, and planetary surface landings. When an object is propelled into a uniform gravitational field and subjected to no continuous thrust, its path is governed purely by the interplay between inertial velocity and downward gravitational acceleration.
          </p>

          <p>
            The profound mathematical elegance of projectile motion arises from Galileo's principle of independent motion along perpendicular Cartesian axes. The horizontal motion experiences zero net force (in vacuum conditions), continuing at permanent uniform velocity: v_x(t) = v₀x. Concurrently, the vertical motion experiences constant gravitational acceleration: a_y = -g. Combining these two independent equations yields a quadratic spatial curve—a classic symmetrical parabola.
          </p>

          <h2>Foundational 2D Trajectory Formulas & Derivations</h2>

          <p>
            Resolving a parabolic ballistic trajectory requires decomposing the initial launch velocity vector v₀ at launch angle θ above the horizontal into orthogonal components:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Cartesian Velocity Decomposition</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v₀x = v₀ · cos(θ)   |   v₀y = v₀ · sin(θ)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Separates forward inertial progress from vertical gravitational climb.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Peak Flight Apex Altitude</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">H_max = y₀ + (v₀y²) / (2 · g) = y₀ + (v₀² · sin²θ) / (2 · g)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Occurs at time t_apex = v₀y / g when vertical velocity momentarily passes through zero.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Total Flight Duration Integral</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">t_flight = [ v₀y + √(v₀y² + 2 · g · y₀) ] / g</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quadratic solution satisfying vertical impact position y(t) = 0 from initial elevation y₀.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Maximum Horizontal Range</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">R = v₀x · t_flight   ⟹   R = (v₀² · sin(2θ)) / g  (when y₀ = 0)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates total distance traversed over level terrain, peaking at launch angle θ = 45°.</div>
          </Formula>

          <h2>Complementary Angles & Trajectory Symmetry</h2>

          <p>
            One of the most remarkable properties of vacuum projectile mechanics is the existence of complementary trajectory pairs. Any two launch angles whose sum equals 90° (such as 30° and 60°, or 20° and 70°) yield the identical horizontal range over level ground. This mathematical symmetry stems from the double-angle identity: sin(2θ) = sin(2(90° - θ)) = sin(180° - 2θ) = sin(2θ).
          </p>

          <p>
            However, while horizontal range matches, the trajectories possess vastly different kinematic characteristics:
          </p>

          <DataTable
            head={["Launch Angle", "Range (v₀=40 m/s)", "Apex Altitude", "Flight Duration", "Tactical Application"]}
            rows={[
              ["15° (Low Arc)", "81.5 meters", "5.4 meters", "2.11 seconds", "Direct-fire anti-tank, baseball grounder"],
              ["30° (Flat Arc)", "141.2 meters", "20.4 meters", "4.08 seconds", "Golf long iron, soccer line-drive pass"],
              ["45° (Max Range)", "163.1 meters", "40.8 meters", "5.77 seconds", "Maximum distance field artillery, javelin"],
              ["60° (High Loft)", "141.2 meters", "61.2 meters", "7.06 seconds", "Mortar indirect fire over urban walls"],
              ["75° (Plunging)", "81.5 meters", "76.1 meters", "7.88 seconds", "Siege howitzer, fireworks skybursts"],
            ]}
          />

          <h2>Ballistic & Vector Kinematics Tools</h2>

          <p>
            Ballistic trajectories resolve 2D kinematic vectors into independent orthogonal axes. Resolve right-triangle velocity components using our <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Pythagorean theorem calculator</Link>, convert elevation launch angles with the <Link href="/calculators/measurements/angle-converter" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">angle converter</Link>, and determine launch acceleration using our <Link href="/calculators/physics/acceleration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">acceleration calculator</Link>. For high-altitude artillery and orbital insertion, evaluate celestial gravity variations with our <Link href="/calculators/physics/gravitational-force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">gravitational force calculator</Link> and calculate circular orbit velocity via our <Link href="/calculators/physics/circular-motion-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">circular motion calculator</Link>.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical projectile mechanics across disparate physical domains:
          </p>

          <h3>Case Study A: Optimal 45-Degree Field Artillery Launch</h3>
          <p>
            A projectile is launched from ground level (y₀ = 0) with a muzzle velocity of v₀ = 35.0 m/s at an optimal range angle of θ = 45.0° on standard Earth gravity (g = 9.807 m/s²).
          </p>
          <ul>
            <li><strong>Velocity Components:</strong> v₀x = 35.0 × cos(45°) = 24.749 m/s; v₀y = 35.0 × sin(45°) = 24.749 m/s.</li>
            <li><strong>Apex Elevation:</strong> H_max = (24.749)² / (2 × 9.807) = 612.5 / 19.614 = 31.23 meters (102.5 ft).</li>
            <li><strong>Total Flight Duration:</strong> t_flight = 2 × 24.749 / 9.807 = 5.047 seconds (Apex at t = 2.524 s).</li>
            <li><strong>Total Ground Range:</strong> R = 24.749 m/s × 5.047 s = 124.91 meters (409.8 ft = 136.6 yards).</li>
            <li><strong>Touchdown Impact Speed:</strong> v_impact = √[(24.749)² + (-24.749)²] = 35.0 m/s at 45.0° downward angle.</li>
          </ul>

          <h3>Case Study B: Clifftop Defense Battery Launch (y₀ = 50.0m)</h3>
          <p>
            A defensive cannon perched atop a coastal cliff at elevation y₀ = 50.0 meters fires a shell at v₀ = 50.0 m/s at an angle of θ = 30.0°.
          </p>
          <ul>
            <li><strong>Velocity Components:</strong> v₀x = 50.0 × cos(30°) = 43.301 m/s; v₀y = 50.0 × sin(30°) = 25.000 m/s.</li>
            <li><strong>Maximum Apex Altitude:</strong> H_max = 50.0 + [(25.0)² / (2 × 9.807)] = 50.0 + 31.86 = 81.86 meters above sea level.</li>
            <li><strong>Flight Time to Sea Level:</strong> t = [25.0 + √(25.0² + 2 × 9.807 × 50.0)] / 9.807 = [25.0 + √1,605.7] / 9.807 = 6.635 seconds.</li>
            <li><strong>Total Sea Range:</strong> R = 43.301 m/s × 6.635 s = 287.30 meters (942.6 feet).</li>
            <li><strong>Water Impact Velocity:</strong> v_y_final = 25.0 - (9.807 × 6.635) = -40.07 m/s; v_total = √[43.301² + 40.07²] = 59.00 m/s (212.4 km/h).</li>
          </ul>

          <h2>Atmospheric Boundary Constraints & Non-Parabolic Ballistics</h2>

          <p>
            Real-world ballistics deviate markedly from pure vacuum parabolas due to atmospheric aeromechanics:
          </p>

          <ol>
            <li>
              <strong>Velocity-Squared Drag Asymmetry:</strong> As air resistance (Fd = ½·ρ·v²·Cd·A) saps forward momentum, the horizontal velocity decay distorts the parabola into an asymmetric teardrop curve. The descending leg is always steeper and slower than the ascending leg.
            </li>
            <li>
              <strong>Coriolis Force in Long-Range Artillery:</strong> For long-range naval and artillery ballistics exceeding 10 kilometers, Earth's rotation beneath the flying projectile induces a lateral Coriolis acceleration: a_coriolis = 2 · (v × ω_earth), deflecting shells to the right in the Northern Hemisphere.
            </li>
            <li>
              <strong>Aerodynamic Magnus Spin:</strong> Rifled artillery and sports balls spinning along their axis generate Magnus lift or drift. Proper backspin can double the flight distance of a golf ball compared to a non-spinning projectile of identical launch velocity.
            </li>
          </ol>

          <h2>Aerodynamic Drag Effects & Ballistic Coefficient</h2>

          <p>
            In exterior military ballistics, trajectory modeling incorporates the Ballistic Coefficient (BC), measuring a projectile's ability to overcome air resistance: BC = m / (Cd · A). Projectiles with high ballistic coefficients (such as boat-tailed rifle bullets with BC &gt; 0.50) preserve a flatter trajectory closer to vacuum predictions. Conversely, low-BC projectiles (such as round musket balls) shed energy rapidly, causing their trajectory to collapse into a steep terminal plunge.
          </p>
<h2>Authoritative Ballistics & Physics Standards</h2>

          <p>
            For verified ballistic calculation standards and trajectory tables:
          </p>
          <ul>
            <li>
              <strong>US Army Ballistic Research Laboratory (BRL):</strong> Standard external ballistics aerodynamic drag functions (G1, G7 projectile models).
            </li>
            <li>
              <strong>ISO 80000-3:2019:</strong> Quantities and units for space, mechanics, kinematic trajectory vectors, and angles.
            </li>
            <li>
              <strong>NIST Reference on Constants, Units, and Uncertainty:</strong> Standard gravitational parameters for ballistic trajectory modeling.
            </li>
            <li>
              <strong>NATO Standardization Agreement (STANAG 4114):</strong> Military standard trajectory calculation procedures for artillery and mortar systems.
            </li>
          </ul>
        </>
      }
    >
      <ProjectileMotionCalculator />
    </CalcPage>
  );
}
