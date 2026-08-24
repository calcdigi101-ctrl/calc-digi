import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import RouteEffects from "@/components/RouteEffects";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CalcDigi – Free Online Calculators",
  description:
    "Free, accurate, AI-powered calculators for health, finance, math, and more. No sign-up required.",
};

// Cache-busting query param: /css/main.css and /js/*.js are served with a
// long immutable Cache-Control (see vercel.json), which is only safe if the
// URL itself changes whenever the file's contents change. VERCEL_GIT_COMMIT_SHA
// is set automatically by Vercel at build time, so this rotates every deploy
// with zero manual bumping.
const ASSET_VERSION = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 10) ?? "dev";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`/css/main.css?v=${ASSET_VERSION}`} />
      </head>
      <body>
        <div id="site-nav" />
        {children}
        <div id="site-footer" />
        <RouteEffects />
        <Script src={`/js/layout.js?v=${ASSET_VERSION}`} strategy="beforeInteractive" />
        <Script src={`/js/main.js?v=${ASSET_VERSION}`} strategy="beforeInteractive" />
        <Script
          id="init-nav-footer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "renderNav();renderFooter();initDarkMode();initMobileNav();initBackTop();initCookie();initAIPanel();initMegaSearch();",
          }}
        />
      </body>
    </html>
  );
}
