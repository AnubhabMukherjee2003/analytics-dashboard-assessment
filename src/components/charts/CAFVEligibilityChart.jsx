import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { processCAFVEligibilityData } from '../../utils/dataProcessing';

ChartJS.register(ArcElement, Tooltip, Legend);

const CAFVEligibilityChart = ({ data }) => {
  const chartData = processCAFVEligibilityData(data);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
        }
      },
      title: {
        display: true,
        text: 'Clean Alternative Fuel Vehicle Eligibility',
        font: {
          size: 16
        }
      }
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-lg font-semibold mb-4">CAFV Eligibility Breakdown</h2>
      <div className="h-[250px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CAFVEligibilityChart;