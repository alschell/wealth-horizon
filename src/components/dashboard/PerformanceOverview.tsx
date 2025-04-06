
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTabContent from "@/components/performance/tabs/OverviewTabContent";
import ChartsTabContent from "@/components/performance/tabs/ChartsTabContent";
import RecommendationsTabContent from "@/components/performance/tabs/RecommendationsTabContent";
import { performanceData } from "@/components/performance/data/PerformanceData";

const PerformanceOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Quick snapshot of your wealth performance</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
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
          
          <TabsContent value="charts">
            <ChartsTabContent 
              assetAllocationData={performanceData.assetAllocation}
            />
          </TabsContent>
          
          <TabsContent value="recommendations">
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
