export default function DashboardTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "vehicles", name: "Vehicles" },
    { id: "geography", name: "Geography" },
    { id: "trends", name: "Trends" },
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="sm:flex sm:items-baseline">
        <div className="mt-4 sm:mt-0">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}