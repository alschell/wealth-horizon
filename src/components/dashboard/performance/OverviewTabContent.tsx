
import React from "react";
import NetWorthChart from "./NetWorthChart";
import KeyMetricsGrid from "./KeyMetricsGrid";
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
    <div className="space-y-6">
      <div className="h-[300px]">
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold mb-2">Total Net Worth</div>
            <div className="text-3xl font-bold">$5.68M</div>
            <div className="text-sm text-gray-500 mt-1">+4.7% YTD</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold mb-2">Net Worth Change</div>
            <div className="text-3xl font-bold text-green-600">+$268K</div>
            <div className="text-sm text-gray-500 mt-1">Since last month</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTabContent;
