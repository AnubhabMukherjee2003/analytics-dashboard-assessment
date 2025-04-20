import { useState } from "react";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { RotateCcw } from 'lucide-react';

export default function DashboardFilters({ data, onFiltersChange }) {
  const [filters, setFilters] = useState({
    year: "all",
    make: "all",
    county: "all",
  });

  // Extract unique values for filter options
  const years = ["all", ...new Set(data.map(item => item["Model Year"]))].sort();
  const makes = ["all", ...new Set(data.map(item => item.Make))].sort();
  const counties = ["all", ...new Set(data.map(item => item.County))].sort();

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { year: "all", make: "all", county: "all" };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <Select
          label="Model Year"
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          options={years.map(year => ({ 
            value: year, 
            label: year === "all" ? "All Years" : year 
          }))}
          className="w-full"
        />
        
        <Select
          label="Make"
          value={filters.make}
          onChange={(e) => handleFilterChange("make", e.target.value)}
          options={makes.map(make => ({ 
            value: make, 
            label: make === "all" ? "All Makes" : make 
          }))}
          className="w-full"
        />
        
        <Select
          label="County"
          value={filters.county}
          onChange={(e) => handleFilterChange("county", e.target.value)}
          options={counties.map(county => ({ 
            value: county, 
            label: county === "all" ? "All Counties" : county 
          }))}
          className="w-full"
        />
      </div>

      <Button
        variant="primary"
        onClick={handleReset}
        className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center gap-2 py-3 shadow-md hover:shadow-lg transition-all duration-150"
      >
        <RotateCcw size={18} />
        Reset Filters
      </Button>
    </div>
  );
}