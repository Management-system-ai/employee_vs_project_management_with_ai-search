import { supabaseBrowserClient } from '@/utils/supabaseClient';
import {
  Employees,
  Skills,
  Projects,
  Domain,
  Phase,
  EmployeeProjects,
  EmployeeSkills,
  ProjectSkills
} from '@prisma/client';

const supabase = supabaseBrowserClient();

/// Employees CRUD Actions
export const createEmployee = async (employee: Employees) => {
  const { data, error } = await supabase.from('Employees').insert(employee);
  if (error) throw error;
  return data;
};

export const getEmployees = async (): Promise<Employees[]> => {
  const { data, error } = await supabase.from('Employees').select('*');
  if (error) throw error;
  return data as Employees[];
};

export const updateEmployee = async (
  id: string,
  updatedFields: Partial<Employees>
) => {
  const { data, error } = await supabase
    .from('Employees')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteEmployee = async (id: string) => {
  const { data, error } = await supabase
    .from('Employees')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};

// Skills CRUD Actions
export const createSkill = async (skill: Skills) => {
  const { data, error } = await supabase.from('Skills').insert(skill);
  if (error) throw error;
  return data;
};

export const getSkills = async (): Promise<Skills[]> => {
  const { data, error } = await supabase.from('Skills').select('*');
  if (error) throw error;
  return data as Skills[];
};

export const updateSkill = async (
  id: string,
  updatedFields: Partial<Skills>
) => {
  const { data, error } = await supabase
    .from('Skills')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteSkill = async (id: string) => {
  const { data, error } = await supabase.from('Skills').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Projects CRUD Actions
export const createProject = async (project: Projects) => {
  const { data, error } = await supabase.from('Projects').insert(project);
  if (error) throw error;
  return data;
};

export const getProjects = async (): Promise<Projects[]> => {
  const { data, error } = await supabase.from('Projects').select('*');
  if (error) throw error;
  return data as Projects[];
};

export const updateProject = async (
  id: string,
  updatedFields: Partial<Projects>
) => {
  const { data, error } = await supabase
    .from('Projects')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteProject = async (id: string) => {
  const { data, error } = await supabase.from('Projects').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// EmployeeSkills CRUD Actions
export const createEmployeeSkill = async (employeeSkill: EmployeeSkills) => {
  const { data, error } = await supabase
    .from('EmployeeSkills')
    .insert(employeeSkill);
  if (error) throw error;
  return data;
};

export const getEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const { data, error } = await supabase.from('EmployeeSkills').select('*');
  if (error) throw error;
  return data as EmployeeSkills[];
};

export const updateEmployeeSkill = async (
  id: string,
  updatedFields: Partial<EmployeeSkills>
) => {
  const { data, error } = await supabase
    .from('EmployeeSkills')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteEmployeeSkill = async (id: string) => {
  const { data, error } = await supabase
    .from('EmployeeSkills')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};

// ProjectSkills CRUD Actions
export const createProjectSkill = async (projectSkill: ProjectSkills) => {
  const { data, error } = await supabase
    .from('ProjectSkills')
    .insert(projectSkill);
  if (error) throw error;
  return data;
};

export const getProjectSkills = async (): Promise<ProjectSkills[]> => {
  const { data, error } = await supabase.from('ProjectSkills').select('*');
  if (error) throw error;
  return data as ProjectSkills[];
};

export const updateProjectSkill = async (
  id: string,
  updatedFields: Partial<ProjectSkills>
) => {
  const { data, error } = await supabase
    .from('ProjectSkills')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteProjectSkill = async (id: string) => {
  const { data, error } = await supabase
    .from('ProjectSkills')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};

// Phases CRUD Actions
export const createPhase = async (phase: Phase) => {
  const { data, error } = await supabase.from('Phase').insert(phase).single();
  if (error) throw error;
  return data;
};

export const getPhases = async (): Promise<Phase[]> => {
  const { data, error } = await supabase.from('Phase').select('*');
  if (error) throw error;
  return data as Phase[];
};

export const updatePhase = async (
  id: string,
  updatedFields: Partial<Phase>
) => {
  const { data, error } = await supabase
    .from('Phase')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deletePhase = async (id: string) => {
  const { data, error } = await supabase.from('Phase').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// Domains CRUD Actions
export const createDomain = async (domain: Domain) => {
  const { data, error } = await supabase.from('Domain').insert(domain);
  if (error) throw error;
  return data;
};

export const getDomains = async (): Promise<Domain[]> => {
  const { data, error } = await supabase.from('Domain').select('*');
  if (error) throw error;
  return data as Domain[];
};

export const updateDomain = async (
  id: string,
  updatedFields: Partial<Domain>
) => {
  const { data, error } = await supabase
    .from('Domain')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteDomain = async (id: string) => {
  const { data, error } = await supabase.from('Domain').delete().eq('id', id);
  if (error) throw error;
  return data;
};

// EmployeeProjects CRUD Actions
export const createEmployeeProject = async (
  employeeProject: EmployeeProjects
) => {
  const { data, error } = await supabase
    .from('EmployeeProjects')
    .insert(employeeProject);
  if (error) throw error;
  return data;
};

export const getEmployeeProjects = async (): Promise<EmployeeProjects[]> => {
  const { data, error } = await supabase.from('EmployeeProjects').select('*');
  if (error) throw error;
  return data as EmployeeProjects[];
};

export const updateEmployeeProject = async (
  id: string,
  updatedFields: Partial<EmployeeProjects>
) => {
  const { data, error } = await supabase
    .from('EmployeeProjects')
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteEmployeeProject = async (id: string) => {
  const { data, error } = await supabase
    .from('EmployeeProjects')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return data;
};

// Generic Helper for CRUD Actions (Optional)
export const createRecord = async <T>(table: string, record: T) => {
  const { data, error } = await supabase.from(table).insert(record);
  if (error) throw error;
  return data;
};

export const getRecords = async <T>(table: string): Promise<T[]> => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data as T[];
};

export const updateRecord = async <T>(
  table: string,
  id: string,
  updatedFields: Partial<T>
) => {
  const { data, error } = await supabase
    .from(table)
    .update(updatedFields)
    .eq('id', id);
  if (error) throw error;
  return data;
};

export const deleteRecord = async (table: string, id: string) => {
  const { data, error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return data;
};
