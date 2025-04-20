// Format large numbers with commas
export const formatNumber = (num) => {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString();
  };
  
  // Clean and normalize various EV data fields
  export const cleanEVData = (data) => {
    return data.map(item => ({
      ...item,
      "Electric Range": parseFloat(item["Electric Range"]) || 0,
      "Model Year": parseInt(item["Model Year"]) || 0,
      Make: (item.Make || "").toUpperCase(),
      Model: (item.Model || "").toUpperCase(),
    }));
  };
  
  // Calculate % change between two values
  export const calculatePercentChange = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };
  
  // Get color based on value (positive/negative)
  export const getDeltaColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };