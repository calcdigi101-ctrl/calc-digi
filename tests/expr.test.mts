import { test } from "node:test";
import assert from "node:assert/strict";
import { CalcError, canAppendDecimal, evaluate, formatResult } from "../lib/expr.ts";

const deg = { angle: "deg" as const };
const rad = { angle: "rad" as const };
const grad = { angle: "grad" as const };
const calc = (src: string, opts = deg) => formatResult(evaluate(src, opts));
const errorOf = (src: string, opts = deg) => {
  try {
    evaluate(src, opts);
  } catch (e) {
    assert.ok(e instanceof CalcError, `expected CalcError, got ${e}`);
    return e.message;
  }
  assert.fail(`"${src}" should not evaluate`);
};

test("operator precedence: 2+3×4 = 14", () => {
  assert.equal(calc("2+3×4"), "14");
});

test("1÷0 reports division by zero", () => {
  assert.equal(errorOf("1÷0"), "Cannot divide by 0");
});

test("leading decimals: .1+.2 = 0.3 (no float noise)", () => {
  assert.equal(calc(".1+.2"), "0.3");
});

test("sin(30) in degrees = 0.5", () => {
  assert.equal(calc("sin(30)"), "0.5");
});

test("2^10 = 1024", () => {
  assert.equal(calc("2^10"), "1024");
});

test("double decimal points are rejected, not evaluated", () => {
  assert.equal(errorOf("1..6%"), "Error");
  assert.equal(errorOf("1.2.3"), "Error");
  assert.equal(errorOf("1..6"), "Error");
});

test("the keypad blocks a second decimal point in the same number", () => {
  assert.equal(canAppendDecimal("1"), true);
  assert.equal(canAppendDecimal("1."), false);
  assert.equal(canAppendDecimal("1.5"), false);
  assert.equal(canAppendDecimal("1.5+2"), true);
  assert.equal(canAppendDecimal("1.5×"), true);
  assert.equal(canAppendDecimal(""), true);
});

test("unbalanced parentheses", () => {
  assert.match(errorOf("2+3)"), /Unexpected \)/);
  assert.match(errorOf("(2+3))×4"), /Unexpected \)/);
  assert.equal(errorOf("()"), "Unexpected )");
  assert.equal(calc("(2+3"), "5");
  assert.equal(calc("2×(3+(4"), "14");
});

test("other malformed input is an error, not a garbage result", () => {
  for (const src of ["2+", "×3", "sin", "√", "2^"]) errorOf(src);
});

test("trig reciprocal functions: cot, sec, csc in degrees", () => {
  assert.equal(calc("cot(45)"), "1");
  assert.equal(calc("sec(60)"), "2");
  assert.equal(calc("csc(30)"), "2");
  assert.equal(errorOf("sec(90)"), "Undefined");
  assert.equal(errorOf("csc(0)"), "Undefined");
});

test("inverse trig functions: asin, acos, atan in degrees", () => {
  assert.equal(calc("asin(0.5)"), "30");
  assert.equal(calc("acos(0.5)"), "60");
  assert.equal(calc("atan(1)"), "45");
  assert.equal(errorOf("asin(2)"), "Domain error");
});

test("hyperbolic and inverse hyperbolic functions", () => {
  assert.equal(calc("sinh(0)"), "0");
  assert.equal(calc("cosh(0)"), "1");
  assert.equal(calc("tanh(0)"), "0");
  assert.equal(calc("asinh(0)"), "0");
  assert.equal(calc("acosh(1)"), "0");
  assert.equal(calc("atanh(0)"), "0");
});

test("logarithms: log10, log2, ln, logb", () => {
  assert.equal(calc("log(1000)"), "3");
  assert.equal(calc("log2(8)"), "3");
  assert.equal(calc("ln(e)"), "1");
  assert.equal(calc("logb(81, 3)"), "4");
  assert.equal(errorOf("log(0)"), "Domain error");
});

test("combinatorics & number theory: nPr, nCr, gcd, lcm, mod", () => {
  assert.equal(calc("nPr(6, 2)"), "30");
  assert.equal(calc("nCr(6, 2)"), "15");
  assert.equal(calc("gcd(48, 18)"), "6");
  assert.equal(calc("lcm(12, 15)"), "60");
  assert.equal(calc("mod(29, 6)"), "5");
});

test("roots and powers: cbrt, root, sqr, cube, inv", () => {
  assert.equal(calc("cbrt(27)"), "3");
  assert.equal(calc("root(16, 4)"), "2");
  assert.equal(calc("sqr(5)"), "25");
  assert.equal(calc("cube(3)"), "27");
  assert.equal(calc("inv(4)"), "0.25");
});

test("algebra & rounding: abs, floor, ceil, round, sign", () => {
  assert.equal(calc("abs(-42)"), "42");
  assert.equal(calc("floor(3.8)"), "3");
  assert.equal(calc("ceil(3.2)"), "4");
  assert.equal(calc("round(3.6)"), "4");
  assert.equal(calc("sign(-99)"), "−1");
});

test("constants evaluation: pi, e, phi, c, g", () => {
  assert.equal(calc("2π"), "6.28318530718");
  assert.equal(calc("c"), "299792458");
  assert.equal(calc("g"), "9.80665");
  assert.equal(calc("round(φ × 1000)"), "1618");
});

test("angle mode grad: sin(100) = 1 in grad", () => {
  assert.equal(calc("sin(100)", grad), "1");
  assert.equal(calc("cos(100)", grad), "0");
  assert.equal(calc("tan(50)", grad), "1");
});
