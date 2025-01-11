import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import ProfileIcon from '@/resources/images/icons/icon profile.png';
import { softDeleteEmployee } from '@/app/server-actions/supabase/server';
import DetailEmployeeModal from '@/components/modal/employee/DetailEmployee';
import UpdateEmployeeModal from '../modal/employee/UpdateEmployee';
import { DataEmployeeTableProps, Employee } from '@/types/types';
import getImageSrc from '@/app/api/supabase/handleRetrive';

const DataTableEmployee: React.FC<DataEmployeeTableProps> = ({ employees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedForUpdate, setSelectedForUpdate] = useState<Employee | null>(null);

  //view
  const viewDetail = (employee: Employee) => {
    setSelectedEmployee(employee);
  };
  const viewUpdate = (employee: Employee) => {
    setSelectedForUpdate(employee);
  };

  //close
  const closeModal = () => {
    setSelectedEmployee(null);
  };
  const closeUpdate = () => {
    setSelectedForUpdate(null);
  };

  function getAvatar(avatar: string): string | StaticImageData {
    if (avatar) {
      const publicUrl = getImageSrc(avatar)?.publicUrl;
      return publicUrl || ProfileIcon;
    }
    return ProfileIcon;
  }
  

  const handleDelete = async (id: string) => {
    try {
      await softDeleteEmployee(id);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  return (
    <>
      <table className="mt-6 min-w-full table-auto rounded-md bg-white">
        <thead>
          <tr>
            {['name', 'email', 'dateOfBirth', 'role', 'status', 'action'].map(col => (
              <th key={col} className="border-b px-4 py-3 text-start">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index} className="text-start">
              <td className="border-b px-4 py-2">
                <div className="flex items-center text-start">
                  <Image
                    src={getAvatar(employee.avatar) }
                    alt={employee.name}
                    width={48}
                    height={48}
                    className="rounded-full max-h-12 min-h-12 max-w-12 min-w-12 object-cover"
                  />
                  <span className="ml-2">{employee.name}</span>
                </div>
              </td>
              <td className="border-b px-4 py-2">{employee.email}</td>
              <td className="border-b px-4 py-2">
                {employee.dateOfBirth
                  ? new Date(employee.dateOfBirth).toLocaleDateString("en-GB")
                  : "N/A"}
              </td>
              <td className="border-b px-4 py-2">{employee.role}</td>
              <td
                className={`border-b px-4 py-2 ${employee.isActive ? 'text-green-500' : 'text-orange-500'}`}
              >
                {employee.isActive === true ? 'Active' : 'Disabled'}
              </td>
              <td className="border-b px-4 py-2 text-start">
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-gray-800"
                    onClick={() => viewDetail(employee)}
                  >
                    <AiOutlineEye />
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => viewUpdate(employee)}
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
      <DetailEmployeeModal employee={selectedEmployee} onCloseDetail={closeModal} />

      {selectedForUpdate ? <UpdateEmployeeModal employee={selectedForUpdate} onCloseUpdate={closeUpdate} /> : ''}

    </>
  );
};

export default DataTableEmployee;
