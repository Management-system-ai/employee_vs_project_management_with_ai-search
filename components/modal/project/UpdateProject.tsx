import React, { useState, useEffect } from 'react';
import { fetchDomains } from '@/app/api/domain/domain';
import { updateProject } from '@/app/api/apiProject/project_api';
import { Project, Domain } from '@/types/types';

interface UpdateProjectFormProps {
    project: Project;
    onClose: () => void;
    onUpdate: (updatedProject: Project) => void;
}

const UpdateProjectForm: React.FC<UpdateProjectFormProps> = ({
    project,
    onClose,
    onUpdate,
}) => {
    // Đảm bảo rằng hooks được gọi trong body function component
    const [domains, setDomains] = useState<Domain[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [updatedProject, setUpdatedProject] = useState<Project>(project);

    useEffect(() => {
        const loadDomains = async () => {
            try {
                const fetchedDomains = await fetchDomains();
                setDomains(fetchedDomains);
            } catch (error) {
                console.error('Error loading domains:', error);
            }
        };
        loadDomains();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const updatedData = await updateProject(project?.id, updatedProject);
            onUpdate(updatedData);
            onClose();
        } catch (error) {
            // console.error('Error updating project:', error);
            setError('Failed to update project. Please try again.');
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-1/2 rounded-lg bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Update Project</h2>
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
                        {/* Name */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedProject?.name || ''}
                                onChange={(e) =>
                                    setUpdatedProject({ ...updatedProject, name: e.target.value })
                                }
                                placeholder="Name"
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>

                        {/* Start Date */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">Start date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={updatedProject?.startDate || ''}
                                onChange={(e) =>
                                    setUpdatedProject({
                                        ...updatedProject,
                                        startDate: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>

                        {/* Domain */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">Domain</label>
                            <select
                                name="domainId"
                                className="w-full rounded-lg border border-gray-300 p-2"
                                value={updatedProject?.domainId || ''}
                                onChange={(e) =>
                                    setUpdatedProject({
                                        ...updatedProject,
                                        domainId: e.target.value,
                                    })
                                }
                            >
                                <option value="">
                                    {domains.length === 0
                                        ? 'Loading domains...'
                                        : 'Select domain'}
                                </option>
                                {domains.map((domain) => (
                                    <option key={domain.id} value={domain.id}>
                                        {domain.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* End Date */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">End date</label>
                            <input
                                type="date"
                                name="endDate"
                                value={updatedProject?.endDate || ''}
                                onChange={(e) =>
                                    setUpdatedProject({
                                        ...updatedProject,
                                        endDate: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            />
                        </div>

                        {/* Type */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">Type</label>
                            <select
                                name="type"
                                value={updatedProject?.type || ''}
                                onChange={(e) =>
                                    setUpdatedProject({ ...updatedProject, type: e.target.value })
                                }
                                className="w-full rounded-lg border border-gray-300 p-2"
                            >
                                <option value="">Select project type</option>
                                <option value="SHORT_TERM">SHORT_TERM</option>
                                <option value="LONG_TERM">LONG_TERM</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">Description</label>
                            <textarea
                                name="description"
                                value={updatedProject?.description || ''}
                                onChange={(e) =>
                                    setUpdatedProject({
                                        ...updatedProject,
                                        description: e.target.value,
                                    })
                                }
                                placeholder="Description"
                                className="w-full rounded-lg border border-gray-300 p-2"
                                rows={3}
                            ></textarea>
                        </div>

                        {/* Status */}
                        <div className="space-y-1">
                            <label className="font-lg font-bold">Status</label>
                            <div className="flex space-x-4">
                                {/* Active */}
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="true"
                                        checked={updatedProject.status === true}
                                        onChange={() =>
                                            setUpdatedProject({
                                                ...updatedProject,
                                                status: true, 
                                            })
                                        }
                                        className="h-4 w-4 text-red-600"
                                    />
                                    <span>Active</span>
                                </label>

                                {/* Inactive */}
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="false"
                                        checked={updatedProject.status === false}
                                        onChange={() =>
                                            setUpdatedProject({
                                                ...updatedProject,
                                                status: false, 
                                            })
                                        }
                                        className="h-4 w-4 text-red-600"
                                    />
                                    <span>Inactive</span>
                                </label>
                            </div>
                        </div>

                    </div>

                    {error && <div className="mt-4 text-red-500">{error}</div>}

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
                            disabled={isLoading}
                        >
                            {isLoading ? 'UPDATING...' : 'UPDATE'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProjectForm;
