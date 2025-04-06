
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
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
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y' | 'All'>('1y');

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Performance Overview</CardTitle>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-emerald-600 text-sm font-medium">
            <TrendingUp className="h-4 w-4 mr-1" /> +3.8% YTD
          </div>
          <div className="flex space-x-1">
            {(['1m', '3m', '6m', '1y', 'All'] as const).map((range) => (
              <Button 
                key={range}
                variant={timeRange === range ? "secondary" : "ghost"} 
                size="sm"
                className="text-xs h-7 px-2"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[650px] overflow-y-auto"> 
        <Tabs defaultValue="networth" className="space-y-4">
          <TabsList>
            <TabsTrigger value="networth">Net Worth</TabsTrigger>
            <TabsTrigger value="assets">Assets & Liabilities</TabsTrigger>
            <TabsTrigger value="nextactions">Next Best Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="networth">
            <OverviewTabContent 
              performanceData={performanceData}
              chartConfig={chartConfig}
              newsData={newsData}
            />
          </TabsContent>
          
          <TabsContent value="assets">
            <ChartsTabContent 
              assetAllocationData={assetAllocationData}
            />
          </TabsContent>
          
          <TabsContent value="nextactions">
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
