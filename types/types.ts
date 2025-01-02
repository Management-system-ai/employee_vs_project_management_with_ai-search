interface Project {
    id: string;
    name: string;
    domain: string;
    type: string;
    description: string;
    startDay?: string;
    dueDay?: string;
    status: string;
  }
  
  interface DataTableProps {
    projects: Project[];
  }

  interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder: string;
  }
  

  interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
  }
  