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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/Card';

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
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return null;
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0.4)');
            return gradient;
          },
          borderColor: 'rgba(59, 130, 246, 1)',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointHoverRadius: 6,
          pointHoverBackgroundColor: 'rgba(59, 130, 246, 1)',
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
        },
        {
          label: 'Cumulative Growth',
          data: cumulative,
          borderColor: 'rgba(16, 185, 129, 1)',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 3,
          pointBackgroundColor: 'rgba(16, 185, 129, 1)',
          yAxisID: 'y1',
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(16, 185, 129, 1)',
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
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
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          boxHeight: 8,
          padding: 20,
          font: {
            size: 12,
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: 'rgba(229, 231, 235, 1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
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
          font: {
            size: 12,
            weight: 'normal'
          },
          padding: 10
        },
        grid: {
          drawBorder: false,
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cumulative Total',
          font: {
            size: 12,
            weight: 'normal'
          },
          padding: 10
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 12,
            weight: 'normal'
          },
          padding: 10
        },
        grid: {
          display: false,
          color: 'rgba(229, 231, 235, 0.5)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>EV Adoption Timeline</CardTitle>
        <CardDescription>Yearly registration of new electric vehicles</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}