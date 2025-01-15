import React, { useEffect, useState } from 'react';
import { UpdateEmployeeProps, Role } from '@/types/types';
import {
  getSkills,
  updateEmployee
} from '@/app/server-actions/supabase/server';
import {
  deleteEmployeeSkillsByEmployeeId,
  getEmployeeSkillsById
} from '@/app/server-actions/prisma';
import { createEmployeeSkills } from '@/app/api/employees/employee_api';
import Image, { StaticImageData } from 'next/image';
import ProfileIcon from '@/resources/images/icons/icon profile.png';
import getImageSrc from '@/app/api/supabase/handleRetrive';
import { avatar } from '@nextui-org/theme';
import uploadImage from '@/app/api/supabase/handleUpload';
import generateHash from '@/utils/hashGen';

const UpdateEmployeeModal: React.FC<UpdateEmployeeProps> = ({
  employee,
  onCloseUpdate
}) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    joiningDate: '',
    email: '',
    role: '',
    avatar: '',
    isActive: false
  });

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [employeeSkills, setEmployeeSkills] = useState<string[]>([]);
  const [isSkillsLoading, setIsSkillsLoading] = useState(true);
  const [userAvatar, setUserAvatar] = useState(employee?.avatar);

  const fetchData = async () => {
    setIsSkillsLoading(true);
    try {
      const allSkills = await getSkills();
      const eSkills = await getEmployeeSkillsById(employee?.id);

      const filterSkillName = allSkills.map(item => item.name);
      const filterEmployeeSkillName = eSkills.map(item => item.skill.name);

      setSkills(filterSkillName);
      setEmployeeSkills(filterEmployeeSkillName);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setIsSkillsLoading(false);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setEmployeeSkills(prevSkills =>
      checked
        ? [...prevSkills, value]
        : prevSkills.filter(skill => skill !== value)
    );
  };

  function getAvatar(avatar: string | undefined): string | StaticImageData {
    if (avatar) {
      const publicUrl = getImageSrc(avatar)?.publicUrl;
      return publicUrl || ProfileIcon;
    }
    return ProfileIcon;
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        console.log(
          'Invalid file type. Please select a valid image (JPEG, PNG, or GIF).'
        );
        return;
      }
      const nameFile = await generateHash(
        employee?.avatar + new Date().toISOString()
      );
      await uploadImage(nameFile, file);
      setUserAvatar(nameFile);
      setFormData({ ...formData, avatar: nameFile });
    } else {
      console.log('No file selected.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [employee]);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        dateOfBirth: employee.dateOfBirth?.split('T')[0] || '',
        joiningDate: employee.joiningDate?.split('T')[0] || '',
        email: employee.email || '',
        role: employee.role || '',
        avatar: employee.avatar || '',
        isActive: employee.isActive || false
      });
    }
  }, [employee, employeeSkills]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await deleteEmployeeSkillsByEmployeeId(employee?.id as string);
      await createEmployeeSkills(employee?.id as string, employeeSkills);
      await updateEmployee(employee?.id as string, formData);
      onCloseUpdate();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {employee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/2 rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Update Employee</h2>
              <button
                onClick={onCloseUpdate}
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
            <form>
              <div className="mb-4 flex items-center justify-center">
                <div className="relative h-32 w-32">
                  <Image
                    src={getAvatar(userAvatar)}
                    alt={employee.name}
                    width={128}
                    height={128}
                    className="max-h-full min-h-full max-w-full overflow-hidden rounded-full border border-gray-300 object-cover"
                  />
                  <label
                    htmlFor="avatarUpload"
                    className="absolute bottom-1 right-1 cursor-pointer rounded-full bg-blue-500 p-1.5 text-sm text-white shadow-md hover:bg-blue-600"
                    title="Update Avatar"
                  >
                    <input
                      id="avatarUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    📤
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-lg font-bold">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={e =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-lg font-bold">Joining Date</label>
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={e =>
                      setFormData({ ...formData, joiningDate: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-lg font-bold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-lg font-bold">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={e =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 p-2"
                    required
                  >
                    {Object.values(Role).map(role => (
                      <option key={role.value} value={role.value}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-8">
                  <div className="flex-1 space-y-1">
                    <label className="font-lg font-bold">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          dateOfBirth: e.target.value
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5 mt-2">
                <label className="block font-bold text-gray-700">Skills</label>
                {isSkillsLoading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="h-6 w-6 animate-spin text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded border p-2"
                      >
                        <input
                          type="checkbox"
                          id={`skill-${index}`}
                          value={skill}
                          className="mr-2"
                          onChange={handleCheckboxChange}
                          checked={employeeSkills.includes(skill)}
                        />
                        <label
                          htmlFor={`skill-${index}`}
                          className="w-full p-1 text-gray-700"
                        >
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-end justify-end gap-4">
                <button
                  type="button"
                  onClick={onCloseUpdate}
                  className="rounded-lg border-2 px-4 py-2 text-gray-600"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  className={`rounded-lg px-4 py-2 ${
                    loading ? 'bg-gray-400' : 'bg-red-600'
                  } text-white`}
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? 'LOADING...' : 'SUBMIT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateEmployeeModal;
