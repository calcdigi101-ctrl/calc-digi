import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { SITE_URL } from "@/lib/site";

function walkPages(dir: string, routePrefix = ""): string[] {
  const routes: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      routes.push(...walkPages(path.join(dir, entry.name), `${routePrefix}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      routes.push(routePrefix || "/");
    }
  }
  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "app");
  const routes = walkPages(appDir);
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : route.startsWith("/calculators") ? 0.8 : 0.6,
  }));
}
