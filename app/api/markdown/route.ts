import { NextRequest, NextResponse } from "next/server";
import { CATEGORIES, ALL_CALCULATORS, categoryPath } from "@/lib/calculators";
import { CATEGORY_CONTENT } from "@/lib/categoryData";
import { getCompleteCalculatorFaqs } from "@/lib/calcFaqs";
import { getArticles, getArticleBySlug } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

function stripHtml(html: string): string {
  return html
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n\n## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n\n### $1\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<ul[^>]*>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ol[^>]*>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<a [^>]*href=['"]([^'"]*)['"][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<[^>]+>/g, "")
    .replace(/&times;/g, "×")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  let rawPath = url.searchParams.get("path") || url.pathname;
  if (rawPath.endsWith(".md")) {
    rawPath = rawPath.slice(0, -3);
  }
  if (!rawPath || rawPath === "/index" || rawPath === "") {
    rawPath = "/";
  }

  let markdown = "";
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    "Vary": "Accept",
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
  };

  // 1. Homepage
  if (rawPath === "/") {
    markdown = `# CalcDigi – High-Precision Digital Calculation Engine

> Free online calculation platform featuring 330+ verified tools for finance, health, math, science, and everyday precision. Fast, 100% ad-free, private, and no signup required.

- **Website:** https://www.calcdigi.com/
- **Total Tools:** 330+ Calculators across 20 Categories
- **Publisher:** CalcDigi (https://www.calcdigi.com/)
- **Author:** CalcDigi Editorial Team (https://www.calcdigi.com/pages/about)
- **Date Modified:** 2026-11-03
- **Machine-Readable Feeds:**
  - LLMs Guide: https://www.calcdigi.com/llms.txt
  - Sitemap: https://www.calcdigi.com/sitemap.xml
  - Markdown Feed: https://www.calcdigi.com/index.md

## Calculator Categories

${CATEGORIES.map(
  (c) => `- **[${c.label}](${SITE_URL}${categoryPath(c.id)})**: ${c.calculators.length} calculators (e.g. ${c.calculators.slice(0, 3).map((calc) => calc.name).join(", ")})`
).join("\n")}

## Frequently Asked Questions

### Is CalcDigi completely free to use?
Yes, 100% of the 330+ calculators on CalcDigi are completely free to use with no account registration, no subscriptions, and no paywalls.

### How accurate are CalcDigi calculations?
All calculators are engineered and peer-reviewed against official standards, including IRS tax codes, WHO and CDC clinical benchmarks, standard actuarial formulas, and NIST mathematical specifications.

### Does CalcDigi save or store my personal calculation data?
No. CalcDigi is built with a client-side first architecture. Your financial, clinical, and personal data inputs are processed locally in your browser and are never stored on external databases or sold to third parties.

### Can I print, export, or share my calculation results?
Yes. Every calculator includes built-in print summary formatting, clean PDF export layouts, and direct link sharing with pre-filled parameters.

### How frequently are formulas and benchmark tables updated?
Our editorial and engineering teams review and update formulas whenever official benchmarks change, including annual IRS tax bracket adjustments, inflation tables, and clinical guidelines.

### Can I embed CalcDigi calculators on my own website?
Yes, CalcDigi supports clean, responsive iframe embedding with dedicated embed parameters and official attribution for educational, business, and personal web pages.
`;
    return new Response(markdown, { headers });
  }

  // 2. All Calculators Directory (/calculators)
  if (rawPath === "/calculators") {
    markdown = `# All Calculators Directory – CalcDigi

Browse all 330+ verified free calculators available on CalcDigi across 20 categories.

${CATEGORIES.map(
  (cat) => `## ${cat.label} (${cat.calculators.length} Tools)
${cat.calculators.map((c) => `- [${c.name}](${SITE_URL}${c.href})`).join("\n")}`
).join("\n\n")}
`;
    return new Response(markdown, { headers });
  }

  // 3. Category Landing Pages (/pages/[id] or /calculators/[id])
  const catMatch = rawPath.match(/^\/(?:pages|calculators)\/([a-z-]+)$/);
  if (catMatch) {
    const rawCatId = catMatch[1];
    const catId = rawCatId === "measurements" ? "conversion" : rawCatId;
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      const content = CATEGORY_CONTENT[cat.id];
      markdown = `# ${cat.label} Calculators (${cat.calculators.length} Free Tools)

- **Category URL:** ${SITE_URL}${categoryPath(cat.id)}
- **Author:** CalcDigi Editorial Team
- **Date Modified:** 2026-11-03

## Overview
${content?.guideParagraphs.join("\n\n") || `Explore ${cat.calculators.length} verified free calculators for ${cat.label.toLowerCase()}.`}

## Available Calculators
${cat.calculators.map((c) => `- **[${c.name}](${SITE_URL}${c.href})**`).join("\n")}

## Key Standards & Features
${content?.keyFeatures.map((f) => `- **${f.title}**: ${f.desc}`).join("\n") || ""}

## Frequently Asked Questions
${content?.faqs.map((f) => `### ${f.q}\n\n${f.a}\n`).join("\n") || ""}
`;
      return new Response(markdown, { headers });
    }
  }

  // 4. Individual Calculator Pages (/calculators/[cat]/[slug])
  const calc = ALL_CALCULATORS.find((c) => c.href === rawPath);
  if (calc) {
    const cat = CATEGORIES.find((c) => c.id === calc.category);
    const categoryLabel = cat ? cat.label : "General";
    const faqs = getCompleteCalculatorFaqs(calc.name, categoryLabel);

    markdown = `# ${calc.name}

- **Category:** [${categoryLabel}](${SITE_URL}${categoryPath(calc.category)})
- **Direct Tool URL:** ${SITE_URL}${calc.href}
- **Author:** CalcDigi Editorial Team
- **Date Modified:** 2026-11-03
- **Standards:** Peer-reviewed clinical, financial, and mathematical formulas

## Overview
The ${calc.name} is a high-precision, client-side digital calculation tool engineered to eliminate manual calculation errors. All computations occur locally in your browser with zero data tracking.

## How to Calculate
1. **Enter Input Variables:** Input your known figures into the form, selecting appropriate metric or imperial measurement units.
2. **Review Instant Calculation:** Results, mathematical breakdowns, and reference benchmark tables calculate instantly in real time.
3. **Export or Share:** Use the print view for an official verified result summary sheet, or share the URL with pre-filled parameters.

## Frequently Asked Questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}\n`).join("\n")}

---
*CalcDigi Platform • High-Precision Digital Calculation Engine • Free & Ad-Free*
`;
    return new Response(markdown, { headers });
  }

  // 5. Blog Index (/pages/blog)
  if (rawPath === "/pages/blog") {
    const articles = await getArticles();
    markdown = `# CalcDigi Blog & Learning Center: Precision Guides

In-depth actuarial, financial, health, and everyday math guides with verified formulas, benchmarks, and step-by-step calculation examples.

${articles
  .map(
    (a) => `## [${a.title}](${SITE_URL}/pages/blog/${a.slug})
- **Category:** ${a.category} | **Read Time:** ${a.read_minutes} mins | **Updated:** ${a.updated_at}
- **Summary:** ${a.excerpt}`
  )
  .join("\n\n")}
`;
    return new Response(markdown, { headers });
  }

  // 6. Individual Blog Article (/pages/blog/[slug])
  const blogMatch = rawPath.match(/^\/pages\/blog\/([a-z0-9-]+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    const article = await getArticleBySlug(slug);
    if (article) {
      markdown = `# ${article.title}

- **Category:** ${article.category}
- **Author:** CalcDigi Editorial Team
- **Date Published:** ${article.published_at}
- **Date Modified:** ${article.updated_at}
- **Read Time:** ${article.read_minutes} minutes
- **Canonical URL:** ${SITE_URL}/pages/blog/${article.slug}

> ${article.excerpt}

${stripHtml(article.content)}
`;
      return new Response(markdown, { headers });
    }
  }

  // 7. About Page (/pages/about)
  if (rawPath === "/pages/about") {
    markdown = `# About CalcDigi: Calculation Methodology & Editorial Standards

- **Website:** https://www.calcdigi.com/
- **Founder:** Ali Zain
- **Author:** CalcDigi Editorial Team
- **Editorial Standards:** IRS/WHO/CDC/NIST compliant

## Our Mission
CalcDigi was founded to provide transparent, ad-free, high-precision calculation tools for everyday and professional use. Every formula is verified against official governmental, clinical, and scientific reference publications.

## Privacy by Architecture
CalcDigi does not store user inputs, financial metrics, or health information. All mathematical operations execute client-side in the user's web browser.
`;
    return new Response(markdown, { headers });
  }

  // 8. Fallback 404
  markdown = `# 404 - Page Not Found

The requested resource \`${rawPath}\` was not found on CalcDigi.

- Home: ${SITE_URL}/
- All Calculators: ${SITE_URL}/calculators
`;
  return new Response(markdown, { status: 404, headers });
}
