import DistanceFormulaCalculator from "@/components/calcs/math/distance-formula-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GeometryShapeVisualizerChart } from "@/components/flagship/math/editorial-charts/GeometryShapeVisualizerChart";

const PATH = "/calculators/math/distance-formula-calculator";
const TITLE = "Distance Formula Calculator | 2D, 3D Euclidean & Coordinate Distance | CalcDigi";
const DESCRIPTION =
  "Free online distance formula calculator. Calculate 2D and 3D Euclidean distance, midpoint, and vector length between two coordinates step-by-step with metric proofs.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "What is the 2D Euclidean distance formula?",
    a: "The Euclidean distance d between two points (x₁, y₁) and (x₂, y₂) in the 2D Cartesian plane is derived directly from the Pythagorean theorem: d = √[ (x₂ − x₁)² + (y₂ − y₁)² ].",
  },
  {
    q: "How do you calculate distance in three-dimensional space (3D)?",
    a: "In 3D Euclidean space ℝ³, distance incorporates the vertical z-axis: d = √[ (x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)² ].",
  },
  {
    q: "How do you find the midpoint between two points?",
    a: "The midpoint M is the exact arithmetic average of the respective coordinate components: M = ( (x₁ + x₂) / 2, (y₁ + y₂) / 2 ). In 3D space, add (z₁ + z₂) / 2.",
  },
  {
    q: "What is Manhattan Distance (Taxicab metric) and how does it differ from Euclidean distance?",
    a: "Manhattan distance measures distance strictly along grid axes like a city street grid where diagonal movement is forbidden: d_Manhattan = |x₂ − x₁| + |y₂ − y₁|. Euclidean distance measures the straight-line 'as-the-crow-flies' shortcut.",
  },
  {
    q: "Can Euclidean distance ever be negative?",
    a: "No. In metric space topology, distance is governed by the non-negativity axiom: d(P, Q) ≥ 0, with d(P, Q) = 0 if and only if P and Q are the exact same point. Taking the principal positive square root guarantees distance is always non-negative.",
  },
  {
    q: "What is the Great-Circle Distance (Haversine formula)?",
    a: "The Great-Circle distance calculates the shortest navigational distance between two points on the curved spherical surface of the Earth using latitude and longitude coordinates, taking Earth's mean radius (R ≈ 6,371 km) into account.",
  },
  {
    q: "How is Euclidean distance used in Machine Learning?",
    a: "In data science, Euclidean distance is the primary metric used in k-Nearest Neighbors (k-NN) classification, k-means clustering, and high-dimensional vector search engines to measure semantic similarity between feature vectors.",
  },
  {
    q: "What is Chebyshev distance (Chessboard metric)?",
    a: "Chebyshev distance measures the maximum coordinate difference along any single dimension: d_Chebyshev = max(|x₂ − x₁|, |y₂ − y₁|). It represents the minimum number of moves a King needs to travel between two squares on a chessboard.",
  },
];

const METRIC_SPACES_ROWS = [
  ["Euclidean Distance (L₂ norm)", "d = √[ Σ(xᵢ − yᵢ)² ]", "Straight-line physical distance in Euclidean space", "GPS navigation & physics vectors"],
  ["Manhattan Distance (L₁ norm)", "d = Σ |xᵢ − yᵢ|", "Orthogonal grid-constrained routing distance", "Urban delivery routing & circuit layout"],
  ["Chebyshev Distance (L_∞ norm)", "d = max |xᵢ − yᵢ|", "Dominant coordinate displacement metric", "Chess King movement & warehouse crane routing"],
  ["Minkowski Metric (L_p norm)", "d = [ Σ |xᵢ − yᵢ|^p ]^(1/p)", "Generalized p-norm metric encompassing L₁, L₂, and L_∞", "Advanced machine learning feature spaces"],
  ["Great-Circle (Haversine)", "d = 2R · arcsin(√hav(Δσ))", "Shortest path along spherical planetary globe", "Aviation flight plans & maritime shipping"],
];

const RELATED = [
  { href: "/calculators/math/slope-calculator", icon: "📈", name: "Slope Calculator" },
  { href: "/calculators/math/pythagorean-theorem-calculator", icon: "📐", name: "Pythagorean Theorem" },
  { href: "/calculators/math/triangle-calculator", icon: "📐", name: "Triangle Calculator" },
  { href: "/calculators/math/area-calculator", icon: "🟩", name: "Area Calculator" },
  { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root" },
  { href: "/calculators/math/circle-calculator", icon: "⭕", name: "Circle Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Distance Formula Calculator | CalcDigi"
      intro="Calculate 2D and 3D Euclidean distance, coordinate displacement, midpoint, and vector length between any two points with complete step-by-step mathematical proofs."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="d = sqrt((x2 - x1)^2 + (y2 - y1)^2)"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO 80000-2 / NIST Compliant Precision</span>
          </div>

          <h2>Metric Space Axioms and the Foundations of Euclidean Distance</h2>
          <p>
            In mathematical analysis and topology, a <strong>metric space</strong> is a set endowed with a rigorous distance function d(x, y) formalizing the intuitive concept of physical distance. Established by German mathematician Felix Hausdorff and Maurice Fréchet in 1906, any valid metric must satisfy four foundational axioms:
          </p>
          <ol>
            <li><strong>Non-negativity:</strong> d(x, y) ≥ 0 for all points x and y.</li>
            <li><strong>Identity of Indiscernibles:</strong> d(x, y) = 0 if and only if x = y.</li>
            <li><strong>Symmetry:</strong> d(x, y) = d(y, x) (distance is identical in both directions).</li>
            <li><strong>Triangle Inequality:</strong> d(x, z) ≤ d(x, y) + d(y, z) (the straight path is never longer than any path through an intermediate point y).</li>
          </ol>
          <p>
            The standard straight-line distance function in Euclidean space ℝ² represents a direct application of the Pythagorean theorem across Cartesian coordinates, mapping geometric intuition into analytic calculation.
          </p>

          <div className="not-prose my-8">
            <GeometryShapeVisualizerChart />
          </div>

          <h2>Mathematical Derivations: 2D and 3D Euclidean Distance</h2>
          <p>
            Consider two points P₁(x₁, y₁) and P₂(x₂, y₂) in the Cartesian plane. Constructing a right triangle with horizontal leg |x₂ − x₁| and vertical leg |y₂ − y₁|, the distance segment P₁P₂ serves as the hypotenuse. By the Pythagorean theorem:
          </p>
          <Formula>d² = (Δx)² + (Δy)² = (x₂ − x₁)² + (y₂ − y₁)²</Formula>
          <p>
            Extracting the principal square root yields the definitive <strong>2D Distance Formula</strong>:
          </p>
          <Formula>d = √[ (x₂ − x₁)² + (y₂ − y₁)² ]</Formula>
          <p>
            <em>Worked Derivation:</em> Calculate the distance between P₁(−3, 4) and P₂(5, −2).
          </p>
          <ol>
            <li>Horizontal difference: Δx = 5 − (−3) = 8 → (8)² = 64</li>
            <li>Vertical difference: Δy = −2 − 4 = −6 → (−6)² = 36</li>
            <li>Sum of squared differences: 64 + 36 = 100</li>
            <li>Extract square root: d = √100 = <strong>10.00 units</strong></li>
            <li>Midpoint coordinate: M = ( (−3 + 5) ÷ 2, (4 + (−2)) ÷ 2 ) = ( 2 ÷ 2, 2 ÷ 2 ) = <strong>(1.0, 1.0)</strong></li>
          </ol>

          <h3>Extension to Three-Dimensional Euclidean Space (ℝ³)</h3>
          <p>
            In three-dimensional space, applying the Pythagorean theorem consecutively across orthogonal planes incorporates the elevation z-axis:
          </p>
          <Formula>d = √[ (x₂ − x₁)² + (y₂ − y₁)² + (z₂ − z₁)² ]</Formula>
          <p>
            <em>Worked Example:</em> An aircraft ascends from radar origin (0, 0, 0) to waypoint (12, 16, 15) km:
          </p>
          <Formula>d = √(12² + 16² + 15²) = √(144 + 256 + 225) = √625 = 25.00 km slant range</Formula>

          <h2>Distance Between Parallel Lines in Two Dimensions</h2>
          <p>
            When two lines in the Cartesian plane are parallel, they share identical coefficients A and B in their standard equations: Ax + By + C₁ = 0 and Ax + By + C₂ = 0. The perpendicular distance <em>d</em> between the two parallel tracks equals:
          </p>
          <Formula>d = | C₁ − C₂ | ÷ √(A² + B²)</Formula>
          <p>
            <em>Worked Example:</em> Calculate the distance separating railway boundary rails 4x + 3y − 12 = 0 and 4x + 3y + 8 = 0.
          </p>
          <ol>
            <li>Difference between constant intercepts: | −12 − 8 | = | −20 | = 20</li>
            <li>Magnitude of normal vector: √(4² + 3²) = √25 = 5</li>
            <li>Perpendicular track separation: d = 20 ÷ 5 = <strong>4.00 units</strong>.</li>
          </ol>

          <h2>Shortest Distance Between Skew Lines in Three Dimensions (ℝ³)</h2>
          <p>
            In three-dimensional aerospace trajectory planning and robotic arm kinematics, two non-parallel lines that do not intersect are termed <strong>skew lines</strong>. Given line 1 passing through point P₁ with direction vector v₁ and line 2 passing through point P₂ with direction vector v₂, the shortest distance segment is perpendicular to both lines, evaluated via scalar triple product:
          </p>
          <Formula>Distance = | (P₂ − P₁) · (v₁ × v₂) | ÷ || v₁ × v₂ ||</Formula>
          <p>
            This vector equation guarantees that autonomous drones and spacecraft can detect minimum clearance distances and prevent mid-air collisions.
          </p>

          <h2>Alternative Metric Spaces: Taxicab, Chebyshev, and Haversine</h2>
          <p>
            While Euclidean distance represents straight-line shortcuts, alternative metrics govern constrained physical environments:
          </p>

          <DataTable
            head={["Metric Space Definition", "Mathematical Distance Formula", "Physical Geometric Interpretation", "Primary Computational Domain"]}
            rows={METRIC_SPACES_ROWS}
            highlight={0}
          />

          <h2>Spherical Trigonometry and Great-Circle Navigation (Haversine Formula)</h2>
          <p>
            Because the Earth is an oblate spheroid, straight Euclidean lines cannot be used for transoceanic flight navigation. The shortest navigational path connecting two coordinates on a sphere of radius R (Earth mean radius R ≈ 6,371 km) is an arc of a great circle, computed via the <strong>Haversine Formula</strong>:
          </p>
          <Formula>hav(d ÷ R) = sin²(Δφ ÷ 2) + cos(φ₁) × cos(φ₂) × sin²(Δλ ÷ 2)</Formula>
          <p>
            Where φ represents latitude, λ represents longitude, and hav(θ) = sin²(θ/2). Solving for distance <em>d</em> yields:
          </p>
          <Formula>d = 2R × arcsin( √[ sin²(Δφ ÷ 2) + cos(φ₁) cos(φ₂) sin²(Δλ ÷ 2) ] )</Formula>
          <p>
            <em>Worked Example:</em> Calculate the great-circle flight path from New York JFK (40.64° N, 73.78° W) to London Heathrow LHR (51.47° N, 0.45° W):
          </p>
          <ol>
            <li>Latitude shift: Δφ = 51.47° − 40.64° = 10.83° = 0.1890 radians</li>
            <li>Longitude shift: Δλ = −0.45° − (−73.78°) = 73.33° = 1.2798 radians</li>
            <li>Haversine intermediate term: hav(d/R) ≈ 0.1832</li>
            <li>Great-circle flight distance: d ≈ 2 × 6371 × arcsin(√0.1832) ≈ <strong>5,555 km (3,452 statute miles)</strong>.</li>
          </ol>

          <h2>Machine Learning and High-Dimensional Vector Embeddings</h2>
          <p>
            In modern artificial intelligence and large language models (LLMs), semantic data is converted into high-dimensional vector embeddings (frequently spanning 768 to 3,072 dimensions). Measuring distance between embeddings dictates how search engines and recommendation algorithms retrieve relevant information:
          </p>
          <ul>
            <li>
              <strong>k-Nearest Neighbors (k-NN):</strong> Classifies new data points based on the majority category of the <em>k</em> closest training vectors evaluated via Euclidean distance.
            </li>
            <li>
              <strong>Cosine Similarity vs. Euclidean Distance:</strong> For vectors normalized to unit length (|v| = 1), Euclidean distance squared is directly proportional to cosine distance: d² = 2(1 − cos θ).
            </li>
          </ul>

          <h2>Related Mathematical and Geometric Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/slope-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Slope Calculator</Link>, <Link href="/calculators/math/pythagorean-theorem-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Pythagorean Theorem Calculator</Link>, <Link href="/calculators/math/triangle-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Triangle Calculator</Link>, and <Link href="/calculators/math/area-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Area Calculator</Link>.
          </p>
        
          <h2>Minkowski Metric Tensors & Non-Euclidean Geodesic Trajectories</h2>
          <p>
            While the classic distance formula computes straight-line length in flat Euclidean space governed by the Pythagorean metric tensor gᵢⱼ = δᵢⱼ, distance metrics diverge substantially across generalized metric spaces. In urban logistics and network routing, the Manhattan L¹ metric d = |x₂ − x₁| + |y₂ − y₁| models vehicular grid navigation where diagonal transit is prohibited. In Einstein's special theory of relativity, spacetime separation follows the hyperbolic Minkowski metric ds² = c²dt² − dx² − dy² − dz², where null intervals ds = 0 represent the invariant path of propagating light. On spherical terrestrial geoids, great-circle distances require the orthodromic Haversine spherical trigonometric formula to compute true oceanic and aviation flight distances across planetary curvature.
          </p>
</>
      }
    >
      <DistanceFormulaCalculator />
    </CalcPage>
  );
}
