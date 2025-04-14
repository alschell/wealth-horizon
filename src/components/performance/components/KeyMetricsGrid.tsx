
import React from "react";
import MetricCard from "./metrics/MetricCard";

const KeyMetricsGrid = () => {
  const metrics = [
    {
      label: "Total Assets",
      value: "$5.68B",
      change: "+5.2% YTD",
      trend: "up" as const,
    },
    {
      label: "Total Liabilities",
      value: "$1.20B",
      change: "-2.3% YTD",
      trend: "down" as const,
    },
    {
      label: "Cash Balance",
      value: "$1.28B",
      change: "+1.2% YTD",
      trend: "neutral" as const,
    },
    {
      label: "Investments",
      value: "$3.40B",
      change: "+8.5% YTD",
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} metric={metric} />
      ))}
    </div>
  );
};

export default KeyMetricsGrid;
