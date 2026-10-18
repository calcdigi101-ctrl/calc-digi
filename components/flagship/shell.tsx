import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export const card =
  "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900";

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
    <main className="fx bg-slate-50 pb-16 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-[1180px] px-4 pt-6 sm:px-6">
        <nav aria-label="Breadcrumb" className="fx-no-print mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white" style={{ fontFamily: "var(--font-sans)" }}>
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-base text-slate-600 dark:text-slate-400">{intro}</p>
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
    <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-7">{form}</div>
      <div className="lg:sticky lg:top-24 lg:col-span-5">{result}</div>
    </div>
  );
}

/** Long-form SEO content, always rendered below the interactive tool. */
export function Editorial({ children }: { children: ReactNode }) {
  return (
    <article
      className={cn(
        card,
        "mt-10 p-6 sm:p-8 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-slate-900 dark:[&_h2]:text-white [&_h2:first-child]:mt-0",
        "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 dark:[&_h3]:text-white",
        "[&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1",
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
    <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      {children}
    </div>
  );
}

export function DataTable({ head, rows, highlight }: { head: string[]; rows: ReactNode[][]; highlight?: number }) {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={cn(
                "border-t border-slate-200 dark:border-slate-800",
                highlight === i && "bg-emerald-50 font-medium dark:bg-emerald-950/40",
              )}
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 tabular-nums">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
    <ul className="!list-none !pl-0 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {links.map((l) => (
        <li key={l.href} className="!mb-0">
          <a
            href={l.href}
            className="flex min-h-[48px] items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 !text-slate-800 !no-underline hover:border-emerald-300 hover:bg-emerald-50/70 dark:border-slate-800 dark:!text-slate-200 dark:hover:bg-slate-800"
          >
            <span aria-hidden>{l.icon}</span>
            <span className="text-sm font-medium">{l.name}</span>
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
