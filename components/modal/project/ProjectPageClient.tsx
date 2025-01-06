'use client';

import React, { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import DataTableProject from '@/components/table/DataTableProject';
import Pagination from '@/components/table/Pagination';
import { Plus } from 'lucide-react';
import AddProjectModal from '@/components/modal/project/CreateProject';
import { Project, Domain } from '@/types/types';

interface ProjectPageClientProps {
  initialProjects: Project[];
  domains: Domain[];
  handleAddProject: (newProject: Project) => Promise<Project>;
  handleProjectActivities: (projectId: string) => Promise<any>[];
  handlePhases: (projectId: string) => Promise<any>[];
}

const ProjectPageClient: React.FC<ProjectPageClientProps> = ({
  initialProjects,
  domains,
  handleAddProject,
  handleProjectActivities,
  handlePhases
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const addProjectHandler = async (newProject: Project) => {
    try {
      const addedProject = await handleAddProject(newProject);
      setProjects(prevProjects => [...prevProjects, addedProject]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const filteredProjects = projects.filter(project =>
    Object.values(project).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <div>
      <div className="mt-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Management Project</h1>
        <div className="flex">
          <SearchBar onSearch={handleSearch} placeholder="Search project ..." />
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-6 flex items-center rounded-md bg-red-600 px-4 py-2 text-white"
          >
            <Plus className="mr-2" size={18} />
            Add projects
          </button>
          <AddProjectModal
            domains={domains}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={addProjectHandler}
          />
        </div>
      </div>
      <DataTableProject
        projects={paginatedProjects}
        onActivityFunction={handleProjectActivities}
        onPhaseFunction={handlePhases}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProjectPageClient;
