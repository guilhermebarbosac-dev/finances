import { createClient } from "@supabase/supabase-js";

// For development purposes only - replace with your actual Supabase URL and anon key
const supabaseUrl = "https://xyzcompany.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
