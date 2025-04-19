import { motion } from 'framer-motion';
import { getSummaryStats } from '../utils/dataProcessing';

const DashboardStats = ({ data }) => {
  const stats = getSummaryStats(data);
  
  const statItems = [
    { key: 'totalVehicles', label: 'Total EVs', value: stats.totalVehicles.toLocaleString() },
    { 
      key: 'bevCount', 
      label: 'Battery EVs', 
      value: stats.bevCount.toLocaleString(),
      footer: `${stats.bevPercentage}% of total`
    },
    { 
      key: 'phevCount', 
      label: 'Plug-in Hybrids', 
      value: stats.phevCount.toLocaleString(),
      footer: `${stats.phevPercentage}% of total`
    },
    { key: 'avgRange', label: 'Avg. Range', value: `${stats.avgRange} miles` },
    { key: 'topMake', label: 'Top Make', value: stats.topMake }
  ];
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statItems.map((item, index) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-4"
        >
          <h3 className="text-sm text-gray-500 font-medium">{item.label}</h3>
          <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
          {item.footer && <p className="text-xs text-primary-600 mt-1">{item.footer}</p>}
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;