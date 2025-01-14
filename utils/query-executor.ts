import { prisma } from './prisma_global';
import { QueryIntent } from '@/types/types';

const queryBuilders = {
  FIND_EMPLOYEES: async (filters: Record<string, any>, relations: string[]) => {
    const baseQuery: {
      where: Record<string, any>;
      include: Record<string, any>;
    } = {
      where: {},
      include: {}
    };

    // Process filters
    if (filters.role) {
      baseQuery.where.role = filters.role;
    }
    if (filters.skills) {
      const skillsArray = Array.isArray(filters.skills)
        ? filters.skills
        : [filters.skills];

      baseQuery.where.employeeSkills = {
        some: {
          skill: {
            OR: skillsArray.map(skill => ({
              name: {
                contains: skill,
                mode: 'insensitive'
              }
            }))
          }
        }
      };

      baseQuery.include = {
        employeeSkills: {
          include: {
            skill: true
          }
        }
      };
    }

    if (filters.isActive !== undefined) {
      baseQuery.where.isActive = filters.isActive;
    }
    if (filters.joinedDate) {
      baseQuery.where.joinedDate = {
        gte: new Date(filters.joinedDate.start),
        lte: new Date(filters.joinedDate.end)
      };
    }
    if (filters.name) {
      baseQuery.where.name = filters.name;
    }
    if (filters.email) {
      baseQuery.where.email = filters.email;
    }
    if (filters.dateOfBirth) {
      baseQuery.where.dateOfBirth = filters.dateOfBirth;
    }
    if (filters.projectName || filters.project) {
      baseQuery.where.employeeProjects = {
        some: {
          project: {
            name: {
              contains: filters.projectName || filters.project,
              mode: 'insensitive'
            }
          }
        }
      };
      baseQuery.include = {
        employeeProjects: {
          include: {
            project: true
          }
        }
      };
    }

    // Process relations
    if (
      relations.includes('employeeSkills') ||
      relations.includes('EmployeeSkills')
    ) {
      baseQuery.include.employeeSkills = {
        include: {
          skill: true
        }
      };
    }
    if (
      relations.includes('employeeProjects') ||
      relations.includes('EmployeeProjects')
    ) {
      baseQuery.include.employeeProjects = {
        include: {
          project: true,
          phase: true
        }
      };
    }
    if (relations.includes('projects') || relations.includes('Projects')) {
      baseQuery.include.employeeProjects = {
        include: {
          project: true
        }
      };
    }

    try {
      const employees = await prisma.employees.findMany(baseQuery);
      return employees;
    } catch (error) {
      console.error('Error in FIND_EMPLOYEES:', error);
      throw error;
    }
  },
  PROJECT_ANALYSIS: async (
    filters: Record<string, any>,
    relations: string[]
  ) => {
    const baseQuery: {
      where: Record<string, any>;
      include: Record<string, any>;
    } = {
      where: {},
      include: {}
    };

    // Process filters for Projects
    if (filters.name) {
      baseQuery.where.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters.type) {
      baseQuery.where.type = filters.type;
    }
    if (filters.isActive !== undefined) {
      baseQuery.where.isActive = filters.isActive;
    }
    if (filters.startDate) {
      baseQuery.where.startDate = { gte: new Date(filters.startDate) };
    }
    if (filters.endDate) {
      baseQuery.where.endDate = { lte: new Date(filters.endDate) };
    }
    if (filters.description) {
      baseQuery.where.description = {
        contains: filters.description,
        mode: 'insensitive'
      };
    }

    // Keyword search
    if (filters.keyword) {
      baseQuery.where.OR = [
        { name: { contains: filters.keyword, mode: 'insensitive' } },
        { description: { contains: filters.keyword, mode: 'insensitive' } }
      ];
    }

    // Filters for phases
    if (filters.phaseName || filters.phaseIsFinished) {
      baseQuery.include.phases = {
        where: {}
      };
      if (filters.phaseName) {
        baseQuery.include.phases.where.name = {
          contains: filters.phaseName,
          mode: 'insensitive'
        };
      }
      if (filters.phaseIsFinished !== undefined) {
        baseQuery.include.phases.where.isFinished = filters.phaseIsFinished;
      }
    }

    // Filters for employees
    if (filters.employeeName || filters.employeeRole) {
      baseQuery.include.EmployeeProjects = {
        include: {
          employee: {
            where: {}
          }
        }
      };
      if (filters.employeeName) {
        baseQuery.include.EmployeeProjects.include.employee.where.name = {
          contains: filters.employeeName,
          mode: 'insensitive'
        };
      }
      if (filters.employeeRole) {
        baseQuery.include.EmployeeProjects.include.employee.where.role =
          filters.employeeRole;
      }
    }

    // Process relations
    if (relations.includes('ProjectSkills')) {
      baseQuery.include.ProjectSkills = {
        include: {
          skills: true
        }
      };
    }
    if (relations.includes('EmployeeProjects')) {
      baseQuery.include.EmployeeProjects = {
        include: {
          employee: true,
          phase: true
        }
      };
    }
    if (relations.includes('Phase')) {
      baseQuery.include.phases = {
        include: {
          project: true
        }
      };
    }
    if (relations.includes('Domain')) {
      baseQuery.include.domain = true;
    }

    try {
      return await prisma.projects.findMany(baseQuery);
    } catch (error) {
      console.error('Error in PROJECT_ANALYSIS:', error);
      throw error;
    }
  },
  SKILL_ANALYSIS: async (filters: Record<string, any>, relations: string[]) => {
    const baseQuery: {
      where: Record<string, any>;
      include: Record<string, any>;
    } = {
      where: {},
      include: {}
    };

    // Process filters
    if (filters.name) {
      baseQuery.where.name = { contains: filters.name, mode: 'insensitive' };
    }
    if (filters.isActive !== undefined) {
      baseQuery.where.isActive = filters.isActive;
    }
    if (filters.createdAt) {
      baseQuery.where.createdAt = { gte: new Date(filters.createdAt) };
    }
    if (filters.updatedAt) {
      baseQuery.where.updatedAt = { lte: new Date(filters.updatedAt) };
    }

    // Search keyword
    if (filters.keyword) {
      baseQuery.where.OR = [
        { name: { contains: filters.keyword, mode: 'insensitive' } },
        { description: { contains: filters.keyword, mode: 'insensitive' } }
      ];
    }

    // Filter by proficiency in EmployeeSkills
    if (filters.employeeProficiency !== undefined) {
      baseQuery.include.employeeSkills = {
        where: { proficiency: filters.employeeProficiency },
        include: {
          employee: filters.employeeName
            ? {
                where: {
                  name: { contains: filters.employeeName, mode: 'insensitive' }
                }
              }
            : true
        }
      };
    }

    // Filter by proficiency in ProjectSkills
    if (filters.projectProficiency !== undefined) {
      baseQuery.include.projectSkills = {
        where: { proficiency: filters.projectProficiency },
        include: {
          projects: filters.projectName
            ? {
                where: {
                  name: { contains: filters.projectName, mode: 'insensitive' }
                }
              }
            : true
        }
      };
    }

    // Process relations
    if (relations.includes('EmployeeSkills')) {
      baseQuery.include.employeeSkills = {
        include: {
          employee: true,
          skill: true
        }
      };
    }
    if (relations.includes('ProjectSkills')) {
      baseQuery.include.projectSkills = {
        include: {
          skills: true,
          projects: true
        }
      };
    }

    try {
      return await prisma.skills.findMany(baseQuery);
    } catch (error) {
      console.error('Error in SKILL_ANALYSIS:', error);
      throw error;
    }
  }
};

export async function executeQuery(intent: QueryIntent) {
  try {
    const queryBuilder =
      queryBuilders[intent.type as keyof typeof queryBuilders];
    if (!queryBuilder) {
      throw new Error(`Unsupported query type: ${intent.type}`);
    }

    const results = await queryBuilder(
      intent.filters || {},
      intent.relations || []
    );
    return results;
  } catch (error) {
    console.error('Query Execution Error:', error);
    throw error;
  }
}
