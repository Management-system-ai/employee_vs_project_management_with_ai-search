'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import DataTableProject from '@/components/table/DataTableProject';
import Pagination from '@/components/table/Pagination';
import { fetchProjects } from '../api/projects';
import { Button } from '@nextui-org/react';

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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
          <Button className="ml-6 rounded-md bg-red-600 px-4 py-2 text-white">
            New
          </Button>
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
