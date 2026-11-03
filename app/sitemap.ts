import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/site";
import { getArticles } from "@/lib/articles";

interface RouteInfo {
  route: string;
  lastModified: Date;
}

function walkPages(dir: string, routePrefix = ""): RouteInfo[] {
  const routes: RouteInfo[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue; // dynamic routes handled separately
      routes.push(...walkPages(path.join(dir, entry.name), `${routePrefix}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      const pageFile = path.join(dir, entry.name);
      let lastMod: Date;
      try {
        const stat = fs.statSync(pageFile);
        lastMod = stat.mtime;
      } catch {
        lastMod = new Date("2026-10-24T00:00:00.000Z");
      }
      routes.push({
        route: routePrefix || "/",
        lastModified: lastMod,
      });
    }
  }
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app");
  const walked = walkPages(appDir);
  
  // Ensure homepage root '/' is present with its file mtime
  let homeMod = new Date("2026-10-24T00:00:00.000Z");
  try {
    homeMod = fs.statSync(path.join(appDir, "page.tsx")).mtime;
  } catch {}

  const routeMap = new Map<string, Date>();
  routeMap.set("/", homeMod);
  for (const item of walked) {
    if (!routeMap.has(item.route)) {
      routeMap.set(item.route, item.lastModified);
    }
  }

  const articles = await getArticles();

  const staticEntries: MetadataRoute.Sitemap = Array.from(routeMap.entries()).map(([route, lastModified]) => {
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
      lastModified,
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
