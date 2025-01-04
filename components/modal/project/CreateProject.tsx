import React, { useState, useEffect } from 'react';
import { fetchDomains } from '@/app/api/domain/domain';

const AddProjectModal = ({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newProject: Project) => void;
}) => {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDomains = async () => {
      setIsLoading(true);
      try {
        const domainsData = await fetchDomains();
        setDomains(domainsData);
      } catch (error) {
        console.error('Error loading domains:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadDomains();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newProject: Project = {
      name: formData.get('name') as string,
      domainId: formData.get('domainId') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      updatedAt: new Date().toISOString()
      // status: 'Not Started',
    };
    try {
      await onAdd(newProject);
      onClose();
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/2 rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add Project</h2>
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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-lg font-bold">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-lg font-bold">Start date</label>
              <input
                type="date"
                name="startDate"
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-lg font-bold">Domain</label>
              <select
                name="domainId"
                className="w-full rounded-lg border border-gray-300 p-2"
                disabled={isLoading}
              >
                <option value="">
                  {isLoading ? 'Loading domains...' : 'Select domain'}
                </option>
                {domains.map(domain => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-lg font-bold">End date</label>
              <input
                type="date"
                name="endDate"
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>

            <div className="space-y-1">
              <label className="font-lg font-bold">Type</label>
              <select
                name="type"
                className="w-full rounded-lg border border-gray-300 p-2"
              >
                <option value="">Select project type</option>
                <option value="SHORT_TERM">SHORT_TERM</option>
                <option value="LONG_TERM">LONG_TERM</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-lg font-bold">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                className="w-full rounded-lg border border-gray-300 p-2"
                rows={3}
              ></textarea>
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
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-white"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
