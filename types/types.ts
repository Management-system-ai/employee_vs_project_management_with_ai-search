interface Project {
  
  name: string;
  domainId: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  updatedAt?: string;
  // status: string;
}

interface DataTableProps {
  projects: Project[];
}

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}


interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}