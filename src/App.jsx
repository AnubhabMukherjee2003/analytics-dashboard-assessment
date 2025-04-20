import { useState, useEffect } from 'react';
import useEVData from './hooks/useEVData';
import useFilteredData from './hooks/useFilteredData';
import { Badge } from './components/ui/Badge';
import { ThemeProvider } from './components/theme/ThemeProvider';
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
import { Button } from './components/ui/Button'; // Assuming Button component exists or use standard button
import { RotateCcw } from 'lucide-react'; // Icon for reset button

import { BatteryCharging, Car, Map, GanttChart, Copyright } from 'lucide-react';

function DashboardApp() {
  const { data, loading, error } = useEVData();
  const [activeTab, setActiveTab] = useState('overview');
  const initialFilters = { year: 'all', make: 'all', county: 'all' }; // Define initial state
  const [filters, setFilters] = useState(initialFilters);
  const filteredData = useFilteredData(data, filters);
  const [isDataReady, setIsDataReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>An error occurred while loading the data:</p>
            <p className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded">{error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  if (!isDataReady) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-400 dark:border-blue-600 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard data...</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2 dark:text-white">Geographic Insights</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="primary">Insight</Badge>
                    <span className="dark:text-gray-300">King County has the highest concentration of EVs in Washington State</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="primary">Insight</Badge>
                    <span className="dark:text-gray-300">Urban areas show significantly higher EV adoption rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="primary">Insight</Badge>
                    <span className="dark:text-gray-300">Seattle has the highest city-level EV registration count</span>
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
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-2 dark:text-white">EV Trends</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="success">Trend</Badge>
                    <span className="dark:text-gray-300">Increasing average battery range over time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="success">Trend</Badge>
                    <span className="dark:text-gray-300">Growth in BEV adoption vs PHEV</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="success">Trend</Badge>
                    <span className="dark:text-gray-300">More diverse range of manufacturers entering the market</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        );
      default:
        return <p className="dark:text-gray-300">Select a tab to view data</p>;
    }
  };

  const tabIcons = {
    'overview': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-2"><BatteryCharging size={14} /></div>,
    'vehicles': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-2"><Car size={14} /></div>,
    'geography': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-300 mr-2"><Map size={14} /></div>,
    'trends': <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 mr-2"><GanttChart size={14} /></div>,
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilters(initialFilters);
    // Optionally close sidebar on mobile after reset
    if (window.innerWidth < 1024 && sidebarOpen) {
      toggleSidebar();
    }
  };

  // Sidebar toggle function with proper mobile handling
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setShowOverlay(!sidebarOpen);
  };

  const handleContentClick = () => {
    if (window.innerWidth < 768 && sidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="dashboard-header">
        <DashboardHeader />
      </header>
      
      <div className="flex flex-1">
        {/* Overlay for mobile sidebar */}
        {showOverlay && (
          <div 
            className="sidebar-overlay" 
            onClick={handleContentClick}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`dashboard-sidebar ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-gray-800 dark:text-white">Filters</h2>
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <DashboardFilters data={data} onFiltersChange={setFilters} />
            {/* Removed the duplicate reset filter button */}
          </div>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main flex-1">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                {tabIcons[activeTab]}
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
            </div>
            
            <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Updated Footer */}
      <footer className="dashboard-footer">
        <div className="layout-container text-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="flex items-center gap-1">
              <Copyright size={14} /> {new Date().getFullYear()} EV Analytics Dashboard.
            </p>
            <p>
              Data Source: <a href="https://catalog.data.gov/dataset/electric-vehicle-population-data" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">WA State DOL</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DashboardApp />
    </ThemeProvider>
  );
}