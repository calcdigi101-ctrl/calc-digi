import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/site";
import { getArticles } from "@/lib/articles";

function walkPages(dir: string, routePrefix = ""): string[] {
  const routes: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue; // dynamic routes handled separately
      routes.push(...walkPages(path.join(dir, entry.name), `${routePrefix}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      routes.push(routePrefix || "/");
    }
  }
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app");
  const walked = walkPages(appDir);
  // Ensure homepage root '/' is always present
  const routes = Array.from(new Set(["/", ...walked]));
  const articles = await getArticles();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => {
    let priority = 0.6;
    let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly";

    if (route === "/") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === "/calculators") {
      priority = 0.9;
      changeFrequency = "weekly";
    } else if (route.startsWith("/calculators/")) {
      priority = 0.8;
      changeFrequency = "monthly";
    } else if (route.startsWith("/pages/")) {
      priority = 0.7;
      changeFrequency = "weekly";
    }

    return {
      url: route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/pages/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
