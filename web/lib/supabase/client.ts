import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Set them in web/.env.local.",
  );
}

// RLS is intentionally off on every course-tracking table for now (mirrors
// the rest of the vault site, which has no login) — this anon-key client can
// read and write every row. Re-check this once auth exists.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
