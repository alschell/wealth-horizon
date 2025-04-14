
import React from "react";
import { TrendingUp, TrendingDown, BarChartHorizontal } from "lucide-react";
import MiniSparkline from "./MiniSparkline";

type MetricCardProps = {
  metric: {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
  };
};

const MetricCard = ({ metric }: MetricCardProps) => {
  const { label, value, change, trend } = metric;

  const renderIcon = () => {
    if (trend === 'up') return <TrendingUp className="h-3 w-3 mr-1" />;
    if (trend === 'down') return <TrendingDown className="h-3 w-3 mr-1" />;
    return <BarChartHorizontal className="h-3 w-3 mr-1" />;
  };

  const getColorClass = () => {
    if (trend === 'up') return 'text-emerald-600';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-600';
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      <div className="flex items-center justify-between">
        <div className={`flex items-center mt-1 ${getColorClass()} text-xs`}>
          {renderIcon()} {change}
        </div>
        <MiniSparkline trend={trend} />
      </div>
    </div>
  );
};

export default MetricCard;
