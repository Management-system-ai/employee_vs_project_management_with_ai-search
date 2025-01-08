import {
    fetchEmployeeActivity,
    fetchEmPloyeeById
} from '@/app/api/employees/employee_api';
import { getEmployeeSkillsById } from '@/app/server-actions/prisma';
import React, { useEffect, useState } from 'react';

const DetailEmployeeModal: React.FC<EmployeeDetailProps> = ({
    employee,
    onClose
}) => {
    const [activeTab, setActiveTab] = useState('detail');
    const [tabData, setTabData] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (employee == undefined) return;
        let data: any = [];
        let skillUser: any = [];
        const loadData = async () => {
            setLoading(true);
         
            switch (activeTab) {
                case 'detail':
                    if (employee.id) {
                        data = await fetchEmPloyeeById(employee.id);
                        skillUser = await getEmployeeSkillsById(employee.id);
                    }
                    console.log(skills)
                    break;
                case 'activity':
                    data = await fetchEmployeeActivity(employee.id);
                    console.log(data)
                    break;
                default:
                    break;
            }
            setTabData(data);
            setSkills(skillUser)
            setLoading(false);
        };

        if (activeTab !== 'information') {
            loadData();
        }
    }, [activeTab, employee]);

    if (!employee) return null;

    const renderTabContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center p-6">
                    <div className="spinner-border border-3 inline-block h-12 w-12 animate-spin rounded-full border-red-600 border-t-transparent" />
                </div>
            );
        }

        switch (activeTab) {
            case 'detail':
                return (
                    <div className="bg-white">
                        <div className="space-y-2">
                            <div className="flex">
                                <span className="font-lg w-1/6 font-bold">Avatar:</span>
                                <span>{employee.avatar}</span>
                            </div>
                            <div className="flex">
                                <span className="font-lg w-1/6 font-bold">Name:</span>
                                <span>{employee.name}</span>
                            </div>
                            <div className="flex">
                                <span className="font-lg w-1/6 font-bold">Email:</span>
                                <span>{employee.email}</span>
                            </div>
                            <div className="flex">
                                <span className="font-lg w-1/6 font-bold">Joining Date:</span>
                                {employee.joiningDate
                                    ? new Date(employee.joiningDate).toLocaleDateString("en-GB")
                                    : "N/A"}
                            </div>
                            <div className="flex">
                                <span className="font-lg w-1/6 font-bold">Role:</span>
                                <span>{employee.role}</span>
                            </div>
                            <div className="flex">
                                <span className="font-lg w-1/6 font-bold">Skills:</span>
                                <div className="w-5/6 space-y-1">
                                    {skills && skills.length > 0 ? (
                                        skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded mr-2"
                                            >
                                                {skill.skill.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span>No skills added</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'activity':
                return (
                    <div>
                        {!Array.isArray(tabData) || tabData.length == 0 ? (
                            <p>No activities found.</p>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="p-2 text-left">Project Name</th>
                                        <th className="p-2 text-left">Phase Name</th>
                                        <th className="p-2 text-left">Activity</th>
                                        <th className="p-2 text-left">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabData?.map((activity, index) => (
                                        <tr key={index} className="space-y-2">
                                            <td className="p-2 text-left">{activity.project.name}</td>
                                            <td className="p-2 text-left">{activity.phase.name}</td>
                                            <td className="p-2 text-left">
                                                <span className={`px-1 py-1/2 badge ${activity.action ? "join" : "leave"}`}>
                                                    {activity.action ? "Join" : "Leave"}
                                                </span>
                                            </td>
                                            <td className="p-2 text-left">
                                                {new Date(activity.updatedAt).toLocaleString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit'
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                    <h2 className="mb-4 text-xl font-bold">Employee Details</h2>
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
                        className={`px-4 text-lg ${activeTab === 'detail' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
                        onClick={() => setActiveTab('detail')}
                    >
                        Detail
                    </button>
                    <button
                        className={`px-4 text-lg ${activeTab === 'activity' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
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

export default DetailEmployeeModal;
