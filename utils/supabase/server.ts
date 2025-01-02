import { createServerClient } from '@supabase/ssr';
import { SUPABASE_KEY, SUPABASE_URL } from '@/constants';
import { cookies } from 'next/headers';
const supabaseServerClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (error) {
          console.error('Error setting cookies', error);
        }
      }
    }
  });
};

export default supabaseServerClient;
