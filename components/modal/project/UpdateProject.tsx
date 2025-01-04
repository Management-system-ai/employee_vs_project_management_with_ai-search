import React, { useState } from 'react';

interface UpdateProjectFormProps {
    project: Project;
    onClose: () => void;
    onUpdate: (updatedProject: Project) => void;
    domains: Domain[]; 
    isLoading: boolean;
    error: string | null;
}

const UpdateProjectForm: React.FC<UpdateProjectFormProps> = ({
    project,
    onClose,
    onUpdate,
    domains,
    isLoading,
    error
}) => {
    const [updatedProject, setUpdatedProject] = useState<Project>(project);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onUpdate(updatedProject);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg p-6">
                <div className="flex items-center mb-6">
                    <h2 className="text-xl font-semibold ml-4">UPDATE PROJECT</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedProject.name}
                            onChange={(e) =>
                                setUpdatedProject({ ...updatedProject, name: e.target.value })
                            }
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={updatedProject.description}
                            onChange={(e) =>
                                setUpdatedProject({ ...updatedProject, description: e.target.value })
                            }
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Domain</label>
                        <select
                            name="domainId"
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                            disabled={isLoading}
                            value={updatedProject.domainId}
                            onChange={(e) =>
                                setUpdatedProject({ ...updatedProject, domainId: e.target.value })
                            }
                        >
                            <option value="">Select domain</option>
                            {domains.map((domain) => (
                                <option key={domain.id} value={domain.id}>
                                    {domain.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Type</label>
                        <select
                            name="type"
                            value={updatedProject.type}
                            onChange={(e) =>
                                setUpdatedProject({ ...updatedProject, type: e.target.value })
                            }
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            <option value="">Select project type</option>
                            <option value="SHORT_TERM">SHORT_TERM</option>
                            <option value="LONG_TERM">LONG_TERM</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Start date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={updatedProject.startDate}
                            onChange={(e) =>
                                setUpdatedProject({ ...updatedProject, startDate: e.target.value })
                            }
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">End date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={updatedProject.endDate}
                            onChange={(e) =>
                                setUpdatedProject({ ...updatedProject, endDate: e.target.value })
                            }
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    {error && <div className="text-red-500">{error}</div>}

                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 rounded-lg bg-red-500 text-white font-medium"
                            disabled={isLoading}
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 rounded-lg bg-orange-500 text-white font-medium"
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

