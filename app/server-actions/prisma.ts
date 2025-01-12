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

export const fetchEmployeeRolesDistribution = async () => {
  try {
    const roleDistribution = await prisma.employees.groupBy({
      by: ['role'],
      where: {
        isActive: true, 
      },
      _count: {
        role: true,
      },
    });
    return roleDistribution.map((item) => ({
      role: item.role,
      count: item._count.role,
    }));
  } catch (error) {
    console.error('Error fetching role distribution:', error);
    throw error;
  }
};


export const fetchProjectData = async () => {
  try {
    const totalProjects = await prisma.projects.count({
      where: { isActive: true },
    });

    const projectDistribution = await prisma.projects.groupBy({
      by: ['domainId'],
      where: { isActive: true },
      _count: { domainId: true },
    });

    const domainDetails = await Promise.all(
      projectDistribution.map(async ({ domainId, _count }) => {
        const domain = await prisma.domain.findUnique({
          where: { id: domainId },
        });
        return {
          domain: domain?.name || 'Unknown',
          count: _count.domainId,
        };
      })
    );

    return { totalProjects, domainDetails };
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
};
export async function fetchRecentlyActivities() {
  try {
    const recentActivities = await prisma.employeeProjects.findMany({
      where: {
        isActive: true,
      },
      select: {
        action: true,
        timestamp: true,
        employee: {
          select: {
            name: true,
            role: true,
            avatar: true,
          },
        },
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        phase: {
          select: {
            id: true,
            name: true,
            startDate: true,
            endDate: true,
            isFinished: true,
            project: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
    });

    const formattedActivities = [{
      phases: recentActivities.map(activity => ({
        phaseName: activity.phase.name,
        startDate: activity.phase.startDate,
        endDate: activity.phase.endDate,
        isFinished: activity.phase.isFinished,
        projectName: activity.project.name, 
        activities: [{
          employeeName: activity.employee.name,
          employeeRole: activity.employee.role,
          employeeAvatar: activity.employee.avatar,
          action: activity.action,
          timestamp: activity.timestamp,
          projectName: activity.project.name,  
        }],
      })),
    }];

    return {
      activities: formattedActivities,
      activityCount: recentActivities.length,
    };

  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
}

export async function fetchSkillsData() {
  try {
    // Get total skills count
    const totalSkills = await prisma.skills.count({
      where: {
        isActive: true
      }
    });

    // Get top 5 skills by employee count
    const topSkills = await prisma.employeeSkills.groupBy({
      by: ['skillId'],
      _count: {
        employeeId: true
      },
      orderBy: {
        _count: {
          employeeId: 'desc'
        }
      },
      take: 5
    });

    // Get skill names for the top skills
    const topSkillsWithNames = await Promise.all(
      topSkills.map(async (skill) => {
        const skillInfo = await prisma.skills.findUnique({
          where: { id: skill.skillId }
        });
        return {
          skillName: skillInfo?.name || 'Unknown Skill',
          employeeCount: skill._count.employeeId
        };
      })
    );

    return {
      totalSkills,
      topSkills: topSkillsWithNames
    };
  } catch (error) {
    console.error('Error fetching skills data:', error);
    throw new Error('Failed to fetch skills data');
  }
}
