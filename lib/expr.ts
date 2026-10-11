/**
 * Safe recursive-descent evaluator for the scientific calculator (no eval/Function).
 *
 * Grammar (highest binding last):
 *   expr    := term (("+" | "−") term)*
 *   term    := unary (("×" | "÷") unary | <implicit ×> unary)*
 *   unary   := ("−" | "+") unary | power
 *   power   := postfix ("^" unary)?          right-associative
 *   postfix := primary ("²" | "!" | "%")*
 *   primary := number | π | e | Ans | MR | fn "(" expr ")" | "√" unary | "(" expr ")"
 * Missing closing parentheses at the end are tolerated (auto-closed); an extra
 * ")" or a malformed number such as "1..6" or "1.2.3" is an error.
 */

export type AngleMode = "deg" | "rad";

const FUNCS = ["asin", "acos", "atan", "sin", "cos", "tan", "log", "ln"] as const;
type Fn = (typeof FUNCS)[number];

const TOKEN_RE = /\s*(\d+\.?\d*|\.\d+|asin|acos|atan|sin|cos|tan|log|ln|Ans|MR|π|e|√|²|\^|[+\-−×÷*/()!%])/y;

export class CalcError extends Error {}

function tokenize(src: string): string[] {
  const out: string[] = [];
  TOKEN_RE.lastIndex = 0;
  let pos = 0;
  while (pos < src.length) {
    if (/^\s*$/.test(src.slice(pos))) break;
    TOKEN_RE.lastIndex = pos;
    const m = TOKEN_RE.exec(src);
    if (!m) throw new CalcError("Unexpected input");
    let t = m[1];
    if (t === "-") t = "−";
    else if (t === "*") t = "×";
    else if (t === "/") t = "÷";
    // Two numbers back to back ("1." then ".6") means a doubled decimal point.
    if (/^[\d.]/.test(t) && out.length && /^[\d.]/.test(out[out.length - 1])) throw new CalcError("Error");
    out.push(t);
    pos = TOKEN_RE.lastIndex;
  }
  return out;
}

/** False when the number being typed at the end of `expr` already has a decimal point. */
export function canAppendDecimal(expr: string): boolean {
  return !/\d*\.\d*$/.test(expr);
}

function factorial(n: number) {
  if (!Number.isInteger(n) || n < 0) throw new CalcError("Factorial needs a whole number ≥ 0");
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

export function evaluate(src: string, opts: { angle: AngleMode; ans?: number; mem?: number }): number {
  const tokens = tokenize(src);
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];
  const toRad = (x: number) => (opts.angle === "deg" ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (opts.angle === "deg" ? (x * 180) / Math.PI : x);

  const startsPrimary = (t: string | undefined) =>
    t !== undefined && (/^[\d.]/.test(t) || t === "π" || t === "e" || t === "Ans" || t === "MR" || t === "(" || t === "√" || (FUNCS as readonly string[]).includes(t));

  function applyFn(fn: Fn, x: number) {
    switch (fn) {
      case "sin":
        return Math.sin(toRad(x));
      case "cos":
        return Math.cos(toRad(x));
      case "tan": {
        // tan(90°) etc. is undefined; Math.tan would return ~1.6e16.
        if (opts.angle === "deg" && Math.abs(((x % 180) + 180) % 180 - 90) < 1e-12) throw new CalcError("Undefined");
        return Math.tan(toRad(x));
      }
      case "asin":
        if (x < -1 || x > 1) throw new CalcError("Domain error");
        return fromRad(Math.asin(x));
      case "acos":
        if (x < -1 || x > 1) throw new CalcError("Domain error");
        return fromRad(Math.acos(x));
      case "atan":
        return fromRad(Math.atan(x));
      case "log":
        if (x <= 0) throw new CalcError("Domain error");
        return Math.log10(x);
      case "ln":
        if (x <= 0) throw new CalcError("Domain error");
        return Math.log(x);
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
    if (t === "π") return Math.PI;
    if (t === "e") return Math.E;
    if (t === "Ans") return opts.ans ?? 0;
    if (t === "MR") return opts.mem ?? 0;
    if (t === "√") {
      const x = unary();
      if (x < 0) throw new CalcError("Domain error");
      return Math.sqrt(x);
    }
    if (t === "(") {
      const v = expr();
      closeParen();
      return v;
    }
    if ((FUNCS as readonly string[]).includes(t)) {
      if (next() !== "(") throw new CalcError("Expected (");
      const v = expr();
      closeParen();
      return applyFn(t as Fn, v);
    }
    throw new CalcError("Unexpected " + t);
  }

  function postfix(): number {
    let v = primary();
    for (;;) {
      const t = peek();
      if (t === "²") (next(), (v = v * v));
      else if (t === "!") (next(), (v = factorial(v)));
      else if (t === "%") (next(), (v = v / 100));
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
    if (t === "−") return (next(), -unary());
    if (t === "+") return (next(), unary());
    return power();
  }

  function term(): number {
    let v = unary();
    for (;;) {
      const t = peek();
      if (t === "×") (next(), (v *= unary()));
      else if (t === "÷") {
        next();
        const d = unary();
        if (d === 0) throw new CalcError("Cannot divide by 0");
        v /= d;
      } else if (startsPrimary(t)) v *= unary();
      else return v;
    }
  }

  function expr(): number {
    let v = term();
    for (;;) {
      const t = peek();
      if (t === "+") (next(), (v += term()));
      else if (t === "−") (next(), (v -= term()));
      else return v;
    }
  }

  if (tokens.length === 0) throw new CalcError("Empty");
  const v = expr();
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
