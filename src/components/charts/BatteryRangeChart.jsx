import { useMemo } from 'react';
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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BatteryRangeChart({ data }) {
  const chartData = useMemo(() => {
    // Filter out vehicles with no or invalid range data
    const filteredData = data.filter(vehicle => {
      const range = parseInt(vehicle["Electric Range"]);
      return !isNaN(range) && range > 0;
    });

    // Create range buckets
    const rangeBuckets = {
      '0-100': 0,
      '101-200': 0,
      '201-250': 0,
      '251-300': 0,
      '301-350': 0,
      '351-400': 0,
      '400+': 0,
    };

    // Count vehicles in each range bucket
    filteredData.forEach(vehicle => {
      const range = parseInt(vehicle["Electric Range"]);
      
      if (range <= 100) rangeBuckets['0-100']++;
      else if (range <= 200) rangeBuckets['101-200']++;
      else if (range <= 250) rangeBuckets['201-250']++;
      else if (range <= 300) rangeBuckets['251-300']++;
      else if (range <= 350) rangeBuckets['301-350']++;
      else if (range <= 400) rangeBuckets['351-400']++;
      else rangeBuckets['400+']++;
    });

    // Calculate average electric range
    const averageRange = filteredData.length > 0
      ? Math.round(filteredData.reduce((sum, vehicle) => sum + parseInt(vehicle["Electric Range"]), 0) / filteredData.length)
      : 0;

    return {
      data: {
        labels: Object.keys(rangeBuckets),
        datasets: [
          {
            label: 'Number of Vehicles',
            data: Object.values(rangeBuckets),
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
          },
        ],
      },
      stats: {
        average: averageRange,
        median: calculateMedian(filteredData.map(v => parseInt(v["Electric Range"]))),
        max: Math.max(...filteredData.map(v => parseInt(v["Electric Range"]))),
      }
    };
  }, [data]);

  function calculateMedian(values) {
    if (!values.length) return 0;
    
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return Math.round((sorted[middle - 1] + sorted[middle]) / 2);
    }
    
    return sorted[middle];
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Vehicles: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Vehicles'
        },
      },
      x: {
        title: {
          display: true,
          text: 'Electric Range (miles)'
        },
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Battery Range Distribution</CardTitle>
        <CardDescription>
          Average: {chartData.stats.average} miles | Median: {chartData.stats.median} miles | Max: {chartData.stats.max} miles
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={chartData.data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}