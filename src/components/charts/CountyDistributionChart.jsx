import { useMemo, useState } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CountyDistributionChart({ data }) {
  const [limit, setLimit] = useState(10);

  const chartData = useMemo(() => {
    // Count EVs by county
    const counties = data.reduce((acc, vehicle) => {
      const county = vehicle.County || "Unknown";
      acc[county] = (acc[county] || 0) + 1;
      return acc;
    }, {});

    // Sort counties by count and limit
    const sortedCounties = Object.entries(counties)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);

    return {
      labels: sortedCounties.map(([county]) => county),
      datasets: [
        {
          label: 'EV Count',
          data: sortedCounties.map(([_, count]) => count),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [data, limit]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = data.length;
            const percentage = ((value / total) * 100).toFixed(1);
            return `EVs: ${value} (${percentage}% of total)`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Electric Vehicles',
        },
        grid: {
          display: true,
          drawBorder: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'County',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="h-full chart-card">
      <CardHeader className="chart-card-header">
        <div className="flex items-center justify-between">
          <CardTitle className="chart-card-title">EV Distribution by County</CardTitle>
          <div className="relative">
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              aria-label="Select number of counties to display"
              className="pl-3 pr-8 py-1.5 rounded-md text-sm"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={15}>Top 15</option>
              <option value={20}>Top 20</option>
              <option value={39}>All Counties</option>
            </select>
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