import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import UpdateProjectForm from '../modal/project/UpdateProject';
import { updateProject} from '@/app/api/apiProject/project_api';
import { fetchDomains } from '@/app/api/domain/domainAPI';

interface DataTableProps {
  projects: Project[];
  onProjectsUpdate: (updater: (prevProjects: Project[]) => Project[]) => void;
}

const DataTableProject: React.FC<DataTableProps> = ({ projects, onProjectsUpdate }) => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    const loadDomains = async () => {
      const fetchedDomains = await fetchDomains();
      setDomains(fetchedDomains);
    };
    loadDomains();
  }, []);

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
  };

  const handleCloseForm = () => {
    setEditingProject(null);
    setError(null);
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await updateProject(updatedProject.id, updatedProject);
      console.log('Updated project:', result);
  
      (onProjectsUpdate || ((prevProjects) => prevProjects))(
        prevProjects => prevProjects.map(p => (p.id === updatedProject.id ? result : p))
      );
  
      setEditingProject(null);
    } catch (err) {
      console.error('Error updating project:', err);
      setError('Failed to update project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      {editingProject ? (
        <UpdateProjectForm
          project={editingProject}
          onClose={handleCloseForm}
          onUpdate={handleUpdateProject}
          domains={domains}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <table className="mt-6 min-w-full table-auto rounded-md bg-white">
          <thead>
            <tr>
              {['name', 'type', 'description', 'status', 'action'].map((col) => (
                <th key={col} className="border-b px-4 py-3 text-left">
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{project.name}</td>
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
                    <button
                      className="text-blue-500"
                      onClick={() => handleEditClick(project)}
                    >
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
      )}
    </div>
  );
};

export default DataTableProject;

