"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    initScrollReveal?: () => void;
    initFAQ?: () => void;
    initCardTilt?: () => void;
  }
}

export default function RouteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-run on every client-side navigation so pages without their own
    // inline script (e.g. the blog) still get scroll-reveal + FAQ binding.
    window.initFAQ?.();
    window.initScrollReveal?.();
    window.initCardTilt?.();
  }, [pathname]);

  return null;
}
