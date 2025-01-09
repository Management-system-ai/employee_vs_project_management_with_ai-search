import { fetchProjectPhases } from '@/app/api/project/projects';
import { fetchEmPloyee } from '@/app/api/employees/employee_api';
import React, { useEffect, useState } from 'react';

const AssignMemberProjectModal: React.FC<ProjectDetailProps> = ({
    project,
    onClose,
}) => {
    const [phases, setPhases] = useState<any[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const [phaseAssignments, setPhaseAssignments] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);

    // Tự động tải dữ liệu phases và members khi project thay đổi
    useEffect(() => {
        if (!project) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const [phaseData, memberData] = await Promise.all([
                    fetchProjectPhases(project.id), // Lấy danh sách phases
                    fetchEmPloyee(project.id), // Lấy danh sách thành viên
                ]);
                setPhases(phaseData);
                setMembers(memberData);

                // Khởi tạo dữ liệu assignments ban đầu (mỗi phase có danh sách riêng)
                const initialAssignments: Record<string, string[]> = {};
                phaseData.forEach((phase: any) => {
                    initialAssignments[phase.id] = []; // Mỗi phase có danh sách thành viên riêng
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
        setPhaseAssignments((prev) => {
            const updatedAssignments = [...(prev[phaseId] || [])];
            if (updatedAssignments.includes(memberId)) {
                // Nếu đã có, loại bỏ thành viên
                const index = updatedAssignments.indexOf(memberId);
                updatedAssignments.splice(index, 1);
            } else {
                // Nếu chưa có, thêm thành viên
                updatedAssignments.push(memberId);
            }
            return {
                ...prev,
                [phaseId]: updatedAssignments, // Cập nhật chỉ phase này
            };
        });
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
                    <div className="flex justify-center items-center h-20">
                        <div className="spinner-border h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500" />
                    </div>
                ) : (
                    <table className="w-full table-fixed border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border border-gray-300 text-left">Phase Name</th>
                                <th className="p-2 border border-gray-300 text-left">Duration</th>
                                <th className="p-2 border border-gray-300 text-left">Status</th>
                                <th className="p-2 border border-gray-300 text-center">Assigned To</th>
                            </tr>
                        </thead>
                        <tbody>
                            {phases.map((phase) => (
                                <tr key={phase.id}>
                                    <td className="p-2 border border-gray-300">{phase.phaseName}</td>
                                    <td className="p-2 border border-gray-300">
                                        {new Date(phase.startDate).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                        })}
                                        -{' '}
                                        {new Date(phase.endDate).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="p-2 border border-gray-300">
                                        {phase.status}
                                    </td>
                                    <td className="p-2 border border-gray-300 text-center">
                                        <div className="flex flex-col">
                                            {members.map((member) => (
                                                <label key={member.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={phaseAssignments[phase.id]?.includes(member.id)}
                                                        onChange={() => handleAssignChange(phase.id, member.id)}
                                                    />
                                                    <span>{member.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AssignMemberProjectModal;
