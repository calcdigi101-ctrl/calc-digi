import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The env vars are only configured for Production on Vercel. Without them
// (Preview deploys, local builds) skip Supabase so the build still succeeds
// and blog lists just render empty.
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_minutes: number;
  cover_emoji: string;
  related_calculator_url: string | null;
  featured: boolean;
  published: boolean;
  published_at: string;
  updated_at: string;
};

export async function getArticles(): Promise<Article[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch articles:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch article:", error.message);
    return null;
  }
  return data;
}
