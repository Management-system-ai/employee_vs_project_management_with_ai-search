'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import DataTableProject from '@/components/table/DataTableProject';
import Pagination from '@/components/table/Pagination';
import AddProjectModal from '@/components/modal/project/CreateProject';
import { addProject, fetchProjects } from '../api/project/projects';

const ProjectPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  useEffect(() => {
    const loadProjects = async () => {
      const fetchedProjects = await fetchProjects();
      if (fetchedProjects) {
        setProjects(fetchedProjects);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleAddProject = async (newProject: Project) => {
    try {
      const addedProject = await addProject(newProject);

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
            Create Projects
          </button>
          <AddProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddProject}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="mt-4 text-center">Loading projects...</div>
      ) : (
        <>
          <DataTableProject projects={paginatedProjects} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
export default ProjectPage;
