import { test } from "node:test";
import assert from "node:assert/strict";
import { CalcError, canAppendDecimal, evaluate, formatResult } from "../lib/expr.ts";

const deg = { angle: "deg" as const };
const calc = (src: string) => formatResult(evaluate(src, deg));
const errorOf = (src: string) => {
  try {
    evaluate(src, deg);
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
  // A stray closing parenthesis is an error...
  assert.match(errorOf("2+3)"), /Unexpected \)/);
  assert.match(errorOf("(2+3))×4"), /Unexpected \)/);
  // ...an empty group is an error...
  assert.equal(errorOf("()"), "Unexpected )");
  // ...and missing closing parentheses at the end are auto-closed.
  assert.equal(calc("(2+3"), "5");
  assert.equal(calc("2×(3+(4"), "14");
});

test("other malformed input is an error, not a garbage result", () => {
  for (const src of ["2+", "×3", "sin", "√", "2^"]) errorOf(src);
});
