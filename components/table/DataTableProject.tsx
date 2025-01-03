import React from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const DataTableProject: React.FC<DataTableProps> = ({ projects }) => {
  return (
    <table className="mt-6 min-w-full table-auto rounded-md bg-white">
      <thead>
        <tr>
          {['name', 'domain', 'type', 'description', 'status', 'action'].map(
            col => (
              <th key={col} className="border-b px-4 py-3 text-left">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => (
          <tr key={index}>
            <td className="border-b px-4 py-2">{project.name}</td>
            <td className="border-b px-4 py-2">{project.domain}</td>
            <td className="border-b px-4 py-2">{project.type}</td>
            <td className="border-b px-4 py-2">{project.description}</td>
            <td className="border-b px-4 py-2 text-green-500">
              {project.status}
            </td>
            <td className="border-b px-4 py-2 text-center">
              <div className="flex justify-center space-x-3">
                <button className="text-blue-500">
                  <AiOutlineEye />
                </button>
                <button className="text-blue-500">
                  <AiOutlineEdit />
                </button>
                <button className="text-red-500">
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

export default DataTableProject;
