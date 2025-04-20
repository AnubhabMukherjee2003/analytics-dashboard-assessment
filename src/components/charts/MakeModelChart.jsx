import { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MakeModelChart({ data }) {
  const [chartType, setChartType] = useState('make');
  const [limit, setLimit] = useState(10);

  const chartData = useMemo(() => {
    if (chartType === 'make') {
      // Process make data
      const makes = data.reduce((acc, vehicle) => {
        const make = vehicle.Make || "Unknown";
        acc[make] = (acc[make] || 0) + 1;
        return acc;
      }, {});

      // Sort and get top makes
      const sortedMakes = Object.entries(makes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

      return {
        labels: sortedMakes.map(([make]) => make),
        datasets: [
          {
            label: 'Number of Vehicles',
            data: sortedMakes.map(([_, count]) => count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };
    } else {
      // Process model data
      const models = data.reduce((acc, vehicle) => {
        const model = vehicle.Model || "Unknown";
        acc[model] = (acc[model] || 0) + 1;
        return acc;
      }, {});

      // Sort and get top models
      const sortedModels = Object.entries(models)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

      return {
        labels: sortedModels.map(([model]) => model),
        datasets: [
          {
            label: 'Number of Vehicles',
            data: sortedModels.map(([_, count]) => count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    }
  }, [data, chartType, limit]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Count: ${context.raw}`;
          }
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: true,
      animationDuration: 400,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="h-full chart-card">
      <CardHeader className="chart-card-header">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="chart-card-title">
            {chartType === 'make' ? 'Top Manufacturers' : 'Top Models'}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <div className="button-group">
              <button 
                className={`button-group-item ${chartType === 'make' ? 'active' : ''}`}
                onClick={() => setChartType('make')}
              >
                Makes
              </button>
              <button 
                className={`button-group-item ${chartType === 'model' ? 'active' : ''}`}
                onClick={() => setChartType('model')}
              >
                Models
              </button>
            </div>
            <div className="relative select-wrapper">
              <select 
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                aria-label="Select number of items to display"
                className="styled-select"
              >
                <option value={5}>Top 5</option>
                <option value={10}>Top 10</option>
                <option value={15}>Top 15</option>
                <option value={20}>Top 20</option>
              </select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}