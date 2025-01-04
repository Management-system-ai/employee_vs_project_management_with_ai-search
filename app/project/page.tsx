'use client';
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import DataTableProject from '@/components/table/DataTableProject';
import Pagination from '@/components/table/Pagination';
import { Plus } from "lucide-react";
import AddProjectModal from '@/components/modal/project/CreateProject';
import { addProject, fetchProjects } from "@/app/api/apiProject/project_api";

interface Project {
  name: string;
  domainId: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  // status: string;
}

const ProjectPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch projects from API
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjects(); // Gọi API
        setProjects(data); // Cập nhật state
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
      await addProject(newProject);
      console.log('Project added successfully');

      // Fetch lại danh sách dự án sau khi thêm
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);

      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    Object.values(project).some((val) =>
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
      <div className="flex justify-between items-center mt-1">
        <h1 className="text-2xl font-bold">Management Project</h1>
        <div className='flex'>
          <SearchBar onSearch={handleSearch} placeholder='Search project ...' />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md ml-6 flex items-center"
          >
            <Plus className="mr-2" size={18} />
            Add Projects
          </button>
          <AddProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleAddProject}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center mt-4">Loading projects...</div>
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
