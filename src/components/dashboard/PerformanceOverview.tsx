
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTabContent from "./performance/OverviewTabContent";
import ChartsTabContent from "./performance/ChartsTabContent";
import RecommendationsTabContent from "./performance/RecommendationsTabContent";
import { 
  performanceData, 
  assetAllocationData, 
  newsData, 
  recommendations, 
  chartConfig 
} from "./performance/PerformanceData";

const PerformanceOverview = () => {
  return (
    <Card className="overflow-auto shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Performance Overview</CardTitle>
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
              performanceData={performanceData}
              chartConfig={chartConfig}
              newsData={newsData}
            />
          </TabsContent>
          
          <TabsContent value="charts">
            <ChartsTabContent 
              assetAllocationData={assetAllocationData}
            />
          </TabsContent>
          
          <TabsContent value="recommendations">
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
