interface Project {
  name: string;
  domain: string;
  type: string;
  description: string;
  startDay: string;
  dueDay: string;
  status: string;
}
interface Employee {
  name: string;
  email: string;
  role: string;
  status?: boolean;
  age?: number;
  avatar?: string;
  isActive?: boolean;
  createAt?: string;
  updateAt?: string;
  joiningDate: string;
  skills: string[];
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
  project: Project;
  onClose: () => void;
}

interface Skill {
  id: string,
  name: string,
  description: string
}