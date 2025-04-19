import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { processUtilityData } from '../../utils/dataProcessing';

ChartJS.register(ArcElement, Tooltip, Legend);

const UtilityDistributionChart = ({ data }) => {
  const chartData = processUtilityData(data);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          font: {
            size: 11
          }
        }
      },
      title: {
        display: true,
        text: 'Electric Utility Distribution',
        font: {
          size: 16
        }
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4">Electric Utility Distribution</h2>
      <div className="h-[300px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default UtilityDistributionChart;