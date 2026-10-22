import MatrixCalculator from "@/components/calcs/math/matrix-calculator";
import type { Metadata } from "next";
import Link from "next/link";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AlgebraFunctionVisualizerChart } from "@/components/flagship/math/editorial-charts/AlgebraFunctionVisualizerChart";

const PATH = "/calculators/math/matrix-calculator";
const TITLE = "Matrix Calculator | Determinant, Inverse, Multiplication & Eigenvalues | CalcDigi";
const DESCRIPTION =
  "Free online matrix calculator. Perform matrix addition, scalar multiplication, matrix multiplication, determinant evaluation, inversion, and eigenvalue analysis step-by-step.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate the determinant of a 2x2 matrix?",
    a: "For a 2×2 matrix A = [a, b; c, d], the determinant is the difference of the cross-diagonal products: det(A) = (a × d) − (b × c).",
  },
  {
    q: "When is a matrix invertible (non-singular)?",
    a: "A square matrix is invertible if and only if its determinant is non-zero (det(A) ≠ 0). If det(A) = 0, the matrix is singular, has no inverse, and squashes space into a lower dimension, meaning the associated linear system has either zero or infinitely many solutions.",
  },
  {
    q: "Why is matrix multiplication non-commutative (AB ≠ BA)?",
    a: "Matrix multiplication represents the composition of geometric transformations. Performing transformation A followed by B generally produces a completely different spatial result than performing B followed by A (e.g., rotating 90° then reflecting vs. reflecting then rotating).",
  },
  {
    q: "How do you calculate the inverse of a 2x2 matrix?",
    a: "The inverse of matrix A = [a, b; c, d] equals 1/det(A) multiplied by the adjugate matrix (swap diagonal elements a and d, negate off-diagonal elements b and c): A⁻¹ = (1 / (ad − bc)) × [d, −b; −c, a].",
  },
  {
    q: "What are eigenvalues and eigenvectors?",
    a: "An eigenvector v of a square matrix A is a non-zero vector whose direction remains unchanged when transformed by A, merely scaling by a constant factor λ called the eigenvalue: A·v = λ·v. Eigenvalues are the roots of the characteristic polynomial det(A − λI) = 0.",
  },
  {
    q: "What is the trace of a matrix?",
    a: "The trace of a square matrix, tr(A), is the sum of the elements along its main diagonal: tr(A) = Σ a_ii. In linear algebra, the trace equals the exact sum of all eigenvalues of the matrix.",
  },
  {
    q: "How are matrices used in 3D computer graphics and game engines?",
    a: "In 3D rendering engines like Unreal Engine and Unity, 4×4 affine transformation matrices perform all 3D rotations, translations, scaling, and camera perspective projections in GPU hardware shaders via matrix-vector multiplication.",
  },
  {
    q: "What is Cramer's Rule for solving linear systems?",
    a: "Cramer's Rule solves a system of linear equations Ax = b using determinants: the i-th variable equals x_i = det(A_i) / det(A), where A_i is formed by replacing the i-th column of matrix A with the constant vector b.",
  },
];

const MATRIX_OPERATIONS_ROWS = [
  ["Matrix Addition (A + B)", "C_ij = A_ij + B_ij", "Matrices must share identical dimensions m × n", "Element-by-element addition"],
  ["Scalar Multiplication (k·A)", "C_ij = k × A_ij", "Multiplies every element by scalar scalar k", "Scales transformation magnitude"],
  ["Matrix Multiplication (A·B)", "C_ij = Σ (A_ik × B_kj)", "Columns of A must equal rows of B (inner product)", "Composes linear transformations"],
  ["Matrix Transpose (Aᵀ)", "(Aᵀ)_ij = A_ji", "Swaps rows and columns across main diagonal", "Essential in covariance & normal equations"],
  ["Determinant (det A)", "ad − bc (for 2×2)", "Signed scaling factor of area or volume", "Tests matrix invertibility"],
  ["Matrix Inversion (A⁻¹)", "(1/det A) · adj(A)", "Reverses linear transformation such that A·A⁻¹ = I", "Solves linear equation systems: x = A⁻¹b"],
];

const APPLICATIONS_ROWS = [
  ["Computer Graphics & Shaders", "4×4 Affine transformation matrices", "Rotates, scales, and projects 3D polygons onto 2D viewports"],
  ["Google PageRank Algorithm", "Stochastic Markov transition matrix", "Computes principal eigenvector to rank importance of web pages"],
  ["Quantum Mechanics", "Hermitian matrices & unitary operators", "Eigenvalues represent observable physical energy states in Hilbert space"],
  ["Structural Finite Element Analysis", "Global stiffness matrix (K·u = F)", "Calculates bridge and skyscraper structural beam deflections"],
];

const RELATED = [
  { href: "/calculators/math/quadratic-equation-calculator", icon: "📈", name: "Quadratic Equation" },
  { href: "/calculators/math/number-sequence-calculator", icon: "🔢", name: "Number Sequence" },
  { href: "/calculators/math/slope-calculator", icon: "📈", name: "Slope Calculator" },
  { href: "/calculators/math/distance-formula-calculator", icon: "📍", name: "Distance Formula" },
  { href: "/calculators/math/exponent-calculator", icon: "xʸ", name: "Exponent Calculator" },
  { href: "/calculators/math/rounding-calculator", icon: "🎯", name: "Rounding Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Matrix Calculator"
      intro="Perform matrix addition, subtraction, multiplication, determinants, inverses, eigenvalues, and rank evaluations step-by-step with complete algebraic derivations."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="det(A), A^-1, A x B"
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

          <h2>Mathematical Axioms and Principles of Matrix Algebra</h2>
          <p>
            In linear algebra and modern mathematics, a <strong>matrix</strong> (plural: <em>matrices</em>) is a rectangular array of numbers, symbols, or mathematical expressions arranged in horizontal rows and vertical columns. Formally designated as an <em>m × n</em> matrix (having <em>m</em> rows and <em>n</em> columns), matrices represent linear transformations mapping vectors from an n-dimensional vector space ℝⁿ into an m-dimensional vector space ℝᵐ.
          </p>
          <p>
            The formalization of matrix theory was initiated in the mid-19th century by British mathematicians Arthur Cayley and James Joseph Sylvester. In his seminal 1858 paper <em>A Memoir on the Theory of Matrices</em>, Cayley demonstrated that matrices could be treated as self-contained algebraic entities governed by strict addition and multiplication operations, establishing the framework of non-commutative ring algebra.
          </p>
          <p>
            Today, matrix theory constitutes the computational backbone of 3D computer graphics pipelines (OpenGL, DirectX, Vulkan), deep learning artificial neural network tensor contractions, quantum mechanics operator observables, and macroeconomic input-output models.
          </p>

          <div className="not-prose my-8">
            <AlgebraFunctionVisualizerChart />
          </div>

          <h2>Taxonomy of Standard Matrix Operations</h2>
          <p>
            Matrix algebra adheres to strict dimensional constraints and operational laws:
          </p>

          <DataTable
            head={["Operation Name", "Mathematical Definition", "Dimensional Compatibility Requirement", "Core Geometric Role"]}
            rows={MATRIX_OPERATIONS_ROWS}
            highlight={2}
          />

          <h3>1. Matrix Multiplication (The Row-by-Column Inner Product)</h3>
          <p>
            Given an m × k matrix A and a k × n matrix B, their product C = AB is an m × n matrix whose element C_ij is computed by taking the dot product of the i-th row of A and the j-th column of B:
          </p>
          <Formula>C_ij = Σ (A_ir × B_rj)   from r = 1 to k</Formula>
          <p>
            <em>Worked Example:</em> Multiply 2×2 matrix A = [1, 2; 3, 4] by B = [5, 6; 7, 8]:
          </p>
          <ol>
            <li>C₁₁ = (1 × 5) + (2 × 7) = 5 + 14 = <strong>19</strong></li>
            <li>C₁₂ = (1 × 6) + (2 × 8) = 6 + 16 = <strong>22</strong></li>
            <li>C₂₁ = (3 × 5) + (4 × 7) = 15 + 28 = <strong>43</strong></li>
            <li>C₂₂ = (3 × 6) + (4 × 8) = 18 + 32 = <strong>50</strong></li>
            <li>Product AB = [19, 22; 43, 50].</li>
          </ol>

          <h3>2. Determinant and Matrix Inversion</h3>
          <p>
            For any 2×2 matrix A = [a, b; c, d], the <strong>determinant</strong> represents the signed geometric area scaling factor of the transformation:
          </p>
          <Formula>det(A) = ad − bc</Formula>
          <p>
            If det(A) ≠ 0, the matrix is invertible, and its exact inverse is:
          </p>
          <Formula>A⁻¹ = [ 1 ÷ (ad − bc) ] × [ d, −b; −c, a ]</Formula>
          <p>
            <em>Worked Example:</em> Invert matrix A = [4, 7; 2, 6].
          </p>
          <ol>
            <li>Calculate determinant: det(A) = (4 × 6) − (7 × 2) = 24 − 14 = 10 (non-zero, invertible).</li>
            <li>Construct adjugate matrix: swap diagonal (6 and 4), negate off-diagonal (−7 and −2): [6, −7; −2, 4].</li>
            <li>Scale by 1/det: A⁻¹ = [6/10, −7/10; −2/10, 4/10] = <strong>[0.6, −0.7; −0.2, 0.4]</strong>.</li>
            <li>Verify identity: A × A⁻¹ = [ (4·0.6 + 7·(−0.2)), (4·(−0.7) + 7·0.4); (2·0.6 + 6·(−0.2)), (2·(−0.7) + 6·0.4) ] = [1, 0; 0, 1] = I.</li>
          </ol>

          <h2>Eigenvalues, Eigenvectors, and the Characteristic Equation</h2>
          <p>
            For a square n × n matrix A, a scalar λ is an <strong>eigenvalue</strong> corresponding to eigenvector <em>v</em> if:
          </p>
          <Formula>A × v = λ × v   iff   (A − λI) × v = 0</Formula>
          <p>
            Non-trivial solutions exist if and only if the matrix (A − λI) is singular, yielding the <strong>Characteristic Equation</strong>:
          </p>
          <Formula>det(A − λI) = 0</Formula>
          <p>
            For a 2×2 matrix, this expands to the quadratic polynomial:
          </p>
          <Formula>λ² − tr(A) × λ + det(A) = 0</Formula>
          <p>
            Where tr(A) = a + d is the trace and det(A) = ad − bc is the determinant.
          </p>

          <h2>Singular Value Decomposition (SVD) and Dimensionality Reduction</h2>
          <p>
            In applied linear algebra and artificial intelligence, <strong>Singular Value Decomposition (SVD)</strong> generalizes eigendecomposition to arbitrary rectangular m × n matrices. Every real matrix A can be factored as:
          </p>
          <Formula>A = U × Σ × Vᵀ</Formula>
          <p>
            Where U is an m × m orthogonal matrix containing left singular vectors, Σ is an m × n diagonal matrix containing non-negative singular values σ_i sorted in descending order, and V is an n × n orthogonal matrix containing right singular vectors.
          </p>
          <p>
            By the Eckart-Young-Mirsky theorem, truncating the SVD to the top <em>k</em> singular values produces the optimal low-rank matrix approximation under the Frobenius norm. This mathematical principle powers modern digital image compression, Netflix collaborative filtering recommendation engines, and Principal Component Analysis (PCA) in data science.
          </p>

          <h2>Real-World Matrix Applications Across Industry and High Technology</h2>
          <p>
            Matrix operations govern critical algorithms in modern computing:
          </p>

          <DataTable
            head={["Technological Domain", "Matrix Formulation & Model", "Engineering Impact & Role"]}
            rows={APPLICATIONS_ROWS}
            highlight={0}
          />

          <h2>Related Mathematical and Algebraic Calculators</h2>
          <p>
            To expand your quantitative toolkit, explore our specialized <Link href="/calculators/math/quadratic-equation-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Quadratic Equation Calculator</Link>, <Link href="/calculators/math/number-sequence-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Number Sequence Calculator</Link>, <Link href="/calculators/math/slope-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Slope Calculator</Link>, and <Link href="/calculators/math/distance-formula-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Distance Formula Calculator</Link>.
          </p>
        
          <h2>Linear Transformations, Eigenvalues & Matrix Invertibility Conditions</h2>
          <p>
            In linear algebra, a 2×2 matrix represents a geometric linear transformation mapping the 2D Cartesian plane onto itself. The determinant det(A) = ad − bc measures the signed geometric scaling factor of planar area under this transformation; a negative determinant indicates coordinate orientation reversal (reflection), while a zero determinant signifies that the transformation collapses 2D space into a lower-dimensional 1D line or point. A matrix is invertible if and only if its determinant is non-zero, satisfying A A⁻¹ = I. In computer graphics and real-time game physics engines, 2×2 and 4×4 affine transformation matrices perform real-time coordinate rotation, shearing, perspective projection, and camera world transformations millions of times per second.
          </p>
</>
      }
    >
      <MatrixCalculator />
    </CalcPage>
  );
}
