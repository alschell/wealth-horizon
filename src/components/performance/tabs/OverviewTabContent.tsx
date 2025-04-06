
import React from "react";
import { TrendingUp } from "lucide-react";
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
    <div className="space-y-12">
      <div>
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-600">Net Worth Trend</h3>
        </div>
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
      
      <div>
        <KeyMetricsGrid />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TopAssets />
        <RecentNewsList newsData={newsData} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
