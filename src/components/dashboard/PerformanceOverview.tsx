
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="shadow-sm h-[392px]"> {/* Increased from 280px to 392px (40% increase) */}
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
      <CardContent className="pt-0 pb-4 h-[calc(392px-80px)]"> {/* Adjusted to match new height */}
        <Tabs defaultValue="networth" className="h-full">
          <TabsList className="mb-2">
            <TabsTrigger value="networth">Net Worth</TabsTrigger>
            <TabsTrigger value="assets">Assets & Liabilities</TabsTrigger>
            <TabsTrigger value="nextactions">Next Best Actions</TabsTrigger>
          </TabsList>
          
          <div className="h-[calc(100%-40px)] overflow-auto">
            <TabsContent value="networth" className="mt-0 h-full">
              <OverviewTabContent 
                performanceData={performanceData}
                chartConfig={chartConfig}
                newsData={newsData}
              />
            </TabsContent>
            
            <TabsContent value="assets" className="mt-0 h-full">
              <ChartsTabContent 
                assetAllocationData={assetAllocationData}
              />
            </TabsContent>
            
            <TabsContent value="nextactions" className="mt-0 h-full">
              <RecommendationsTabContent 
                recommendations={recommendations}
              />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
