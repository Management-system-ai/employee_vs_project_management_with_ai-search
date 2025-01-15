import {
  fetchProjectPhases,
  saveAssignedMembers
} from '@/app/api/project/projects';
import { fetchEmPloyee } from '@/app/api/employees/employee_api';
import React, { useEffect, useState } from 'react';
import { ProjectDetailProps } from '@/types/types';
import { toast } from 'react-toastify';

const AssignMemberProjectModal: React.FC<ProjectDetailProps> = ({
  project,
  onClose
}) => {
  const [phases, setPhases] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [phaseAssignments, setPhaseAssignments] = useState<
    Record<string, string[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!project) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const [phaseData, memberData] = await Promise.all([
          fetchProjectPhases(project.id),
          fetchEmPloyee(project.id)
        ]);
        setPhases(phaseData || []);
        setMembers(memberData || []);

        const initialAssignments: Record<string, string[]> = {};
        phaseData?.forEach((phase: any) => {
          initialAssignments[phase.id] =
            phase.employees.map((e: any) => e.id) || [];
        });
        setPhaseAssignments(initialAssignments);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [project]);

  const handleAssignChange = (phaseId: string, memberId: string) => {
    if (!phaseId) {
      console.error('Invalid phaseId:', phaseId);
      return;
    }

    setPhaseAssignments(prev => {
      const updatedPhaseMembers = [...(prev[phaseId] || [])];

      if (updatedPhaseMembers.includes(memberId)) {
        const index = updatedPhaseMembers.indexOf(memberId);
        updatedPhaseMembers.splice(index, 1); // Remove if already assigned
      } else {
        updatedPhaseMembers.push(memberId); // Add if not assigned
      }

      return {
        ...prev,
        [phaseId]: updatedPhaseMembers
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const savePromises = Object.entries(phaseAssignments).map(
        ([phaseId, members]) => saveAssignedMembers(phaseId, members)
      );

      const results = await Promise.all(savePromises);

      // Hiển thị thông báo cho từng phase
      results.forEach(result => {
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      });

      onClose();
    } catch (error) {
      toast.error('Failed to save assignments.');
    } finally {
      setSaving(false);
    }
  };

  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="h-[80vh] w-[70vw] overflow-y-auto rounded-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-bold">Assign Members to Phases</h2>
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

        {loading ? (
          <div className="flex h-20 items-center justify-center">
            <div className="spinner-border h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500" />
          </div>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300 shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-3 text-left text-sm font-semibold">
                    Phase Name
                  </th>
                  <th className="border-b border-gray-300 p-3 text-left text-sm font-semibold">
                    Duration
                  </th>
                  <th className="border-b border-gray-300 p-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="border-b border-gray-300 p-3 text-center text-sm font-semibold">
                    Assigned To
                  </th>
                </tr>
              </thead>
              <tbody>
                {phases.map(phase => (
                  <tr
                    key={phase.id}
                    className="transition duration-150 hover:bg-gray-50"
                  >
                    {/* Phase Name */}
                    <td className="border-b border-gray-300 p-3 font-medium text-gray-700">
                      {phase.name}
                    </td>

                    {/* Duration */}
                    <td className="border-b border-gray-300 p-3 text-gray-600">
                      {new Date(phase.startDate).toLocaleDateString()} -{' '}
                      {new Date(phase.endDate).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="border-b border-gray-300 p-3">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${
                          phase.status
                            ? 'bg-yellow-200 text-green-500'
                            : 'bg-yellow-200 text-blue-500'
                        }`}
                      >
                        {phase.status ? 'Completed' : 'In progress'}
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td className="border-b border-gray-300 p-3 text-center">
                      {/* Dropdown */}
                      <div className="group relative">
                        <button className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-600 hover:bg-gray-300">
                          Select Assignee
                        </button>
                        <div className="absolute z-10 hidden w-48 rounded border border-gray-300 bg-white shadow-md group-hover:block">
                          {members.map(member => (
                            <div
                              key={member.id}
                              className="flex cursor-pointer items-center space-x-2 px-3 py-2 hover:bg-gray-100"
                              onClick={() =>
                                handleAssignChange(phase.id, member.id)
                              }
                            >
                              <img
                                src={member.avatar}
                                alt={member.name}
                                className="h-6 w-6 rounded-full object-cover"
                              />
                              <span className="text-sm text-gray-700">
                                {member.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-end">
              <button
                className={`rounded bg-blue-600 px-4 py-2 text-white ${saving && 'opacity-50'}`}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AssignMemberProjectModal;
