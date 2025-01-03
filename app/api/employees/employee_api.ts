import { supabaseBrowserClient } from '@/utils/supabaseClient';

export const fetchEmPloyee = async (): Promise<Employee[]> => {
  try {
    const supabase = supabaseBrowserClient();
    const { data: employees } = await supabase.from('Employees').select('*');
    return employees || [];
  } catch (error) {
    throw error;
  }
};
