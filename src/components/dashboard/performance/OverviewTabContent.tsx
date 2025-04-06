
import React from "react";
import NetWorthChart from "./NetWorthChart";

type OverviewTabContentProps = {
  performanceData: {
    month: string;
    value: number;
  }[];
  chartConfig: any;
  newsData: {
    title: string;
    time: string;
  }[];
};

const OverviewTabContent = ({ 
  performanceData, 
  chartConfig, 
  newsData 
}: OverviewTabContentProps) => {
  return (
    <div className="space-y-6 h-full">
      <div>
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
