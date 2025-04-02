
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type RiskMetricProps = {
  label: string;
  score: number;
  unit?: string;
  change: string;
  changeDirection?: "up" | "down";
  color?: string;
  tooltip: string;
};

type RiskMetricsCardProps = {
  metrics: RiskMetricProps[];
};

const RiskMetricsCard = ({ metrics }: RiskMetricsCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div key={metric.label} className="flex flex-col">
          <div className="text-sm text-gray-500 mb-1 flex items-center">
            {metric.label}
            <div className="relative group ml-1">
              <span className="cursor-help text-gray-400">ⓘ</span>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
                {metric.tooltip}
              </div>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">
              {metric.score}{metric.unit || ''}
            </span>
            <span className={`ml-2 text-xs flex items-center ${metric.changeDirection === 'down' ? 'text-green-500' : 'text-red-500'}`}>
              {metric.changeDirection === 'down' ? (
                <TrendingDown className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingUp className="h-3 w-3 mr-0.5" />
              )}
              {metric.change}
            </span>
          </div>
          {metric.color && (
            <div className="w-full h-1.5 bg-gray-200 rounded mt-1">
              <div 
                className={`h-1.5 rounded ${metric.color}`} 
                style={{ width: `${Math.min(100, metric.score)}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RiskMetricsCard;
