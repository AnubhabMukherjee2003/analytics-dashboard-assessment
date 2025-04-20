import { useState } from "react";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

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
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-medium text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter Data
        </h2>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleReset}
          className="text-xs px-3 py-1.5 hover:bg-gray-200 transition-colors"
        >
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Model Year"
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          options={years.map(year => ({ value: year, label: year === "all" ? "All Years" : year }))}
        />
        <Select
          label="Make"
          value={filters.make}
          onChange={(e) => handleFilterChange("make", e.target.value)}
          options={makes.map(make => ({ value: make, label: make === "all" ? "All Makes" : make }))}
        />
        <Select
          label="County"
          value={filters.county}
          onChange={(e) => handleFilterChange("county", e.target.value)}
          options={counties.map(county => ({ value: county, label: county === "all" ? "All Counties" : county }))}
        />
      </div>
    </div>
  );
}