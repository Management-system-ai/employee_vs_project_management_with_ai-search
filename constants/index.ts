const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const DATABASE_URL = process.env.DATABASE_URL!;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000/';

export { SUPABASE_URL, SUPABASE_KEY, DATABASE_URL, SITE_URL };
