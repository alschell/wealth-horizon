
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">Net Worth Trend</h3>
          <div className="flex items-center">
            <div className="flex items-center text-emerald-600 text-sm font-medium mr-6">
              <TrendingUp className="h-4 w-4 mr-1" /> +3.8% YTD
            </div>
          </div>
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
