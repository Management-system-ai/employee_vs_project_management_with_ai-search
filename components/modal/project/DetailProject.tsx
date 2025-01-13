import {
  fetchProjectActivities,
  fetchProjectPhases
} from '@/app/api/project/projects';
import {
  deletePhase,
  deleteEmployeeProject
} from '@/app/server-actions/supabase/client';
import { UpdatePhaseModal } from '@/components/modal/phase/UpdatePhase';
import { ProjectDetailProps, UpdatePhase } from '@/types/types';
import { Phase } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';

const DetailProjectModal: React.FC<ProjectDetailProps> = ({
  project,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('information');
  const [tabData, setTabData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [phase, setPhase] = useState<UpdatePhase>({
    id: '',
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date()
  });
  const handleModalUpdate = async (phase: Phase) => {
    setShowModalUpdate(true);
    setPhase(phase);
  };
  const handleDeletePhase = async (phaseId: string, phaseName: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete phase ${phaseName} ?`
    );
    if (!confirmDelete) return;
    try {
      const response = await deleteEmployeeProject(phaseId);
      const result = await deletePhase(phaseId);
      if (result) {
        toast.success('Delete phase successful');
      } else {
        toast.error('Failed to delete phase');
      }
    } catch (error) {
      toast.error('Error deleting phase');
      console.error(error);
    }
  };

  useEffect(() => {
    if (project == undefined) return;

    const loadData = async () => {
      setLoading(true);
      let data: any = [];
      switch (activeTab) {
        case 'phase':
          data = await fetchProjectPhases(project.id);
          break;
        case 'activity':
          data = await fetchProjectActivities(project.id);
          break;
        default:
          break;
      }
      setTabData(data);
      setLoading(false);
    };

    if (activeTab !== 'information') {
      loadData();
    }
  }, [activeTab, project]);

  if (!project) return null;

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center p-6">
          <div className="spinner-border border-3 inline-block h-12 w-12 animate-spin rounded-full border-red-600 border-t-transparent" />
        </div>
      );
    }

    switch (activeTab) {
      case 'information':
        return (
          <div className="bg-white">
            <div className="space-y-2">
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Name:</span>
                <span>{project.name}</span>
              </div>
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Domain:</span>
                <span className="text-blue-600">{project.domain}</span>
              </div>
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Type:</span>
                <span>{project.type}</span>
              </div>
              
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Status:</span>
                <span
                  className={`font-medium ${project.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {project.status}
                </span>
              </div>
              <div className="flex">
                <span className="font-lg w-1/6 font-bold">Description:</span>
                <span>{project.description}</span>
              </div>
            </div>
          </div>
        );
      case 'phase':
        return (
          <div>
            {!tabData || tabData.length === 0 ? (
              <p>No phases found.</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="p-2 text-left">Phase Name</th>
                    <th className="p-2 text-left">Duration</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Members</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tabData.map((phase, index) => (
                    <tr key={index} className="space-y-2">
                      <td className="p-2 text-left">{phase.name}</td>
                      <td className="p-2 text-left">
                        {new Date(phase.startDate).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit'
                        })}
                        -{' '}
                        {new Date(phase.endDate).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-sm ${phase.status ? 'bg-yellow-200 text-green-500' : 'bg-yellow-200 text-blue-500'
                            }`}
                        >
                          {phase.status ? 'Completed' : 'In progress'}
                        </span>
                      </td>
                      <td className="p-2 text-left">
                        {!phase.employees || phase.employees.length === 0 ? (
                          'No employees assigned'
                        ) : (
                          <ul className="flex space-x-1">
                            {phase.employees.map((employee: any, i: number) => (
                              <li key={i} className="flex space-x-1">
                                <img
                                  src={employee.avatar}
                                  alt="profile"
                                  width={30}
                                  height={30}
                                />
                                <span>{employee.name}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td>
                        <div className="flex space-x-3">
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            onClick={() => {
                              handleModalUpdate(phase);
                            }}
                          >
                            <AiOutlineEdit />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              handleDeletePhase(phase.id, phase.name);
                            }}
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <UpdatePhaseModal
              showModalUpdate={showModalUpdate}
              setShowModalUpdate={setShowModalUpdate}
              phase={phase}
            />
          </div>
        );
      case 'activity':
        return (
          <div>
            {!tabData || tabData.length === 0 ? (
              <p>No activities found.</p>
            ) : (
              <div>
                {tabData.map((activity, index) => (
                  <p className="p-2 text-sm border-b border-gray-200" key={index}>
                    <span className="font-semibold text-blue-600">{activity.employee+" "}</span>
                    <span className={`p-1/2 px-2 text-xs font-medium badge ${activity.action ? "join" : "leave"}`}>
                      {activity.action ? "Join" : "Leave"}
                    </span>
                    <span className="mx-2 text-gray-500">in</span>
                    <span className="font-medium text-amber-500 p-1/2 text-sm rounded-full">{activity.phase}</span>
                    <span className="mx-2 text-gray-500">at</span>
                    <span className="text-gray-700">
                      {new Date(activity.createdAt).toLocaleString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </p>

                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-1/2 w-1/2 rounded-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-bold">Project Details</h2>
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

        {/* Tabs */}
        <div className="mb-4 flex space-x-4">
          <button
            className={`px-1 text-lg ${activeTab === 'information' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
            onClick={() => setActiveTab('information')}
          >
            Information
          </button>
          <button
            className={`px-1 text-lg ${activeTab === 'phase' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
            onClick={() => setActiveTab('phase')}
          >
            Phase
          </button>
          <button
            className={`px-1 text-lg ${activeTab === 'activity' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>
        <div className="mb-4">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DetailProjectModal;
