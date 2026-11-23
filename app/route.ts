import { getLandingHtml } from "@/lib/landingHtml";

export async function GET() {
  return new Response(getLandingHtml(), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Link": '</llms.txt>; rel="describedby"; type="text/plain", </sitemap.xml>; rel="sitemap", </index.md>; rel="alternate"; type="text/markdown"',
    },
  });
}
