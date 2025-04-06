
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
      <div className="h-[400px] relative" style={{ top: "-150px", marginBottom: "-150px" }}> {/* Added relative positioning and negative margin to compensate */}
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
