import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import DetailProjectModal from '../modal/project/DetailProject';
import DeleteProjectModal from '../modal/project/DeleteProject';

const DataTableProject: React.FC<DataTableProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const openDetailModal = (project: Project) => {
    setSelectedProject(project);
    setDetailModalOpen(true);
  };

  const openDeleteModal = (project: Project) => {
    setSelectedProject(project);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setSelectedProject(null);
    setDeleteModalOpen(false);
    setDetailModalOpen(false);
  };

  return (
    <>
      <table className="mt-6 min-w-full table-auto rounded-md bg-white">
        <thead>
          <tr>
            {['name', 'domain', 'type', 'description', 'status', 'action'].map(
              (col) => (
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
              <td className="border-b px-4 py-3">{project.name}</td>
              <td className="border-b px-4 py-3">{project.domain}</td>
              <td className="border-b px-4 py-3">{project.type}</td>
              <td className="border-b px-4 py-3">{project.description}</td>
              <td className="border-b px-4 py-3 text-green-500">
                {project.status}
              </td>
              <td className="border-b px-4 py-3 text-center">
                <div className="flex space-x-4">
                  <button
                    className="text-gray-800"
                    onClick={() => openDetailModal(project)}
                  >
                    <AiOutlineEye />
                  </button>
                  <button className="text-blue-500">
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => openDeleteModal(project)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedProject && (
        <DetailProjectModal project={selectedProject} onClose={closeModals} />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedProject && (
        <DeleteProjectModal project={selectedProject} onClose={closeModals} />
      )}
    </>
  );
};

export default DataTableProject;
