import React, { useState } from 'react';

interface ProjectDetailProps {
  project: {
    name: string;
    domain: string;
    type: string;
    description: string;
    status: string;
    phase: string;  
    members: string[] |null;  
    activities: string[] |null;  // Danh sách hoạt động
  } | null;
  onClose: () => void;
}

const DetailProjectModal: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('information');  

  if (!project) return null;

  // Hàm để hiển thị nội dung của từng tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'information':
        return (
          <div>
            <div><strong>Name: </strong>{project.name}</div>
            <div><strong>Domain: </strong>{project.domain}</div>
            <div><strong>Type: </strong>{project.type}</div>
            <div><strong>Description: </strong>{project.description}</div>
            <div><strong>Status: </strong>{project.status}</div>
          </div>
        );
      case 'phase':
        return <div><strong>Phase: </strong>{project.phase}</div>;
      case 'member':
        return (
          <div>
            <strong>Members:</strong>
            <ul>
              {/* {project.members.map((member, index) => (
                <li key={index}>{member}</li>
              ))} */}
            </ul>
          </div>
        );
      case 'activity':
        return (
          <div>
            <strong>Activities:</strong>
            <ul>
              {/* {project.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))} */}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2 h-1/2">
        <h2 className="text-xl font-bold mb-4">Project Details</h2>

        {/* Tabs */}
        <div className="mb-4 flex space-x-4">
          <button
            className={`px-4 ${activeTab === 'information' ? 'text-red-600 border-b-2 border-red-600' : ''}`}
            onClick={() => setActiveTab('information')}
          >
            Information
          </button>
          <button
            className={`px-4 ${activeTab === 'phase' ? 'text-red-600 border-b-2 border-red-600' : ''}`}
            onClick={() => setActiveTab('phase')}
          >
            Phase
          </button>
          <button
            className={`px-4 ${activeTab === 'member' ? 'text-red-600 border-b-2 border-red-600' : ''}`}
            onClick={() => setActiveTab('member')}
          >
            Member
          </button>
          <button
            className={`px-4 ${activeTab === 'activity' ? 'text-red-600 border-b-2 border-red-600' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>

        {/* Nội dung của tab hiện tại */}
        <div className="mb-4">
          {renderTabContent()}
        </div>

        {/* Close Button */}
        <div className="text-right mb-0">
          <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailProjectModal;
