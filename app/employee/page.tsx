'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/table/Pagination';
import DataTableEmployee from '@/components/table/DataTableEmployee';
import { getEmployees } from '../server-actions/supabase/server';
import CreateEmployee from '@/components/modal/employee/CreateEmployee';
import { Employee } from '@/types/types';

const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <>
      <div className="mt-1 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Employees</h1>
        <div className="flex">
          <SearchBar onSearch={handleSearch} placeholder="Search employee..." />
          <CreateEmployee />
        </div>
      </div>
      <DataTableEmployee employees={paginatedEmployees} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default EmployeePage;
