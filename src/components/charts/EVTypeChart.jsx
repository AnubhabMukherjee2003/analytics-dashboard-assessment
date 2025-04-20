import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../ui/Card';

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
            'rgba(59, 130, 246, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
          borderColor: [
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 1)',
          ],
          borderWidth: 2,
          hoverOffset: 15,
          hoverBorderWidth: 3,
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
          pointStyle: 'circle',
          boxWidth: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: 'rgba(229, 231, 235, 1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
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
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
    cutout: '60%',
    radius: '90%',
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Electric Vehicle Types</CardTitle>
        <CardDescription>Distribution of EVs by vehicle type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] flex items-center justify-center">
          <Pie data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}