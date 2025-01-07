'use server';
import {
  Employees,
  Skills,
  Projects,
  EmployeeSkills,
  ProjectSkills,
  Phase,
  Domain,
  EmployeeProjects
} from '@prisma/client';
import { prisma } from '@/utils/prisma_global';

// Employees
export const createEmployee = async (employee: Employees) =>
  await prisma.employees.create({ data: employee });
export const getEmployees = async () => await prisma.employees.findMany();
export const updateEmployee = async (
  id: string,
  updatedFields: Partial<Employees>
) => await prisma.employees.update({ where: { id }, data: updatedFields });
export const deleteEmployee = async (id: string) =>
  await prisma.employees.delete({ where: { id } });

// Skills
export const createSkill = async (skill: Skills) =>
  await prisma.skills.create({ data: skill });
export const getSkills = async () => await prisma.skills.findMany();
export const updateSkill = async (id: string, updatedFields: Partial<Skills>) =>
  await prisma.skills.update({ where: { id }, data: updatedFields });
export const deleteSkill = async (id: string) =>
  await prisma.skills.delete({ where: { id } });

// Projects
export const createProject = async (project: Projects) =>
  await prisma.projects.create({ data: project });
export const getProjects = async () => await prisma.projects.findMany();
export const updateProject = async (
  id: string,
  updatedFields: Partial<Projects>
) => await prisma.projects.update({ where: { id }, data: updatedFields });
export const deleteProject = async (id: string) =>
  await prisma.projects.delete({ where: { id } });

// EmployeeSkills
export const createEmployeeSkill = async (employeeSkill: EmployeeSkills) =>
  await prisma.employeeSkills.create({ data: employeeSkill });
export const getEmployeeSkills = async () =>
  await prisma.employeeSkills.findMany();
export const updateEmployeeSkill = async (
  id: string,
  updatedFields: Partial<EmployeeSkills>
) => await prisma.employeeSkills.update({ where: { id }, data: updatedFields });
export const deleteEmployeeSkill = async (id: string) =>
  await prisma.employeeSkills.delete({ where: { id } });

// ProjectSkills
export const createProjectSkill = async (projectSkill: ProjectSkills) =>
  await prisma.projectSkills.create({ data: projectSkill });
export const getProjectSkills = async () =>
  await prisma.projectSkills.findMany();
export const updateProjectSkill = async (
  id: string,
  updatedFields: Partial<ProjectSkills>
) => await prisma.projectSkills.update({ where: { id }, data: updatedFields });
export const deleteProjectSkill = async (id: string) =>
  await prisma.projectSkills.delete({ where: { id } });

// Phases
export const createPhase = async (phase: Phase) =>
  await prisma.phase.create({ data: phase });
export const getPhases = async () => await prisma.phase.findMany();
export const updatePhase = async (id: string, updatedFields: Partial<Phase>) =>
  await prisma.phase.update({ where: { id }, data: updatedFields });
export const deletePhase = async (id: string) =>
  await prisma.phase.delete({ where: { id } });

// Domains
export const createDomain = async (domain: Domain) =>
  await prisma.domain.create({ data: domain });
export const getDomains = async () => await prisma.domain.findMany();
export const updateDomain = async (
  id: string,
  updatedFields: Partial<Domain>
) => await prisma.domain.update({ where: { id }, data: updatedFields });
export const deleteDomain = async (id: string) =>
  await prisma.domain.delete({ where: { id } });

// EmployeeProjects
export const createEmployeeProject = async (
  employeeProject: EmployeeProjects
) => await prisma.employeeProjects.create({ data: employeeProject });
export const getEmployeeProjects = async () =>
  await prisma.employeeProjects.findMany();
export const updateEmployeeProject = async (
  id: string,
  updatedFields: Partial<EmployeeProjects>
) =>
  await prisma.employeeProjects.update({ where: { id }, data: updatedFields });
export const deleteEmployeeProject = async (id: string) =>
  await prisma.employeeProjects.delete({ where: { id } });
export const getEmployeeActivities = async (employeeId: string) =>
  await prisma.employeeProjects.findMany({
    where: { employeeId: employeeId, },
    include: {
      project: {select: { name: true }},
      phase: {select: {name: true}},
    },
  });
