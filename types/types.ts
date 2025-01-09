import { EmployeeRole } from '@prisma/client';
import { USER_ROLE, BOT_ROLE } from '@/constants';
interface Project {
  id: string;
  name: string;
  domainId: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  status: boolean;
  updatedAt?: string;
}
interface Employee {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
  age?: number;
  avatar: string;
  isActive?: boolean;
  createAt?: string;
  updateAt?: string;
  joiningDate?: string;
}

interface Domain {
  id: string;
  name: string;
}

interface DataTableProps {
  projects: Project[];
}
interface DataEmployeeTableProps {
  employees: Employee[];
}

interface UpdateEmployeeProps {
  isOpen: boolean;
  employee: Employee | null;
  onClose: () => void;
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

interface DeleteProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

interface Skill {
  id: string;
  name: string;
  description: string;
}

export const Role = {
  developer: { name: 'Developer', value: EmployeeRole.DEVELOPER },
  teamLeader: { name: 'Team Leader', value: EmployeeRole.TEAM_LEAD },
  designer: { name: 'Designer', value: EmployeeRole.DESIGNER },
  tester: { name: 'QA', value: EmployeeRole.QA },
  projectManager: { name: 'Manager', value: EmployeeRole.PROJECT_MANAGER }
};

interface ChatHistory {
  role: typeof USER_ROLE | typeof BOT_ROLE;
  content: string;
}

export type {
  Project,
  Employee,
  Domain,
  DataTableProps,
  DataEmployeeTableProps,
  UpdateEmployeeProps,
  SearchBarProps,
  ProjectDetailProps,
  Skill,
  ChatHistory
};
