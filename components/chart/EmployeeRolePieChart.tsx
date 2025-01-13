import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { formatRole } from '@/utils/formatRole';

ChartJS.register(ArcElement, Tooltip, Legend);

interface RoleData {
  role: string;
  count: number;
}

const EmployeeRolePieChart: React.FC<{ data: RoleData[] }> = ({ data }) => {
  const chartData = {
    labels: data.map(item => formatRole(item.role)),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <div className="p-6">
      <Pie data={chartData} />
    </div>
  );
};

export default EmployeeRolePieChart;
