
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTabContent from "./tabs/OverviewTabContent";
import ChartsTabContent from "./tabs/ChartsTabContent";
import RecommendationsTabContent from "./tabs/RecommendationsTabContent";
import { PerformanceData } from "./data/PerformanceData";
import BackButtonHeader from "@/components/navigation/BackButtonHeader";

const PerformanceOverview = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  
  const newsData = [
    { title: "Q2 Earnings Report Released", time: "2h ago" },
    { title: "New Strategic Asset Allocation", time: "Yesterday" },
    { title: "Market Update: Tech Sector Rotation", time: "2d ago" },
    { title: "Portfolio Rebalancing Complete", time: "3d ago" },
  ];
  
  const chartConfig = {
    height: 300,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
  };
  
  return (
    <div className="space-y-6">
      <BackButtonHeader title="Back to Dashboard" />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <Tabs 
          defaultValue="overview" 
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid grid-cols-3 h-11">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTabContent 
              performanceData={PerformanceData} 
              chartConfig={chartConfig}
              newsData={newsData}
            />
          </TabsContent>
          
          <TabsContent value="charts">
            <ChartsTabContent />
          </TabsContent>
          
          <TabsContent value="recommendations">
            <RecommendationsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceOverview;
