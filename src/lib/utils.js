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
  if (value > 0) return 'text-success-600';
  if (value < 0) return 'text-danger-600';
  return 'text-gray-600';
};

// Format compact numbers (like 1.2k, 3.5M)
export const formatCompactNumber = (num) => {
  if (typeof num !== 'number') return '0';
  
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num);
};

// Format as percentage
export const formatPercent = (num) => {
  if (typeof num !== 'number') return '0%';
  return `${Math.round(num * 100) / 100}%`;
};

// Get color shade based on value range
export const getGradientColor = (value, min, max) => {
  const colors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-blue-200 text-blue-800',
    high: 'bg-blue-300 text-blue-900',
    veryHigh: 'bg-blue-400 text-blue-900'
  };
  
  const range = max - min;
  const normalized = (value - min) / range;
  
  if (normalized < 0.25) return colors.low;
  if (normalized < 0.5) return colors.medium;
  if (normalized < 0.75) return colors.high;
  return colors.veryHigh;
};

// Create color palette for charts
export const generateChartColors = (count) => {
  const baseColors = [
    { r: 59, g: 130, b: 246 }, // Blue
    { r: 245, g: 158, b: 11 }, // Orange
    { r: 139, g: 92, b: 246 },  // Purple
    { r: 16, g: 185, b: 129 }, // Green
    { r: 239, g: 68, b: 68 }, // Red
    { r: 20, g: 184, b: 166 }, // Teal
    { r: 217, g: 70, b: 239 }, // Pink
    { r: 56, g: 189, b: 248 }, // Light Blue
  ];
  
  const colors = [];
  
  for (let i = 0; i < count; i++) {
    const baseColor = baseColors[i % baseColors.length];
    const opacity = 0.8;
    colors.push(`rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${opacity})`);
  }
  
  return colors;
};