
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OverviewTabContent from "./tabs/OverviewTabContent";
import ChartsTabContent from "./tabs/ChartsTabContent";
import RecommendationsTabContent from "./tabs/RecommendationsTabContent";
import { performanceData } from "./data/PerformanceData";

const PerformanceOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const {
    totalAssets,
    changeAmount,
    changePercentage,
    changeType,
    keyMetrics,
    assetAllocation,
    performanceTrend,
    topPerformers,
    topDetractors,
    recommendations,
    recentNews
  } = performanceData;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Portfolio Performance</span>
          <span className="text-sm font-normal text-muted-foreground">Last updated: Today, 9:43 AM</span>
        </CardTitle>
        <CardDescription>
          Track your portfolio performance across all accounts
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="m-0 p-0">
            <OverviewTabContent 
              totalAssets={totalAssets}
              changeAmount={changeAmount}
              changePercentage={changePercentage}
              changeType={changeType}
              keyMetrics={keyMetrics}
              topPerformers={topPerformers}
              topDetractors={topDetractors}
              recentNews={recentNews}
            />
          </TabsContent>
          
          <TabsContent value="charts" className="m-0 p-0">
            <ChartsTabContent
              performanceTrend={performanceTrend}
              assetAllocationData={assetAllocation}
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="m-0 p-0">
            <RecommendationsTabContent
              recommendations={recommendations}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
