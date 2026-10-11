import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The env vars are only configured for Production on Vercel. Without them
// (Preview deploys, local builds) skip Supabase so the build still succeeds
// and only the built-in articles in lib/articles.ts are used.
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

type Row = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_minutes: number;
  cover_emoji: string;
  related_calculator_url: string | null;
  featured: boolean;
  published_at: string;
  updated_at: string;
};

/** Published articles from Supabase; [] when it isn't configured or the query fails. See lib/articles.ts. */
export async function getSupabaseArticles(): Promise<Row[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("articles")
    .select("slug,title,excerpt,content,category,read_minutes,cover_emoji,related_calculator_url,featured,published_at,updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }
  return data ?? [];
}
