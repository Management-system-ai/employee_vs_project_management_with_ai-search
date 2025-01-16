import {
  fetchEmployeeActivity,
  fetchEmPloyeeById
} from '@/app/api/employees/employee_api';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
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
  const [copy, setCopy] = useState(false);
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

  const copyMail = (employeeId: string | undefined) => {
    if (employeeId) {
      navigator.clipboard.writeText(employeeId);
      setCopy(true);
    }

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
        <div className="flex h-64 items-center justify-center over">
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-10 w-10 animate-spin fill-red-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>

          <p className="ml-4 text-red-600">Loading employees...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'detail':
        return (
          <div className="flex bg-white">
            <div className="flex w-1/5 items-center justify-center p-1">
              <Image
                src={getAvatar(employee.avatar)}
                alt={employee.name}
                width={96}
                height={96}
                className="rounded-md w-full max-w-24 h-24 object-cover "
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
                        copyMail(employee.id)
                      }
                      className="ml-2 rounded bg-blue-500 px-1 py-1 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
                    >
                      {copy ? (
                        <FaClipboardCheck className="text-white" />
                      ) : (
                        <FaClipboard className="text-white" />
                      )}
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
            {!Array.isArray(tabData) || tabData.length === 0 ? (
              <p>No activities found.</p>
            ) : (
              <div className=' max-h-80 overflow-y-auto'>
                <table className="w-full" style={{ maxHeight: '100px' }}>
                  <thead className="sticky top-0 bg-white">
                    <tr>
                      <th className="p-2 text-left">Project Name</th>
                      <th className="p-2 text-left">Phase Name</th>
                      <th className="p-2 text-left">Activity</th>
                      <th className="p-2 text-left">Time</th>
                    </tr>
                  </thead>
                  <tbody className="">
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
                            month: '2-digit',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex h-auto min-h-[400px] items-center justify-center bg-black bg-opacity-50">
      <div className=" h-3/4 w-1/2 rounded-lg bg-white p-6">
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
            className={`text-lg ${activeTab === 'detail' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
            onClick={() => setActiveTab('detail')}
          >
            Detail
          </button>
          <button
            className={`text-lg ${activeTab === 'activity' ? 'border-b-2 border-red-600 text-red-600' : ''}`}
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
