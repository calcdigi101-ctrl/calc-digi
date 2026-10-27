import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import RouteEffects from "@/components/RouteEffects";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./flagship.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090e1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CalcDigi – Free Online Calculators",
  description: "Free, accurate online calculators for health, finance, math and more. No sign-up required.",
};

// Cache-busting query param: /css/main.css and /js/*.js are served with a
// long immutable Cache-Control (see vercel.json), which is only safe if the
// URL itself changes whenever the file's contents change. VERCEL_GIT_COMMIT_SHA
// is set automatically by Vercel at build time, so this rotates every deploy
// with zero manual bumping.
const ASSET_VERSION = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 10) ?? "dev";

// Runs before first paint: marks JS as available (scroll-reveal only hides
// content when it can be revealed again) and applies the saved theme.
const HEAD_SCRIPT = "document.documentElement.classList.add('js')";
const THEME_SCRIPT = "try{if(localStorage.getItem('cd-dark')==='1')document.body.classList.add('dark')}catch(e){}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={`/css/main.css?v=${ASSET_VERSION}`} />
      </head>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <Header />
        <div id="main" tabIndex={-1}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </div>
        <Footer />
        <RouteEffects />
        <Script src={`/js/main.js?v=${ASSET_VERSION}`} strategy="beforeInteractive" />
      </body>
    </html>
  );
}
