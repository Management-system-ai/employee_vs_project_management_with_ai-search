import React, { useState } from 'react';
import {
  AiOutlineEye,
  AiOutlineEdit,
  AiOutlineDelete,
  AiFillCodepenCircle
} from 'react-icons/ai';
import DetailProjectModal from '../modal/project/DetailProject';
import { CreatePhaseModal } from '@/components/modal/phase/CreatePhase';
import { toast } from 'react-toastify';

const DataTableProject: React.FC<DataTableProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const viewDetail = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const clickIconPhase = (
    type: string,
    projectId: string,
    projectName: string
  ) => {
    if (type === 'LONG_TERM') {
      setShowModalDelete(true);
      setProjectId(projectId);
      setProjectName(projectName);
    } else {
      toast.error("This is project Short term. You can't create phase");
    }
  };

  return (
    <>
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
                    onClick={() => viewDetail(project)}
                  >
                    <AiOutlineEye />
                  </button>
                  <button className="text-blue-500">
                    <AiOutlineEdit />
                  </button>
                  <button className="text-red-500">
                    <AiOutlineDelete />
                  </button>
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      if (project.type) {
                        clickIconPhase(project.type, project.id, project.name);
                      }
                    }}
                  >
                    <AiFillCodepenCircle />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CreatePhaseModal
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        projectId={projectId}
        projectName={projectName}
      />
      <DetailProjectModal project={selectedProject} onClose={closeModal} />
    </>
  );
};

export default DataTableProject;
