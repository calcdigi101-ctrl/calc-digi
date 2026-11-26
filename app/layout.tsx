import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SITE_URL } from "@/lib/site";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import RouteEffects from "@/components/RouteEffects";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import "./flagship.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.calcdigi.com"),
  title: {
    default: "Calc Digi: 330+ Free Online Calculators (Fast & Ad-Free)",
    template: "%s | CalcDigi",
  },
  description: "Free online calculation suite with 330+ tools for finance, math, health, science, and daily precision. Instant, private, and ad-free.",
  openGraph: {
    title: "Calc Digi: 330+ Free Online Calculators (Fast & Ad-Free)",
    description: "Free online calculation suite with 330+ tools for finance, math, health, science, and daily precision. Instant, private, and ad-free.",
    type: "website",
    url: "https://www.calcdigi.com",
    siteName: "CalcDigi",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CalcDigi: Free Online Calculators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calc Digi: 330+ Free Online Calculators (Fast & Ad-Free)",
    description: "Free online calculation suite with 330+ tools for finance, math, health, science, and daily precision. Instant, private, and ad-free.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "08c95fcebfef8c2c",
  },
};

// Cache-busting query param: /css/main.css and /js/*.js are served with a
// long immutable Cache-Control (see vercel.json), which is only safe if the
// URL itself changes whenever the file's contents change. VERCEL_GIT_COMMIT_SHA
// is set automatically by Vercel at build time, so this rotates every deploy
// with zero manual bumping.
const ASSET_VERSION = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 10) ?? "dev";

// Runs before first paint: marks JS as available (scroll-reveal only hides
// content when it can be revealed again) and applies the saved theme.
const HEAD_SCRIPT = "document.documentElement.classList.add('js');try{if(new URLSearchParams(location.search).get('embed')==='true'||window.self!==window.top){document.documentElement.classList.add('is-embedded')}}catch(e){}";
const THEME_SCRIPT = "try{if(localStorage.getItem('cd-dark')==='1')document.body.classList.add('dark')}catch(e){}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager & Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-KHVKZFRV" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CKV8968HQK" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'GTM-KHVKZFRV');gtag('config', 'G-CKV8968HQK');`,
          }}
        />
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHVKZFRV"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
