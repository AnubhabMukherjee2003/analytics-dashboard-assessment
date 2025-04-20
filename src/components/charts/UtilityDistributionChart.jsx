import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UtilityDistributionChart({ data }) {
  const chartData = useMemo(() => {
    // Aggregate utilities
    const utilityCount = data.reduce((acc, vehicle) => {
      let utility = vehicle["Electric Utility"];
      
      // Handle pipe-delimited values and clean utility names
      if (utility) {
        utility = utility.split('|')[0].trim();
        
        // Remove state designation
        utility = utility.replace(/ - \(WA\)$/, '');
        
        // Clean up common names
        if (utility.includes('PUGET SOUND')) utility = 'PUGET SOUND ENERGY';
        if (utility.includes('SEATTLE')) utility = 'SEATTLE CITY LIGHT';
        if (utility.includes('TACOMA')) utility = 'TACOMA POWER';
      } else {
        utility = 'Unknown';
      }
      
      acc[utility] = (acc[utility] || 0) + 1;
      return acc;
    }, {});

    // Sort and limit to top utilities
    const topUtilities = Object.entries(utilityCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
    
    // Combine smaller utilities as "Other"
    const otherCount = Object.entries(utilityCount)
      .sort((a, b) => b[1] - a[1])
      .slice(6)
      .reduce((sum, [_, count]) => sum + count, 0);
    
    if (otherCount > 0) {
      topUtilities.push(['Other', otherCount]);
    }

    const chartColors = [
      '#2563eb', // darker blue
      '#059669', // darker green
      '#d97706', // darker amber
      '#dc2626', // darker red
      '#7c3aed', // darker purple
      '#0891b2', // darker cyan
      '#64748b', // darker slate
    ];

    return {
      labels: topUtilities.map(([utility]) => utility),
      datasets: [
        {
          data: topUtilities.map(([_, count]) => count),
          backgroundColor: chartColors.slice(0, topUtilities.length),
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
        position: 'right',
        labels: {
          boxWidth: 15,
          font: {
            size: 11
          },
          padding: 15,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '45%',
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Electric Utilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}