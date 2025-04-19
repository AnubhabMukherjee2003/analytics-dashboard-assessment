import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { processEVTypeData } from '../../utils/dataProcessing';

ChartJS.register(ArcElement, Tooltip, Legend);

const EVTypeChart = ({ data }) => {
  const chartData = processEVTypeData(data);
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribution of Electric Vehicle Types',
        font: {
          size: 16
        }
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4">EV Type Distribution</h2>
      <div className="h-[250px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EVTypeChart;