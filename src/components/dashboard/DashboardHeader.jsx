export default function DashboardHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Washington State EV Analytics</h1>
        <p className="mt-1 text-sm opacity-90">
          Interactive dashboard analyzing electric vehicle population data
        </p>
      </div>
    </header>
  );
}