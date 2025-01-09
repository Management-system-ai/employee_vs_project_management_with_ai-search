const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const DATABASE_URL = process.env.DATABASE_URL!;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000/';
const AI_KEY = process.env.GEMINI_API_KEY;

const USER_ROLE = 'user';
const BOT_ROLE = 'model';

export {
  SUPABASE_URL,
  SUPABASE_KEY,
  DATABASE_URL,
  SITE_URL,
  AI_KEY,
  USER_ROLE,
  BOT_ROLE
};
