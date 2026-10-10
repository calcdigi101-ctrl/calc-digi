"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { CornerDownLeft, Search, X } from "lucide-react";
import { CATEGORIES } from "@/lib/calculators";
import { cn } from "@/lib/cn";

type Item = { name: string; icon: string; href: string; category: string; haystack: string };

// The same calculator can be listed under two categories; keep the first.
const ITEMS: Item[] = (() => {
  const seen = new Set<string>();
  const out: Item[] = [];
  for (const cat of CATEGORIES) {
    for (const c of cat.calculators) {
      if (seen.has(c.name)) continue;
      seen.add(c.name);
      out.push({ name: c.name, icon: c.icon, href: c.href, category: cat.label, haystack: `${c.name} ${cat.label}`.toLowerCase() });
    }
  }
  return out;
})();

const POPULAR = ["BMI Calculator", "Mortgage Calculator", "Calorie Calculator", "Loan Calculator", "Percentage Calculator", "Age Calculator"];

/** Rank: name prefix > word prefix > substring > all words present. */
function search(q: string): Item[] {
  const query = q.trim().toLowerCase();
  if (!query) return POPULAR.map((n) => ITEMS.find((i) => i.name === n)).filter((i): i is Item => !!i);
  const words = query.split(/\s+/);
  const scored: [number, Item][] = [];
  for (const it of ITEMS) {
    const name = it.name.toLowerCase();
    let score = -1;
    if (name.startsWith(query)) score = 0;
    else if (name.split(/[\s-]+/).some((w) => w.startsWith(query))) score = 1;
    else if (name.includes(query)) score = 2;
    else if (words.every((w) => it.haystack.includes(w))) score = 3;
    if (score >= 0) scored.push([score, it]);
  }
  return scored.sort((a, b) => a[0] - b[0] || a[1].name.length - b[1].name.length).slice(0, 12).map(([, it]) => it);
}

/** Search trigger that looks like a field, plus a ⌘K / Ctrl+K / "/" command palette over every calculator. */
export function SearchPalette({ total }: { total: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(true);
  const results = useMemo(() => search(query), [query]);

  function open(initial = "") {
    setQuery(initial);
    setActive(0);
    dialogRef.current?.showModal();
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    // Target of the homepage's WebSite SearchAction (/?q=...).
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) open(q);
    function onKey(e: globalThis.KeyboardEvent) {
      // Already handled, e.g. "/" typed as divide on the hero calculator.
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (dialogRef.current?.open) dialogRef.current.close();
        else open();
      } else if (e.key === "/" && !typing && !dialogRef.current?.open) {
        e.preventDefault();
        open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function onInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      window.location.href = results[active].href;
    }
  }

  return (
    <div className="fx">
      <button
        type="button"
        onClick={() => open()}
        className="group flex min-h-[52px] w-full items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 text-left text-slate-500 shadow-sm transition-colors hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
        aria-haspopup="dialog"
      >
        <Search aria-hidden className="size-5 shrink-0 text-slate-400 group-hover:text-blue-600" />
        <span className="flex-1 truncate text-base">Search {total}+ calculators…</span>
        <kbd className="hidden shrink-0 rounded-md border border-slate-300 bg-slate-50 px-2 py-0.5 font-sans text-xs font-semibold text-slate-500 sm:inline dark:border-slate-700 dark:bg-slate-800">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search calculators"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="fx m-0 mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      >
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <Search aria-hidden className="size-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Try “mortgage”, “bmi”, “fraction”…"
            aria-label="Search calculators"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `palette-opt-${active}` : undefined}
            role="combobox"
            aria-expanded="true"
            autoComplete="off"
            className="min-h-[56px] flex-1 border-0 bg-transparent text-base outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close search"
            className="flex size-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        <p className="px-4 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {query.trim() ? `${results.length ? results.length : "No"} result${results.length === 1 ? "" : "s"}` : "Popular"}
        </p>
        <ul ref={listRef} id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.map((r, i) => (
            <li key={r.href} id={`palette-opt-${i}`} role="option" aria-selected={i === active} data-index={i}>
              <a
                href={r.href}
                onMouseMove={() => setActive(i)}
                className={cn(
                  "flex min-h-[48px] items-center gap-3 rounded-lg px-3 py-2",
                  i === active ? "bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-100" : "text-slate-800 dark:text-slate-200",
                )}
              >
                <span aria-hidden className="text-lg">
                  {r.icon}
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{r.name}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">{r.category}</span>
                </span>
                {i === active ? <CornerDownLeft aria-hidden className="size-4 text-blue-600" /> : null}
              </a>
            </li>
          ))}
          {query.trim() && results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-slate-500">
              No calculators match “{query}”. <a className="font-medium text-blue-700 underline dark:text-blue-400" href="/calculators">Browse all</a>
            </li>
          ) : null}
        </ul>
        <div className="hidden items-center gap-4 border-t border-slate-200 px-4 py-2 text-xs text-slate-500 sm:flex dark:border-slate-800">
          <span><kbd className="font-sans font-semibold">↑↓</kbd> navigate</span>
          <span><kbd className="font-sans font-semibold">Enter</kbd> open</span>
          <span><kbd className="font-sans font-semibold">Esc</kbd> close</span>
        </div>
      </dialog>
    </div>
  );
}
