import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { processCountyData } from '../../utils/dataProcessing';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CountyDistributionChart = ({ data }) => {
  const [limit, setLimit] = useState(10);
  
  const countyData = processCountyData(data);
  
  // Limit the displayed counties
  const limitedData = {
    ...countyData,
    labels: countyData.labels.slice(0, limit),
    datasets: [{
      ...countyData.datasets[0],
      data: countyData.datasets[0].data.slice(0, limit)
    }]
  };
  
  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'EV Distribution by County',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Geographic Distribution</h2>
        <div>
          <select 
            value={limit} 
            onChange={(e) => setLimit(Number(e.target.value))}
            className="border rounded p-1 text-sm"
          >
            <option value="5">Top 5</option>
            <option value="10">Top 10</option>
            <option value="15">Top 15</option>
            <option value="20">Top 20</option>
          </select>
        </div>
      </div>
      <div className="h-[400px]">
        <Bar data={limitedData} options={options} />
      </div>
    </div>
  );
};

export default CountyDistributionChart;