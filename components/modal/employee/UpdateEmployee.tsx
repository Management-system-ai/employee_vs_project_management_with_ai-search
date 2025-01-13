import React, { useEffect, useState } from 'react';
import { UpdateEmployeeProps, Role } from '@/types/types';
import { updateEmployee } from '@/app/server-actions/supabase/server';

const UpdateEmployeeModal: React.FC<UpdateEmployeeProps> = ({
  isOpen,
  employee,
  onClose
}) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    age: employee?.age || null,
    joiningDate: employee?.joiningDate || '',
    email: employee?.email || '',
    role: employee?.role || '',
    avatar: employee?.avatar || '',
    isActive: employee?.isActive
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        age: employee.age ?? null,
        joiningDate: employee.joiningDate as string,
        email: employee.email,
        role: employee.role,
        avatar: employee.avatar,
        isActive: employee.isActive
      });
    }
  }, [employee]);

  const handleUpdate = async () => {
    try {
      await updateEmployee(employee?.id as string, formData);
      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Update Employee</h2>
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
        <form>
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
              />
            </div>

            <div className="space-y-1">
              <label className="font-lg font-bold">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate?.split('T')[0]}
                onChange={e =>
                  setFormData({ ...formData, joiningDate: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 p-2"
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
              >
                <option value={Role.developer.value}>
                  {Role.developer.name}
                </option>
                <option value={Role.teamLeader.value}>
                  {Role.teamLeader.name}
                </option>
                <option value={Role.designer.value}>
                  {Role.designer.name}
                </option>
                <option value={Role.tester.value}>{Role.tester.name}</option>
                <option value={Role.projectManager.value}>
                  {Role.projectManager.name}
                </option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-lg font-bold">Avatar</label>
              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={formData.avatar}
                onChange={e =>
                  setFormData({ ...formData, avatar: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>

            <div className="flex gap-8">
              <div className="flex-1 space-y-1">
                <label className="font-lg font-bold">Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age === null ? '' : formData.age}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      age: parseInt(e.target.value) || null
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="font-lg font-bold">Is Active</label>
                <div className="flex h-[42px] items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={e =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-end justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border-2 px-4 py-2 text-gray-600"
            >
              CANCEL
            </button>
            <button
              type="button"
              className="rounded-lg bg-red-600 px-4 py-2 text-white"
              onClick={() => handleUpdate()}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployeeModal;
