import React from 'react';
import { fetchEmployees } from '@/app/api/employees/employee_api';
import EmployeeClient from '@/components/modal/employee/EmployeeClient';

const EmployeePage: React.FC = async () => {
  const employees = await fetchEmployees();

  return (
    <>
      <EmployeeClient employees={employees} />
    </>
  );
};

export default EmployeePage;
