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
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-base font-medium mb-3">Filter Data</h2>
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
      <div className="mt-3 flex justify-end">
        <Button variant="secondary" size="sm" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}