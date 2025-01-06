'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import Pagination from '@/components/table/Pagination';
import DataTableEmployee from '@/components/table/DataTableEmployee';
// import { fetchEmPloyee } from '@/app/api/employees/employee_api';
// import { getEmployees } from '../server-actions/supabase/client';
import { getEmployees } from '../server-actions/supabase/server';
// import { getEmployees } from '../server-actions/prisma';

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
          <button className="ml-6 rounded-md bg-red-600 px-4 py-2 text-white">
            New
          </button>
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
