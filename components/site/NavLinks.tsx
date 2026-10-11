"use client";

import { usePathname } from "next/navigation";

const LINKS: { href: string; label: string; match: (p: string) => boolean }[] = [
  { href: "/", label: "Home", match: (p) => p === "/" },
  { href: "/calculators", label: "Calculators", match: (p) => p.startsWith("/calculators") || /^\/pages\/(?!blog|about|contact|privacy|terms|disclaimer)/.test(p) },
  { href: "/pages/blog", label: "Blog", match: (p) => p.startsWith("/pages/blog") },
  { href: "/pages/about", label: "About", match: (p) => p.startsWith("/pages/about") },
];

/** Primary nav links; a client component only so the active pill follows the URL. */
export function NavLinks() {
  const pathname = usePathname() ?? "";
  return (
    <ul className="nav-links" role="list">
      {LINKS.map((l) => {
        const active = l.match(pathname);
        return (
          <li key={l.href}>
            <a href={l.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
              {l.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
