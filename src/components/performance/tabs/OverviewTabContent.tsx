
import React from "react";
import NetWorthChart from "../charts/NetWorthChart";
import KeyMetricsGrid from "../components/KeyMetricsGrid";
import TopAssets from "../components/TopAssets";
import RecentNewsList from "../components/RecentNewsList";

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
    <div className="space-y-8">
      <div className="mb-2">
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
      
      <KeyMetricsGrid />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopAssets />
        <RecentNewsList newsData={newsData} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
