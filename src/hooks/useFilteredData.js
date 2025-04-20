import { useMemo } from 'react';

export default function useFilteredData(data, filters) {
  return useMemo(() => {
    if (!data || !data.length) return [];
    
    return data.filter(item => {
      // Filter by year
      if (filters.year && filters.year !== 'all') {
        if (item["Model Year"] != filters.year) return false;
      }
      
      // Filter by make
      if (filters.make && filters.make !== 'all') {
        if (item.Make !== filters.make) return false;
      }
      
      // Filter by county
      if (filters.county && filters.county !== 'all') {
        if (item.County !== filters.county) return false;
      }
      
      return true;
    });
  }, [data, filters]);
}