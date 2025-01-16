'use client';

import React, { useEffect, useState } from 'react';
import EmployeeRolePieChart from '@/components/chart/EmployeeRolePieChart';
import DomainProjectDonutChart from '@/components/chart/DomainProjectPieChart ';
import ProjectResponsibilityList from '@/components/table/ProjectResponsibilityList';
import {
  fetchEmployeeRolesDistribution,
  fetchProjectData,
  fetchRecentlyActivities,
  fetchSkillsData
} from './server-actions/prisma';
import { Activity, TopSkillsData } from '@/types/types';
import TopSkillsBarChart from '@/components/chart/TopSkillsBarChart';

interface RoleData {
  role: string;
  count: number;
}

interface DomainData {
  domain: string;
  count: number;
}

const DashboardPage: React.FC = () => {
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [domainData, setDomainData] = useState<DomainData[]>([]);
  const [skillsData, setSkillsData] = useState<TopSkillsData>({
    totalSkills: 0,
    topSkills: []
  });
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [
          roleDistribution,
          projectDataResponse,
          activitiesResponse,
          skillsResponse
        ] = await Promise.all([
          fetchEmployeeRolesDistribution(),
          fetchProjectData(),
          fetchRecentlyActivities(),
          fetchSkillsData()
        ]);

        const mappedRoleData = roleDistribution.map(item => ({
          role: item.role,
          count: item.count
        }));
        const totalEmployeeCount = roleDistribution.reduce(
          (acc, item) => acc + item.count,
          0
        );

        setRoleData(mappedRoleData);
        setTotalEmployees(totalEmployeeCount);
        setTotalProjects(projectDataResponse.totalProjects);
        setDomainData(projectDataResponse.domainDetails);
        setActivities(activitiesResponse.activities);
        setSkillsData(skillsResponse);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800">Total Employees</h2>
            <p className="mt-4 text-3xl font-bold text-gray-600">
              {totalEmployees}
            </p>
            {loading ? (
              <div className="flex h-64 items-center justify-center">
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
            ) : (
              <EmployeeRolePieChart data={roleData} />
            )}
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800">Domain Projects</h2>
            <p className="mt-4 text-3xl font-bold text-gray-600">
              {totalProjects}
            </p>
            {loading ? (
              <div className="flex h-64 items-center justify-center">
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
                <p className="ml-4 text-red-600">Loading projects...</p>
              </div>
            ) : (
              <DomainProjectDonutChart data={domainData} />
            )}
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-xl font-bold text-gray-800">Popular skills in projects</h2>
            <p className="mt-4 text-3xl font-bold text-gray-600">
              {skillsData.totalSkills}
            </p>
            {loading ? (
              <div className="flex h-64 items-center justify-center">
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
                <p className="ml-4 text-red-600">Loading top 5 skills...</p>
              </div>
            ) : (
              <div className="mt-6 h-64">
                <TopSkillsBarChart topSkills={skillsData.topSkills} />
              </div>
            )}
          </div>
        </div>

        {/* Activities Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {' '}
            Recent Project Activities
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="h-auto rounded-lg bg-white p-6 shadow">
              {loading ? (
                <div className="flex h-64 items-center justify-center">
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
                  <p className="ml-4 text-red-600">Loading activities...</p>
                </div>
              ) : (
                <ProjectResponsibilityList projects={activities} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
