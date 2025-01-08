import React, { useEffect, useState } from 'react';
import { fetchProjectPhases, deleteProject } from '@/app/api/project/projects';

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  project,
  onClose
}) => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (project) {
      const loadProjectDetails = async () => {
        setIsLoading(true);
        try {
          const details = await fetchProjectPhases(project.id);
          setProjectDetails(details);
        } catch (error) {
          console.error('Error fetching project details:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadProjectDetails();
    }
  }, [project]);

  const handleDelete = async () => {
    if (!project) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete project "${project.name}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    try {
      await deleteProject(project.id);
      onClose();
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Delete Project</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Name:</span>
                <span>{project.name}</span>
              </div>
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Domain:</span>
                <span>{project.domain}</span>
              </div>
              <p className="font-lg w-1/6 font-bold">Phases:</p>
              {projectDetails?.phases?.length ? (
                <ul>
                  {projectDetails.phases.map((phase: any) => (
                    <li key={phase.id}>
                      <strong>{phase.name}</strong>
                      <ul>
                        {phase.employees.map((emp: any) => (
                          <li key={emp.id} className="ml-4">
                            {emp.name}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No phases found for this project.</p>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="rounded-md bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteProjectModal;
