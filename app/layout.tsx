import type { Metadata } from "next";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CalcDigi – Free Online Calculators",
  description:
    "Free, accurate, AI-powered calculators for health, finance, math, and more. No sign-up required.",
};

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
        <link rel="stylesheet" href="/css/main.css" />
      </head>
      <body>
        <div id="site-nav" />
        {children}
        <div id="site-footer" />
        <Script src="/js/layout.js" strategy="beforeInteractive" />
        <Script src="/js/main.js" strategy="beforeInteractive" />
        <Script
          id="init-nav-footer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: "renderNav();renderFooter();" }}
        />
      </body>
    </html>
  );
}
