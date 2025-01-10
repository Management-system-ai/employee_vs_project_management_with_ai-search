import { Phase } from '@prisma/client';
import { EmployeeRole } from '@prisma/client';
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
  onProjectsUpdate: (updater: (prevProjects: Project[]) => Project[]) => void;
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

type UpdatedPhase = Omit<
  Phase,
  'id' | 'isFinished' | 'createdAt' | 'updatedAt'
>;

type UpdateModalPhase = Omit<
  Phase,
  'id' | 'isFinished' | 'createdAt' | 'updatedAt' | 'projectId'
>;
type UpdatePhase = Omit<
  Phase,
  'isFinished' | 'createdAt' | 'updatedAt' | 'projectId'
>;
interface ModalCreatePhase {
  showModalCreate: boolean;
  setShowModalCreate: (value: boolean) => void;
  projectId: string;
  projectName: string;
}

interface ModalUpdatePhase {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  phase: Phase;
}
export const Role = {
  developer: { name: 'Developer', value: EmployeeRole.DEVELOPER },
  teamLeader: { name: 'Team Leader', value: EmployeeRole.TEAM_LEAD },
  designer: { name: 'Designer', value: EmployeeRole.DESIGNER },
  tester: { name: 'QA', value: EmployeeRole.QA },
  projectManager: { name: 'Manager', value: EmployeeRole.PROJECT_MANAGER }
};

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
  DeleteProjectModalProps,
  ModalCreatePhase,
  UpdatedPhase,
  ModalUpdatePhase,
  UpdateModalPhase,
  UpdatePhase
};
