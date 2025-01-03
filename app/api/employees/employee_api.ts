import { supabaseServerClient } from '@/app/utils/supabase';
import { Employee } from '@/types/types';

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const supabase = await supabaseServerClient();
    const { data: employees, error } = await supabase
      .from('Employees')
      .select('*');
    if (error) throw new Error(error.message);
    return employees || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to fetch employees: ' + error.message);
    }
    throw new Error('Failed to fetch employees');
  }
};
