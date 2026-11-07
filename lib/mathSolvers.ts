export interface MathSolverConfig {
  name: string;
  assesses: string[];
  eduQuestionType: string[];
}

export const MATH_SOLVERS: Record<string, MathSolverConfig> = {
  "/calculators/math/percentage-calculator": {
    name: "Percentage Calculator",
    assesses: ["Percentages", "Percentage Calculations", "Percentage Change"],
    eduQuestionType: ["Percentage"],
  },
  "/calculators/math/fraction-calculator": {
    name: "Fraction Calculator",
    assesses: ["Fractions", "Fraction Arithmetic", "Simplifying Fractions"],
    eduQuestionType: ["Fractions", "Arithmetic"],
  },
  "/calculators/math/scientific-calculator": {
    name: "Scientific Calculator",
    assesses: ["Scientific Mathematics", "Arithmetic", "Trigonometry"],
    eduQuestionType: ["Arithmetic", "Trigonometry", "Exponents"],
  },
  "/calculators/math/square-root-calculator": {
    name: "Square Root Calculator",
    assesses: ["Square Roots", "Radicals", "Radical Expressions"],
    eduQuestionType: ["Arithmetic", "Exponents"],
  },
  "/calculators/math/ratio-calculator": {
    name: "Ratio Calculator",
    assesses: ["Ratios", "Proportions", "Ratio Scaling"],
    eduQuestionType: ["Fractions", "Arithmetic"],
  },
  "/calculators/math/triangle-calculator": {
    name: "Triangle Calculator",
    assesses: ["Triangles", "Geometry", "Trigonometry"],
    eduQuestionType: ["Geometry", "Trigonometry"],
  },
  "/calculators/math/standard-deviation-calculator": {
    name: "Standard Deviation Calculator",
    assesses: ["Standard Deviation", "Variance", "Statistics"],
    eduQuestionType: ["Standard deviation"],
  },
  "/calculators/math/average-calculator": {
    name: "Average Calculator",
    assesses: ["Arithmetic Mean", "Median", "Mode", "Statistics"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/exponent-calculator": {
    name: "Exponent Calculator",
    assesses: ["Exponents", "Powers", "Scientific Notation"],
    eduQuestionType: ["Exponents"],
  },
  "/calculators/math/quadratic-equation-calculator": {
    name: "Quadratic Equation Calculator",
    assesses: ["Quadratic Equations", "Algebra", "Polynomial Roots"],
    eduQuestionType: ["Quadratic equation", "Polynomial equation"],
  },
  "/calculators/math/logarithm-calculator": {
    name: "Logarithm Calculator",
    assesses: ["Logarithms", "Natural Log", "Algebra"],
    eduQuestionType: ["Logarithm"],
  },
  "/calculators/math/pythagorean-theorem-calculator": {
    name: "Pythagorean Theorem Calculator",
    assesses: ["Pythagorean Theorem", "Right Triangles", "Geometry"],
    eduQuestionType: ["Geometry"],
  },
  "/calculators/math/slope-calculator": {
    name: "Slope Calculator",
    assesses: ["Slope", "Coordinate Geometry", "Linear Equations"],
    eduQuestionType: ["Linear equation", "Geometry"],
  },
  "/calculators/math/long-division-calculator": {
    name: "Long Division Calculator",
    assesses: ["Long Division", "Arithmetic", "Quotients and Remainders"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/matrix-calculator": {
    name: "Matrix Calculator",
    assesses: ["Matrix Operations", "Linear Algebra", "Determinants"],
    eduQuestionType: ["Linear equation"],
  },
  "/calculators/math/decimal-to-fraction-calculator": {
    name: "Decimal to Fraction Calculator",
    assesses: ["Fractions", "Decimals", "Fraction Conversion"],
    eduQuestionType: ["Fractions", "Arithmetic"],
  },
  "/calculators/math/absolute-value-calculator": {
    name: "Absolute Value Calculator",
    assesses: ["Absolute Value", "Arithmetic", "Real Numbers"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/area-calculator": {
    name: "Area Calculator",
    assesses: ["Area", "Geometry", "2D Shapes"],
    eduQuestionType: ["Geometry"],
  },
  "/calculators/math/circle-calculator": {
    name: "Circle Calculator",
    assesses: ["Circle Geometry", "Circumference", "Radius and Area"],
    eduQuestionType: ["Geometry"],
  },
  "/calculators/math/combination-calculator": {
    name: "Combination Calculator",
    assesses: ["Combinations", "Combinatorics", "nCr"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/permutation-calculator": {
    name: "Permutation Calculator",
    assesses: ["Permutations", "Combinatorics", "nPr"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/factorial-calculator": {
    name: "Factorial Calculator",
    assesses: ["Factorials", "Combinatorics", "n!"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/gcf-calculator": {
    name: "GCF Calculator",
    assesses: ["Greatest Common Factor", "GCD", "Number Theory"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/lcm-calculator": {
    name: "LCM Calculator",
    assesses: ["Least Common Multiple", "Number Theory"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/factor-calculator": {
    name: "Factor Calculator",
    assesses: ["Factors", "Divisors", "Prime Factorization"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/percentage-change-calculator": {
    name: "Percentage Change Calculator",
    assesses: ["Percentage Change", "Percentage Increase", "Percentage Decrease"],
    eduQuestionType: ["Percentage"],
  },
  "/calculators/math/percent-error-calculator": {
    name: "Percent Error Calculator",
    assesses: ["Percent Error", "Experimental Error", "Statistics"],
    eduQuestionType: ["Percentage"],
  },
  "/calculators/math/probability-calculator": {
    name: "Probability Calculator",
    assesses: ["Probability", "Statistics", "Odds"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/rounding-calculator": {
    name: "Rounding Calculator",
    assesses: ["Rounding", "Decimal Precision", "Significant Digits"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/significant-figures-calculator": {
    name: "Significant Figures Calculator",
    assesses: ["Significant Figures", "Precision", "Scientific Measurement"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/scientific-notation-calculator": {
    name: "Scientific Notation Calculator",
    assesses: ["Scientific Notation", "Standard Form", "Exponents"],
    eduQuestionType: ["Exponents", "Arithmetic"],
  },
  "/calculators/math/variance-calculator": {
    name: "Variance Calculator",
    assesses: ["Variance", "Sample Variance", "Population Variance", "Statistics"],
    eduQuestionType: ["Standard deviation"],
  },
  "/calculators/math/volume-calculator": {
    name: "Volume Calculator",
    assesses: ["Volume", "3D Geometry", "Solid Shapes"],
    eduQuestionType: ["Geometry"],
  },
  "/calculators/math/surface-area-calculator": {
    name: "Surface Area Calculator",
    assesses: ["Surface Area", "3D Geometry", "Solid Shapes"],
    eduQuestionType: ["Geometry"],
  },
  "/calculators/math/z-score-calculator": {
    name: "Z-Score Calculator",
    assesses: ["Z-Scores", "Standard Normal Distribution", "Statistics"],
    eduQuestionType: ["Standard deviation"],
  },
  "/calculators/math/median-calculator": {
    name: "Median Calculator",
    assesses: ["Median", "Statistics", "Data Sets"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/number-sequence-calculator": {
    name: "Number Sequence Calculator",
    assesses: ["Number Sequences", "Arithmetic Progressions", "Geometric Sequences"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/binary-calculator": {
    name: "Binary Calculator",
    assesses: ["Binary Numbers", "Base-2 Arithmetic", "Bitwise Operations"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/hex-calculator": {
    name: "Hex Calculator",
    assesses: ["Hexadecimal Numbers", "Base-16 Arithmetic", "Hex Conversion"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/big-number-calculator": {
    name: "Big Number Calculator",
    assesses: ["Big Number Arithmetic", "High Precision Calculations"],
    eduQuestionType: ["Arithmetic"],
  },
  "/calculators/math/distance-formula-calculator": {
    name: "Distance Formula Calculator",
    assesses: ["Distance Formula", "Coordinate Geometry", "Euclidean Distance"],
    eduQuestionType: ["Geometry"],
  },
  "/calculators/math/confidence-interval-calculator": {
    name: "Confidence Interval Calculator",
    assesses: ["Confidence Intervals", "Statistical Estimation", "Margin of Error"],
    eduQuestionType: ["Standard deviation"],
  },
  "/calculators/math/sample-size-calculator": {
    name: "Sample Size Calculator",
    assesses: ["Sample Size", "Statistical Power", "Survey Sampling"],
    eduQuestionType: ["Standard deviation"],
  },
  "/calculators/math/prime-number-checker": {
    name: "Prime Number Checker",
    assesses: ["Prime Numbers", "Primality Testing", "Number Theory"],
    eduQuestionType: ["Arithmetic"],
  },
};
