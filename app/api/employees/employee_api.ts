import { getEmployeeActivities } from '@/app/server-actions/prisma';
import { supabaseBrowserClient } from '@/utils/supabaseClient';
  import { Employee } from '@/types/types';
import uploadImage from '@/app/api/supabase/handleUpload';
import generateHash from '@/utils/hashGen';

export const fetchEmPloyee = async (id: string): Promise<Employee[]> => {
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

    const nameFile = await generateHash(employee.name + employee.avatar + new Date().toISOString());
    await uploadImage(nameFile,employee.avatar);


    const { data: employeeData, error: employeeError } = await supabase
      .from('Employees')
      .insert([
        {
          name: employee.name,
          email: employee.email,
          role: employee.role,
          avatar: nameFile,
          dateOfBirth: employee.dob,
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

export const fetchEmployeeActivity = async (
  employeeId: string | undefined
): Promise<any[]> => {
  if (!employeeId) {
    return [];
  }
  try {
    const employeeActivity = await getEmployeeActivities(employeeId);
    console.log(employeeActivity)
    return employeeActivity || [];
  } catch (error) {
    throw error;
  }
};


export const fetchEmPloyeeById = async (employeeId: string): Promise<Employee | null> => {
  if (employeeId) {

    try {
      const supabase = supabaseBrowserClient();
      const { data: employees } = await supabase.from('Employees').select('*').eq('id', employeeId).single();
      return employees || null;
    } catch (error) {
      throw error;
    }
  } else {
    return null;
  }
};

export const createEmployeeSkills = async (employeeId: string, skills: string[]) =>  {
  const supabase = supabaseBrowserClient();

  for (const skill of skills) {
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
          employeeId: employeeId,
          skillId: skillData.id
        }
      ]);

    if (insertError) {
      console.error(
        `Error linking skill "${skill}" to employee: ${insertError.message}`
      );
    }
  }
}
