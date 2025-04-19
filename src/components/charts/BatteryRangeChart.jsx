import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { processBatteryRangeData } from '../../utils/dataProcessing';

ChartJS.register(ArcElement, Tooltip, Legend);

const BatteryRangeChart = ({ data }) => {
  const chartData = processBatteryRangeData(data);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
        }
      },
      title: {
        display: true,
        text: 'Battery Range Distribution (miles)',
        font: {
          size: 16
        }
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4">Battery Range Analysis</h2>
      <div className="h-[300px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BatteryRangeChart;