
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OverviewTabContent from "./tabs/OverviewTabContent";
import ChartsTabContent from "./tabs/ChartsTabContent";
import RecommendationsTabContent from "./tabs/RecommendationsTabContent";
import { performanceData } from "./data/PerformanceData";

const PerformanceOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

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
          
          <TabsContent value="overview" className="m-0 p-6">
            <OverviewTabContent 
              performanceData={performanceData.performanceTrend}
              chartConfig={{
                value: {
                  label: "Net Worth",
                  color: "#000000"
                }
              }}
              newsData={performanceData.recentNews}
            />
          </TabsContent>
          
          <TabsContent value="charts" className="m-0 p-6">
            <ChartsTabContent
              assetAllocationData={performanceData.assetAllocation}
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="m-0 p-6">
            <RecommendationsTabContent
              recommendations={performanceData.recommendations}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
