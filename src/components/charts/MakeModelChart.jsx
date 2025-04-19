import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { processMakeData, processModelData } from '../../utils/dataProcessing';
import { useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MakeModelChart = ({ data }) => {
  const [chartType, setChartType] = useState('make');
  
  const makeData = processMakeData(data);
  const modelData = processModelData(data);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartType === 'make' ? 'Top EV Manufacturers' : 'Top EV Models',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Popular EVs in Washington</h2>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${chartType === 'make' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setChartType('make')}
          >
            Makes
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${chartType === 'model' ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setChartType('model')}
          >
            Models
          </button>
        </div>
      </div>
      <div className="h-[300px]">
        <Bar data={chartType === 'make' ? makeData : modelData} options={options} />
      </div>
    </div>
  );
};

export default MakeModelChart;