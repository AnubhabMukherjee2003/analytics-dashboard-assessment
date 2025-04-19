// Process data for EV Type distribution (BEV vs PHEV)
export const processEVTypeData = (data) => {
    const evTypes = data.reduce((acc, vehicle) => {
      const type = vehicle["Electric Vehicle Type"];
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
      return acc;
    }, {});
  
    return {
      labels: Object.keys(evTypes),
      datasets: [
        {
          data: Object.values(evTypes),
          backgroundColor: ['#4db5ff', '#00cc70', '#ffbb33', '#ff6b6b'],
          hoverBackgroundColor: ['#1a9fff', '#00e680', '#ffaa00', '#ff4444'],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Process data for popular makes
  export const processMakeData = (data) => {
    const makes = data.reduce((acc, vehicle) => {
      const make = vehicle.Make;
      if (!acc[make]) {
        acc[make] = 0;
      }
      acc[make]++;
      return acc;
    }, {});
  
    // Sort and get top 10 makes
    const sortedMakes = Object.entries(makes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    return {
      labels: sortedMakes.map(([make]) => make),
      datasets: [
        {
          label: 'Number of Vehicles',
          data: sortedMakes.map(([_, count]) => count),
          backgroundColor: '#4db5ff',
          borderColor: '#0089e6',
          borderWidth: 1
        }
      ]
    };
  };
  
  // Process data for popular models
  export const processModelData = (data) => {
    const models = data.reduce((acc, vehicle) => {
      const model = vehicle.Model;
      if (!acc[model]) {
        acc[model] = 0;
      }
      acc[model]++;
      return acc;
    }, {});
  
    // Sort and get top 10 models
    const sortedModels = Object.entries(models)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    return {
      labels: sortedModels.map(([model]) => model),
      datasets: [
        {
          label: 'Number of Vehicles',
          data: sortedModels.map(([_, count]) => count),
          backgroundColor: '#00e680',
          borderColor: '#00b360',
          borderWidth: 1
        }
      ]
    };
  };
  
  // Process data for county distribution
  export const processCountyData = (data) => {
    const counties = data.reduce((acc, vehicle) => {
      const county = vehicle.County;
      if (!acc[county]) {
        acc[county] = 0;
      }
      acc[county]++;
      return acc;
    }, {});
  
    // Sort by count
    const sortedCounties = Object.entries(counties)
      .sort((a, b) => b[1] - a[1]);
  
    return {
      labels: sortedCounties.map(([county]) => county),
      datasets: [
        {
          label: 'Number of EVs',
          data: sortedCounties.map(([_, count]) => count),
          backgroundColor: '#ffbb33',
          borderColor: '#ffaa00',
          borderWidth: 1
        }
      ]
    };
  };
  
  // Process data for battery range analysis
  export const processBatteryRangeData = (data) => {
    // Filter out vehicles with battery range of 0 or undefined
    const filteredData = data.filter(vehicle => {
      const range = parseInt(vehicle["Electric Range"]);
      return !isNaN(range) && range > 0;
    });
  
    // Group by range buckets
    const rangeBuckets = {
      '0-50': 0,
      '51-100': 0,
      '101-150': 0,
      '151-200': 0,
      '201-250': 0,
      '251-300': 0,
      '300+': 0
    };
  
    filteredData.forEach(vehicle => {
      const range = parseInt(vehicle["Electric Range"]);
      if (range <= 50) {
        rangeBuckets['0-50']++;
      } else if (range <= 100) {
        rangeBuckets['51-100']++;
      } else if (range <= 150) {
        rangeBuckets['101-150']++;
      } else if (range <= 200) {
        rangeBuckets['151-200']++;
      } else if (range <= 250) {
        rangeBuckets['201-250']++;
      } else if (range <= 300) {
        rangeBuckets['251-300']++;
      } else {
        rangeBuckets['300+']++;
      }
    });
  
    return {
      labels: Object.keys(rangeBuckets),
      datasets: [
        {
          label: 'Number of Vehicles',
          data: Object.values(rangeBuckets),
          backgroundColor: ['#4db5ff', '#00e680', '#ffbb33', '#ff6b6b', '#9966ff', '#50e3c2', '#f78fb3'],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Process data for yearly growth in EV adoption
  export const processYearlyGrowthData = (data) => {
    const years = data.reduce((acc, vehicle) => {
      const year = vehicle["Model Year"];
      if (!year || year === "0") return acc;
      
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year]++;
      return acc;
    }, {});
  
    // Sort by year
    const sortedYears = Object.entries(years)
      .sort((a, b) => a[0] - b[0]);
  
    return {
      labels: sortedYears.map(([year]) => year),
      datasets: [
        {
          label: 'Number of Vehicles',
          data: sortedYears.map(([_, count]) => count),
          borderColor: '#4db5ff',
          backgroundColor: 'rgba(77, 181, 255, 0.2)',
          pointBackgroundColor: '#0089e6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    };
  };
  
  // Process data for CAFV eligibility
  export const processCAFVEligibilityData = (data) => {
    const eligibility = data.reduce((acc, vehicle) => {
      const status = vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});
  
    return {
      labels: Object.keys(eligibility),
      datasets: [
        {
          data: Object.values(eligibility),
          backgroundColor: ['#4db5ff', '#00e680', '#ffbb33', '#ff6b6b', '#9966ff'],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Process data for electric utility distribution
  export const processUtilityData = (data) => {
    const utilities = data.reduce((acc, vehicle) => {
      const utility = vehicle["Electric Utility"];
      
      // Some utilities are listed with pipe delimiter
      const utilityName = utility ? utility.split('|')[0].trim() : 'Unknown';
      
      if (!acc[utilityName]) {
        acc[utilityName] = 0;
      }
      acc[utilityName]++;
      return acc;
    }, {});
  
    // Sort and get top 10 utilities
    const sortedUtilities = Object.entries(utilities)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    return {
      labels: sortedUtilities.map(([utility]) => utility),
      datasets: [
        {
          label: 'Number of Vehicles',
          data: sortedUtilities.map(([_, count]) => count),
          backgroundColor: ['#4db5ff', '#00e680', '#ffbb33', '#ff6b6b', '#9966ff', '#50e3c2', '#f78fb3', '#c34a36', '#706fd3', '#33d9b2'],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Get summary statistics
  export const getSummaryStats = (data) => {
    const totalVehicles = data.length;
    
    const bevCount = data.filter(v => 
      v["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)"
    ).length;
    
    const phevCount = data.filter(v => 
      v["Electric Vehicle Type"] === "Plug-in Hybrid Electric Vehicle (PHEV)"
    ).length;
    
    // Calculate average range excluding zeros and NaN values
    const validRanges = data
      .map(v => parseInt(v["Electric Range"]))
      .filter(range => !isNaN(range) && range > 0);
      
    const avgRange = validRanges.length > 0 
      ? Math.round(validRanges.reduce((a, b) => a + b, 0) / validRanges.length) 
      : 0;
      
    const makeDistribution = {};
    data.forEach(v => {
      const make = v.Make;
      makeDistribution[make] = (makeDistribution[make] || 0) + 1;
    });
    
    const topMake = Object.entries(makeDistribution)
      .sort((a, b) => b[1] - a[1])[0][0];
  
    return {
      totalVehicles,
      bevCount,
      phevCount,
      bevPercentage: ((bevCount / totalVehicles) * 100).toFixed(1),
      phevPercentage: ((phevCount / totalVehicles) * 100).toFixed(1),
      avgRange,
      topMake
    };
  };