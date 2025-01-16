'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { TopSkill } from '@/types/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopSkillsBarChartProps {
  topSkills: TopSkill[];
}

const TopSkillsBarChart: React.FC<TopSkillsBarChartProps> = ({ topSkills }) => {
  const data = {
    labels: topSkills.map(skill => skill.skillName),
    datasets: [
      {
        label: 'Number of project using this skill',
        data: topSkills.map(skill => skill.projectCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Top 5 skills using popular in the projects',
      },
    },
  };

  return (
    <div style={{ height: '320px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopSkillsBarChart;
