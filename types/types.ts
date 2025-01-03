interface Project {
  name: string;
  domainId: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  updatedAt?: string;
}
interface Employee {
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
