import Image from 'next/image';
import React from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ProfileIcon from '@/resources/images/icons/icon profile.png';
import { softDeleteEmployee } from '@/app/server-actions/supabase/server';

const DataTableEmployee: React.FC<DataEmployeeTableProps> = ({ employees }) => {
  const handleDelete = async (id: string) => {
    try {
      await softDeleteEmployee(id);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  return (
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
                  width={30}
                  height={30}
                />
                <span className="ml-2">{employee.name}</span>
              </div>
            </td>
            <td className="border-b px-4 py-2">{employee.email}</td>
            <td className="border-b px-4 py-2">{employee.age}</td>
            <td className="border-b px-4 py-2">{employee.role}</td>
            <td
              className={`border-b px-4 py-2 ${employee.isActive ? 'text-green-500' : 'text-orange-500'}`}
            >
              {employee.isActive === true ? 'Active' : 'Disabled'}
            </td>
            <td className="border-b px-4 py-2 text-center">
              <div className="flex justify-center space-x-3">
                <button className="text-blue-500">
                  <AiOutlineEye />
                </button>
                <button className="text-blue-500">
                  <AiOutlineEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(employee.id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTableEmployee;
