import ThemeToggle from '../theme/ThemeToggle';
import { BarChart3 } from 'lucide-react'; // Example icon

export default function DashboardHeader() {
  return (
    <div className="h-full flex items-center">
      <div className="layout-container w-full">
        <div className="flex justify-between items-center">
          {/* Left Side: Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 dark:bg-primary-700 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                EV Analytics
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Electric Vehicle Population Dashboard
              </p>
            </div>
          </div>

          {/* Right Side: Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
            {/* Add other header items here if needed, e.g., User Menu */}
          </div>
        </div>
      </div>
    </div>
  );
}