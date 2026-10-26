import type { Metadata } from "next";
import Link from "next/link";
import AngleConverterComponent from "@/components/calcs/measurements/angle-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AngleTrigonometricCircularDistributionChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/angle-converter";
const TITLE = "Angle Converter | Degrees, Radians, Gradians & Arcminutes";
const DESCRIPTION =
  "Convert degrees, radians, gradians, arcminutes, arcseconds, and full turns with trigonometric circular derivations and interactive arc modeling.";

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
  { href: "/calculators/measurements/torque-converter", icon: "🔧", name: "Torque Converter" },
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/physics/velocity-calculator", icon: "🏎️", name: "Velocity Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/calculators/measurements/speed-converter", icon: "🚀", name: "Speed Converter" },
  { href: "/pages/measurements", icon: "📐", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why is a full circle divided into 360 degrees?",
    a: "The 360-degree circular division originated in ancient Mesopotamia with the Babylonians around 2000 BCE, using a sexagesimal (base-60) numerical system. 360 closely mirrored the 365-day solar year and possesses exceptional composite divisibility: 360 is evenly divisible by 24 distinct integer factors (1, 2, 3, 4, 5, 6, 8, 9, 10, 12, etc.), simplifying celestial navigation.",
  },
  {
    q: "What is the natural mathematical definition of a radian (rad)?",
    a: "A radian is the natural, dimensionless SI unit of angular measure. One radian is defined as the plane angle subtended at the center of a circle by an arc whose length along the circumference is equal to the radius of the circle: θ = s / r. Because a circle's circumference is 2πr, a full circle contains exactly 2π radians (~6.283185 rad), and 1 radian equals exactly 180° / π ≈ 57.29578°.",
  },
  {
    q: "What are gradians (gons) and where are they used today?",
    a: "The gradian (gon or grade) is a decimalized angular unit introduced in France during the metrication movement of the 1790s. In the gradian system, a right angle is divided into exactly 100 gradians (and a full circle into 400 gradians). While not widely adopted in general science, gradians remain standard in civil land surveying, topographic leveling, and tunnel boring across continental Europe.",
  },
  {
    q: "How are arcminutes and arcseconds defined in astronomy and ballistics?",
    a: "An arcminute (MOA, or minute of arc) is exactly 1/60th of a degree (0.01667°), and an arcsecond is 1/60th of an arcminute (1/3600th of a degree). In precision long-range ballistics, 1 MOA corresponds to approximately 1.047 inches at 100 yards. In astronomy, arcseconds measure the apparent angular diameter of planets and stellar parallax.",
  },
];

export default function AngleConverterPage() {
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
            <strong>Quick Trigonometric Guidance:</strong> Angular measure quantifies rotational divergence between intersecting lines or coordinate axes. In mechanical robotics, civil surveying, and astrophysics, cross-reference rotational moments in our <Link href="/calculators/measurements/torque-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">torque converter</Link> and calculate tangential arc displacement using our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Foundations of Trigonometric Geometry: Circular Division Systems
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Angular measurement represents humanity&apos;s primary tool for geometric positioning, cartography, celestial navigation, and harmonic wave analysis. In Euclidean geometry, an angle quantifies the amount of rotation required to bring one ray into coincidence with another around a shared vertex point. In the International System of Units (SI), the radian (rad) serves as the coherent derived unit, defined naturally through arc length ratios without arbitrary imperial or historical graduations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, civil engineering, optical astronomy, military artillery, and digital computer graphics each utilize specialized angular systems. Surveyors in Europe employ decimal gradians (400 gon per circle); astronomers catalog celestial coordinates using degrees, arcminutes, and arcseconds; military artillery spotters measure target deflection using NATO artillery mils (6,400 mils per circle); and game physics engines calculate rotational velocity in full revolutions or turns per second.
          </p>

          <AngleTrigonometricCircularDistributionChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivations: Radians, Degrees & Trigonometric Identity
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            All planar angle transformations compute through the SI dimensionless unit of the radian (rad). The circular conversion from source angle to target unit executes through fundamental constants:
          </p>
          <Formula>{"\\theta_{\\text{target}} = \\theta_{\\text{source}} \\times \\left( \\frac{\\alpha_{\\text{source}}}{\\alpha_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where α represents the unit value in radians. The exact circular constants are:
          </p>
          <Formula>{"180^\\circ = \\pi \\text{ rad} \\implies 1^\\circ = \\frac{\\pi}{180} \\text{ rad} \\approx 0.0174532925 \\text{ rad}"}</Formula>
          <Formula>{"1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.2957795^\\circ, \\quad 1 \\text{ gon} = \\frac{\\pi}{200} \\text{ rad} = 0.9^\\circ"}</Formula>
          <Formula>{"1 \\text{ arcmin} = \\frac{1^\\circ}{60} = 0.000290888 \\text{ rad}, \\quad 1 \\text{ arcsec} = \\frac{1^\\circ}{3600} = 4.8481368 \\times 10^{-6} \\text{ rad}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In rotating machinery, angular velocity ω relates to linear peripheral speed via v = r × ω; cross-reference tangential velocity in our <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link> and calculate geometric proportions in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Angular Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across astronomical, navigational, artillery, and trigonometric domains:
          </p>
          <DataTable
            head={["Angle Unit", "Symbol", "Value in Radians (rad)", "Value in Degrees (°)", "Divisions per Circle"]}
            rows={[
              ["Arcsecond", "arcsec / ″", "4.848137 × 10⁻⁶ rad", "0.000277778°", "1,296,000 ″"],
              ["Arcminute (MOA)", "arcmin / ′", "0.000290888 rad", "0.0166667°", "21,600 ′"],
              ["Milliradian (NATO Mil)", "mil / mrad", "0.001 rad", "0.0572958°", "6,283.19 mrad (6,400 NATO)"],
              ["Gradian (Gon)", "gon / grad", "0.01570796 rad", "0.90°", "400.0 gon"],
              ["Degree (Sexagesimal)", "° / deg", "0.01745329 rad", "1.0°", "360.0°"],
              ["Radian (SI Coherent)", "rad", "1.0 rad", "57.2957795°", "2π rad (~6.283185)"],
              ["Quadrant (Right Angle)", "quad", "1.5707963 rad", "90.0°", "4.0 quadrants"],
              ["Semicircle (Straight Angle)", "π rad", "3.14159265 rad", "180.0°", "2.0 semicircles"],
              ["Full Turn (Revolution)", "rev / turn", "6.2831853 rad", "360.0°", "1.0 turn"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Long-Range Rifle Ballistics & MOA Adjustment
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a precision marksmanship ballistics engineer calibrating an optical telescopic sight for long-range target shooting at 800 yards. At this distance, crosswind drift shifts the bullet impact point horizontally by 28.5 inches. The marksman must calculate required optic turret clicks if the scope is calibrated in 1/4 MOA (Minutes of Angle) increments, and verify equivalence in milliradians (mrad):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Compute 1 MOA Subtension at 800 Yards):</strong> 1 MOA subtends tan(1° / 60) × (800 × 36 inches) = tan(0.016667°) × 28,800 inches ≈ 8.3776 inches.</li>
            <li><strong>Step 2 (Calculate Required MOA Correction):</strong> 28.5 inches ÷ 8.3776 inches/MOA = 3.402 MOA.</li>
            <li><strong>Step 3 (Determine Turret Click Adjustments):</strong> At 1/4 MOA per click: 3.402 × 4 ≈ 13.6 clicks (rounded to 14 turret clicks).</li>
            <li><strong>Step 4 (Milliradian Equivalent Verification):</strong> In radians: 3.402 MOA × (0.000290888 rad/MOA) = 0.000989 rad ≈ 0.989 mrad. In milliradian turrets (0.1 mrad per click), this requires exactly 10 clicks, confirming ballistic trajectory alignment. Cross-reference projectile impact velocity using our <Link href="/calculators/physics/velocity-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">velocity calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Stellar Parallax & The Geometric Definition of the Parsec
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In observational astrophysics, trigonometric stellar parallax represents the premier foundational rung of the cosmic distance ladder. As Earth orbits the Sun, nearby stars appear to shift slightly against the background of distant galaxies over a six-month baseline (2 Astronomical Units, AU).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Astronomers define the parsec (parallax arcsecond) as the distance at which a star exhibits a parallax half-angle of exactly one arcsecond (1″): d = 1 AU / tan(1″). Because 1 arcsecond is extraordinarily minuscule (4.84814 × 10⁻⁶ radians), the small-angle approximation tan(θ) ≈ θ applies: d ≈ 149,597,870,700 m ÷ 4.8481368 × 10⁻⁶ rad ≈ 3.08567758 × 10¹⁶ meters (approximately 3.26156 light-years).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Military Artillery Mils & The Stadiametric Rangefinding Formula
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In military field artillery and tactical binoculars, angles are measured in angular mils. Mathematically, 1 milliradian is 1/1,000 of a radian, possessing the property that an object 1 meter tall subtends an angle of exactly 1 mil at a distance of 1,000 meters.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For practical compass dials, NATO standardizes the circle into exactly 6,400 mils (allowing easy halving and quartering), whereas Soviet Warsaw Pact artillery utilized 6,000 mils, and Sweden adopted 6,300 mils. Forward observers calculate target distance using the simple stadiametric formula: Range (meters) = [Target Size (meters) × 1,000] ÷ Subtended Mils.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Euler Angles, Quaternions & Rotational Kinematics in Robotics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 3D aerospace flight control and multi-axis industrial robotics, spatial orientations are parameterized via Euler angles: Yaw (ψ), Pitch (θ), and Roll (ϕ). However, Euler angle transformations suffer from a fundamental topological mathematical singularity known as &apos;gimbal lock&apos;—when the pitch angle reaches ±90°, the yaw and roll axes align collinear, losing one rotational degree of freedom.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To prevent flight computer crashes and robotic gimbal lock, modern guidance algorithms utilize four-dimensional hypercomplex unit quaternions q = [w, x, y, z] invented by William Rowan Hamilton in 1843, ensuring smooth spherical linear interpolation (SLERP) without trigonometric singularities.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Carpentry, Wheel Alignment & Solar Tracking
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In domestic carpentry and timber framing, roof pitches are expressed as slope ratios (e.g., 6:12 pitch indicates a 6-inch vertical rise over a 12-inch horizontal run, corresponding to arctan(6/12) ≈ 26.57°). In automotive chassis suspension tuning, mechanics adjust front wheel camber and caster angles within tenths of a degree to prevent uneven tire wear and ensure high-speed directional tracking stability.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In renewable solar energy, dual-axis solar trackers continuously compute solar azimuth and zenith angles using astronomical ephemeris algorithms, orienting photovoltaic panels perpendicular to incoming sunlight to boost annual electrical generation by up to 35%. For academic grading and coursework tools, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and track test percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <AngleConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Geodetic Cartography: Ellipsoid Latitude / Longitude to UTM Plane Coordinates
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In satellite geodesy and GIS surveying, Earth&apos;s shape is modeled as a reference oblate spheroid (WGS 84). Positions on the curved planet are defined by angular coordinates: geodetic latitude (ϕ, north-south angle from the equatorial plane) and geodetic longitude (λ, east-west angle from the Greenwich prime meridian) measured in sexagesimal degrees, minutes, and seconds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To translate angular spherical coordinates into Cartesian metric x/y grid coordinates for civil engineering construction, surveyors apply Universal Transverse Mercator (UTM) map projections. UTM divides the globe into 60 longitudinal zones of 6 degrees each. By applying Gaussian conformal mapping equations, angular arc divergences are projected onto planar grid coordinates (easting and northing in meters) with scale distortion constrained to less than 1 part in 1,000 across each zone.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Optical Diffraction & The Rayleigh Angular Resolution Criterion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In optical physics, astronomy, and camera lens design, angular resolving power is fundamentally limited by the wave nature of light rather than lens manufacturing imperfections. When light of wavelength λ passes through a circular aperture of diameter D, wave diffraction forms a central bright spot surrounded by concentric dark rings (the Airy disk pattern).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Lord Rayleigh formulated the criterion for resolving two closely spaced point sources: their angular separation θ must satisfy θ ≥ 1.22 × (λ / D) radians. For the James Webb Space Telescope with a primary mirror diameter D = 6.5 meters observing infrared light at λ = 2.0 micrometers, the theoretical diffraction limit is: θ = 1.22 × (2.0 × 10⁻⁶ m ÷ 6.5 m) ≈ 3.75 × 10⁻⁷ radians (approximately 0.077 arcseconds), allowing astronomers to resolve distant exoplanetary atmospheres.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Computer Graphics: Spherical Coordinates & Trigonometric Ray Tracing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 3D video game graphics engines and cinematic photorealistic ray tracing, illumination calculations require evaluating angles between surface normal vectors N and incident light direction vectors L. The rendering equation computes Lambertian diffuse reflection proportional to the cosine of the incidence angle: I = I_0 × cos(θ) = I_0 × (N · L).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Graphics Processing Units (GPUs) execute billions of trigonometric sine and cosine functions every second using fast hardware-approximated CORDIC (Coordinate Rotation Digital Computer) algorithms. Converting between sexagesimal degrees in artist modeling software and floating-point radians in shading code ensures seamless photorealistic rendering of complex 3D virtual environments.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In optical lens manufacturing, surface profile curvature is measured using laser phase-shifting interferometry in fringes and arcseconds. Eliminating astigmatic wavefront aberrations ensures high-numerical-aperture microscope objectives deliver sharp sub-micron image resolution across the entire field of view.
          </p>

    </CalcPage>
  );
}
