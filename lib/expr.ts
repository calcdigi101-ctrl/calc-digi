/**
 * Safe recursive-descent evaluator for the scientific calculator (no eval/Function).
 *
 * Full mathematical grammar with support for:
 *   - Basic arithmetic: +, −, ×, ÷, ^, %
 *   - Trigonometric & hyperbolic: sin, cos, tan, cot, sec, csc, sinh, cosh, tanh, coth, sech, csch
 *   - Inverse trig & hyperbolic: asin, acos, atan, acot, asec, acsc, asinh, acosh, atanh, acoth, asech, acsch
 *   - Logarithms & exponents: ln, log, log10, log2, exp
 *   - Roots & powers: sqrt (√), cbrt, sqr (²), cube (³), inv
 *   - Algebra & rounding: abs, floor, ceil, round, sign, fact (!)
 *   - Two-argument functions: mod(a, b), gcd(a, b), lcm(a, b), nPr(n, r), nCr(n, r), root(x, y), logb(x, b), randInt(a, b)
 *   - Zero-argument functions: rand()
 *   - Universal constants: π, e, φ (phi), c, h, g, NA, R, G, kB, Ans, MR
 *   - Angle modes: deg, rad, grad
 *   - Implicit multiplication (e.g. 2π, 2(3+4), 5sin(30))
 *   - Tolerant auto-closing of missing closing parentheses
 */

export type AngleMode = "deg" | "rad" | "grad";

export class CalcError extends Error {}

export const CONSTANTS: Record<string, number> = {
  "π": Math.PI,
  "pi": Math.PI,
  "e": Math.E,
  "φ": (1 + Math.sqrt(5)) / 2,
  "phi": (1 + Math.sqrt(5)) / 2,
  "c": 299792458,
  "h": 6.62607015e-34,
  "g": 9.80665,
  "NA": 6.02214076e23,
  "R": 8.314462618,
  "G": 6.67430e-11,
  "kB": 1.380649e-23,
};

export const ONE_ARG_FUNCS = new Set([
  "sin", "cos", "tan", "cot", "sec", "csc",
  "asin", "acos", "atan", "acot", "asec", "acsc",
  "sinh", "cosh", "tanh", "coth", "sech", "csch",
  "asinh", "acosh", "atanh", "acoth", "asech", "acsch",
  "ln", "log", "log10", "log2", "exp",
  "sqrt", "cbrt", "sqr", "cube", "inv",
  "abs", "floor", "ceil", "round", "sign", "fact"
]);

export const TWO_ARG_FUNCS = new Set([
  "mod", "gcd", "lcm", "nPr", "nCr", "root", "logb", "randInt"
]);

export const ALL_FUNCS = new Set([...ONE_ARG_FUNCS, ...TWO_ARG_FUNCS, "rand"]);

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new CalcError("Factorial needs a whole number ≥ 0");
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(Math.round(a * b)) / gcd(a, b);
}

function nPr(n: number, r: number): number {
  n = Math.round(n);
  r = Math.round(r);
  if (n < 0 || r < 0 || r > n) throw new CalcError("nPr requires 0 ≤ r ≤ n");
  let res = 1;
  for (let i = 0; i < r; i++) res *= (n - i);
  return res;
}

function nCr(n: number, r: number): number {
  n = Math.round(n);
  r = Math.round(r);
  if (n < 0 || r < 0 || r > n) throw new CalcError("nCr requires 0 ≤ r ≤ n");
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;
  let res = 1;
  for (let i = 1; i <= r; i++) res = (res * (n - i + 1)) / i;
  return Math.round(res);
}

function toRad(x: number, angle: AngleMode): number {
  if (angle === "deg") return (x * Math.PI) / 180;
  if (angle === "grad") return (x * Math.PI) / 200;
  return x;
}

function fromRad(x: number, angle: AngleMode): number {
  if (angle === "deg") return (x * 180) / Math.PI;
  if (angle === "grad") return (x * 200) / Math.PI;
  return x;
}

function cleanSin(x: number, angle: AngleMode): number {
  if (angle === "deg") {
    const norm = ((x % 360) + 360) % 360;
    if (norm === 0 || norm === 180) return 0;
    if (norm === 90) return 1;
    if (norm === 270) return -1;
    if (norm === 30 || norm === 150) return 0.5;
    if (norm === 210 || norm === 330) return -0.5;
  } else if (angle === "grad") {
    const norm = ((x % 400) + 400) % 400;
    if (norm === 0 || norm === 200) return 0;
    if (norm === 100) return 1;
    if (norm === 300) return -1;
  }
  const rad = toRad(x, angle);
  const val = Math.sin(rad);
  return Math.abs(val) < 1e-15 ? 0 : val;
}

function cleanCos(x: number, angle: AngleMode): number {
  if (angle === "deg") {
    const norm = ((x % 360) + 360) % 360;
    if (norm === 90 || norm === 270) return 0;
    if (norm === 0) return 1;
    if (norm === 180) return -1;
    if (norm === 60 || norm === 300) return 0.5;
    if (norm === 120 || norm === 240) return -0.5;
  } else if (angle === "grad") {
    const norm = ((x % 400) + 400) % 400;
    if (norm === 100 || norm === 300) return 0;
    if (norm === 0) return 1;
    if (norm === 200) return -1;
  }
  const rad = toRad(x, angle);
  const val = Math.cos(rad);
  return Math.abs(val) < 1e-15 ? 0 : val;
}

function cleanTan(x: number, angle: AngleMode): number {
  if (angle === "deg") {
    const norm = ((x % 360) + 360) % 360;
    if (norm === 90 || norm === 270) throw new CalcError("Undefined");
    if (norm === 0 || norm === 180) return 0;
    if (norm === 45 || norm === 225) return 1;
    if (norm === 135 || norm === 315) return -1;
  } else if (angle === "grad") {
    const norm = ((x % 400) + 400) % 400;
    if (norm === 100 || norm === 300) throw new CalcError("Undefined");
    if (norm === 0 || norm === 200) return 0;
    if (norm === 50 || norm === 250) return 1;
    if (norm === 150 || norm === 350) return -1;
  }
  const c = cleanCos(x, angle);
  if (Math.abs(c) < 1e-15) throw new CalcError("Undefined");
  const val = cleanSin(x, angle) / c;
  return Math.abs(val) < 1e-15 ? 0 : val;
}

const funcNamesPattern = Array.from(ALL_FUNCS).sort((a, b) => b.length - a.length).join("|");
const constNamesPattern = Object.keys(CONSTANTS).sort((a, b) => b.length - a.length).join("|");

const TOKEN_RE = new RegExp(
  `\\s*(\\d+\\.?\\d*(?:[eE][+-]?\\d+)?|\\.\\d+(?:[eE][+-]?\\d+)?|${funcNamesPattern}|${constNamesPattern}|Ans|MR|√|²|³|\\^|[+\\-−×÷*/()!%,])`,
  "y"
);

function tokenize(src: string): string[] {
  const out: string[] = [];
  TOKEN_RE.lastIndex = 0;
  let pos = 0;
  while (pos < src.length) {
    if (/^\s*$/.test(src.slice(pos))) break;
    TOKEN_RE.lastIndex = pos;
    const m = TOKEN_RE.exec(src);
    if (!m) throw new CalcError("Unexpected input near '" + src.slice(pos, pos + 10) + "'");
    let t = m[1];
    if (t === "-") t = "−";
    else if (t === "*") t = "×";
    else if (t === "/") t = "÷";

    if (/^[\d.]/.test(t) && out.length && /^[\d.]/.test(out[out.length - 1])) {
      throw new CalcError("Error");
    }
    out.push(t);
    pos = TOKEN_RE.lastIndex;
  }
  return out;
}

/** False when the number being typed at the end of `expr` already has a decimal point. */
export function canAppendDecimal(expr: string): boolean {
  return !/\d*\.\d*$/.test(expr);
}

export function evaluate(src: string, opts: { angle: AngleMode; ans?: number; mem?: number }): number {
  const tokens = tokenize(src);
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];
  const angle = opts.angle || "deg";

  const startsPrimary = (t: string | undefined): boolean => {
    if (t === undefined) return false;
    if (/^[\d.]/.test(t)) return true;
    if (CONSTANTS[t] !== undefined) return true;
    if (t === "Ans" || t === "MR" || t === "(" || t === "√") return true;
    if (ALL_FUNCS.has(t)) return true;
    return false;
  };

  function applyOneArg(fn: string, x: number): number {
    switch (fn) {
      case "sin": return cleanSin(x, angle);
      case "cos": return cleanCos(x, angle);
      case "tan": return cleanTan(x, angle);
      case "cot": {
        const t = cleanTan(x, angle);
        if (Math.abs(t) < 1e-15) throw new CalcError("Undefined");
        return 1 / t;
      }
      case "sec": {
        const c = cleanCos(x, angle);
        if (Math.abs(c) < 1e-15) throw new CalcError("Undefined");
        return 1 / c;
      }
      case "csc": {
        const s = cleanSin(x, angle);
        if (Math.abs(s) < 1e-15) throw new CalcError("Undefined");
        return 1 / s;
      }
      case "asin":
        if (x < -1 || x > 1) throw new CalcError("Domain error");
        return fromRad(Math.asin(x), angle);
      case "acos":
        if (x < -1 || x > 1) throw new CalcError("Domain error");
        return fromRad(Math.acos(x), angle);
      case "atan":
        return fromRad(Math.atan(x), angle);
      case "acot":
        return fromRad(Math.atan(1 / x), angle);
      case "asec":
        if (Math.abs(x) < 1) throw new CalcError("Domain error");
        return fromRad(Math.acos(1 / x), angle);
      case "acsc":
        if (Math.abs(x) < 1) throw new CalcError("Domain error");
        return fromRad(Math.asin(1 / x), angle);
      case "sinh": return Math.sinh(x);
      case "cosh": return Math.cosh(x);
      case "tanh": return Math.tanh(x);
      case "coth":
        if (x === 0) throw new CalcError("Undefined");
        return 1 / Math.tanh(x);
      case "sech": return 1 / Math.cosh(x);
      case "csch":
        if (x === 0) throw new CalcError("Undefined");
        return 1 / Math.sinh(x);
      case "asinh": return Math.asinh(x);
      case "acosh":
        if (x < 1) throw new CalcError("Domain error");
        return Math.acosh(x);
      case "atanh":
        if (Math.abs(x) >= 1) throw new CalcError("Domain error");
        return Math.atanh(x);
      case "acoth":
        if (Math.abs(x) <= 1) throw new CalcError("Domain error");
        return Math.atanh(1 / x);
      case "asech":
        if (x <= 0 || x > 1) throw new CalcError("Domain error");
        return Math.acosh(1 / x);
      case "acsch":
        if (x === 0) throw new CalcError("Undefined");
        return Math.asinh(1 / x);
      case "ln":
        if (x <= 0) throw new CalcError("Domain error");
        return Math.log(x);
      case "log":
      case "log10":
        if (x <= 0) throw new CalcError("Domain error");
        return Math.log10(x);
      case "log2":
        if (x <= 0) throw new CalcError("Domain error");
        return Math.log2(x);
      case "exp": return Math.exp(x);
      case "sqrt":
        if (x < 0) throw new CalcError("Domain error");
        return Math.sqrt(x);
      case "cbrt": return Math.cbrt(x);
      case "sqr": return x * x;
      case "cube": return x * x * x;
      case "inv":
        if (x === 0) throw new CalcError("Cannot divide by 0");
        return 1 / x;
      case "abs": return Math.abs(x);
      case "floor": return Math.floor(x);
      case "ceil": return Math.ceil(x);
      case "round": return Math.round(x);
      case "sign": return Math.sign(x);
      case "fact": return factorial(x);
      default: throw new CalcError("Unknown function: " + fn);
    }
  }

  function applyTwoArg(fn: string, a: number, b: number): number {
    switch (fn) {
      case "mod":
        if (b === 0) throw new CalcError("Cannot divide by 0");
        return a % b;
      case "gcd": return gcd(a, b);
      case "lcm": return lcm(a, b);
      case "nPr": return nPr(a, b);
      case "nCr": return nCr(a, b);
      case "root":
        if (b === 0) throw new CalcError("Root degree cannot be 0");
        if (a < 0 && b % 2 === 0) throw new CalcError("Domain error");
        return a < 0 ? -Math.pow(-a, 1 / b) : Math.pow(a, 1 / b);
      case "logb":
        if (a <= 0 || b <= 0 || b === 1) throw new CalcError("Invalid log base or argument");
        return Math.log(a) / Math.log(b);
      case "randInt":
        return Math.floor(Math.random() * (Math.max(a, b) - Math.min(a, b) + 1)) + Math.min(a, b);
      default: throw new CalcError("Unknown function: " + fn);
    }
  }

  function closeParen() {
    if (peek() === ")") next();
    else if (peek() !== undefined) throw new CalcError("Missing )");
  }

  function primary(): number {
    const t = next();
    if (t === undefined) throw new CalcError("Incomplete expression");
    if (/^[\d.]/.test(t)) return Number(t);
    if (CONSTANTS[t] !== undefined) return CONSTANTS[t];
    if (t === "Ans") return opts.ans ?? 0;
    if (t === "MR") return opts.mem ?? 0;
    if (t === "√") {
      const x = unary();
      if (x < 0) throw new CalcError("Domain error");
      return Math.sqrt(x);
    }
    if (t === "(") {
      const v = parseExpr();
      closeParen();
      return v;
    }
    if (t === "rand") {
      if (peek() === "(") {
        next();
        closeParen();
      }
      return Math.random();
    }
    if (ONE_ARG_FUNCS.has(t)) {
      if (next() !== "(") throw new CalcError("Expected (");
      const v = parseExpr();
      closeParen();
      return applyOneArg(t, v);
    }
    if (TWO_ARG_FUNCS.has(t)) {
      if (next() !== "(") throw new CalcError("Expected (");
      const arg1 = parseExpr();
      if (next() !== ",") throw new CalcError("Expected ,");
      const arg2 = parseExpr();
      closeParen();
      return applyTwoArg(t, arg1, arg2);
    }
    throw new CalcError("Unexpected " + t);
  }

  function postfix(): number {
    let v = primary();
    for (;;) {
      const t = peek();
      if (t === "²") { next(); v = v * v; }
      else if (t === "³") { next(); v = v * v * v; }
      else if (t === "!") { next(); v = factorial(v); }
      else if (t === "%") { next(); v = v / 100; }
      else return v;
    }
  }

  function power(): number {
    const base = postfix();
    if (peek() === "^") {
      next();
      return Math.pow(base, unary());
    }
    return base;
  }

  function unary(): number {
    const t = peek();
    if (t === "−") { next(); return -unary(); }
    if (t === "+") { next(); return unary(); }
    return power();
  }

  function term(): number {
    let v = unary();
    for (;;) {
      const t = peek();
      if (t === "×") { next(); v *= unary(); }
      else if (t === "÷") {
        next();
        const d = unary();
        if (d === 0) throw new CalcError("Cannot divide by 0");
        v /= d;
      } else if (startsPrimary(t)) {
        v *= unary();
      } else {
        return v;
      }
    }
  }

  function parseExpr(): number {
    let v = term();
    for (;;) {
      const t = peek();
      if (t === "+") { next(); v += term(); }
      else if (t === "−") { next(); v -= term(); }
      else return v;
    }
  }

  if (tokens.length === 0) throw new CalcError("Empty");
  const v = parseExpr();
  if (i < tokens.length) throw new CalcError("Unexpected " + tokens[i]);
  if (Number.isNaN(v)) throw new CalcError("Error");
  return v;
}

/** Format for display: trims float noise (sin(180°) → 0) and switches to exponent form for extremes. */
export function formatResult(v: number): string {
  if (!Number.isFinite(v)) return v > 0 ? "∞" : v < 0 ? "−∞" : "Error";
  if (Math.abs(v) < 1e-12) return "0";
  const abs = Math.abs(v);
  if (abs >= 1e15 || abs < 1e-9) return v.toExponential(9).replace(/\.?0+e/, "e").replace("-", "−");
  const s = String(Number(v.toPrecision(12)));
  return s.replace("-", "−");
}
