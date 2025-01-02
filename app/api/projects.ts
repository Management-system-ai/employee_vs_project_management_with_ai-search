import { supabaseBrowserClient } from '@/utils/supabaseClient';

export const fetchProjects = async () => {
  try {
    const supabase = supabaseBrowserClient();
    const { data: projects } = await supabase.from('Projects').select('*');
    return projects ?? [];
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};