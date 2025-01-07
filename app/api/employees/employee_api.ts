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

export const createEmployee = async (employee: any) => {
  try {
    const supabase = supabaseBrowserClient();

    const { data: employeeData, error: employeeError } = await supabase
      .from('Employees')
      .insert([
        {
          name: employee.name,
          email: employee.email,
          role: employee.role,
          avatar: employee.avatar,
          joiningDate: employee.joiningDate,
          updatedAt: new Date().toISOString()
        }
      ])
      .select('id')
      .single();

    if (employeeError) {
      throw new Error(`Error inserting employee: ${employeeError.message}`);
    }

    console.log('Employee created with ID:', employeeData.id);

    for (const skill of employee.skills) {
      const { data: skillData, error: skillError } = await supabase
        .from('Skills')
        .select('id')
        .eq('name', skill)
        .single();
      if (skillError) {
        continue;
      }

      if (!skillData) {
        console.warn(`Skill "${skill}" not found in the database.`);
        continue;
      }

      const { error: insertError } = await supabase
        .from('EmployeeSkills')
        .insert([
          {
            employeeId: employeeData.id,
            skillId: skillData.id
          }
        ]);

      if (insertError) {
        console.error(
          `Error linking skill "${skill}" to employee: ${insertError.message}`
        );
      }
    }

    return employeeData;
  } catch (error) {
    console.error('Error in createEmployee function:', error);
    throw error;
  }
};
