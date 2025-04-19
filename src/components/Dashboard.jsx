import { useState } from 'react';
import { motion } from 'framer-motion';
import useEVData from '../hooks/useEVData';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import DashboardStats from './DashboardStats';
import LoadingSpinner from './LoadingSpinner';
import EVTypeChart from './charts/EVTypeChart';
import MakeModelChart from './charts/MakeModelChart';
import CountyDistributionChart from './charts/CountyDistributionChart';
import BatteryRangeChart from './charts/BatteryRangeChart';
import YearlyGrowthChart from './charts/YearlyGrowthChart';
import CAFVEligibilityChart from './charts/CAFVEligibilityChart';
import UtilityDistributionChart from './charts/UtilityDistributionChart';

const Dashboard = () => {
  const { data, loading, error } = useEVData();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) return <LoadingSpinner />;
  
  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
        <p className="text-gray-600">{error.message}</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DashboardStats data={data} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <EVTypeChart data={data} />
              <CAFVEligibilityChart data={data} />
            </div>
            <div className="mb-6">
              <YearlyGrowthChart data={data} />
            </div>
          </motion.div>
        );
      case 'vehicles':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <MakeModelChart data={data} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BatteryRangeChart data={data} />
              <CAFVEligibilityChart data={data} />
            </div>
          </motion.div>
        );
      case 'geography':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <CountyDistributionChart data={data} />
              </div>
              <div>
                <UtilityDistributionChart data={data} />
              </div>
            </div>
          </motion.div>
        );
      case 'details':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <BatteryRangeChart data={data} />
              <EVTypeChart data={data} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <YearlyGrowthChart data={data} />
              <UtilityDistributionChart data={data} />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>EV Analytics Dashboard - Assessment Submission</p>
          <p className="text-sm mt-2 text-gray-400">Data source: Electric Vehicle Population Data</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;