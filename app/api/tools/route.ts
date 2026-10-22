import { NextResponse, type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Public JSON API providing machine-readable metadata, formulas, and endpoints
 * for all 340+ CalcDigi tools for AI Agents, MCP Servers, and Answer Engines.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const q = searchParams.get("q")?.toLowerCase();

    const filePath = path.join(process.cwd(), "public", "tools.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Tools registry not found" }, { status: 404 });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    let tools = data.tools || [];

    if (category) {
      tools = tools.filter((t: { category: string }) => t.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      tools = tools.filter(
        (t: { title: string; description: string; slug: string }) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.slug.toLowerCase().includes(q)
      );
    }

    return NextResponse.json(
      {
        site: "https://calc-digi.vercel.app",
        updated: data.updated,
        total: tools.length,
        tools,
      },
      {
        headers: {
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
