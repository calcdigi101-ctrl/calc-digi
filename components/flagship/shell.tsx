import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export const card =
  "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 min-w-0 max-w-full";

/** Page frame for redesigned calculators: slate background, breadcrumb, H1. */
export function CalculatorPage({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="fx bg-slate-50 pb-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100 w-full max-w-full overflow-x-clip">
      <div className="mx-auto max-w-[1180px] px-3.5 pt-4 sm:px-6 sm:pt-6 w-full min-w-0">
        <nav aria-label="Breadcrumb" className="fx-no-print mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1">
                {i > 0 ? <ChevronRight aria-hidden className="size-3.5" /> : null}
                {c.href ? (
                  <a href={c.href} className="hover:text-emerald-600 hover:underline dark:hover:text-emerald-400">
                    {c.label}
                  </a>
                ) : (
                  <span aria-current="page" className="text-slate-700 dark:text-slate-300">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white break-words" style={{ fontFamily: "var(--font-sans)" }}>
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-400">{intro}</p>
        {children}
      </div>
    </main>
  );
}

/**
 * 12-column asymmetric tool grid: form in the left 7 columns, sticky result
 * card in the right 5. Stacks to a single column below lg.
 */
export function ToolGrid({ form, result }: { form: ReactNode; result: ReactNode }) {
  return (
    <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-start w-full max-w-full min-w-0 overflow-hidden">
      <div className="md:col-span-7 w-full max-w-full min-w-0">{form}</div>
      <div className="md:sticky md:top-24 md:col-span-5 w-full max-w-full min-w-0">{result}</div>
    </div>
  );
}

/** Long-form SEO content, always rendered below the interactive tool. */
export function Editorial({ children }: { children: ReactNode }) {
  return (
    <article
      className={cn(
        card,
        "mt-10 p-3.5 sm:p-8 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 w-full max-w-full min-w-0 overflow-hidden",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_h2:first-child]:mt-0",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base sm:[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 dark:[&_h3]:text-white",
        "[&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-6 [&_li]:mb-1",
        "[&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white",
        "[&_a]:font-medium [&_a]:text-emerald-600 [&_a]:underline-offset-2 hover:[&_a]:underline dark:[&_a]:text-emerald-400",
      )}
    >
      {children}
    </article>
  );
}

export function Formula({ children }: { children: ReactNode }) {
  return (
    <span className="block my-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 font-mono text-xs sm:text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 leading-relaxed [overflow-wrap:anywhere]">
      {children}
    </span>
  );
}

export function DataTable({ head, rows, highlight }: { head: string[]; rows: ReactNode[][]; highlight?: number }) {
  return (
    <div className="my-6 rounded-xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden w-full max-w-full min-w-0">
      {/* Mobile Swipe Hint */}
      <div className="flex items-center justify-between px-3.5 py-1.5 text-[11px] font-medium text-slate-500 bg-slate-50 border-b border-slate-200/70 dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 sm:hidden">
        <span className="flex items-center gap-1">
          <span>📊</span> Data Benchmarks
        </span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          Scroll table horizontally &rarr;
        </span>
      </div>
      <div className="overflow-x-auto scrollbar-thin w-full max-w-full min-w-0">
        <table className="w-full min-w-[560px] text-left text-sm border-collapse">
          <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
            <tr>
              {head.map((h, colIdx) => (
                <th
                  key={h}
                  scope="col"
                  className={cn(
                    "px-4 py-2.5 font-semibold",
                    colIdx === 0
                      ? "sticky left-0 z-20 bg-slate-100 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] dark:bg-slate-800 whitespace-nowrap min-w-[130px]"
                      : "whitespace-nowrap sm:whitespace-normal"
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.map((r, i) => {
              const isHigh = highlight === i;
              return (
                <tr
                  key={i}
                  className={cn(
                    isHigh && "bg-emerald-50 font-medium dark:bg-emerald-950/40"
                  )}
                >
                  {r.map((cell, j) => (
                    <td
                      key={j}
                      className={cn(
                        "px-4 py-2.5 tabular-nums text-slate-800 dark:text-slate-200",
                        j === 0 && (
                          isHigh
                            ? "sticky left-0 z-10 bg-emerald-50/95 font-semibold shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] dark:bg-emerald-950"
                            : "sticky left-0 z-10 bg-white font-semibold shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] dark:bg-slate-900"
                        ),
                        j > 0 && "whitespace-nowrap sm:whitespace-normal"
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex min-h-[48px] cursor-pointer items-center justify-between gap-4 px-4 py-3 font-semibold text-slate-900 dark:text-white">
            {it.q}
            <span aria-hidden className="text-xl leading-none text-emerald-600 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="px-4 pb-4 !mb-0">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

export function RelatedLinks({ links }: { links: { href: string; icon: string; name: string }[] }) {
  return (
    <ul className="!list-none !pl-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
      {links.map((l) => (
        <li key={l.href} className="!mb-0">
          <a
            href={l.href}
            className="flex min-h-[44px] items-center gap-2.5 rounded-lg border border-slate-200 px-3.5 py-2.5 !text-slate-800 !no-underline hover:border-emerald-300 hover:bg-emerald-50/70 dark:border-slate-800 dark:!text-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span aria-hidden className="text-lg shrink-0">{l.icon}</span>
            <span className="text-sm font-medium leading-snug">{l.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** On single-column layouts the result sits below the form; bring it into view after "Calculate". */
export function revealResult(id: string) {
  if (typeof window === "undefined" || !window.matchMedia("(max-width: 1023px)").matches) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
