import { useState, useEffect } from 'react';
import useEVData from './hooks/useEVData';
import useFilteredData from './hooks/useFilteredData';
import { Badge } from './components/ui/Badge';
import DashboardHeader from './components/dashboard/DashboardHeader';
import DashboardTabs from './components/dashboard/DashboardTabs';
import DashboardFilters from './components/dashboard/DashboardFilters';
import StatCard from './components/dashboard/StatCard';
import EVTypeChart from './components/charts/EVTypeChart';
import MakeModelChart from './components/charts/MakeModelChart';
import CountyDistributionChart from './components/charts/CountyDistributionChart';
import BatteryRangeChart from './components/charts/BatteryRangeChart';
import TimelineChart from './components/charts/TimelineChart';
import UtilityDistributionChart from './components/charts/UtilityDistributionChart';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card';

import { BatteryCharging, Car, Map, GanttChart } from 'lucide-react';

export default function App() {
  const { data, loading, error } = useEVData();
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({ year: 'all', make: 'all', county: 'all' });
  const filteredData = useFilteredData(data, filters);
  const [isDataReady, setIsDataReady] = useState(false);

  // Delayed loading state to prevent flickering for quick loads
  useEffect(() => {
    if (!loading && data.length) {
      // Short delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsDataReady(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading, data]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>An error occurred while loading the data:</p>
            <p className="mt-2 p-2 bg-red-50 text-red-800 rounded">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (!isDataReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  // Calculate summary statistics
  const calculateStats = () => {
    const bevCount = filteredData.filter(v => v["Electric Vehicle Type"]?.includes("Battery Electric")).length;
    const phevCount = filteredData.filter(v => v["Electric Vehicle Type"]?.includes("Plug-in Hybrid")).length;
    
    // Calculate valid ranges (non-zero and numeric)
    const validRanges = filteredData
      .map(v => parseInt(v["Electric Range"]))
      .filter(r => !isNaN(r) && r > 0);
      
    const avgRange = validRanges.length
      ? Math.round(validRanges.reduce((sum, r) => sum + r, 0) / validRanges.length)
      : 0;
    
    // Group by make for most popular
    const makeCount = filteredData.reduce((acc, v) => {
      acc[v.Make] = (acc[v.Make] || 0) + 1;
      return acc;
    }, {});
    
    const topMake = Object.entries(makeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    
    // Calculate delta from average for each stat
    const totalDelta = data.length > 0 
      ? Math.round((filteredData.length / data.length - 1) * 100) 
      : 0;
      
    const rangeDelta = data.length > 0
      ? Math.round((avgRange / (data.reduce((sum, v) => sum + parseInt(v["Electric Range"] || 0), 0) / data.length) - 1) * 100)
      : 0;
      
    return {
      total: filteredData.length,
      bev: bevCount,
      phev: phevCount,
      bevPercentage: Math.round((bevCount / filteredData.length) * 100),
      avgRange,
      topMake,
      totalDelta,
      rangeDelta
    };
  };
  
  const stats = calculateStats();

  // Render appropriate content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard 
                title="Total EVs" 
                value={stats.total.toLocaleString()} 
                delta={stats.totalDelta} 
                icon={Car} 
              />
              <StatCard 
                title="Battery EVs" 
                value={`${stats.bevPercentage}%`} 
                delta={0} 
                icon={BatteryCharging} 
              />
              <StatCard 
                title="Avg Range" 
                value={`${stats.avgRange} mi`} 
                delta={stats.rangeDelta} 
                icon={GanttChart} 
              />
              <StatCard 
                title="Top Make" 
                value={stats.topMake} 
                icon={Car} 
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <EVTypeChart data={filteredData} />
              <MakeModelChart data={filteredData} />
            </div>
            <div className="grid grid-cols-1 mb-6">
              <TimelineChart data={filteredData} />
            </div>
          </>
        );
      case 'vehicles':
        return (
          <>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <MakeModelChart data={filteredData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BatteryRangeChart data={filteredData} />
              <EVTypeChart data={filteredData} />
            </div>
          </>
        );
      case 'geography':
        return (
          <>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <CountyDistributionChart data={filteredData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <UtilityDistributionChart data={filteredData} />
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium mb-2">Geographic Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="primary">Insight</Badge>
                    <span>King County has the highest concentration of EVs in Washington State</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="primary">Insight</Badge>
                    <span>Urban areas show significantly higher EV adoption rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="primary">Insight</Badge>
                    <span>Seattle has the highest city-level EV registration count</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        );
      case 'trends':
        return (
          <>
            <div className="grid grid-cols-1 gap-6 mb-6">
              <TimelineChart data={filteredData} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BatteryRangeChart data={filteredData} />
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium mb-2">EV Trends</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="success">Trend</Badge>
                    <span>Increasing average battery range over time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="success">Trend</Badge>
                    <span>Growth in BEV adoption vs PHEV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="success">Trend</Badge>
                    <span>More diverse range of manufacturers entering the market</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        );
      default:
        return <p>Select a tab to view data</p>;
    }
  };

  const tabIcons = {
    'overview': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-2"><BatteryCharging size={14} /></div>,
    'vehicles': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 mr-2"><Car size={14} /></div>,
    'geography': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 mr-2"><Map size={14} /></div>,
    'trends': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 mr-2"><GanttChart size={14} /></div>,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            {tabIcons[activeTab]}
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <Badge variant="primary" className="px-3 py-1">
            {filteredData.length.toLocaleString()} vehicles
          </Badge>
        </div>
        
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <DashboardFilters data={data} onFiltersChange={setFilters} />
        
        {renderTabContent()}
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-90">Electric Vehicle Population Data Analytics Dashboard</p>
          <p className="text-xs mt-1 text-gray-400">Data source: Washington State Department of Licensing</p>
        </div>
      </footer>
    </div>
  );
}