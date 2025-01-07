import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import UpdateProjectForm from '../modal/project/UpdateProject';
import { updateProject } from '@/app/api/apiProject/project_api';
import { fetchDomains } from '@/app/api/domain/domain';
import DetailProjectModal from '../modal/project/DetailProject';

interface DataTableProps {
  projects: Project[];
  onProjectsUpdate: (updater: (prevProjects: Project[]) => Project[]) => void;
}

const DataTableProject: React.FC<DataTableProps> = ({ projects, onProjectsUpdate }) => {
  const [modalState, setModalState] = useState<{
    type: 'edit' | 'detail' | null;
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

  // Open modal with type and project
  const openModal = (type: 'edit' | 'detail', project: Project) => {
    setModalState({ type, project });
  };

  // Close modal and reset error state
  const closeModal = () => {
    setModalState({ type: null, project: null });
    setError(null);
  };

  // Handle updating a project
  const handleUpdateProject = async (updatedProject: Project) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateProject(updatedProject.id, updatedProject);
      onProjectsUpdate((prevProjects) =>
        prevProjects.map((p) => (p.id === updatedProject.id ? result : p))
      );
      closeModal();
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
     
      {/* Table Display */}
      <table className="mt-6 min-w-full table-auto rounded-md bg-white">
        <thead>
          <tr>
            {['Name', 'Type', 'Domain', 'Description', 'Status', 'Action'].map((col) => (
              <th key={col} className="border-b px-4 py-3 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="border-b px-4 py-2">{project.name}</td>
              <td className="border-b px-4 py-2">{project.domain}</td>
              <td className="border-b px-4 py-2">{project.type}</td>
              <td className="border-b px-4 py-2">{project.description}</td>
              <td className="border-b px-4 py-2 text-green-500">{project.status}</td>
              <td className="border-b px-4 py-2 text-center">
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-gray-800 hover:text-gray-600"
                    onClick={() => openModal('detail', project)}
                  >
                    <AiOutlineEye />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => openModal('edit', project)}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DetailProjectModal
        project={modalState.project}
        onClose={closeModal}
      />

       {/* Conditional Modal Rendering */}
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


    </div>
  );
};

export default DataTableProject;
