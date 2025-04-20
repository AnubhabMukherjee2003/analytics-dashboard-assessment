import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function TimelineChart({ data }) {
  const chartData = useMemo(() => {
    // Extract model years and count vehicles
    const yearCountMap = data.reduce((acc, vehicle) => {
      const year = vehicle["Model Year"];
      if (!year || isNaN(parseInt(year))) return acc;
      
      const yearNum = parseInt(year);
      if (yearNum < 2010 || yearNum > 2023) return acc;
      
      acc[yearNum] = (acc[yearNum] || 0) + 1;
      return acc;
    }, {});
    
    // Create timeline data with all years from 2010-2023
    const years = Array.from({length: 14}, (_, i) => i + 2010);
    const counts = years.map(year => yearCountMap[year] || 0);
    
    // Calculate cumulative growth
    let cumulative = [];
    let sum = 0;
    for (const count of counts) {
      sum += count;
      cumulative.push(sum);
    }
    
    return {
      labels: years,
      datasets: [
        {
          label: 'New EVs by Year',
          data: counts,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        },
        {
          label: 'Cumulative Growth',
          data: cumulative,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          pointBackgroundColor: 'rgba(54, 162, 235, 1)',
          yAxisID: 'y1',
        },
      ],
    };
  }, [data]);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'New EVs Registered',
        },
        grid: {
          drawBorder: false,
        },
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cumulative Total',
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>EV Adoption Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}