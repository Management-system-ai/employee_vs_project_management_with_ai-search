import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { fetchDomains } from '@/app/api/project_api';

interface Domain {
    id: string;
    name: string;
}

const AddProjectModal = ({ isOpen, onClose, onAdd }: {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            updatedAt: new Date().toISOString(),
            // status: 'Not Started', 
        };

        onAdd(newProject); // Gọi hàm onAdd khi submit
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md rounded-lg p-6">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button onClick={onClose} className="p-1">
                        <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-xl font-semibold ml-4">ADD PROJECTS</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Name Project </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">Domain</label>
                        <select
                            name="domainId"
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                            disabled={isLoading}
                        >
                            <option value="">
                                {isLoading ? 'Loading domains...' : 'Select domain'}
                            </option>
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
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-500">End date</label>
                        <input
                            type="date"
                            name="endDate"
                            className="w-full p-2 bg-gray-50 rounded-lg border border-gray-200"
                        />
                    </div>


                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2 rounded-lg bg-red-500 text-white font-medium"
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2 rounded-lg bg-orange-500 text-white font-medium"
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