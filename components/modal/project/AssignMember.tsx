import { fetchProjectPhases, saveAssignedMembers } from '@/app/api/project/projects';
import { fetchEmPloyee } from '@/app/api/employees/employee_api';
import React, { useEffect, useState } from 'react';
import { ProjectDetailProps } from '@/types/types';
import { toast } from 'react-toastify';
import Image, { StaticImageData } from 'next/image';
import ProfileIcon from '@/resources/images/icons/icon profile.png';
import getImageSrc from '@/app/api/supabase/handleRetrive';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaPlus } from "react-icons/fa";

const AssignMemberProjectModal = ({ project, onClose }: { project: ProjectDetailProps; onClose: () => void }) => {
    const [phases, setPhases] = useState([]);
    const [members, setMembers] = useState([]);
    const [phaseAssignments, setPhaseAssignments] = useState({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [currentIndex, setIndex] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [selectedMembers, setSelectedMembers] = useState({});
    const [showMoreMembers, setShowMoreMembers] = useState<Record<string, boolean>>({});



    useEffect(() => {
        if (!project) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const [phaseData, memberData] = await Promise.all([
                    fetchProjectPhases(project.id),
                    fetchEmPloyee(project.id),
                ]);

                setPhases(phaseData || []);
                setMembers(memberData || []);

                const initialAssignments: { [key: string]: string[] } = {};
                phaseData?.forEach((phase) => {
                    initialAssignments[phase.id] = phase.employees.map((e) => e.id) || [];
                });
                setPhaseAssignments(initialAssignments);
                const initialSelectedMembers: { [key: string]: any[] } = {};
                phaseData?.forEach((phase) => {
                    const savedMembers = localStorage.getItem(`selectedMembers-${phase.id}`);
                    initialSelectedMembers[phase.id] = savedMembers ? JSON.parse(savedMembers) : [];
                });
                setSelectedMembers(initialSelectedMembers);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        }; loadData();
    }, [project]);

    const getAvatar = (avatar: string) => {
        return avatar ? getImageSrc(avatar)?.publicUrl || ProfileIcon : ProfileIcon;
    };

    const toggleDropdown = (phaseId: string) => {
        setDropdownOpen((prev: Record<string, boolean>) => ({
            ...prev,
            [phaseId]: !prev[phaseId],
        }));
    };

    const handleSelectMember = (phaseId: string, memberId: string) => {
        const member = members.find((m) => m.id === memberId);
        if (member) {
            setSelectedMembers((prev: Record<string, any[]>) => {
                const updatedMembers = [...(prev[phaseId] || [])];
                if (!updatedMembers.some((m) => m.id === memberId)) {
                    updatedMembers.push(member);
                }
                localStorage.setItem(`selectedMembers-${phaseId}`, JSON.stringify(updatedMembers));
                return {
                    ...prev,
                    [phaseId]: updatedMembers,
                };
            });
            handleAssignChange(phaseId, memberId);
            toggleDropdown(phaseId);
        }
    };

    const handleAssignChange = (phaseId, memberId) => {
        setPhaseAssignments((prev) => {
            const updatedPhaseMembers = [...(prev[phaseId] || [])];

            if (updatedPhaseMembers.includes(memberId)) {
                updatedPhaseMembers.splice(updatedPhaseMembers.indexOf(memberId), 1);
            } else {
                updatedPhaseMembers.push(memberId);
            }

            return {
                ...prev,
                [phaseId]: updatedPhaseMembers,
            };
        });
    };

    const handleSave = async (index: number) => {
        setIndex(index);
        setSaving(true);
        try {
            const savePromises = Object.entries(phaseAssignments).map(([phaseId, members]) => {
                return saveAssignedMembers(phaseId, members);
            });

            const results = await Promise.all(savePromises);
            results.forEach((result) => {
                if (!result.success) {
                    toast.error(result.message);
                }
            });
            toast.success('Assignments saved successfully!');

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
            <div className="h-[80vh] w-[70vw] rounded-lg bg-white p-6 overflow-y-auto">
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-20">
                        <div className="spinner-border h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500" />
                    </div>
                ) : (
                    <>
                        <table className="w-full border-collapse border border-gray-300 shadow-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 text-left text-sm font-semibold border-b border-gray-300">Phase Name</th>
                                    <th className="p-3 text-left text-sm font-semibold border-b border-gray-300">Duration</th>
                                    <th className="p-3 text-left text-sm font-semibold border-b border-gray-300">Status</th>
                                    <th className="p-3 text-center text-sm font-semibold border-b border-gray-300">Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {phases.map((phase: { id: string; name: string; startDate: string; endDate: string; status: boolean }, index: number) => (
                                    <tr key={phase.id} className="hover:bg-gray-50 transition duration-150">
                                        <td className="p-3 border-b border-gray-300 text-gray-700 font-medium">{phase.name}</td>
                                        <td className="p-3 border-b border-gray-300 text-gray-600">
                                            {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 border-b border-gray-300">
                                            <span
                                                className={`rounded-full px-3 py-1 text-sm ${phase.status ? 'bg-green-200 text-green-500' : 'bg-yellow-200 text-blue-500'
                                                    }`}
                                            >
                                                {phase.status ? 'Completed' : 'In Progress'}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b border-gray-300 text-center">
                                            <div className="flex items-center">
                                                {(selectedMembers[phase.id as keyof typeof selectedMembers] || []).slice(0, 4).map((member: { id: string; name: string; avatar: string }) => (
                                                    <div key={member.id} className="flex items-center">
                                                        <Image
                                                            src={getAvatar(member.avatar)}
                                                            alt={member.name}
                                                            width={20}
                                                            height={20}
                                                            className="rounded-full max-h-10 min-h-10 max-w-10 min-w-10 object-cover"
                                                            title={member.name}
                                                        />
                                                    </div>
                                                ))}

                                                {showMoreMembers[phase.id as keyof typeof showMoreMembers] && (
                                                    <div className="flex flex-wrap">
                                                        {(selectedMembers[phase.id as keyof typeof selectedMembers] || []).slice(4).map((member: { id: string; name: string; avatar: string }) => (
                                                            <div key={member.id} className="flex items-center">
                                                                <Image
                                                                    src={getAvatar(member.avatar)}
                                                                    alt={member.name}
                                                                    width={20}
                                                                    height={20}
                                                                    className="rounded-full max-h-10 min-h-10 max-w-10 min-w-10 object-cover"
                                                                    title={member.name}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {(selectedMembers[phase.id as keyof typeof selectedMembers] || []).length > 4 && (
                                                    <button
                                                        onClick={() => setShowMoreMembers((prev) => ({ ...prev, [phase.id]: !prev[phase.id] }))}
                                                        className="w-8 h-8 flex items-center justify-center"
                                                    >
                                                        <FaPlus className="text-gray-600" />
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => toggleDropdown(phase.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                                                >
                                                    <AiOutlineUserAdd className="text-gray-600" />
                                                </button>
                                            </div>


                                            {dropdownOpen[phase.id as keyof typeof dropdownOpen] && (
                                                <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-md w-48 mt-2 max-h-48 overflow-y-auto">
                                                    {members.map((member: { id: string; name: string; avatar: string }) => (
                                                        <div
                                                            key={member.id}
                                                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleSelectMember(phase.id, member.id)}
                                                        >
                                                            <Image
                                                                src={getAvatar(member.avatar)}
                                                                alt={member.name}
                                                                width={20}
                                                                height={20}
                                                                className="rounded-full max-h-10 min-h-10 max-w-10 min-w-10 object-cover"
                                                            />
                                                            <span className="text-sm text-gray-700">{member.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex justify-end">
                            <button
                                className={`px-4 py-2 rounded bg-blue-600 text-white ${saving}`}
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};
export default AssignMemberProjectModal;
