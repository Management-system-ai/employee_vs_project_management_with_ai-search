import { createEmployee } from '@/app/api/employees/employee_api';
import { fetchSkill } from '@/app/api/skills/skill_api';
import React, { useEffect, useState } from 'react';

const CreateEmployeeModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[] | []>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    joiningDate: '',
    role: '',
    avatar: '',
    skills: [] as string[],
  });

  const fetchData = async () => {
    try {
      const res = await fetchSkill();
      setSkills(res);
    } catch (error) {
      throw error;
    }
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({
      name: '',
      email: '',
      dob: '',
      joiningDate: '',
      role: '',
      avatar: '',
      skills: [],
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: target.files ? target.files[0] : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    createEmployee(formData);
    toggleModal();
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div>
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Create Employee
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter employee name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter employee email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dob" className="block text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleChange}
                    value={formData.dob}
                  />
                </div>
                <div>
                  <label htmlFor="joiningDate" className="block text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleChange}
                    value={formData.joiningDate}
                  />
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="role" className="block text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleChange}
                    value={formData.role}
                  >
                    <option value="">Select Role</option>
                    <option value="TEAM_LEAD">Team Lead</option>
                    <option value="PROJECT_MANAGER">Project Manager</option>
                    <option value="QA">QA</option>
                    <option value="DESIGN">Designer</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="avatar" className="block text-gray-700">
                    Avatar
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    className="w-full px-3 py-2 border rounded"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Skills</label>
                <div className="grid grid-cols-4 gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center rounded border p-2">
                      <input
                        type="checkbox"
                        id={`skill-${index}`}
                        value={skill.name}
                        className="mr-2"
                        onChange={handleCheckboxChange}
                        checked={formData.skills.includes(skill.name)}
                      />
                      <label htmlFor={`skill-${index}`} className="text-gray-700 w-full p-1">
                        {skill.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEmployeeModal;
