'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import DataTableProject from '@/components/table/DataTableProject';
import Pagination from '@/components/table/Pagination';

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      name: 'Project Alpha',
      domain: 'Web Development',
      type: 'Scrum',
      description: 'A website revamp project for a major e-commerce platform.',
      startDay: '2024-02-01',
      dueDay: '2024-08-01',
      status: 'In Progress'
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
        <h1 className="text-2xl font-bold">Project</h1>
        <div className="flex">
          <SearchBar onSearch={handleSearch} placeholder="Search project ..." />
          <button className="ml-6 rounded-md bg-red-600 px-4 py-2 text-white">
            New
          </button>
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
