
import React from "react";
import NetWorthChart from "./NetWorthChart";
import TranslatedText from "@/components/ui/translated-text";

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
        <TranslatedText as="h3" className="text-lg font-medium mb-2">
          Net Worth Performance
        </TranslatedText>
        <NetWorthChart performanceData={performanceData} chartConfig={chartConfig} />
      </div>
    </div>
  );
};

export default OverviewTabContent;
