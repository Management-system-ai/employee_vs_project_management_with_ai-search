import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_KEY, SUPABASE_URL } from '@/constants';

const supabaseBrowserClient = () => {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
};

export { supabaseBrowserClient };
