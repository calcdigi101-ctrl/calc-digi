"use client";

import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: "/", label: "Home", match: (p) => p === "/" },
  { href: "/calculators", label: "Calculators", match: (p) => p.startsWith("/calculators") || /^\/pages\/(?!blog|about|contact|privacy|terms|disclaimer)/.test(p) },
  { href: "/pages/blog", label: "Blog", match: (p) => p.startsWith("/pages/blog") },
  { href: "/pages/about", label: "About", match: (p) => p.startsWith("/pages/about") },
];

/** Primary nav links matching screenshot pill active state */
export function NavLinks() {
  const pathname = usePathname() ?? "";
  return (
    <ul className="flex items-center gap-1 lg:gap-2 list-none p-0 m-0" role="list">
      {LINKS.map((l) => {
        const active = l.match(pathname);
        return (
          <li key={l.href}>
            <a
              href={l.href}
              className={
                active
                  ? "inline-block px-4 py-2 rounded-xl bg-[#edf7f2] dark:bg-emerald-950/60 text-[#1b5e20] dark:text-emerald-300 font-semibold text-sm transition-all"
                  : "inline-block px-3.5 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium text-sm transition-all"
              }
              aria-current={active ? "page" : undefined}
            >
              {l.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
