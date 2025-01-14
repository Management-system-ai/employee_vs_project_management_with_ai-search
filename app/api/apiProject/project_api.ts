import { Project } from '@/types/types';
import { supabaseBrowserClient } from '@/utils/supabaseClient';

export const fetchProjects = async () => {
  try {
    const supabase = supabaseBrowserClient();
    const { data: projects, error } = await supabase
      .from('Projects')
      .select('*');
    if (error) throw error;
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
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

// Update project
export const updateProject = async (id: string, project: Project) => {
  try {
    const supabase = supabaseBrowserClient();
    const { data, error } = await supabase
      .from('Projects')
      .update({
        name: project.name,
        description: project.description,
        domainId: project.domainId,
        type: project.type,
        isActive: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    if (error) {
      console.error('Supabase error:', error.message);
      throw error;
    }
    return data[0];
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};
