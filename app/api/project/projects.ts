import { Project } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabaseClient';
import { toast } from 'react-toastify';

export const fetchProjects = async () => {
  try {
    const supabase = supabaseBrowserClient();
    const { data: projects } = await supabase
      .from('Projects')
      .select(`id, name, description, type, isActive, Domain(name)`)
      .eq('isActive', true);

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
        description,
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
      id: phase.id,
      name: phase.name,
      description: phase.description,
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


export const saveAssignedMembers = async (phaseId: string, assignedMembers: string[]): Promise<{ success: boolean, message: string }> => {
  if (!phaseId) {
    throw new Error('phaseId is undefined');
  }

  const supabase = supabaseBrowserClient();

  try {
    // Validate phaseId and get projectId
    const { data: phaseData, error: phaseError } = await supabase
      .from('Phase')
      .select('id, projectId')
      .eq('id', phaseId);

    if (phaseError) {
      throw new Error(`Failed to validate phase ID: ${phaseError.message}`);
    }

    if (!phaseData || phaseData.length === 0) {
      throw new Error(`Phase ID ${phaseId} does not exist in Phases table`);
    }

    const validProjectId = phaseData[0].projectId;

    const validEmployeeIds = assignedMembers.filter(employeeId => employeeId !== null && employeeId !== undefined);

    const { data: existingAssignments, error: fetchError } = await supabase
      .from('EmployeeProjects')
      .select('employeeId')
      .eq('phaseId', phaseId);

    // if (fetchError) {
    //   throw new Error(`Failed to fetch existing assignments: ${fetchError.message}`);
    // }

    const existingEmployeeIds = existingAssignments.map(e => e.employeeId);
    const newEmployeeIds = validEmployeeIds.filter(employeeId => !existingEmployeeIds.includes(employeeId));

    // If there are no new assignments, return success early
    // if (newEmployeeIds.length === 0) {
    //   console.log(`No new employees to assign for phaseId: ${phaseId}`);
    //   return {
    //     success: true,
    //     message: 'No new employees to assign.',
    //   };
    // }

    // Perform the upsert if there are new employee assignments
    const upsertData = newEmployeeIds.map(employeeId => ({
      phaseId,
      employeeId,
      projectId: validProjectId,
      action: 'true',
      timestamp: new Date().toISOString(),
    }));

    const { data: upsertedData, error: upsertError } = await supabase
      .from('EmployeeProjects')
      .upsert(upsertData);

    return {
      success: true,
      message: 'Successfully added new employees.',
    };
  } catch (error) {
    console.error('Error saving assigned members:', error);
    return {
      success: false,
      message: `Failed to save assignments: ${error.message}`,
    };
  }
};



export const addProject = async (newProject: Project) => {
  try {
    const supabase = supabaseBrowserClient();

    const { data: projectData, error: projectError } = await supabase
      .from('Projects')
      .insert([newProject])
      .select('id')
      .single();

    if (projectError) {
      console.error('Project insertion error:', projectError);
      throw projectError;
    }

    if (newProject.type === 'SHORT_TERM' && projectData?.id) {
      const phase = {
        projectId: projectData.id,
        name: newProject.name,
        startDate: newProject.startDate || null,
        endDate: newProject.endDate || null,
      };

      const { error: phaseError } = await supabase
        .from('Phase')
        .insert([phase]);

      if (phaseError) {
        console.error('Phase insertion error:', phaseError);
        throw phaseError;
      }
    }

    return projectData;
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
      .update({ isActive: false })
      .eq('id', projectId);

    if (projectError) {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Unexpected error deleting project');
  }
};
