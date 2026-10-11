"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { ChevronDown, Delete } from "lucide-react";
import { CalcError, canAppendDecimal, evaluate, formatResult, type AngleMode } from "@/lib/expr";
import { cn } from "@/lib/cn";

type KeyKind = "num" | "op" | "fn" | "util" | "eq" | "mem";
type Key = { label: string; aria?: string; kind: KeyKind; insert?: string; action?: () => void; className?: string };

const FUNC_INSERTS = new Set(["sin(", "cos(", "tan(", "asin(", "acos(", "atan(", "log(", "ln("]);
const OPERATORS = new Set(["+", "−", "×", "÷", "^", "²", "!", "%"]);

/** Hero scientific calculator: live expression preview, Deg/Rad, memory, keyboard input. */
export function ScientificCalculator() {
  // Expression is a token list so Backspace removes "sin(" as one unit.
  const [tokens, setTokens] = useState<string[]>([]);
  const [angle, setAngle] = useState<AngleMode>("deg");
  const [ans, setAns] = useState(0);
  const [memory, setMemory] = useState<number | null>(null);
  const [done, setDone] = useState<{ expr: string; value: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Phones: scientific keys start collapsed so the hero isn't ~1000px tall.
  // From md up they're always shown (the toggle and the hidden state are md:-overridden).
  const [sciOpen, setSciOpen] = useState(false);

  const expr = tokens.join("");
  const preview = useMemo(() => {
    if (!expr) return null;
    try {
      return formatResult(evaluate(expr, { angle, ans, mem: memory ?? 0 }));
    } catch {
      return null;
    }
  }, [expr, angle, ans, memory]);

  function currentValue(): number | null {
    if (done) return ans;
    try {
      return expr ? evaluate(expr, { angle, ans, mem: memory ?? 0 }) : null;
    } catch {
      return null;
    }
  }

  function insert(t: string) {
    setError(null);
    if (done) {
      // After "=", an operator continues from the answer; anything else starts fresh.
      setTokens(OPERATORS.has(t) ? ["Ans", t] : [t]);
      setDone(null);
      return;
    }
    if (t === "." && !canAppendDecimal(tokens.join(""))) return;
    setTokens((prev) => [...prev, t]);
  }

  function equals() {
    if (!expr) return;
    try {
      const v = evaluate(expr, { angle, ans, mem: memory ?? 0 });
      if (!Number.isFinite(v)) throw new CalcError("Overflow");
      setAns(v);
      setDone({ expr, value: formatResult(v) });
      setTokens([]);
      setError(null);
    } catch (e) {
      setError(e instanceof CalcError ? e.message : "Error");
    }
  }

  function clearAll() {
    setTokens([]);
    setDone(null);
    setError(null);
  }

  function backspace() {
    setError(null);
    if (done) {
      setDone(null);
      return;
    }
    setTokens((prev) => prev.slice(0, -1));
  }

  function negate() {
    // Toggle a leading minus on the whole expression (or the last answer).
    if (done) {
      setTokens(["−", "(", "Ans", ")"]);
      setDone(null);
    } else if (tokens[0] === "−" && tokens[1] === "(" && tokens[tokens.length - 1] === ")") {
      setTokens(tokens.slice(2, -1));
    } else if (tokens.length) {
      setTokens(["−", "(", ...tokens, ")"]);
    } else {
      setTokens(["−"]);
    }
  }

  function memAdd(sign: 1 | -1) {
    const v = currentValue();
    if (v === null || !Number.isFinite(v)) return;
    setMemory((m) => (m ?? 0) + sign * v);
  }

  function memRecall() {
    if (memory !== null) insert("MR");
  }

  const sci: Key[] = [
    { label: "sin", kind: "fn", insert: "sin(" },
    { label: "cos", kind: "fn", insert: "cos(" },
    { label: "tan", kind: "fn", insert: "tan(" },
    { label: "ln", kind: "fn", insert: "ln(" },
    { label: "log", kind: "fn", insert: "log(" },
    { label: "sin⁻¹", aria: "arcsine", kind: "fn", insert: "asin(" },
    { label: "cos⁻¹", aria: "arccosine", kind: "fn", insert: "acos(" },
    { label: "tan⁻¹", aria: "arctangent", kind: "fn", insert: "atan(" },
    { label: "π", aria: "pi", kind: "fn", insert: "π" },
    { label: "e", aria: "Euler's number", kind: "fn", insert: "e" },
    { label: "xʸ", aria: "power", kind: "fn", insert: "^" },
    { label: "x²", aria: "square", kind: "fn", insert: "²" },
    { label: "√", aria: "square root", kind: "fn", insert: "√" },
    { label: "n!", aria: "factorial", kind: "fn", insert: "!" },
    { label: "%", aria: "percent", kind: "fn", insert: "%" },
    { label: "(", kind: "fn", insert: "(" },
    { label: ")", kind: "fn", insert: ")" },
    { label: "Ans", aria: "Ans, last answer", kind: "fn", insert: "Ans" },
    { label: "±", aria: "negate", kind: "fn", action: negate },
    { label: "EXP", aria: "EXP, times ten to the power", kind: "fn", action: () => (insert("×"), insert("10"), insert("^")) },
  ];

  const pad: Key[] = [
    { label: "MC", aria: "MC, memory clear", kind: "mem", action: () => setMemory(null) },
    { label: "MR", aria: "MR, memory recall", kind: "mem", action: memRecall },
    { label: "M+", aria: "M+, memory add", kind: "mem", action: () => memAdd(1) },
    { label: "M−", aria: "M−, memory subtract", kind: "mem", action: () => memAdd(-1) },
    { label: "AC", aria: "AC, all clear", kind: "util", action: clearAll },
    { label: "⌫", aria: "backspace", kind: "util", action: backspace },
    { label: "÷", aria: "divide", kind: "op", insert: "÷" },
    { label: "×", aria: "multiply", kind: "op", insert: "×" },
    ...["7", "8", "9"].map((d) => ({ label: d, kind: "num" as const, insert: d })),
    { label: "−", aria: "minus", kind: "op", insert: "−" },
    ...["4", "5", "6"].map((d) => ({ label: d, kind: "num" as const, insert: d })),
    { label: "+", aria: "plus", kind: "op", insert: "+" },
    ...["1", "2", "3"].map((d) => ({ label: d, kind: "num" as const, insert: d })),
    { label: "=", aria: "equals", kind: "eq", action: equals, className: "row-span-2" },
    { label: "0", kind: "num", insert: "0", className: "col-span-2" },
    { label: ".", aria: "decimal point", kind: "num", insert: "." },
  ];

  function press(k: Key) {
    if (k.action) k.action();
    else if (k.insert) insert(k.insert);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    const map: Record<string, string> = { "*": "×", "/": "÷", "-": "−", "+": "+", "^": "^", "(": "(", ")": ")", ".": ".", "%": "%", "!": "!" };
    if (/^\d$/.test(e.key)) insert(e.key);
    else if (map[e.key]) insert(map[e.key]);
    else if (e.key === "Enter" || e.key === "=") equals();
    else if (e.key === "Backspace") backspace();
    else if (e.key === "Escape") clearAll();
    else if (e.key === "p") insert("π");
    else if (e.key === "e") insert("e");
    else if (e.key === "s") insert("sin(");
    else if (e.key === "c") insert("cos(");
    else if (e.key === "t") insert("tan(");
    else if (e.key === "l") insert("ln(");
    else return;
    e.preventDefault();
  }

  const keyBase =
    "flex min-h-[48px] select-none items-center justify-center rounded-lg text-[15px] font-semibold transition-[background-color,transform] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 sm:min-h-[44px]";
  const keyStyle: Record<KeyKind, string> = {
    num: "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-700 text-lg",
    op: "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 text-xl",
    fn: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-700 text-sm",
    util: "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-900/60",
    mem: "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 dark:bg-slate-800/60 dark:text-slate-400 dark:hover:bg-slate-700 text-sm",
    eq: "bg-blue-600 text-white text-2xl shadow-sm hover:bg-blue-700",
  };

  const mainLine = error ? error : done ? done.value : preview ?? (expr ? "" : "0");
  const topLine = done ? `${done.expr} =` : expr || " ";

  return (
    <div
      role="group"
      aria-label="Scientific calculator"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="fx rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Display */}
      <div className="rounded-xl bg-slate-900 px-4 py-3 text-right text-white dark:bg-black">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-slate-400">
          <div className="flex items-center gap-2">
            <span className={cn("rounded bg-slate-700 px-1.5 py-0.5 uppercase tracking-wide text-slate-200", !sciOpen && "hidden md:inline")}>
              {angle}
            </span>
            {memory !== null ? (
              <span className="rounded bg-blue-600/80 px-1.5 py-0.5 text-white" title={`Memory: ${formatResult(memory)}`}>
                M
              </span>
            ) : null}
          </div>
          <div className="min-w-0 truncate font-mono text-sm text-slate-300">
            {topLine}
          </div>
        </div>
        <output
          aria-live="polite"
          className={cn(
            "mt-1 block min-h-[3rem] truncate font-mono text-4xl font-bold tabular-nums tracking-tight sm:text-5xl",
            error ? "text-rose-400 text-2xl sm:text-3xl leading-[3rem]" : !done && preview ? "text-slate-300" : "text-white",
          )}
        >
          {mainLine}
        </output>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1.15fr]">
        {/* Scientific keys (below the number pad on phones) */}
        <div id="sci-keys" className={cn("order-last md:order-none md:block", !sciOpen && "hidden")}>
          <div role="radiogroup" aria-label="Angle unit" className="mb-2 grid grid-cols-2 gap-1 rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
            {(["deg", "rad"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={angle === m}
                onClick={() => setAngle(m)}
                className={cn(
                  "min-h-[48px] rounded-md text-sm font-semibold sm:min-h-[36px]",
                  angle === m ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white" : "text-slate-600 dark:text-slate-400",
                )}
              >
                {m === "deg" ? "Deg" : "Rad"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {sci.map((k) => (
              <button
                key={k.label}
                type="button"
                aria-label={k.aria}
                onClick={() => press(k)}
                className={cn(keyBase, keyStyle[k.kind], k.className, FUNC_INSERTS.has(k.insert ?? "") && "italic")}
              >
                {k.label === "⌫" ? <Delete aria-hidden className="size-5" /> : k.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-4 gap-1.5">
          {pad.map((k) => (
            <button
              key={k.label}
              type="button"
              aria-label={k.aria}
              onClick={() => press(k)}
              className={cn(keyBase, keyStyle[k.kind], k.className)}
            >
              {k.label === "⌫" ? <Delete aria-hidden className="size-5" /> : k.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={sciOpen}
          aria-controls="sci-keys"
          onClick={() => setSciOpen((o) => !o)}
          className="order-[99] flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-slate-100 text-sm font-semibold text-slate-700 hover:bg-slate-200 md:hidden dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Scientific <ChevronDown aria-hidden className={cn("size-4 transition-transform", sciOpen && "rotate-180")} />
        </button>
      </div>
    </div>
  );
}
