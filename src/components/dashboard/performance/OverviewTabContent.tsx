
import React from "react";
import NetWorthChart from "./NetWorthChart";
import KeyMetricsGrid from "./KeyMetricsGrid";
import TopAssets from "./TopAssets";
import RecentNewsList from "./RecentNewsList";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="mt-[-100px]">
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <TopAssets />
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4">
            <RecentNewsList newsData={newsData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTabContent;
