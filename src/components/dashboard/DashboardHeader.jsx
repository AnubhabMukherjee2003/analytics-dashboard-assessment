import ThemeToggle from '../theme/ThemeToggle';

export default function DashboardHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 sm:px-6 lg:px-8 flex justify-between items-center w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Washington State EV Analytics</h1>
          <p className="mt-1 text-xs sm:text-sm opacity-90 text-white">
            Interactive dashboard analyzing electric vehicle population data
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}