import { Card } from "../ui/Card";

export default function StatCard({ title, value, delta, icon: Icon, className = "" }) {
  const isPositive = delta > 0;
  const isNegative = delta < 0;

  return (
    <Card className={`h-full ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>
        <div className="mt-2">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {delta !== undefined && (
            <p className="mt-1 flex items-center text-sm">
              <span
                className={`mr-1 ${
                  isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-gray-500"
                }`}
              >
                {isPositive && "+"}
                {delta}%
              </span>
              <span className="text-gray-500">from average</span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}