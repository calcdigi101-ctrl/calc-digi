import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getArticles } from "@/lib/articles";
import { CATEGORIES, ALL_CALCULATORS, categoryPath, DEFAULT_LAST_UPDATED } from "@/lib/calculators";

const FIXED_DATE = new Date(`${DEFAULT_LAST_UPDATED}T00:00:00.000Z`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const add = (
    url: string,
    lastModified: Date,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: number
  ) => {
    if (!seenUrls.has(url)) {
      seenUrls.add(url);
      routes.push({ url, lastModified, changeFrequency, priority });
    }
  };

  // 1. Homepage & Hubs
  add(`${SITE_URL}/`, FIXED_DATE, "daily", 1.0);
  add(`${SITE_URL}/calculators`, FIXED_DATE, "weekly", 0.9);

  // 2. Info Pages
  const infoPages = ["about", "contact", "privacy-policy", "terms-of-service", "disclaimer", "blog"];
  for (const page of infoPages) {
    add(`${SITE_URL}/pages/${page}`, FIXED_DATE, "weekly", 0.7);
  }

  // 3. Category Landing Pages (/pages/[category])
  for (const cat of CATEGORIES) {
    add(`${SITE_URL}${categoryPath(cat.id)}`, FIXED_DATE, "weekly", 0.8);
  }

  // 4. Calculators (Unique URLs only)
  for (const calc of ALL_CALCULATORS) {
    const calcDate = calc.lastUpdated ? new Date(`${calc.lastUpdated}T00:00:00.000Z`) : FIXED_DATE;
    add(`${SITE_URL}${calc.href}`, calcDate, "monthly", 0.8);
  }

  // 5. Blog Articles
  const articles = await getArticles();
  for (const a of articles) {
    add(`${SITE_URL}/pages/blog/${a.slug}`, new Date(a.updated_at), "monthly", 0.7);
  }

  return routes;
}
