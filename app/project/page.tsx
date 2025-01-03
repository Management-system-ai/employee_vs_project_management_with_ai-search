'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import DataTableProject from '@/components/table/DataTableProject';
import Pagination from '@/components/table/Pagination';
import { Plus } from "lucide-react";
import AddProjectModal from '@/components/modal/project/CreateProject';
import { addProject, fetchProjects } from "@/app/api/project_api";

// Định nghĩa interface cho Project
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
  const [projects, setProjects] = useState<Project[]>([
    {
      name: 'Project Alpha',
      domainId: 'Web Development',
      type: 'Scrum',
      description: 'A website revamp project for a major e-commerce platform.',
      startDate: '2024-02-01',
      endDate: '2024-08-01',
      // status: 'In Progress',
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  const handleAddProject = async (newProject: Project) => {
    try {
      const addedProject = await addProject(newProject);

      if (addedProject) {
        setProjects((prevProjects) => [...prevProjects, ...addedProject]);
        setIsModalOpen(false); 
      }
    } catch (error) {
      console.error('Failed to add project:', error);
      alert('Error adding project. Please try again.');
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
      <DataTableProject projects={paginatedProjects} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );

};
export default ProjectPage;