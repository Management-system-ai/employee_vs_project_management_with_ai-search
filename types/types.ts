interface Project {
  id: string;
  name: string;
  domainId: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
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

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

interface Skill {
  id: string;
  name: string;
  description: string;
}
