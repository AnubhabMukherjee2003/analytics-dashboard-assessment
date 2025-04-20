import { Card } from "../ui/Card";

export default function StatCard({ title, value, delta, icon: Icon, className = "" }) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;

  return (
    <Card className={`h-full transition-all duration-300 hover:translate-y-[-4px] ${className}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {Icon && (
            <div className="rounded-full bg-gray-50 p-2 text-gray-400">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {delta !== undefined && (
            <p className="mt-2 flex items-center text-sm">
              <span
                className={`mr-1 flex items-center font-medium ${
                  isPositive ? "text-success-600" : isNegative ? "text-danger-600" : "text-gray-500"
                }`}
              >
                {isPositive && (
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
                {isNegative && (
                  <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
                {isPositive && "+"}{delta}%
              </span>
              <span className="text-gray-500">from average</span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}