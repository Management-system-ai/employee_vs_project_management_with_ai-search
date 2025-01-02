import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import DetailProjectModal from '../modal/project/DetailProject';

const DataTableProject: React.FC<DataTableProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const viewDetail = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <table className="min-w-full table-auto bg-white rounded-md mt-6">
        <thead>
          <tr>
            {['name', 'domain', 'type', 'description', 'status', 'action'].map((col) => (
              <th key={col} className="px-4 py-3 border-b text-left">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{project.name}</td>
              <td className="px-4 py-2 border-b">{project.domain}</td>
              <td className="px-4 py-2 border-b">{project.type}</td>
              <td className="px-4 py-2 border-b">{project.description}</td>
              <td className="px-4 py-2 border-b text-green-500">{project.status}</td>
              <td className="px-4 py-2 border-b text-center">
                <div className="flex justify-center space-x-3">
                  <button className="text-blue-500" onClick={() => viewDetail(project)}>
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

      {/* <DetailProjectModal project={selectedProject} onClose={closeModal} /> */}
    </>
  );
};

export default DataTableProject;
