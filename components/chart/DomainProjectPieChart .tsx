import React from 'react';
import { Pie } from 'react-chartjs-2';

interface ChartProps {
  data: { domain: string; count: number }[];
}

const DomainProjectDonutChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.domain),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    cutout: '50%',
  };

  return (
    <div className="w-full p-6">
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
};

export default DomainProjectDonutChart;
