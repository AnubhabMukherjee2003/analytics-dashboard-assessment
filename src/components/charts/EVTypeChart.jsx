import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function EVTypeChart({ data }) {
  const chartData = useMemo(() => {
    const evTypes = data.reduce((acc, vehicle) => {
      const type = vehicle["Electric Vehicle Type"] || "Unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Create simplified labels for better display
    const labels = Object.keys(evTypes).map(type => {
      if (type.includes("Battery Electric")) return "Battery Electric (BEV)";
      if (type.includes("Plug-in Hybrid")) return "Plug-in Hybrid (PHEV)";
      return type;
    });

    return {
      labels,
      datasets: [
        {
          data: Object.values(evTypes),
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(153, 102, 255, 0.8)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Electric Vehicle Types</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <Pie data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}