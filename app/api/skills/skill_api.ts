import { supabaseBrowserClient } from '@/utils/supabaseClient';

export const fetchSkill = async (): Promise<Skill[]> => {
  try {
    const supabase = supabaseBrowserClient();
    const { data: skills } = await supabase.from('Skills').select('*');
    return skills || [];
  } catch (error) {
    throw error;
  }
};