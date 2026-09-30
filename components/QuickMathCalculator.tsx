"use client";

import { useState } from "react";

type Mode = "basic" | "scientific";
type FnKey = "sin" | "cos" | "tan" | "log" | "ln" | "sqrt" | "pow" | "abs" | "arithmetic";

interface RelatedCalc {
  href: string;
  icon: string;
  name: string;
}

interface FormulaInfo {
  title: string;
  formula: string;
  description: string;
  related: RelatedCalc[];
}

const FORMULA_INFO: Record<FnKey, FormulaInfo> = {
  sin: {
    title: "Trigonometric Functions",
    formula: "sin(θ), cos(θ), tan(θ)",
    description:
      "These functions relate an angle in a right triangle to the ratio of its sides. This calculator evaluates them in radians, not degrees — multiply a degree value by π/180 first to convert.",
    related: [
      { href: "/calculators/math/triangle-calculator", icon: "🔺", name: "Triangle Calculator" },
      { href: "/calculators/math/pythagorean-theorem-calculator", icon: "🔺", name: "Pythagorean Theorem" },
      { href: "/calculators/math/scientific-calculator", icon: "🔬", name: "Full Scientific Calculator" },
      { href: "/calculators/math/slope-calculator", icon: "📉", name: "Slope Calculator" },
    ],
  },
  cos: { title: "", formula: "", description: "", related: [] }, // filled below
  tan: { title: "", formula: "", description: "", related: [] },
  log: {
    title: "Logarithms",
    formula: "log₁₀(x)",
    description:
      "The base-10 logarithm of x is the power that 10 must be raised to in order to produce x. For example, log(1000) = 3, since 10³ = 1000.",
    related: [
      { href: "/calculators/math/logarithm-calculator", icon: "📊", name: "Logarithm Calculator" },
      { href: "/calculators/math/exponent-calculator", icon: "📈", name: "Exponent Calculator" },
      { href: "/calculators/math/scientific-notation-calculator", icon: "🔟", name: "Scientific Notation" },
      { href: "/calculators/math/scientific-calculator", icon: "🔬", name: "Full Scientific Calculator" },
    ],
  },
  ln: {
    title: "Natural Logarithm",
    formula: "ln(x) = logₑ(x)",
    description:
      "The natural logarithm uses base e (≈2.71828) instead of base 10. It shows up constantly in growth and decay problems — compound interest, population growth, and radioactive decay.",
    related: [
      { href: "/calculators/math/logarithm-calculator", icon: "📊", name: "Logarithm Calculator" },
      { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
      { href: "/calculators/math/exponent-calculator", icon: "📈", name: "Exponent Calculator" },
      { href: "/calculators/math/scientific-calculator", icon: "🔬", name: "Full Scientific Calculator" },
    ],
  },
  sqrt: {
    title: "Square Root",
    formula: "√x",
    description:
      "The square root of x is the number that, multiplied by itself, gives x. √25 = 5 because 5 × 5 = 25. Only non-negative numbers have a real square root.",
    related: [
      { href: "/calculators/math/square-root-calculator", icon: "√", name: "Square Root Calculator" },
      { href: "/calculators/math/exponent-calculator", icon: "📈", name: "Exponent Calculator" },
      { href: "/calculators/math/pythagorean-theorem-calculator", icon: "🔺", name: "Pythagorean Theorem" },
      { href: "/calculators/math/quadratic-equation-calculator", icon: "🔢", name: "Quadratic Equation" },
    ],
  },
  pow: {
    title: "Exponents",
    formula: "xⁿ",
    description:
      "Raising x to the power n means multiplying x by itself n times. 2⁵ = 2×2×2×2×2 = 32. Exponents grow extremely fast — this is the basis of compound growth and scientific notation.",
    related: [
      { href: "/calculators/math/exponent-calculator", icon: "📈", name: "Exponent Calculator" },
      { href: "/calculators/math/scientific-notation-calculator", icon: "🔟", name: "Scientific Notation" },
      { href: "/calculators/math/big-number-calculator", icon: "💯", name: "Big Number Calculator" },
      { href: "/calculators/math/logarithm-calculator", icon: "📊", name: "Logarithm Calculator" },
    ],
  },
  abs: {
    title: "Absolute Value",
    formula: "|x|",
    description:
      "Absolute value strips the sign from a number, always returning a non-negative result. |−7| = 7 and |7| = 7 — it represents distance from zero, which can't be negative.",
    related: [
      { href: "/calculators/math/absolute-value-calculator", icon: "||", name: "Absolute Value Calculator" },
      { href: "/calculators/math/rounding-calculator", icon: "🔢", name: "Rounding Calculator" },
      { href: "/calculators/math/percent-error-calculator", icon: "📏", name: "Percent Error Calculator" },
      { href: "/calculators/math/scientific-calculator", icon: "🔬", name: "Full Scientific Calculator" },
    ],
  },
  arithmetic: {
    title: "Order of Operations (PEMDAS)",
    formula: "Parentheses → Exponents → Multiply/Divide → Add/Subtract",
    description:
      "When an expression mixes operations, this order decides what happens first. Work inside parentheses, then exponents, then multiplication and division left to right, then addition and subtraction left to right.",
    related: [
      { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
      { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
      { href: "/calculators/math/average-calculator", icon: "📐", name: "Average Calculator" },
      { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
    ],
  },
};
FORMULA_INFO.cos = FORMULA_INFO.sin;
FORMULA_INFO.tan = FORMULA_INFO.sin;

const SCI_FUNCS: { label: string; fn: FnKey; insert: string }[] = [
  { label: "sin", fn: "sin", insert: "sin(" },
  { label: "cos", fn: "cos", insert: "cos(" },
  { label: "tan", fn: "tan", insert: "tan(" },
  { label: "log", fn: "log", insert: "log(" },
  { label: "ln", fn: "ln", insert: "ln(" },
  { label: "√", fn: "sqrt", insert: "sqrt(" },
  { label: "xⁿ", fn: "pow", insert: "**" },
  { label: "|x|", fn: "abs", insert: "abs(" },
  { label: "π", fn: "arithmetic", insert: "Math.PI" },
  { label: "e", fn: "arithmetic", insert: "Math.E" },
];

function detectFnKey(expr: string): FnKey {
  const order: FnKey[] = ["sin", "cos", "tan", "log", "ln", "sqrt", "abs"];
  for (const key of order) {
    if (expr.includes(key + "(")) return key;
  }
  if (expr.includes("**")) return "pow";
  return "arithmetic";
}

function formatResult(n: number): string {
  if (!isFinite(n)) return "Error";
  const rounded = Math.round(n * 1e10) / 1e10;
  return rounded.toString();
}

export default function QuickMathCalculator() {
  const [mode, setMode] = useState<Mode>("basic");
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [lastFn, setLastFn] = useState<FnKey | null>(null);

  const insert = (v: string) => {
    setExpr((e) => e + v);
    setResult(null);
  };
  const clear = () => {
    setExpr("");
    setResult(null);
    setLastFn(null);
  };
  const del = () => {
    setExpr((e) => e.slice(0, -1));
    setResult(null);
  };
  const equals = () => {
    if (!expr.trim()) return;
    try {
      const sanitized = expr
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/abs\(/g, "Math.abs(");
      // eslint-disable-next-line no-new-func
      const r = Function('"use strict";return (' + sanitized + ")")();
      if (typeof r !== "number") throw new Error("not a number");
      setResult(formatResult(r));
      setLastFn(detectFnKey(expr));
    } catch {
      setResult("Error");
      setLastFn(null);
    }
  };

  const info = lastFn ? FORMULA_INFO[lastFn] : null;

  return (
    <div className="qmc-wrap">
      <div className="qmc-toggle" role="tablist" aria-label="Calculator mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "basic"}
          className={`qmc-toggle-btn${mode === "basic" ? " active" : ""}`}
          onClick={() => setMode("basic")}
        >
          Basic
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "scientific"}
          className={`qmc-toggle-btn${mode === "scientific" ? " active" : ""}`}
          onClick={() => setMode("scientific")}
        >
          Scientific
        </button>
      </div>

      <div className="qmc-card">
        <div className="qmc-display">{expr || "0"}</div>
        {result !== null && <div className="qmc-result">= {result}</div>}

        <div className="qmc-grid">
          {mode === "scientific" &&
            SCI_FUNCS.map((b) => (
              <button key={b.label} type="button" className="qmc-btn qmc-fn" onClick={() => insert(b.insert)}>
                {b.label}
              </button>
            ))}

          <button type="button" className="qmc-btn qmc-clear" onClick={clear}>
            AC
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("(")}>
            (
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert(")")}>
            )
          </button>
          <button type="button" className="qmc-btn qmc-del" onClick={del}>
            ⌫
          </button>

          <button type="button" className="qmc-btn" onClick={() => insert("7")}>
            7
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("8")}>
            8
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("9")}>
            9
          </button>
          <button type="button" className="qmc-btn qmc-op" onClick={() => insert("/")}>
            ÷
          </button>

          <button type="button" className="qmc-btn" onClick={() => insert("4")}>
            4
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("5")}>
            5
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("6")}>
            6
          </button>
          <button type="button" className="qmc-btn qmc-op" onClick={() => insert("*")}>
            ×
          </button>

          <button type="button" className="qmc-btn" onClick={() => insert("1")}>
            1
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("2")}>
            2
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert("3")}>
            3
          </button>
          <button type="button" className="qmc-btn qmc-op" onClick={() => insert("-")}>
            −
          </button>

          <button type="button" className="qmc-btn" onClick={() => insert("0")}>
            0
          </button>
          <button type="button" className="qmc-btn" onClick={() => insert(".")}>
            .
          </button>
          <button type="button" className="qmc-btn qmc-eq" onClick={equals}>
            =
          </button>
          <button type="button" className="qmc-btn qmc-op" onClick={() => insert("+")}>
            +
          </button>
        </div>
      </div>

      {info && (
        <div className="qmc-info">
          <div className="qmc-info-title">{info.title}</div>
          <div className="qmc-info-formula">{info.formula}</div>
          <p className="qmc-info-desc">{info.description}</p>
          <div className="qmc-info-related">
            {info.related.map((r) => (
              <a key={r.href} href={r.href} className="qmc-related-link">
                <span>{r.icon}</span>
                <span>{r.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
