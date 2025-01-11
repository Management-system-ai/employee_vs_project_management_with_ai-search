import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import UpdateProjectForm from '../modal/project/UpdateProject';
import { fetchDomains } from '@/app/api/domain/domain';
import DetailProjectModal from '../modal/project/DetailProject';
import { Domain, Project } from '@/types/types';
import DeleteProjectModal from '../modal/project/DeleteProject';
import handleUpdateProject from '../modal/project/UpdateProject';

interface DataTableProps {
  projects: Project[];
  onProjectsUpdate: (updater: (prevProjects: Project[]) => Project[]) => void;
}

const DataTableProject: React.FC<DataTableProps> = ({
  projects,
  onProjectsUpdate
}) => {
  const [modalState, setModalState] = useState<{
    type: 'edit' | 'detail' | 'delete' | null;
    project: Project | null;
  }>({ type: null, project: null });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);

  // Fetch domains when the component mounts
  useEffect(() => {
    const loadDomains = async () => {
      try {
        const fetchedDomains = await fetchDomains();
        setDomains(fetchedDomains);
      } catch (err) {
        console.error('Failed to fetch domains:', err);
      }
    };
    loadDomains();
  }, []);

  // Close modal
  const closeModal = () => {
    setModalState({ type: null, project: null });
    setError(null);
  };

  return (
    <div className="mt-6 max-h-96 overflow-y-auto rounded-md bg-white">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            {['Name', 'Type', 'Domain', 'Description', 'Status', 'Action'].map(
              col => (
                <th key={col} className="border-b px-4 py-3 text-left">
                  {col}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td className="border-b px-4 py-2">{project.name}</td>
              <td className="border-b px-4 py-2">{project.type}</td>
              <td className="border-b px-4 py-2">{project.domain}</td>
              <td className="border-b px-4 py-2">{project.description}</td>
              <td
                className={`border-b px-4 py-2 ${
                  project.status === true
                    ? 'text-green-500'
                    : 'text-red-600'
                }`}
              >
                {project.status}
              </td>
              <td className="border-b px-4 py-2 text-center">
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-gray-800 hover:text-gray-600"
                    onClick={() => setModalState({ type: 'detail', project })}
                  >
                    <AiOutlineEye />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setModalState({ type: 'edit', project })}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setModalState({ type: 'delete', project })}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {modalState.type === 'detail' && modalState.project && (
        <DetailProjectModal project={modalState.project} onClose={closeModal} />
      )}
      {modalState.type === 'edit' && modalState.project && (
        <UpdateProjectForm
          project={modalState.project}
          onClose={closeModal}
          onUpdate={handleUpdateProject}
          domains={domains}
          isLoading={isLoading}
          error={error}
        />
      )}
      {modalState.type === 'delete' && modalState.project && (
        <DeleteProjectModal
          project={modalState.project}
          onClose={closeModal}
          onDelete={DeleteProjectModal}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default DataTableProject;
