import getImageSrc from '@/app/api/supabase/handleRetrive';
import { Activity } from '@/types/types';
import { formatRole } from '@/utils/formatRole';
import ProfileIcon from '@/resources/images/icons/icon profile.png';
import Image, { StaticImageData } from 'next/image';

interface ProjectListProps {
  projects: Activity[];
}

const ProjectResponsibilityList: React.FC<ProjectListProps> = ({
  projects
}) => {
  function getAvatar(avatar: string): string | StaticImageData {
    if (avatar) {
      const publicUrl = getImageSrc(avatar)?.publicUrl;
      return publicUrl || ProfileIcon;
    }
    return ProfileIcon;
  }

  return (
    <div>
      <div className="mt-4 space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="mt-4 space-y-4">
              {project.phases.map((phase, phaseIndex) => (
                <div
                  key={phaseIndex}
                  className="border-l-2 border-red-600 pl-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="text-xl font-bold">
                          {phase.projectName} Project:
                        </h5>
                        <h6 className="font-semibold">
                          {phase.phaseName} Phase
                        </h6>
                        <div className="text-sm text-gray-600">
                          ({new Date(phase.startDate).toLocaleDateString()} -{' '}
                          {new Date(phase.endDate).toLocaleDateString()})
                        </div>
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        phase.isFinished
                          ? 'bg-yellow-200 text-green-500'
                          : 'bg-yellow-200 text-blue-500'
                      }`}
                    >
                      {phase.isFinished ? 'Completed' : 'In Progress'}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {phase.activities.map((activity, activityIndex) => (
                      <div
                        key={activityIndex}
                        className="flex items-center gap-3 rounded-md bg-gray-50 p-2"
                      >
                        <Image
                          src={
                            activity.employeeAvatar
                              ? getAvatar(activity.employeeAvatar)
                              : ProfileIcon
                          }
                          alt={activity.employeeName}
                          width={48}
                          height={48}
                          className="max-h-12 min-h-12 min-w-12 max-w-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-700">
                            {activity.employeeName}
                            <span className="ml-2 text-sm text-gray-500">
                              {formatRole(activity.employeeRole)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {activity.action ? "Join" : "Left"}
                          </div>
                        </div>

                        <div className="text-sm text-gray-500">
                          {new Date(activity.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectResponsibilityList;
