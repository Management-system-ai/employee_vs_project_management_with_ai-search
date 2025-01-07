import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ProfileIcon from '@/resources/images/icons/icon profile.png';
import { softDeleteEmployee } from '@/app/server-actions/supabase/server';
import UpdateEmployeeModal from '../modal/employee/UpdateEmployee';
import { DataEmployeeTableProps, Employee } from '@/types/types';

const DataTableEmployee: React.FC<DataEmployeeTableProps> = ({ employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDelete = async (id: string) => {
    try {
      await softDeleteEmployee(id);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  const handleUpdate = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  return (
    <>
      <table className="mt-6 min-w-full table-auto rounded-md bg-white">
        <thead>
          <tr>
            {['name', 'email', 'age', 'role', 'status', 'action'].map(col => (
              <th key={col} className="border-b px-4 py-3 text-center">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="text-center">
              <td className="border-b px-4 py-2">
                <div className="flex items-center text-center">
                  <Image
                    src={employee.avatar ? employee.avatar : ProfileIcon}
                    alt={employee.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <span className="ml-2">{employee.name}</span>
                </div>
              </td>
              <td className="border-b px-4 py-2 text-left">{employee.email}</td>
              <td className="border-b px-4 py-2 text-left">{employee.age}</td>
              <td className="border-b px-4 py-2 text-left">{employee.role}</td>
              <td
                className={`border-b px-4 py-2 text-left ${employee.isActive ? 'text-green-500' : 'text-red-600'}`}
              >
                {employee.isActive === true ? 'Active' : 'Disabled'}
              </td>
              <td className="border-b px-4 py-2 text-center">
                <div className="flex justify-center space-x-3">
                  <button className="text-blue-500">
                    <AiOutlineEye />
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => handleUpdate(employee)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(employee.id!)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateEmployeeModal
        employee={selectedEmployee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default DataTableEmployee;
