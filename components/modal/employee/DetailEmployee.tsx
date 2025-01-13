import {
  fetchEmployeeActivity,
  fetchEmPloyeeById
} from '@/app/api/employees/employee_api';
import { getEmployeeSkillsById } from '@/app/server-actions/prisma';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import { EmployeeDetailProps } from '@/types/types';
import getImageSrc from '@/app/api/supabase/handleRetrive';
import ProfileIcon from '@/resources/images/icons/icon profile.png';

const DetailEmployeeModal: React.FC<EmployeeDetailProps> = ({
  employee,
  onCloseDetail
}) => {
  const [activeTab, setActiveTab] = useState('detail');
  const [tabData, setTabData] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function getAvatar(avatar: string): string | StaticImageData {
    if (avatar) {
      const publicUrl = getImageSrc(avatar)?.publicUrl;
      return publicUrl || ProfileIcon;
    }
    return ProfileIcon;
  }

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
          break;
        case 'activity':
          data = await fetchEmployeeActivity(employee.id);
          console.log(data);
          break;
        default:
          break;
      }
      setTabData(data);
      setSkills(skillUser);
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
          <div className="flex bg-white">
            <div className="flex w-1/5 items-center justify-center p-4">
              <Image
                src={getAvatar(employee.avatar)}
                alt={employee.name}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>

            <div className="w-4/5 p-4">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-lg w-1/4 font-bold">Day of Birth:</span>
                  <span>
                    {employee.dateOfBirth
                      ? new Date(employee.dateOfBirth).toLocaleDateString(
                          'en-GB'
                        )
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-lg w-1/4 font-bold">Name:</span>
                  <span>{employee.name}</span>
                </div>
                <div className="flex">
                  <span className="font-lg w-1/4 font-bold">Joining Date:</span>
                  {employee.joiningDate
                    ? new Date(employee.joiningDate).toLocaleDateString('en-GB')
                    : 'N/A'}
                </div>
                <div className="flex">
                  <span className="font-lg w-1/4 font-bold">Role:</span>
                  <span>
                    {employee.role
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}{' '}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-lg w-1/4 font-bold">Email:</span>
                  <div className="flex w-3/4 items-center">
                    <span
                      className="block w-full max-w-md truncate"
                      title={employee.email}
                    >
                      {employee.email}
                    </span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(employee.email)
                      }
                      className="ml-2 rounded bg-blue-500 px-2 py-1 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <span className="font-lg w-1/4 font-bold">Skills:</span>
                  <div className="w-3/4 space-y-1">
                    {skills && skills.length > 0 ? (
                      skills.map((skill, index) => (
                        <span
                          key={index}
                          className="mr-2 inline-block rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800"
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
                        <span
                          className={`py-1/2 badge px-1 ${activity.action ? 'join' : 'leave'}`}
                        >
                          {activity.action ? 'Join' : 'Leave'}
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
    <div className="fixed inset-0 flex h-auto min-h-[400px] items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-6">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-bold">Employee Details</h2>
          <button
            onClick={onCloseDetail}
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
