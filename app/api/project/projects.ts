import { supabaseBrowserClient } from '@/utils/supabaseClient';

export const fetchProjects = async () => {
  try {
    const supabase = supabaseBrowserClient();
    console.log('Fetching projects...');
    const { data: projects } = await supabase
      .from('Projects')
      .select(`id, name, description, type, isActive, Domain(name)`);
      

    const formattedProjects = projects?.map(project => ({
      id: project.id,
      name: project.name,
      domain: project.Domain.name,
      type: project.type,
      description: project.description,
      status: project.isActive ? 'Active' : 'Inactive'
    }));
    return formattedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export const fetchProjectPhases = async (projectId: string) => {
  try {
    const supabase = supabaseBrowserClient();

    const { data } = await supabase
      .from('Phase')
      .select(
        `
        name,
        startDate,
        endDate,
        isFinished,
        id,
        EmployeeProjects (
          employeeId,
          action,
          timestamp,
          Employees (
            name,
            avatar
          )
        )
      `
      )
      .eq('projectId', projectId)
      .eq('isFinished', false)
      .order('startDate', { ascending: true });

    const formattedPhases = data?.map(phase => ({
      phaseName: phase.name,
      startDate: phase.startDate,
      endDate: phase.endDate,
      status: phase.isFinished,
      employees: phase.EmployeeProjects?.map(ep => ep.Employees) ?? []
    }));

    return formattedPhases;
  } catch (error) {
    throw new Error('Unexpected error fetching project phases');
  }
};

export const fetchProjectActivities = async (projectId: string) => {
  try {
    const supabase = supabaseBrowserClient();
    const { data } = await supabase
      .from('EmployeeProjects')
      .select(
        `
        action,
        createdAt,
        Employees (
          name
        ),
        Phase (
          name
        )
      `
      )
      .eq('projectId', projectId)
      .order('createdAt', { ascending: true });

    const formattedActivities = data?.map(activity => ({
      action: activity.action,
      createdAt: activity.createdAt,
      employee: activity.Employees.name,
      phase: activity.Phase.name
    }));
    return formattedActivities;
  } catch (error) {
    throw new Error('Unexpected error fetching project activities');
  }
};

export const addProject = async (newProject: Project) => {
  try {
    const supabase = supabaseBrowserClient();
    const { data, error } = await supabase
      .from('Projects')
      .insert([newProject]); 
    if (error) throw error;
    return data; 
  } catch (error) {
    console.error('Error adding project:', error);
    throw error; 
  }
};


export const deleteProject = async (projectId: string) => {
  try {
    const supabase = supabaseBrowserClient();
    const { error: projectError } = await supabase
      .from('Projects')
      .update({isActive: false})
      .eq('id', projectId);

    if (projectError) {
      console.log('Fail to delete project',projectError);
      throw new Error('Failed to delete project');
    }

  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Unexpected error deleting project');
  }
};

